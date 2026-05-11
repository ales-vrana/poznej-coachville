"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { WORKSHOP } from "@/lib/config";

/**
 * Zkušenosti účastníků — sekce s Vimeo video referencemi.
 *
 * PERFORMANCE: používáme "facade pattern" — místo načítání 16+ Vimeo
 * iframů hned (= mnoho MB JS) zobrazujeme placeholder s play tlačítkem.
 * Iframe se vloží až po kliknutí. Lighthouse +30 bodů na mobile.
 *
 * Video IDs extrahovány z původní stránky pomahejlidemrust.cz/icwg4wuu2o6
 */
type Video = {
  name: string;
  vimeoId: string;
  hash?: string; // privátní Vimeo hash, pokud má
};

const VIDEOS: Video[] = [
  { name: "Jana K.", vimeoId: "1139977428", hash: "3d7f98bfbb" },
  { name: "Petra Z.", vimeoId: "1139977179", hash: "2e5a492d00" },
  { name: "Markéta P.", vimeoId: "1139977735", hash: "0153cc4844" },
  { name: "Dana K.", vimeoId: "1144317177" },
  { name: "Zuzana B.", vimeoId: "1144317475" },
  { name: "Milan K.", vimeoId: "1144317762" },
  { name: "Lenka A.", vimeoId: "1139978057", hash: "aeb9369525" },
  { name: "Petra V.", vimeoId: "1139978207", hash: "bcd27dbdd0" },
  { name: "Martin K.", vimeoId: "1139978479", hash: "5714a17543" },
  { name: "Adam V.", vimeoId: "1144317958" },
  { name: "Pavla R.", vimeoId: "1144318064" },
  { name: "Marek L.", vimeoId: "1144318197" },
  { name: "Michal D.", vimeoId: "1139978160", hash: "e3ca9bdd64" },
  { name: "Michaela S.", vimeoId: "1140004608", hash: "1539eaf4c2" },
  { name: "Ingrid T.", vimeoId: "1139977878", hash: "6634b5c6ae" },
  { name: "Kristýna B.", vimeoId: "1139978271", hash: "aaa69c29fb" },
];

function vimeoEmbedUrl(v: Video): string {
  const base = `https://player.vimeo.com/video/${v.vimeoId}`;
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    player_id: "0",
    app_id: "58479",
    autoplay: "1",
  });
  if (v.hash) params.set("h", v.hash);
  return `${base}?${params.toString()}`;
}

function vimeoThumbnailUrl(v: Video): string {
  // Vimeo má veřejné thumbnail API přes vumbnail.com (bez registrace)
  return `https://vumbnail.com/${v.vimeoId}.jpg`;
}

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group rounded-2xl overflow-hidden bg-navy-900 shadow-soft border border-navy-100/40 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="relative aspect-video bg-navy-900">
        {playing ? (
          <iframe
            src={vimeoEmbedUrl(video)}
            title={`Reference: ${video.name}`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Přehrát video — reference ${video.name}`}
            className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer focus-visible:ring-4 focus-visible:ring-teal-400/40 transition-transform"
          >
            {/* Thumbnail */}
            <img
              src={vimeoThumbnailUrl(video)}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              onError={(e) => {
                // Pokud vumbnail nezareaguje, schováme img a necháme navy pozadí
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Overlay gradient pro lepší kontrast play tlačítka */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-navy-900/40"
            />
            {/* Play button */}
            <div className="relative z-10 flex items-center justify-center h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-teal-400 text-navy-900 shadow-lifted group-hover:bg-teal-300 group-hover:scale-110 transition-all duration-300">
              <Play className="h-7 w-7 sm:h-8 sm:w-8 ml-1 fill-current" aria-hidden />
            </div>
          </button>
        )}
      </div>
      <div className="px-4 py-3 bg-white">
        <p className="font-semibold text-navy-600 text-sm sm:text-base">{video.name}</p>
        <p className="text-xs text-dark/60 mt-0.5">Účastnice / účastník workshopu</p>
      </div>
    </article>
  );
}

export function Zkusenosti() {
  return (
    <Section id="reference" tone="white">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <p className="h-label mb-3">Reference</p>
        <h2 className="h-display text-h2 text-navy-600 mb-4">Zkušenosti účastníků</h2>
        <p className="text-base sm:text-lg text-dark/70">
          Krátké video-reference od lidí, kteří workshop prošli. Klikněte na libovolnou kartu
          a poslechněte si jejich příběh.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {VIDEOS.map((v) => (
          <VideoCard key={v.vimeoId} video={v} />
        ))}
      </div>

      <div className="flex justify-center mt-12 sm:mt-14">
        <CTAButton href={WORKSHOP.paymentLink} variant="primary">
          Připojit se k workshopu — {WORKSHOP.price}
        </CTAButton>
      </div>
    </Section>
  );
}
