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

Prinsip yang dipakai di revisi ini:

- **Buka dengan ketegangan, bukan pengantar.** Versi sebelumnya membuka dengan
  "Mari lihat satu koridor pilot", yang tidak menahan siapa pun.
- **Jangan narasikan apa yang sudah terlihat.** Ini penyebab utama versi lama
  terasa datar. Gambarnya sudah menunjukkan dokumen keluar; narasi tidak perlu
  mengulang. Tugas narasi membawa yang tidak kelihatan: taruhannya.
- **Angka spesifik, bukan kata sifat.** "Dua sampai lima juta per pengiriman"
  bekerja; "sangat efisien" tidak.
- **Satu frasa pengunci diulang.** "Atas nama sendiri" muncul di tiga titik
  supaya ada yang tersangkut di kepala penonton.
- **Tetap tidak melebih-lebihkan.** Bagian IJEPA justru dipakai sebagai bukti
  ketelitian, dan segmen status tetap menyebut apa yang belum jalan.

### 0-5 detik · `intro` (±13 kata)

> Produsen gula semut di Banyumas. || Sanggup produksi mutu ekspor, | belum
> pernah jadi eksportir.

### 5-9 detik · `overview` (±10 kata)

> Yang menghalangi bukan mutunya. || Tapi birokrasi, dan perantara.

### 9-17 detik · `readiness` (±20 kata)

> Pertanyaan pertamanya selalu sama: | saya harus mulai dari mana. || Skor
> delapan puluh dua, | plus daftar apa yang menahannya.

### 17-24 detik · `atomic` (±18 kata)

> Cuma seperempat peserta pelatihan ekspor benar-benar mengekspor. || Jadi
> birokrasinya dipecah jadi tugas lima belas menit.

### 24-35 detik · `formfill` (±28 kata)

> Bagian paling melelahkan dari ekspor bukan mengirim barang. | Tapi mengisi
> data yang sama, | berulang kali, | di formulir berbeda. || Di sini: | sekali
> isi. | Enam dokumen keluar.

### 35-46 detik · `copilot` (±28 kata)

> Aturan tiap negara beda dan berubah. | Salah tafsir, | barang tertahan di
> pelabuhan. || Jawaban di sini selalu bawa sitasi. || Termasuk yang tidak enak
> didengar: | Form IJEPA bukan jaminan tarif nol.

### 46-51 detik · `documents` (±13 kata)

> Semuanya terbit atas nama UMKM. || Bukan atas nama perantara.

### 51-58 detik · `market` (±18 kata)

> Undername ke perantara: | dua sampai lima juta per pengiriman. || Di sini,
> UMKM ketemu pembeli langsung.

### 58-69 detik · `pipeline` (±28 kata)

> Di belakangnya empat komponen. | RAG untuk regulasi. | Scoring yang alasannya
> bisa dibuka. | Vision untuk mutu. || Dan satu aturan: | data anomali tidak
> diproses otomatis. | Manusia yang putuskan.

### 69-75 detik · `qc` (±15 kata)

> Satu batch cacat bisa bikin satu kontainer ditolak. || Jadi vision menyaring, |
> surveyor yang memutuskan.

### 75-82 detik · `logistics` (±18 kata)

> Kirim sedikit, ongkos per kilo mahal. || Digabung jadi kontainer penuh, | turun
> sekitar tiga puluh persen. || PEB tetap masing-masing.

### 82-89 detik · `track` (±18 kata)

> Dan ini yang sebenarnya dikejar. || Tiap pengiriman jadi rekam jejak. | Atas
> nama sendiri. || Ini yang bisa dibaca bank.

### 89-96 detik · `value` (±18 kata)

> Lokal lima belas ribu per kilo. | FOB kisaran tiga puluh lima ribu. || Acuan
> koperasi sejenis, | bukan hasil kami.

### 96-102 detik · `status` (±15 kata)

> Terbuka: antarmuka dan alurnya jalan. || Scoring dan vision masih simulasi, |
> integrasi lembaga masih penjajakan.

### 102-111 detik · `roadmap` (±23 kata)

> Dua puluh produsen dulu, di Banyumas. || Lalu koridor kedua. | Lalu nasional.
> || Sampai UMKM Indonesia berdiri di meja yang sama dengan eksportir besar.

### 111-120 detik · `outro` (±23 kata)

> Yang kami cari sekarang: | konsolidator berizin, | surveyor, | dan koperasi
> pendamping. || Atomic Export. || Supaya UMKM ekspor, | atas nama sendiri.

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
