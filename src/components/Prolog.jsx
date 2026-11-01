import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.esm.jsx'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useLang, ui } from '../i18n.jsx'

// PROLOG — hero scroll-video 400vh.
// Video (sementara: Wonderful Palembang warisan v1) diputar maju-mundur
// oleh scroll; teks di atasnya dikendalikan progres yang sama.
export default function Prolog() {
  const { lang } = useLang()
  const progress = useMotionValue(0)

  const hintOpacity = useTransform(progress, [0, 0.1], [1, 0])
  const titleOpacity = useTransform(progress, [0.52, 0.82], [0, 1])
  const titleY = useTransform(progress, [0.52, 0.82], [48, 0])
  const frameOpacity = useTransform(progress, [0, 0.75], [1, 0.35])

  return (
    <section id="prolog" className="relative h-[400vh] bg-ink">
      {/* Poster frame pertama: hero tidak pernah kosong selama
          ScrollyVideo menyiapkan canvas-nya (library menggambar
          frame pertama secara asinkron; tanpa poster, muatan awal
          bisa tampil hitam sampai scroll pertama). */}
      <img
        src="/images/hero-poster.webp"
        alt=""
        aria-hidden
        className="foto-perak absolute inset-0 h-full w-full object-cover"
      />
      <div className="video-perak relative h-full">
        <ScrollyVideo
          src="/video/hero.mp4"
          onChange={(p) => progress.set(p)}
        />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-screen flex-col justify-between px-6 py-7 md:px-12">
          <motion.div
            style={{ opacity: frameOpacity }}
            className="flex items-start justify-between font-mono text-[11px] tracking-[0.25em] text-paper/80"
          >
            <span>VISIT PALEMBANG<span className="hidden sm:inline"> — V2</span></span>
            <span className="hidden sm:block">2.9761° S · 104.7754° E</span>
            <span>{ui.prologEst[lang]}</span>
          </motion.div>

          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center"
          >
            <p className="mb-5 font-mono text-[11px] tracking-[0.22em] text-paper/70 md:tracking-[0.35em]">
              {ui.prologKicker[lang]}
            </p>
            <h1 className="font-display text-[12.5vw] leading-[0.9] font-semibold tracking-tight text-paper md:text-[11rem]">
              PALEMBANG
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-display text-lg text-paper/85 italic md:text-2xl">
              {ui.prologTagline[lang]}
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: hintOpacity }}
            className="flex flex-col items-center gap-3 text-paper/80"
          >
            <span className="font-mono text-[11px] tracking-[0.35em]">
              {ui.prologHint[lang]}
            </span>
            <span className="block h-14 w-px bg-gradient-to-b from-paper/70 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
