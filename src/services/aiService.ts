import { MeetingData } from "@/types/meeting";

/**
 * PUNTO DE INTEGRACIÓN — API de IA.
 *
 * Aún no hay ninguna API de IA conectada. Esta función queda preparada para,
 * en el futuro, generar automáticamente un borrador de "Mis conclusiones" o
 * sugerir el nivel de interés / próximo paso a partir de las respuestas de la
 * reunión. La clave de la API (Claude, OpenAI, etc.) debe vivir en una
 * función serverless, nunca en el frontend.
 *
 * Ejemplo una vez exista el endpoint:
 *   const res = await fetch('/api/generate-conclusions', { method: 'POST', body: JSON.stringify(data) })
 */
export async function suggestConclusions(_data: MeetingData): Promise<string | null> {
  // TODO: conectar API de IA.
  return null;
}
