'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
function TextoTituloVideo({
  collection,
  description,
  align = 'left',
}: {
  collection: string;
  piece: string;
  description: string;
  align?: 'left' | 'right';
}) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <h3 className="font-title font-normal text-[40px] leading-[1] text-[#D9DFC6] md:text-[clamp(36px,3.6vw,70px)]">
        {collection}
      </h3>
      <p className={`font-content font-light text-[13px] leading-[1.55] text-[#30331D]/90 md:text-[clamp(14px,1.1vw,20px)] ${align === 'right' ? 'ml-auto max-w-[260px] md:max-w-[340px]' : 'max-w-[260px] md:max-w-[340px]'}`}>
        {description}
      </p>
    </div>
  );
}

export default function VideoScrollSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLParagraphElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container || typeof window === 'undefined') return;

    // Set the correct video source based on viewport size.
    // Mobile gets a portrait-oriented video; desktop keeps the original.
    const isMdScreen = window.matchMedia('(min-width: 768px)').matches;
    const desiredSrc = isMdScreen
      ? '/video/alkmi.mp4?v=2026-03-03-3d'
      : '/video/alkmiMobile.mp4';
    if (!video.src || !video.src.includes(desiredSrc)) {
      video.src = desiredSrc;
      if (isMdScreen) {
        video.poster = '/video/alkmi-poster.jpg?v=2026-03-03-3d';
      }
      video.load();
    }

    let targetProgress = 0;
    let smoothedProgress = 0;
    let rafId: number | null = null;
    let lastRafTs = 0;

    // Optional: quantize seeks to a fixed FPS grid. This can reduce decoder churn,
    // but it can also look "steppy" (especially on 60/120Hz displays).
    // Leave as null for smoothest scrubbing.
    // Keep this matched to your encoded video's FPS (currently 30fps).
    const SEEK_QUANTIZE_FPS: number | null = 30;

    // Limit how fast we seek to avoid huge jumps that can thrash decoding.
    // Units: seconds of video per second of real time.
    const MAX_SEEK_RATE = 12;

    // Time constant for smoothing scroll progress into video progress (seconds).
    const PROGRESS_SMOOTHING_TAU = 0.12;

    const animateVideoTime = (ts: number) => {
      if (!lastRafTs) lastRafTs = ts;
      const dt = Math.min((ts - lastRafTs) / 1000, 0.05);
      lastRafTs = ts;

      const maxTime = Math.max(video.duration - 0.01, 0);
      // Exponential smoothing that is stable across different rAF rates.
      const alpha = 1 - Math.exp(-dt / PROGRESS_SMOOTHING_TAU);
      smoothedProgress += (targetProgress - smoothedProgress) * alpha;
      const targetTime = maxTime * smoothedProgress;

      const quantizeStep =
        SEEK_QUANTIZE_FPS && SEEK_QUANTIZE_FPS > 0 ? 1 / SEEK_QUANTIZE_FPS : 0;
      const desiredTime =
        quantizeStep > 0
          ? Math.round(targetTime / quantizeStep) * quantizeStep
          : targetTime;

      const delta = desiredTime - video.currentTime;
      const maxStep = Math.max(MAX_SEEK_RATE * dt, 0.001);
      const clampedDelta = Math.max(Math.min(delta, maxStep), -maxStep);

      const nextTime = Math.min(Math.max(video.currentTime + clampedDelta, 0), maxTime);

      // Skip tiny seeks to reduce decoder churn and micro-jitter.
      if (Math.abs(video.currentTime - nextTime) > 0.0005) {
        // `fastSeek` (when available) can be smoother for rapid scrubbing.
        if (typeof (video as HTMLVideoElement & { fastSeek?: (time: number) => void }).fastSeek === 'function') {
          (video as HTMLVideoElement & { fastSeek: (time: number) => void }).fastSeek(nextTime);
        } else {
          video.currentTime = nextTime;
        }
      }

      rafId = window.requestAnimationFrame(animateVideoTime);
    };

    const existingTrigger = ScrollTrigger.getById('video-scroll-trigger');
    if (existingTrigger) {
      existingTrigger.kill();
    }

    // Scrub the video across the full height of the container (no pin needed —
    // the video element uses CSS `position: sticky` instead).
    ScrollTrigger.create({
      id: 'video-scroll-trigger',
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetProgress = self.progress >= 0.999 ? 1 : self.progress;
      },
      onLeave: () => {
        targetProgress = 1;
      },
      onEnterBack: () => {
        targetProgress = 1;
      },
    });

    // Scroll-triggered text reveal: animate each word from #D9DFC6 → #30331D
    const words = textRevealRef.current?.querySelectorAll<HTMLElement>('.reveal-word');
    if (words && words.length > 0) {
      gsap.set(words, { color: '#D9DFC6' });
      gsap.to(words, {
        color: '#30331D',
        stagger: 0.3,
        scrollTrigger: {
          trigger: textRevealRef.current,
          start: 'top 85%',
          end: 'bottom 50%',
          scrub: true,
        },
      });
    }

    // Grow the hero image from the loader card size to its final size
    // once the page-loader overlay is removed from the DOM.
    const hero = heroRef.current;
    let heroObserver: MutationObserver | null = null;
    if (hero) {
      const isMd = window.matchMedia('(min-width: 768px)').matches;
      const loaderW = isMd ? 400 : 300;
      const loaderH = 520;
      gsap.set(hero, { width: loaderW, height: loaderH, overflow: 'hidden' });

      const growHero = () => {
        gsap.to(hero, {
          width: 480,
          height: 600,
          duration: 0.9,
          ease: 'power2.out',
          onComplete: () => ScrollTrigger.refresh(),
        });
      };

      // If the loader is already gone (e.g. navigated back), grow immediately.
      if (!document.querySelector('[data-page-loader]')) {
        growHero();
      } else {
        heroObserver = new MutationObserver(() => {
          if (!document.querySelector('[data-page-loader]')) {
            heroObserver?.disconnect();
            heroObserver = null;
            growHero();
          }
        });
        heroObserver.observe(document.body, { childList: true, subtree: true });
      }
    }

    // Scroll-triggered scale-up for the hero image
    if (hero) {
      gsap.fromTo(
        hero,
        { scale: 1 },
        {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top 90%',
            end: 'bottom 20%',
            scrub: true,
          },
        },
      );
    }

    const startPlaybackLoopIfReady = () => {
      if (!video.duration || isNaN(video.duration)) return;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(animateVideoTime);
      }
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      startPlaybackLoopIfReady();
    } else {
      video.addEventListener('loadedmetadata', startPlaybackLoopIfReady);
    }

    // Fixed overlay texts — fade in then fade out as the section scrolls
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    if (text1 && text2) {
      gsap.set([text1, text2], { opacity: 0 });

      const totalScroll = () => container.offsetHeight - window.innerHeight;

      // Text 1: visible during ~15 – 45% of the section scroll
      const tl1 = gsap.timeline({ paused: true });
      tl1
        .fromTo(text1, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.in' })
        .to(text1, { opacity: 1, duration: 0.5 })
        .to(text1, { opacity: 0, duration: 0.25, ease: 'power1.out' });

      ScrollTrigger.create({
        id: 'text1-fade',
        trigger: container,
        start: () => `top+=${totalScroll() * 0.45} top`,
        end:   () => `top+=${totalScroll() * 0.65} top`,
        scrub: 1,
        animation: tl1,
        invalidateOnRefresh: true,
      });

      // Text 2: visible during ~52 – 82% of the section scroll
      const tl2 = gsap.timeline({ paused: true });
      tl2
        .fromTo(text2, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.in' })
        .to(text2, { opacity: 1, duration: 0.5 })
        .to(text2, { opacity: 0, duration: 0.25, ease: 'power1.out' });

      ScrollTrigger.create({
        id: 'text2-fade',
        trigger: container,
        start: () => `top+=${totalScroll() * 0.65} top`,
        end:   () => `top+=${totalScroll() * 0.82} top`,
        scrub: 1,
        animation: tl2,
        invalidateOnRefresh: true,
      });
    }

    return () => {
      video.removeEventListener('loadedmetadata', startPlaybackLoopIfReady);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      heroObserver?.disconnect();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container || trigger.trigger === textRevealRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-cream"
      style={{ minHeight: '750vh' }} /* 100vh viewport + 650vh scroll distance */
    >
      {/* Sticky video background — stays in view while user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sage/20 pointer-events-none" />
      </div>

      {/* Intro content — scrolls naturally over the sticky video */}
      <div className="relative z-10 -mt-[100vh]">
        <div className="mx-auto w-full max-w-[327px] px-0 md:max-w-6xl md:px-8">
          <div className="flex flex-col items-center">
            <div className="mt-[120px]">
              <Image
                src="/images/LogoTop.png"
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

            <div ref={heroRef} className="relative mt-[40px]" data-intro-hero>
              <Image
                src="/images/loader/8.png"
                alt="Alkmi collection"
                fill
                sizes="480px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="pb-24 pt-24">
            <p
              ref={textRevealRef}
              className="font-title font-normal text-[18px] md:text-[54px] leading-[1.15] text-[#D9DFC6] text-left"
            >
              {/* Line 1 */}
              {'ALKMI is a high jewelry brand created by AJ Jewels, a place where tradition meets creative freedom.'
                .split(' ')
                .map((word, i) => (
                  <span key={`l1-${i}`} className="reveal-word">{word} </span>
                ))}
              <br />
              <br />
              {/* Line 2 */}
              {'A captivating new world where color, character, and great craftsmanship converge to shape jewels that are bold, disruptive, and unmistakably ALKMI.'
                .split(' ')
                .map((word, i) => (
                  <span key={`l2-${i}`} className="reveal-word">{word} </span>
                ))}
              <br />
              <br />
              {/* Line 3 */}
              {'Just like alchemy transforms the ordinary into the extraordinary, ALKMI honors the vital force of reinvention, through a mix of elegance with a wild soul - just like the women we create for.'
                .split(' ')
                .map((word, i) => (
                  <span key={`l3-${i}`} className="reveal-word">{word} </span>
                ))}
            </p>
          </div>

        </div>
      </div>

      {/* Fixed overlay — top-left */}
      <div
        ref={text1Ref}
        className="fixed top-20 left-6 z-20 pointer-events-none md:top-24 md:left-14"
        style={{ opacity: 0 }}
      >
        <TextoTituloVideo
          collection="Alchemy"
          piece="Prism Veil Earrings"
          description={`At the heart of the brand is our signature light\ngreen inspired by the green sapphire, a stone\nthat embodies both natural elegance and\ninner strength, inspiring transformation and\nbold individuality through beauty and color.`}
        />
      </div>

      {/* Fixed overlay — bottom-right */}
      <div
        ref={text2Ref}
        className="fixed bottom-20 right-6 z-20 pointer-events-none md:bottom-24 md:right-14"
        style={{ opacity: 0 }}
      >
        <TextoTituloVideo
          collection="Alchemy"
          piece="Prism Veil Earrings"
          align="right"
          description={`With contemporary designs rooted on the legacy of\nmulti-shaped stones, ALKMI reimagines fine jewelry\nthrough bold color combinations and distinctive,\ninnovative details, like our light green titanium,\noffering women a new way to express themselves\nthrough color, character, and confidence.`}
        />
      </div>

      {/* "Alchemy collection" label — appears at the very bottom of the scroll section */}
      <div className="absolute bottom-0 left-0 px-6 pb-12 md:px-0 md:pb-24 md:ml-[80px]">
        <a className="text-left text-[#30331D] font-title text-[60px] md:text-[clamp(60px,8vw,120px)] leading-[1.15] transition-colors duration-300">Alchemy <br/> collection</a>
      </div>
      
    </div>
  );
}
