export type ExportDocInput = {
  exporterName: string
  exporterAddress: string
  exporterNib: string
  buyerName: string
  buyerAddress: string
  buyerCountry: string
  productName: string
  hsCode: string
  quantity: string
  unit: string
  unitPrice: string
  currency: string
  incoterm: string
  portOfLoading: string
  portOfDestination: string
  vesselOrFlight: string
  invoiceNumber: string
  invoiceDate: string
  netWeightKg: string
  grossWeightKg: string
  packageCount: string
  packageType: string
}

export const EMPTY_EXPORT_DOC_INPUT: ExportDocInput = {
  exporterName: '',
  exporterAddress: '',
  exporterNib: '',
  buyerName: '',
  buyerAddress: '',
  buyerCountry: '',
  productName: '',
  hsCode: '1702.90',
  quantity: '',
  unit: 'kg',
  unitPrice: '',
  currency: 'USD',
  incoterm: 'FOB',
  portOfLoading: '',
  portOfDestination: '',
  vesselOrFlight: '',
  invoiceNumber: '',
  invoiceDate: '',
  netWeightKg: '',
  grossWeightKg: '',
  packageCount: '',
  packageType: 'Karton',
}

export type DocType =
  | 'commercial-invoice'
  | 'packing-list'
  | 'coo-ijepa'
  | 'peb-draft'
  | 'hs-classification'
  | 'health-certificate-request'

export const DOC_TYPES: { type: DocType; label: string; filename: string }[] = [
  { type: 'commercial-invoice', label: 'Commercial Invoice', filename: 'commercial-invoice.pdf' },
  { type: 'packing-list', label: 'Packing List', filename: 'packing-list.pdf' },
  { type: 'coo-ijepa', label: 'Certificate of Origin (Form IJEPA)', filename: 'coo-ijepa-draft.pdf' },
  { type: 'peb-draft', label: 'PEB, Pemberitahuan Ekspor Barang', filename: 'peb-draft.pdf' },
  { type: 'hs-classification', label: 'Klasifikasi HS Code', filename: 'hs-classification.pdf' },
  {
    type: 'health-certificate-request',
    label: 'Formulir Pengajuan Health Certificate',
    filename: 'health-certificate-request.pdf',
  },
]
