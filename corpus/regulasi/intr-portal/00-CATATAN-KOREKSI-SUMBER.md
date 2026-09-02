---
tanggal_akses: "2026-09-02"
---

# Koreksi Penting: INTR Bukan Portal Kemendag

Task asli meminta riset atas "portal resmi INTR (Indonesia National Trade Repository) milik
Kementerian Perdagangan" dengan asumsi domain `intr.kemendag.go.id`. Setelah verifikasi, klaim ini
**tidak akurat** dan perlu dikoreksi:

## Temuan Verifikasi

1. **Domain `intr.kemendag.go.id` tidak eksis.** Pencarian `site:intr.kemendag.go.id` tidak
   mengembalikan hasil apa pun yang berasal dari domain tersebut. DNS untuk domain-domain lama yang
   pernah dipakai INTR (`intr.insw.go.id`, `eservice.insw.go.id`) juga sudah mati (tidak resolve /
   `ENOTFOUND`).
2. **URL resmi INTR yang aktif saat ini: `https://insw.go.id/intr`** — bagian dari situs
   **Indonesia National Single Window (INSW)**.
3. **Pengelola INTR/INSW adalah Lembaga National Single Window (LNSW), unit di bawah Kementerian
   Keuangan RI** — bukan Kementerian Perdagangan. Ini dikonfirmasi langsung dari meta-deskripsi
   resmi situs:

   > "Website Indonesia National Single Window atau dikenal INSW dikelola oleh Lembaga National
   > Single Window (LNSW), Kementerian Keuangan RI. LNSW bertugas melaksanakan Pengelolaan INSW dan
   > Penyelenggaraan SINSW dalam penanganan dokumen kepabeanan, dokumen kekarantinaan, dokumen
   > perizinan, dokumen kepelabuhanan/kebandarudaraan, dan dokumen lain, yang terkait dengan ekspor
   > dan/atau impor secara elektronik."

   Alamat kantor pada footer situs juga beralamat di Kemenkeu (Gedung Syafrudin Prawiranegara,
   Jl. Lapangan Banteng Timur No. 2-4, Jakarta Pusat), dan hak cipta tercantum "LNSW 2026".
4. **Peran Kemendag**: Kementerian Perdagangan adalah salah satu dari banyak K/L (Kementerian /
   Lembaga) yang regulasinya **diindeks** di dalam INTR — misalnya "Regulasi Ekspor (Lartas
   Ekspor)" dan "Regulasi Impor (Lartas Border)" berasal dari Permendag. Tapi Kemendag bukan
   pemilik/pengelola platform INTR itu sendiri. Ini konsisten dengan mandat INSW sebagai "single
   window" lintas-K/L (Kemenkeu/Bea Cukai, Kemendag, Kementan/Karantina, BPOM, dll.) — bukan sistem
   satu instansi.

## Kesimpulan untuk Riset Ini

Seluruh 5 file modul di folder ini (`01`–`05`) diambil dari **`https://insw.go.id/intr`** dan
turunannya (`https://insw.go.id/intr/asean-trade-repository`, `https://insw.go.id/intr/peraturan`,
`https://insw.go.id/intr/simulasi`), BUKAN dari `intr.kemendag.go.id` (yang memang tidak ada).
Setiap file mencantumkan `sumber_url` yang benar-benar diverifikasi dapat diakses.
