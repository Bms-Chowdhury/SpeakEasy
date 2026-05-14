import DesktopAdSlot from "./DesktopAdSlot";
import MobileAdSlot from "./MobileAdSlot";

export default function HeaderBannerAd() {
  return (
    <div className="w-full border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex justify-center">
        {/* Mobile (below sm breakpoint) */}
        <div className="block sm:hidden">
          <MobileAdSlot slotId="mobile-header-banner" height="50px" />
        </div>
        {/* Desktop (sm and above) */}
        <div className="hidden sm:block">
          <DesktopAdSlot slotId="desktop-header-banner" height="90px" />
        </div>
      </div>
    </div>
  );
}
