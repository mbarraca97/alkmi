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
  light,
}: {
  collection?: string;
  piece: string;
  description: string;
  light?: boolean;
}) {
  const color = light ? '#D9DFC6' : '#474C2C';
  return (
    <div className="text-left">
      {collection && (
        <h3 className="font-title font-normal text-[43px] leading-[1.02] md:text-[clamp(56px,5.6vw,110px)]" style={{ color }}>
          {collection}
        </h3>
      )}
      <h4 className={`font-title font-normal text-[25px] leading-[1.05] mb-[clamp(16px,2.1vw,30px)] md:text-[clamp(32px,3.2vw,64px)]${collection ? ' mt-[clamp(16px,2.1vw,30px)]' : ''}`} style={{ color }}>
        {piece}
      </h4>
      <p className="font-content font-light text-[10px] leading-[1.55] max-w-[160px] md:text-[clamp(16px,1.35vw,24px)] md:max-w-[min(620px,42vw)] whitespace-pre-line" style={{ color: light ? 'rgba(217,223,198,0.9)' : 'rgba(71,76,44,0.9)' }}>
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

        // Recalculate once all images are loaded so dimensions are correct.
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
          {/* Panel 0 — Hero */}
          <section className="relative flex-shrink-0 w-full overflow-hidden md:w-screen md:h-full md:min-h-0" style={{ minHeight: 'clamp(520px, 100vh, 1080px)' }}>
            <Image
              src="/images/horizontal/alchemy-collection-hero.jpg"
              alt="Alchemy Collection"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            {/* subtle dark gradient on the left so text stays legible */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
            <div className="relative z-10 flex h-full items-center px-6 py-12 md:px-16 xl:px-24">
              <div className="text-left w-full max-w-[480px] md:max-w-[min(540px,38vw)] mt-[300px]">
                <h4 className="font-title font-normal text-[19px] leading-[1.05] text-[#D9DFC6] mb-[clamp(10px,1.1vw,16px)] md:text-[clamp(22px,2.6vw,42px)]">
                  Alkmi Collection
                </h4>
                <p className="font-content font-light text-[14px] leading-[1.55] text-[#D9DFC6]/90 whitespace-pre-line md:text-[clamp(14px,1vw,16px)]">
                  {`Inspired by the ancient art of alchemy, our collections reflect ALKMI's devotion to transformation and refined design. Crafted in 18K yellow gold and adorned with multi-shaped colored gemstones and natural diamonds, each piece is a bold statement of personal expression.\n\nA whisper of a light green detail in the setting adds a modern and innovative signature touch to every jewel, a subtle yet striking detail that brings a contemporary twist to tradition.`}
                </p>
              </div>
            </div>
          </section>

          {/* Panel 1 */}
          <section className="flex-shrink-0 w-full px-6 py-12 md:w-screen md:h-full md:min-h-0 md:px-12 md:py-12 xl:px-16">
            <div className="flex h-full flex-col gap-10 md:flex-row md:items-center md:justify-center xl:gap-20">
              <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Selene "
                  piece=""
                  description="A luminous collection centered around tanzanite, Selene captures
a quiet elegance with cool, celestial tones and a refined sense of
mystery."    />
              </div>

              <div className="flex w-full flex-row gap-4 md:w-auto">
                <div className="relative h-[250px] w-full max-w-[400px] md:h-[clamp(550px,600px,800px)] md:w-[clamp(260px,34vw,700px)]">
                  <Image
                    src="images/horiz/1-1.jpg"
                    alt="Alchemy collection"
                    fill
                    sizes="(max-width: 767px) 50vw, 800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative h-[250px] w-full max-w-[400px] md:h-[clamp(550px,600px,800px)] md:w-[clamp(260px,34vw,700px)]">
                  <Image
                    src="images/horiz/1-2.jpg"
                    alt="Alchemy collection"
                    fill
                    sizes="(max-width: 767px) 50vw, 800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </section>

       {/* Panel 2 */}
       <section className="flex-shrink-0 w-full px-6 py-12 md:w-screen md:h-full md:min-h-0 md:px-12 md:py-12 xl:px-16">
            <div className="flex h-full flex-col gap-10 md:flex-row md:items-center md:justify-center xl:gap-20">
              <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)] md:ml-[60px]">
                <TextoTitulo
                  collection="Aurea"
                  piece=" "
                  description="Defined by the soft glow of pink tourmaline, Aura is a delicate yet
expressive collection that brings warmth, femininity, and light to
every piece."    />
              </div>

              <div className="flex w-full flex-row gap-4 md:w-auto">
                <div className="relative h-[180px] w-full max-w-[400px] md:h-[clamp(250px,300px,400px)] md:w-[clamp(250px,300px,400px)]">
                  <Image
                    src="images/horiz/2-1.jpg"
                    alt="Alchemy collection"
                    fill
                    sizes="(max-width: 767px) 50vw, 800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative h-[280px] w-full max-w-[400px] md:h-[clamp(550px,600px,800px)] md:w-[clamp(260px,34vw,700px)]">
                  <Image
                    src="images/horiz/2-2.jpg"
                    alt="Alchemy collection"
                    fill
                    sizes="(max-width: 767px) 50vw, 800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Panel 3 */}
          <section className="flex-shrink-0 w-full px-6 py-12 md:w-screen md:h-full md:min-h-0 md:px-12 md:py-12 xl:px-16">
            <div className="flex h-full flex-col gap-10 md:flex-row md:items-center md:justify-center xl:gap-20">
              <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Terra"
                  piece=" "
                  description="With medium teal sapphire at its heart, Terra reflects depth, balance,
and a grounded beauty inspired by the richness of the natural world."  />
              </div>

              <div className="flex w-full flex-col gap-4 md:w-auto">
                <div className="relative h-[160px] w-full max-w-[800px] md:h-[clamp(150px,300px,400px)] md:w-[clamp(550px,700px,800px)]">
                  <Image
                    src="images/horiz/3-1.jpg"
                    alt="Alchemy collection"
                    fill
                    sizes="(max-width: 767px) 100vw, 800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative h-[160px] w-full max-w-[800px] md:h-[clamp(150px,300px,400px)] md:w-[clamp(550px,700px,800px)]">
                  <Image
                    src="images/horiz/3-2.jpg"
                    alt="Alchemy collection"
                    fill
                    sizes="(max-width: 767px) 100vw, 800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </section>

               {/* Panel 4 */}
               <section className="flex-shrink-0 w-full px-6 py-12 md:w-screen md:h-full md:min-h-0 md:px-12 md:py-12 xl:px-16">
            <div className="flex h-full flex-col gap-10 md:flex-row md:items-center md:justify-center xl:gap-20">
         

              <div className="flex w-full flex-col gap-6 md:w-auto">
                <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                  <TextoTitulo
                    collection="Riva"
                    piece=""
                    description="A striking collection shaped by the timeless intensity of blue sapphires
and aquamarines, Riva embodies clarity, confidence, and understated
sophistication."/>
                </div>

                <div className="relative h-[clamp(300px,72vw,540px)] w-full max-w-[420px] md:h-[clamp(250px,300px,450px)] md:w-[clamp(250px,300px,450px)]">
                  <Image
                    src="images/horiz/4-1.jpg"
                    alt="Wildfire Signet detail"
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative h-[clamp(520px,92vw,1000px)] w-full max-w-[950px] md:h-[clamp(550px,620px,800px)] md:w-[clamp(550px,620px,800px)]">
                <Image
                    src="images/horiz/4-2.jpg"
                    alt="Alchemy Editorial"
                  fill
                  sizes="950px"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Panel 5 */}
          <section className="flex-shrink-0 w-full px-6 py-12 md:w-screen md:h-full md:min-h-0 md:px-12 md:py-12 xl:px-16">
            <div className="flex h-full flex-col gap-10 md:flex-row md:items-center md:justify-between xl:gap-20">
         

              <div className="flex w-full flex-col gap-12 md:w-auto">
                <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                  <TextoTitulo
                    collection="Hera"
                    piece=""
                    description="A striking collection shaped by the timeless intensity of blue sapphires
