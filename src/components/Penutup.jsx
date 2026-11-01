import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang, ui } from '../i18n.jsx'


// {ui.gateLabel[lang]}, konsep 'Gerbang Terbuka' versi gerak nyata:
// 1) Bingkai dibuka RAPAT pada dua menara — pengunjung berdiri tepat
//    di depan gerbang, bukan memandang panorama jembatan.
// 2) Pendekatan BERAKSELERASI: foto membesar makin cepat, lapisan
//    ambang gelap di tepi bingkai menyapu lewat lebih dulu (paralaks),
//    pandangan sedikit menurun ke arah dek — terasa melaju masuk,
//    bukan memperbesar gambar.
// 3) Ambang ditembus lewat KILATAN CAHAYA kertas, dan di dalamnya
//    menunggu Palembang malam hari: Ampera berlampu di atas Musi,
//    dengan satu-satunya CTA situs berdiri di atasnya.

export default function Penutup() {
  const { lang } = useLang()
  // Di layar potret, bingkai foto lanskap terpotong sempit — zoom awal
  // dibuat lebih landai agar dua menara tetap terbaca sebagai gerbang.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  const INFO = ui.infoItems[lang]
  const sceneRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })

  // Gerbang: membesar berakselerasi menuju celah ant menara
  const gateScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.7, 0.85],
    isMobile ? [1.08, 1.3, 2.1, 4.4] : [1.5, 1.85, 2.9, 5.2],
  )
  const gateDrift = useTransform(scrollYProgress, [0, 0.85], ['0%', '3.5%'])
  const gateOpacity = useTransform(scrollYProgress, [0.84, 0.9], [1, 0])
  // Lapisan ambang: bingkai gelap yang menyapu lewat lebih cepat (paralaks)
  const frameScale = useTransform(scrollYProgress, [0, 0.6], [1, 2.2])
  const frameOpacity = useTransform(scrollYProgress, [0, 0.5, 0.68], [0.9, 0.9, 0])
  // Kilatan cahaya saat menembus ambang
  const flashOpacity = useTransform(scrollYProgress, [0.82, 0.88, 0.96, 1], [0, 0.96, 0.96, 0])
  // Di dalam gerbang: malam Palembang + CTA
  const insideOpacity = useTransform(scrollYProgress, [0.9, 0.98], [0, 1])
  const insideScale = useTransform(scrollYProgress, [0.88, 1], [1.07, 1])
  const ctaPointer = useTransform(scrollYProgress, (v) => (v > 0.95 ? 'auto' : 'none'))
  const frontOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0])

  return (
    <section id="penutup" className="relative bg-ink text-paper">
      <div ref={sceneRef} className="relative h-[420vh]">
        <div className="group sticky top-0 h-screen overflow-hidden">
          {/* DI DALAM GERBANG — Musi malam hari + satu-satunya CTA */}
          <motion.div style={{ opacity: insideOpacity }} className="absolute inset-0 z-0">
            <motion.img
              src="/images/gallery/ampera-malam.webp"
              alt={lang === 'id' ? 'Jembatan Ampera berlampu di malam hari di atas Sungai Musi' : 'Ampera Bridge lit up at night over the Musi River'}
              style={{ scale: insideScale }}
              className="foto-perak absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/25 to-ink/70" />
            <motion.div
              style={{ pointerEvents: ctaPointer }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <p className="mb-8 font-mono text-[11px] tracking-[0.35em] text-paper/80">
                {ui.insideLabel[lang]}
              </p>
              <h2 className="font-display text-5xl leading-[1.02] font-semibold tracking-tight md:text-8xl">
                {ui.ctaTitleA[lang]}
                <br />
                <span className="italic">{ui.ctaTitleB[lang]}</span>
              </h2>
              <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper/90">
                {ui.ctaBody[lang]}
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#prolog"
                  className="rounded-full bg-paper px-8 py-3.5 font-medium text-ink transition hover:bg-silver"
                >
                  {ui.ctaReplay[lang]}
                </a>
              </div>
            </motion.div>
            <p className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.3em] text-paper/70 md:left-14">
              {ui.insideCaption[lang]}
            </p>
          </motion.div>

          {/* GERBANG — dua menara Ampera didekati dengan akselerasi */}
          <motion.div
            style={{ scale: gateScale, opacity: gateOpacity, originX: 0.47, originY: 0.36 }}
            className="absolute inset-0 z-10"
          >
            <motion.div style={{ y: gateDrift }} className="absolute inset-0">
              <img
                src="/images/gallery/ampera-gerbang.webp"
                alt={lang === 'id' ? 'Jembatan Ampera — dua menaranya sebagai gerbang kota' : 'Ampera Bridge — its two towers as the gate of the city'}
                className="foto-perak h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/25" />
            </motion.div>
          </motion.div>

          {/* AMBANG — tepi gelap yang menyapu lewat (paralaks kedalaman) */}
          <motion.div
            style={{ scale: frameScale, opacity: frameOpacity }}
            className="pointer-events-none absolute inset-0 z-20"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 50%, rgba(12,12,13,0.55) 78%, rgba(12,12,13,0.94) 100%)',
              }}
            />
          </motion.div>

          {/* KILATAN — cahaya ambang saat gerbang ditembus */}
          <motion.div
            style={{ opacity: flashOpacity }}
            className="pointer-events-none absolute inset-0 z-30 bg-paper"
          />

          {/* Wajah depan gerbang */}
          <motion.div
            style={{ opacity: frontOpacity }}
            className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-between px-6 py-10 md:px-14"
          >
            <p className="flex items-center gap-4 font-mono text-[11px] tracking-[0.35em] text-paper/85">
              <span className="h-px w-12 bg-paper/60" />
              {ui.gateLabel[lang]}
            </p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-paper/75">
                {ui.gateCaption[lang]}
              </p>
              <p className="font-mono text-[10px] tracking-[0.3em] text-paper">
                {ui.gateHint[lang]}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pita perpisahan berjalan — denyut terakhir situs */}
      <div className="overflow-hidden border-b border-paper/15 py-5" aria-hidden>
        <div className="animate-marquee flex w-max items-baseline gap-8 pr-8">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-baseline gap-8">
              {[0, 1, 2].map((n) => (
                <span key={n} className="flex items-baseline gap-8 whitespace-nowrap">
                  <span className="font-display text-4xl font-semibold tracking-tight text-paper md:text-6xl">
                    {ui.marqueeA[lang]}
                  </span>
                  <span className="angka-babak font-display text-4xl font-bold tracking-tight md:text-6xl">
                    {ui.marqueeB[lang]}
                  </span>
                  <span className="font-display text-4xl text-fog md:text-6xl">—</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Info praktis + kredit, mengalir setelah gerbang */}
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <div className="grid gap-10 md:grid-cols-3">
          {INFO.map((item, i) => (
            <motion.div
              key={item.title}
              className="group"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative mb-6 h-px overflow-hidden bg-paper/15">
                <div className="absolute inset-0 origin-left scale-x-[0.16] bg-paper transition-transform duration-700 ease-out group-hover:scale-x-100" />
              </div>
              <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-fog">
                INFO {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mb-3 font-display text-xl font-semibold transition-transform duration-500 group-hover:translate-x-1.5">
                {item.title}
              </h3>
              <p className="leading-relaxed text-silver/85">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Baris perpisahan + jam hidup Palembang */}
        <div className="mt-24 flex flex-wrap items-end justify-between gap-8 border-t border-paper/15 pt-12">
          <p className="font-display text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
            {ui.signoffA[lang]}
            <br />
            <span className="italic">{ui.signoffB[lang]}</span>
          </p>
          <div className="text-right">
            <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-fog">
              {ui.clockLabel[lang]}
            </p>
            <JamPalembang />
            <p className="mt-2 font-mono text-[10px] tracking-[0.25em] text-fog">
              {ui.clockPlace[lang]}
            </p>
          </div>
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-paper/15 pt-6 font-mono text-[10px] tracking-[0.25em] text-fog">
          <span>PALEMBANG, SUMATERA SELATAN</span>
          <a href="#prolog" className="text-paper/80 transition hover:text-paper">
            {ui.backToTop[lang]}
          </a>
        </footer>
      </div>

      {/* Wordmark raksasa terpotong di tepi bawah */}
      <div aria-hidden className="pointer-events-none h-[8.5vw] overflow-hidden select-none">
        <p className="text-center font-display text-[13.5vw] leading-[0.78] font-bold tracking-tight text-paper/[0.08]">
          PALEMBANG
        </p>
      </div>
    </section>
  )
}

// Jam hidup Palembang (WIB) — berdetak tiap detik di kaki situs.
function JamPalembang() {
  const [waktu, setWaktu] = useState('--:--:--')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setWaktu(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <p className="font-mono text-3xl tracking-[0.15em] text-paper tabular-nums md:text-4xl">
      {waktu} <span className="text-base text-fog">WIB</span>
    </p>
  )
}
