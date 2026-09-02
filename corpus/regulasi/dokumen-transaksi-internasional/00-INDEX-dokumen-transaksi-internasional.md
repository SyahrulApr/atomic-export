# Index — Dokumen Transaksi Perdagangan Internasional (lanjutan glosarium)

Cakupan: 6 topik dokumen/metode pembayaran ekspor-impor yang **belum** ada di glosarium sebelumnya (Commercial Invoice, Packing List, B/L, PEB — lihat folder lain di corpus ini).

Diambil: Hasil riset (curl langsung ke domain resmi + ekstraksi PDF resmi yang sudah ada di corpus lokal) pada sesi kerja Sep 2026, bukan timestamp otomatis.

> Catatan metodologi: Mesin pencari umum (Google/Bing/DuckDuckGo hasil terstruktur, WebSearch tool) tidak dapat diandalkan pada sesi ini (diblokir di level TLS/anti-bot atau kuota habis). Sebagai gantinya, riset dilakukan dengan (a) `curl` langsung ke domain resmi `.go.id` yang sudah diketahui (beacukai.go.id, indonesiaeximbank.go.id), dan (b) mengekstrak isi dari 2 PDF resmi yang sudah tersedia di folder `../buku-panduan-umkm/` (diunduh sesi riset sebelumnya). Tidak ada sumber non-resmi/blog/komersial yang dipakai sebagai kutipan utama.

## Daftar Berkas

| Berkas | Topik | Sumber Utama |
|---|---|---|
| `01-proforma-invoice.md` | Proforma Invoice vs Commercial Invoice | Bank Indonesia — Panduan UMKM Go Global (mirror klc2.kemenkeu.go.id) |
| `02-sales-contract.md` | Sales Contract ekspor-impor & tahapan korespondensi ekspor | Bank Indonesia — Panduan UMKM Go Global; Kemenkeu/DJBC — Buku Saku Ekspor UMKM |
| `03-letter-of-credit.md` | Letter of Credit (L/C): definisi, UCP 600, mekanisme, jenis Sight/Usance, produk LPEI | Bank Indonesia; Kemenkeu/DJBC; **Indonesia Eximbank (LPEI)** — halaman resmi indonesiaeximbank.go.id |
| `04-insurance-certificate.md` | Insurance Certificate / Asuransi Pengangkutan (marine cargo) vs Asuransi Kredit Ekspor | **Indonesia Eximbank (LPEI)** — halaman resmi produk "Asuransi Pengangkutan"; Bank Indonesia |
| `05-air-waybill.md` | Air Way Bill (AWB) vs Bill of Lading (B/L): fungsi, penerbit, perbedaan | Bank Indonesia — Panduan UMKM Go Global; Kemenkeu/DJBC |
| `06-metode-pembayaran-internasional.md` | T/T, D/P, D/A, Advance Payment, Open Account, Consignment, CAD | Bank Indonesia — Panduan UMKM Go Global; **Indonesia Eximbank (LPEI)** (definisi institusional D/P & D/A) |

## Sumber Primer yang Dipakai (semua domain resmi)

1. **Bank Indonesia** — "Panduan Persiapan UMKM Go Global: 9 Langkah Terstruktur untuk Go Global dengan Lebih Terencana" (kerja sama dengan LPEM FEB UI/ukmindonesia.id).
   - Mirror resmi (.go.id): https://klc2.kemenkeu.go.id/kms/knowledge/panduan-persiapan-umkm-go-global-9-langkah-terstruktur-untuk-go-global-dengan-lebih-terencana-eef1512f/detail/
   - Hosting primer: https://ukmindonesia.id/baca-deskripsi-posts/panduan-persiapan-umkm-go-global-9-langkah-terstruktur-untuk-go-global-lebih-terencana
   - File lokal: `../buku-panduan-umkm/panduan-umkm-go-global-9-langkah.pdf` (212 hlm.)
   - Bagian yang dikutip: Langkah 4.5 "Metode Pembayaran Ekspor" (hlm. 110-113), Langkah 8.1 "Perjanjian atau Kontrak Dagang Ekspor" (hlm. 175-179), Langkah 8.4 "Mengurus Dokumen Ekspor" (hlm. 184-186), bagian 6.5 "Memperhitungkan Risiko Transaksi dan Jaminan (Asuransi) Ekspor" (hlm. ~151-152).

