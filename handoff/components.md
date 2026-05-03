# Components Spec — idafin (D · Swiss Grid)

Her bölüm `components/sections/` altında kendi dosyası. Tekrar eden parçalar `components/ui/`.

## Bölüm sırası
1. Nav
2. Hero (arka plan görsel)
3. Manifesto / Stats
4. About
5. Services
6. Cases
7. Insights
8. Contact
9. Footer

---

## 1. `Nav.tsx`

12-col grid içinde:
- col-span-3: logo (mavi kare 14×14 + "idafin" wordmark)
- col-span-6: linkler (Hakkımızda, Hizmetler, Çalışmalar, Yazılar, İletişim)
- col-span-3: "Görüşme Planla →" butonu (siyah, sağa hizalı)

Üst utility bar yok. Sticky değil — sayfa başında durağan.

---

## 2. `Hero.tsx` ⭐ (arka plan görsel)

**Yapı:**
- `<section>` arka planı: `linear-gradient(180deg, paper/78 0%, paper/55 45%, ink/45 100%), url(/hero.jpg)`, `cover/center`.
- 12-col grid overlay (1px dikey çizgiler, opacity 0.06).
- **Sol col-span-2:** boş spacer (eskisi `SAYFA / 01` index'iydi — kaldırıldı).
- **Orta col-span-9:** `[mavi 36×8 kare] VOL. 18 / N° 04 — KURUMSAL FİNANS` mono caption. Altında 3 satır h1: `Sermayenin / doğru / kararı.` (son kelime mavi accent).
- **Sağ col-span-1:** boş.
- Alt grid (margin-top 80px):
  - col-span-2 spacer
  - col-span-5: paragraf, `bg-paper/55` + `backdrop-blur-sm` + 16/18px padding (görsel üstünde okunsun)
  - col-span-3: 2 buton stack (mavi "Görüşme Planla →" + ghost "Hizmetlere Git ↓")
  - col-span-2 spacer

**Image:** `next/image` `fill priority` ile, alt boş.

**Hero figürü/sağ üst caption KALDIRILDI** — temiz overlay, sadece tipografi + buton.

---

## 3. `Manifesto.tsx`

12-col, paper-alt arka plan, `border-b`:
- col-span-4: mono `01 / MANİFESTO` + h2-sm: `Sayılar yalan söylemez. / Yorumlar söyler.` (ikinci satır mavi)
- col-span-8: 4 stat ızgarası (2x2'lik border'lı kutular) — Counter ile.

Stats:
- 18 / `YIL DENEYİM`
- 120+ / `KURUMSAL MÜŞTERİ`
- 2.4B₺ / `YÖNETİLEN HACİM`
- 96% / `DEVAMLILIK`

---

## 4. `About.tsx`

12-col, paper, `border-b`:
- col-span-2: `02` + `HAKKIMIZDA` (mono)
- col-span-6: h2 `2008'den bu yana, finansal kararların arkasındaki düşünce ortağı.`
- col-span-4 (alignSelf: end): paragraf + 2x2 değer listesi (her madde küçük mavi kare + metin)

---

## 5. `Services.tsx`

12-col, paper-alt, `border-b`:
- col-span-2: `03 / HİZMETLER`
- col-span-10: h2 `Üç sütun. Bir ortak.` (ortak mavi)
- 3-col tablo, her hücre `border-r border-b border-ink`, 32px padding, min-h 460:
  - Üstte: mono numara (01/02/03) + mavi 12×12 kare (sağda)
  - h3 (26px) + paragraf
  - Alt: 4 madde, her satır `border-b border-line` ile ayrılmış, sağda `—` mark

Hizmetler:
1. **Finansal Danışmanlık** — Yatırım analizi, Borç yapılandırma, M&A süreçleri, Halka arz
2. **Yazılım & Dijital** — Risk modelleme, BI & raporlama, API entegrasyonları, CRM
3. **Süreç & Organizasyon** — Süreç tasarımı, Performans yönetimi, Stratejik planlama, Değişim

---

## 6. `Cases.tsx`

12-col, paper, `border-b`:
- col-span-2: `04 / ÇALIŞMALAR`
- col-span-10: h2 `Sayılarla konuşan sonuçlar.` + 3 sütun:
  - Her case: 16:10 oranında siyah figürlü kapak (sektör + yıl mono captions) + alt: başlık (sans 22) + büyük metric (mavi, sans 32)
  - Cases:
    - ÜRETİM 2024 — Halka arz hazırlık → +34%
    - PERAKENDE 2025 — Borç yapılandırma → −42%
    - TEKNOLOJİ 2025 — M&A → 4 ay

---

## 7. `Insights.tsx`

12-col, paper-alt, `border-b`:
- col-span-12: H2 `Güncel.` + sağda "Tüm yazılar" linki (mavi alt çizgili)
- 3-col grid 24px gap:
  - Her kart: 4:3 placeholder kapak + sol üst mavi kategori pill (mono) + alt: tarih · süre + h3

Posts:
- Strateji — Yüksek faiz ortamında M&A: 2026 görünümü (6 dk)
- Teknoloji — Finansal raporlamada AI ne kadar güvenilir? (4 dk)
- Sektör — Türkiye perakende pazarında dijital dönüşüm (8 dk)

---

## 8. `Contact.tsx` (`'use client'`)

12-col, paper, `border-b`:
- col-span-6: H2 `Görüşelim.` + paragraf + iletişim bilgileri (E-posta, Telefon, Adres)
- col-span-6: form
  - Ad Soyad, Şirket (yan yana 2 col)
  - E-posta (full)
  - İlgi alanı (3 segmented pill: Finansal / Yazılım / Süreç)
  - Mesaj (textarea)
  - Submit butonu: `mavi → submit edildiğinde paperAlt` toggle

Submit `/api/contact`'a POST, başarıda buton "✓ Talebiniz alındı" olur.

---

## 9. `Footer.tsx`

12-col, ink (siyah) bg, paper text:
- col-span-12: dev `idafin.` (mavi nokta) — clamp(80px, 16vw, 240px)
- col-span-4: tanım metni + sosyal linkler
- col-span-2 × 3: HİZMETLER, ŞİRKET, KAYNAKLAR (mono başlık mavi)
- col-span-2: ↑ Başa dön
- Alt çizgi: copyright | sertifikalar | gizlilik linkleri (mono)

---

## UI primitives

### `Counter.tsx` (`'use client'`)
IntersectionObserver, viewport'a girince 0→target animasyon, 1400ms, easeOutCubic.
`prefers-reduced-motion: reduce` → animasyonsuz, direkt değer.

### `Grid.tsx`
```tsx
export function Grid({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-[1320px] px-10 grid grid-cols-12 gap-x-6 ${className}`}>
      {children}
    </div>
  );
}
```

### `MonoTag.tsx`
`<span className="font-mono text-mono uppercase text-ink">{children}</span>`
Section mark'lar için (`§ 01`, `02 / HAKKIMIZDA`).

### `AccentSquare.tsx`
Mavi 36×8 (yatay) veya 12×12 / 14×14 (kare) için utility. Inline style yerine className.

### `Button.tsx`
Variants:
- `primary`: `bg-accent text-paper` + `→` icon
- `ghost`: `bg-paper text-ink border border-ink`
Padding `16px 20px`, font 15/600, flex space-between.
