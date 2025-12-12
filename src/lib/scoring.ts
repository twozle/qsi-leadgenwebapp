import { QuizAnswers, CategoryScores } from '@/types/quiz';
import { TierType } from '@/types/results';

const scoreMap: Record<number, number> = {
  1: 0,
  2: 3.33,
  3: 6.67,
  4: 10,
};

function normalizeScore(answer: number): number {
  return Math.round(scoreMap[answer] || 0);
}

export function calculateCategoryScores(answers: QuizAnswers): CategoryScores {
  return {
    deliveryReliability: normalizeScore(answers.q1) + normalizeScore(answers.q2),
    qualityConsistency: normalizeScore(answers.q3) + normalizeScore(answers.q4),
    communicationSupport: normalizeScore(answers.q5) + normalizeScore(answers.q6),
    forecastingPlanning: normalizeScore(answers.q7) + normalizeScore(answers.q8),
    pricingStability: normalizeScore(answers.q9) + normalizeScore(answers.q10),
  };
}

export function calculateMasterScore(categoryScores: CategoryScores): number {
  return Math.round(
    Object.values(categoryScores).reduce((sum, score) => sum + score, 0)
  );
}

export function determineTier(masterScore: number): TierType {
  if (masterScore >= 80) return 'high_performance';
  if (masterScore >= 60) return 'mostly_reliable';
  if (masterScore >= 40) return 'at_risk';
  return 'unstable';
}

export function generateRecommendations(categoryScores: CategoryScores): string[] {
  const categoryRecommendations: Record<keyof CategoryScores, string> = {
    deliveryReliability:
      'Tighten delivery windows and set clear expectations with suppliers. Consider partners who commit to defined time blocks.',
    qualityConsistency:
      'Implement regular quality audits and establish clear grading standards with your supplier.',
    communicationSupport:
      'Set up weekly check-ins and ensure your supplier has a dedicated account manager.',
    forecastingPlanning:
      'Share your demand forecasts 2-3 weeks ahead and ask suppliers for seasonal planning support.',
    pricingStability:
      'Negotiate fixed-price contracts for your top 10 items or explore volume-based pricing agreements.',
  };

  const sortedCategories = (Object.entries(categoryScores) as [keyof CategoryScores, number][])
    .sort(([, a], [, b]) => a - b)
    .slice(0, 2);

  const recommendations: string[] = [];

  sortedCategories.forEach(([category, score]) => {
    if (score < 14) {
      recommendations.push(categoryRecommendations[category]);
    }
  });

  if (recommendations.length === 0) {
    return [
      'Your supply chain is performing well overall. Focus on maintaining consistency and continue building strong supplier relationships.',
    ];
  }

  return recommendations;
}
