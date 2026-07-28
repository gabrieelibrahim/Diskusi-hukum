---
title: Referensi UI — Font dan Warna — Diskusi Hukum
project: diskusi-hukum
status: reference
updated: 2026-07-27
---

# Referensi Font dan Warna untuk Diskusi Hukum

## Warna

### Palet Utama

| Peran | Warna | Kode Hex | Penggunaan |
|---|---|---|---|
| Primer | Navy Blue | `#1B2A4A` | Header, footer, tombol, navigasi |
| Sekunder | Gold | `#C9A84C` | Aksen, highlight, link, badge |
| Background | Putih | `#FFFFFF` | Latar utama |
| Background alt | Light Gray | `#F5F6FA` | Card, section alternatif |
| Teks utama | Dark Charcoal | `#1E1E1E` | Judul dan body |
| Teks sekunder | Slate Gray | `#5A6577` | Tanggal, tag, metadata |
| Border | Light Border | `#E2E5EC` | Garis pemisah |

### Palet Alternatif (lebih hangat)

| Peran | Kode Hex |
|---|---|
| Primer | `#1A3C34` (Dark Green) |
| Aksen | `#D4A843` (Warm Gold) |
| Background | `#FAF8F5` (Cream) |
| Teks | `#2C1810` (Dark Brown) |

## Font

### Kombinasi Rekomendasi — Kontemporer

| Fungsi | Font | Berat | Ukuran |
|---|---|---|---|
| Judul utama | Plus Jakarta Sans | Bold 700 | 36–48px |
| Judul artikel | Plus Jakarta Sans | SemiBold 600 | 24–32px |
| Body artikel | Merriweather | Regular 400 | 16–20px |
| Navigasi | Plus Jakarta Sans | Medium 500 | 14–16px |
| Metadata | Plus Jakarta Sans | Regular 400 | 12–14px |
| Kutipan | Merriweather | Italic 400 | 16–18px |

### Alternatif Formal

| Fungsi | Font |
|---|---|
| Judul | Playfair Display |
| Body | Merriweather |
| Navigasi | Inter |

### Alternatif Modern Bersih

| Fungsi | Font |
|---|---|
| Judul | Lora |
| Body | Source Sans Pro |
| Navigasi | Source Sans Pro |

## Implementasi Tailwind

```js
// Warna
colors: {
  primary: { 500: '#1B2A4A', ... },
  accent: { 500: '#C9A84C', ... },
}

// Font
fontFamily: {
  heading: ['Plus Jakarta Sans', 'sans-serif'],
  body: ['Merriweather', 'serif'],
}
```
