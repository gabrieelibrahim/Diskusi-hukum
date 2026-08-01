import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://diskusihukum.web.id'
  const now = new Date()

  // Halaman statis publik (yang layak di-index Google)
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/artikel`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/tentang`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/agenda`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/kontributor`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/konsultasi`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/kamus`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/kasus`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/materi`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/toolkit`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/usulkan-topik`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/pedoman-editorial`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/kontak`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ]

  // Halaman yang TIDAK boleh di-index (admin, login, privasi internal)
  // (tidak dimasukkan ke sitemap)

  return staticPages
}
