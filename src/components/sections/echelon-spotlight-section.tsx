import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { BrowserFrame, EchelonWordmark, PhoneFrame } from '@/components/echelon/brand';
import { EchelonPanel } from '@/components/echelon/interactive-panel';
import { echelonLinks, echelonStats } from '@/lib/echelon';

export default function EchelonSpotlightSection() {
  return (
    <section aria-labelledby="echelon-spotlight-heading" className="py-16 md:py-24 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6">
        <EchelonPanel>
          <div className="relative grid lg:grid-cols-2 gap-12 items-center p-6 sm:p-10 lg:p-14">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-echelon-violet/25 text-echelon-lilac text-xs font-bold uppercase tracking-wider mb-8">
                My biggest build
              </span>
              <EchelonWordmark size="lg" className="mb-6" />
              <h2 id="echelon-spotlight-heading" className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                A live SaaS for Warhammer 40K Crusade campaigns, built by me at SQL Squared Ltd.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Rosters, battles, XP and every unit&apos;s story, shared live across a whole gaming group. Designed, engineered
                and shipped end to end, from the Postgres schema to Stripe billing.
              </p>

              <dl className="grid grid-cols-3 gap-4 mb-10">
                {echelonStats.slice(0, 3).map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl md:text-3xl font-bold font-display bg-gradient-to-br from-white to-echelon-lilac bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                      <span className="block text-xs md:text-sm text-white/60 mt-1" aria-hidden>
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-echelon-violet text-white hover:bg-echelon-violet/85 rounded-full px-6 h-12 shadow-[0_8px_30px_-6px_hsl(var(--echelon-violet)/0.7)]">
                  <Link href="/projects#echelon">
                    See how I built it <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-full px-6 h-12">
                  <Link href={echelonLinks.site} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Echelon
                  </Link>
                </Button>
              </div>
            </div>

            <div className="echelon-tilt relative pb-10 pr-12 sm:pr-16">
              <BrowserFrame
                src="/images/projects/echelon/campaign-overview.webp"
                alt="Echelon campaign overview, desktop view"
              />
              <PhoneFrame
                src="/images/projects/echelon/battle-companion-mobile.webp"
                alt="Echelon live battle companion, phone view"
                className="echelon-parallax-near absolute right-0 bottom-0 w-[26%] min-w-[90px] max-w-[170px]"
              />
            </div>
          </div>
        </EchelonPanel>
      </div>
    </section>
  );
}
