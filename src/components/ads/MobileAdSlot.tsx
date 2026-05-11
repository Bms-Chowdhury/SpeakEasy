import { useEffect, useRef } from "react";

type Props = {
  slotId: string;
  height: string;
  label?: string;
};

export default function MobileAdSlot({ slotId, height }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    (window as any).atOptions = {
      key: "6f8260d71c372d2e4129753f82d54d6a",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    const script1 = document.createElement("script");
    script1.setAttribute("data-cfasync", "false");
    script1.textContent = `
      (function() {
        window.atOptions = ${JSON.stringify((window as any).atOptions)};
      })();
    `;

    const script2 = document.createElement("script");
    script2.src = "https://www.highperformanceformat.com/6f8260d71c372d2e4129753f82d54d6a/invoke.js";
    script2.async = true;
    script2.setAttribute("data-cfasync", "false");

    container.appendChild(script1);
    container.appendChild(script2);

    injected.current = true;
    console.log(`[Adsterra] Mobile ad ${slotId} injected`);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height, minWidth: "320px" }}
      className="flex justify-center items-center overflow-hidden"
    />
  );
}