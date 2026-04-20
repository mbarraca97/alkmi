'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IntroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof window === 'undefined') return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top 90%',
      end: 'bottom 20%',
      scrub: true,
      animation: gsap.fromTo(hero, { scale: 1 }, { scale: 1.80, ease: 'none' }),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="w-full bg-[url('/images/Comeup_f0000.png')] bg-cover bg-center bg-no-repeat">
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

          <div ref={heroRef} className="mt-[40px]" data-intro-hero>
            <Image
              src="/images/loader/8.png"
              alt="Alkmi collection"
              width={450}
              height={570}
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
    </section>
  );
}

