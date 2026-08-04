import bcryptjs from 'bcryptjs'
import { db } from './index'
import {
  categories,
  tags,
  contributors,
  adminUsers,
} from './schema'
import type { NewCategory, NewTag, NewContributor, NewAdminUser } from './schema'

/**
 * Seed the database with structural/setup data only:
 * - 9 categories from the PRD
 * - All tags used across articles
 * - A single admin user (admin / admin123)
 * - A default contributor
 *
 * No sample articles or demo events are seeded — the site is live and holds
 * real content, so /api/seed must never re-insert dummy data.
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

  console.log('[seed] Seeding complete')
}
