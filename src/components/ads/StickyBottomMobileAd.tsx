import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import AdSlot from './AdSlot';
import { useIsMobile } from '../../hooks/useDevice';

/**
 * Sticky bottom ad for mobile — always visible at the bottom of the screen.
 * Dismissible with X button (respects user control).
 * Highest CTR mobile placement.
 *
 * - Fixed to bottom of viewport
 * - Close button to dismiss (session-persistent)
 * - Does NOT overlap content (content gets bottom padding)
 */

export default function StickyBottomMobileAd() {
  const isMobile = useIsMobile();
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if user previously dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('sticky-bottom-ad-dismissed');
    if (dismissed === 'true') setIsDismissed(true);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('sticky-bottom-ad-dismissed', 'true');
  };

  if (!isMobile || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 safe-area-bottom">
      <div className="relative max-w-lg mx-auto">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-8 right-1 p-1.5 rounded-t-lg bg-white dark:bg-slate-900 border border-b-0 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          aria-label="Close advertisement"
        >
          <X size={12} />
        </button>

        <AdSlot
          slotId="mobile-sticky-bottom"
          height="50px"
          label="Ad"
          format="horizontal"
          className="!rounded-none"
        />
      </div>
    </div>
  );
}
