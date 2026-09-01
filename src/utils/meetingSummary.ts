import { MeetingData } from "@/types/meeting";
import { formatDate, joinList, textOrDash, yesNoLabel } from "./formatters";
import { INTEREST_LEVELS, NEXT_STEPS } from "@/data/options";

/** Construye el asunto del email de resumen. */
export function buildEmailSubject(data: MeetingData): string {
  const dateLabel = data.meetingInfo.date ? formatDate(data.meetingInfo.date) : "sin fecha";
  return `Reunión — ${data.meetingInfo.clientName || "HGA Formación"} — ${dateLabel}`;
}

const line = (label: string, value: string) => `${label}: ${value}`;
const block = (title: string) => `\n${title}\n${"-".repeat(title.length)}`;

/**
 * Construye el cuerpo del email en texto plano, estructurado en las secciones
 * pedidas en el brief: datos, resumen del negocio, clientes, captación, redes,
 * web, competencia, objetivos, servicios detectados, presupuesto, próximos pasos
 * y conclusiones.
 */
export function buildEmailBody(data: MeetingData): string {
  const { meetingInfo, business, clients, acquisition, socialMedia, website, competition, objectives, conclusions } = data;

  const interestLabel =
    INTEREST_LEVELS.find((o) => o.value === conclusions.interestLevel)?.label ?? "—";
  const nextStepLabel =
    conclusions.nextStep === "otro"
      ? textOrDash(conclusions.nextStepOther)
      : NEXT_STEPS.find((o) => o.value === conclusions.nextStep)?.label ?? "—";

  const sections: string[] = [];

  sections.push("HGA FORMACIÓN");
  sections.push("Reunión de estrategia digital");

  sections.push(block("DATOS DE LA REUNIÓN"));
  sections.push(line("Cliente", textOrDash(meetingInfo.clientName)));
  sections.push(line("Asistentes", textOrDash(meetingInfo.attendees)));
  sections.push(line("Cargo", textOrDash(meetingInfo.role)));
  sections.push(line("Fecha", formatDate(meetingInfo.date)));
  sections.push(line("Hora", textOrDash(meetingInfo.time)));
  sections.push(line("Responsable de la decisión", textOrDash(meetingInfo.decisionMaker)));
  sections.push(line("Email", textOrDash(meetingInfo.email)));

  sections.push(block("RESUMEN DEL NEGOCIO"));
  sections.push(line("Descripción actual", textOrDash(business.description)));
  sections.push(line("Servicios más importantes", textOrDash(business.keyServices)));
  sections.push(line("Servicios a potenciar", joinList(business.servicesToBoost, business.servicesToBoostOther)));
  sections.push(line("Diferenciación", textOrDash(business.differentiation)));
  sections.push(line("Fortalezas", textOrDash(business.strengths)));

  sections.push(block("CLIENTES"));
  sections.push(line("Cliente/alumno principal", textOrDash(clients.mainClient)));
  sections.push(line("Perfiles de cliente", joinList(clients.profiles, clients.profilesOther)));
  sections.push(line("Localidades", textOrDash(clients.locations)));
  sections.push(line("Qué valoran más", joinList(clients.valuedAspects, clients.valuedAspectsOther)));
  sections.push(line("Motivo de matrícula/contratación", textOrDash(clients.enrollmentTrigger)));

  sections.push(block("CAPTACIÓN"));
  sections.push(line("Canales actuales", joinList(acquisition.channels, acquisition.channelsOther)));
  sections.push(line("Principal canal", textOrDash(acquisition.mainChannel)));
  sections.push(line("Canal a potenciar", textOrDash(acquisition.channelToBoost)));
  sections.push(line("Consultas desde redes", yesNoLabel(acquisition.socialInquiries)));
  sections.push(line("Consultas desde web", yesNoLabel(acquisition.webInquiries)));
  sections.push(line("Hace publicidad", yesNoLabel(acquisition.doesAdvertising)));
  if (acquisition.doesAdvertising === "si") {
    sections.push(line("Plataformas de publicidad", textOrDash(acquisition.advertisingPlatforms)));
  }
  sections.push(line("Principal problema de captación", textOrDash(acquisition.mainProblem)));

  sections.push(block("REDES SOCIALES"));
  sections.push(line("Redes utilizadas", joinList(socialMedia.platforms, socialMedia.platformsOther)));
  sections.push(line("Gestión", textOrDash(socialMedia.manager)));
  sections.push(line("Frecuencia de publicación", textOrDash(socialMedia.frequency)));
  sections.push(line("Creación de contenido", textOrDash(socialMedia.contentCreator)));
  sections.push(line("Tipo de contenido actual", textOrDash(socialMedia.contentType)));
  sections.push(line("Publicaciones con mejor rendimiento", textOrDash(socialMedia.bestPerforming)));
  sections.push(line("Consultas/matrículas desde redes", yesNoLabel(socialMedia.inquiriesFromSocial)));
  sections.push(line("Objetivos con redes", joinList(socialMedia.goals, socialMedia.goalsOther)));
  sections.push(line("Comodidad apareciendo en vídeo", yesNoLabel(socialMedia.comfortableOnCamera)));
  sections.push(line("Contenido de interés", joinList(socialMedia.interestingContent, socialMedia.interestingContentOther)));
  sections.push(line("Contenido a evitar", textOrDash(socialMedia.contentToAvoid)));

  sections.push(block("WEB"));
  sections.push(line("Función actual", joinList(website.currentFunction, website.currentFunctionOther)));
  sections.push(line("Genera contactos", yesNoLabel(website.generatesContacts)));
  sections.push(line("Gestión de la web", textOrDash(website.manager)));
  sections.push(line("Acceso a dominio/hosting", yesNoLabel(website.hasDomainAccess)));
  sections.push(line("Estadísticas de visitas", yesNoLabel(website.hasAnalytics)));
  sections.push(line("Acción en menos de un minuto", joinList(website.oneMinuteAction, website.oneMinuteActionOther)));
  sections.push(line("Cambios deseados", textOrDash(website.changesWanted)));

  sections.push(block("COMPETENCIA"));
  sections.push(line("Competencia directa", textOrDash(competition.competitors)));
  sections.push(line("Qué hacen mejor", textOrDash(competition.theyDoBetter)));
  sections.push(line("Qué hacemos mejor", textOrDash(competition.weDoBetter)));
  sections.push(line("Referentes", textOrDash(competition.inspiration)));
  sections.push(line("Imagen deseada", joinList(competition.desiredImage, competition.desiredImageOther)));
  sections.push(line("Qué evitar", textOrDash(competition.thingsToAvoid)));

  sections.push(block("OBJETIVOS"));
  sections.push(line("Visión de éxito (6 meses)", textOrDash(objectives.successVision)));
  sections.push(line("Objetivo principal", textOrDash(objectives.mainGoal)));
  sections.push(line("Cifra concreta", textOrDash(objectives.targetNumber)));
  sections.push(line("Área prioritaria", joinList(objectives.priorityArea, objectives.priorityAreaOther)));
  sections.push(line("Fecha de inicio deseada", formatDate(objectives.startDate)));
  sections.push(line("Inversión prevista", textOrDash(objectives.budget)));
  sections.push(line("Participantes en la decisión", textOrDash(objectives.decisionParticipants)));

  sections.push(block("SERVICIOS DETECTADOS"));
  sections.push(joinList(conclusions.servicesNeeded, conclusions.servicesNeededOther));

  sections.push(block("PRESUPUESTO"));
  sections.push(textOrDash(objectives.budget));

  sections.push(block("PRÓXIMOS PASOS"));
  sections.push(line("Próximo paso", nextStepLabel));
  sections.push(line("Fecha de próximo contacto", formatDate(conclusions.nextContactDate)));
  sections.push(line("Nivel de interés", interestLabel));
  sections.push(line("Probabilidad de cierre", conclusions.closingProbability === null ? "—" : `${conclusions.closingProbability}/10`));

  sections.push(block("MIS CONCLUSIONES"));
  sections.push(textOrDash(conclusions.notes));

  return sections.join("\n");
}
