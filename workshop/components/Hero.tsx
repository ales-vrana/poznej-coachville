import Image from "next/image";
import { Calendar, Clock, Monitor, Check, Star } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { WORKSHOP, COACH } from "@/lib/config";

const VALUE_ITEMS = [
  {
    title: "3hodinový živý workshop",
    sub: "s ICF MCC koučem a trenérem koučů",
  },
  {
    title: "Živá ukázka koučování",
    sub: "s jedním z účastníků naživo",
  },
  {
    title: "Záznam workshopu",
    sub: "ke kterému se můžete vrátit i později",
  },
];

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden text-white">
      {/* Background image placeholder + overlay */}
      <div className="absolute inset-0 -z-10">
        {/* Solid navy fallback pod blur/transparent vrstvami (pro starší zařízení) */}
        <div className="absolute inset-0 bg-navy-900" aria-hidden />
        {/* Hero image — SVG mountain landscape s rozpaženou postavou */}
        <Image
          src="/hero-placeholder.svg"
          alt="Východ slunce nad horami — silueta postavy na vrcholu s rozpaženýma rukama"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 hero-overlay" aria-hidden />
      </div>

      <div className="container-x relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
        {/* Top badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy-900/60 backdrop-blur-sm px-4 py-2 border border-white/15">
            <Star className="h-3.5 w-3.5 text-gold-400 fill-gold-400" aria-hidden />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white/90">
              Pro odběratele newsletteru a všechny, kdo koučování zvažují
            </span>
          </span>
        </div>

        {/* H1 */}
        <h1 className="mt-8 sm:mt-10 text-center max-w-4xl mx-auto">
          <span className="block text-base sm:text-lg font-medium tracking-wide text-teal-200/90 mb-4 sm:mb-5">
            Otázka, na kterou si nejde odpovědět v hlavě:
          </span>
          <span className="block h-display text-hero text-white">
            „Půjde mi&nbsp;to vůbec?"
          </span>
        </h1>

        {/* Subhead */}
        <p className="mt-6 sm:mt-8 text-center text-lg sm:text-xl lg:text-2xl text-white/85 leading-snug max-w-3xl mx-auto font-medium">
          Za 3 hodiny živé praxe v roli kouče i klienta to budete vědět.
        </p>

        {/* Intro paragraph */}
        <p className="mt-5 text-center text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
          Tenhle workshop jsem postavil pro lidi jako jste vy — ty, kteří už o&nbsp;koučování
          přemýšlí, čtou moje emaily, sledují obor zpovzdálí, ale potřebují si to{" "}
          <span className="text-white font-semibold">osahat ve vlastní kůži</span>{" "}
          předtím, než udělají další velký krok.
        </p>

        {/* Value stack card */}
        <div className="mt-10 sm:mt-12 max-w-2xl mx-auto">
          <div className="rounded-2xl bg-navy-900/55 backdrop-blur-md border border-white/15 p-6 sm:p-8 shadow-lifted">
            <p className="h-label text-gold-400 mb-5">Co konkrétně dostanete za {WORKSHOP.price}</p>
            <ul className="space-y-4">
              {VALUE_ITEMS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="shrink-0 mt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-teal-400/25 ring-1 ring-teal-300/40">
                      <Check className="h-3.5 w-3.5 text-teal-200" aria-hidden />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-base sm:text-lg">{item.title}</p>
                    <p className="text-sm sm:text-base text-white/70 mt-0.5">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
          <CTAButton href={WORKSHOP.paymentLink} variant="on-dark" className="w-full sm:w-auto group">
            Zajistit si místo — {WORKSHOP.price}
          </CTAButton>

          {/* Garance line */}
          <p className="text-xs sm:text-sm text-white/70 text-center max-w-md">
            ✓ Garance vrácení peněz — pokud po prvních 45 minutách necítíte přínos,
            stačí napsat na {WORKSHOP.contactEmail} a peníze vrátím ten samý den.
          </p>
        </div>

        {/* Info row — mobile-stacked, desktop-inline */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-x-6 sm:gap-y-3 text-sm sm:text-base text-white/85">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-300 shrink-0" aria-hidden />
            <span className="font-medium">{WORKSHOP.dateFull}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/20" aria-hidden />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-teal-300 shrink-0" aria-hidden />
            <span className="font-medium">{WORKSHOP.timeRange}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/20" aria-hidden />
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-teal-300 shrink-0" aria-hidden />
            <span className="font-medium">{WORKSHOP.platform}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
