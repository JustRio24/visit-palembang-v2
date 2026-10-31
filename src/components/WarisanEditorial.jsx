import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useLang, ui } from '../i18n.jsx'
import BurnOverlay from './BurnOverlay.jsx'

// BABAK II — SRIWIJAYA & WARISAN sebagai EDITORIAL MAJALAH bergaya arsip:
// masthead dengan garis kepala dan meta edisi, tiga dokumen arsip yang
// tersusun asimetris (lebar, arah, dan ketinggian mulai berbeda-beda),
// lalu satu UNGGULAN raksasa — Al-Qur'an Akbar — menutup babak di dasar
// section, persis di jalur overlay bakar menuju Babak III.

const reveal = {
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
}

function CatalogLine({ index, name }) {
  const { lang } = useLang()
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4 border-t border-paper/25 pt-3 font-mono text-[10px] tracking-[0.3em] text-fog">
      <span>{lang === 'id' ? 'DOK.' : 'DOC.'} {String(index + 1).padStart(2, '0')} — {ui.warisanDoc[lang]}</span>
      <span className="text-right">{name.toUpperCase()}</span>
    </div>
  )
}

function EntryText({ item, index }) {
  const { lang } = useLang()
  return (
    <div className="relative">
      <span
        aria-hidden
        className="angka-babak pointer-events-none absolute -top-16 left-0 font-display text-[7rem] leading-none font-bold select-none md:text-[9rem]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="relative font-display text-4xl leading-[1.02] font-semibold tracking-tight md:text-5xl">
        {item.name}
      </h3>
      <p className="relative mt-5 max-w-md leading-relaxed text-silver/90">{item.note[lang]}</p>
    </div>
  )
}

function ArchiveEntry({ item, index }) {
  // Tiga dokumen, tiga sikap berbeda mengikuti orientasi fotonya:
  // Museum lanskap melebar, Siguntang & Kemaro potret bergeser.
  if (index === 1) {
    return (
      <motion.figure {...reveal} className="mt-32 md:mt-40">
        <CatalogLine index={index} name={item.name} />
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="group overflow-hidden md:col-span-8">
            <img
              src={item.img}
              alt={item.name}
              tabIndex={0}
              loading="lazy"
              className="foto-perak aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <div className="md:col-span-4">
            <EntryText item={item} index={index} />
          </div>
        </div>
      </motion.figure>
    )
  }
  if (index === 0) {
    return (
      <motion.figure {...reveal} className="mt-24">
        <CatalogLine index={index} name={item.name} />
        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="order-2 md:order-1 md:col-span-5 md:pt-24">
            <EntryText item={item} index={index} />
          </div>
          <div className="group order-1 overflow-hidden md:order-2 md:col-span-6 md:col-start-7">
            <img
              src={item.img}
              alt={item.name}
              tabIndex={0}
              loading="lazy"
              className="foto-perak aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </motion.figure>
    )
  }
  return (
    <motion.figure {...reveal} className="mt-32 md:mt-40">
      <CatalogLine index={index} name={item.name} />
      <div className="grid items-center gap-8 md:grid-cols-12">
        <div className="group overflow-hidden md:col-span-5 md:col-start-2">
          <img
            src={item.img}
            alt={item.name}
            tabIndex={0}
            loading="lazy"
            className="foto-perak aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="md:col-span-5">
          <EntryText item={item} index={index} />
        </div>
      </div>
    </motion.figure>
  )
}

export default function WarisanEditorial({ act }) {
  const { lang } = useLang()
  const sectionRef = useRef(null)
  const [featured, ...rest] = [act.items[3], ...act.items.slice(0, 3)]

  return (
    <section
      ref={sectionRef}
      id={act.id}
      className="relative overflow-hidden bg-ink px-6 pt-[14vh] pb-[12vh] text-paper"
    >
      <span
        aria-hidden
        className="angka-babak pointer-events-none absolute -top-10 right-0 font-display text-[36vw] leading-none font-bold select-none"
      >
        {act.numeral}
      </span>

      <div className="relative mx-auto max-w-6xl">
        {/* Masthead edisi */}
        <motion.div {...reveal}>
          <div className="flex items-center justify-between gap-4 border-y border-paper/25 py-3 font-mono text-[10px] tracking-[0.3em] text-fog">
            <span>{act.label[lang].toUpperCase()}</span>
            <span className="hidden md:inline">{ui.warisanEdition[lang]} — {act.title[lang].toUpperCase()}</span>
            <span>{ui.warisanDocs[lang]}</span>
          </div>
          <h2 className="mt-10 font-display text-6xl leading-[0.95] font-semibold tracking-tight md:text-8xl">
            {act.titleLines[lang][0]}<br />
            {act.titleLines[lang][1]}
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-silver md:ml-auto md:text-right">
            {act.lead[lang]}
          </p>
        </motion.div>

        {/* Tiga dokumen arsip asimetris */}
        {rest.map((item, i) => (
          <ArchiveEntry key={item.name} item={item} index={i} />
        ))}

        {/* Unggulan raksasa — penutup babak, di jalur bakar */}
        <motion.figure {...reveal} className="mt-36 md:mt-44">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-t border-paper/25 pt-3 font-mono text-[10px] tracking-[0.3em] text-fog">
            <span className="text-paper">{ui.warisanFeatured[lang]} — {lang === 'id' ? 'DOK.' : 'DOC.'} 04</span>
            <span>GANDUS, PALEMBANG</span>
          </div>
          <div className="group overflow-hidden">
            <img
              src={featured.img}
              alt={featured.name}
              tabIndex={0}
              loading="lazy"
              className="foto-perak aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03] md:aspect-[16/10]"
            />
          </div>
          <figcaption className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <span className="font-display text-5xl leading-[0.98] font-semibold tracking-tight md:col-span-7 md:text-7xl">
              {featured.name}
            </span>
            <span className="leading-relaxed text-silver/90 md:col-span-5">{featured.note[lang]}</span>
          </figcaption>
        </motion.figure>
      </div>

      <BurnOverlay sectionRef={sectionRef} />
    </section>
  )
}
