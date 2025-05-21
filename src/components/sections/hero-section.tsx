import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="home" className="py-20 md:py-32 bg-gradient-to-br from-primary/30 via-background to-background">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            David Morgan-Gumm
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-accent">
            Tech Leader & AI Innovator
          </p>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
            Crafting digital experiences that inspire and solve real-world problems. Passionate about building scalable solutions and leading high-performing teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105">
              <Link href="#projects">
                View Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-accent text-accent hover:bg-accent/10 transition-all duration-300 transform hover:scale-105">
              <Link href="#contact">
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-square max-w-md mx-auto md:max-w-none">
           <Image
            src="https://placehold.co/600x600.png"
            alt="David Morgan-Gumm Portrait"
            width={600}
            height={600}
            className="rounded-full shadow-2xl object-cover border-4 border-primary"
            priority
            data-ai-hint="professional portrait"
          />
        </div>
      </div>
    </section>
  );
}
