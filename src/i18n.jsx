import { createContext, useContext, useEffect, useState } from 'react'

// DUA BAHASA — Indonesia (utama) & Inggris (pengunjung internasional).
// Bahasa aktif disimpan di localStorage dan dibagikan lewat context.
// Teks data babak tinggal di acts.js sebagai objek { id, en };
// teks antarmuka komponen tinggal di kamus `ui` di bawah ini.

const LanguageContext = createContext({ lang: 'id', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return window.localStorage.getItem('vp2-lang') === 'en' ? 'en' : 'id'
    } catch {
      return 'id'
    }
  })
  useEffect(() => {
    try {
      window.localStorage.setItem('vp2-lang', lang)
    } catch {
      /* abaikan */
    }
    document.documentElement.lang = lang
  }, [lang])
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

// Tombol pemilih bahasa — gaya mono situs, blend difference agar
// terbaca di babak gelap maupun terang.
export function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  const base = 'font-mono text-[11px] tracking-[0.25em] transition-opacity duration-300'
  return (
    <div className={`flex items-center gap-2.5 text-white mix-blend-difference ${className}`}>
      <button
        onClick={() => setLang('id')}
        aria-label="Bahasa Indonesia"
        className={`${base} ${lang === 'id' ? 'font-bold opacity-100' : 'opacity-45 hover:opacity-80'}`}
      >
        ID
      </button>
      <span className="h-3 w-px bg-white/50" aria-hidden />
      <button
        onClick={() => setLang('en')}
        aria-label="English"
        className={`${base} ${lang === 'en' ? 'font-bold opacity-100' : 'opacity-45 hover:opacity-80'}`}
      >
        EN
      </button>
    </div>
  )
}

