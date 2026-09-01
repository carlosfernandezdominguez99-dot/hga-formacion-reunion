import Button from "@/components/ui/Button";

interface CoverProps {
  date: string;
  attendees: string;
  onDateChange: (value: string) => void;
  onAttendeesChange: (value: string) => void;
  onStart: () => void;
}

export default function Cover({
  date,
  attendees,
  onDateChange,
  onAttendeesChange,
  onStart,
}: CoverProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-50 px-6 py-16">
      <div className="w-full max-w-xl animate-fadeUp text-center">
        <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-ink-150 bg-white shadow-card">
          {/* Espacio para el logo de HGA Formación */}
          <span className="font-display text-2xl text-ink-950">HGA</span>
        </div>

        <h1 className="font-display text-4xl text-ink-950 sm:text-5xl">HGA Formación</h1>
        <p className="mt-3 text-[1.05rem] uppercase tracking-widest2 text-accent-600">
          Reunión de estrategia digital
        </p>

        <p className="mx-auto mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink-500">
          Una conversación para entender vuestro negocio, detectar oportunidades y definir
          cómo podemos ayudaros a crecer.
        </p>

        <div className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-ink-150 bg-white px-4 py-1.5 text-[0.8rem] text-ink-400 shadow-subtle">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          Reunión de descubrimiento
        </div>

        <div className="mx-auto mt-12 grid max-w-sm grid-cols-2 gap-6 text-left">
          <label className="block">
            <span className="mb-1.5 block text-[0.75rem] uppercase tracking-wide text-ink-400">
              Fecha
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full border-b border-ink-200 bg-transparent pb-1.5 text-[0.95rem] text-ink-800 focus:border-accent-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[0.75rem] uppercase tracking-wide text-ink-400">
              Asistentes
            </span>
            <input
              type="text"
              value={attendees}
              onChange={(e) => onAttendeesChange(e.target.value)}
              placeholder="Nombres"
              className="w-full border-b border-ink-200 bg-transparent pb-1.5 text-[0.95rem] text-ink-800 placeholder:text-ink-300 focus:border-accent-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-14">
          <Button size="lg" onClick={onStart} className="px-10">
            Comenzar reunión →
          </Button>
        </div>
      </div>
    </div>
  );
}
