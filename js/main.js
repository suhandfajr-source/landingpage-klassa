/**
 * ============================================================================
 * KLASSA — Official Interactive & Motion Engine
 * Aesthetics: 60/120 FPS GPU Accelerated, 3D Tilt, Gyroscope, Dynamic Physics
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Global Theme Switcher (Dark / Light)
  initThemeToggle();

  // 3. Header Scrolled Shadow & Mobile Menu
  initHeaderAndMobileMenu();

  // 4. Seksi 1: 3D Perspective Tilt on Cockpit & Fast AI Typewriter
  initHero3DTilt();
  initAITypewriter();
  initLiveQuizCounter();

  // 5. Seksi 3: Midnight Digital Clock Agitation
  initMidnightClock();

  // 6. Seksi 4: Cosmic Convergence Magnetic Pull & Shockwave
  initConvergenceSimulation();

  // 7. Seksi 5: Bento Showstoppers (Stamp Impact, Anti-Cheat Radar, 1-Tap Attendance)
  initBentoShowstoppers();

  // 8. Seksi 6: Hexagonal Radar Bloom Matrix
  initHexagonalRadarBloom();

  // 9. Seksi 7: Dual Morphing Arena (Portal Guru vs Siswa)
  initDualMorphingArena();

  // 10. Seksi 8: Time-Swipe Curtain Slider (Curtain Before vs After)
  initCurtainSwipeSlider();

  // 11. Seksi 10: Pricing Spring Bouncing Toggle
  initPricingSpringToggle();

  // 12. Seksi 12: Liquid Smooth Accordion FAQ
  initLiquidAccordion();

  // 13. Social Proof Toast Simulation & Demo Modal
  initSocialProofToasts();
});

/* ============================================================================
   1. THEME SWITCHER
   ============================================================================ */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('klassa-theme') || 'dark'; // Default dark pine bioluminescent

  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('klassa-theme', nextTheme);
      if (window.lucide) window.lucide.createIcons();
    });
  }
}

/* ============================================================================
   2. HEADER & MOBILE DRAWER
   ============================================================================ */
function initHeaderAndMobileMenu() {
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  const btnOpenMobile = document.getElementById('btn-open-mobile');
  const btnCloseMobile = document.getElementById('btn-close-mobile');
  const mobileDrawer = document.getElementById('mobile-drawer');

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
}

function closeMobileDrawer() {
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileDrawer) {
    mobileDrawer.classList.remove('open');
  }
}

/* ============================================================================
   SEKSI 1: 3D PERSPECTIVE TILT & AI TYPEWRITER
   ============================================================================ */
