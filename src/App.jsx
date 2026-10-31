import { Fragment } from 'react'
import NavRail from './components/NavRail.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Prolog from './components/Prolog.jsx'
import Manifesto from './components/Manifesto.jsx'
import RasaShowcase from './components/RasaShowcase.jsx'
import SungaiHorizontal from './components/SungaiHorizontal.jsx'
import WarisanEditorial from './components/WarisanEditorial.jsx'
import KotaStage from './components/KotaStage.jsx'
import Penutup from './components/Penutup.jsx'
import { acts } from './data/acts.js'
import { LangToggle, LanguageProvider } from './i18n.jsx'

// Visit Palembang v2 — satu perjalanan scroll:
// Prolog (video) → Manifesto → Babak I–IV → Penutup.
// Babak I memakai galeri horizontal SungaiHorizontal;
// Babak II memakai editorial majalah WarisanEditorial;
// Babak III (Rasa) memakai panggung sticky RasaShowcase;
// Babak IV memakai panggung jalanan terpaku KotaStage.
// Di dalam Babak II tinggal overlay bakar (BurnOverlay) yang
// membakarnya dari dalam saat digulir menuju Babak III.
export default function App() {
  return (
    <LanguageProvider>
    <main className="bg-ink font-sans">
      <ScrollProgress />
      <NavRail />
      <LangToggle className="fixed top-5 left-1/2 z-50 -translate-x-1/2 md:hidden" />
      <Prolog />
      <Manifesto />
      {acts.map((act) => (
        <Fragment key={act.id}>
          {act.id === 'sungai' ? (
            <SungaiHorizontal act={act} />
          ) : act.id === 'warisan' ? (
            <WarisanEditorial act={act} />
          ) : act.id === 'rasa' ? (
            <RasaShowcase act={act} />
          ) : act.id === 'kota' ? (
            // Lembaran penutup Chronos: Babak IV ditarik naik satu layar
            // menimpa panggung Rasa yang terpaku, dengan bayangan di tepi atasnya.
            <div className="relative z-10 -mt-[100vh] shadow-[0_-48px_90px_rgba(0,0,0,0.55)]">
              <KotaStage act={act} />
            </div>
          ) : null}
        </Fragment>
      ))}
      <Penutup />
    </main>
    </LanguageProvider>
  )
}
