import type { JSX } from 'react';
import HeroVideo from '@/components/hero/HeroVideo';
import { SITE } from '@/data/site';

export default function HeroSection(): JSX.Element {
  const { headline, tagline, video } = SITE.hero;
  return (
    <section id="top" className="relative flex min-h-[760px] items-center justify-center overflow-hidden">
      <HeroVideo webm={video.webm} mp4={video.mp4} poster={video.poster} />
      <div aria-hidden="true" className="bg-hero-scrim absolute inset-0" />
      <div className="relative flex w-full max-w-[1100px] flex-col items-center gap-7 px-6 py-[120px] text-center">
        <h1 className="w-[1202px] max-w-full font-sans text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.06em] text-balance text-white">
          {headline[0]}
          <br />
          {headline[1]}
        </h1>
        {/* The headline is the LCP element, so it renders immediately; only the tagline fades in after it. */}
        <p className="-mt-2 animate-fade-up text-[clamp(0.95rem,1.4vw,1.15rem)] font-medium tracking-[0.14em] text-candy uppercase [animation-delay:300ms] motion-reduce:animate-none">
          {tagline}
        </p>
      </div>
    </section>
  );
}
