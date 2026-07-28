import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — Diskusi Hukum',
  description: 'Kebijakan privasi dan perlindungan data pribadi pengguna Diskusi Hukum.',
}

export default function PrivasiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
        Kebijakan Privasi
      </h1>
      <p className="text-sm text-slate mb-8">
        Berlaku efektif: 20 Juli 2026
      </p>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          1. Informasi yang Kami Kumpulkan
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Kami mengumpulkan informasi yang Anda berikan secara sukarela ketika:
        </p>
        <ul className="space-y-2 text-charcoal">
          <li>Mendaftar sebagai kontributor (nama, email, bio, bidang minat).</li>
          <li>Mengirimkan usulan topik (nama, email, judul, deskripsi).</li>
          <li>Menghubungi kami melalui formulir kontak (nama, email, pesan).</li>
        </ul>
        <p className="text-charcoal leading-relaxed mt-3">
          Kami juga mengumpulkan data teknis dasar seperti alamat IP, jenis browser, dan
          halaman yang dikunjungi melalui cookie dan teknologi pelacakan standar.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          2. Penggunaan Informasi
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Informasi yang kami kumpulkan digunakan untuk:
        </p>
        <ul className="space-y-2 text-charcoal">
          <li>Memproses pendaftaran kontributor dan mengelola akun.</li>
          <li>Meninjau dan merespons usulan topik dan pesan kontak.</li>
          <li>Mengirimkan pembaruan terkait artikel atau kegiatan komunitas (jika diizinkan).</li>
          <li>Meningkatkan kualitas website dan pengalaman pengguna.</li>
          <li>Mematuhi kewajiban hukum yang berlaku.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          3. Perlindungan Data
        </h2>
        <p className="text-charcoal leading-relaxed">
          Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi
          data pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran.
          Namun, tidak ada metode transmisi data di internet yang 100% aman.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          4. Cookie
        </h2>
        <p className="text-charcoal leading-relaxed">
          Website ini menggunakan cookie untuk meningkatkan pengalaman browsing, menganalisis
          lalu lintas, dan mengingat preferensi pengguna. Anda dapat mengontrol penggunaan
          cookie melalui pengaturan browser Anda.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          5. Pihak Ketiga
        </h2>
        <p className="text-charcoal leading-relaxed">
          Kami tidak menjual, menukar, atau menyewakan data pribadi Anda kepada pihak ketiga.
          Kami dapat membagikan informasi dengan penyedia layanan tepercaya yang membantu
          pengoperasian website, dengan kewajiban kerahasiaan yang ketat.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          6. Hak Anda
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Berdasarkan Undang-Undang Perlindungan Data Pribadi, Anda memiliki hak untuk:
        </p>
        <ul className="space-y-2 text-charcoal">
          <li>Mengakses data pribadi yang kami simpan.</li>
          <li>Meminta koreksi data yang tidak akurat.</li>
          <li>Meminta penghapusan data tertentu.</li>
          <li>Menarik izin yang telah diberikan.</li>
          <li>Mengajukan keberatan atas pemrosesan data.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          7. Kontak
        </h2>
        <p className="text-charcoal leading-relaxed">
          Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin menggunakan
          hak Anda, silakan hubungi kami melalui halaman{' '}
          <a href="/kontak" className="text-accent hover:underline">Kontak</a>.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          8. Perubahan Kebijakan
        </h2>
        <p className="text-charcoal leading-relaxed">
          Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan signifikan
          akan diinformasikan melalui website ini.
        </p>
      </section>
    </div>
  )
}
