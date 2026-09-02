---
tanggal_riset: "2026-09-02"
topik: "Klasifikasi HS Code Kopi (HS 0901 / 0901.21) dalam BTKI + tarif bea masuk kopi Indonesia ke Jepang di bawah IJEPA"
---

# Indeks Folder: HS Code Kopi

## Ringkasan (.md, sudah diolah — baca ini dulu)

| File | Isi | Sumber Primer |
|---|---|---|
| `01-klasifikasi-hs-0901-btki-2022.md` | Struktur HS 0901 (kopi) di BTKI 2022 + tabel lengkap tarif Bea Masuk MFN (impor ke Indonesia) untuk semua sub-pos, termasuk 0901.21 (kopi sangrai non-decaf) = 20% | PMK 26/PMK.010/2022, jdih.kemenkeu.go.id |
| `02-ijepa-tarif-bea-masuk-kopi-ke-jepang.md` | Kategori tarif Jepang untuk kopi asal Indonesia di bawah IJEPA — green bean (0901.11/12) = bebas bea masuk sejak 2008 (kategori A); **kopi sangrai (0901.21/22) = kategori "R", tunduk negosiasi, TIDAK ada komitmen penurunan tarif otomatis** | Annex 1 IJEPA, ftasupportcenter.kemendag.go.id |

## Dokumen Sumber Asli (.pdf, resmi/pemerintah)

| File | Sumber URL | Domain Resmi (.go.id)? |
|---|---|---|
| `pmk-26-2022-btki-full.pdf` (673 hlm.) | https://jdih.kemenkeu.go.id/api/download/04d90736-33d5-4b72-92a3-0d2b7c6bb8bd/26~PMK.010~2022Per.pdf | Ya — Kemenkeu |
| `leaflet-btki-2022.pdf` | https://repository.beacukai.go.id/download/2022/04/f8d97a8aa8b2d75aaedd47930d388ed3-leaflet-btki-2022.pdf | Ya — Bea Cukai (DJBC) |
| `ijepa-annex1-schedule-of-japan.pdf` (148 hlm.) | https://ftasupportcenter.kemendag.go.id/cfind/source/files/ijepa/annex-1-referred-to-in-chapter-2-schedules-in-relation-to-article-20.pdf | Ya — Kemendag |
| `pmk-30-2017-ijepa-bea-masuk.pdf` (511 hlm.) | https://ftasupportcenter.kemendag.go.id/cfind/source/files/ijepa/pmk-302017-penetapan-tarif-bea-masuk-ijepa-hs-2017.pdf | Ya — Kemendag (memuat PMK Kemenkeu) |
| `ringkasan-ijepa-kemendag.pdf` | https://ftasupportcenter.kemendag.go.id/cfind/source/files/ijepa/ringkasan-ijepa-dan-lampirannya.pdf | Ya — Kemendag |

## Gap / Yang Tidak Berhasil Diverifikasi

1. **Tarif MFN Jepang berjalan (real-time) untuk HS 0901.21/0901.22** — halaman resmi Japan
   Customs (`customs.go.jp/english/tariff/...` dan `customs.go.jp/english/c-answer_e/...`) **tidak
   bisa diakses** dari environment ini (TLS handshake failure, kemungkinan pemblokiran
   region/WAF pada level jaringan, bukan masalah URL). Perlu dicoba lagi dari jaringan lain atau
   via browser manual.
2. **Isi rinci Protokol Perubahan (amandemen) IJEPA 2025** untuk pos tarif kopi — berita Kemendag
   mengonfirmasi ada penambahan 112 pos tarif dengan preferensi baru (disebut: olahan
   tuna/hasil laut, pisang, nanas, produk makanan-minuman, bubuk kakao) tapi **tidak menyebut kopi
   secara eksplisit**, dan teks lengkap lampiran tarif amandemen 2025 belum ditemukan versi
   publik yang bisa diunduh (ratifikasi Indonesia ditargetkan baru rampung semester II 2025,
   sehingga lampiran resmi kemungkinan belum dipublikasikan saat riset ini dilakukan).
3. **Portal interaktif INSW** (`insw.go.id/intr`, `eservice.insw.go.id`) — halaman web-app
   berbasis JavaScript penuh, tidak menghasilkan konten saat diambil dengan fetch teks statis;
   perlu browser otomasi (mis. Selenium/Playwright) untuk scraping data tarif real-time per HS
   Code dari sumber ini. Data yang sama secara substansi sudah tercakup di PMK 26/PMK.010/2022
   (BTKI 2022) yang berhasil diunduh utuh.
4. Tidak ditemukan versi PDF tabel tarif resmi terpisah khusus Bab 9 (kopi) di
   `beacukai.go.id` — situs tersebut hanya menyediakan leaflet ringkasan dan mengarahkan ke BTKI
   penuh (yang justru berhasil didapat dari `jdih.kemenkeu.go.id`, sumber legal PMK-nya langsung).
