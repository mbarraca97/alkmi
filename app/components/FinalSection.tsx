'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

const CAROUSEL_IMAGES = [
  '/images/finalsection/Rectangle 10.png',
  '/images/finalsection/Rectangle 20.png',
  '/images/horizontal/Rectangle 10.png',
  '/images/horizontal/Rectangle 11.png',
  '/images/horizontal/Rectangle 12.png',
];

const MOBILE_CAROUSEL_GAP = 32; // px — matches gap-8
const DESKTOP_CAROUSEL_GAP = 64; // px — matches gap-16
const DESKTOP_LEFT_WIDTH = 472;
const DESKTOP_LEFT_HEIGHT = 326;
const DESKTOP_RIGHT_WIDTH = 600;
const DESKTOP_RIGHT_HEIGHT = 907;

export default function FinalSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const formTextSize = useMemo(
    () => 'text-[33px] md:text-[clamp(44px,6.2vw,112.22px)]',
    []
  );

  /* Clone first 2 images at the end so the loop is seamless when 2 are visible */
  const allImages = useMemo(
    () => [...CAROUSEL_IMAGES, CAROUSEL_IMAGES[0], CAROUSEL_IMAGES[1]],
    []
  );

  useEffect(() => {
    const measure = () => {
      const el = carouselRef.current;
      if (!el) return;
      setSlideWidth(el.offsetWidth);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (carouselRef.current) ro.observe(carouselRef.current);
    return () => ro.disconnect();
  }, []);

  /* Carousel — auto-advance every 4 s */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSlideIndex((prev) => prev + 1);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  /* Infinite loop: when we reach the clone region, instantly jump back to 0 */
  useEffect(() => {
    if (slideIndex !== CAROUSEL_IMAGES.length) return;
    const timeout = setTimeout(() => {
      setTransitionEnabled(false);
      setSlideIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }, 700); // must match the CSS transition duration
    return () => clearTimeout(timeout);
  }, [slideIndex]);

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
        Harnessing cutting-edge technology and master craftsmanship, our factory is
a true reflection of our pursuit of perfection. From concept to creation, every
step of the process happens in-house. It is a complete end-to-end journey hat ensures precision, independence, and innovation at every stage.
        </p>
      </div>

      {/* Image carousel */}
      <div
        ref={carouselRef}
        className="mt-10 w-full md:mt-14"
      >
        {/* Mobile: single image carousel */}
        <div className="h-[250px] overflow-hidden md:hidden">
          <div
            className="flex h-full"
            style={{
              gap: `${MOBILE_CAROUSEL_GAP}px`,
              transform: slideWidth
                ? `translateX(-${slideIndex * (slideWidth + MOBILE_CAROUSEL_GAP)}px)`
                : undefined,
              transition: transitionEnabled ? 'transform 700ms ease-in-out' : 'none',
            }}
          >
            {allImages.map((src, i) => (
              <div
                key={`m-${i}`}
                className="relative h-full flex-shrink-0"
                style={{ width: slideWidth ? `${slideWidth}px` : '100%' }}
              >
                <Image
                  src={src}
                  alt="ALKMI atelier"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 2-slot carousel where right image becomes left */}
        <div className="hidden h-[1147px] items-stretch gap-16 overflow-hidden md:flex md:justify-center">
          <div
            className="relative shrink-0 self-center overflow-hidden"
            style={{ width: `${DESKTOP_LEFT_WIDTH}px`, height: `${DESKTOP_LEFT_HEIGHT}px` }}
          >
            <div
              className="flex h-full"
              style={{
                gap: `${DESKTOP_CAROUSEL_GAP}px`,
                transform: `translateX(-${slideIndex * (DESKTOP_RIGHT_WIDTH + DESKTOP_CAROUSEL_GAP)}px)`,
                transition: transitionEnabled ? 'transform 700ms ease-in-out' : 'none',
              }}
            >
              {allImages.map((src, i) => (
                <div
                  key={`dl-${i}`}
                  className="relative h-full shrink-0"
                  style={{ width: `${DESKTOP_RIGHT_WIDTH}px` }}
                >
                  <Image
                    src={src}
                    alt="ALKMI craftsmanship"
                    fill
                    sizes="472px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-full w-[600px] shrink-0 overflow-hidden">
            <div
              className="flex h-full"
              style={{
                gap: `${DESKTOP_CAROUSEL_GAP}px`,
                transform: `translateX(-${(slideIndex + 1) * (DESKTOP_RIGHT_WIDTH + DESKTOP_CAROUSEL_GAP)}px)`,
                transition: transitionEnabled ? 'transform 700ms ease-in-out' : 'none',
              }}
            >
              {allImages.map((src, i) => (
                <div
                  key={`dr-${i}`}
                  className="relative h-full shrink-0"
                  style={{ width: `${DESKTOP_RIGHT_WIDTH}px`, height: `${DESKTOP_RIGHT_HEIGHT}px` }}
                >
                  <Image
                    src={src}
                    alt="ALKMI atelier"
                    fill
                    sizes="700px"
                    className="object-cover"
                  />
                </div>
              ))}
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
