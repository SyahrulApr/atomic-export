---
tanggal_riset: "2026-09-02"
topik: "LAMANSITU Kemendag — syarat mutu ekspor & regulasi teknis produk UMKM (pangan olahan, kerajinan tangan, kosmetik) untuk Jepang, ASEAN, Uni Eropa, dan Amerika Serikat"
---

# Indeks Folder: LAMANSITU — Syarat Mutu Ekspor

**Portal sumber:** [LAMANSITU](https://lamansitu.kemendag.go.id/) (Layanan Mandiri Informasi Mutu), dikelola Direktorat Standardisasi dan Pengendalian Mutu (Ditstandalitu), Ditjen Perlindungan Konsumen dan Tertib Niaga, Kementerian Perdagangan RI. Domain `lamansitu.kemendag.go.id` adalah subdomain resmi `kemendag.go.id`.

Portal ini mendaftar **51 kategori produk ekspor**, masing-masing dengan daftar negara tujuan yang punya halaman regulasi teknis + syarat mutu sendiri (`/content/<slug>`). Riset ini difokuskan pada 3 kategori produk yang paling relevan untuk UMKM — **Pangan Olahan**, **Kerajinan Tangan**, **Kosmetik** — untuk 4 kawasan tujuan ekspor populer: **Jepang, ASEAN, Uni Eropa, Amerika Serikat**.

## Cara Portal Ini Diakses (penting untuk riset lanjutan)

LAMANSITU **bukan** SPA/JS-heavy penuh seperti dugaan awal — situs ini adalah aplikasi server-rendered klasik (kemungkinan Laravel) dengan jQuery untuk interaktivitas. Ada dua pola berbeda:

1. **Halaman detail konten regulasi** (`/content/<slug>`, mis. `/content/persyaratan-mutu-makanan-olahan-jepang`) — **full HTML statis di response awal**, bisa langsung diambil dengan `curl`/`fetch` biasa tanpa JavaScript. Semua file `.md` di folder ini diambil dengan cara ini.
2. **Halaman listing produk** (`/product/all`) dan **listing negara per produk** — grid hasil pencarian/filter dimuat lewat `$.post()` jQuery ke endpoint yang sama dengan CSRF token (`meta[name=csrf-token]`) + cookie sesi Laravel. Ini **tidak bisa** diambil dengan satu kali `GET`/fetch teks biasa — HTML awal mengembalikan container kosong ("0 produk", "Memuat data..."). Berhasil direplikasi secara manual untuk riset ini dengan: `curl` GET awal → ambil cookie + token dari `<meta name="csrf-token">` → `curl POST` balik ke URL yang sama dengan `_token`, `keyword`, `ordering`, `page`. Ini teknis "scripting HTTP", bukan scraping browser — tidak butuh Playwright/Selenium — tapi **butuh langkah ekstra di luar fetch satu-shot standar**, jadi dicatat sebagai keterbatasan bila proses lanjutan hanya memakai tool fetch teks generik.
3. Setiap halaman detail produk (`/product/detail/<slug>`) juga punya tombol "Informasi Umum" yang memuat ringkasan singkat via AJAX (`/konten-export/content-summary/<slug>`) — tidak diambil terpisah karena isinya adalah ringkasan dari konten yang sama dengan `/content/<slug>` yang sudah diambil lengkap di folder ini.

## Ringkasan (.md, sudah diambil — cakupan riset ini)

### Pangan Olahan (Makanan Olahan) — 52 negara tujuan terdaftar di portal, mencakup 4 kawasan yang diminta

| File | Negara | Kawasan |
|---|---|---|
| `makanan-olahan_jepang.md` | Jepang | Jepang |
| `makanan-olahan_malaysia.md` | Malaysia | ASEAN |
| `makanan-olahan_singapura.md` | Singapura | ASEAN |
| `makanan-olahan_thailand.md` | Thailand | ASEAN |
| `makanan-olahan_belanda-eu.md` | Belanda | Uni Eropa |
| `makanan-olahan_jerman-eu.md` | Jerman | Uni Eropa |
| `makanan-olahan_amerika-serikat.md` | Amerika Serikat | Amerika Serikat |

### Kerajinan Tangan — 29 negara tujuan terdaftar di portal, **TIDAK mencakup ASEAN maupun Amerika Serikat** (lihat Gap)

| File | Negara | Kawasan |
|---|---|---|
| `kerajinan-tangan_jepang.md` | Jepang | Jepang |
| `kerajinan-tangan_belanda-eu.md` | Belanda | Uni Eropa |
| `kerajinan-tangan_jerman-eu.md` | Jerman | Uni Eropa |

### Kosmetik — 11 negara tujuan terdaftar di portal, **TIDAK mencakup Jepang maupun Uni Eropa** (lihat Gap)

| File | Negara | Kawasan |
|---|---|---|
| `kosmetik_amerika-serikat.md` | Amerika Serikat | Amerika Serikat |
| `kosmetik_malaysia.md` | Malaysia | ASEAN |
| `kosmetik_singapura.md` | Singapura | ASEAN |
| `kosmetik_filipina.md` | Filipina | ASEAN |

Setiap file `.md` memuat header dengan URL sumber persis, dan isi merupakan salinan apa adanya (as-is) dari HTML resmi portal (dikonversi ke Markdown lewat pandoc, tanpa perubahan substansi teks/tabel/link).

## Gap / Keterbatasan (dilaporkan jujur, tidak dipaksakan)

1. **Kerajinan Tangan tidak punya cakupan untuk ASEAN dan Amerika Serikat** di LAMANSITU per tanggal riset (2 Sep 2026). Dari 29 negara tujuan yang terdaftar untuk produk ini, seluruhnya adalah negara Uni Eropa + Jepang + Tiongkok — tidak ada Malaysia/Singapura/Filipina/Thailand ataupun Amerika Serikat. Ini bukan kegagalan fetch, tapi memang portal belum menerbitkan konten regulasi kerajinan tangan untuk kawasan tersebut.
2. **Kosmetik tidak punya cakupan untuk Jepang dan Uni Eropa** di LAMANSITU per tanggal riset. Dari 11 negara tujuan yang terdaftar, hanya mencakup Amerika Serikat, sebagian ASEAN (Malaysia, Singapura, Filipina), Turki, Chili, dan negara-negara Eurasia (Rusia, Belarus, Armenia, Kazakhstan, Kyrgyzstan). Kalau butuh syarat mutu kosmetik ke Jepang/UE, perlu sumber lain (mis. regulasi PMD Act Jepang atau EU Cosmetics Regulation 1223/2009 langsung dari sumber resmi masing-masing negara/kawasan, bukan dari LAMANSITU).
3. **"Uni Eropa" tidak direpresentasikan sebagai satu entitas tunggal** di portal — UE diwakili oleh halaman per negara anggota (Belanda, Jerman, Perancis, Italia, Spanyol, dst — total sekitar 20+ negara UE untuk Pangan Olahan, tapi hanya beberapa untuk Kerajinan Tangan). Riset ini memilih **Belanda dan Jerman** sebagai 2 negara representatif UE untuk tiap produk yang tersedia, bukan mengambil seluruh 20+ negara anggota (di luar cakupan permintaan "beberapa negara tujuan populer").
4. **Halaman listing (`/product/all`, `/country/all`) memerlukan AJAX POST + CSRF token**, tidak bisa diambil dengan satu kali fetch GET/teks statis biasa — lihat penjelasan teknis di atas. Ini berhasil diatasi dengan `curl` (2 langkah: ambil token, lalu POST) tanpa perlu browser automation, tapi tetap dicatat sebagai keterbatasan kalau proses lanjutan hanya mengandalkan tool fetch generik satu-shot (spt `WebFetch`) yang tidak mereplikasi POST+CSRF.
5. Ditemukan juga domain terkait **`inatrims.kemendag.go.id`** yang tampak sebagai portal serupa/paralel (struktur URL identik: `/product/detail/barang-besi-baja`) — kemungkinan versi lama atau mirror dari LAMANSITU untuk data lintas-negara (disebutkan mencakup 54 negara tujuan ekspor). Tidak dieksplorasi lebih jauh karena permintaan riset ini fokus ke `lamansitu.kemendag.go.id`; bisa jadi bahan riset lanjutan bila cakupan negara LAMANSITU (poin 1 & 2 di atas) tidak cukup.
6. Beberapa entri regulasi relatif pendek (mis. `makanan-olahan_malaysia.md`, `kosmetik_filipina.md`, ~3-4 KB) dibanding entri lain (mis. `makanan-olahan_amerika-serikat.md`, ~70 KB) — ini bukan potongan/fetch gagal, melainkan memang isi asli di portal untuk negara tersebut memang lebih ringkas (portal masih terus diperbarui secara bertahap oleh Kemendag, tanggal terbit tiap halaman tercantum di akhir isi masing-masing file).
