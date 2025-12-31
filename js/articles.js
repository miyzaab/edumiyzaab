// Data Artikel Manual (Tanpa Database)
// Edit bagian ini untuk menambah/mengubah artikel
const articles = [
  {
    "id": 1,
    "title": "Empat Permohonan Penduduk Neraka",
    "author": "Zia Abdurrofi",
    "date": "28 Jan 2024",
    "thumb": "thumb-1",
    "content": "<p class=\"lead\">Allah Ta’ala telah mempersiapkan dan menjanjikan untuk orang-orang yang beriman dan beramal saleh sebuah ganjaran yang sangat indah berupa surga-Nya.</p><p>Namun bagi penduduk neraka, mereka memiliki permohonan yang menyayat hati. Setidaknya Allah menyebutkan empat permohonan mereka dalam Al-Qur'an:</p><h3>Pertama: Minta Dikeluarkan</h3><p>\"Ya Rabb kami, keluarkanlah kami daripadanya (neraka)...\" (QS. Al-Mu’minun: 107). Namun Allah menjawab: \"Tinggallah dengan hina di dalamnya, dan janganlah kamu berbicara dengan Aku.\"</p><h3>Kedua: Minta Dimatikan</h3><p>Mereka berseru kepada Malaikat Malik: \"Biarlah Rabbmu membunuh kami saja.\" Namun dijawab: \"Kamu akan tetap tinggal (di neraka ini).\" (QS. Az-Zukhruf: 77)</p><h3>Ketiga: Minta Keringanan Azab Sehari</h3><p>Mereka meminta kepada penjaga Jahanam agar diringankan azab sehari saja. Namun permintaan ini pun ditolak karena mereka telah mendustakan para Rasul. (QS. Ghafir: 49-50)</p><h3>Keempat: Minta Air Penduduk Surga</h3><p>Penghuni neraka menyeru penghuni surga meminta limpahan air. Namun penghuni surga menjawab: \"Sesungguhnya Allah telah mengharamkan keduanya itu atas orang-orang kafir.\" (QS. Al-A’raf: 50)</p><blockquote>\"Sesungguhnya sehari di sisi Rabbmu adalah seperti seribu tahun menurut perhitunganmu.\" (QS. Al-Hajj: 47)</blockquote><p>Semoga kita terlindung dari api neraka. Aamiin.</p>"
  },
  {
    "id": 2,
    "title": "Bahaya Lisan Tak Terjaga",
    "author": "Ustadz Firanda Andirja",
    "date": "25 Des 2025",
    "thumb": "thumb-2",
    "content": "<p class=\"lead\">Nabi Muhammad ﷺ bersabda: \"Barangsiapa yang beriman kepada Allah dan Hari Akhir, maka hendaklah ia berkata baik atau diam.\" (HR. Bukhari)</p><p>Lisan adalah nikmat yang agung, namun juga bisa menjadi sebab utama seseorang terjerumus ke dalam neraka. Betapa banyak permusuhan, perceraian, dan pertumpahan darah yang bermula dari lisan yang tidak dijaga.</p><h3>Penyakit Lisan</h3><p>Beberapa penyakit lisan yang harus diwaspadai:</p><ul><li><strong>Ghibah</strong>: Membicarakan keburukan saudara kita di belakangnya.</li><li><strong>Namimah</strong>: Mengadu domba antara dua pihak.</li><li><strong>Dusta</strong>: Berkata tidak sesuai dengan kenyataan.</li></ul><p>Seorang muslim yang cerdas adalah yang mampu mengendalikan lisannya. Ia berpikir sebelum berucap. Jika ucapannya bermanfaat, ia bicara. Jika tidak, ia memilih diam.</p>"
  },
  {
    "id": 3,
    "title": "Birrul Walidain: Jalan ke Surga",
    "author": "Ustadz Syafiq Basalamah",
    "date": "20 Des 2025",
    "thumb": "thumb-3",
    "content": "<p class=\"lead\">\"Ridhanya Allah terletak pada ridhanya orang tua, dan murkanya Allah terletak pada murkanya orang tua.\" (HR. Tirmidzi)</p><p>Berbakti kepada kedua orang tua (Birrul Walidain) adalah amalan yang paling dicintai Allah setelah shalat tepat waktu. Bahkan, jihad fi sabilillah pun terkadang harus didahulukan dengan izin orang tua.</p><h3>Cara Berbakti</h3><p>Berbakti tidak hanya saat mereka hidup, tapi juga setelah mereka wafat:</p><ul><li>Mentaati perintah mereka selama bukan maksiat.</li><li>Berbicara dengan sopan dan penuh kasih sayang.</li><li>Mendoakan ampunan untuk mereka.</li><li>Menyambung silaturahmi dengan kerabat mereka.</li></ul><p>Jangan sampai kesibukan dunia membuat kita lalai dari pintu surga yang paling tengah ini. Muliakanlah orang tuamu, niscaya anak-anakmu kelak akan memuliakanmu.</p>"
  },
  {
    "id": 4,
    "title": "Tafsir Surat Al-Fatihah",
    "author": "Admin",
    "date": "18 Sep 2025",
    "thumb": "thumb-2",
    "content": "<p class=\"lead\">Surat Al-Fatihah disebut sebagai Ummul Kitab (Induk Al-Kitab) karena mencakup seluruh tujuan utama dari Al-Qur'an.</p><h3>Pelajaran Utama</h3><ul><li><strong>Tauhid</strong>: Ayat-ayat awal menetapkan Rububiyah dan Uluhiyah Allah.</li><li><strong>Hukum</strong>: \"Iyyaka na'budu\" (Hanya kepada-Mu kami menyembah) adalah dasar syariat.</li><li><strong>Kisah & Janji</strong>: Menyebutkan jalan orang-orang yang diberi nikmat (Nabi & Rasul) dan jalan yang dimurkai.</li></ul><p>Membaca Al-Fatihah adalah rukun shalat. Tanpa membacanya, shalat seseorang tidak sah. Maka pahamilah maknanya agar shalat kita lebih khusyu.</p>"
  },
  {
    "id": 5,
    "title": "Panduan Shalat Khusyu",
    "author": "Abdullah",
    "date": "15 Sep 2025",
    "thumb": "thumb-3",
    "content": "<p class=\"lead\">\"Jadikanlah sabar dan shalat sebagai penolongmu. Dan sesungguhnya yang demikian itu sungguh berat, kecuali bagi orang-orang yang khusyu.\" (QS. Al-Baqarah: 45)</p><p>Khusyu adalah ruhnya shalat. Shalat tanpa khusyu ibarat jasad tanpa nyawa. Hati yang lalai tidak akan mendapatkan ketenangan dari shalatnya.</p><h3>Tips Khusyu:</h3><ol><li>Mengerti arti bacaan shalat.</li><li>Menghadirkan perasaan sedang berdiri di hadapan Allah.</li><li>Tumakninah (tenang) dalam setiap gerakan.</li><li>Mengingat kematian.</li></ol><p>Mulailah latih hati kita untuk fokus hanya kepada Allah saat takbiratul ihram berkumandang.</p>"
  },
  {
    "id": 6,
    "title": "Kisah Nabi Musa dan Khidir",
    "author": "Zia Abdurrofi",
    "date": "12 Sep 2025",
    "thumb": "thumb-1",
    "content": "<p class=\"lead\">Kisah pertemuan Nabi Musa AS dan Khidir AS dalam surat Al-Kahfi mengajarkan kita bahwa ilmu Allah sangat luas, melampaui logika manusia.</p><h3>Tiga Peristiwa Aneh</h3><p>Khidir melakukan tiga hal yang membuat Musa tidak sabar:</p><ul><li>Ql: Melubangi perahu orang miskin (Ternyata untuk menyelamatkan perahu dari raja dzalim).</li><li>Q2: Membunuh anak kecil (Ternyata anak itu akan murtad dan menyusahkan orang tuanya yang saleh).</li><li>Q3: Memperbaiki dinding rumah tanpa upah (Ternyata ada harta anak yatim di bawahnya).</li></ul><p>Hikmahnya: Jangan terburu-buru menghakimi takdir Allah. Apa yang menurut kita buruk, bisa jadi itu adalah kebaikan yang tersembunyi.</p>"
  }
];

// Dispatch event agar halaman lain tahu data sudah siap
// (Diberi sedikit delay agar script di HTML sempat load)
setTimeout(() => {
  window.dispatchEvent(new Event('articlesLoaded'));
}, 50);

// Helper function untuk mengambil artikel (opsional, karena variabel 'articles' sudah global)
function getArticles() {
  return Promise.resolve(articles);
}
