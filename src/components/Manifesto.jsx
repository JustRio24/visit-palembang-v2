import { motion } from 'framer-motion'
import { useLang, ui } from '../i18n.jsx'

// CATATAN POLA: elemen yang diamati whileInView harus elemen INDAK
// (pembungkus overflow-hidden yang diam di tempat). Anak yang digeser
// 110% ke bawah tidak akan pernah terdeteksi "in view" karena terpotong
// oleh overflow induknya — animasinya tidak akan pernah mulai.
const inner = {
  hidden: { y: '110%' },
  show: (delay) => ({
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Line({ children, delay, className = '' }) {
  return (
    <motion.span
      className="block overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15% 0px' }}
      custom={delay}
    >
      <motion.span className={`block ${className}`} variants={inner}>
        {children}
      </motion.span>
    </motion.span>
  )
}

export default function Manifesto() {
  const { lang } = useLang()
  const lines = ui.manifestoLines[lang]
  return (
    <section className="bg-ink px-6 py-[26vh] text-paper">
      <div className="mx-auto max-w-5xl">
        <p className="mb-10 font-mono text-[11px] tracking-[0.35em] text-fog">
          {ui.manifestoLabel[lang]}
        </p>
        <h2 className="font-display text-4xl leading-[1.12] font-medium md:text-6xl">
          {lines.map((line, i) => (
            <Line key={line} delay={i * 0.12}>
              {line}
            </Line>
          ))}
          <Line delay={0.55} className="text-silver italic">
            {ui.manifestoLast[lang]}
          </Line>
        </h2>
      </div>
    </section>
  )
}
