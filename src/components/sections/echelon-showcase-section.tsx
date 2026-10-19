import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, MessageCircle, BookOpen, Layers, Rocket, Bot } from 'lucide-react';
import { EchelonWordmark } from '@/components/echelon/brand';
import { EchelonPanel } from '@/components/echelon/interactive-panel';
import { EchelonScreenCarousel } from '@/components/echelon/screen-carousel';
import { echelonLinks } from '@/lib/echelon';

const highlights = [
  {
    icon: Layers,
    title: 'Full-stack TypeScript',
    description: 'A React front end, an Express API and shared types in one monorepo, on Supabase Postgres with Drizzle ORM.',
  },
  {
    icon: Rocket,
    title: 'Production from day one',
    description: 'Stripe billing, automated releases and a full test suite in CI, running fully on Google Cloud with Cloud Run and Firebase Hosting.',
  },
  {
    icon: Bot,
    title: 'Agentic, under direction',
    description: 'Built with Claude Code as a pair-programmer. I own the architecture, and every line is reviewed before it ships.',
  },
];

const techStack = [
  'React', 'TypeScript', 'Vite', 'Material UI', 'TanStack Query', 'Node.js', 'Express', 'PostgreSQL',
  'Supabase', 'Drizzle ORM', 'Stripe', 'Resend', 'Vitest', 'Docker', 'Google Cloud Run',
  'Firebase Hosting', 'GitHub Actions', 'semantic-release', 'PWA', 'Claude Code',
];

export default function EchelonShowcaseSection() {
  return (
    <EchelonPanel as="section" id="echelon" labelledBy="echelon-heading" className="mb-12 scroll-mt-28">
      <div className="relative p-6 sm:p-10 lg:p-14 space-y-12">

        {/* Overview + screenshot */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-echelon-violet/25 text-echelon-lilac text-xs font-bold uppercase tracking-wider">
                Flagship Project
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider">
                A SQL Squared Ltd product
              </span>
            </div>

            <EchelonWordmark size="lg" className="mb-6" />

            <h3 id="echelon-heading" className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              The easiest way to run a Warhammer 40K Crusade campaign.
            </h3>
            <div className="space-y-4 text-white/70 text-lg leading-relaxed mb-8">
              <p>
                Echelon is the biggest thing I have ever built: a live web app that replaces the spreadsheets Crusade groups juggle
                with one shared campaign manager. Every player&apos;s roster, battle and unit story stays in sync, on the phone at
                the table and the laptop at home.
              </p>
              <p>
                It started as a fix for the spreadsheet chaos in my own gaming group, and has grown into a product with free and
                paid tiers and its own community on Discord.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-echelon-violet text-white hover:bg-echelon-violet/85 rounded-full px-6 shadow-[0_8px_30px_-6px_hsl(var(--echelon-violet)/0.7)]">
                <Link href={echelonLinks.site} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Visit Echelon
                </Link>
              </Button>
              <Button variant="outline" asChild className="border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-full px-6">
                <Link href={echelonLinks.discord} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Join the Discord
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-echelon-lilac hover:bg-white/5 hover:text-white rounded-full px-5">
                <Link href={echelonLinks.about} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="mr-2 h-4 w-4" /> Why I built it
                </Link>
              </Button>
            </div>
          </div>

          <EchelonScreenCarousel />
        </div>

        {/* How it's built */}
        <div>
          <p className="text-echelon-lilac text-xs font-bold uppercase tracking-wider mb-5">How it&apos;s built</p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-echelon-violet/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="h-10 w-10 rounded-xl bg-echelon-violet/25 flex items-center justify-center text-echelon-lilac mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="font-semibold mb-2">{item.title}</p>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 ring-1 ring-white/10 text-white/70 text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </EchelonPanel>
  );
}
