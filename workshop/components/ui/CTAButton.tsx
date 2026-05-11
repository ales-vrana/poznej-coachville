import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  variant?: "primary" | "secondary" | "on-dark";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  ariaLabel?: string;
}

export function CTAButton({
  href,
  variant = "primary",
  className,
  children,
  external = true,
  ariaLabel,
}: CTAButtonProps) {
  const classes = {
    primary: "btn-primary group",
    secondary: "btn-secondary group",
    "on-dark": "btn-on-dark group",
  }[variant];

  const labelSuffix = external ? " (otevře se v novém okně)" : "";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={(ariaLabel ?? (typeof children === "string" ? children : "")) + labelSuffix}
      className={cn(classes, className)}
    >
      <span>{children}</span>
      <ArrowRight
        className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden
      />
    </a>
  );
}
