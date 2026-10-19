'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BrowserFrame, PhoneFrame } from '@/components/echelon/brand';
import { echelonScreens } from '@/lib/echelon';
import { cn } from '@/lib/utils';

const INTERVAL_MS = 5000;

// Crossfades the desktop and phone captures through echelonScreens on a timer.
// Pauses while hovered, focused or in a hidden tab, and never auto-advances under
// prefers-reduced-motion; the dots below always allow picking a screen by hand.
export function EchelonScreenCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => {
      if (document.visibilityState === 'visible') {
        setActive((i) => (i + 1) % echelonScreens.length);
      }
    }, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  const fade = (i: number) =>
    cn(
      'object-cover object-top transition-opacity duration-700 motion-reduce:transition-none',
      i === active ? 'opacity-100' : 'opacity-0',
    );

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Echelon screens"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="echelon-tilt relative pb-10 pr-12 sm:pr-16">
        <BrowserFrame>
          {echelonScreens.map((screen, i) => (
            <Image
              key={screen.key}
              src={`/images/projects/echelon/${screen.key}.webp`}
              alt={i === active ? `Echelon ${screen.title}, desktop view` : ''}
              aria-hidden={i !== active}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={fade(i)}
            />
          ))}
        </BrowserFrame>
        <PhoneFrame className="echelon-parallax-near absolute right-0 bottom-0 w-[24%] min-w-[90px] max-w-[180px]">
          {echelonScreens.map((screen, i) => (
            <Image
              key={screen.key}
              src={`/images/projects/echelon/${screen.key}-mobile.webp`}
              alt={i === active ? `Echelon ${screen.title}, phone view` : ''}
              aria-hidden={i !== active}
              fill
              sizes="180px"
              className={fade(i)}
            />
          ))}
        </PhoneFrame>
      </div>

      <div className="flex items-center gap-2 mt-2">
        {echelonScreens.map((screen, i) => (
          <button
            key={screen.key}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${screen.title}`}
            aria-current={i === active}
            className="group p-1.5 -m-0.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echelon-lilac"
          >
            <span
              className={cn(
                'block h-1.5 rounded-full transition-all duration-300',
                i === active ? 'w-6 bg-echelon-lilac' : 'w-1.5 bg-white/30 group-hover:bg-white/60',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
