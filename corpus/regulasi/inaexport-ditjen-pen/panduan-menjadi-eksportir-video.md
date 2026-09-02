---
sumber_url: https://ditjenpen.kemendag.go.id/berita/panduan-menjadi-eksportir
sumber_lembaga: Direktorat Jenderal Pengembangan Ekspor Nasional (Ditjen PEN), Kementerian Perdagangan RI
domain_resmi: ditjenpen.kemendag.go.id (.go.id)
tanggal_publikasi_asli: Jumat, 3 Agustus 2018, pukul 11:07 WIB
tanggal_akses: 2026-09-02
kategori: Panduan bisnis ekspor (non-regulasi) / Materi video panduan
catatan_ekstraksi: Halaman ini TIDAK berisi artikel teks — hanya berupa halaman berita yang membungkus satu video YouTube. Dikonfirmasi dengan mengambil HTML mentah via curl (HTTP 200) dan memeriksa body artikel; satu-satunya teks isi adalah caption "Video Panduan Menjadi Eksportir".
---

# Panduan Menjadi Eksportir (materi video resmi Ditjen PEN)

> Sumber resmi: https://ditjenpen.kemendag.go.id/berita/panduan-menjadi-eksportir
> Penerbit: Direktorat Jenderal Pengembangan Ekspor Nasional (Ditjen PEN), Kementerian Perdagangan RI
> Tanggal publikasi: Jumat, 3 Agustus 2018, pukul 11:07 WIB

## Isi halaman

Halaman ini adalah entri "berita" di situs Ditjen PEN yang isinya murni video YouTube berjudul **"Panduan Menjadi Eksportir"**, tanpa naskah/artikel teks pendamping. Caption satu-satunya pada halaman adalah:

> "Video Panduan Menjadi Eksportir"

Video tertanam (embed) dengan ID YouTube `CcxQv6Glkp8`, dapat ditonton langsung di:
https://www.youtube.com/watch?v=CcxQv6Glkp8

## Kenapa file ini tetap disimpan

File ini sengaja disimpan sebagai catatan bahwa Ditjen PEN memang menerbitkan materi "Panduan Menjadi Eksportir" resmi, namun kontennya berbentuk **video**, bukan teks/artikel yang bisa diekstrak dan dikutip verbatim ke dalam corpus tertulis. Untuk mendapatkan isi panduan tersebut secara lengkap, materi perlu ditonton langsung (transkrip video tidak tersedia di halaman sumber maupun di deskripsi video YouTube pada saat pengecekan).

## Catatan teknis akses

Percobaan awal via WebFetch terhadap URL ini gagal dengan pesan "Unable to verify if domain is safe to fetch" (pemblokiran/verifikasi domain sisi WebFetch, sifatnya tidak konsisten — percobaan WebFetch lain ke sub-halaman berbeda pada domain yang sama, yaitu `/faq`, berhasil). Untuk memastikan tidak ada isi teks yang terlewat, halaman diambil ulang langsung via `curl` (HTTP 200) dan diperiksa manual — dikonfirmasi bahwa memang tidak ada artikel teks di HTML, hanya wrapper video.

## Gap: domain djpen.kemendag.go.id tidak dapat diakses

Domain root **`djpen.kemendag.go.id`** (berbeda dari subdomain `ditjenpen.kemendag.go.id` yang dipakai untuk seluruh konten di atas) **tidak dapat dijangkau sama sekali** dari lingkungan riset ini — baik lewat WebFetch maupun `curl` langsung (termasuk dengan bypass verifikasi TLS `-k`), keduanya gagal pada tahap TLS handshake / connection reset (`ECONNRESET`, `HTTP_CODE:000`). DNS domain ini justru resolve ke `djpen.lc.kemendag.go.id`, mengindikasikan kemungkinan domain lama/legacy yang sedang bermasalah atau di-redirect secara tidak standar.

Akibatnya, halaman berikut **tidak berhasil diambil** dan berpotensi berisi materi panduan ekspor pemula tambahan yang relevan dengan task ini:
- https://djpen.kemendag.go.id/app_frontend/links/65-panduan-ekspor ("Panduan Ekspor" — link listing, kemungkinan berisi kumpulan tautan/dokumen panduan ekspor pemula)
- https://djpen.kemendag.go.id/berita/kenalan-yuk-ini-dia-ditjen-pen-pengawalnya-expor-indonesia-tgsl (artikel perkenalan Ditjen PEN dan fungsinya)

Rekomendasi tindak lanjut: coba akses ulang domain `djpen.kemendag.go.id` dari jaringan/lokasi lain (kemungkinan diblokir dari IP sandbox ini), atau hubungi Ditjen PEN langsung untuk memastikan apakah domain ini sudah dipensiunkan dan digantikan sepenuhnya oleh `ditjenpen.kemendag.go.id`.
