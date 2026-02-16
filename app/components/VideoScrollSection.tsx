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
        console.log('Video duration not ready yet');
        return;
      }

      console.log('Initializing ScrollTrigger with video duration:', video.duration);

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const newTime = video.duration * self.progress;
          video.currentTime = newTime;
          console.log('Scroll progress:', self.progress, 'Video time:', newTime);
        },
      });
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration);
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
