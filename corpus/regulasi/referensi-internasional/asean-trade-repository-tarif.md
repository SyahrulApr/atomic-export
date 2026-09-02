# ASEAN Trade Repository (ATR) — Tariffs (Tarif)

**Portal:** ASEAN Trade Repository (ATR)
**Sumber utama:**
- https://atr.asean.org/read/mfn-tariffs-wto/50 (MFN Tariffs (WTO))
- https://atr.asean.org/read/atiga-tariffs/51 (ATIGA Tariffs)
- Diakses: 2026-09-02

**Catatan sifat sumber:** Kedua halaman ini statis dan berhasil di-fetch, tetapi isinya hanya **satu kalimat definisi** ditambah **daftar tautan pencarian per negara** — bukan data tarif itu sendiri. Lihat bagian Gap.

---

## 1. MFN Tariffs (WTO)

> "MFN tariffs are specific tariff concessions and other commitments negotiated and agreed upon by each ASEAN Member State within the framework of the WTO."

Komitmen tarif MFN ini kemudian dimasukkan ke dalam hukum domestik masing-masing negara.

**Tautan pencarian per negara** (format: `?country_code=<kode>&src=topics&id_topic=50&level=2`):

| Negara | URL |
|---|---|
| Brunei Darussalam | https://atr.asean.org/links/search/?country_code=bn&src=topics&id_topic=50&level=2 |
| Cambodia | https://atr.asean.org/links/search/?country_code=kh&src=topics&id_topic=50&level=2 |
| Indonesia | https://atr.asean.org/links/search/?country_code=id&src=topics&id_topic=50&level=2 |
| Lao PDR | https://atr.asean.org/links/search/?country_code=la&src=topics&id_topic=50&level=2 |
| Malaysia | https://atr.asean.org/links/search/?country_code=my&src=topics&id_topic=50&level=2 |
| Myanmar | https://atr.asean.org/links/search/?country_code=mm&src=topics&id_topic=50&level=2 |
| Philippines | https://atr.asean.org/links/search/?country_code=ph&src=topics&id_topic=50&level=2 |
| Singapore | https://atr.asean.org/links/search/?country_code=sg&src=topics&id_topic=50&level=2 |
| Thailand | https://atr.asean.org/links/search/?country_code=th&src=topics&id_topic=50&level=2 |
| Vietnam | https://atr.asean.org/links/search/?country_code=vn&src=topics&id_topic=50&level=2 |

## 2. ATIGA Tariffs

> "ATIGA tariffs are preferential tariffs concessions and other commitments negotiated and agreed upon by each ASEAN Member State within the framework of the ATIGA."

Komitmen ini juga dimasukkan ke dalam hukum domestik masing-masing negara. Halaman tidak memuat jadwal penurunan tarif (tariff reduction schedule) atau instruksi pencarian berdasarkan HS Code — hanya berfungsi sebagai direktori link ke data per negara.

**Halaman ini pada dasarnya adalah direktori ke 10 negara anggota ASEAN** (Brunei Darussalam, Cambodia, Indonesia, Lao PDR, Malaysia, Myanmar, Philippines, Singapore, Thailand, Vietnam) tanpa mencantumkan URL search per-negara yang eksplisit di badan teks (berbeda dari halaman MFN Tariffs di atas).

Tautan pendukung yang muncul di halaman ATIGA Tariffs:
- Main ATR Search — http://atr.asean.org/links/search/
- About ATR — https://atr.asean.org/read/about-asean-trade-repository/22
- National Trade Repositories — https://atr.asean.org/read/national-trade-repositories-asean-member-countries/60

## Sumber Tarif Alternatif yang Disebut Ekosistem ATR

- **ASEAN Tariff Finder** (tool pencarian tarif preferensial ASEAN+FTA mitra dialog, termasuk AANZFTA/ACFTA/AIFTA/AJCEP/AKFTA) — https://tariff-finder.asean.org (belum di-fetch di sesi ini; kemungkinan besar juga tool interaktif berbasis form HS Code + negara).

---

## Gap / Keterbatasan

- **Tidak ada data tarif aktual (angka persentase bea, jadwal penurunan tarif) yang bisa diambil sebagai teks statis** untuk kombinasi HS Code + negara tertentu. Baik untuk MFN maupun ATIGA, ATR mewajibkan pengguna memasukkan `country_code` (dan pada level pencarian berikutnya, HS Code produk) lewat tool `atr.asean.org/links/search/` — hasilnya kemungkinan besar dirender dinamis (tabel database), bukan halaman teks yang dapat diringkas untuk "semua kombinasi negara x produk".
- Halaman ATIGA Tariffs tidak konsisten dengan halaman MFN Tariffs dalam mencantumkan link per-negara secara eksplisit — kemungkinan struktur CMS ATR belum seragam antar sub-topik.
- **ASEAN Tariff Finder** (tariff-finder.asean.org) berpotensi menjadi sumber tarif preferensial yang lebih terstruktur, tetapi belum divalidasi pada sesi riset ini — kemungkinan besar juga murni interaktif (form HS Code + negara asal + negara tujuan).
