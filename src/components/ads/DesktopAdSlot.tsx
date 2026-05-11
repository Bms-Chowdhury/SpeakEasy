import { useEffect, useRef } from "react";

type Props = {
  slotId: string;
  height: string;
  label?: string;
};

export default function DesktopAdSlot({ slotId, height }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    // ✅ Strict Mode-safe: double injection prevention
    if (injected.current) return;
    const container = containerRef.current;
    if (!container) return;

    // ✅ Clear any existing content
    container.innerHTML = "";

    // ✅ KEY FIX: Adsterra requires 'atOptions' as global BEFORE loading invoke.js
    // We must attach to window, not just local scope
    (window as any).atOptions = {
      key: "7ba9fed2fa5b33b663af8cde4b27dcec",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    // ✅ Create script1 — data-cfasync="false" bypasses Cloudflare
    const script1 = document.createElement("script");
    script1.setAttribute("data-cfasync", "false");
    script1.textContent = `
      (function() {
        window.atOptions = ${JSON.stringify((window as any).atOptions)};
      })();
    `;

    // ✅ Create script2 — the main invoke script
    const script2 = document.createElement("script");
    script2.src = "https://www.highperformanceformat.com/7ba9fed2fa5b33b663af8cde4b27dcec/invoke.js";
    script2.async = true;
    script2.setAttribute("data-cfasync", "false");

    // ✅ Append in correct order
    container.appendChild(script1);
    container.appendChild(script2);

    injected.current = true;

    // ✅ Debug: confirm injection
    console.log(`[Adsterra] Desktop ad ${slotId} injected`);
  }, []); // No dependencies

  return (
    <div
      ref={containerRef}
      style={{ height, minWidth: "728px" }}
      className="flex justify-center items-center overflow-hidden"
    />
  );
}