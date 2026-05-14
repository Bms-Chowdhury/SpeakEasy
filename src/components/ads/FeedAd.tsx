import DesktopAdSlot from "./DesktopAdSlot";
import MobileAdSlot from "./MobileAdSlot";

interface FeedAdProps {
  position: number;
}

export default function FeedAd({ position }: FeedAdProps) {
  return (
    <div className="col-span-1 md:col-span-2 py-2">
      {/* Mobile only */}
      <div className="block md:hidden">
        <MobileAdSlot slotId={`mobile-feed-${position}`} height="50px" />
      </div>
      {/* Desktop only */}
      <div className="hidden md:block">
        <DesktopAdSlot slotId={`desktop-feed-${position}`} height="90px" />
      </div>
    </div>
  );
}
