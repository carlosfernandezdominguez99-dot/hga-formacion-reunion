import { ClientsSection } from "@/types/meeting";
import { CLIENT_PROFILES, VALUED_ASPECTS } from "@/data/options";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import FieldGroup from "@/components/ui/FieldGroup";
import PageShell from "@/components/layout/PageShell";

interface FieldsProps {
  data: ClientsSection;
  onChange: (data: ClientsSection) => void;
}

export function ClientsFields({ data, onChange }: FieldsProps) {
  const set = <K extends keyof ClientsSection>(key: K, value: ClientsSection[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <FieldGroup>
      <Input
        label="¿Quién es vuestro cliente o alumno principal?"
        value={data.mainClient}
        onChange={(e) => set("mainClient", e.target.value)}
      />

      <CheckboxGroup
        label="¿Qué perfiles de cliente tenéis?"
        options={CLIENT_PROFILES}
        values={data.profiles}
        onChange={(values) => set("profiles", values)}
        otherValue={data.profilesOther}
        onOtherChange={(v) => set("profilesOther", v)}
      />

      <Input
        label="¿De qué localidades proceden principalmente?"
        value={data.locations}
        onChange={(e) => set("locations", e.target.value)}
      />

      <CheckboxGroup
        label="¿Qué suele valorar más una persona cuando os elige?"
        options={VALUED_ASPECTS}
        values={data.valuedAspects}
        onChange={(values) => set("valuedAspects", values)}
        otherValue={data.valuedAspectsOther}
        onOtherChange={(v) => set("valuedAspectsOther", v)}
        columns={3}
      />

      <Textarea
        label="¿Qué suele hacer que una persona finalmente se matricule o contrate un curso con vosotros?"
        size="featured"
        value={data.enrollmentTrigger}
        onChange={(e) => set("enrollmentTrigger", e.target.value)}
      />
    </FieldGroup>
  );
}

interface Block2Props extends FieldsProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function Block2Clients({ data, onChange, onBack, onContinue }: Block2Props) {
  return (
    <PageShell onBack={onBack} onContinue={onContinue}>
      <SectionHeader
        eyebrow="Bloque 02 · Clientes"
        title="¿A quién queremos atraer?"
        subtitle="Entender quiénes son vuestros alumnos y clientes."
      />
      <ClientsFields data={data} onChange={onChange} />
    </PageShell>
  );
}
