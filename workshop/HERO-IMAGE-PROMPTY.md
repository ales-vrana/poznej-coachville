# Hero Image Prompty — ChatGPT Image 2.0 / DALL-E / Midjourney

Tyto prompty vychází z **CoachVille Brand Manual v2.0** (sekce 5.2 a 10.2) a centrální vizuální metafory značky: **člověk na vrcholu hory s rozpaženýma rukama, mraky pod ním, východ slunce v pozadí**.

**Parametry obrazu:**
- Hero na webu: ideálně **1600x1000 px** (poměr 16:10) — vyplní celý hero
- Open Graph: **1200x630 px** (1.91:1) — sociální sítě náhled
- Mobilní hero (volitelně): **1080x1440 px** (portrait) — pro lepší rendering na telefonu

**Soubor uložit jako:** `/public/hero.jpg`

---

## 🎯 PROMPT #1 — HLAVNÍ VARIANTA (doporučená, brand-on)

Tento prompt je **identický s brand manuálem** a měl by vytvořit obraz konzistentní s coachville.eu.

```
A wide cinematic photograph of a single person standing on a mountain peak at golden hour sunrise, arms spread wide in triumph and openness, silhouette against a soft warm sky. Below the peak are layers of low-lying clouds and distant mountain ridges fading into the horizon.

Mood: inspiring, transformative, contemplative, professional, grounded yet hopeful. Not corporate, not stocky.

Lighting: warm golden hour, sun coming from behind the mountain ridges creating a soft halo around the figure. Subtle atmospheric haze. Long horizon line.

Color palette (CRITICAL — do not deviate):
- Sky and atmosphere dominated by deep navy blue (#394A82) and dark indigo gradient
- Subtle gold accent (#BF933A) only as sunrise glow on the horizon
- Cool teal undertones (#38C0C3) in the distant mountain mist
- The figure silhouette in dark contrast, slightly rim-lit by the gold light
- No red, no orange, no neon, no green
- The image should feel like it has a navy blue overlay (rgba 36, 48, 86, 0.8) already baked in — dark moody atmosphere with rich gradient

Composition: rule of thirds. The person is positioned center or slightly off-center, placed in the upper-middle third. Generous negative space on left side (where overlay text will sit). Wide aspect ratio 16:10.

Photography style: shot on full-frame, 35mm lens, shallow depth of field, natural film grain. Like Peter McKinnon or Sam Kolder cinematic outdoor work, not stock photography. Authentic, real, not AI-generated looking.

Aspect ratio: 16:10, wide cinematic crop.
```

**Negative prompt (do GPT Image / DALL-E 3 přidat manuálně):**
> No text, no logos, no watermarks, no people in formal business attire, no office settings, no red or orange dominant colors, no fantasy or surreal elements, no oversaturation, no obvious AI artifacts.

---

## 🎯 PROMPT #2 — VARIANTA „Silueta proti východu slunce, výrazněji navy"

Pro případ, že #1 dává moc světlý obraz a nebude fungovat overlay text:

```
Dark moody cinematic landscape: a lone human silhouette stands on a rocky mountain summit, arms wide open in a gesture of openness and arrival. The background is a deep navy blue (#394A82) sky transitioning to a warm gold (#BF933A) sunrise glow along the horizon line.

Below the figure, layered mountain ridges recede into atmospheric perspective, getting softer and bluer. Low-lying mist or clouds fill the valleys.

The image should read as 80% dark navy with 20% warm gold light pooling at the horizon. The silhouette is dark, barely lit by warm rim light.

Mood: contemplative, breakthrough moment, the morning after a long climb. Quiet triumph, not theatrical.

Style: cinematic outdoor photography, anamorphic lens, subtle film grain, similar in tone to "The Revenant" cinematography or Eric Hill / Chris Burkard nature work.

Color rules: navy #394A82 dominant 70%, gold #BF933A accent 15%, teal undertones #38C0C3 in mist 10%, dark shadows 5%. Strictly no red, orange, neon, green vegetation in foreground.

Composition: figure at center-right or center, on the rule-of-thirds line. Plenty of empty sky on the left for headline text overlay. Wide 16:10 ratio.

No text. No logos. Photograph, not illustration.
```

---

## 🎯 PROMPT #3 — VARIANTA „Pohled zezadu, intimnější"

Pokud chceš, aby se divák ztotožnil s postavou (jsme spolu na vrcholu):

```
Cinematic over-the-shoulder photograph: a single person from behind, standing on a mountain ridge at sunrise, arms spread wide. We see their silhouette against a vast sky full of warm gold and deep navy clouds. Below them, sea of clouds rolling between distant peaks.

The viewer feels invited into the moment — we are standing with them, not watching them.

Mood: contemplative, expansive, the morning of a decision. Quiet, hopeful, professional.

Color palette: dominant navy blue (#394A82) sky with gradient into deeper indigo at top. Gold (#BF933A) sunrise band on the horizon. Teal (#38C0C3) atmospheric tint in the clouds. The figure in dark silhouette with subtle rim light from the sun.

Photography: cinematic wide, 35mm equivalent, natural light, film-like color grading. Avoid HDR look. Subtle film grain. Looks like real photography, not AI illustration.

Aspect ratio 16:10 wide.

No text, no watermarks, no logos, no other people.
```

---

## 🎯 PROMPT #4 — VARIANTA „Stylizovaná ilustrace" (pro případ, že fotorealistická nebude fungovat)

Záložní varianta — pokud žádná foto-realistická nedosáhne kvality:

