// Shared Tailwind class strings for scroll reveals inside <Reveal> (group/reveal).
// Kept as full literal strings so Tailwind's scanner generates every class.

/** Fade and rise into place; under reduced motion the final state shows with no transition. */
export const REVEAL_UP =
  'translate-y-6 opacity-0 transition-[opacity,translate] reveal-ease group-data-[shown]/reveal:translate-y-0 group-data-[shown]/reveal:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none';

/** Same, for a second element that should follow the first. */
export const REVEAL_UP_LATE = `${REVEAL_UP} delay-150`;
