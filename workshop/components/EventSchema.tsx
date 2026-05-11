import { WORKSHOP, COACH } from "@/lib/config";

/**
 * JSON-LD strukturovaná data dle schema.org/Event.
 * Google to používá pro Event rich results ve vyhledávání.
 * Validuj na: https://search.google.com/test/rich-results
 */
export function EventSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: 'Workshop: "Půjde mi koučování?"',
    description:
      "3hodinový online workshop pro lidi, kteří zvažují koučování jako kariéru. Živá praxe v roli kouče i klienta s držitelem nejvyšší ICF certifikace MCC.",
    startDate: WORKSHOP.dateISO,
    endDate: WORKSHOP.dateISOEnd,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: WORKSHOP.siteUrl,
      name: "Zoom",
    },
    image: [`${WORKSHOP.siteUrl}/og-image.svg`],
    offers: {
      "@type": "Offer",
      url: WORKSHOP.paymentLink,
      price: WORKSHOP.priceNumber,
      priceCurrency: WORKSHOP.currency,
      availability: "https://schema.org/LimitedAvailability",
      validFrom: "2026-04-01T00:00:00+02:00",
    },
    performer: {
      "@type": "Person",
      name: COACH.fullName,
      jobTitle: COACH.certification,
    },
    organizer: {
      "@type": "Organization",
      name: "CoachVille Europe",
      url: "https://coachville.eu",
    },
    maximumAttendeeCapacity: WORKSHOP.capacity,
    inLanguage: "cs-CZ",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
