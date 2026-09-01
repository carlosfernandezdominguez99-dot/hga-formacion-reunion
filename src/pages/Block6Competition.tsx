import { CompetitionSection } from "@/types/meeting";
import { DESIRED_IMAGE } from "@/data/options";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import FieldGroup from "@/components/ui/FieldGroup";
import PageShell from "@/components/layout/PageShell";

interface FieldsProps {
  data: CompetitionSection;
  onChange: (data: CompetitionSection) => void;
}

export function CompetitionFields({ data, onChange }: FieldsProps) {
  const set = <K extends keyof CompetitionSection>(key: K, value: CompetitionSection[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <FieldGroup>
      <Input
        label="¿Qué autoescuelas o centros consideráis vuestra competencia directa?"
        value={data.competitors}
        onChange={(e) => set("competitors", e.target.value)}
      />

      <Textarea
        label="¿Qué hacen ellos mejor?"
        value={data.theyDoBetter}
        onChange={(e) => set("theyDoBetter", e.target.value)}
      />

      <Textarea
        label="¿Qué hacéis vosotros mejor?"
        value={data.weDoBetter}
        onChange={(e) => set("weDoBetter", e.target.value)}
      />

      <Input
        label="¿Hay alguna empresa, marca, web o cuenta de redes que os guste especialmente?"
        value={data.inspiration}
        onChange={(e) => set("inspiration", e.target.value)}
      />

      <CheckboxGroup
        label="¿Qué imagen queréis transmitir?"
        options={DESIRED_IMAGE}
        values={data.desiredImage}
        onChange={(values) => set("desiredImage", values)}
        otherValue={data.desiredImageOther}
        onOtherChange={(v) => set("desiredImageOther", v)}
        columns={3}
      />

      <Textarea
        label="¿Hay algo que NO queráis hacer?"
        size="featured"
        value={data.thingsToAvoid}
        onChange={(e) => set("thingsToAvoid", e.target.value)}
      />
    </FieldGroup>
  );
}

interface Block6Props extends FieldsProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function Block6Competition({ data, onChange, onBack, onContinue }: Block6Props) {
  return (
    <PageShell onBack={onBack} onContinue={onContinue}>
      <SectionHeader
        eyebrow="Bloque 06 · Competencia"
        title="¿Cómo queremos posicionar HGA?"
        subtitle="Entender el mercado y qué imagen queremos construir."
      />
      <CompetitionFields data={data} onChange={onChange} />
    </PageShell>
  );
}
