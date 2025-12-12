import { QuestionOption } from '@/types/quiz';

interface ScaleInputProps {
  options: QuestionOption[];
  selectedValue?: number;
  onChange: (value: number) => void;
  name: string;
}

export default function ScaleInput({ options, selectedValue, onChange, name }: ScaleInputProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`radio-option ${selectedValue === option.value ? 'selected' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="mr-3 h-5 w-5 text-primary-600 focus:ring-primary-500"
          />
          <span className="flex-1 text-stone-800">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
