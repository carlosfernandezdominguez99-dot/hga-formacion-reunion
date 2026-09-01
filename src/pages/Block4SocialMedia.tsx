import { SocialMediaSection } from "@/types/meeting";
import {
  SOCIAL_PLATFORMS,
  SOCIAL_GOALS,
  INTERESTING_CONTENT,
  YES_NO_UNKNOWN,
  YES_NO_DEPENDS,
} from "@/data/options";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import RadioGroup from "@/components/ui/RadioGroup";
import SectionHeader from "@/components/ui/SectionHeader";
import FieldGroup from "@/components/ui/FieldGroup";
import PageShell from "@/components/layout/PageShell";

interface FieldsProps {
  data: SocialMediaSection;
  onChange: (data: SocialMediaSection) => void;
}

export function SocialMediaFields({ data, onChange }: FieldsProps) {
  const set = <K extends keyof SocialMediaSection>(key: K, value: SocialMediaSection[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <FieldGroup>
      <CheckboxGroup
        label="¿Qué redes utilizáis actualmente?"
        options={SOCIAL_PLATFORMS}
        values={data.platforms}
        onChange={(values) => set("platforms", values)}
        otherValue={data.platformsOther}
        onOtherChange={(v) => set("platformsOther", v)}
        columns={3}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="¿Quién gestiona actualmente las redes?"
          value={data.manager}
          onChange={(e) => set("manager", e.target.value)}
        />
        <Input
          label="¿Con qué frecuencia publicáis?"
          value={data.frequency}
          onChange={(e) => set("frequency", e.target.value)}
        />
      </div>

      <Input
        label="¿Quién crea actualmente el contenido?"
        value={data.contentCreator}
        onChange={(e) => set("contentCreator", e.target.value)}
      />

      <Textarea
        label="¿Qué tipo de contenido publicáis actualmente?"
        value={data.contentType}
        onChange={(e) => set("contentType", e.target.value)}
      />

      <Textarea
        label="¿Qué publicaciones os han funcionado mejor?"
        value={data.bestPerforming}
        onChange={(e) => set("bestPerforming", e.target.value)}
      />

      <RadioGroup
        label="¿Os llegan consultas o matrículas desde redes?"
        options={YES_NO_UNKNOWN}
        value={data.inquiriesFromSocial}
        onChange={(v) => set("inquiriesFromSocial", v as SocialMediaSection["inquiriesFromSocial"])}
      />

      <CheckboxGroup
        label="¿Qué os gustaría conseguir realmente con las redes sociales?"
        options={SOCIAL_GOALS}
        values={data.goals}
        onChange={(values) => set("goals", values)}
        otherValue={data.goalsOther}
        onOtherChange={(v) => set("goalsOther", v)}
        columns={2}
      />

      <RadioGroup
        label="¿Estaríais cómodos apareciendo en vídeos?"
        options={YES_NO_DEPENDS}
        value={data.comfortableOnCamera}
        onChange={(v) => set("comfortableOnCamera", v as SocialMediaSection["comfortableOnCamera"])}
      />

      <CheckboxGroup
        label="¿Qué tipo de contenido os parecería interesante hacer?"
        options={INTERESTING_CONTENT}
        values={data.interestingContent}
        onChange={(values) => set("interestingContent", values)}
        otherValue={data.interestingContentOther}
        onOtherChange={(v) => set("interestingContentOther", v)}
        columns={3}
      />

      <Textarea
        label="¿Qué tipo de contenido NO queréis hacer?"
        size="featured"
        value={data.contentToAvoid}
        onChange={(e) => set("contentToAvoid", e.target.value)}
      />
    </FieldGroup>
  );
}

interface Block4Props extends FieldsProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function Block4SocialMedia({ data, onChange, onBack, onContinue }: Block4Props) {
  return (
    <PageShell onBack={onBack} onContinue={onContinue}>
      <SectionHeader
        eyebrow="Bloque 04 · Redes sociales"
        title="Vuestras redes"
        subtitle="Analizar qué está funcionando y qué podemos mejorar."
      />
      <SocialMediaFields data={data} onChange={onChange} />
    </PageShell>
  );
}
