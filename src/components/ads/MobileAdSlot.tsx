import { useEffect, useRef } from 'react';

interface MobileAdSlotProps {
  slotId: string;
  height?: string;
  label?: string;
  adKey?: string;
  className?: string;  // ✅ className যোগ করা হলো
}

export default function MobileAdSlot({
  slotId,
  height = '50px',
  label = 'Advertisement',
  adKey = '6f8260d71c372d2e4129753f82d54d6a',
  className = '',  // ✅ ডিফল্ট empty string
}: MobileAdSlotProps) {
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
      height: 50,
      width: 320,
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
    console.log(`[MobileAd] ${slotId} injected`);
  }, [adKey, slotId]);

  return (
    <div
      ref={containerRef}
      style={{ height, minWidth: '320px' }}
      className={`flex justify-center items-center overflow-hidden ${className}`}  // ✅ className এখানে যোগ করা হলো
    />
  );
}