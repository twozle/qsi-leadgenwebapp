import { TierType } from '@/types/results';
import { getTierInfo } from '@/lib/tiers';

interface TierBadgeProps {
  tier: TierType;
}

export default function TierBadge({ tier }: TierBadgeProps) {
  const tierInfo = getTierInfo(tier);

  return (
    <div className={`${tierInfo.bgColor} ${tierInfo.borderColor} border-2 rounded-xl p-6 text-center`}>
      <div className={`text-3xl font-display font-bold ${tierInfo.color} mb-2`}>
        {tierInfo.name}
      </div>
      <p className={`text-lg ${tierInfo.color.replace('700', '600')}`}>
        {tierInfo.description}
      </p>
    </div>
  );
}
