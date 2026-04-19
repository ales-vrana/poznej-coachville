# poznej.coachville.cz

Landing page CoachVille — primární CTA je 10min telefonát, sekundární dvě dveře: Google Doc a Video.

## Struktura

```
poznej-coachville/
├── index.html              # Landing — hero + proof + shorts + 3× CTA
├── video/index.html        # 20min úvodní video + 20 dlouhých rozhovorů + 15 shortů
├── call/index.html         # Calendly embed (10min call) + 6 rozhovorů jako social proof
├── assets/
│   ├── styles.css          # Sdílené styly, CoachVille brand v2.0
│   └── videos.json         # Data Vimeo embedů (pro regeneraci)
├── vercel.json             # Clean URLs, cache, security headers, redirects
├── .gitignore
└── README.md
```

## Lokální náhled

```bash
cd poznej-coachville
python3 -m http.server 8080
# otevři http://localhost:8080
```

---

## Deploy na poznej.coachville.cz — krok za krokem

### Krok 1 — Inicializuj Git repo

V terminálu v složce projektu:

```bash
cd /cesta/k/poznej-coachville
git init
git add .
git commit -m "init: poznej.coachville.cz"
git branch -M main
```

### Krok 2 — Založ GitHub repo

1. Jdi na https://github.com/new
2. Repository name: `poznej-coachville`
3. Private nebo Public, jak chceš
4. **Nezaškrtávej** "Add README" / "Add .gitignore" (už je máme)
5. Create repository

Pak pushni:

```bash
git remote add origin git@github.com:<tvuj-github-username>/poznej-coachville.git
git push -u origin main
```

### Krok 3 — Napoj Vercel na repo

1. Jdi na https://vercel.com/new
2. Import Git Repository → vyber `poznej-coachville`
3. **Framework Preset:** Other (statické HTML)
4. **Root Directory:** `./` (ponech)
5. **Build Command:** nech prázdné
6. **Output Directory:** nech prázdné
7. **Install Command:** nech prázdné
8. Klikni **Deploy**

Za ~30 s máš nasazené na náhodné `*.vercel.app` URL. Otevři a otestuj.

### Krok 4 — Připoj vlastní doménu

1. Ve Vercel projektu → **Settings → Domains**
2. Přidej: `poznej.coachville.cz` (klikni Add)
3. Vercel ti zobrazí DNS instrukci. Typicky je to:

   ```
   Typ:   CNAME
   Název: poznej
   Cíl:   cname.vercel-dns.com.
   TTL:   auto / 3600
   ```

4. Přihlas se k DNS správci domény `coachville.cz` (Forpsi / Subreg / Cloudflare / kdekoli to máš)
5. Přidej výše uvedený CNAME záznam
6. Vrať se do Vercelu — ověření proběhne do 5–30 minut. TLS certifikát se vystaví automaticky.

**Hotovo.** `https://poznej.coachville.cz` je živé.

### Krok 5 — Auto-deploy při každém commit

Už je zapnutý. Každý `git push origin main` → Vercel automaticky přebuildí a nasadí.

---

## Aktivace Meta Pixelu (až budeš chtít)

Každá stránka má zakomentovaný Meta Pixel stub. Pro aktivaci:

1. V `index.html`, `video/index.html`, `call/index.html` najdi `<!-- Meta Pixel -->` skript
2. Odkomentuj tři řádky uvnitř `<script>`:
   ```js
   fbq('init','PIXEL_ID_HERE');
   fbq('track','PageView');
   fbq('trackCustom','LandingPoznej'); // (nebo VideoPageView / CallPageView)
   ```
3. Nahraď `PIXEL_ID_HERE` svým Pixel ID

**Custom eventy, které už jsou nachystané:**

- `LandingPoznej` — PageView na /
- `VideoPageView` — PageView na /video
- `CallPageView` — PageView na /call
- `DoorClick` s parametrem `door` — kliknutí na jeden z CTA/boxů:
  - `door: "call"` → primární CTA v hero
  - `door: "call-mid"` → CTA pod social proof
  - `door: "call-final"` → CTA po shorts videích
  - `door: "doc"` → „Radši čteš?" Google Doc
  - `door: "video"` → „Radši video?" přechod na /video
- `CalendlyBooked` — vystřelí automaticky, když Calendly pošle postMessage o úspěšném bookingu

## Tracking bookingu přes Conversions API (volitelné, pro lepší atribuci)

Calendly → Zapier → Meta CAPI:

1. Trigger: *Calendly → Invitee Created*
2. Action: *Webhooks → POST* na `https://graph.facebook.com/v21.0/<PIXEL_ID>/events?access_token=<TOKEN>`
3. Payload: `event_name=Schedule`, `event_time`, `user_data.em` (SHA-256 hash emailu), `event_source_url=https://poznej.coachville.cz/call`, `action_source=website`, `event_id=<calendly uuid>` (pro deduplikaci s browser pixelem)

---

## Post-launch checklist

Hned po nasazení otestuj:

- [ ] `https://poznej.coachville.cz/` — hero, proof, shorts, 3× CTA
- [ ] Všechna tři CTA tlačítka vedou na `/call` (ne 404)
- [ ] „Radši čteš?" otevírá Google Doc v novém tabu
- [ ] „Radši video?" → `/call` (HTTP 200, ne 404)
- [ ] `/call` — Calendly widget se načte bez vnitřního scrollbaru, vidíš kalendář
- [ ] `/video` — úvodní video + 20 dlouhých + 15 shortů, alt CTA dole
- [ ] Mobilní responsivita: iPhone Safari + Android Chrome
- [ ] (Po aktivaci pixelu) v Meta Events Manageru ověř, že `PageView` a `DoorClick` chodí

---

## Jak regenerovat video stránku

Data videí jsou v `assets/videos.json`. Když přibude / zmizí video, uprav JSON a znovu mě požádej o regeneraci stránky `/video`.

## Brand check

- Fonty: Montserrat 400/500/600/700/800 (Google Fonts, náhrada za Gotham)
- Barvy: Navy `#394A82`, Teal `#38C0C3`, Gold `#BF933A`, Cream `#FAF9F5`
- Nadpisy: UPPERCASE, velká váha
- Tón: přímý, laskavý, bez prodejních klišé
