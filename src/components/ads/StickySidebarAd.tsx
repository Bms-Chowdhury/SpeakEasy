import { useEffect, useRef, useState } from 'react';
import AdSlot from './AdSlot';
import { useIsDesktop } from '../../hooks/useDevice';

/**
 * Sticky sidebar ad for desktop — stays visible while scrolling article.
 * Highest RPM desktop placement.
 *
 * - Only renders on desktop (md+ breakpoint)
 * - Sticks to top of sidebar with offset for navbar
 * - Stops sticking when reaching end of sidebar container
 * - 300px wide standard ad size
 */

export default function StickySidebarAd() {
  const isDesktop = useIsDesktop();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' } // 80px = navbar height offset
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <aside className="hidden lg:block w-[300px] shrink-0">
      {/* Sentinel — detects when sidebar top reaches navbar */}
      <div ref={sentinelRef} className="h-0" />

      <div
        className={`space-y-6 ${
          isStuck
            ? 'fixed top-20 w-[300px]'
            : ''
        }`}
      >
        {/* Primary sidebar ad */}
        <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <AdSlot
            slotId="desktop-sidebar-primary"
            height="250px"
            width="300px"
            label="Advertisement"
            format="rectangle"
          />
        </div>

        {/* Secondary sidebar ad — appears lower */}
        <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <AdSlot
            slotId="desktop-sidebar-secondary"
            height="600px"
            width="300px"
            label="Advertisement"
            format="vertical"
          />
        </div>
      </div>
    </aside>
  );
}
