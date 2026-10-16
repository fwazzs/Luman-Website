import type { JSX } from 'react';
import IsoFrame, { MOTION_GUARD } from '@/components/process/illustrations/IsoFrame';

/** Three stacked plates; the top one (rose) lifts and settles: parts assembling into one product. */
export default function PrototypeArt(): JSX.Element {
  return (
    <IsoFrame>
      <path
        d="M120 80 L200 108 L120 136 L40 108 Z"
        strokeDasharray="4 4"
        strokeOpacity={0.5}
        className={`animate-dt-flow ${MOTION_GUARD}`}
      />
      <path
        d="M40 60 V108 M200 60 V108 M120 88 V136"
        strokeDasharray="3 5"
        strokeOpacity={0.5}
        className={`animate-dt-flow ${MOTION_GUARD}`}
      />
      <path d="M120 56 L200 84 L120 112 L40 84 Z" strokeOpacity={0.75} />
      <g className={`animate-dt-lift ${MOTION_GUARD}`}>
        <path d="M120 32 L200 60 L120 88 L40 60 Z" fill="#DE4D86" stroke="#DE4D86" />
        <path d="M100 54 L140 68 M92 62 L128 75" stroke="#011C27" strokeWidth={2.2} />
      </g>
    </IsoFrame>
  );
}
