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

> Kami Tetra Core. || Atomic Export. | Sistem operasi ekspor untuk UMKM yang belum
> pernah ekspor atas nama sendiri.

### 5-15 detik · Pengguna dan masalah (±25 kata)

> Produsen kecil sudah mampu berproduksi. | Tapi sembilan puluh enam persen ekspor
> UMKM lewat perantara. || Nama mereka hilang dari dokumen. | Margin terpotong,
> dan bank tidak pernah melihat mereka.

### 15-35 detik · Use case dan alur (±50 kata)

> Ambil satu produsen gula semut di Cilongok, Banyumas. || Platform kami memberi
> dia skor kesiapan ekspor lengkap dengan faktor penekannya. | Birokrasi dipecah
> jadi tugas mikro di bawah lima belas menit. || AI Copilot menjawab pertanyaan
> regulasi dengan sitasi dokumen resmi. | Satu kali input data menghasilkan enam
> dokumen perdagangan. || Lalu kargonya digabung jadi kontainer penuh, tapi PEB
> tetap atas namanya sendiri.

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

Visual: video showcase yang sudah dirender. Timecode di bawah relatif terhadap
awal segmen demo dan cocok satu-satu dengan `components/showcase/scenes.ts`.

### 0-5 detik · `intro` (±12 kata)

> Mari lihat satu koridor pilot. || Produsen gula semut di Cilongok, Banyumas.

### 5-9 detik · `overview` (±10 kata)

> Kapasitasnya sudah ada. | Status eksportir atas nama sendiri belum pernah.

### 9-17 detik · `readiness` (±20 kata)

> Mulai dari diagnosis. || Skor kesiapan delapan puluh dua dari seratus. |
> Faktor yang menekan skor ditampilkan terbuka, bukan disembunyikan.

### 17-25 detik · `atomic` (±20 kata)

> Dari skor itu lahir daftar tugas. || Prosedur yang biasanya bikin berhenti di
> niat, dipecah jadi tugas di bawah lima belas menit.

### 25-35 detik · `formfill` (±25 kata)

> Perhatikan bagian ini. || Data transaksi diisi satu kali saja. | Produk, pos
> tarif, kuantitas, harga, pembeli. || Sekali tekan, | enam dokumen perdagangan
> langsung terbentuk.

### 35-46 detik · `copilot` (±28 kata)

> Aturan tiap negara berbeda dan sering berubah. || Pertanyaan regulasi dijawab
> dengan sitasi dokumen sumber. | Perhatikan jawaban soal Form IJEPA: | tarif
> preferensi tetap harus diverifikasi per pos tarif, tidak otomatis nol.

### 46-52 detik · `documents` (±15 kata)

> Semua dokumen keluar atas nama UMKM sendiri, | bukan atas nama perantara.

### 52-60 detik · `market` (±20 kata)

> Akses pembeli tidak lagi lewat perantara. || Profil produk dicocokkan ke
> pembeli terverifikasi sebagai titik awal negosiasi.

### 60-70 detik · `pipeline` (±25 kata)

> Ini yang terjadi di belakang layar. || Profil, spesifikasi, foto produk, dan
> pertanyaan regulasi masuk sebagai input. || Satu prinsip berlaku di semuanya: |
> data anomali ditandai untuk ditinjau manusia.

### 70-77 detik · `qc` (±18 kata)

> Mutu contohnya. || Computer vision menyaring lebih dulu, | keputusan akhir
> tetap di surveyor lapangan.

### 77-84 detik · `logistics` (±18 kata)

> Volume kecil bikin ongkos mahal. || Kargo digabung jadi kontainer penuh, | tapi
> setiap UMKM tetap memegang PEB sendiri.

### 84-91 detik · `track` (±18 kata)

> Dan inilah tujuan akhirnya. || Transaksi tercatat permanen atas nama koperasi. |
> Riwayat inilah yang bisa dinilai lembaga keuangan.

### 91-98 detik · `value` (±18 kata)

> Nilainya bisa dihitung. || Selisih harga yang tadinya diambil pengepul kembali
> ke produsen. | Ini proyeksi koridor pilot.

### 98-104 detik · `status` (±15 kata)

> Terbuka soal posisi kami. || Antarmuka dan alurnya berjalan. | Scoring dan
> computer vision masih simulasi.

### 104-112 detik · `roadmap` (±20 kata)

> Langkah berikutnya bertahap. || Pilot Banyumas Semester Dua, | koridor kedua,
> skala nasional, | lalu UMKM Indonesia tampil setara eksportir besar.

### 112-120 detik · `outro` (±20 kata)

> Untuk itu kami mencari mitra: | konsolidator berizin, surveyor, dan koperasi
> pendamping. || Atomic Export. | Ekspor atas nama sendiri.

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
