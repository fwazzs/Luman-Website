import type { JSX } from 'react';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/data/site';
import { REVEAL_UP, REVEAL_UP_LATE } from '@/lib/revealClasses';

export default function AboutSection(): JSX.Element {
  const { heading, problemLabel, problem, povLabel, pov } = SITE.about;
  return (
    <section id="about" className="border-b border-cotton/18">
      <Reveal className="mx-auto max-w-[1280px] px-6 pt-24">
        <h2 className={`font-sans text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.045em] text-white ${REVEAL_UP}`}>{heading}</h2>
      </Reveal>
      <Reveal className="mx-auto mt-10 flex max-w-[1280px] flex-wrap border-t border-cotton/18">
        <div className={`flex min-w-0 flex-[1_1_400px] flex-col gap-[18px] border-cotton/18 px-6 pt-12 pb-14 md:border-r md:pr-8 ${REVEAL_UP}`}>
          <span className="text-[13px] tracking-[0.06em] text-cotton/72">{problemLabel}</span>
          <p className="max-w-[62ch] font-sans text-lg leading-[1.6]">{problem}</p>
        </div>
        <div
          className={`flex min-w-0 flex-[1_1_400px] flex-col gap-[18px] border-t border-cotton/18 px-6 pt-12 pb-14 md:border-t-0 md:pl-8 ${REVEAL_UP_LATE}`}
        >
          <span className="text-[13px] tracking-[0.06em] text-rose-text">{povLabel}</span>
          <p className="font-sans text-[clamp(1.3rem,2.4vw,1.75rem)] leading-[1.3] font-bold tracking-[-0.02em] text-balance text-white">
            {pov.before}
            <span className="text-rose-text">{pov.highlight}</span>
            {pov.after}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
