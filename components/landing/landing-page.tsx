'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Atom,
  Bot,
  FileCheck2,
  Gauge,
  ScanLine,
  Handshake,
  Container,
  Landmark,
  Sparkles,
  Menu,
  Boxes,
  ShieldCheck,
  TrendingUp,
  Globe2,
  Layers,
} from 'lucide-react'
import { SectionLabel } from './section-label'

const easeOut = [0.16, 1, 0.3, 1] as const

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const viewport = { once: true, amount: 0.15, margin: '-60px' }

/* ----------------------------------------------------------------- NAVBAR */
function Navbar() {
  const links = [
    { label: 'Masalah', href: '#masalah' },
    { label: 'Alur Kerja', href: '#alur' },
    { label: 'Fitur', href: '#fitur' },
    { label: 'Dampak', href: '#dampak' },
  ]
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand-diagonal shadow-accent">
            <Atom className="h-5 w-5 text-white" strokeWidth={2.2} />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Atomic<span className="gradient-text">Export</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="group hidden items-center gap-2 rounded-xl gradient-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-accent-lg hover:brightness-110 sm:inline-flex"
          >
            Buka Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-border md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------- HERO */
function HeroGraphic() {
  const cards = [
    {
      icon: Gauge,
      title: 'Readiness Score',
      value: '82 / 100',
      sub: 'Siap ekspor',
      pos: 'left-0 top-6',
      delay: 0,
    },
    {
      icon: ScanLine,
      title: 'QC Hybrid',
      value: 'Zero-Defect',
      sub: 'EfficientNet-B4',
      pos: 'right-0 top-28',
      delay: 1.2,
    },
    {
      icon: Container,
      title: 'LCL ke FCL',
      value: '−30% biaya',
      sub: 'Konsolidasi',
      pos: 'left-6 bottom-6',
      delay: 0.6,
    },
  ]
  return (
    <div className="relative hidden h-[440px] w-full lg:block">
      {/* radial glow */}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
      {/* rotating dashed ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
      />
      <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15" />
      {/* center node */}
      <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl gradient-brand-diagonal shadow-accent-lg">
        <Atom className="h-12 w-12 text-white" strokeWidth={1.6} />
      </div>
      {/* dot grid */}
      <div className="absolute right-10 top-2 grid grid-cols-3 gap-2.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/40" />
        ))}
      </div>
      {/* floating cards */}
      {cards.map((c) => (
        <motion.div
          key={c.title}
          className={`absolute ${c.pos} w-44 rounded-2xl border border-border bg-card p-4 shadow-xl`}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4.5,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: c.delay,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10">
              <c.icon className="h-4 w-4 text-primary" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {c.title}
            </span>
          </div>
          <div className="text-lg font-semibold tracking-tight">{c.value}</div>
          <div className="text-xs text-muted-foreground">{c.sub}</div>
        </motion.div>
      ))}
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute -right-40 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-[150px]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel>AI Export Operating System</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="mt-6 font-display text-[2.75rem] leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
          >
            Infrastruktur Ekspor Mandiri untuk{' '}
            <span className="relative inline-block">
              <span className="gradient-text">UMKM Indonesia</span>
              <span className="absolute -bottom-1 left-0 h-3 w-full rounded-sm bg-gradient-to-r from-primary/15 to-primary/5" />
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Atomic Export memecah birokrasi ekspor menjadi tugas mikro harian
            terpandu AI. Dari skor kesiapan, otomasi dokumen, QC computer
            vision, hingga konsolidasi logistik LCL ke FCL, UMKM ekspor atas nama
            sendiri.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/dashboard"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl gradient-brand px-7 text-base font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-accent-lg hover:brightness-110 active:scale-[0.98]"
            >
              Coba Dashboard Interaktif
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#alur"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 text-base font-medium transition-all duration-200 hover:border-primary/30 hover:shadow-md"
            >
              Lihat Alur Kerja
            </a>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-success" />
              Pilot aktif
            </span>
            <span className="text-border">•</span>
            <span>Gula Semut Kelapa Banyumas ke Jepang</span>
            <span className="text-border">•</span>
            <span className="font-mono text-xs">Tim P1438</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
        >
          <HeroGraphic />
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- PARTNERS */
function Partners() {
  const items = [
    'Koperasi Merah Putih',
    'PLUT UMKM',
    'Bea Cukai',
    'Kemendag',
    'Sapa UMKM',
    'Freight Forwarder',
  ]
  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Orkestrasi ekosistem fisik existing, Asset Light Aggregator
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map((i) => (
            <span
              key={i}
              className="text-sm font-semibold text-muted-foreground/70"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- PROBLEM */
function Problem() {
  const problems = [
    {
      icon: Layers,
      title: 'Friction Kognitif & Administratif',
      desc: 'Prosedur ekspor non-linear & dokumen manual menciptakan execution gap. 91,3% UMKM produsen ekspor masih bergantung perantara, hanya 8,7% ekspor mandiri.',
    },
    {
      icon: TrendingUp,
      title: 'Institutional & Margin Cannibalization',
      desc: 'Agregator tradisional ekspor atas nama sendiri, apapun modelnya, identitas & rekam jejak UMKM hilang dari dokumen ekspor. Tetap invisible, tetap unbankable.',
    },
    {
      icon: Container,
      title: 'Paradoks Logistik',
      desc: 'Biaya logistik volume kecil mematikan daya saing. Konsolidasi LCL ke FCL menuntut mutu terstandar tiap UMKM agar dokumen & reputasi kolektif tak menahan kontainer.',
    },
    {
      icon: Globe2,
      title: 'Market Mismatch',
      desc: 'Produksi tanpa market intelligence membuat spek produk tak cocok permintaan global, menutup akses verified buyer.',
    },
  ]
  return (
    <section id="masalah" className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel>Akar Masalah</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-6 font-display text-4xl leading-[1.15] tracking-tight md:text-5xl"
          >
            UMKM menyumbang 61% PDB, tapi ekspor tertahan di{' '}
            <span className="gradient-text">15,5%</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-lg text-muted-foreground"
          >
            Empat hambatan struktural menjebak 117 juta tenaga kerja UMKM dalam
            stagnasi pendapatan di tengah undisbursed loan Rp2.527 triliun.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {problems.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- FLOW */
function Flow() {
  const stages = [
    {
      n: '01',
      title: 'Frictionless Execution',
      icon: Atom,
      desc: 'Birokrasi kompleks dipecah jadi tugas mikro interaktif (<15 menit) dengan gamifikasi.',
    },
    {
      n: '02',
      title: 'Autonomous Compliance',
      icon: FileCheck2,
      desc: 'RAG AI menyusun & mengotomasi dokumen ekspor real-time berstandar Zero-Defect.',
    },
    {
      n: '03',
      title: 'Integrated Education',
      icon: Sparkles,
      desc: 'Modul learning-by-doing terintegrasi alur kerja & sinkron tren buyer global.',
    },
    {
      n: '04',
      title: 'Community Building',
      icon: Handshake,
      desc: 'Konsolidasi UMKM ke jaringan Koperasi Merah Putih, bendera ekspor kolektif.',
    },
    {
      n: '05',
      title: 'Algorithmic Gatekeeper',
      icon: ScanLine,
      desc: 'Verifikasi mutu via Computer Vision (QC Hybrid), mitigasi penolakan kargo massal.',
    },
    {
      n: '06',
      title: 'Network Aggregation',
      icon: Container,
      desc: 'Orkestrasi LCL ke FCL & matchmaking P2P2B langsung ke pembeli, margin & identitas utuh.',
    },
  ]
  return (
    <section id="alur" className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-[150px]" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeInUp} className="flex justify-center">
            <SectionLabel>Flywheel of Trust &amp; Scale</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-6 font-display text-4xl leading-[1.15] tracking-tight md:text-5xl"
          >
            Enam tahap operasional{' '}
            <span className="gradient-text">end-to-end</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-lg text-muted-foreground"
          >
            Setiap siklus ekspor yang berhasil memutar tiga pusat pertumbuhan:
            Self-Evolutionary AI, Verified Social Moat, dan Digital Trust
            Capital.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {stages.map((s) => (
            <motion.div
              key={s.n}
              variants={fadeInUp}
              className="group relative rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl gradient-brand-diagonal text-white shadow-accent">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-4xl text-border transition-colors group-hover:text-primary/20">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- FEATURES */
function Features() {
  const features = [
    {
      icon: Atom,
      title: 'Atomic Engine',
      desc: 'Birokrasi non-linear jadi tugas mikro harian <15 menit berbasis AI, eliminasi execution gap psikologis.',
      tag: 'Tahap 1',
    },
    {
      icon: Bot,
      title: 'RAG Chatbot',
      desc: 'AI Copilot menjawab regulasi ekspor dari korpus dokumen kepabeanan terkurasi, lengkap dengan sitasi sumber resmi.',
      tag: 'Semantic Retrieval',
    },
    {
      icon: Gauge,
      title: 'Export Readiness Score',
      desc: 'Rubrik berbobot transparan pada 4 dimensi: legalitas, spek produk, kapasitas, rekam jejak Atomic Steps.',
      tag: 'Behavioral Scoring',
    },
    {
      icon: FileCheck2,
      title: 'Single-Entry Doc Automation',
      desc: 'Satu input menghasilkan Commercial Invoice, Packing List, Certificate of Origin & klasifikasi HS Code otomatis.',
      tag: 'Multi-Output',
    },
    {
      icon: ScanLine,
      title: 'QC Hybrid Computer Vision',
      desc: 'EfficientNet-B4 + surveyor fisik memverifikasi mutu per-UMKM sebelum kirim, rejection rate tiap eksportir turun, reputasi platform terjaga.',
      tag: 'SOTA Vision',
    },
    {
      icon: Handshake,
      title: 'P2P2B Matchmaking',
      desc: 'Cosine similarity: tiap UMKM peer tersambung ke buyer-nya sendiri & berbagi logistik. PEB, buyer, dan margin tetap atas nama masing-masing.',
      tag: 'Groupage',
    },
    {
      icon: Container,
      title: 'Logistik LCL ke FCL',
      desc: 'Penggabungan kargo kecil jadi kontainer penuh via gudang Koperasi & konsolidator disetujui Bea Cukai (PKBE), tiap UMKM tetap punya PEB sendiri.',
      tag: 'Asset Light',
    },
    {
      icon: Landmark,
      title: 'Digital Export Track Record',
      desc: 'Setiap transaksi atas nama UMKM jadi credit identity riil, mengubah unbankable jadi layak pembiayaan.',
      tag: 'Bankability',
    },
  ]
  return (
    <section id="fitur" className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel>Hybrid Intelligence Architecture</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-6 font-display text-4xl leading-[1.15] tracking-tight md:text-5xl"
          >
            Empat lapis teknologi, satu{' '}
            <span className="gradient-text">sistem operasi ekspor</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-xl gradient-brand-diagonal text-white shadow-accent transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-6 w-6" />
                </span>
                <span className="mt-5 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                  {f.tag}
                </span>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- IMPACT STATS */
function Impact() {
  const stats = [
    { value: '61%', label: 'Kontribusi UMKM terhadap PDB nasional' },
    { value: '91,3%', label: 'UMKM produsen ekspor masih bergantung perantara' },
    { value: '−30%', label: 'Potensi penurunan biaya logistik per unit' },
    { value: 'Rp2.527T', label: 'Undisbursed loan yang bisa terbuka' },
  ]
  return (
    <section
      id="dampak"
      className="relative overflow-hidden bg-foreground py-28 text-background md:py-36"
    >
      <div className="absolute inset-0 dot-pattern opacity-100" />
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/20 blur-[150px]" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeInUp} className="flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/80">
                Impact Scale
              </span>
            </div>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-6 font-display text-4xl leading-[1.15] tracking-tight md:text-5xl"
          >
            Dari unbankable menjadi{' '}
            <span className="gradient-text">layak modal</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-lg text-white/70"
          >
            Inklusi keuangan sebagai metrik puncak, di sanalah dampak
            terakumulasi.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeInUp} className="text-center">
              <div className="font-display text-4xl tracking-tight md:text-5xl">
                <span className="gradient-text">{s.value}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- ARCHITECTURE */
function Architecture() {
  const layers = [
    {
      icon: Globe2,
      title: 'Presentation',
      desc: 'PWA Next.js, cognitive simplicity untuk literasi digital rendah.',
    },
    {
      icon: Boxes,
      title: 'Backend',
      desc: 'API terintegrasi untuk RAG, dokumen, dan scoring.',
    },
    {
      icon: Sparkles,
      title: 'AI Intelligence Core',
      desc: 'RAG untuk regulasi ekspor, rubrik Readiness Score berbobot transparan.',
    },
    {
      icon: ShieldCheck,
      title: 'Unified Data Layer',
      desc: 'PostgreSQL, Redis, Behavioral Log Store (credit scoring).',
    },
  ]
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel pulse={false}>System Architecture</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-6 font-display text-4xl leading-[1.15] tracking-tight md:text-5xl"
          >
            Cloud-native, <span className="gradient-text">secure by design</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 text-lg text-muted-foreground">
            Containerized microservices (Docker + Kubernetes). Enkripsi AES-256
            / TLS 1.3, RBAC least-privilege, selaras UU PDP No. 27/2022 & ISO
            27001.
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-14 grid gap-5 md:grid-cols-4"
        >
          {layers.map((l, i) => (
            <motion.div
              key={l.title}
              variants={fadeInUp}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-primary">
                  L{i + 1}
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10">
                  <l.icon className="h-5 w-5 text-primary" />
                </span>
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">{l.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {l.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- ROADMAP */
function Roadmap() {
  const phases = [
    {
      n: 'Fase 1',
      title: 'SaaS · Atomic Engine',
      desc: 'Atomic Steps, Readiness Assessment, RAG Chatbot & otomasi dokumen. Subscription murah, sekadar menutup biaya pengembangan.',
      rev: 'Subscription',
      icon: Atom,
    },
    {
      n: 'Fase 2',
      title: 'Competency Scaling · EdTech',
      desc: 'Modul learning-by-doing bersertifikat (strategic partner) terintegrasi sistem + Market Intelligence B2B global.',
      rev: 'Education Fee',
      icon: Sparkles,
    },
    {
      n: 'Fase 3',
      title: 'Ecosystem & Trust · Komunitas',
      desc: 'UMKM matching & P2P2B matchmaking via Koperasi Merah Putih. Validasi ekspor bersama. Fee wajar (buy-me-a-coffee).',
      rev: 'Matchmaking Fee',
      icon: Handshake,
    },
    {
      n: 'Fase 4',
      title: 'Community Aggregation & Scale',
      desc: 'Orkestrasi LCL ke FCL + QC Hybrid gatekeeper, gudang Koperasi. Agregator alternatif asset-light, revenue inti tumbuh.',
      rev: 'Transaction & Consolidation Fee',
      icon: Container,
    },
  ]
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.div variants={fadeInUp}>
            <SectionLabel>Phased Business Model</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mt-6 font-display text-4xl leading-[1.15] tracking-tight md:text-5xl"
          >
            Bukan menyelesaikan semua tahun pertama, tapi{' '}
            <span className="gradient-text">bertahap & realistis</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 text-lg text-muted-foreground">
            Setiap fase memvalidasi model bisnis sebelum melangkah, sambil
            menumbuhkan moat: data, komunitas, dan rekam jejak.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {phases.map((p) => (
            <motion.div
              key={p.n}
              variants={fadeInUp}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl gradient-brand-diagonal text-white shadow-accent">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                  {p.n}
                </span>
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {p.rev}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- CTA */
function CTA() {
  return (
    <section className="pb-28 md:pb-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
          className="relative overflow-hidden rounded-3xl gradient-brand-diagonal p-12 text-center shadow-accent-lg md:p-20"
        >
          <div className="absolute inset-0 dot-pattern opacity-100" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-white md:text-5xl">
              Lihat bagaimana gula semut Banyumas menembus Jepang
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
              Jelajahi dashboard interaktif, dari Atomic Steps hingga Digital
              Export Track Record.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/dashboard"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-foreground shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98]"
              >
                Buka Dashboard
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- FOOTER */
function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-brand-diagonal">
            <Atom className="h-4 w-4 text-white" />
          </span>
          <span className="font-semibold tracking-tight">
            Atomic<span className="gradient-text">Export</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Tetra Core Team · P1438 · BI-OJK PIDI DIGDAYA Hackathon 2026
        </p>
      </div>
    </footer>
  )
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Problem />
        <Flow />
        <Features />
        <Impact />
        <Roadmap />
        <Architecture />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
