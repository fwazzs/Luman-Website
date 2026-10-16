import type { JSX } from 'react';
import IsoFrame, { DELAY, MOTION_GUARD } from '@/components/process/illustrations/IsoFrame';

const TILES = [
  'M60 50 L84 40 L108 50 L84 60 Z',
  'M132 50 L156 40 L180 50 L156 60 Z',
  'M96 80 L120 70 L144 80 L120 90 Z',
  'M24 80 L48 70 L72 80 L48 90 Z',
  'M168 80 L192 70 L216 80 L192 90 Z',
];

/** Five interview tiles blink in turn; one insight (rose) floats up out of them. */
export default function EmpathizeArt(): JSX.Element {
  return (
    <IsoFrame>
      {TILES.map((d, i) => (
        <path key={d} d={d} className={`animate-dt-blink ${DELAY[i]} ${MOTION_GUARD}`} />
      ))}
      <path
        d="M84 60 V100 M156 60 V100 M48 90 V120 M192 90 V120"
        strokeDasharray="3 5"
        strokeOpacity={0.45}
        className={`animate-dt-flow ${MOTION_GUARD}`}
      />
      <g className={`animate-dt-float ${MOTION_GUARD}`}>
        <path d="M96 110 L120 100 L144 110 L120 120 Z" fill="#DE4D86" stroke="#DE4D86" />
        <path d="M120 90 V100" stroke="#DE4D86" />
      </g>
    </IsoFrame>
  );
}
