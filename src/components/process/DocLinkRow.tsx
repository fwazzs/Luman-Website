import type { JSX } from 'react';
import { isExternal, safeHref } from '@/lib/safeUrl';
import type { DocIcon, DocLink } from '@/types';

interface DocLinkRowProps {
  link: DocLink;
}

// 16×16 stroke icons, copied from the canvas.
const ICON_PATHS: Record<DocIcon, string> = {
  document: 'M4 1.5h5.5L12 4v10.5H4z M6 7h4 M6 10h4',
  grid: 'M2 2h5v5H2z M9 2h5v5H9z M2 9h5v5H2z M9 9h5v5H9z',
  arrow: 'M3 8h10 M9 4l4 4-4 4',
  person: 'M3 14c0-3 2.2-5 5-5s5 2 5 5 M10.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0',
  download: 'M8 2v9 M4 7l4 4 4-4 M3 14h10',
  board: 'M2 3h8v6H2z M6 9v4 M10 6h4v7H8',
  camera: 'M1.5 4h3l1.5-2h4l1.5 2h3v9.5h-13z M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0',
};

/**
 * One document row in a phase card footer: elbow connector, icon box, label, and ↗ or a [LINK] badge.
 * A link without a URL renders as plain text, never as href="#".
 */
export default function DocLinkRow({ link }: DocLinkRowProps): JSX.Element {
  const href = safeHref(link.href);
  const content = (
    <>
      {/* Elbow from the card's spine into this row; non-primary rows continue the spine below. */}
      <span aria-hidden="true" className="absolute top-0 left-0 h-1/2 w-5 border-b border-l border-cotton/35" />
      {!link.primary && <span aria-hidden="true" className="absolute top-1/2 bottom-0 left-0 border-l border-cotton/35" />}
      <span
        aria-hidden="true"
        className={`flex size-8 flex-none items-center justify-center border ${
          link.primary ? 'border-rose bg-rose' : 'border-cotton/45'
        }`}
      >
        <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke={link.primary ? '#011C27' : '#F7CACD'} strokeWidth={link.primary ? 1.6 : 1.4}>
          <path d={ICON_PATHS[link.icon]} />
        </svg>
      </span>
      <span className="flex-auto">{link.label}</span>
      {href ? <span aria-hidden="true">↗</span> : <span className="text-xs text-cotton/72">[LINK]</span>}
    </>
  );

  const row = 'relative flex min-h-[52px] items-center gap-3 pl-7 text-sm';
  if (!href) return <div className={row}>{content}</div>;
  // Documents live on other sites and open in a new tab; in-page anchors and site paths stay here.
  const external = isExternal(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${row} no-underline hover:text-rose-text`}
    >
      {content}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
