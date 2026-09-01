import { ReactNode } from "react";

interface FieldGroupProps {
  children: ReactNode;
  className?: string;
}

/** Envoltorio simple para dar espaciado consistente entre preguntas de un bloque. */
export default function FieldGroup({ children, className = "" }: FieldGroupProps) {
  return <div className={`space-y-8 ${className}`}>{children}</div>;
}
