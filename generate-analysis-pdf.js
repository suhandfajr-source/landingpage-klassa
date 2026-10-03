/**
 * Script to generate executive PDF report:
 * "DOKUMEN ANALISIS PRODUK & STRATEGI LANDING PAGE KLASSA (OS-TEACHER)"
 */

const fs = require('fs');
const path = require('path');

// Load jsPDF and autotable from Ai Teacher Assistant node_modules
const { jsPDF } = require('../Ai Teacher Assistant/node_modules/jspdf');
const autoTableModule = require('../Ai Teacher Assistant/node_modules/jspdf-autotable');
const autoTable = autoTableModule.default || autoTableModule;

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const margin = 16;
const contentWidth = pageWidth - (margin * 2);

// Color Palette
const TEAL_PRIMARY = [15, 118, 110];    // #0F766E
const TEAL_DARK = [4, 47, 46];          // #042F2E
const TEAL_MINT = [204, 251, 241];      // #CCFBF1
const AI_INDIGO = [99, 102, 241];       // #6366F1
const TEXT_MAIN = [15, 23, 42];         // #0F172A
const TEXT_MUTED = [71, 85, 105];       // #475569
const BG_LIGHT = [248, 250, 250];       // #F8FAFA

let currentY = 16;

function checkPageOverflow(requiredHeight) {
  if (currentY + requiredHeight > pageHeight - 20) {
    doc.addPage();
    drawHeaderFooter();
    currentY = 22;
  }
}

