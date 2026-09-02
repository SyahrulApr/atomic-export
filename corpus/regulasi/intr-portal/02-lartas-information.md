---
nama_modul: "Lartas Information"
sumber_url: "https://insw.go.id/intr/asean-trade-repository"
sumber_url_tambahan:
  - "https://insw.go.id/intr (search box HS Code, tempat info Lartas per-komoditas ditampilkan)"
  - "https://api.insw.go.id/api/ref/v2/atr/web?bidang=9&parent_id=9 (Non-tariff Measures, level 1)"
  - "https://api.insw.go.id/api/ref/v2/atr/web?bidang=9&parent_id=<sub-kategori> (level 2, contoh: 126, 130, dst.)"
lembaga_pengelola: "Lembaga National Single Window (LNSW), Kementerian Keuangan RI"
tanggal_akses: "2026-09-02"
catatan_koreksi: "Bukan portal Kemendag; lihat 00-CATATAN-KOREKSI-SUMBER.md."
---

# Modul: Lartas Information

## Definisi Lartas (dari portal ini)

Lartas = **Larangan dan Pembatasan** (Export-Import Prohibitions and Restrictions), yaitu aturan
yang diterapkan Bea Cukai untuk mengendalikan ekspor/impor barang tertentu (proteksi industri
domestik, keamanan nasional, atau pemenuhan syarat internasional). Dua istilah yang muncul di kode
sumber front-end situs ini (string literal dalam bundle JS):

- **"Regulasi Ekspor (Lartas Ekspor)"**
- **"Regulasi Impor (Lartas Border)"**
- Pesan UI: *"HS Code has Lartas, see lartas"* / *"HS Code memiliki Lartas, lihat lartas"*
- Pesan lain: *"HS dimaksud tidak diatur dalam Lartas Border"* / *"...Lartas Ekspor"*

## Di Mana Lartas Ditampilkan di Portal

Ada **dua lokasi** untuk informasi Lartas di situs ini, dan keduanya tidak sepenuhnya bisa diambil
sebagai teks statis:

### 1. Terintegrasi dalam hasil pencarian HS Code (modul 01)

Ketika pengguna mencari kode HS tertentu di kotak "Cari kode HS / Uraian HS" pada halaman utama
INTR, hasil detail komoditas menyertakan status Lartas untuk kode tsb. (ada/tidak ada Lartas
ekspor, ada/tidak ada Lartas impor). Ini **memerlukan input kode HS spesifik** — tidak ada cara
menampilkan daftar semua Lartas per-komoditas tanpa mencari satu per satu.

### 2. Non-tariff Measures — ATR Indonesia (bidang=9)

Sumber: `https://insw.go.id/intr/asean-trade-repository` → kartu **"Non-tariff Measures"**. Ini
adalah taksonomi Non-Tariff Measures (NTM) versi UNCTAD/ASEAN yang dipakai ASEAN Trade Repository,
dan merupakan padanan resmi paling dekat dengan "Lartas Information" versi bahasa Indonesia. Isi
kategori level-1 (fetched via `GET /api/ref/v2/atr/web?bidang=9&parent_id=9`):

| Kode | Kategori |
|---|---|
| A | Sanitary and Phytosanitary Measures |
| B | Technical Barriers to Trade |
| C | Pre-Shipment Inspection and Other Formalities |
| D | Contingent Trade Protective Measures |
| E | Non-automatic licensing, quotas, prohibitions, and quantity control measure other than for SPS or TBT reason |
| F | Price Control Measures Including Additional Taxes and Charges |
| G | Finance Measures |
| H | Measures Affecting Competition |
| I | Trade-Related Investment Measures |
| J | Distribution Restrictions |
| K | Restriction on Post-Sales Services |
| L | Subsidies (Excluding Export Subsidies Under P7) |
| M | Government Procurement Restrictions |
| N | Intellectual Property (+ N.2 Exhaustion) |
| O | Rules of Origin (+ O2. Non preferential ROO, O9. Rules of origin n.e.s.) |
| P | Export Related Measures |

Kategori **E** (Non-automatic licensing, quotas, prohibitions...) dan **P** (Export Related
Measures) adalah kategori yang paling relevan dengan makna "Lartas" sehari-hari di Indonesia
(pembatasan impor/ekspor via lisensi/kuota/larangan).

Sub-kategori level-2 juga berhasil diambil untuk semua 16 kategori di atas (contoh untuk kategori
**E**, `parent_id=130`):

| Kode | Sub-kategori |
|---|---|
| E1 | Non-Automatic Import-Licensing Procedures Other Than Authorizations For SPS or TBT Reasons |
| E2 | Quotas |
| E3 | Prohibitions Other Than for SPS and TBT Reasons |
| E5 | Export-Restraint Arrangement |
| E6 | Tariff-Rate Quotas (TRQ) |
| E9 | Quantity Control Measures, n.e.s. |

Dan untuk kategori **P** (`parent_id=336`): P1 (SPS/TBT related export measures), P2 (Export
Formalities), P3 (Export-License, Quota, Prohibition and Other Quantitative Restrictions), P4
(Export Price-Control Measures), P5 (State-Trading Enterprises for Exporting), P6 (Export Support
Measures), P7 (Measures on Re-export), P9 (Export Measures, n.e.s.).

Daftar lengkap 16 kategori × sub-kategorinya (A1–P9, total ~90 item) berhasil diambil seluruhnya
lewat API yang sama; tidak disalin penuh di sini demi keringkasan, tapi pola/endpoint-nya identik
dengan contoh E dan P di atas (`parent_id` = id numerik tiap kategori level-1).

## GAP — Konten Aktual di Level Sub-kategori Kosong

Untuk **seluruh** sub-kategori level-2 yang dicoba (A1–A9, B1–B9, C1–C9, D1–D3, E1–E9, F1–F9,
G1–G9, H1–H9, I1–I9, J1–J9, K1–K9, M1–M9, N.1, O1, P1–P9 — 17 kategori dicek), field `content` dan
`file` API **selalu `null`**. Artinya: taksonomi/struktur Lartas (kategori & sub-kategorinya)
tersedia sebagai teks statis, **tetapi isi regulasi aktual per sub-kategori (teks aturan, nomor
Permendag/Permentan/dsb., atau file PDF) tidak dipublikasikan di level ini**. Kemungkinan konten
riil ada di level ke-3/ke-4 yang di-keyed per Bab/kode HS tertentu (mengikuti pola modul HS Code
Information di atas — butuh kode HS spesifik untuk drill-down lebih jauh), yang berarti untuk
mendapatkan isi Lartas riil untuk satu komoditas, jalur yang benar tetap lewat **pencarian kode HS
di halaman utama INTR** (modul 01), bukan lewat taksonomi NTM ini. Ini genuinely butuh interaksi
form/pencarian, tidak bisa diambil sebagai teks statis untuk kasus generik "semua Lartas".
