import { useEffect, useState } from 'react'
import { LangToggle, useLang, ui } from '../i18n.jsx'

const SECTIONS = ['prolog', 'sungai', 'warisan', 'rasa', 'kota', 'penutup']

// Rel navigasi vertikal di kanan — ala Zhulong, memakai blend difference
// supaya tetap terbaca di babak gelap maupun babak terang.
export default function NavRail() {
  const { lang } = useLang()
  const [active, setActive] = useState('prolog')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 mix-blend-difference md:block">
      <div className="mb-6 flex justify-end pr-0.5">
        <LangToggle />
      </div>
      <ul className="flex flex-col items-end gap-4">
        {SECTIONS.map((id, i) => (
          <li key={id}>
            <button
              onClick={() =>
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group flex items-center gap-3 text-white"
            >
              <span
                className={`font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity duration-300 ${
                  active === id ? 'opacity-90' : 'opacity-0 group-hover:opacity-60'
                }`}
              >
                {ui.navLabels[lang][i]}
              </span>
              <span
                className={`block rounded-full border border-white transition-all duration-300 ${
                  active === id
                    ? 'h-2.5 w-2.5 bg-white'
                    : 'h-2 w-2 bg-transparent group-hover:bg-white/40'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
