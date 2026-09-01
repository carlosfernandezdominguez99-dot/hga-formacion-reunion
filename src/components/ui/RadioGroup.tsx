import { Option } from "@/data/options";

interface RadioGroupProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  layout?: "row" | "column";
}

export default function RadioGroup({
  label,
  options,
  value,
  onChange,
  layout = "row",
}: RadioGroupProps) {
  return (
    <div className="w-full">
      {label && (
        <p className="mb-2.5 text-[0.8rem] font-medium uppercase tracking-wide text-ink-500">
          {label}
        </p>
      )}
      <div
        className={
          layout === "row"
            ? "flex flex-wrap gap-2.5"
            : "flex flex-col gap-2.5"
        }
      >
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={checked}
              className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-[0.94rem] transition-all duration-150 ${
                checked
                  ? "border-accent-500 bg-ink-950 text-white shadow-subtle"
                  : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50"
              }`}
            >
              <span
                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                  checked ? "border-white" : "border-ink-300"
                }`}
              >
                {checked && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
