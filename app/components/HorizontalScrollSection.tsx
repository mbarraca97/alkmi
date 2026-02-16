'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!container || !scrollContainer || typeof window === 'undefined') return;

    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

    const animation = gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-cream">
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
  );
}
