import MobileAdSlot from './MobileAdSlot';
import DesktopAdSlot from './DesktopAdSlot';

/**
 * Feed/grid ad — inserted between rows in a card grid.
 * - Mobile: full-width banner between cards
 * - Desktop: full-width leaderboard between rows
 *
 * Usage: Insert after every N cards in a grid
 * <FeedAd position={2} />
 */

interface FeedAdProps {
  position: number; // which row position (for unique slot ID)
}

export default function FeedAd({ position }: FeedAdProps) {
  return (
    <div className="col-span-1 md:col-span-2 py-2">
      <MobileAdSlot
        slotId={`mobile-feed-${position}`}
        height="100px"
        label="Advertisement"
        className="rounded-lg"
      />
      <DesktopAdSlot
        slotId={`desktop-feed-${position}`}
        height="90px"
        label="Advertisement"
        className="rounded-lg"
      />
    </div>
  );
}
