'use client';

import { type JSX, useState } from 'react';
import TeamCard from '@/components/team/TeamCard';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/data/site';
import { REVEAL_UP } from '@/lib/revealClasses';

export default function TeamSection(): JSX.Element {
  const { heading, members, defaultOpen } = SITE.team;
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  return (
    <section id="team" className="border-b border-cotton/18">
      <Reveal className="mx-auto max-w-[1280px] px-6 pt-24 pb-10">
        <h2 className={`font-sans text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.045em] text-white ${REVEAL_UP}`}>{heading}</h2>
      </Reveal>
      <Reveal threshold={0.3} className="mx-auto max-w-[1280px] overflow-x-auto px-6 pb-24">
        <div role="group" aria-label="Team members" className="flex h-[520px] min-w-[880px] gap-3 md:min-w-[640px]">
          {members.map((member, i) => (
            <TeamCard key={member.studentId} member={member} index={i} open={i === openIndex} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
