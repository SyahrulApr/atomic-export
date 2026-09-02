# Glosarium Istilah Kepabeanan & Dokumen Ekspor-Impor

> **Jenis dokumen:** Kompilasi glosarium — disusun dari beberapa sumber resmi pemerintah (jdih.kemenkeu.go.id, beacukai.go.id, peraturan.bpk.go.id) dan sumber edukasi kepabeanan/logistik yang kredibel, untuk basis pengetahuan RAG Copilot ekspor UMKM.
> **Disusun untuk riset:** 2 September 2026.
> **Cara pakai:** Setiap istilah diberi tag sumber `[S-n]` yang mengacu ke daftar **Sumber Rujukan** di bagian paling bawah file ini. Istilah yang berasal dari peraturan resmi (UU/PMK/Perdirjen/Perjanjian Internasional) ditandai **(RESMI)**; istilah dari kompilasi edukasi kepabeanan/logistik ditandai **(KOMPILASI)** karena tidak ditemukan definisi hukum formalnya dalam peraturan Indonesia (istilah ini berasal dari praktik dagang internasional/hukum dagang, bukan produk hukum kepabeanan RI).

---

## 1. Dokumen Perdagangan & Pengapalan (Trade & Shipping Documents)

### Bill of Lading (B/L) / Konosemen — **(KOMPILASI, berbasis KUHD)**
Surat bertanggal yang diterbitkan oleh pengangkut (perusahaan pelayaran) sebagai pernyataan bahwa barang telah diterima untuk diangkut ke tempat tujuan tertentu. Definisi ini merujuk pada Pasal 506 Kitab Undang-Undang Hukum Dagang (KUHD). B/L memiliki tiga fungsi hukum:
1. **Tanda terima barang** — bukti pengangkut telah menerima muatan sesuai kondisi dan jumlah yang dinyatakan;
2. **Kontrak pengangkutan** — menetapkan hak dan kewajiban antara pengirim (shipper), pengangkut (carrier), dan penerima (consignee);
3. **Dokumen kepemilikan (document of title)** — pemegang B/L asli berhak mengambil barang di pelabuhan tujuan.

Jenis-jenis B/L: **Master B/L** (diterbitkan perusahaan pelayaran) vs **House B/L** (diterbitkan freight forwarder/NVOCC); **Clean B/L** (tanpa catatan kerusakan) vs **Claused B/L** (ada catatan kerusakan/kekurangan); **Straight B/L** (tidak dapat dipindahtangankan) vs **Order B/L** (dapat dipindahtangankan lewat endorsement) vs **Bearer B/L**; serta bentuk **Sea Waybill**, **Telex Release**, dan **Electronic B/L (eBL)**. Informasi wajib dalam B/L umumnya mencakup: nomor B/L, data shipper/consignee/notify party, nama kapal & nomor voyage, pelabuhan muat & bongkar, uraian dan jumlah/berat/volume muatan, syarat pembayaran freight, tanggal penerbitan, dan tanda tangan pengangkut.
*Sumber: [S-7]. Untuk kiriman lewat udara, dokumen setaranya adalah Airway Bill (AWB) — lihat di bawah.*

### Packing List — **(KOMPILASI)**
Dokumen rincian isi kemasan barang yang memuat jumlah, berat (netto/bruto), dan dimensi setiap kemasan/koli dalam satu pengiriman. Digunakan bea cukai dan pihak terkait untuk pemeriksaan fisik dan penanganan kargo, serta harus konsisten dengan uraian barang pada Commercial Invoice dan dokumen pabean lainnya.
*Sumber: [S-8], [S-9].*

### Commercial Invoice — **(KOMPILASI)**
Dokumen tagihan resmi dari penjual (eksportir) kepada pembeli (importir) yang memuat nilai transaksi barang: harga per item dan total nilai barang. Dokumen ini menjadi dasar utama perhitungan bea masuk dan pajak impor oleh otoritas pabean negara tujuan, serta menjadi salah satu dokumen pelengkap pabean wajib saat pengajuan PEB di Indonesia.
*Sumber: [S-8], [S-9]. Kewajiban melampirkan invoice sebagai dokumen pelengkap pabean ekspor disebut dalam praktik prosedur PEB Bea Cukai — lihat berkas `corpus/regulasi/peb-insw/02-pemberitahuan-pabean-ekspor-beacukai-pangkalpinang.md`.*

