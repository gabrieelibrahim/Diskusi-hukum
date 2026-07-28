import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang — Diskusi Hukum',
  description: 'Tentang komunitas Diskusi Hukum, misi, visi, dan cara berkontribusi.',
}

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
        Tentang Diskusi Hukum
      </h1>

      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold text-primary mb-4">
          Apa Itu Diskusi Hukum?
        </h2>
        <p className="text-charcoal leading-relaxed mb-4">
          Diskusi Hukum adalah komunitas belajar hukum Indonesia yang bertujuan membuat
          pengetahuan hukum dapat diakses oleh semua orang. Kami percaya bahwa pemahaman hukum
          adalah hak setiap warga negara, bukan hanya milik para akademisi dan praktisi.
        </p>
        <p className="text-charcoal leading-relaxed">
          Website ini menyajikan artikel-artikel hukum yang ditulis dengan bahasa yang jelas,
          aplikatif, dan mudah dipahami. Setiap artikel ditulis atau dikurasi oleh kontributor
          yang memiliki latar belakang hukum dan telah melalui proses editorial.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold text-primary mb-4">
          Misi
        </h2>
        <ul className="space-y-3 text-charcoal">
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">&#10003;</span>
            <span>Menyediakan edukasi hukum yang akurat dan mudah dipahami oleh masyarakat umum.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">&#10003;</span>
            <span>Membangun komunitas diskusi hukum yang inklusif dan terbuka.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">&#10003;</span>
            <span>Menjembatani kesenjangan antara bahasa hukum teknis dan pemahaman awam.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">&#10003;</span>
            <span>Mendorong literasi hukum sebagai bagian dari kesadaran bernegara.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold text-primary mb-4">
          Visi
        </h2>
        <p className="text-charcoal leading-relaxed">
          Menjadi platform edukasi hukum terkemuka di Indonesia yang memberdayakan masyarakat
          dengan pengetahuan hukum yang aplikatif dan dapat diandalkan.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold text-primary mb-4">
          Untuk Siapa?
        </h2>
        <p className="text-charcoal leading-relaxed mb-4">
          Konten Diskusi Hukum dirancang untuk:
        </p>
        <ul className="space-y-2 text-charcoal">
          <li>- Masyarakat umum yang ingin memahami hak dan kewajiban hukum.</li>
          <li>- Mahasiswa hukum yang mencari referensi tambahan.</li>
          <li>- Pelaku usaha yang perlu memahami aspek hukum bisnis.</li>
          <li>- Siapa pun yang tertarik dengan dunia hukum Indonesia.</li>
        </ul>
      </section>

      <section className="bg-accent/5 border border-accent/20 rounded-xl p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-primary mb-4">
          Ingin Berkontribusi?
        </h2>
        <p className="text-charcoal mb-6 max-w-lg mx-auto">
          Kami terbuka untuk kontributor yang ingin menulis artikel, berbagi pengetahuan, atau
          terlibat dalam diskusi komunitas.
        </p>
        <a
          href="/kontributor/daftar"
          className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-600 transition-colors"
        >
          Daftar Jadi Kontributor
        </a>
      </section>
    </div>
  )
}
