import HeroSection from '@/components/sections/hero-section';
import AboutMeSection from '@/components/sections/about-me-section';
import TechLeadershipSection from '@/components/sections/tech-leadership-section';
import ProjectsSection from '@/components/sections/projects-section';
import CommunitySection from '@/components/sections/community-section';
import BlogAndEventsSection from '@/components/sections/blog-events-section';
import ResumeDownloadSection from '@/components/sections/resume-section';
import ContactSection from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <TechLeadershipSection />
      <ProjectsSection />
      <CommunitySection />
      <ContactSection />
      <ResumeDownloadSection />
    </>
  );
}
