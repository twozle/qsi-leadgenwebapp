import { Question } from '@/types/quiz';

export const quizQuestions: Question[] = [
  {
    id: 'q1',
    category: 'Delivery Reliability',
    text: 'How often do your produce deliveries arrive within the promised time window?',
    options: [
      { value: 1, label: 'Rarely (less than 50% of the time)' },
      { value: 2, label: 'Sometimes (50-70% of the time)' },
      { value: 3, label: 'Usually (70-90% of the time)' },
      { value: 4, label: 'Almost always (90%+ of the time)' },
    ],
  },
  {
    id: 'q2',
    category: 'Delivery Reliability',
    text: 'When deliveries are late or missed, how much advance notice do you receive?',
    options: [
      { value: 1, label: "No notice - I find out when they don't show" },
      { value: 2, label: 'Notice after the scheduled time has passed' },
      { value: 3, label: '1-2 hours advance notice' },
      { value: 4, label: 'Day-before or earlier notice' },
    ],
  },
  {
    id: 'q3',
    category: 'Quality Consistency',
    text: 'How consistent is the quality of produce you receive week-to-week?',
    options: [
      { value: 1, label: 'Highly inconsistent - quality varies dramatically' },
      { value: 2, label: 'Somewhat inconsistent - noticeable variations' },
      { value: 3, label: 'Mostly consistent - minor variations' },
      { value: 4, label: 'Very consistent - meets standards every time' },
    ],
  },
  {
    id: 'q4',
    category: 'Quality Consistency',
    text: 'What percentage of delivered produce typically needs to be rejected or discounted due to quality issues?',
    options: [
      { value: 1, label: 'More than 15%' },
      { value: 2, label: '10-15%' },
      { value: 3, label: '5-10%' },
      { value: 4, label: 'Less than 5%' },
    ],
  },
  {
    id: 'q5',
    category: 'Communication & Support',
    text: 'How easy is it to reach your supplier when you have questions or urgent needs?',
    options: [
      { value: 1, label: 'Very difficult - often no response or delayed by days' },
      { value: 2, label: 'Somewhat difficult - takes multiple attempts or 24+ hours' },
      { value: 3, label: 'Fairly easy - usually respond within business hours' },
      { value: 4, label: 'Very easy - quick response via phone, text, or email' },
    ],
  },
  {
    id: 'q6',
    category: 'Communication & Support',
    text: 'Does your supplier proactively communicate about potential issues (weather, shortages, delays)?',
    options: [
      { value: 1, label: 'Never - I only learn about issues when they happen' },
      { value: 2, label: 'Rarely - only for major disruptions' },
      { value: 3, label: 'Sometimes - for most significant issues' },
      { value: 4, label: 'Always - keeps me informed ahead of time' },
    ],
  },
  {
    id: 'q7',
    category: 'Forecasting & Planning',
    text: 'How often can you get same-day delivery within 4 hours of placing an order?',
    options: [
      { value: 1, label: 'Never - not available' },
      { value: 2, label: 'Rarely - only in emergencies' },
      { value: 3, label: 'Often - when inventory allows' },
      { value: 4, label: 'Always - standard offering' },
    ],
  },
  {
    id: 'q8',
    category: 'Forecasting & Planning',
    text: 'Does your supplier help you plan for seasonal changes or high-demand periods?',
    options: [
      { value: 1, label: "No - I'm on my own to figure it out" },
      { value: 2, label: 'Minimal support - only when I ask' },
      { value: 3, label: 'Some support - occasional guidance' },
      { value: 4, label: 'Strong support - proactive seasonal planning' },
    ],
  },
  {
    id: 'q9',
    category: 'Pricing Stability',
    text: 'How predictable are your week-to-week produce costs?',
    options: [
      { value: 1, label: 'Highly unpredictable - swings of 20%+ are common' },
      { value: 2, label: 'Somewhat unpredictable - swings of 10-20%' },
      { value: 3, label: 'Mostly predictable - swings under 10%' },
      { value: 4, label: 'Very predictable - stable pricing with rare surprises' },
    ],
  },
  {
    id: 'q10',
    category: 'Pricing Stability',
    text: 'Do you have any fixed-price agreements or contracts with your supplier?',
    options: [
      { value: 1, label: 'No - all pricing is spot/variable' },
      { value: 2, label: 'Informal agreements - not binding' },
      { value: 3, label: 'Some fixed pricing on key items' },
      { value: 4, label: 'Comprehensive contracts with price locks' },
    ],
  },
];
