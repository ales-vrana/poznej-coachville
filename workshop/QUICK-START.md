# 🚀 Quick Start — 5 minut k běžícímu webu

Tento dokument tě provede prvním spuštěním a deploymentem.

---

## Krok 1: Lokální spuštění (2 minuty)

```bash
# V adresáři projektu:
npm install
cp .env.local.example .env.local
npm run dev
```

Otevři **http://localhost:3000** — web by měl běžet.

---

## Krok 2: Stripe Payment Link (3 minuty)

1. Přihlas se na [dashboard.stripe.com](https://dashboard.stripe.com)
2. Levé menu → **Payment Links** → **+ New**
3. **Add product:**
   - Name: `Workshop: Půjde mi koučování? — 19. 5. 2026`
   - Price: `1500` CZK
   - Type: One time
4. **Options:**
   - Limit number of payments: **16** (kapacita workshopu)
   - Collect: jméno + email (povinné)
   - Po platbě: **Show confirmation page** s textem
     > Děkujeme za přihlášení! Zoom link a přípravu na workshop ti pošlu e-mailem do 24 hodin.
5. **Create link** → zkopíruj URL (`https://buy.stripe.com/...`)
6. V `.env.local` nahraď:
   ```
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/TVOJEURL
   ```
7. Restart dev serveru (`Ctrl+C`, pak `npm run dev`)

---

## Krok 3: Deploy na Vercel přes GitHub (5 minut)

```bash
# 1. Inicializace gitu
cd workshop-koucovani
git init
git add .
git commit -m "Initial: workshop landing page"

# 2. GitHub repo
# Otevři https://github.com/new
# Název: workshop-koucovani
# Visibility: Private (doporučeno)
# NE inicializovat README, .gitignore ani license
# Pak:
git remote add origin git@github.com:TVOJEUSERNAME/workshop-koucovani.git
git branch -M main
git push -u origin main

# 3. Vercel (vercel.com)
# - Add New Project → Import Git Repository
# - Vyber workshop-koucovani repo
# - Framework Preset: Next.js (auto-detect)
# - Environment Variables (rozklikni a přidej):
#     NEXT_PUBLIC_STRIPE_PAYMENT_LINK = https://buy.stripe.com/...
#     NEXT_PUBLIC_CONTACT_EMAIL = ales@coachville.eu
#     NEXT_PUBLIC_SITE_URL = https://workshop.coachville.eu
# - Deploy → počkej ~2 minuty

# 4. Vlastní doména (volitelné, ale doporučeno)
# Vercel → Settings → Domains
# Přidat: workshop.coachville.eu
# Vercel ti řekne, jaký CNAME nastavit u registrátora coachville.eu
# Typicky: CNAME workshop → cname.vercel-dns.com
```

---

## Krok 4: Hero image (vygeneruj přes AI)

Otevři `HERO-IMAGE-PROMPTY.md`, zkopíruj **Prompt #1** do ChatGPT/Midjourney/DALL-E.

Po vygenerování:
1. Stáhni v nejvyšší kvalitě (min 1600x1000 px)
2. Komprimuj na ~80 % kvality, max 400 KB (např. v [Squoosh.app](https://squoosh.app))
3. Ulož jako `public/hero.jpg`
4. V `components/Hero.tsx` změň:
   ```tsx
   src="/hero-placeholder.svg"  →  src="/hero.jpg"
   ```
5. `git add public/hero.jpg components/Hero.tsx`
6. `git commit -m "Add hero image"`
7. `git push` — Vercel automaticky redeployuje za ~30 sekund

---

## Krok 5: Fotka Aleše

1. Ulož svou fotku jako `public/coach.jpg` (čtverec, alespoň 800x800)
2. Najdi všechny výskyty `/coach-placeholder.svg`:
   ```bash
   grep -rn "coach-placeholder" components/
   ```
3. Změň `src="/coach-placeholder.svg"` → `src="/coach.jpg"` v:
   - `components/CoachQuote.tsx`
   - `components/OLektorovi.tsx`
4. Commit + push

---

## Krok 6: Reference (sekce 6)

Otevři `components/Reference.tsx` a v poli `REFERENCE` doplň 6 reálných citátů.

Šablona každé reference v souboru. Tip: silné reference = konkrétní výsledek
("dnes mám 5 stálých klientů"), ne generická pochvala ("super workshop").

---

## ✅ Hotovo

Workshop landing page je živá na `https://workshop.coachville.eu`.

**Co dál:**
- Pošli newsletter s odkazem
- Pusť FB retargeting kampaň (Pixel tracking přidat do `app/layout.tsx` přes `<Script src="..." />`)
- Sleduj Vercel Analytics pro CTR
- A/B test různých headlinů přes Vercel Edge Config

**Když se něco rozbije:**
- Vercel → Deployments → klikni na poslední deploy → Build Logs
- Lokálně: `npm run build` ukáže errors přímo v terminálu
- TypeScript validace: `npx tsc --noEmit`
