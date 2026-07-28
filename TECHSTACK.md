---
title: Tech Stack — Diskusi Hukum
project: diskusi-hukum
status: recommended
updated: 2026-07-27
---

# Tech Stack Diskusi Hukum

## Rekomendasi Utama

| Layer | Pilihan | Fungsi |
|---|---|---|
| Framework | Next.js 15/16 + TypeScript | Full-stack React, SEO bagus. |
| Styling | Tailwind CSS + shadcn/ui | Desain konsisten, cepat dibangun. |
| Database | PostgreSQL | Relasi artikel, user, kategori, tag, sumber. |
| Backend/Auth | Supabase | PostgreSQL, auth, storage, RLS. |
| ORM | Drizzle ORM | Schema dan query TypeScript. |
| CMS/Admin | Custom admin Next.js | Workflow editorial sesuai kebutuhan. |
| Editor artikel | Tiptap | Rich text untuk heading, link, callout. |
| Upload media | Supabase Storage | Cover artikel, dokumen. |
| Search MVP | PostgreSQL Full-Text Search | Tanpa layanan tambahan. |
| Search skala besar | Meilisearch | Jika konten sudah banyak. |
| Email | Resend | Newsletter, notifikasi. |
| Analytics | Plausible atau Umami | Ringan, ramah privasi. |
| Hosting | Vercel / Cloudflare Pages | Deploy cepat. |
| Alternatif hosting | Docker di VPS | Self-host, kontrol penuh. |

## Stack Minimum untuk Rilis Cepat

- Next.js + TypeScript
- Tailwind CSS
- Markdown/MDX untuk artikel awal
- Supabase (database, auth, storage)
- Vercel/Cloudflare Pages

## Struktur Data Utama

- users, authors, articles, categories, tags
- article_sources, glossary_terms, toolkits
- events, materials, topic_suggestions
- editorial_notes, comments (fase 3)

## Deployment

**Opsi A (praktis):** Vercel + Supabase
**Opsi B (self-host):** Docker + VPS + PostgreSQL + Caddy/Nginx
