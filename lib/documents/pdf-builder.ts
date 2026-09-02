import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib'

const PAGE_WIDTH = 595.28 // A4
const PAGE_HEIGHT = 841.89
const MARGIN = 48

export class PdfBuilder {
  private doc!: PDFDocument
  private page!: PDFPage
  private font!: PDFFont
  private bold!: PDFFont
  private y = 0

  static async create() {
    const b = new PdfBuilder()
    b.doc = await PDFDocument.create()
    b.font = await b.doc.embedFont(StandardFonts.Helvetica)
    b.bold = await b.doc.embedFont(StandardFonts.HelveticaBold)
    b.addPage()
    return b
  }

  private addPage() {
    this.page = this.doc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
    this.y = PAGE_HEIGHT - MARGIN
  }

  private ensureSpace(need: number) {
    if (this.y - need < MARGIN) this.addPage()
  }

  header(title: string, subtitle: string) {
    this.page.drawText('ATOMIC EXPORT', {
      x: MARGIN,
      y: this.y,
      size: 9,
      font: this.bold,
      color: rgb(0, 0.32, 1),
    })
    this.page.drawText('Dihasilkan otomatis dari data Atomic Steps UMKM', {
      x: PAGE_WIDTH - MARGIN - 220,
      y: this.y,
      size: 8,
      font: this.font,
      color: rgb(0.45, 0.45, 0.45),
    })
    this.y -= 22
    this.page.drawText(title, { x: MARGIN, y: this.y, size: 16, font: this.bold })
    this.y -= 16
    this.page.drawText(subtitle, { x: MARGIN, y: this.y, size: 9, font: this.font, color: rgb(0.4, 0.4, 0.4) })
    this.y -= 10
    this.hr()
    this.y -= 14
  }

  hr() {
    this.page.drawLine({
      start: { x: MARGIN, y: this.y },
      end: { x: PAGE_WIDTH - MARGIN, y: this.y },
      thickness: 0.75,
      color: rgb(0.85, 0.85, 0.85),
    })
  }

  sectionTitle(text: string) {
    this.ensureSpace(28)
    this.y -= 4
    this.page.drawText(text.toUpperCase(), { x: MARGIN, y: this.y, size: 10, font: this.bold, color: rgb(0, 0.32, 1) })
    this.y -= 14
  }

  kv(pairs: [string, string][], colWidth = 250) {
    const cols = Math.floor((PAGE_WIDTH - 2 * MARGIN) / colWidth)
    let i = 0
    while (i < pairs.length) {
      this.ensureSpace(16)
      for (let c = 0; c < cols && i < pairs.length; c++, i++) {
        const [k, v] = pairs[i]
        const x = MARGIN + c * colWidth
        this.page.drawText(`${k}`, { x, y: this.y, size: 8.5, font: this.font, color: rgb(0.45, 0.45, 0.45) })
        this.page.drawText(`${v || '-'}`, { x, y: this.y - 11, size: 10, font: this.bold })
      }
      this.y -= 30
    }
  }

  paragraph(text: string, size = 9.5) {
    const maxWidth = PAGE_WIDTH - 2 * MARGIN
    const words = text.split(' ')
    let line = ''
    const lines: string[] = []
    for (const w of words) {
      const test = line ? `${line} ${w}` : w
      if (this.font.widthOfTextAtSize(test, size) > maxWidth) {
        lines.push(line)
        line = w
      } else {
        line = test
      }
    }
    if (line) lines.push(line)
    for (const l of lines) {
      this.ensureSpace(14)
      this.page.drawText(l, { x: MARGIN, y: this.y, size, font: this.font })
      this.y -= 13
    }
  }

  table(headers: string[], rows: string[][], widths: number[]) {
    const startX = MARGIN
    this.ensureSpace(20)
    let x = startX
    headers.forEach((h, i) => {
      this.page.drawText(h, { x, y: this.y, size: 8.5, font: this.bold, color: rgb(0.45, 0.45, 0.45) })
      x += widths[i]
    })
    this.y -= 6
    this.hr()
    this.y -= 12
    for (const row of rows) {
      this.ensureSpace(16)
      x = startX
      row.forEach((cell, i) => {
        this.page.drawText(cell, { x, y: this.y, size: 9.5, font: this.font })
        x += widths[i]
      })
      this.y -= 16
    }
  }

  spacer(n = 10) {
    this.y -= n
  }

  disclaimer(text: string) {
    this.ensureSpace(40)
    this.y -= 8
    this.hr()
    this.y -= 12
    this.page.drawText('CATATAN', { x: MARGIN, y: this.y, size: 8, font: this.bold, color: rgb(0.8, 0.5, 0) })
    this.y -= 11
    const prevFontSize = 8
    const maxWidth = PAGE_WIDTH - 2 * MARGIN
    const words = text.split(' ')
    let line = ''
    const lines: string[] = []
    for (const w of words) {
      const test = line ? `${line} ${w}` : w
      if (this.font.widthOfTextAtSize(test, prevFontSize) > maxWidth) {
        lines.push(line)
        line = w
      } else line = test
    }
    if (line) lines.push(line)
    for (const l of lines) {
      this.ensureSpace(12)
      this.page.drawText(l, { x: MARGIN, y: this.y, size: prevFontSize, font: this.font, color: rgb(0.5, 0.5, 0.5) })
      this.y -= 10
    }
  }

  async bytes() {
    return this.doc.save()
  }
}
