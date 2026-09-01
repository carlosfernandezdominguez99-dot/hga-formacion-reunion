/** Pequeñas utilidades de formato compartidas por Summary y los servicios de envío. */

/** Construye una línea de vista previa a partir de varios campos (texto o listas). */
export function previewText(...values: (string | string[] | undefined)[]): string {
  const parts = values
    .flatMap((v) => (Array.isArray(v) ? v : [v]))
    .filter((v): v is string => Boolean(v && v.trim().length > 0));
  if (parts.length === 0) return "Sin respuesta todavía";
  const joined = parts.join(" · ");
  return joined.length > 140 ? `${joined.slice(0, 140)}…` : joined;
}

/** Convierte una lista de opciones + campo "otro" en una única línea legible. */
export function joinList(values: string[], other?: string): string {
  const all = [...values.filter((v) => !/^otr[oa]s?$/i.test(v))];
  const hasOther = values.some((v) => /^otr[oa]s?$/i.test(v));
  if (hasOther && other) all.push(other);
  else if (hasOther) all.push("Otros");
  return all.length > 0 ? all.join(", ") : "—";
}

export function textOrDash(value?: string): string {
  return value && value.trim().length > 0 ? value : "—";
}

export function formatDate(value?: string): string {
  if (!value) return "—";
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
}

const YES_NO_LABELS: Record<string, string> = {
  si: "Sí",
  no: "No",
  no_sabe: "No lo sabemos",
  depende: "Depende",
};

export function yesNoLabel(value?: string): string {
  if (!value) return "—";
  return YES_NO_LABELS[value] ?? value;
}
