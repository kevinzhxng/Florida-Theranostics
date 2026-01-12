import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "subtle";
}

export default function Section({
  children,
  className = "",
  variant = "default",
}: SectionProps) {
  const baseStyles = "w-full";
  const variantStyles = {
    default: "",
    subtle: "bg-warm-white",
  };

  return (
    <section className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </section>
  );
}
