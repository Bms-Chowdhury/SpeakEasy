import { useEffect, useRef, useState } from 'react';
import AdSlot from './AdSlot';

export default function StickySidebarAd() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check desktop via CSS media query (not JS breakpoint)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Sticky detection
  useEffect(() => {
    if (!isDesktop) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <aside className="hidden lg:block w-[300px] shrink-0">
      <div ref={sentinelRef} className="h-0" />
      <div className={`space-y-6 ${isStuck ? 'fixed top-20 w-[300px]' : ''}`}>
        <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <AdSlot
            slotId="desktop-sidebar-primary"
            width="300px"
            height="250px"
            adKey="7ba9fed2fa5b33b663af8cde4b27dcec"
            adWidth={300}
            adHeight={250}
            label="Advertisement"
          />
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <AdSlot
            slotId="desktop-sidebar-secondary"
            width="300px"
            height="600px"
            adKey="7ba9fed2fa5b33b663af8cde4b27dcec"
            adWidth={300}
            adHeight={600}
            label="Advertisement"
          />
        </div>
      </div>
    </aside>
  );
}