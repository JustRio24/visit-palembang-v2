import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang, ui } from '../i18n.jsx'

// BABAK IV — KOTA YANG HIDUP sebagai PANGGUNG JALANAN TERPAKU:
// section 520vh, layar terpaku gelap; empat pemberhentian kota tampil
// layar penuh silih berganti dengan geser pandang menyamping, teksnya
// BERJALAN masuk dari kanan dan pergi ke kiri seperti papan nama yang
// dilewati saat menyusuri kota. Judul babak menumpang sebentar di foto
// pertama lalu pergi. Di dasar panggung mengalir PITA RUTE berisi
// empat pemberhentian yang terisi mengikuti perjalanan.

const STOPS = 4
const c01 = (n) => Math.min(1, Math.max(0, n))
const rng = (...pts) => pts.map(c01)

function PhotoLayer({ item, index, progress }) {
  const start = index / STOPS
  const end = (index + 1) / STOPS
  const opacity =
    index === 0
      ? useTransform(progress, rng(0, end - 0.03, end + 0.04), [1, 1, 0])
      : index === STOPS - 1
        ? useTransform(progress, rng(start - 0.04, start + 0.03), [0, 1])
        : useTransform(progress, rng(start - 0.04, start + 0.03, end - 0.03, end + 0.04), [0, 1, 1, 0])
  const dir = index % 2 === 0 ? 1 : -1
  const x = useTransform(progress, rng(start - 0.05, end + 0.05), [30 * dir, -30 * dir])
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.img
        src={item.img}
        alt={item.name}
        style={{ x }}
        className="foto-perak absolute inset-0 h-full w-full scale-[1.14] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30" />
    </motion.div>
  )
}

function StopCaption({ item, index, progress }) {
  const { lang } = useLang()
  const start = index / STOPS
  const end = (index + 1) / STOPS
  const fadeInStart = index === 0 ? 0.09 : start + 0.02
  const fadeInEnd = index === 0 ? 0.17 : start + 0.09
  const opacity =
    index === STOPS - 1
      ? useTransform(progress, rng(fadeInStart, fadeInEnd), [0, 1])
      : useTransform(progress, rng(fadeInStart, fadeInEnd, end - 0.02, end + 0.05), [0, 1, 1, 0])
  const x = useTransform(progress, rng(fadeInStart, end + 0.05), [70, -46])
  return (
    <motion.div style={{ opacity, x }} className="pointer-events-none absolute bottom-36 left-6 max-w-xl md:left-14">
      <p className="mb-4 font-mono text-[11px] tracking-[0.35em] text-paper/70">
        {ui.kotaStop[lang]} {String(index + 1).padStart(2, '0')} / 04 — {item.name.toUpperCase()}
      </p>
      <h3 className="font-display text-6xl leading-[0.95] font-semibold tracking-tight md:text-7xl">
        {item.name}
      </h3>
      <p className="mt-5 max-w-md leading-relaxed text-silver">{item.note[lang]}</p>
    </motion.div>
  )
}

function RouteStop({ item, index, progress }) {
  const start = index / STOPS
  const opacity = useTransform(progress, rng(start - 0.02, start + 0.02), [0.35, 1])
  return (
    <motion.span style={{ opacity }} className="flex items-center gap-2.5">
      <span className="h-2 w-2 shrink-0 rounded-full bg-paper" />
      <span className="hidden font-mono text-[10px] tracking-[0.25em] text-paper sm:inline">
        {item.name.toUpperCase()}
      </span>
    </motion.span>
  )
}

export default function KotaStage({ act }) {
  const { lang } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.16], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.16], [0, -48])

  return (
    <section id={act.id} ref={ref} className="relative h-[520vh] bg-ink text-paper">
      <div className="group sticky top-0 h-screen overflow-hidden">
        {act.items.map((item, i) => (
          <PhotoLayer key={item.name} item={item} index={i} progress={scrollYProgress} />
        ))}

        {/* Judul babak menumpang di pemberhentian pertama, lalu pergi */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="pointer-events-none absolute inset-x-6 top-[13vh] md:inset-x-14"
        >
          <p className="mb-6 flex items-center gap-4 font-mono text-[11px] tracking-[0.35em] text-paper/75">
            <span className="h-px w-12 bg-paper/50" />
            {act.label[lang].toUpperCase()} — {ui.kotaThrough[lang]}
          </p>
          <h2 className="font-display text-7xl leading-[0.92] font-semibold tracking-tight md:text-9xl">
            {act.titleLines[lang][0]}
            <br />
            {act.titleLines[lang][1]}
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/85">{act.lead[lang]}</p>
        </motion.div>

        {act.items.map((item, i) => (
          <StopCaption key={item.name} item={item} index={i} progress={scrollYProgress} />
        ))}

        {/* Pita rute perjalanan */}
        <div className="absolute inset-x-6 bottom-6 md:inset-x-14">
          <div className="mb-3 flex items-center justify-between">
            {act.items.map((item, i) => (
              <RouteStop key={item.name} item={item} index={i} progress={scrollYProgress} />
            ))}
          </div>
          <div className="h-px w-full bg-paper/20">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-paper" />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-paper/50">
            <span>{ui.kotaRoute[lang]}</span>
            <span>MONPERA → MASJID AGUNG</span>
          </div>
        </div>
      </div>
    </section>
  )
}
