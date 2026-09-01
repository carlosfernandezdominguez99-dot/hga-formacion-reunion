import { ObjectivesSection } from "@/types/meeting";
import { PRIORITY_AREAS } from "@/data/options";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import FieldGroup from "@/components/ui/FieldGroup";
import Button from "@/components/ui/Button";

interface FieldsProps {
  data: ObjectivesSection;
  onChange: (data: ObjectivesSection) => void;
}

/** Campos completos del bloque (incl. la visión de éxito), usados en la página de Resumen. */
export function ObjectivesFields({ data, onChange }: FieldsProps) {
  const set = <K extends keyof ObjectivesSection>(key: K, value: ObjectivesSection[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <FieldGroup>
      <Textarea
        label="¿Qué tendría que haber cambiado?"
        size="featured"
        value={data.successVision}
        onChange={(e) => set("successVision", e.target.value)}
      />

      <Input
        label="¿Cuál sería vuestro objetivo principal?"
        value={data.mainGoal}
        onChange={(e) => set("mainGoal", e.target.value)}
      />

      <Input
        label="¿Tenéis alguna cifra concreta que queráis conseguir?"
        value={data.targetNumber}
        onChange={(e) => set("targetNumber", e.target.value)}
        placeholder="Ej. 20 matrículas más al mes"
      />

      <CheckboxGroup
        label="¿Qué área queréis priorizar?"
        options={PRIORITY_AREAS}
        values={data.priorityArea}
        onChange={(values) => set("priorityArea", values)}
        otherValue={data.priorityAreaOther}
        onOtherChange={(v) => set("priorityAreaOther", v)}
        columns={2}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="¿Cuándo os gustaría empezar?"
          type="date"
          value={data.startDate}
          onChange={(e) => set("startDate", e.target.value)}
        />
        <Input
          label="¿Tenéis una inversión aproximada prevista para marketing?"
          value={data.budget}
          onChange={(e) => set("budget", e.target.value)}
          placeholder="Opcional"
        />
      </div>

      <Input
        label="¿Quién participa en la decisión final?"
        value={data.decisionParticipants}
        onChange={(e) => set("decisionParticipants", e.target.value)}
      />
    </FieldGroup>
  );
}

interface Block7Props extends FieldsProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function Block7Objectives({ data, onChange, onBack, onContinue }: Block7Props) {
  const set = <K extends keyof ObjectivesSection>(key: K, value: ObjectivesSection[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div>
      {/* Hero oscuro — esta pantalla pesa más que las anteriores */}
      <div className="bg-ink-950 px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl animate-fadeUp">
          <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-widest2 text-accent-400">
            Bloque 07 · Objetivos
          </p>
          <h1 className="font-display text-3xl leading-tight text-white sm:text-5xl">
            ¿Qué significa tener éxito?
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] italic text-ink-300">
            Imaginemos que dentro de 6 meses volvemos a sentarnos y me decís que todo ha
            funcionado muy bien.
          </p>

          <div className="mt-12">
            <label
              htmlFor="successVision"
              className="mb-3 block font-display text-xl text-white"
            >
              ¿Qué tendría que haber cambiado?
            </label>
            <textarea
              id="successVision"
              rows={7}
              value={data.successVision}
              onChange={(e) => set("successVision", e.target.value)}
              className="w-full resize-y rounded-xl border border-ink-700 bg-ink-900 px-5 py-4 text-[1.05rem] leading-relaxed text-white placeholder:text-ink-500 shadow-lift focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-900"
            />
          </div>
        </div>
      </div>

      {/* Resto de preguntas del bloque, sobre fondo claro */}
      <div className="mx-auto max-w-3xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="space-y-8">
          <Input
            label="¿Cuál sería vuestro objetivo principal?"
            value={data.mainGoal}
            onChange={(e) => set("mainGoal", e.target.value)}
          />

          <Input
            label="¿Tenéis alguna cifra concreta que queráis conseguir?"
            value={data.targetNumber}
            onChange={(e) => set("targetNumber", e.target.value)}
            placeholder="Ej. 20 matrículas más al mes"
          />

          <CheckboxGroup
            label="¿Qué área queréis priorizar?"
            options={PRIORITY_AREAS}
            values={data.priorityArea}
            onChange={(values) => set("priorityArea", values)}
            otherValue={data.priorityAreaOther}
            onOtherChange={(v) => set("priorityAreaOther", v)}
            columns={2}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="¿Cuándo os gustaría empezar?"
              type="date"
              value={data.startDate}
              onChange={(e) => set("startDate", e.target.value)}
            />
            <Input
              label="¿Tenéis una inversión aproximada prevista para marketing?"
              value={data.budget}
              onChange={(e) => set("budget", e.target.value)}
              placeholder="Opcional"
            />
          </div>

          <Input
            label="¿Quién participa en la decisión final?"
            value={data.decisionParticipants}
            onChange={(e) => set("decisionParticipants", e.target.value)}
          />
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-ink-100 pt-8">
          <Button variant="ghost" onClick={onBack}>
            ← Atrás
          </Button>
          <Button variant="primary" size="lg" onClick={onContinue}>
            Continuar →
          </Button>
        </div>
      </div>
    </div>
  );
}
