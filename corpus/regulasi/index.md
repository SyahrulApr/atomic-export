# Index Korpus Regulasi Ekspor-Impor

**Tujuan:** korpus ini adalah basis dokumen sumber (ground truth) untuk RAG Copilot regulasi ekspor-impor UMKM (fokus awal: kopi dan/atau gula kelapa, tujuan ekspor Jepang/UE/AS). Setiap dokumen yang masuk ke index vektor RAG produksi seharusnya berasal dari file berverdict **valid** di sini, dengan file **suspect** ditinjau manual lebih dulu.

> **Snapshot per:** 2026-09-02 21:19 WIB
> **Total saat ini:** 192 file, ±461 MB (471.052 KB) — lihat catatan volatilitas di bagian akhir dokumen ini.
> Path dasar: `atomic-export-fase-2/corpus/regulasi/`
>
> ⚠️ **Angka snapshot di atas SUDAH DIGANTIKAN** oleh ringkasan total di Bagian 0 tepat di bawah ini, yang dihitung ulang dari disk setelah Batch 3 selesai (folder `intr-portal/`, `insw-pdf-langsung/`, dan beberapa folder lain yang tercatat "0/kosong" pada snapshot Batch 1 sudah terisi). Angka di blockquote ini dibiarkan apa adanya sebagai arsip historis Batch 1, bukan dihapus.

---

## 0. RINGKASAN TOTAL KORPUS (FINAL — setelah Batch 1 + 2 + 3 + 4 + 5, SEMUA folder terverifikasi)

> Dihitung ulang langsung dari disk pada 2026-09-02 via `find corpus/regulasi -type f | wc -l` dan `du -sh corpus/regulasi`. Baris Batch 5 ditambahkan ~21:2x WIB; baris Batch 4 ditambahkan tepat setelah ini (angka Batch 1–3 & 5 di atas TIDAK diubah, murni penambahan baris + rekalkulasi TOTAL). Ini adalah angka final/terkini pengganti seluruh snapshot parsial di Bagian 1, 3, dan 6 di bawah (dibiarkan utuh sebagai arsip proses, sesuai aturan append-only dokumen ini).
>
> **✅ Update: Batch 4 SUDAH ADA.** Catatan Batch 3 & Batch 5 di atas sempat melaporkan "section Batch 4 tidak ditemukan" — itu benar **pada saat masing-masing ditulis** (murni soal timing, 3 subagent riset berjalan bersamaan di sesi yang sama). Section `## Batch 4 — Koreksi PMK, FTA RoO, InaExport, Sertifikasi, Dokumen Transaksi, FAQ (Final)` sekarang **sudah ada** di dokumen ini (7 folder, 31 file: 29 valid + 2 suspect). Dengan ini, **seluruh 35 folder / 206 file dokumen di korpus sudah melalui proses verifikasi minimal satu batch** — tidak ada lagi folder berstatus "belum diverifikasi sama sekali". Detail penuh di bawah dan di section Batch 4.

| Metrik | Nilai |
|---|---|
| **Total file di korpus (termasuk `index.md`)** | **207 file** |
| **Total file dokumen (di luar `index.md`)** | 206 file |
| **Total ukuran korpus** | **460 MiB / 483 MB (SI)** |
| **Total folder kategori** | 35 folder |
| **Folder sudah diverifikasi (Batch 1+2+3+4+5)** | **35 folder — SEMUA folder (206 file dicek)** |
| **Folder BELUM diverifikasi oleh batch manapun** | **0 folder** — gap ini sudah tertutup penuh setelah Batch 4 melengkapi 7 folder yang tadinya tersisa (lihat daftar Lampiran B5.6, sekarang historis) |
| **Total file VALID (Batch 1+2+3+4+5)** | **189 file** |
| **Total file SUSPECT (Batch 1+2+3+4+5, disimpan, perlu tinjauan manual sebelum ingest)** | **17 file** |
| **Total file INVALID (dihapus dari disk, Batch 1+2+3+4+5)** | **0 file** (1 file lain dihapus di Batch 5 sebagai artefak non-katalog `out_full.txt`, bukan verdict "invalid") |
| **Topik checklist RAG yang SUDAH tercakup** | **18 dari 19 topik** (16 topik dari Batch 3 + 3 topik baru ditambahkan Batch 4 — lihat "Update Checklist pasca-Batch 4") |
| **Topik checklist RAG yang MASIH BELUM tercakup** | **1 dari 19 topik** — *"simulasi perdagangan / tarif / kurs"* (kalkulator interaktif INSW, tanpa konten statis untuk diekstrak — lihat bagian "Checklist Cakupan Topik RAG") |

**Rincian per batch:**

| Batch | Folder diverifikasi | File diverifikasi | Valid | Suspect | Invalid |
|---|---|---|---|---|---|
| Batch 1 | 10 | 67 | 64 | 3 | 0 |
| Batch 2 | 8 | 50 | 47 | 3 | 0 |
| Batch 3 | 7 | 36 | 34 | 2 | 0 |
| Batch 4 | 7 | 31 | 29 | 2 | 0 |
| Batch 5 | 3 | 22 | 15 | 7 | 0 |
| **TOTAL (1+2+3+4+5)** | **35** | **206** | **189** | **17** | **0** |

**Catatan penting:** di seluruh 5 batch verifikasi (206 file dicek satu-per-satu terhadap isi dan sumber resmi — **100% dari seluruh dokumen di korpus**), **tidak pernah ditemukan satu pun file berverdict "invalid"** (rusak/tidak bisa dibuka/isi sama sekali tidak cocok dengan nomor peraturan yang diklaim) di batch manapun. Seluruh "masalah" yang ditemukan berupa (a) 17 file **suspect** — file sumbernya sendiri genuine, tapi ada ketidakcocokan pada ringkasan/metadata pendamping (tanggal, nomor Bab/Lampiran, nomor Berita Negara, generalisasi angka, atau kelengkapan sumber primer) yang perlu tinjauan manual — dan (b) sejumlah **koreksi klaim non-file** (klaim keberadaan dokumen, kepemilikan portal, urutan amandemen, atau nomor PMK yang perlu diverifikasi ulang — lihat khususnya B3.1, B4.0/B4.3, dan B5.1). Detail lengkap tiap file suspect ada di Bagian 2.1 (Batch 1), B2.2 (Batch 2), B3.2 (Batch 3), B4.2 (Batch 4), dan B5.2 (Batch 5).

**PENGUMPULAN KORPUS SELESAI — SEMUA 5 BATCH TUNTAS, SEMUA 35 FOLDER TERVERIFIKASI. Langkah berikutnya: bangun RAG pipeline (chunking, embedding, retrieval — pgvector/hybrid structured-lookup untuk HS Code/tarif). JANGAN tambah dokumen baru ke korpus ini sebelum pipeline dasar jalan**, kecuali untuk menutup salah satu dari 17 file suspect atau gap eksplisit yang sudah tercatat (mis. PMK 10/2024, PMK 82/2024) — itu masuk kategori "penyempurnaan kualitas data", bukan "pengumpulan dokumen baru". Prioritas kerja tim sekarang: (1) mulai bangun pipeline pakai 189 file valid sebagai starting corpus, (2) tinjau paralel 17 file suspect (lihat rekomendasi per file di tiap Bagian/B_.2), (3) terapkan dedup lintas-folder untuk regulasi yang tersimpan ganda (PMK 96/2023, PMK 4/2025, PMK 62/2025 — lihat B4.0 dan B5.7 poin 2) sebelum embedding agar tidak ter-index dua kali sebagai dokumen terpisah.

---

## 1. Ringkasan Status Verifikasi

Dari 33 folder yang ada di disk saat ini, **10 folder (67 file) sudah melalui proses verifikasi isi + sumber** (dicek: kecocokan isi vs judul, keaslian domain `.go.id`/`.go.jp`/institusi resmi, dan — untuk sebagian besar — checksum/byte-diff terhadap sumber live). **23 folder sisanya (≈125 file dan terus bertambah) BELUM diverifikasi** dalam batch ini — lihat Bagian 3.

| Verdict | Jumlah file (dari 67 yang diverifikasi) | Tindakan |
|---|---|---|
| **valid** | 64 | Aman dipakai sebagai sumber RAG |
| **suspect** | 3 | **Jangan dipakai dulu** — tinjau manual (detail Bagian 2.1) |
| **invalid** | 0 | Tidak ada file yang dihapus — lihat catatan di bawah |

**Catatan penting soal langkah "hapus file invalid":** dari seluruh 67 file yang diverifikasi lewat riset sebelumnya, **tidak ada satu pun berverdict "invalid"**. Semua file benar-benar ada di disk (dikonfirmasi ulang via `find` terhadap seluruh 67 path yang diklaim — 0 yang hilang) dan isinya cocok dengan sumber yang diklaim. Jadi **tidak ada file yang dihapus pada proses ini**. Yang sebelumnya sempat terlihat seperti "masalah path" di banyak catatan verifikasi (mis. "path ada duplikasi corpus/regulasi") ternyata murni typo penulisan path pada laporan verifikasi lama, bukan file yang rusak/hilang — sudah dikonfirmasi ulang di sini.

---

## 2. Tabel Per Kategori (folder yang sudah diverifikasi)

| # | Kategori | Folder | Valid | Suspect | Invalid | Catatan |
|---|---|---|---|---|---|---|
| 1 | PEB & Proses Ekspor via INSW | `peb-insw/` | 5 | 0 | 0 | Bersih, semua sumber `.go.id` (Kemenkeu, DJBC, INSW), sebagian byte-identik dengan sumber live. |
| 2 | Ketentuan Kepabeanan Ekspor Umum | `kepabeanan-umum/` | 3 | 0 | 0 | Dasar hukum inti (UU 17/2006, PMK 155/2022) — sudah diverifikasi hash identik dengan sumber. |
| 3 | Klasifikasi HS Code Kopi (0901) | `hs-code-kopi/` | 8 | 0 | 0 | Termasuk README indeks folder; seluruh PDF sumber BTKI/IJEPA identik checksum dengan server resmi. |
| 4 | Klasifikasi HS Code Gula Kelapa (1702) | `hs-code-gula-kelapa/` | 7 | 0 | 0 | Termasuk PMK 60/2026 (regulasi terbaru, sudah menggantikan PMK 50/2022 yang tetap disimpan sbg arsip historis). |
| 5 | IJEPA — Tarif Preferensi & Form COO | `ijepa-coo/` | 17 | 0 | 0 | Kategori terbesar & paling lengkap; PMK 60/61-2026, Perpres 32/2026, Basic Agreement, seluruh Annex, Operational Procedures — semua terverifikasi hash/isi. |
| 6 | Persyaratan Impor Jepang — Food Sanitation Act | `jepang-food-sanitation/` | 8 | **1** | 0 | 1 file salah sitasi nomor ayat (lihat 2.1). |
| 7 | Karantina & Phytosanitary Certificate | `karantina-phytosanitary/` | 7 | **2** | 0 | 2 file bersumber dari mirror pihak ketiga (bukan `.go.id` langsung) — isi terbukti akurat tapi provenance lemah (lihat 2.1). |
| 8 | EUDR (EU Deforestation Regulation) — Kopi | `eudr-kopi/` | 3 | 0 | 0 | Teks inti EUR-Lex + 2 rilis resmi Kementan/Kemendag. |
| 9 | NIB & Legalitas Ekspor UMKM | `nib-legalitas/` | 3 | 0 | 0 | OSS, izin edar BPOM, Permendag 23/2023. |
| 10 | Fasilitas Pembiayaan Ekspor — LPEI & KITE | `pembiayaan-ekspor/` | 3 | 0 | 0 | KITE (DJBC), LPEI/Eximbank, siaran pers Kemenko Perekonomian. |
| | **TOTAL (terverifikasi)** | | **64** | **3** | **0** | dari 67 file / 10 kategori |

**Kategori dengan gap signifikan (0-1 file valid):** **tidak ada**. Semua 10 kategori yang diverifikasi punya ≥3 file valid — tidak ada kategori yang kosong atau nyaris kosong.

### 2.1 Detail file "suspect" — REKOMENDASI EKSPLISIT

| File | Kategori | Masalah | Rekomendasi |
|---|---|---|---|
| `jepang-food-sanitation/03-peraturan-pelaksana-food-sanitation-act.md` | Food Sanitation Act | Isi dan sumber (`japaneselawtranslation.go.jp`, resmi) sudah benar, TAPI file salah kutip nomor ayat: klaim "Pasal 32 Ayat (1) Butir (v)" untuk ketentuan residu pestisida, padahal sumber asli menyebutnya di **Ayat (4) Butir (v)**. | **TINJAU MANUAL & PERBAIKI** (bukan hapus). Cukup koreksi nomor ayat di file lalu re-tandai valid. Jangan masukkan ke index RAG sebelum dikoreksi — kutipan pasal yang salah bisa menyesatkan jawaban Copilot soal ambang residu pestisida. |
| `karantina-phytosanitary/02-perban-9-2024-formulir-phytosanitary-certificate-dan-permohonan.md` | Karantina & Phytosanitary | Isi terverifikasi akurat (cocok kata-per-kata dgn PDF regulasi asli), tapi `source_url` (`docs.paralegal.id`) **bukan domain resmi pemerintah** — hanya cermin pihak ketiga karena JDIH resmi Barantin (`jdih.karantinaindonesia.go.id`) sempat diblokir Cloudflare saat riset. | **TINJAU MANUAL, lalu RE-FETCH dari sumber resmi bila memungkinkan.** Coba akses ulang `jdih.karantinaindonesia.go.id` (catatan verifikasi menyebut situs ini kadang merespons normal tanpa challenge Cloudflare) untuk mendapat salinan dari domain `.go.id` asli. Jika berhasil, ganti `source_url` dan verdict jadi valid. Jika tetap gagal, boleh tetap dipakai di RAG dengan syarat metadata mencantumkan jelas "sumber: mirror pihak ketiga, isi terverifikasi cocok dengan regulasi asli" — jangan diklaim sebagai sumber resmi pemerintah. |
| `karantina-phytosanitary/perban-9-2024-dokumen-segel-karantina.pdf` | Karantina & Phytosanitary | Sama seperti di atas — PDF 216 hlm., isi 100% otentik (nama pejabat, struktur hukum baku, checksum cocok dgn `docs.paralegal.id`), tapi provenance dari agregator pihak ketiga, bukan `barantin.go.id`/`peraturan.bpk.go.id` langsung. | **TINJAU MANUAL, lalu RE-FETCH** — perlakuan sama seperti file di atas (satu paket dokumen). Prioritas rendah untuk re-fetch karena isi sudah sangat meyakinkan validitasnya; boleh dipakai sementara di RAG staging dengan disclaimer sumber, tidak disarankan langsung ke RAG produksi tanpa upaya re-fetch minimal sekali. |

---

## 3. Folder yang BELUM Diverifikasi (di luar cakupan batch riset ini)

Struktur disk aktual memuat jauh lebih banyak folder daripada yang tercakup di 10 kategori Bagian 2. Folder-folder berikut **sudah berisi file di disk tapi belum melalui proses verifikasi domain/isi/checksum** seperti Bagian 2 — statusnya **"belum diverifikasi"**, bukan valid maupun invalid. Tim RAG **tidak boleh mengasumsikan folder ini sudah aman** hanya karena berhasil dikumpulkan.

