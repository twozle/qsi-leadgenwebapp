'use client';

import { TierType } from '@/types/results';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import Button from '../ui/Button';

interface WhatsAppCTAProps {
  tier: TierType;
  masterScore: number;
}

export default function WhatsAppCTA({ tier, masterScore }: WhatsAppCTAProps) {
  const handleClick = () => {
    const link = generateWhatsAppLink(tier, masterScore);
    window.open(link, '_blank');
  };

  return (
    <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center text-white">
      <h3 className="text-2xl font-display font-bold mb-3">
        Ready to Improve Your Supply Chain?
      </h3>
      <p className="text-lg mb-6 text-primary-50">
        Message us on WhatsApp and we'll give you the 3 fastest fixes for your score.
      </p>
      <Button
        onClick={handleClick}
        className="bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-4"
      >
        📱 Message Us on WhatsApp
      </Button>
      <p className="mt-4 text-sm text-primary-100">
        Get a personalized action plan from our produce supply experts
      </p>
    </div>
  );
}
