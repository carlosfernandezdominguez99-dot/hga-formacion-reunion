import { MeetingData } from "@/types/meeting";

/**
 * PUNTO DE INTEGRACIÓN — sistema de gestión de clientes (CRM).
 *
 * Cuando se conecte un CRM (HubSpot, Pipedrive, un CRM propio…), esta función
 * debe encargarse de crear o actualizar el contacto/empresa y registrar la
 * reunión como actividad, usando el nivel de interés y la probabilidad de
 * cierre capturados en el resumen.
 *
 * Ejemplo una vez exista el endpoint:
 *   await fetch('/api/crm/sync-meeting', { method: 'POST', body: JSON.stringify(data) })
 */
export async function syncMeetingToCrm(_data: MeetingData): Promise<{ success: boolean }> {
  // TODO: conectar CRM.
  return { success: false };
}
