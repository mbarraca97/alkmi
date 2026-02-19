'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

const SLIDE_INTERVAL_MS = 300;
const EXPAND_DELAY_MS = 150;
const EXPAND_DURATION_MS = 900;
const HOLD_AFTER_CYCLE_MS = 250;
const FADE_DURATION_MS = 500;

export default function PageLoader({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const slides = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => `/images/loader/${i + 1}.png`),
    []
  );

  const [isActive, setIsActive] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const timersRef = useRef<number[]>([]);

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

    // Lock scroll while loader is visible.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const cycleDuration = slides.length * SLIDE_INTERVAL_MS;
    const fadeStart =
      EXPAND_DELAY_MS + EXPAND_DURATION_MS + cycleDuration + HOLD_AFTER_CYCLE_MS;

    timersRef.current.push(
      window.setTimeout(() => setIsExpanded(true), EXPAND_DELAY_MS)
    );

    timersRef.current.push(
      window.setTimeout(() => setIsFadingOut(true), fadeStart)
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setIsActive(false);
        document.body.style.overflow = prevOverflow;
      }, fadeStart + FADE_DURATION_MS)
    );

    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, slides.length]);

  useEffect(() => {
    if (!isActive) return;
    const interval = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [isActive, slides.length]);

  return (
    <>
      {children}

      {isActive && (
        <div
          className="fixed inset-0 z-[9999] bg-cream"
          style={{
            opacity: isFadingOut ? 0 : 1,
            transition: `opacity ${FADE_DURATION_MS}ms ease`,
          }}
        >
          <div className="flex h-full w-full items-center justify-center px-6">
            <div className="flex flex-col items-center">
              <Image
                src="/images/logo_gold.png"
                alt="Alkmi logo"
                width={80}
                height={80}
                priority
              />

              <div
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

