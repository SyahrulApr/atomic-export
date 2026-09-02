---
nama_modul: "Trade Simulation"
sumber_url: "https://insw.go.id/intr/simulasi"
lembaga_pengelola: "Lembaga National Single Window (LNSW), Kementerian Keuangan RI"
tanggal_akses: "2026-09-02"
catatan_koreksi: "Bukan portal Kemendag; lihat 00-CATATAN-KOREKSI-SUMBER.md."
status: "GAP TOTAL — kalkulator interaktif, tidak ada output statis"
---

# Modul: Trade Simulation

## Lokasi

Kartu **"Simulasi Ekspor Impor"** di halaman utama INTR (`https://insw.go.id/intr`) → mengarah ke
`https://insw.go.id/intr/simulasi`. Judul resmi halaman:

> **"Simulasi Perhitungan Penerimaan Negara atas Ekspor atau Impor Barang"**
>
> "Sinergi antara Kementerian dan Lembaga, Entitas Pelabuhan/Bandar Udara, Entitas
> Keuangan/Perbankan, serta Pengguna Jasa dalam rangka meningkatkan transparansi, konsistensi, dan
> efisiensi proses ekspor/impor."

## GAP — Tidak Ada Konten Statis untuk Diambil

Halaman ini **murni kalkulator interaktif** (kalkulator bea masuk/pungutan negara), bukan halaman
informasi. Tidak ada output default yang tampil tanpa mengisi form. Field-field yang wajib diisi
(ditandai `*` di UI) sebelum kalkulator bisa menghasilkan angka apa pun:

| Field | Keterangan |
|---|---|
| **Pilih Kegiatan** * | Impor atau Ekspor |
| **Negara Asal Barang** * | Dropdown negara |
| **Tanggal Rencana Ekspor atau Impor** * | Date picker |
| **Kurs** * | Otomatis terisi dari data Kurs Pajak (mis. "USD - Rp. 17.722" per tanggal akses), tapi tetap bagian dari input kalkulasi |
| **HS Code Barang** * | Wajib kode HS spesifik — sama seperti modul 01, tidak bisa "melihat semua" tanpa kode tertentu |
| **Jenis Tarif** * | Contoh pilihan: Advalorum (kemungkinan ada pilihan lain seperti spesifik, belum dieksplorasi krn field lanjutan terkunci sebelum field ini diisi) |
| **Nilai Barang** * | Basis nilai CIF (Cost, Insurance, Freight) |

Catatan tambahan yang tertulis di halaman terkait perhitungan CIF ketika data ongkos kirim/asuransi
tidak tersedia:

> "Apabila tidak ada data Biaya Kirim (Freight) dan Asuransi maka: Untuk pengangkutan melalui laut
> maka Freight-nya: 5% dari FOB (Free on Board) untuk barang yang dikirim dari negara ASEAN..."
> (teks terpotong pada saat scraping — field ini butuh scroll lebih jauh yang tidak dieksplorasi
> krn di luar cakupan "ambil sebagai teks statis")

## Kenapa Ini Digolongkan Gap Total (Bukan Gap Sebagian)

Berbeda dengan modul 01–03 yang masih punya *sebagian* konten default/statis (mis. daftar
taksonomi, "peraturan terpopuler"), modul Trade Simulation:

1. Tidak memiliki state "hasil default" — semua field kalkulasi kosong saat halaman dimuat.
2. Tidak ditemukan endpoint API publik terpisah untuk "contoh perhitungan" atau "tarif per HS Code"
   yang bisa dipanggil tanpa melalui form (berbeda dengan modul ROO/ATR yang punya endpoint
   `atr/web` yang bisa dipanggil langsung).
3. Hasil akhirnya (nominal Bea Masuk, PPN Impor, PPh Impor, dll.) adalah **hasil komputasi**
   (formula tarif × nilai CIF × kurs, dengan variasi jenis tarif dan skema FTA per negara asal),
   bukan dokumen/teks yang tersimpan di database dan bisa "dibaca" begitu saja.

## Rekomendasi jika Konten Dibutuhkan

Jika riset proyek ini butuh angka simulasi tarif untuk komoditas ekspor spesifik (mis. kopi HS
0901, gula kelapa, dll.), jalur yang tepat adalah **replikasi manual formula** menggunakan data
tarif yang sudah berhasil diambil statis di file `01-hs-code-information.md` (MFN/Preferential
Tariff) dan `04-rules-of-origin.md` (skema FTA), dikombinasikan dengan Kurs Pajak KMK yang berlaku
(lihat data "Kurs Pajak" di halaman utama INTR, mis. KMK Nomor 41/MK/EF.2/2026 per tanggal akses),
bukan dengan mencoba men-scrape kalkulator `/intr/simulasi` ini secara otomatis.
