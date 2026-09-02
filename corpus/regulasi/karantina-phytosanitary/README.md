---
tanggal_riset: "2026-09-02"
topik: "Phytosanitary Certificate (Barantin) untuk ekspor kopi & Health Certificate (BPOM) untuk produk pangan olahan seperti gula kelapa/gula semut — syarat, prosedur, dokumen pendukung"
---

# Indeks Folder: Karantina & Phytosanitary Certificate

## Ringkasan (.md, sudah diolah — baca ini dulu)

| File | Isi | Sumber Primer |
|---|---|---|
| `01-dasar-hukum-uu21-2019-pp29-2023-sertifikat-kesehatan-tumbuhan.md` | Dasar hukum wajib Phytosanitary Certificate untuk ekspor tumbuhan/produk tumbuhan (Pasal 239, 241, 245-246, 258, 263, 288, 314) — istilah hukum resminya "sertifikat kesehatan tumbuhan" | PP No. 29/2023 (peraturan pelaksana UU 21/2019), peraturan.bpk.go.id |
| `02-perban-9-2024-formulir-phytosanitary-certificate-dan-permohonan.md` | Format resmi & cara pengisian kolom-per-kolom Phytosanitary Certificate (KT-1) dan formulir permohonan (K-1.1), termasuk daftar dokumen persyaratan & pendukung | Perban Barantin No. 9/2024, docs.paralegal.id (cermin JDIH Barantin) |
| `03-barantin-prosedur-praktis-ekspor-karantina-tumbuhan.md` | Prosedur 12 langkah layanan sertifikasi ekspor karantina tumbuhan, sistem PTK Online/SSM QC, dokumen: invoice, packing list, K-1.1 | karantinaindonesia.go.id (UPT NTT) |
| `04-bpom-perbpom-6-2026-health-certificate-pangan-olahan.md` | Regulasi terbaru (April 2026) BPOM tentang Health Certificate/Certificate of Free Sale untuk ekspor pangan olahan (relevan untuk gula kelapa & kopi olahan bermerek), lengkap dengan checklist dokumen per jenis SKE | Peraturan BPOM No. 6/2026, peraturan.go.id |
| `05-studi-kasus-phytosanitary-kopi-gula-semut-kelapa.md` | 3 studi kasus riil penerbitan Phytosanitary Certificate: kopi Bali→AS (146,4 ton/semester), gula semut Jateng→Jerman (25 ton), kayu akasia Jateng→China (pembanding) | Berita resmi karantinaindonesia.go.id |

## Dokumen Sumber Asli (.pdf, resmi/pemerintah)

| File | Sumber URL | Domain Resmi (.go.id)? |
|---|---|---|
| `pp-29-2023-pelaksanaan-uu-21-2019-karantina.pdf` (251 hlm.) | https://peraturan.bpk.go.id/Download/306543/PP%20Nomor%2029%20Tahun%202023.pdf | Ya — BPK RI (cermin JDIH nasional) |
| `perban-9-2024-dokumen-segel-karantina.pdf` (216 hlm.) | https://docs.paralegal.id/PERATURAN-LPNK/PBARANTIN/2024/PBARANTIN-9-2024.pdf | Cermin pihak ketiga dari Perban resmi Barantin (JDIH asli `jdih.karantinaindonesia.go.id` diproteksi Cloudflare, tidak bisa diunduh langsung dalam sesi ini) |
| `perbpom-6-2026-ske-pangan-olahan.pdf` (23 hlm.) | https://peraturan.go.id/files/peraturan-bpom-no-6-tahun-2026.pdf | Ya — peraturan.go.id (portal JDIH nasional, Kemenkumham RI) |

## Peta Kelembagaan Penting (temuan riset)

