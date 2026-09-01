import { useState } from "react";
import { MeetingData, SendStatus } from "@/types/meeting";
import { DETECTED_SERVICES, INTEREST_LEVELS, NEXT_STEPS } from "@/data/options";
import { BusinessFields } from "./Block1Business";
import { ClientsFields } from "./Block2Clients";
import { AcquisitionFields } from "./Block3Acquisition";
import { SocialMediaFields } from "./Block4SocialMedia";
import { WebsiteFields } from "./Block5Website";
import { CompetitionFields } from "./Block6Competition";
import { ObjectivesFields } from "./Block7Objectives";
import { previewText } from "@/utils/formatters";
import SectionHeader from "@/components/ui/SectionHeader";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import RadioGroup from "@/components/ui/RadioGroup";
import Slider from "@/components/ui/Slider";
import Button from "@/components/ui/Button";
import SummaryCard from "@/components/layout/SummaryCard";

interface SummaryProps {
  data: MeetingData;
  onChange: (data: MeetingData) => void;
  onBack: () => void;
  onSend: () => void;
  sendStatus: SendStatus;
  sendMessage: string | null;
}

export default function Summary({ data, onChange, onBack, onSend, sendStatus, sendMessage }: SummaryProps) {
  const [editingInfo, setEditingInfo] = useState(false);

  const setSection = <K extends keyof MeetingData>(key: K, value: MeetingData[K]) =>
    onChange({ ...data, [key]: value });

  const setConclusions = <K extends keyof MeetingData["conclusions"]>(
    key: K,
    value: MeetingData["conclusions"][K]
  ) => setSection("conclusions", { ...data.conclusions, [key]: value });

  const info = data.meetingInfo;

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10 sm:py-16">
      <SectionHeader
        eyebrow="Última pantalla"
        title="Resumen de la reunión"
        subtitle="Revisad y editad cualquier respuesta antes de guardar y enviar."
      />

      {/* Datos de la reunión */}
      <div className="mb-8 rounded-2xl border border-ink-150 bg-ink-50 px-6 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg text-ink-950">Datos de la reunión</h3>
          <button
            type="button"
            onClick={() => setEditingInfo((v) => !v)}
            className="text-[0.82rem] font-medium text-accent-600 hover:text-accent-800"
          >
            {editingInfo ? "Listo" : "Editar"}
          </button>
        </div>
        {editingInfo ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Cliente" value={info.clientName} onChange={(e) => setSection("meetingInfo", { ...info, clientName: e.target.value })} />
            <Input label="Asistentes" value={info.attendees} onChange={(e) => setSection("meetingInfo", { ...info, attendees: e.target.value })} />
            <Input label="Cargo" value={info.role} onChange={(e) => setSection("meetingInfo", { ...info, role: e.target.value })} />
            <Input label="Fecha" type="date" value={info.date} onChange={(e) => setSection("meetingInfo", { ...info, date: e.target.value })} />
            <Input label="Hora" type="time" value={info.time} onChange={(e) => setSection("meetingInfo", { ...info, time: e.target.value })} />
            <Input label="Responsable de la decisión" value={info.decisionMaker} onChange={(e) => setSection("meetingInfo", { ...info, decisionMaker: e.target.value })} />
            <Input label="Email" type="email" value={info.email} onChange={(e) => setSection("meetingInfo", { ...info, email: e.target.value })} />
          </div>
        ) : (
          <dl className="grid grid-cols-1 gap-x-8 gap-y-2 text-[0.9rem] sm:grid-cols-2">
            <div className="flex justify-between gap-4 sm:justify-start">
              <dt className="text-ink-400">Cliente</dt>
              <dd className="text-ink-800">{info.clientName || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4 sm:justify-start">
              <dt className="text-ink-400">Asistentes</dt>
              <dd className="text-ink-800">{info.attendees || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4 sm:justify-start">
              <dt className="text-ink-400">Cargo</dt>
              <dd className="text-ink-800">{info.role || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4 sm:justify-start">
              <dt className="text-ink-400">Fecha / hora</dt>
              <dd className="text-ink-800">
                {info.date || "—"} {info.time && `· ${info.time}`}
              </dd>
            </div>
            <div className="flex justify-between gap-4 sm:justify-start">
              <dt className="text-ink-400">Decisor</dt>
              <dd className="text-ink-800">{info.decisionMaker || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4 sm:justify-start">
              <dt className="text-ink-400">Email</dt>
              <dd className="text-ink-800">{info.email || "—"}</dd>
            </div>
          </dl>
        )}
      </div>

      {/* Secciones editables por bloque */}
      <div className="space-y-3">
        <SummaryCard
          index="01"
          title="HGA"
          preview={previewText(data.business.description, data.business.keyServices)}
        >
          <BusinessFields data={data.business} onChange={(v) => setSection("business", v)} />
        </SummaryCard>

        <SummaryCard
          index="02"
          title="Clientes"
          preview={previewText(data.clients.mainClient, data.clients.locations)}
        >
          <ClientsFields data={data.clients} onChange={(v) => setSection("clients", v)} />
        </SummaryCard>

        <SummaryCard
          index="03"
          title="Captación"
          preview={previewText(data.acquisition.mainChannel, data.acquisition.mainProblem)}
        >
          <AcquisitionFields data={data.acquisition} onChange={(v) => setSection("acquisition", v)} />
        </SummaryCard>

        <SummaryCard
          index="04"
          title="Redes sociales"
          preview={previewText(data.socialMedia.platforms, data.socialMedia.manager)}
        >
          <SocialMediaFields data={data.socialMedia} onChange={(v) => setSection("socialMedia", v)} />
        </SummaryCard>

        <SummaryCard
          index="05"
          title="Web"
          preview={previewText(data.website.currentFunction, data.website.changesWanted)}
        >
          <WebsiteFields data={data.website} onChange={(v) => setSection("website", v)} />
        </SummaryCard>

        <SummaryCard
          index="06"
          title="Competencia"
          preview={previewText(data.competition.competitors, data.competition.desiredImage)}
        >
          <CompetitionFields data={data.competition} onChange={(v) => setSection("competition", v)} />
        </SummaryCard>

        <SummaryCard
          index="07"
          title="Objetivos"
          preview={previewText(data.objectives.mainGoal, data.objectives.successVision)}
        >
          <ObjectivesFields data={data.objectives} onChange={(v) => setSection("objectives", v)} />
        </SummaryCard>
      </div>

      {/* Valoración interna */}
      <div className="mt-12 rounded-2xl border border-ink-150 bg-white p-6 shadow-subtle sm:p-8">
        <h3 className="mb-6 font-display text-xl text-ink-950">Valoración interna</h3>

        <div className="space-y-8">
          <Textarea
            label="Mis conclusiones"
            size="featured"
            value={data.conclusions.notes}
            onChange={(e) => setConclusions("notes", e.target.value)}
            placeholder="Notas para preparar la propuesta…"
          />

          <CheckboxGroup
            label="Servicios que parecen necesitar"
            options={DETECTED_SERVICES}
            values={data.conclusions.servicesNeeded}
            onChange={(values) => setConclusions("servicesNeeded", values)}
            otherValue={data.conclusions.servicesNeededOther}
            onOtherChange={(v) => setConclusions("servicesNeededOther", v)}
            columns={3}
          />

          <RadioGroup
            label="Nivel de interés"
            options={INTEREST_LEVELS}
            value={data.conclusions.interestLevel}
            onChange={(v) => setConclusions("interestLevel", v as MeetingData["conclusions"]["interestLevel"])}
          />

          <Slider
            label="Probabilidad de cierre"
            value={data.conclusions.closingProbability}
            onChange={(v) => setConclusions("closingProbability", v)}
          />

          <div>
            <RadioGroup
              label="Próximo paso"
              options={NEXT_STEPS}
              value={data.conclusions.nextStep}
              onChange={(v) => setConclusions("nextStep", v as MeetingData["conclusions"]["nextStep"])}
              layout="column"
            />
            {data.conclusions.nextStep === "otro" && (
              <div className="mt-3 animate-fadeIn">
                <Input
                  value={data.conclusions.nextStepOther}
                  onChange={(e) => setConclusions("nextStepOther", e.target.value)}
                  placeholder="Especificar…"
                />
              </div>
            )}
          </div>

          <Input
            label="Fecha de próximo contacto"
            type="date"
            value={data.conclusions.nextContactDate}
            onChange={(e) => setConclusions("nextContactDate", e.target.value)}
          />
        </div>
      </div>

      {/* Envío */}
      <div className="mt-14 flex flex-col items-center border-t border-ink-100 pt-10 text-center">
        <Button
          size="lg"
          onClick={onSend}
          disabled={sendStatus === "saving"}
          className="w-full max-w-md px-10 sm:w-auto"
        >
          {sendStatus === "saving" ? "Guardando y enviando…" : "Guardar reunión y enviar resumen →"}
        </Button>

        {sendStatus === "sent" && (
          <p className="mt-4 max-w-md text-[0.9rem] text-accent-700 animate-fadeIn">
            {sendMessage}
          </p>
        )}
        {sendStatus === "error" && (
          <p className="mt-4 max-w-md text-[0.9rem] text-red-600 animate-fadeIn">
            {sendMessage}
          </p>
        )}

        <button
          type="button"
          onClick={onBack}
          className="mt-6 text-[0.85rem] text-ink-400 hover:text-ink-700"
        >
          ← Volver al bloque anterior
        </button>
      </div>
    </div>
  );
}
