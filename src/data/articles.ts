import { Article } from '@/lib/types'

export const articles: Article[] = [
  {
    id: '1',
    title: 'Mengenal Perbedaan Hukum Perdata dan Hukum Pidana',
    slug: 'perbedaan-hukum-perdata-dan-pidana',
    excerpt: 'Dua cabang hukum utama yang wajib dipahami. Perdata mengatur hubungan antarindividu, pidana mengatur sanksi atas pelanggaran aturan negara.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Hukum Sehari-hari', slug: 'hukum-sehari-hari' },
    tags: [
      { name: 'Perdata', slug: 'perdata' },
      { name: 'Pidana', slug: 'pidana' },
      { name: 'Dasar Hukum', slug: 'dasar-hukum' },
    ],
    publishedAt: '2026-07-20',
    updatedAt: '2026-07-20',
    status: 'published',
    content: `
## Latar Belakang

Banyak orang awam yang bingung membedakan antara hukum perdata dan hukum pidana. Padahal, perbedaannya cukup mendasar dan penting dipahami agar tahu jalur hukum mana yang harus ditempuh jika menghadapi masalah.

## Penjelasan Inti

**Hukum Perdata** mengatur hubungan antara satu orang dengan orang lain. Contoh: sengketa kontrak, utang piutang, warisan, perceraian. Jika ada pelanggaran, pihak yang dirugikan mengajukan gugatan ke pengadilan perdata.

**Hukum Pidana** mengatur perbuatan yang dilarang oleh negara karena dianggap merugikan masyarakat secara luas. Contoh: pencurian, penipuan, penganiayaan. Jika ada pelanggaran, negara melalui kepolisian dan kejaksaan yang menindak.

### Perbedaan Kunci

| Aspek | Perdata | Pidana |
|-------|---------|--------|
| Pihak yang menggugat | Orang/ badan yang dirugikan | Negara (JPU) |
| Tujuan | Ganti rugi, pemenuhan hak | Pemidanaan (penjara, denda) |
| Inisiatif | Aktif melapor | Pasif (dilapor ke polisi) |
| Akhir perkara | Putusan hakim | Putusan hakim |
| Contoh kasus | Wanprestasi kontrak | Pencurian |

## Dasar Hukum
- Kitab Undang-Undang Hukum Perdata (KUHPerdata)
- Kitab Undang-Undang Hukum Pidana (KUHP)
- HIR / RBg (hukum acara)

## Batasan Informasi

Penjelasan ini bersifat pengantar. Setiap kasus memiliki keunikan masing-masing. Konsultasikan dengan advokat untuk kasus spesifik.

## Kesimpulan

Pahami dulu jenis hukumnya sebelum menentukan langkah. Jika dirugikan secara pribadi — perdata. Jika ada pelanggaran aturan pidana — laporkan ke polisi.
    `.trim(),
    readingTime: 5,
    sources: [
      { label: 'KUHPerdata (Kitab Undang-Undang Hukum Perdata)', url: '#' },
      { label: 'KUHP (Kitab Undang-Undang Hukum Pidana)', url: '#' },
    ],
    glossary: [
      { term: 'Gugatan', definition: 'Tuntutan hak yang diajukan ke pengadilan perdata' },
      { term: 'JPU', definition: 'Jaksa Penuntut Umum — pihak yang mewakili negara dalam perkara pidana' },
    ],
    keyPoints: [
      'Hukum perdata mengatur hubungan antarindividu; pidana mengatur pelanggaran terhadap negara.',
      'Korban pelanggaran pidana tetap bisa mengajukan ganti rugi lewat gugatan perdata terpisah.',
      'Satu perbuatan bisa memiliki konsekuensi perdata dan pidana sekaligus.',
    ],
  },
  {
    id: '2',
    title: 'Apa Itu Somasi dan Kapan Somasi Dikirim?',
    slug: 'apa-itu-somasi',
    excerpt: 'Somasi adalah teguran resmi sebelum gugatan perdata. Tanpa somasi yang sah, gugatan Anda bisa dinyatakan tidak dapat diterima.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Perdata dan Kontrak', slug: 'perdata-dan-kontrak' },
    tags: [
      { name: 'Somasi', slug: 'somasi' },
      { name: 'Perdata', slug: 'perdata' },
      { name: 'Gugatan', slug: 'gugatan' },
    ],
    publishedAt: '2026-07-21',
    updatedAt: '2026-07-21',
    status: 'published',
    content: `
## Latar Belakang

Somasi sering disebut sebagai "surat peringatan" atau "teguran". Dalam hukum perdata, somasi adalah langkah formal yang harus ditempuh sebelum mengajukan gugatan ke pengadilan dalam perkara wanprestasi (ingkar janji).

## Penjelasan Inti

**Somasi** adalah peringatan tertulis dari kreditur (pihak yang berpiutang) kepada debitur (pihak yang berutang) agar memenuhi prestasi (kewajiban) yang sudah jatuh tempo.

### Fungsi Somasi
1. Memberi kesempatan terakhir kepada debitur untuk memenuhi kewajiban.
2. Membuktikan bahwa kreditur sudah berusaha menyelesaikan secara damai.
3. Menghitung sejak kapan debitur dinyatakan lalai (wanprestasi).

### Kapan Somasi Dikirim?
- Debitur tidak membayar utang setelah jatuh tempo.
- Debitur memenuhi kewajiban tapi tidak sesuai perjanjian.
- Debitur melakukan sesuatu yang dilarang dalam perjanjian.

### Format Somasi
Somasi harus memuat:
- Identitas para pihak
- Dasar hubungan hukum (perjanjian)
- Prestasi apa yang belum dipenuhi
- Batas waktu pemenuhan (biasanya 7–14 hari)
- Ancaman jika tidak dipenuhi (gugatan)

## Dasar Hukum
- **Pasal 1238 KUHPerdata**: "Debitur dinyatakan lalai dengan surat perintah atau dengan akta sejenis itu..."
- **Pasal 1243 KUHPerdata**: "Penggantian biaya, rugi dan bunga karena tidak dipenuhinya suatu perikatan..."

## Batasan Informasi

Somasi tidak selalu wajib. Dalam beberapa kasus (perbuatan melawan hukum), gugatan bisa langsung diajukan tanpa somasi.

## Kesimpulan

Somasi adalah langkah penting sebelum gugatan wanprestasi. Jangan lewatkan — gugatan tanpa somasi bisa ditolak hakim.
    `.trim(),
    readingTime: 6,
    sources: [
      { label: 'KUHPerdata Pasal 1238 dan 1243', url: '#' },
    ],
    glossary: [
      { term: 'Wanprestasi', definition: 'Ingkar janji atau tidak memenuhi kewajiban kontrak' },
      { term: 'Kreditur', definition: 'Pihak yang berpiutang / berhak menagih' },
      { term: 'Debitur', definition: 'Pihak yang berutang / berkewajiban memenuhi prestasi' },
    ],
    keyPoints: [
      'Somasi adalah teguran resmi TERTULIS, bukan lisan.',
      'Batas waktu somasi wajar adalah 7–14 hari.',
      'Simpan bukti pengiriman somasi (resi pos, tanda terima).',
    ],
  },
  {
    id: '3',
    title: 'Hak Konsumen Saat Belanja Online',
    slug: 'hak-konsumen-belanja-online',
    excerpt: 'Apa saja hak Anda sebagai konsumen saat bertransaksi online? Dari hak atas informasi hingga hak retur — pahami sebelum Anda membeli.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Konsumen dan Bisnis', slug: 'konsumen-dan-bisnis' },
    tags: [
      { name: 'Konsumen', slug: 'konsumen' },
      { name: 'E-commerce', slug: 'e-commerce' },
      { name: 'Perlindungan Konsumen', slug: 'perlindungan-konsumen' },
    ],
    publishedAt: '2026-07-22',
    updatedAt: '2026-07-22',
    status: 'published',
    content: `
## Latar Belakang

Belanja online makin marak, tapi banyak konsumen yang tidak tahu haknya saat barang tidak sesuai, cacat, atau tidak sampai. Undang-Undang Perlindungan Konsumen memberi sejumlah hak yang bisa digunakan.

## Penjelasan Inti

### Hak-Hak Konsumen Online

**1. Hak atas Informasi yang Benar**
Penjual wajib memberikan informasi yang jujur tentang barang/jasa. Termasuk spesifikasi, harga, cara penggunaan, dan risiko.

**2. Hak untuk Membatalkan Transaksi**
Dalam transaksi jarak jauh (online), konsumen berhak membatalkan dalam waktu tertentu — meskipun tidak ada cacat.

**3. Hak atas Barang Sesuai Pesanan**
Barang harus sesuai dengan deskripsi, spesifikasi, dan janji penjual. Jika tidak sesuai, konsumen berhak menuntut penggantian.

**4. Hak atas Keamanan dan Keselamatan**
Data pribadi konsumen harus dilindungi. Penjual tidak boleh menyalahgunakan data untuk kepentingan lain.

### Yang Bisa Dilakukan Jika Bermasalah
1. Hubungi penjual — minta penjelasan dan solusi.
2. Laporkan ke platform marketplace.
3. Ajukan pengaduan ke **BPKN** atau **Yayasan Lembaga Konsumen**.
4. Tempuh jalur hukum jika perlu.

## Dasar Hukum
- **UU No. 8 Tahun 1999** tentang Perlindungan Konsumen
- **UU No. 11 Tahun 2008** jo **UU No. 19 Tahun 2016** tentang Informasi dan Transaksi Elektronik (ITE)
- **PP No. 80 Tahun 2019** tentang Perdagangan Melalui Sistem Elektronik

## Batasan Informasi

Tidak semua marketplace memiliki kebijakan retur yang sama. Simpan bukti transaksi dan tangkapan layar sebagai alat bukti.

## Kesimpulan

Konsumen online punya hak yang dilindungi undang-undang. Jangan ragu menuntut hak Anda — mulai dari diskusi baik-baik hingga pengaduan resmi.
    `.trim(),
    readingTime: 7,
    sources: [
      { label: 'UU No. 8/1999 tentang Perlindungan Konsumen', url: '#' },
      { label: 'UU ITE', url: '#' },
    ],
    glossary: [
      { term: 'BPKN', definition: 'Badan Perlindungan Konsumen Nasional' },
      { term: 'Retur', definition: 'Pengembalian barang karena tidak sesuai atau cacat' },
    ],
    keyPoints: [
      'Penjual wajib memberi informasi yang benar dan jujur.',
      'Konsumen berhak retur jika barang tidak sesuai.',
      'Data pribadi konsumen harus dilindungi penjual.',
    ],
  },
  {
    id: '4',
    title: 'Bukti Digital: Chat, Screenshot, dan Rekaman',
    slug: 'bukti-digital-chat-screenshot-rekaman',
    excerpt: 'Apakah screenshot chat bisa jadi alat bukti hukum? Bagaimana dengan rekaman percakapan? Simak syarat dan batasannya di sini.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Digital, Teknologi, dan Privasi', slug: 'digital-teknologi-privasi' },
    tags: [
      { name: 'Digital', slug: 'digital' },
      { name: 'Bukti', slug: 'bukti' },
      { name: 'ITE', slug: 'ite' },
    ],
    publishedAt: '2026-07-23',
    updatedAt: '2026-07-23',
    status: 'published',
    content: `
## Latar Belakang

Di era digital, bukti elektronik makin sering digunakan di pengadilan. Tapi tidak semua screenshot atau rekaman otomatis sah sebagai alat bukti. Ada syarat yang harus dipenuhi.

## Penjelasan Inti

### Jenis Bukti Digital

1. **Dokumen Elektronik** — file PDF, Word, spreadsheet.
2. **Pesan Elektronik** — chat WhatsApp, SMS, email.
3. **Screenshot** — tangkapan layar percakapan atau halaman web.
4. **Rekaman** — audio atau video.
5. **Metadata** — data tentang data (waktu, lokasi, perangkat).

### Syarat Keabsahan
- Dapat diakses dan ditampilkan kembali.
- Menggunakan sistem yang terpercaya dan andal.
- Tidak bertentangan dengan hukum.
- Dapat diperiksa integritasnya (tidak diubah).

### Tips Mengamankan Bukti Digital
1. **Jangan edit screenshot** — bukti asli lebih kuat.
2. **Simpan metadata** — jangan crop yang menghilangkan info waktu.
3. **Backup** — simpan di lebih dari satu tempat.
4. **Catalan waktu** — catat kapan bukti diambil.
5. **Sertifikasi** — untuk perkara penting, lakukan sertifikasi elektronik di kementerian.

## Dasar Hukum
- **UU No. 11/2008 jo UU No. 19/2016** tentang ITE — Pasal 5 dan 6
- **PP No. 71/2019** tentang Penyelenggaraan Sistem dan Transaksi Elektronik
- **PERMA No. 5/2021** tentang Persidangan Elektronik

## Batasan Informasi

Screenshot bisa diperdebatkan keabsahannya jika pihak lawan menyangkal. Untuk perkara serius, pertimbangkan *akte notaris* atau *sertifikasi elektronik*.

## Kesimpulan

Bukti digital sah selama memenuhi syarat UU ITE. Simpan asli, jangan diedit, dan kumpulkan metadata.
    `.trim(),
    readingTime: 6,
    sources: [
      { label: 'UU ITE Pasal 5-6', url: '#' },
      { label: 'PP No. 71/2019', url: '#' },
      { label: 'PERMA No. 5/2021', url: '#' },
    ],
    glossary: [
      { term: 'Metadata', definition: 'Data yang memberi informasi tentang data lain — seperti waktu pembuatan, lokasi, perangkat' },
      { term: 'Sertifikasi Elektronik', definition: 'Pengesahan dokumen elektronik oleh penyelenggara sertifikasi elektronik' },
    ],
    keyPoints: [
      'Bukti digital diakui UU ITE sebagai alat bukti sah.',
      'Screenshot asli lebih kuat dari yang diedit.',
      'Untuk perkara penting, lakukan sertifikasi elektronik.',
    ],
  },
  {
    id: '5',
    title: 'Memahami Kontrak Kerja PKWT dan PKWTT',
    slug: 'memahami-kontrak-kerja-pkwt-dan-pkwtt',
    excerpt: 'Apa bedanya karyawan tetap dan kontrak? PKWT untuk pekerjaan tertentu dengan batas waktu; PKWTT untuk hubungan kerja permanen.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Ketenagakerjaan', slug: 'ketenagakerjaan' },
    tags: [
      { name: 'Kontrak Kerja', slug: 'kontrak-kerja' },
      { name: 'PKWT', slug: 'pkwt' },
      { name: 'PKWTT', slug: 'pkwtt' },
      { name: 'Ketenagakerjaan', slug: 'ketenagakerjaan' },
    ],
    publishedAt: '2026-07-24',
    updatedAt: '2026-07-24',
    status: 'published',
    content: `
## Latar Belakang

Salah satu pertanyaan paling umum di kalangan pekerja adalah perbedaan antara status kontrak (PKWT) dan tetap (PKWTT). Keduanya punya hak dan kewajiban yang berbeda.

## Penjelasan Inti

### PKWT (Perjanjian Kerja Waktu Tertentu)
- **Sifat**: Sementara / kontrak.
- **Jangka waktu**: Paling lama 5 tahun (termasuk perpanjangan).
- **Alasan**: Pekerjaan yang sekali selesai, musiman, atau batas waktu tertentu.
- **Hak**: Upah, jaminan sosial, THR (jika memenuhi masa kerja).
- **PHK**: Berakhir otomatis sesuai kontrak.

### PKWTT (Perjanjian Kerja Waktu Tidak Tertentu)
- **Sifat**: Permanen / tetap.
- **Jangka waktu**: Tidak terbatas.
- **Alasan**: Pekerjaan bersifat terus-menerus.
- **Hak**: Upah, jaminan sosial, THR, uang pisah, pesangon jika PHK.
- **PHK**: Harus melalui mekanisme tertentu dengan hak pesangon.

### Hal yang Wajib Ada di Kontrak Kerja
1. Identitas para pihak
2. Jenis dan tempat pekerjaan
3. Upah dan cara pembayaran
4. Hak dan kewajiban
5. Jangka waktu (untuk PKWT)
6. Masa percobaan (maks 3 bulan, tidak berlaku untuk PKWT)

## Dasar Hukum
- **UU No. 13/2003** tentang Ketenagakerjaan (sebagaimana diubah UU Cipta Kerja)
- **PP No. 35/2021** tentang PKWT, Alih Daya, Waktu Kerja, dan PHK

## Batasan Informasi

Aturan ketenagakerjaan sering berubah. Selalu cek peraturan terbaru atau konsultasi ke Dinas Tenaga Kerja.

## Kesimpulan

PKWT untuk pekerjaan sementara; PKWTT untuk permanen. Pastikan status Anda jelas sejak awal dan kontrak memuat semua hak Anda.
    `.trim(),
    readingTime: 7,
    sources: [
      { label: 'UU No. 13/2003 tentang Ketenagakerjaan', url: '#' },
      { label: 'PP No. 35/2021', url: '#' },
    ],
    glossary: [
      { term: 'PHK', definition: 'Pemutusan Hubungan Kerja' },
      { term: 'Pesangon', definition: 'Uang kompensasi saat PHK, dihitung dari masa kerja' },
    ],
    keyPoints: [
      'PKWT maksimal 5 tahun termasuk perpanjangan.',
      'PKWTT berhak pesangon jika di-PHK.',
      'Masa percobaan hanya untuk PKWTT, maksimal 3 bulan.',
    ],
  },
  {
    id: '6',
    title: 'Hal yang Harus Dicek Sebelum Tanda Tangan Kontrak',
    slug: 'cek-sebelum-tanda-tangan-kontrak',
    excerpt: 'Jangan asal tanda tangan! Simak daftar periksa sebelum menandatangani kontrak — dari identitas, klausul, sampai konsekuensi pelanggaran.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Perdata dan Kontrak', slug: 'perdata-dan-kontrak' },
    tags: [
      { name: 'Kontrak', slug: 'kontrak' },
      { name: 'Perdata', slug: 'perdata' },
    ],
    publishedAt: '2026-07-25',
    updatedAt: '2026-07-25',
    status: 'published',
    content: `
## Latar Belakang

Banyak sengketa berawal dari kontrak yang tidak dibaca dengan saksama sebelum ditandatangani. Berikut daftar periksa minimal yang perlu Anda cermati.

## Daftar Periksa

### 1. Identitas Para Pihak
Pastikan nama, alamat, dan status hukum pihak lawan benar. Jika perusahaan, cek apakah yang tanda tangan berwenang.

### 2. Objek Perjanjian
Apa yang diperjanjikan? Barang, jasa, atau sesuatu yang lain? Deskripsi harus jelas dan terukur.

### 3. Hak dan Kewajiban
Apa yang harus Anda lakukan dan apa yang menjadi hak Anda? Pastikan seimbang dan realistis.

### 4. Jangka Waktu
Kapan mulai berlaku, kapan berakhir, dan bagaimana perpanjangannya?

### 5. Harga dan Cara Pembayaran
Jumlah, mata uang, cara pembayaran (transfer/tunai), jadwal, dan denda keterlambatan.

### 6. Klausul Pelanggaran
Apa yang dianggap pelanggaran? Apa konsekuensinya? Denda, pemutusan kontrak, atau ganti rugi?

### 7. Penyelesaian Sengketa
Musyawarah, mediasi, arbitrase, atau pengadilan? Tentukan domisili hukum jika sampai ke pengadilan.

### 8. Force Majeure
Keadaan kahar — bencana, kerusuhan, pandemi — yang membebaskan dari tanggung jawab.

## Dasar Hukum
- **Pasal 1320 KUHPerdata** — syarat sah perjanjian
- **Pasal 1338 KUHPerdata** — kebebasan berkontrak

## Kesimpulan

Luangkan waktu membaca kontrak sebelum tanda tangan. Jika ragu, konsultasi ke ahli hukum. Satu jam sekarang bisa menyelamatkan Anda dari tahun-tahun sengketa.
    `.trim(),
    readingTime: 6,
    sources: [
      { label: 'KUHPerdata Pasal 1320 dan 1338', url: '#' },
    ],
    glossary: [
      { term: 'Force Majeure', definition: 'Keadaan di luar kekuasaan manusia yang membebaskan dari tanggung jawab kontrak' },
      { term: 'Domisili Hukum', definition: 'Tempat yang disepakati untuk penyelesaian perkara di pengadilan' },
    ],
    keyPoints: [
      'Baca kontrak sampai selesai — jangan skip klausul kecil.',
      'Pastikan identitas dan kewenangan pihak lawan benar.',
      'Tentukan domisili hukum dan cara penyelesaian sengketa.',
    ],
  },
  {
    id: '7',
    title: 'Utang Piutang Antar Teman: Bukti yang Perlu Disimpan',
    slug: 'utang-piutang-antar-teman-bukti',
    excerpt: 'Pinjam-meminjam antar teman sering bermasalah karena tidak ada bukti kuat. Simak dokumen dan bukti yang perlu Anda simpan.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Hukum Sehari-hari', slug: 'hukum-sehari-hari' },
    tags: [
      { name: 'Utang', slug: 'utang' },
      { name: 'Perdata', slug: 'perdata' },
    ],
    publishedAt: '2026-07-26',
    updatedAt: '2026-07-26',
    status: 'published',
    content: `
## Latar Belakang

Utang-piutang antar teman adalah salah satu sumber sengketa paling umum. Masalah terjadi biasanya karena tidak ada bukti tertulis.

## Penjelasan Inti

### Dokumen yang Perlu Disimpan

**1. Bukti Transfer**
Simpan bukti transfer bank, screenshot mutasi, atau SMS notifikasi. Catat tanggal, jumlah, dan nomor rekening tujuan.

**2. Surat Perjanjian Utang**
Meskipun hanya sederhana, surat perjanjian utang sangat penting. Minimal memuat:
- Nama dan identitas kedua pihak
- Jumlah utang
- Tanggal peminjaman
- Jangka waktu pengembalian
- Bunga (jika ada)
- Tanda tangan kedua pihak

**3. Bukti Komunikasi**
Chat WhatsApp, SMS, atau email yang membahas utang. Termasuk ketika Anda menagih dan teman Anda merespons.

**4. Saksi**
Jika memungkinkan, libatkan saksi yang mengetahui transaksi.

### Tips Aman
1. Jangan malu membuat perjanjian tertulis — justru melindungi persahabatan.
2. Catat setiap pembayaran angsuran.
3. Jika jumlah besar, buat akta notaris.

## Dasar Hukum
- **Pasal 1754–1769 KUHPerdata** tentang Pinjam Pakai Habis
- **Pasal 1866 KUHPerdata** tentang alat bukti

## Kesimpulan

Persahabatan dan uang bisa berjalan beriringan selama ada bukti yang jelas. Buat catatan sejak awal.
    `.trim(),
    readingTime: 5,
    sources: [
      { label: 'KUHPerdata Pasal 1754-1769', url: '#' },
    ],
    glossary: [
      { term: 'Akta Notaris', definition: 'Dokumen resmi yang dibuat di hadapan notaris, memiliki kekuatan pembuktian sempurna' },
    ],
    keyPoints: [
      'Simpan bukti transfer dan surat perjanjian utang.',
      'Chat dan SMS bisa jadi bukti di pengadilan.',
      'Jangan segan membuat perjanjian tertulis demi melindungi hubungan.',
    ],
  },
  {
    id: '8',
    title: 'Data Pribadi: Hak Dasar yang Perlu Diketahui',
    slug: 'data-pribadi-hak-dasar',
    excerpt: 'UU Perlindungan Data Pribadi telah disahkan. Apa hak Anda atas data pribadi dan bagaimana melindunginya?',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Digital, Teknologi, dan Privasi', slug: 'digital-teknologi-privasi' },
    tags: [
      { name: 'Data Pribadi', slug: 'data-pribadi' },
      { name: 'Privasi', slug: 'privasi' },
      { name: 'Digital', slug: 'digital' },
    ],
    publishedAt: '2026-07-27',
    updatedAt: '2026-07-27',
    status: 'published',
    content: `
## Latar Belakang

Data pribadi adalah aset berharga di era digital. Banyak perusahaan mengumpulkan data tanpa izin yang jelas. UU Perlindungan Data Pribadi (UU PDP) hadir untuk melindungi hak Anda.

## Penjelasan Inti

### Apa itu Data Pribadi?
Data pribadi adalah data tentang individu yang dapat diidentifikasi — nama, alamat, KTP, nomor ponsel, data kesehatan, data biometrik, dan lain-lain.

### Hak-Hak Pemilik Data
1. **Hak tahu** — mengetahui tujuan pengumpulan data.
2. **Hak akses** — mengakses data pribadi Anda yang dikumpulkan.
3. **Hak perbaiki** — meminta koreksi data yang salah.
4. **Hak hapus** — meminta penghapusan data tertentu.
5. **Hak batasi** — membatasi pemrosesan data.
6. **Hak cabut izin** — menarik persetujuan yang sudah diberikan.
7. **Hak gugat** — mengganti rugi atas pelanggaran data.

### Kewajiban Pengendali Data
- Meminta izin eksplisit sebelum mengumpulkan data.
- Menjelaskan tujuan penggunaan data.
- Melindungi data dari kebocoran.
- Melaporkan jika terjadi kebocoran data.

## Dasar Hukum
- **UU No. 27 Tahun 2022** tentang Perlindungan Data Pribadi
- **PP No. 71/2019** tentang Penyelenggaraan SST

## Kesimpulan

Data pribadi adalah hak Anda. Jangan berikan data sembarangan. Jika ada pelanggaran, laporkan ke lembaga berwenang.
    `.trim(),
    readingTime: 6,
    sources: [
      { label: 'UU No. 27/2022 tentang PDP', url: '#' },
    ],
    glossary: [
      { term: 'Pengendali Data', definition: 'Pihak yang menentukan tujuan dan cara pemrosesan data pribadi' },
      { term: 'Biometrik', definition: 'Data unik fisik seseorang — sidik jari, wajah, iris mata' },
    ],
    keyPoints: [
      'Anda berhak tahu, akses, perbaiki, dan hapus data pribadi Anda.',
      'Perusahaan wajib minta izin sebelum mengumpulkan data.',
      'Kebocoran data wajib dilaporkan oleh pengendali data.',
    ],
  },
  {
    id: '9',
    title: 'Apa Itu Wanprestasi?',
    slug: 'apa-itu-wanprestasi',
    excerpt: 'Wanprestasi adalah ingkar janji dalam kontrak. Pahami jenis, akibat hukum, dan cara menggugat pihak yang wanprestasi.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Perdata dan Kontrak', slug: 'perdata-dan-kontrak' },
    tags: [
      { name: 'Wanprestasi', slug: 'wanprestasi' },
      { name: 'Kontrak', slug: 'kontrak' },
      { name: 'Perdata', slug: 'perdata' },
    ],
    publishedAt: '2026-07-25',
    updatedAt: '2026-07-25',
    status: 'published',
    content: `
## Latar Belakang

Wanprestasi adalah istilah yang sering muncul dalam sengketa kontrak. Memahami wanprestasi penting bagi siapa pun yang menandatangani perjanjian.

## Penjelasan Inti

**Wanprestasi** adalah ingkar janji — tidak memenuhi kewajiban yang sudah disepakati dalam perjanjian.

### Bentuk Wanprestasi
1. Tidak memenuhi prestasi sama sekali.
2. Memenuhi tapi tidak sesuai perjanjian.
3. Memenuhi tapi terlambat.
4. Melakukan sesuatu yang dilarang perjanjian.

### Akibat Hukum
- **Ganti rugi** — biaya, rugi, bunga (Pasal 1243 KUHPerdata).
- **Pembatalan kontrak** — kontrak dianggap tidak pernah terjadi.
- **Pemenuhan paksa** — hakim memerintahkan pemenuhan prestasi.

### Cara Menggugat
1. Kirim somasi (teguran) — minimal 2 kali.
2. Jika tidak diindahkan, ajukan gugatan ke pengadilan negeri.
3. Gugat secara perdata dengan bukti perjanjian dan somasi.

## Dasar Hukum
- **Pasal 1238–1243 KUHPerdata** tentang Wanprestasi

## Kesimpulan

Wanprestasi adalah ingkar janji. Langkah pertama adalah somasi, lalu gugatan jika tidak diindahkan.
    `.trim(),
    readingTime: 5,
    sources: [
      { label: 'KUHPerdata Pasal 1238-1243', url: '#' },
    ],
    glossary: [
      { term: 'Prestasi', definition: 'Kewajiban yang harus dipenuhi dalam perjanjian' },
    ],
    keyPoints: [
      'Wanprestasi bisa berupa tidak penuhi, tidak sesuai, atau terlambat penuhi.',
      'Somasi adalah langkah WAJIB sebelum gugatan wanprestasi.',
      'Ganti rugi meliputi biaya, rugi, dan bunga.',
    ],
  },
  {
    id: '10',
    title: 'Apa Itu Mediasi?',
    slug: 'apa-itu-mediasi',
    excerpt: 'Mediasi adalah cara penyelesaian sengketa di luar pengadilan dengan bantuan mediator. Lebih cepat, murah, dan rahasia.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Hukum Sehari-hari', slug: 'hukum-sehari-hari' },
    tags: [
      { name: 'Mediasi', slug: 'mediasi' },
      { name: 'Sengketa', slug: 'sengketa' },
    ],
    publishedAt: '2026-07-24',
    updatedAt: '2026-07-24',
    status: 'published',
    content: `
## Latar Belakang

Tidak semua sengketa harus berakhir di pengadilan. Mediasi menawarkan jalan tengah yang lebih damai dan efisien.

## Penjelasan Inti

**Mediasi** adalah proses penyelesaian sengketa dengan bantuan mediator — pihak netral yang membantu para pihak mencapai kesepakatan.

### Kelebihan Mediasi
- **Lebih cepat** — bisa selesai dalam hitungan hari/minggu.
- **Lebih murah** — biaya lebih rendah dari pengadilan.
- **Rahasia** — proses tertutup untuk umum.
- **Kontrol tetap di tangan para pihak** — bukan hakim.
- **Menjaga hubungan** — solusi win-win.

### Tahapan Mediasi
1. Para pihak sepakat untuk mediasi.
2. Memilih mediator (dari pengadilan atau independen).
3. Pertemuan mediasi — diskusi difasilitasi mediator.
4. Kesepakatan — jika berhasil, dibuat akta perdamaian.
5. Jika gagal — sengketa dilanjutkan ke pengadilan.

### Di Pengadilan
Di pengadilan, mediasi adalah langkah WAJIB sebelum pemeriksaan perkara (PERMA No. 1/2016).

## Dasar Hukum
- **PERMA No. 1 Tahun 2016** tentang Mediasi di Pengadilan

## Kesimpulan

Mediasi adalah cara cerdas menyelesaikan sengketa. Coba mediasi dulu sebelum memutuskan ke pengadilan.
    `.trim(),
    readingTime: 5,
    sources: [
      { label: 'PERMA No. 1/2016 tentang Mediasi', url: '#' },
    ],
    glossary: [
      { term: 'Mediator', definition: 'Pihak netral yang membantu proses mediasi, tidak memutus perkara' },
      { term: 'Akta Perdamaian', definition: 'Dokumen resmi berisi kesepakatan hasil mediasi yang berkekuatan hukum' },
    ],
    keyPoints: [
      'Mediasi lebih cepat, murah, dan rahasia dibanding pengadilan.',
      'Mediasi WAJIB ditempuh sebelum sidang di pengadilan.',
      'Hasil mediasi bisa dikuatkan sebagai akta perdamaian.',
    ],
  },
  {
    id: '11',
    title: 'Checklist Aman Bertransaksi Online',
    slug: 'checklist-aman-transaksi-online',
    excerpt: 'Daftar periksa keamanan sebelum, saat, dan setelah transaksi online. Lindungi uang dan data pribadi Anda.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Konsumen dan Bisnis', slug: 'konsumen-dan-bisnis' },
    tags: [
      { name: 'Konsumen', slug: 'konsumen' },
      { name: 'Keamanan', slug: 'keamanan' },
      { name: 'E-commerce', slug: 'e-commerce' },
    ],
    publishedAt: '2026-07-26',
    updatedAt: '2026-07-26',
    status: 'published',
    content: `
## Latar Belakang

Transaksi online praktis tapi juga rawan penipuan. Checklist ini membantu Anda aman sebelum, saat, dan setelah bertransaksi.

## Checklist

### Sebelum Transaksi
- [ ] Pastikan situs/ aplikasi terpercaya.
- [ ] Cek reputasi penjual (rating, ulasan, lama bergabung).
- [ ] Bandingkan harga — harga terlalu murah patut curiga.
- [ ] Baca deskripsi barang dengan teliti.
- [ ] Periksa kebijakan retur dan garansi.

### Saat Transaksi
- [ ] Gunakan metode pembayaran yang aman (rekening bersama, kartu kredit).
- [ ] Jangan transfer ke rekening pribadi jika belanja di marketplace.
- [ ] Simpan bukti transfer dan screenshot pesanan.
- [ ] Catat nomor resi dan lacak pengiriman.

### Setelah Transaksi
- [ ] Periksa barang saat diterima — buka video sebagai bukti.
- [ ] Jika ada masalah, segera hubungi penjual.
- [ ] Beri ulasan jujur untuk membantu pembeli lain.
- [ ] Simpan dokumen transaksi minimal 3 bulan.

### Tanda Penipuan
- Harga jauh di bawah pasaran.
- Penjual meminta transfer ke rekening pribadi.
- Tidak ada nomor telepon yang bisa dihubungi.
- Website tidak memiliki alamat jelas.

## Dasar Hukum
- UU Perlindungan Konsumen
- UU ITE

## Kesimpulan

Teliti sebelum bertransaksi menyelamatkan Anda dari penipuan. Simpan semua bukti transaksi.
    `.trim(),
    readingTime: 5,
    sources: [
      { label: 'UU No. 8/1999 Perlindungan Konsumen', url: '#' },
      { label: 'UU ITE', url: '#' },
    ],
    glossary: [],
    keyPoints: [
      'Cek reputasi penjual sebelum transaksi.',
      'Gunakan metode bayar aman — jangan transfer ke rekening pribadi.',
      'Simpan bukti transaksi minimal 3 bulan.',
    ],
  },
  {
    id: '12',
    title: 'Dokumen Dasar untuk Pengaduan Konsumen',
    slug: 'dokumen-dasar-pengaduan-konsumen',
    excerpt: 'Apa saja dokumen yang perlu disiapkan saat mengadu? Dari bukti pembelian hingga kronologi kejadian — siapkan sebelum melapor.',
    cover: '',
    author: { name: 'Tim Diskusi Hukum', slug: 'tim-diskusi-hukum' },
    category: { name: 'Konsumen dan Bisnis', slug: 'konsumen-dan-bisnis' },
    tags: [
      { name: 'Konsumen', slug: 'konsumen' },
      { name: 'Pengaduan', slug: 'pengaduan' },
    ],
    publishedAt: '2026-07-27',
    updatedAt: '2026-07-27',
    status: 'published',
    content: `
## Latar Belakang

Banyak konsumen yang gagal mengadu karena dokumen tidak lengkap. Simpan dokumen-dokumen ini sejak awal.

## Dokumen yang Diperlukan

### Dokumen Wajib
1. **Bukti Pembelian** — invoice, kwitansi, atau bukti transfer.
2. **Identitas Diri** — KTP atau identitas lain.
3. **Kronologi Kejadian** — catatan waktu dan urutan peristiwa.
4. **Bukti Pendukung** — foto, video, screenshot chat.

### Dokumen Tambahan
5. Surat pernyataan konsumen.
6. Hasil mediasi sebelumnya (jika ada).
7. Surat kuasa (jika diwakilkan).
8. Laporan dari ahli (jika diperlukan).

### Kemana Mengadu?
1. **Penjual** — langkah pertama dan paling sederhana.
2. **Marketplace** — laporkan melalui sistem platform.
3. **BPKN** — Badan Perlindungan Konsumen Nasional.
4. **Yayasan Lembaga Konsumen** — YLKI dan lembaga serupa.
5. **Pengadilan** — melalui gugatan perdata.

### Tips
- Buat map khusus untuk dokumen pengaduan.
- Scan dan backup digital semua dokumen.
- Catat tanggal dan nama petugas setiap kali menghubungi instansi.

## Dasar Hukum
- UU No. 8/1999 tentang Perlindungan Konsumen

## Kesimpulan

Dokumen lengkap adalah kunci pengaduan yang efektif. Siapkan semua bukti sebelum melapor.
    `.trim(),
    readingTime: 5,
    sources: [
      { label: 'UU No. 8/1999 Perlindungan Konsumen', url: '#' },
    ],
    glossary: [],
    keyPoints: [
      'Siapkan bukti pembelian, identitas, dan kronologi sebelum mengadu.',
      'Adu ke penjual dulu, lalu ke BPKN/YLKI jika tidak selesai.',
      'Backup digital semua dokumen pengaduan.',
    ],
  },
]

export const featuredArticles = articles.slice(0, 4)
export const recentArticles = articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

export function getArticleBySlug(slug: string) {
  return articles.find(a => a.slug === slug) || null
}

export function getArticlesByCategory(slug: string) {
  return articles.filter(a => a.category.slug === slug)
}

export function getArticlesByTag(slug: string) {
  return articles.filter(a => a.tags.some(t => t.slug === slug))
}

export function searchArticles(q: string) {
  const query = q.toLowerCase()
  return articles.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.excerpt.toLowerCase().includes(query) ||
    a.content.toLowerCase().includes(query)
  )
}
