import { Section } from "@/components/ui/Section";

const POCHYBNOSTI = [
  {
    num: "1",
    headline: '„Zvládnu to vůbec? Mám na to vůbec předpoklady?"',
    body: (
      <>
        Většina nejlepších koučů, které znám, jsou introverti. Lidé, kteří byli celý život
        „ti, kteří naslouchají". Na workshopu nezjistíte, jestli jste extrovertní typ — zjistíte,
        jestli máte přirozenou schopnost{" "}
        <strong>být s druhým člověkem v jeho tématu</strong>. A tu má víc lidí, než si myslí.
        Jen málokdo si to ověří.
      </>
    ),
    highlight:
      "Co konkrétně na workshopu: Díky Vaší první 20minutové koučovací zkušenosti zjistíte, jaké to je, když potkáte člověka, kterého poprvé v životě koučujete. Bude to zážitek, který Vám ušetří roky úvah.",
  },
  {
    num: "2",
    headline: '„Půjde mi to LÉPE než ostatní věci, ve kterých jsem dobrý?"',
    body: (
      <>
        Tohle je správná otázka — koučování má smysl tehdy, když k tomu máte předpoklady a
        talenty. Workshop Vás postaví do reálného koučování s reálným člověkem, na reálném
        tématu. To je jediný způsob, jak rozpoznat rozdíl mezi <em>„zvládnu to"</em> a{" "}
        <em>„v tomhle můžu a chci být skvělý"</em>.
      </>
    ),
    highlight:
      'Co konkrétně: Z workshopu odejdete s konkrétním pocitem: „Tohle bylo skvělé. Chci to dělat víc." — nebo: „Tohle nesedí, hledám něco jiného." Obě odpovědi mají hodnotu.',
  },
  {
    num: "3",
    headline: '„Uživím se tím i v ČR/SK?"',
    body: (
      <>
        <p className="mb-4">Čísla z českého trhu:</p>
        <ul className="space-y-2 text-sm sm:text-base mb-4">
          <li className="flex gap-2">
            <span className="text-teal-500 font-bold shrink-0">•</span>
            <span><strong>ACC absolvent</strong> po 1. roce praxe: 1 200–2 500 Kč / hod</span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-500 font-bold shrink-0">•</span>
            <span><strong>PCC certifikovaný kouč</strong>: 3 000–5 000 Kč / hod</span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-500 font-bold shrink-0">•</span>
            <span><strong>MCC v ČR</strong>: 6 000–12 000 Kč / hod, korporátní kontrakty 100 000+ Kč / měsíc</span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-500 font-bold shrink-0">•</span>
            <span>Plný úvazek kouče = cca <strong>80 placených hodin měsíčně</strong> (20 hodin týdně)</span>
          </li>
        </ul>
        <p>
          Realistická matematika: kouč na PCC úrovni s plnou praxí má v ČR měsíční hrubý
          příjem <strong>180 000–360 000 Kč</strong>. Méně než 5 % zaměstnanců s vysokoškolským
          vzděláním v ČR vydělává v tomto pásmu. Vede k tomu jasná cesta. Namísto rychlého
          vydělávání je to postupná evoluce, růst a budování kompetencí.
        </p>
      </>
    ),
    highlight:
      'Co konkrétně na workshopu: Sekce „3 etické cesty k prvním klientům" + vhled do českého trhu s koučováním — jaká je matematika „nasycení trhu" a jak velký je trh klientů pro koučování.',
  },
  {
    num: "4",
    headline: '„Je výcvik za 100 000+ Kč dobré rozhodnutí?"',
    body: (
      <>
        <p className="mb-3">
          To nemůžete vědět, dokud nemáte praktickou zkušenost. A přesně proto existuje tento
          workshop. Není to „mini-výcvik". Je to{" "}
          <strong>rozhodovací a vyjasňující nástroj</strong> — 3 hodiny živé praxe, které
          Vám dají odpověď na otázku, jestli má pro Vás smysl investovat do plnohodnotného výcviku.
        </p>
        <p className="mb-3">Pokud po workshopu uvidíte, že <strong>ano</strong> — víte, co kupujete a proč.</p>
        <p className="mb-3">Pokud uvidíte, že <strong>ne</strong> — ušetřili jste si 100 000 Kč a 12 měsíců času.</p>
        <p>
          V obou případech je workshop nejlevnější rozhodovací investice, kterou v této oblasti
          můžete udělat.
        </p>
      </>
    ),
    highlight:
      "Získáte kalkulačku příjmů profesionálního kouče a přístup k případovým studiím profesionálních koučů.",
  },
];

export function Pochybnosti() {
  return (
    <Section id="pochybnosti" tone="white">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <p className="h-label mb-3">4 otázky</p>
        <h2 className="h-display text-h2 text-navy-600 mb-4">
          4 pochybnosti, které Vás dělí od rozhodnutí
        </h2>
        <p className="text-base sm:text-lg text-dark/70">
          Tohle si pravděpodobně říkáte — a workshop má odpověď na každou z nich.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        {POCHYBNOSTI.map((item) => (
          <article key={item.num} className="card flex flex-col">
            <div className="flex items-center gap-4 mb-5">
              <div className="num-badge">#{item.num}</div>
            </div>
            <h3 className="text-h3 font-bold text-navy-600 mb-4 leading-snug">{item.headline}</h3>
            <div className="text-base text-dark/80 leading-relaxed mb-5">{item.body}</div>
            <div className="highlight-box mt-auto">
              <p className="text-dark"><strong>{item.highlight}</strong></p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
