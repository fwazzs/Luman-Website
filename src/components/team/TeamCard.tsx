import type { JSX } from 'react';
import Image from 'next/image';
import type { TeamMember } from '@/types';

interface TeamCardProps {
  member: TeamMember;
  /** Position in the row; staggers the scroll-in. */
  index: number;
  open: boolean;
  onOpen: () => void;
}

// Scroll-in stagger (inside <Reveal>). Delays apply to opacity/translate only, never to flex-grow,
// so opening a card on hover stays instant: the list lines up with transition-[flex-grow,opacity,translate].
const STAGGER = [
  '[transition-delay:0ms,0ms,0ms]',
  '[transition-delay:0ms,80ms,80ms]',
  '[transition-delay:0ms,160ms,160ms]',
  '[transition-delay:0ms,240ms,240ms]',
  '[transition-delay:0ms,320ms,320ms]',
  '[transition-delay:0ms,400ms,400ms]',
] as const;
const SCROLL_IN =
  'translate-y-10 opacity-0 group-data-[shown]/reveal:translate-y-0 group-data-[shown]/reveal:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100';

function initials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('');
}

/** One portrait in the accordion. Hover, focus and click all open it. */
export default function TeamCard({ member, index, open, onOpen }: TeamCardProps): JSX.Element {
  const { name, studentId, photo, focus, zoom, tint } = member;
  return (
    <button
      type="button"
      // The card toggles which member is featured; it controls no separate region, so pressed, not expanded.
      aria-pressed={open}
      onClick={onOpen}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      // Per-member data from site.ts: card tint.
      style={{ backgroundColor: tint }}
      className={`relative min-w-24 basis-0 cursor-pointer overflow-hidden rounded-3xl transition-[flex-grow,opacity,translate] duration-500 ease-out motion-reduce:transition-none ${SCROLL_IN} ${
        STAGGER[Math.min(index, STAGGER.length - 1)]
      } ${open ? 'grow-[3.5]' : 'grow'}`}
    >
      <span aria-hidden="true" className="bg-halftone absolute inset-0" />
      {photo ? (
        <Image
          src={photo}
          alt=""
          fill
          sizes="(min-width: 768px) 480px, 340px"
          className="object-cover"
          // Per-member data from site.ts: where the face sits, and how far to zoom into it.
          style={{ objectPosition: focus, transformOrigin: focus, transform: `scale(${zoom})` }}
        />
      ) : (
        <span
          aria-hidden="true"
          className={`absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-extrabold tracking-[-0.06em] text-white/90 transition-[font-size] duration-500 motion-reduce:transition-none ${
            open ? 'text-8xl' : 'text-4xl'
          }`}
        >
          {initials(name)}
        </span>
      )}
      {/* Always rendered so it names the button; visually shown only on the open card. */}
      <span
        className={
          open
            ? 'absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-b from-ink/0 to-ink/85 px-6 pt-12 pb-[22px] text-left'
            : 'sr-only'
        }
      >
        <span className="font-sans text-[26px] font-extrabold tracking-[-0.03em] text-white">{name}</span>
        <span className="text-[13px] tracking-[0.04em] text-cotton">Student ID {studentId}</span>
      </span>
    </button>
  );
}
