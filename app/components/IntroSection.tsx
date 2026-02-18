'use client';

import Image from 'next/image';

export default function IntroSection() {
  return (
    <section className="w-full bg-[#767b5c]">
      <div className="mx-auto w-full max-w-6xl px-8">
        <div className="flex flex-col items-center">
          <div className="mt-[120px]">
            <Image
              src="/images/Logo.png"
              alt="Alkmi logo"
              width={156}
              height={156}
              priority
            />
          </div>


          <h1 className="font-title font-normal text-[94px] leading-[1.05] text-[#30331D] text-center my-[40px]">
            The Art of Color
            <br />
            The Spirit of Luxury
          </h1>

          <div className="mt-[40px]">
            <Image
              src="/images/first.png"
              alt="Alkmi logo"
              width={535}
              height={677}
              priority
            />
          </div>
        </div>

        <div className="pb-24 pt-24">
          <p className="font-title font-normal text-[54px] leading-[1.15] text-[#D9DFC6] text-left">
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

