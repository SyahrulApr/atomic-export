import { PdfBuilder } from './pdf-builder'
import type { DocType, ExportDocInput } from './types'

function totalValue(input: ExportDocInput) {
  const qty = parseFloat(input.quantity || '0')
  const price = parseFloat(input.unitPrice || '0')
  if (!qty || !price) return '-'
  return `${input.currency} ${(qty * price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

async function commercialInvoice(input: ExportDocInput) {
  const b = await PdfBuilder.create()
  b.header('Commercial Invoice', `No. ${input.invoiceNumber || '-'}  ·  Tanggal ${input.invoiceDate || '-'}`)

  b.sectionTitle('Penjual (Exporter)')
  b.kv([
    ['Nama', input.exporterName],
    ['NIB', input.exporterNib],
  ])
  b.paragraph(input.exporterAddress)
  b.spacer(6)

  b.sectionTitle('Pembeli (Buyer)')
  b.kv([
    ['Nama', input.buyerName],
    ['Negara', input.buyerCountry],
  ])
  b.paragraph(input.buyerAddress)
  b.spacer(10)

  b.sectionTitle('Rincian Barang')
  b.table(
    ['Deskripsi', 'HS Code', 'Qty', 'Harga Satuan', 'Total'],
    [
      [
        input.productName || '-',
        input.hsCode,
        `${input.quantity} ${input.unit}`,
        `${input.currency} ${input.unitPrice || '-'}`,
        totalValue(input),
      ],
    ],
    [180, 80, 90, 100, 90],
  )
  b.spacer(10)

  b.sectionTitle('Syarat Pengiriman')
  b.kv([
    ['Incoterm', input.incoterm],
    ['Pelabuhan Muat', input.portOfLoading],
    ['Pelabuhan Tujuan', input.portOfDestination],
    ['Sarana Angkut', input.vesselOrFlight],
  ])

  b.disclaimer(
    'Dokumen ini disusun otomatis dari data yang diinput UMKM di Atomic Export. Periksa kembali seluruh isian sebelum digunakan untuk keperluan kepabeanan atau pembayaran internasional.',
  )
  return b.bytes()
}

async function packingList(input: ExportDocInput) {
  const b = await PdfBuilder.create()
  b.header('Packing List', `Terkait Invoice No. ${input.invoiceNumber || '-'}`)

  b.sectionTitle('Pengirim & Penerima')
  b.kv([
    ['Pengirim', input.exporterName],
    ['Penerima', input.buyerName],
    ['Negara Tujuan', input.buyerCountry],
  ])
  b.spacer(10)

  b.sectionTitle('Rincian Kemasan')
  b.table(
    ['Deskripsi', 'Jumlah Kemasan', 'Berat Bersih', 'Berat Kotor'],
    [
      [
        input.productName || '-',
        `${input.packageCount || '-'} ${input.packageType}`,
        `${input.netWeightKg || '-'} kg`,
        `${input.grossWeightKg || '-'} kg`,
      ],
    ],
    [200, 130, 100, 100],
  )
  b.spacer(10)

  b.sectionTitle('Pengiriman')
  b.kv([
    ['Pelabuhan Muat', input.portOfLoading],
    ['Pelabuhan Tujuan', input.portOfDestination],
    ['Sarana Angkut', input.vesselOrFlight],
    ['Incoterm', input.incoterm],
  ])

  b.disclaimer(
    'Berat dan jumlah kemasan wajib dicocokkan dengan kondisi fisik barang sebelum muat. Dokumen ini adalah draf yang disusun otomatis dari data input UMKM.',
  )
  return b.bytes()
}

async function cooIjepa(input: ExportDocInput) {
  const b = await PdfBuilder.create()
  b.header('Certificate of Origin — Form IJEPA (DRAF)', 'Indonesia-Japan Economic Partnership Agreement')

  b.sectionTitle('1. Eksportir')
  b.paragraph(`${input.exporterName} — ${input.exporterAddress}`)
  b.spacer(6)

  b.sectionTitle('2. Importir / Penerima')
  b.paragraph(`${input.buyerName} — ${input.buyerAddress}, ${input.buyerCountry}`)
  b.spacer(6)

  b.sectionTitle('3. Rincian Barang')
  b.table(
    ['Deskripsi', 'HS Code', 'Qty', 'Invoice No.'],
    [[input.productName || '-', input.hsCode, `${input.quantity} ${input.unit}`, input.invoiceNumber || '-']],
    [180, 90, 100, 120],
  )
  b.spacer(6)

  b.sectionTitle('4. Kriteria Asal Barang')
  b.paragraph(
    'Wholly Obtained (WO) — barang diproduksi/diperoleh sepenuhnya di wilayah Indonesia, sesuai skema preferensi tarif IJEPA untuk HS Code di atas.',
  )

  b.disclaimer(
    'Form ini adalah DRAF pengajuan yang disusun otomatis oleh Atomic Export. Certificate of Origin resmi hanya sah setelah diverifikasi dan diterbitkan oleh Instansi Penerbit Surat Keterangan Asal (IPSKA) yang berwenang, contoh: Dinas Perdagangan / Kemendag.',
  )
  return b.bytes()
}

async function pebDraft(input: ExportDocInput) {
  const b = await PdfBuilder.create()
  b.header('PEB — Pemberitahuan Ekspor Barang (DRAF)', 'Draf pengajuan untuk sistem CEISA Bea Cukai')

  b.sectionTitle('Eksportir')
  b.kv([
    ['Nama', input.exporterName],
    ['NIB', input.exporterNib],
  ])
  b.spacer(6)

  b.sectionTitle('Tujuan Ekspor')
  b.kv([
    ['Negara Tujuan', input.buyerCountry],
    ['Pelabuhan Muat', input.portOfLoading],
    ['Pelabuhan Tujuan', input.portOfDestination],
    ['Sarana Angkut', input.vesselOrFlight],
  ])
  b.spacer(6)

  b.sectionTitle('Barang Ekspor')
  b.table(
    ['Uraian Barang', 'HS Code', 'Jumlah', 'Nilai FOB'],
    [[input.productName || '-', input.hsCode, `${input.quantity} ${input.unit}`, totalValue(input)]],
    [180, 90, 100, 120],
  )

  b.disclaimer(
    'PEB resmi wajib diajukan dan disahkan melalui sistem CEISA Direktorat Jenderal Bea dan Cukai. Draf ini mempercepat pengisian data, bukan pengganti pengajuan resmi.',
  )
  return b.bytes()
}

async function hsClassification(input: ExportDocInput) {
  const b = await PdfBuilder.create()
  b.header('Klasifikasi HS Code', 'Referensi tarif dan skema preferensi')

  b.sectionTitle('Produk')
  b.kv([
    ['Nama Produk', input.productName],
    ['HS Code', input.hsCode],
  ])
  b.spacer(8)

  b.sectionTitle('Dasar Klasifikasi')
  b.paragraph(
    input.hsCode === '1702.90'
      ? 'HS 1702.90 — Gula lainnya termasuk gula invert dan campuran gula/molase perisa atau pewarna, tidak termasuk laktosa, glukosa, maltodekstrin. Gula semut/gula kelapa dari nira kelapa dikelompokkan pada pos tarif ini.'
      : `Kode HS ${input.hsCode} dipilih berdasarkan deskripsi produk yang diinput. Verifikasi silang dengan Buku Tarif Kepabeanan Indonesia (BTKI) tetap wajib dilakukan.`,
  )
  b.spacer(8)

  b.sectionTitle('Skema Preferensi Tarif')
  b.paragraph(
    'Di bawah skema IJEPA (Indonesia-Japan Economic Partnership Agreement), produk dengan kriteria asal Wholly Obtained berpotensi memperoleh tarif preferensial di pasar Jepang dibanding tarif MFN standar.',
  )

  b.disclaimer(
    'Klasifikasi ini adalah referensi awal berbasis deskripsi produk yang diinput UMKM. Penetapan HS Code final tetap menjadi kewenangan Direktorat Jenderal Bea dan Cukai melalui prosedur penetapan klasifikasi.',
  )
  return b.bytes()
}

async function healthCertificateRequest(input: ExportDocInput) {
  const b = await PdfBuilder.create()
  b.header('Formulir Pengajuan Health Certificate', 'Draf pengajuan sertifikat kesehatan produk pangan ekspor')

  b.sectionTitle('Pemohon')
  b.kv([
    ['Nama Perusahaan / UMKM', input.exporterName],
    ['NIB', input.exporterNib],
  ])
  b.paragraph(input.exporterAddress)
  b.spacer(8)

  b.sectionTitle('Produk yang Diajukan')
  b.kv([
    ['Nama Produk', input.productName],
    ['HS Code', input.hsCode],
    ['Jumlah', `${input.quantity} ${input.unit}`],
  ])
  b.spacer(8)

  b.sectionTitle('Tujuan Ekspor')
  b.kv([
    ['Negara Tujuan', input.buyerCountry],
    ['Pelabuhan Muat', input.portOfLoading],
  ])

  b.disclaimer(
    'Health Certificate resmi hanya diterbitkan setelah pemeriksaan laboratorium/lapangan oleh otoritas berwenang (Karantina Indonesia / instansi terkait produk pangan). Formulir ini mempersiapkan data pengajuan, bukan sertifikat itu sendiri.',
  )
  return b.bytes()
}

export async function generateDocument(type: DocType, input: ExportDocInput): Promise<Uint8Array> {
  switch (type) {
    case 'commercial-invoice':
      return commercialInvoice(input)
    case 'packing-list':
      return packingList(input)
    case 'coo-ijepa':
      return cooIjepa(input)
    case 'peb-draft':
      return pebDraft(input)
    case 'hs-classification':
      return hsClassification(input)
    case 'health-certificate-request':
      return healthCertificateRequest(input)
  }
}
