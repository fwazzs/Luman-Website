import { describe, expect, it } from 'vitest';
import { scrollProgress, unrollProgress } from './scrollProgress';

describe('scrollProgress', () => {
  it('is 0 before the reading line reaches the element', () => {
    expect(scrollProgress(800, 1000, 500)).toBe(0);
  });
  it('tracks the reading line through the element', () => {
    expect(scrollProgress(0, 1000, 500)).toBe(0.5);
    expect(scrollProgress(-250, 1000, 500)).toBe(0.75);
  });
  it('clamps to 1 once the line is past the bottom', () => {
    expect(scrollProgress(-2000, 1000, 500)).toBe(1);
  });
  it('treats an empty element as complete', () => {
    expect(scrollProgress(0, 0, 500)).toBe(1);
  });
});

describe('unrollProgress (viewport 1000px: starts at 800, ends at 400)', () => {
  it('stays closed while the body top is below 80% of the viewport', () => {
    expect(unrollProgress(1200, 1000)).toBe(0);
    expect(unrollProgress(800, 1000)).toBe(0);
  });
  it('opens with scroll between 80% and 40%', () => {
    expect(unrollProgress(600, 1000)).toBeCloseTo(0.5);
    expect(unrollProgress(500, 1000)).toBeCloseTo(0.75);
  });
  it('is fully open from 40% upward', () => {
    expect(unrollProgress(400, 1000)).toBe(1);
    expect(unrollProgress(-300, 1000)).toBe(1);
  });
});
