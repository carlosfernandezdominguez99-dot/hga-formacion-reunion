interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="mb-10 animate-fadeUp">
      {eyebrow && (
        <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest2 text-accent-600">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-3xl leading-tight text-ink-950 sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-[1.05rem] italic text-ink-500">
          {subtitle}
        </p>
      )}
    </header>
  );
}
