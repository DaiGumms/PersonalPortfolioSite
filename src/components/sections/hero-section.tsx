import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Shield, Rocket } from 'lucide-react';

const taglines = [
  { icon: Zap, text: 'Turning messy data into clean decisions.' },
  { icon: Shield, text: 'Engineering platforms built to last.' },
  { icon: Rocket, text: 'Scaling teams, systems, and communities.' },
];

const skillChips = [
  { label: 'Microsoft Fabric', className: 'top-6 -right-6 lg:-right-16' },
  { label: 'Azure', className: 'top-[28%] -right-4 lg:-right-12' },
  { label: 'sql_squared', className: 'top-[52%] -right-6 lg:-right-14' },
  { label: 'Python', className: 'bottom-10 -right-4 lg:-right-10' },
  { label: 'AI / ML', className: 'top-6 -left-4 lg:-left-12' },
  { label: 'Data Platform', className: 'top-[30%] -left-6 lg:-left-18' },
  { label: 'Power BI', className: 'top-[55%] -left-4 lg:-left-12' },
  { label: 'Azure DevOps', className: 'bottom-10 -left-6 lg:-left-16' },
];

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-surface-lowest relative overflow-hidden">
      {/* Background gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_10%,hsl(var(--primary)/0.12),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_15%_85%,hsl(var(--primary)/0.07),transparent)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text */}
          <div className="flex-1 space-y-8 text-center md:text-left order-2 md:order-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-surface-low text-primary text-sm font-semibold tracking-wide uppercase mb-2 shadow-sm border border-surface-high/30">
              Tech Leader • Data & AI Innovator
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Engineering the <br className="hidden md:block" />
              future of <em className="not-italic text-primary">data.</em>
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto md:mx-0 leading-relaxed font-sans">
              Hi, I&apos;m David Morgan-Gumm. I turn complex data into actionable insights, leading engineering teams to build platforms that scale. Passionate about AI, cloud architecture, and open-source communities.
            </p>

            {/* Taglines row */}
            <div className="flex flex-col gap-3 border-t border-b border-surface-high/60 py-5">
              {taglines.map((tagline) => (
                <div key={tagline.text} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <tagline.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-secondary">{tagline.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 shadow-ambient transition-transform hover:scale-105 h-14 text-base">
                <Link href="/projects">
                  View My Work
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-0 bg-surface-low text-foreground hover:bg-surface hover:text-primary rounded-full px-8 h-14 text-base transition-transform hover:scale-105 shadow-sm">
                <Link href="/contact">
                  Get In Touch
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Photo + floating chips */}
          <div className="flex-1 w-full max-w-md mx-auto md:max-w-none order-1 md:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl -z-10 transform scale-90 translate-y-10" />

            {/* Floating skill chips */}
            {skillChips.map((chip, i) => (
              <div
                key={chip.label}
                className={`absolute hidden lg:flex items-center px-3 py-1.5 rounded-full bg-surface-lowest shadow-ambient border border-surface-high/60 text-xs font-semibold text-foreground whitespace-nowrap z-20 animate-float ${chip.className}`}
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 flex-shrink-0" />
                {chip.label}
              </div>
            ))}

            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-ambient-lg border border-surface-high/50 bg-surface-low">
              <Image
                src="/images/hero_profile.png"
                alt="David Morgan-Gumm Portrait"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
