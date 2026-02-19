'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

const SLIDE_INTERVAL_MS = 300;
const EXPAND_DELAY_MS = 150;
const EXPAND_DURATION_MS = 900;
const FREEZE_ON_LAST_MS = 600;
const SLIDE_TO_TARGET_DURATION_MS = 700;
const FADE_DURATION_MS = 450;

export default function PageLoader({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const slides = useMemo(
    () =>
      // 6-photo slideshow, but the last frame is 8.png (matches the hero image).
      [
        '/images/loader/1.png',
        '/images/loader/2.png',
        '/images/loader/3.png',
        '/images/loader/4.png',
        '/images/loader/5.png',
        '/images/loader/6.png',
        '/images/loader/8.png',
      ],
    []
  );

  const [isActive, setIsActive] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const timersRef = useRef<number[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const sliderOuterRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    // Restart loader on every route change (and on first mount).
    setIsActive(true);
    setIsExpanded(false);
    setIsFadingOut(false);
    setSlideIndex(0);

    clearTimers();
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Lock scroll while loader is visible.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    timersRef.current.push(
      window.setTimeout(() => setIsExpanded(true), EXPAND_DELAY_MS)
    );

    // Start slideshow after the expand finishes.
    timersRef.current.push(
      window.setTimeout(() => {
        let idx = 0;
        setSlideIndex(0);

        intervalRef.current = window.setInterval(() => {
          idx += 1;
          setSlideIndex(idx);

          // Stop on the last slide (8.png), freeze briefly, then slide down to the hero.
          if (idx >= slides.length - 1) {
            if (intervalRef.current !== null) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            timersRef.current.push(
              window.setTimeout(() => {
                const sliderOuter = sliderOuterRef.current;
                const stack = stackRef.current;
                const overlay = overlayRef.current;
                const target = document.querySelector('[data-intro-hero]');

                if (!sliderOuter || !stack || !overlay || !(target instanceof HTMLElement)) {
                  // Fallback: just fade out.
                  setIsFadingOut(true);
                  timersRef.current.push(
                    window.setTimeout(() => {
                      setIsActive(false);
                      document.body.style.overflow = prevOverflow;
                    }, FADE_DURATION_MS)
                  );
                  return;
                }

                const from = sliderOuter.getBoundingClientRect();
                const to = target.getBoundingClientRect();
                const dx = to.left - from.left;
                const dy = to.top - from.top;

                // Animate the whole stack so the slider ends exactly where the hero image is.
                stack.style.willChange = 'transform, opacity';
                stack.style.transition = `transform ${SLIDE_TO_TARGET_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
                overlay.style.willChange = 'opacity';
                overlay.style.transition = `opacity ${FADE_DURATION_MS}ms ease`;

                // Trigger layout before applying transform.
                void stack.getBoundingClientRect();

                stack.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;

                timersRef.current.push(
                  window.setTimeout(() => {
                    // Fade only after the slide completes so the final frame is clearly visible.
                    setIsFadingOut(true);
                    timersRef.current.push(
                      window.setTimeout(() => {
                        setIsActive(false);
                        document.body.style.overflow = prevOverflow;
                      }, FADE_DURATION_MS)
                    );
                  }, SLIDE_TO_TARGET_DURATION_MS)
                );
              }, FREEZE_ON_LAST_MS)
            );
          }
        }, SLIDE_INTERVAL_MS);
      }, EXPAND_DELAY_MS + EXPAND_DURATION_MS)
    );

    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimers();
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, slides.length]);

  return (
    <>
      {children}

      {isActive && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] bg-cream"
          style={{
            opacity: isFadingOut ? 0 : 1,
            transition: `opacity ${FADE_DURATION_MS}ms ease`,
          }}
        >
          <div className="flex h-full w-full items-center justify-center px-6">
            <div ref={stackRef} className="flex flex-col items-center">
              <Image
                src="/images/logo_gold.png"
                alt="Alkmi logo"
                width={80}
                height={80}
                priority
              />

              <div
                ref={sliderOuterRef}
                className="mt-6 w-[400px] overflow-hidden"
                style={{
                  height: isExpanded ? 520 : 3,
                  transition: `height ${EXPAND_DURATION_MS}ms ease`,
                }}
              >
                <div className="relative h-[520px] w-[400px]">
                  <Image
                    src={slides[slideIndex]}
                    alt="Loading image"
                    fill
                    sizes="400px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="mt-6">
                <Image
                  src="/images/logo_text_gold.png"
                  alt="Alkmi"
                  width={160}
                  height={40}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

