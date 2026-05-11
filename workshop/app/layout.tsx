import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { EventSchema } from "@/components/EventSchema";
import { DevWarning } from "@/components/ui/DevWarning";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://workshop.coachville.eu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Workshop "Půjde mi koučování?" | Aleš Vrána MCC | 19. 5. 2026',
  description:
    "3hodinový online workshop pro lidi, kteří zvažují koučování jako kariéru. Živá praxe v roli kouče i klienta s držitelem nejvyšší ICF certifikace MCC. 19. 5. 2026, 18:30–21:30, 1 500 Kč. Garance vrácení peněz.",
  keywords: [
    "koučování",
    "workshop koučování",
    "ICF MCC",
    "CoachVille",
    "Aleš Vrána",
    "koučovací výcvik",
    "stát se koučem",
  ],
  authors: [{ name: "Aleš Vrána" }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    title: 'Workshop "Půjde mi koučování?" | 19. 5. 2026',
    description:
      "3 hodiny živé praxe s držitelem ICF MCC. Otázka, na kterou si nejde odpovědět v hlavě — odejdete s odpovědí.",
    siteName: "CoachVille Europe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Workshop koučování s Alešem Vránou, MCC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Workshop "Půjde mi koučování?" | 19. 5. 2026',
    description: "3 hodiny živé praxe s držitelem ICF MCC. Cena 1 500 Kč. Garance vrácení peněz.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#394A82",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={montserrat.variable}>
      <head>
        <EventSchema />
      </head>
      <body className="bg-white text-dark antialiased">
        {children}
        <DevWarning />
      </body>
    </html>
  );
}
