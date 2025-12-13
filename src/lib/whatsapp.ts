import { TierType } from '@/types/results';
import { getTierInfo } from './tiers';

const WHATSAPP_PHONE = '2139075123';
const SMS_PHONE = '6265228638';
const PHONE_NUMBER = '6265228638';
const EMAIL = 'instagram@qsiproduce.com';

export function generateWhatsAppLink(tier: TierType, masterScore: number): string {
  const tierInfo = getTierInfo(tier);
  const message = `Hi, I just completed the Produce Reliability Scorecard and scored ${masterScore}/100 (${tierInfo.name}). Can you help me improve my supply chain reliability?`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function generateSMSLink(tier: TierType, masterScore: number): string {
  const tierInfo = getTierInfo(tier);
  const message = `Hi, I just completed the Produce Reliability Scorecard and scored ${masterScore}/100 (${tierInfo.name}). Can you help me improve?`;

  return `sms:+1${SMS_PHONE}${/iPhone|iPad|iPod/.test(navigator.userAgent) ? '&' : '?'}body=${encodeURIComponent(message)}`;
}

export function generateEmailLink(tier: TierType, masterScore: number): string {
  const tierInfo = getTierInfo(tier);
  const subject = 'Produce Reliability Scorecard Results';
  const body = `Hi,\n\nI just completed the Produce Reliability Scorecard and scored ${masterScore}/100 (${tierInfo.name}).\n\nCan you help me improve my supply chain reliability?\n\nThank you!`;

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function generatePhoneLink(): string {
  return `tel:+1${PHONE_NUMBER}`;
}
