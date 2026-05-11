import { useEffect } from "react";

type Props = {
  slotId: string;
  height: string;
  label?: string;
};

export default function DesktopAdSlot({ slotId, height }: Props) {
  useEffect(() => {
    const container = document.getElementById(slotId);
    if (!container) return;

    container.innerHTML = "";

    const script1 = document.createElement("script");
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

    container.appendChild(script1);
    container.appendChild(script2);
  }, [slotId]);

  return (
    <div
      id={slotId}
      style={{ height }}
      className="flex justify-center items-center"
    />
  );
}