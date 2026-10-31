// Data babak Visit Palembang v2 — DWIBAHASA (id utama, en untuk
// pengunjung internasional). Setiap teks adalah objek { id, en };
// komponen membacanya dengan bahasa aktif dari i18n.jsx.
export const acts = [
  {
    id: 'sungai',
    numeral: 'I',
    introImg: '/images/gallery/sungai-musi-pancang.webp',
    label: { id: 'Babak I', en: 'Act I' },
    title: { id: 'Sungai & Jembatan', en: 'The River & the Bridge' },
    titleLines: { id: ['Sungai &', 'Jembatan'], en: ['The River &', 'the Bridge'] },
    theme: 'dark',
    lead: {
      id: 'Sungai Musi membelah kota ini menjadi Seberang Ilir dan Seberang Ulu — dan selama berabad-abad, seluruh kehidupan Palembang mengalir di atasnya. Di sinilah perjalanan selalu dimulai: dari air.',
      en: "The Musi River splits this city into Seberang Ilir and Seberang Ulu — and for centuries, all of Palembang's life has flowed upon it. This is where every journey begins: on the water.",
    },
    items: [
      {
        name: 'Jembatan Ampera',
        note: {
          id: 'Ikon kota sejak 1965: dua menara baja menjulang di tengah Musi, mengangkat bentang jembatan di antara Ilir dan Ulu. Paling syahdu saat kabut pagi menipis, atau lampu malam memantul berbaris di permukaan air.',
          en: "The city's icon since 1965: two steel towers rising from the middle of the Musi, lifting the bridge deck between Ilir and Ulu. Loveliest as the morning mist thins, or when the night lights reflect in rows upon the water.",
        },
        img: '/images/gallery/bg_ampera.webp',
      },
      {
        name: 'Sungai Musi',
        note: {
          id: 'Sekitar 750 kilometer dari Pegunungan Barisan ke Selat Bangka, arusnya mengangkut perahu ketek, rakit, dan tongkang yang hilir-mudik tanpa henti. Inilah jalan raya pertama Palembang — jauh sebelum ada aspal.',
          en: "Some 750 kilometres from the Barisan Mountains to the Bangka Strait, its current carries ketek boats, rafts, and barges endlessly back and forth. This was Palembang's first highway — long before asphalt.",
        },
        img: '/images/gallery/musiriver.webp',
      },
      {
        name: 'Benteng Kuto Besak',
        note: {
          id: 'Benteng Kesultanan Palembang Darussalam dari abad ke-18, berdinding tebal dan berdiri menghadap langsung ke sungai. Plasanya yang luas kini menjadi panggung terbuka kota, tempat warga berkumpul menunggu senja di tepian Musi.',
          en: "The 18th-century fortress of the Palembang Darussalam Sultanate, thick-walled and facing the river head-on. Its broad plaza is now the city's open-air stage, where locals gather to wait for dusk on the banks of the Musi.",
        },
        img: '/images/gallery/bkb.webp',
      },
      {
        name: 'Kampung Sekanak',
        note: {
          id: 'Tepian anak sungai yang ditata dengan rumah-rumah warna-warni, mural di dinding, dan tangga batu yang turun langsung ke air. Wajah kampung sungai Palembang hari ini: jemuran di pagar, perahu kecil tertambat, anak-anak bermain di bibir kali.',
          en: "A tributary bank dressed in colourful houses, murals on the walls, and stone steps leading straight down to the water. The face of Palembang's river kampongs today: laundry on the fence, small boats moored, children playing at the water's edge.",
        },
        img: '/images/gallery/SekanakRiver.webp',
      },
    ],
  },
  {
    id: 'warisan',
    numeral: 'II',
    label: { id: 'Babak II', en: 'Act II' },
    title: { id: 'Sriwijaya & Warisan', en: 'Srivijaya & Heritage' },
    titleLines: { id: ['Sriwijaya &', 'Warisan'], en: ['Srivijaya &', 'Heritage'] },
    theme: 'dark',
    lead: {
      id: 'Pada 682 Masehi, dari bukit di barat kota ini, sebuah prasasti dipahat dan sebuah imperium maritim bernama Sriwijaya mulai berlayar menguasai selat-selat Asia Tenggara. Jejaknya masih bisa didatangi satu per satu.',
      en: 'In 682 CE, on a hill west of this city, an inscription was carved and a maritime empire named Srivijaya set sail to rule the straits of Southeast Asia. Its traces can still be visited, one by one.',
    },
    items: [
      {
        name: 'Bukit Siguntang',
        note: {
          id: 'Bukit keramat setinggi 27 meter — titik tertinggi kota dan tempat Prasasti Kedukan Bukit ditemukan, akta kelahiran Sriwijaya.',
          en: "A sacred hill 27 metres high — the city's highest point and the place where the Kedukan Bukit Inscription was found, Srivijaya's birth certificate.",
        },
        img: '/images/gallery/bukitsiguntang.webp',
      },
      {
        name: 'Museum Sultan Mahmud Badaruddin II',
        note: {
          id: 'Istana kesultanan bergaya kolonial di tepi Musi, kini menyimpan koleksi perjalanan Palembang dari Sriwijaya sampai republik.',
          en: "A colonial-style sultanate palace on the banks of the Musi, now holding the collection of Palembang's journey from Srivijaya to the republic.",
        },
        img: '/images/gallery/museumSultan.webp',
      },
      {
        name: 'Pulau Kemaro',
        note: {
          id: 'Delta kecil di tengah Musi dengan pagoda sembilan lantai dan legenda cinta Siti Fatimah — ramai saat Cap Go Meh.',
          en: 'A small delta in the middle of the Musi with a nine-storey pagoda and the love legend of Siti Fatimah — thronged during Cap Go Meh.',
        },
        img: '/images/gallery/kemaroisland.webp',
      },
      {
        name: "Al-Qur'an Akbar",
        note: {
          id: "Mushaf raksasa ukiran kayu tembesu setinggi belasan meter di Gandus — disebut Al-Qur'an ukir kayu terbesar di dunia.",
          en: "A giant mushaf carved from tembesu wood, over ten metres tall, in Gandus — said to be the largest wooden carved Qur'an in the world.",
        },
        img: '/images/gallery/Al-QuranAkbar.webp',
      },
    ],
  },
  {
    id: 'rasa',
    numeral: 'III',
    label: { id: 'Babak III', en: 'Act III' },
    title: { id: 'Rasa', en: 'Taste' },
    theme: 'light',
    lead: {
      id: 'Palembang adalah satu dari sedikit kota di Indonesia yang identitasnya bisa dimakan. Adonan ikan dan sagu, kuah udang dan nanas — rasa di sini adalah arsip yang hidup.',
      en: "Palembang is one of the few Indonesian cities whose identity you can eat. Fish and sago dough, prawn and pineapple broth — here, flavour is a living archive.",
    },
    items: [
      {
        name: 'Pempek',
        note: {
          id: "Ikan giling dan sagu dalam banyak bentuk — kapal selam, lenjer, ada'an — selalu dengan cuko yang pedas, asam, dan gelap.",
          en: 'Ground fish and sago in many forms — kapal selam, lenjer, adaan — always with cuko: spicy, sour, and dark.',
        },
        img: '/images/gallery/Pempek.webp',
      },
      {
        name: 'Pindang Patin',
        note: {
          id: 'Patin sungai dalam kuah bening nanas dan kemangi. Asam segarnya rasa khas tepian Musi.',
          en: "River catfish in a clear broth of pineapple and basil. Its fresh sourness is the taste of the Musi's banks.",
        },
        img: '/images/gallery/Pindang Patin.webp',
      },
      {
        name: 'Burgo',
        note: {
          id: 'Dadar tepung beras yang digulung, disiram kuah santan ikan — sarapan klasik yang makin langka.',
          en: 'Rolled rice-flour pancakes ladled with a coconut fish gravy — a classic breakfast that grows rarer by the year.',
        },
        img: '/images/gallery/burgo.webp',
      },
      {
        name: 'Laksan',
        note: {
          id: 'Sepupu pempek yang disiram kuah santan pedas kemerahan — bukti dapur Melayu Palembang yang kaya rempah.',
          en: "Pempek's cousin, bathed in a reddish spicy coconut gravy — proof of Palembang Malay kitchens rich in spice.",
        },
        img: '/images/gallery/Laksan.webp',
      },
    ],
  },
  {
    id: 'kota',
    numeral: 'IV',
    label: { id: 'Babak IV', en: 'Act IV' },
    title: { id: 'Kota yang Hidup', en: 'The Living City' },
    titleLines: { id: ['Kota yang', 'Hidup'], en: ['The Living', 'City'] },
    theme: 'dark',
    lead: {
      id: 'Di luar buku sejarah, Palembang adalah kota yang bergerak: monumen perjuangan, tari pembuka pesta, dan malam yang menyala di sepanjang sungai.',
      en: 'Beyond the history books, Palembang is a city in motion: a monument of struggle, a dance that opens every feast, and nights that glow along the river.',
    },
    items: [
      {
        name: 'Monpera',
        note: {
          id: 'Monumen Perjuangan Rakyat di jantung kota — penanda pertempuran lima hari lima malam tahun 1947.',
          en: "The People's Struggle Monument in the heart of the city — marking the five days and five nights of battle in 1947.",
        },
        img: '/images/gallery/Monpera.webp',
      },
      {
        name: 'Gending Sriwijaya',
        note: {
          id: 'Tari penyambutan tamu agung dengan tepak sirih — gerak lambat penuh tata krama dari masa kesultanan.',
          en: 'A welcoming dance for honoured guests, bearing the tepak sirih — slow movements full of courtesy from the sultanate era.',
        },
        img: '/images/gallery/GendingSriwijaya.webp',
      },
      {
        name: 'Tugu Belido',
        note: {
          id: 'Ikan belido, penghuni asli Musi yang kini langka, diabadikan sebagai tugu di tepian sungai.',
          en: 'The belido, a native Musi fish now rare, immortalised as a monument on the riverbank.',
        },
        img: '/images/gallery/TuguBelido.webp',
      },
      {
        name: 'Masjid Agung',
        note: {
          id: 'Masjid Sultan Mahmud Badaruddin I dari abad ke-18 — menara dan atap berundaknya memadukan Melayu, Cina, dan Eropa.',
          en: 'The Grand Mosque of Sultan Mahmud Badaruddin I, from the 18th century — its minaret and tiered roof blend Malay, Chinese, and European influences.',
        },
        img: '/images/gallery/masjidAgung.webp',
      },
    ],
  },
]