### Certificate of Origin (COO) / Surat Keterangan Asal (SKA) — **(RESMI, contoh konkret dari perjanjian dagang)**
Dokumen bukti asal suatu barang, diterbitkan oleh otoritas pemerintah yang berwenang di negara pengekspor (di Indonesia: instansi yang ditunjuk, dengan Kementerian Perdagangan sebagai otoritas kompeten untuk penerbitan SKA berdasarkan perjanjian dagang), atas permintaan tertulis eksportir atau agen resminya. SKA digunakan sebagai dasar klaim **tarif preferensial** (penurunan/pembebasan bea masuk) di negara pengimpor sesuai perjanjian perdagangan bebas (FTA/EPA) yang berlaku, dan berlaku untuk satu kali pengiriman barang asal.

Contoh pengaturan resminya dapat dilihat pada **Pasal 41 Indonesia-Japan Economic Partnership Agreement (IJEPA)** — "Surat keterangan asal wajib diterbitkan oleh otoritas pemerintah yang berwenang dari Negara pengekspor berdasarkan permintaan yang diajukan secara tertulis oleh eksportir atau agen resminya... wajib mencantumkan data minimum yang ditentukan dalam Lampiran 3... berlaku untuk satu kali impor barang asal dari Negara yang mengekspor ke Negara yang mengimpor dan berlaku selama 12 bulan." Data minimum SKA (Annex 3 IJEPA) meliputi antara lain: nama/alamat/negara eksportir, nama/alamat/negara importir, uraian barang, kriteria asal barang, dan berat/kuantitas barang.

Secara umum (di luar konteks FTA tertentu), COO/SKA juga sering dijelaskan sebagai "surat keterangan asal barang untuk memperoleh fasilitas tarif" dalam kompilasi istilah dagang.
*Sumber: [S-6] (Pasal 41 & Annex 3 IJEPA — dokumen resmi Kemendag/Kemenkeu RI, tersedia di `corpus/regulasi/ijepa-coo/`), [S-9].*

### Letter of Credit (L/C) — **(KOMPILASI)**
Instruksi/jaminan pembayaran dari bank penerbit (biasanya bank importir) kepada eksportir, yang menjamin pembayaran akan dilakukan apabila eksportir dapat memenuhi syarat dan menyerahkan dokumen (invoice, B/L, packing list, dll.) sesuai yang disyaratkan dalam L/C. Jenis utama: **Sight LC** (pembayaran segera setelah dokumen sesuai/comply) dan **Usance LC** (pembayaran ditangguhkan/berjangka). Penggunaan L/C secara internasional diatur oleh **UCP 600** (Uniform Customs and Practice for Documentary Credits) yang diterbitkan ICC.
*Sumber: [S-8], [S-9].*

### Airway Bill (AWB) — **(KOMPILASI)**
Dokumen pengangkutan untuk kiriman lewat udara, fungsinya mirip B/L (tanda terima barang & kontrak pengangkutan) namun **bukan** dokumen kepemilikan barang (non-negotiable document of title) — berbeda dengan B/L laut yang bisa berfungsi sebagai document of title.
*Sumber: [S-8].*

### Delivery Order (DO) — **(KOMPILASI)**
Surat perintah pengeluaran barang dari pihak pelayaran/agen kepada gudang/terminal peti kemas, yang diperlukan penerima barang (consignee/importir) untuk mengambil fisik barang setelah menukarkan B/L asli.
*Sumber: [S-8].*

### Shipping Instruction (SI) — **(KOMPILASI)**
Dokumen instruksi pengapalan yang diajukan oleh shipper/eksportir kepada perusahaan pelayaran (carrier) atau freight forwarder, berisi detail pengiriman yang dibutuhkan untuk penerbitan B/L (nama shipper/consignee, uraian barang, pelabuhan muat/bongkar, dsb.).
*Sumber: [S-9].*

