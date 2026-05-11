import { WORKSHOP, COACH } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-dark text-white/70 py-10 sm:py-12 pb-24 sm:pb-12">
      <div className="container-x">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-bold text-white text-lg mb-1">
              <span className="text-teal-400">Coach</span>
              <span className="text-white">Ville</span>{" "}
              <span className="text-gold-500 text-xs tracking-[0.3em] align-middle">EUROPE ★</span>
            </div>
            <p className="text-white/60 text-xs mt-2 leading-relaxed">
              Jediná škola v ČR/SK s nejvyšší ICF akreditací Level 3. Tradice od roku 2001.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">Workshop</p>
            <p className="text-white/60">{WORKSHOP.dateFull}</p>
            <p className="text-white/60">{WORKSHOP.timeRange} • {WORKSHOP.platform}</p>
            <p className="text-white/60">{WORKSHOP.price}</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">Kontakt</p>
            <p className="text-white/60">{COACH.fullName}</p>
            <a
              href={`mailto:${WORKSHOP.contactEmail}`}
              className="text-teal-400 hover:text-teal-300 transition-colors underline-offset-4 hover:underline"
            >
              {WORKSHOP.contactEmail}
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} CoachVille Europe</p>
          <p>Made with care for future coaches.</p>
        </div>
      </div>
    </footer>
  );
}
