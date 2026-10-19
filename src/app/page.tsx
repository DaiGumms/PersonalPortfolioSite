import HeroSection from '@/components/sections/hero-section';
import LogoStripSection from '@/components/sections/logo-strip-section';
import EchelonSpotlightSection from '@/components/sections/echelon-spotlight-section';
import AboutMeSection from '@/components/sections/about-me-section';
import ResumeDownloadSection from '@/components/sections/resume-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoStripSection />
      <EchelonSpotlightSection />
      <AboutMeSection />
      <ResumeDownloadSection />
    </>
  );
}