| Folder | Jumlah file (snapshot) | Dugaan isi (dari nama file) |
|---|---|---|
| `ijepa-coo/` *(lihat catatan)* | — | sudah masuk Bagian 2 |
| `lamansitu-syarat-mutu/` | 15 | Syarat mutu ekspor per produk × negara tujuan (kerajinan tangan, kosmetik, makanan olahan → UE/Jepang/AS/Malaysia/Singapura/Filipina/Thailand) |
| `permendag-ekspor-lartas/` | 10 | Rantai amandemen Permendag 23/2023 (Larangan/Pembatasan ekspor) + file status amandemen |
| `perdirjen-peb-pib/` | 9 | Perdirjen PEB/PIB (P-22/BC/2009, PER-9/BC/2023, PER-23/BC/2022, PER-5/BC/2025) |
| `klaster2-tata-niaga-ekspor/` | 8 | Permendag 11/2024, 22/2023, 23/2023, 26/2024, 2/2025, 5/2026, 6/2026, 9/2025 (kelapa sawit & tata niaga ekspor) |
| `klaster5-teknis-lapangan/` dan `rantai-permendag-lartas-ekspor/` | 7 masing-masing | Perdirjen BC teknis lapangan; rantai amandemen Permendag 22/2023 |
| `referensi-internasional/` | 7 (masih bertambah) | Access2Markets EU (import requirements, product requirements, rules of origin), ASEAN Trade Repository |
| `klaster3-tata-niaga-impor/` | 6 | Permendag 16/2025, 18/2025, 18/2026, 24/2025, 31/2025, 37/2025 |
| `klaster1-uu-utama/`, `klaster4-kepabeanan-pajak-kiriman/`, `koreksi-btki-tarif/` | 3–5 masing-masing | UU Cipta Kerja/Perdagangan/Kepabeanan; PMK barang kiriman & FTZ; koreksi nomor PMK BTKI |
| `uu-dasar/`, `pmk-barang-kiriman/`, `permendag-impor-lartas/`, `buku-panduan-umkm/`, `klaster1-uu-utama/`, `inaexport-ditjen-pen/` | 3–4 masing-masing | UU 17/2006 & 7/2014 (md+pdf); PMK 96/2023 & 4/2025 barang kiriman; Permendag 16/2025+amandemen; buku saku ekspor UMKM; platform INAexport & FAQ Ditjen PEN |
| `dokumen-transaksi-internasional/` | 3 (masih bertambah) | Contoh dokumen transaksi (proforma invoice, dll.) |
| `rantai-pmk-barang-kiriman/`, `glosarium-incoterms/`, `per8-barang-kiriman/` | 2–3 masing-masing | PMK 111/2023 barang kiriman; glosarium kepabeanan & Incoterms 2020; PER-8/BC/2025 barang kiriman ekspor |
| `insw-pdf-langsung/` | 1 | Dokumen CMS INSW |
| `faq-lembaga/`, `fta-rules-of-origin/`, `intr-portal/`, `sertifikasi-produk/` | **0 (kosong)** | Folder placeholder — tampaknya disiapkan untuk kategori riset lanjutan yang belum diisi. |

**Rekomendasi untuk Bagian 3:** jalankan proses verifikasi yang sama seperti Bagian 2 (cek domain resmi, cocokkan isi vs judul, checksum/byte-diff ke sumber live) untuk seluruh folder ini **sebelum** dimasukkan ke index RAG produksi. Sampai verifikasi itu selesai, folder-folder ini sebaiknya diberi label metadata `verification_status: unverified` di pipeline ingestion, agar Copilot tidak menyitir dokumen yang belum tervalidasi seolah setara dengan 64 file valid di Bagian 2.

---

## 4. CATATAN KOMODITAS (WAJIB DIBACA SEBELUM INGESTION)

Folder berikut bersifat **kondisional / mutually exclusive**, tergantung keputusan tim soal komoditas pilot:

- `hs-code-kopi/` (klasifikasi HS 0901 + tarif IJEPA kopi)
- `hs-code-gula-kelapa/` (klasifikasi HS 1702 + tarif IJEPA gula kelapa)
- `eudr-kopi/` (EUDR — **hanya relevan untuk kopi**; gula kelapa/nira kelapa TIDAK termasuk 7 komoditas wajib EUDR sehingga folder ini tidak punya padanan untuk gula kelapa)

**Aturan untuk korpus RAG produksi: pilih SATU jalur komoditas, jangan gabungkan keduanya.**

- Jika pilot = **kopi** → sertakan `hs-code-kopi/` + `eudr-kopi/`, **keluarkan** `hs-code-gula-kelapa/` dari index produksi.
- Jika pilot = **gula kelapa** → sertakan `hs-code-gula-kelapa/`, **keluarkan** `hs-code-kopi/` dan `eudr-kopi/` (EUDR tidak relevan untuk komoditas ini — jangan sampai Copilot menjawab pertanyaan gula kelapa dengan aturan deforestasi yang sebenarnya untuk kopi).

Alasan: mencampur kedua HS code series dalam satu korpus RAG produksi berisiko membuat Copilot salah menjawab tarif/klasifikasi (mis. tertukar antara 0901.xx dan 1702.90.5x) atau salah menerapkan kewajiban EUDR ke komoditas yang tidak diwajibkan. Kategori-kategori lain (`peb-insw`, `kepabeanan-umum`, `ijepa-coo`, `jepang-food-sanitation`, `karantina-phytosanitary`, `nib-legalitas`, `pembiayaan-ekspor`, dan seluruh folder Bagian 3) bersifat lintas-komoditas dan aman dipakai untuk pilot manapun.

---

## 5. GAP — Dokumen yang TIDAK Berhasil Dikumpulkan

Daftar berikut adalah seluruh gap yang dilaporkan pada 10 kategori yang sudah diriset, dikonsolidasikan agar tim tahu apa yang masih perlu dicari manual. Tidak ada yang disembunyikan.

### 5.1 Kepabeanan Ekspor Umum
- Buku Saku Ekspor UMKM (klc2.kemenkeu.go.id) — perlu login/akun KLC, tidak ada link PDF publik langsung.
- UU No. 10/1995 (versi asli pra-perubahan) — sengaja tidak diambil terpisah (dianggap redundan, sudah tercakup penuh di UU 17/2006).
- Peraturan Dirjen Bea Cukai teknis tambahan (PER-32/BC/2014, dll.) — sengaja tidak diprioritaskan (fokus riset ke UMKM, bukan dokumen teknis sangat spesifik).

### 5.2 HS Code Kopi
- Tarif MFN Jepang real-time (di luar skema IJEPA) untuk HS 0901.21/0901.22 — `customs.go.jp` gagal diakses (TLS handshake failure, kemungkinan pemblokiran jaringan/region).
- Rincian pos tarif kopi dalam Protokol Perubahan IJEPA 2025 — versi publik belum ditemukan (ratifikasi Indonesia ditarget rampung semester II 2025).
- Portal interaktif INSW (SPA berbasis JavaScript) — tidak bisa di-fetch sebagai halaman statis.
- Tabel tarif PDF khusus Bab 9 kopi yang dihost langsung di `beacukai.go.id` — tidak ditemukan (situs hanya arahkan ke BTKI penuh via `jdih.kemenkeu.go.id`, sudah lebih otoritatif jadi bukan blocker).

### 5.3 HS Code Gula Kelapa
- `beacukai.go.id/btki.html` dan subdomain kanwil (bcsurakarta, bcngurahrai) — HTTP 400/DNS gagal.
- Portal e-Service INSW (`eservice.insw.go.id`) — connection failed total.
- Factsheet IJEPA Kemendag — hanya penjelasan umum SKA Form, tidak ada angka tarif spesifik HS 1702.
- Tarif MFN/eksternal Jepang riil untuk gula kelapa (Yen/kg) — kolom Base Rate kosong di Schedule of Japan (kategori "X"/dikecualikan); Jepang punya skema harga gula domestik terpisah yang perlu dicek langsung ke `customs.go.jp`.
- 2 file PDF pendukung (Schedule of Japan Annex 1, PMK 60/2026 lengkap) sudah ada dari sesi/task lain — URL unduhan asli tidak diverifikasi ulang independen di sesi HS-gula-kelapa ini (namun sudah diverifikasi independen di kategori `ijepa-coo`).
- Tidak ada pos tarif BTKI literal bernama "gula aren"/"gula semut" — pemetaan ke 1702.90.59 bersifat interpretatif; disarankan konfirmasi via Advance Ruling ke Bea Cukai untuk kepastian hukum kasus ekspor riil.

### 5.4 IJEPA — Tarif Preferensi & Form COO
- Sub-Annex 1-2 s.d. 1-15 (Notes for Schedule of Indonesia per sektor, basic agreement 2007) — tidak diunduh satu per satu (dianggap tidak krusial, sudah digantikan tarif terapan Lampiran A PMK 60/2026).
- Legal Text Trade in Services, Joint Statement, Joint Statement Nov 2006, Factsheet IJEPA, Market Intelligence Jepang — tersedia di situs Kemendag tapi di luar cakupan riset (fokus: teks perjanjian, rules of origin, Form COO, skema tarif).
- E-SKA (`e-ska.kemendag.go.id`) — tidak di-scrape karena aplikasi transaksional (perlu login eksportir), bukan dokumen regulasi.
- *(Tidak ada gap untuk dokumen utama yang diminta: PMK 60/2026, PMK 61/2026, dan Perpres 32/2026 semuanya berhasil diunduh utuh.)*

### 5.5 Persyaratan Impor Jepang — Food Sanitation Act
- Standar MRL spesifik per zat kimia untuk kopi dan gula (tabel angka ppm per pestisida per komoditas) — ada di database pencarian interaktif MHLW, tidak bisa di-fetch sebagai halaman statis.
- Halaman resmi LAMANSITU Kemendag khusus ekspor gula/pemanis ke Jepang — tidak ditemukan; halaman "Syarat Mutu Ekspor Gula Kelapa" yang ada hanya mencakup 10 negara tujuan dan **Jepang tidak termasuk**.
- Mekanisme "special license" impor gula MAFF/ALIC (termasuk tariff-rate quota) — hanya ditemukan sepintas via JETRO & laporan USDA FAS pihak ketiga, bukan halaman resmi MAFF/ALIC berbahasa Inggris.
- PDF "Guidelines on Hygiene Control of Import Processed Foods" (Notice Shoku-an No. 0605001, 5 Jun 2008) beserta checklist Excel — link resmi MHLW sudah 404.
- JETRO "Handbook for Agricultural and Fishery Products Import Regulations 2009" dan Guidebook Health Foods/Dietary Supplements — 404/bukan PDF valid saat diunduh.
- Data statistik & status compulsory testing per negara di dokumen JETRO kopi (file 06) berasal dari tahun 2011 — **sudah usang**, wajib diverifikasi ulang ke laporan monitoring tahunan MHLW terbaru (2024-2026) sebelum dipakai sebagai dasar keputusan bisnis.

### 5.6 Karantina & Phytosanitary Certificate
- Nominal tarif PNBP untuk Phytosanitary Certificate (Barantin) maupun SKE Pangan Olahan (BPOM) — tidak ditemukan sebagai dokumen publik terpisah (regulasi hanya merujuk "sesuai ketentuan perundang-undangan").
- SLA waktu layanan end-to-end penerbitan Phytosanitary Certificate — tidak dicantumkan eksplisit di halaman prosedur yang berhasil diakses.
- Daftar OPTK target spesifik untuk kopi dan Additional Declaration standar per negara tujuan — ada di sistem internal Barantin (AROPT/PTK Online) yang memerlukan login.
- Halaman nasional resmi `karantinaindonesia.go.id/hal/EKSPOR-TUMBUHAN-DAN-PRODUK-TUMBUHAN` — 404 (kemungkinan migrasi domain dari `karantina.pertanian.go.id`); diganti halaman UPT regional NTT.
- JDIH resmi Barantin (`jdih.karantinaindonesia.go.id`) — diproteksi Cloudflare/WAF saat riset (lihat juga rekomendasi re-fetch di Bagian 2.1).
- Tidak ada dokumen lintas-lembaga (Barantin + BPOM) yang eksplisit menjelaskan kapan Health Certificate BPOM dibutuhkan bersamaan/menggantikan Phytosanitary Certificate untuk kasus gula kelapa/kopi olahan spesifik — kesimpulan diturunkan dari kombinasi regulasi + studi kasus, bukan satu sumber definitif.
- Domain lama `karantina.pertanian.go.id` dan seluruh subdomain UPT-nya — mati total (DNS ENOTFOUND).

### 5.7 EUDR — Kopi
- Spesifikasi teknis lengkap khusus kopi (format data geolokasi per-lot, alur due diligence statement, skema sertifikasi setara-EUDR) — belum ada versi publik; per pernyataan Ditjenbun (Feb 2024), skema sertifikasi kopi "masih dalam pengembangan" (kalah matang dari ISPO/sawit).
- Tanggal enforcement final EUDR (Pasal 37-38) — tidak bisa dipastikan; teks 2023 asli menyebut 30 Des 2024/30 Jun 2025, tapi sudah diamandemen berkali-kali dan sumber sekunder saling berbeda menyebut tanggal berikutnya. Perlu fetch versi konsolidasi EUR-Lex terbaru secara terpisah.
- EUR-Lex memasang proteksi bot (AWS WAF) — fetch biasa (curl/WebFetch) gagal; perlu browser rendering JS untuk refetch di masa depan.

### 5.8 NIB & Legalitas Ekspor UMKM
- Halaman BPOM `istanaumkm.pom.go.id` dan subdomain terkait (e-reg, standarpangan, jdih, registrasipangan.pom.go.id) — diblokir SafeLine WAF (HTTP 468), termasuk saat dicoba via browser otomatis.
- Naskah lengkap Peraturan BPOM No. 23/2023 (pengganti 27/2017) tentang Registrasi Pangan Olahan — tidak berhasil diunduh sebagai PDF karena WAF yang sama; substansi sudah tercakup lewat Handbook Registrasi Pangan Olahan 2023.
- Halaman Kemendag `djpen.kemendag.go.id` ("Syarat Menjadi Eksportir", "Panduan Ekspor") — gagal diakses total dari berbagai jalur (curl, Googlebot UA, CDP, proxy pihak ketiga); subdomain pengganti `ditjenpen.kemendag.go.id` mengembalikan 404 untuk path yang sama.
- Portal `exim.kemendag.go.id` dan `e-ska.kemendag.go.id` — berbasis JavaScript/SPA, detail konten tidak tersalin dari fetch HTML statis.
- Detail "akses kepabeanan"/NIK Kepabeanan di `beacukai.go.id` — URL spesifik tidak ditemukan (menu berbasis JS) dan kuota WebSearch sesi riset habis sebelum sempat ditelusuri lebih lanjut.
- Lampiran I Permendag 23/2023 (daftar rinci "Barang Tertentu" wajib Eksportir Terdaftar/Persetujuan Ekspor) — tidak ikut dikutip karena di luar 10 halaman awal dokumen yang dibaca (PDF penuh 20 halaman).

### 5.9 Fasilitas Pembiayaan Ekspor — LPEI & KITE
- Halaman produk LPEI khusus "Pembiayaan UMKM" berdiri sendiri — tidak ada; rincian plafon/agunan spesifik untuk UMKM tersebar di beberapa menu produk (PMKE, PKE UKM, Trade Finance), bukan satu halaman gamblang.
- Halaman detail produk "JAMINAH" (penjaminan pemerintah LPEI) — tidak berhasil di-fetch penuh sebagai satu halaman; datanya dari ringkasan multi-halaman hasil pencarian, dan program ini ternyata eksplisit **mengecualikan UMKM**.
- Artikel berita KITE IKM di `beacukai.go.id/berita/*` — render client-side JavaScript, konten artikel tidak terambil meski HTTP 200.
- Halaman arsip lama `beacukai.go.id/arsip/fas/fasilitas-impor-tujuan-ekspor.html` — 404, kemungkinan sudah digantikan `/fasilitas-kite`.
- WebFetch bawaan gagal total ke domain `ekon.go.id` (galat verifikasi sertifikat TLS) — berhasil diakses via `curl -k` sebagai workaround.

### 5.10 Gap Meta (di luar 10 kategori di atas)
- **23 folder berisi ±125 file (dan bertambah) belum menjalani proses verifikasi apa pun** — lihat Bagian 3. Ini adalah gap terbesar dari sudut pandang tim RAG: sebagian besar volume korpus (dalam jumlah file maupun ukuran byte) saat ini berstatus tidak diketahui kualitas/keasliannya.

---

## 6. Ukuran & Volatilitas Korpus

- **Total file (snapshot 2026-09-02 21:19 WIB):** 192 file
- **Total ukuran:** 461 MB (471.052 KB) — hasil `du -sh` / `du -sk` pada `corpus/regulasi/`
- **File yang sudah diverifikasi penuh:** 67 file (64 valid + 3 suspect) — bagian dari total di atas
- **File yang belum diverifikasi:** sisanya (≈125 file dan terus bertambah)

**⚠️ Catatan volatilitas penting:** selama proses penyusunan index ini, jumlah file di korpus **berubah beberapa kali dalam hitungan menit** (172 → 175 → 178 → 186 → 192 file antar beberapa kali pengecekan `find`), terutama pada folder `referensi-internasional/`, `dokumen-transaksi-internasional/`, dan `rantai-permendag-lartas-ekspor/`. Ini mengindikasikan ada proses pengumpulan lain yang **masih berjalan bersamaan** dengan penyusunan index ini. Akibatnya:
1. Angka-angka di dokumen ini adalah **snapshot pada satu titik waktu**, bukan hitungan final yang beku.
2. Folder `faq-lembaga/`, `fta-rules-of-origin/`, `intr-portal/`, `sertifikasi-produk/` yang tercatat kosong (0 file) saat snapshot ini **mungkin sudah terisi** oleh proses lain saat dokumen ini dibaca — cek ulang sebelum menyimpulkan folder tersebut benar-benar kosong.
3. Disarankan menjalankan ulang `find corpus/regulasi -type f | wc -l` dan `du -sh corpus/regulasi` sesaat sebelum proses ingestion RAG dimulai, jangan mengandalkan angka di file ini sebagai final.