and aquamarines, Riva embodies clarity, confidence, and understated
sophistication."   />
                </div>

                <div className="relative h-[clamp(300px,72vw,540px)] w-full max-w-[420px] md:h-[clamp(300px,38vh,540px)] md:w-[clamp(220px,24vw,420px)]">
                  <Image
                    src="images/horiz/5-1.jpg"
                    alt="Wildfire Signet detail"
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative h-[clamp(520px,92vw,1000px)] w-full max-w-[950px] md:h-[clamp(520px,74vh,1000px)] md:w-[clamp(420px,52vw,950px)]">
                <Image
                    src="images/horiz/5-2.jpg"
                    alt="Alchemy Editorial"
                  fill
                  sizes="950px"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Panel 6 */}
          <section className="flex-shrink-0 w-full px-6 py-12 md:w-screen md:h-full md:min-h-0 md:px-12 md:py-12 xl:px-16">
            <div className="flex h-full flex-col gap-10 md:flex-row md:items-center md:justify-center xl:gap-20">
              <div className="w-full max-w-[650px] md:max-w-[min(650px,44vw)]">
                <TextoTitulo
                  collection="Asteria"
                  piece=""
                  description="Asteria is a necklace-only collection that brings together all the
signature tones of the brand, creating a radiant expression of
harmony, light, and versatility."    />
              </div>

              <div className="flex w-full flex-row gap-4 md:w-auto">
                <div className="relative h-[250px] w-full max-w-[400px] md:h-[clamp(550px,600px,800px)] md:w-[clamp(260px,34vw,700px)]">
                  <Image
                    src="images/horiz/TOM07900-2.jpg"
                    alt="Alchemy collection"
                    fill
                    sizes="(max-width: 767px) 50vw, 800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative h-[250px] w-full max-w-[400px] md:h-[clamp(550px,600px,800px)] md:w-[clamp(260px,34vw,700px)]">
                  <Image
                    src="images/horiz/TOM07924-4.jpg"
                    alt="Alchemy collection"
                    fill
                    sizes="(max-width: 767px) 50vw, 800px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </section>

      

          {/* Panel 8 — Video */}
          <section className="flex-shrink-0 w-full px-6 py-12 md:w-screen md:h-full md:min-h-0 md:px-12 md:py-12 xl:px-16" style={{ backgroundColor: '#686C52' }}>
            <div className="flex h-full items-center justify-center">
              {/* Desktop */}
              <video
                className="hidden w-full max-w-[1228px] md:block"
                style={{ aspectRatio: '1228 / 698', objectFit: 'cover' }}
                src="/video/alkmi-horizontal.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Mobile */}
              <video
                className="block w-full md:hidden"
                style={{ aspectRatio: '9 / 16', objectFit: 'cover', maxHeight: '80vh' }}
                src="/video/alkmi-vertical.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
