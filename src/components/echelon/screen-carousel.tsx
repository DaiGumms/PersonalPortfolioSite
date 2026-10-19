'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { BrowserFrame, PhoneFrame } from '@/components/echelon/brand';
import { echelonScreens } from '@/lib/echelon';
import { cn } from '@/lib/utils';

const INTERVAL_MS = 5000;

// Crossfades the desktop and phone captures through echelonScreens on a timer.
// Pauses while hovered, focused, stopped with the pause button or in a hidden tab,
// and never auto-advances under prefers-reduced-motion; the dots below always allow
// picking a screen by hand. Only the active and next screens are mounted until
// visited, so the rest don't all download up front.
export function EchelonScreenCarousel() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [mounted, setMounted] = useState(() => echelonScreens.map((_, i) => i < 2));
  const paused = hovered || focused || stopped;

  useEffect(() => {
    const next = (active + 1) % echelonScreens.length;
    setMounted((m) => (m[active] && m[next] ? m : m.map((v, i) => v || i === active || i === next)));
  }, [active]);

  // An interval rather than a one-shot timeout, so a tick skipped in a hidden tab
  // doesn't leave the carousel stuck; changing `active` restarts the countdown.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActive((i) => (i + 1) % echelonScreens.length);
      }
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="echelon-tilt relative pb-10 pr-12 sm:pr-16">
        <BrowserFrame>
          {echelonScreens.map((screen, i) =>
            mounted[i] ? (
              <Image
                key={screen.key}
                src={`/images/projects/echelon/${screen.key}.webp`}
                alt={i === active ? `Echelon ${screen.title}, desktop view` : ''}
                aria-hidden={i !== active}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={fade(i)}
              />
            ) : null,
          )}
        </BrowserFrame>
        <PhoneFrame className="echelon-parallax-near absolute right-0 bottom-0 w-[24%] min-w-[90px] max-w-[180px]">
          {echelonScreens.map((screen, i) =>
            mounted[i] ? (
              <Image
                key={screen.key}
                src={`/images/projects/echelon/${screen.key}-mobile.webp`}
                alt={i === active ? `Echelon ${screen.title}, phone view` : ''}
                aria-hidden={i !== active}
                fill
                sizes="180px"
                className={fade(i)}
              />
            ) : null,
          )}
        </PhoneFrame>
      </div>

      <div className="flex items-center gap-1 mt-2 -ml-1.5">
        <button
          type="button"
          onClick={() => setStopped((s) => !s)}
          aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echelon-lilac motion-reduce:hidden"
        >
          {stopped ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
        {echelonScreens.map((screen, i) => (
          <button
            key={screen.key}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${screen.title}`}
            aria-current={i === active}
            className="group flex h-8 min-w-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echelon-lilac"
          >
            <span
              className={cn(
                'block h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none',
                i === active ? 'w-6 bg-echelon-lilac' : 'w-1.5 bg-white/30 group-hover:bg-white/60',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