---

## 7. Rekomendasi Prioritas untuk Tim

1. **Jangan ingest folder Bagian 3 (belum diverifikasi) ke RAG produksi** sebelum melalui proses verifikasi yang sama seperti Bagian 2 — volume filenya lebih besar dari yang sudah diverifikasi, jadi risiko kualitasnya juga proporsional lebih besar.
2. **Putuskan komoditas pilot (kopi vs gula kelapa) sebelum ingestion**, lalu keluarkan folder komoditas yang tidak dipakai sesuai Bagian 4.
3. **Perbaiki 1 file suspect (`jepang-food-sanitation/03-...md`)** — koreksi nomor ayat, ini cepat dan murah dilakukan.
4. **Coba re-fetch 2 file suspect di `karantina-phytosanitary/`** dari `jdih.karantinaindonesia.go.id` langsung — jika berhasil, upgrade ke valid dengan source_url resmi.
5. Tutup gap prioritas tinggi dulu: tarif MRL pestisida spesifik kopi/gula (5.5), nominal PNBP Phytosanitary/SKE (5.6), dan spesifikasi teknis EUDR kopi (5.7) — ketiganya berdampak langsung ke akurasi jawaban Copilot soal kepatuhan ekspor.


---

## Batch 2 — Panduan UMKM, UU Dasar, Permendag, PMK, LAMANSITU, Glosarium

> **Ditambahkan:** 2026-09-02 (menyusul Batch 1 di atas — section ini murni **APPEND**, tidak ada isi Batch 1 di atas yang diubah/dihapus)
> **Cakupan:** 8 folder baru yang diverifikasi pada batch ini — `buku-panduan-umkm/`, `uu-dasar/`, `permendag-ekspor-lartas/`, `permendag-impor-lartas/`, `pmk-barang-kiriman/`, `lamansitu-syarat-mutu/`, `glosarium-incoterms/`, `perdirjen-peb-pib/`.
> Struktur folder dikonfirmasi ulang langsung dari disk (`find corpus/regulasi -maxdepth 3`) sebelum penulisan section ini — semua path di bawah adalah path yang benar-benar ada, bukan yang tertulis di laporan verifikasi asli (banyak laporan verifikasi individual menyebut path dengan duplikasi segmen `regulasi/regulasi/` atau `corpus/regulasi/corpus/regulasi/` — ini murni typo penulisan laporan, sudah dikoreksi di sini ke path aktual satu level).

### B2.0 CATATAN CAKUPAN KOMODITAS — WAJIB DIBACA

**Seluruh 8 kategori di Batch 2 ini bersifat LINTAS-KOMODITAS / BERLAKU UMUM untuk semua UMKM ekspor**, berbeda dari `hs-code-kopi/`, `hs-code-gula-kelapa/`, dan `eudr-kopi/` di Batch 1 yang isinya *kondisional* tergantung keputusan komoditas pilot (kopi vs gula kelapa). Rinciannya:

- **Buku Panduan UMKM** (`buku-panduan-umkm/`) — panduan generik "9 langkah go global" & buku saku ekspor, tidak menyebut komoditas spesifik.
- **UU Dasar** (`uu-dasar/`) — UU 7/2014 Perdagangan & UU 17/2006 Kepabeanan adalah payung hukum tertinggi, berlaku untuk semua barang ekspor-impor.
- **Permendag Ekspor/Impor Lartas** (`permendag-ekspor-lartas/`, `permendag-impor-lartas/`) — daftar larangan/pembatasan berbasis HS code lintas sektor (mineral, pertanian, elektronik, dll), bukan regulasi khusus kopi/gula kelapa.
- **PMK Barang Kiriman** (`pmk-barang-kiriman/`) — berlaku untuk semua barang kiriman ekspor ritel/e-commerce apa pun jenis produknya.
- **LAMANSITU Syarat Mutu** (`lamansitu-syarat-mutu/`) — cakupan produknya sendiri sudah generik lintas-komoditas (Pangan Olahan, Kerajinan Tangan, Kosmetik) — **tidak overlap dengan kopi/gula kelapa mentah** (yang HS code-nya ada di Batch 1), jadi aman diikutkan ke index produksi berapa pun pilot komoditasnya, TERMASUK bila pilot akhirnya bukan kopi/gula kelapa sama sekali.
- **Glosarium & Incoterms** (`glosarium-incoterms/`) — istilah kepabeanan & aturan Incoterms 2020 berlaku untuk transaksi ekspor apa pun.
- **Perdirjen PEB/PIB** (`perdirjen-peb-pib/`) — tata laksana pengisian dokumen pabean (PEB/PIB) adalah prosedur administratif umum, tidak terikat komoditas.

**Kesimpulan:** kedelapan folder Batch 2 ini **tidak perlu menunggu keputusan pilot komoditas** dan **tidak perlu dikeluarkan/disaring** seperti aturan Bagian 4 di atas untuk `hs-code-kopi/`/`hs-code-gula-kelapa/`/`eudr-kopi/`. Semua aman diikutsertakan ke index RAG produksi untuk pilot komoditas manapun.

---

### B2.1 Ringkasan Status Verifikasi

| # | Kategori | Folder | Valid | Suspect | Invalid | Catatan |
|---|---|---|---|---|---|---|
| 1 | Buku Panduan Praktis & Modul UMKM | `buku-panduan-umkm/` | 3 | 0 | 0 | Buku Saku Ekspor UMKM (Kemenkeu/DJBC Jatim II) + Panduan 9 Langkah Go Global (BI + LPEM FEB UI/UKMIndonesia.id, **bukan** Kemenkop UKM). Dokumen ke-3 (e-book Kemendag) gagal ditemukan versi resmi gratis — lihat gap B2.5.1. |
| 2 | UU Perdagangan & Kepabeanan (Dasar Hukum) | `uu-dasar/` | 4 | 0 | 0 | UU 7/2014 Perdagangan & UU 17/2006 Kepabeanan (PDF+ringkasan MD), dari JDIH BPK RI (peraturan.bpk.go.id). UU 17/2006 adalah UU **perubahan**, bukan teks konsolidasi — lihat gap B2.5.2. |
| 3 | Permendag Kebijakan & Aturan Ekspor (Lartas) | `permendag-ekspor-lartas/` | 8 | **1** | 0 | Rantai amandemen Permendag 23/2023 (induk + Perubahan 1/2/3: 11/2024, 21/2024, 9/2025) + file status. 1 file `.meta.md` suspect (lihat B2.2). **Rantai amandemen BELUM lengkap** — Perubahan Keempat & Kelima (2026) belum diunduh, lihat gap B2.5.3. |
| 4 | Permendag Kebijakan & Aturan Impor (Lartas) | `permendag-impor-lartas/` | 4 | 0 | 0 | Permendag 16/2025 (induk) + 37/2025 (Perubahan 1, bonus) + 18/2026 (Perubahan 2) + INDEX. Bersih, seluruh checksum MD5 cocok byte-identik dengan `jdih.kemendag.go.id` live. |
| 5 | PMK Barang Kiriman — Ekspor/Impor Ritel | `pmk-barang-kiriman/` | 3 | **1** | 0 | PMK 96/2023 (induk) + PMK 4/2025 (Perubahan Kedua) + 2 ringkasan MD. 1 file PDF suspect karena ringkasan pendampingnya salah kutip (lihat B2.2) — filenya sendiri genuine. |
| 6 | LAMANSITU — Syarat Mutu per Produk & Negara | `lamansitu-syarat-mutu/` | 15 | 0 | 0 | README + 14 file syarat mutu (Pangan Olahan × 7 negara, Kerajinan Tangan × 3 negara, Kosmetik × 4 negara). Kategori **terbesar** di Batch 2. Gap cakupan negara signifikan — lihat B2.5.4. |
| 7 | Glosarium Kepabeanan & Incoterms 2020 | `glosarium-incoterms/` | 2 | 0 | 0 | Glosarium kompilasi istilah kepabeanan (RESMI+KOMPILASI bertanda) + ringkasan 11 aturan Incoterms 2020. |
| 8 | Perdirjen Bea Cukai — Tata Laksana PEB/PIB | `perdirjen-peb-pib/` | 8 | **1** | 0 | PER-9/BC/2023 (ekspor, lengkap) + P-22/BC/2009 + 2 amandemennya (PER-23/BC/2022, PER-5/BC/2025) untuk impor + 5 file ringkasan/index. 1 file PDF suspect karena ringkasan pendampingnya salah sebut nomor Lampiran (lihat B2.2). |
| | **TOTAL BATCH 2** | | **47** | **3** | **0** | dari 50 file yang dilaporkan pada 8 kategori |

**Kategori dengan gap signifikan:** `lamansitu-syarat-mutu/` (kekosongan cakupan negara — kerajinan tangan tanpa ASEAN/AS, kosmetik tanpa Jepang/UE) dan `permendag-ekspor-lartas/` (rantai amandemen belum lengkap, 2 amandemen 2026 terbaru belum diunduh). Detail lengkap di B2.5.

---

### B2.2 Detail file "suspect" — REKOMENDASI EKSPLISIT

Tidak satu pun dari ketiga file berikut rusak/palsu secara fisik — sumber dan file PDF-nya genuine (diverifikasi hash/isi terhadap domain resmi). Yang bermasalah adalah **ringkasan/metadata pendamping** yang mengandung klaim keliru. **Jangan dihapus** — perbaiki metadata, lalu naikkan status ke valid.

| File | Kategori | Masalah | Rekomendasi |
|---|---|---|---|
| `permendag-ekspor-lartas/Permendag-23-2023_Kebijakan-Pengaturan-Ekspor_INDUK.meta.md` | Permendag Ekspor Lartas | Metadata keliru menyatakan (a) batang tubuh hanya 20 halaman — faktanya 46 halaman (Pasal 54 + tanda tangan ada di hlm. 46), dan (b) Lampiran I dst. (daftar HS code lartas) "tidak tergabung dalam file PDF ini" — faktanya **sudah tergabung** dalam PDF 566 halaman yang sama (Lampiran I terlihat mulai hlm. ~47). Klaim (b) berisiko tinggi menyesatkan proses chunking RAG (mengira perlu cari lampiran terpisah padahal sudah ada). | **TINJAU MANUAL & PERBAIKI.** Edit `.meta.md`: ubah "20 hlm batang tubuh" → "46 hlm batang tubuh (dari 566 hlm total termasuk Lampiran I-V)", dan hapus klaim "lampiran tidak tergabung". Setelah dikoreksi, naikkan verdict ke valid. PDF sumber (`Permendag-23-2023_..._INDUK.pdf`) sendiri **valid, jangan disentuh**. |
| `pmk-barang-kiriman/pmk-96-2023-barang-kiriman.pdf` (+ companion `00-ringkasan-pmk-96-2023-barang-kiriman.md`) | PMK Barang Kiriman | Ringkasan salah menyebut (a) tanggal mulai berlaku 17 Okt 2023 — faktanya 60 hari sejak diundangkan (18 Sep 2023) = **17 Nov 2023**, dan (b) bagian Ekspor Barang Kiriman sebagai "BAB II" — faktanya **BAB IV** sesuai struktur dokumen asli (BAB I-III mendahuluinya). | **TINJAU MANUAL & PERBAIKI** ringkasan companion: koreksi tanggal efektif ke 17 Nov 2023 dan nomor BAB ke BAB IV. PDF sumber genuine (127 hlm, metadata Author = jdih.kemenkeu.go.id) — **jangan dihapus**, hanya perbaiki teks ringkasannya. |
| `perdirjen-peb-pib/PER-23-BC-2022-perubahan-ke5-P22-BC-2009.pdf` (+ companion `03-per-23-bc-2022-perubahan-kelima-pib.md`) | Perdirjen PEB/PIB | Ringkasan mengklaim dokumen ini "mengganti Lampiran III (Customs Declaration)" — faktanya isi Pasal I dokumen hanya menyebut perubahan **Lampiran I** (form PIB/BC 2.0), dan istilah "Customs Declaration"/"BC 2.2"/"Lampiran III" **tidak ditemukan sama sekali** di seluruh 33 halaman (sudah dicek full-text + grep). | **TINJAU MANUAL & PERBAIKI.** Koreksi ringkasan/metadata: ganti "mengganti Lampiran III (Customs Declaration)" → "mengganti Lampiran I (form PIB/BC 2.0)". PDF sumber genuine (33 hlm, ttd Askolani, hash cocok dgn jdih.kemenkeu.go.id) — **jangan dihapus**. Penting diperbaiki sebelum ingestion karena bisa membuat Copilot salah menjelaskan lampiran mana yang berubah pada amandemen ini. |

---

### B2.3 File "invalid" — dihapus dari disk

**Tidak ada.** Dari seluruh 50 file yang dilaporkan pada Batch 2, **tidak ada satupun berverdict "invalid"**. Tidak ada file yang dihapus pada proses ini untuk kategori Batch 2.

---

### B2.4 Anomali non-katalog ditemukan di disk (di luar 50 file yang dilaporkan)

Saat konfirmasi ulang struktur folder, ditemukan 1 file tambahan di disk yang **tidak disebutkan sama sekali** dalam laporan hasil pengumpulan Batch 2:

- `permendag-ekspor-lartas/out_full.txt` (624 KB, 43.361 baris) — berisi dump teks mentah hasil `pdftotext` dari `Permendag-23-2023_..._INDUK.pdf` (dipakai peneliti untuk `grep` saat proses verifikasi). Ini **bukan dokumen sumber regulasi**, tidak punya metadata/source_url/verdict, dan isinya sudah 100% redundan dengan PDF asli yang sudah ada di folder yang sama.
- **Rekomendasi:** file scratch/debug ini **tidak dihapus otomatis** pada proses ini (di luar cakupan tugas yang hanya mengatur file dengan verdict eksplisit), tapi **disarankan dibersihkan manual** oleh tim sebelum ingestion RAG — biarkan hanya file `.pdf`/`.meta.md` yang terkatalog yang masuk index produksi, jangan sampai `out_full.txt` ikut ter-embed sebagai "dokumen" terpisah karena isinya duplikat PDF induk tanpa konteks/metadata.

---

### B2.5 GAP — Dokumen yang TIDAK Berhasil Dikumpulkan (per kategori)

#### B2.5.1 Buku Panduan Praktis & Modul UMKM
- Dokumen ke-3 "E-Book Panduan Ekspor Praktis untuk UMKM" (Kemendag) **tidak ditemukan** sebagai publikasi resmi gratis — judul yang sama hanya ditemukan sebagai produk berbayar lembaga pelatihan swasta non-pemerintah (Optima Learning, Kelas Ekspor Impor), bukan domain `.go.id`.
- Halaman resmi lama Kemendag/DJPEN "Panduan Ekspor" (`djpen.kemendag.go.id/app_frontend/links/65-panduan-ekspor`) sudah 404/mati sejak awal April 2024 (migrasi ke `ditjenpen.kemendag.go.id`); snapshot Wayback terakhir (Sep 2023) adalah SPA berbasis JS tanpa link PDF statis yang bisa direkonstruksi.
- Domain `djpen.kemendag.go.id` tidak bisa diakses dari environment kerja (TLS handshake sukses tapi koneksi reset saat request body dikirim) — perlu dicek manual via browser biasa.
- Subdomain `ppei.kemendag.go.id` (Pusat Pendidikan & Pelatihan Ekspor) sudah tidak resolve DNS sama sekali.
- Situs baru `ditjenpen.kemendag.go.id/publikasi` hanya berisi majalah bulanan "Warta Ekspor", bukan buku panduan praktis UMKM.
- Publisher dokumen #2 aktual adalah Bank Indonesia + LPEM FEB UI + UKMIndonesia.id, **bukan** Kementerian Koperasi dan UKM seperti disebut di task awal — tidak ditemukan bukti kemenkopukm.go.id mempublikasikan versi terpisah/independen.
- Kuota WebSearch sesi habis di tengah pencarian dokumen #3; pencarian tambahan lewat tool alternatif banyak gagal/rate-limited — ada kemungkinan kecil sumber resmi terlewat.

