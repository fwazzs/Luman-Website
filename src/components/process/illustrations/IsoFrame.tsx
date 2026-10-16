import type { JSX, ReactNode } from 'react';

interface IsoFrameProps {
  children: ReactNode;
}

/**
 * Appended to every animated SVG part: pause while the process list is off-screen
 * (PauseOffscreen sets data-offscreen on its `group`), and stop entirely under reduced motion.
 */
export const MOTION_GUARD =
  'group-data-[offscreen]:[animation-play-state:paused] motion-reduce:animate-none';

/** Staggered start offsets, in the canvas order d1–d4. */
export const DELAY = ['', '[animation-delay:600ms]', '[animation-delay:1200ms]', '[animation-delay:1800ms]', '[animation-delay:2400ms]'] as const;

/** Shared 240×150 frame for the phase illustrations: cotton hairlines, no fill. */
export default function IsoFrame({ children }: IsoFrameProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 240 150"
      width={240}
      height={150}
      aria-hidden="true"
      fill="none"
      stroke="#F7CACD"
      strokeWidth={1.2}
      className="max-w-full self-center"
    >
      {children}
    </svg>
  );
}
