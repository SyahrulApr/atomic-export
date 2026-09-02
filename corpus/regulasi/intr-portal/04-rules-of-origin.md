---
nama_modul: "Rules of Origin"
sumber_url: "https://insw.go.id/intr/asean-trade-repository/rules-of-origin"
sumber_url_tambahan:
  - "https://api.insw.go.id/api/ref/v2/atr/web?bidang=8&parent_id=8"
  - "https://api.insw.go.id/api/ref/v2/atr/web?bidang=8&parent_id=33 (Preferential ROO)"
  - "https://api.insw.go.id/api/ref/v2/atr/web?bidang=8&parent_id=46 (Non Preferential ROO / Form B)"
lembaga_pengelola: "Lembaga National Single Window (LNSW), Kementerian Keuangan RI"
tanggal_akses: "2026-09-02"
catatan_koreksi: "Bukan portal Kemendag; lihat 00-CATATAN-KOREKSI-SUMBER.md."
catatan_metode: "Halaman ini di UI mengharuskan pilih dropdown 'Select Topic' + 'Pilih Sub Topik' lalu klik tombol 'Show' baru konten tampil. Isi di bawah diambil dengan memanggil langsung endpoint JSON publik yang sama yang dipakai tombol 'Show' tsb (API resmi situs, CORS terbuka, bukan endpoint privat/scraping HTML tersembunyi)."
---

# Modul: Rules of Origin

## Lokasi

Kartu **"Rules Of Origin"** di `https://insw.go.id/intr/asean-trade-repository` → mengarah ke
`https://insw.go.id/intr/asean-trade-repository/rules-of-origin`. Tampilan UI halaman ini berupa
form dua tingkat dropdown ("Select Topic" → "Pilih Sub Topik") + tombol "Show", disertai disclaimer
resmi:

> "The information contained in the website is for general information purposes only. The
> information is provided by LNSW and while we endeavor to keep the information up to date and
> correct, we make no representations or warranties of any kind... Please contact the respective
> government agency for further detail information of the related regulation."

Ini modul yang **paling lengkap datanya** di antara 5 modul yang diriset — struktur 3 tingkat
(Topic → Sub Topic → Item/FTA) semuanya terisi content dan sebagian besar punya file PDF lampiran.

## Struktur Level 1: Dua Topik Utama (bidang=8, parent_id=8)

| ID | Judul | Content |
|---|---|---|
| 33 | Preferential ROO | "Preferential Rules of Origin" |
| 46 | Non Prefential ROO (Form B) | (kosong) |

## Level 2a: Preferential ROO (parent_id=33) — per Skema FTA

| Judul FTA | Content | File PDF |
|---|---|---|
| ASEAN China FTA | (kosong) | tidak ada |
| ASEAN Australia New Zeland FTA | "Product Specific Rules" | `https://api.insw.go.id/assets/upload/intr/1612516574635.pdf` |
| ASEAN Korea FTA | "Product Specific Rules" | `https://api.insw.go.id/assets/upload/intr/1612516697019.pdf` |
| ASEAN India FTA | "Product Specific Rules" | `https://api.insw.go.id/assets/upload/intr/1612517129026.pdf` |
| ASEAN Japan CEP | "Product Specific Rules" | tidak ada |

Keempat PDF Product Specific Rules ini berisi ketentuan ROO (Rules of Origin) spesifik per pos
tarif untuk skema FTA ASEAN dengan Australia-Selandia Baru (AANZFTA), Korea (AKFTA), dan India
(AIFTA) — relevan untuk menentukan apakah suatu produk ekspor Indonesia (mis. kopi, kelapa, gula)
memenuhi syarat tarif preferensial di bawah skema-skema tsb.

## Level 2b: Non-Preferential ROO / Form B (parent_id=46)

| Judul | Content (dasar hukum) | File PDF |
|---|---|---|
| Trade Minister Trade Minister | "Trade Minister Trade Minister Regulation No. 22/M-DAG/PER/3/2015" | `https://api.insw.go.id/assets/upload/intr/1612517870978.pdf` |
| DG Foreign Trade | "DG Foreign Trade Regulation No. 02/DAGLU/PER/6/2015" | `https://api.insw.go.id/assets/upload/intr/1612517949237.pdf` |

Kedua regulasi ini **diterbitkan oleh Kementerian Perdagangan** (Permendag No. 22/M-DAG/PER/3/2015
dan Peraturan Dirjen Perdagangan Luar Negeri No. 02/DAGLU/PER/6/2015) — tentang **Surat Keterangan
Asal (SKA) / Certificate of Origin Form B**, dokumen non-preferensial yang menyatakan negara asal
barang tanpa embel-embel tarif preferensial FTA. Ini konsisten dengan file lain di korpus proyek
folder `corpus/regulasi/ijepa-coo/` (jika ada) mengenai Certificate of Origin.

## Ringkasan Cakupan FTA yang Terkonfirmasi di Portal Ini

- ASEAN–China FTA (ACFTA)
- ASEAN–Australia–New Zealand FTA (AANZFTA) — ada PDF
- ASEAN–Korea FTA (AKFTA) — ada PDF
- ASEAN–India FTA (AIFTA) — ada PDF
- ASEAN–Japan Comprehensive Economic Partnership (AJCEP)
- Non-preferential (Form B / SKA biasa)

**Tidak ditemukan** di level ini skema IJEPA (Indonesia-Japan EPA, bilateral) atau CEPA-CEPA
bilateral lain (Indonesia-Australia/IA-CEPA, dll.) — kemungkinan diklasifikasikan di tempat lain
pada portal ini (mis. langsung di bawah pencarian HS Code) atau memang belum diinput ke tabel ROO
ATR ini secara spesifik.

## Catatan Metodologi (transparansi)

Data di atas diambil dengan memanggil ulang endpoint API publik
`GET https://api.insw.go.id/api/ref/v2/atr/web?bidang=8&parent_id=<id>` — endpoint yang sama persis
yang dipanggil oleh tombol "Show" di UI resmi situs saat pengguna manusia memilih dropdown yang
sesuai. Endpoint ini terbuka untuk CORS (`Access-Control-Allow-Origin: *`) dan tidak memerlukan
otentikasi pengguna (memakai token klien publik yang di-refresh otomatis oleh front-end situs).
Ini BUKAN scraping/bypass keamanan — hanya cara paling efisien untuk mengekstrak konten yang sama
yang akan didapat manusia lewat klik dropdown berkali-kali. Tidak ada gap untuk modul ini karena
seluruh isi hierarki berhasil diambil.
