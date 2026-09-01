import { NAV_STEPS, StepId } from "@/types/meeting";
import ProgressIndicator from "./ProgressIndicator";

interface NavigationProps {
  currentStepId: StepId;
  furthestIndex: number;
  onNavigate: (id: StepId) => void;
}

export default function Navigation({ currentStepId, furthestIndex, onNavigate }: NavigationProps) {
  const currentIndex = NAV_STEPS.findIndex((s) => s.id === currentStepId);
  const currentPosition = currentIndex === -1 ? 0 : currentIndex + 1;

  return (
    <div className="sticky top-0 z-30 border-b border-ink-150 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3.5 sm:px-10">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          <span className="text-[0.82rem] font-semibold tracking-wide text-ink-800">
            HGA Formación
          </span>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-1 overflow-x-auto lg:flex">
          {NAV_STEPS.map((step, idx) => {
            const isActive = step.id === currentStepId;
            const isReachable = idx <= furthestIndex;
            return (
              <button
                key={step.id}
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && onNavigate(step.id)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[0.8rem] transition-colors duration-150 ${
                  isActive
                    ? "bg-ink-950 text-white"
                    : isReachable
                    ? "text-ink-500 hover:bg-ink-100 hover:text-ink-800"
                    : "cursor-not-allowed text-ink-200"
                }`}
              >
                <span className="mr-1.5 font-mono opacity-60">{step.short}</span>
                {step.label}
              </button>
            );
          })}
        </nav>

        <ProgressIndicator current={currentPosition} total={NAV_STEPS.length} />
      </div>

      {/* select de navegación para tablet / pantallas estrechas */}
      {currentIndex !== -1 && (
        <div className="border-t border-ink-100 px-6 py-2 lg:hidden sm:px-10">
          <select
            value={currentStepId}
            onChange={(e) => onNavigate(e.target.value as StepId)}
            className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-[0.85rem] text-ink-700"
          >
            {NAV_STEPS.map((step, idx) => (
              <option key={step.id} value={step.id} disabled={idx > furthestIndex}>
                {step.short} · {step.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
