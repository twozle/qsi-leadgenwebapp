import { CategoryScores } from './quiz';

export type TierType = 'unstable' | 'at_risk' | 'mostly_reliable' | 'high_performance';

export interface QuizResults {
  sessionId: string;
  masterScore: number;
  tier: TierType;
  categoryScores: CategoryScores;
  recommendations: string[];
  businessType?: string;
}

export interface QuizResponse {
  id: string;
  leadId: string;
  createdAt: Date;
  answers: Record<string, number>;
  deliveryReliabilityScore: number;
  qualityConsistencyScore: number;
  communicationSupportScore: number;
  forecastingPlanningScore: number;
  pricingStabilityScore: number;
  masterScore: number;
  tier: TierType;
  recommendations: string[];
}
