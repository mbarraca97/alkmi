'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!container || !sticky || !scrollContainer || typeof window === 'undefined') return;

    const getMaxScroll = () =>
      Math.max(scrollContainer.scrollWidth - window.innerWidth, 0);

    // If there's nothing to scroll horizontally, don't create triggers.
    if (getMaxScroll() <= 0) return;

    // Ensure a clean start (important when navigating back/forward or hot reload).
    gsap.set(scrollContainer, { x: 0 });

    const existing = ScrollTrigger.getById('horizontal-scroll-trigger');
    if (existing) existing.kill();

    const animation = gsap.to(scrollContainer, {
      x: () => -getMaxScroll(),
      ease: 'none',
      scrollTrigger: {
        id: 'horizontal-scroll-trigger',
        trigger: container,
        start: 'top top',
        end: () => `+=${getMaxScroll()}`,
        scrub: 1,
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      animation.kill();
      const trigger = ScrollTrigger.getById('horizontal-scroll-trigger');
      if (trigger) trigger.kill();
      gsap.set(scrollContainer, { clearProps: 'transform' });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-cream">
      <div 
        ref={stickyRef}
        className="h-screen overflow-hidden"
      >
        <div
          ref={scrollContainerRef}
          className="flex h-full items-center gap-16 px-16"
        >
          {/* Panel 1 */}
          <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center text-center px-16">
            <h2 className="font-title text-6xl md:text-7xl lg:text-8xl text-sage mb-8">
              Welcome to Alkmi
            </h2>
            <p className="font-content text-xl md:text-2xl text-sage/80 max-w-2xl">
              Discover the art of transformation
            </p>
          </div>

          {/* Panel 2 */}
          <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center text-center px-16">
            <h2 className="font-title text-6xl md:text-7xl lg:text-8xl text-terracotta mb-8">
              Innovation
            </h2>
            <p className="font-content text-xl md:text-2xl text-sage/80 max-w-2xl">
              Crafting experiences that matter
            </p>
          </div>

          {/* Panel 3 */}
          <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center text-center px-16">
            <h2 className="font-title text-6xl md:text-7xl lg:text-8xl text-sage mb-8">
              Excellence
            </h2>
            <p className="font-content text-xl md:text-2xl text-sage/80 max-w-2xl">
              Every detail designed with purpose
            </p>
          </div>

          {/* Panel 4 */}
          <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center text-center px-16">
            <h2 className="font-title text-6xl md:text-7xl lg:text-8xl text-terracotta mb-8">
              Vision
            </h2>
            <p className="font-content text-xl md:text-2xl text-sage/80 max-w-2xl">
              Building the future, together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
