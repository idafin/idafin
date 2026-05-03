# idafin

idafin kurumsal sitesi — **Astro 6 + Tailwind v4** ile inşa edilmiş, statik tek sayfalık landing.

---

## Gereksinimler

- **Node.js ≥ 22.12.0** (Astro 6 zorunluluğu)
- npm 10+
- Git

> macOS: `brew install node` ile en güncel sürümü kurabilirsin.

---

## Kurulum

```bash
git clone git@github.com:idafin/idafin.git
cd idafin
npm install
```

---

## Geliştirme

```bash
npm run dev
```

→ http://localhost:4321 adresinde açılır. HMR aktif — `src/` altındaki her değişiklik anında yansır.

---

## Build & Önizleme

```bash
npm run build      # → dist/ klasörü, statik HTML
npm run preview    # dist'i lokal sunucuda dener
```

---

## Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Astro dev server (port 4321) |
| `npm run build` | Statik build → `dist/` |
| `npm run preview` | Build çıktısını lokal sunucuda dener |
| `npm run astro -- ...` | Astro CLI'sine doğrudan komut |

---

## Proje yapısı

```
idafin/
├── public/
│   ├── favicon.svg
│   └── uploads/                ← Görseller (logo, hero, vb.)
│
├── src/
│   ├── pages/
│   │   └── index.astro         ← Tek sayfa, sadece bölümleri sıralar
│   │
│   ├── layouts/
│   │   └── Layout.astro        ← <html>, <head>, font yükleme
│   │
│   ├── styles/
│   │   └── global.css          ← Tailwind v4 + @theme tokens
│   │
│   ├── components/
│   │   ├── ui/Counter.astro    ← Animasyonlu sayaç (client script)
│   │   └── sections/
│   │       ├── Nav.astro
│   │       ├── Hero.astro
│   │       ├── Manifesto.astro      (gizli — index.astro'da yorum)
│   │       ├── Services.astro
│   │       ├── About.astro
│   │       ├── Cases.astro          (gizli)
│   │       ├── Insights.astro       (gizli)
│   │       ├── Contact.astro
│   │       └── Footer.astro
│   │
│   └── data/                   ← Tüm içerikler (JSON)
│       ├── site.json           ← marka, nav, iletişim, footer
│       ├── hero.json
│       ├── manifesto.json
│       ├── about.json
│       ├── contact.json
│       ├── services.json       ← hizmet kartları (dizi)
│       ├── cases.json          ← vaka çalışmaları (dizi)
│       └── insights.json       ← yazılar (dizi)
│
├── astro.config.mjs            ← Tailwind Vite plugin
├── tsconfig.json
└── package.json
```

---

## İçerik düzenleme

| İçerik | Dosya |
|---|---|
| Marka, menü, iletişim, footer | `src/data/site.json` |
| Hero (başlık, görsel, CTA'lar) | `src/data/hero.json` |
| Hakkımızda | `src/data/about.json` |
| İletişim bölümü başlığı | `src/data/contact.json` |
| Manifesto + istatistikler | `src/data/manifesto.json` |
| Hizmet kartları | `src/data/services.json` |
| Vaka çalışmaları | `src/data/cases.json` |
| Yazılar | `src/data/insights.json` |

---

## Tasarım tokenları

`src/styles/global.css` içinde Tailwind v4 `@theme` bloğunda:

| Token | Değer | Kullanım |
|---|---|---|
| `--color-paper` | `#ffffff` | Beyaz bölüm zemini |
| `--color-paper-alt` | `#f4f4f4` | Gri bölüm zemini |
| `--color-ink` | `#0a0a0a` | Ana metin & sınır |
| `--color-ink-soft` | `#3d3d3d` | İkincil metin |
| `--color-ink-muted` | `#8c8c8c` | Tertier (caption) |
| `--color-accent` | `#0047ff` | Tek vurgu rengi |
| `--font-sans` | DM Sans | Ana tipografi |
| `--font-mono` | JetBrains Mono | Etiket / caption |

Tailwind otomatik `bg-paper`, `text-accent`, `font-mono` gibi utility üretir. Tipografi ölçekleri (`text-mega`, `text-display`, `text-stat`, `text-mono-cap`) `@utility` blokları olarak tanımlı.

---

## Bölüm ekleme/çıkarma

`src/pages/index.astro` sadece bölümleri sıralar. Bir bölümü gizlemek için import'u ve kullanımını yorum satırına al:

```astro
// import Manifesto from "../components/sections/Manifesto.astro";
...
{/* <Manifesto /> */}
```

Geri açmak için yorumları kaldır. Bileşen ve içeriği yerinde durur, içerik kaybolmaz.

---

## Yayınlama

Statik build olduğu için herhangi bir static host'a deploy edilebilir (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3 + CloudFront…).

```bash
npm run build
# dist/ klasörünü deploy et
```

---

## Stack özet

- **Astro 6** — statik site generator, `output: "static"`
- **Tailwind CSS v4** — `@theme` ile token yönetimi (Vite plugin)
- **TypeScript** strict mode
- **Google Fonts** — DM Sans + JetBrains Mono (preconnect ile)

---

## Lisans

Tüm hakları saklıdır © İdafin Finansal Danışmanlık & Yazılım Hizmetleri Ltd. Şti.
