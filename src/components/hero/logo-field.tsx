'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';

// Every logo is a skill from the projects page. Hand-placed so they band the top and bottom of the hero, run down
// the gap beside the photo and peek in at the edges; a few sit behind the frosted text panel as soft blurs.
// x / y are % of the hero, size is px, depth (0 to 1) scales the parallax and drift. `mono` marks black logos
// that need inverting to show in colour on the dark theme.
const logos: { src: string; x: number; y: number; size: number; depth: number; mono?: boolean }[] = [
  // Top band
  { src: '/logos/fabric.svg', x: 4, y: 5, size: 40, depth: 1 },
  { src: '/logos/react.svg', x: 13, y: 10, size: 30, depth: 0.6 },
  { src: '/logos/azure.svg', x: 22, y: 4, size: 26, depth: 0.4 },
  { src: '/logos/typescript.svg', x: 31, y: 9, size: 28, depth: 0.7 },
  { src: '/logos/jupyter.svg', x: 40, y: 4, size: 28, depth: 0.5 },
  { src: '/logos/power-bi.svg', x: 49, y: 9, size: 38, depth: 0.9 },
  { src: '/logos/git.svg', x: 58, y: 4, size: 24, depth: 0.3 },
  { src: '/logos/github-actions.svg', x: 67, y: 8, size: 30, depth: 0.6 },
  { src: '/logos/salesforce.svg', x: 76, y: 4, size: 30, depth: 0.5 },
  { src: '/logos/postgresql.svg', x: 85, y: 9, size: 32, depth: 0.8 },
  { src: '/logos/graphql.svg', x: 94, y: 4, size: 28, depth: 0.5 },
  // Gap beside the photo
  { src: '/logos/python.svg', x: 53, y: 24, size: 28, depth: 0.5 },
  { src: '/logos/azure-devops.svg', x: 54, y: 38, size: 34, depth: 0.9 },
  { src: '/logos/sql-server.svg', x: 53, y: 52, size: 46, depth: 1 },
  { src: '/logos/claude.svg', x: 54, y: 66, size: 30, depth: 0.6 },
  { src: '/logos/docker.svg', x: 53, y: 80, size: 30, depth: 0.5 },
  // Right edge
  { src: '/logos/nextjs.svg', x: 98, y: 22, size: 28, depth: 0.4, mono: true },
  { src: '/logos/csharp.svg', x: 97, y: 38, size: 34, depth: 0.9 },
  { src: '/logos/azure-functions.svg', x: 98, y: 54, size: 28, depth: 0.5 },
  { src: '/logos/supabase.svg', x: 97, y: 70, size: 30, depth: 0.7 },
  // Left edge
  { src: '/logos/google-cloud.svg', x: 2, y: 28, size: 30, depth: 0.6 },
  { src: '/logos/yaml.svg', x: 3, y: 48, size: 24, depth: 0.4 },
  { src: '/logos/vitest.svg', x: 2, y: 68, size: 26, depth: 0.5 },
  // Behind the text panel
  { src: '/logos/drizzle.svg', x: 18, y: 30, size: 34, depth: 0.7 },
  { src: '/logos/azure.svg', x: 36, y: 42, size: 40, depth: 0.9 },
  { src: '/logos/power-bi.svg', x: 22, y: 62, size: 30, depth: 0.5 },
  { src: '/logos/python.svg', x: 38, y: 74, size: 34, depth: 0.8 },
  // Bottom band
  { src: '/logos/vite.svg', x: 3, y: 93, size: 28, depth: 0.6 },
  { src: '/logos/apache-spark.svg', x: 12, y: 97, size: 34, depth: 0.8 },
  { src: '/logos/nodejs.svg', x: 21, y: 92, size: 30, depth: 0.5 },
  { src: '/logos/azure-pipelines.svg', x: 30, y: 97, size: 28, depth: 0.4 },
  { src: '/logos/fabric.svg', x: 39, y: 92, size: 30, depth: 0.7 },
  { src: '/logos/stripe.svg', x: 48, y: 97, size: 26, depth: 0.4 },
  { src: '/logos/azure-data-explorer.svg', x: 57, y: 92, size: 32, depth: 0.8 },
  { src: '/logos/firebase.svg', x: 66, y: 97, size: 28, depth: 0.5 },
  { src: '/logos/sap.svg', x: 75, y: 92, size: 30, depth: 0.6 },
  { src: '/logos/mui.svg', x: 84, y: 97, size: 28, depth: 0.4 },
  { src: '/logos/powershell.svg', x: 93, y: 92, size: 28, depth: 0.6 },
];

