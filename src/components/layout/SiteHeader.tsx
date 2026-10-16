import type { JSX } from 'react';
import PixelMark from '@/components/logo/PixelMark';

export default function SiteHeader(): JSX.Element {
  return (
    <header className="border-b border-cotton/18">
      <div className="mx-auto flex max-w-[1280px] items-center px-6 py-4">
        <a href="#top" aria-label="Lumen, back to top" className="flex min-h-11 items-center gap-3 no-underline">
          <PixelMark />
          <span className="font-sans text-[26px] font-extrabold tracking-[-0.055em] text-white">lumen</span>
        </a>
      </div>
    </header>
  );
}
