import type { JSX, ComponentType } from 'react';
import DocLinkRow from '@/components/process/DocLinkRow';
import DefineArt from '@/components/process/illustrations/DefineArt';
import EmpathizeArt from '@/components/process/illustrations/EmpathizeArt';
import IdeateArt from '@/components/process/illustrations/IdeateArt';
import PrototypeArt from '@/components/process/illustrations/PrototypeArt';
import ScrollUnroll from '@/components/process/ScrollUnroll';
import type { Phase, PhaseId } from '@/types';

interface PhaseCardProps {
  phase: Phase;
  /** Which side of the timeline the card sits on; it slides in from that side. */
  side: 'left' | 'right';
}

const ART: Partial<Record<PhaseId, ComponentType>> = {
  empathize: EmpathizeArt,
  define: DefineArt,
  ideate: IdeateArt,
  prototype: PrototypeArt,
};

// Scroll choreography:
// 1) the title box slides in from its timeline side when the card enters (in and out, via <Reveal>);
// 2) the content box slides down out of the title as the reader scrolls further (ScrollUnroll,
//    scrubbed by scroll, closing again on the way back up).
// The content always keeps its full height, so cards below never jump.
// Written out in full (no ${…} inside class names) so Tailwind's scanner generates every variant.
const SLIDE_IN = {
  right: 'translate-x-10 opacity-0 group-data-[shown]/reveal:translate-x-0 group-data-[shown]/reveal:opacity-100',
  left: '-translate-x-10 opacity-0 group-data-[shown]/reveal:translate-x-0 group-data-[shown]/reveal:opacity-100',
};

/** A Sui-style stack card: numbered title box, then illustration + summary on a spine and document links. */
export default function PhaseCard({ phase, side }: PhaseCardProps): JSX.Element {
  const Art = ART[phase.id];
  return (
    <article
      id={phase.id}
      className={`w-full max-w-[580px] scroll-mt-6 transition-[opacity,translate] reveal-ease motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${SLIDE_IN[side]}`}
    >
      <header className="relative z-10 flex items-center gap-3.5 border border-cotton/25 bg-ink-raised px-5 py-3.5">
        <span className="flex size-[34px] flex-none items-center justify-center border border-cotton/45 bg-ink-raised text-sm">{phase.number}</span>
        <h3 className="min-w-0 flex-auto text-[15px] font-bold text-white">{phase.title}</h3>
        <span className="border border-cotton/45 px-2 py-1 text-xs tracking-[0.06em]">{phase.status}</span>
      </header>

      <ScrollUnroll>
        <div className="border-x border-b border-cotton/25 bg-ink-raised">
          <div className="relative flex flex-col gap-4 py-6 pr-6 pb-7 pl-16">
            <span aria-hidden="true" className="absolute inset-y-0 left-9 w-px bg-cotton/35" />
            {Art && <Art />}

            {phase.statement && (
              <p className="font-sans text-lg leading-[1.4] font-bold text-white">
                {phase.statement.before}
                <span className="text-rose-text">{phase.statement.highlight}</span>
                {phase.statement.after}
              </p>
            )}

            {phase.funnel && (
              <p className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5 font-sans text-white">
                {phase.funnel.map((step, i, steps) => {
                  const last = i === steps.length - 1;
                  return (
                    <span key={step} className="contents">
                      <span className={`text-[28px] font-extrabold tracking-[-0.04em] ${last ? 'text-rose-text' : ''}`}>{step}</span>
                      {!last && <span aria-hidden="true" className="text-cotton/72">→</span>}
                    </span>
                  );
                })}
              </p>
            )}

            {phase.summary && <p className="font-sans text-[17px] leading-[1.55]">{phase.summary}</p>}

            {phase.quote && (
              <blockquote className="font-sans text-[17px] leading-normal text-white italic">
                “{phase.quote.text}”{' '}
                <cite className="font-mono text-xs text-cotton/72 not-italic">— {phase.quote.author}</cite>
              </blockquote>
            )}

            {phase.chips && (
              <ul aria-label="Interviewees" className="flex flex-wrap gap-1.5 text-xs tracking-[0.04em]">
                {phase.chips.map((chip) => (
                  <li key={chip} className="border border-cotton/30 px-2 py-1">
                    {chip}
                  </li>
                ))}
              </ul>
            )}

            {phase.points && (
              <ul className="flex flex-col gap-2 font-sans text-[15px] leading-normal">
                {phase.points.map((point) => (
                  <li key={point.text}>
                    <span className="font-mono text-xs text-rose-text">{point.label}</span>
                    {point.text}
                  </li>
                ))}
              </ul>
            )}

            {phase.parts && (
              <ul className="flex flex-col gap-px border border-cotton/18 bg-cotton/18 font-sans text-[15px] leading-[1.45]">
                {phase.parts.map((part) => (
                  <li key={part.name} className="bg-ink-raised px-3.5 py-3">
                    <b className="text-white">{part.name}</b> · {part.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col border-t border-cotton/18 pr-5 pb-3.5 pl-9">
            {phase.links.map((link) => (
              <DocLinkRow key={link.label} link={link} />
            ))}
          </div>
        </div>
      </ScrollUnroll>
    </article>
  );
}
