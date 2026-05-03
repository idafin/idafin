# idafin — Claude Code Handoff (D · Swiss Grid)

Bu paket, **idafin** anasayfasının **D varyasyonu** (Swiss / International Style) için Claude Code ile Next.js + Tailwind implementasyonu yapmana yarar.

## Seçilen yön: D · Swiss Grid

- **Renk:** beyaz/kağıt (`#FFFFFF`, `#F4F4F4`) + ink (`#0A0A0A`) + tek mavi accent (`#0047FF`)
- **Tipografi:** DM Sans (Helvetica-feel) ana, JetBrains Mono etiket/caption
- **Yapı:** 12 kolonlu strict grid; köşeli, radius yok
- **Hero:** Tam genişlik arka plan görseli + 3 satırlık dev tipografi, üstte gradient overlay
- **Aksesuar:** Swiss caption mark'lar (`§ 01`, `02 / HAKKIMIZDA`, vb.)

`source/variation-d.jsx` referansının kendisidir — Tailwind'e çevrilirken bu dosya kaynak gerçeğidir.

## Klasör

```
handoff/
├── README.md              ← bu dosya (D'ye özel)
├── CLAUDE.md              ← Claude Code talimatları
├── design-tokens.md       ← D'nin token'ları + tailwind.config.ts
├── components.md          ← her bölümün spec'i
└── source/
    └── variation-d.jsx    ← referans kaynak
```

## Adım adım kullanım

### 1. Yeni Next.js projesi
```bash
npx create-next-app@latest idafin --typescript --tailwind --app --no-src-dir
cd idafin
```

### 2. handoff klasörünü kopyala
```bash
cp -r /path/to/handoff ./
```

### 3. Claude Code'u başlat
```bash
claude
```

### 4. İlk mesaj olarak şunu yaz
```
handoff/CLAUDE.md ve handoff/design-tokens.md dosyalarını oku, kurallara uy.
Sonra handoff/source/variation-d.jsx'i Next.js App Router + Tailwind CSS olarak
implement et. Bölümleri components/sections/ altında ayrı dosyalara böl.
Inline style yerine Tailwind utility class kullan.
Türkçe içeriği lib/content.ts içine taşı.
```

### 5. Build & test
```bash
npm run dev      # localhost:3000
npm run build
npm run lint
```

## Hero görseli

Şu an placeholder olarak Unsplash kullanılıyor:
```
https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=2400&q=80
```
Production'da `public/hero.jpg` olarak kendi görselini kullan ve `next/image` ile yükle:
```tsx
<Image src="/hero.jpg" alt="" fill priority className="object-cover -z-10" />
```

## Notlar

- Inline JSX → Tailwind utility class çevirimi gerekiyor (`@/lib/cn`).
- Counter, mobile menu ve Contact form `'use client'` directive'i ile.
- Font'lar `next/font/google` üzerinden DM Sans + JetBrains Mono.
- 12-col grid için Tailwind'in `grid-cols-12` + `col-span-N` class'ları kullanılacak.
- Mavi accent CSS variable olarak (`--accent: #0047FF`) — ileride değiştirmek kolay.
