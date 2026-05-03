# Design Tokens — idafin (D · Swiss Grid)

Bu dosya D varyasyonunun tüm token'larını tanımlar. `tailwind.config.ts`'e doğrudan geçirilebilir.

## 1. Renkler

```ts
colors: {
  paper:    { DEFAULT: '#FFFFFF', alt: '#F4F4F4' },
  ink:      { DEFAULT: '#0A0A0A', soft: '#3D3D3D', muted: '#8C8C8C' },
  accent:   { DEFAULT: '#0047FF' },              // tek vurgu rengi
  line:     'rgba(10,10,10,0.12)',               // ince ayraç
}
```

CSS variable formu (D'nin `<html>`'inde):
```css
:root {
  --paper: #FFFFFF;
  --paper-alt: #F4F4F4;
  --ink: #0A0A0A;
  --ink-soft: #3D3D3D;
  --ink-muted: #8C8C8C;
  --accent: #0047FF;
  --line: rgba(10, 10, 10, 0.12);
}
```

## 2. Tipografi

### Font yükleme (Next.js)
```ts
// app/fonts.ts
import { DM_Sans, JetBrains_Mono } from 'next/font/google';

export const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});
```

### Type scale
| name           | css                         | usage                        |
|----------------|-----------------------------|------------------------------|
| `text-mega`    | `clamp(64px, 9vw, 168px)`   | Hero h1                      |
| `text-h2`      | `clamp(36px, 5vw, 80px)`    | Section başlıkları           |
| `text-h2-sm`   | `clamp(28px, 3vw, 44px)`    | Manifesto h2                 |
| `text-stat`    | `clamp(40px, 4vw, 64px)`    | Stat sayıları                |
| `text-h3`      | `26px`                      | Servis kart başlığı          |
| `text-body-lg` | `18px / 1.55`               | Hero açıklama paragrafı      |
| `text-body`    | `16px / 1.6`                | Section paragrafı            |
| `text-body-sm` | `15px / 1.55`               | Kart açıklama                |
| `text-mono`    | `11px, 0.18em letter`       | Caption, eyebrow, mark       |
| `text-mono-xs` | `10px, 0.15em letter`       | Küçük mono index             |

### Letter spacing
- `text-mega`: `-0.045em`
- `text-h2`: `-0.035em`
- `text-h2-sm`, `text-h3`: `-0.025em` / `-0.02em`
- `text-stat`: `-0.04em`
- mono caps: `0.12em–0.18em`

### Tailwind extend
```ts
fontFamily: {
  sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace'],
},
fontSize: {
  'mono':    ['11px', { letterSpacing: '0.18em', lineHeight: '1' }],
  'mono-xs': ['10px', { letterSpacing: '0.15em', lineHeight: '1' }],
},
letterSpacing: {
  mega: '-0.045em',
  display: '-0.035em',
  tight2: '-0.025em',
},
```

## 3. Grid

12 kolon strict, gap 24px, max-width 1320px, padding 40px.

```tsx
// components/ui/Grid.tsx
<div className="mx-auto max-w-[1320px] px-10 grid grid-cols-12 gap-x-6">
  {children}
</div>
```

Kullanım örneği:
```tsx
<Grid>
  <div className="col-span-2">{/* index */}</div>
  <div className="col-span-9">{/* h1 */}</div>
  <div className="col-span-1" />
</Grid>
```

## 4. Spacing

| token              | px     | usage                      |
|--------------------|--------|----------------------------|
| `section-pad-y`    | `120px`| Standart bölüm dikey       |
| `section-pad-y-sm` | `80px` | Küçük bölüm                |
| `container-x`      | `40px` | Yatay padding              |
| `container-max`    | `1320px`| Maksimum genişlik         |

## 5. Border / Rule

D varyasyonunda **radius yok** — hep keskin köşe.

| token         | value                       | usage                       |
|---------------|-----------------------------|-----------------------------|
| `rule`        | `1px solid #0A0A0A`         | Ana ayraçlar, kart kenarları|
| `rule-soft`   | `1px solid rgba(10,10,10,0.12)` | İnce ayraç              |

## 6. Hero görseli

```tsx
<section className="relative overflow-hidden bg-paper border-b border-ink">
  <Image
    src="/hero.jpg"
    alt=""
    fill
    priority
    className="object-cover"
    sizes="100vw"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-paper/78 via-paper/55 to-ink/45" />
  <div className="absolute inset-0 pointer-events-none"
       style={{ backgroundImage: 'linear-gradient(90deg, rgba(10,10,10,0.06) 1px, transparent 1px)', backgroundSize: 'calc(100%/12) 100%' }} />
  <div className="relative">
    {/* content */}
  </div>
</section>
```

## 7. Tailwind config (tam dosya)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper:  { DEFAULT: '#FFFFFF', alt: '#F4F4F4' },
        ink:    { DEFAULT: '#0A0A0A', soft: '#3D3D3D', muted: '#8C8C8C' },
        accent: { DEFAULT: '#0047FF' },
        line:   'rgb(10 10 10 / 0.12)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: { container: '1320px' },
      letterSpacing: {
        mega:    '-0.045em',
        display: '-0.035em',
        tight2:  '-0.025em',
      },
      fontSize: {
        'mono':    ['11px', { letterSpacing: '0.18em' }],
        'mono-xs': ['10px', { letterSpacing: '0.15em' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
```
