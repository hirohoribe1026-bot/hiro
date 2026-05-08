interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs tracking-[0.2em] text-gold/80">
        <span>QUESTION {current} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-gold-sheen bg-[length:200%_100%] transition-[width] duration-700 ease-out animate-shimmer"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
