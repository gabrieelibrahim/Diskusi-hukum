import { articles, recentArticles } from '@/data/articles'
import { categories } from '@/data/content'
import ArticleCard from '@/components/ArticleCard'
import CategoryGrid from '@/components/CategoryGrid'
import FadeInView from '@/components/FadeInView'
import ArticleCarousel from '@/components/ArticleCarousel'

export default function HomePage() {
  return (
    <>
      {/* Hero — full screen, 2 kolom */}
      <section className="bg-white min-h-[calc(100vh-4rem)] flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight" style={{ color: '#1B2A4A' }}>
                Memahami Hukum{' '}
                <span style={{ color: '#C9A84C' }}>Indonesia</span>
                {' '}dengan Bahasa yang Jelas
              </h1>
              <p className="text-lg max-w-lg text-pretty leading-relaxed" style={{ color: '#5A6577' }}>
                Platform artikel dan komunitas yang membahas isu hukum sehari-hari dengan sumber rapi dan ruang diskusi yang tertib.
              </p>
            </div>
            <div className="hidden lg:flex justify-end pr-8">
              <img
                src="/images/hero.png"
                alt="Ilustrasi Hukum"
                className="w-full max-w-lg h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles — carousel with nav buttons */}
      <FadeInView>
      <section className="py-16" style={{ backgroundColor: '#F5F6FA' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: '#1B2A4A' }}>
              Artikel Pilihan
            </h2>
            <a
              href="/artikel"
              className="font-medium text-sm hover:underline"
              style={{ color: '#C9A84C' }}
            >
              Lihat Semua &rarr;
            </a>
          </div>
          <ArticleCarousel articles={articles.slice(0, 10)} />
        </div>
      </section>
      </FadeInView>

      {/* Categories */}
      <FadeInView>
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8" style={{ color: '#1B2A4A' }}>
            Jelajahi Kategori
          </h2>
          <CategoryGrid categories={categories} />
        </div>
      </section>
      </FadeInView>

      {/* CTA */}
      <FadeInView>
      <section className="py-16" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Ingin Berkontribusi?
          </h2>
          <p className="text-[#8490B1] max-w-xl mx-auto mb-8 text-pretty">
            Bagikan pengetahuan hukum Anda bersama komunitas. Jadi kontributor dan bantu masyarakat
            memahami hukum Indonesia.
          </p>
          <a
            href="/kontributor/daftar"
            className="inline-block text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: '#C9A84C' }}
          >
            Daftar Jadi Kontributor
          </a>
        </div>
      </section>
      </FadeInView>

      {/* Recent Articles */}
      <FadeInView>
      <section className="py-16" style={{ backgroundColor: '#F5F6FA' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8" style={{ color: '#1B2A4A' }}>
            Artikel Terbaru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
      </FadeInView>
    </>
  )
}
