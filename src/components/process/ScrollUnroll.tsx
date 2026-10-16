'use client';

import { useEffect, useRef, type JSX, type ReactNode } from 'react';
import { unrollProgress } from '@/lib/scrollProgress';

interface ScrollUnrollProps {
  children: ReactNode;
}

/**
 * A drawer that slides a phase card's content down out from behind its title, scrubbed by scroll:
 * it opens as the reader scrolls a little past the title and slides back up when scrolling back.
 * The frame keeps the content's full height the whole time (only a transform moves inside it), so
 * cards below never jump. Work runs only while the frame is near the viewport, and the transform is
 * written through the ref (no React re-render). Reduced motion shows it fully open.
 */
export default function ScrollUnroll({ children }: ScrollUnrollProps): JSX.Element {
  const frameRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameEl = frameRef.current;
    const drawer = drawerRef.current;
    if (!frameEl || !drawer) return;
    const draw = (progress: number): void => {
      drawer.style.transform = `translateY(${((progress - 1) * 100).toFixed(2)}%)`;
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(1);
      return;
    }

    let raf: number | null = null;
    const update = (): void => {
      raf = null;
      draw(unrollProgress(frameEl.getBoundingClientRect().top, window.innerHeight));
    };
    const onScroll = (): void => {
      if (raf === null) raf = requestAnimationFrame(update);
    };
    const listen = (on: boolean): void => {
      const method = on ? 'addEventListener' : 'removeEventListener';
      window[method]('scroll', onScroll, { passive: true });
      window[method]('resize', onScroll);
    };
    // A generous margin so the last update before leaving the screen is never skipped.
    const observer = new IntersectionObserver(
      ([entry]) => {
        listen(entry.isIntersecting);
        onScroll();
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(frameEl);
    update();
    return () => {
      observer.disconnect();
      listen(false);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={frameRef} className="overflow-hidden">
      {/* Starts tucked behind the title; raw `transform` because JS writes the same property. */}
      <div ref={drawerRef} className="[transform:translateY(-100%)] motion-reduce:[transform:none]">
        {children}
      </div>
    </div>
  );
}
