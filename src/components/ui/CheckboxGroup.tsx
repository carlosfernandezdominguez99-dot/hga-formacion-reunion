import { Option } from "@/data/options";

interface CheckboxGroupProps {
  label?: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  /** Si alguna opción es "Otro/Otra/Otros/Otras", se muestra un campo de texto libre asociado. */
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  columns?: 1 | 2 | 3;
}

const OTHER_PATTERN = /^otr[oa]s?$/i;

export default function CheckboxGroup({
  label,
  options,
  values,
  onChange,
  otherValue,
  onOtherChange,
  columns = 2,
}: CheckboxGroupProps) {
  const toggle = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  const hasOtherSelected = options.some(
    (o) => OTHER_PATTERN.test(o.label) && values.includes(o.value)
  );

  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className="w-full">
      {label && (
        <p className="mb-2.5 text-[0.8rem] font-medium uppercase tracking-wide text-ink-500">
          {label}
        </p>
      )}
      <div className={`grid ${gridCols} gap-2.5`}>
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              aria-pressed={checked}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[0.94rem] transition-all duration-150 ${
                checked
                  ? "border-accent-400 bg-accent-50 text-accent-800 shadow-subtle"
                  : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50"
              }`}
            >
              <span
                className={`flex shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
                  checked
                    ? "border-accent-500 bg-accent-500"
                    : "border-ink-300 bg-white"
                }`}
                style={{ height: "1.15rem", width: "1.15rem" }}
              >
                {checked && (
                  <svg
                    viewBox="0 0 12 10"
                    className="h-2.5 w-3 fill-none stroke-white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 5L4.5 8.5L11 1.5" />
                  </svg>
                )}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
      {hasOtherSelected && onOtherChange && (
        <input
          type="text"
          value={otherValue ?? ""}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Especificar…"
          className="mt-2.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-[0.94rem] text-ink-900 placeholder:text-ink-300 shadow-subtle focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-100"
        />
      )}
    </div>
  );
}