2. **Kantor Wilayah DJBC Jawa Timur II / Kementerian Keuangan RI** — "Buku Saku Ekspor untuk UMKM".
   - Mirror resmi (.go.id): https://klc2.kemenkeu.go.id/kms/knowledge/buku-saku-ekspor-untuk-umkm-ebc0567e/detail/
   - File lokal: `../buku-panduan-umkm/buku-saku-ekspor-umkm-kemenkeu.pdf` (27 hlm.)
   - Bagian yang dikutip: bagian "Dokumen" (Purchase Order, Sales Contract, L/C, B/L/AWB, SKA/COO).

3. **Indonesia Eximbank (LPEI)** — halaman produk resmi, diakses langsung via curl (HTTP 200):
   - https://www.indonesiaeximbank.go.id/product-services/pembiayaan-trade-finance (L/C/SKBDN, Sight/Usance, D/P, D/A, LC Confirmation, dll.)
   - https://www.indonesiaeximbank.go.id/product-services/asuransi-pengangkutan (Marine Cargo Insurance / Insurance Certificate)

## Yang Dicoba Tapi Gagal/Tidak Dipakai (untuk transparansi)

- **djpen.kemendag.go.id / ditjenpen.kemendag.go.id**: koneksi *reset* di level TLS dari environment kerja (bukan 404) — kemungkinan pemblokiran IP/ASN pada CDN Kemendag. Tidak berhasil diverifikasi apakah ada halaman spesifik proforma invoice/sales contract/dsb di sana.
- **Halaman umum beacukai.go.id** (`/klinik-ekspor`, situs KPU/KPPBC regional seperti Soekarno-Hatta/Lampung): berhasil diakses, namun isinya bersifat promosi program konsultasi UMKM dan prosedur PEB umum — **tidak memuat** definisi rinci proforma invoice/sales contract/L/C/AWB/asuransi/T/T-D/P-D/A, sehingga tidak dipakai sebagai sumber kutipan topik-topik ini.
- **Bank BUMN** (BNI, Bank Mandiri, BRI, CIMB Niaga) halaman *trade finance*: seluruhnya berupa aplikasi web (SPA) yang kontennya dimuat via JavaScript — tidak bisa diekstrak isinya lewat `curl`/WebFetch (hanya mengembalikan *shell* HTML kosong), sehingga tidak dipakai.
- **Mesin pencari** (Google, Bing, DuckDuckGo via `curl`, dan MCP `open-websearch`): semuanya gagal — Google/Bing memerlukan JavaScript untuk render hasil, DuckDuckGo diblokir di level TLS handshake, dan MCP `open-websearch` mengembalikan 0 hasil untuk semua query termasuk yang paling sederhana. Tool `WebSearch` bawaan sudah mencapai kuota sesi (200/200) sehingga hanya 1 query pertama yang berhasil (hasil generik non-Indonesia, tidak dipakai sebagai sumber utama).

## Gap yang Tersisa

- **Asuransi Kargo secara spesifik dari OJK/Bank Indonesia sebagai regulator asuransi** (bukan dari sisi produk LPEI) belum ditemukan — OJK Sikapiuangmu (edukasi keuangan) tidak memiliki materi spesifik trade finance ekspor pada halaman yang bisa diakses.
- **Contoh format/template dokumen** (bentuk fisik Proforma Invoice, Sales Contract, Insurance Certificate) tidak disertakan — sumber yang dipakai hanya menjelaskan definisi, fungsi, dan isi konseptual, bukan contoh formulir.
- Definisi **SKBDN** (Surat Kredit Berdokumen Dalam Negeri) disebut berdampingan dengan L/C oleh Indonesia Eximbank namun tidak dibahas terpisah secara mendalam — di luar cakupan permintaan riset ini (L/C internasional, bukan SKBDN domestik).
