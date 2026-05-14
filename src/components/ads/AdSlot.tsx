import { useEffect, useRef, useState } from "react";

interface AdSlotProps {
  slotId: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  label?: string;
  adKey?: string;
  adWidth?: number;
  adHeight?: number;
  lazyLoad?: boolean;
}

export default function AdSlot({
  slotId,
  width = "100%",
  height = "90px",
  className = "",
  label = "Advertisement",
  adKey = "",
  adWidth = 728,
  adHeight = 90,
  lazyLoad = true,
}: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);
  const [isVisible, setIsVisible] = useState(!lazyLoad);

  // Lazy load with IntersectionObserver
  useEffect(() => {
    if (!lazyLoad) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lazyLoad]);

  // Inject Adsterra
  useEffect(() => {
    if (!isVisible) return;
    if (injected.current) return;

    const container = containerRef.current;
    if (!container) return;

    // If no custom adKey, don't inject (show placeholder only)
    if (!adKey) {
      console.warn(`[AdSlot] No adKey provided for ${slotId}`);
      return;
    }

    container.innerHTML = "";

    // Set global atOptions
    (window as any).atOptions = {
      key: adKey,
      format: "iframe",
      height: adHeight,
      width: adWidth,
      params: {},
    };

    // Script 1: Declare atOptions (with CF bypass)
    const script1 = document.createElement("script");
    script1.setAttribute("data-cfasync", "false");
    script1.textContent = `
      window.atOptions = ${JSON.stringify((window as any).atOptions)};
    `;

    // Script 2: Adsterra invoke (with CF bypass)
    const script2 = document.createElement("script");
    script2.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script2.async = true;
    script2.setAttribute("data-cfasync", "false");

    container.appendChild(script1);
    container.appendChild(script2);

    injected.current = true;
    console.log(`[AdSlot] Injected ${slotId} with key ${adKey}`);
  }, [isVisible, adKey, adHeight, adWidth, slotId]);

  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      ref={containerRef}
      id={`ad-${slotId}`}
      data-ad-slot={slotId}
      className={`ad-slot relative overflow-hidden ${className}`}
      style={{ width: widthStyle, minHeight: heightStyle }}
    >
      {!isVisible && (
        <div className="w-full h-full bg-slate-50/50 dark:bg-slate-800/20 rounded-lg animate-pulse" />
      )}
      {isVisible && !adKey && (
        <div className="w-full h-full bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center gap-1.5 px-4">
          <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {label}
          </span>
          <span className="text-[9px] text-slate-300 dark:text-slate-600">
            {slotId}
          </span>
        </div>
      )}
    </div>
  );
}