### Manifest (Manifes Kepal/Cargo Manifest) — **(KOMPILASI, konsisten dengan UU Kepabeanan)**
Daftar muatan lengkap suatu sarana pengangkut (kapal/pesawat), digunakan otoritas kepabeanan untuk mencocokkan barang yang dibawa alat angkut dengan pemberitahuan pabean (PEB/PIB) yang diajukan. Kewajiban penyerahan manifest oleh sarana pengangkut diatur dalam UU Kepabeanan (BAB IV, sebagaimana diubah UU 17/2006) sebagai bagian dari pengawasan lalu lintas barang.
*Sumber: [S-9], [S-4].*

---

## 2. Dokumen Pemberitahuan Pabean (Customs Declarations)

### Pemberitahuan Pabean Ekspor / PEB (Pemberitahuan Ekspor Barang) — **(RESMI)**
> "Pemberitahuan Pabean Ekspor adalah pemberitahuan pabean yang digunakan untuk memberitahukan Ekspor barang dalam bentuk dan syarat yang ditetapkan dalam Undang-Undang Kepabeanan." — dan — "Pemberitahuan Ekspor Barang yang selanjutnya disingkat dengan **PEB** adalah Pemberitahuan Pabean Ekspor yang digunakan untuk memberitahukan Ekspor barang umum dari dalam Daerah Pabean menuju luar Daerah Pabean."

PEB (kode formulir **BC 3.0**) wajib disampaikan eksportir (sendiri atau melalui PPJK) ke kantor pabean pemuatan, paling cepat 7 hari sebelum perkiraan tanggal ekspor dan paling lambat sebelum barang masuk Kawasan Pabean tempat pemuatan. Dokumen pelengkap pabean yang lazim dibutuhkan: invoice, packing list, bukti pembayaran bea keluar (jika terutang), dan dokumen instansi teknis untuk barang kena lartas. Landasan hukum utama: UU Kepabeanan (UU 10/1995 jo. UU 17/2006) → PMK 155/PMK.04/2022 tentang Ketentuan Kepabeanan di Bidang Ekspor → **Peraturan Dirjen Bea dan Cukai PER-9/BC/2023** tentang Tata Laksana Kepabeanan di Bidang Ekspor (Pasal 1 angka 5–6, Lampiran I berisi bentuk, isi, dan petunjuk teknis pengisian PEB).
*Sumber: [S-1] (definisi & tata laksana), [S-3] (PMK induk), [S-4] (dasar UU), berkas terkait di `corpus/regulasi/perdirjen-peb-pib/` dan `corpus/regulasi/peb-insw/`.*

### Pemberitahuan Pabean Impor / PIB (Pemberitahuan Impor Barang) — **(RESMI)**
> "Pemberitahuan Pabean Impor adalah pernyataan yang dibuat oleh orang dalam rangka melaksanakan Kewajiban Pabean Impor dalam bentuk dan syarat yang ditetapkan dalam Undang-Undang Kepabeanan."

**Pemberitahuan Impor Barang (PIB, kode formulir BC 2.0)** adalah salah satu dari 9 jenis Pemberitahuan Pabean Impor yang diatur — jenis yang dipakai untuk memberitahukan impor barang umum (di luar impor barang khusus, barang bawaan penumpang/Customs Declaration, barang untuk ditimbun di Tempat Penimbunan Berikat, penyelesaian KITE, dsb.). PIB memuat rincian jenis, jumlah, nilai pabean, klasifikasi HS Code, dan negara asal barang impor, serta menjadi dasar perhitungan bea masuk dan pajak dalam rangka impor (PPN Impor, PPh Pasal 22, dsb.) berdasarkan prinsip **self-assessment** importir. Landasan hukum: UU Kepabeanan → PMK 155/PMK.04/2008 tentang Pemberitahuan Pabean (Pasal 11) → **Peraturan Dirjen Bea dan Cukai P-22/BC/2009** tentang Pemberitahuan Pabean Impor (sudah diamendemen 6×, terakhir oleh PER-23/BC/2022 dan PER-5/BC/2025) — Lampiran I berisi bentuk, isi, dan petunjuk teknis pengisian PIB.
*Sumber: [S-2] (definisi & tata laksana resmi), [S-4] (dasar UU), berkas terkait di `corpus/regulasi/perdirjen-peb-pib/`.*

