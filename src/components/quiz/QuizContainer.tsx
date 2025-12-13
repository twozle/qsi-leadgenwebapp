'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { quizQuestions } from '@/lib/questions';
import { QuizAnswers } from '@/types/quiz';
import { LeadData } from '@/types/lead';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import LeadCaptureForm from './LeadCaptureForm';
import Button from '../ui/Button';

const TOTAL_QUESTIONS = quizQuestions.length;

export default function QuizContainer() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('quizAnswers');
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved answers');
      }
    }
  }, []);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id as keyof QuizAnswers];

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowLeadCapture(true);
    }
  };

  const handlePrevious = () => {
    if (showLeadCapture) {
      setShowLeadCapture(false);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleLeadSubmit = async (leadData: LeadData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          leadData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const result = await response.json();

      localStorage.removeItem('quizAnswers');

      router.push(`/results?sessionId=${result.sessionId}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('There was an error submitting your quiz. Please try again.');
      setIsSubmitting(false);
    }
  };

  const canProceed = currentAnswer !== undefined;
  const progressCurrent = showLeadCapture ? TOTAL_QUESTIONS : currentQuestionIndex + 1;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-earth-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative produce images */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-32 hidden xl:block opacity-15">
        <Image
          src="/images/assorted-produce.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute right-0 top-1/3 bottom-1/3 w-32 hidden xl:block opacity-15">
        <Image
          src="/images/strawberry-box.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-stone-900 mb-2">
            THE PRODUCE RELIABILITY SCORECARD™
          </h1>
          <p className="text-stone-600">Answer honestly to get accurate results</p>
        </div>

        <ProgressBar current={progressCurrent} total={TOTAL_QUESTIONS} />

        {showLeadCapture ? (
          <LeadCaptureForm onSubmit={handleLeadSubmit} isLoading={isSubmitting} />
        ) : (
          <>
            <QuestionCard
              question={currentQuestion}
              selectedValue={currentAnswer}
              onChange={handleAnswer}
            />

            <div className="flex justify-between mt-8 max-w-3xl mx-auto">
              <Button
                variant="secondary"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed}
              >
                {currentQuestionIndex === TOTAL_QUESTIONS - 1 ? 'Continue to Results' : 'Next Question'}
              </Button>
            </div>
          </>
        )}

        {showLeadCapture && (
          <div className="flex justify-start mt-4 max-w-3xl mx-auto">
            <Button variant="secondary" onClick={handlePrevious}>
              Back to Questions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
