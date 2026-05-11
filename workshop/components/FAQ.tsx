"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { ChevronDown } from "lucide-react";
import { WORKSHOP } from "@/lib/config";

const QA = [
  {
    q: "Nikdy jsem nekoučoval/a. Bude to pro mě?",
    a: "Ano — workshop je primárně pro lidi bez předchozí zkušenosti. Dostanete jednoduchý rámec a jasné instrukce. Účast na workshopu nevyžaduje předchozí zkušenost s koučováním.",
  },
  {
    q: "Co když mi to nebude sedět?",
    a: "Po prvních 60 minutách víte, jestli jste správně. Pokud ne, odpojte se z workshopu, napište mi email a vrátím 100 % ceny. Riziko beru na sebe.",
  },
  {
    q: "Musím mít zapnutou kameru?",
    a: "Ano. Workshop je interaktivní, koučujete a jste koučováni — to bez kamery nejde. Připojit se můžete z počítače, tabletu nebo telefonu, workshop probíhá na Zoomu.",
  },
  {
    q: "Co když nemůžu být celé 3 hodiny online?",
    a: "Doporučuji si čas vyhradit celý. Praxe probíhá ve druhé polovině a kdo odejde dříve, přijde o klíčovou část. Účastníci dostanou záznam, ten však nebude obsahovat praktickou část.",
  },
  {
    q: "Je workshop vhodný pro pokročilé kouče?",
    a: "Tento konkrétní formát je orientován na začátečníky a zájemce o vstup do koučování. Pokud už koučujete, jste ve výcviku, nebo jste profesionálním koučem, tento workshop není pro Vás.",
  },
  {
    q: "Můžu workshop dát někomu jako dárek?",
    a: `Ano, napište mi e-mail na ${WORKSHOP.contactEmail} — připravím dárkový voucher na jeho jméno.`,
  },
  {
    q: "Po workshopu na mě budete tlačit, abych šel do výcviku?",
    a: "Ne. Princip workshopu je opačný: dát Vám pravdivou odpověď, jestli má pro Vás výcvik smysl. Pokud po workshopu rozhodnete, že to není pro Vás, je to legitimní výsledek. Workshop neobsahuje prodejní část.",
  },
  {
    q: "Večerní slot 18:30–21:30 je dlouhý. Stihnu to po práci?",
    a: "Pokud máte dojezd domů do 18:00, jste v pohodě. V průběhu první hodiny je v pořádku si vzít občerstvení, ve druhé hodině budeme praktikovat, takže tam se hodí být plně přítomen. Pokud potřebujete skončit dříve, můžete se podívat na zbytek workshopu ze záznamu.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" tone="white">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <p className="h-label mb-3">FAQ</p>
        <h2 className="h-display text-h2 text-navy-600">Časté otázky</h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="divide-y divide-navy-100/60 rounded-2xl border border-navy-100/60 bg-white shadow-soft overflow-hidden">
          {QA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6 hover:bg-cream transition-colors focus-visible:bg-cream"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="font-semibold text-base sm:text-lg text-navy-700">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-teal-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`faq-panel-${idx}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-base text-dark/80 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Máte další otázku */}
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base text-dark/70">
            Máte další otázku, která tu není?{" "}
            <a
              href={`mailto:${WORKSHOP.contactEmail}?subject=Workshop%20kou%C4%8Dov%C3%A1n%C3%AD%20-%20dotaz`}
              className="text-teal-500 hover:text-teal-600 font-semibold underline-offset-4 hover:underline"
            >
              Napište mi přímo →
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
