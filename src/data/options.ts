/**
 * Listas de opciones usadas en los distintos bloques del cuestionario.
 * Centralizadas aquí para no duplicar strings dentro de los componentes de página.
 */

export interface Option {
  value: string;
  label: string;
}

const opts = (labels: string[]): Option[] =>
  labels.map((label) => ({ value: label, label }));

// Bloque 01 — HGA
export const SERVICES_TO_BOOST = opts([
  "Autoescuela",
  "Permisos de conducción",
  "CAP",
  "ADR",
  "Formación para transporte",
  "Formación agroganadera",
  "Otros",
]);

// Bloque 02 — Clientes
export const CLIENT_PROFILES = opts([
  "Jóvenes que buscan su primer carnet",
  "Conductores profesionales",
  "Empresas",
  "Personas que necesitan formación específica",
  "Sector agroganadero",
  "Otros",
]);

export const VALUED_ASPECTS = opts([
  "Precio",
  "Cercanía",
  "Confianza",
  "Calidad",
  "Rapidez",
  "Trato personal",
  "Resultados",
  "Experiencia",
  "Otro",
]);

// Bloque 03 — Captación
export const ACQUISITION_CHANNELS = opts([
  "Google",
  "Google Maps",
  "Instagram",
  "Facebook",
  "TikTok",
  "Página web",
  "Recomendaciones",
  "Publicidad",
  "Empresas",
  "Centros educativos",
  "Paso por delante",
  "Otros",
]);

// Bloque 04 — Redes sociales
export const SOCIAL_PLATFORMS = opts([
  "Instagram",
  "Facebook",
  "TikTok",
  "YouTube",
  "LinkedIn",
  "Otras",
]);

export const SOCIAL_GOALS = opts([
  "Más visibilidad",
  "Más seguidores",
  "Más consultas",
  "Más matrículas",
  "Promocionar cursos",
  "Mejor imagen de marca",
  "Generar confianza",
  "Dar a conocer HGA",
  "Otro",
]);

export const INTERESTING_CONTENT = opts([
  "Profesores",
  "Clases prácticas",
  "Consejos para aprobar",
  "Errores habituales",
  "Preguntas de test",
  "Testimonios de alumnos",
  "Historias de alumnos",
  "Vehículos",
  "CAP / ADR",
  "Transporte profesional",
  "Formación",
  "Promociones",
  "Contenido educativo",
  "Contenido divertido",
  "Otros",
]);

// Bloque 05 — Web
export const WEBSITE_FUNCTIONS = opts([
  "Informar",
  "Generar consultas",
  "Generar matrículas",
  "Vender cursos",
  "Recibir solicitudes",
  "Aparecer en Google",
  "Varias",
]);

export const ONE_MINUTE_ACTIONS = opts([
  "Ver permisos",
  "Ver cursos",
  "Ver precios",
  "Consultar horarios",
  "Contactar por WhatsApp",
  "Llamar",
  "Solicitar información",
  "Matricularse",
  "Otro",
]);

// Bloque 06 — Competencia
export const DESIRED_IMAGE = opts([
  "Profesional",
  "Cercana",
  "Moderna",
  "Divertida",
  "Experta",
  "Familiar",
  "Innovadora",
  "Tradicional",
  "Otra",
]);

// Bloque 07 — Objetivos
export const PRIORITY_AREAS = opts([
  "Más alumnos de autoescuela",
  "Más matrículas",
  "Más cursos profesionales",
  "Más empresas",
  "Más consultas",
  "Más visibilidad",
  "Mejor imagen digital",
  "Más tráfico web",
  "Otro",
]);

// Resumen
export const DETECTED_SERVICES = opts([
  "Redes sociales",
  "Creación de contenido",
  "Vídeo",
  "Fotografía",
  "Web",
  "SEO",
  "Google Business",
  "Publicidad",
  "Estrategia",
  "Mantenimiento",
  "Otros",
]);

export const INTEREST_LEVELS: Option[] = [
  { value: "bajo", label: "Bajo" },
  { value: "medio", label: "Medio" },
  { value: "alto", label: "Alto" },
  { value: "muy_alto", label: "Muy alto" },
];

export const NEXT_STEPS: Option[] = [
  { value: "preparar_propuesta", label: "Preparar propuesta" },
  { value: "segunda_reunion", label: "Segunda reunión" },
  { value: "enviar_informacion", label: "Enviar información" },
  { value: "volver_a_contactar", label: "Volver a contactar" },
  { value: "pendiente_decision", label: "Pendiente de decisión" },
  { value: "otro", label: "Otro" },
];

export const YES_NO_UNKNOWN: Option[] = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
  { value: "no_sabe", label: "No lo sabemos" },
];

export const YES_NO: Option[] = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
];

export const YES_NO_DEPENDS: Option[] = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
  { value: "depende", label: "Depende" },
];
