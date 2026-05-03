# idafin

idafin kurumsal sitesi — **Astro 6 + Tailwind v4 + Decap CMS** ile inşa edilmiş, statik tek sayfalık landing.

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

### 1. Sadece site (içeriği elle düzenle)

```bash
npm run dev
```

→ http://localhost:4321 adresinde açılır. HMR aktif — `src/` altındaki her değişiklik anında yansır.

### 2. Site + CMS (içeriği `/admin` üzerinden düzenle)

İki ayrı terminale ihtiyacın var:

```bash
# terminal 1 — Astro dev server
npm run dev

# terminal 2 — Decap CMS local backend (dosyaya yazabilmek için)
npm run cms:proxy
```

Sonra:
- Site: http://localhost:4321
- CMS: http://localhost:4321/admin

CMS'ten kaydet'e bastığında ilgili JSON / Markdown dosyası diske yazılır, Astro otomatik reload eder.

> **Not:** `public/admin/config.yml` içinde `local_backend: true` aktif. Üretimde bunu kapatıp GitHub veya Netlify Identity / git-gateway backend'ini etkinleştirmen gerekir.

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
| `npm run cms:proxy` | Decap CMS local backend proxy (geliştirme için) |
| `npm run build` | Statik build → `dist/` |
| `npm run preview` | Build çıktısını lokal sunucuda dener |
| `npm run astro -- ...` | Astro CLI'sine doğrudan komut |

---

## Proje yapısı

```
idafin/
├── public/
│   ├── admin/                  ← Decap CMS arayüzü (/admin)
│   │   ├── index.html          ← CMS script loader
│   │   └── config.yml          ← Koleksiyon tanımları (TR etiketler)
│   └── uploads/                ← Görseller (logo, hero, CMS yüklemeleri)
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
│   ├── data/                   ← Singleton içerikler (JSON)
│   │   ├── site.json           ← marka, nav, iletişim, footer
│   │   ├── hero.json
│   │   ├── manifesto.json
│   │   ├── about.json
│   │   └── contact.json
│   │
│   ├── content/                ← Çoklu kayıtlar (Astro Content Collections)
│   │   ├── services/*.md
│   │   ├── cases/*.md
│   │   └── insights/*.md
│   │
│   └── content.config.ts       ← Koleksiyon Zod şemaları
│
├── astro.config.mjs            ← Tailwind Vite plugin
├── tsconfig.json
└── package.json
```

---

## İçerik düzenleme

İki yöntem var; ikisi de eşdeğer (CMS sadece dosyaları yazar).

### A) Doğrudan dosya düzenle

| İçerik | Dosya |
|---|---|
| Marka, menü, iletişim, footer | `src/data/site.json` |
| Hero (başlık, görsel, CTA'lar) | `src/data/hero.json` |
| Hakkımızda | `src/data/about.json` |
| İletişim bölümü başlığı | `src/data/contact.json` |
| Manifesto + istatistikler | `src/data/manifesto.json` |
| Hizmet kartları | `src/content/services/*.md` |
| Vaka çalışmaları | `src/content/cases/*.md` |
| Yazılar | `src/content/insights/*.md` |

### B) `/admin` üzerinden CMS

`npm run cms:proxy` çalışırken http://localhost:4321/admin'e git. Tüm singleton'lar **Site Ayarları** altında, listeli içerikler kendi koleksiyonlarında.

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

### CMS production backend

`public/admin/config.yml` içindeki `local_backend: true` satırını kaldır ve uygun backend'i bağla:

- **GitHub** (OAuth proxy gerekir): https://decapcms.org/docs/github-backend/
- **Netlify Identity + git-gateway** (Netlify deploy ediyorsan en kolay): https://decapcms.org/docs/git-gateway-backend/

---

## Stack özet

- **Astro 6** — statik site generator, `output: "static"`
- **Tailwind CSS v4** — `@theme` ile token yönetimi (PostCSS değil, Vite plugin)
- **Decap CMS 3** — git tabanlı headless CMS
- **TypeScript** strict mode
- **Google Fonts** — DM Sans + JetBrains Mono (preconnect ile)

---

## Lisans

Tüm hakları saklıdır © İdafin Finansal Danışmanlık & Yazılım Hizmetleri Ltd. Şti.
