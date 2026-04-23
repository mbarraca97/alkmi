'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STORY_IMAGES = [
  '/images/finalsection/Rectangle 10.png',
  '/images/finalsection/Rectangle 20.png',
  '/images/horizontal/Rectangle 10.png',
];

const bgImage = '/images/bg_dark_green.jpg';

export default function FinalSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const imageStageRef = useRef<HTMLDivElement>(null);
  const imageOneRef = useRef<HTMLDivElement>(null);
  const imageTwoRef = useRef<HTMLDivElement>(null);
  const imageThreeRef = useRef<HTMLDivElement>(null);

  const formTextSize = useMemo(
    () => 'text-[33px] md:text-[clamp(44px,6.2vw,112.22px)]',
    []
  );

  useEffect(() => {
    const stage = imageStageRef.current;
    const imageOne = imageOneRef.current;
    const imageTwo = imageTwoRef.current;
    const imageThree = imageThreeRef.current;
    if (!stage || !imageOne || !imageTwo || !imageThree) return;

    gsap.set(imageOne, { scale: 1.15, transformOrigin: 'center center', force3D: true });
    gsap.set(imageTwo, { scale: 0.5, transformOrigin: 'center center', force3D: true });
    gsap.set(imageThree, { scale: 0.5, transformOrigin: 'center center', force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top 85%',
        end: 'bottom 25%',
        scrub: 1.4,
        invalidateOnRefresh: true,
      },
    });

    tl.to(imageOne, { scale: 0.7, ease: 'none', force3D: true }, 0)
      .to(imageTwo, { scale: 1.3, ease: 'none', force3D: true }, 0)
      .to(imageThree, { scale: 1.3, ease: 'none', force3D: true }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Intentionally no-op (design-only form).
  };

  const backToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[url('/images/bg_dark_green.jpg')] bg-opacity-50 px-6 py-16 pt-24 md:p-[80px] md:pt-[120px]">
      {/* Top copy */}
      <div className="flex w-full flex-col items-start justify-between gap-8 pb-16 md:flex-row md:gap-16 md:pb-24">
        <h2 className="font-title font-normal uppercase text-[38px] leading-[1.05] text-[#D9DFC6] text-left md:text-[54px]">
          Crafted <br /> From Within
        </h2>

        <p className="font-content font-light text-[16px] leading-[1.45] text-[#D9DFC6] text-left max-w-[700px] md:text-[24px]">
        Harnessing cutting-edge technology and master craftsmanship, our factory is
a true reflection of our pursuit of perfection. From concept to creation, every
step of the process happens in-house. It is a complete end-to-end journey hat ensures precision, independence, and innovation at every stage.
        </p>
      </div>

      {/* Three-image scroll animation */}
      <div
        ref={imageStageRef}
        className="relative mt-10 h-[1300px] w-full md:mt-14 md:h-[1400px] "
      >
        {/* First image — centered */}
        <div
          ref={imageOneRef}
          className="absolute right-0 top-0 w-[300px] max-w-[480px] md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[380px] lg:w-[480px]"
        >
          <div className="relative h-[620px] md:h-[740px] lg:h-[840px]">
            <Image
              src={STORY_IMAGES[0]}
              alt="ALKMI atelier"
              fill
              sizes="(max-width: 768px) 86vw, 1080px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Second image — left, 800px below the first */}
        <div
          ref={imageTwoRef}
          className="absolute md:left-[-50px] top-100 w-[200px] max-w-[480px] md:w-[380px] lg:w-[480px]"
        >
          <div className="relative h-[320px] md:h-[740px] lg:h-[840px]">
            <Image
              src={STORY_IMAGES[1]}
              alt="ALKMI craftsmanship"
              fill
              sizes="(max-width: 768px) 82vw, 1020px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Third image — right, 1500px below the first */}
        <div
          ref={imageThreeRef}
          className="absolute right-0 md:right-[-50px] top-200 w-[350px] max-w-[900px] md:w-[760px] lg:w-[900px]"
        >
          <div className="relative h-[200px] md:h-[440px] lg:h-[520px]">
            <Image
              src={STORY_IMAGES[2]}
              alt="ALKMI signature details"
              fill
              sizes="(max-width: 768px) 78vw, 900px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="mt-16 w-full pb-16 md:mt-40 md:pb-24">
        <div className="font-title font-normal tracking-[-3px] leading-[1] text-[#D9DFC6] text-left">
          <div className={formTextSize}>hello,</div>

          <div className={`mt-2 flex flex-wrap items-end gap-3 md:flex-nowrap md:gap-6 ${formTextSize}`}>
            <span>my name is</span>
            <span className="flex-1 min-w-[160px] border-b-[2px] border-[#D9DFC6] pb-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none font-content font-normal text-[16px] leading-[1] tracking-[0px] text-[#D9DFC6] placeholder:text-[#D9DFC6]/70 md:text-[23.62px]"
                placeholder="Enter your name here"
                aria-label="Name"
              />
            </span>
          </div>

          <div className={`mt-3 flex flex-wrap items-end gap-3 md:flex-nowrap md:gap-6 ${formTextSize}`}>
            <span>here&apos;s my email</span>
            <span className="flex-1 min-w-[160px] border-b-[2px] border-[#D9DFC6] pb-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none font-content font-normal text-[16px] leading-[1] tracking-[0px] text-[#D9DFC6] placeholder:text-[#D9DFC6]/70 md:text-[23.62px]"
                placeholder="Enter your email here"
                aria-label="Email"
              />
            </span>
          </div>

          <div className={`mt-3 flex flex-wrap items-end gap-3 md:flex-nowrap md:gap-6 ${formTextSize}`}>
            <span>i&apos;m interested in</span>
            <span className="flex-1 min-w-[160px] border-b-[2px] border-[#D9DFC6] pb-2">
              <input
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full bg-transparent outline-none font-content font-normal text-[16px] leading-[1] tracking-[0px] text-[#D9DFC6] placeholder:text-[#D9DFC6]/70 md:text-[23.62px]"
                placeholder="What would you like to explore"
                aria-label="Interest"
              />
            </span>
            <span>.</span>
          </div>
        </div>
      </form>

      {/* Footer */}
      <footer className="mt-12 flex w-full flex-col items-center justify-between gap-10 md:mt-20 md:flex-row md:gap-0">
        <Image
          src="/images/Logo (2).png"
          alt="ALKMI"
          width={100}
          height={100}
          className="object-contain"
        />

        <div className="flex flex-col items-center text-center">
          <div className="font-title font-normal  text-[24px] md:text-[34.52px] leading-[1] tracking-[0px] text-[#D9DFC6]">
            Contemporary Fine Jewelry
          </div>
          <div className="mt-2 font-content font-extralight uppercase text-[24px] leading-[1] tracking-[0px] text-[#D9DFC6]">
By The House of AJ          </div>
        </div>

        <button
          type="button"
          onClick={backToTop}
          className="flex items-center gap-4 font-content font-extralight text-[34.52px] leading-[1] tracking-[0px] text-[#D9DFC6]"
        >
          <span>Back To Top</span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 4l-6.5 6.5 1.4 1.4L11 7.8V20h2V7.8l4.1 4.1 1.4-1.4L12 4z"
              fill="currentColor"
            />
          </svg>
        </button>
      </footer>
    </section>
  );
}
