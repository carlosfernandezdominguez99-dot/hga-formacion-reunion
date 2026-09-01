# HGA Formación — Reunión de estrategia digital

Aplicación privada de un solo usuario para conducir la reunión comercial con HGA Formación:
portada → datos de la reunión → 7 bloques de preguntas → resumen editable → guardar y enviar.

## Stack

React 18 + TypeScript + Tailwind CSS + Vite.

```
src/
  types/       modelo de datos único de la reunión (MeetingData)
  data/        listas de opciones (checkboxes/radios) de cada bloque
  components/
    ui/        Input, Textarea, CheckboxGroup, RadioGroup, Slider, Button…
    layout/    Navigation, ProgressIndicator, PageShell, SummaryCard
  pages/       Cover, MeetingInfo, Block1..7, Summary
  services/    emailService, storageService, aiService, crmService
  utils/       formatters, construcción del resumen para el email
```

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre la URL que muestre la terminal (por defecto `http://localhost:5173`). Funciona en
portátil y tablet; el diseño está optimizado para 1280–1440px y se adapta a tablet.

## Guardado durante la reunión

Cada respuesta se guarda automáticamente en `localStorage` del navegador mientras se navega
entre bloques, para que un refresco accidental no borre nada. No sustituye a una base de
datos real (ver más abajo).

## Variables de entorno

Copia `.env.example` como `.env.local` y define:

```
VITE_ADMIN_EMAIL=tu-email@tu-dominio.com
```

Es el email al que el botón final "Guardar reunión y enviar resumen" prepara el envío
(`src/services/emailService.ts`, función `sendMeetingSummary`). Ningún email está escrito
directamente en el código.

## Estado del envío de email

El envío real de email requiere una API externa que **aún no está conectada** (no se han
introducido claves). Ahora mismo `sendMeetingSummary`:

- valida que exista `VITE_ADMIN_EMAIL`,
- construye el asunto y el cuerpo estructurado del email,
- simula el envío y guarda el payload en `localStorage` (`hga_pending_emails`) para que quede
  constancia,
- muestra el estado de carga y la confirmación en pantalla.

**Para activar el envío real**, recomiendo [Resend](https://resend.com) (API sencilla, buen
nivel gratuito) o Postmark como alternativa. Pasos:

1. Crea una función serverless en Vercel: `api/send-meeting-summary.ts`, que reciba
   `{ to, subject, body }` y llame a la API del proveedor con su API key guardada como
   variable de entorno **del servidor** (nunca `VITE_...`, para que no llegue al navegador).
2. En `src/services/emailService.ts`, sustituye el bloque comentado `TODO: conectar API de
   email` por un `fetch('/api/send-meeting-summary', { method: 'POST', body: JSON.stringify(payload) })`.

El resto de la aplicación no necesita cambios: siempre llama a `sendMeetingSummary(data)`.

`src/services/storageService.ts` (base de datos) y `src/services/aiService.ts` /
`crmService.ts` (IA y CRM) siguen el mismo patrón: la función ya existe y está documentada
con el `TODO` exacto para cuando se quiera conectar cada servicio.

## Despliegue en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. Importa el repositorio en [Vercel](https://vercel.com/new).
3. Framework preset: **Vite**. Build command `npm run build`, output `dist` (detectado automático).
4. Añade `VITE_ADMIN_EMAIL` (y las que correspondan al conectar email/DB/IA) en Project
   Settings → Environment Variables.

## Nota sobre este entorno de construcción

Este proyecto se ha escrito completo y revisado manualmente (estructura, tipos y props
verificados con un chequeo de TypeScript), pero el entorno en el que se generó no tenía
acceso al registro de npm, así que no se ha podido ejecutar `npm install` / `npm run build`
aquí mismo. Al ejecutar `npm install && npm run dev` en tu ordenador (o al desplegar en
Vercel, que sí tiene acceso completo a npm) el proyecto debería instalarse y arrancar sin
pasos adicionales.