```
Modern minimalist illustration in the style of Owen Davey or Geometric Magazine: a single human figure standing on a stylized mountain peak, arms wide open, against a layered geometric mountain landscape at sunrise.

Use flat shapes, subtle gradients, and clean geometric forms. The sky is divided into bands of deep navy (#394A82), then teal (#38C0C3), then warm gold (#BF933A) at the horizon. Multiple mountain ridges fade into the distance.

Add a single small gold star in the upper-right area of the sky (CoachVille brand mark).

The figure is a simple silhouette, almost iconic — like a logo element. Not detailed face or clothing. Strong, confident pose.

Mood: aspirational, modern, premium, inspiring. Not childish, not corporate.

Color palette strictly: navy #394A82, teal #38C0C3, gold #BF933A, cream #FAF9F5 for highlights. Absolutely no red, orange, pink, neon, or other colors.

Composition: wide aspect ratio 16:10. Figure center or center-left. Generous space for overlay text on the left third.

No text in the image. Vector-style flat illustration.
```

---

## 🎯 PROMPT #5 — OPEN GRAPH (1200x630)

Pro náhled na sociálních sítích (FB, Twitter, LinkedIn). Méně dramatický, čitelný v malém:

```
Wide cinematic photograph for social media share preview: a single person on a mountain peak at golden hour sunrise, arms spread wide. Aspect ratio 1.91:1 (1200x630).

Mood: inspiring, professional, breakthrough moment.

Lighting: warm sunrise behind figure, navy sky transitioning to gold horizon, soft mist below peaks.

Composition: figure placed on the right third of the image (rule of thirds), leaving the left half open for headline overlay text.

Color palette: dominant navy blue (#394A82), gold (#BF933A) horizon, teal undertones (#38C0C3) in mist. No red, orange, or neon. Designed to feel premium and aspirational.

Style: cinematic outdoor photography, similar to brand work for Patagonia or Aether Apparel. Authentic, not stock.

No text, no logos in the image (will be added later in design layer).
```

---

## 🎯 PROMPT #6 — PORTRÉT ALEŠE (volitelné, pokud nemá vlastní foto)

⚠️ POZOR: pro tuto použij jen vlastní reálné foto, AI-generated portrait dospělého muže může u publika vzbudit nedůvěru. Tady jen pro úplnost, kdyby Aleš chtěl alternativní stylizovaný portrét:

```
Professional editorial portrait of a 45-year-old European man with warm intelligent eyes, slight beard, friendly approachable expression, slight smile. He is wearing a navy blue casual jacket. Soft natural light from a window on the right side.

Background: out of focus, neutral cream/beige tones with subtle navy blue atmospheric color, no distracting objects.

Mood: trustworthy, experienced, calm, approachable. Like a senior mentor or coach. Not corporate stiff, not overly casual.

Style: editorial portrait photography, similar to The New York Times or Harvard Business Review profile photos. Shot on 85mm, shallow depth of field, natural film-like color grading.

Aspect ratio 1:1 (square), 800x800.

No text, no logos.
```

---

## 🧭 Doporučený postup

1. **Začni s Promptem #1** (hlavní varianta, brand-on).
2. Pokud výsledek je moc světlý a špatně se přes něj zobrazí bílý text, zkus **Prompt #2** (tmavší).
3. Pokud chceš více „first person" emocionální zapojení, zkus **Prompt #3** (pohled zezadu).
4. Pokud foto-realismus nestačí kvalitou, **Prompt #4** (geometrická ilustrace) je 100% on-brand a fail-safe.
5. Pro Open Graph generuj samostatně podle **Promptu #5**.

---

## 🛠 Konkrétní nástroje a tipy

### ChatGPT Image 2.0 (gpt-image-1)
- Vlož prompt do ChatGPT plus a požaduj formát 16:10 widescreen
- Pokud výsledek není přesně 1600x1000, použij upscaler ([Topaz Photo AI](https://www.topazlabs.com/) nebo [Upscayl](https://github.com/upscayl/upscayl) zdarma)

### DALL-E 3 (přes ChatGPT nebo API)
- Generuje 1792x1024 — můžeš použít přímo, nebo lehce ořezat

### Midjourney v6
- Přidej `--ar 16:10 --v 6 --style raw --s 250` na konec promptu
- Pro brand konzistenci `--cw 0` (chaos low)

### Pro úpravy / overlay
- [Figma](https://figma.com) — vlož vygenerovaný obraz, přidej navy overlay rgba(36, 48, 86, 0.8) v Effects, export 1600x1000 JPG/WebP
- [Photopea](https://photopea.com) — Photoshop v prohlížeči, zdarma

---

## ⚠️ Časté chyby AI generace (a jak je řešit)

| Problém | Řešení |
|---|---|
| Obraz je moc oranžový | Zdůrazni "no orange, no red, navy-dominant" |
| Postava má příliš detailní obličej (creepy) | Specifikuj "silhouette" nebo "from behind" |
| Příliš generic stock vzhled | Přidej "cinematic, film grain, not stock photography" |
| Textové artefakty (zkreslená písmena) | Vždy "no text, no logos, no watermarks" |
| Příliš jasný — text overlay nebude čitelný | Použij Prompt #2 nebo přidej overlay v post-produkci |
| Nesedí brand barvy | Trvej na konkrétních hex kódech, ne na slovech |

---

**Po vygenerování obrázku:**

1. Stáhni v nejvyšší dostupné kvalitě
2. Ulož jako `/public/hero.jpg` (komprimuj na ~80 % kvality, max 400 KB)
3. V `components/Hero.tsx` změň `src="/hero-placeholder.svg"` na `src="/hero.jpg"`
4. Restart dev serveru (`npm run dev`)

**Pro mobil:** pokud chceš na mobilu ještě portrétovou variantu (např. lépe nasvícenou pro vertikální zobrazení), vygeneruj druhou s aspect ratio 9:16 nebo 4:5 a v Next/Image použij `<picture>` element s media queries.
