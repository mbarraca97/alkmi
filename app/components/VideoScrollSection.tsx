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
        end: '+=300%',
        scrub: true,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Avoid seeking exactly at duration (some browsers clamp oddly there).
          const isNearEnd = self.progress >= 0.999;
          const newTime = isNearEnd ? Math.max(video.duration - 0.01, 0) : video.duration * self.progress;
          if (video.currentTime !== newTime) {
            video.currentTime = newTime;
          }
        },
        onLeave: () => {
          video.currentTime = Math.max(video.duration - 0.01, 0);
        },
        onEnterBack: () => {
          video.currentTime = Math.max(video.duration - 0.01, 0);
        },
      });

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