function initHero3DTilt() {
  const container = document.getElementById('hero-cockpit-container');
  const card = document.getElementById('cockpit-card');
  if (!container || !card) return;

  // Mouse move perspective 3D tilt
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within container
    const y = e.clientY - rect.top;  // y position within container

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10 deg
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  // Reset to original flat position on leave
  container.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

function initAITypewriter() {
  const textElement = document.getElementById('ai-typewriter-text');
  const downloadBtn = document.getElementById('btn-demo-download-docx');
  if (!textElement) return;

  const sampleDoc = `KLASSA AI STUDIO — PENYUSUNAN MODUL AJAR RESMI
Mata Pelajaran: IPAS (Ilmu Pengetahuan Alam & Sosial)
Fase / Kelas: B / Kelas 4 SD (Semester 1)
Regulasi Acuan: BSKAP Kemendikbudristek No. 032/H/KR/2024

[A. TUJUAN PEMBELAJARAN (TP)]
1. Menganalisis hubungan antarmakhluk hidup dalam suatu ekosistem secara kritis.
2. Menggambar bagan rantai makanan berbasis kearifan lokal lingkungan sekitar.

[B. LANGKAH PEMBELAJARAN BERDIFERENSIASI]
• Visual: Mengamati infografik siklus energi produsen ke konsumen puncak.
• Auditori: Diskusi kelompok kecil menceritakan peran dekomposer tanah.
• Kinestetik: Simulasi jaring-jaring makanan menggunakan kartu peran siswa.

[C. ASESMEN FORMATIF & RUBRIK PENILAIAN]
Kriteria Ketuntasan Tujuan Pembelajaran (KKTP): 4 Skala Deskriptor Siap Cetak.`;

  let charIndex = 0;
  let isStreaming = true;

  function streamNextChar() {
    if (!isStreaming) return;

    if (charIndex < sampleDoc.length) {
      textElement.innerHTML = escapeHtml(sampleDoc.substring(0, charIndex + 1)) + '<span class="blinking-cursor"></span>';
      charIndex += 2; // Fast streaming speed
      const delay = Math.random() * 15 + 10;
      setTimeout(streamNextChar, delay);
    } else {
      textElement.innerHTML = escapeHtml(sampleDoc);
      if (downloadBtn) {
        downloadBtn.style.boxShadow = '0 0 25px rgba(20, 184, 166, 0.8)';
        downloadBtn.innerHTML = '<i data-lucide="check-circle" style="width:14px; height:14px;"></i> Siap Diunduh (.docx)';
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  // Trigger stream after short greeting delay
  setTimeout(() => {
    streamNextChar();
  }, 600);

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      alert('Dokumen Word Modul Ajar (.docx) berhasil digenerate dengan standar BSKAP 032! Siap dicetak langsung.');
    });
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function initLiveQuizCounter() {
  const counter = document.getElementById('live-quiz-counter');
  if (!counter) return;

  let count = 36;
  setInterval(() => {
    if (Math.random() > 0.6) {
      count = 36 + Math.floor(Math.random() * 4);
      counter.innerText = count;
    }
  }, 4500);
}

/* ============================================================================
   SEKSI 3: MIDNIGHT DIGITAL CLOCK AGITATION
   ============================================================================ */
function initMidnightClock() {
  const clockElement = document.getElementById('midnight-clock');
  if (!clockElement) return;

  let seconds = 38;
  setInterval(() => {
    seconds++;
    if (seconds >= 60) seconds = 0;
    const secStr = seconds < 10 ? '0' + seconds : seconds;
    clockElement.innerHTML = `<span class="clock-dot"></span><span>01:14:${secStr} AM</span>`;
  }, 1000);
}

/* ============================================================================
   SEKSI 4: COSMIC CONVERGENCE SIMULATION (MAGNETIC SUCTION)
   ============================================================================ */
function initConvergenceSimulation() {
  const btn = document.getElementById('btn-trigger-convergence');
  const nodes = [
    document.getElementById('cnode-1'),
    document.getElementById('cnode-2'),
    document.getElementById('cnode-3'),
    document.getElementById('cnode-4')
  ];
  const core = document.getElementById('klassa-monogram-core');
  const status = document.getElementById('convergence-status');
  if (!btn || !core) return;

  let converged = false;

  btn.addEventListener('click', () => {
    if (!converged) {
      // Pull nodes magnetically to the center core
      nodes.forEach(node => {
        if (node) {
          node.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          node.style.transform = 'scale(0.3)';
          node.style.opacity = '0';
        }
      });

      // Expand pulse core
      core.style.transform = 'scale(1.25)';
      core.style.boxShadow = '0 0 90px rgba(45, 212, 191, 0.9)';

      status.innerHTML = '✨ <strong>Sukses! Seluruh data menyatu di KLASSA:</strong> Rapor, presensi, jurnal, dan modul ajar terintegrasi tanpa redundansi!';
      status.style.color = '#10B981';
      btn.innerHTML = '<i data-lucide="rotate-ccw" style="width:16px; height:16px;"></i> Kembalikan Simulasi';
      if (window.lucide) window.lucide.createIcons();
      converged = true;
    } else {
      // Reset
      nodes.forEach(node => {
        if (node) {
          node.style.transform = 'scale(1)';
          node.style.opacity = '1';
        }
      });
      core.style.transform = 'scale(1)';
      core.style.boxShadow = '0 0 50px rgba(20,184,166,0.5)';
      status.innerText = 'Klik tombol untuk menyedot seluruh file ke ekosistem terpadu KLASSA!';
      status.style.color = 'var(--color-primary)';
      btn.innerHTML = '<i data-lucide="wand-2" style="width:16px; height:16px;"></i> Simulasikan Penyatuan Magnetik';
      if (window.lucide) window.lucide.createIcons();
      converged = false;
    }
  });
}

/* ============================================================================
   SEKSI 5: BENTO SHOWSTOPPERS
   ============================================================================ */
function initBentoShowstoppers() {
  // 1. Radar Anti-Cheat Alarm on Mouse Leave
  const radarBox = document.getElementById('radar-box');
  const radarWarning = document.getElementById('radar-warning');

  if (radarBox && radarWarning) {
    radarBox.addEventListener('mouseleave', () => {
      radarWarning.style.display = 'block';
      radarBox.style.borderColor = '#EF4444';
      radarBox.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.5)';
    });

    radarBox.addEventListener('mouseenter', () => {
      radarWarning.style.display = 'none';
      radarBox.style.borderColor = 'var(--color-border)';
      radarBox.style.boxShadow = 'none';
    });
  }

  // 2. Attendance 1-Tap Animated Circle Fill
  const btnAttendance = document.getElementById('btn-tap-attendance');
  const attendanceCircle = document.getElementById('attendance-circle-bar');
  const attendancePercentage = document.getElementById('attendance-percentage');
  const tapAttendanceLabel = document.getElementById('tap-attendance-label');

  if (btnAttendance && attendanceCircle) {
    let isFull = true;

    btnAttendance.addEventListener('click', () => {
      if (isFull) {
        // Reset to partial attendance
        attendanceCircle.style.strokeDashoffset = '70'; // ~60%
        attendancePercentage.innerText = '60%';
        attendancePercentage.style.color = '#F59E0B';
        tapAttendanceLabel.innerText = 'Sentuh: "Hadirkan 14 Siswa Lagi"';
        isFull = false;
      } else {
        // Animate to 100% full
        attendanceCircle.style.strokeDashoffset = '0'; // 100%
        attendancePercentage.innerText = '100%';
        attendancePercentage.style.color = '#10B981';
        tapAttendanceLabel.innerText = '✓ Kelas VIII-A Tuntas (36/36 Hadir)';
        isFull = true;
      }
    });
  }
}

function triggerStampEffect() {
  const stamp = document.getElementById('stamp-bskap');
  if (!stamp) return;

  stamp.style.animation = 'none';
  // Trigger DOM reflow
  void stamp.offsetWidth;
  stamp.style.animation = 'stamp-drop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
}

/* ============================================================================
   SEKSI 6: HEXAGONAL RADAR BLOOM MATRIX
   ============================================================================ */
function initHexagonalRadarBloom() {
  const studentCard = document.getElementById('card-radar-student');
  const polygon = document.getElementById('radar-bloom-polygon');

  if (studentCard && polygon) {
    const normalPoints = "100,45 145,75 140,110 100,135 60,110 60,75";
    const bloomPoints = "100,20 175,55 170,125 100,165 25,120 25,60";

    studentCard.addEventListener('mouseenter', () => {
      polygon.setAttribute('points', bloomPoints);
      polygon.style.fill = 'rgba(20, 184, 166, 0.55)';
    });

    studentCard.addEventListener('mouseleave', () => {
      polygon.setAttribute('points', normalPoints);
      polygon.style.fill = 'rgba(20, 184, 166, 0.25)';
    });
  }
}

/* ============================================================================
   SEKSI 7: DUAL MORPHING ARENA (PORTAL GURU VS SISWA)
   ============================================================================ */
function initDualMorphingArena() {
  const btnGuru = document.getElementById('morph-btn-guru');
  const btnSiswa = document.getElementById('morph-btn-siswa');

  const descTag = document.getElementById('morph-mode-tag');
  const descTitle = document.getElementById('morph-mode-title');
  const descParagraph = document.getElementById('morph-mode-paragraph');
  const descList = document.getElementById('morph-mode-list');

  const guruMockup = document.getElementById('mockup-guru-view');
  const siswaMockup = document.getElementById('mockup-siswa-view');

  if (!btnGuru || !btnSiswa) return;

  btnGuru.addEventListener('click', () => {
    btnGuru.classList.add('active');
    btnSiswa.classList.remove('active');

    descTag.className = 'badge badge-teal';
    descTag.innerText = 'Portal Guru • Ruang Kerja Komprehensif';
    descTitle.innerText = 'Kendali Penuh Administrasi & Penilaian Mengajar';
    descParagraph.innerText = 'Guru menikmati dashboard luas berfitur lengkap di laptop: merancang asesmen berdiferensiasi, memantau pengumpulan tugas siswa secara langsung, dan mengekspor rekap capaian nilai dalam sekali klik.';

    descList.innerHTML = `
      <li style="display:flex; align-items:center; gap:10px;"><i data-lucide="check-circle-2" style="color:var(--color-mint); width:18px; height:18px;"></i> AI Modul Ajar Generator &amp; Bank Soal HOTS</li>
      <li style="display:flex; align-items:center; gap:10px;"><i data-lucide="check-circle-2" style="color:var(--color-mint); width:18px; height:18px;"></i> Rekap Presensi &amp; Jurnal Harian Otomatis</li>
      <li style="display:flex; align-items:center; gap:10px;"><i data-lucide="check-circle-2" style="color:var(--color-mint); width:18px; height:18px;"></i> Penguncian Layar Ujian Anti-Cheat</li>
    `;

    guruMockup.style.display = 'block';
    siswaMockup.style.display = 'none';
    if (window.lucide) window.lucide.createIcons();
  });

  btnSiswa.addEventListener('click', () => {
    btnSiswa.classList.add('active');
    btnGuru.classList.remove('active');

    descTag.className = 'badge badge-ai';
    descTag.innerText = 'Portal Siswa • Akses Cepat Ramah Murid';
    descTitle.innerText = 'Login Cepat Tanpa Email: Cukup Nomor Induk & PIN';
    descParagraph.innerText = 'Siswa mengakses materi, mengikuti kuis anti-cheat, dan mengunggah dokumen tugas langsung dari smartphone mereka tanpa kendala lupa password akun Google.';

    descList.innerHTML = `
      <li style="display:flex; align-items:center; gap:10px;"><i data-lucide="check-circle-2" style="color:var(--color-ai); width:18px; height:18px;"></i> Akses instan via browser HP tanpa instal aplikasi</li>
      <li style="display:flex; align-items:center; gap:10px;"><i data-lucide="check-circle-2" style="color:var(--color-ai); width:18px; height:18px;"></i> Sistem PIN acak aman tanpa password rumit</li>
      <li style="display:flex; align-items:center; gap:10px;"><i data-lucide="check-circle-2" style="color:var(--color-ai); width:18px; height:18px;"></i> Pengunggahan file tugas langsung ke cloud aman</li>
    `;

    guruMockup.style.display = 'none';
    siswaMockup.style.display = 'block';
    if (window.lucide) window.lucide.createIcons();
  });
}

/* ============================================================================
   SEKSI 8: TIME-SWIPE CURTAIN SLIDER
   ============================================================================ */
function initCurtainSwipeSlider() {
  const container = document.getElementById('curtain-swipe-wrapper');
  const afterLayer = document.getElementById('curtain-after-layer');
  const handleLine = document.getElementById('curtain-handle-line');
  const handleCircle = document.getElementById('curtain-handle-circle');

  if (!container || !afterLayer || !handleLine || !handleCircle) return;

  let isDragging = false;

  function updateCurtain(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;

    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;

    afterLayer.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    handleLine.style.left = `${percentage}%`;
    handleCircle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateCurtain(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateCurtain(e.clientX);
  });

  // Touch Support for Mobile / Tablet
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updateCurtain(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateCurtain(e.touches[0].clientX);
  }, { passive: true });
}

/* ============================================================================
   SEKSI 10: PRICING SPRING TOGGLE SWITCH
   ============================================================================ */
function initPricingSpringToggle() {
  const toggleSwitch = document.getElementById('pricing-toggle-switch');
  const toggleKnob = document.getElementById('pricing-toggle-knob');
  const discountBadge = document.getElementById('discount-badge');
  const proPriceVal = document.getElementById('pro-price-val');
  const proPeriodLabel = document.getElementById('pro-period-label');

  if (!toggleSwitch || !toggleKnob) return;

  let isYearly = false;

  toggleSwitch.addEventListener('click', () => {
    isYearly = !isYearly;

    if (isYearly) {
      toggleKnob.classList.add('yearly');
      if (discountBadge) {
        discountBadge.style.transform = 'scale(1.2) rotate(-3deg)';
        setTimeout(() => {
          discountBadge.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
      }
      if (proPriceVal) proPriceVal.innerText = 'Rp 299.000';
      if (proPeriodLabel) proPeriodLabel.innerText = 'per tahun (~Rp 24.900/bulan • Hemat 50%)';
    } else {
      toggleKnob.classList.remove('yearly');
      if (proPriceVal) proPriceVal.innerText = 'Rp 49.000';
      if (proPeriodLabel) proPeriodLabel.innerText = 'per bulan (ditagih bulanan)';
    }
  });
}

/* ============================================================================
   SEKSI 12: LIQUID SMOOTH ACCORDION FAQ
   ============================================================================ */
function initLiquidAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items for clean liquid feel
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ============================================================================
   SOCIAL PROOF TOAST SIMULATOR & DEMO MODAL
   ============================================================================ */
function initSocialProofToasts() {
  const toast = document.getElementById('social-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');

  if (!toast) return;

  const activities = [
    { title: "Guru di SMPN 2 Bandung", desc: "Baru saja mengunduh Modul Ajar Matematika Fase D (.docx)" },
    { title: "Guru di SMAN 1 Yogyakarta", desc: "Selesai koreksi kuis 36 siswa dalam 1 detik" },
    { title: "Guru di SDN 03 Menteng Jakarta", desc: "Berhasil mengimpor 32 data siswa dari Dapodik" },
    { title: "Guru di SMKN 4 Surabaya", desc: "Mengaktifkan ujian anti-cheat untuk 4 kelas paralel" }
  ];

  let actIdx = 0;

  function showNextToast() {
    const current = activities[actIdx];
    if (toastTitle) toastTitle.innerText = current.title;
    if (toastDesc) toastDesc.innerText = current.desc;

    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.transform = 'translateY(120px)';
      actIdx = (actIdx + 1) % activities.length;
      setTimeout(showNextToast, 9000);
    }, 4500);
  }

  setTimeout(showNextToast, 4000);
}

function openDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function handleDemoSubmit(e) {
  e.preventDefault();
  alert('Terima kasih! Akses Akun Uji Coba Gratis 7 Hari Anda sedang disiapkan dan dikirimkan ke WhatsApp Anda.');
  closeDemoModal();
}

// Make functions available globally for inline HTML events
window.openDemoModal = openDemoModal;
window.closeDemoModal = closeDemoModal;
window.closeMobileDrawer = closeMobileDrawer;
window.handleDemoSubmit = handleDemoSubmit;
window.triggerStampEffect = triggerStampEffect;
