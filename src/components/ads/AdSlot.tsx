import { useEffect, useRef, useState } from 'react';

/**
 * Base ad slot component — CLS-safe with fixed placeholder dimensions.
 * Lazy-loads via IntersectionObserver so ads never block rendering.
 *
 * Props:
 * - slotId: unique identifier for the ad slot (e.g. "home-top-banner")
 * - width / height: placeholder dimensions to prevent layout shift
 * - className: extra styling
 * - label: optional label shown in the ad placeholder
 */

interface AdSlotProps {
  slotId: string;
  width?: string;
  height?: string;
  className?: string;
  label?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto';
}

export default function AdSlot({
  slotId,
  width = '100%',
  height = '90px',
  className = '',
  label = 'Advertisement',
  format = 'horizontal',
}: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lazy load: only render ad content when slot enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' } // Start loading 200px before visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Simulate ad load delay (replace with real ad SDK callback)
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      id={`ad-${slotId}`}
      data-ad-slot={slotId}
      data-ad-format={format}
      className={`ad-slot relative overflow-hidden ${className}`}
      style={{
        width,
        minHeight: height,
        // Fixed min-height prevents CLS — ad fills this space when loaded
      }}
    >
      {isVisible ? (
        <div className="w-full h-full flex items-center justify-center">
          {isLoaded ? (
            /* 
              === PRODUCTION AD INTEGRATION ===
              Replace this div with your real ad code:

              For Google AdSense:
              <ins className="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            */
            <div className="w-full h-full bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center gap-1.5 px-4">
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">{label}</span>
              <span className="text-[9px] text-slate-300 dark:text-slate-600">{slotId}</span>
            </div>
          ) : (
            <div className="w-full h-full bg-slate-50/50 dark:bg-slate-800/20 rounded-lg animate-pulse" />
          )}
        </div>
      ) : (
        // Placeholder maintains layout space before lazy load triggers
        <div className="w-full h-full bg-transparent" />
      )}
    </div>
  );
}
