import Card from '../ui/Card';

const benefits = [
  {
    title: 'Identify Your Weak Points',
    description: 'Get a clear diagnosis of reliability issues across delivery, quality, communication, planning, and pricing.',
  },
  {
    title: 'Receive Personalized Recommendations',
    description: 'Actionable steps tailored to your specific supply chain challenges.',
  },
  {
    title: 'Benchmark Your Performance',
    description: 'See where you stand with industry-standard tier classifications from Unstable to High-Performance.',
  },
];

export default function ValueProps() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-center text-stone-900 mb-12">
          Why Take the Scorecard?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-stone-600">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