#### B2.5.2 UU Perdagangan & Kepabeanan (Dasar Hukum)
- UU 17/2006 adalah UU **perubahan**, bukan teks konsolidasi utuh — untuk teks lengkap terkonsolidasi (UU 10/1995 + perubahan 17/2006) masih perlu mengunduh terpisah UU No. 10 Tahun 1995 tentang Kepabeanan.
- Kedua file diunduh dari `peraturan.bpk.go.id` (JDIH BPK RI), bukan langsung dari `jdih.kemendag.go.id`/`jdih.kemenkeu.go.id` (yang hanya mengarah ke halaman viewer, bukan file PDF unduhan langsung) — sudah dicek silang identitas dokumen (nomor, tanggal, LN/TLN) konsisten.
- Peraturan pelaksana turunan (PP, Permendag, PMK tarif) tidak termasuk unduhan ini — sudah ada folder korpus terpisah untuk itu.
- Tidak ada verifikasi checksum/hash resmi (JDIH BPK tidak mempublikasikan hash) — identitas diverifikasi via judul, jumlah halaman, nomor LN/TLN.

#### B2.5.3 Permendag Ekspor & Impor (Lartas)
- **Ekspor:** Permendag 23/2023 sudah diubah **LIMA KALI** hingga 2 Sep 2026 (11/2024, 21/2024, 9/2025, Perubahan Keempat 2026 [nomor belum terverifikasi], Permendag 12/2026 sebagai Perubahan Kelima). Hanya 3 dari 5 amandemen yang berhasil diunduh — **Permendag 12/2026 (Perubahan Kelima, berlaku 29 Apr 2026, kewenangan penangguhan/pembekuan/pencabutan izin ekspor) BELUM diunduh**, halaman JDIH ditemukan tapi PDF belum diambil. Perubahan Keempat (diduga "Permendag 5/2026") juga belum ditemukan/dikonfirmasi.
- Tidak ada naskah konsolidasi/jo resmi dari Kemendag untuk Permendag 23/2023 — RAG produksi perlu logika precedence manual antar 5 dokumen amandemen, bukan cukup 1 file.
- PDF Permendag 9/2025 diambil dari `peraturan.bpk.go.id` (bukan `jdih.kemendag.go.id` langsung) karena link unduhan resmi Kemendag untuk regulasi ini tidak ditemukan.
- Analisis isi Lampiran I/III/IV/V (daftar HS code lartas yang benar-benar berlaku HARI INI) belum dilakukan — perlu membandingkan isi lampiran 9/2025 vs kemungkinan perubahan lanjutan di amandemen 2026 (500+ halaman, di luar cakupan sesi ini).
- **Impor:** relatif lebih lengkap — rantai 16/2025 → 37/2025 (Perubahan 1) → 18/2026 (Perubahan 2) sudah lengkap terunduh, tidak ada gap signifikan untuk sisi impor.

#### B2.5.4 LAMANSITU — Syarat Mutu per Produk & Negara
- **Kerajinan Tangan TIDAK punya cakupan negara ASEAN maupun Amerika Serikat** di LAMANSITU per 2 Sep 2026 — dari 29 negara tujuan terdaftar untuk produk ini, semuanya UE + Jepang + Tiongkok saja. Ini kekosongan data portal, bukan kegagalan fetch.
- **Kosmetik TIDAK punya cakupan Jepang maupun Uni Eropa** — dari 11 negara tujuan terdaftar, hanya AS, sebagian ASEAN (Malaysia/Singapura/Filipina), Turki, Chili, dan negara Eurasia. Untuk syarat mutu kosmetik ke Jepang/UE perlu sumber lain di luar LAMANSITU (mis. PMD Act Jepang, EU Cosmetics Regulation 1223/2009 langsung).
- "Uni Eropa" tidak ada sebagai satu entitas tunggal di portal — direpresentasikan per negara anggota; riset ini hanya mengambil sampel 2 negara (Belanda & Jerman) per produk yang tersedia.
- Halaman listing utama portal (`/product/all`, `/country/all`) tidak bisa di-fetch dengan satu kali GET biasa (perlu replikasi POST+CSRF token) — keterbatasan nyata bila proses berikutnya hanya pakai tool fetch generik satu-shot.
- Domain terkait `inatrims.kemendag.go.id` (struktur serupa, disebut mencakup 54 negara tujuan) ditemukan tapi **belum dieksplorasi** — bisa jadi sumber tambahan untuk menutup gap cakupan negara di atas.

#### B2.5.5 Glosarium Kepabeanan & Incoterms 2020
- Tidak ada satu halaman glosarium resmi tunggal di `beacukai.go.id`/`insw.go.id` untuk istilah dokumen dagang non-hukum (B/L, Commercial Invoice, Packing List, L/C) — istilah ini dari praktik dagang internasional (KUHD, UCP 600 ICC), dikompilasi dari 3 sumber edukasi non-pemerintah (ditandai transparan sebagai KOMPILASI, bukan RESMI).
- Definisi Letter of Credit dari regulator keuangan RI (OJK/BI) belum ditelusuri.
- Domain `djpen.kemendag.go.id` (halaman resmi Incoterms Kemendag) konsisten menolak/reset koneksi pada setiap percobaan — perlu dicoba ulang manual via browser biasa.
- Teks resmi lengkap ICC Incoterms 2020 berbayar/berlisensi — ringkasan pakai sumber sekunder (trade.gov, OVRSEA), bukan kutipan literal ICC. `trade.gov` juga gagal diverifikasi live dari sandbox riset ini (kemungkinan diblokir jaringan, bukan bukti sumber palsu).
- Kuota WebSearch sesi habis di tengah riset — pendalaman lanjutan (definisi PIB resmi alternatif, SKA umum, sumber Incoterms Indonesia lain) tidak sempat dilakukan.

#### B2.5.6 Perdirjen Bea Cukai — Tata Laksana PEB/PIB
- Nomor **PER-9/BC/2023 untuk sisi ekspor sudah terkonfirmasi lengkap** — satu dokumen ini sudah memuat tata laksana + bentuk/isi/petunjuk pengisian PEB (Lampiran I), tidak ada gap untuk sisi ekspor.
- **Sisi impor (PIB) tidak punya Perdirjen tunggal sekelas PER-9/BC/2023** — regulasi induk masih P-22/BC/2009 (tahun 2009, prefiks nomor lama) yang sudah diamandemen 6 kali; belum ada naskah konsolidasi resmi ditemukan. Amandemen nomor 1-4 (P-41/BC/2010, PER-44/BC/2011, PER-20/BC/2016, PER-04/BC/2018) **belum diunduh**, hanya diketahui namanya dari sitiran internal.
- Pencarian padanan langsung PER-9/BC/2023 untuk sisi impor (semacam PER-26/BC/2017) tidak menghasilkan tautan PDF resmi terverifikasi.
- Tautan unduhan diambil dari mirror `jdih.kemenkeu.go.id`, bukan langsung dari `beacukai.go.id`/`peraturan.beacukai.go.id` — direktori beacukai.go.id dikonfirmasi memuat entri metadata yang sama tapi tautan unduhan PDF langsungnya belum dicoba.
- Tidak ada verifikasi kriptografis/hash resmi terhadap tanda tangan elektronik dokumen (hanya dicocokkan checksum MD5 terhadap salinan live JDIH, bukan sertifikat digital).

#### B2.5.7 PMK Barang Kiriman
- Definisi operasional "tidak ditujukan untuk kegiatan usaha" pada pengecualian lartas Pasal 47 ayat (1a)-(1b) PMK 4/2025 tidak dijelaskan lebih lanjut — perlu Perdirjen/SE DJBC turunan untuk kriteria teknis (ambang nilai/frekuensi kiriman personal vs komersial).
- PMK 111/2023 (Perubahan Pertama atas PMK 96/2023) **belum diunduh** dalam kategori ini — hanya disebut sebagai konteks historis (catatan: PMK 111/2023 sudah ada di folder terpisah `rantai-pmk-barang-kiriman/` per struktur disk, di luar cakupan Batch 2 ini).
- Peraturan pelaksana teknis (Perdirjen/SE DJBC format elektronik CN/PEB/PKBK yang disesuaikan field baru PMK 4/2025) belum dicari.
- Bagian impor barang kiriman (nilai pabean de minimis, tarif PPN/PPh impor, relaksasi fiskal) tidak dirangkum — di luar fokus riset (ekspor UMKM).
- Ketentuan bea keluar per komoditas (HS code & tarif %) tidak diatur di PMK ini — diatur PMK terpisah, perlu dicari tersendiri untuk komoditas seperti kulit mentah/kayu/rotan/sawit.
- Tanggal pasti pengundangan (Berita Negara) PMK 4/2025 tidak tercetak jelas di PDF — tanggal efektif 5 Maret 2025 dikutip dari sumber sekunder, sebaiknya dikonfirmasi ulang dari Berita Negara resmi.

---

### B2.6 Total Batch 2 (final)

| Metrik | Jumlah |
|---|---|
| File dilaporkan pada 8 kategori Batch 2 | 50 |
| **Valid (disimpan, aman untuk RAG)** | **47** |
| **Suspect (disimpan, TIDAK dihapus — perlu tinjauan/koreksi metadata manual dulu)** | **3** |
| **Invalid (dihapus dari disk)** | **0** |
| Anomali non-katalog ditemukan (tidak dihapus, direkomendasikan cleanup manual) | 1 (`permendag-ekspor-lartas/out_full.txt`) |

**Tidak ada file yang dihapus pada Batch 2** — seluruh 50 file yang dilaporkan genuine secara fisik (PDF tidak korup, isi cocok domain resmi). 3 file suspect punya masalah pada **metadata/ringkasan pendamping**, bukan pada file sumber itu sendiri, sehingga direkomendasikan **diperbaiki**, bukan dihapus.

**Kategori dengan gap paling signifikan:** (1) `lamansitu-syarat-mutu/` — kekosongan cakupan negara untuk Kerajinan Tangan (tanpa ASEAN/AS) dan Kosmetik (tanpa Jepang/UE); dan (2) `permendag-ekspor-lartas/` — rantai amandemen belum lengkap (2 dari 5 amandemen 2026 belum diunduh, termasuk Permendag 12/2026 yang sudah diketahui berlaku sejak 29 Apr 2026). Kategori lain (Buku Panduan, UU Dasar, Permendag Impor, Glosarium, Perdirjen PEB/PIB) relatif lengkap dengan gap minor.

---

## Batch 3 — Peraturan Spesifik Terverifikasi, Portal INTR, PDF INSW

> **Ditambahkan:** 2026-09-02 (menyusul Batch 1 dan Batch 2 di atas — section ini murni **APPEND**, tidak ada isi Batch 1/Batch 2 yang diubah/dihapus)
> **Cakupan:** verifikasi 28 klaim nomor peraturan spesifik yang tersebar di 5 klaster (`klaster1-uu-utama/` s.d. `klaster5-teknis-lapangan/`), ditambah riset ulang Portal INTR (`intr-portal/`, 6 file) dan 1 PDF INSW langsung (`insw-pdf-langsung/`) — total **7 folder baru** diverifikasi, **36 file** dicek satu per satu.
> Struktur folder dikonfirmasi ulang langsung dari disk (`find corpus/regulasi -type f`) sebelum penulisan section ini — seluruh path di bawah adalah path aktual di disk (subfolder `klasterN-.../`), bukan path datar `corpus/regulasi/<file>.pdf` yang tertulis di banyak laporan verifikasi individual (murni typo penulisan laporan, sudah dikoreksi di sini).

### B3.0 Ringkasan Status Verifikasi per Klaster

| # | Kategori | Folder | Valid | Suspect | Invalid | Catatan |
|---|---|---|---|---|---|---|
| 1 | UU Utama | `klaster1-uu-utama/` | 3 | 0 | 0 | UU 7/2014 Perdagangan, UU 17/2006 Kepabeanan, UU 6/2023 Penetapan Perppu Cipta Kerja — ketiganya byte-identik (MD5/SHA256 cocok) dengan sumber live `peraturan.go.id`. |
| 2 | Tata Niaga Ekspor | `klaster2-tata-niaga-ekspor/` | 8 | 0 | 0 | Permendag 23/2023 (induk) + amandemen 11/2024, 9/2025, 5/2026; Permendag 22/2023 (induk larangan) + amandemen 6/2026; 26/2024 + 2/2025 (sawit). Nomor semua benar, tapi ada 1 klaim keberadaan dokumen yang **tidak akurat** — lihat B3.1 poin 3. |
| 3 | Tata Niaga Impor | `klaster3-tata-niaga-impor/` | 5 | **1** | 0 | Permendag 16/2025 (induk), 18/2026, 18/2025, 31/2025, 24/2025 → valid. **Permendag 37/2025 → suspect** (file berwatermark "RANCANGAN", nomor Berita Negara tidak tercantum di isi PDF — lihat B3.2). |
| 4 | Kepabeanan, Pajak & Barang Kiriman | `klaster4-kepabeanan-pajak-kiriman/` | 4 | **1** | 0 | PMK 4/2025, PMK 50/2024, PMK 62/2025, PMK 113/2024 → valid. **PMK 96/2023 → suspect** (tanggal efektif salah kutip di ringkasan — lihat B3.2; ada duplikat masalah yang sama di file Batch 2 `pmk-barang-kiriman/pmk-96-2023-barang-kiriman.pdf`). |
| 5 | Teknis Lapangan (Dirjen/Keputusan Menteri Bea Cukai) | `klaster5-teknis-lapangan/` | 7 | 0 | 0 | PER-9/BC/2023, PER-22/BC/2024, PER-4/BC/2025, KEP-97/BC/2025, 14/MK/BC/2026, 40/MK/BC/2026, 19/KM.4/2025 — semua hash-identik dengan `jdih.kemenkeu.go.id`/`repository.beacukai.go.id`. Catatan: 14/MK/BC/2026 sudah **dicabut** oleh KMK 41/MK/BC/2026 (11 Jul 2026) — disimpan sbg arsip historis sesuai versi yang diminta, bukan aturan yang berlaku saat ini. |
| 6 | Portal INTR (riset ulang sumber) | `intr-portal/` | 6 | 0 | 0 | Lihat **koreksi paling krusial di B3.1 poin 1** — portal ini BUKAN milik Kemendag seperti asumsi awal. |
| 7 | PDF INSW — Link Langsung | `insw-pdf-langsung/` | 1 | 0 | 0 | File genuine & bisa diunduh, TAPI ternyata **bukan dokumen peraturan** — lihat B3.1 poin 2. |
| | **TOTAL BATCH 3** | | **34** | **2** | **0** | dari 36 file yang diverifikasi pada 7 kategori |

---

### B3.1 KOREKSI — Klaim yang Ternyata Salah / Tidak Akurat (WAJIB DIBACA sebelum dipakai di proposal/pitch)

Berbeda dari Batch 1 & 2 (yang nyaris tidak ada koreksi substansial), Batch 3 menemukan **beberapa koreksi penting**, terutama menyangkut identitas kepemilikan portal dan klaim keberadaan satu dokumen. Nomor peraturan dari 28 klaim spesifik (UU, Permendag, PMK, Perdirjen/KMK BC) itu sendiri **semuanya terverifikasi BENAR** — tidak ada satu nomor pun yang salah ketik/salah tahun. Koreksi di bawah ini semuanya bersifat **substansi/klasifikasi**, bukan salah nomor:

| # | Klaim awal | Fakta terverifikasi | Dampak jika tidak dikoreksi |
|---|---|---|---|
| 1 | **INTR adalah portal resmi milik Kementerian Perdagangan**, domain `intr.kemendag.go.id` | Domain `intr.kemendag.go.id` **tidak eksis** (DNS NXDOMAIN). Portal resmi yang aktif adalah **`https://insw.go.id/intr`**, dikelola **Lembaga National Single Window (LNSW) di bawah Kementerian Keuangan RI** — bukan Kemendag. Kemendag hanya salah satu K/L yang regulasinya diindeks di portal ini. | **Tinggi** — proposal/pitch yang menyebut INTR sebagai "sistem Kemendag" akan salah menyebut pemilik/pengelola sistem ke reviewer/investor. |
| 2 | `insw-pdf-langsung/insw-dokumen-cms.pdf` adalah dokumen **peraturan** (disimpan di folder `corpus/regulasi/`) | Isi dokumen ternyata **"User Manual Document — Indonesia National Trade Repository (INTR)"** — buku panduan penggunaan aplikasi (dibuat MS Word, penulis "Faisal", 53 hlm.), **bukan naskah hukum**. Tidak ada pasal/ayat/pengesahan pejabat; satu-satunya "nomor peraturan" yang disebut (Perpres 44/2018) hanya kutipan definisi, bukan identitas dokumen itu sendiri. | Sedang — file tidak boleh disitir sebagai sumber hukum di RAG; disarankan pindah ke folder non-regulasi (mis. `corpus/panduan-aplikasi/`). |
| 3 | Ada "Permendag/Rancangan Kebijakan Ekspor 2026 tentang Ketentuan Ekspor Tumbuhan Alam dan Satwa Liar (TASL) bidang Perikanan" sebagai dokumen tersendiri | **Tidak ditemukan** dokumen berdiri sendiri dengan judul tsb di JDIH Kemendag maupun `peraturan.go.id`. Pengalihan kewenangan dokumen angkut TASL perairan (Kehutanan → KKP, sesuai UU 32/2024) **hanya klausul di dalam Permendag No. 5 Tahun 2026** — dan setelah PMK/Permendag 5/2026 dicek ulang full-text, klausul TASL/KKP/"32 Tahun 2024" tsb **TIDAK ditemukan sama sekali** di 562 halaman dokumen itu juga. | **Tinggi** — klaim ini tidak berdasar pada bukti dokumen manapun yang berhasil ditemukan; JANGAN dipakai sebagai dasar klaim regulasi di proposal sampai sumber aslinya (jika ada) ditemukan. |
| 4 | Judul PMK 96/2023 sering disingkat "Ketentuan Kepabeanan atas Impor dan Ekspor Barang Kiriman" | Judul resmi lengkap: **"Ketentuan Kepabeanan, Cukai, dan Pajak atas Impor dan Ekspor Barang Kiriman"** (ada unsur Cukai & Pajak yang sering hilang saat disingkat). | Rendah — hanya presisi judul saat disitir. |
| 5 | PMK 62/2025 kadang dirujuk seolah regulasi BTKI/tarif berdiri sendiri | Judul resmi: **"Perubahan Kedua atas PMK Nomor 26/PMK.010/2022 tentang Penetapan Sistem Klasifikasi Barang dan Pembebanan Tarif Bea Masuk atas Barang Impor"** — basis hukum utama BTKI tetap **PMK 26/PMK.010/2022** (belum ada di korpus secara terpisah, hanya versi excerpt HS 1702 di `hs-code-gula-kelapa/`), PMK 62/2025 hanyalah amandemen keduanya. | Sedang — untuk menjawab pertanyaan HS Code/tarif BTKI, RAG idealnya punya PMK 26/2022 dasar + PMK 62/2025 amandemen bersamaan, bukan PMK 62/2025 saja. |
| 6 | Permendag 5/2026 & 6/2026 sempat di-framing seolah regulasi baru berdiri sendiri | Judul resmi keduanya adalah **"Perubahan Keempat"** — atas Permendag 23/2023 (untuk 5/2026) dan atas Permendag 22/2023 (untuk 6/2026). Substansinya (penyederhanaan PE/LS timah & migas; update lampiran barang dilarang ekspor termasuk penghapusan total beras dari daftar larangan) tetap akurat, hanya framing judulnya perlu diluruskan sebagai amandemen, bukan regulasi induk baru. | Rendah — substansi benar, hanya perlu presisi saat mengutip nomor "jo." rantai amandemen. |

**Kesimpulan koreksi:** dari 28 nomor peraturan spesifik yang diklaim, **0 nomor yang salah** — tapi ditemukan **1 koreksi berdampak tinggi** (kepemilikan Portal INTR bukan Kemendag), **1 koreksi klasifikasi dokumen** (PDF INSW bukan peraturan), **1 klaim keberadaan dokumen yang tidak berdasar** (TASL Perikanan), dan **3 klarifikasi judul/framing minor** (semua nomor tetap benar).

---

### B3.2 File "suspect" — REKOMENDASI EKSPLISIT (JANGAN dihapus, tinjau manual dulu)

| File | Masalah | Rekomendasi |
|---|---|---|
| `klaster3-tata-niaga-impor/Permendag_37_2025_Perubahan_atas_Permendag_16_2025.pdf` | Regulasi & sumbernya genuine — JDIH Kemendag mengonfirmasi Permendag 37/2025 benar ada, ditetapkan & diundangkan 22 Okt 2025, BN 2025 No.855. TAPI **file fisik di corpus adalah versi berwatermark "RANCANGAN"** (bukan salinan final terundangkan): kolom "Diundangkan pada tanggal…" kosong dan nomor Berita Negara tidak tercantum sama sekali di dalam teks PDF itu sendiri (hanya bisa diverifikasi lewat halaman JDIH eksternal, bukan dari isi file). Duplikat file identik byte-per-byte juga ada di `permendag-impor-lartas/Permendag-37-2025_..._BONUS.pdf` (Batch 2) — masalah yang sama berlaku di sana. | **JANGAN dihapus.** **Re-fetch versi final terundangkan** dari `jdih.kemendag.go.id` (pastikan mengambil link dokumen final, bukan draft/rancangan) sebelum dimasukkan ke index RAG produksi — versi draft berisiko memuat pasal yang berbeda dari versi resmi yang berlaku. |
| `klaster4-kepabeanan-pajak-kiriman/PMK_96_2023_Ketentuan_Kepabeanan_Cukai_Pajak_Barang_Kiriman.pdf` | Identitas file benar & sah (127 hlm., watermark `jdih.kemenkeu.go.id` resmi, nomor & judul cocok 100%). TAPI ringkasan klaim menyebut "berlaku efektif 17 Oktober 2023" — **PADAHAL Pasal 76 dokumen sendiri menyatakan berlaku 60 hari sejak diundangkan (18 September 2023) = 17 November 2023**, selisih satu bulan. Ini adalah **masalah yang identik** dengan file suspect Batch 2 `pmk-barang-kiriman/pmk-96-2023-barang-kiriman.pdf` — kedua salinan (Batch 2 dan Batch 3) dari PDF yang sama-sama berasal dari `jdih.kemenkeu.go.id` konsisten mengonfirmasi tanggal efektif yang benar adalah 17 November 2023. | **JANGAN dihapus** — PDF sumber genuine, tidak perlu re-fetch. Cukup **koreksi tanggal efektif menjadi 17 November 2023** pada metadata/ringkasan di KEDUA salinan (`klaster4-kepabeanan-pajak-kiriman/` dan `pmk-barang-kiriman/`), lalu naikkan verdict kedua salinan menjadi valid. |

**File "invalid":** **tidak ada** pada Batch 3. Dari 36 file yang diverifikasi, 0 berverdict invalid — tidak ada file yang dihapus dari disk pada batch ini.

---

### B3.3 GAP — Dokumen/Info yang Belum Lengkap (per kategori, Batch 3)

**Klaster 1 (UU Utama):**
- UU 6/2023 (1127 hlm., memuat lampiran teks lengkap Perppu Cipta Kerja) belum diekstrak/dipisah per-bab (mis. bab khusus OSS/UMKM) — masih dalam bentuk 1 file omnibus besar.
- Belum dicek versi konsolidasi terkini UU 7/2014 & UU 17/2006 pasca berbagai perubahan lanjutan.

**Klaster 2 (Tata Niaga Ekspor):**
- Rantai amandemen Permendag 23/2023 & 22/2023 punya lebih banyak versi antara yang belum diunduh (Permendag 21/2024, 10/2024, 20/2024, 8/2025, 12/2026) — tidak diminta eksplisit di klaim, tapi relevan untuk precedence lengkap.
- PDF Permendag 23/2023 dari `peraturan.go.id` berukuran 566 hlm/33MB — belum dipastikan semuanya relevan/murni Permendag 23/2023 atau tergabung dokumen lain.
- Klaim TASL Perikanan tidak terpenuhi (lihat B3.1 poin 3) — tidak ada dokumen pengganti yang diunduh untuk topik ini.

**Klaster 3 (Tata Niaga Impor):**
- Permendag 18/2025 sudah diamandemen lagi oleh Permendag 11/2026 (Perubahan Kedua) yang belum diunduh — Permendag 31/2025 di corpus baru amandemen pertama.
- Paket deregulasi impor 2025 Kemendag (Permendag 17/2025 tekstil, 19/2025 garam & perikanan, 20/2025 bahan kimia, 21/2025 elektronik, 22/2025 & 23/2025 barang industri/konsumsi) belum diunduh — di luar cakupan klaim, disebut untuk konteks riset lanjutan.
- Belum ada pengecekan status "Berlaku/Tidak Berlaku" resmi eksplisit dari filter JDIH untuk keenam regulasi klaster ini.

**Klaster 4 (Kepabeanan, Pajak & Barang Kiriman):**
- PMK 26/PMK.010/2022 (basis hukum utama BTKI yang diamandemen PMK 62/2025) belum diunduh utuh sebagai dokumen tersendiri.
- Peraturan pelaksana teknis level Dirjen (juklak PMK 113/2024, format CN turunan PMK 4/2025) belum diunduh — hanya level PMK (Menteri) yang tercakup.
- Perkembangan lanjutan pasca PMK 62/2025 (revisi BTKI lebih baru) belum dicek per hari laporan ini.

**Klaster 5 (Teknis Lapangan):**
- PER-9/BC/2023 sudah dicabut sebagian oleh PER-27/BC/2024 & PER-8/BC/2025 — bagian yang dicabut belum diunduh terpisah.
- 14/MK/BC/2026 sudah dicabut seluruhnya oleh KMK 41/MK/BC/2026 (berlaku sejak 11 Jul 2026) — **41/MK/BC/2026 belum diunduh**; jika kebutuhan RAG adalah aturan satuan barang ekspor yang berlaku SAAT INI, dokumen yang benar adalah 41/MK/BC/2026, bukan 14/MK/BC/2026.
- KEP-97/BC/2025 (E-Seal) sudah diubah KEP-188/BC/2025 — perubahannya belum diunduh/diverifikasi.
- KMK 19/KM.4/2025 merujuk KMK 18/KM.4/2025 sebagai dasar — dokumen dasar ini belum diunduh.

**Portal INTR:**
- Modul HS Code Information & Lartas Information — hanya taksonomi/struktur kategori yang berhasil diambil, **konten regulasi aktual per-kode/per-kategori kosong (null)** di API untuk hampir semua sub-kategori yang dicoba (~90 item) — data hanya muncul lewat pencarian interaktif per kode HS, tidak bisa dienumerasi statis.
- Modul Regulation Repository — hanya 3 "Peraturan Terpopuler" default yang berhasil diambil; katalog penuh (ribuan regulasi) hanya bisa diakses via pencarian teks bebas/klik kartu tematik, belum berhasil dipicu dalam sesi ini.
- Modul Trade Simulation — **GAP TOTAL**, kalkulator murni interaktif (7 field wajib diisi manual: kegiatan, negara asal, tanggal, kurs, HS Code, jenis tarif, nilai CIF) tanpa satupun output/contoh statis yang bisa diekstrak sebagai dokumen. **Ini adalah penyebab utama topik checklist "simulasi perdagangan/tarif/kurs" berstatus BELUM tercakup** (lihat bagian Checklist di akhir dokumen).
- Modul Rules of Origin — tidak ada gap berarti, hierarki 3 tingkat (Topic > Sub Topic > FTA) berhasil diambil lengkap termasuk PDF Product Specific Rules AANZFTA/AKFTA/AIFTA.

**PDF INSW:**
- Dokumen ini adalah manual aplikasi, bukan teks hukum, sehingga tidak bisa dipakai sebagai sumber sitasi pasal/ayat — jika riset butuh teks hukum ekspor-impor asli yang dirujuk sekilas di manual ini (Perpres 44/2018), perlu diunduh terpisah (belum ada di korpus mana pun sejauh ini).

---

### B3.4 Total Batch 3 (final)

| Metrik | Jumlah |
|---|---|
| Folder baru diverifikasi | 7 |
| File dilaporkan pada 7 kategori Batch 3 | 36 |
| **Valid (disimpan, aman untuk RAG)** | **34** |
| **Suspect (disimpan, TIDAK dihapus — perlu tinjauan manual, lihat B3.2)** | **2** |
| **Invalid (dihapus dari disk)** | **0** |
| Koreksi klaim non-nomor ditemukan (lihat B3.1) | 6 (1 berdampak tinggi: kepemilikan Portal INTR) |

**Tidak ada file yang dihapus pada Batch 3** — dari 36 file yang diverifikasi, seluruhnya genuine secara fisik (PDF valid, hash/isi cocok domain resmi `.go.id`). 2 file suspect bermasalah pada tanggal efektif/status draft (bukan file rusak), sehingga direkomendasikan **ditinjau & diperbaiki metadatanya**, bukan dihapus.

---

## Checklist Cakupan Topik RAG

> Dicek terhadap seluruh dokumen yang sudah masuk korpus dari Batch 1, Batch 2, dan Batch 3 (baik yang sudah diverifikasi formal maupun yang statusnya "belum diverifikasi" di Bagian 3 — untuk kolom "Dokumen pendukung" di bawah, file dari folder belum-diverifikasi tetap dicantumkan sebagai bukti keberadaan konten, dengan catatan status verifikasinya).

| # | Topik | Status | Dokumen pendukung |
|---|---|---|---|
| 1 | Apa itu ekspor | **Tercakup** | `klaster1-uu-utama/UU_07_2014_Perdagangan.pdf` (Bab V — Perdagangan Luar Negeri); `buku-panduan-umkm/panduan-umkm-go-global-9-langkah.pdf`; `faq-lembaga/faq-kemendag-ekspor-impor.md`; `inaexport-ditjen-pen/faq-ekspor-ditjen-pen.md` |
| 2 | Siapa yang boleh mengekspor | **Tercakup** | `nib-legalitas/syarat-legalitas-eksportir-pemula.md`; `klaster2-tata-niaga-ekspor/Permendag_23_Tahun_2023_...pdf` (Perizinan Berusaha di Bidang Ekspor); `klaster1-uu-utama/UU_07_2014_Perdagangan.pdf` |
| 3 | NIB dan akses kepabeanan | **Tercakup** (dengan catatan) | `nib-legalitas/nib-oss.md`; `nib-legalitas/syarat-legalitas-eksportir-pemula.md` (menjelaskan akses kepabeanan/NIK Kepabeanan terintegrasi NIB). Catatan: detail teknis "akses kepabeanan" di `beacukai.go.id` masih dari sumber sekunder (gap Batch 1 §5.8), disarankan verifikasi ulang langsung ke situs DJBC. |
| 4 | PEB / CN | **Tercakup (kuat)** | `peb-insw/` (5 file); `perdirjen-peb-pib/` (PER-9/BC/2023, P-22/BC/2009 + amandemen); `klaster5-teknis-lapangan/PER-22-BC-2024_Pemberitahuan-Pabean-Ekspor.pdf`; `klaster4-kepabeanan-pajak-kiriman/PMK_4_2025_...pdf` (Consignment Note/CN barang kiriman) |
| 5 | HS Code | **Tercakup (kuat)** | `hs-code-kopi/` (8 file, HS 0901); `hs-code-gula-kelapa/` (7 file, HS 1702); `klaster4-kepabeanan-pajak-kiriman/PMK_62_2025_...pdf` (amandemen BTKI); `koreksi-btki-tarif/`; `intr-portal/01-hs-code-information.md` |
| 6 | Lartas (larangan/pembatasan) | **Tercakup (kuat)** | `klaster2-tata-niaga-ekspor/Permendag_22_Tahun_2023_...pdf` + rantai amandemen s.d. `Permendag_6_Tahun_2026`; `klaster3-tata-niaga-impor/Permendag_18_2025_...pdf`, `Permendag_24_2025_...pdf`; `permendag-ekspor-lartas/`, `permendag-impor-lartas/`, `rantai-permendag-lartas-ekspor/`; `klaster5-teknis-lapangan/40-MK-BC-2026_...pdf`, `19-KM4-2025_...pdf` |
| 7 | Invoice | **Tercakup** | `dokumen-transaksi-internasional/01-proforma-invoice.md`; `glosarium-incoterms/glosarium-kepabeanan.md` |
| 8 | Packing list | **Tercakup** (via glosarium + referensi lintas dokumen, belum ada file berdiri sendiri) | `glosarium-incoterms/glosarium-kepabeanan.md`; disinggung di `dokumen-transaksi-internasional/05-air-waybill.md`, `kepabeanan-umum/prosedur-umum-ekspor-beacukai.md`, `nib-legalitas/syarat-legalitas-eksportir-pemula.md` |
| 9 | Bill of Lading / Airway Bill | **Tercakup (kuat)** | `dokumen-transaksi-internasional/05-air-waybill.md` (secara eksplisit membandingkan AWB vs B/L); `glosarium-incoterms/glosarium-kepabeanan.md`; `buku-panduan-umkm/buku-saku-ekspor-umkm-kemenkeu.pdf` |
| 10 | Pemeriksaan fisik | **Tercakup** | `kepabeanan-umum/prosedur-umum-ekspor-beacukai.md`; `faq-lembaga/faq-bea-cukai-ekspor-impor.md`; `karantina-phytosanitary/03-barantin-prosedur-praktis-ekspor-karantina-tumbuhan.md`; `uu-dasar/uu-17-2006-kepabeanan.md` |
| 11 | Karantina | **Tercakup (sangat kuat)** | `karantina-phytosanitary/` (9 file: UU 21/2019, PP 29/2023, Perban 9/2024, PerBPOM 6/2026, studi kasus kopi/gula semut/kelapa) |
| 12 | Perpajakan | **Tercakup** (granularitas bea keluar per komoditas masih gap) | `klaster4-kepabeanan-pajak-kiriman/PMK_96_2023_...pdf` & `PMK_4_2025_...pdf` (pajak barang kiriman); `PMK_62_2025_...pdf` & `hs-code-*` (tarif bea masuk); `faq-lembaga/faq-bea-cukai-ekspor-impor.md`. Catatan: bea keluar per komoditas spesifik (mis. kulit mentah/kayu/sawit) belum ada dokumen terpisah (gap Batch 2 §B2.5.7). |
| 13 | Penentuan harga ekspor (FOB, CFR, CIF) | **Tercakup** | `glosarium-incoterms/incoterms-2020.md` (ringkasan 11 aturan Incoterms 2020 termasuk FOB/CFR/CIF) |
| 14 | Rules of Origin | **Tercakup (sangat kuat)** | `fta-rules-of-origin/` (5 file: RCEP, ATIGA, IACEPA, IKCEPA, ketentuan umum SKA); `ijepa-coo/` (17 file, termasuk Annex 2 Product Specific Rules & form COO); `intr-portal/04-rules-of-origin.md`; `referensi-internasional/access2markets-rules-of-origin.md` |
| 15 | Simulasi perdagangan / tarif / kurs | **BELUM tercakup** | `intr-portal/05-trade-simulation.md` secara eksplisit melaporkan **GAP TOTAL** — modul kalkulator INSW murni interaktif (7 field wajib diisi manual: kegiatan, negara asal, tanggal, kurs, HS Code, jenis tarif, nilai CIF), tidak ada satupun output/contoh perhitungan statis yang berhasil diekstrak sebagai dokumen sumber. **Tidak ada dokumen lain di korpus manapun (Batch 1/2/3) yang mengisi gap ini.** |
| 16 | Requirement ekspor/impor per negara tujuan | **Tercakup** (gap cakupan negara tertentu) | `lamansitu-syarat-mutu/` (15 file: Pangan Olahan × 7 negara, Kerajinan Tangan × 3 negara, Kosmetik × 4 negara); `referensi-internasional/access2markets-*` (EU); `jepang-food-sanitation/` (9 file, khusus Jepang). Catatan: Kerajinan Tangan tanpa ASEAN/AS, Kosmetik tanpa Jepang/UE (gap Batch 2 §B2.5.4). |

