import { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
  slotId: string;
  width?: string;
  height?: string;
  className?: string;
  label?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto';
  adKey?: string;      // Adsterra key
  adWidth?: number;    // e.g., 728
  adHeight?: number;   // e.g., 90
}

export default function AdSlot({
  slotId,
  width = '100%',
  height = '90px',
  className = '',
  label = 'Advertisement',
  format = 'horizontal',
  adKey = '7ba9fed2fa5b33b663af8cde4b27dcec', // example desktop
  adWidth = 728,
  adHeight = 90,
}: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const injected = useRef(false);

  // IntersectionObserver for lazy loading
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
      { rootMargin: '200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Inject Adsterra when visible
  useEffect(() => {
    if (!isVisible) return;
    if (injected.current) return;

    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    (window as any).atOptions = {
      key: adKey,
      format: "iframe",
      height: adHeight,
      width: adWidth,
      params: {},
    };

    const script1 = document.createElement("script");
    script1.setAttribute("data-cfasync", "false");
    script1.textContent = `
      window.atOptions = ${JSON.stringify((window as any).atOptions)};
    `;

    const script2 = document.createElement("script");
    script2.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script2.async = true;
    script2.setAttribute("data-cfasync", "false");

    container.appendChild(script1);
    container.appendChild(script2);

    injected.current = true;
  }, [isVisible, adKey, adHeight, adWidth]);

  return (
    <div
      ref={containerRef}
      id={`ad-${slotId}`}
      data-ad-slot={slotId}
      data-ad-format={format}
      className={`ad-slot relative overflow-hidden ${className}`}
      style={{ width, minHeight: height }}
    >
      {!isVisible && (
        <div className="w-full h-full bg-transparent" />
      )}
    </div>
  );
}