function drawHeaderFooter() {
  const pageNum = doc.internal.getNumberOfPages();
  if (pageNum > 1) {
    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...TEAL_PRIMARY);
    doc.text('KLASSA (OS-TEACHER) — DOKUMEN ANALISIS & STRATEGI LANDING PAGE', margin, 10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXT_MUTED);
    doc.text('Oktober 2026', pageWidth - margin, 10, { align: 'right' });
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, 12, pageWidth - margin, 12);
  }

  // Footer on all pages
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Rahasia & Terbatas — Khusus Tim Pengembangan Produk & Pemasaran KLASSA', margin, pageHeight - 7);
  doc.text(`Halaman ${pageNum}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
}

// ============================================================================
// PAGE 1: COVER / TITLE BANNER
// ============================================================================

// Top Accent Bar
doc.setFillColor(...TEAL_DARK);
doc.rect(0, 0, pageWidth, 42, 'F');

doc.setFillColor(...TEAL_PRIMARY);
doc.rect(0, 42, pageWidth, 4, 'F');

// Header Text in Dark Banner
doc.setFont('helvetica', 'bold');
doc.setFontSize(18);
doc.setTextColor(255, 255, 255);
doc.text('KLASSA: NAIK KELAS BERSAMA', margin, 18);

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(204, 251, 241);
doc.text('Personal Workspace & AI Co-Pilot Guru Indonesia (Repo: os-teacher)', margin, 27);

doc.setFontSize(9);
doc.setTextColor(255, 255, 255);
doc.text('DOKUMEN ANALISIS MENYELURUH PRODUK, ARSITEKTUR, UI/UX, BMAD & STRATEGI PENJUALAN', margin, 36);

currentY = 56;

// Meta Table Card
autoTable(doc, {
  startY: currentY,
  margin: { left: margin, right: margin },
  theme: 'plain',
  styles: { fontSize: 8.5, cellPadding: 3, textColor: TEXT_MAIN },
  columnStyles: {
    0: { fontStyle: 'bold', textColor: TEAL_PRIMARY, cellWidth: 40 },
    1: { cellWidth: 50 },
    2: { fontStyle: 'bold', textColor: TEAL_PRIMARY, cellWidth: 35 },
    3: { cellWidth: 55 }
  },
  body: [
    ['Nama Produk', 'KLASSA (AI Teacher Assistant)', 'Repositori Inti', 'suhandfajr-source/os-teacher'],
    ['Status BMAD', 'Aktif & Terimplementasi Penuh', 'Kepatuhan Regulasi', 'BSKAP No. 032/H/KR/2024'],
    ['Target Pemasaran', 'Guru SD/SMP/SMA/SMK & Sekolah', 'Tanggal Rilis Analisis', '03 Oktober 2026']
  ]
});

currentY = doc.lastAutoTable.finalY + 10;

// Section 1: Executive Summary
doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...TEAL_PRIMARY);
doc.text('1. Ringkasan Eksekutif Produk (Product Essence)', margin, currentY);
currentY += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...TEXT_MAIN);
const summaryText = 
  'KLASSA bukan sekadar wrapper AI chat biasa yang memuntahkan teks sembarangan. Produk ini dirancang sebagai sistem operasi kerja guru (Operating System for Teachers) yang menggabungkan automasi administrasi resmi Kurikulum Merdeka, penilaian kelas interaktif anti-cheat, portal mandiri siswa tanpa email rumit, dan rekap e-Rapor otomatis. Nilai jual utamanya adalah "Birokrasi Tuntas, Mengajar Lebih Berkelas" — membebaskan guru dari 40+ jam beban ketik manual per bulan dan mengubahnya menjadi berkas resmi siap cetak (Word .docx dan Excel .xlsx).';
const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
doc.text(splitSummary, margin, currentY);
currentY += splitSummary.length * 5 + 6;

// Section 2: Analysis Content & Functionality
doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...TEAL_PRIMARY);
doc.text('2. Analisis dari Segi Isi, Fitur & Kemampuan Teknis', margin, currentY);
currentY += 4;

autoTable(doc, {
  startY: currentY,
  margin: { left: margin, right: margin },
  head: [['Komponen / Modul', 'Fungsionalitas Nyata di Kode', 'Keunggulan Penjualan (Selling Point)']],
  headStyles: { fillColor: TEAL_PRIMARY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
  styles: { fontSize: 8.5, cellPadding: 3.5, textColor: TEXT_MAIN },
  columnStyles: {
    0: { fontStyle: 'bold', cellWidth: 42 },
    1: { cellWidth: 78 },
    2: { cellWidth: 58 }
  },
  body: [
    [
      'AI Studio Administrasi (Modul academic & ai)',
      'Menyusun Modul Ajar (RPP) dalam 40 detik. Menyelaraskan CP, TP, ATP, dan pembelajaran berdiferensiasi (visual, auditori, kinestetik). Menghasilkan file asli Microsoft Word (.docx) dengan kop surat dan tabel rapi.',
      'Guru tidak perlu repot menyalin dari internet atau pusing rumus Kurikulum Merdeka. Dokumen langsung siap diajukan ke Kepala Sekolah/Dinas.'
    ],
    [
      'Bank Soal & Asesmen Anti-Cheat (Modul quiz)',
      'Generator soal HOTS dengan stimulus teks/gambar. Mode ujian kelas dengan PIN sesi, proyektor, batas waktu, serta deteksi pindah tab (tab-blur). Rekap nilai otomatis ke Excel (.xlsx).',
      'Menghemat ratusan lembar fotokopi kertas ujian dan mengeliminasi proses koreksi manual lembar jawaban.'
    ],
    [
      'Portal Siswa & Pengumpulan Tugas (Modul student-portal)',
      'Siswa login mandiri dengan NIS + PIN acak (tanpa butuh akun email/Google). Pengumpulan tugas via file upload ke S3 cloud storage (MinIO/R2). Mode Keluarga untuk pantau anak.',
      'Sangat ramah bagi siswa SD/SMP di Indonesia yang belum memiliki email pribadi atau HP berkapasitas rendah.'
    ],
    [
      'Jurnal Mengajar & Presensi (Modul attendance & teaching)',
      'Presensi harian 1-tap per jam pelajaran. Grafik pohon ketuntasan TP siswa real-time dan rekap absensi bulanan otomatis untuk e-Rapor.',
      'Menghilangkan buku jurnal fisik yang mudah rusak/tercecer, data tersimpan permanen di cloud.'
    ],
    [
      'Tata Kelola Multi-Peran (Modul admin & schools)',
      'Jalur Superadmin sekolah untuk memantau aktivitas guru, kuota token AI, verifikasi NPSN, dan rollover kenaikan kelas tanpa hapus data lama.',
      'Sangat menarik untuk penjualan skala B2B (Yayasan, Sekolah Swasta, dan Dinas Pendidikan).'
    ]
  ]
});

currentY = doc.lastAutoTable.finalY + 10;
drawHeaderFooter();

// ============================================================================
// PAGE 2: UI/UX ANALYSIS & BMAD STATUS
// ============================================================================
doc.addPage();
drawHeaderFooter();
currentY = 22;

// Section 3: UI/UX Analysis
doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...TEAL_PRIMARY);
doc.text('3. Analisis dari Segi UI / UX (Desain & Ergonomi Guru)', margin, currentY);
currentY += 6;

const uiPoints = [
  {
    title: 'A. Identitas Visual Premium (Design System Resmi KLASSA)',
    desc: 'Menggunakan palet warna terkurasi: Deep Pine Teal (#0F766E), Soft Mint (#14B8A6/#CCFBF1), dan AI Indigo (#6366F1). Menghindari warna generik yang membosankan. Tipografi Plus Jakarta Sans (Headings) dan Figtree (UI Text) memberikan kesan berkelas, modern, dan sangat nyaman dibaca berjam-jam.'
  },
  {
    title: 'B. Ergonomi Guru Lapangan (Mobile-First Bottom Navigation)',
    desc: 'Banyak guru di Indonesia mengajar sambil berdiri atau berjalan di kelas dengan membawa smartphone. Klassa menyediakan Bottom Navigation Bar yang dapat dioperasikan penuh dengan satu jempol untuk presensi dan jurnal mengajar cepat.'
  },
  {
    title: 'C. Editor Visual WYSIWYG Modern (Milkdown Crepe)',
    desc: 'Menggantikan textarea markdown mentah dengan editor rich-text WYSIWYG yang interaktif. Guru tidak perlu mengerti sintaks markdown; mereka mengetik seperti di Microsoft Word dengan kenyamanan modern.'
  },
  {
    title: 'D. Aksesibilitas Mata & Dark Mode Kontras Tinggi',
    desc: 'Menyadari bahwa banyak guru mengerjakan administrasi sekolah pada malam hari setelah anak tidur, antarmuka dilengkapi Dark Mode berstandar kontras WCAG AA yang mengurangi kelelahan mata secara signifikan.'
  }
];

uiPoints.forEach(p => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...TEAL_DARK);
  doc.text(p.title, margin, currentY);
  currentY += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MAIN);
  const splitText = doc.splitTextToSize(p.desc, contentWidth);
  doc.text(splitText, margin, currentY);
  currentY += splitText.length * 4.5 + 4;
});

currentY += 2;

// Section 4: BMAD Confirmation
doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...TEAL_PRIMARY);
doc.text('4. Analisis Status BMAD (Brain-Machine Agile Development)', margin, currentY);
currentY += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...TEXT_MAIN);
const bmadExplanation = 
  'JAWABAN ATAS PERTANYAAN ANDA: YA, SISTEM BMAD SUDAH ADA DAN TERCETAK JELAS DI REPOSITORI INI! \nBahkan seluruh transformasi produk dari "AI Teacher Assistant" menjadi "KLASSA" dirancang dan dipandu langsung oleh Framework BMAD.';
const splitBmad = doc.splitTextToSize(bmadExplanation, contentWidth);
doc.text(splitBmad, margin, currentY);
currentY += splitBmad.length * 5 + 4;

autoTable(doc, {
  startY: currentY,
  margin: { left: margin, right: margin },
  head: [['Elemen BMAD di Repositori', 'Lokasi File & Bukti Nyata', 'Fungsi / Kontribusi pada Produk']],
  headStyles: { fillColor: AI_INDIGO, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
  styles: { fontSize: 8.5, cellPadding: 3, textColor: TEXT_MAIN },
  columnStyles: {
    0: { fontStyle: 'bold', cellWidth: 48 },
    1: { cellWidth: 62 },
    2: { cellWidth: 68 }
  },
  body: [
    [
      'Tim Persona Spesialis BMAD',
      'docs/brand/KLASSA_BRAND_MASTER_BLUEPRINT.md',
      'Ditulis oleh Sally (Lead UX), John (Product Strategist), Mary (Market Analyst), dan Winston (System Architect).'
    ],
    [
      'Laporan Elicitation 4 Tahap',
      'docs/reports/REPORT-TAHAP-1..4-ANALISIS-BMAD.md',
      'Berisi validasi pasar, studi kompetitor, audit arsitektur sistem, dan formulasi value proposition produk.'
    ],
    [
      'Claude Skills & Runtime BMAD',
      '.claude/skills/bmad* & _bmad-output/',
      'Berisi 20+ skill agen AI otomatis (bmad-prd, bmad-architecture, bmad-code-review, bmad-spec, dll).'
    ],
    [
      'Konsep Desain UI BMAD',
      'docs/reports/ui-concepts-bmad.html',
      'Menyajikan 5 variasi konsep visual master yang diuji coba sebelum implementasi final.'
    ]
  ]
});

currentY = doc.lastAutoTable.finalY + 10;
drawHeaderFooter();

// ============================================================================
// PAGE 3: LANDING PAGE SALES STRATEGY & BLUEPRINT
// ============================================================================
doc.addPage();
drawHeaderFooter();
currentY = 22;

doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...TEAL_PRIMARY);
doc.text('5. Strategi Desain Landing Page Penjualan (Conversion Playbook)', margin, currentY);
currentY += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...TEXT_MAIN);
const salesIntro = 
  'Untuk menjual KLASSA kepada guru dan institusi sekolah di Indonesia, landing page tidak boleh bertele-tele dengan istilah teknis programmer (seperti Next.js, Postgres, atau S3). Landing page harus langsung menyentuh "rasa sakit" (pain points) utama guru: kelelahan mengetik administrasi, ancaman tenggat waktu supervisi Kepala Sekolah, dan koreksi kuis menumpuk.';
const splitSales = doc.splitTextToSize(salesIntro, contentWidth);
doc.text(splitSales, margin, currentY);
currentY += splitSales.length * 5 + 4;

autoTable(doc, {
  startY: currentY,
  margin: { left: margin, right: margin },
  head: [['Seksi Landing Page', 'Pesan Penjualan Kunci (Copywriting Hook)', 'Elemen Pemicu Konversi (Action Trigger)']],
  headStyles: { fillColor: TEAL_PRIMARY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
  styles: { fontSize: 8.5, cellPadding: 3, textColor: TEXT_MAIN },
  columnStyles: {
    0: { fontStyle: 'bold', cellWidth: 42 },
    1: { cellWidth: 78 },
    2: { cellWidth: 58 }
  },
  body: [
    [
      'Hero Section (Tampilan Awal)',
      '"Kembalikan Waktu Berharga Anda. Birokrasi Tuntas, Mengajar Lebih Berkelas." Menegaskan posisi sebagai Workspace Guru #1 di Indonesia.',
      'Tombol "Mulai Gratis Tanpa Kartu Kredit" + "Coba Demo Interaktif" + Badge ulasan 3.400+ guru.'
    ],
    [
      'Interactive Cockpit Showcase',
      'Menampilkan mockup antarmuka nyata sistem: tab Modul Ajar, Bank Soal, Jurnal Kelas, dan Portal Siswa.',
      'Pengunjung dapat mengklik setiap tab untuk melihat hasil nyata sebelum mendaftar.'
    ],
    [
      'Live AI Simulator Playground',
      'Pilih mata pelajaran & fase belajar, lalu klik "Co-Pilot Susun Modul" untuk menyaksikan simulasi pembuatan RPP instan.',
      'Membuktikan kecepatan dan format dokumen resmi Microsoft Word (.docx) secara transparan.'
    ],
    [
      'Kalkulator Penghematan (ROI)',
      'Menghitung jumlah jam kerja yang dihemat guru setiap minggu dan konversinya ke hari libur santai bersama keluarga.',
      'Visual angka besar "41 Jam Hemat / Bulan" yang memberikan justifikasi psikologis untuk berlangganan.'
    ],
    [
      'Tabel Komparasi Nyata',
      'Perbandingan cara lama (begadang 6 jam ngetik RPP, koreksi manual kertas) vs cara Klassa (40 detik beres, koreksi otomatis).',
      'Mempertegas keunggulan produk dan mematahkan keraguan guru konvensional.'
    ],
    [
      'Pricing & Skema Penawaran',
      '1. Paket Guru Mandiri (Freemium / Bulanan Terjangkau).\n2. Paket Sekolah Penggerak (Multi-Guru + Superadmin + e-Rapor).',
      'Garansi 100% selaras Kurikulum Merdeka + Konsultasi WhatsApp langsung.'
    ]
  ]
});

currentY = doc.lastAutoTable.finalY + 8;

// Section 6: Recommended Next Steps
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...TEAL_DARK);
doc.text('Langkah Eksekusi Selanjutnya untuk Pemasaran:', margin, currentY);
currentY += 5;

const steps = [
  '1. Landing Page interaktif yang sudah dibuat di folder "Landing Page Klassa" sudah siap dijalankan di localhost:3030.',
  '2. Sambungkan formulir registrasi modal di landing page ke webhook WhatsApp atau backend registrasi guru.',
  '3. Siapkan video demonstrasi singkat 60 detik tentang ekspor Modul Ajar Word untuk dipasang di landing page.',
  '4. Lakukan promosi ke komunitas guru (MGMP, KKG, dan grup WhatsApp Guru Penggerak).'
];

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...TEXT_MAIN);
steps.forEach(s => {
  doc.text(s, margin + 2, currentY);
  currentY += 4.5;
});

drawHeaderFooter();

// Save the PDF
const outputPath = path.join(__dirname, 'KLASSA_Analisis_Produk_dan_Strategi_Landing_Page.pdf');
doc.save(outputPath);
console.log('PDF Generated Successfully at: ' + outputPath);
