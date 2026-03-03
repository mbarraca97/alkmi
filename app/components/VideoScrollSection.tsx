'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
    // Keep this matched to your encoded video's FPS (currently 30fps).
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

    // Scrub the video across the full height of the container (no pin needed —
    // the video element uses CSS `position: sticky` instead).
    ScrollTrigger.create({
      id: 'video-scroll-trigger',
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
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
      className="relative w-full bg-cream"
      style={{ minHeight: '750vh' }} /* 100vh viewport + 650vh scroll distance */
    >
      {/* Sticky video background — stays in view while user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/alkmi.mp4?v=2026-03-03-3d"
          poster="/video/alkmi-poster.jpg?v=2026-03-03-3d"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sage/20 pointer-events-none" />
      </div>

      {/* Intro content — scrolls naturally over the sticky video */}
      <div className="relative z-10 -mt-[100vh]">
        <div className="mx-auto w-full max-w-[327px] px-0 md:max-w-6xl md:px-8">
          <div className="flex flex-col items-center">
            <div className="mt-[120px]">
              <Image
                src="/images/Logo.png"
                alt="Alkmi logo"
                width={120}
                height={120}
                priority
                className="h-auto w-[120px] md:w-[156px]"
              />
            </div>

            <h1 className="font-title font-normal text-[37.74px] leading-[1] tracking-[-1.81px] text-[#30331D] text-center my-[40px] md:text-[94px] md:leading-[1.05] md:tracking-normal">
              The Art of Color
              <br />
              The Spirit of Luxury
            </h1>

            <div className="mt-[40px]" data-intro-hero>
              <Image
                src="/images/loader/8.png"
                alt="Alkmi collection"
                width={400}
                height={520}
                priority
              />
            </div>
          </div>

          <div className="pb-24 pt-24">
            <p className="font-title font-normal text-[18px] md:text-[54px] leading-[1.15] text-[#D9DFC6] text-left">
              ALKMI honors the vital force of reinvention through a blend of elegance
              and a wild spirit
              <br />
              <br />
              the Alchemy collection pursues modern design, transforming rare treasures
              into vibrant expressions of individuality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
