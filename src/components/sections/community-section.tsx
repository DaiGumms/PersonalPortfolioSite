import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Users, ArrowUpRight } from 'lucide-react';

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
  {
    name: 'Meetup',
    description: 'Community Meetups',
    link: 'https://www.meetup.com/members/259796656/',
    icon: Users,
  },
];

const redgateAmbassador = {
  badge: 'Ambassador',
  title: 'Redgate Community Ambassador',
  description: 'Championing the tools I actually use — sharing feedback, writing, and attending events to help shape the products.',
  href: 'https://www.red-gate.com/hub/community/ambassadors/ambassador/David-MorganGumm/',
  linkLabel: 'View ambassador profile',
  logo: { src: '/logos/redgate-ambassador.svg', alt: 'Redgate Community Ambassador badge', width: 140, height: 187 },
};

const highlights = [
  {
    badge: 'Community',
    title: 'Founder of sql_squared',
    description: 'A growing community for data & AI professionals — articles and a podcast.',
    variant: 'link' as const,
    href: 'https://www.sqlsquared.co.uk',
    linkLabel: 'Visit sqlsquared.co.uk',
    logo: { src: '/logos/sql-squared.webp', alt: 'sql_squared', width: 88, height: 57 },
  },
  {
    badge: 'Mentorship',
    title: 'Mentor to engineers, on the job.',
    variant: 'image' as const,
    image: '/images/projects/DevOpsData.jpg',
    imageAlt: 'Mentorship',
  },
];

export default function CommunitySection() {
  return (
    <div className="py-24 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left Column: Intro & Socials */}
          <div className="order-2 lg:order-1 lg:w-5/12 space-y-8">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                Ecosystem
              </span>
              <h2 className="text-5xl font-bold font-display text-foreground leading-[1.1]">
                Community<br /><em className="not-italic text-primary">Involvement.</em>
              </h2>
            </div>

            <p className="text-lg text-secondary font-sans leading-relaxed">
              Beyond shipping code, I&apos;m a Redgate Community Ambassador, founder of the sql_squared data &amp; AI community, and a mentor to engineers on my team.
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
          <div className="order-1 lg:order-2 lg:w-7/12 space-y-6">

            {/* Redgate Ambassador — the highlight */}
            <Link href={redgateAmbassador.href} target="_blank" rel="noopener noreferrer" className="group block">
              <Card className="border-0 shadow-ambient-lg rounded-[2rem] overflow-hidden bg-primary hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center">
                  <CardContent className="p-8 md:p-10 flex-1 relative z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 -z-10" />
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-primary text-[10px] font-bold uppercase tracking-wider mb-4">
                      {redgateAmbassador.badge}
                    </div>
                    <h4 className="text-3xl md:text-4xl font-bold font-display leading-tight text-white">
                      {redgateAmbassador.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/80 max-w-md">
                      {redgateAmbassador.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-white group-hover:underline">
                      {redgateAmbassador.linkLabel} <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                  <div className="p-8 sm:p-10 shrink-0 flex items-center justify-center">
                    <Image
                      src={redgateAmbassador.logo.src}
                      alt={redgateAmbassador.logo.alt}
                      width={redgateAmbassador.logo.width}
                      height={redgateAmbassador.logo.height}
                      className="object-contain rounded-xl shadow-xl"
                    />
                  </div>
                </div>
              </Card>
            </Link>

            {/* Supporting cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item) => {
                const badgeClassName = 'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-white';
                const titleClassName = 'text-3xl font-bold font-display leading-tight text-foreground';

                const cardBody = (
                  <CardContent className="p-8 flex flex-col flex-grow relative z-10">
                    <div className="mt-auto relative z-10">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className={badgeClassName}>
                          {item.badge}
                        </div>
                        {item.logo && (
                          <div className="bg-white rounded-xl px-3 py-2 shadow-sm shrink-0">
                            <Image
                              src={item.logo.src}
                              alt={item.logo.alt}
                              width={item.logo.width}
                              height={item.logo.height}
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>
                      <h4 className={titleClassName}>
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="mt-3 text-sm leading-relaxed text-secondary">
                          {item.description}
                        </p>
                      )}
                      {item.href && item.linkLabel && (
                        <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary group-hover:underline">
                          {item.linkLabel} <ArrowUpRight className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </CardContent>
                );

                const cardClassName = 'border-0 shadow-ambient bg-surface-low rounded-[2rem] overflow-hidden flex flex-col h-full min-h-[280px]';

                if (item.href) {
                  return (
                    <Link key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="group block h-full">
                      <Card className={`${cardClassName} hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-300`}>
                        {cardBody}
                      </Card>
                    </Link>
                  );
                }

                return (
                  <Card key={item.title} className={cardClassName}>
                    {item.variant === 'image' && item.image && (
                      <div className="relative h-48 w-full bg-surface-high opacity-50 mix-blend-multiply">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? ''}
                          fill
                          className="object-cover opacity-30 grayscale"
                        />
                      </div>
                    )}
                    {item.variant === 'image' ? (
                      <CardContent className="p-8 flex flex-col flex-grow relative z-10 bg-gradient-to-t from-surface-low via-surface-low to-transparent -mt-24">
                        <div className="mt-auto">
                          <div className={`${badgeClassName} mb-4`}>
                            {item.badge}
                          </div>
                          <h4 className={titleClassName}>
                            {item.title}
                          </h4>
                        </div>
                      </CardContent>
                    ) : (
                      cardBody
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
