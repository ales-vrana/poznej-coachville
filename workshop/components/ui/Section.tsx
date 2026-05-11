import { cn } from "@/lib/utils";

type Tone = "white" | "cream" | "navy" | "dark";

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}

const toneStyles: Record<Tone, string> = {
  white: "bg-white text-dark",
  cream: "bg-cream text-dark",
  navy: "bg-navy-600 text-white",
  dark: "bg-dark text-white",
};

export function Section({ id, tone = "white", className, children }: SectionProps) {
  return (
    <section id={id} className={cn("section relative overflow-hidden", toneStyles[tone], className)}>
      <div className="container-x relative">{children}</div>
    </section>
  );
}
