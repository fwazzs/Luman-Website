import type { JSX } from 'react';
import IsoFrame, { DELAY, MOTION_GUARD } from '@/components/process/illustrations/IsoFrame';

/** Two planes sink toward one core: many findings narrowing to a single point of view. */
export default function DefineArt(): JSX.Element {
  return (
    <IsoFrame>
      <path d="M120 20 L210 52 L120 84 L30 52 Z" strokeDasharray="4 4" className={`animate-dt-sink ${MOTION_GUARD}`} />
      <path d="M120 46 L180 68 L120 90 L60 68 Z" className={`animate-dt-sink ${DELAY[2]} ${MOTION_GUARD}`} />
      <path d="M120 72 L150 84 L120 96 L90 84 Z" fill="#DE4D86" stroke="#DE4D86" />
      <path
        d="M30 52 L90 84 M210 52 L150 84 M120 96 V136"
        strokeDasharray="3 5"
        strokeOpacity={0.45}
        className={`animate-dt-flow ${MOTION_GUARD}`}
      />
      <circle
        cx={120}
        cy={136}
        r={4}
        fill="#DE4D86"
        stroke="none"
        className={`origin-center animate-dt-pulse [transform-box:fill-box] ${MOTION_GUARD}`}
      />
    </IsoFrame>
  );
}
