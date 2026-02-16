'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    if (!section || !title || !content || typeof window === 'undefined') return;

    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
    });

    gsap.from(content, {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: content,
        start: 'top 85%',
        end: 'top 60%',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === content) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-mint flex flex-col items-center justify-center px-8 py-32"
    >
      <div className="max-w-5xl w-full">
        <h2 
          ref={titleRef}
          className="font-title text-6xl md:text-7xl lg:text-8xl text-sage mb-12 text-center"
        >
          Let's Create Something Amazing
        </h2>
        
        <div ref={contentRef} className="space-y-8">
          <p className="font-content text-xl md:text-2xl text-sage/90 text-center leading-relaxed">
            At Alkmi, we believe in the power of transformation. Our approach combines 
            innovative thinking with meticulous craftsmanship to deliver experiences 
            that resonate and inspire.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-cream/50 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="font-title text-2xl text-terracotta mb-4">Strategy</h3>
              <p className="font-content text-sage/80 leading-relaxed">
                Thoughtful planning that sets the foundation for success.
              </p>
            </div>
            
            <div className="bg-cream/50 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="font-title text-2xl text-terracotta mb-4">Design</h3>
              <p className="font-content text-sage/80 leading-relaxed">
                Beautiful aesthetics combined with intuitive functionality.
              </p>
            </div>
            
            <div className="bg-cream/50 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="font-title text-2xl text-terracotta mb-4">Development</h3>
              <p className="font-content text-sage/80 leading-relaxed">
                Robust solutions built with cutting-edge technology.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <button className="font-content px-12 py-4 bg-terracotta text-cream rounded-full text-lg hover:bg-sage transition-colors duration-300">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
