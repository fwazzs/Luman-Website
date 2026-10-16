import { describe, expect, it } from 'vitest';
import { SITE } from '../data/site';
import { safeEmail, safeHref } from './safeUrl';

describe('safeHref', () => {
  it('keeps anchors, site paths and https', () => {
    expect(safeHref('#process')).toBe('#process');
    expect(safeHref('/team/ezar.jpg')).toBe('/team/ezar.jpg');
    expect(safeHref('https://example.com/p')).toBe('https://example.com/p');
  });
  it('drops dangerous or unexpected schemes', () => {
    for (const bad of ['javascript:alert(1)', ' JavaScript:alert(1)', 'data:text/html,x', 'http://example.com', '//evil.com', 'nonsense', '']) {
      expect(safeHref(bad)).toBeNull();
    }
    expect(safeHref(null)).toBeNull();
  });
});

describe('safeEmail', () => {
  it('accepts a plain address and rejects parameter injection', () => {
    expect(safeEmail('group2@its.ac.id')).toBe('group2@its.ac.id');
    expect(safeEmail('a@b.id?bcc=x@y.z')).toBeNull();
    expect(safeEmail('not an email')).toBeNull();
  });
});

// Guards the content file itself: anything filled in must pass the checks above.
describe('site.ts content', () => {
  it('has only safe links and local media paths', () => {
    for (const phase of SITE.process.phases) {
      for (const link of phase.links) if (link.href) expect(safeHref(link.href)).not.toBeNull();
    }
    for (const m of SITE.team.members) if (m.photo) expect(m.photo.startsWith('/team/')).toBe(true);
    expect(SITE.hero.video.webm.startsWith('/media/')).toBe(true);
  });

  it('keeps Test hidden and every visible phase linked to its documents', () => {
    const visible = SITE.process.phases.filter((p) => p.visible);
    expect(visible.map((p) => p.id)).toEqual(['empathize', 'define', 'ideate', 'prototype']);
    for (const p of visible) {
      expect(p.links.length).toBeGreaterThan(0);
      expect(p.links.filter((l) => l.primary)).toHaveLength(1);
      expect(p.links[p.links.length - 1].primary).toBe(true);
    }
  });

  it('has six members with 10-digit student IDs and a valid default card', () => {
    expect(SITE.team.members).toHaveLength(6);
    for (const m of SITE.team.members) expect(m.studentId).toMatch(/^\d{10}$/);
    expect(SITE.team.members[SITE.team.defaultOpen]).toBeDefined();
  });
});
