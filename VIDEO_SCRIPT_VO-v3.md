# Skrip Voice-Over — Video Submission 180 Detik

**Atomic Export · Tetra Core Team · P1438 · BI-OJK PIDI DIGDAYA Hackathon 2026**

Struktur mengikuti panduan panitia: **60 detik pitch + 120 detik demo**, total tepat
180 detik (batas maksimal).

## Cara pakai

- Kecepatan acuan **±2,5 kata per detik** bahasa Indonesia dengan artikulasi jelas.
  Tiap segmen sudah diberi jatah kata, jangan dilewati lebih dari 10 persen.
- Tanda `|` = ambil napas pendek. Tanda `||` = jeda satu ketukan penuh.
- **Rekam per segmen, jangan sekali jalan.** Kalau salah, ulang segmennya saja.
- Rekam di ruangan berkarpet atau berkain, mic 15-20 cm dari mulut, sedikit
  menyamping supaya huruf "p" dan "b" tidak menghentak.
- Segmen demo timecode-nya sudah dipetakan ke `components/showcase/scenes.ts`.
  Kalau ada scene yang durasinya diubah, jatah katanya ikut berubah.

## Catatan akurasi yang sengaja dijaga

Skrip ini **tidak** menyatakan bahwa model AI sedang melakukan inferensi langsung
saat demo berjalan, karena backend belum terhubung. Yang dinarasikan adalah fungsi
produk dan alurnya. Segmen 98-104 detik menyebut status kesiapan secara terbuka,
sesuai rubrik panitia dan konsisten dengan level **Pre-MVP** yang tim isi di
proposal.

Scene `formfill` mensimulasikan pengisian formulir dan dokumen yang keluar. Itu
memang animasi alur produk, jadi narasinya menyebut apa yang dihasilkan sistem,
bukan mengaku ada pemrosesan backend yang berjalan saat itu.

---

# BAGIAN 1 — PITCH (0-60 detik)

Visual: talking head atau kombinasi talking head dengan potongan dashboard.

### 0-5 detik · Hook (±13 kata)

> Kami Tetra Core. || Atomic Export, | sistem operasi ekspor untuk UMKM yang belum
> pernah ekspor sendiri.

### 5-15 detik · Pengguna dan masalah (±25 kata)

> Produsen kecil sudah mampu berproduksi. | Tapi sembilan puluh enam persen ekspor
> UMKM lewat perantara. || Nama mereka hilang dari dokumen. | Margin terpotong,
> dan bank tidak pernah melihat mereka.

### 15-35 detik · Use case dan alur (±50 kata)

> Ambil satu produsen gula semut di Cilongok, Banyumas. || Platform kami memberi
> skor kesiapan ekspor beserta faktor penekannya. | Birokrasi dipecah jadi tugas
> di bawah lima belas menit. || Copilot menjawab pertanyaan regulasi dengan
> sitasi resmi. | Satu kali input menghasilkan enam dokumen. || Kargo digabung
> jadi kontainer penuh, tapi PEB tetap atas nama sendiri.

### 35-45 detik · Teknologi dan kelayakan (±25 kata)

> Di belakangnya empat komponen: | RAG untuk regulasi, | scoring interpretable
> dengan SHAP, | computer vision untuk mutu, | dan pencocokan pembeli. || Setiap
> keluaran bisa ditelusuri penggunanya.

### 45-55 detik · Nilai (±25 kata)

> Dampaknya konkret. || Harga jual berpotensi naik dari lima belas ribu rupiah per
> kilogram menjadi kisaran tiga puluh lima ribu. | Dan tiap transaksi jadi rekam
> jejak untuk mengakses pembiayaan.

### 55-60 detik · Status dan ajakan (±13 kata)

> Status kami Pre-MVP, pilot Semester Dua. || Kami mencari konsolidator, surveyor,
> dan mitra koperasi.

---

# BAGIAN 2 — DEMO (0-120 detik)

Timecode cocok satu-satu dengan `components/showcase/scenes.ts`.

Revisi ketiga. Yang diperbaiki dari versi sebelumnya:

- **Konektor di dalam kalimat.** "namun", "sehingga", "melainkan", "sebab".
  Versi lalu menempelkan dua fakta tanpa hubungan, dan itu terdengar patah.
- **Jembatan antar segmen.** Tiap segmen dibuka dengan kata sambung
  ("Kemudian", "Setelah itu", "Lalu", "Nah", "Contohnya") supaya terasa satu
  alur, bukan enam belas potongan yang berdiri sendiri.
- **Konsep dijelaskan sebelum angkanya.** Skor delapan puluh dua tidak lagi
  muncul mendadak; didahului penjelasan bahwa sistem menilai kesiapan ekspor
  dari nol sampai seratus.
