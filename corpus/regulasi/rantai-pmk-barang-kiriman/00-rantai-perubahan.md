# Rantai Perubahan PMK 96 Tahun 2023 (Barang Kiriman) — Verifikasi Lengkap

Diverifikasi langsung ke: https://jdih.kemenkeu.go.id (situs resmi JDIH Kementerian Keuangan RI)
Metode verifikasi: WebFetch ke halaman detail tiap peraturan (`/dok/pmk-...`) + `curl` langsung ke domain jdih.kemenkeu.go.id + pembacaan isi PDF asli (bukan hanya metadata halaman) untuk mengonfirmasi judul, tanggal, dan pasal yang diubah/dicabut.
Diambil: sesi verifikasi web, 2 September 2026

---

## TL;DR — Versi mana yang BERLAKU SEKARANG?

**PMK 96 Tahun 2023, sebagaimana telah diubah dengan PMK 111 Tahun 2023 (Perubahan Pertama) dan PMK 4 Tahun 2025 (Perubahan Kedua), serta Pasal 30-nya dicabut oleh PMK 82 Tahun 2024.**

Tidak ada naskah konsolidasi resmi (naskah terpadu) yang diterbitkan JDIH Kemenkeu untuk PMK 96/2023 — pembaca harus menggabungkan sendiri 4 dokumen di bawah. Rujukan hukum yang benar dan lengkap:

> "Peraturan Menteri Keuangan Nomor 96 Tahun 2023 tentang Ketentuan Kepabeanan, Cukai, dan Pajak atas Impor dan Ekspor Barang Kiriman, sebagaimana telah diubah dengan Peraturan Menteri Keuangan Nomor 111 Tahun 2023, dan Peraturan Menteri Keuangan Nomor 4 Tahun 2025."

## Klaim yang Diminta Diverifikasi — HASIL: BENAR, tidak perlu koreksi urutan

Klaim yang diperiksa: *"PMK 111 Tahun 2023 adalah Perubahan Pertama atas PMK 96/2023, dan PMK 4 Tahun 2025 adalah Perubahan Kedua."*

**Status: TERVERIFIKASI BENAR.**

- PMK 111/2023 berjudul *"Perubahan atas Peraturan Menteri Keuangan Nomor 96 Tahun 2023 ..."* (ditetapkan/diundangkan 16 Oktober 2023). Judul resminya tidak secara eksplisit menulis kata "Pertama" — ini konvensi normal perundang-undangan Indonesia untuk perubahan yang pertama kali terjadi atas suatu peraturan (baru perubahan kedua dan seterusnya yang diberi label angka di judul).
- PMK 4/2025 berjudul *"**Perubahan Kedua** atas Peraturan Menteri Keuangan Nomor 96 Tahun 2023 ..."* — secara eksplisit menyebut dirinya "Kedua", yang secara logis mengonfirmasi bahwa PMK 111/2023 adalah perubahan **pertama** (karena tidak ada PMK lain yang mengklaim sebagai "Perubahan Pertama" atas PMK 96/2023 di rantai ini).
- Konsisten dengan konsiderans "Mengingat" pada teks PMK 4/2025 dan PMK 82/2024, yang mengutip PMK 96/2023 "sebagaimana telah diubah dengan Peraturan Menteri Keuangan Nomor 111 Tahun 2023" — mengonfirmasi urutan kronologis dari sisi redaksi resmi kedua peraturan turunan tersebut.
- Halaman riwayat dokumen JDIH untuk PMK 96/2023 (`/dok/pmk-96-tahun-2023`) mencantumkan PMK 111/2023 dan PMK 4/2025 sebagai dua peraturan yang mengubahnya, dalam urutan kronologis: 111/2023 (2023) lebih dulu, 4/2025 (2025) belakangan.

**Tidak ada kesalahan urutan pada klaim batch sebelumnya. PMK 111/2023 memang eksis dan memang Perubahan Pertama.**

## TEMUAN TAMBAHAN (koreksi/pelengkap yang TIDAK diminta secara eksplisit, tapi penting)

