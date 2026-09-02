---
tanggal_riset: "2026-09-02"
topik: "Koreksi nomor PMK dasar hukum BTKI (Buku Tarif Kepabeanan Indonesia) / sistem klasifikasi barang dan tarif bea masuk atas barang impor"
status: "terverifikasi langsung ke jdih.kemenkeu.go.id"
---

# Koreksi Nomor Peraturan: Dasar Hukum BTKI / Tarif Bea Masuk

## Ringkasan Temuan

Batch riset sebelumnya menyebut **PMK 62/2025** sebagai kemungkinan nomor yang salah untuk dasar
hukum BTKI/tarif bea masuk. Setelah verifikasi langsung ke `jdih.kemenkeu.go.id`, hasilnya:

- **PMK 62/2025 ITU NOMOR YANG NYATA/BENAR-BENAR ADA** (bukan halusinasi/salah tebak) — tetapi
  **bukan dasar hukum utama**, dan **bukan lagi versi terbaru** per tanggal riset ini (2 September
  2026). Rinciannya di bawah.
- **Dasar hukum utama (peraturan induk)** adalah **PMK No. 26/PMK.010/2022** — ini benar dan
  terkonfirmasi.
- **Versi terbaru (berlaku saat ini)** adalah **PMK No. 50 Tahun 2026** — ini juga terkonfirmasi
  **ADA dan PUBLIK** (tidak ada gap ketersediaan dokumen, meski regulasi ini sangat baru).

## Rantai Perubahan Lengkap (terverifikasi di jdih.kemenkeu.go.id)

PMK 26/PMK.010/2022 adalah peraturan induk yang telah diubah **tiga kali**:

| Urutan | Nomor Peraturan | Judul | Ditetapkan | Berlaku | Status |
|---|---|---|---|---|---|
| Induk | **26/PMK.010/2022** | Penetapan Sistem Klasifikasi Barang dan Pembebanan Tarif Bea Masuk atas Barang Impor | 24 Maret 2022 | 1 April 2022 | Masih berlaku (dengan perubahan) |
| Perubahan 1 | **PMK 10 Tahun 2024** | Perubahan atas PMK 26/PMK.010/2022 | — | 15 Februari 2024 | Berlaku, telah diubah lagi |
| Perubahan 2 | **PMK 62 Tahun 2025** | Perubahan Kedua atas PMK 26/PMK.010/2022 | 27 Agustus 2025 | 15 September 2025 | Berlaku, **telah diubah lagi oleh PMK 50/2026** |
| Perubahan 3 (TERBARU) | **PMK 50 Tahun 2026** | Perubahan Ketiga atas PMK 26/PMK.010/2022 | 15 Juli 2026 | **28 Juli 2026** s.d. dicabut | **Berlaku — ini yang harus diprioritaskan** |

Jadi nomor **26/2022** (dasar hukum) dan **50/2026** (versi terbaru) yang disebutkan di instruksi
task ini **KEDUANYA BENAR DAN TERVERIFIKASI**. PMK 62/2025 juga benar sebagai bagian dari rantai
(Perubahan Kedua), tapi sudah tidak "terbaru" lagi sejak 28 Juli 2026 karena disusul PMK 50/2026.

## Isi Utama PMK 50/2026 (Perubahan Ketiga)

Dikutip langsung dari halaman "Menimbang" PMK 50/2026 (lihat PDF):

- Insentif fiskal berupa penurunan tarif bea masuk untuk mendukung daya saing industri
  **Maintenance, Repair, and Overhaul (MRO) pesawat udara** — impor barang dan bahan tertentu.
- Insentif fiskal berupa penurunan tarif bea masuk untuk mendukung daya saing industri
  **petrokimia** — impor **Liquefied Petroleum Gas (LPG)**, termasuk tarif bea masuk **0%** untuk
  pos tarif **9845.10.00** dan **9845.20.00** selama 6 bulan sejak PMK ini berlaku.
- Ditetapkan 15 Juli 2026, diundangkan 21 Juli 2026, berlaku 28 Juli 2026.

## Koreksi Eksplisit untuk Batch Sebelumnya

> **PMK 62/2025 di batch sebelumnya TIDAK SALAH secara nomor — regulasinya memang ada dan resmi**
> (Perubahan Kedua atas PMK 26/PMK.010/2022, berlaku 15 September 2025, terverifikasi di
> jdih.kemenkeu.go.id). **Kesalahannya (jika ada) adalah kesalahan PRIORITAS/KELENGKAPAN, bukan
> kesalahan FAKTA**: jika batch sebelumnya memakai PMK 62/2025 sebagai **satu-satunya** rujukan
> tarif tanpa menyebut bahwa (a) dasar hukum induknya adalah PMK 26/2022, dan (b) PMK 62/2025 itu
> sendiri sudah disusul/diubah oleh PMK 50/2026 per 28 Juli 2026 — maka informasi tersebut
> **kedaluwarsa (outdated)** untuk kondisi per tanggal riset ini (2 September 2026), meskipun
> nomornya sendiri valid dan bukan fabrikasi.
>
> Kesimpulan: **tidak ditemukan bukti bahwa "PMK 62/2025" adalah nomor yang tidak ada/fiktif.**
> Regulasi tersebut nyata. Yang perlu dikoreksi hanyalah framing bahwa PMK 26/2022 adalah dasar
> hukum yang harus selalu dijadikan rujukan struktural, dan PMK 50/2026 adalah versi yang paling
> mutakhir yang harus diprioritaskan untuk tarif berjalan saat ini.