- **Sebab-akibat dinyatakan.** Statistik seperempat peserta pelatihan sekarang
  jadi alasan kenapa birokrasi dipecah, bukan fakta yang menggantung.

### 0-6 detik · `intro` (±15 kata)

> Produsen gula semut di Banyumas. | Sanggup produksi mutu ekspor, | namun belum
> pernah jadi eksportir.

### 6-10 detik · `overview` (±10 kata)

> Yang menghalangi bukan mutunya, | melainkan birokrasi dan perantara.

### 10-18 detik · `readiness` (±21 kata)

> Kami mulai dari diagnosis. | Kesiapan ekspornya dinilai nol sampai seratus. ||
> Produsen ini dapat delapan puluh dua, | plus daftar yang masih menahannya.

### 18-27 detik · `atomic` (±23 kata)

> Nah, daftar itu tidak dibiarkan menumpuk. | Sebab cuma seperempat peserta
> pelatihan ekspor yang benar-benar mengekspor. || Jadi birokrasinya dipecah jadi
> tugas lima belas menit.

### 27-36 detik · `formfill` (±23 kata)

> Kemudian bagian yang paling melelahkan. | Bukan mengirim barang, | melainkan
> mengisi data yang sama berulang kali. || Di sini cukup sekali isi, | lalu
> dokumennya terbentuk.

### 36-47 detik · `copilot` (±27 kata)

> Setelah itu muncul soal aturan. | Regulasi tiap negara berbeda dan sering
> berubah, | sehingga salah tafsir bisa membuat barang tertahan. || Karena itu
> tiap jawaban di sini membawa sitasi.

### 47-52 detik · `documents` (±12 kata)

> Hasilnya, semua dokumen terbit atas nama UMKM, | bukan atas nama perantara.

### 52-59 detik · `market` (±18 kata)

> Lalu soal pembeli. | Lewat perantara, undername dua sampai lima juta per
> pengiriman. || Di sini UMKM bertemu pembeli langsung.

### 59-68 detik · `pipeline` (±23 kata)

> Di belakangnya empat komponen: | RAG untuk regulasi, | scoring yang alasannya
> bisa dibuka, | vision untuk mutu. || Satu aturan: data anomali tidak diproses
> otomatis.

### 68-75 detik · `qc` (±17 kata)

> Contohnya pada mutu. | Satu batch cacat bisa membuat kontainer ditolak, |
> sehingga vision menyaring dulu, | surveyor yang memutuskan.

### 75-83 detik · `logistics` (±21 kata)

> Kemudian logistik: | kirim sedikit, ongkos mahal. || Digabung jadi kontainer
> penuh, turun sekitar tiga puluh persen, | namun PEB tetap masing-masing.

### 83-91 detik · `track` (±19 kata)

> Dan inilah yang sebenarnya dikejar. | Tiap pengiriman jadi rekam jejak atas
> nama sendiri, | yang bisa dibaca lembaga keuangan.

### 91-99 detik · `value` (±20 kata)

> Nilainya terukur. | Lokal lima belas ribu per kilo, | FOB kisaran tiga puluh
> lima ribu. || Acuan koperasi sejenis, | bukan hasil kami.

### 99-105 detik · `status` (±16 kata)

> Terbuka soal posisi kami. | Antarmuka dan alurnya sudah jalan, | sementara
> scoring dan vision masih simulasi.

### 105-113 detik · `roadmap` (±19 kata)

> Selanjutnya bertahap. | Dua puluh produsen dulu di Banyumas, | lalu koridor
> kedua, lalu nasional. || Sampai UMKM Indonesia setara eksportir besar.

### 113-120 detik · `outro` (±17 kata)

> Yang kami cari: | konsolidator berizin, surveyor, | koperasi pendamping. ||
> Atomic Export. | Ekspor atas nama sendiri.

---

## Checklist sebelum rekam final

- [ ] Verifikasi sub-pos delapan digit HS Code gula semut di BTKI. Video dan
      dashboard baru menyebut famili **1702.90**.
- [x] Angka penghematan logistik sudah diselaraskan ke **−30%** mengikuti
      proposal bagian 15, di landing page, dashboard, teks tur, dan scene
      `value`.
- [x] Alamat di scene outro dan di chrome browser sudah memakai
      **atomic-export-five.vercel.app**.
- [ ] Tinjau ulang kalimat di proposal bagian 7 yang menyatakan backend FastAPI
      dan prototipe RAG sudah berfungsi.
- [ ] Musik latar wajib berlisensi dan volumenya di bawah narasi.
- [ ] Trim video akhir ke tepat 120 detik untuk segmen demo, dan pastikan total
      dengan pitch tidak melewati 180 detik.