### Customs Declaration (BC 2.2) — **(RESMI)**
Pemberitahuan atas barang pribadi yang dibawa penumpang atau awak sarana pengangkut saat memasuki Daerah Pabean — berbeda dari PIB barang umum. Formatnya diatur pada Lampiran III P-22/BC/2009, terakhir diperbarui oleh PER-5/BC/2025.
*Sumber: [S-2].*

### Nota Pelayanan Ekspor (NPE) — **(RESMI)**
Dokumen yang diterbitkan pejabat bea dan cukai untuk mengawal barang ekspor yang telah diberitahukan (PEB) masuk ke Kawasan Pabean atau dimuat ke sarana pengangkut — tanda bahwa kewajiban pabean ekspor telah dipenuhi dan barang boleh dimuat.
*Sumber: [S-9]; konsisten dengan rangkuman prosedur ekspor Bea Cukai (`corpus/regulasi/kepabeanan-umum/prosedur-umum-ekspor-beacukai.md`).*

### SPPB (Surat Persetujuan Pengeluaran Barang) — **(KOMPILASI, konsisten dengan tata laksana impor)**
Persetujuan dari Bea Cukai untuk mengeluarkan barang impor dari Kawasan Pabean setelah seluruh kewajiban pabean (bea masuk, pajak impor, dan pemeriksaan) dipenuhi/dilunasi — dokumen setara NPE tetapi untuk sisi impor.
*Sumber: [S-9].*

---

## 3. Istilah Umum Kepabeanan (dari peraturan resmi)

Seluruh istilah pada bagian ini dikutip dari **Pasal 1 (Ketentuan Umum)** peraturan resmi yang tercantum di sumbernya masing-masing.

