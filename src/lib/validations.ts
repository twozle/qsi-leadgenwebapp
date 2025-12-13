import { z } from 'zod';

export const quizAnswersSchema = z.object({
  q1: z.number().int().min(1).max(4),
  q2: z.number().int().min(1).max(4),
  q3: z.number().int().min(1).max(4),
  q4: z.number().int().min(1).max(4),
  q5: z.number().int().min(1).max(4),
  q6: z.number().int().min(1).max(4),
  q7: z.number().int().min(1).max(4),
  q8: z.number().int().min(1).max(4),
  q9: z.number().int().min(1).max(4),
  q10: z.number().int().min(1).max(4),
});

export const leadDataSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(10).optional().or(z.literal('')),
  preferredContact: z.enum(['email', 'sms', 'whatsapp', 'phone']),
  businessType: z.string().min(1, 'Business type is required'),
  weeklySpendRange: z.string().min(1, 'Weekly spend range is required'),
  deliveryFrequency: z.string().min(1, 'Delivery frequency is required'),
  locationCity: z.string().optional(),
  locationRegion: z.string().optional(),
  biggestFrustration: z.string().optional(),
}).refine(
  (data) => data.email || data.phone,
  {
    message: 'Either email or phone is required',
    path: ['email'],
  }
);

export const submitQuizSchema = z.object({
  answers: quizAnswersSchema,
  leadData: leadDataSchema,
});

export const sessionIdSchema = z.string().uuid();
