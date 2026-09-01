import { WebsiteSection } from "@/types/meeting";
import { WEBSITE_FUNCTIONS, ONE_MINUTE_ACTIONS, YES_NO_UNKNOWN } from "@/data/options";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import RadioGroup from "@/components/ui/RadioGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import FieldGroup from "@/components/ui/FieldGroup";
import PageShell from "@/components/layout/PageShell";

interface FieldsProps {
  data: WebsiteSection;
  onChange: (data: WebsiteSection) => void;
}

export function WebsiteFields({ data, onChange }: FieldsProps) {
  const set = <K extends keyof WebsiteSection>(key: K, value: WebsiteSection[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <FieldGroup>
      <CheckboxGroup
        label="¿Qué función cumple actualmente vuestra web?"
        options={WEBSITE_FUNCTIONS}
        values={data.currentFunction}
        onChange={(values) => set("currentFunction", values)}
        otherValue={data.currentFunctionOther}
        onOtherChange={(v) => set("currentFunctionOther", v)}
      />

      <RadioGroup
        label="¿Os genera actualmente contactos o clientes?"
        options={YES_NO_UNKNOWN}
        value={data.generatesContacts}
        onChange={(v) => set("generatesContacts", v as WebsiteSection["generatesContacts"])}
      />

      <Input
        label="¿Quién gestiona actualmente la web?"
        value={data.manager}
        onChange={(e) => set("manager", e.target.value)}
      />

      <RadioGroup
        label="¿Tenéis acceso al dominio y hosting?"
        options={YES_NO_UNKNOWN}
        value={data.hasDomainAccess}
        onChange={(v) => set("hasDomainAccess", v as WebsiteSection["hasDomainAccess"])}
      />

      <RadioGroup
        label="¿Tenéis estadísticas de visitas?"
        options={YES_NO_UNKNOWN}
        value={data.hasAnalytics}
        onChange={(v) => set("hasAnalytics", v as WebsiteSection["hasAnalytics"])}
      />

      <CheckboxGroup
        label="Si alguien que no conoce HGA entra ahora mismo en vuestra web, ¿qué debería poder hacer en menos de un minuto?"
        options={ONE_MINUTE_ACTIONS}
        values={data.oneMinuteAction}
        onChange={(values) => set("oneMinuteAction", values)}
        otherValue={data.oneMinuteActionOther}
        onOtherChange={(v) => set("oneMinuteActionOther", v)}
        columns={3}
      />

      <Textarea
        label="¿Qué cambiaríais de vuestra web actual?"
        size="featured"
        value={data.changesWanted}
        onChange={(e) => set("changesWanted", e.target.value)}
      />
    </FieldGroup>
  );
}

interface Block5Props extends FieldsProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function Block5Website({ data, onChange, onBack, onContinue }: Block5Props) {
  return (
    <PageShell onBack={onBack} onContinue={onContinue}>
      <SectionHeader
        eyebrow="Bloque 05 · Web"
        title="La página web"
        subtitle="Convertir vuestra presencia digital en una herramienta de captación."
      />
      <WebsiteFields data={data} onChange={onChange} />
    </PageShell>
  );
}