| Istilah | Definisi | Sumber |
|---|---|---|
| **Daerah Pabean** | Wilayah Republik Indonesia yang meliputi wilayah darat, perairan, dan ruang udara di atasnya, serta tempat-tempat tertentu di Zona Ekonomi Eksklusif dan landas kontinen yang di dalamnya berlaku UU Kepabeanan. | [S-1], [S-3] |
| **Kawasan Pabean** | Kawasan dengan batas-batas tertentu di pelabuhan laut, bandar udara, atau tempat lain yang ditetapkan untuk lalu lintas barang yang sepenuhnya berada di bawah pengawasan Direktorat Jenderal Bea dan Cukai. | [S-1], [S-5] |
| **Kantor Pabean** | Kantor dalam lingkungan Direktorat Jenderal Bea dan Cukai tempat dipenuhinya kewajiban pabean sesuai UU Kepabeanan. | [S-2], [S-5] |
| **Kewajiban Pabean** | Semua kegiatan di bidang kepabeanan yang wajib dilakukan untuk memenuhi ketentuan Undang-Undang Kepabeanan. | [S-5] |
| **Pemberitahuan Pabean** | Pernyataan yang dibuat oleh orang dalam rangka melaksanakan kewajiban pabean, dalam bentuk tulisan di atas formulir atau data elektronik. | [S-2], [S-5] |
| **Ekspor** | Kegiatan mengeluarkan barang dari Daerah Pabean. | [S-1], [S-4] |
| **Impor** | Kegiatan memasukkan barang ke dalam Daerah Pabean. | [S-4], [S-5] |
| **Bea Masuk** | Pungutan negara berdasarkan UU Kepabeanan yang dikenakan terhadap barang impor. | [S-4] |
| **Bea Keluar** | Pungutan negara berdasarkan UU Kepabeanan yang dikenakan terhadap barang ekspor (diperkenalkan oleh UU 17/2006; tujuan a.l. menjaga ketersediaan bahan baku domestik & kelestarian SDA). | [S-1], [S-4] |
| **Barang Ekspor** | Barang yang telah diajukan pemberitahuan pabean untuk diekspor dan telah mendapatkan nomor pendaftaran. | [S-1] |
| **Tempat Penimbunan Sementara (TPS)** | Bangunan dan/atau lapangan atau tempat lain yang disamakan dengan itu di Kawasan Pabean, untuk menimbun barang sementara menunggu pemuatan atau pengeluarannya. | [S-1], [S-4] |
| **Tempat Penimbunan Berikat (TPB)** | Bangunan, tempat, atau kawasan yang memenuhi persyaratan tertentu, digunakan untuk menimbun/mengolah/memamerkan/menyediakan barang untuk dijual dengan mendapatkan penangguhan bea masuk. | [S-1], [S-2] |
| **Pengusaha Pengurusan Jasa Kepabeanan (PPJK)** | Badan usaha yang melakukan kegiatan pengurusan pemenuhan kewajiban pabean untuk dan atas kuasa importir atau eksportir. | [S-1] |
| **Konsolidasi Barang Ekspor** | Kegiatan mengumpulkan Barang Ekspor yang diberitahukan dalam 2 atau lebih PEB, menggunakan 1 peti kemas, sebelum dimasukkan ke Kawasan Pabean untuk dimuat ke sarana pengangkut. | [S-1] |
| **Sistem Indonesia National Single Window (SINSW)** | Sistem elektronik yang mengintegrasikan sistem dan/atau informasi terkait proses penanganan dokumen kepabeanan, kekarantinaan, perizinan, kepelabuhanan/kebandarudaraan, dan dokumen lain terkait ekspor/impor, menjamin keamanan data serta memadukan alur informasi antar sistem internal secara otomatis. | [S-1] |
| **Pertukaran Data Elektronik (PDE)** | Alir informasi bisnis antar aplikasi dan organisasi secara elektronik yang terintegrasi menggunakan standar yang disepakati bersama. | [S-1] |
| **Audit Kepabeanan** | Kegiatan pemeriksaan laporan keuangan, buku, catatan, dan dokumen yang berkaitan dengan kegiatan kepabeanan dalam rangka penegakan UU Kepabeanan. | [S-5] |
| **Tarif** | Klasifikasi barang dan pembebanan bea masuk atau bea keluar atas barang tersebut. | [S-5] |

### HS Code (Harmonized System Code) — **(KOMPILASI, praktik internasional resmi WCO)**
Kode klasifikasi barang internasional (dikembangkan oleh World Customs Organization/WCO, diadopsi Indonesia melalui BTKI/Buku Tarif Kepabeanan Indonesia) yang menentukan pos tarif bea masuk/bea keluar dan berbagai ketentuan larangan/pembatasan (lartas) atas suatu jenis barang.
*Sumber: [S-8]; lihat juga PMK 26/PMK.010/2022 tentang BTKI di `corpus/regulasi/hs-code-kopi/` dan `corpus/regulasi/koreksi-btki-tarif/`.*

### Larangan dan/atau Pembatasan (Lartas) — **(KOMPILASI, konsisten dengan Permendag)**
Ketentuan yang mewajibkan izin, rekomendasi, atau sertifikasi khusus dari kementerian/lembaga teknis sebelum suatu barang boleh diekspor atau diimpor — diatur berjenjang dalam Peraturan Menteri Perdagangan (mis. Permendag 23/2023 untuk ekspor, Permendag 16/2025 untuk impor, beserta perubahan-perubahannya).
*Sumber: [S-8]; lihat berkas Permendag di `corpus/regulasi/permendag-ekspor-lartas/`, `corpus/regulasi/permendag-impor-lartas/`, `corpus/regulasi/klaster2-tata-niaga-ekspor/`, `corpus/regulasi/klaster3-tata-niaga-impor/`.*

---

## 4. Istilah Logistik & Pembayaran Tambahan (praktik dagang, bukan produk hukum RI)

