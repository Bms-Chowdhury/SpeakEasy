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
    if (injected.current) return;
    const container = containerRef.current;
    if (!container) return;

    injected.current = true;
    container.innerHTML = "";

    const script1 = document.createElement("script");
    script1.setAttribute("data-cfasync", "false");
    script1.innerHTML = `
      atOptions = {
        key: "7ba9fed2fa5b33b663af8cde4b27dcec",
        format: "iframe",
        height: 90,
        width: 728,
        params: {}
      };
    `;

    const script2 = document.createElement("script");
    script2.src =
      "https://www.highperformanceformat.com/7ba9fed2fa5b33b663af8cde4b27dcec/invoke.js";
    script2.async = true;
    script2.setAttribute("data-cfasync", "false");

    container.appendChild(script1);
    container.appendChild(script2);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height, minWidth: "728px" }}
      className="flex justify-center items-center overflow-hidden"
    />
  );
}