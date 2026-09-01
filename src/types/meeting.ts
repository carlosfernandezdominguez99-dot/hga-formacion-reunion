/**
 * Modelo de datos único para toda la reunión.
 * Cada bloque del cuestionario tiene su propia sección dentro de MeetingData.
 * Nada aquí depende de React: puede reutilizarse en servicios (email, storage, IA).
 */

export type YesNoUnknown = "si" | "no" | "no_sabe" | "";
export type YesNo = "si" | "no" | "";
export type YesNoDepends = "si" | "no" | "depende" | "";

export interface MeetingInfo {
  clientName: string;
  attendees: string;
  role: string;
  date: string;
  time: string;
  decisionMaker: string;
  email: string;
}

export interface BusinessSection {
  description: string;
  keyServices: string;
  servicesToBoost: string[];
  servicesToBoostOther: string;
  differentiation: string;
  strengths: string;
}

export interface ClientsSection {
  mainClient: string;
  profiles: string[];
  profilesOther: string;
  locations: string;
  valuedAspects: string[];
  valuedAspectsOther: string;
  enrollmentTrigger: string;
}

export interface AcquisitionSection {
  channels: string[];
  channelsOther: string;
  mainChannel: string;
  channelToBoost: string;
  socialInquiries: YesNoUnknown;
  webInquiries: YesNoUnknown;
  doesAdvertising: YesNo;
  advertisingPlatforms: string;
  mainProblem: string;
}

export interface SocialMediaSection {
  platforms: string[];
  platformsOther: string;
  manager: string;
  frequency: string;
  contentCreator: string;
  contentType: string;
  bestPerforming: string;
  inquiriesFromSocial: YesNoUnknown;
  goals: string[];
  goalsOther: string;
  comfortableOnCamera: YesNoDepends;
  interestingContent: string[];
  interestingContentOther: string;
  contentToAvoid: string;
}

export interface WebsiteSection {
  currentFunction: string[];
  currentFunctionOther: string;
  generatesContacts: YesNoUnknown;
  manager: string;
  hasDomainAccess: YesNoUnknown;
  hasAnalytics: YesNoUnknown;
  oneMinuteAction: string[];
  oneMinuteActionOther: string;
  changesWanted: string;
}

export interface CompetitionSection {
  competitors: string;
  theyDoBetter: string;
  weDoBetter: string;
  inspiration: string;
  desiredImage: string[];
  desiredImageOther: string;
  thingsToAvoid: string;
}

export interface ObjectivesSection {
  successVision: string;
  mainGoal: string;
  targetNumber: string;
  priorityArea: string[];
  priorityAreaOther: string;
  startDate: string;
  budget: string;
  decisionParticipants: string;
}

export type InterestLevel = "bajo" | "medio" | "alto" | "muy_alto" | "";

export type NextStepOption =
  | "preparar_propuesta"
  | "segunda_reunion"
  | "enviar_informacion"
  | "volver_a_contactar"
  | "pendiente_decision"
  | "otro"
  | "";

export interface Conclusions {
  notes: string;
  servicesNeeded: string[];
  servicesNeededOther: string;
  interestLevel: InterestLevel;
  closingProbability: number | null;
  nextStep: NextStepOption;
  nextStepOther: string;
  nextContactDate: string;
}

export interface MeetingData {
  meetingInfo: MeetingInfo;
  business: BusinessSection;
  clients: ClientsSection;
  acquisition: AcquisitionSection;
  socialMedia: SocialMediaSection;
  website: WebsiteSection;
  competition: CompetitionSection;
  objectives: ObjectivesSection;
  conclusions: Conclusions;
}

export const createEmptyMeetingData = (): MeetingData => ({
  meetingInfo: {
    clientName: "HGA Formación",
    attendees: "",
    role: "",
    date: "",
    time: "",
    decisionMaker: "",
    email: "",
  },
  business: {
    description: "",
    keyServices: "",
    servicesToBoost: [],
    servicesToBoostOther: "",
    differentiation: "",
    strengths: "",
  },
  clients: {
    mainClient: "",
    profiles: [],
    profilesOther: "",
    locations: "",
    valuedAspects: [],
    valuedAspectsOther: "",
    enrollmentTrigger: "",
  },
  acquisition: {
    channels: [],
    channelsOther: "",
    mainChannel: "",
    channelToBoost: "",
    socialInquiries: "",
    webInquiries: "",
    doesAdvertising: "",
    advertisingPlatforms: "",
    mainProblem: "",
  },
  socialMedia: {
    platforms: [],
    platformsOther: "",
    manager: "",
    frequency: "",
    contentCreator: "",
    contentType: "",
    bestPerforming: "",
    inquiriesFromSocial: "",
    goals: [],
    goalsOther: "",
    comfortableOnCamera: "",
    interestingContent: [],
    interestingContentOther: "",
    contentToAvoid: "",
  },
  website: {
    currentFunction: [],
    currentFunctionOther: "",
    generatesContacts: "",
    manager: "",
    hasDomainAccess: "",
    hasAnalytics: "",
    oneMinuteAction: [],
    oneMinuteActionOther: "",
    changesWanted: "",
  },
  competition: {
    competitors: "",
    theyDoBetter: "",
    weDoBetter: "",
    inspiration: "",
    desiredImage: [],
    desiredImageOther: "",
    thingsToAvoid: "",
  },
  objectives: {
    successVision: "",
    mainGoal: "",
    targetNumber: "",
    priorityArea: [],
    priorityAreaOther: "",
    startDate: "",
    budget: "",
    decisionParticipants: "",
  },
  conclusions: {
    notes: "",
    servicesNeeded: [],
    servicesNeededOther: "",
    interestLevel: "",
    closingProbability: null,
    nextStep: "",
    nextStepOther: "",
    nextContactDate: "",
  },
});

/** Identificadores de cada paso del flujo, en orden. */
export const STEP_IDS = [
  "cover",
  "meetingInfo",
  "business",
  "clients",
  "acquisition",
  "socialMedia",
  "website",
  "competition",
  "objectives",
  "summary",
] as const;

export type StepId = (typeof STEP_IDS)[number];

/** Pasos que cuentan para la barra de progreso (los 7 bloques + resumen = 8, como pide el brief). */
export const NAV_STEPS: { id: StepId; short: string; label: string }[] = [
  { id: "business", short: "01", label: "HGA" },
  { id: "clients", short: "02", label: "Clientes" },
  { id: "acquisition", short: "03", label: "Captación" },
  { id: "socialMedia", short: "04", label: "Redes" },
  { id: "website", short: "05", label: "Web" },
  { id: "competition", short: "06", label: "Competencia" },
  { id: "objectives", short: "07", label: "Objetivos" },
  { id: "summary", short: "08", label: "Resumen" },
];

export type SendStatus = "idle" | "saving" | "sent" | "error";
