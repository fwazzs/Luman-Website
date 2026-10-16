// donut.c-style ASCII renderer for the Lumen mark: an open torus (ring with a gap)
// plus a centre sphere and a spark sphere in the gap. Returns two text layers so
// the ring and the dots can be coloured separately.
function lumenFrame(t) {
  const W = 72, H = 36, R2 = 2, R1 = 0.55, CORE = 0.78, SPARK = 0.36;
  const K2 = 7, K1 = W * K2 * 3 / (8 * (R2 + R1 + 0.4));
  const L = '.,-~:;=!*#$@';
  const z = new Float32Array(W * H), ch = new Array(W * H).fill(' '), kind = new Uint8Array(W * H);
  const A = t, B = 0.35 * Math.sin(t * 0.6);           // spin around the vertical axis, gentle tilt
  const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
  const lx = 0, ly = 0.7071, lz = -0.7071;             // light from above, toward the viewer
  const plot = (x, y, zz, nx, ny, nz, k) => {
    // rotate around y by A, then around x by B
    let x1 = x * cA + zz * sA, z1 = -x * sA + zz * cA;
    let y2 = y * cB - z1 * sB, z2 = y * sB + z1 * cB;
    let nx1 = nx * cA + nz * sA, nz1 = -nx * sA + nz * cA;
    let ny2 = ny * cB - nz1 * sB, nz2 = ny * sB + nz1 * cB;
    const ooz = 1 / (z2 + K2);
    const px = Math.round(W / 2 + K1 * ooz * x1), py = Math.round(H / 2 - K1 * ooz * y2 * 0.5);
    if (px < 0 || px >= W || py < 0 || py >= H) return;
    const lum = nx1 * lx + ny2 * ly + nz2 * lz;
    const i = px + py * W;
    if (ooz > z[i]) {
      z[i] = ooz;
      ch[i] = L[Math.max(0, Math.min(11, Math.round((lum + 0.15) * 8)))];
      kind[i] = k;
    }
  };
  // Ring: skip the gap between -75° and -15° (screen y up, so the gap sits at the upper right).
  for (let p = 0; p < 6.283; p += 0.018) {
    const deg = p * 180 / Math.PI;
    if (deg > 15 && deg < 75) continue;
    const cp = Math.cos(p), sp = Math.sin(p);
    for (let th = 0; th < 6.283; th += 0.07) {
      const ct = Math.cos(th), st = Math.sin(th), r = R2 + R1 * ct;
      plot(r * cp, r * sp, R1 * st, ct * cp, ct * sp, st, 1);
    }
  }
  // Rounded caps at both ends of the arc.
  // Spheres: centre core and spark at 45° on the ring radius.
  const sphere = (cx, cy, rad, k) => {
    for (let th = 0; th < 3.1416; th += 0.06) for (let p = 0; p < 6.283; p += 0.06) {
      const nx = Math.sin(th) * Math.cos(p), ny = Math.cos(th), nz = Math.sin(th) * Math.sin(p);
      plot(cx + rad * nx, cy + rad * ny, rad * nz, nx, ny, nz, k);
    }
  };
  for (const deg of [15, 75]) {
    const a = deg * Math.PI / 180;
    sphere(R2 * Math.cos(a), R2 * Math.sin(a), R1, 1);
  }
  sphere(0, 0, CORE, 2);
  sphere(R2 * Math.cos(Math.PI / 4), R2 * Math.sin(Math.PI / 4), SPARK, 2);
  let ring = '', dots = '';
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = x + y * W;
      ring += kind[i] === 1 ? ch[i] : ' ';
      dots += kind[i] === 2 ? ch[i] : ' ';
    }
    ring += '\n'; dots += '\n';
  }
  return { ring, dots };
}

if (typeof module !== 'undefined' && require.main === module) {
  for (const t of [0, 0.9]) {
    const f = lumenFrame(t);
    const merged = f.ring.split('').map((c, i) => (c !== ' ' ? c : f.dots[i] === ' ' ? ' ' : f.dots[i] === '\n' ? '\n' : 'o')).join('');
    console.log('t=' + t + '\n' + merged);
  }
  console.assert(lumenFrame(0).ring.trim().length > 200, 'ring renders');
  console.assert(lumenFrame(0).dots.trim().length > 20, 'dots render');
}
