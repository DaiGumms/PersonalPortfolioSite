import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    description: 'Open Source Contributor',
    link: 'https://github.com/DaiGumms',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    description: 'Professional Network',
    link: 'https://www.linkedin.com/in/david-morgan-gumm-450751133/',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    description: 'Tech Thoughts & Updates',
    link: 'https://x.com/David_MGumm',
    icon: Twitter,
  },
];

export default function CommunitySection() {
  return (
    <div className="py-24 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left Column: Intro & Socials */}
          <div className="lg:w-5/12 space-y-8">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                Ecosystem
              </span>
              <h2 className="text-5xl font-bold font-display text-foreground leading-[1.1]">
                Community<br /><em className="not-italic text-primary">Involvement.</em>
              </h2>
            </div>

            <p className="text-lg text-secondary font-sans leading-relaxed">
              Beyond shipping code, I&apos;m dedicated to fostering growth in the tech space through open source, mentorship, and editorial contributions.
            </p>

            <div className="space-y-4 pt-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.link} target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="border-0 shadow-sm bg-surface-low hover:bg-surface hover:shadow-ambient hover:-translate-y-0.5 transition-all duration-300 rounded-2xl group cursor-pointer">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-surface-lowest flex items-center justify-center text-primary shadow-sm">
                          <social.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground font-display leading-tight">{social.name}</h4>
                          <p className="text-secondary text-sm">{social.description}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-secondary group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Highlight Cards */}
          <div className="lg:w-7/12 grid sm:grid-cols-2 gap-6">

            {/* Mentorship Card */}
            <Card className="border-0 shadow-ambient bg-surface-low rounded-[2rem] overflow-hidden flex flex-col h-full min-h-[400px]">
              <div className="relative h-48 w-full bg-surface-high opacity-50 mix-blend-multiply">
                <Image
                  src="/images/projects/DevOpsData.jpg"
                  alt="Mentorship"
                  fill
                  className="object-cover opacity-30 grayscale"
                />
              </div>
              <CardContent className="p-8 flex flex-col flex-grow relative z-10 bg-gradient-to-t from-surface-low via-surface-low to-transparent -mt-24">
                <div className="mt-auto">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider mb-4">
                    Mentorship
                  </div>
                  <h4 className="text-3xl font-bold text-foreground font-display leading-tight">
                    Empowering the next generation of engineers.
                  </h4>
                </div>
              </CardContent>
            </Card>

            {/* Speaking Card */}
            <Card className="border-0 shadow-ambient bg-primary rounded-[2rem] overflow-hidden flex flex-col h-full min-h-[400px]">
              <CardContent className="p-8 flex flex-col flex-grow relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                <div className="mt-auto relative z-10">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-primary text-[10px] font-bold uppercase tracking-wider mb-4">
                    Events
                  </div>
                  <h4 className="text-3xl font-bold text-white font-display leading-tight">
                    Speaking at tech summits and conferences globally.
                  </h4>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}
