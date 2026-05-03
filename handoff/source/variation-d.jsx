// Variation D — Swiss / International Style. Strict 12-col grid, B&W, single red accent. Helvetica-feel via DM Sans.
const { useState: useStateD, useEffect: useEffectD, useRef: useRefD } = React;

const D_COLORS = {
  paper: '#FFFFFF',
  paperAlt: '#F4F4F4',
  ink: '#0A0A0A',
  inkSoft: '#3D3D3D',
  muted: '#8C8C8C',
  border: '#0A0A0A',
  borderSoft: 'rgba(10,10,10,0.12)',
  accent: '#0047FF', // single blue accent
};

const dSans = `'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`;
const dMono = `'JetBrains Mono', ui-monospace, monospace`;

const dRule = `1px solid ${D_COLORS.ink}`;
const dRuleSoft = `1px solid ${D_COLORS.borderSoft}`;

// 12-col grid wrapper
function GridD({ children, style }) {
  return (
    <div style={{
      maxWidth: 1320, margin: '0 auto', padding: '0 40px',
      display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: 24, ...style,
    }}>{children}</div>
  );
}

function CounterD({ end, suffix = '', duration = 1400 }) {
  const [val, setVal] = useStateD(0);
  const ref = useRefD(null);
  const started = useRefD(false);
  useEffectD(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(end * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  const display = end < 10 ? val.toFixed(1) : Math.floor(val).toLocaleString('tr-TR');
  return <span ref={ref}>{display}{suffix}</span>;
}

function NavD() {
  const links = [
    { n: '01', label: 'Hizmetler', href: '#services' },
    { n: '02', label: 'Çalışmalar', href: '#cases' },
    { n: '03', label: 'Hakkımızda', href: '#about' },
    { n: '04', label: 'Yazılar', href: '#insights' },
    { n: '05', label: 'İletişim', href: '#contact' },
  ];
  return (
    <header style={{ background: D_COLORS.paper, borderBottom: dRule, position: 'sticky', top: 0, zIndex: 50 }}>
      <GridD style={{ alignItems: 'center', padding: '20px 40px' }}>
        <a href="#" style={{ gridColumn: 'span 3', textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 12, color: D_COLORS.ink }}>
          <span style={{
            display: 'inline-block', width: 14, height: 14, background: D_COLORS.accent,
          }}/>
          <span style={{ fontFamily: dSans, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>idafin</span>
          <span style={{ fontFamily: dMono, fontSize: 11, color: D_COLORS.muted, letterSpacing: '0.1em' }}>EST.2008</span>
        </a>
        <nav style={{ gridColumn: 'span 7', display: 'flex', gap: 32 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              textDecoration: 'none', color: D_COLORS.ink,
              fontFamily: dSans, fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'baseline', gap: 6,
            }}>
              <span style={{ fontFamily: dMono, fontSize: 10, color: D_COLORS.muted }}>{l.n}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" style={{
          gridColumn: 'span 2',
          padding: '12px 16px', background: D_COLORS.ink, color: D_COLORS.paper,
          textDecoration: 'none', fontFamily: dSans, fontWeight: 600, fontSize: 14,
          textAlign: 'center', justifySelf: 'end', minWidth: 180,
        }}>Görüşme Planla →</a>
      </GridD>
    </header>
  );
}

// ---------- Hero ----------
function HeroD() {
  // Hero image: Unsplash — Istanbul finansal/skyline (placeholder, değiştirilebilir)
  const heroImg = 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=2400&q=80';
  return (
    <section id="hero" style={{
      position: 'relative', borderBottom: dRule, padding: '80px 0 60px',
      backgroundColor: D_COLORS.paper,
      backgroundImage: `linear-gradient(180deg, rgba(250,250,250,0.78) 0%, rgba(250,250,250,0.55) 45%, rgba(10,10,10,0.45) 100%), url('${heroImg}')`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      overflow: 'hidden',
    }}>
      {/* swiss grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(90deg, rgba(10,10,10,0.06) 1px, transparent 1px)',
        backgroundSize: 'calc(100% / 12) 100%',
      }}/>

      <div style={{ position: 'relative' }}>
        <GridD>
          {/* spacer column (was: SAYFA / 01 index) */}
          <div style={{ gridColumn: 'span 2' }}/>

          <div style={{ gridColumn: 'span 9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
              <span style={{ display: 'inline-block', width: 36, height: 8, background: D_COLORS.accent }}/>
              <span style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.ink }}>VOL. 18 / N° 04 — KURUMSAL FİNANS</span>
            </div>
            <h1 style={{
              fontFamily: dSans, fontWeight: 700,
              fontSize: 'clamp(64px, 9vw, 168px)',
              lineHeight: 0.92, letterSpacing: '-0.045em',
              margin: 0, color: D_COLORS.ink,
              textShadow: '0 1px 0 rgba(255,255,255,0.4)',
            }}>
              Sermayenin
              <br/>
              doğru
              <br/>
              <span style={{ color: D_COLORS.accent }}>kararı.</span>
            </h1>
          </div>

          <div style={{ gridColumn: 'span 1' }}/>
        </GridD>

        <GridD style={{ marginTop: 80 }}>
          <div style={{ gridColumn: 'span 2' }}/>
          <div style={{ gridColumn: 'span 5' }}>
            <p style={{ fontFamily: dSans, fontSize: 18, lineHeight: 1.55, color: D_COLORS.ink, margin: 0, background: 'rgba(255,255,255,0.55)', padding: '16px 18px', backdropFilter: 'blur(2px)' }}>
              <span style={{ fontFamily: dSans, fontWeight: 700, color: D_COLORS.ink }}>idafin</span>, 18 yıldır 120+ kurumsal müşteriyle çalışan bağımsız bir İstanbul danışmanlık şirketidir. Yatırım, yapılandırma ve dijital dönüşümde — düşünce ortağınız.
            </p>
          </div>
          <div style={{ gridColumn: 'span 3' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href="#contact" style={{
                padding: '16px 20px', background: D_COLORS.accent, color: D_COLORS.paper,
                textDecoration: 'none', fontFamily: dSans, fontSize: 15, fontWeight: 600,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}><span>Görüşme Planla</span><span>→</span></a>
              <a href="#services" style={{
                padding: '16px 20px', background: D_COLORS.paper, color: D_COLORS.ink, border: dRule,
                textDecoration: 'none', fontFamily: dSans, fontSize: 15, fontWeight: 600,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}><span>Hizmetlere Git</span><span>↓</span></a>
            </div>
          </div>
          <div style={{ gridColumn: 'span 2' }}/>
        </GridD>

      </div>
    </section>
  );
}

// ---------- Stats / Manifesto ----------
function ManifestoD() {
  const stats = [
    { v: 18, suffix: '', label: 'YIL DENEYİM' },
    { v: 120, suffix: '+', label: 'KURUMSAL MÜŞTERİ' },
    { v: 2.4, suffix: 'B₺', label: 'YÖNETİLEN HACİM' },
    { v: 96, suffix: '%', label: 'DEVAMLILIK' },
  ];
  return (
    <section style={{ background: D_COLORS.paperAlt, borderBottom: dRule, padding: '80px 0' }}>
      <GridD>
        <div style={{ gridColumn: 'span 4' }}>
          <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.muted }}>01 / MANİFESTO</div>
          <h2 style={{
            fontFamily: dSans, fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 44px)',
            lineHeight: 1.05, letterSpacing: '-0.025em',
            margin: '24px 0 0', color: D_COLORS.ink,
          }}>
            Sayılar yalan söylemez.
            <br/>
            <span style={{ color: D_COLORS.accent }}>Yorumlar söyler.</span>
          </h2>
        </div>
        <div style={{ gridColumn: 'span 8', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: dRule, borderTop: dRule }}>
          {stats.map(s => (
            <div key={s.label} style={{ borderRight: dRule, borderBottom: dRule, padding: '32px 20px' }}>
              <div style={{ fontFamily: dSans, fontWeight: 700, fontSize: 'clamp(40px, 4vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1, color: D_COLORS.ink }}>
                <CounterD end={s.v} suffix={s.suffix}/>
              </div>
              <div style={{ marginTop: 16, fontFamily: dMono, fontSize: 11, letterSpacing: '0.12em', color: D_COLORS.muted }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </GridD>
    </section>
  );
}

// ---------- About ----------
function AboutD() {
  return (
    <section id="about" style={{ background: D_COLORS.paper, borderBottom: dRule, padding: '120px 0' }}>
      <GridD>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.muted }}>02</div>
          <div style={{ marginTop: 12, fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.ink }}>HAKKIMIZDA</div>
        </div>
        <div style={{ gridColumn: 'span 6' }}>
          <h2 style={{
            fontFamily: dSans, fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 80px)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            margin: 0, color: D_COLORS.ink,
          }}>
            2008'den bu yana, finansal kararların arkasındaki düşünce ortağı.
          </h2>
        </div>
        <div style={{ gridColumn: 'span 4', alignSelf: 'end' }}>
          <p style={{ fontFamily: dSans, fontSize: 16, lineHeight: 1.6, color: D_COLORS.inkSoft, margin: 0 }}>
            idafin, kurumsal yapılarda finansal mimarlık yapan bir danışmanlık şirketidir. Yatırım planlamasından dijital dönüşüme kadar her aşamada işletmelerin yanındayız.
          </p>
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {['Bağımsız analiz', 'Veri odaklı strateji', 'Uzun vadeli ortaklık', 'Sektörel derinlik'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: dSans, fontSize: 14 }}>
                <span style={{ width: 6, height: 6, background: D_COLORS.accent, display: 'inline-block' }}/>{t}
              </div>
            ))}
          </div>
        </div>
      </GridD>
    </section>
  );
}

// ---------- Services ----------
function ServicesD() {
  const services = [
    { n: '01', title: 'Finansal Danışmanlık', desc: 'Yapılandırma, kredi yönetimi, yatırım planlama, halka arz ve M&A süreçleri.', bullets: ['Yatırım analizi', 'Borç yapılandırma', 'M&A süreçleri', 'Halka arz danışmanlığı'] },
    { n: '02', title: 'Yazılım & Dijital', desc: 'Finans kurumlarına özel yazılım ve teknoloji destekli analiz araçları.', bullets: ['Risk modelleme', 'BI & raporlama', 'API entegrasyonları', 'Özel CRM çözümleri'] },
    { n: '03', title: 'Süreç & Organizasyon', desc: 'Sürdürülebilir, uzun vadeli organizasyonel çözümler ve eylem planları.', bullets: ['Süreç tasarımı', 'Performans yönetimi', 'Stratejik planlama', 'Değişim yönetimi'] },
  ];
  return (
    <section id="services" style={{ background: D_COLORS.paperAlt, borderBottom: dRule, padding: '120px 0' }}>
      <GridD>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.muted }}>03</div>
          <div style={{ marginTop: 12, fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.ink }}>HİZMETLER</div>
        </div>
        <div style={{ gridColumn: 'span 10' }}>
          <h2 style={{
            fontFamily: dSans, fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 80px)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            margin: 0, color: D_COLORS.ink, marginBottom: 64,
          }}>
            Üç sütun. Bir <span style={{ color: D_COLORS.accent }}>ortak</span>.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: dRule, borderLeft: dRule }}>
            {services.map(s => (
              <div key={s.n} style={{
                borderRight: dRule, borderBottom: dRule,
                padding: 32, background: D_COLORS.paper,
                display: 'flex', flexDirection: 'column', minHeight: 460,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                  <span style={{ fontFamily: dMono, fontSize: 12, color: D_COLORS.muted, letterSpacing: '0.12em' }}>{s.n}</span>
                  <span style={{ width: 12, height: 12, background: D_COLORS.accent, display: 'inline-block' }}/>
                </div>
                <h3 style={{ fontFamily: dSans, fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', margin: 0, marginBottom: 16, color: D_COLORS.ink }}>{s.title}</h3>
                <p style={{ fontFamily: dSans, fontSize: 15, lineHeight: 1.55, color: D_COLORS.inkSoft, margin: 0 }}>{s.desc}</p>
                <div style={{ marginTop: 'auto', paddingTop: 32, borderTop: dRuleSoft }}>
                  {s.bullets.map(b => (
                    <div key={b} style={{ fontFamily: dSans, fontSize: 14, color: D_COLORS.ink, padding: '6px 0', display: 'flex', justifyContent: 'space-between', borderBottom: dRuleSoft }}>
                      <span>{b}</span><span style={{ color: D_COLORS.muted }}>—</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </GridD>
    </section>
  );
}

// ---------- Cases ----------
function CasesD() {
  const cases = [
    { sector: 'ÜRETİM', year: '2024', title: 'Halka arz hazırlık süreci', metric: '+34%', metricLabel: 'değerleme artışı' },
    { sector: 'PERAKENDE', year: '2025', title: 'Borç yeniden yapılandırma', metric: '−42%', metricLabel: 'finansman gideri' },
    { sector: 'TEKNOLOJİ', year: '2025', title: 'Birleşme & devralma', metric: '4 ay', metricLabel: 'kapanış süresi' },
    { sector: 'ENERJİ', year: '2026', title: 'Sermaye artırımı stratejisi', metric: '+18%', metricLabel: 'EBITDA katkısı' },
  ];
  return (
    <section id="cases" style={{ background: D_COLORS.paper, borderBottom: dRule, padding: '120px 0' }}>
      <GridD>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.muted }}>04</div>
          <div style={{ marginTop: 12, fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.ink }}>ÇALIŞMALAR</div>
        </div>
        <div style={{ gridColumn: 'span 10' }}>
          <h2 style={{
            fontFamily: dSans, fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 80px)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            margin: 0, color: D_COLORS.ink, marginBottom: 48,
          }}>
            Sayılarla konuşan sonuçlar.
          </h2>
          <div style={{ borderTop: dRule }}>
            {cases.map(c => (
              <a key={c.title} href="#" style={{
                display: 'grid', gridTemplateColumns: '80px 100px 1fr 200px 100px',
                gap: 24, padding: '32px 0', borderBottom: dRule,
                alignItems: 'center', textDecoration: 'none', color: D_COLORS.ink,
              }}>
                <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.12em', color: D_COLORS.muted }}>{c.year}</div>
                <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.12em', color: D_COLORS.ink }}>{c.sector}</div>
                <div style={{ fontFamily: dSans, fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em' }}>{c.title}</div>
                <div>
                  <div style={{ fontFamily: dSans, fontWeight: 700, fontSize: 32, letterSpacing: '-0.03em', color: D_COLORS.accent, lineHeight: 1 }}>{c.metric}</div>
                  <div style={{ fontFamily: dMono, fontSize: 10, letterSpacing: '0.12em', color: D_COLORS.muted, marginTop: 4 }}>{c.metricLabel}</div>
                </div>
                <div style={{ fontFamily: dSans, fontSize: 14, fontWeight: 600, textAlign: 'right' }}>Oku →</div>
              </a>
            ))}
          </div>
        </div>
      </GridD>
    </section>
  );
}

// ---------- Insights ----------
function InsightsD() {
  const posts = [
    { date: '12.04.26', cat: 'STRATEJİ', title: 'Yüksek faiz ortamında M&A: 2026 görünümü', read: '6 dk' },
    { date: '04.04.26', cat: 'TEKNOLOJİ', title: 'Finansal raporlamada AI ne kadar güvenilir?', read: '4 dk' },
    { date: '21.03.26', cat: 'SEKTÖR', title: 'Türkiye perakende pazarında dijital dönüşüm', read: '8 dk' },
  ];
  return (
    <section id="insights" style={{ background: D_COLORS.paperAlt, borderBottom: dRule, padding: '120px 0' }}>
      <GridD>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.muted }}>05</div>
          <div style={{ marginTop: 12, fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.ink }}>YAZILAR</div>
        </div>
        <div style={{ gridColumn: 'span 10' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <h2 style={{ fontFamily: dSans, fontWeight: 700, fontSize: 'clamp(36px, 5vw, 80px)', lineHeight: 1, letterSpacing: '-0.035em', margin: 0 }}>Güncel.</h2>
            <a href="#" style={{ fontFamily: dSans, fontSize: 14, fontWeight: 600, color: D_COLORS.ink, textDecoration: 'none', borderBottom: `2px solid ${D_COLORS.accent}`, paddingBottom: 4 }}>Tüm yazılar →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, borderTop: dRule, paddingTop: 32 }}>
            {posts.map((p, i) => (
              <a key={i} href="#" style={{ textDecoration: 'none', color: D_COLORS.ink, display: 'flex', flexDirection: 'column' }}>
                <div style={{ aspectRatio: '4/3', background: D_COLORS.paper, border: dRuleSoft, position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `repeating-linear-gradient(${45 + i*30}deg, ${D_COLORS.borderSoft} 0 1px, transparent 1px 14px)`,
                  }}/>
                  <div style={{
                    position: 'absolute', top: 12, left: 12, padding: '4px 10px',
                    background: D_COLORS.accent, color: D_COLORS.paper,
                    fontFamily: dMono, fontSize: 10, letterSpacing: '0.12em',
                  }}>{p.cat}</div>
                </div>
                <div style={{ marginTop: 16, fontFamily: dMono, fontSize: 11, letterSpacing: '0.12em', color: D_COLORS.muted }}>
                  {p.date} · {p.read} okuma
                </div>
                <h3 style={{ fontFamily: dSans, fontWeight: 600, fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '8px 0 0' }}>{p.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </GridD>
    </section>
  );
}

// ---------- Contact ----------
function ContactD() {
  const [form, setForm] = useStateD({ name: '', company: '', email: '', message: '' });
  const [sent, setSent] = useStateD(false);
  return (
    <section id="contact" style={{ background: D_COLORS.paper, borderBottom: dRule, padding: '120px 0' }}>
      <GridD>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.muted }}>06</div>
          <div style={{ marginTop: 12, fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.ink }}>İLETİŞİM</div>
        </div>
        <div style={{ gridColumn: 'span 5' }}>
          <h2 style={{
            fontFamily: dSans, fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 80px)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            margin: 0, color: D_COLORS.ink,
          }}>
            Bir kahve. Bir yol haritası.
          </h2>
          <p style={{ fontFamily: dSans, fontSize: 17, lineHeight: 1.55, color: D_COLORS.inkSoft, marginTop: 32, maxWidth: 460 }}>
            İlk görüşme ücretsiz. Mevcut durumu birlikte değerlendirir, somut bir yol önerir, sonra nasıl ilerleyeceğimizi konuşuruz.
          </p>
          <div style={{ marginTop: 48, display: 'grid', gap: 16 }}>
            {[
              ['E-posta', 'merhaba@idafin.com.tr'],
              ['Telefon', '+90 212 555 18 04'],
              ['Adres', 'Levent, Büyükdere Cd. 185, İstanbul'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16, paddingBottom: 12, borderBottom: dRuleSoft }}>
                <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.12em', color: D_COLORS.muted }}>{k.toUpperCase()}</div>
                <div style={{ fontFamily: dSans, fontSize: 16, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ gridColumn: 'span 5', display: 'grid', gap: 16 }}>
          {[
            { k: 'name', label: 'AD SOYAD' },
            { k: 'company', label: 'ŞİRKET' },
            { k: 'email', label: 'E-POSTA', type: 'email' },
          ].map(f => (
            <label key={f.k} style={{ display: 'block', borderBottom: dRule, paddingBottom: 8 }}>
              <span style={{ display: 'block', fontFamily: dMono, fontSize: 11, letterSpacing: '0.12em', color: D_COLORS.muted, marginBottom: 8 }}>{f.label}</span>
              <input type={f.type || 'text'} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} style={{
                width: '100%', padding: '4px 0', border: 'none', background: 'transparent',
                fontFamily: dSans, fontSize: 18, color: D_COLORS.ink, outline: 'none',
              }}/>
            </label>
          ))}
          <label style={{ display: 'block', borderBottom: dRule, paddingBottom: 8 }}>
            <span style={{ display: 'block', fontFamily: dMono, fontSize: 11, letterSpacing: '0.12em', color: D_COLORS.muted, marginBottom: 8 }}>MESAJ</span>
            <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{
              width: '100%', padding: '4px 0', border: 'none', background: 'transparent',
              fontFamily: dSans, fontSize: 18, color: D_COLORS.ink, outline: 'none', resize: 'vertical', boxSizing: 'border-box',
            }}/>
          </label>
          <button type="submit" disabled={sent} style={{
            marginTop: 16, padding: '18px', background: sent ? D_COLORS.paperAlt : D_COLORS.accent, color: sent ? D_COLORS.ink : D_COLORS.paper,
            border: 'none', fontFamily: dSans, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em',
            cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}><span>{sent ? '✓ Gönderildi' : 'Mesaj Gönder'}</span><span>→</span></button>
        </form>
      </GridD>
    </section>
  );
}

// ---------- Footer ----------
function FooterD() {
  return (
    <footer style={{ background: D_COLORS.ink, color: D_COLORS.paper, padding: '80px 0 32px' }}>
      <GridD>
        <div style={{ gridColumn: 'span 12', fontFamily: dSans, fontWeight: 700, fontSize: 'clamp(80px, 16vw, 240px)', lineHeight: 0.9, letterSpacing: '-0.045em', marginBottom: 64 }}>
          idafin<span style={{ color: D_COLORS.accent }}>.</span>
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <p style={{ fontFamily: dSans, fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,0.75)', margin: 0, maxWidth: 320 }}>
            2008'den bu yana finansal mimarlık. İşletmelerin geleceğini bugünden kuran düşünce ortağınız.
          </p>
        </div>
        {[
          { title: 'Hizmetler', links: ['Finansal Danışmanlık', 'Yazılım & Dijital', 'Süreç & Org.'] },
          { title: 'Şirket', links: ['Hakkımızda', 'Ekip', 'Kariyer'] },
          { title: 'İletişim', links: ['merhaba@idafin.com.tr', '+90 212 555 18 04', 'Levent, İstanbul'] },
        ].map(col => (
          <div key={col.title} style={{ gridColumn: 'span 2' }}>
            <div style={{ fontFamily: dMono, fontSize: 11, letterSpacing: '0.18em', color: D_COLORS.accent, marginBottom: 16 }}>{col.title.toUpperCase()}</div>
            {col.links.map(l => (
              <a key={l} href="#" style={{ display: 'block', fontFamily: dSans, fontSize: 14, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', padding: '4px 0' }}>{l}</a>
            ))}
          </div>
        ))}
        <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
          <a href="#hero" style={{ fontFamily: dSans, fontSize: 13, fontWeight: 600, color: D_COLORS.paper, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>↑ Başa dön</a>
        </div>
        <div style={{ gridColumn: 'span 12', borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: 64, paddingTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', fontFamily: dMono, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)' }}>
          <span>© 2026 İDAFİN A.Ş.</span>
          <span style={{ textAlign: 'center' }}>ISO 27001 · KVKK · SPK</span>
          <span style={{ textAlign: 'right' }}>SWISS / GRID 12</span>
        </div>
      </GridD>
    </footer>
  );
}

function VariationD() {
  return (
    <div style={{ background: D_COLORS.paper, color: D_COLORS.ink, fontFamily: dSans }}>
      <NavD/>
      <HeroD/>
      <ManifestoD/>
      <AboutD/>
      <ServicesD/>
      <CasesD/>
      <InsightsD/>
      <ContactD/>
      <FooterD/>
    </div>
  );
}
