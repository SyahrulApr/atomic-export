# ASEAN Trade Repository (ATR) — Overview & Struktur Topik

**Portal:** ASEAN Trade Repository (ATR), didukung program ARISE+
**Sumber utama:**
- https://atr.asean.org/ (landing page)
- https://atr.asean.org/read/about-asean-trade-repository/22 (About)
- http://atr.asean.org/topic/ (Topics index)
- Diakses: 2026-09-02

**Catatan sifat sumber:** Halaman landing, About, dan Topics index bersifat statis dan berhasil di-fetch penuh. Namun, halaman-halaman ini secara struktural hanya berfungsi sebagai **direktori/definisi umum** yang mengarahkan ke tool pencarian interaktif per negara (`atr.asean.org/links/search/?country_code=...`) — lihat bagian Gap di setiap file topik.

---

## Apa Itu ATR

> "The ATR is a single point of access to all the trade-related information of ASEAN Member States."

ATR adalah sistem IT tingkat ASEAN yang menghubungkan (link) ke **National Trade Repositories (NTRs)** yang dikelola masing-masing pemerintah negara anggota.

## Dasar Hukum

Struktur ATR mengikuti **Pasal 13 ASEAN Trade in Goods Agreement (ATIGA)**.

## Tujuan & Cakupan

ATR mengorganisir informasi perdagangan ke dalam **9 topik utama**, dan pengguna dapat mencari berdasarkan topik + negara (dari 10 negara anggota ASEAN).

## Sembilan Topik ATR

| # | Topik | URL Halaman Topik |
|---|---|---|
| 1 | Tariff nomenclature | (lihat file `asean-trade-repository-tarif.md`) |
| 2 | MFN and preferential tariffs (WTO, ATIGA, dialogue partners: AANZFTA, ACFTA, AIFTA, AJCEP, AKFTA) | https://atr.asean.org/read/mfn-tariffs-wto/50 , https://atr.asean.org/read/atiga-tariffs/51 |
| 3 | Rules of origin (non-preferential & preferential) | https://atr.asean.org/read/non-preferential-rules-of-origin/57 , https://atr.asean.org/read/preferential-rules-of-origin/58 |
| 4 | Non-tariff measures | https://atr.asean.org/read/non-tariff-measures/44 |
| 5 | National trade and customs laws and rules | https://atr.asean.org/read/national-trade-and-customs-laws-and-rules/45 |
| 6 | Procedures and documentary requirements | https://atr.asean.org/read/procedures-and-documentary-requirements/46 |
| 7 | Administrative rulings | https://atr.asean.org/read/administrative-rulings/47 |
| 8 | Trade facilitation best practices | https://atr.asean.org/read/best-practices-in-trade-facilitation-applied-by-each-member-state/48 |
| 9 | Authorised traders list | https://atr.asean.org/read/list-of-authorised-traders-of-ams/49 |

## Menu Navigasi Utama Portal

| Menu | URL |
|---|---|
| Home | http://atr.asean.org/ |
| About | https://atr.asean.org/read/about-asean-trade-repository/22 |
| ATR (search) | http://atr.asean.org/links/search/ |
| NTRs (National Trade Repositories per negara) | https://atr.asean.org/read/national-trade-repositories-asean-member-countries/60 |
| Enquiries (lapor NTM) | https://atr.asean.org/report-an-ntm |
| Topics | http://atr.asean.org/topic/ |
| Standards | http://atr.asean.org/standards/ |
| Contact | https://atr.asean.org/read/contact-asean-trade-repository-secretariat/345 |
| Disclaimer | https://atr.asean.org/read/disclaimer/61 |

## Fitur Terkait di Ekosistem ARISE+

- **ARISE+ Programme** — https://ariseplus.asean.org
- **ACTS** (ASEAN Customs Transit System) — https://acts.asean.org
- **ASEAN Standards Widget** — https://asw.asean.org
- **ASEAN Tariff Finder** — https://tariff-finder.asean.org
- **ASEAN Consumer Portal** — https://aseanconsumer.org

Halaman standar (Standards) menyebutkan: database ini "contains the standards that ASEAN has harmonized towards the existing relevant international standards, as mandated under the ATIGA."

---

## Gap / Keterbatasan

- Brief menyebut mencari "ASEAN Trade Repository" atau "ATR ASEAN" — portal yang ditemukan dan berhasil diakses adalah **atr.asean.org**. Perlu dicatat: sebagian konten di atr.asean.org sendiri (mis. halaman `topic/44` untuk Non-Tariff Measures) sempat mengalami error koneksi sesaat (socket hang up) pada percobaan pertama namun berhasil pada percobaan ulang — indikasi server tidak selalu stabil/cepat.
- Setiap topik pada dasarnya hanya berisi **satu paragraf definisi umum** ditambah **daftar link pencarian per negara** (`?country_code=xx&src=topics&id_topic=NN&level=N`). Data substantif (tarif aktual, teks rules of origin lengkap, daftar NTM konkret per HS Code, dsb.) ada di balik form pencarian tersebut dan sifatnya per-negara/per-HS-Code — lihat detail gap di masing-masing file topik (`asean-trade-repository-tarif.md`, `asean-trade-repository-rules-of-origin.md`, `asean-trade-repository-non-tariff-measures.md`, `asean-trade-repository-prosedur-kepabeanan.md`).
