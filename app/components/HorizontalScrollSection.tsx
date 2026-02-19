'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function TextoTitulo({
  collection,
  piece,
  description,
}: {
  collection: string;
  piece: string;
  description: string;
}) {
  return (
    <div className="text-left">
      <h3 className="font-title font-normal text-[clamp(56px,5.6vw,110px)] leading-[1.02] text-[#474C2C]">
        {collection}
      </h3>
      <h4 className="font-title font-normal text-[clamp(32px,3.2vw,64px)] leading-[1.05] text-[#474C2C] mt-[clamp(16px,2.1vw,30px)] mb-[clamp(16px,2.1vw,30px)]">
        {piece}
      </h4>
      <p className="font-content font-light text-[clamp(16px,1.35vw,24px)] leading-[1.55] text-[#474C2C]/90 max-w-[min(620px,42vw)]">
        {description}
      </p>
    </div>
  );
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

    // If images affect layout, this ensures ScrollTrigger recalculates once they're loaded.
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
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
          className="flex h-full"
        >
          {/* Panel 1 */}
          <section className="flex-shrink-0 w-screen h-full px-6 md:px-12 xl:px-16">
            <div className="flex h-full items-center justify-between gap-10 xl:gap-20">
              <div className="max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Alchemy"
                  piece="Auric Bloom Ring"
                  description="A luminous statement forged from rare stones and bold geometry—balanced to feel effortless, designed to catch light with every movement."
                />
              </div>

              <div className="flex flex-col gap-8">
                <div className="relative w-[clamp(360px,44vw,800px)] h-[clamp(200px,24vw,430px)]">
                  <Image
                    src="/images/horizontal/Rectangle 8.png"
                    alt="Alchemy collection"
                    fill
                    sizes="800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative w-[clamp(360px,44vw,800px)] h-[clamp(200px,24vw,430px)]">
                  <Image
                    src="/images/horizontal/Rectangle 9.png"
                    alt="Alchemy collection"
                    fill
                    sizes="800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Panel 2 */}
          <section className="flex-shrink-0 w-screen h-full px-6 md:px-12 xl:px-16">
            <div className="flex h-full items-start justify-between gap-10 xl:gap-20 pt-10 md:pt-16">
              <div className="flex h-full flex-col justify-between pb-16">
                <div className="max-w-[min(680px,46vw)]">
                  <TextoTitulo
                    collection="Alchemy"
                    piece="Prism Veil Earrings"
                    description="Two silhouettes in conversation: sharp sparkle against soft glow. A modern heirloom that pairs refinement with a streak of untamed energy."
                  />
                </div>

                <div className="relative w-[clamp(260px,30vw,550px)] h-[clamp(200px,24vw,430px)]">
                  <Image
                    src="/images/horizontal/Rectangle 11.png"
                    alt="Prism Veil detail"
                    fill
                    sizes="550px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative w-[clamp(360px,48vw,850px)] h-[clamp(520px,74vh,990px)]">
                <Image
                  src="/images/horizontal/Rectangle 10.png"
                  alt="Prism Veil"
                  fill
                  sizes="850px"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Panel 3 */}
          <section className="flex-shrink-0 w-screen h-full px-6 md:px-12 xl:px-16">
            <div className="flex h-full items-center justify-between gap-10 xl:gap-20">
              <div className="max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Alchemy"
                  piece="Emberline Bracelet"
                  description="A fluid arc of color that wraps like a quiet flame—crafted to feel weightless, yet bold enough to define the entire look."
                />
              </div>

              <div className="relative w-[clamp(420px,52vw,950px)] h-[clamp(260px,36vw,630px)]">
                <Image
                  src="/images/horizontal/Rectangle 12.png"
                  alt="Emberline Bracelet"
                  fill
                  sizes="950px"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Panel 4 */}
          <section className="flex-shrink-0 w-screen h-full px-6 md:px-12 xl:px-16">
            <div className="flex h-full items-center justify-between gap-10 xl:gap-20">
              <div className="relative w-[clamp(420px,52vw,950px)] h-[clamp(260px,36vw,630px)]">
                <Image
                  src="/images/horizontal/Rectangle 13.png"
                  alt="Alchemy Necklace"
                  fill
                  sizes="950px"
                  className="object-cover"
                />
              </div>

              <div className="max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Alchemy"
                  piece="Gilded Orbit Necklace"
                  description="Designed around the neck like a constellation—golden forms, rare stones, and a precise rhythm that feels both luxurious and fearless."
                />
              </div>
            </div>
          </section>

          {/* Panel 5 */}
          <section className="flex-shrink-0 w-screen h-full px-6 md:px-12 xl:px-16">
            <div className="flex h-full items-center justify-between gap-10 xl:gap-20">
              <div className="relative w-[clamp(420px,52vw,950px)] h-[clamp(520px,74vh,1000px)]">
                <Image
                  src="/images/horizontal/Rectangle 14.png"
                  alt="Alchemy Editorial"
                  fill
                  sizes="950px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-12">
                <div className="max-w-[min(650px,44vw)]">
                  <TextoTitulo
                    collection="Alchemy"
                    piece="Wildfire Signet"
                    description="A bold crest of color and cut. Built to be worn daily—never delicate, always refined—like armor made for celebration."
                  />
                </div>

                <div className="relative w-[clamp(220px,24vw,420px)] h-[clamp(300px,38vh,540px)]">
                  <Image
                    src="/images/horizontal/Rectangle 15.png"
                    alt="Wildfire Signet detail"
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Panel 6 */}
          <section className="flex-shrink-0 w-screen h-full px-6 md:px-12 xl:px-16">
            <div className="flex h-full items-end justify-between gap-10 xl:gap-20 pb-10 md:pb-16">
              <div className="relative w-[clamp(380px,48vw,860px)] h-[clamp(260px,34vw,540px)]">
                <Image
                  src="/images/horizontal/Rectangle 16.png"
                  alt="Alchemy detail"
                  fill
                  sizes="860px"
                  className="object-cover"
                />
              </div>

              <div className="max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Alchemy"
                  piece="Verdant Pulse Ring"
                  description="A clean, modern frame for a vibrant center—cut to amplify color and set to move with you, from daylight to night."
                />
              </div>
            </div>
          </section>

          {/* Panel 7 */}
          <section className="flex-shrink-0 w-screen h-full px-6 md:px-12 xl:px-16 py-10 md:py-16">
            <div className="relative h-full w-full">
              <div className="absolute left-0 top-0">
                <div className="relative w-[clamp(360px,48vw,850px)] h-[clamp(240px,34vw,520px)]">
                  <Image
                    src="/images/horizontal/Rectangle 19.png"
                    alt="Alchemy editorial"
                    fill
                    sizes="850px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute bottom-0 right-0">
                <div className="relative w-[clamp(380px,50vw,900px)] h-[clamp(240px,34vw,520px)]">
                  <Image
                    src="/images/horizontal/Rectangle 10.png"
                    alt="Alchemy portrait"
                    fill
                    sizes="900px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
