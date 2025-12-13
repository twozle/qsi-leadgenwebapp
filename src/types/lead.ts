export interface LeadData {
  email?: string;
  phone?: string;
  preferredContact: 'email' | 'sms' | 'whatsapp' | 'phone';
  businessType: string;
  weeklySpendRange: string;
  deliveryFrequency: string;
  locationCity?: string;
  locationRegion?: string;
  biggestFrustration?: string;
}

export interface Lead extends LeadData {
  id: string;
  createdAt: Date;
  sessionId: string;
  ipAddress?: string;
  userAgent?: string;
}
