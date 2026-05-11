import { Section } from "@/components/ui/Section";
import { Eye, UserCheck, Heart, Sparkles, Map, Wrench } from "lucide-react";

const KARTY = [
  {
    icon: Eye,
    headline: "ŽIVÁ UKÁZKA KOUČOVÁNÍ S MCC KOUČEM",
    body: 'Uvidíte koučování naživo, jak vypadá u držitele nejvyšší ICF certifikace. Můžete se přihlásit jako „klient ukázky" a zažít koučování přímo se mnou. To, co vidíte v knihách jako „ideál", uvidíte v praxi.',
  },
  {
    icon: UserCheck,
    headline: "VYZKOUŠÍTE SI ROLI KOUČE",
    body: "Pravděpodobně poprvé budete v roli kouče. Dostanete jasnou strukturu, jak vést koučovací rozhovor, a okamžitě ji zkusíte. Zjistíte, jak Vám tato role sedí — fyzicky, emočně, mentálně.",
  },
  {
    icon: Heart,
    headline: "ZAŽIJETE KOUČOVÁNÍ JAKO KLIENT",
    body: "Druhá strana zkušenosti. Někdo Vás bude koučovat na téma, které si vyberete. V bezpečném prostředí. Zjistíte, jak silný zážitek to může být — a proč si stále více lidí ze všech sfér společnosti najímá svého kouče.",
  },
  {
    icon: Sparkles,
    headline: "KONKRÉTNÍ TÉMA Z VAŠEHO ŽIVOTA",
    body: "Žádné modelové situace. Pracujete s reálným tématem, které je důležité právě teď ve Vašem životě. Možná odejdete s posunem, který jste nečekali — workshop je živá praxe, ne simulace.",
  },
  {
    icon: Map,
    headline: "MAPA: JAK SE STÁT PROFESIONÁLNÍM KOUČEM",
    body: "Ukážu Vám cestu od první koučovací zkušenosti přes výcvik a certifikaci až k vlastní praxi s platícími klienty. Konkrétní kroky, časový rámec, investice. Žádná hype — pouze česká realita. Na českém trhu jako kouč působím 14 let.",
  },
  {
    icon: Wrench,
    headline: "PRAKTICKÉ CVIČENÍ PO WORKSHOPU — 5 KOUČOVACÍCH KONVERZACÍ",
    body: "Bez studených kontaktů. Bez prodejních triků. Konkrétní postup, jak můžete už druhý den s někým dalším udělat první koučovací konverzaci. Jak si můžete s lidmi ve svém okolí ověřit, jaké to je, když koučujete. Otázky, které můžete položit, a jak získat užitečnou zpětnou vazbu.",
  },
];

export function CoZazijete() {
  return (
    <Section id="co-zazijete" tone="white">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <p className="h-label mb-3">Co Vás čeká</p>
        <h2 className="h-display text-h2 text-navy-600">
          Co přesně se za ty 3 hodiny stane
        </h2>
      </div>

      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {KARTY.map((karta, idx) => {
          const Icon = karta.icon;
          const num = String(idx + 1).padStart(2, "0");
          return (
            <article
              key={idx}
              className="card group relative overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-teal-400/40"
            >
              {/* Velká cifra v pozadí — vizuální rytmus */}
              <div
                aria-hidden
                className="absolute -top-4 -right-2 text-[7rem] sm:text-[8rem] font-extrabold leading-none text-gold-500/8 select-none pointer-events-none"
              >
                {num}
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-teal-400/15 text-teal-500 group-hover:bg-teal-400 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="text-sm font-bold text-gold-500 tracking-wider">{num}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-navy-600 mb-3 leading-tight">
                  {karta.headline}
                </h3>
                <p className="text-sm sm:text-base text-dark/75 leading-relaxed">{karta.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
