# KLASSA — Official Landing Page Project

> **"Lebih dari Administrasi — Menuju Pendidikan yang Berkelas"**  
> Proyek Landing Page resmi untuk ekosistem **KLASSA** (AI Co-Pilot & Personal Workspace Guru Indonesia).  
> Diinisialisasi dan diselaraskan langsung dari repositori inti [`suhandfajr-source/os-teacher`](https://github.com/suhandfajr-source/os-teacher).

---

## 🌟 Fitur Utama Landing Page

1. **Brand Identity KLASSA 100% Presisi**:
   - Master Vector SVG Logo (`klassa-logo-horizontal.svg`, `klassa-mark.svg`, `klassa-logo-vertical.svg`).
   - Warna Resmi: *Deep Pine Teal* (`#0F766E`), *Soft Mint* (`#14B8A6` / `#CCFBF1`), dan *AI Co-Pilot Violet* (`#6366F1`).
   - Tipografi: **Plus Jakarta Sans** (Heading) & **Figtree** (UI/Body).

2. **Cockpit UI Showcase**:
   - Tab navigasi interaktif untuk 4 fitur unggulan: AI Modul Ajar, Bank Soal & Kuis Anti-Cheat, Jurnal Kelas & Absensi, serta Portal Siswa Mandiri.

3. **Interactive AI Playground / Simulator**:
   - Guru dapat memilih mata pelajaran, fase (B, D, E), dan topik ajar.
   - Simulasi pembuatan Modul Ajar Kurikulum Merdeka secara instan dengan struktur Capaian Pembelajaran (CP), Langkah Berdiferensiasi, dan Rubrik Asesmen.
   - Dilengkapi aksi salin teks & simulasi unduh Word (.docx).

4. **Kalkulator Penghematan Waktu (ROI)**:
   - Slider interaktif yang menghitung estimasi jam kerja yang dihemat guru per bulan dan konversinya ke hari luang bersama keluarga.

5. **Komparasi Sebelum vs Sesudah**:
   - Tabel perbandingan riil antara cara administrasi tradisional yang memakan waktu vs kemudahan otomatis bersama Klassa.

6. **Dukungan Dark / Light Theme**:
   - Switcher tema instan dengan penyimpanan status otomatis ke `localStorage`.

7. **Responsif & Ringan**:
   - Vanilla CSS murni dengan performa tinggi tanpa dependensi build tools yang lambat.

---

## 🚀 Cara Menjalankan Secara Lokal

Cukup gunakan server statis lokal favorit Anda:

```bash
# Menggunakan Node.js / npx serve (Port 3000)
npm run dev

# Atau buka langsung file index.html di browser mana pun
```

---

## 📂 Struktur Direktori

```text
Landing Page Klassa/
├── brand/                    # Aset master brand KLASSA (SVG, PNG, HD Icons)
│   ├── klassa-logo-horizontal.svg
│   ├── klassa-mark.svg
│   └── screenshots/          # Cuplikan antarmuka nyata dari sistem os-teacher
├── css/
│   └── style.css             # Design tokens, variables & responsive styling
├── js/
│   └── main.js               # Logika interaktif simulator, kalkulator, & tabs
├── index.html                # Halaman landing page utama
├── package.json
└── README.md
```

---

*Diselaraskan dengan commit terbaru dari `suhandfajr-source/os-teacher` (HEAD: `f2991db` / `10011c2` / `855a282`).*
