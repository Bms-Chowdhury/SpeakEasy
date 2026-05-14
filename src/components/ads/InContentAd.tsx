import AdSlot from "./AdSlot";

interface InContentAdProps {
  slotId: string;
  position?: "top" | "middle" | "bottom";
}

export default function InContentAd({
  slotId,
  position = "middle",
}: InContentAdProps) {
  const heightMap = {
    top: "90px",
    middle: "120px",
    bottom: "90px",
  };

  // Different ad keys for different positions (optional)
  const keyMap = {
    top: "7ba9fed2fa5b33b663af8cde4b27dcec",
    middle: "7ba9fed2fa5b33b663af8cde4b27dcec",
    bottom: "7ba9fed2fa5b33b663af8cde4b27dcec",
  };

  return (
    <div className="my-8 md:my-10">
      <AdSlot
        slotId={slotId}
        height={heightMap[position]}
        adKey={keyMap[position]}
        adWidth={728}
        adHeight={position === "middle" ? 120 : 90}
        label="Advertisement"
        className="rounded-lg"
      />
    </div>
  );
}
