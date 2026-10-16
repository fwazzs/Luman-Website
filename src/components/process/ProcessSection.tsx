import type { JSX } from 'react';
import PauseOffscreen from '@/components/process/PauseOffscreen';
import PhaseCard from '@/components/process/PhaseCard';
import TimelineProgress from '@/components/process/TimelineProgress';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/data/site';
import { REVEAL_UP } from '@/lib/revealClasses';

export default function ProcessSection(): JSX.Element {
  const { heading, phases } = SITE.process;
  const visible = phases.filter((phase) => phase.visible);

  return (
    // overflow-x-clip: cards wait 40px off to their side before sliding in, which must not widen the page.
    <section id="process" className="overflow-x-clip border-b border-cotton/18">
      <Reveal className="mx-auto flex max-w-[1280px] flex-col items-center px-6 pt-24 pb-6 text-center">
        <h2
          className={`max-w-[760px] font-sans text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.05em] text-balance text-white ${REVEAL_UP}`}
        >
          {heading}
        </h2>
      </Reveal>

      <div className="relative mx-auto max-w-[1280px] px-6 pt-12 pb-[120px]">
        {/* Timeline: dotted spine, plus the rose progress line with the white square riding on its tip. */}
        <span aria-hidden="true" className="absolute top-0 bottom-[120px] left-1/2 hidden border-l-2 border-dotted border-cotton/35 md:block" />
        <TimelineProgress />

        <PauseOffscreen className="relative">
          <ol className="flex flex-col gap-16 md:gap-24">
            {visible.map((phase, i) => {
              const side = i % 2 === 0 ? 'right' : 'left';
              return (
                <li key={phase.id}>
                  {/* A low threshold brings the title in early, leaving a beat of scroll before the drawer opens. */}
                  <Reveal threshold={0.02} className={`flex justify-center ${side === 'right' ? 'md:justify-end' : 'md:justify-start'}`}>
                    <PhaseCard phase={phase} side={side} />
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </PauseOffscreen>
      </div>
    </section>
  );
}
