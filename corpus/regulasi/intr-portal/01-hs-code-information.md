---
nama_modul: "HS Code Information"
sumber_url: "https://insw.go.id/intr"
sumber_url_tambahan:
  - "https://insw.go.id/intr/asean-trade-repository"
  - "https://api.insw.go.id/api/ref/v2/atr/web?bidang=5&parent_id=5 (Tariff Nomenclature)"
  - "https://api.insw.go.id/api/ref/v2/atr/web?bidang=6&parent_id=6 (MFN and Preferential Tariff)"
lembaga_pengelola: "Lembaga National Single Window (LNSW), Kementerian Keuangan RI"
tanggal_akses: "2026-09-02"
catatan_koreksi: "Bukan portal Kemendag; lihat 00-CATATAN-KOREKSI-SUMBER.md. Domain intr.kemendag.go.id tidak eksis."
---

# Modul: HS Code Information

## Lokasi di Portal

Di halaman utama INTR (`https://insw.go.id/intr`), modul ini muncul sebagai kartu paling atas:

> **Indonesia National Trade Repository**
> "Penelusuran Detail Komoditas berdasarkan Kode HS atau Uraian HS"
> — kotak pencarian: *"Cari kode HS / Uraian HS"*

Ini adalah search box React (bukan halaman statis). Mengetik kode HS atau kata kunci uraian barang
akan memicu pemanggilan API pencarian di sisi klien, lalu hasil detail komoditas dirender di rute
`/intr/detail-komoditas` — namun rute ini di-load lewat **React Router `navigate()` dengan state
object** (`{ state: { data: {...} } }`), bukan lewat query string di URL. Artinya membuka
`https://insw.go.id/intr/detail-komoditas` langsung tanpa melalui pencarian tidak akan menampilkan
data apa pun (state kosong).

## GAP — Tidak Bisa Diambil sebagai Teks Statis

**Pencarian per-kode HS (detail tarif/uraian untuk satu komoditas spesifik) memerlukan interaksi
JS**: mengetik kode HS atau nama barang ke dalam form pencarian, memilih salah satu hasil
autocomplete, baru kemudian halaman detail (tarif MFN, tarif preferensial per skema FTA, status
Lartas, dsb. untuk komoditas tsb.) muncul. Tidak ditemukan endpoint/parameter URL statis yang bisa
dipakai untuk "melihat semua kode HS" sekaligus — engine ini per-komoditas, bukan direktori yang
bisa di-crawl penuh tanpa mengetahui kode HS yang dicari terlebih dahulu.

Oleh karena itu, isi HS Code Information *secara umum* (kerangka klasifikasi & dasar hukum) diambil
dari sub-modul **ATR Indonesia → Tariff Nomenclature** dan **ATR Indonesia → MFN and Preferential
Tariff**, yang isinya statis (tidak bergantung pada input kode HS tertentu) dan berhasil diambil
lewat API publik JSON milik portal ini sendiri (`https://api.insw.go.id/api/ref/v2/atr/web`, CORS
terbuka `*`, dipakai langsung oleh front-end situs — bukan endpoint tersembunyi).

## Isi: Tariff Nomenclature (ATR Indonesia, bidang=5)

Sumber: `https://insw.go.id/intr/asean-trade-repository` → kartu "Tariff Nomenclature"

| Judul | Isi / Keterangan | Dasar Hukum | File |
|---|---|---|---|
| ASEAN Harmonised Tariff Nomenclature 2017 | "Implementation of AHTN 2017 in Indonesia is stipulated through Finance Minister Regulation No. 6/PMK.010/2017 on The Stipulation of Goods Classification System and Imposition of Tariff Duty on Imported Goods" | PMK No. 6/PMK.010/2017 | `https://api.insw.go.id/assets/upload/intr/1612760168423.pdf` |
| The Explanatory Notes | "Explanatory notes of AHTN 2017 applied in Indonesia is available in the Annex II of Finance Minister Regulation No. 6/PMK.010/2017 on The Stipulation of Goods Classification System and Imposition of Tariff Duty on Imported Goods" | PMK No. 6/PMK.010/2017 (Annex II) | `https://api.insw.go.id/assets/upload/intr/1612760429257.pdf` |

Catatan: kedua link PDF di atas sudah diverifikasi bisa diunduh (HTTP 200) dari domain
`api.insw.go.id`.

## Isi: MFN and Preferential Tariff (ATR Indonesia, bidang=6)

Sumber: `https://insw.go.id/intr/asean-trade-repository` → kartu "MFN and Prefential Tariff"

| Judul | Isi / Keterangan | Dasar Hukum | File |
|---|---|---|---|
| MFN TARIFF (WTO) | "Most Favored Nation (MFN) Tariff applied in Indonesia is stipulated by Finance Minister Regulation No. 26/PMK.010/2022 on The Stipulation of Goods Classification System and Imposition of Tariff Duty on Imported Goods (Annex III)" | PMK No. 26/PMK.010/2022 (Annex III) | `https://api.insw.go.id/assets/upload/intr/1661929318283.pdf` |
| Preferential Tarif | "Preferential Tariff" | (tidak ada penjelasan tambahan pada field content, hanya file lampiran) | `https://api.insw.go.id/assets/upload/intr/1611285743820.pdf` |

Catatan penting: PMK No. 26/PMK.010/2022 inilah dasar hukum **BTKI 2022** (Buku Tarif Kepabeanan
Indonesia) — dokumen ini sudah lebih dulu ada di korpus proyek pada folder
`corpus/regulasi/hs-code-kopi/` dan `corpus/regulasi/hs-code-gula-kelapa/` sehingga temuan ini
saling menguatkan/konsisten dengan riset sebelumnya, bukan duplikasi baru yang perlu disimpan
ulang PDF-nya.

## Ringkasan Struktur Kode (untuk konteks, bukan dari halaman ini spesifik)

Struktur digit yang dipakai Indonesia (dikonfirmasi silang dengan riset HS Code sebelumnya di
korpus ini): **HS 4 digit** (heading, WCO) → **HS 6 digit** (subheading, WCO) → **AHTN/BTKI 8
digit** (pos tarif nasional Indonesia, dipakai di PIB/PEB). AHTN 2017 dan Explanatory Notes di atas
adalah dasar hukum ASEAN-level untuk struktur 8-digit tsb., sementara PMK 26/2022 adalah penerapan
nasionalnya (BTKI 2022, menggantikan BTKI 2017/PMK 6/2017 untuk keperluan tarif — meskipun AHTN
2017 tetap jadi rujukan nomenklatur dasarnya).
