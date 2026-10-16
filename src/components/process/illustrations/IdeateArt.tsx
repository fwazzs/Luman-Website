import type { JSX } from 'react';
import IsoFrame, { DELAY, MOTION_GUARD } from '@/components/process/illustrations/IsoFrame';

// Scattered idea tiles with their stagger slot (index into DELAY), as in the canvas.
const SCATTERED: { d: string; delay: number }[] = [
  { d: 'M40 40 L56 34 L72 40 L56 46 Z', delay: 0 },
  { d: 'M88 30 L104 24 L120 30 L104 36 Z', delay: 3 },
  { d: 'M150 36 L166 30 L182 36 L166 42 Z', delay: 1 },
  { d: 'M196 52 L212 46 L228 52 L212 58 Z', delay: 4 },
  { d: 'M20 76 L36 70 L52 76 L36 82 Z', delay: 2 },
  { d: 'M64 66 L80 60 L96 66 L80 72 Z', delay: 4 },
  { d: 'M176 84 L192 78 L208 84 L192 90 Z', delay: 3 },
  { d: 'M30 112 L46 106 L62 112 L46 118 Z', delay: 1 },
  { d: 'M188 120 L204 114 L220 120 L204 126 Z', delay: 2 },
];

/** Many ideas flicker; three chosen ones (rose) float together in the middle. */
export default function IdeateArt(): JSX.Element {
  return (
    <IsoFrame>
      {SCATTERED.map((tile) => (
        <path key={tile.d} d={tile.d} className={`animate-dt-blink ${DELAY[tile.delay]} ${MOTION_GUARD}`} />
      ))}
      <path
        d="M56 46 L104 74 M166 42 L136 74 M80 72 L104 92 M192 90 L136 98"
        strokeDasharray="3 5"
        strokeOpacity={0.4}
        className={`animate-dt-flow ${MOTION_GUARD}`}
      />
      <g className={`animate-dt-float ${MOTION_GUARD}`}>
        <path
          d="M104 74 L120 68 L136 74 L120 80 Z M120 92 L136 86 L152 92 L136 98 Z M88 92 L104 86 L120 92 L104 98 Z"
          fill="#DE4D86"
          stroke="#DE4D86"
        />
      </g>
    </IsoFrame>
  );
}
