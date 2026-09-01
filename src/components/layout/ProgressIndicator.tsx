interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export default function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percent = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="flex items-center gap-3">
      <div className="h-[3px] w-24 overflow-hidden rounded-full bg-ink-150 sm:w-32">
        <div
          className="h-full rounded-full bg-accent-500 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="whitespace-nowrap font-mono text-[0.78rem] tabular-nums text-ink-400">
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
