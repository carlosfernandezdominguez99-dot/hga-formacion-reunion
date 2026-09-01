import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  /** Usa "featured" para las preguntas destacadas del brief: campo más grande y con más presencia. */
  size?: "default" | "featured";
}

export default function Textarea({
  label,
  hint,
  id,
  size = "default",
  className = "",
  rows,
  ...rest
}: TextareaProps) {
  const inputId = id ?? rest.name;
  const defaultRows = size === "featured" ? 6 : 3;
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={
            size === "featured"
              ? "mb-3 block font-display text-lg text-ink-900"
              : "mb-2 block text-[0.8rem] font-medium uppercase tracking-wide text-ink-500"
          }
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows ?? defaultRows}
        className={`w-full resize-y rounded-xl border bg-white px-4 py-3.5 text-ink-900 leading-relaxed placeholder:text-ink-300 shadow-subtle transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent-100 ${
          size === "featured"
            ? "border-ink-200 text-[1.05rem] focus:border-accent-400"
            : "border-ink-200 text-[0.98rem] focus:border-accent-400"
        } ${className}`}
        {...rest}
      />
      {hint && <p className="mt-1.5 text-[0.8rem] text-ink-400">{hint}</p>}
    </div>
  );
}
