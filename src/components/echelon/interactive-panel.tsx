'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// The always-dark Echelon panel. Tracks the mouse and exposes its position as --mx / --my
// (0 to 1 across the panel), which globals.css uses for the cursor glow, the starfield
// parallax and the screenshot tilt. Ignores touch and pen, and does nothing under
// prefers-reduced-motion, so the panel rests in its neutral state there.
export function EchelonPanel({
  as: Tag = 'div',
  id,
  labelledBy,
  className,
  children,
}: {
  as?: 'section' | 'div';
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || reducedMotion.matches) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', x.toFixed(3));
        el.style.setProperty('--my', y.toFixed(3));
        el.dataset.active = '';
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
      delete el.dataset.active;
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'echelon-panel echelon-nebula relative overflow-hidden rounded-[2rem] text-white shadow-ambient-lg',
        className,
      )}
    >
      <div className="echelon-starfield echelon-parallax-far absolute -inset-6 opacity-70 pointer-events-none" />
      <div className="echelon-glow absolute inset-0 pointer-events-none" />
      {children}
    </Tag>
  );
}
