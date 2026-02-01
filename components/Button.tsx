import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-8 py-3.5 text-sm font-sans font-normal tracking-wide transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:ring-offset-warm-white hover:scale-[1.02] active:scale-[0.98]";
  
  const variants = {
    primary:
      "bg-navy text-warm-white hover:bg-navy-light active:bg-navy-light",
    secondary:
      "bg-transparent text-charcoal border border-charcoal/30 hover:border-charcoal hover:bg-charcoal/5 active:bg-charcoal/10",
  };

  // External links (mailto, tel, http)
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto") ||
    href.startsWith("tel");

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
