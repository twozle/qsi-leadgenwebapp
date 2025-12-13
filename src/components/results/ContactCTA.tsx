'use client';

import { TierType } from '@/types/results';
import { generateWhatsAppLink, generateSMSLink, generateEmailLink, generatePhoneLink } from '@/lib/whatsapp';
import Button from '../ui/Button';

interface ContactCTAProps {
  tier: TierType;
  masterScore: number;
  preferredContact?: 'email' | 'sms' | 'whatsapp' | 'phone';
}

export default function ContactCTA({ tier, masterScore, preferredContact = 'whatsapp' }: ContactCTAProps) {
  const getContactConfig = () => {
    switch (preferredContact) {
      case 'email':
        return {
          title: 'Ready to Improve Your Supply Chain?',
          description: "Email us and we'll give you the 3 fastest fixes for your score.",
          buttonText: '✉️ Email Us',
          buttonAction: () => {
            window.location.href = generateEmailLink(tier, masterScore);
          },
        };
      case 'sms':
        return {
          title: 'Ready to Improve Your Supply Chain?',
          description: "Text us and we'll give you the 3 fastest fixes for your score.",
          buttonText: '💬 Text Us',
          buttonAction: () => {
            window.location.href = generateSMSLink(tier, masterScore);
          },
        };
      case 'phone':
        return {
          title: 'Ready to Improve Your Supply Chain?',
          description: "Call us and we'll give you the 3 fastest fixes for your score.",
          buttonText: '📞 Call Us Now',
          buttonAction: () => {
            window.location.href = generatePhoneLink();
          },
        };
      case 'whatsapp':
      default:
        return {
          title: 'Ready to Improve Your Supply Chain?',
          description: "Message us on WhatsApp and we'll give you the 3 fastest fixes for your score.",
          buttonText: '📱 Message Us on WhatsApp',
          buttonAction: () => {
            const link = generateWhatsAppLink(tier, masterScore);
            window.open(link, '_blank');
          },
        };
    }
  };

  const config = getContactConfig();

  return (
    <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center text-white">
      <h3 className="text-2xl font-display font-bold mb-3">
        {config.title}
      </h3>
      <p className="text-lg mb-6 text-primary-50">
        {config.description}
      </p>
      <Button
        onClick={config.buttonAction}
        className="bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-4"
      >
        {config.buttonText}
      </Button>
      <p className="mt-4 text-sm text-primary-100">
        Get a personalized action plan from our produce supply experts
      </p>
    </div>
  );
}
