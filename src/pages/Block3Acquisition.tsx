import { AcquisitionSection } from "@/types/meeting";
import { ACQUISITION_CHANNELS, YES_NO, YES_NO_UNKNOWN } from "@/data/options";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import RadioGroup from "@/components/ui/RadioGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import FieldGroup from "@/components/ui/FieldGroup";
import PageShell from "@/components/layout/PageShell";

interface FieldsProps {
  data: AcquisitionSection;
  onChange: (data: AcquisitionSection) => void;
}

export function AcquisitionFields({ data, onChange }: FieldsProps) {
  const set = <K extends keyof AcquisitionSection>(key: K, value: AcquisitionSection[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <FieldGroup>
      <CheckboxGroup
        label="¿De dónde llegan principalmente vuestros alumnos y clientes?"
        options={ACQUISITION_CHANNELS}
        values={data.channels}
        onChange={(values) => set("channels", values)}
        otherValue={data.channelsOther}
        onOtherChange={(v) => set("channelsOther", v)}
        columns={3}
      />

      <Input
        label="¿Cuál es vuestro principal canal de captación actualmente?"
        value={data.mainChannel}
        onChange={(e) => set("mainChannel", e.target.value)}
      />

      <Input
        label="¿Qué canal os gustaría potenciar?"
        value={data.channelToBoost}
        onChange={(e) => set("channelToBoost", e.target.value)}
      />

      <RadioGroup
        label="¿Recibís actualmente consultas desde redes sociales?"
        options={YES_NO_UNKNOWN}
        value={data.socialInquiries}
        onChange={(v) => set("socialInquiries", v as AcquisitionSection["socialInquiries"])}
      />

      <RadioGroup
        label="¿Recibís consultas desde la web?"
        options={YES_NO_UNKNOWN}
        value={data.webInquiries}
        onChange={(v) => set("webInquiries", v as AcquisitionSection["webInquiries"])}
      />

      <div>
        <RadioGroup
          label="¿Hacéis actualmente publicidad?"
          options={YES_NO}
          value={data.doesAdvertising}
          onChange={(v) => set("doesAdvertising", v as AcquisitionSection["doesAdvertising"])}
        />
        {data.doesAdvertising === "si" && (
          <div className="mt-4 animate-fadeIn">
            <Input
              label="¿En qué plataformas?"
              value={data.advertisingPlatforms}
              onChange={(e) => set("advertisingPlatforms", e.target.value)}
              placeholder="Ej. Google Ads, Meta Ads…"
            />
          </div>
        )}
      </div>

      <Textarea
        label="¿Cuál es vuestro principal problema actualmente para conseguir nuevos alumnos o clientes?"
        size="featured"
        value={data.mainProblem}
        onChange={(e) => set("mainProblem", e.target.value)}
      />
    </FieldGroup>
  );
}

interface Block3Props extends FieldsProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function Block3Acquisition({ data, onChange, onBack, onContinue }: Block3Props) {
  return (
    <PageShell onBack={onBack} onContinue={onContinue}>
      <SectionHeader
        eyebrow="Bloque 03 · Captación"
        title="¿Cómo llegan actualmente?"
        subtitle="Queremos entender cómo conseguís clientes hoy."
      />
      <AcquisitionFields data={data} onChange={onChange} />
    </PageShell>
  );
}
