import { Section } from "@/components/ui/Section";

const PRESVEDCENI = [
  {
    headline: '„Nejsem dost charismatický / zkušený / extrovertní na to, abych byl kouč."',
    body: (
      <>
        <p className="mb-3">
          <strong>V realitě:</strong> 6 z 10 nejúspěšnějších českých koučů, které znám, by
          se popsali jako introverti. Koučování není show nebo výkon. Není to motivační
          proslov. Je to schopnost zůstat s druhým člověkem v jeho tématu — a ta nezáleží na
          charismatu, ale na pozornosti a otázkách.
        </p>
        <p>
          Workshop Vás postaví přímo do téhle role. Uvidíte to do 60 minut.
          <strong className="text-teal-500"> Zážitek &gt; Teorie</strong>
        </p>
      </>
    ),
  },
  {
    headline: '„V Česku se koučováním slušně neuživím."',
    body: (
      <>
        <p className="mb-3">
          <strong>V realitě:</strong> Trh s koučováním v ČR roste v desítkách procent ročně.
          Korporátní poptávka po koučování exekutivy 5× převyšuje nabídku certifikovaných
          koučů. Ceny ACC/PCC koučů v ČR jsou velmi štědré a trh není saturován ani z malé
          části. Koučováním lze nahradit i vysoké stabilní příjmy manažerů z korporace.
          Jen jich dosáhnete za mnohem méně času každý měsíc.
        </p>
        <p>Bonus k workshopu obsahuje aktualizovaná data o sazbách 2025/2026.</p>
      </>
    ),
  },
  {
    headline: '„Akreditovaný výcvik je drahý risk — co když mi to nepůjde?"',
    body: (
      <>
        <p className="mb-3">
          <strong>V realitě:</strong> Riziko není ve výcviku samotném — riziko je v tom,
          vstoupit do výcviku <em>bez praktické zkušenosti</em>. To je důvod, proč CoachVille
          doporučuje právě tento workshop jako vstupní bránu.
        </p>
        <p className="mb-3">
          Mnoho našich studentů řeklo, že{" "}
          <strong>
            i kdyby se v CoachVille nenaučili koučovat, bylo to skvělé rozhodnutí, které
            je v životě obrovsky posunulo
          </strong>
          .
        </p>
        <p>
          Workshop funguje jako rozcestí. Buďto zjistíte, že to <strong>JE</strong> pro Vás,
          a nebo <strong>NENÍ</strong>. Pokud je to pro Vás, cena workshopu je slevou na vstup
          do výcviku.
        </p>
      </>
    ),
  },
];

export function Presvedceni() {
  return (
    <Section id="presvedceni" tone="cream">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <p className="h-label mb-3">Tři mýty</p>
        <h2 className="h-display text-h2 text-navy-600">
          Tři přesvědčení, která zastavují většinu — a proč nejsou pravdivá
        </h2>
      </div>

      <div className="grid gap-5 sm:gap-6 max-w-4xl mx-auto">
        {PRESVEDCENI.map((item, idx) => (
          <article key={idx} className="card">
            <h3 className="text-h3 font-bold text-navy-600 mb-4 leading-snug">{item.headline}</h3>
            <div className="text-base text-dark/85 leading-relaxed">{item.body}</div>
          </article>
        ))}
      </div>
    </Section>
  );
}
