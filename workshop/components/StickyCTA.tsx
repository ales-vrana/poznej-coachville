"use client";

import { useEffect, useState } from "react";
import { WORKSHOP } from "@/lib/config";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      // Show after user scrolled past 600px (cca konec hero sekce)
      setVisible(window.scrollY > 600);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`sticky-cta sm:hidden ${visible ? "visible" : ""}`}
      role="region"
      aria-label="Rychlé CTA"
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-navy-600/70 font-bold leading-none">
            Workshop {WORKSHOP.dateShort}
          </p>
          <p className="text-sm font-bold text-navy-600 truncate mt-1">{WORKSHOP.price} • {WORKSHOP.duration}</p>
        </div>
        <a
          href={WORKSHOP.paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-3 bg-teal-400 hover:bg-teal-500 active:bg-teal-600 text-white font-bold text-sm rounded-lg shadow-soft min-h-[44px] whitespace-nowrap"
        >
          Koupit místo
        </a>
      </div>
    </div>
  );
}
