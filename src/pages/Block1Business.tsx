import { BusinessSection } from "@/types/meeting";
import { SERVICES_TO_BOOST } from "@/data/options";
import Textarea from "@/components/ui/Textarea";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import FieldGroup from "@/components/ui/FieldGroup";
import PageShell from "@/components/layout/PageShell";

interface FieldsProps {
  data: BusinessSection;
  onChange: (data: BusinessSection) => void;
}

/** Campos del bloque, reutilizados también en la página de Resumen para edición in situ. */
export function BusinessFields({ data, onChange }: FieldsProps) {
  const set = <K extends keyof BusinessSection>(key: K, value: BusinessSection[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <FieldGroup>
      <Textarea
        label="¿Cómo describiríais HGA actualmente?"
        value={data.description}
        onChange={(e) => set("description", e.target.value)}
      />

      <Textarea
        label="¿Qué servicios o áreas de formación son más importantes para vosotros?"
        value={data.keyServices}
        onChange={(e) => set("keyServices", e.target.value)}
      />

      <CheckboxGroup
        label="¿Qué servicios queréis potenciar especialmente?"
        options={SERVICES_TO_BOOST}
        values={data.servicesToBoost}
        onChange={(values) => set("servicesToBoost", values)}
        otherValue={data.servicesToBoostOther}
        onOtherChange={(v) => set("servicesToBoostOther", v)}
        columns={2}
      />

      <Textarea
        label="¿Qué diferencia a HGA de otras autoescuelas o centros de formación?"
        value={data.differentiation}
        onChange={(e) => set("differentiation", e.target.value)}
      />

      <Textarea
        label="¿Qué creéis que hacéis especialmente bien?"
        value={data.strengths}
        onChange={(e) => set("strengths", e.target.value)}
      />
    </FieldGroup>
  );
}

interface Block1Props extends FieldsProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function Block1Business({ data, onChange, onBack, onContinue }: Block1Props) {
  return (
    <PageShell onBack={onBack} onContinue={onContinue}>
      <SectionHeader
        eyebrow="Bloque 01 · Conocer HGA"
        title="Empecemos por HGA"
        subtitle="Antes de hablar de marketing, queremos entender bien el negocio."
      />
      <BusinessFields data={data} onChange={onChange} />
    </PageShell>
  );
}