**Ringkasan checklist: 15 dari 16 topik SUDAH tercakup (beberapa dengan catatan minor), 1 topik BELUM tercakup sama sekali** — *"simulasi perdagangan / tarif / kurs"*, karena satu-satunya sumber yang relevan (`intr-portal/05-trade-simulation.md`) adalah kalkulator interaktif tanpa konten statis yang bisa diekstrak. **Rekomendasi:** untuk menutup gap ini, tim perlu (a) mencari contoh perhitungan tarif/kurs pajak ekspor-impor dari sumber lain (mis. dokumentasi API `api.insw.go.id` bila tersedia publik, atau contoh kasus simulasi dari buku panduan UMKM), atau (b) menerima gap ini sebagai keterbatasan RAG dan mengarahkan Copilot untuk menyarankan pengguna memakai kalkulator resmi di `insw.go.id/intr/simulasi` secara langsung untuk pertanyaan jenis ini, bukan menjawab dari korpus statis.

### Update Checklist pasca-Batch 4

Batch 4 (di bawah) meng-*upgrade* status verifikasi 7 dari 10 folder yang saat checklist di atas pertama ditulis (setelah Batch 3) masih berstatus "belum diverifikasi": `dokumen-transaksi-internasional/`, `faq-lembaga/`, `fta-rules-of-origin/`, `inaexport-ditjen-pen/`, `koreksi-btki-tarif/`, `per8-barang-kiriman/`, `sertifikasi-produk/` — total **31 file (29 valid + 2 suspect)** kini resmi **terverifikasi**, bukan sekadar "ada isinya". Ini menaikkan tingkat kepercayaan kutipan dari folder-folder itu untuk topik #1, #5, #7, dan #14 di atas, dan menambah 3 topik baru:

| # | Topik baru (pasca-Batch 4) | Status | Dokumen pendukung |
|---|---|---|---|
| 17 | Sertifikasi produk untuk ekspor (HACCP/GMP/Halal/SVLK/ISPM15/Perikanan) | **Tercakup (kuat)**, 1 gap (ISPM15 — lihat B4.2) | `sertifikasi-produk/` (6 file: PerBPOM 10/2023, PerBPOM 22/2021, PP 42/2024, Permen LHK 21/2020, Permen KP 17/2019) |
| 18 | Program dukungan pemerintah untuk UMKM ekspor (Ditjen PEN, InaExport) | **Tercakup** | `inaexport-ditjen-pen/` (3 file) |
| 19 | FAQ resmi lembaga (tanya-jawab langsung, pelengkap teks legal) | **Tercakup (kuat)** | `faq-lembaga/` (3 file, 216 Q&A gabungan Bea Cukai + OSS + Kemendag) |

**Ringkasan checklist FINAL (19 topik):** **18 dari 19 topik sudah tercakup**, hanya **1 topik** (`#15 — simulasi perdagangan/tarif/kurs`) yang masih belum tercakup sama sekali — gap ini murni karena sumbernya (kalkulator interaktif INSW) tidak punya konten statis untuk diekstrak, bukan karena riset kurang dalam. **Ini sudah lebih dari cukup untuk memulai pilot RAG.**

---

## Batch 4 — Koreksi PMK, FTA RoO, InaExport, Sertifikasi, Dokumen Transaksi, FAQ (Final)

> **Ditambahkan:** 2026-09-02 (menyusul Batch 1, 2, dan 3 di atas — section ini murni **APPEND**, tidak ada isi batch sebelumnya yang diubah/dihapus)
> **INI ADALAH BATCH TERAKHIR fase pengumpulan korpus** — lihat deklarasi resmi penutupan di Bagian 0.
> **Cakupan:** 7 folder baru diverifikasi — `koreksi-btki-tarif/`, `per8-barang-kiriman/`, `fta-rules-of-origin/`, `inaexport-ditjen-pen/`, `sertifikasi-produk/`, `dokumen-transaksi-internasional/`, `faq-lembaga/` — total **31 file** dicek satu per satu (eksistensi + ukuran dicek `du -h`, isi 3 PDF kategori 1 di-spot-check `pdftotext`).

### B4.0 Koreksi Paling Penting Batch Ini: Rantai PMK BTKI/Tarif Bea Masuk

Batch 3 (B3.1 poin 5) sudah mencatat bahwa dasar hukum utama BTKI (PMK 26/PMK.010/2022) "belum ada di korpus secara terpisah". **Batch 4 menutup gap itu**, sekaligus memverifikasi ulang dengan bukti fulltext PDF langsung dari `jdih.kemenkeu.go.id`:

- **PMK 26/PMK.010/2022** (dasar hukum/induk BTKI) — **sekarang tersedia utuh**, `koreksi-btki-tarif/pmk-26-pmk010-2022-btki-dasar-hukum.pdf`. Valid.
- **PMK 62 Tahun 2025** (Perubahan Kedua) — **BUKAN nomor yang salah/fiktif seperti sempat diduga di instruksi batch ini.** Regulasi ini nyata & resmi (ditetapkan 27 Agu 2025, berlaku 15 Sep 2025) — dikonfirmasi ulang dengan fulltext PDF di sini, konsisten dengan salinan yang sudah lebih dulu divalidasi terpisah di Batch 3 (`klaster4-kepabeanan-pajak-kiriman/PMK_62_2025_...pdf`). Kesalahan (bila ada di framing sebelumnya) murni soal **prioritas**, bukan fakta nomor: PMK 62/2025 bukan dasar hukum utama (itu PMK 26/2022) dan bukan lagi versi terbaru.
- **PMK 50 Tahun 2026** (Perubahan Ketiga, **TERBARU**) — ditetapkan 15 Jul 2026, diundangkan 21 Jul 2026, **berlaku 28 Jul 2026**, harus diprioritaskan untuk tarif BTKI terkini. Tersedia utuh, `koreksi-btki-tarif/pmk-50-tahun-2026-perubahan-ketiga-btki-terbaru.pdf`.

**Rantai lengkap terverifikasi:** PMK 26/PMK.010/2022 (induk) → PMK 10/2024 (Perubahan 1, belum diunduh) → **PMK 62/2025** (Perubahan 2, berlaku 15 Sep 2025) → **PMK 50/2026** (Perubahan 3, TERBARU, berlaku 28 Jul 2026). Metodologi: fetch 3 halaman JDIH resmi + `pdftotext` cross-check judul/nomor. Detail di `koreksi-btki-tarif/00-koreksi-nomor-pmk-btki-tarif-bea-masuk.md`.

**Catatan duplikasi (bukan cacat):** PMK 62/2025 kini tersimpan di **dua path** (`koreksi-btki-tarif/...` dan `klaster4-kepabeanan-pajak-kiriman/...` dari Batch 3) — keduanya *valid*, tidak bertentangan. **Rekomendasi ingestion:** dedup berdasarkan nomor peraturan, bukan path file, agar regulasi yang sama tidak ter-*embed* dua kali sebagai dua "dokumen".

### B4.1 Ringkasan Status Verifikasi

| # | Kategori | Folder | Valid | Suspect | Invalid | Catatan |
|---|---|---|---|---|---|---|
| 1 | Koreksi BTKI/Tarif Bea Masuk (dasar hukum) | `koreksi-btki-tarif/` | 5 | 0 | 0 | PMK 26/2022 (induk) + PMK 62/2025 + PMK 50/2026 (terbaru), fulltext, judul/nomor cocok isi PDF. Lihat B4.0. |
| 2 | PER-8/BC/2025 — Ekspor Barang Kiriman | `per8-barang-kiriman/` | 2 | 0 | 0 | 67 hlm., ditetapkan 30 Jun 2025, berlaku 30 hari kemudian (30 Jul 2025). Mencabut HANYA Pasal 5 PER-9/BC/2023 (bukan seluruh PER-9/BC/2023). |
| 3 | FTA Rules of Origin — RCEP/ATIGA/IA-CEPA/IK-CEPA | `fta-rules-of-origin/` | 4 | **1** | 0 | RoO 4 skema FTA + ketentuan umum SKA (Permendag 59/2019). 1 suspect (RCEP) — lihat B4.2. |
| 4 | InaExport & Ditjen PEN — Panduan Bisnis | `inaexport-ditjen-pen/` | 3 | 0 | 0 | FAQ resmi Ditjen PEN di `ditjenpen.kemendag.go.id` (BUKAN `djpen.kemendag.go.id` yang mati) + overview platform `inaexport.id`. |
| 5 | Sertifikasi Produk — HACCP/GMP/Halal/SVLK/ISPM15/Perikanan | `sertifikasi-produk/` | 5 | **1** | 0 | PerBPOM 10/2023 (HACCP/PMR), PerBPOM 22/2021 (GMP/CPPOB), PP 42/2024 (Halal — **tenggat UMK 17 Okt 2026**), Permen LHK 21/2020 (SVLK), Permen KP 17/2019 (SKP). 1 suspect (ISPM15) — lihat B4.2. |
| 6 | Dokumen Transaksi Internasional | `dokumen-transaksi-internasional/` | 7 | 0 | 0 | Proforma Invoice, Sales Contract, L/C, Insurance Certificate, AWB, 8 metode pembayaran — disusun ulang dari 2 PDF **Bank Indonesia** yang sudah ada di `buku-panduan-umkm/`. |
| 7 | FAQ Resmi — Bea Cukai/OSS/Kemendag | `faq-lembaga/` | 3 | 0 | 0 | 53 Q&A Bea Cukai + 17 Q&A OSS (NIB) + 160 Q&A Kemendag (`ditjendaglu.kemendag.go.id`), verbatim, sebagian via browser otomatis (situs SPA). |
| | **TOTAL BATCH 4** | | **29** | **2** | **0** | dari 31 file pada 7 kategori |

### B4.2 File "suspect" — REKOMENDASI EKSPLISIT

| File | Masalah | Rekomendasi |
|---|---|---|
| `fta-rules-of-origin/01-rcep-roo.md` | Isi diturunkan dari Panduan Teknis ROO RCEP (Kemendag × LPEM FEB UI, sumber sekunder-praktis), sudah cross-check ke teks legal Chapter 3 RCEP. RCEP **tidak** punya satu angka RVC generik seperti ATIGA (40%) — threshold-nya per kode HS di Annex 3A, sehingga contoh "40%" di sumber berisiko disalahpahami sebagai aturan umum bila dikutip lepas konteks. | **TINJAU MANUAL** sebelum ingest — pastikan chunking RAG menyertakan disclaimer "threshold RVC RCEP bervariasi per HS code (Annex 3A), bukan angka tunggal". Bukan file rusak — jangan dihapus. |
| `sertifikasi-produk/05-ispm15-fumigasi-kemasan-kayu-karantina.md` | **Gap terbesar dari 6 file kategori ini** — tidak ditemukan nomor Permentan/Perban Barantin spesifik untuk ISPM15 meski sudah dicari di `peraturan.bpk.go.id`; `ippc.int` (sumber standar internasional) memblokir fetch (HTTP 403). Isi berbasis pengetahuan umum tentang ISPM15, **bukan kutipan dari satu sumber primer resmi Indonesia yang terverifikasi**. | **TINJAU MANUAL, prioritas tinggi untuk re-riset** — hubungi Barantin (`karantinaindonesia.go.id`) langsung untuk salinan Perdirjen/Perban resmi ISPM15 sebelum file ini dipakai sebagai jawaban otoritatif RAG. Sampai ditemukan sumber primer, tandai jelas di metadata sebagai "penjelasan umum, bukan kutipan regulasi resmi". |

**File "invalid":** **tidak ada.** Dari 31 file yang dilaporkan pada Batch 4, seluruhnya dikonfirmasi eksis di disk dengan ukuran wajar dan isi cocok judul yang diklaim. **0 file dihapus pada batch ini.**

### B4.3 Koreksi & Klarifikasi Lain (non-BTKI)

- **PER-8/BC/2025 vs PER-9/BC/2023:** Pasal 34 PER-8/BC/2025 hanya mencabut **Pasal 5** PER-9/BC/2023 (ketentuan ekspor Barang Kiriman) — PER-9/BC/2023 **tetap berlaku penuh** untuk ekspor non-kiriman, bukan digantikan total.
- **Domain resmi Ditjen PEN:** `djpen.kemendag.go.id` (dicoba berulang di Batch 1/2, selalu connection reset) **bukan domain aktif**. Domain benar: **`ditjenpen.kemendag.go.id`** (awalan "ditjen", bukan "djpen") — HTTP 200 penuh untuk seluruh FAQ.
- **Platform InaExport** berjalan di `inaexport.id` (bukan `.go.id`), tapi dikonfirmasi resmi milik Ditjen PEN via rujukan berulang di FAQ `ditjenpen.kemendag.go.id`.
- **HACCP di Indonesia** bukan sertifikat berdiri sendiri dari BPOM — untuk pangan olahan umum, HACCP adalah **tahap wajib di dalam skema Program Manajemen Risiko (PMR)** BPOM (PerBPOM 10/2023). Untuk perikanan, HACCP diatur **terpisah** dari SKP (tetap di Kepmen KP 52A/2013).
- **Payung hukum Jaminan Produk Halal SUDAH BERGANTI:** PP 39/2021 → **PP 42/2024** (berlaku sekarang) — ada **tenggat wajib sertifikasi halal UMK 17 Oktober 2026** (Pasal 160 ayat 2), sangat dekat dari tanggal riset (2 Sep 2026).
- **Domain karantina lama sudah mati:** `karantina.pertanian.go.id` (ENOTFOUND) — fungsi karantina sekarang **Badan Karantina Indonesia (Barantin)**, domain `karantinaindonesia.go.id`.
- **6 topik dokumen transaksi internasional** ternyata **bukan dokumen baru** — hasil ekstraksi ulang dari 2 PDF yang sudah ada di `buku-panduan-umkm/`, dan publisher salah satunya (`panduan-umkm-go-global-9-langkah.pdf`) adalah **Bank Indonesia** (bukan Kemendag/Kemenkop UKM) — relevan karena hackathon ini disponsori BI-OJK.

