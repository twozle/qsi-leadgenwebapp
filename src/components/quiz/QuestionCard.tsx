import { Question } from '@/types/quiz';
import Card from '../ui/Card';
import ScaleInput from './ScaleInput';

interface QuestionCardProps {
  question: Question;
  selectedValue?: number;
  onChange: (value: number) => void;
}

export default function QuestionCard({ question, selectedValue, onChange }: QuestionCardProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <div className="mb-4">
        <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
          {question.category}
        </span>
      </div>
      <h2 className="text-2xl font-display font-semibold text-stone-900 mb-6">
        {question.text}
      </h2>
      <ScaleInput
        options={question.options}
        selectedValue={selectedValue}
        onChange={onChange}
        name={question.id}
      />
    </Card>
  );
}
