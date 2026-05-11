import { useEffect, useRef } from "react";

type Props = {
  slotId: string;
  height: string;
  label?: string;
};

export default function MobileAdSlot({ slotId, height }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false); // double-inject রোধ করবে

  useEffect(() => {
    if (injected.current) return; // already injected, skip
    const container = containerRef.current;
    if (!container) return;

    injected.current = true;
    container.innerHTML = "";

    const script1 = document.createElement("script");
    script1.setAttribute("data-cfasync", "false"); // Cloudflare bypass
    script1.innerHTML = `
      atOptions = {
        key: "6f8260d71c372d2e4129753f82d54d6a",
        format: "iframe",
        height: 50,
        width: 320,
        params: {}
      };
    `;

    const script2 = document.createElement("script");
    script2.src =
      "https://www.highperformanceformat.com/6f8260d71c372d2e4129753f82d54d6a/invoke.js";
    script2.async = true;
    script2.setAttribute("data-cfasync", "false"); // Cloudflare bypass

    container.appendChild(script1);
    container.appendChild(script2);
  }, []);

  return (
    <div
      ref={containerRef} // id-এর বদলে ref ব্যবহার করুন
      style={{ height, minWidth: "320px" }}
      className="flex justify-center items-center overflow-hidden"
    />
  );
}