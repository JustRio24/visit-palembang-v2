import { useRef } from 'react'
import { motion } from 'framer-motion'
import BurnOverlay from './BurnOverlay.jsx'

// Satu babak: kepala babak (label, judul besar, lead) + kisi tempat.
// Tema 'dark' di atas tinta, 'light' di atas kertas (Babak III — Rasa).
export default function ActSection({ act }) {
  const light = act.theme === 'light'
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      id={act.id}
      className={`relative overflow-hidden px-6 py-[16vh] ${
        light ? 'bg-paper text-ink' : 'bg-ink text-paper'
      }`}
    >
      <span
        aria-hidden
        className="angka-babak pointer-events-none absolute -top-10 right-0 font-display text-[36vw] leading-none font-bold select-none"
      >
        {act.numeral}
      </span>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className={`mb-6 flex items-center gap-4 font-mono text-[11px] tracking-[0.35em] ${
              light ? 'text-ink/60' : 'text-fog'
            }`}
          >
            <span className={`h-px w-12 ${light ? 'bg-ink/40' : 'bg-paper/40'}`} />
            {act.label.toUpperCase()}
          </p>
          <h2 className="font-display text-5xl leading-[0.95] font-semibold tracking-tight md:text-8xl">
            {act.title}
          </h2>
          <p
            className={`mt-8 max-w-2xl text-lg leading-relaxed ${
              light ? 'text-ink/70' : 'text-silver'
            }`}
          >
            {act.lead}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {act.items.map((item, i) => (
            <motion.figure
              key={item.name}
              className={i === 0 ? 'md:col-span-2' : ''}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.85, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  tabIndex={0}
                  loading="lazy"
                  className={`foto-perak w-full object-cover transition duration-700 group-hover:scale-[1.04] ${
                    i === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'
                  }`}
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-display text-2xl font-semibold">
                  {item.name}
                </span>
                <span
                  className={`max-w-xl leading-relaxed ${
                    light ? 'text-ink/65' : 'text-silver/85'
                  }`}
                >
                  {item.note}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {act.id === 'warisan' && <BurnOverlay sectionRef={sectionRef} />}
    </section>
  )
}
