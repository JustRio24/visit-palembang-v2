import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang, ui } from '../i18n.jsx'

// PRELOADER — tirai pembuka perjalanan.
// Menutup layar selama aset kunci dimuat (poster hero, kesiapan video,
// window load), dengan penghitung persen yang bergerak halus mengejar
// tonggak muat yang nyata — bukan animasi pura-pura. Selama memuat,
// sapaan "halo" keliling dunia bergantian tampil; begitu muatan tuntas,
// penutupnya selalu dua sapaan terakhir: Hello, lalu Halo — pulang ke
// rumah. Setelah itu tirai terangkat dan Prolog sudah hidup di baliknya.
// Jaring pengaman: tirai pergi maks. 6 detik apa pun yang terjadi.

// Sapaan keliling dunia yang berputar selama pemuatan
const GREETINGS = [
  { word: 'こんにちは', lang: '日本語' },
  { word: '안녕하세요', lang: '한국어' },
  { word: 'Bonjour', lang: 'Français' },
  { word: 'Hola', lang: 'Español' },
  { word: '你好', lang: '中文' },
  { word: 'مرحبا', lang: 'العربية' },
  { word: 'Ciao', lang: 'Italiano' },
  { word: 'Olá', lang: 'Português' },
  { word: 'Привет', lang: 'Русский' },
  { word: 'สวัสดี', lang: 'ไทย' },
  { word: 'Xin chào', lang: 'Tiếng Việt' },
  { word: 'Hallo', lang: 'Deutsch' },
]

// Dua sapaan penutup — selalu tampil terakhir, apa pun kecepatan muatnya
const FINALE = [
  { word: 'Hello', lang: 'English' },
  { word: 'Halo', lang: 'Indonesia' },
]

export default function Preloader() {
  const { lang } = useLang()
  const [progress, setProgress] = useState(0)
  const [gone, setGone] = useState(false)
  const [greetIdx, setGreetIdx] = useState(0)
  const [finaleIdx, setFinaleIdx] = useState(-1) // -1 = belum penutup
  const targetRef = useRef(8)
  const shownRef = useRef(0)
  const finaleStartedRef = useRef(false)

  // Sapaan dunia bergantian selama memuat & belum masuk penutup
  useEffect(() => {
    if (gone || finaleIdx >= 0) return
    const t = setInterval(() => setGreetIdx((i) => (i + 1) % GREETINGS.length), 800)
    return () => clearInterval(t)
  }, [gone, finaleIdx])

  useEffect(() => {
    finaleStartedRef.current = false
    const timeouts = []
    const bump = (v) => {
      targetRef.current = Math.max(targetRef.current, v)
    }

    // Tonggak 1: DOM siap
    if (document.readyState !== 'loading') bump(30)
    else document.addEventListener('DOMContentLoaded', () => bump(30), { once: true })

    // Tonggak 2: poster hero termuat (lukisan pertama Prolog)
    const img = new Image()
    img.onload = () => bump(55)
    img.onerror = () => bump(55)
    img.src = '/images/hero-poster.webp'

    // Tonggak 3: video hero cukup data untuk diputar (berbagi cache
    // HTTP dengan elemen video ScrollyVideo, tidak mengunduh dua kali)
    const probe = document.createElement('video')
    probe.preload = 'auto'
    probe.muted = true
    probe.src = '/video/hero.mp4'
    const onCanPlay = () => bump(82)
    probe.addEventListener('canplay', onCanPlay)

    // Tonggak 4: seluruh jendela termuat
    if (document.readyState === 'complete') bump(100)
    else window.addEventListener('load', () => bump(100), { once: true })

    // Jaring pengaman mutlak
    const failsafe = setTimeout(() => bump(100), 6000)

    // Kunci scroll selama tirai turun
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    let raf
    const finish = () => {
      cancelAnimationFrame(raf)
      clearTimeout(failsafe)
      timeouts.forEach(clearTimeout)
      document.body.style.overflow = prevOverflow
      setGone(true)
    }

    // Muatan tuntas → putar dua sapaan penutup, baru angkat tirai
    const startFinale = () => {
      if (finaleStartedRef.current) return
      finaleStartedRef.current = true
      cancelAnimationFrame(raf)
      setProgress(100)
      setFinaleIdx(0)
      timeouts.push(setTimeout(() => setFinaleIdx(1), 700))
      timeouts.push(setTimeout(finish, 1400))
    }

    // Angka tampil mengejar target dengan peluruhan halus
    const tick = () => {
      const t = targetRef.current
      let cur = shownRef.current
      if (cur < t) {
        cur = Math.min(t, cur + Math.max(0.35, (t - cur) * 0.045))
        shownRef.current = cur
        setProgress(Math.floor(cur))
      }
      if (cur >= 99.5 && t >= 100) {
        startFinale()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(failsafe)
      timeouts.forEach(clearTimeout)
      document.body.style.overflow = prevOverflow
      probe.removeEventListener('canplay', onCanPlay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const greeting = finaleIdx >= 0 ? FINALE[finaleIdx] : GREETINGS[greetIdx]
  const greetKey = finaleIdx >= 0 ? `finale-${finaleIdx}` : `world-${greetIdx}`

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-7 text-paper md:px-12"
        >
          {/* Bar atas — gema bar Prolog */}
          <div className="flex items-start justify-between font-mono text-[11px] tracking-[0.25em] text-paper/70">
            <span>
              VISIT PALEMBANG<span className="hidden sm:inline"> — V2</span>
            </span>
            <span>{ui.prologEst[lang]}</span>
          </div>

          {/* Sapaan bergantian — keliling dunia, pulang ke Halo */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={greetKey}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-[13vw] leading-[1.05] font-semibold whitespace-nowrap md:text-8xl">
                  {greeting.word}
                </p>
                <p className="mt-5 font-mono text-[11px] tracking-[0.35em] text-paper/50 uppercase">
                  {greeting.lang}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bar bawah — label, garis kemajuan, persen */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <span className="font-mono text-[10px] tracking-[0.3em] text-paper/60">
                {ui.loadingJourney[lang]}
              </span>
              <span className="font-mono text-sm tracking-[0.2em] text-paper tabular-nums">
                {progress}%
              </span>
            </div>
            <div className="h-px w-full bg-paper/15">
              <div
                className="h-full bg-paper transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