| Istilah | Definisi | Sumber |
|---|---|---|
| **Eksportir** | Pihak (orang/badan hukum) yang menjual dan mengirim barang ke luar negeri, dan bertanggung jawab atas kewajiban pabean ekspor. | [S-8] |
| **Importir** | Pihak yang membeli dan mengimpor barang, bertanggung jawab atas kewajiban pabean impor. | [S-8] |
| **Shipper** | Pihak pengirim barang dari negara asal (umumnya = eksportir atau kuasanya). | [S-8] |
| **Consignee** | Pihak penerima barang yang tercantum pada dokumen pengiriman di negara tujuan. | [S-8] |
| **Freight Forwarder** | Perusahaan jasa pengurusan pengiriman barang internasional (konsolidasi kargo, pemesanan ruang kapal/pesawat, dokumentasi). | [S-8] |
| **FCL (Full Container Load)** | Pengiriman satu kontainer penuh milik satu pengirim. | [S-8] |
| **LCL (Less than Container Load)** | Pengiriman gabungan (konsolidasi) muatan beberapa pengirim dalam satu kontainer. | [S-8] |
| **Demurrage** | Biaya keterlambatan pengambilan/pengembalian kontainer di pelabuhan setelah batas waktu bebas biaya (free time) terlampaui. | [S-8] |
| **Transshipment** | Pemindahan barang antar-kapal/alat angkut di pelabuhan transit sebelum mencapai tujuan akhir. | [S-8] |
| **Telegraphic Transfer (TT)** | Metode pembayaran internasional lewat transfer bank (wire transfer) langsung antar rekening. | [S-8] |
| **UCP 600** | Uniform Customs and Practice for Documentary Credits — aturan internasional standar yang mengatur penggunaan Letter of Credit, diterbitkan oleh ICC. | [S-8] |

---

## Sumber Rujukan

| # | Sumber | Domain / Penerbit | Resmi? |
|---|---|---|---|
| S-1 | Peraturan Dirjen Bea dan Cukai **PER-9/BC/2023** tentang Tata Laksana Kepabeanan di Bidang Ekspor, Pasal 1 & Lampiran I. `https://jdih.kemenkeu.go.id/api/download/190002a9-b48e-4666-8190-8731bbef4b29/PER_9_BC_2023.pdf` (berkas lokal: `corpus/regulasi/perdirjen-peb-pib/PER-9-BC-2023.pdf`) | jdih.kemenkeu.go.id — Ditjen Bea dan Cukai, Kemenkeu RI | Ya (resmi) |
| S-2 | Peraturan Dirjen Bea dan Cukai **P-22/BC/2009** tentang Pemberitahuan Pabean Impor, Pasal 1–2 & Lampiran I. `https://jdih.kemenkeu.go.id/api/download/ae838880-3234-43d4-9476-e3e73d78ef2e/P-22-BC-2009-PEMBERITAHUAN-PABEAN-IMPOR.pdf` (berkas lokal: `corpus/regulasi/perdirjen-peb-pib/P-22-BC-2009.pdf`) | jdih.kemenkeu.go.id — Ditjen Bea dan Cukai, Kemenkeu RI | Ya (resmi) |
| S-3 | PMK **155/PMK.04/2022** tentang Ketentuan Kepabeanan di Bidang Ekspor, Pasal 1. (berkas lokal: `corpus/regulasi/kepabeanan-umum/pmk-155-pmk04-2022-ketentuan-kepabeanan-ekspor.pdf`) | jdih.kemenkeu.go.id — Kementerian Keuangan RI | Ya (resmi) |
| S-4 | UU No. **17 Tahun 2006** tentang Perubahan atas UU No. 10 Tahun 1995 tentang Kepabeanan. `https://peraturan.bpk.go.id/Download/29824/UU%20Nomor%2017%20Tahun%202006.pdf` (berkas lokal: `corpus/regulasi/kepabeanan-umum/uu-17-2006-perubahan-uu-10-1995-kepabeanan.pdf`, ringkasan di `corpus/regulasi/uu-dasar/uu-17-2006-kepabeanan.md`) | peraturan.bpk.go.id — Sekretariat Jenderal BPK RI (JDIH) | Ya (resmi) |
| S-5 | "Istilah Penting dalam Kepabeanan", Kantor Wilayah DJBC Aceh, dipublikasikan 22 Agustus 2025. `https://kanwilaceh.beacukai.go.id/mandatory/kepabeanan` | kanwilaceh.beacukai.go.id — Ditjen Bea dan Cukai, Kemenkeu RI | Ya (resmi) |
| S-6 | Persetujuan antara Republik Indonesia dan Jepang mengenai Suatu Kemitraan Ekonomi (IJEPA), Pasal 41 "Surat Keterangan Asal" & Annex 3 "Minimum Data Requirement for Certificate of Origin". Naskah resmi tersedia di `corpus/regulasi/ijepa-coo/ijepa-legal-text-trade-in-goods.pdf`, `ijepa-basic-agreement.pdf`, `ijepa-annex-3-min-data-coo.pdf`, `ijepa-operational-procedures.pdf` | Kementerian Perdagangan RI / Kementerian Luar Negeri RI (perjanjian internasional yang diratifikasi) | Ya (resmi) |
| S-7 | "Apa Itu Bill of Lading: Fungsi, Jenis, dan Cara Membuatnya". `https://forwarder.ai/blog/cara-membuat-bill-of-lading/` (mengutip Pasal 506 KUHD) | forwarder.ai — platform edukasi logistik swasta | Tidak — kompilasi kredibel |
| S-8 | "Kamus Istilah Impor Ekspor & Kepabeanan Lengkap A–Z". `https://imporekspor360.com/kamus-istilah-impor-ekspor-kepabeanan/` | imporekspor360.com — situs edukasi ekspor-impor swasta | Tidak — kompilasi kredibel |
| S-9 | "Kamus Shipping Indonesia". `https://www.pengadaanbarang.co.id/p/kamus-shipping-indonesia.html` | pengadaanbarang.co.id — media/knowledge hub pengadaan & logistik swasta | Tidak — kompilasi kredibel |

