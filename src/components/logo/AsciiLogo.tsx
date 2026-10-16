'use client';

import { useEffect, useRef, type JSX } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ASCII_START_ANGLE, lumenFrame, type AsciiFrame } from '@/lib/lumenAscii';

interface AsciiLogoProps {
  /** The resting frame, rendered on the server so nothing is computed before the logo is on screen. */
  initial: AsciiFrame;
}

const SPIN_RAD_PER_SEC = 1; // canvas: +0.06 rad every 60ms
const FRAME_MS = 1000 / 30; // the look of the canvas (~16fps) at a fraction of display refresh
const PRE = 'm-0 font-mono text-[clamp(4.5px,1.9vw,11px)] leading-none font-bold tracking-normal';

/**
 * donut.c-style 3D ASCII Lumen mark that spins on its own while it is on screen.
 * It stops off-screen and under reduced motion (which shows the resting frame). Frames are written straight into the two <pre> elements,
 * so React never re-renders per frame; the angle is kept, so it resumes where it stopped.
 */
export default function AsciiLogo({ initial }: AsciiLogoProps): JSX.Element {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLPreElement>(null);
  const dotsRef = useRef<HTMLPreElement>(null);
  const angle = useRef(ASCII_START_ANGLE);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return;

    let raf: number | null = null;
    const stop = (): void => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };
    const start = (): void => {
      if (raf !== null) return;
      let last = performance.now();
      const tick = (now: number): void => {
        raf = requestAnimationFrame(tick);
        if (now - last < FRAME_MS) return;
        angle.current += ((now - last) / 1000) * SPIN_RAD_PER_SEC;
        last = now;
        const frame = lumenFrame(angle.current);
        if (ringRef.current) ringRef.current.textContent = frame.ring;
        if (dotsRef.current) dotsRef.current.textContent = frame.dots;
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduced]);

  return (
    <div ref={rootRef} role="img" aria-label="Lumen logo" className="relative max-w-full flex-none">
      <pre ref={ringRef} aria-hidden="true" className={`${PRE} text-cotton`}>
        {initial.ring}
      </pre>
      <pre ref={dotsRef} aria-hidden="true" className={`${PRE} absolute inset-0 text-rose`}>
        {initial.dots}
      </pre>
    </div>
  );
}
