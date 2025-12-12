'use client';

import { useEffect, useState } from 'react';

interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = score / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [score]);

  const getColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStrokeColor = () => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#eab308';
    return '#ef4444';
  };

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-2xl font-display font-semibold text-stone-900 mb-8">
        Your Reliability Score
      </h2>

      <div className="relative w-80 h-80">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="160"
            cy="160"
            r="120"
            stroke="#e5e7eb"
            strokeWidth="20"
            fill="none"
          />
          <circle
            cx="160"
            cy="160"
            r="120"
            stroke={getStrokeColor()}
            strokeWidth="20"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-7xl font-display font-bold ${getColor()}`}>
            {displayScore}
          </div>
          <div className="text-2xl text-stone-500 font-medium">/ 100</div>
        </div>
      </div>
    </div>
  );
}
