import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pedoman Editorial — Diskusi Hukum',
  description: 'Pedoman editorial dan standar penulisan artikel di Diskusi Hukum.',
}

export default function PedomanEditorialPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
        Pedoman Editorial
      </h1>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          1. Tujuan
        </h2>
        <p className="text-charcoal leading-relaxed">
          Pedoman editorial ini bertujuan menjaga kualitas, akurasi, dan konsistensi seluruh
          konten yang diterbitkan di Diskusi Hukum. Setiap kontributor dan editor wajib mematuhi
          pedoman ini.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          2. Prinsip Dasar
        </h2>
        <ul className="space-y-3 text-charcoal">
          <li>
            <strong>Akurasi:</strong> Setiap artikel harus berdasarkan fakta hukum yang benar
            dan merujuk pada peraturan perundang-undangan yang berlaku.
          </li>
          <li>
            <strong>Bahasa Jelas:</strong> Gunakan bahasa Indonesia yang baik dan benar.
            Hindari jargon hukum yang tidak perlu. Jika menggunakan istilah teknis, sertakan
            penjelasan.
          </li>
          <li>
            <strong>Netralitas:</strong> Artikel harus bersifat informatif dan edukatif,
            tidak memihak, dan tidak mengandung kepentingan politik atau komersial tertentu.
          </li>
          <li>
            <strong>Terbarui:</strong> Hukum bersifat dinamis. Artikel harus mencantumkan
            tanggal publikasi dan diperbarui jika ada perubahan peraturan.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          3. Struktur Artikel
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Setiap artikel idealnya memiliki struktur berikut:
        </p>
        <ol className="space-y-2 text-charcoal list-decimal list-inside">
          <li>Judul yang informatif dan menarik.</li>
          <li>Excerpt ringkas (2-3 kalimat) yang menjelaskan inti artikel.</li>
          <li>Latar belakang atau pengantar singkat.</li>
          <li>Penjelasan inti dengan sub-bagian yang jelas.</li>
          <li>Dasar hukum dan referensi.</li>
          <li>Key points (poin-poin penting) sebagai ringkasan.</li>
          <li>Kesimpulan atau pesan kunci.</li>
          <li>Disclaimer jika diperlukan.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          4. Sumber dan Referensi
        </h2>
        <ul className="space-y-2 text-charcoal">
          <li>
            Setiap klaim hukum harus disertai referensi ke peraturan perundang-undangan
            atau sumber terpercaya.
          </li>
          <li>
            Cantumkan nomor pasal dan undang-undang secara spesifik jika mengutip peraturan.
          </li>
          <li>
            Sertakan tautan ke sumber referensi jika tersedia.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          5. Disclaimer
        </h2>
        <p className="text-charcoal leading-relaxed">
          Setiap artikel wajib mencantumkan disclaimer yang menyatakan bahwa konten bersifat
          informatif dan bukan nasihat hukum resmi. Pembaca dengan kasus spesifik disarankan
          berkonsultasi dengan advokat atau ahli hukum.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          6. Proses Editorial
        </h2>
        <ol className="space-y-2 text-charcoal list-decimal list-inside">
          <li>
            <strong>Pengajuan:</strong> Kontributor mengirimkan draft artikel melalui
            mekanisme yang tersedia.
          </li>
          <li>
            <strong>Review:</strong> Tim editorial meninjau akurasi, kelengkapan, dan
            kesesuaian dengan pedoman.
          </li>
          <li>
            <strong>Revisi:</strong> Jika diperlukan, draft dikembalikan ke kontributor
            untuk revisi.
          </li>
          <li>
            <strong>Penerbitan:</strong> Artikel yang telah disetujui diterbitkan dengan
            mencantumkan nama penulis dan tanggal publikasi.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          7. Larangan
        </h2>
        <ul className="space-y-2 text-charcoal">
          <li>Plagiarisme dalam bentuk apa pun tidak ditoleransi.</li>
          <li>Konten yang bersifat SARA, fitnah, atau ujaran kebencian.</li>
          <li>Promosi produk atau jasa hukum tertentu secara komersial.</li>
          <li>Informasi yang menyesatkan atau tidak dapat diverifikasi.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          8. Perubahan Pedoman
        </h2>
        <p className="text-charcoal leading-relaxed">
          Pedoman editorial ini dapat berubah sewaktu-waktu. Perubahan akan diumumkan melalui
          halaman ini dan berlaku sejak tanggal publikasi perubahan.
        </p>
      </section>
    </div>
  )
}
