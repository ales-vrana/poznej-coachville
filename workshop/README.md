# Workshop koučování — Landing Page

Next.js 14 + Tailwind landing page pro 3hodinový online workshop koučování (CoachVille Europe).

**Cílovka:** product-aware warm audience (newsletter, FB retargeting)
**Termín:** 19. 5. 2026, 18:30–21:30
**Cena:** 1 500 Kč
**Platba:** Stripe Payment Link

---

## Tech stack

- **Next.js 14** (App Router, React Server Components)
- **Tailwind CSS 3** s on-brand paletou
- **TypeScript**
- **Montserrat** (Google Fonts, Gotham fallback dle Brand Manual v2.0)
- **lucide-react** pro ikony
- **Mobile-first**, optimalizováno pro 360px+

---

## Quick start

```bash
# 1. Nainstaluj závislosti
npm install

# 2. Zkopíruj env soubor a vyplň hodnoty
cp .env.local.example .env.local

# 3. Spusť dev server
npm run dev

# Otevři http://localhost:3000
```

---

## Konfigurace — co MUSÍŠ vyplnit před spuštěním

### 1. `.env.local`

```env
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/XXX
NEXT_PUBLIC_CONTACT_EMAIL=ales@coachville.eu
NEXT_PUBLIC_SITE_URL=https://workshop.coachville.eu
```

**Stripe Payment Link** — vytvoř v [dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links):
- Produkt: "Workshop Půjde mi koučování — 19. 5. 2026"
- Cena: 1 500 CZK
- Limit kapacity: 16
- Po platbě: redirect na thank-you stránku (nebo confirmation message)
- Apple Pay / Google Pay: zapnuto

### 2. Reference (sekce 6)

Otevři `components/Reference.tsx` a doplň konkrétní citáty.
Šablona každé reference vyžaduje:
- konkrétní výsledek (kde byli před → kde jsou nyní)
- jméno, profese, město
- ideálně foto + LinkedIn

Aktuálně jsou tam placeholdery „[doplň…]".

### 3. Hero image

V `/public/hero-placeholder.svg` je on-brand vektorový placeholder.
Až vygeneruješ AI hero foto, ulož ji jako `/public/hero.jpg` (nebo .webp) a uprav `components/Hero.tsx`:

```tsx
<Image src="/hero.jpg" alt="..." ... />
```

Prompty pro generování v `HERO-IMAGE-PROMPTY.md`.

### 4. Foto Aleše

Nahraď `/public/coach-placeholder.svg` skutečnou fotkou Aleše (čtverec, min 800x800).
Soubor pojmenuj `/public/coach.jpg`.
V `components/Hero.tsx`, `components/CoachQuote.tsx` a `components/OLektorovi.tsx` uprav `src="/coach.jpg"`.

### 5. Open Graph image

Aktuální `/public/og-image.svg` je on-brand placeholder.
Pro reálné OG použij export do JPG/PNG (1200x630px) — viz `HERO-IMAGE-PROMPTY.md`.

---

## Deployment na Vercel

### Přes GitHub (doporučený workflow)

```bash
# 1. Init git
git init
git add .
git commit -m "Initial: workshop landing page"

# 2. Vytvoř repo na GitHubu (např. workshop-koucovani)
git remote add origin git@github.com:USERNAME/workshop-koucovani.git
git branch -M main
git push -u origin main

# 3. Na vercel.com:
# - Add New Project → Import GitHub repo
# - Framework: Next.js (auto-detekuje)
# - Environment Variables: nakopíruj z .env.local
# - Deploy

# 4. Custom doména
# - Vercel → Settings → Domains
# - Přidej workshop.coachville.eu
# - Nastav DNS CNAME na cname.vercel-dns.com
```

### CLI (alternativa)

```bash
npm i -g vercel
vercel login
vercel        # první deploy
vercel --prod # produkce
```

---

## Struktura projektu

