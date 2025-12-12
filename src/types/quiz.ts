export interface QuizAnswers {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
}

export interface Question {
  id: string;
  category: string;
  text: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  value: number;
  label: string;
}

export interface CategoryScores {
  deliveryReliability: number;
  qualityConsistency: number;
  communicationSupport: number;
  forecastingPlanning: number;
  pricingStability: number;
}
