'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type JSX } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroVideoProps {
  webm: string;
  mp4: string | null;
  poster: string;
}

/**
 * Decorative looping background. The poster is a priority image underneath (it is the LCP element),
 * and the video plays on top of it once the page is idle. It pauses when scrolled away; reduced
 * motion keeps only the poster.
 */
export default function HeroVideo({ webm, mp4, poster }: HeroVideoProps): JSX.Element {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false); // page loaded and idle
  const [visible, setVisible] = useState(true);

  // Wait for load + idle so the video doesn't compete with the first paint; the poster covers the gap.
  useEffect(() => {
    const hasIdle = typeof window.requestIdleCallback === 'function'; // Safari has none
    const markReady = (): void => setReady(true);
    let handle: number | null = null;
    const onLoad = (): void => {
      handle = hasIdle ? window.requestIdleCallback(markReady, { timeout: 2000 }) : window.setTimeout(markReady, 200);
    };
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    return () => {
      window.removeEventListener('load', onLoad);
      if (handle === null) return;
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !ready) return;
    if (!visible) {
      video.pause();
      return;
    }
    // The muted attribute from the server HTML isn't always honoured; browsers only autoplay muted video.
    video.muted = true;
    video.preload = 'auto';
    video.play().catch(() => {
      /* autoplay refused (e.g. data saver): the poster stays visible */
    });
  }, [ready, visible, reduced]);

  return (
    <>
      <Image src={poster} alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover" />
      {!reduced && (
        <video
          ref={ref}
          aria-hidden="true"
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={webm} type="video/webm" />
          {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
      )}
    </>
  );
}
