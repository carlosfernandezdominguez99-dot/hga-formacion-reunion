interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  value: number | null;
  onChange: (value: number) => void;
}

export default function Slider({ label, min = 0, max = 10, value, onChange }: SliderProps) {
  const current = value ?? min;
  const percent = ((current - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {label && (
        <p className="mb-3 text-[0.8rem] font-medium uppercase tracking-wide text-ink-500">
          {label}
        </p>
      )}
      <div className="flex items-center gap-5">
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={current}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-ink-150 accent-accent-500"
          style={{
            background: `linear-gradient(to right, #2f7d84 ${percent}%, #e6e6e4 ${percent}%)`,
          }}
        />
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-lg text-white">
          {value === null ? "—" : value}
        </span>
      </div>
      <div className="mt-1.5 flex justify-between text-[0.75rem] text-ink-300">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
