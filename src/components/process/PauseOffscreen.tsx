'use client';

import { type JSX, useEffect, useRef, type ReactNode } from 'react';

interface PauseOffscreenProps {
  children: ReactNode;
  className?: string;
}

/**
 * Marks its subtree with data-offscreen while it is out of view. It is a Tailwind `group`, so the
 * illustrations' `group-data-[offscreen]:` classes pause and off-screen SVGs stop repainting.
 */
export default function PauseOffscreen({ children, className }: PauseOffscreenProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      el.toggleAttribute('data-offscreen', !entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // Starts paused; the observer fires on mount and un-pauses it if the section is in view.
    <div ref={ref} data-offscreen="" className={`group ${className ?? ''}`}>
      {children}
    </div>
  );
}
