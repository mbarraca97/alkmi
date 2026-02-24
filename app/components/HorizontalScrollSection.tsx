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
      <h3 className="font-title font-normal text-[43px] leading-[1.02] text-[#474C2C] md:text-[clamp(56px,5.6vw,110px)]">
        {collection}
      </h3>
      <h4 className="font-title font-normal text-[25px] leading-[1.05] text-[#474C2C] mt-[clamp(16px,2.1vw,30px)] mb-[clamp(16px,2.1vw,30px)] md:text-[clamp(32px,3.2vw,64px)]">
        {piece}
      </h4>
      <p className="font-content font-light text-[10px] leading-[1.55] text-[#474C2C]/90 max-w-[160px] md:text-[clamp(16px,1.35vw,24px)] md:max-w-[min(620px,42vw)]">
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

    const triggerId = 'horizontal-scroll-trigger';
    const clearDesktopArtifacts = () => {
      const existing = ScrollTrigger.getById(triggerId);
      if (existing) existing.kill();
      gsap.set(scrollContainer, { clearProps: 'transform' });
    };

    // Mobile should scroll naturally (vertical). Desktop keeps the exact pinned horizontal behavior.
    const mm = gsap.matchMedia();

    mm.add('(max-width: 767px)', () => {
      clearDesktopArtifacts();
      return () => {
        clearDesktopArtifacts();
      };
    });

    mm.add('(min-width: 768px)', () => {
      const getMaxScroll = () => Math.max(scrollContainer.scrollWidth - window.innerWidth, 0);

      // Ensure a clean start (important when navigating back/forward or hot reload).
      gsap.set(scrollContainer, { x: 0 });
      clearDesktopArtifacts();

      const animation = gsap.to(scrollContainer, {
        x: () => -getMaxScroll(),
        ease: 'none',
        scrollTrigger: {
          id: triggerId,
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
        clearDesktopArtifacts();
      };
    });

    return () => {
      mm.revert();
      clearDesktopArtifacts();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-cream">
      <div 
        ref={stickyRef}
        className="h-auto overflow-visible md:h-screen md:overflow-hidden"
      >
        <div
          ref={scrollContainerRef}
          className="flex flex-col md:flex-row md:h-full"
        >
          {/* Panel 1 */}
          <section className="flex-shrink-0 w-full  px-6 md:w-screen md:h-full md:min-h-0 md:px-12 xl:px-16">
            <div className="flex flex-col gap-10 py-12 md:h-full md:flex-row md:items-center md:justify-between md:py-0 xl:gap-20">
              <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Alchemy"
                  piece="Auric Bloom Ring"
                  description="A luminous statement forged from rare stones and bold geometry—balanced to feel effortless, designed to catch light with every movement."
                />
              </div>

              <div className="flex w-full flex-col gap-8 md:w-auto">
                <div className="relative h-[clamp(150px,38vw,380px)] w-full max-w-[700px] md:h-[clamp(150px,18vw,380px)] md:w-[clamp(260px,34vw,700px)]">
                  <Image
                    src="/images/horizontal/Rectangle 8.png"
                    alt="Alchemy collection"
                    fill
                    sizes="800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative h-[clamp(150px,38vw,380px)] w-full max-w-[700px] md:h-[clamp(150px,18vw,380px)] md:w-[clamp(260px,34vw,700px)]">
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
          <section className="flex-shrink-0 w-full  px-6 md:w-screen md:h-full md:min-h-0 md:px-12 xl:px-16">
            <div className="flex flex-col gap-10 py-12 md:h-full md:flex-row md:items-start md:justify-between md:gap-10 md:py-0 md:pt-16 xl:gap-20">
              <div className="flex w-full flex-col gap-10 md:h-full md:w-auto md:justify-between md:gap-0 md:pb-16">
                <div className="w-full max-w-[680px] md:max-w-[min(680px,46vw)]">
                  <TextoTitulo
                    collection="Alchemy"
                    piece="Prism Veil Earrings"
                    description="Two silhouettes in conversation: sharp sparkle against soft glow. A modern heirloom that pairs refinement with a streak of untamed energy."
                  />
                </div>

                <div className="relative h-[clamp(220px,52vw,430px)] w-full max-w-[550px] md:h-[clamp(200px,24vw,430px)] md:w-[clamp(260px,30vw,550px)]">
                  <Image
                    src="/images/horizontal/Rectangle 11.png"
                    alt="Prism Veil detail"
                    fill
                    sizes="550px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative h-[clamp(520px,92vw,990px)] w-full max-w-[850px] md:h-[clamp(520px,74vh,990px)] md:w-[clamp(360px,48vw,850px)]">
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
          <section className="flex-shrink-0 w-full  px-6 md:w-screen md:h-full md:min-h-0 md:px-12 xl:px-16">
            <div className="flex flex-col gap-10 py-12 md:h-full md:flex-row md:items-center md:justify-between md:py-0 xl:gap-20">
              <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Alchemy"
                  piece="Emberline Bracelet"
                  description="A fluid arc of color that wraps like a quiet flame—crafted to feel weightless, yet bold enough to define the entire look."
                />
              </div>

              <div className="relative h-[clamp(260px,52vw,630px)] w-full max-w-[950px] md:h-[clamp(260px,36vw,630px)] md:w-[clamp(420px,52vw,950px)]">
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
          <section className="flex-shrink-0 w-full  px-6 md:w-screen md:h-full md:min-h-0 md:px-12 xl:px-16">
            <div className="flex flex-col gap-10 py-12 md:h-full md:flex-row md:items-center md:justify-between md:py-0 xl:gap-20">
              <div className="relative h-[clamp(260px,52vw,630px)] w-full max-w-[950px] md:h-[clamp(260px,36vw,630px)] md:w-[clamp(420px,52vw,950px)]">
                <Image
                  src="/images/horizontal/Rectangle 13.png"
                  alt="Alchemy Necklace"
                  fill
                  sizes="950px"
                  className="object-cover"
                />
              </div>

              <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Alchemy"
                  piece="Gilded Orbit Necklace"
                  description="Designed around the neck like a constellation—golden forms, rare stones, and a precise rhythm that feels both luxurious and fearless."
                />
              </div>
            </div>
          </section>

          {/* Panel 5 */}
          <section className="flex-shrink-0 w-full  px-6 md:w-screen md:h-full md:min-h-0 md:px-12 xl:px-16">
            <div className="flex flex-col gap-10 py-12 md:h-full md:flex-row md:items-center md:justify-between md:py-0 xl:gap-20">
              <div className="relative h-[clamp(520px,92vw,1000px)] w-full max-w-[950px] md:h-[clamp(520px,74vh,1000px)] md:w-[clamp(420px,52vw,950px)]">
                <Image
                  src="/images/horizontal/Rectangle 14.png"
                  alt="Alchemy Editorial"
                  fill
                  sizes="950px"
                  className="object-cover"
                />
              </div>

              <div className="flex w-full flex-col gap-12 md:w-auto">
                <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                  <TextoTitulo
                    collection="Alchemy"
                    piece="Wildfire Signet"
                    description="A bold crest of color and cut. Built to be worn daily—never delicate, always refined—like armor made for celebration."
                  />
                </div>

                <div className="relative h-[clamp(300px,72vw,540px)] w-full max-w-[420px] md:h-[clamp(300px,38vh,540px)] md:w-[clamp(220px,24vw,420px)]">
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
          <section className="flex-shrink-0 w-full  px-6 md:w-screen md:h-full md:min-h-0 md:px-12 xl:px-16">
            <div className="flex flex-col gap-10 py-12 md:h-full md:flex-row md:items-end md:justify-between md:gap-10 md:py-0 md:pb-16 xl:gap-20">
              <div className="relative h-[clamp(260px,52vw,540px)] w-full max-w-[860px] md:h-[clamp(260px,34vw,540px)] md:w-[clamp(380px,48vw,860px)]">
                <Image
                  src="/images/horizontal/Rectangle 16.png"
                  alt="Alchemy detail"
                  fill
                  sizes="860px"
                  className="object-cover"
                />
              </div>

              <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Alchemy"
                  piece="Verdant Pulse Ring"
                  description="A clean, modern frame for a vibrant center—cut to amplify color and set to move with you, from daylight to night."
                />
              </div>
            </div>
          </section>

          {/* Panel 7 */}
          <section className="flex-shrink-0 w-full  px-6 py-12 md:w-screen md:h-full md:min-h-0 md:px-12 md:py-16 xl:px-16">
            <div className="relative w-full flex flex-col gap-10 md:h-full md:block">
              <div className="relative md:absolute md:left-0 md:top-0">
                <div className="relative h-[clamp(180px,44vw,420px)] w-full max-w-[750px] md:h-[clamp(140px,24vw,420px)] md:w-[clamp(260px,38vw,750px)]">
                  <Image
                    src="/images/horizontal/Rectangle 19.png"
                    alt="Alchemy editorial"
                    fill
                    sizes="850px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative md:absolute md:bottom-0 md:right-0">
                <div className="relative h-[clamp(180px,44vw,420px)] w-full max-w-[750px] md:h-[clamp(140px,24vw,420px)] md:w-[clamp(260px,38vw,750px)]">
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
