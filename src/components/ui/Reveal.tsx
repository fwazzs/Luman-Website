'use client';

import { useEffect, useRef, type JSX, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Share of the element that must be visible before it animates in. */
  threshold?: number;
  /** Animate in once and stay; no out animation when scrolled away. */
  once?: boolean;
}

/**
 * Scroll reveal, in and out. Sets data-shown while the element is in view; children animate with
 * Tailwind's named group: `group-data-[shown]/reveal:…`. The attribute is written through the ref,
 * so scrolling never re-renders React. Reduced motion is handled by `motion-reduce:` classes on the
 * children, which show the final state.
 */
export default function Reveal({ children, className, threshold = 0.2, once = false }: RevealProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (!entry.isIntersecting) return;
          el.setAttribute('data-shown', '');
          observer.disconnect();
          return;
        }
        el.toggleAttribute('data-shown', entry.isIntersecting);
      },
      // Trigger a little before the bottom edge so the motion is seen, not finished off-screen.
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div ref={ref} className={`group/reveal ${className ?? ''}`}>
      {children}
    </div>
  );
}
