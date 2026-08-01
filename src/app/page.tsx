'use client'

import { useState, useEffect } from 'react'
import ArticleCard from '@/components/ArticleCard'
import FadeInView from '@/components/FadeInView'
import ArticleCarousel from '@/components/ArticleCarousel'
import { mapArticle } from '@/lib/api'

export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([])
  const [popularArticles, setPopularArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesRes, popularRes] = await Promise.all([
          fetch('/api/articles?status=published'),
          fetch('/api/articles?status=published&sort=popular&limit=10'),
        ])
        const articlesJson = await articlesRes.json()
        const popularJson = await popularRes.json()

        const allArticles = (articlesJson.data || []).map(mapArticle)
        const popular = (popularJson.data || []).map(mapArticle)

        setArticles(allArticles)
        setPopularArticles(popular)
      } catch (err) {
        console.error('Gagal memuat data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const recentArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <>
      {/* Hero — Premium Legal Consultant */}
      <section className="bg-white min-h-[calc(100vh-4rem)] flex items-center">
        <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-12 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image with badge at bottom center */}
            <div className="shrink-0 relative flex flex-col items-center -mt-6">
              <img
                src="/images/kevin.webp"
                alt="Kevin Wong, S.H."
                className="w-[280px] sm:w-[320px] lg:w-[380px] h-auto rounded-2xl"
              />
              <div className="absolute -bottom-3 bg-white rounded-xl px-10 pt-4 pb-6 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.1)]">
                <p className="font-heading text-base font-bold text-center" style={{ color: '#16253F' }}>Kevin Wong, S.H.</p>
                <p className="font-inter text-sm text-center" style={{ color: '#C9A46B' }}>Founder Diskusi Hukum</p>
              </div>
            </div>

            {/* Content */}
            <div className="min-w-0">
              <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-4" style={{ color: '#16253F', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                Kevin Wong, S.H.
              </h1>

              <h2 className="font-display font-medium leading-[1.15] mb-5" style={{ color: '#16253F', fontSize: 'clamp(1.3rem, 3vw, 2.2rem)' }}>
                Tentang Founder
              </h2>

              <div className="space-y-4 font-inter text-[15px] leading-[1.8] max-w-[580px]" style={{ color: '#666666' }}>
                <p>
                  Berlatarbelakang lulusan Fakultas Hukum dari Universitas Atma Jaya Makassar, Kevin Wong menginisiasi lahirnya Forum 
                  Diskusi Hukum dan berperan sebagai Founder. Lewat platform ini, ia berdedikasi membuka akses pembelajaran hukum yang 
                  lebih cerdas, terbuka, dan dekat dengan kehidupan sehari-hari.
                </p>
                <p>
                  Selain berkecimpung di dunia hukum, Kevin juga aktif memberikan 
                  edukasi hukum kepada masyarakat melalui berbagai kegiatan diskusi, 
                  seminar, dan media digital.
                </p>
              </div>

              <div className="mt-8 w-16 h-px" style={{ backgroundColor: '#C9A46B' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Old Hero Section — Tagline & Illustration */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight" style={{ color: "#1B2A4A" }}>
                Tentang{' '}
                <span style={{ color: '#C9A84C' }}>Diskusi Hukum</span>
              </h1>
              <p className="text-base leading-relaxed text-pretty mb-6" style={{ color: '#5A6577' }}>
                Diskusi hukum adalah ruang dialog interaktif dan wadah bertukar pikiran yang secara terbuka mempertemukan seluruh elemen masyarakat hukum, mulai dari calon maba, maba, mahasiswa, lulusan hukum, praktisi, hingga para penegak hukum.
              </p>
              <a
                href="/tentang"
                className="inline-flex items-center gap-2 font-medium text-sm transition-colors hover:brightness-110"
                style={{ color: '#C9A84C' }}
              >
                Baca Selengkapnya
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <div className="flex justify-end">
              <img
                src="/images/hero.webp"
                alt="Ilustrasi Hukum"
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles — carousel with nav buttons */}
      <FadeInView>
      {loading ? (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E2E5EC] overflow-hidden h-80 animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : (
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
          <ArticleCarousel articles={popularArticles.length > 0 ? popularArticles : articles.slice(0, 10)} />
        </div>
      </section>
      )}
      </FadeInView>

      {/* CTA — Join Community via WhatsApp */}
      <FadeInView>
      <section className="py-16" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Ingin Bergabung?
          </h2>
          <p className="text-[#8490B1] max-w-xl mx-auto mb-8 text-pretty">
            Gabung komunitas Diskusi Hukum dan ikut serta dalam diskusi interaktif bersama seluruh elemen masyarakat hukum.
          </p>
          <a
            href="https://wa.me/6285802042005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: '#C9A84C' }}
          >
            Gabung via WhatsApp
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E2E5EC] overflow-hidden h-72 animate-pulse" />
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          )}
        </div>
      </section>
      </FadeInView>
    </>
  )
}
