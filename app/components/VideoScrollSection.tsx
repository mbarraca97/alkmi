'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoScrollSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container || typeof window === 'undefined') return;
    let targetProgress = 0;
    let smoothedProgress = 0;
    let rafId: number | null = null;
    let lastRafTs = 0;

    // Optional: quantize seeks to a fixed FPS grid. This can reduce decoder churn,
    // but it can also look "steppy" (especially on 60/120Hz displays).
    // Leave as null for smoothest scrubbing.
    const SEEK_QUANTIZE_FPS: number | null = 30;

    // Limit how fast we seek to avoid huge jumps that can thrash decoding.
    // Units: seconds of video per second of real time.
    const MAX_SEEK_RATE = 12;

    // Time constant for smoothing scroll progress into video progress (seconds).
    const PROGRESS_SMOOTHING_TAU = 0.12;

    const animateVideoTime = (ts: number) => {
      if (!lastRafTs) lastRafTs = ts;
      const dt = Math.min((ts - lastRafTs) / 1000, 0.05);
      lastRafTs = ts;

      const maxTime = Math.max(video.duration - 0.01, 0);
      // Exponential smoothing that is stable across different rAF rates.
      const alpha = 1 - Math.exp(-dt / PROGRESS_SMOOTHING_TAU);
      smoothedProgress += (targetProgress - smoothedProgress) * alpha;
      const targetTime = maxTime * smoothedProgress;

      const quantizeStep =
        SEEK_QUANTIZE_FPS && SEEK_QUANTIZE_FPS > 0 ? 1 / SEEK_QUANTIZE_FPS : 0;
      const desiredTime =
        quantizeStep > 0
          ? Math.round(targetTime / quantizeStep) * quantizeStep
          : targetTime;

      const delta = desiredTime - video.currentTime;
      const maxStep = Math.max(MAX_SEEK_RATE * dt, 0.001);
      const clampedDelta = Math.max(Math.min(delta, maxStep), -maxStep);

      const nextTime = Math.min(Math.max(video.currentTime + clampedDelta, 0), maxTime);

      // Skip tiny seeks to reduce decoder churn and micro-jitter.
      if (Math.abs(video.currentTime - nextTime) > 0.0005) {
        // `fastSeek` (when available) can be smoother for rapid scrubbing.
        if (typeof (video as HTMLVideoElement & { fastSeek?: (time: number) => void }).fastSeek === 'function') {
          (video as HTMLVideoElement & { fastSeek: (time: number) => void }).fastSeek(nextTime);
        } else {
          video.currentTime = nextTime;
        }
      }

      rafId = window.requestAnimationFrame(animateVideoTime);
    };

    const existingTrigger = ScrollTrigger.getById('video-scroll-trigger');
    if (existingTrigger) {
      existingTrigger.kill();
    }

    // Create the pin/spacer immediately so the next section can't start "under" it.
    ScrollTrigger.create({
      id: 'video-scroll-trigger',
      trigger: container,
      start: 'top top',
      end: '+=650%',
      scrub: true,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetProgress = self.progress >= 0.999 ? 1 : self.progress;
      },
      onLeave: () => {
        targetProgress = 1;
      },
      onEnterBack: () => {
        targetProgress = 1;
      },
    });

    const startPlaybackLoopIfReady = () => {
      if (!video.duration || isNaN(video.duration)) return;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(animateVideoTime);
      }
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      startPlaybackLoopIfReady();
    } else {
      video.addEventListener('loadedmetadata', startPlaybackLoopIfReady);
    }

    return () => {
      video.removeEventListener('loadedmetadata', startPlaybackLoopIfReady);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-cream"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/alkmi.mp4?v=2026-02-27"
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sage/20 pointer-events-none" />
    </div>
  );
}
