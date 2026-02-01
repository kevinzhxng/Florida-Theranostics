import { forwardRef, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "subtle";
}

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, className = "", variant = "default" },
  ref
) {
  const baseStyles = "w-full";
  const variantStyles = {
    default: "",
    subtle: "bg-warm-white",
  };

  return (
    <section
      ref={ref}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </section>
  );
});

export default Section;
