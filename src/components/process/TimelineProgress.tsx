'use client';

import { useEffect, useRef, type JSX } from 'react';
import { scrollProgress } from '@/lib/scrollProgress';

const MARKER_HALF = 6; // the white square is 12px; its centre sits on the line's tip

/**
 * The rose progress line over the dotted spine, with the white square riding on its tip (like sui.io).
 * Both follow the reading position (60% down the viewport). Work runs only while the timeline is on
 * screen, and transforms are written through refs, so React never re-renders on scroll.
 * Reduced motion shows the finished state: full line, square at the end.
 */
export default function TimelineProgress(): JSX.Element {
  const trackRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    const marker = markerRef.current;
    if (!track || !line || !marker) return;

    const draw = (progress: number): void => {
      line.style.transform = `scaleY(${progress})`;
      marker.style.transform = `translateY(${progress * track.offsetHeight - MARKER_HALF}px)`;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(1);
      return;
    }

    let frame: number | null = null;
    const update = (): void => {
      frame = null;
      // The track itself is never transformed, so its box is the line's full, untransformed extent.
      const rect = track.getBoundingClientRect();
      draw(scrollProgress(rect.top, rect.height, window.innerHeight * 0.6));
    };
    const onScroll = (): void => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    const listen = (on: boolean): void => {
      const method = on ? 'addEventListener' : 'removeEventListener';
      window[method]('scroll', onScroll, { passive: true });
      window[method]('resize', onScroll);
    };
    const observer = new IntersectionObserver(([entry]) => {
      listen(entry.isIntersecting);
      if (entry.isIntersecting) onScroll();
    });
    observer.observe(track);
    update();
    return () => {
      observer.disconnect();
      listen(false);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={trackRef} aria-hidden="true" className="absolute top-12 bottom-40 left-[calc(50%-6px)] hidden w-3 md:block">
      {/* Initial state as raw `transform`, the same property JS writes. Tailwind's scale-y-* and translate-y-*
          use the separate `scale`/`translate` properties, which would stack on top of it. */}
      <span ref={lineRef} className="absolute inset-y-0 left-[5px] w-0.5 origin-top bg-rose [transform:scaleY(0)]" />
      <span ref={markerRef} className="absolute top-0 left-0 size-3 bg-white [transform:translateY(-6px)]" />
    </span>
  );
}