function LogoLayer({ imageClassName, colour = false }: { imageClassName: string; colour?: boolean }) {
  return (
    <>
      {logos.map((logo, i) => (
        <div
          key={i}
          className="hero-logo-parallax absolute"
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            marginLeft: -logo.size / 2,
            marginTop: -logo.size / 2,
            '--depth': logo.depth,
          } as CSSProperties}
        >
          <div
            className="motion-safe:[@media(any-hover:hover)]:animate-float"
            style={{ animationDuration: `${5 + (1 - logo.depth) * 4}s`, animationDelay: `${-i * 0.7}s` }}
          >
            <Image
              src={logo.src}
              alt=""
              width={logo.size}
              height={logo.size}
              className={colour && logo.mono ? `${imageClassName} dark:invert` : imageClassName}
            />
          </div>
        </div>
      ))}
    </>
  );
}

// The spotlight's idle route (as 0 to 1 across the hero), threading the logo bands around the photo
const roamPath = [
  [0.55, 0.08],
  [0.9, 0.06],
  [0.97, 0.6],
  [0.65, 0.95],
  [0.48, 0.5],
] as const;
const ROAM_SECONDS = 24;
// How quickly the spotlight closes the gap to its target, per second. Lower is floatier.
const FOLLOW_RATE = 5;
const RETURN_RATE = 1.5;
// The idle roam is slow, so ~30fps (every other 60Hz frame, with slack for timestamp jitter) looks the same
// and halves the repaint work.
const IDLE_FRAME_MS = 29;

function roamPoint(t: number) {
  const pos = ((t / ROAM_SECONDS) % 1) * roamPath.length;
  const i = Math.floor(pos);
  const [x1, y1] = roamPath[i];
  const [x2, y2] = roamPath[(i + 1) % roamPath.length];
  const ease = (1 - Math.cos((pos - i) * Math.PI)) / 2;
  return [x1 + (x2 - x1) * ease, y1 + (y2 - y1) * ease];
}

// Decorative background for the hero: faint logo silhouettes drifting at different depths, with a spotlight
// that reveals them in full colour. The spotlight roams on its own and drifts over to the mouse while it is over
// the hero. One animation loop eases its position towards whichever target applies, so entering and leaving the
// hero glides rather than jumps. The position lives in --hx / --hy (0 to 1 across the hero), which globals.css
// uses for the reveal mask, the glow and the parallax. Listeners go on the parent section so the hero itself can
// stay a server component. The loop only runs while the hero is on screen, and not at all under reduced motion
// or on devices with no hover-capable pointer (phones, tablets), where the spotlight rests at the start of its
// path: the @property initial values for --hx / --hy in globals.css, which must match roamPath[0].
export default function HeroLogoField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (
      !el ||
      !host ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(any-hover: hover)').matches
    ) {
      return;
    }

    let [x, y] = roamPoint(0);
    let mouse: [number, number] | null = null;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      if (!mouse && last && now - last < IDLE_FRAME_MS) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      const [tx, ty] = mouse ?? roamPoint(now / 1000);
      const k = 1 - Math.exp(-dt * (mouse ? FOLLOW_RATE : RETURN_RATE));
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.setProperty('--hx', x.toFixed(4));
      el.style.setProperty('--hy', y.toFixed(4));
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      mouse = [(e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height];
    };
    const onLeave = () => {
      mouse = null;
    };

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(host);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      stop();
      visibility.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="hero-logo-field absolute inset-0 overflow-hidden pointer-events-none">
      <div className="hero-logo-glow absolute inset-0" />
      <LogoLayer imageClassName="brightness-0 opacity-[0.1] dark:invert dark:opacity-[0.16]" />
      <div className="hero-logo-spotlight absolute inset-0">
        <LogoLayer imageClassName="opacity-90" colour />
      </div>
    </div>
  );
}
