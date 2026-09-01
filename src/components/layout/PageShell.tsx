import { ReactNode } from "react";
import Button from "@/components/ui/Button";

interface PageShellProps {
  children: ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  backLabel?: string;
}

export default function PageShell({
  children,
  onBack,
  onContinue,
  continueLabel = "Continuar",
  backLabel = "Atrás",
}: PageShellProps) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-3xl flex-col px-6 py-14 sm:px-10 sm:py-16">
      <div className="flex-1">{children}</div>
      <div className="mt-14 flex items-center justify-between border-t border-ink-100 pt-8">
        {onBack ? (
          <Button variant="ghost" onClick={onBack}>
            ← {backLabel}
          </Button>
        ) : (
          <span />
        )}
        {onContinue && (
          <Button variant="primary" size="lg" onClick={onContinue}>
            {continueLabel} →
          </Button>
        )}
      </div>
    </div>
  );
}
