import { useState, useEffect } from "react";
import { X } from "lucide-react";
import MobileAdSlot from "./MobileAdSlot";

export default function StickyBottomMobileAd() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("sticky-bottom-ad-dismissed");
    if (dismissed === "true") setIsDismissed(true);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("sticky-bottom-ad-dismissed", "true");
  };

  if (!isMobile || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 safe-area-bottom">
      <div className="relative max-w-lg mx-auto">
        <button
          onClick={handleDismiss}
          className="absolute -top-8 right-1 p-1.5 rounded-t-lg bg-white dark:bg-slate-900 border border-b-0 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          aria-label="Close advertisement"
        >
          <X size={12} />
        </button>
        <MobileAdSlot slotId="mobile-sticky-bottom" height="50px" />
      </div>
    </div>
  );
}
