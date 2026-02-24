'use client';

import Image from 'next/image';
import { FormEvent, useMemo, useState } from 'react';

export default function FinalSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');

  const formTextSize = useMemo(
    () => 'text-[33px] md:text-[clamp(44px,6.2vw,112.22px)]',
    []
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Intentionally no-op (design-only form).
  };

  const backToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[#686C52] px-6 py-16 pt-24 md:p-[80px] md:pt-[120px]">
      {/* Top copy */}
      <div className="flex w-full flex-col items-start justify-between gap-8 pb-16 md:flex-row md:gap-16 md:pb-24">
        <h2 className="font-title font-normal uppercase text-[38px] leading-[1.05] text-[#D9DFC6] text-left md:text-[54px]">
          Crafted <br /> From Within
        </h2>

        <p className="font-content font-light text-[16px] leading-[1.45] text-[#30331D] text-left max-w-[700px] md:text-[24px]">
          Every ALKMI creation is born, shaped and perfected in-house. From the
          first spark of inspiration to the final expression, each step unfolds
          under one vision — ensuring absolute control, authenticity and
          excellence.
        </p>
      </div>

      {/* Image block */}
      <div className="mt-10 w-full md:mt-14 md:h-[1147px]">
        <div className="flex w-full flex-col gap-8 md:h-full md:flex-row md:items-stretch md:justify-between md:gap-16">
          <div className="flex w-full items-center justify-start md:h-full md:flex-1 md:justify-center">
            <Image
              src="/images/finalsection/TOM08449 1.png"
              alt="ALKMI craftsmanship"
              width={432}
              height={296}
              sizes="(max-width: 768px) 200px, 432px"
              className="object-contain w-[200px] h-auto md:w-[432px]"
            />
          </div>

          <div className="flex w-full justify-end md:block md:w-auto">
            <div className="relative h-[200px] w-[200px] shrink-0 md:h-full md:w-[700px]">
            <Image
              src="/images/finalsection/Rectangle 10.png"
              alt="ALKMI atelier"
              fill
              sizes="(max-width: 768px) 200px, 700px"
              className="object-cover"
              priority={false}
            />
          </div>
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
          <div className="font-title font-normal text-[34.52px] leading-[1] tracking-[0px] text-[#D9DFC6]">
            Contemporary Fine Jewelry
          </div>
          <div className="mt-2 font-content font-extralight uppercase text-[24px] leading-[1] tracking-[0px] text-[#D9DFC6]">
            By AJ Jewels
          </div>
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
