import Image from 'next/image';
import { cn } from '@/lib/utils';

// Brand primitives that mirror echelon.sqlsquared.co.uk: the stacked-chevron mark,
// the Cinzel wordmark, and the browser/phone frames used around product screenshots.

export function EchelonWordmark({ size = 'md', className }: { size?: 'md' | 'lg'; className?: string }) {
  const mark = size === 'lg' ? 44 : 32;
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image src="/logos/echelon.svg" alt="" width={mark} height={mark} aria-hidden />
      <span
        className={cn(
          'font-echelon font-semibold tracking-[0.18em] bg-gradient-to-r from-white via-echelon-lilac to-echelon-violet bg-clip-text text-transparent',
          size === 'lg' ? 'text-3xl md:text-4xl' : 'text-2xl',
        )}
      >
        ECHELON
      </span>
    </div>
  );
}

export function BrowserFrame({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden bg-echelon-void ring-1 ring-white/10 shadow-[0_30px_80px_-20px_hsl(var(--echelon-violet)/0.45)]">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/50">
          echelon.sqlsquared.co.uk
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={860}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="w-full h-auto"
      />
    </div>
  );
}

export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[1.4rem] p-1.5 bg-echelon-void ring-1 ring-white/15 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={780}
        height={1688}
        sizes="200px"
        className="w-full h-auto rounded-[1.1rem]"
      />
    </div>
  );
}
