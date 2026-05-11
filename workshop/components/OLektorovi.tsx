import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Trophy, GraduationCap, Users, Flag } from "lucide-react";
import { COACH } from "@/lib/config";

const BADGES = [
  {
    icon: Trophy,
    title: "ICF Master Certified Coach",
    sub: `nejvyšší světová úroveň — v ČR má MCC pouze ${COACH.mccCountInCzechia} koučů (a 4 z nich studovali v CoachVille)`,
  },
  {
    icon: GraduationCap,
    title: `${COACH.yearsOfPractice} let praxe v profesionálním koučování`,
    sub: `cca ${COACH.coachingHours} odkoučovaných hodin`,
  },
  {
    icon: Users,
    title: "Největší komunita profesionálních koučů v ČR/SK",
    sub: "od roku 2014",
  },
  {
    icon: Flag,
    title: "Ambasador CoachVille pro ČR/SK",
    sub: "Koučovací výcvik akreditovaný ICF na úrovni Level 3. Jediná škola v ČR/SK s přípravou pro všechny úrovně ICF certifikace: ACC, PCC, MCC.",
  },
];

export function OLektorovi() {
  return (
    <Section id="lektor" tone="dark">
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <p className="h-label text-gold-400 mb-3">Lektor</p>
        <h2 className="h-display text-h2 text-white mb-4">
          O lektorovi — možná mě už znáte
        </h2>
        <p className="text-base sm:text-lg text-white/70">
          Pokud čtete moje emaily nebo jste mě potkali na FB, většinu pravděpodobně víte.
          Pro úplnost a pro ty, kdo se připojí poprvé:
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-[auto,1fr] gap-8 sm:gap-12 items-start">
          <div className="flex justify-center sm:justify-start">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-2xl overflow-hidden ring-4 ring-white/10 shadow-lifted">
              <Image
                src="/ales-vrana-portrait.jpg"
                alt={`Portrét: ${COACH.fullName}`}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 240px"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{COACH.name}</h3>
            <p className="text-teal-300 text-base sm:text-lg font-semibold mb-6 tracking-wide">
              {COACH.titles}
            </p>

            <ul className="space-y-5">
              {BADGES.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="shrink-0 flex items-center justify-center h-11 w-11 rounded-lg bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/20">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base sm:text-lg leading-tight">
                        {badge.title}
                      </p>
                      <p className="text-sm text-white/65 mt-1 leading-relaxed">{badge.sub}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Osobní citát */}
        <div className="mt-12 sm:mt-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8">
          <p className="h-label text-gold-400 mb-3">Co o mně neuvidíte na CV</p>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed">
            Nejsem coach, který „změnil svůj život koučováním ze dne na den". Tahle profese
            mě baví, protože mě každý klient přinutí přemýšlet. Žiju koučováním 14 let každý
            den, a kdybych měl rozhodnutí udělat znovu, udělal bych ho dřív.{" "}
            <strong className="text-white">
              Stát se koučem bylo nejlepší rozhodnutí mého dospělého života.
            </strong>
          </p>
        </div>
      </div>
    </Section>
  );
}
