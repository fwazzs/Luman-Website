/** One of the five Design Thinking phases. Test is defined but not shown until its content exists. */
export type PhaseId = 'empathize' | 'define' | 'ideate' | 'prototype' | 'test';

/** Icon drawn in a document link's 32px box. */
export type DocIcon = 'document' | 'grid' | 'arrow' | 'person' | 'download' | 'board' | 'camera';

export interface DocLink {
  label: string;
  /** https URL. null renders a non-interactive row with a [LINK] badge. */
  href: string | null;
  icon: DocIcon;
  /** The last row of a card: rose icon box, no connector below its elbow. */
  primary?: boolean;
}

/** Text with an optional highlighted middle part, e.g. the POV statement. */
export interface HighlightedText {
  before: string;
  highlight: string;
  after: string;
}

export interface LabeledPoint {
  label: string;
  text: string;
}

export interface Phase {
  id: PhaseId;
  /** "01" … "05" */
  number: string;
  /** Card title, e.g. "Empathize · needfinding". */
  title: string;
  status: 'DONE' | 'IN PROGRESS';
  /** Hidden phases stay in the data but are not rendered (Test, until testing is done). */
  visible: boolean;
  summary: string | null;
  /** Empathize: the featured quote. */
  quote?: { text: string; author: string };
  /** Empathize: interviewee name chips. */
  chips?: string[];
  /** Define: the POV statement. */
  statement?: HighlightedText;
  /** Define: insight and persona lines. */
  points?: LabeledPoint[];
  /** Ideate: funnel steps; the last one is highlighted. */
  funnel?: string[];
  /** Prototype: the three parts of the product. */
  parts?: { name: string; description: string }[];
  links: DocLink[];
}

export interface TeamMember {
  name: string;
  studentId: string;
  /** Path under /public, e.g. "/team/ezar.jpg". null shows initials. */
  photo: string | null;
  /** CSS object-position that keeps the face in narrow cards. */
  focus: string;
  /** Extra zoom around the focus point; 1 = none. */
  zoom: number;
  /** Card background behind the dots and photo. */
  tint: string;
}

export interface SiteContent {
  meta: { title: string; description: string };
  hero: {
    headline: [string, string];
    tagline: string;
    video: { webm: string; mp4: string | null; poster: string };
  };
  about: {
    heading: string;
    problemLabel: string;
    problem: string;
    povLabel: string;
    pov: HighlightedText;
  };
  team: {
    heading: string;
    /** Index of the card that starts open. */
    defaultOpen: number;
    members: TeamMember[];
  };
  process: {
    heading: string;
    phases: Phase[];
  };
  footer: {
    copyright: string;
    credit: string;
  };
}