- **Domain lama `karantina.pertanian.go.id` (Badan Karantina Pertanian) SUDAH MATI** (DNS tidak resolve) sejak konsolidasi ke **Badan Karantina Indonesia (Barantin)** berdasarkan UU 21/2019 & Perpres 45/2023. Domain resmi baru: **`karantinaindonesia.go.id`**. Seluruh subdomain UPT lama (`bkp1denpasar.karantina.pertanian.go.id`, `ternate.karantina.pertanian.go.id`, dll.) juga sudah mati.
- Domain baru `karantinaindonesia.go.id` menggunakan **proteksi Cloudflare managed-challenge** yang memblokir fetch otomatis polos (curl, reader-proxy) — halaman hanya bisa diambil lewat tool fetch berbasis browser sungguhan. Beberapa URL lama yang terindeks mesin pencari (mis. halaman nasional `/hal/EKSPOR-TUMBUHAN-DAN-PRODUK-TUMBUHAN`) sudah **404** — kemungkinan dipindah saat migrasi domain; konten pengganti diambil dari halaman UPT regional (Nusa Tenggara Timur) yang formatnya diasumsikan seragam antar-UPT.
- Ada **dua otoritas berbeda** yang relevan untuk "sertifikasi kesehatan" ekspor pangan berbasis tumbuhan:
  1. **Barantin** → **Phytosanitary Certificate / Sertifikat Kesehatan Tumbuhan** (fokus: bebas hama/OPT) — berbasis UU 21/2019 & PP 29/2023.
  2. **BPOM** → **Health Certificate / Certificate of Free Sale (SKE Pangan Olahan)** (fokus: keamanan pangan untuk konsumsi manusia) — berbasis Peraturan BPOM No. 6/2026 (baru terbit April 2026).
  
  Studi kasus riil (file `05`) menunjukkan bahwa untuk kopi dan gula semut/gula kelapa, sertifikat yang **secara aktif diberitakan diterbitkan adalah Phytosanitary Certificate dari Barantin** — namun regulasi BPOM tetap relevan sebagai kemungkinan jalur tambahan/alternatif tergantung permintaan spesifik negara/importir tujuan.

## Gap / Yang Tidak Berhasil Diverifikasi

1. **Nominal tarif PNBP** (baik untuk Phytosanitary Certificate di Barantin maupun SKE Pangan Olahan di BPOM) tidak ditemukan dalam dokumen-dokumen yang berhasil diakses — kedua peraturan hanya merujuk "sesuai ketentuan peraturan perundang-undangan" tanpa mencantumkan nominal. Perlu ditelusuri PP Tarif PNBP Barantin dan PP Tarif PNBP BPOM secara terpisah.
2. **Waktu layanan (SLA)** end-to-end untuk penerbitan Phytosanitary Certificate (dari pengajuan K-1.1 sampai sertifikat terbit) tidak dicantumkan eksplisit pada halaman prosedur Barantin yang berhasil diakses — hanya tersedia SLA untuk proses BPOM SKE (verifikasi akun maks. 2 hari, evaluasi dokumen maks. 1 hari kerja + clock on/off).
3. **Daftar OPTK target spesifik untuk kopi** (organisme pengganggu tumbuhan yang jadi fokus pemeriksaan khusus komoditas kopi) dan **Additional Declaration standar per negara tujuan** (AS, Uni Eropa, Jepang, China, dll.) tidak ditemukan sebagai dokumen publik yang bisa diunduh — data ini berada di sistem internal Barantin (AROPT/PTK Online) yang memerlukan akun terdaftar, di luar jangkauan riset publik.
4. **Halaman resmi nasional Barantin untuk "Ekspor Tumbuhan dan Produk Tumbuhan"** (`karantinaindonesia.go.id/hal/EKSPOR-TUMBUHAN-DAN-PRODUK-TUMBUHAN`) yang muncul di hasil pencarian mengembalikan 404 saat diakses langsung pada sesi ini — konten yang digunakan sebagai pengganti berasal dari halaman UPT regional (NTT), belum terverifikasi 100% identik dengan versi nasional (jika versi tersebut memang masih ada di URL lain).
5. **Kepastian kapan Health Certificate BPOM dibutuhkan bersamaan dengan/menggantikan Phytosanitary Certificate Barantin** untuk kasus gula kelapa/kopi olahan spesifik — tidak ditemukan dokumen resmi lintas-lembaga (Barantin + BPOM) yang menjelaskan pembagian kewenangan ini secara eksplisit; disimpulkan dari kombinasi teks regulasi + studi kasus lapangan, bukan dari satu sumber tunggal yang definitif.
6. **JDIH resmi Barantin** (`jdih.karantinaindonesia.go.id`) tidak bisa diakses langsung dari environment riset ini (403 Forbidden / proteksi WAF) — dokumen Perban No. 9/2024 diperoleh dari cermin pihak ketiga (docs.paralegal.id); disarankan verifikasi silang manual ke situs resmi jika diperlukan kepastian hukum tingkat tinggi.
