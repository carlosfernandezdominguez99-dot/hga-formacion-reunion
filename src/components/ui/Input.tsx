import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export default function Input({ label, hint, id, className = "", ...rest }: InputProps) {
  const inputId = id ?? rest.name;
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-[0.8rem] font-medium uppercase tracking-wide text-ink-500"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.98rem] text-ink-900 placeholder:text-ink-300 shadow-subtle transition-colors duration-150 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-100 ${className}`}
        {...rest}
      />
      {hint && <p className="mt-1.5 text-[0.8rem] text-ink-400">{hint}</p>}
    </div>
  );
}
