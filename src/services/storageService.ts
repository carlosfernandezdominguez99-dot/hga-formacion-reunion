import { MeetingData } from "@/types/meeting";

/**
 * Persistencia local del borrador de la reunión.
 *
 * Mientras se conversa en la reunión, el estado se guarda automáticamente en
 * localStorage para que un refresco accidental de la página o un cierre de
 * pestaña no haga perder las respuestas. No sustituye a una base de datos:
 * es solo una red de seguridad del navegador del portátil/tablet.
 */

const DRAFT_KEY = "hga_meeting_draft_v1";

export function saveDraft(data: MeetingData): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // Si localStorage no está disponible (modo privado, cuota llena…) seguimos sin persistencia.
  }
}

export function loadDraft(): MeetingData | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as MeetingData) : null;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // no-op
  }
}

/**
 * PUNTO DE INTEGRACIÓN — base de datos.
 *
 * Cuando se conecte una base de datos (Supabase, Firebase, un backend propio…),
 * esta es la función a implementar: recibe la reunión ya completa y la
 * persiste de forma permanente (y, si aplica, la vincula a un CRM).
 *
 * Ejemplo una vez exista el endpoint:
 *   await fetch('/api/meetings', { method: 'POST', body: JSON.stringify(data) })
 */
export async function saveMeetingToDatabase(data: MeetingData): Promise<{ success: boolean }> {
  // TODO: conectar base de datos / CRM.
  saveDraft(data);
  return { success: true };
}
