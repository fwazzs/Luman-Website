// donut.c-style ASCII render of the Lumen mark, ported from the canvas (design/lumen-ascii.reference.js).
// An open torus with a gap at the upper right and rounded ends, plus a core sphere and a spark sphere
// in the gap. Ring and dots come back as two text layers so they can be coloured cotton and rose.

export const ASCII_COLS = 72;
export const ASCII_ROWS = 36;
/** Resting angle (radians) shown before the first hover. */
export const ASCII_START_ANGLE = 0.6;

const RAMP = '.,-~:;=!*#$@';
const R2 = 2; // ring radius
const R1 = 0.55; // tube radius
const K2 = 7; // viewer distance
const K1 = (ASCII_COLS * K2 * 3) / (8 * (R2 + R1 + 0.4));
const RING = 1;
const DOT = 2;

export interface AsciiFrame {
  ring: string;
  dots: string;
}

/** Renders the mark rotated by angle `t` (radians) around the vertical axis, with a gentle tilt. */
export function lumenFrame(t: number): AsciiFrame {
  const size = ASCII_COLS * ASCII_ROWS;
  const depth = new Float32Array(size);
  const chars: string[] = new Array<string>(size).fill(' ');
  const kind = new Uint8Array(size);
  const cA = Math.cos(t);
  const sA = Math.sin(t);
  const tilt = 0.35 * Math.sin(t * 0.6);
  const cB = Math.cos(tilt);
  const sB = Math.sin(tilt);

  const plot = (x: number, y: number, z: number, nx: number, ny: number, nz: number, k: number): void => {
    const x1 = x * cA + z * sA;
    const z1 = -x * sA + z * cA;
    const y2 = y * cB - z1 * sB;
    const z2 = y * sB + z1 * cB;
    const nz1 = -nx * sA + nz * cA;
    const ny2 = ny * cB - nz1 * sB;
    const nz2 = ny * sB + nz1 * cB;
    const ooz = 1 / (z2 + K2);
    const px = Math.round(ASCII_COLS / 2 + K1 * ooz * x1);
    const py = Math.round(ASCII_ROWS / 2 - K1 * ooz * y2 * 0.5);
    if (px < 0 || px >= ASCII_COLS || py < 0 || py >= ASCII_ROWS) return;
    const i = px + py * ASCII_COLS;
    if (ooz <= depth[i]) return;
    depth[i] = ooz;
    // Light from above, toward the viewer.
    const lum = ny2 * 0.7071 - nz2 * 0.7071;
    chars[i] = RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.round((lum + 0.15) * 8)))];
    kind[i] = k;
  };

  const sphere = (cx: number, cy: number, radius: number, k: number): void => {
    for (let th = 0; th < Math.PI; th += 0.06) {
      for (let p = 0; p < 2 * Math.PI; p += 0.06) {
        const nx = Math.sin(th) * Math.cos(p);
        const ny = Math.cos(th);
        const nz = Math.sin(th) * Math.sin(p);
        plot(cx + radius * nx, cy + radius * ny, radius * nz, nx, ny, nz, k);
      }
    }
  };

  for (let p = 0; p < 2 * Math.PI; p += 0.018) {
    const deg = (p * 180) / Math.PI;
    if (deg > 15 && deg < 75) continue; // the open gap
    const cp = Math.cos(p);
    const sp = Math.sin(p);
    for (let th = 0; th < 2 * Math.PI; th += 0.07) {
      const ct = Math.cos(th);
      const st = Math.sin(th);
      const r = R2 + R1 * ct;
      plot(r * cp, r * sp, R1 * st, ct * cp, ct * sp, st, RING);
    }
  }
  for (const deg of [15, 75]) {
    const a = (deg * Math.PI) / 180;
    sphere(R2 * Math.cos(a), R2 * Math.sin(a), R1, RING);
  }
  sphere(0, 0, 0.78, DOT);
  sphere(R2 * Math.SQRT1_2, R2 * Math.SQRT1_2, 0.36, DOT);

  let ring = '';
  let dots = '';
  for (let y = 0; y < ASCII_ROWS; y++) {
    for (let x = 0; x < ASCII_COLS; x++) {
      const i = x + y * ASCII_COLS;
      ring += kind[i] === RING ? chars[i] : ' ';
      dots += kind[i] === DOT ? chars[i] : ' ';
    }
    ring += '\n';
    dots += '\n';
  }
  return { ring, dots };
}
