import { useEffect } from "react";

type Props = {
  slotId: string;
  height: string;
  label?: string;
};

export default function MobileAdSlot({ slotId, height }: Props) {
  useEffect(() => {
    const container = document.getElementById(slotId);
    if (!container) return;

    container.innerHTML = "";

    const script1 = document.createElement("script");
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