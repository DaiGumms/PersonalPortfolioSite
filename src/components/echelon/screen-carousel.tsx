'use client';

import { useEffect, useState, type FocusEvent } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { BrowserFrame, PhoneFrame } from '@/components/echelon/brand';
import { echelonScreens } from '@/lib/echelon';
import { cn } from '@/lib/utils';

const INTERVAL_MS = 5000;

// Crossfades the desktop and phone captures through echelonScreens on a timer.
// Pauses while a mouse is over it, while it has keyboard focus, after the pause
// button is pressed or in a hidden tab, and never auto-advances under
// prefers-reduced-motion; the dots always allow picking a screen by hand. Pressing
// play resumes even with focus inside. Only screens that are active, next or
// already visited are mounted, so the rest don't all download up front.
export function EchelonScreenCarousel() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [visited, setVisited] = useState(() => echelonScreens.map((_, i) => i === 0));
  const paused = hovered || focused || stopped;
  const next = (active + 1) % echelonScreens.length;
  const isMounted = (i: number) => visited[i] || i === active || i === next;

  useEffect(() => {
    setVisited((v) => (v[active] ? v : v.map((seen, i) => seen || i === active)));
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

  // Only keyboard focus pauses: a mouse click also focuses the button in most
  // browsers, and that shouldn't keep the carousel paused after the mouse leaves.
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (e.target.matches(':focus-visible')) setFocused(true);
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
  };
  const togglePlay = () => {
    if (stopped) setFocused(false);
    setStopped(!stopped);
  };

  const screens = (suffix: string, view: string, sizes: string) =>
    echelonScreens.map((screen, i) =>
      isMounted(i) ? (
        <Image
          key={screen.key}
          src={`/images/projects/echelon/${screen.key}${suffix}.webp`}
          alt={i === active ? `Echelon ${screen.title}, ${view} view` : ''}
          aria-hidden={i !== active}
          fill
          sizes={sizes}
          className={cn(
            'object-cover object-top transition-opacity duration-700 motion-reduce:transition-none',
            i === active ? 'opacity-100' : 'opacity-0',
          )}
        />
      ) : null,
    );

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Echelon screens"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className="echelon-tilt relative pb-10 pr-12 sm:pr-16" aria-live={paused ? 'polite' : 'off'}>
        <BrowserFrame>{screens('', 'desktop', '(max-width: 1024px) 100vw, 50vw')}</BrowserFrame>
        <PhoneFrame className="echelon-parallax-near absolute right-0 bottom-0 w-[24%] min-w-[90px] max-w-[180px]">
          {screens('-mobile', 'phone', '180px')}
        </PhoneFrame>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}
          className="-ml-1.5 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echelon-lilac motion-reduce:hidden"
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
                i === active ? 'w-6 bg-echelon-lilac' : 'w-1.5 bg-white/45 group-hover:bg-white/70',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
