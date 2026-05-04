import AdSlot from './AdSlot';

/**
 * In-content ad — inserted between paragraphs inside article body.
 * CLS-safe with fixed height. Clean separator styling.
 *
 * Usage: <InContentAd slotId="post-after-para-1" />
 */

interface InContentAdProps {
  slotId: string;
  position?: 'top' | 'middle' | 'bottom';
}

export default function InContentAd({ slotId, position = 'middle' }: InContentAdProps) {
  const heightMap = {
    top: '100px',
    middle: '120px',
    bottom: '100px',
  };

  return (
    <div className="my-8 md:my-10">
      <AdSlot
        slotId={slotId}
        height={heightMap[position]}
        label="Advertisement"
        format="auto"
        className="rounded-lg"
      />
    </div>
  );
}
