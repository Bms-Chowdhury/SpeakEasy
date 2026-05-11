import { useEffect, useRef } from 'react';

function AdsterraInline({ adKey, width, height }: { adKey: string; width: number; height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    const container = ref.current;
    if (!container) return;

    container.innerHTML = "";
    (window as any).atOptions = { key: adKey, format: "iframe", height, width, params: {} };

    const s1 = document.createElement("script");
    s1.setAttribute("data-cfasync", "false");
    s1.textContent = `window.atOptions = ${JSON.stringify((window as any).atOptions)};`;

    const s2 = document.createElement("script");
    s2.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    s2.async = true;
    s2.setAttribute("data-cfasync", "false");

    container.appendChild(s1);
    container.appendChild(s2);
    injected.current = true;
  }, [adKey, width, height]);

  return <div ref={ref} style={{ height: `${height}px`, width: `${width}px` }} />;
}

export default function FeedAd({ position }: { position: number }) {
  return (
    <div className="col-span-1 md:col-span-2 py-2">
      {/* Mobile only (default visible, hidden on md) */}
      <div className="block md:hidden">
        <AdsterraInline adKey="6f8260d71c372d2e4129753f82d54d6a" width={320} height={50} />
      </div>
      {/* Desktop only (hidden on mobile, visible on md+) */}
      <div className="hidden md:block">
        <AdsterraInline adKey="7ba9fed2fa5b33b663af8cde4b27dcec" width={728} height={90} />
      </div>
    </div>
  );
}