# Visit Palembang v2 — Menyusuri Musi

> Sebuah perjalanan scroll sinematik satu halaman menyusuri Palembang:
> dari video Sungai Musi yang digerakkan guliran, galeri menyamping,
> halaman arsip yang terbakar, panggung rasa, sampai gerbang Ampera
> yang dimasuki pengunjung di akhir perjalanan.

**Visit Palembang v2** adalah pembangunan ulang total dari
[Visit Palembang v1](https://visit-palembang.vercel.app) — situs multi-halaman
yang dibuat untuk Web Design Competition 2025. Jika v1 adalah brosur,
v2 adalah pengalaman: satu halaman, satu perjalanan, tanpa pindah rute.

Seluruh visual diperlakukan dalam tema **Musi Perak** — monokrom perak
di atas tinta hitam. Warna asli foto dan video hanya muncul saat
pengunjung menyentuh, mengarahkan kursor, atau memfokuskannya:
kota ini berwarna bagi yang berhenti dan memperhatikan.

---

## Perjalanan

| Bagian | Isi | Mekanik |
| --- | --- | --- |
| **Prolog** | Time-lapse Jembatan Ampera senja → malam | Video 400vh yang di-*scrub* oleh scroll (ScrollyVideo); judul raksasa muncul di tengah perjalanan |
| **Manifesto** | Pernyataan tentang kota di atas sungai | Baris teks naik dari balik topeng, satu per satu |
| **Babak I — Sungai & Jembatan** | Ampera, Sungai Musi, Benteng Kuto Besak, Kampung Sekanak | Galeri **horizontal** belah dua (teks besar × foto tinggi) dengan *scroll snap* lembut per panel |
| **Babak II — Sriwijaya & Warisan** | Bukit Siguntang, Museum SMB II, Pulau Kemaro, Al-Qur'an Akbar | Editorial majalah bergaya arsip; tepi bawah halaman **terbakar** oleh api prosedural (canvas) menuju babak berikutnya |
| **Babak III — Rasa** | Pempek, Pindang Patin, Burgo, Laksan | Panggung terpaku: foto layar penuh berganti mengikuti scroll di atas kertas terang; ditutup teknik *Chronos Stack* — Babak IV menyapunya sebagai lembar baru |
| **Babak IV — Kota yang Hidup** | Monpera, Gending Sriwijaya, Tugu Belido, Masjid Agung | Panggung jalanan terpaku: foto berganti layar penuh sementara keterangan **berjalan** menyusuri kota, lengkap dengan strip rute |
| **Penutup — Gerbang Ampera** | Dua menara Ampera sebagai gerbang kota | Pengunjung mendekat, menembus celah di antara dua menara, dan tiba di Musi malam hari — di sanalah satu-satunya tombol ajakan berada |
| **Kaki** | Info praktis, jam hidup Palembang (WIB), perpisahan | Pita marquee, kartu info interaktif, wordmark raksasa |

Tidak ada foto yang dipakai dua kali di seluruh situs — setiap babak
mendapat gambarnya sendiri.

## Fitur

- **Dwibahasa ID / EN** — seluruh teks situs (termasuk keterangan foto
  dan info praktis) tersedia dalam Bahasa Indonesia dan Inggris lewat
  pemilih `ID | EN`; pilihan tersimpan di `localStorage`.
- **Tanpa scrollbar bawaan** — digantikan bilah kemajuan baca 3px di
  tepi atas layar yang mengikuti posisi scroll.
- **Warna saat hover/fokus** — semua foto monokrom secara bawaan dan
  berwarna saat dihover/difokus (`.foto-perak` / `.video-perak`).
- **Hero anti-kosong** — poster frame pertama dipasang di belakang
  video ScrollyVideo, sehingga hero tidak pernah tampil hitam selagi
  canvas video disiapkan library.
- **Aset teroptimasi** — 19 foto WebP (maks. 1920px, total ±4 MB setelah
  pemangkasan ±52% dari berkas asal) dan video hero yang di-encode
  khusus untuk scrub (keyframe rapat, tanpa audio, faststart).
- **Rel navigasi babak** di sisi kanan dengan penanda babak aktif,
  plus tautan jangkar antarbabak.

## Teknologi

| Lapisan | Pilihan |
| --- | --- |
| Kerangka | React 19 + Vite 8 |
| Gaya | Tailwind CSS v4 |
| Animasi | Framer Motion 14 (`useScroll`, `useTransform`, `useSpring`) |
| Video scrub | `scrolly-video` |
| Tipografi | Fraunces (display serif), Inter (isi), JetBrains Mono (label) |

Palet *Musi Perak*: `ink #0c0c0d` · `coal #141416` · `smoke #232326` ·
`fog #8b897f` · `silver #c8c6c1` · `paper #f2efe9`.

## Menjalankan Secara Lokal

Prasyarat: Node.js 18+ dan npm.

```bash
npm install     # pasang dependensi
npm run dev     # server pengembangan di http://localhost:5173
npm run build   # build produksi ke dist/
npm run preview # pratinjau build produksi
```

## Struktur Proyek

```
project1/
├── public/
│   ├── images/
│   │   ├── gallery/        # 19 foto babak (WebP)
│   │   └── hero-poster.webp
│   └── video/
│       ├── hero.mp4        # encode khusus scrub (yang dipakai situs)
│       └── ampera.mp4      # rekaman sumber time-lapse Ampera
├── src/
│   ├── App.jsx             # komposisi perjalanan + LanguageProvider
│   ├── i18n.jsx            # konteks bahasa, kamus UI, pemilih ID | EN
│   ├── index.css           # token Musi Perak, aturan foto-perak, marquee
│   ├── data/
│   │   └── acts.js         # data babak dwibahasa { id, en }
│   └── components/
│       ├── Prolog.jsx          # hero video scrub 400vh
│       ├── Manifesto.jsx
│       ├── SungaiHorizontal.jsx # Babak I — galeri menyamping + snap
│       ├── WarisanEditorial.jsx # Babak II — editorial arsip
│       ├── BurnOverlay.jsx      # transisi terbakar (canvas prosedural)
│       ├── RasaShowcase.jsx     # Babak III — panggung rasa terpaku
│       ├── KotaStage.jsx        # Babak IV — panggung jalanan terpaku
│       ├── Penutup.jsx          # gerbang Ampera + kaki hidup
│       ├── NavRail.jsx          # rel navigasi + pemilih bahasa
│       └── ScrollProgress.jsx   # bilah kemajuan di tepi atas
└── arsip-aset-v1/          # berkas foto asli sebelum optimasi (di luar public/)
```

## Cara Kerja Dwibahasa

- `src/data/acts.js` menyimpan setiap label, judul, lead, dan catatan
  sebagai objek `{ id, en }`; nama tempat dan hidangan tidak diterjemahkan.
- `src/i18n.jsx` menyediakan `LanguageProvider`, hook `useLang()`, kamus
  `ui` untuk teks antarmuka, dan komponen `LangToggle`.
- Bahasa awal mengikuti `localStorage` (`vp2-lang`), bawaan `id`, dan
  tercermin ke atribut `lang` dokumen.

## Aset & Lisensi

Situs ini memakai karya berlisensi bebas; atribusi lengkap disimpan di sini.

- **Video Prolog** — time-lapse Jembatan Ampera oleh **Johar Palacita**
  via Pexels (lisensi Pexels). Berkas sumber: `public/video/ampera.mp4`.
- **Foto pembuka Babak I** (tiang pancang Sungai Musi) — **Cynthia.veronica**
  via Wikimedia Commons, CC BY-SA 4.0.
- **Foto gerbang Penutup** (Ampera & LRT) — **Gaudi Renanda** via Wikimedia
  Commons, CC BY-SA 4.0.
- **Foto di dalam gerbang** (Ampera malam hari) — **Gunawan Kartapranata**
  via Wikimedia Commons, CC BY-SA 3.0.
- **Foto-foto pengganti babak** — via Wikimedia Commons (CC BY / CC BY-SA):
  D.W. Fisher-Freberg, fitri agung, Oka1302, The Bangsawan, Midori,
  Swarabakti, Gunawan Kartapranata, Amr.photos, Cendy00.
- **Gending Sriwijaya** — foto warisan v1 (540×720) yang diperbesar 2×
  dengan upscaler AI (EDSR) menjadi 1080×1440; hingga kini tidak ditemukan
  foto tarian ini berlisensi bebas pada resolusi lebih tinggi. Berkas asli
  tersimpan di `arsip-aset-v1/`.
- Sebagian foto lain diwarisi dari repositori v1
  ([JustRio24/Visit-Palembang](https://github.com/JustRio24/Visit-Palembang)).

## Catatan Teknis

Tiga pelajaran yang dibayar mahal selama pengembangan, dicatat agar
tidak terulang:

1. **ScrollyVideo mengukur scroll dari induk langsungnya.** Elemen induk
   komponen adalah rel pengukurnya — membungkusnya dengan div biasa yang
   tidak setinggi rel akan meruntuhkan sticky dan membuat persentase
   scroll selalu 0.
2. **Rentang `useTransform` Framer Motion wajib di dalam [0, 1].** Satu
   titik di luar rentang membuat WAAPI melempar galat dan seluruh
   halaman kosong; semua rentang di proyek ini dijepit dengan helper `rng`.
3. **`whileInView` tidak boleh menempel pada anak yang digeser** di dalam
   induk `overflow-hidden` — IntersectionObserver akan menilai anak itu
   terpotong habis dan animasi tidak pernah mulai. Amati induknya,
   animasikan anaknya lewat `variants`.

## Status

v2 selesai sebagai situs pengalaman satu halaman dan siap ditinjau.
Pengembangan lanjutan yang masih terbuka: pemecahan bundel JS
(code-splitting) dan keputusan target penyebaran produksi.
