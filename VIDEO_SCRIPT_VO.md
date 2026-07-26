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

Revisi kelima. Semuanya soal jembatan dan kejelasan:

- **`track`**: "yang sebenarnya dikejar" tidak menyebut apa. Sekarang dinamai
  langsung: akses modal.
- **`value`**: angka harga muncul tanpa pengantar. Sekarang didahului pertanyaan
  "seberapa besar bedanya", sehingga angkanya menjawab sesuatu.
- **`status`**: "Terbuka soal posisi kami" datang mendadak, dan rinciannya terlalu
  teknis. Sekarang cukup menyebut tahapnya, tanpa memerinci modul mana.
- **`roadmap`**: "dua puluh" tidak menyebut dua puluh apa. Sekarang jelas dua
  puluh produsen, dan diawali "langkah berikutnya jelas".
- **Aspirasi dipindah ke penutup.** "Sampai produsen Indonesia setara eksportir
  besar" tidak nyambung di tengah pembahasan ekspansi; tempatnya di akhir.
- **"AI" tidak dipakai** karena mesin membacanya "A Ai". Diganti "kecerdasan
  buatan". Sekarang ada detektor otomatis untuk singkatan yang belum ditangani.

### 0-6 detik · `intro` (±15 kata)

> Produsen gula semut di Banyumas, | sanggup produksi mutu ekspor, | namun
> belum pernah jadi eksportir.

### 6-10 detik · `overview` (±10 kata)

> Yang menghalangi bukan mutunya, | melainkan birokrasi dan perantara.

### 10-19 detik · `readiness` (±23 kata)

> Kami mulai dari diagnosis. | Kesiapan ekspornya dinilai nol sampai seratus.
> || Produsen ini dapat delapan puluh dua, | beserta daftar yang masih
> menahannya.

### 19-28 detik · `atomic` (±23 kata)

> Nah, daftar itu langsung dikerjakan. | Sebab cuma seperempat peserta
> pelatihan ekspor yang benar-benar mengekspor, | sehingga birokrasi dipecah
> jadi tugas lima belas menit.

### 28-36 detik · `formfill` (±20 kata)

> Kemudian yang paling melelahkan. | Bukan mengirim barang, | melainkan mengisi
> data yang sama berulang kali. || Di sini sekali isi, | lalu semua dokumen
> yang diperlukan terbentuk.

### 36-46 detik · `copilot` (±25 kata)

> Lalu soal aturan. | Regulasi tiap negara berbeda dan sering berubah, |
> sehingga salah tafsir bisa membuat barang tertahan. || Karena itu setiap
> jawaban disertai sitasi sumbernya.

### 46-51 detik · `documents` (±13 kata)

> Hasilnya, semua dokumen terbit atas nama UMKM itu sendiri, | bukan perantara.

### 51-59 detik · `market` (±20 kata)

> Lalu soal pembeli. | Lewat perantara, undername dapat mencapai dua sampai
> lima juta per pengiriman. || Tapi di sini produsen bertemu pembeli langsung.

### 59-65 detik · `pipeline` (±15 kata)

> Di belakangnya empat komponen kecerdasan buatan, | dengan satu aturan, |
> yaitu data anomali tidak diproses otomatis.

### 65-73 detik · `qc` (±20 kata)

> Contohnya pada mutu. | Satu batch cacat bisa membuat kontainer ditolak, |
> oleh karena itu vision menyaring dulu, | baru surveyor yang memutuskan.

### 73-81 detik · `logistics` (±20 kata)

> Kemudian logistik. | Jika kirim sedikit, ongkos per kilo mahal, | sementara
> digabung jadi kontainer penuh turun sekitar tiga puluh persen. | PEB tetap
> masing-masing.

### 81-87 detik · `track` (±15 kata)

> Dan inilah tujuan akhirnya: | akses modal. || Setiap pengiriman jadi rekam
> jejak atas nama sendiri, | dan itu yang dibaca bank.

### 87-95 detik · `value` (±20 kata)

> Lalu seberapa besar bedanya? || Lokal lima belas ribu per kilo, | ekspor bisa
> kisaran tiga puluh lima ribu. || Itu angka koperasi lain yang sudah
> mengekspor.

### 95-101 detik · `status` (±15 kata)

> Di mana posisi kami sekarang? || Alur lengkapnya sudah berjalan, | sebagian
> modelnya masih prototipe, | menuju siap pakai di pilot.

### 101-109 detik · `roadmap` (±20 kata)

> Langkah berikutnya jelas. || Mulai dari dua puluh produsen di Banyumas, |
> lalu koridor baru: produk dan negara tujuan lain, | lalu skala nasional.

### 109-120 detik · `outro` (±28 kata)

> Satu produsen yang berhasil ekspor atas nama sendiri, | membuka jalan bagi
> ribuan lainnya. || Itulah yang sedang kami bangun, | sampai produsen Indonesia
> berdiri setara eksportir besar. || Atomic Export.

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
