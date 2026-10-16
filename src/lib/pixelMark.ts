// The Lumen mark sampled onto a pixel grid, ported from design/canvas/DotMark.dc.html (shape="pixel").
// Geometry lives in a 48×48 box: an open ring (gap from -75° to -15°, screen y down) with round caps,
// a core dot and a spark dot in the gap.

export interface PixelCell {
  x: number;
  y: number;
  /** true = core/spark (rose), false = ring (cotton). */
  accent: boolean;
}

const RING = 1;
const ACCENT = 2;

function region(x: number, y: number): number {
  if (Math.hypot(x - 24, y - 24) <= 6) return ACCENT;
  if (Math.hypot(x - 35.3, y - 12.7) <= 3) return ACCENT;
  const r = Math.hypot(x - 24, y - 24);
  const a = (Math.atan2(y - 24, x - 24) * 180) / Math.PI;
  if (r >= 13.5 && r <= 18.5 && !(a > -75 && a < -15)) return RING;
  for (const deg of [-15, -75]) {
    const cx = 24 + 16 * Math.cos((deg * Math.PI) / 180);
    const cy = 24 + 16 * Math.sin((deg * Math.PI) / 180);
    if (Math.hypot(x - cx, y - cy) <= 2.5) return RING;
  }
  return 0;
}

/** Cells covered at least 45% by the mark on an n×n grid (4×4 supersampling per cell). */
export function pixelMark(n: number): PixelCell[] {
  const step = 48 / n;
  const sub = 4;
  const cells: PixelCell[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let hit = 0;
      let kind = 0;
      for (let a = 0; a < sub; a++) {
        for (let b = 0; b < sub; b++) {
          const k = region((j + (b + 0.5) / sub) * step, (i + (a + 0.5) / sub) * step);
          if (k) {
            hit++;
            kind = Math.max(kind, k);
          }
        }
      }
      if (hit / (sub * sub) >= 0.45) cells.push({ x: j, y: i, accent: kind === ACCENT });
    }
  }
  return cells;
}