```
workshop-koucovani/
├── app/
│   ├── layout.tsx           # Root layout, Montserrat font, metadata
│   ├── page.tsx             # Hlavní stránka (skládá sekce)
│   └── globals.css          # Brand styles, btn-primary, sekce styly
├── components/
│   ├── Hero.tsx             # Sekce 1 — Hero + Value Stack + CTA
│   ├── CoachQuote.tsx       # Citát Aleše
│   ├── Pochybnosti.tsx      # Sekce 2 — 4 pochybnosti
│   ├── Presvedceni.tsx      # Sekce 3 — 3 přesvědčení
│   ├── CoZazijete.tsx       # Sekce 4 — Co zažijete na workshopu (6 karet)
│   ├── OLektorovi.tsx       # Sekce 5 — O Aleši
│   ├── Reference.tsx        # Sekce 6 — Testimonialy (PLACEHOLDER!)
│   ├── PoWorkshopu.tsx      # Sekce 7 — 3 cesty po workshopu
│   ├── FAQ.tsx              # Sekce 8 — Časté otázky (accordion)
│   ├── ClosingCTA.tsx       # Sekce 9 — Závěrečné CTA
│   ├── StickyCTA.tsx        # Mobile sticky bottom bar
│   ├── Footer.tsx           # Footer s brand info
│   └── ui/
│       ├── Section.tsx      # Wrapper sekce (tone: white|cream|navy|dark)
│       └── CTAButton.tsx    # Tlačítko (variant: primary|secondary|on-dark)
├── lib/
│   ├── config.ts            # WORKSHOP + COACH konstanty
│   └── utils.ts             # cn() helper
├── public/
│   ├── hero-placeholder.svg # On-brand placeholder hero
│   ├── coach-placeholder.svg# On-brand placeholder portrétu
│   └── og-image.svg         # Open Graph image
├── tailwind.config.ts       # Brand colors, fonty, custom utilities
└── README.md                # ← tady jsi
```

---

## Brand alignment (zdroj: CoachVille Brand Manual v2.0)

| Element | Hodnota |
|---|---|
| Primární barva | Navy `#394A82` |
| Akcent (CTA) | Teal `#38C0C3` |
| Premium | Gold `#BF933A` |
| Pozadí | White `#FFFFFF` + Cream `#FAF9F5` |
| Tmavé sekce | Dark `#30302E` nebo Navy |
| Font | Montserrat (Gotham fallback) |
| Nadpisy H1/H2 | UPPERCASE Bold |
| Hero overlay | rgba(36, 48, 86, 0.8) |
| Vizuální motiv | Člověk na vrcholu hory s rozpaženýma rukama |

---

## Mobile-first checklist

- ✅ Testováno na 360px (iPhone SE 1st gen)
- ✅ CTA tlačítko min 56px výška (Apple HIG / Material guideline 44–48px+)
- ✅ Sticky CTA bar po scrollu (mobile only, hidden sm+)
- ✅ Touch-friendly spacing (min 8px mezi clickable elementy)
- ✅ Žádný horizontální scroll
- ✅ Text čitelný od 16px na mobilu
- ✅ `prefers-reduced-motion` respektováno
- ✅ Focus-visible outline pro keyboard navigaci

---

## Performance optimalizace

- Server Components by default (žádné zbytečné JS bundle)
- `"use client"` jen pro `FAQ` (accordion) a `StickyCTA` (scroll listener)
- `next/font` pro Montserrat (zero layout shift, samohostované)
- `next/image` pro hero/coach (auto AVIF/WebP, lazy load)
- Žádné externí knihovny kromě `lucide-react` (tree-shakable ikony)

**Očekávaný Lighthouse skóre:** 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO

---

## Co dál (nice-to-have, ne kritické)

- [ ] Vercel Analytics pro CTR tracking
- [ ] Meta Pixel / GTM tag pro FB retargeting
- [ ] Plausible / Simple Analytics místo GA
- [ ] Thank-you stránka `/dekujeme` po Stripe redirectu
- [ ] Email automation napojení (ActiveCampaign hook po platbě)
- [ ] A/B test verze hero headlinu (Vercel Edge Config)

---

## Pomocné soubory v repu

- `HERO-IMAGE-PROMPTY.md` — ChatGPT Image / DALL-E / Midjourney prompty pro hero foto
- `CONTENT_CHECKLIST.md` — Checklist obsahu, který musíš doplnit ručně (reference, fotky)
- `PANEL-DESIGN-EXPERTU.md` — Členové designerského panelu a iterace
- `ITERACE-PANEL.md` — Zápis z review jednotlivých iterací

---

**Autor:** Aleš Vrána (CoachVille Europe), build asistoval Claude.
**Licence:** All rights reserved.
