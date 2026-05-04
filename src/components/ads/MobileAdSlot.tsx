import AdSlot from './AdSlot';
import { useIsMobile } from '../../hooks/useDevice';

/**
 * Renders an ad slot ONLY on mobile devices.
 * Returns null on desktop — zero DOM footprint.
 */

interface MobileAdSlotProps {
  slotId: string;
  height?: string;
  className?: string;
  label?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto';
}

export default function MobileAdSlot({
  slotId,
  height = '100px',
  className = '',
  label = 'Advertisement',
  format = 'horizontal',
}: MobileAdSlotProps) {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <AdSlot
      slotId={slotId}
      height={height}
      className={className}
      label={label}
      format={format}
    />
  );
}
