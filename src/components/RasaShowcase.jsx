import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang, ui } from '../i18n.jsx'

// BABAK III — RASA sebagai panggung scroll, meniru efek "Scroll
// Services" (scrollservices.framer.website, bagian proses/fase):
// layar terpaku (sticky) sementara scroll mengganti isi panggung
// tahap demi tahap. Adaptasi sesuai arahan Rio: background layar
// penuh berupa foto makanan yang BERGANTIAN mengikuti scroll, dan
// tipografi memakai SCROLL REVEAL — judul & lead menyala kata demi
// kata, nama hidangan naik dari balik topeng saat tahapnya aktif.
// Tahap 0 = layar judul di atas kertas (menyambung mulus dari bakar
// Babak II); tahap 1–4 = Pempek, Pindang Patin, Burgo, Laksan.

const STAGE_COUNT = 5 // 1 judul + 4 hidangan

// Framer Motion (WAAPI) menolak offset di luar [0,1] — jepit semua ujung rentang.
const c01 = (n) => Math.min(1, Math.max(0, n))
const rng = (...pts) => pts.map(c01)

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.13, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  )
}

function IntroLayer({ act, progress }) {
  const { lang } = useLang()
  const fade = useTransform(progress, [0.165, 0.2], [1, 0])
  const words = act.lead[lang].split(' ')
  return (
    <motion.div style={{ opacity: fade }} className="absolute inset-0 z-10 bg-paper text-ink">
      <span
        aria-hidden
        className="angka-babak pointer-events-none absolute -top-10 right-0 font-display text-[36vw] leading-none font-bold select-none"
      >
        {act.numeral}
      </span>
      <div className="relative flex h-full flex-col justify-center px-6 md:px-14">
        <p className="mb-6 flex items-center gap-4 font-mono text-[11px] tracking-[0.35em] text-ink/60">
          <span className="h-px w-12 bg-ink/40" />
          {act.label[lang].toUpperCase()} — {ui.rasaScroll[lang]}
        </p>
        <h2 className="font-display text-7xl leading-[0.95] font-semibold tracking-tight md:text-9xl">
          {act.title[lang]}
        </h2>
        <p className="mt-10 max-w-3xl text-xl leading-relaxed text-ink/85 md:text-2xl">
          {words.map((w, i) => {
            const start = 0.015 + (i / words.length) * 0.13
            return (
              <Word key={i} progress={progress} range={[start, start + 0.02]}>
                {w}
              </Word>
            )
          })}
        </p>
      </div>
    </motion.div>
  )
}

function DishLayer({ item, index, progress, isLast }) {
  const { lang } = useLang()
  const stage = index + 1
  const start = stage / STAGE_COUNT
  const end = (stage + 1) / STAGE_COUNT
  // Hidangan terakhir BERTAHAN layar penuh — ia ditimpa Babak IV
  // (Chronos Stack), bukan memudar menyisakan layar kertas kosong.
  const bgOpacity = useTransform(
    progress,
    isLast ? rng(start - 0.04, start + 0.015, 1) : rng(start - 0.04, start + 0.015, end - 0.015, end + 0.04),
    isLast ? [0, 1, 1] : [0, 1, 1, 0],
  )
  const bgScale = useTransform(progress, rng(start - 0.04, end + 0.04), [1.1, 1])
  const nameY = useTransform(progress, rng(start + 0.005, start + 0.055), ['105%', '0%'])
  const noteOpacity = useTransform(
    progress,
    isLast ? rng(start + 0.03, start + 0.07, 1) : rng(start + 0.03, start + 0.07, end - 0.02, end + 0.02),
    isLast ? [0, 1, 1] : [0, 1, 1, 0],
  )
  const noteY = useTransform(progress, rng(start + 0.03, start + 0.07), [24, 0])
  return (
    <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
      <motion.img
        src={item.img}
        alt={item.name}
        style={{ scale: bgScale }}
        tabIndex={0}
        className="foto-perak absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
      <div className="absolute right-0 bottom-0 left-0 p-6 text-paper md:p-14">
        <p className="mb-4 font-mono text-[11px] tracking-[0.35em] text-paper/70">
          HIDANGAN {String(index + 1).padStart(2, '0')} / 04
        </p>
        <div className="overflow-hidden">
          <motion.h3
            style={{ y: nameY }}
            className="font-display text-6xl leading-[0.95] font-semibold tracking-tight md:text-8xl"
          >
            {item.name}
          </motion.h3>
        </div>
        <motion.p
          style={{ opacity: noteOpacity, y: noteY }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-paper/85"
        >
          {item.note[lang]}
        </motion.p>
      </div>
    </motion.div>
  )
}

function RailNode({ index, progress }) {
  const stage = index + 1
  const start = stage / STAGE_COUNT
  const end = (stage + 1) / STAGE_COUNT
  const opacity = useTransform(progress, rng(start - 0.03, start + 0.02, end - 0.02, end + 0.03), [0.35, 1, 1, 0.35])
  const scale = useTransform(progress, rng(start - 0.03, start + 0.02, end - 0.02, end + 0.03), [1, 1.35, 1.35, 1])
  return (
    <motion.span
      style={{ opacity, scale }}
      className="font-mono text-[11px] tracking-[0.2em]"
    >
      {String(index + 1).padStart(2, '0')}
    </motion.span>
  )
}

export default function RasaShowcase({ act }) {
  const { lang } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  // Tahap-tahap berjalan pada 5/6 pertama progres; 1/6 terakhir adalah
  // jendela timpa: Babak IV meluncur naik menutupi panggung ini
  // (ditarik -100vh di App) sementara panggung mengecil & meredup.
  const stageProgress = useTransform(scrollYProgress, [0, 5 / 6], [0, 1])
  const coverScale = useTransform(scrollYProgress, [5 / 6, 1], [1, 0.94])
  const coverFilter = useTransform(scrollYProgress, [5 / 6, 1], ['brightness(1)', 'brightness(0.45)'])
  const spineScale = useTransform(stageProgress, [0.2, 1], [0, 1])

  return (
    <section id={act.id} ref={ref} className="relative h-[600vh] bg-paper">
      <div className="group sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale: coverScale, filter: coverFilter }} className="absolute inset-0">
        <IntroLayer act={act} progress={stageProgress} />
        {act.items.map((item, i) => (
          <DishLayer
            key={item.name}
            item={item}
            index={i}
            progress={stageProgress}
            isLast={i === act.items.length - 1}
          />
        ))}

        {/* Rel nomor hidangan — gema rel fase pada referensi */}
        <div className="absolute top-1/2 left-5 z-20 hidden -translate-y-1/2 flex-col items-center gap-5 text-paper mix-blend-difference md:left-8 md:flex">
          <div className="relative flex flex-col items-center gap-5">
            <motion.span
              style={{ scaleY: spineScale }}
              className="absolute top-0 left-1/2 h-full w-px origin-top -translate-x-1/2 bg-paper/50"
            />
            {act.items.map((item, i) => (
              <RailNode key={item.name} index={i} progress={stageProgress} />
            ))}
          </div>
        </div>

        <p className="absolute right-6 bottom-6 z-20 hidden font-mono text-[11px] tracking-[0.35em] text-paper mix-blend-difference md:block">
          {act.label[lang].toUpperCase()} — {act.title[lang].toUpperCase()}
        </p>
        </motion.div>
      </div>
    </section>
  )
}
