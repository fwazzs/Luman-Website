import type { JSX } from 'react';
import { pixelMark } from '@/lib/pixelMark';

interface PixelMarkProps {
  /** Rendered size in px. */
  size?: number;
  className?: string;
}

const GRID = 16;
const CELLS = pixelMark(GRID);

/** Small pixel version of the Lumen mark for the header. Static SVG, computed once at build. */
export default function PixelMark({ size = 32, className }: PixelMarkProps): JSX.Element {
  return (
    <svg
      viewBox={`0 0 ${GRID} ${GRID}`}
      width={size}
      height={size}
      aria-hidden="true"
      shapeRendering="crispEdges"
      className={className}
    >
      {CELLS.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1} height={1} className={c.accent ? 'fill-rose' : 'fill-cotton'} />
      ))}
    </svg>
  );
}