Saat menelusuri riwayat dokumen resmi PMK 96/2023 di JDIH, ditemukan **satu mata rantai lagi yang selama ini tidak disebut sama sekali** di batch sebelumnya:

> **PMK Nomor 82 Tahun 2024** tentang **Tata Cara Pembebasan Cukai** (ditetapkan 14 Oktober 2024, diundangkan & berlaku 18 Oktober 2024) — pada bagian ketentuan penutupnya (pasal pencabutan, poin g) secara eksplisit **mencabut dan menyatakan tidak berlaku Pasal 30** dari "Peraturan Menteri Keuangan Nomor 96 Tahun 2023 ... sebagaimana telah diubah dengan Peraturan Menteri Keuangan Nomor 111 Tahun 2023 ...".

Ini **bukan** "perubahan" bergaya *Perubahan Pertama/Kedua* (PMK 82/2024 bukan peraturan yang berjudul "Perubahan atas PMK 96/2023"), melainkan **pencabutan sebagian (parsial)** satu pasal tunggal, dilakukan lewat peraturan lain yang topik utamanya lebih luas (konsolidasi seluruh tata cara pembebasan cukai lintas konteks: barang penumpang, awak sarana pengangkut, toko bebas bea, dan barang kiriman).

- **Pasal yang dicabut**: Pasal 30 PMK 96/2023 — mengatur batas kuantitas pembebasan cukai untuk barang kena cukai (rokok/hasil tembakau, minuman beralkohol) dalam Barang Kiriman impor yang diselesaikan dengan CN atau PIBK (mis. maksimum 40 batang sigaret, 350 ml minuman beralkohol, dst. per Penerima Barang per kiriman).
- **Diganti oleh**: ketentuan pembebasan cukai yang setara kini diatur dalam PMK 82/2024 itu sendiri (yang menjadi aturan payung tunggal untuk seluruh pembebasan cukai, bukan lagi tersebar di masing-masing PMK sektoral).
- **Dampak ke rantai 96/2023**: hanya menyentuh 1 pasal (Pasal 30, soal cukai rokok/alkohol dalam barang kiriman impor) — TIDAK memengaruhi pasal-pasal ekspor barang kiriman (Pasal 43–54) yang menjadi fokus riset UMKM ekspor di batch sebelumnya. Pasal 76 (diubah PMK 111/2023) dan Pasal 43/44/47/49/53/54 (diubah PMK 4/2025) tidak disentuh oleh PMK 82/2024.

**Kenapa ini perlu dicatat sebagai koreksi**: klaim "rantai perubahan lengkap = 96/2023 → 111/2023 → 4/2025" **tidak sepenuhnya lengkap** — secara teknis ada instrumen keempat (PMK 82/2024) yang juga mengubah status hukum satu pasal PMK 96/2023, dan secara kronologis duduk **di antara** PMK 111/2023 (Okt 2023) dan PMK 4/2025 (Jan/Mar 2025). Untuk keperluan riset ekspor barang kiriman UMKM, dampaknya minor (hanya pasal cukai rokok/alkohol impor), tapi untuk kepatuhan hukum yang presisi 100%, PMK 82/2024 sebaiknya ikut dicatat sebagai bagian dari riwayat PMK 96/2023.

## Kronologi Lengkap (terverifikasi ke jdih.kemenkeu.go.id)

