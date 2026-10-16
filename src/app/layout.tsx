import type { JSX } from 'react';
import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { SITE } from '@/data/site';
import './globals.css';

// Variable fonts: one file per family instead of one per weight, so the headline (the LCP element) swaps in sooner.
const jakarta = Plus_Jakarta_Sans({ variable: '--font-jakarta', subsets: ['latin'] });
const jetbrains = JetBrains_Mono({ variable: '--font-jetbrains', subsets: ['latin'] });

export const metadata: Metadata = {
  title: SITE.meta.title,
  description: SITE.meta.description,
  // The page lists members' names and student IDs, so keep it out of search results by default.
  // Flip to index: true only if the group agrees to be findable.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#011c27',
};

export default function RootLayout({ children }: LayoutProps<'/'>): JSX.Element {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable} antialiased`}>
      <body className="bg-ink font-mono text-[15px] leading-[1.55] text-cotton">{children}</body>
    </html>
  );
}
