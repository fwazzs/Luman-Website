import type { JSX } from 'react';
import AboutSection from '@/components/about/AboutSection';
import HeroSection from '@/components/hero/HeroSection';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import ProcessSection from '@/components/process/ProcessSection';
import TeamSection from '@/components/team/TeamSection';

export default function Home(): JSX.Element {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <ProcessSection />
      </main>
      <SiteFooter />
    </>
  );
}
