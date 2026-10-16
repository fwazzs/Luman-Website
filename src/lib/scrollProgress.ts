/**
 * How far a reading line has travelled down an element, from 0 (line above the element's top)
 * to 1 (line past its bottom). `top` and `height` come from getBoundingClientRect; `readingLine`
 * is a y offset in the viewport, e.g. 60% of window.innerHeight.
 */
export function scrollProgress(top: number, height: number, readingLine: number): number {
  if (height <= 0) return 1;
  return Math.min(1, Math.max(0, (readingLine - top) / height));
}

/** Where a phase body starts and finishes unrolling, as fractions of the viewport height. */
export const UNROLL_START = 0.8;
export const UNROLL_END = 0.4;

/**
 * Scroll-scrubbed unroll of a phase card body (0 = hidden under the title, 1 = fully open).
 * It starts once the body's top edge rises past 80% of the viewport (the title is already in
 * view by then) and finishes when that edge reaches 40%, so the content slides down out of the
 * title as the reader scrolls a little further, and closes again when scrolling back up.
 */
export function unrollProgress(bodyTop: number, viewportHeight: number): number {
  const start = viewportHeight * UNROLL_START;
  const end = viewportHeight * UNROLL_END;
  return Math.min(1, Math.max(0, (start - bodyTop) / (start - end)));
}
