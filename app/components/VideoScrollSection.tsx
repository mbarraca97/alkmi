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
    const FRAME_RATE = 30;
    const FRAME_TIME = 1 / FRAME_RATE;
    const MAX_STEP_PER_TICK = FRAME_TIME * 2;

    const animateVideoTime = () => {
      const maxTime = Math.max(video.duration - 0.01, 0);
      smoothedProgress += (targetProgress - smoothedProgress) * 0.06;
      const targetTime = maxTime * smoothedProgress;
      const quantizedTarget = Math.round(targetTime / FRAME_TIME) * FRAME_TIME;
      const delta = quantizedTarget - video.currentTime;
      const clampedDelta = Math.max(
        Math.min(delta, MAX_STEP_PER_TICK),
        -MAX_STEP_PER_TICK
      );
      const nextTime = Math.min(
        Math.max(video.currentTime + clampedDelta, 0),
        maxTime
      );

      // Skip tiny seeks to reduce decoder churn and micro-jitter.
      if (Math.abs(video.currentTime - nextTime) > 0.0005) {
        video.currentTime = nextTime;
      }

      rafId = window.requestAnimationFrame(animateVideoTime);
    };

    const initScrollTrigger = () => {
      if (!video.duration || isNaN(video.duration)) {
        return;
      }
      const existingTrigger = ScrollTrigger.getById('video-scroll-trigger');
      if (existingTrigger) {
        existingTrigger.kill();
      }

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

      if (rafId === null) {
        rafId = window.requestAnimationFrame(animateVideoTime);
      }

      ScrollTrigger.refresh();
    };

    const handleLoadedMetadata = () => {
      setTimeout(initScrollTrigger, 100);
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
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
        src="/video/alkmi.mp4"
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sage/20 pointer-events-none" />
    </div>
  );
}
