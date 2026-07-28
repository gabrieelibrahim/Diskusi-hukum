import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — Diskusi Hukum',
  description: 'Syarat dan ketentuan penggunaan website Diskusi Hukum.',
}

export default function SyaratPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
        Syarat &amp; Ketentuan
      </h1>
      <p className="text-sm text-slate mb-8">
        Berlaku efektif: 20 Juli 2026
      </p>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          1. Penerimaan Ketentuan
        </h2>
        <p className="text-charcoal leading-relaxed">
          Dengan mengakses dan menggunakan website Diskusi Hukum, Anda menyetujui syarat dan
          ketentuan yang tercantum di halaman ini. Jika Anda tidak setuju dengan bagian mana
          pun dari ketentuan ini, jangan gunakan website kami.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          2. Konten Informatif
        </h2>
        <p className="text-charcoal leading-relaxed">
          Seluruh konten di Diskusi Hukum bersifat informatif dan edukatif. Konten ini bukan
          merupakan nasihat hukum resmi. Untuk masalah hukum spesifik, Anda disarankan
          berkonsultasi dengan advokat atau ahli hukum yang berwenang.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          3. Kekayaan Intelektual
        </h2>
        <p className="text-charcoal leading-relaxed">
          Seluruh konten yang diterbitkan di Diskusi Hukum, termasuk artikel, ilustrasi, dan
          desain website, dilindungi hak cipta sesuai peraturan perundang-undangan yang berlaku.
          Dilarang mereproduksi, mendistribusikan, atau memodifikasi konten tanpa izin tertulis
          dari pemilik hak cipta.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          4. Kontribusi Pengguna
        </h2>
        <p className="text-charcoal leading-relaxed mb-3">
          Dengan mengirimkan konten (artikel, usulan topik, atau materi lain) ke Diskusi Hukum,
          Anda:
        </p>
        <ul className="space-y-2 text-charcoal">
          <li>Menjamin bahwa konten tersebut adalah karya orisinal Anda.</li>
          <li>Memberikan lisensi non-eksklusif kepada Diskusi Hukum untuk mempublikasikan konten.</li>
          <li>Setuju bahwa konten dapat diedit untuk keperluan editorial.</li>
          <li>Bertanggung jawab penuh atas keakuratan dan legalitas konten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          5. Batasan Tanggung Jawab
        </h2>
        <p className="text-charcoal leading-relaxed">
          Diskusi Hukum tidak bertanggung jawab atas kerugian langsung, tidak langsung,
          insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan
          menggunakan website ini. Kami berusaha menyajikan informasi akurat, tapi tidak
          menjamin kelengkapan atau keakuratan konten.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          6. Tautan Eksternal
        </h2>
        <p className="text-charcoal leading-relaxed">
          Website kami dapat berisi tautan ke situs pihak ketiga. Kami tidak mengontrol dan
          tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs pihak
          ketiga tersebut.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          7. Perubahan Ketentuan
        </h2>
        <p className="text-charcoal leading-relaxed">
          Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan
          diinformasikan melalui halaman ini. Penggunaan lanjutan website setelah perubahan
          berarti penerimaan terhadap ketentuan yang telah diperbarui.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold text-primary mb-3">
          8. Hukum yang Berlaku
        </h2>
        <p className="text-charcoal leading-relaxed">
          Syarat dan ketentuan ini diatur oleh hukum Negara Kesatuan Republik Indonesia.
          Setiap sengketa yang timbul akan diselesaikan melalui musyawarah, dan jika tidak
          tercapai kesepakatan, melalui pengadilan yang berwenang.
        </p>
      </section>
    </div>
  )
}