### B4.4 GAP — Konsolidasi per Kategori (Batch 4)

- **BTKI/Tarif:** PMK 10/2024 (Perubahan Pertama, di antara PMK 26/2022 dan 62/2025) belum diunduh. Tidak ada versi *consolidated* siap pakai — RAG perlu membaca PMK 26/2022 + lampiran PMK 50/2026 (dan PMK 62/2025 untuk pos yang tak disentuh PMK 50/2026) bersamaan.
- **PER-8/BC/2025:** batas berat 30 kg barang kiriman ekspor ada di PMK 4/2025, bukan di badan PER-8/BC/2025 sendiri. Lampiran I (SOP bergambar)/II (formulir) belum diekstrak terpisah.
- **FTA RoO:** Annex 3A RCEP (Product-Specific Rules per HS code) belum diringkas per kode. Skema ASEAN-Wide Self-Certification (ATIGA) belum tercakup. Formula QVC IA-CEPA baru level konseptual. Chapter 3 IK-CEPA baru Article 3.1-3.20 dari scan OCR manual (3.21 dst. belum terekstrak).
- **InaExport/Ditjen PEN:** halaman `inaexport.id/faq` konsisten HTTP 500 (kemungkinan bug server). "Panduan Menjadi Eksportir" (2018) berbentuk video YouTube tanpa transkrip.
- **Sertifikasi Produk:** ISPM15 gap terbesar (lihat B4.2). Restrukturisasi kelembagaan KKP pasca-2023/2024 (BPPMHKP vs Barantin, siapa penerbit SKP/HACCP perikanan saat ini) belum jelas — domain `bppmhkp.kkp.go.id` gagal diakses (DNS).
- **Dokumen Transaksi:** tidak ada contoh format/template fisik dokumen, hanya definisi konseptual. SKBDN (versi domestik L/C) tidak dibahas (di luar cakupan).
- **FAQ Lembaga:** Bea Cukai baru 4/20+ kategori. OSS baru 17 Q&A dari ratusan (jawaban dasar "Apa itu NIB?" tidak ditemukan sebagai entri FAQ tersendiri). Kemendag lengkap 6 halaman tapi granularitas tinggi per-komoditas.
- **Meta:** kuota WebSearch bawaan habis (200/200) selama sebagian besar riset Batch 4 — mayoritas temuan via WebFetch/curl langsung ke domain resmi yang sudah diketahui/ditebak, bukan pencarian terbuka. Kemungkinan ada sumber resmi lain yang terlewat.

### B4.5 Total Batch 4 (final — BATCH TERAKHIR fase pengumpulan)

| Metrik | Jumlah |
|---|---|
| Folder baru diverifikasi | 7 |
| File dilaporkan pada 7 kategori Batch 4 | 31 |
| **Valid (disimpan, aman untuk RAG)** | **29** |
| **Suspect (disimpan, TIDAK dihapus — perlu tinjauan manual, lihat B4.2)** | **2** |
| **Invalid (dihapus dari disk)** | **0** |

**Tidak ada file yang dihapus pada Batch 4** — seluruh 31 file genuine secara fisik dan isinya cocok domain/judul yang diklaim. 2 file suspect bermasalah pada **kelengkapan sumber primer/generalisasi angka** (bukan file rusak) — direkomendasikan **ditinjau & diperkaya sumbernya**, bukan dihapus.

---

## Dijeda dengan Sengaja (Scope Cut)

> Ditambahkan pada Batch 4 (batch terakhir). Mencatat topik/sumber yang **sengaja TIDAK diperdalam** dalam 4 batch pengumpulan korpus ini karena keterbatasan waktu hackathon (~2 minggu), **bukan** karena terlewat. Boleh ditambah di iterasi berikutnya bila waktu tersedia — bukan gap yang wajib ditutup sebelum RAG pipeline pertama jalan.

**Koreksi atas premis awal:** instruksi penyusunan section ini semula mengasumsikan EU Access2Markets dan ASEAN Trade Repository **sama sekali belum dikumpulkan**. Setelah audit ulang disk untuk Batch 4 ini (lihat Bagian 0), asumsi itu **tidak akurat** — folder `referensi-internasional/` (salah satu dari 3 folder yang sampai batch ini masih berstatus belum-diverifikasi formal, lihat Bagian 0) **sudah** berisi 8 file ringkasan level-portal untuk kedua sumber tsb. Rincian yang akurat:

- **EU Access2Markets** — ringkasan level portal (import requirements & pajak, product requirements, rules of origin) **sudah ada** (`referensi-internasional/access2markets-*.md`, 3 file, belum diverifikasi formal). Yang **sengaja dijeda**: teks regulasi UE spesifik per produk yang dirujuk portal ini (mis. EU Cosmetic Regulation 1223/2009, Novel Food Regulation, ambang MRL pestisida UE) — portal hanya memberi ringkasan/tautan, bukan teks legal penuh, dan pendalaman ke teks aslinya sengaja tidak dilakukan.
- **ASEAN Trade Repository (ATR)** — ringkasan level portal (overview, tarif, RoO, non-tariff measures, prosedur kepabeanan) **sudah ada** (`referensi-internasional/asean-trade-repository-*.md`, 5 file, belum diverifikasi formal). Yang **sengaja dijeda**: pendalaman per negara ASEAN individual — pilot komoditas riset ini (kopi/gula kelapa) mengarah ke Jepang/UE/AS, bukan intra-ASEAN.
- **WTO Trade Facilitation Agreement (TFA)** — **benar-benar belum ada satu file pun** di korpus ini. Sengaja tidak dikumpulkan karena relevansinya untuk UMKM ekspor Indonesia lebih tidak langsung dibanding regulasi domestik/FTA bilateral yang sudah diprioritaskan (IJEPA, RCEP, ATIGA, IA-CEPA, IK-CEPA).
- **Requirement per-negara tujuan di luar Jepang, level MENDALAM** (setara riset Food Sanitation Act Jepang) — sengaja tidak dilakukan. Yang ada baru level ringkasan portal (`lamansitu-syarat-mutu/`, 15 file, Batch 2, lintas 7-8 negara termasuk UE/AS/ASEAN) dan Access2Markets/ATR di atas — **bukan** deep-dive setara `jepang-food-sanitation/` (9 file: terjemahan resmi UU, positive list MRL, JETRO guidebook). Jepang sengaja diprioritaskan sebagai satu-satunya pasar dengan riset mendalam karena keterbatasan waktu.

**Kesimpulan scope cut:** prioritas 2 minggu riset ini adalah **kedalaman untuk Jepang + FTA bilateral/regional utama + regulasi domestik Indonesia**, dengan **UE/ASEAN/global sengaja dibatasi ke level ringkasan/overview**. Ini keputusan sadar demi menyelesaikan korpus dalam tenggat, bukan kelalaian.

---

## Batch 5 — Rantai Peraturan Lengkap & Referensi Internasional (FINAL)

> **Ditambahkan:** 2026-09-02 21:2x WIB (menyusul Batch 1, Batch 2, dan Batch 3 di atas — section ini murni **APPEND**, tidak ada isi batch sebelumnya yang diubah/dihapus, kecuali satu edit terpisah pada section "## 0. RINGKASAN TOTAL KORPUS" di paling atas dokumen untuk menambahkan baris agregat Batch 5).
> **Cakupan:** batch ini dinyatakan sebagai **batch TERAKHIR dari fase pengumpulan dokumen** (per pengarahan tugas). Menuntaskan status hukum 2 rantai amandemen kritis yang sebelumnya baru sepotong (PMK 96/2023 barang kiriman, Permendag 22/2023 larangan ekspor), plus mencoba akses EU Access2Markets & ASEAN Trade Repository. **3 folder baru diverifikasi:** `rantai-pmk-barang-kiriman/`, `rantai-permendag-lartas-ekspor/`, `referensi-internasional/` — **22 file** dicek satu per satu.
>
> **⚠️ Catatan penting soal premis tugas:** pengarahan Batch 5 menyatakan index.md ini "berisi section batch 1–4". Faktanya, pada saat section ini ditulis, index.md hanya berisi **Batch 1 (tanpa label eksplisit, Bagian 1–7) + Batch 2 + Batch 3** — **tidak ada section "Batch 4"** (dicek via `grep "^## Batch" index.md`, ditunggu ~40 detik untuk memastikan bukan keterlambatan tulis semata). Seluruh angka "gabungan semua batch" di section ini dan di "## 0" merujuk ke **Batch 1+2+3+5**, bukan 1–5. Jika Batch 4 muncul di kemudian hari, tambahkan sebagai section baru dengan pola yang sama (append di akhir dokumen + satu baris tambahan di tabel "## 0"), jangan menimpa section ini.
>
> **Catatan lain:** selama proses penyusunan section ini, index.md **berubah beberapa kali oleh proses lain yang berjalan bersamaan** (percobaan pertama menulis "## 0" gagal karena konflik versi — file sudah berubah sejak dibaca; setelah dibaca ulang, ternyata Batch 3 baru saja menyisipkan section "## 0" miliknya sendiri). Section ini ditulis dengan pola append-only yang sama untuk menghindari konflik lebih lanjut.

### B5.0 Ringkasan Status Verifikasi

| # | Kategori | Folder | Valid | Suspect | Invalid | Catatan |
|---|---|---|---|---|---|---|
| 1 | Mata Rantai PMK Barang Kiriman (96/2023 → 111/2023 → 82/2024 → 4/2025) | `rantai-pmk-barang-kiriman/` | 2 | 1 | 0 | PMK 111/2023 (Perubahan Pertama) diunduh utuh + ringkasan; `00-rantai-perubahan.md` (kronologi lengkap) ditandai suspect untuk tinjau manual — lihat B5.1. |
| 2 | Mata Rantai Permendag Larangan Ekspor (22/2023 → 10/2024 → 20/2024 → 8/2025 → 6/2026) | `rantai-permendag-lartas-ekspor/` | 5 | 6 | 0 | 5 PDF resmi (INDUK + 4 amandemen) valid; `00-status-konsolidasi.md` + 5 file `.meta.md` pendamping ditandai suspect (bukan isi salah, tapi tinjau manual atas konflik nomor Berita Negara — lihat B5.1). |
| 3 | Referensi Internasional — EU Access2Markets & ASEAN Trade Repository | `referensi-internasional/` | 8 | 0 | 0 | 3 file Access2Markets (import requirements & pajak, product requirements, rules of origin) + 5 file ASEAN Trade Repository (overview, tarif, rules of origin, NTM, prosedur kepabeanan). Panduan umum — nilai tarif/kriteria origin konkret per HS Code hanya ada di tool interaktif, dicatat sebagai gap (lihat B5.4). |
| | **TOTAL BATCH 5** | | **15** | **7** | **0** | dari 22 file / 3 kategori |

**Total gabungan Batch 1+2+3+5 (28 folder terverifikasi):** 175 file → **160 valid, 15 suspect, 0 invalid**. Rincian per batch ada di tabel "## 0" di paling atas dokumen ini.

---

### B5.1 KOREKSI — Status Rantai Perubahan (BERLAKU SEKARANG)

**a) PMK 96/2023 (Ketentuan Kepabeanan, Cukai, dan Pajak atas Impor dan Ekspor Barang Kiriman)**

- Urutan yang diklaim batch sebelumnya (PMK 111/2023 = Perubahan Pertama, PMK 4/2025 = Perubahan Kedua) **TERVERIFIKASI BENAR** — tidak ada kesalahan urutan. Judul resmi PMK 4/2025 eksplisit menyebut dirinya "Perubahan Kedua atas PMK 96/2023", yang secara logis mengonfirmasi PMK 111/2023 sebagai perubahan pertama.
- **Koreksi kelengkapan (bukan koreksi urutan):** rantai perubahan PMK 96/2023 sebenarnya punya **4 instrumen, bukan 3**. **PMK 82 Tahun 2024** (Tata Cara Pembebasan Cukai, berlaku 18 Okt 2024) mencabut Pasal 30 PMK 96/2023 (batas pembebasan cukai rokok/alkohol dalam barang kiriman impor) — duduk kronologis di antara PMK 111/2023 (Okt 2023) dan PMK 4/2025 (Jan/Mar 2025). Ini pencabutan sebagian via regulasi lain (bukan "Perubahan atas..." berurutan), jadi wajar tidak terpikir sebagai bagian "rantai perubahan" baku, tapi tetap relevan untuk kepatuhan hukum 100% akurat. **Belum diunduh ke corpus** — lihat B5.4.
- **Versi yang BERLAKU SEKARANG:** tidak ada naskah konsolidasi resmi dari JDIH Kemenkeu. RAG harus membaca berlapis — **PMK 96/2023 (batang tubuh & lampiran dasar) → PMK 111/2023 (hanya mengubah Pasal 76, tanggal berlaku) → PMK 82/2024 (mencabut Pasal 30, cukai rokok/alkohol) → PMK 4/2025 (Perubahan Kedua, terbaru menang untuk pasal yang tumpang tindih)**.
- **Sinkron dengan temuan Batch 3 (B3.2):** Batch 3 secara independen menemukan bahwa tanggal efektif PMK 96/2023 yang sering dikutip ("17 Oktober 2023") salah — Pasal 76 dokumen sendiri menyatakan berlaku 60 hari sejak diundangkan (18 September 2023) = **17 November 2023**. Batch 5 mengonfirmasi silang: PMK 111/2023 (Perubahan Pertama, sudah diunduh Batch 5) **hanya mengubah Pasal 76 ini** — artinya tanggal 17 November 2023 adalah tanggal PASCA-amandemen pertama, bukan tanggal versi asli PMK 96/2023 sebelum diubah. Kedua batch konsisten: 17 Oktober 2023 yang beredar di ringkasan-ringkasan lama adalah keliru, dan koreksinya perlu diterapkan ke **ketiga** salinan PMK 96/2023 di corpus (`pmk-barang-kiriman/`, `klaster4-kepabeanan-pajak-kiriman/`, dan konteks di `rantai-pmk-barang-kiriman/00-rantai-perubahan.md`).

**b) Permendag 22/2023 (Barang yang Dilarang untuk Diekspor)**

- Urutan "Perubahan Pertama/Kedua/Ketiga/Keempat" **TERVERIFIKASI BENAR** lewat 3 jalur independen: JDIH Kemendag, peraturan.go.id (basis data terpisah), dan teks otentik tiap peraturan (Pasal I Permendag 6/2026 mengutip eksplisit rantai "a. Nomor 10 Tahun 2024 ... b. Nomor 20 Tahun 2024 ... c. Nomor 8 Tahun 2025"). Ini juga konsisten dengan temuan Batch 3 poin B3.1 #6 yang mengonfirmasi Permendag 6/2026 berjudul resmi "Perubahan Keempat atas Permendag 22/2023".
- Catatan konvensi: judul resmi Permendag 10/2024 **tidak** memuat kata "Pertama" ("Perubahan Atas Permendag 22 Tahun 2023...") — konvensi normal Kemendag (amandemen pertama tidak diberi angka ordinal), bukan kesalahan pada klaim awal.
- **Versi yang BERLAKU SEKARANG (per 2 September 2026):** **Permendag 6 Tahun 2026 (Perubahan Keempat)**, berlaku sejak **1 April 2026**. Tidak ada "Perubahan Kelima" atau peraturan lebih baru ditemukan di JDIH Kemendag maupun peraturan.go.id per tanggal verifikasi. Tidak ada naskah konsolidasi resmi — bacaan berlapis yang benar: **batang tubuh pasal (definisi, mekanisme, sanksi) yang tidak disebut diubah tetap dari Permendag 22/2023 INDUK**, tetapi **Lampiran (daftar barang dilarang/dibatasi ekspor) yang berlaku adalah Lampiran hasil Permendag 6/2026** — Pasal I-nya secara eksplisit mengganti seluruh Lampiran versi sebelumnya.
- **Konflik data ditemukan (perlu keputusan tim, bukan sekadar tinjau isi):** nomor Berita Negara untuk Permendag 10/2024. JDIH Kemendag + peraturan.go.id + teks Permendag 20/2024 menyebut **BN 2024 No. 288**, tetapi teks Permendag 8/2025 dan 6/2026 (dua dokumen resmi yang lebih baru) sama-sama mengutip **BN 2024 No. 258** — kemungkinan salah ketik yang ter-copy-paste antar draf dan tidak dikoreksi Kemendag sendiri. **Rekomendasi: gunakan 288** (didukung 3 sumber independen vs 2 sumber yang kemungkinan mewarisi typo yang sama). Inilah sebab utama 1 status file + 5 meta file pada kategori ini ditandai **suspect** — bukan karena isi regulasi salah, tapi karena metadata BN perlu keputusan eksplisit sebelum dipakai sebagai sitasi hukum di jawaban Copilot.
- **Catatan silang dengan Batch 3 (B3.3, Klaster 2):** Batch 3 mencatat "Permendag 21/2024, 10/2024, 20/2024, 8/2025, 12/2026 belum diunduh" sebagai gap untuk rantai Permendag 23/2023 (regulasi **berbeda** dari 22/2023 — jangan tertukar: 23/2023 = Kebijakan & Pengaturan Ekspor umum, ditangani Batch 2; 22/2023 = Barang yang Dilarang untuk Diekspor, ditangani Batch 5 di sini). Batch 5 **menutup** gap ini khusus untuk rantai 22/2023 (10/2024, 20/2024, 8/2025 semuanya sudah diunduh utuh di `rantai-permendag-lartas-ekspor/`). Gap yang sama untuk rantai 23/2023 (regulasi terpisah) **masih terbuka** — itu tanggung jawab kategori `permendag-ekspor-lartas/` (Batch 2), bukan section ini.

