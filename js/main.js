/**
 * KLASSA - Official Interactive Script
 * Features:
 * 1. AI Modul Ajar Live Simulator
 * 2. Cockpit Tab Switcher
 * 3. Time-Savings ROI Calculator
 * 4. FAQ Accordion
 * 5. Dark/Light Theme Switcher
 * 6. Live Social Activity Toast
 * 7. Lead Registration Modal
 * 8. Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ==========================================================================
     1. Theme Switcher (Dark / Light)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('klassa-theme') || 'light';

  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('klassa-theme', newTheme);
      if (window.lucide) window.lucide.createIcons();
    });
  }

  /* ==========================================================================
     2. Sticky Header Shadow
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     3. Hero Cockpit Tabs
     ========================================================================== */
  const cockpitTabs = document.querySelectorAll('.cockpit-tab');
  const cockpitScreens = {
    'modul-ajar': {
      tag: 'AI Co-Pilot • Modul Ajar Beres',
      headline: 'Modul Ajar IPAS Fase B (Kelas 4 SD)',
      list: [
        'Tujuan Pembelajaran berbasis CP 032/H/KR/2024 otomatis tersusun.',
        'Langkah berdiferensiasi: visual, auditori & kinestetik.',
        'Rubrik asesmen formatif & lembar refleksi siswa siap cetak.'
      ],
      meta: 'Waktu buat: 42 detik • Siap ekspor Microsoft Word (.docx)'
    },
    'bank-soal': {
      tag: 'Smart Assessment • Anti-Cheat',
      headline: 'Kuis Bab 3: Ekosistem & Rantai Makanan',
      list: [
        '15 Soal Pilihan Ganda Hots + 3 Soal Uraian Berbobot.',
        'Kunci jawaban & pembahasan komprehensif terintegrasi.',
        'Token ujian unik & proteksi anti-tab switching siswa.'
      ],
      meta: 'Ekspor: Excel (.xlsx) & Form Google siap pakai'
    },
    'jurnal-kelas': {
      tag: 'Administrasi • Jurnal & Presensi',
      headline: 'Jurnal Harian & Rekap Ketuntasan TP',
      list: [
        'Presensi siswa 1-klik dengan grafik kehadiran real-time.',
        'Pencatatan materi ajar & catatan sikap otomatis per pertemuan.',
        'Pohon capaian kompetensi langsung siap untuk e-Rapor.'
      ],
      meta: 'Sinkronisasi cloud otomatis tanpa risiko data hilang'
    },
    'portal-siswa': {
      tag: 'Mandiri • Akses Siswa & Keluarga',
      headline: 'Portal Siswa Klassa (Tanpa Password Rumit)',
      list: [
        'Login cepat menggunakan NIS & PIN acak aman.',
        'Upload file tugas via cloud storage berkecepatan tinggi.',
        'Mode Pantau Keluarga untuk transparansi capaian anak.'
      ],
      meta: 'Akses mobile-first dari HP siswa tanpa instalasi aplikasi'
    }
  };

  cockpitTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      cockpitTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetKey = tab.getAttribute('data-cockpit-target');
      const data = cockpitScreens[targetKey];
      if (data) {
        const previewScreen = document.getElementById('cockpit-preview');
        previewScreen.innerHTML = `
          <div>
            <span class="preview-status-pill">
              <i data-lucide="sparkles" style="width:14px; height:14px;"></i>
              ${data.tag}
            </span>
            <h4 class="preview-headline">${data.headline}</h4>
            <ul class="preview-list">
              ${data.list.map(item => `
                <li>
                  <i data-lucide="check-circle-2" style="width:16px; height:16px;"></i>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="preview-footer-action">
            <span class="preview-meta">${data.meta}</span>
            <button class="btn btn-sm btn-primary" onclick="openDemoModal()">Buka Fitur</button>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  });

  /* ==========================================================================
     4. AI Modul Ajar Live Playground Simulator
     ========================================================================== */
  const generateBtn = document.getElementById('btn-simulator-generate');
  const simOutput = document.getElementById('simulator-output-box');
  const simSubject = document.getElementById('sim-subject');
  const simPhase = document.getElementById('sim-phase');
  const simTopic = document.getElementById('sim-topic');

  const sampleTemplates = {
    'ipas': {
      title: 'MODUL AJAR KURIKULUM MERDEKA: IPAS FASE B',
      cp: 'Peserta didik menganalisis hubungan antara bentuk serta fungsi bagian tubuh pada tumbuhan.',
      steps: [
        'Pendahuluan (10 Menit): Guru menunjukkan tanaman asli di kelas, mengajak observasi daun dan akar.',
        'Kegiatan Inti - Diferensiasi Konten (45 Menit): Siswa dibagi dalam 3 kelompok eksplorasi (Visual melihat diagram stomata, Kinestetik membedah batang seledri berwarna, Auditori mendengarkan analogi transportasi air).',
        'Penutup & Refleksi (15 Menit): Pengisian Lembar Refleksi Emotikon & Kuis singkat 3 butir.'
      ],
      rubrik: 'Rubrik Ketuntasan: Mahir (Mampu menjelaskan 4 fungsi akar & daun), Berkembang (2-3 fungsi), Perlu Bimbingan (1 fungsi).'
    },
    'matematika': {
      title: 'MODUL AJAR KURIKULUM MERDEKA: MATEMATIKA FASE D',
      cp: 'Peserta didik dapat memahami relasi dan fungsi serta menyajikannya dalam diagram panah dan grafik kartesius.',
      steps: [
        'Apersepsi (10 Menit): Menghubungkan fungsi dengan sistem pemetaan nomor absen dan ukuran sepatu siswa.',
        'Kegiatan Berdiferensiasi Proses (50 Menit): Kelompok mandiri menyelesaikan studi kasus tarif ojek online; kelompok pendampingan terbimbing menyelesaikan tabel nilai input-output sederhana.',
        'Asesmen Formatif (10 Menit): Exit-ticket 2 soal pemahaman konsep relasi.'
      ],
      rubrik: 'Kriteria Ketercapaian: Siswa mampu membedakan relasi dan fungsi dengan menyajikan minimal 2 bentuk representasi grafis.'
    },
    'bahasa': {
      title: 'MODUL AJAR KURIKULUM MERDEKA: BAHASA INDONESIA FASE E',
      cp: 'Mengevaluasi gagasan dan pesan pada teks negosiasi dalam kehidupan sehari-hari.',
      steps: [
        'Stimulus Video (15 Menit): Menonton simulasi tawar-menawar di pasar tradisional vs negosiasi kerja profesional.',
        'Praktik Role-Play (45 Menit): Simulasi negosiasi terstruktur antar-siswa menggunakan kartu peran kepentingan.',
        'Refleksi & Asesmen (15 Menit): Menuliskan 3 prinsip kesepakatan saling menguntungkan (win-win solution).'
      ],
      rubrik: 'Tuntas: Menyampaikan argumentasi santun, taktis, dan menghasilkan konsensus yang logis.'
    }
  };

  if (generateBtn && simOutput) {
    generateBtn.addEventListener('click', () => {
      const subjectKey = simSubject.value;
      const phaseVal = simPhase.options[simPhase.selectedIndex].text;
      const topicVal = simTopic.value.trim() || 'Bagian Tubuh Tumbuhan & Fungsinya';

      generateBtn.disabled = true;
      generateBtn.innerHTML = `<i data-lucide="loader" class="animate-spin" style="width:16px; height:16px;"></i> Co-Pilot Menyusun Modul...`;
      if (window.lucide) window.lucide.createIcons();

      simOutput.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:320px; gap:16px;">
          <div class="pulse-dot" style="width:24px; height:24px;"></div>
          <p style="font-weight:600; color:var(--color-primary);">AI Klassa sedang menyelaraskan Capaian Pembelajaran & Taksonomi Bloom...</p>
          <span style="font-size:0.85rem; color:var(--color-text-subtle);">Memformat dokumen standar Microsoft Word .docx siap cetak...</span>
        </div>
      `;

      setTimeout(() => {
        const tpl = sampleTemplates[subjectKey] || sampleTemplates['ipas'];

        simOutput.innerHTML = `
          <div style="border-bottom:2px solid var(--color-border); padding-bottom:12px; margin-bottom:16px;">
            <span class="badge badge-teal" style="font-size:0.75rem; margin-bottom:6px;">Format Resmi Kemendikbudristek</span>
            <h3 style="font-size:1.25rem; font-weight:800; color:var(--color-primary);">${tpl.title}</h3>
            <p style="font-size:0.88rem; color:var(--color-text-subtle);"><strong>Topik:</strong> ${topicVal} | <strong>Fase/Jenjang:</strong> ${phaseVal} | <strong>Alokasi Waktu:</strong> 2 JP (2 x 35 Menit)</p>
          </div>

          <div style="margin-bottom:16px;">
            <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:4px; color:var(--color-text-main);">A. Capaian & Tujuan Pembelajaran (CP & TP)</h4>
            <p style="font-size:0.9rem; color:var(--color-text-muted); background:var(--color-bg); padding:10px 14px; border-radius:8px; border-left:4px solid var(--color-primary);">
              ${tpl.cp}
            </p>
          </div>

          <div style="margin-bottom:16px;">
            <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:6px; color:var(--color-text-main);">B. Langkah Kegiatan Pembelajaran Berdiferensiasi</h4>
            <ol style="padding-left:18px; font-size:0.9rem; color:var(--color-text-muted); display:flex; flex-direction:column; gap:6px;">
              ${tpl.steps.map(s => `<li>${s}</li>`).join('')}
            </ol>
          </div>

          <div style="margin-bottom:16px;">
            <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:4px; color:var(--color-text-main);">C. Rencana Asesmen & Rubrik Ketuntasan</h4>
            <p style="font-size:0.88rem; color:var(--color-text-muted);">
              ${tpl.rubrik}
            </p>
          </div>

          <div style="display:flex; gap:12px; margin-top:20px; padding-top:16px; border-top:1px dashed var(--color-border); justify-content:flex-end;">
            <button class="btn btn-sm btn-secondary" onclick="copySimulatedDoc()">
              <i data-lucide="copy" style="width:14px; height:14px;"></i> Salin Teks
            </button>
            <button class="btn btn-sm btn-primary" onclick="alert('✅ File template Modul Ajar telah disiapkan dalam format DOCX resmi Klassa!')">
              <i data-lucide="download" style="width:14px; height:14px;"></i> Unduh Format Word (.docx)
            </button>
          </div>
        `;

        generateBtn.disabled = false;
        generateBtn.innerHTML = `<i data-lucide="sparkles" style="width:16px; height:16px;"></i> Susun Ulang Modul Ajar`;
        if (window.lucide) window.lucide.createIcons();
      }, 1200);
    });
  }

  /* ==========================================================================
     5. Time Savings / ROI Calculator
     ========================================================================== */
  const rppSlider = document.getElementById('slider-rpp');
  const gradingSlider = document.getElementById('slider-grading');
  const reportSlider = document.getElementById('slider-report');

  const rppValDisplay = document.getElementById('val-rpp');
  const gradingValDisplay = document.getElementById('val-grading');
  const reportValDisplay = document.getElementById('val-report');

  const hoursSavedResult = document.getElementById('calc-saved-hours');
  const daysReturnedResult = document.getElementById('calc-returned-days');

  function updateCalculator() {
    if (!rppSlider) return;
    const rppHours = parseInt(rppSlider.value, 10);
    const gradingHours = parseInt(gradingSlider.value, 10);
    const reportHours = parseInt(reportSlider.value, 10);

    rppValDisplay.textContent = `${rppHours} Jam / minggu`;
    gradingValDisplay.textContent = `${gradingHours} Jam / minggu`;
    reportValDisplay.textContent = `${reportHours} Jam / bulan`;

    // Calculation: Klassa automates 80% of RPP, 75% of grading, and 85% of reporting
    const weeklyAdmin = (rppHours * 0.8) + (gradingHours * 0.75);
    const monthlyAdmin = (weeklyAdmin * 4) + (reportHours * 0.85);

    const totalHoursSaved = Math.round(monthlyAdmin);
    const freeDaysEquivalent = (totalHoursSaved / 8).toFixed(1);

    hoursSavedResult.textContent = `${totalHoursSaved} Jam`;
    daysReturnedResult.textContent = `Setara ~${freeDaysEquivalent} hari kerja produktif kembali untuk Anda setiap bulan!`;
  }

  [rppSlider, gradingSlider, reportSlider].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', updateCalculator);
    }
  });

  /* ==========================================================================
     6. FAQ Accordion
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ==========================================================================
     7. Live Social Proof Toast Rotator
     ========================================================================== */
  const toastContainer = document.getElementById('activity-toast');
  const toastMessage = document.getElementById('toast-msg');

  const liveActivities = [
    'Ibu Siti (SMPN 1 Jakarta) baru saja mengekspor Modul Ajar Matematika ke Word.',
    'Pak Budi (SMAN 3 Bandung) menerbitkan Ujian Anti-Cheat untuk 36 siswa.',
    'Ibu Dewi (SDN 4 Surabaya) menuntaskan presensi harian & pohon capaian TP.',
    'Pak Rizky (SMK 2 Malang) menyusun Modul Ajar Otomatis Fase F dalam 45 detik.',
    'Sekolah Bintang Mulia mengadopsi Klassa untuk 42 guru dan 650 siswa.'
  ];

  let activityIndex = 0;
  function rotateLiveActivity() {
    if (!toastContainer || !toastMessage) return;
    toastContainer.style.opacity = '0';
    setTimeout(() => {
      activityIndex = (activityIndex + 1) % liveActivities.length;
      toastMessage.textContent = liveActivities[activityIndex];
      toastContainer.style.opacity = '1';
    }, 400);
  }
  setInterval(rotateLiveActivity, 7000);

  /* ==========================================================================
     8. Modal Registration & Trial
     ========================================================================== */
  const modalOverlay = document.getElementById('modal-demo');
  window.openDemoModal = function() {
    if (modalOverlay) modalOverlay.classList.add('open');
  };

  window.closeDemoModal = function() {
    if (modalOverlay) modalOverlay.classList.remove('open');
  };

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeDemoModal();
    });
  }

  const demoForm = document.getElementById('demo-register-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🎉 Selamat! Akses Akun Demo Guru KLASSA Anda telah dibuat. Anda dapat langsung mencoba seluruh fitur AI Studio.');
      closeDemoModal();
    });
  }

  /* ==========================================================================
     9. Mobile Drawer Navigation
     ========================================================================== */
  const mobileDrawer = document.getElementById('mobile-drawer');
  const btnOpenMobile = document.getElementById('btn-open-mobile');
  const btnCloseMobile = document.getElementById('btn-close-mobile');

  if (btnOpenMobile && mobileDrawer) {
    btnOpenMobile.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  if (btnCloseMobile && mobileDrawer) {
    btnCloseMobile.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  window.closeMobileDrawer = function() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
  };
});

window.copySimulatedDoc = function() {
  alert('📋 Dokumen Modul Ajar berhasil disalin ke clipboard!');
};
