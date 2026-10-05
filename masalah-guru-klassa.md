# Masalah Guru: 20 Masalah dan 5 Akar Masalah

Dasar landing page KLASSA ("Naik Kelas Bersama"). Isi diambil dari dokumen *Stage 01 - Product Problem* (Teacher OS / Asisten Guru Terintegrasi).

## Ringkasan

Guru menghabiskan banyak waktu untuk pekerjaan administratif, akademik, dan pelaporan yang berulang, dan semuanya tersebar di spreadsheet, dokumen, aplikasi pembelajaran, chat, dan file lokal. Akibatnya waktu untuk hal yang benar-benar butuh kompetensi guru (merancang pembelajaran, membimbing siswa, mengevaluasi pemahaman, mengintervensi) ikut terpotong.

Dari lapangan ditemukan **20 masalah**, yang dikelompokkan menjadi **5 kluster** dan berakar pada **5 akar masalah**.

---

## 5 Akar Masalah

| Kode | Akar Masalah | Artinya |
|---|---|---|
| P01 | Fragmented Data | Data guru, siswa, pembelajaran, assessment, dan administrasi tersebar di banyak tempat. |
| P02 | Repetitive Work | Guru harus memasukkan, menghitung, atau mengolah informasi yang sama berkali-kali. |
| P03 | Manual Content Creation | Perangkat pembelajaran dibuat manual, padahal strukturnya, polanya, dan sumber datanya sama. |
| P04 | Lack of Actionable Insight | Data tersedia, tetapi belum otomatis diubah menjadi informasi yang membantu guru mengambil keputusan. |
| P05 | Manual Reporting | Laporan membutuhkan pengumpulan dan rekap ulang dari berbagai sumber. |

Alur kondisi saat ini, menurut dokumen produk:

> Data terpecah → input berulang → rekap manual → beban administrasi tinggi

---

## 20 Masalah, Dikelompokkan per Kluster

### A. Administrasi Guru

Masalah utama: data yang sama sering dimasukkan dan direkap berkali-kali.

1. Absensi siswa masih membutuhkan input dan rekap berulang.
2. Input nilai memiliki banyak komponen dan perhitungan manual.
3. Jurnal mengajar masih membutuhkan input ulang data yang sebenarnya sudah tersedia.
4. Prota dan Prosem masih membutuhkan pembagian waktu manual.
5. Administrasi rapor membutuhkan rekap nilai, deskripsi, dan catatan.
6. Permintaan laporan dari pimpinan membutuhkan rekap manual terlebih dahulu.

### B. Pembelajaran

Masalah utama: guru masih banyak membuat perangkat pembelajaran dari awal meskipun sumber data dan polanya sering sama.

7. RPP/Modul Ajar memiliki format berulang tetapi tetap dibuat manual.
8. Guru membutuhkan waktu untuk mencari metode dan aktivitas pembelajaran yang sesuai.
9. Pembuatan media pembelajaran seperti PPT, LKPD, dan worksheet membutuhkan waktu.
10. Materi pembelajaran lama sulit ditemukan karena file tidak terorganisir.

### C. Assessment

Masalah utama: proses assessment masih terfragmentasi dan banyak pekerjaan dilakukan manual.

Alur yang seharusnya terhubung: Materi / Tujuan Pembelajaran → Kisi-kisi → Soal → Assessment → Koreksi → Nilai → Analisis → Remedial.

11. Kisi-kisi ujian dibuat manual.
12. Guru harus membuat soal berulang untuk berbagai materi dan ujian.
13. Koreksi soal, terutama essay, membutuhkan banyak waktu.
14. Tracking siswa remedial dan nilai remedial masih sulit.

### D. Student Monitoring

Masalah utama: data siswa tersebar sehingga guru sulit melihat kondisi siswa secara menyeluruh. Target ke depan adalah *360° Student View* (kehadiran, nilai rata-rata, tugas yang belum dikumpulkan, remedial, perilaku, tren akademik).

15. Perkembangan siswa sulit dilihat secara cepat.
16. Catatan perilaku siswa tersebar di berbagai tempat.
17. Tracking pengumpulan tugas sulit dilakukan.
18. Guru sulit mengetahui materi atau kompetensi yang belum dikuasai siswa.

### E. Reporting dan Komunikasi

Masalah utama: laporan masih dibuat lewat rekap manual dari berbagai sumber data. Prinsipnya: laporan bukan tempat input data, melainkan output dari data operasional sistem.

19. Laporan wali kelas membutuhkan penggabungan banyak sumber data.
20. Komunikasi kepada orang tua banyak yang bersifat berulang.

---

## Pemetaan Kluster ke Akar Masalah (draf kerja)

Pemetaan ini adalah draf untuk diskusi, bukan bagian dari dokumen produk asli.

| Kluster | Akar masalah utama |
|---|---|
| A. Administrasi Guru | P01 Fragmented Data, P02 Repetitive Work |
| B. Pembelajaran | P03 Manual Content Creation |
| C. Assessment | P01, P02, P03 |
| D. Student Monitoring | P01 Fragmented Data, P04 Lack of Actionable Insight |
| E. Reporting dan Komunikasi | P05 Manual Reporting, P02 Repetitive Work |

---

## Prinsip Produk yang Lahir dari Masalah Ini

- **Input Once, Use Everywhere:** informasi cukup dimasukkan sekali, lalu dipakai di seluruh sistem.
- **AI Teaching Assistant:** AI memakai konteks yang sudah ada (guru, mapel, kelas, kurikulum, tujuan pembelajaran, siswa, materi, riwayat assessment), sehingga guru tidak menjelaskan ulang setiap kali.
- **Data-Driven Teacher:** sistem tidak hanya menampilkan angka, tetapi memberi insight yang bisa ditindaklanjuti.
- **Jangan meminta guru menginput data yang sebenarnya sudah diketahui sistem.**
- AI membantu pekerjaan administratif, repetitif, perhitungan, drafting, formatting, summarization, dan analisis data. Keputusan pedagogis tetap di tangan guru.
