import AdSlot from './AdSlot';
import { useIsDesktop } from '../../hooks/useDevice';

/**
 * Renders an ad slot ONLY on desktop devices.
 * Returns null on mobile — zero DOM footprint.
 */

interface DesktopAdSlotProps {
  slotId: string;
  height?: string;
  width?: string;
  className?: string;
  label?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto';
}

export default function DesktopAdSlot({
  slotId,
  height = '90px',
  width = '100%',
  className = '',
  label = 'Advertisement',
  format = 'horizontal',
}: DesktopAdSlotProps) {
  const isDesktop = useIsDesktop();

  if (!isDesktop) return null;

  return (
    <AdSlot
      slotId={slotId}
      height={height}
      width={width}
      className={className}
      label={label}
      format={format}
    />
  );
}
