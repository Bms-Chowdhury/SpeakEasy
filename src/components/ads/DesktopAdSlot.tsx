import { useEffect, useRef } from 'react';

interface DesktopAdSlotProps {
  slotId: string;
  height?: string;
  label?: string;
  adKey?: string;
}

export default function DesktopAdSlot({
  slotId,
  height = '90px',
  label = 'Advertisement',
  adKey = '7ba9fed2fa5b33b663af8cde4b27dcec',
}: DesktopAdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    (window as any).atOptions = {
      key: adKey,
      format: 'iframe',
      height: 90,
      width: 728,
      params: {},
    };

    const script1 = document.createElement('script');
    script1.setAttribute('data-cfasync', 'false');
    script1.textContent = `
      window.atOptions = ${JSON.stringify((window as any).atOptions)};
    `;

    const script2 = document.createElement('script');
    script2.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script2.async = true;
    script2.setAttribute('data-cfasync', 'false');

    container.appendChild(script1);
    container.appendChild(script2);

    injected.current = true;
    console.log(`[DesktopAd] ${slotId} injected`);
  }, [adKey, slotId]);

  return (
    <div
      ref={containerRef}
      style={{ height, minWidth: '728px' }}
      className="flex justify-center items-center overflow-hidden"
    />
  );
}