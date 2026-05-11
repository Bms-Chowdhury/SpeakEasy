import AdSlot from './AdSlot';
import MobileAdSlot from './MobileAdSlot';
import DesktopAdSlot from './DesktopAdSlot';

/**
 * Header banner ad — first visible ad on the page.
 * - Mobile: shorter banner (50px)
 * - Desktop: full leaderboard (90px)
 * Placed directly below the navbar.
 */

export default function HeaderBannerAd() {
  return (
    <div className="w-full border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
        {/* Mobile version */}
        <MobileAdSlot
          slotId="mobile-header-banner"
          height="50px"
          label="Advertisement"
        />
        {/* Desktop version */}
        <DesktopAdSlot
          slotId="desktop-header-banner"
          height="90px"
          label="Advertisement"
        />
      </div>
    </div>
  );
}
