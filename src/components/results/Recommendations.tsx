import Card from '../ui/Card';

interface RecommendationsProps {
  recommendations: string[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-display font-semibold text-stone-900 mb-6 text-center">
        Your Personalized Recommendations
      </h3>

      <Card className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <p className="text-stone-700 flex-1 pt-1">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