---

### B5.2 File "suspect" — REKOMENDASI EKSPLISIT (JANGAN dihapus, tinjau manual dulu)

| File | Kategori | Masalah | Rekomendasi |
|---|---|---|---|
| `rantai-pmk-barang-kiriman/00-rantai-perubahan.md` | PMK Barang Kiriman | Kronologi rantai sudah akurat untuk 3 dari 4 instrumen, tapi **tidak menyertakan PMK 82/2024** (pencabut Pasal 30) yang baru ditemukan saat verifikasi — dokumen ini perlu direvisi agar lengkap 4 instrumen. | **TINJAU & LENGKAPI** — tambahkan baris PMK 82/2024 ke tabel kronologi, sertakan catatan "pencabutan sebagian (Pasal 30), bukan Perubahan berurutan". Setelah dilengkapi, naikkan ke valid. |
| `rantai-permendag-lartas-ekspor/00-status-konsolidasi.md` + 5 file `.meta.md` pendamping (Permendag-10-2024, 20-2024, 22-2023 INDUK, 6-2026, 8-2025) | Permendag Lartas Ekspor | Isi & nomor peraturan semuanya genuine dan sudah diverifikasi silang 3 jalur — masalahnya murni **konflik metadata nomor Berita Negara Permendag 10/2024** (288 vs 258, lihat B5.1b) yang tersebar di beberapa file `.meta.md`. | **TINJAU & PUTUSKAN** nomor BN yang dipakai (rekomendasi: 288), lalu seragamkan di seluruh 6 file. Setelah diputuskan & diseragamkan, naikkan ke valid. PDF sumber sendiri **tidak perlu disentuh**. |

**File "invalid" (verdict eksplisit):** **tidak ada** pada Batch 5 — dari 22 file yang diverifikasi, 0 berverdict invalid.

---

### B5.3 File Dihapus dari Disk (Batch 5)

Berbeda dari file suspect di atas (yang TIDAK dihapus), **1 file artefak non-katalog dihapus** pada batch ini setelah dibaca lengkap (awal & akhir isi) untuk konfirmasi:

- **`permendag-ekspor-lartas/out_full.txt`** (624 KB, 43.361 baris) — dump teks mentah hasil `pdftotext` dari `Permendag-23-2023_..._INDUK.pdf`, dipakai untuk `grep` saat verifikasi Batch 2. Bukan dokumen sumber regulasi, tidak punya `source_url`/verdict, 100% redundan dengan PDF asli yang sudah ada di folder yang sama. File ini sudah diidentifikasi sebagai "anomali non-katalog" oleh Batch 2 (lihat B2.4) dengan rekomendasi "disarankan dibersihkan manual sebelum ingestion" — **Batch 5 mengeksekusi rekomendasi tersebut** dan menghapusnya. Ini **bukan** verdict "invalid" (file itu sendiri tidak rusak/salah), melainkan pembersihan artefak kerja sesuai rekomendasi eksplisit batch sebelumnya.
- Tidak ada file lain yang dihapus pada Batch 5. Total file di disk turun dari 208 → **207** (termasuk `index.md`) sebagai akibat penghapusan ini.

---

### B5.4 GAP — Dokumen/Info yang Belum Lengkap (Batch 5)

- Belum diverifikasi apakah ada perubahan/pencabutan lain atas PMK 96/2023 setelah PMK 4/2025 (Mar 2025 – Sep 2026).
- **PMK 82/2024** (pencabut Pasal 30 PMK 96/2023) belum diunduh sebagai file permanen — URL: `https://jdih.kemenkeu.go.id/api/download/06e861a0-f529-4a0b-802f-9a3ff1ad7353/2024pmkeuangan082.pdf` (191 hlm., topik cukai luas, bukan spesifik barang kiriman). Nomor pasal persis yang memuat klausul pencabutan belum dikonfirmasi presisi (diperkirakan ~Pasal 57 dari 58 pasal; isi klausul & pasal yang dicabut sudah dikutip verbatim dan akurat dari ekstraksi sementara).
- Tidak ada naskah konsolidasi resmi untuk PMK 96/2023 maupun Permendag 22/2023 dari instansi manapun — RAG wajib membaca berlapis sendiri (lihat B5.1), tidak ada satu file otoritatif tunggal.
- Tanggal "Diundangkan" untuk Permendag 10/2024, 20/2024, dan 6/2026 tidak bisa diekstraksi bersih dari teks PDF via `pdftotext` (artefak font-subsetting pada baris tanggal) — diambil dari ringkasan halaman web JDIH, bukan ekstraksi PDF langsung. Disarankan verifikasi visual manual bila tanggal presisi krusial untuk keperluan hukum.
- Verifikasi rantai Permendag 22/2023 hanya memeriksa identitas/urutan/status peraturan — belum melakukan diff isi Lampiran (daftar HS code lartas ekspor) pasal-per-pasal antar kelima versi.
- Duplikasi struktural pra-eksisting (bukan hasil Batch 5): PMK 96/2023 dan PMK 4/2025 punya salinan terpisah di `klaster4-kepabeanan-pajak-kiriman/` (Batch 3) selain di `pmk-barang-kiriman/` (Batch 2) — ukuran byte identik (7.232.975 dan 994.385 byte), dan kedua salinan mewarisi kesalahan tanggal efektif yang sama (lihat B5.1a). Belum dirapikan — wajib ditangani di tahap deduplikasi RAG pipeline.
- **EU Access2Markets:** nilai tarif aktual (persentase bea MFN/preferensial per HS Code + negara) dan kriteria Rules of Origin per produk (Product Specific Rules) tidak tersedia sebagai halaman teks statis — hanya lewat tool interaktif "My Trade Assistant" (SPA Angular). Domain `access2markets.ec.europa.eu` yang disebut di brief awal tidak resolve DNS; portal aktif ada di `trade.ec.europa.eu/access-to-markets/`.
- **ASEAN Trade Repository:** keempat topik (Tariffs, Rules of Origin, Non-Tariff Measures, Customs Procedures) masing-masing hanya berisi satu paragraf definisi + daftar tautan pencarian per negara. Data substantif ada di balik pencarian database per negara/HS Code — 15 sub-halaman NTM dan 8 sub-halaman Customs Procedures belum di-fetch satu per satu. ASEAN Tariff Finder (`tariff-finder.asean.org`) belum divalidasi. Teks resmi lengkap ATIGA (Annex ROO & Product Specific Rules) ada di domain `asean.org`, di luar cakupan brief ini.
- Kuota WebSearch sesi riset Batch 5 habis sebelum tugas dimulai — semua verifikasi dilakukan via WebFetch langsung ke URL yang sudah diketahui dari pola batch sebelumnya, bukan pencarian bebas.
- **Gap meta:** 7 folder (31 file) masih 100% belum tersentuh proses verifikasi apapun yang tercatat di index.md ini — lihat daftar presisi di B5.6 di bawah. Section "Checklist Cakupan Topik RAG" di atas (disusun Batch 3) sudah mencantumkan file dari `referensi-internasional/` dan `rantai-permendag-lartas-ekspor/` sebagai "dokumen pendukung" untuk topik #6 (Lartas) dan #14 (Rules of Origin) meski keduanya baru diverifikasi formal oleh Batch 5 belakangan — konsisten, tidak perlu dikoreksi.

---

### B5.5 Total Batch 5 (final)

| Metrik | Jumlah |
|---|---|
| Folder baru diverifikasi | 3 |
| File dilaporkan pada 3 kategori Batch 5 | 22 |
| **Valid (disimpan, aman untuk RAG)** | **15** |
| **Suspect (disimpan, TIDAK dihapus — perlu tinjauan manual)** | **7** |
| **Invalid (verdict eksplisit)** | **0** |
| Artefak non-katalog dihapus (rekomendasi Batch 2, dieksekusi Batch 5) | 1 (`permendag-ekspor-lartas/out_full.txt`) |

---

### B5.6 Lampiran — Daftar Lengkap 35 Folder Korpus & Status Verifikasi

Snapshot final disk: 2026-09-02 21:27 WIB (207 file total = 206 dokumen + `index.md`; ≈460 MiB / 483 MB SI). Status merujuk ke batch mana pun yang sudah tercatat di index.md ini per saat Batch 5 ditulis.

| # | Folder | Jumlah file | Status verifikasi |
|---|---|---|---|
| 1 | `buku-panduan-umkm/` | 3 | Batch 2 |
| 2 | `dokumen-transaksi-internasional/` | 7 | **BELUM diverifikasi** |
| 3 | `eudr-kopi/` | 3 | Batch 1 |
| 4 | `faq-lembaga/` | 3 | **BELUM diverifikasi** |
| 5 | `fta-rules-of-origin/` | 5 | **BELUM diverifikasi** |
| 6 | `glosarium-incoterms/` | 2 | Batch 2 |
| 7 | `hs-code-gula-kelapa/` | 7 | Batch 1 |
| 8 | `hs-code-kopi/` | 8 | Batch 1 |
| 9 | `ijepa-coo/` | 17 | Batch 1 |
| 10 | `inaexport-ditjen-pen/` | 3 | **BELUM diverifikasi** |
| 11 | `insw-pdf-langsung/` | 1 | Batch 3 |
| 12 | `intr-portal/` | 6 | Batch 3 |
| 13 | `jepang-food-sanitation/` | 9 | Batch 1 |
| 14 | `karantina-phytosanitary/` | 9 | Batch 1 |
| 15 | `kepabeanan-umum/` | 3 | Batch 1 |
| 16 | `klaster1-uu-utama/` | 3 | Batch 3 |
| 17 | `klaster2-tata-niaga-ekspor/` | 8 | Batch 3 |
| 18 | `klaster3-tata-niaga-impor/` | 6 | Batch 3 |
| 19 | `klaster4-kepabeanan-pajak-kiriman/` | 5 | Batch 3 — duplikasi sebagian dgn `pmk-barang-kiriman/` (Batch 2) |
| 20 | `klaster5-teknis-lapangan/` | 7 | Batch 3 |
| 21 | `koreksi-btki-tarif/` | 5 | **BELUM diverifikasi** |
| 22 | `lamansitu-syarat-mutu/` | 15 | Batch 2 |
| 23 | `nib-legalitas/` | 3 | Batch 1 |
| 24 | `peb-insw/` | 5 | Batch 1 |
| 25 | `pembiayaan-ekspor/` | 3 | Batch 1 |
| 26 | `per8-barang-kiriman/` | 2 | **BELUM diverifikasi** |
| 27 | `perdirjen-peb-pib/` | 9 | Batch 2 |
| 28 | `permendag-ekspor-lartas/` | 9 | Batch 2 — 1 file artefak (`out_full.txt`) dihapus Batch 5 |
| 29 | `permendag-impor-lartas/` | 4 | Batch 2 |
| 30 | `pmk-barang-kiriman/` | 4 | Batch 2 — duplikasi sebagian dgn `klaster4-kepabeanan-pajak-kiriman/` (Batch 3) |
| 31 | `rantai-permendag-lartas-ekspor/` | 11 | **Batch 5** |
| 32 | `rantai-pmk-barang-kiriman/` | 3 | **Batch 5** |
| 33 | `referensi-internasional/` | 8 | **Batch 5** |
| 34 | `sertifikasi-produk/` | 6 | **BELUM diverifikasi** |
| 35 | `uu-dasar/` | 4 | Batch 2 |
| | **TOTAL (35 folder)** | **206** | 28 folder terverifikasi (Batch 1+2+3+5, 175 file) / **7 folder (31 file) masih belum diverifikasi** |

**7 folder yang masih 100% belum diverifikasi oleh batch manapun (untuk prioritas tim selanjutnya):** `dokumen-transaksi-internasional/` (7), `faq-lembaga/` (3), `fta-rules-of-origin/` (5), `inaexport-ditjen-pen/` (3), `koreksi-btki-tarif/` (5), `per8-barang-kiriman/` (2), `sertifikasi-produk/` (6) — total **31 file**. Empat di antaranya (`faq-lembaga/`, `fta-rules-of-origin/`, `intr-portal/`... *(catatan: `intr-portal/` sudah selesai lewat Batch 3, dikeluarkan dari daftar ini)*, `sertifikasi-produk/`) sempat tercatat "0/kosong" di snapshot awal Batch 1 — populasinya oleh proses lain di luar batch manapun yang tercatat di index.md ini, jadi **tidak ada jejak audit domain/sumber sama sekali** untuk isinya. Prioritaskan folder ini untuk verifikasi manual berikutnya.

---

### B5.7 Rekomendasi Prioritas Sebelum Membangun RAG Pipeline

1. **Verifikasi 7 folder tersisa (31 file, lihat B5.6)** sebelum ingestion produksi, terutama `faq-lembaga/`, `fta-rules-of-origin/`, `sertifikasi-produk/`, `dokumen-transaksi-internasional/` yang tidak punya jejak audit dari batch manapun. Beri label `verification_status: unverified` di metadata sampai selesai.
2. **Selesaikan dedup lintas-folder sebelum embedding** — PMK 96/2023 & PMK 4/2025 byte-identik di `pmk-barang-kiriman/` (Batch 2) dan `klaster4-kepabeanan-pajak-kiriman/` (Batch 3), keduanya mewarisi kesalahan tanggal efektif yang sama (17 Okt → seharusnya 17 Nov 2023). Periksa juga potensi duplikasi Permendag 23/2023 antara `permendag-ekspor-lartas/` dan `klaster2-tata-niaga-ekspor/`.
3. **Terapkan bacaan berlapis (layered reading) sebagai metadata chunking**, bukan hanya catatan naratif — setiap chunk dari pasal/lampiran PMK 96/2023 atau Permendag 22/2023 yang sudah diamandemen wajib menyertakan field `superseded_by` yang menunjuk ke dokumen amandemen terakhir (PMK 4/2025; Permendag 6/2026), dan retrieval/hybrid structured-lookup untuk HS Code/tarif harus mengecek lapisan ini secara otomatis.
4. Putuskan nomor BN yang dipakai untuk sitasi Permendag 10/2024 (rekomendasi: 288) sebelum 6 file suspect di B5.2 dipakai sebagai sumber sitasi hukum.
5. Koreksi tanggal efektif PMK 96/2023 (17 Nov 2023, bukan 17 Okt 2023) di **ketiga** lokasi yang menyebutnya (`pmk-barang-kiriman/`, `klaster4-kepabeanan-pajak-kiriman/`, `rantai-pmk-barang-kiriman/00-rantai-perubahan.md`) — temuan gabungan Batch 3 + Batch 5, dampak tinggi karena tersebar di 3 tempat.
6. Unduh PMK 82/2024 secara permanen ke `rantai-pmk-barang-kiriman/` agar rantai PMK 96/2023 benar-benar lengkap 4 instrumen.
7. **Konfirmasi keberadaan/isi Batch 4** sebelum menganggap fase verifikasi (bukan pengumpulan) benar-benar tuntas — index.md ini hanya berisi Batch 1+2+3+5 saat Batch 5 selesai ditulis (lihat catatan di awal section ini dan di "## 0").

**PENGUMPULAN KORPUS REGULASI SELESAI (5 batch, per pengarahan tugas). Langkah berikutnya WAJIB: bangun RAG pipeline (chunking, embedding, pgvector, retrieval) dan hybrid structured-lookup untuk HS Code/tarif. JANGAN tambah dokumen baru ke korpus ini tanpa alasan konkret dari kebutuhan pipeline yang sedang dibangun.**
