import { ReactNode, useState } from "react";

interface SummaryCardProps {
  index: string;
  title: string;
  preview?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function SummaryCard({
  index,
  title,
  preview,
  defaultOpen = false,
  children,
}: SummaryCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-150 bg-white shadow-subtle">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-ink-50"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.78rem] text-ink-300">{index}</span>
          <div>
            <h3 className="font-display text-lg text-ink-950">{title}</h3>
            {!open && preview && (
              <p className="mt-0.5 max-w-xl truncate text-[0.85rem] text-ink-400">{preview}</p>
            )}
          </div>
        </div>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-current" strokeWidth={1.5}>
            <path d="M6 0v12M0 6h12" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="border-t border-ink-100 px-6 py-7 animate-fadeIn">{children}</div>
      )}
    </div>
  );
}
