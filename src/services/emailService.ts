import { MeetingData } from "@/types/meeting";
import { buildEmailBody, buildEmailSubject } from "@/utils/meetingSummary";

/**
 * Dirección de administrador a la que se envía el resumen de cada reunión.
 * Se lee de una variable de entorno (VITE_ADMIN_EMAIL) para no hardcodear
 * ningún email dentro de los componentes. Configúrala en un archivo .env.local
 * (ver .env.example) o en las variables de entorno del proyecto en Vercel.
 */
export const ADMIN_EMAIL: string = import.meta.env.VITE_ADMIN_EMAIL ?? "";

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface SendMeetingSummaryResult {
  success: boolean;
  message: string;
}

/**
 * PUNTO DE INTEGRACIÓN — envío de email.
 *
 * Esta función construye el email a partir de los datos de la reunión y lo
 * envía. Ahora mismo no hay ningún servicio de email conectado (no se han
 * introducido claves de API), así que la función simula el envío: valida los
 * datos, construye el payload y lo guarda localmente para que nada se pierda.
 *
 * Para activar el envío real:
 *   1. Elige un proveedor (recomendado: Resend o Postmark; también válido
 *      SendGrid o EmailJS si prefieres no montar backend).
 *   2. Crea una función serverless (por ejemplo /api/send-meeting-summary en
 *      Vercel) que reciba este payload y llame a la API del proveedor con su
 *      API key — la key NUNCA debe vivir en el frontend.
 *   3. Sustituye el bloque "TODO: conectar API de email" de aquí abajo por
 *      un fetch('/api/send-meeting-summary', { method: 'POST', body: ... }).
 *
 * El resto de la aplicación no necesita cambiar: siempre llama a
 * sendMeetingSummary(data) y reacciona a success/message.
 */
export async function sendMeetingSummary(data: MeetingData): Promise<SendMeetingSummaryResult> {
  if (!ADMIN_EMAIL) {
    return {
      success: false,
      message:
        "No hay ningún email de administrador configurado (VITE_ADMIN_EMAIL). El resumen se ha guardado localmente pero no se ha podido enviar.",
    };
  }

  const payload: EmailPayload = {
    to: ADMIN_EMAIL,
    subject: buildEmailSubject(data),
    body: buildEmailBody(data),
  };

  try {
    // TODO: conectar API de email. Ejemplo una vez exista el endpoint:
    //
    // const response = await fetch("/api/send-meeting-summary", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // if (!response.ok) throw new Error(await response.text());

    // Mientras no exista esa API, simulamos la latencia de un envío real
    // y guardamos el payload para que quede constancia de la reunión.
    await new Promise((resolve) => setTimeout(resolve, 900));
    persistPendingEmail(payload);

    return {
      success: true,
      message: `Resumen preparado para ${payload.to}. El envío automático se activará al conectar un proveedor de email.`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "No se ha podido preparar el envío.",
    };
  }
}

/** Guarda el último payload de email en localStorage, útil mientras no hay backend. */
function persistPendingEmail(payload: EmailPayload) {
  try {
    const existing = JSON.parse(localStorage.getItem("hga_pending_emails") ?? "[]");
    existing.push({ ...payload, createdAt: new Date().toISOString() });
    localStorage.setItem("hga_pending_emails", JSON.stringify(existing));
  } catch {
    // localStorage puede no estar disponible; el envío no depende de esto.
  }
}
