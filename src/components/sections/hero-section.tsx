import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8 text-center md:text-left order-2 md:order-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-surface-low text-primary text-sm font-semibold tracking-wide uppercase mb-2 shadow-sm border border-surface-high/30">
              Tech Leader • Data & AI Innovator
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Engineering the <br className="hidden md:block"/>
              future of data.
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto md:mx-0 leading-relaxed font-sans">
              Hi, I&apos;m David Morgan-Gumm. I turn complex data into actionable insights, leading engineering teams to build platforms that scale. Passionate about AI, cloud architecture, and open-source communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
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
          <div className="flex-1 w-full max-w-md mx-auto md:max-w-none order-1 md:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl -z-10 transform scale-90 translate-y-10" />
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
