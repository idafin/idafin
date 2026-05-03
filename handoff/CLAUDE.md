# CLAUDE.md — idafin projesi için talimatlar

Bu dosya Claude Code'un proje boyunca uyması gereken kuralları tanımlar. Her oturumun başında bu dosyayı oku.

## Proje özeti

**idafin**, kurumsal müşterilere finansal danışmanlık + yazılım + süreç dönüşümü hizmeti veren Türk bir şirket. Bu repo, anasayfasının Next.js implementasyonu.

- **Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Dil:** Türkçe (UI), TypeScript (kod)
- **Hedef:** Marketing landing page (statik). Backend yok; form `/api/contact`'a POST atan placeholder olabilir.

## Kod kuralları

### Stil
- **Tailwind utility-first.** Inline `style={{}}` veya `<style>` bloğu yazma.
  Tek istisna: dinamik renk değerleri (CSS variable + tailwind arbitrary value: `bg-[var(--accent)]`).
- Custom değerler `tailwind.config.ts` `theme.extend`'a eklenecek (renk, font, spacing, shadow). Liste için `design-tokens.md`.
- Class'ları `clsx` veya `cn()` helper'ı ile birleştir.

### Komponent yapısı
- `app/page.tsx` sadece bölümleri import edip sıralar. İçinde markup yazma.
- Her bölüm `components/sections/`'da kendi dosyası: `Hero.tsx`, `Services.tsx`, `Cases.tsx`, `Insights.tsx`, `Contact.tsx`, `Footer.tsx`, `Nav.tsx`, `TrustBar.tsx`.
- Tekrar eden parçalar (`StatCard`, `SectionMark`, `Counter`, `Eyebrow`) `components/ui/`'da.
- **Server Component default**, sadece interaktif olanlar (`Counter`, `Contact` form, mobil menü) `'use client'`.

### TypeScript
- Tüm prop'ları typed interface ile tanımla. `any` yasak.
- Import path'leri için `@/components/...` alias kullan (`tsconfig.json`'da tanımlı).

### Erişilebilirlik
- Heading hiyerarşisi: 1 tane `<h1>` (Hero), bölüm başlıkları `<h2>`, kart başlıkları `<h3>`.
- Form alanlarında `<label htmlFor>`, butonlarda `aria-label` (sadece ikon varsa).
- Renk kontrastı WCAG AA min — design-tokens'taki kombinasyonlar zaten geçer.
- `prefers-reduced-motion` için Counter ve marquee'leri devre dışı bırak.

### Performans
- Görseller `next/image` ile. SVG placeholder'ları React component'i olarak inline.
- Font'lar `next/font/google` ile, `display: 'swap'`, sadece kullanılan ağırlıklar.
- `app/page.tsx` static — `export const dynamic = 'force-static'`.

### Responsive
- Mobile-first breakpoint'ler: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.
- Hero ve grid'ler `lg`'de tek kolon → çok kolona geçer.
- Nav `lg` altında hamburger.

## Dosya organizasyonu

```
app/
├── layout.tsx          ← font yükleme, metadata, html lang="tr"
├── page.tsx            ← anasayfa (sadece composition)
├── globals.css         ← tailwind + CSS variable'lar
└── api/contact/route.ts ← form endpoint placeholder

components/
├── sections/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── TrustBar.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Cases.tsx
│   ├── CTA.tsx
│   ├── Insights.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── ui/
    ├── Counter.tsx
    ├── Eyebrow.tsx
    ├── SectionMark.tsx
    ├── StatCard.tsx
    └── Button.tsx

lib/
├── content.ts          ← hero copy, hizmet listesi, case çalışmalar (TR string'ler)
└── cn.ts               ← clsx + tailwind-merge helper

public/
└── (gerçek görseller buraya)
```

## İçerik

Tüm Türkçe metin `lib/content.ts`'te bir export olarak. Component'ler bu objeden okur.
Sebep: ileride i18n eklemek kolay, ve içerik düzenlerken markup'a dokunmaya gerek kalmaz.

## Yapma

- Pozisyon hack'leri (`position: absolute` mecburiyet dışında, `z-index` 9999 vs.).
- Inline `<svg>` ile karmaşık illüstrasyon çizmek — placeholder kullan, gerçek varlık beklenir.
- Bölümler arası özel global CSS — her bölüm kendi içinde kapalı olsun.
- Random emoji — sadece content.ts'te listelenenler (eğer varsa).
- "AI tarzı" gradient bombardımanı, abartılı blur/glow.

## Form endpoint

`/api/contact` placeholder olarak şunu döner:
```ts
export async function POST(req: Request) {
  const body = await req.json();
  console.log('contact form:', body);
  return Response.json({ ok: true });
}
```
İleride bir SMTP/SendGrid/Postmark entegrasyonu için açık bırakılır.

## Kontrol listesi (commit öncesi)

- [ ] `npm run build` hatasız geçer
- [ ] `npm run lint` temiz
- [ ] Lighthouse Mobile ≥ 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] 320px–1920px arası tüm breakpoint'lerde layout bozulmaz
- [ ] Tab tuşuyla nav, butonlar, form alanları sırayla erişilebilir
- [ ] `prefers-reduced-motion: reduce` ile animasyonlar durur
