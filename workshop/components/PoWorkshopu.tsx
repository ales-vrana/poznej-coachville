import { Section } from "@/components/ui/Section";
import { ArrowUpRight, Clock, X } from "lucide-react";

const CESTY = [
  {
    label: "Cesta A",
    icon: ArrowUpRight,
    iconBg: "bg-teal-400/15 text-teal-500",
    title: '„Tohle je jasně moje hra. Chci výcvik."',
    body: "Pokud Vám workshop sedne, ušetřili jste roky váhání. Cenu workshopu Vám uznáme jako slevu na první platbu v CoachVille.",
    accent: "border-teal-400",
  },
  {
    label: "Cesta B",
    icon: Clock,
    iconBg: "bg-gold-500/15 text-gold-500",
    title: '„Něco v tom je, ale potřebuji čas."',
    body: "Naprosto v pořádku. Po workshopu dostanete kompletní bonusový balíček pro další studium, kalkulačku příjmů a případové studie dalších koučů, kteří už se přidali. Začnete v čase, který si zvolíte.",
    accent: "border-gold-500",
  },
  {
    label: "Cesta C",
    icon: X,
    iconBg: "bg-navy-100 text-navy-600",
    title: '„Není to pro mě."',
    body: "Nejcennější odpověď. Ušetřili jste 100 000+ Kč a měsíce přemýšlení. Workshop byl nejlevnější rozhodovací nástroj, jaký pro tuhle otázku existuje.",
    accent: "border-navy-300",
  },
];

export function PoWorkshopu() {
  return (
    <Section id="po-workshopu" tone="cream">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <p className="h-label mb-3">Tři cesty</p>
        <h2 className="h-display text-h2 text-navy-600 mb-4">
          Co se stane po workshopu
        </h2>
        <p className="text-base sm:text-lg text-dark/70">
          Realisticky existují 3 cesty, kterými můžete odejít:
        </p>
      </div>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
        {CESTY.map((cesta) => {
          const Icon = cesta.icon;
          return (
            <article
              key={cesta.label}
              className={`bg-white rounded-2xl shadow-soft p-6 sm:p-7 border-t-4 ${cesta.accent}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`flex items-center justify-center h-11 w-11 rounded-lg ${cesta.iconBg}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-navy-600">
                  {cesta.label}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-600 mb-3 leading-snug">
                {cesta.title}
              </h3>
              <p className="text-sm sm:text-base text-dark/80 leading-relaxed">{cesta.body}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-12 sm:mt-14 max-w-3xl mx-auto">
        <div className="bg-navy-600 text-white rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-base sm:text-lg leading-relaxed">
            <strong>Na workshopu Vám nebudu nic prodávat.</strong> V závěru workshopu se
            můžete zeptat na jakoukoliv otázku, která Vás zajímá.
          </p>
        </div>
      </div>
    </Section>
  );
}