export const ui = {
  // Prolog
  loadingJourney: { id: 'MEMUAT PERJALANAN', en: 'LOADING THE JOURNEY' },
  prologEst: { id: 'EST. 682 M', en: 'EST. 682 CE' },
  prologKicker: {
    id: 'SUMATERA SELATAN · KOTA DI ATAS AIR',
    en: 'SOUTH SUMATRA · THE CITY ON THE WATER',
  },
  prologTagline: {
    id: 'Kota tertua di Nusantara, dibelah sungai besar — dan setiap guliran adalah perjalanan menyusurinya.',
    en: 'The oldest city in the archipelago, split by a great river — and every scroll is a journey along it.',
  },
  prologHint: { id: 'GULIR — PERJALANAN DIMULAI', en: 'SCROLL — THE JOURNEY BEGINS' },
  // Manifesto
  manifestoLabel: {
    id: 'MANIFESTO — PRASASTI KEDUKAN BUKIT, 682 M',
    en: 'MANIFESTO — THE KEDUKAN BUKIT INSCRIPTION, 682 CE',
  },
  manifestoLines: {
    id: ['Ada kota yang dibangun', 'di atas tanah.', 'Palembang dibangun', 'di atas sungai —'],
    en: ['Some cities are built', 'on land.', 'Palembang was built', 'on a river —'],
  },
  manifestoLast: {
    id: 'dan sungai itu belum selesai bercerita.',
    en: 'and that river has not finished telling its story.',
  },
  // Rel navigasi
  navLabels: {
    id: ['Prolog', 'I · Sungai', 'II · Warisan', 'III · Rasa', 'IV · Kota', 'Penutup'],
    en: ['Prologue', 'I · River', 'II · Heritage', 'III · Taste', 'IV · City', 'Closing'],
  },
  // Babak I — SungaiHorizontal
  sungaiGallery: { id: 'GALERI MENYAMPING', en: 'A SIDEWAYS GALLERY' },
  sungaiHint: { id: 'GULIR — EMPAT PEMANDANGAN MENYUSUL →', en: 'SCROLL — FOUR VIEWS AHEAD →' },
  sungaiChip: { id: 'SUNGAI MUSI — TIANG PANCANG', en: 'MUSI RIVER — THE MOORING POSTS' },
  sungaiIntroAlt: { id: 'Tiang pancang kayu di Sungai Musi', en: 'Wooden mooring posts in the Musi River' },
  sungaiPlace: { id: 'TEMPAT', en: 'PLACE' },
  sungaiFollow: { id: '← GULIR UNTUK MENYUSURI MUSI →', en: '← SCROLL TO FOLLOW THE MUSI →' },
  // Babak II — WarisanEditorial
  warisanDoc: { id: 'ARSIP WARISAN', en: 'HERITAGE ARCHIVE' },
  warisanEdition: { id: 'EDISI ARSIP', en: 'ARCHIVE EDITION' },
  warisanDocs: { id: '4 DOKUMEN', en: '4 DOCUMENTS' },
  warisanFeatured: { id: 'UNGGULAN', en: 'FEATURED' },
  // Babak III — RasaShowcase
  rasaScroll: { id: 'GULIR UNTUK MENCICIPI', en: 'SCROLL TO TASTE' },
  // Babak IV — KotaStage
  kotaStop: { id: 'PEMBERHENTIAN', en: 'STOP' },
  kotaThrough: { id: 'MENYUSURI KOTA', en: 'THROUGH THE CITY' },
  kotaRoute: { id: 'RUTE BABAK IV', en: 'THE ACT IV ROUTE' },
  // Penutup — gerbang & CTA
  gateLabel: { id: 'PENUTUP — GERBANG AMPERA', en: 'CLOSING — THE AMPERA GATE' },
  gateCaption: {
    id: 'JEMBATAN AMPERA — DUA MENARA, SATU AMBANG',
    en: 'AMPERA BRIDGE — TWO TOWERS, ONE THRESHOLD',
  },
  gateHint: { id: 'GULIR — MASUK KE DALAM ↓', en: 'SCROLL — STEP INSIDE ↓' },
  insideLabel: { id: 'PENUTUP — DI DALAM GERBANG', en: 'CLOSING — INSIDE THE GATE' },
  insideCaption: { id: 'DI DALAM GERBANG — MUSI DI MALAM HARI', en: 'INSIDE THE GATE — THE MUSI AT NIGHT' },
  ctaTitleA: { id: 'Datang dan', en: 'Come and' },
  ctaTitleB: { id: 'lihat sendiri.', en: 'see for yourself.' },
  ctaBody: {
    id: 'Foto dan video hanya titipan cerita. Palembang yang sebenarnya menunggu di tepi sungainya — dengan cuko, kabut, dan cahaya yang tidak bisa diwakilkan layar.',
    en: 'Photos and videos are only borrowed stories. The real Palembang waits on its riverbanks — with cuko, mist, and light no screen can stand in for.',
  },
  ctaReplay: { id: 'Ulangi perjalanan', en: 'Replay the journey' },
  ctaV1: { id: 'Kunjungi Visit Palembang v1', en: 'Visit Palembang v1' },
  // Penutup — info praktis
  infoItems: {
    id: [
      {
        title: 'Menuju ke sini',
        body: 'Penerbangan langsung dari Jakarta dan kota besar lain ke Bandara Sultan Mahmud Badaruddin II. Dari bandara, LRT Palembang — LRT pertama di Indonesia — meluncur ke pusat kota di atas sungai.',
      },
      {
        title: 'Waktu terbaik',
        body: 'Kemarau (Juni–Agustus) untuk sungai yang tenang dan musim perayaan kota, termasuk lomba bidar di Musi. Februari membawa Cap Go Meh yang meriah di Pulau Kemaro.',
      },
      {
        title: 'Jangan pulang sebelum',
        body: 'Pempek kapal selam dengan cuko segelap malam, kopi robusta Semendo, dan — kalau sedang musimnya — durian dari kebun-kebun di seberang.',
      },
    ],
    en: [
      {
        title: 'Getting here',
        body: "Direct flights from Jakarta and other major cities to Sultan Mahmud Badaruddin II Airport. From the airport, Palembang's LRT — Indonesia's first light rail — glides into the city centre above the river.",
      },
      {
        title: 'Best time to visit',
        body: 'The dry season (June–August) for calm rivers and the city festival season, including the bidar boat races on the Musi. February brings a vibrant Cap Go Meh on Kemaro Island.',
      },
      {
        title: "Before you leave, don't miss",
        body: 'Pempek kapal selam with cuko as dark as night, Semendo robusta coffee, and — in season — durian from the groves across the river.',
      },
    ],
  },
  marqueeA: { id: 'Sampai jumpa', en: 'See you' },
  marqueeB: { id: 'di Palembang', en: 'in Palembang' },
  signoffA: { id: 'Sampai jumpa', en: 'See you' },
  signoffB: { id: 'di tepi Musi.', en: 'on the banks of the Musi.' },
  clockLabel: { id: 'WAKTU PALEMBANG SEKARANG', en: 'PALEMBANG TIME NOW' },
  clockPlace: { id: '2,99° LS — 104,76° BT · GERBANG AMPERA', en: '2.99° S — 104.76° E · THE AMPERA GATE' },
  backToTop: { id: 'KEMBALI KE HULU ↑', en: 'BACK TO THE SOURCE ↑' },
}
