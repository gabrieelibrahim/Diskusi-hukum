import bcryptjs from 'bcryptjs'
import { db } from './index'
import {
  categories,
  tags,
  articles,
  articleTags,
  contributors,
  events,
  adminUsers,
} from './schema'
import type { NewCategory, NewTag, NewArticle, NewContributor, NewEvent, NewAdminUser } from './schema'

/**
 * Seed the database with initial data:
 * - 9 categories from the PRD
 * - All tags found across articles
 * - 12 sample articles (seeded from src/data/articles.ts data)
 * - A single admin user (admin / admin123)
 * - Sample events
 * - A default contributor
 */
export async function seed() {
  console.log('[seed] Seeding database …')

  // ── 1. Categories ────────────────────────────────────────
  const categoryRows: NewCategory[] = [
    { name: 'Hukum Sehari-hari', slug: 'hukum-sehari-hari', description: 'Hal-hal hukum yang sering ditemui dalam kehidupan sehari-hari' },
    { name: 'Pidana', slug: 'pidana', description: 'Hukum pidana dan proses peradilan pidana' },
    { name: 'Perdata dan Kontrak', slug: 'perdata-dan-kontrak', description: 'Hukum perdata, kontrak, dan perjanjian' },
    { name: 'Ketenagakerjaan', slug: 'ketenagakerjaan', description: 'Hukum ketenagakerjaan, kontrak kerja, dan PHK' },
    { name: 'Konsumen dan Bisnis', slug: 'konsumen-dan-bisnis', description: 'Perlindungan konsumen dan hukum bisnis' },
    { name: 'Digital, Teknologi, dan Privasi', slug: 'digital-teknologi-privasi', description: 'Hukum digital, ITE, dan perlindungan data pribadi' },
    { name: 'Keluarga dan Waris', slug: 'keluarga-dan-waris', description: 'Hukum keluarga, pernikahan, perceraian, dan waris' },
    { name: 'Negara, Kebijakan, dan Hak Warga', slug: 'negara-kebijakan-hak-warga', description: 'Tata negara, kebijakan publik, dan hak warga negara' },
    { name: 'Bedah Kasus', slug: 'bedah-kasus', description: 'Analisis dan bedah kasus hukum publik' },
  ]

  for (const cat of categoryRows) {
    await db.insert(categories).values(cat).onConflictDoNothing({ target: categories.slug })
  }
  console.log(`[seed] Inserted ${categoryRows.length} categories`)

  // ── 2. Tags ──────────────────────────────────────────────
  const tagRows: NewTag[] = [
    { name: 'Perdata', slug: 'perdata' },
    { name: 'Pidana', slug: 'pidana' },
    { name: 'Dasar Hukum', slug: 'dasar-hukum' },
    { name: 'Somasi', slug: 'somasi' },
    { name: 'Gugatan', slug: 'gugatan' },
    { name: 'Konsumen', slug: 'konsumen' },
    { name: 'E-commerce', slug: 'e-commerce' },
    { name: 'Perlindungan Konsumen', slug: 'perlindungan-konsumen' },
    { name: 'Digital', slug: 'digital' },
    { name: 'Bukti', slug: 'bukti' },
    { name: 'ITE', slug: 'ite' },
    { name: 'Kontrak Kerja', slug: 'kontrak-kerja' },
    { name: 'PKWT', slug: 'pkwt' },
    { name: 'PKWTT', slug: 'pkwtt' },
    { name: 'Ketenagakerjaan', slug: 'ketenagakerjaan' },
    { name: 'Kontrak', slug: 'kontrak' },
    { name: 'Utang', slug: 'utang' },
    { name: 'Data Pribadi', slug: 'data-pribadi' },
    { name: 'Privasi', slug: 'privasi' },
    { name: 'Wanprestasi', slug: 'wanprestasi' },
    { name: 'Mediasi', slug: 'mediasi' },
    { name: 'Sengketa', slug: 'sengketa' },
    { name: 'Keamanan', slug: 'keamanan' },
    { name: 'Pengaduan', slug: 'pengaduan' },
  ]

  for (const t of tagRows) {
    await db.insert(tags).values(t).onConflictDoNothing({ target: tags.slug })
  }
  console.log(`[seed] Inserted ${tagRows.length} tags`)

  // Fetch back inserted tags (with IDs) for article-tag linking
  const allTags = await db.select().from(tags)
  const tagMap = new Map(allTags.map((t) => [t.slug, t.id]))

  // ── 3. Admin user ────────────────────────────────────────
  const passwordHash = await bcryptjs.hash('admin123', 10)
  const adminRow: NewAdminUser = {
    username: 'admin',
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  await db.insert(adminUsers).values(adminRow).onConflictDoNothing({ target: adminUsers.username })
  console.log('[seed] Inserted admin user')

  // ── 4. Contributor ───────────────────────────────────────
  const contributorRows: NewContributor[] = [
    {
      name: 'Tim Diskusi Hukum',
      slug: 'tim-diskusi-hukum',
      bio: 'Tim editorial komunitas Diskusi Hukum — menulis, mengkurasi, dan memastikan setiap artikel akurat serta bermanfaat.',
      approved: 1,
    },
  ]

  for (const c of contributorRows) {
    await db.insert(contributors).values(c).onConflictDoNothing({ target: contributors.slug })
  }
  console.log('[seed] Inserted contributor')

  // ── 5. Articles ──────────────────────────────────────────
  const articleData: {
    title: string
    slug: string
    excerpt: string
    content: string
    categorySlug: string
    tagSlugs: string[]
    publishedAt: string
    readingTime: number
    sources: string
    glossary: string
    keyPoints: string
  }[] = [
    {
      title: 'Mengenal Perbedaan Hukum Perdata dan Hukum Pidana',
      slug: 'perbedaan-hukum-perdata-dan-pidana',
      excerpt: 'Dua cabang hukum utama yang wajib dipahami. Perdata mengatur hubungan antarindividu, pidana mengatur sanksi atas pelanggaran aturan negara.',
      content: '## Latar Belakang\n\nBanyak orang awam yang bingung membedakan antara hukum perdata dan hukum pidana. Padahal, perbedaannya cukup mendasar dan penting dipahami agar tahu jalur hukum mana yang harus ditempuh jika menghadapi masalah.\n\n## Penjelasan Inti\n\n**Hukum Perdata** mengatur hubungan antara satu orang dengan orang lain. Contoh: sengketa kontrak, utang piutang, warisan, perceraian. Jika ada pelanggaran, pihak yang dirugikan mengajukan gugatan ke pengadilan perdata.\n\n**Hukum Pidana** mengatur perbuatan yang dilarang oleh negara karena dianggap merugikan masyarakat secara luas. Contoh: pencurian, penipuan, penganiayaan. Jika ada pelanggaran, negara melalui kepolisian dan kejaksaan yang menindak.\n\n### Perbedaan Kunci\n\n| Aspek | Perdata | Pidana |\n|-------|---------|--------|\n| Pihak yang menggugat | Orang/ badan yang dirugikan | Negara (JPU) |\n| Tujuan | Ganti rugi, pemenuhan hak | Pemidanaan (penjara, denda) |\n| Inisiatif | Aktif melapor | Pasif (dilapor ke polisi) |\n| Akhir perkara | Putusan hakim | Putusan hakim |\n| Contoh kasus | Wanprestasi kontrak | Pencurian |\n\n## Dasar Hukum\n- Kitab Undang-Undang Hukum Perdata (KUHPerdata)\n- Kitab Undang-Undang Hukum Pidana (KUHP)\n- HIR / RBg (hukum acara)\n\n## Batasan Informasi\n\nPenjelasan ini bersifat pengantar. Setiap kasus memiliki keunikan masing-masing. Konsultasikan dengan advokat untuk kasus spesifik.\n\n## Kesimpulan\n\nPahami dulu jenis hukumnya sebelum menentukan langkah. Jika dirugikan secara pribadi — perdata. Jika ada pelanggaran aturan pidana — laporkan ke polisi.',
      categorySlug: 'hukum-sehari-hari',
      tagSlugs: ['perdata', 'pidana', 'dasar-hukum'],
      publishedAt: '2026-07-20',
      readingTime: 5,
      sources: JSON.stringify([
        { label: 'KUHPerdata (Kitab Undang-Undang Hukum Perdata)', url: '#' },
        { label: 'KUHP (Kitab Undang-Undang Hukum Pidana)', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'Gugatan', definition: 'Tuntutan hak yang diajukan ke pengadilan perdata' },
        { term: 'JPU', definition: 'Jaksa Penuntut Umum — pihak yang mewakili negara dalam perkara pidana' },
      ]),
      keyPoints: JSON.stringify([
        'Hukum perdata mengatur hubungan antarindividu; pidana mengatur pelanggaran terhadap negara.',
        'Korban pelanggaran pidana tetap bisa mengajukan ganti rugi lewat gugatan perdata terpisah.',
        'Satu perbuatan bisa memiliki konsekuensi perdata dan pidana sekaligus.',
      ]),
    },
    {
      title: 'Apa Itu Somasi dan Kapan Somasi Dikirim?',
      slug: 'apa-itu-somasi',
      excerpt: 'Somasi adalah teguran resmi sebelum gugatan perdata. Tanpa somasi yang sah, gugatan Anda bisa dinyatakan tidak dapat diterima.',
      content: '## Latar Belakang\n\nSomasi sering disebut sebagai "surat peringatan" atau "teguran". Dalam hukum perdata, somasi adalah langkah formal yang harus ditempuh sebelum mengajukan gugatan ke pengadilan dalam perkara wanprestasi (ingkar janji).\n\n## Penjelasan Inti\n\n**Somasi** adalah peringatan tertulis dari kreditur (pihak yang berpiutang) kepada debitur (pihak yang berutang) agar memenuhi prestasi (kewajiban) yang sudah jatuh tempo.\n\n### Fungsi Somasi\n1. Memberi kesempatan terakhir kepada debitur untuk memenuhi kewajiban.\n2. Membuktikan bahwa kreditur sudah berusaha menyelesaikan secara damai.\n3. Menghitung sejak kapan debitur dinyatakan lalai (wanprestasi).\n\n### Kapan Somasi Dikirim?\n- Debitur tidak membayar utang setelah jatuh tempo.\n- Debitur memenuhi kewajiban tapi tidak sesuai perjanjian.\n- Debitur melakukan sesuatu yang dilarang dalam perjanjian.\n\n### Format Somasi\nSomasi harus memuat:\n- Identitas para pihak\n- Dasar hubungan hukum (perjanjian)\n- Prestasi apa yang belum dipenuhi\n- Batas waktu pemenuhan (biasanya 7–14 hari)\n- Ancaman jika tidak dipenuhi (gugatan)\n\n## Dasar Hukum\n- **Pasal 1238 KUHPerdata**: "Debitur dinyatakan lalai dengan surat perintah atau dengan akta sejenis itu..."\n- **Pasal 1243 KUHPerdata**: "Penggantian biaya, rugi dan bunga karena tidak dipenuhinya suatu perikatan..."\n\n## Batasan Informasi\n\nSomasi tidak selalu wajib. Dalam beberapa kasus (perbuatan melawan hukum), gugatan bisa langsung diajukan tanpa somasi.\n\n## Kesimpulan\n\nSomasi adalah langkah penting sebelum gugatan wanprestasi. Jangan lewatkan — gugatan tanpa somasi bisa ditolak hakim.',
      categorySlug: 'perdata-dan-kontrak',
      tagSlugs: ['somasi', 'perdata', 'gugatan'],
      publishedAt: '2026-07-21',
      readingTime: 6,
      sources: JSON.stringify([
        { label: 'KUHPerdata Pasal 1238 dan 1243', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'Wanprestasi', definition: 'Ingkar janji atau tidak memenuhi kewajiban kontrak' },
        { term: 'Kreditur', definition: 'Pihak yang berpiutang / berhak menagih' },
        { term: 'Debitur', definition: 'Pihak yang berutang / berkewajiban memenuhi prestasi' },
      ]),
      keyPoints: JSON.stringify([
        'Somasi adalah teguran resmi TERTULIS, bukan lisan.',
        'Batas waktu somasi wajar adalah 7–14 hari.',
        'Simpan bukti pengiriman somasi (resi pos, tanda terima).',
      ]),
    },
    {
      title: 'Hak Konsumen Saat Belanja Online',
      slug: 'hak-konsumen-belanja-online',
      excerpt: 'Apa saja hak Anda sebagai konsumen saat bertransaksi online? Dari hak atas informasi hingga hak retur — pahami sebelum Anda membeli.',
      content: '## Latar Belakang\n\nBelanja online makin marak, tapi banyak konsumen yang tidak tahu haknya saat barang tidak sesuai, cacat, atau tidak sampai. Undang-Undang Perlindungan Konsumen memberi sejumlah hak yang bisa digunakan.\n\n## Penjelasan Inti\n\n### Hak-Hak Konsumen Online\n\n**1. Hak atas Informasi yang Benar**\nPenjual wajib memberikan informasi yang jujur tentang barang/jasa. Termasuk spesifikasi, harga, cara penggunaan, dan risiko.\n\n**2. Hak untuk Membatalkan Transaksi**\nDalam transaksi jarak jauh (online), konsumen berhak membatalkan dalam waktu tertentu — meskipun tidak ada cacat.\n\n**3. Hak atas Barang Sesuai Pesanan**\nBarang harus sesuai dengan deskripsi, spesifikasi, dan janji penjual. Jika tidak sesuai, konsumen berhak menuntut penggantian.\n\n**4. Hak atas Keamanan dan Keselamatan**\nData pribadi konsumen harus dilindungi. Penjual tidak boleh menyalahgunakan data untuk kepentingan lain.\n\n### Yang Bisa Dilakukan Jika Bermasalah\n1. Hubungi penjual — minta penjelasan dan solusi.\n2. Laporkan ke platform marketplace.\n3. Ajukan pengaduan ke **BPKN** atau **Yayasan Lembaga Konsumen**.\n4. Tempuh jalur hukum jika perlu.\n\n## Dasar Hukum\n- **UU No. 8 Tahun 1999** tentang Perlindungan Konsumen\n- **UU No. 11 Tahun 2008** jo **UU No. 19 Tahun 2016** tentang Informasi dan Transaksi Elektronik (ITE)\n- **PP No. 80 Tahun 2019** tentang Perdagangan Melalui Sistem Elektronik\n\n## Batasan Informasi\n\nTidak semua marketplace memiliki kebijakan retur yang sama. Simpan bukti transaksi dan tangkapan layar sebagai alat bukti.\n\n## Kesimpulan\n\nKonsumen online punya hak yang dilindungi undang-undang. Jangan ragu menuntut hak Anda — mulai dari diskusi baik-baik hingga pengaduan resmi.',
      categorySlug: 'konsumen-dan-bisnis',
      tagSlugs: ['konsumen', 'e-commerce', 'perlindungan-konsumen'],
      publishedAt: '2026-07-22',
      readingTime: 7,
      sources: JSON.stringify([
        { label: 'UU No. 8/1999 tentang Perlindungan Konsumen', url: '#' },
        { label: 'UU ITE', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'BPKN', definition: 'Badan Perlindungan Konsumen Nasional' },
        { term: 'Retur', definition: 'Pengembalian barang karena tidak sesuai atau cacat' },
      ]),
      keyPoints: JSON.stringify([
        'Penjual wajib memberi informasi yang benar dan jujur.',
        'Konsumen berhak retur jika barang tidak sesuai.',
        'Data pribadi konsumen harus dilindungi penjual.',
      ]),
    },
    {
      title: 'Bukti Digital: Chat, Screenshot, dan Rekaman',
      slug: 'bukti-digital-chat-screenshot-rekaman',
      excerpt: 'Apakah screenshot chat bisa jadi alat bukti hukum? Bagaimana dengan rekaman percakapan? Simak syarat dan batasannya di sini.',
      content: '## Latar Belakang\n\nDi era digital, bukti elektronik makin sering digunakan di pengadilan. Tapi tidak semua screenshot atau rekaman otomatis sah sebagai alat bukti. Ada syarat yang harus dipenuhi.\n\n## Penjelasan Inti\n\n### Jenis Bukti Digital\n\n1. **Dokumen Elektronik** — file PDF, Word, spreadsheet.\n2. **Pesan Elektronik** — chat WhatsApp, SMS, email.\n3. **Screenshot** — tangkapan layar percakapan atau halaman web.\n4. **Rekaman** — audio atau video.\n5. **Metadata** — data tentang data (waktu, lokasi, perangkat).\n\n### Syarat Keabsahan\n- Dapat diakses dan ditampilkan kembali.\n- Menggunakan sistem yang terpercaya dan andal.\n- Tidak bertentangan dengan hukum.\n- Dapat diperiksa integritasnya (tidak diubah).\n\n### Tips Mengamankan Bukti Digital\n1. **Jangan edit screenshot** — bukti asli lebih kuat.\n2. **Simpan metadata** — jangan crop yang menghilangkan info waktu.\n3. **Backup** — simpan di lebih dari satu tempat.\n4. **Catalan waktu** — catat kapan bukti diambil.\n5. **Sertifikasi** — untuk perkara penting, lakukan sertifikasi elektronik di kementerian.\n\n## Dasar Hukum\n- **UU No. 11/2008 jo UU No. 19/2016** tentang ITE — Pasal 5 dan 6\n- **PP No. 71/2019** tentang Penyelenggaraan Sistem dan Transaksi Elektronik\n- **PERMA No. 5/2021** tentang Persidangan Elektronik\n\n## Batasan Informasi\n\nScreenshot bisa diperdebatkan keabsahannya jika pihak lawan menyangkal. Untuk perkara serius, pertimbangkan *akte notaris* atau *sertifikasi elektronik*.\n\n## Kesimpulan\n\nBukti digital sah selama memenuhi syarat UU ITE. Simpan asli, jangan diedit, dan kumpulkan metadata.',
      categorySlug: 'digital-teknologi-privasi',
      tagSlugs: ['digital', 'bukti', 'ite'],
      publishedAt: '2026-07-23',
      readingTime: 6,
      sources: JSON.stringify([
        { label: 'UU ITE Pasal 5-6', url: '#' },
        { label: 'PP No. 71/2019', url: '#' },
        { label: 'PERMA No. 5/2021', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'Metadata', definition: 'Data yang memberi informasi tentang data lain — seperti waktu pembuatan, lokasi, perangkat' },
        { term: 'Sertifikasi Elektronik', definition: 'Pengesahan dokumen elektronik oleh penyelenggara sertifikasi elektronik' },
      ]),
      keyPoints: JSON.stringify([
        'Bukti digital diakui UU ITE sebagai alat bukti sah.',
        'Screenshot asli lebih kuat dari yang diedit.',
        'Untuk perkara penting, lakukan sertifikasi elektronik.',
      ]),
    },
    {
      title: 'Memahami Kontrak Kerja PKWT dan PKWTT',
      slug: 'memahami-kontrak-kerja-pkwt-dan-pkwtt',
      excerpt: 'Apa bedanya karyawan tetap dan kontrak? PKWT untuk pekerjaan tertentu dengan batas waktu; PKWTT untuk hubungan kerja permanen.',
      content: '## Latar Belakang\n\nSalah satu pertanyaan paling umum di kalangan pekerja adalah perbedaan antara status kontrak (PKWT) dan tetap (PKWTT). Keduanya punya hak dan kewajiban yang berbeda.\n\n## Penjelasan Inti\n\n### PKWT (Perjanjian Kerja Waktu Tertentu)\n- **Sifat**: Sementara / kontrak.\n- **Jangka waktu**: Paling lama 5 tahun (termasuk perpanjangan).\n- **Alasan**: Pekerjaan yang sekali selesai, musiman, atau batas waktu tertentu.\n- **Hak**: Upah, jaminan sosial, THR (jika memenuhi masa kerja).\n- **PHK**: Berakhir otomatis sesuai kontrak.\n\n### PKWTT (Perjanjian Kerja Waktu Tidak Tertentu)\n- **Sifat**: Permanen / tetap.\n- **Jangka waktu**: Tidak terbatas.\n- **Alasan**: Pekerjaan bersifat terus-menerus.\n- **Hak**: Upah, jaminan sosial, THR, uang pisah, pesangon jika PHK.\n- **PHK**: Harus melalui mekanisme tertentu dengan hak pesangon.\n\n### Hal yang Wajib Ada di Kontrak Kerja\n1. Identitas para pihak\n2. Jenis dan tempat pekerjaan\n3. Upah dan cara pembayaran\n4. Hak dan kewajiban\n5. Jangka waktu (untuk PKWT)\n6. Masa percobaan (maks 3 bulan, tidak berlaku untuk PKWT)\n\n## Dasar Hukum\n- **UU No. 13/2003** tentang Ketenagakerjaan (sebagaimana diubah UU Cipta Kerja)\n- **PP No. 35/2021** tentang PKWT, Alih Daya, Waktu Kerja, dan PHK\n\n## Batasan Informasi\n\nAturan ketenagakerjaan sering berubah. Selalu cek peraturan terbaru atau konsultasi ke Dinas Tenaga Kerja.\n\n## Kesimpulan\n\nPKWT untuk pekerjaan sementara; PKWTT untuk permanen. Pastikan status Anda jelas sejak awal dan kontrak memuat semua hak Anda.',
      categorySlug: 'ketenagakerjaan',
      tagSlugs: ['kontrak-kerja', 'pkwt', 'pkwtt', 'ketenagakerjaan'],
      publishedAt: '2026-07-24',
      readingTime: 7,
      sources: JSON.stringify([
        { label: 'UU No. 13/2003 tentang Ketenagakerjaan', url: '#' },
        { label: 'PP No. 35/2021', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'PHK', definition: 'Pemutusan Hubungan Kerja' },
        { term: 'Pesangon', definition: 'Uang kompensasi saat PHK, dihitung dari masa kerja' },
      ]),
      keyPoints: JSON.stringify([
        'PKWT maksimal 5 tahun termasuk perpanjangan.',
        'PKWTT berhak pesangon jika di-PHK.',
        'Masa percobaan hanya untuk PKWTT, maksimal 3 bulan.',
      ]),
    },
    {
      title: 'Hal yang Harus Dicek Sebelum Tanda Tangan Kontrak',
      slug: 'cek-sebelum-tanda-tangan-kontrak',
      excerpt: 'Jangan asal tanda tangan! Simak daftar periksa sebelum menandatangani kontrak — dari identitas, klausul, sampai konsekuensi pelanggaran.',
      content: '## Latar Belakang\n\nBanyak sengketa berawal dari kontrak yang tidak dibaca dengan saksama sebelum ditandatangani. Berikut daftar periksa minimal yang perlu Anda cermati.\n\n## Daftar Periksa\n\n### 1. Identitas Para Pihak\nPastikan nama, alamat, dan status hukum pihak lawan benar. Jika perusahaan, cek apakah yang tanda tangan berwenang.\n\n### 2. Objek Perjanjian\nApa yang diperjanjikan? Barang, jasa, atau sesuatu yang lain? Deskripsi harus jelas dan terukur.\n\n### 3. Hak dan Kewajiban\nApa yang harus Anda lakukan dan apa yang menjadi hak Anda? Pastikan seimbang dan realistis.\n\n### 4. Jangka Waktu\nKapan mulai berlaku, kapan berakhir, dan bagaimana perpanjangannya?\n\n### 5. Harga dan Cara Pembayaran\nJumlah, mata uang, cara pembayaran (transfer/tunai), jadwal, dan denda keterlambatan.\n\n### 6. Klausul Pelanggaran\nApa yang dianggap pelanggaran? Apa konsekuensinya? Denda, pemutusan kontrak, atau ganti rugi?\n\n### 7. Penyelesaian Sengketa\nMusyawarah, mediasi, arbitrase, atau pengadilan? Tentukan domisili hukum jika sampai ke pengadilan.\n\n### 8. Force Majeure\nKeadaan kahar — bencana, kerusuhan, pandemi — yang membebaskan dari tanggung jawab.\n\n## Dasar Hukum\n- **Pasal 1320 KUHPerdata** — syarat sah perjanjian\n- **Pasal 1338 KUHPerdata** — kebebasan berkontrak\n\n## Kesimpulan\n\nLuangkan waktu membaca kontrak sebelum tanda tangan. Jika ragu, konsultasi ke ahli hukum. Satu jam sekarang bisa menyelamatkan Anda dari tahun-tahun sengketa.',
      categorySlug: 'perdata-dan-kontrak',
      tagSlugs: ['kontrak', 'perdata'],
      publishedAt: '2026-07-25',
      readingTime: 6,
      sources: JSON.stringify([
        { label: 'KUHPerdata Pasal 1320 dan 1338', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'Force Majeure', definition: 'Keadaan di luar kekuasaan manusia yang membebaskan dari tanggung jawab kontrak' },
        { term: 'Domisili Hukum', definition: 'Tempat yang disepakati untuk penyelesaian perkara di pengadilan' },
      ]),
      keyPoints: JSON.stringify([
        'Baca kontrak sampai selesai — jangan skip klausul kecil.',
        'Pastikan identitas dan kewenangan pihak lawan benar.',
        'Tentukan domisili hukum dan cara penyelesaian sengketa.',
      ]),
    },
    {
      title: 'Utang Piutang Antar Teman: Bukti yang Perlu Disimpan',
      slug: 'utang-piutang-antar-teman-bukti',
      excerpt: 'Pinjam-meminjam antar teman sering bermasalah karena tidak ada bukti kuat. Simak dokumen dan bukti yang perlu Anda simpan.',
      content: '## Latar Belakang\n\nUtang-piutang antar teman adalah salah satu sumber sengketa paling umum. Masalah terjadi biasanya karena tidak ada bukti tertulis.\n\n## Penjelasan Inti\n\n### Dokumen yang Perlu Disimpan\n\n**1. Bukti Transfer**\nSimpan bukti transfer bank, screenshot mutasi, atau SMS notifikasi. Catat tanggal, jumlah, dan nomor rekening tujuan.\n\n**2. Surat Perjanjian Utang**\nMeskipun hanya sederhana, surat perjanjian utang sangat penting. Minimal memuat:\n- Nama dan identitas kedua pihak\n- Jumlah utang\n- Tanggal peminjaman\n- Jangka waktu pengembalian\n- Bunga (jika ada)\n- Tanda tangan kedua pihak\n\n**3. Bukti Komunikasi**\nChat WhatsApp, SMS, atau email yang membahas utang. Termasuk ketika Anda menagih dan teman Anda merespons.\n\n**4. Saksi**\nJika memungkinkan, libatkan saksi yang mengetahui transaksi.\n\n### Tips Aman\n1. Jangan malu membuat perjanjian tertulis — justru melindungi persahabatan.\n2. Catat setiap pembayaran angsuran.\n3. Jika jumlah besar, buat akta notaris.\n\n## Dasar Hukum\n- **Pasal 1754–1769 KUHPerdata** tentang Pinjam Pakai Habis\n- **Pasal 1866 KUHPerdata** tentang alat bukti\n\n## Kesimpulan\n\nPersahabatan dan uang bisa berjalan beriringan selama ada bukti yang jelas. Buat catatan sejak awal.',
      categorySlug: 'hukum-sehari-hari',
      tagSlugs: ['utang', 'perdata'],
      publishedAt: '2026-07-26',
      readingTime: 5,
      sources: JSON.stringify([
        { label: 'KUHPerdata Pasal 1754-1769', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'Akta Notaris', definition: 'Dokumen resmi yang dibuat di hadapan notaris, memiliki kekuatan pembuktian sempurna' },
      ]),
      keyPoints: JSON.stringify([
        'Simpan bukti transfer dan surat perjanjian utang.',
        'Chat dan SMS bisa jadi bukti di pengadilan.',
        'Jangan segan membuat perjanjian tertulis demi melindungi hubungan.',
      ]),
    },
    {
      title: 'Data Pribadi: Hak Dasar yang Perlu Diketahui',
      slug: 'data-pribadi-hak-dasar',
      excerpt: 'UU Perlindungan Data Pribadi telah disahkan. Apa hak Anda atas data pribadi dan bagaimana melindunginya?',
      content: '## Latar Belakang\n\nData pribadi adalah aset berharga di era digital. Banyak perusahaan mengumpulkan data tanpa izin yang jelas. UU Perlindungan Data Pribadi (UU PDP) hadir untuk melindungi hak Anda.\n\n## Penjelasan Inti\n\n### Apa itu Data Pribadi?\nData pribadi adalah data tentang individu yang dapat diidentifikasi — nama, alamat, KTP, nomor ponsel, data kesehatan, data biometrik, dan lain-lain.\n\n### Hak-Hak Pemilik Data\n1. **Hak tahu** — mengetahui tujuan pengumpulan data.\n2. **Hak akses** — mengakses data pribadi Anda yang dikumpulkan.\n3. **Hak perbaiki** — meminta koreksi data yang salah.\n4. **Hak hapus** — meminta penghapusan data tertentu.\n5. **Hak batasi** — membatasi pemrosesan data.\n6. **Hak cabut izin** — menarik persetujuan yang sudah diberikan.\n7. **Hak gugat** — mengganti rugi atas pelanggaran data.\n\n### Kewajiban Pengendali Data\n- Meminta izin eksplisit sebelum mengumpulkan data.\n- Menjelaskan tujuan penggunaan data.\n- Melindungi data dari kebocoran.\n- Melaporkan jika terjadi kebocoran data.\n\n## Dasar Hukum\n- **UU No. 27 Tahun 2022** tentang Perlindungan Data Pribadi\n- **PP No. 71/2019** tentang Penyelenggaraan SST\n\n## Kesimpulan\n\nData pribadi adalah hak Anda. Jangan berikan data sembarangan. Jika ada pelanggaran, laporkan ke lembaga berwenang.',
      categorySlug: 'digital-teknologi-privasi',
      tagSlugs: ['data-pribadi', 'privasi', 'digital'],
      publishedAt: '2026-07-27',
      readingTime: 6,
      sources: JSON.stringify([
        { label: 'UU No. 27/2022 tentang PDP', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'Pengendali Data', definition: 'Pihak yang menentukan tujuan dan cara pemrosesan data pribadi' },
        { term: 'Biometrik', definition: 'Data unik fisik seseorang — sidik jari, wajah, iris mata' },
      ]),
      keyPoints: JSON.stringify([
        'Anda berhak tahu, akses, perbaiki, dan hapus data pribadi Anda.',
        'Perusahaan wajib minta izin sebelum mengumpulkan data.',
        'Kebocoran data wajib dilaporkan oleh pengendali data.',
      ]),
    },
    {
      title: 'Apa Itu Wanprestasi?',
      slug: 'apa-itu-wanprestasi',
      excerpt: 'Wanprestasi adalah ingkar janji dalam kontrak. Pahami jenis, akibat hukum, dan cara menggugat pihak yang wanprestasi.',
      content: '## Latar Belakang\n\nWanprestasi adalah istilah yang sering muncul dalam sengketa kontrak. Memahami wanprestasi penting bagi siapa pun yang menandatangani perjanjian.\n\n## Penjelasan Inti\n\n**Wanprestasi** adalah ingkar janji — tidak memenuhi kewajiban yang sudah disepakati dalam perjanjian.\n\n### Bentuk Wanprestasi\n1. Tidak memenuhi prestasi sama sekali.\n2. Memenuhi tapi tidak sesuai perjanjian.\n3. Memenuhi tapi terlambat.\n4. Melakukan sesuatu yang dilarang perjanjian.\n\n### Akibat Hukum\n- **Ganti rugi** — biaya, rugi, bunga (Pasal 1243 KUHPerdata).\n- **Pembatalan kontrak** — kontrak dianggap tidak pernah terjadi.\n- **Pemenuhan paksa** — hakim memerintahkan pemenuhan prestasi.\n\n### Cara Menggugat\n1. Kirim somasi (teguran) — minimal 2 kali.\n2. Jika tidak diindahkan, ajukan gugatan ke pengadilan negeri.\n3. Gugat secara perdata dengan bukti perjanjian dan somasi.\n\n## Dasar Hukum\n- **Pasal 1238–1243 KUHPerdata** tentang Wanprestasi\n\n## Kesimpulan\n\nWanprestasi adalah ingkar janji. Langkah pertama adalah somasi, lalu gugatan jika tidak diindahkan.',
      categorySlug: 'perdata-dan-kontrak',
      tagSlugs: ['wanprestasi', 'kontrak', 'perdata'],
      publishedAt: '2026-07-25',
      readingTime: 5,
      sources: JSON.stringify([
        { label: 'KUHPerdata Pasal 1238-1243', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'Prestasi', definition: 'Kewajiban yang harus dipenuhi dalam perjanjian' },
      ]),
      keyPoints: JSON.stringify([
        'Wanprestasi bisa berupa tidak penuhi, tidak sesuai, atau terlambat penuhi.',
        'Somasi adalah langkah WAJIB sebelum gugatan wanprestasi.',
        'Ganti rugi meliputi biaya, rugi, dan bunga.',
      ]),
    },
    {
      title: 'Apa Itu Mediasi?',
      slug: 'apa-itu-mediasi',
      excerpt: 'Mediasi adalah cara penyelesaian sengketa di luar pengadilan dengan bantuan mediator. Lebih cepat, murah, dan rahasia.',
      content: '## Latar Belakang\n\nTidak semua sengketa harus berakhir di pengadilan. Mediasi menawarkan jalan tengah yang lebih damai dan efisien.\n\n## Penjelasan Inti\n\n**Mediasi** adalah proses penyelesaian sengketa dengan bantuan mediator — pihak netral yang membantu para pihak mencapai kesepakatan.\n\n### Kelebihan Mediasi\n- **Lebih cepat** — bisa selesai dalam hitungan hari/minggu.\n- **Lebih murah** — biaya lebih rendah dari pengadilan.\n- **Rahasia** — proses tertutup untuk umum.\n- **Kontrol tetap di tangan para pihak** — bukan hakim.\n- **Menjaga hubungan** — solusi win-win.\n\n### Tahapan Mediasi\n1. Para pihak sepakat untuk mediasi.\n2. Memilih mediator (dari pengadilan atau independen).\n3. Pertemuan mediasi — diskusi difasilitasi mediator.\n4. Kesepakatan — jika berhasil, dibuat akta perdamaian.\n5. Jika gagal — sengketa dilanjutkan ke pengadilan.\n\n### Di Pengadilan\nDi pengadilan, mediasi adalah langkah WAJIB sebelum pemeriksaan perkara (PERMA No. 1/2016).\n\n## Dasar Hukum\n- **PERMA No. 1 Tahun 2016** tentang Mediasi di Pengadilan\n\n## Kesimpulan\n\nMediasi adalah cara cerdas menyelesaikan sengketa. Coba mediasi dulu sebelum memutuskan ke pengadilan.',
      categorySlug: 'hukum-sehari-hari',
      tagSlugs: ['mediasi', 'sengketa'],
      publishedAt: '2026-07-24',
      readingTime: 5,
      sources: JSON.stringify([
        { label: 'PERMA No. 1/2016 tentang Mediasi', url: '#' },
      ]),
      glossary: JSON.stringify([
        { term: 'Mediator', definition: 'Pihak netral yang membantu proses mediasi, tidak memutus perkara' },
        { term: 'Akta Perdamaian', definition: 'Dokumen resmi berisi kesepakatan hasil mediasi yang berkekuatan hukum' },
      ]),
      keyPoints: JSON.stringify([
        'Mediasi lebih cepat, murah, dan rahasia dibanding pengadilan.',
        'Mediasi WAJIB ditempuh sebelum sidang di pengadilan.',
        'Hasil mediasi bisa dikuatkan sebagai akta perdamaian.',
      ]),
    },
    {
      title: 'Checklist Aman Bertransaksi Online',
      slug: 'checklist-aman-transaksi-online',
      excerpt: 'Daftar periksa keamanan sebelum, saat, dan setelah transaksi online. Lindungi uang dan data pribadi Anda.',
      content: '## Latar Belakang\n\nTransaksi online praktis tapi juga rawan penipuan. Checklist ini membantu Anda aman sebelum, saat, dan setelah bertransaksi.\n\n## Checklist\n\n### Sebelum Transaksi\n- [ ] Pastikan situs/ aplikasi terpercaya.\n- [ ] Cek reputasi penjual (rating, ulasan, lama bergabung).\n- [ ] Bandingkan harga — harga terlalu murah patut curiga.\n- [ ] Baca deskripsi barang dengan teliti.\n- [ ] Periksa kebijakan retur dan garansi.\n\n### Saat Transaksi\n- [ ] Gunakan metode pembayaran yang aman (rekening bersama, kartu kredit).\n- [ ] Jangan transfer ke rekening pribadi jika belanja di marketplace.\n- [ ] Simpan bukti transfer dan screenshot pesanan.\n- [ ] Catat nomor resi dan lacak pengiriman.\n\n### Setelah Transaksi\n- [ ] Periksa barang saat diterima — buka video sebagai bukti.\n- [ ] Jika ada masalah, segera hubungi penjual.\n- [ ] Beri ulasan jujur untuk membantu pembeli lain.\n- [ ] Simpan dokumen transaksi minimal 3 bulan.\n\n### Tanda Penipuan\n- Harga jauh di bawah pasaran.\n- Penjual meminta transfer ke rekening pribadi.\n- Tidak ada nomor telepon yang bisa dihubungi.\n- Website tidak memiliki alamat jelas.\n\n## Dasar Hukum\n- UU Perlindungan Konsumen\n- UU ITE\n\n## Kesimpulan\n\nTeliti sebelum bertransaksi menyelamatkan Anda dari penipuan. Simpan semua bukti transaksi.',
      categorySlug: 'konsumen-dan-bisnis',
      tagSlugs: ['konsumen', 'keamanan', 'e-commerce'],
      publishedAt: '2026-07-26',
      readingTime: 5,
      sources: JSON.stringify([
        { label: 'UU No. 8/1999 Perlindungan Konsumen', url: '#' },
        { label: 'UU ITE', url: '#' },
      ]),
      glossary: JSON.stringify([]),
      keyPoints: JSON.stringify([
        'Cek reputasi penjual sebelum transaksi.',
        'Gunakan metode bayar aman — jangan transfer ke rekening pribadi.',
        'Simpan bukti transaksi minimal 3 bulan.',
      ]),
    },
    {
      title: 'Dokumen Dasar untuk Pengaduan Konsumen',
      slug: 'dokumen-dasar-pengaduan-konsumen',
      excerpt: 'Apa saja dokumen yang perlu disiapkan saat mengadu? Dari bukti pembelian hingga kronologi kejadian — siapkan sebelum melapor.',
      content: '## Latar Belakang\n\nBanyak konsumen yang gagal mengadu karena dokumen tidak lengkap. Simpan dokumen-dokumen ini sejak awal.\n\n## Dokumen yang Diperlukan\n\n### Dokumen Wajib\n1. **Bukti Pembelian** — invoice, kwitansi, atau bukti transfer.\n2. **Identitas Diri** — KTP atau identitas lain.\n3. **Kronologi Kejadian** — catatan waktu dan urutan peristiwa.\n4. **Bukti Pendukung** — foto, video, screenshot chat.\n\n### Dokumen Tambahan\n5. Surat pernyataan konsumen.\n6. Hasil mediasi sebelumnya (jika ada).\n7. Surat kuasa (jika diwakilkan).\n8. Laporan dari ahli (jika diperlukan).\n\n### Kemana Mengadu?\n1. **Penjual** — langkah pertama dan paling sederhana.\n2. **Marketplace** — laporkan melalui sistem platform.\n3. **BPKN** — Badan Perlindungan Konsumen Nasional.\n4. **Yayasan Lembaga Konsumen** — YLKI dan lembaga serupa.\n5. **Pengadilan** — melalui gugatan perdata.\n\n### Tips\n- Buat map khusus untuk dokumen pengaduan.\n- Scan dan backup digital semua dokumen.\n- Catat tanggal dan nama petugas setiap kali menghubungi instansi.\n\n## Dasar Hukum\n- UU No. 8/1999 tentang Perlindungan Konsumen\n\n## Kesimpulan\n\nDokumen lengkap adalah kunci pengaduan yang efektif. Siapkan semua bukti sebelum melapor.',
      categorySlug: 'konsumen-dan-bisnis',
      tagSlugs: ['konsumen', 'pengaduan'],
      publishedAt: '2026-07-27',
      readingTime: 5,
      sources: JSON.stringify([
        { label: 'UU No. 8/1999 Perlindungan Konsumen', url: '#' },
      ]),
      glossary: JSON.stringify([]),
      keyPoints: JSON.stringify([
        'Siapkan bukti pembelian, identitas, dan kronologi sebelum mengadu.',
        'Adu ke penjual dulu, lalu ke BPKN/YLKI jika tidak selesai.',
        'Backup digital semua dokumen pengaduan.',
      ]),
    },
  ]

  for (const art of articleData) {
    const inserted = await db.insert(articles).values({
      title: art.title,
      slug: art.slug,
      excerpt: art.excerpt,
      content: art.content,
      authorName: 'Tim Diskusi Hukum',
      authorSlug: 'tim-diskusi-hukum',
      categorySlug: art.categorySlug,
      publishedAt: art.publishedAt,
      updatedAt: art.publishedAt,
      status: 'published',
      readingTime: art.readingTime,
      sources: art.sources,
      glossary: art.glossary,
      keyPoints: art.keyPoints,
    }).onConflictDoNothing({ target: articles.slug }).returning({ id: articles.id })

    // Link article to tags
    const articleId = inserted[0]?.id
    if (articleId) {
      for (const tagSlug of art.tagSlugs) {
        const tagId = tagMap.get(tagSlug)
        if (tagId) {
          await db.insert(articleTags).values({ articleId, tagId }).onConflictDoNothing()
        }
      }
    }
  }
  console.log(`[seed] Inserted ${articleData.length} articles with tag associations`)

  // ── 6. Events ────────────────────────────────────────────
  const eventRows: NewEvent[] = [
    {
      title: 'Diskusi Bulanan: Perlindungan Data Pribadi di Era Digital',
      slug: 'diskusi-perlindungan-data-digital',
      date: '2026-08-15',
      time: '19:00 - 21:00 WIB',
      description: 'Diskusi santai membahas UU PDP dan implementasinya dalam kehidupan sehari-hari. Terbuka untuk umum.',
      type: 'diskusi',
      link: '#',
    },
    {
      title: 'Workshop: Cara Membaca Kontrak Kerja',
      slug: 'workshop-membaca-kontrak-kerja',
      date: '2026-08-29',
      time: '10:00 - 12:00 WIB',
      description: 'Workshop interaktif membedah klausul-klausul kontrak kerja yang sering menimbulkan masalah.',
      type: 'workshop',
      link: null,
    },
  ]

  for (const e of eventRows) {
    await db.insert(events).values(e).onConflictDoNothing({ target: events.slug })
  }
  console.log(`[seed] Inserted ${eventRows.length} events`)

  console.log('[seed] Seeding complete')
}