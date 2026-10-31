import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang, ui } from '../i18n.jsx'

// BABAK I — SUNGAI & JEMBATAN sebagai galeri HORIZONTAL belah dua:
// section 420vh, layar terpaku; scroll vertikal menggeser rel panel.
// Tiap panel berkomposisi belah dua seperti referensi Scroll Services:
// tipografi besar di sisi kiri, foto tinggi di sisi kanan. Nama tempat
// naik dari balik topeng saat panelnya mendekati tengah; foto punya
// parallax internal ringan; garis kemajuan mengalir di dasar layar.

const PANELS = 5 // 1 judul + 4 tempat
const c01 = (n) => Math.min(1, Math.max(0, n))
const rng = (...pts) => pts.map(c01)

function IntroPanel({ act, progress }) {
  const { lang } = useLang()
  const imgX = useTransform(progress, [0, 0.25], [-24, 24])
  return (
    <div className="relative grid h-full w-screen shrink-0 grid-cols-1 items-center gap-8 px-6 pt-14 pb-24 md:grid-cols-[46%_54%] md:px-14">
      <span
        aria-hidden
        className="angka-babak pointer-events-none absolute -top-10 right-0 font-display text-[36vw] leading-none font-bold select-none"
      >
        {act.numeral}
      </span>
      <div className="relative">
        <p className="mb-6 flex items-center gap-4 font-mono text-[11px] tracking-[0.35em] text-fog">
          <span className="h-px w-12 bg-paper/40" />
          {act.label[lang].toUpperCase()} — {ui.sungaiGallery[lang]}
        </p>
        <h2 className="font-display text-6xl leading-[0.95] font-semibold tracking-tight md:text-8xl">
          {act.titleLines[lang][0]}<br />
          {act.titleLines[lang][1]}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-silver">{act.lead[lang]}</p>
        <p className="mt-10 font-mono text-[11px] tracking-[0.35em] text-paper/60">
          {ui.sungaiHint[lang]}
        </p>
      </div>
      <div className="relative hidden h-[74vh] overflow-hidden md:block">
        <motion.img
          src={act.introImg}
          alt={ui.sungaiIntroAlt[lang]}
          style={{ x: imgX }}
          tabIndex={0}
          className="foto-perak absolute inset-0 h-full w-full scale-[1.12] object-cover"
        />
        <span className="absolute bottom-4 left-4 bg-ink/60 px-3 py-1 font-mono text-[11px] tracking-[0.3em] text-paper backdrop-blur-sm">
          {ui.sungaiChip[lang]}
        </span>
      </div>
    </div>
  )
}

function ItemPanel({ act, item, index, progress }) {
  const { lang } = useLang()
  const center = (index + 1) / (PANELS - 1)
  const imgX = useTransform(progress, rng(center - 0.25, center + 0.25), [-38, 38])
  const nameY = useTransform(progress, rng(center - 0.2, center - 0.07), ['104%', '0%'])
  const fade = useTransform(progress, rng(center - 0.18, center - 0.05), [0, 1])
  const rise = useTransform(progress, rng(center - 0.18, center - 0.05), [26, 0])
  return (
    <div className="relative grid h-full w-screen shrink-0 grid-cols-1 items-center gap-6 px-6 pt-14 pb-24 md:grid-cols-[46%_54%] md:gap-10 md:px-14">
      {/* Sisi teks */}
      <div className="relative order-2 md:order-1">
        <span
          aria-hidden
          className="angka-babak pointer-events-none absolute -top-24 left-0 font-display text-[11rem] leading-none font-bold select-none md:text-[15rem]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <motion.div style={{ opacity: fade, y: rise }} className="relative">
          <p className="mb-5 font-mono text-[11px] tracking-[0.35em] text-fog">
            {ui.sungaiPlace[lang]} {String(index + 1).padStart(2, '0')} / 04 — {act.title[lang].toUpperCase()}
          </p>
        </motion.div>
        <div className="relative overflow-hidden">
          <motion.h3
            style={{ y: nameY }}
            className="font-display text-5xl leading-[0.98] font-semibold tracking-tight md:text-7xl"
          >
            {item.name}
          </motion.h3>
        </div>
        <motion.p
          style={{ opacity: fade, y: rise }}
          className="relative mt-6 max-w-md text-lg leading-relaxed text-silver"
        >
          {item.note[lang]}
        </motion.p>
      </div>

      {/* Sisi foto */}
      <div className="relative order-1 h-[36vh] overflow-hidden md:order-2 md:h-[74vh]">
        <motion.img
          src={item.img}
          alt={item.name}
          style={{ x: imgX }}
          tabIndex={0}
          className="foto-perak absolute inset-0 h-full w-full scale-[1.12] object-cover"
        />
        <span className="absolute top-4 left-4 bg-ink/60 px-3 py-1 font-mono text-[11px] tracking-[0.3em] text-paper backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')} / 04
        </span>
      </div>
    </div>
  )
}

export default function SungaiHorizontal({ act }) {
  const { lang } = useLang()
  const ref = useRef(null)

  // Scroll snap: begitu guliran berhenti di tengah babak, halaman
  // meluncur ke panel terdekat. Luncuran digerakkan animasi bingkai
  // sendiri (bukan scrollTo smooth) supaya tidak berebut dengan
  // scroll-behavior:smooth global; input pengguna di tengah luncuran
  // membatalkannya seketika, lalu penilaian snap mengulang dari posisi
  // berhenti terakhir — tidak ada lagi berhenti di tengah panel.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let timer = 0
    let animating = false
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)
    const cancel = () => {
      if (animating) {
        cancelAnimationFrame(raf)
        animating = false
      }
    }
    const trySnap = () => {
      if (animating) return
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) return
      const rect = el.getBoundingClientRect()
      const offset = Math.min(total, Math.max(0, -rect.top))
      if (offset <= 0 || offset >= total) return
      const step = total / (PANELS - 1)
      const target = Math.round(offset / step) * step
      const dist = target - offset
      if (Math.abs(dist) < 3 || Math.abs(dist) > total * 0.11) return
      const startY = window.scrollY
      const endY = startY + rect.top + target
      const t0 = performance.now()
      const dur = 480
      animating = true
      const frame = (now) => {
        const t = Math.min(1, (now - t0) / dur)
        window.scrollTo({ top: startY + (endY - startY) * easeOut(t), behavior: 'instant' })
        if (t < 1) {
          raf = requestAnimationFrame(frame)
        } else {
          animating = false
        }
      }
      raf = requestAnimationFrame(frame)
    }
    const onScroll = () => {
      if (animating) return
      clearTimeout(timer)
      timer = setTimeout(trySnap, 110)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', cancel, { passive: true })
    window.addEventListener('touchstart', cancel, { passive: true })
    window.addEventListener('keydown', cancel)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('keydown', cancel)
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [])
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-400vw'])

  return (
    <section id={act.id} ref={ref} className="relative h-[420vh] bg-ink text-paper">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-max">
          <IntroPanel act={act} progress={scrollYProgress} />
          {act.items.map((item, i) => (
            <ItemPanel key={item.name} act={act} item={item} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* Garis kemajuan perjalanan menyamping */}
        <div className="absolute right-6 bottom-6 left-6 md:right-14 md:left-14">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.35em] text-paper/50">
            <span>{act.label[lang].toUpperCase()} — {act.title[lang].toUpperCase()}</span>
            <span>{ui.sungaiFollow[lang]}</span>
          </div>
          <div className="h-px w-full bg-paper/20">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-paper" />
          </div>
        </div>
      </div>
    </section>
  )
}
