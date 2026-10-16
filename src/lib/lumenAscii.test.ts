import { describe, expect, it } from 'vitest';
import { ASCII_COLS, ASCII_ROWS, lumenFrame } from './lumenAscii';

const rows = (layer: string): string[] => layer.split('\n').slice(0, -1);

describe('lumenFrame', () => {
  it('returns two 72×36 layers that never overlap', () => {
    const { ring, dots } = lumenFrame(0.6);
    for (const layer of [ring, dots]) {
      expect(rows(layer)).toHaveLength(ASCII_ROWS);
      for (const row of rows(layer)) expect(row).toHaveLength(ASCII_COLS);
    }
    for (let i = 0; i < ring.length; i++) {
      if (ring[i] !== ' ' && ring[i] !== '\n') expect(dots[i]).toBe(' ');
    }
  });

  it('draws the core sphere in the dots layer at the center', () => {
    const { ring, dots } = lumenFrame(0);
    const center = rows(dots)[ASCII_ROWS / 2][ASCII_COLS / 2];
    expect(center).not.toBe(' ');
    expect(rows(ring)[ASCII_ROWS / 2][ASCII_COLS / 2]).toBe(' ');
  });

  it('leaves the ring gap open at the upper right when facing the viewer', () => {
    const { ring } = lumenFrame(0);
    // Sample the ring path at 45°, inside the gap: radius 2 in model space ≈ 21 columns and 5 rows at this scale.
    const r = rows(ring);
    const x = ASCII_COLS / 2 + 15;
    const y = ASCII_ROWS / 2 - 8;
    expect(r[y][x]).toBe(' ');
    // The opposite side (225°) is solid ring.
    expect(r[ASCII_ROWS / 2 + 8][ASCII_COLS / 2 - 15]).not.toBe(' ');
  });

  it('changes with the angle', () => {
    expect(lumenFrame(0).ring).not.toBe(lumenFrame(1).ring);
  });
});
