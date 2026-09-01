import { MeetingData } from "@/types/meeting";
import { buildEmailBody, buildEmailSubject } from "@/utils/meetingSummary";

export const ADMIN_EMAIL: string = import.meta.env.VITE_ADMIN_EMAIL ?? "";

const WEB3FORMS_ACCESS_KEY: string = import.meta.env.VITE_WEB3FORMS_KEY ?? "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface SendMeetingSummaryResult {
  success: boolean;
  message: string;
}

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

  if (!WEB3FORMS_ACCESS_KEY) {
    persistPendingEmail(payload);
    return {
      success: false,
      message:
        "No hay ninguna clave de Web3Forms configurada (VITE_WEB3FORMS_KEY). El resumen se ha guardado localmente pero no se ha enviado.",
    };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: payload.subject,
        message: payload.body,
        from_name: "HGA Formación — Reunión",
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result?.message ?? "El proveedor de email ha rechazado el envío.");
    }

    persistPendingEmail(payload);

    return {
      success: true,
      message: `Resumen enviado a ${payload.to}.`,
    };
  } catch (error) {
    persistPendingEmail(payload);
    return {
      success: false,
      message:
        error instanceof Error
          ? `No se ha podido enviar el email: ${error.message}. El resumen se ha guardado localmente.`
          : "No se ha podido enviar el resumen. Se ha guardado localmente.",
    };
  }
}

function persistPendingEmail(payload: EmailPayload) {
  try {
    const existing = JSON.parse(localStorage.getItem("hga_pending_emails") ?? "[]");
    existing.push({ ...payload, createdAt: new Date().toISOString() });
    localStorage.setItem("hga_pending_emails", JSON.stringify(existing));
  } catch {
    // localStorage puede no estar disponible; el envío no depende de esto.
  }
}
