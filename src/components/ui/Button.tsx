import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<string, string> = {
  primary:
    "bg-ink-950 text-white shadow-subtle hover:bg-accent-700 hover:shadow-card active:scale-[0.98]",
  secondary:
    "bg-white text-ink-800 border border-ink-200 hover:border-ink-400 hover:bg-ink-50 active:scale-[0.98]",
  ghost: "bg-transparent text-ink-500 hover:text-ink-900 hover:bg-ink-100",
};

const sizes: Record<string, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
