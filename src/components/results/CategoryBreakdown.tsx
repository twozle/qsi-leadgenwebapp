import { CategoryScores } from '@/types/quiz';
import Card from '../ui/Card';

interface CategoryBreakdownProps {
  categoryScores: CategoryScores;
}

const categoryLabels: Record<keyof CategoryScores, string> = {
  deliveryReliability: 'Delivery Reliability',
  qualityConsistency: 'Quality Consistency',
  communicationSupport: 'Communication & Support',
  forecastingPlanning: 'Forecasting & Planning',
  pricingStability: 'Pricing Stability',
};

export default function CategoryBreakdown({ categoryScores }: CategoryBreakdownProps) {
  const getCategoryStatus = (score: number): { label: string; color: string } => {
    if (score >= 16) return { label: 'Strong', color: 'text-green-700 bg-green-50' };
    if (score >= 12) return { label: 'Good', color: 'text-blue-700 bg-blue-50' };
    if (score >= 8) return { label: 'Needs Improvement', color: 'text-yellow-700 bg-yellow-50' };
    return { label: 'Critical', color: 'text-red-700 bg-red-50' };
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-display font-semibold text-stone-900 mb-6 text-center">
        Category Breakdown
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.entries(categoryScores) as [keyof CategoryScores, number][]).map(([key, score]) => {
          const status = getCategoryStatus(score);
          const percentage = (score / 20) * 100;

          return (
            <Card key={key} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-sm font-semibold text-stone-900">
                  {categoryLabels[key]}
                </h4>
                <span className={`text-xs font-medium px-2 py-1 rounded ${status.color}`}>
                  {status.label}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-display font-bold text-stone-900">
                  {score}
                </span>
                <span className="text-sm text-stone-500">/ 20</span>
              </div>

              <div className="w-full bg-stone-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: status.color.includes('green')
                      ? '#22c55e'
                      : status.color.includes('blue')
                      ? '#3b82f6'
                      : status.color.includes('yellow')
                      ? '#eab308'
                      : '#ef4444',
                  }}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
