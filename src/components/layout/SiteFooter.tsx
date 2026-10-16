import type { JSX } from 'react';
import AsciiLogo from '@/components/logo/AsciiLogo';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/data/site';
import { ASCII_START_ANGLE, lumenFrame } from '@/lib/lumenAscii';

// Computed at build time; the client only runs the renderer while the logo is hovered.
const RESTING_FRAME = lumenFrame(ASCII_START_ANGLE);

export default function SiteFooter(): JSX.Element {
  return (
    <footer className="overflow-hidden">
      <Reveal threshold={0.3} className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-14 gap-y-6 px-6 pt-20 pb-14">
        {/* The mark lights up first, then the wordmark slides in beside it. */}
        <div className="scale-90 opacity-0 transition-[opacity,scale] reveal-ease group-data-[shown]/reveal:scale-100 group-data-[shown]/reveal:opacity-100 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none">
          <AsciiLogo initial={RESTING_FRAME} />
        </div>
        <span className="-translate-x-8 font-sans text-[clamp(5rem,15vw,13rem)] leading-[0.8] font-extrabold tracking-[-0.065em] text-white opacity-0 transition-[opacity,translate] delay-200 reveal-ease group-data-[shown]/reveal:translate-x-0 group-data-[shown]/reveal:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none">
          lumen
        </span>
      </Reveal>
      <div className="border-t border-cotton/18">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 p-6 text-[13px] tracking-[0.04em] text-cotton/72">
          <span>{SITE.footer.copyright}</span>
          <span>{SITE.footer.credit}</span>
        </div>
      </div>
    </footer>
  );
}