---

## Gap / Keterbatasan Riset

1. **Tidak ditemukan satu halaman glosarium tunggal resmi** di domain `beacukai.go.id` atau `insw.go.id` yang mendefinisikan seluruh istilah dokumen dagang non-hukum (B/L, Commercial Invoice, Packing List, L/C) — istilah-istilah ini berasal dari praktik dagang internasional/hukum dagang umum (KUHD, UCP 600 ICC), bukan produk regulasi kepabeanan RI, sehingga definisinya dikompilasi dari sumber edukasi kredibel [S-7], [S-8], [S-9] alih-alih satu sumber resmi tunggal.
2. Percobaan mengakses halaman resmi Bea Cukai `beacukai.go.id/arsip/pab/fta.html` dan `beacukai.go.id/berita/mudah-dan-fleksibel-simak-aturan-terbaru-penyerahan-dokumen-ska-impor.html` untuk definisi SKA sisi impor menghasilkan **404 (halaman tidak tersedia)** saat sesi riset ini — kemungkinan URL sudah berubah/dipindah. Definisi SKA pada dokumen ini karenanya digrounding pada Pasal 41 IJEPA [S-6] sebagai contoh konkret perjanjian dagang yang sudah diverifikasi ada di corpus, bukan pada regulasi SKA umum lintas-FTA (mis. Permendag tentang Instansi Penerbit SKA/IPSKA) yang belum diunduh dalam sesi ini.
3. **PIB** tidak memiliki definisi tersendiri yang eksplisit di luar payung "Pemberitahuan Pabean Impor" pada P-22/BC/2009 — definisi PIB pada dokumen ini disusun dengan menurunkan definisi umum tersebut ke jenis spesifik "Pemberitahuan Impor Barang" (Pasal 2 huruf a jo. Lampiran I), sejajar dengan cara PEB didefinisikan eksplisit pada PER-9/BC/2023.
4. Definisi resmi **Letter of Credit** dari regulator keuangan Indonesia (OJK/Bank Indonesia) belum ditelusuri dalam sesi ini — definisi yang dipakai berasal dari kompilasi edukasi ekspor-impor [S-8], [S-9], bukan dari sumber otoritas moneter/perbankan RI.