## Metodologi Verifikasi

1. Web search awal untuk mengonfirmasi eksistensi nomor PMK 26/2022, PMK 50/2026, dan PMK 62/2025.
2. Fetch langsung ke tiga halaman resmi di `jdih.kemenkeu.go.id` (situs resmi JDIH Kementerian
   Keuangan RI) untuk membaca metadata masing-masing peraturan (judul lengkap, tanggal ditetapkan/
   diundangkan/berlaku, status, riwayat perubahan/diubah oleh):
   - `https://jdih.kemenkeu.go.id/dok/26-pmk-010-2022`
   - `https://jdih.kemenkeu.go.id/dok/pmk-50-tahun-2026`
   - `https://jdih.kemenkeu.go.id/dok/pmk-62-tahun-2025`
3. Unduh langsung file PDF resmi (fulltext) dari masing-masing halaman tersebut dan verifikasi isi
   (`pdftotext` pada 1-3 halaman pertama tiap PDF) untuk memastikan judul dan nomor peraturan pada
   dokumen PDF cocok persis dengan metadata di halaman JDIH.

## Dokumen Sumber Asli (.pdf, resmi/pemerintah — sudah diunduh utuh)

| File | Judul Resmi | Sumber URL | Domain Resmi (.go.id)? |
|---|---|---|---|
| `pmk-26-pmk010-2022-btki-dasar-hukum.pdf` | Peraturan Menteri Keuangan No. 26/PMK.010/2022 tentang Penetapan Sistem Klasifikasi Barang dan Pembebanan Tarif Bea Masuk atas Barang Impor | https://jdih.kemenkeu.go.id/api/download/04d90736-33d5-4b72-92a3-0d2b7c6bb8bd/26~PMK.010~2022Per.pdf | Ya — JDIH Kemenkeu |
| `pmk-62-tahun-2025-perubahan-kedua-btki.pdf` | Peraturan Menteri Keuangan No. 62 Tahun 2025 tentang Perubahan Kedua atas PMK 26/PMK.010/2022 | https://jdih.kemenkeu.go.id/api/download/68f2717a-1383-48a2-a7e0-8a624030550a/2025pmkeuangan062.pdf | Ya — JDIH Kemenkeu |
| `pmk-50-tahun-2026-perubahan-ketiga-btki-terbaru.pdf` | Peraturan Menteri Keuangan No. 50 Tahun 2026 tentang Perubahan Ketiga atas PMK 26/PMK.010/2022 | https://jdih.kemenkeu.go.id/api/download/11a0ec3c-7cde-4dac-a02a-9f06d7e650f0/2026pmkeuangan050.pdf | Ya — JDIH Kemenkeu |

Catatan: PMK 10 Tahun 2024 (Perubahan Pertama) disebutkan di rantai riwayat perubahan tapi **belum
diunduh** di folder ini karena di luar cakupan permintaan (hanya diminta verifikasi nomor 26/2022
dan 50/2026). Jika dibutuhkan kelengkapan rantai penuh, PMK 10/2024 juga tersedia publik di JDIH
Kemenkeu (`jdih.kemenkeu.go.id`, judul: "Perubahan atas Peraturan Menteri Keuangan Nomor
26/PMK.010/2022...").

## Gap

**Tidak ada gap ketersediaan dokumen.** Baik PMK 26/PMK.010/2022 maupun PMK 50/2026 terbukti
**sudah dipublikasikan secara resmi dan bisa diunduh utuh** dari jdih.kemenkeu.go.id per tanggal
riset ini (2 September 2026) — dugaan awal bahwa PMK 50/2026 "mungkin belum ada publik karena
sangat baru" **tidak terbukti**; PMK 50/2026 sudah diundangkan 21 Juli 2026 dan berlaku sejak 28
Juli 2026, dan dokumennya sudah tersedia utuh (431 halaman, PDF fulltext) di situs resmi.

Satu catatan minor: PDF PMK 26/PMK.010/2022 yang diunduh adalah versi **asli 2022 (belum
ter-consolidated/ter-merge)** — artinya isi tarif per pos HS di dalamnya adalah versi awal
sebelum perubahan oleh PMK 10/2024, PMK 62/2025, dan PMK 50/2026. Untuk mengecek tarif HS Code
tertentu yang berlaku **saat ini**, perlu membaca PMK 26/2022 (struktur/BAB dasar) **bersama**
lampiran perubahan di PMK 50/2026 (dan PMK 62/2025 untuk pos yang tidak disentuh PMK 50/2026),
karena JDIH Kemenkeu tidak menyediakan versi "consolidated" siap pakai dalam satu file.