| No. | Peraturan | Ditetapkan | Diundangkan/Berlaku | Sifat perubahan | Pasal yang tersentuh |
|---|---|---|---|---|---|
| 1 | **PMK 96/2023** — Ketentuan Kepabeanan, Cukai, dan Pajak atas Impor dan Ekspor Barang Kiriman | — | 17 Okt 2023 (BN 2023 No. 740) | Peraturan asal (mencabut PMK 199/PMK.010/2019) | Seluruh batang tubuh (Pasal 1–76 + lampiran) |
| 2 | **PMK 111/2023** — Perubahan atas PMK 96/2023 *("Perubahan Pertama")* | 16 Okt 2023 | 16 Okt 2023 / berlaku 17 Okt 2023 (BN 2023 No. 823) | Perubahan pasal tunggal, administratif | Hanya **Pasal 76** (tanggal mulai berlaku) |
| 3 | **PMK 82/2024** — Tata Cara Pembebasan Cukai | 14 Okt 2024 | 18 Okt 2024 (BN 2024 No. 772) | **Pencabutan sebagian** (bukan "Perubahan atas ...") | Mencabut **Pasal 30** PMK 96/2023 jo. PMK 111/2023 |
| 4 | **PMK 4/2025** — Perubahan Kedua atas PMK 96/2023 | 6 Jan 2025 | Diundangkan 3 Feb 2025 / berlaku 5 Mar 2025 | Perubahan substantif multi-pasal | Pasal 43, 44, 47 (sisipan 1a–1b baru), 49, 53 (sisipan 3a baru), 54, 55, dan lampiran PKBK |

## Berkas dalam folder ini

- `pmk-111-2023-perubahan-pertama-barang-kiriman.pdf` — dokumen resmi lengkap PMK 111/2023 (4 halaman), diunduh dari jdih.kemenkeu.go.id.
- `01-ringkasan-pmk-111-2023-perubahan-pertama.md` — ringkasan isi PMK 111/2023, dengan header sumber URL.
- `00-rantai-perubahan.md` — file ini.

## Berkas terkait di folder lain (tidak diduplikasi ke sini, sudah ada dari batch sebelumnya)

- PMK 96/2023 (naskah asli): `../pmk-barang-kiriman/pmk-96-2023-barang-kiriman.pdf` + ringkasan `../pmk-barang-kiriman/00-ringkasan-pmk-96-2023-barang-kiriman.md`
- PMK 4/2025 (Perubahan Kedua): `../pmk-barang-kiriman/pmk-4-2025-barang-kiriman.pdf` + ringkasan `../pmk-barang-kiriman/01-ringkasan-pmk-4-2025-perubahan-barang-kiriman.md`
- Catatan struktural: PMK 96/2023 dan PMK 4/2025 juga ada salinan lain di `../klaster4-kepabeanan-pajak-kiriman/` (duplikasi lintas folder korpus — lihat catatan gap di bawah).
- PMK 82/2024 (Tata Cara Pembebasan Cukai) **belum** ada salinannya di corpus manapun — direkomendasikan diunduh jika riset ke depan menyentuh topik cukai rokok/alkohol dalam barang kiriman impor. Sumber: https://jdih.kemenkeu.go.id/api/download/06e861a0-f529-4a0b-802f-9a3ff1ad7353/2024pmkeuangan082.pdf (dokumen lengkap 191 halaman — mencakup banyak topik cukai lain di luar barang kiriman; pasal relevan ada di ketentuan penutup, sekitar Pasal 57 dan Lampiran).

## Gap / hal yang belum diverifikasi lebih lanjut

- Belum dicek apakah ada perubahan lain sesudah PMK 4/2025 (per tanggal verifikasi 2 September 2026) — halaman riwayat JDIH untuk PMK 96/2023 yang diakses hanya menunjukkan 111/2023 dan 4/2025 sebagai "mengubah", plus PMK 82/2024 sebagai "mencabut sebagian". Jika ada PMK terbaru di 2025–2026 yang menyentuh PMK 96/2023 lagi, itu tidak tercakup di sini.
- PMK 82/2024 sendiri belum diunduh ke corpus ini (hanya diverifikasi isi pasal pencabutannya via ekstraksi teks PDF sementara) — lihat rekomendasi di atas.
- Nomor pasal persis dalam PMK 82/2024 yang memuat klausul pencabutan (terlihat di sekitar Pasal 57 dari total 58 pasal batang tubuh) belum dikonfirmasi nomor pastinya karena ekstraksi teks PDF via `pdftotext` kehilangan sebagian nomor pasal berurutan di bagian ketentuan penutup — nomor pasal 30 yang dicabut sendiri sudah dikonfirmasi presisi (dikutip verbatim di teks PMK 82/2024).
