'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { QuizResults } from '@/types/results';
import ScoreDisplay from './ScoreDisplay';
import TierBadge from './TierBadge';
import CategoryBreakdown from './CategoryBreakdown';
import Recommendations from './Recommendations';
import WhatsAppCTA from './WhatsAppCTA';

export default function ResultsContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/get-results?sessionId=${sessionId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to load results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-earth-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-stone-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-earth-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-display font-bold text-stone-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-stone-600 mb-8">{error}</p>
          <a
            href="/"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-earth-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative produce images */}
      <div className="absolute left-0 top-0 w-full h-24 opacity-10 hidden md:block">
        <Image
          src="/images/processing-facility.jpg"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute right-0 top-1/4 bottom-1/4 w-40 hidden lg:block opacity-15">
        <Image
          src="/images/hero-produce-market.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-stone-900 mb-2">
            Your Supply Chain Scorecard
          </h1>
          <p className="text-xl text-stone-600">
            Here's your personalized reliability assessment
          </p>
        </div>

        <ScoreDisplay score={results.masterScore} />

        <div className="max-w-3xl mx-auto mt-8">
          <TierBadge tier={results.tier} />
        </div>

        <CategoryBreakdown categoryScores={results.categoryScores} />

        <Recommendations recommendations={results.recommendations} />

        <div className="max-w-3xl mx-auto">
          <WhatsAppCTA tier={results.tier} masterScore={results.masterScore} />
        </div>

        <div className="text-center mt-12">
          <a
            href="/"
            className="text-stone-600 hover:text-stone-900 underline"
          >
            Take the scorecard again
          </a>
        </div>
      </div>
    </div>
  );
}
