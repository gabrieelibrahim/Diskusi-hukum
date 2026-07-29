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
          Diskusi hukum adalah ruang dialog interaktif dan wadah bertukar pikiran yang secara terbuka mempertemukan seluruh elemen masyarakat hukum, mulai dari calon maba, maba, mahasiswa, lulusan hukum, praktisi, hingga para penegak hukum.
        </p>
        <p className="text-charcoal leading-relaxed mb-4">
          Melalui platform ini, berbagai generasi dan latar belakang keahlian dapat saling berdialog untuk menguji argumen normatif, membedah kasus, serta mengaitkan teori akademis dengan realitas penegakan hukum di lapangan.
        </p>
        <p className="text-charcoal leading-relaxed">
          Lebih dari sekadar ajang penyampaian opini, forum ini hadir sebagai ekosistem komprehensif untuk mengurai kompleksitas regulasi, menjembatani pemahaman antar-generasi hukum, serta merumuskan pemikiran-pemikiran kritis yang mendorong terwujudnya keadilan, kepastian, dan kemanfaatan hukum secara nyata.
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
        <ul className="space-y-4 text-charcoal">
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1 shrink-0">&#10003;</span>
            <span>Menjadi ekosistem diskusi hukum digital terdepan dan inklusif yang menghubungkan lintas generasi hukum, guna mewujudkan masyarakat yang kritis, melek literasi, dan berkeadilan.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1 shrink-0">&#10003;</span>
            <span>Menjadi pusat rujukan dialog dan pertukaran pemikiran hukum yang mensinergikan gagasan akademis dengan praktik penegakan hukum, demi mendorong pembaharuan hukum yang progresif.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1 shrink-0">&#10003;</span>
            <span>Membangun wadah interaktif yang menjembatani kesenjangan pemahaman antara teori dan praktik, serta menjadi ruang bertumbuh bagi seluruh elemen masyarakat hukum.</span>
          </li>
        </ul>
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
          Ingin Bergabung?
        </h2>
        <p className="text-charcoal mb-6 max-w-lg mx-auto">
          Gabung komunitas Diskusi Hukum dan ikut serta dalam diskusi interaktif bersama seluruh elemen masyarakat hukum.
        </p>
        <a
          href="https://wa.me/6285802042005"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-600 transition-colors"
        >
          Gabung via WhatsApp
        </a>
      </section>
    </div>
  )
}
