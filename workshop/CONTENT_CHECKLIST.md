# Content Checklist — co doplnit ručně

Tento web má placeholdery, které je třeba před spuštěním nahradit reálným obsahem.

## ❗ Kritické (před launchnutím)

- [ ] **Stripe Payment Link** — `.env.local` → `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
- [ ] **Email** v `.env.local` (`NEXT_PUBLIC_CONTACT_EMAIL`) — výchozí `ales@coachville.eu`
- [ ] **Foto Aleše** — komponenty CoachQuote a OLektorovi nyní očekávají dvě konkrétní fotky:
   - `/public/ales-vrana.jpg` — **čtverec** (square crop), použito v CoachQuote sekci (kruhový rámeček). Min 800×800 px.
   - `/public/ales-vrana-portrait.jpg` — **portrét** (4:5 nebo 1:1.3), použito v O Lektorovi sekci (rounded rectangle). Min 800×1000 px.
   - Tip: použij ty dvě fotky, které jsi poslal v chatu — kruhový crop pro první, portrait pro druhou.
- [ ] **Hero foto** — vygeneruj přes ChatGPT/DALL-E z `HERO-IMAGE-PROMPTY.md`, ulož jako `/public/hero.jpg` (1600x1000) a uprav `src` v `components/Hero.tsx`
- [ ] **Reference** — `components/Reference.tsx` obsahuje placeholdery; doplň 6 konkrétních citátů s reálným výsledkem

## 🟡 Doporučené

- [ ] **OG image** — pro Open Graph (Facebook/Twitter/LinkedIn náhled) export `/public/og-image.svg` do `.jpg` (1200x630px) pomocí např. [cloudconvert.com](https://cloudconvert.com) nebo přímo z Figma
- [ ] **Favicon** — vytvoř a vlož do `/app/favicon.ico` (16x16, 32x32) a `/app/icon.png` (512x512)
- [ ] **Apple touch icon** — `/app/apple-icon.png` (180x180)
- [ ] **Thank-you stránka** — po platbě Stripe redirect na vlastní stránku s instrukcemi (`/dekujeme`)

## 🔵 Nice-to-have

- [ ] Vercel Analytics (`@vercel/analytics`)
- [ ] Meta Pixel pro FB retargeting
- [ ] ActiveCampaign hook po platbě
- [ ] Test na reálných zařízeních: iPhone 12, Samsung Galaxy, iPad
- [ ] Google Lighthouse audit (cíl 95+)
- [ ] Test celého platebního flow s reálnou kartou (Stripe test mode → live)

---

## Šablona reference (pro Reference.tsx)

```ts
{
  quote: "Po workshopu jsem věděla, že do toho jdu. Šest měsíců poté jsem ve výcviku a mám 4 stálé klienty. Nejlépe investovaných 1 500 Kč v životě.",
  name: "Jana K.",
  role: "HR Business Partner",
  city: "Praha",
  linkedin: "https://linkedin.com/in/janak", // volitelné
}
```

**Tip pro silnou referenci:**
- ✅ "Po workshopu jsem se rozhodla začít výcvik a dnes mám 5 stálých klientů"
- ❌ "Super workshop, doporučuji všem" (generická pochvala neprodává)

---

## Šablona pro reálnou fotku Aleše

- **Formát:** čtverec, alespoň 800x800px
- **Soubor:** `/public/coach.jpg` (nebo .webp)
- **Styl:** přirozené světlo, otevřený výraz, profesionální ale lidský
- **Pozadí:** neutrální / rozostřené, ne kancelář
- **Oblečení:** smart casual (ne ostře korporátní)
