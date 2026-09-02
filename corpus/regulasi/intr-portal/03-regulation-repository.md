---
nama_modul: "Regulation Repository"
sumber_url: "https://insw.go.id/intr/peraturan"
sumber_url_tambahan:
  - "https://api.insw.go.id/api/ref/v2/peraturan-home"
  - "https://insw.go.id/intr/asean-trade-repository (kartu National Trade And Customs Laws And Rules)"
  - "https://api.insw.go.id/api/ref/v2/atr/web?bidang=7&parent_id=7"
lembaga_pengelola: "Lembaga National Single Window (LNSW), Kementerian Keuangan RI"
tanggal_akses: "2026-09-02"
catatan_koreksi: "Bukan portal Kemendag; lihat 00-CATATAN-KOREKSI-SUMBER.md."
---

# Modul: Regulation Repository

## Lokasi

Kartu **"Peraturan"** di halaman utama INTR (`https://insw.go.id/intr`) → mengarah ke
`https://insw.go.id/intr/peraturan`. Deskripsi resmi pada halaman:

> "Sinergi antara Kementerian dan Lembaga, Entitas Pelabuhan/Bandar Udara, Entitas
> Keuangan/Perbankan, serta Pengguna Jasa dalam rangka meningkatkan transparansi, konsistensi, dan
> efisiensi proses ekspor/impor."

Halaman ini memuat kotak pencarian ("Cari peraturan disini...") dan dua blok konten yang **tampil
default tanpa perlu input** (statis pada saat page-load):

## 1. Peraturan Terpopuler (default listing, statis)

Diambil dari `GET https://api.insw.go.id/api/ref/v2/peraturan-home` — API publik (CORS `*`) yang
sama yang dipakai front-end untuk mengisi bagian "Update Peraturan" di halaman utama maupun daftar
"Peraturan Terpopuler" di halaman ini. Per tanggal akses, 3 regulasi terbaru/terpopuler yang
tampil:

| No. Peraturan | Judul | Instansi | Bidang | Tgl. Ditetapkan | Berlaku | File |
|---|---|---|---|---|---|---|
| PMK Nomor 60 Tahun 2026 | Penetapan Tarif Bea Masuk dalam Rangka Persetujuan antara Republik Indonesia dan Jepang mengenai Suatu Kemitraan Ekonomi (IJEPA) | Kementerian Keuangan (Kemenkeu) | Impor / Tariff | 31 Juli 2026 | 1 Agu 2026 – 31 Des 2026 | `https://api.insw.go.id/assets/upload/intr/1786148550769.pdf` |
| PMK Nomor 50 Tahun 2026 | Perubahan Ketiga atas PMK Nomor 26/PMK.010/2022 tentang Penetapan Sistem Klasifikasi Barang dan Pembebanan Tarif Bea Masuk atas Barang Impor | Kementerian Keuangan (Kemenkeu) | Impor / Tariff | 15 Juli 2026 | 28 Jul 2026 – 31 Des 2026 | `https://api.insw.go.id/assets/upload/intr/1785136271629.pdf` |
| KMK Nomor 41/MK/BC/2026 | Penetapan Jenis Satuan Barang yang Digunakan dalam Pemberitahuan Pabean Ekspor | Kementerian Keuangan (Kemenkeu) | Ekspor / Tata Niaga | 29 Juni 2026 | 11 Jul 2026 – 31 Des 2026 | `https://api.insw.go.id/assets/upload/intr/1783695307522.pdf` |

Catatan: PMK Nomor 50 Tahun 2026 adalah amandemen ketiga atas PMK 26/PMK.010/2022 — regulasi dasar
BTKI 2022 yang sudah ada di korpus (`corpus/regulasi/hs-code-kopi/`,
`corpus/regulasi/hs-code-gula-kelapa/`). Ini adalah temuan baru yang relevan: **BTKI 2022 sudah
diamandemen 3× per data terbaru portal ini**, sehingga dokumen BTKI di korpus lama mungkin perlu
dicek ulang terhadap perubahan-perubahan ini jika riset menyentuh klasifikasi tarif impor terkini.

## 2. Tematik Pilihan (kategori, statis sebagai daftar; isi per-kategori interaktif)

Kartu kategori yang tersedia di halaman ini (nama kategori terverifikasi statis dari HTML render):

- **Ekspor** — "Kumpulan peraturan terkait Kegiatan Ekspor"
- **Impor** — "Kumpulan peraturan terkait Kegiatan Impor"
- **Logistik** — "Kumpulan peraturan terkait Logistik"
- **SMEs** — "Kumpulan peraturan terkait UMKM (SMEs)"
- **E-Commerce** — "Kumpulan peraturan terkait E-Commerce"

## 3. National Trade And Customs Laws And Rules — ATR Indonesia (bidang=7)

Sumber: `https://insw.go.id/intr/asean-trade-repository` → kartu "National Trade And Customs Laws
And Rules" (padanan ASEAN NTR untuk "Regulation Repository"). Isi (via
`GET /api/ref/v2/atr/web?bidang=7&parent_id=7`):

| Judul | Content | File |
|---|---|---|
| National Trade and Customs Laws | `<p>-</p>` (kosong/placeholder) | `https://api.insw.go.id/assets/upload/intr/1610695601996.pdf` |
| Rules | `<p>-</p>` (kosong/placeholder) | `https://api.insw.go.id/assets/upload/intr/1610695601996.pdf` (sama dgn di atas) |

Kedua entri memakai file PDF yang identik dan field `content` kosong (placeholder "-") — halaman
ATR untuk kategori ini kurang terawat dibanding kategori Rules of Origin (lihat file `04`), tapi
tetap ada satu dokumen PDF terlampir yang bisa diunduh.

## GAP — Katalog Penuh Butuh Interaksi

Yang berhasil diambil sebagai teks statis hanya: (a) 3 item "Peraturan Terpopuler" default, (b)
daftar nama 5 kategori tematik, dan (c) 2 item ATR "National Trade and Customs Laws and Rules".
**Katalog regulasi lengkap** (ribuan Permendag/PMK/Perdirjen lain yang diindeks situs ini) hanya
bisa diakses dengan:

1. Mengetik kata kunci di kotak pencarian "Cari peraturan disini..." (butuh query teks, tidak ada
   endpoint listing-semua yang ditemukan), atau
2. Mengklik salah satu dari 5 kartu tematik (Ekspor/Impor/Logistik/SMEs/E-Commerce), yang
   me-render daftar terfilter — dicoba di sesi ini namun klik tidak memicu navigasi/API baru yang
   bisa ditangkap (kemungkinan perlu scroll-in-view dulu agar elemen React tsb. "mounted" dan
   dapat diklik oleh automasi), sehingga endpoint filter-nya tidak berhasil diidentifikasi dalam
   sesi riset ini.

Kesimpulan: modul ini **sebagian statis** (snapshot "terpopuler" + taksonomi ATR) tapi **direktori
lengkapnya interaktif** (search-driven), konsisten dengan catatan gap yang diminta di task.
