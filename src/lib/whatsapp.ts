import { TierType } from '@/types/results';
import { getTierInfo } from './tiers';

const DEFAULT_PHONE = '2139075123';

export function generateWhatsAppLink(tier: TierType, masterScore: number, phone: string = DEFAULT_PHONE): string {
  const tierInfo = getTierInfo(tier);
  const message = `Hi, I just completed the Produce Reliability Scorecard and scored ${masterScore}/100 (${tierInfo.name}). Can you help me improve my supply chain reliability?`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generateSMSLink(tier: TierType, masterScore: number, phone: string = DEFAULT_PHONE): string {
  const tierInfo = getTierInfo(tier);
  const message = `Hi, I just completed the Produce Reliability Scorecard and scored ${masterScore}/100 (${tierInfo.name}). Can you help me improve?`;

  return `sms:+${phone}${/iPhone|iPad|iPod/.test(navigator.userAgent) ? '&' : '?'}body=${encodeURIComponent(message)}`;
}
