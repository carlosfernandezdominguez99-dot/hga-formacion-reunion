import { MeetingInfo as MeetingInfoType } from "@/types/meeting";
import Input from "@/components/ui/Input";
import SectionHeader from "@/components/ui/SectionHeader";
import PageShell from "@/components/layout/PageShell";

interface MeetingInfoProps {
  data: MeetingInfoType;
  onChange: (data: MeetingInfoType) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function MeetingInfo({ data, onChange, onBack, onContinue }: MeetingInfoProps) {
  const set = <K extends keyof MeetingInfoType>(key: K, value: MeetingInfoType[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <PageShell onBack={onBack} onContinue={onContinue} continueLabel="Empezar el cuestionario">
      <SectionHeader
        eyebrow="Antes de empezar"
        title="Datos de la reunión"
        subtitle="Un breve registro de quién participa hoy."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Nombre del cliente"
          value={data.clientName}
          onChange={(e) => set("clientName", e.target.value)}
        />
        <Input
          label="Persona/s asistentes"
          value={data.attendees}
          onChange={(e) => set("attendees", e.target.value)}
          placeholder="Nombres de los asistentes"
        />
        <Input
          label="Cargo"
          value={data.role}
          onChange={(e) => set("role", e.target.value)}
          placeholder="Ej. Gerente, Director"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Fecha"
            type="date"
            value={data.date}
            onChange={(e) => set("date", e.target.value)}
          />
          <Input
            label="Hora"
            type="time"
            value={data.time}
            onChange={(e) => set("time", e.target.value)}
          />
        </div>
        <Input
          label="Persona responsable de la decisión"
          value={data.decisionMaker}
          onChange={(e) => set("decisionMaker", e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="nombre@hgaformacion.es"
        />
      </div>
    </PageShell>
  );
}
