interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-stone-600">
          Question {current} of {total}
        </p>
        <p className="text-sm font-medium text-primary-600">
          {Math.round(percentage)}% Complete
        </p>
      </div>
      <div className="w-full bg-stone-200 rounded-full h-2">
        <div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
