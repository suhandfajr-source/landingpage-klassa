/**
 * ============================================================================
 * KLASSA — Official Interactive & Motion Engine (v4.0)
 * Ultra-Smooth LERP Physics, Calm Parallax & Majestic Slow Reveals
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const initSafe = (fn, name) => {
    try {
      if (typeof fn === 'function') fn();
    } catch (err) {
      console.warn(`[KLASSA] Error in ${name}:`, err);
    }
  };

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    initSafe(() => window.lucide.createIcons(), 'LucideIcons');
  }

  // 2. Sticky Navbar Blur & Mobile Drawer
  initSafe(initNavbarAndDrawer, 'NavbarAndDrawer');

  // 3. Slow, Majestic Scroll-Triggered Entrance Reveals
  initSafe(initScrollReveal, 'ScrollReveal');

  // 4. Ultra-Smooth LERP Physics Parallax Engine
  initSafe(initLerpParallaxEngine, 'LerpParallax');

  // 5. Atomic Ecosystem Engine
  initSafe(initAtomicEcosystemEngine, 'AtomicEcosystem');

  // 6. FAQ Accordion Interaction
  initSafe(initFaqAccordion, 'FaqAccordion');

  // 7. Sticky Bottom Mobile CTA on Scroll
  initSafe(initStickyMobileCta, 'StickyMobileCta');

  // 8. Demo Video Walkthrough Timer
  initSafe(initDemoWalkthrough, 'DemoWalkthrough');

  // 9. Ecosystem Interactive Device Stage
  initSafe(initEcosystemInteractiveStage, 'EcosystemInteractiveStage');

  // 10. Synchronized 5-Point Timeline & Problem Carousel
  initSafe(initProblemCarousel, 'ProblemCarousel');

  // 10b. Integrated Ecosystem Showcase (4 Ruang Terpadu)
  initSafe(initIntegratedEcosystemShowcase, 'IntegratedEcosystemShowcase');

  // 10c. AI Content Studio Interactive Showcase (Simulation)
  initSafe(initAiContentStudio, 'AiContentStudio');

  // 10d. Quiz Online & CBT Light Engine (Interactive Showcase)
  initSafe(initQuizCbtEngine, 'QuizCbtEngine');

  // 11. Time Paradox 40/60 Donut Chart Animation
  initSafe(initTimeParadoxChart, 'TimeParadoxChart');

  // 12. Teacher Workload Calculator Engine
  initSafe(initWorkloadCalculator, 'WorkloadCalculator');
});

/* ============================================================================
   2. NAVBAR & MOBILE DRAWER
   ============================================================================ */
function initNavbarAndDrawer() {
  const navbar = document.getElementById('site-navbar');
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.remove('open');
}

/* ============================================================================
   3. MAJESTIC SLOW ENTRANCE REVEALS (1.2s Duration)
   ============================================================================ */
function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReduced) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Staggered delay for sibling cards (140ms apart)
        const parent = entry.target.parentElement;
        if (parent && parent.children) {
          const siblings = Array.from(parent.querySelectorAll('.reveal-on-scroll'));
          const idx = siblings.indexOf(entry.target);
          if (idx > 0) {
            entry.target.style.transitionDelay = `${idx * 140}ms`;
          }
        }
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ============================================================================
   4. ULTRA-SMOOTH LERP PARALLAX ENGINE (No Jitter, Zero Layout Thrashing)
   ============================================================================ */
let smoothedScrollY = window.pageYOffset || document.documentElement.scrollTop;
let targetScrollY = smoothedScrollY;

// Cockpit tilt state with LERP
let targetTiltX = 0;
let targetTiltY = 0;
let currentTiltX = 0;
let currentTiltY = 0;

// Universal Parallax Registry for ALL sections
let parallaxRegistry = [];

function updateParallaxMetrics() {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const elements = document.querySelectorAll('[data-parallax-depth]');
  
  parallaxRegistry = Array.from(elements).map(el => {
    const depth = parseFloat(el.getAttribute('data-parallax-depth')) || 0;
    const rot = parseFloat(el.getAttribute('data-parallax-rot')) || 0;
    const rect = el.getBoundingClientRect();
    const top = rect.top + currentScroll;
    const height = rect.height;
    const id = el.id || '';
    const isSpecialGlow = el.classList.contains('ambient-glow-top');
    const isCockpit = id === 'cockpit-window';
    const isChip1 = id === 'float-chip-1';
    const isChip2 = id === 'float-chip-2';
    const isChip3 = id === 'float-chip-3';

    return {
      el,
      depth,
      rot,
      top,
      height,
      id,
      isSpecialGlow,
      isCockpit,
      isChip1,
      isChip2,
      isChip3
    };
  });
}

function initLerpParallaxEngine() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Initial metric caching (prevents layout thrashing in RAF loop)
  updateParallaxMetrics();

  // Recalculate metrics on resize and when images/fonts finish loading
  window.addEventListener('resize', () => {
    updateParallaxMetrics();
  }, { passive: true });

  window.addEventListener('load', () => {
    updateParallaxMetrics();
  });

  // Track target scroll
  window.addEventListener('scroll', () => {
    targetScrollY = window.pageYOffset || document.documentElement.scrollTop;
  }, { passive: true });

  const connector = document.getElementById('workflow-connector');
  const connectorFill = document.getElementById('connector-line-fill');

  // Ultra-Smooth 60/120 FPS Physics Loop
  function loop(time) {
    // LERP smoothing: 0.085 creates velvety, responsive physical momentum
    smoothedScrollY += (targetScrollY - smoothedScrollY) * 0.085;

    // Cockpit mouse tilt LERP damping
    currentTiltX += (targetTiltX - currentTiltX) * 0.07;
    currentTiltY += (targetTiltY - currentTiltY) * 0.07;

    const windowH = window.innerHeight;
    const viewportTop = smoothedScrollY;
    const viewportBottom = smoothedScrollY + windowH;
    const viewportCenter = smoothedScrollY + windowH * 0.5;
    const t = time * 0.0016; // smooth oscillation clock

    // Loop through ALL registered parallax items across all 12 sections
    for (let i = 0; i < parallaxRegistry.length; i++) {
      const item = parallaxRegistry[i];

      // Visibility buffer: only process when visible in viewport (+250px buffer)
      if (viewportBottom > item.top - 250 && viewportTop < item.top + item.height + 250) {
        const itemCenter = item.top + item.height * 0.5;
        const distFromCenter = viewportCenter - itemCenter;

        // Progress ratio relative to viewport height
        const progress = distFromCenter / windowH;

        // Parallax vertical displacement in px (calm & elegant)
        const yShift = progress * item.depth * 140;

        // Specific element handling:
        if (item.isCockpit) {
          // Cockpit combines 3D mouse tilt + organic float drift + scroll parallax
          const floatY = Math.sin(t * 0.6) * 4;
          const totalCockpitY = yShift + floatY;
          item.el.style.transform = `perspective(1000px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg) translate3d(0, ${totalCockpitY.toFixed(2)}px, 0)`;
        } else if (item.isChip1) {
          // Chip 1: Modul Ajar (organic floating sine wave A)
          const floatY = Math.sin(t * 0.9) * 6;
          item.el.style.transform = `translate3d(0, ${(yShift + floatY).toFixed(2)}px, 0)`;
        } else if (item.isChip2) {
          // Chip 2: Presensi (organic floating cosine wave B)
          const floatY = Math.cos(t * 0.8) * 5;
          item.el.style.transform = `translate3d(0, ${(yShift + floatY).toFixed(2)}px, 0)`;
        } else if (item.isChip3) {
          // Chip 3: Koreksi AI (organic floating sine wave C)
          const floatY = Math.sin(t * 1.05 + 1.8) * 7;
          item.el.style.transform = `translate3d(0, ${(yShift + floatY).toFixed(2)}px, 0)`;
        } else if (item.isSpecialGlow) {
          // Ambient Glow Top: preserves translateX(-50%)
          item.el.style.transform = `translate3d(-50%, ${yShift.toFixed(2)}px, 0)`;
        } else if (item.rot !== 0) {
          // Elements with subtle rotation (e.g. K-wing SVG)
          const rotDeg = progress * item.rot * 120;
          item.el.style.transform = `translate3d(0, ${yShift.toFixed(2)}px, 0) rotate(${rotDeg.toFixed(2)}deg)`;
        } else {
          // Standard parallax items across Section 2 - 16
          item.el.style.transform = `translate3d(0, ${yShift.toFixed(2)}px, 0)`;
        }
      }
    }

    // Workflow connector track fill in Section 6
    if (connector && connectorFill) {
      const connTop = connector.offsetTop;
      if (viewportBottom > connTop && smoothedScrollY < connTop + windowH) {
        const progress = Math.min(1, Math.max(0, (viewportBottom - connTop) / (windowH * 0.6)));
        connectorFill.style.width = `${(progress * 100).toFixed(1)}%`;
      }
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

/* ============================================================================
   5. KLASSA CANONICAL 3D ATOMIC CAGE ENGINE
   - ONE Master 3D Atomic Cage rotating as a single rigid physical object
   - Fixed Master Orbit Geometry (440px x 196px, shared center 0,0,0)
   - Controlled Viewing Envelope: rotateY [-50°, +50°], rotateX [-18°, +18°]
   - Soft Limits with elastic boundary resistance (feels like a premium 3D viewer)
   - Mathematical Node & Card Attachment (Always positioned on orbital track)
   - Smart Partial Billboarding (5°-18° tilt shows 3D glass edge, NEVER mirrors)
   ============================================================================ */
function initAtomicEcosystemEngine() {
  // Stable Hero Atom visualization: No drag, no cursor tracking, no 3D rotation.
  return;
}

function _unusedOldAtomicEngine() {
  const stage = document.getElementById('atomic-ecosystem-stage');
  const atomicCage = document.getElementById('atomic-cage-3d');
  const coreK = document.getElementById('atomic-core-center');
  const dragHint = document.getElementById('ecosystem-drag-hint');
  const cards = document.querySelectorAll('.atomic-card');

  if (!stage || !atomicCage) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 6 Mathematical Card Anchors on the 3 Master Orbits
  // Local cage coordinates (X, Y, Z) derived directly from the master orbit geometry:
  // Orbit A (Horizontal belt): AI Modul Ajar (apex top) & Rapor (apex bottom)
  // Orbit B (Right diagonal: bottom-left → top-right): Presensi (top-right) & Analisis (bottom-left)
  // Orbit C (Left diagonal: top-left → bottom-right): Nilai (top-left) & Ujian (bottom-right)
  // KLASSA K Nucleus is permanently protected at (0, 0, 0)
  const nodeConfig = [
    // 1. AI Modul Ajar: Apex Top
    { el: document.getElementById('node-modul'),    cageX: 0,    cageY: -205, cageZ: 20,   tiltYFactor: 0.10, tiltXFactor: 0.35 },
    // 2. Nilai: Orbit C Upper-Left (top-left of Left-Diagonal Orbit)
    { el: document.getElementById('node-nilai'),    cageX: -180, cageY: -105, cageZ: -60,  tiltYFactor: -0.22, tiltXFactor: 0.15 },
    // 3. Presensi: Orbit B Upper-Right (top-right of Right-Diagonal Orbit)
    { el: document.getElementById('node-presensi'), cageX: 180,  cageY: -105, cageZ: -60,  tiltYFactor: 0.22,  tiltXFactor: 0.15 },
    // 4. Analisis Siswa: Orbit B Lower-Left (bottom-left of Right-Diagonal Orbit)
    { el: document.getElementById('node-analisis'), cageX: -180, cageY: 105,  cageZ: 60,   tiltYFactor: -0.22, tiltXFactor: -0.15 },
    // 5. Ujian Anti-Contek: Orbit C Lower-Right (bottom-right of Left-Diagonal Orbit)
    { el: document.getElementById('node-ujian'),    cageX: 180,  cageY: 105,  cageZ: 60,   tiltYFactor: 0.22,  tiltXFactor: -0.15 },
    // 6. Rapor: Apex Bottom
    { el: document.getElementById('node-rapor'),    cageX: 0,    cageY: 205,  cageZ: 20,   tiltYFactor: -0.10, tiltXFactor: -0.35 }
  ];

  // Preserved Interaction Limits (Section 12 & 13)
  // Prevents atomic silhouette collapse; prioritizes 100% atom readability
  const MAX_DEG_Y = 28;         // Horizontal soft maximum: ±28 degrees
  const MAX_DEG_X = 12;         // Vertical soft maximum: ±12 degrees
  const NORMAL_ZONE_Y = 20;     // Normal linear response up to 20 degrees
  const NORMAL_ZONE_X = 8;      // Normal linear response up to 8 degrees

  // Art-directed 3/4 Perspective Default Resting State (Distinct 3D depth on initial view)
  let rawAngleY = 10.0;         // ~10 deg resting Y-rotation
  let currentAngleY = 10.0;
  let rawTiltX = 5.0;           // ~5 deg resting downward pitch
  let currentTiltX = 5.0;

  let velocityY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartRawY = 0;
  let dragStartRawX = 0;
  let hasDraggedOnce = false;
  let isCardHovered = false;

  // Progressive resistance soft limit curve (Section 13):
  // 0 to normalZone: 100% direct linear response
  // normalZone to maxLimit: progressively stronger hyperbolic resistance
  // maxLimit: soft physical boundary ceiling
  function applySoftLimit(val, normalZone, maxLimit) {
    const abs = Math.abs(val);
    if (abs <= normalZone) return val;
    const sign = Math.sign(val);
    const excess = abs - normalZone;
    const headroom = maxLimit - normalZone; // e.g. 28 - 20 = 8 deg
    const resisted = Math.tanh(excess / (headroom * 1.25)) * headroom;
    return sign * (normalZone + resisted);
  }

  // Set initial cage position immediately
  renderCageFrame(currentAngleY, currentTiltX);

  if (prefersReduced) return;

  // 1. POINTER INTERACTION (Click + Hold + Drag Rotates ONLY Master Cage)
  function onPointerDown(e) {
    isDragging = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    dragStartX = clientX;
    dragStartY = clientY;
    dragStartRawY = rawAngleY;
    dragStartRawX = rawTiltX;
    velocityY = 0;

    stage.classList.add('is-dragging');

    // Fade out first-time hint permanently
    if (!hasDraggedOnce && dragHint) {
      hasDraggedOnce = true;
      dragHint.classList.add('is-hidden');
    }
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = clientX - dragStartX;
    const deltaY = clientY - dragStartY;

    const prevY = rawAngleY;
    // Map mouse movement strictly to Master Group rotation angles
    rawAngleY = dragStartRawY + deltaX * 0.28;
    velocityY = rawAngleY - prevY;

    rawTiltX = dragStartRawX - deltaY * 0.14;
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    stage.classList.remove('is-dragging');
  }

  stage.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);

  stage.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);
  window.addEventListener('touchcancel', onPointerUp);

  // 2. CARD HOVER
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!isDragging) isCardHovered = true;
    });
    card.addEventListener('mouseleave', () => {
      isCardHovered = false;
    });
  });

  // 3. RENDER 3D CAGE FRAME
  function renderCageFrame(viewY, viewX) {
    // A. Rotate ONLY the MASTER 3D ATOMIC CAGE as one immutable physical sculpture.
    // The three orbit rings NEVER move, deform, or recalculate relative to each other!
    atomicCage.style.transform = `rotateY(${viewY.toFixed(2)}deg) rotateX(${viewX.toFixed(2)}deg)`;

    // B. KLASSA K Nucleus: Permanently at (0, 0, 0)
    // Subtle counter-rotation keeps the 12px extruded physical mark facing the viewer
    if (coreK) {
      coreK.style.transform = `translate(-50%, -50%) rotateY(${(-viewY * 0.12).toFixed(2)}deg) rotateX(${(-viewX * 0.12).toFixed(2)}deg)`;
    }

    // C. Cards: Rigidly anchored in 3D XYZ space to their respective orbit coordinates,
    // with partial billboarding so card faces remain legible, never mirror, and show side depth.
    const radY = viewY * Math.PI / 180;
    const radX = viewX * Math.PI / 180;

    nodeConfig.forEach(node => {
      if (!node.el) return;

      // Camera-space Z depth for dynamic depth styling
      const worldZ_y = -node.cageX * Math.sin(radY) + node.cageZ * Math.cos(radY);
      const cameraZ = node.cageY * Math.sin(radX) + worldZ_y * Math.cos(radX);

      // Normalized Z: -1 (back) to +1 (front)
      const normZ = Math.max(-1, Math.min(1, cameraZ / 140));

      const depthScale = 1.0 + normZ * 0.06;            // 0.94 to 1.06
      const depthOpacity = 0.90 + (normZ + 1) * 0.05;    // 0.90 to 1.00
      const depthZIndex = Math.round(25 + normZ * 15);   // 10 to 40

      // Partial Billboarding:
      // Counter-rotates ~72% of cage rotation so the card face stays facing forward
      // while displaying a crisp 6° to 10° 3D acrylic edge angle. NEVER mirrors!
      const cardRotY = -viewY * 0.72 + (node.tiltYFactor * 10);
      const cardRotX = -viewX * 0.72 + (node.tiltXFactor * 8);

      node.el.style.transform = `translate3d(${node.cageX}px, ${node.cageY}px, ${node.cageZ}px) translate(-50%, -50%) rotateY(${cardRotY.toFixed(1)}deg) rotateX(${cardRotX.toFixed(1)}deg) scale(${depthScale.toFixed(3)})`;
      node.el.style.opacity = depthOpacity.toFixed(2);
      node.el.style.zIndex = depthZIndex;

      // Depth-aware shadow on front acrylic face
      const frontFace = node.el.querySelector('.card-face-front');
      if (frontFace) {
        if (normZ > 0) {
          const shadowBlur = 28 + normZ * 14;
          const shadowY = 14 + normZ * 8;
          frontFace.style.boxShadow = `0 ${shadowY.toFixed(0)}px ${shadowBlur.toFixed(0)}px -6px rgba(15, 118, 110, 0.20), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 1px #FFFFFF, inset 0 -1px 2px rgba(15, 118, 110, 0.08)`;
        } else {
          frontFace.style.boxShadow = `0 8px 18px -4px rgba(15, 118, 110, 0.10), 0 1px 4px rgba(0, 0, 0, 0.02), inset 0 1px 1px rgba(255, 255, 255, 0.8)`;
        }
      }
    });
  }

  // 4. ANIMATION & PHYSICS RAF LOOP
  let idleTime = 0;
  function cagePhysicsLoop() {
    idleTime += 0.012;

    // A. Idle subtle drift (paused during active drag or card hover)
    if (!isDragging && !isCardHovered) {
      // Gentle harmonic oscillation within ±6° comfort zone
      const idleTargetY = 8.0 + Math.sin(idleTime * 0.8) * 4.0;
      const idleTargetX = 4.0 + Math.cos(idleTime * 0.6) * 2.0;
      rawAngleY += (idleTargetY - rawAngleY) * 0.02;
      rawTiltX += (idleTargetX - rawTiltX) * 0.02;
    }

    // B. Momentum inertia on release
    if (!isDragging && Math.abs(velocityY) > 0.001) {
      rawAngleY += velocityY;
      velocityY *= 0.88; // Damping
    }

    // C. Progressive Soft Limits & Elastic Return at Envelope Boundaries
    const effectiveTargetY = applySoftLimit(rawAngleY, NORMAL_ZONE_Y, MAX_DEG_Y);
    if (!isDragging && Math.abs(rawAngleY) > NORMAL_ZONE_Y) {
      // Elastic spring-back to comfort boundary
      rawAngleY += (Math.sign(rawAngleY) * NORMAL_ZONE_Y - rawAngleY) * 0.10;
    }

    const effectiveTargetX = applySoftLimit(rawTiltX, NORMAL_ZONE_X, MAX_DEG_X);
    if (!isDragging && Math.abs(rawTiltX) > NORMAL_ZONE_X) {
      // Elastic spring-back to comfort boundary
      rawTiltX += (Math.sign(rawTiltX) * NORMAL_ZONE_X - rawTiltX) * 0.12;
    }

    // D. Smooth LERP interpolation
    currentAngleY += (effectiveTargetY - currentAngleY) * 0.10;
    currentTiltX += (effectiveTargetX - currentTiltX) * 0.10;

    // E. Render the rigid 3D cage
    renderCageFrame(currentAngleY, currentTiltX);

    requestAnimationFrame(cagePhysicsLoop);
  }

  requestAnimationFrame(cagePhysicsLoop);
}


/* ============================================================================
   6. MODAL HANDLERS & INTERACTIONS
   ============================================================================ */
function openTrialModal() {
  const modal = document.getElementById('trial-modal');
  if (modal) modal.classList.add('open');
}

function closeTrialModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close-btn')) return;
  const modal = document.getElementById('trial-modal');
  if (modal) modal.classList.remove('open');
}

function openLoginModal() {
  openTrialModal();
}

function handleTrialSubmit(e) {
  e.preventDefault();
  alert('🎉 Terima kasih! Tautan aktivasi akun uji coba gratis 7 hari KLASSA telah disiapkan dan dikirimkan.');
  closeTrialModal();
}

/* Demo Video Walkthrough Modal */
const demoSteps = [
  {
    title: 'Langkah 1: Pilih Capaian Pembelajaran',
    desc: 'AI KLASSA secara otomatis membaca pedoman BSKAP dan menyusun sintaks aktivitas berdiferensiasi.',
    progress: '25%'
  },
  {
    title: 'Langkah 2: Rancang Kuis & Assessment Anti-Cheat',
    desc: 'Generator soal HOTS menyiapkan 10 butir soal lengkap dengan kunci dan rubrik esai otomatis.',
    progress: '50%'
  },
  {
    title: 'Langkah 3: 1-Tap Presensi Kelas dari Smartphone',
    desc: 'Kehadiran siswa terekam seketika dan jurnal mengajar harian langsung terisi tanpa ketik ulang.',
    progress: '75%'
  },
  {
    title: 'Langkah 4: Ekspor Word .docx & Rekap Nilai Excel',
    desc: 'Dokumen administrasi selesai dan siap dicetak untuk supervisi kepala sekolah.',
    progress: '100%'
  }
];

let currentDemoIdx = 0;

function openDemoVideoModal() {
  const modal = document.getElementById('demo-video-modal');
  if (modal) {
    modal.classList.add('open');
    updateDemoView();
  }
}

function closeDemoVideoModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close-btn')) return;
  const modal = document.getElementById('demo-video-modal');
  if (modal) modal.classList.remove('open');
}

function advanceDemoStep() {
  currentDemoIdx = (currentDemoIdx + 1) % demoSteps.length;
  updateDemoView();
}

function updateDemoView() {
  const title = document.getElementById('demo-step-title');
  const desc = document.getElementById('demo-step-desc');
  const bar = document.getElementById('demo-progress-bar');

  if (title && desc && bar) {
    title.textContent = demoSteps[currentDemoIdx].title;
    desc.textContent = demoSteps[currentDemoIdx].desc;
    bar.style.width = demoSteps[currentDemoIdx].progress;
  }
}

function initDemoWalkthrough() {
  // Auto-advance demo steps every 6.5s if modal is open
  setInterval(() => {
    const modal = document.getElementById('demo-video-modal');
    if (modal && modal.classList.contains('open')) {
      advanceDemoStep();
    }
  }, 6500);
}

/* ============================================================================
   12. ECOSYSTEM STAGE: CLEAN STATIC MOCKUP & LIVE SYNC SIMULATION
   ============================================================================ */
function initEcosystemInteractiveStage() {
  // Device mockups are kept purely static, proportional, and stable
  const stage = document.getElementById('eco-stage-viewport');
  if (!stage) return;
}

// Student Choice Selection on Smartphone Mockup
function selectPhoneOption(event, el) {
  if (event) event.stopPropagation();
  const choices = document.querySelectorAll('.phone-options-group .phone-opt-btn');
  choices.forEach(c => {
    c.classList.remove('active');
    const existingCheck = c.querySelector('.opt-check');
    if (existingCheck) existingCheck.remove();
  });

  el.classList.add('active');
  const check = document.createElement('span');
  check.className = 'opt-check';
  check.textContent = '✓';
  el.appendChild(check);
}

// Universal Ecosystem Pure-Code Live Sync Simulation Trigger
let isEcoSyncActive = false;
function triggerEcosystemLiveSync(event) {
  if (event) event.stopPropagation();
  if (isEcoSyncActive) return;
  isEcoSyncActive = true;

  const dataBeam = document.getElementById('eco-data-beam');
  const syncPill = document.getElementById('eco-sync-indicator');
  const syncPillText = document.getElementById('sync-pill-text');
  const dimasScore = document.getElementById('dimas-score-text');
  const dimasPill = document.getElementById('stream-pill-dimas');
  const phoneBtn = document.getElementById('phone-quiz-submit');
  const phoneBtnText = document.getElementById('phone-btn-text');
  const laptop = document.getElementById('macbook-device');

  // 1. Elevate & highlight laptop on live sync
  if (laptop) {
    laptop.style.filter = 'drop-shadow(0 25px 40px rgba(16, 185, 129, 0.3))';
  }

  // 2. Fire luminous data sync beam from phone to laptop
  if (dataBeam) {
    dataBeam.classList.remove('firing');
    void dataBeam.offsetWidth; // trigger reflow
    dataBeam.classList.add('firing');
  }

  // 3. Update iPhone submit button
  if (phoneBtn && phoneBtnText) {
    phoneBtn.style.backgroundColor = '#10B981';
    phoneBtnText.textContent = 'Terkirim ✓';
  }

  // 4. Update teacher cockpit on MacBook
  if (dimasScore && dimasPill) {
    setTimeout(() => {
      dimasScore.textContent = '100';
      dimasScore.className = 'pill-score';
      dimasPill.className = 'stream-pill done';
    }, 450);
  }

  // 5. Highlight sync pill
  if (syncPill && syncPillText) {
    syncPill.style.backgroundColor = '#10B981';
    syncPillText.textContent = '⚡ Sinkron Sukses: Jawaban Dimas Terkoreksi 100!';
  }

  // 6. Reset after 4s for replayability
  setTimeout(() => {
    if (syncPill && syncPillText) {
      syncPill.style.backgroundColor = 'rgba(15, 118, 110, 0.95)';
      syncPillText.textContent = '⚡ Sinkron Real-Time Otomatis';
    }
    if (phoneBtn && phoneBtnText) {
      phoneBtn.style.backgroundColor = '#0F766E';
      phoneBtnText.textContent = 'Kirim Jawaban ➔';
    }
    if (dimasScore && dimasPill) {
      dimasScore.textContent = 'Menjawab...';
      dimasScore.className = 'pill-score score-wait';
      dimasPill.className = 'stream-pill in-progress';
    }
    if (laptop) {
      laptop.style.filter = '';
    }
    isEcoSyncActive = false;
  }, 4200);
}

function simulateStudentQuizInteraction(event) {
  triggerEcosystemLiveSync(event);
}

function simulateLaptopWorkspaceClick() {
  triggerEcosystemLiveSync();
}

/* ============================================================================
   13. SYNCHRONIZED 5-POINT TIMELINE & PROBLEM AGITATION CAROUSEL
   ============================================================================ */
let currentProblemIndex = 0;
const totalProblemSlides = 5;
let problemAutoPlayTimer = null;

function updateProblemCarouselUI(index) {
  currentProblemIndex = index;
  const track = document.getElementById('problem-carousel-track');
  const navNodes = document.querySelectorAll('.problem-nav-node');
  const dots = document.querySelectorAll('.problem-carousel-dots .carousel-dot-btn');
  const slides = document.querySelectorAll('.problem-slide');

  // 1. Move track horizontally
  if (track) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // 2. Toggle active slide
  slides.forEach((s, idx) => {
    s.classList.toggle('active', idx === index);
  });

  // 3. Update timeline nodes & connecting lines
  navNodes.forEach((node, idx) => {
    node.classList.toggle('active', idx === index);
  });

  for (let i = 0; i < 4; i++) {
    const fill = document.getElementById(`timeline-fill-${i}`);
    if (fill) {
      if (i < index) {
        fill.classList.add('filled');
      } else {
        fill.classList.remove('filled');
      }
    }
  }

  // 4. Update dots
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });

  // 5. Re-render Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function goToProblemSlide(index) {
  if (index < 0) index = 0;
  if (index >= totalProblemSlides) index = totalProblemSlides - 1;
  updateProblemCarouselUI(index);
  resetProblemAutoPlay();
}

function nextProblemSlide() {
  const nextIdx = (currentProblemIndex + 1) % totalProblemSlides;
  goToProblemSlide(nextIdx);
}

function prevProblemSlide() {
  const prevIdx = (currentProblemIndex - 1 + totalProblemSlides) % totalProblemSlides;
  goToProblemSlide(prevIdx);
}

function resetProblemAutoPlay() {
  if (problemAutoPlayTimer) {
    clearInterval(problemAutoPlayTimer);
  }
  problemAutoPlayTimer = setInterval(() => {
    nextProblemSlide();
  }, 7500);
}

function initProblemCarousel() {
  const container = document.getElementById('problem-carousel-container');
  if (!container) return;

  // Set initial state
  updateProblemCarouselUI(0);

  // Auto-play every 7.5s, pause on hover
  resetProblemAutoPlay();

  container.addEventListener('mouseenter', () => {
    if (problemAutoPlayTimer) clearInterval(problemAutoPlayTimer);
  });

  container.addEventListener('mouseleave', () => {
    resetProblemAutoPlay();
  });

  // Mobile swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextProblemSlide();
      } else {
        prevProblemSlide();
      }
    }
  }, { passive: true });
}

/* ====================================================================
   14. KLASSA INTEGRATED ECOSYSTEM SHOWCASE (4 RUANG TERPADU)
   Level 1: 4 Workspace Toggles
   Level 2: 3 Nested Feature Selectors per Workspace
   Level 3: Dynamic Authentic KLASSA Screenshot/UI Viewport
   ==================================================================== */
const klassaWorkspacesData = [
  {
    index: 0,
    theme: 'blue',
    label: '01 / RUANG MENGAJAR',
    headline: 'Mengajar Lebih Fokus, Administrasi Tetap Tercatat.',
    description: 'Kelola perjalanan pembelajaran, presensi siswa, dan jurnal mengajar dalam satu alur yang praktis.',
    valueStatement: 'Satu sesi mengajar, data tersusun untuk kebutuhan berikutnya.',
    dataFlow: 'Dicatat di Ruang Mengajar → Otomatis mengisi Jurnal & Roster Siswa',
    features: [
      {
        id: 'timeline',
        title: 'Linimasa Mengajar',
        explanation: 'Pantau perjalanan pembelajaran dari pertemuan pertama hingga akhir.',
        icon: 'calendar',
        badge: 'Pertemuan 1 s/d 16',
        url: 'app.klassa.id/ruang-mengajar/linimasa',
        render: () => `
          <div class="mock-screen-view screen-timeline fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-blue">Sesi Mengajar Aktif</span>
                <h4 class="mock-heading">Matematika • Kelas X IPA 1</h4>
                <p class="mock-subheading">Kurikulum Merdeka • Semester Ganjil 2026/2027</p>
              </div>
              <div class="mock-action-group">
                <span class="mock-pill-status pill-active"><span class="pulse-dot"></span> Sesi #04 Berlangsung</span>
              </div>
            </div>

            <!-- Timeline visual nodes -->
            <div class="mock-timeline-track-bar">
              <div class="timeline-step completed"><span>Sesi 1</span></div>
              <div class="timeline-step completed"><span>Sesi 2</span></div>
              <div class="timeline-step completed"><span>Sesi 3</span></div>
              <div class="timeline-step current"><span>Sesi 4 (Hari Ini)</span></div>
              <div class="timeline-step pending"><span>Sesi 5</span></div>
              <div class="timeline-step pending"><span>Sesi 6</span></div>
              <div class="timeline-step pending"><span>... 16</span></div>
            </div>

            <div class="mock-session-card highlight-focus">
              <div class="session-top">
                <div class="session-icon-box blue">
                  <i data-lucide="book-open"></i>
                </div>
                <div class="session-info">
                  <span class="session-topic-label">Materi Pertemuan #04</span>
                  <div class="session-topic-name">Sistem Persamaan Linear Dua Variabel (SPLDV)</div>
                  <span class="session-time">07:30 – 09:00 WIB • Ruang Lab Komputer 2</span>
                </div>
                <span class="tag-verified">BSKAP Terverifikasi</span>
              </div>

              <div class="session-attachments">
                <span class="att-item"><i data-lucide="file-text"></i> Modul Ajar (BSKAP) .docx</span>
                <span class="att-item"><i data-lucide="layout-template"></i> LKPD Berdiferensiasi</span>
                <span class="att-item"><i data-lucide="check-square"></i> Rubrik Asesmen Formatif</span>
              </div>
            </div>

            <div class="mock-focus-callout">
              <i data-lucide="sparkles"></i>
              <span><strong>Fokus Linimasa:</strong> Alur tatap muka tersusun otomatis hingga akhir semester tanpa perlu membuat silabus berulang.</span>
            </div>
          </div>
        `
      },
      {
        id: 'presence',
        title: 'Presensi Cepat',
        explanation: 'Catat kehadiran siswa langsung saat sesi mengajar berlangsung.',
        icon: 'check-circle-2',
        badge: '1-Tap Presensi',
        url: 'app.klassa.id/ruang-mengajar/presensi-live',
        render: () => `
          <div class="mock-screen-view screen-presence fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-blue">Presensi Kelas Real-Time</span>
                <h4 class="mock-heading">1-Tap Kehadiran Siswa • Sesi #04</h4>
              </div>
              <div class="mock-counter-pill">
                <span class="counter-bold">34 / 36</span>
                <span class="counter-label">Hadir (94.4%)</span>
              </div>
            </div>

            <div class="mock-presence-matrix highlight-focus">
              <div class="presence-row header">
                <span>NIS / Nama Siswa</span>
                <span>Status Kehadiran</span>
                <span>Catatan</span>
              </div>
              <div class="presence-row">
                <div class="student-cell"><span class="avatar">👨‍🎓</span> <strong>Ahmad Fauzan</strong> (24089)</div>
                <div class="status-cell"><span class="btn-att-h active">Hadir</span><span class="btn-att-s">Sakit</span><span class="btn-att-i">Izin</span></div>
                <div class="note-cell text-muted">Tepat waktu (07:25)</div>
              </div>
              <div class="presence-row">
                <div class="student-cell"><span class="avatar">👩‍🎓</span> <strong>Bella Safitri</strong> (24090)</div>
                <div class="status-cell"><span class="btn-att-h active">Hadir</span><span class="btn-att-s">Sakit</span><span class="btn-att-i">Izin</span></div>
                <div class="note-cell text-muted">Tepat waktu</div>
              </div>
              <div class="presence-row warning-row">
                <div class="student-cell"><span class="avatar">👦</span> <strong>Dimas Pratama</strong> (24091)</div>
                <div class="status-cell"><span class="btn-att-h">Hadir</span><span class="btn-att-s active">Sakit</span><span class="btn-att-i">Izin</span></div>
                <div class="note-cell text-warn">Surat dokter terunggah</div>
              </div>
            </div>

            <div class="mock-focus-callout">
              <i data-lucide="check-circle-2"></i>
              <span><strong>Data Terhubung:</strong> 1x klik presensi langsung memperbarui profil murid dan menyusun jurnal harian tanpa entri ganda.</span>
            </div>
          </div>
        `
      },
      {
        id: 'journal',
        title: 'Jurnal Guru',
        explanation: 'Dokumentasikan aktivitas dan refleksi pembelajaran tanpa berpindah aplikasi.',
        icon: 'book-marked',
        badge: 'Jurnal Otomatis',
        url: 'app.klassa.id/ruang-mengajar/jurnal-harian',
        render: () => `
          <div class="mock-screen-view screen-journal fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-blue">Buku Jurnal Guru</span>
                <h4 class="mock-heading">Catatan Aktivitas &amp; Refleksi Pembelajaran</h4>
              </div>
              <span class="badge-autosaved">✓ Tersimpan Otomatis</span>
            </div>

            <div class="mock-journal-box highlight-focus">
              <div class="journal-field">
                <label>Aktivitas Pembelajaran Terlaksana:</label>
                <div class="journal-text-preview">Diskusi kelompok pemecahan masalah SPLDV menggunakan metode eliminasi dan substitusi. 32 siswa menyelesaikan LKPD aktif.</div>
              </div>

              <div class="journal-field">
                <label>Catatan Refleksi Guru:</label>
                <div class="journal-text-preview reflection">Sebagian besar siswa memahami konsep visual grafik. 3 siswa membutuhkan bimbingan tambahan pada operasi tanda aljabar negatif.</div>
              </div>

              <div class="journal-footer-meta">
                <span>Guru Pengampu: <strong>Dra. Sri Wahyuni, M.Pd.</strong></span>
                <span>NIP: 19780512 200501 2 003</span>
              </div>
            </div>

            <div class="mock-focus-callout">
              <i data-lucide="file-check"></i>
              <span><strong>Siap Audit:</strong> Format jurnal otomatis siap diekspor untuk lampiran supervisi kepala sekolah dan pengawas.</span>
            </div>
          </div>
        `
      }
    ]
  },
  {
    index: 1,
    theme: 'rose',
    label: '02 / NILAI & EVALUASI',
    headline: 'Nilai Bukan Lagi Sekadar Angka di Spreadsheet.',
    description: 'Kelola penilaian berbobot dan identifikasi siswa yang membutuhkan tindak lanjut.',
    valueStatement: 'Dari hasil asesmen menuju keputusan pembelajaran yang lebih terarah.',
    dataFlow: 'Formula Bobot & KKTP → Langsung terhubung ke Deskripsi e-Rapor',
    features: [
      {
        id: 'gradebook',
        title: 'Buku Nilai',
        explanation: 'Kelola nilai siswa dalam matriks yang rapi dan mudah ditinjau.',
        icon: 'table',
        badge: 'Matriks Dinamis',
        url: 'app.klassa.id/nilai/buku-nilai-matriks',
        render: () => `
          <div class="mock-screen-view screen-gradebook fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-rose">Buku Nilai Berjalan</span>
                <h4 class="mock-heading">Matriks Nilai Matematika • X IPA 1</h4>
              </div>
              <div class="mock-avg-pill">
                <span>Rata-Rata Kelas: <strong>86.4</strong></span>
              </div>
            </div>

            <div class="mock-grade-table highlight-focus">
              <div class="grade-table-header">
                <span class="col-name">Nama Siswa</span>
                <span class="col-sc">TP 1</span>
                <span class="col-sc">TP 2</span>
                <span class="col-sc">Formatif</span>
                <span class="col-sc">Sumatif</span>
                <span class="col-final">Nilai Akhir</span>
                <span class="col-status">Status</span>
              </div>
              <div class="grade-table-row">
                <span class="col-name">Ahmad Fauzan</span>
                <span class="col-sc">88</span>
                <span class="col-sc">92</span>
                <span class="col-sc">85</span>
                <span class="col-sc">90</span>
                <span class="col-final font-bold text-teal">88.8</span>
                <span class="col-status"><span class="badge-tuntas">Tuntas</span></span>
              </div>
              <div class="grade-table-row">
                <span class="col-name">Bella Safitri</span>
                <span class="col-sc">90</span>
                <span class="col-sc">94</span>
                <span class="col-sc">88</span>
                <span class="col-sc">92</span>
                <span class="col-final font-bold text-teal">91.0</span>
                <span class="col-status"><span class="badge-tuntas">Tuntas</span></span>
              </div>
              <div class="grade-table-row remedi-row">
                <span class="col-name">Chandra Wijaya</span>
                <span class="col-sc">70</span>
                <span class="col-sc">68</span>
                <span class="col-sc">72</span>
                <span class="col-sc">65</span>
                <span class="col-final font-bold text-rose">68.8</span>
                <span class="col-status"><span class="badge-remed">Remedial</span></span>
              </div>
            </div>

            <div class="mock-focus-callout rose">
              <i data-lucide="table"></i>
              <span><strong>Sticky Headers & Formula Otomatis:</strong> Tidak ada rumus rusak (#REF!), kolom terhitung dinamis saat nilai masuk.</span>
            </div>
          </div>
        `
      },
      {
        id: 'weighting',
        title: 'Pembobotan Nilai',
        explanation: 'Sesuaikan komposisi penilaian dengan kebijakan sekolah.',
        icon: 'sliders',
        badge: 'Formula Fleksibel',
        url: 'app.klassa.id/nilai/konfigurasi-bobot',
        render: () => `
          <div class="mock-screen-view screen-weighting fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-rose">Konfigurasi Penilaian</span>
                <h4 class="mock-heading">Pengaturan Komposisi Pembobotan</h4>
              </div>
              <span class="tag-verified">Total 100% Valid</span>
            </div>

            <div class="mock-weight-sliders highlight-focus">
              <div class="weight-item">
                <div class="w-head"><span>Tugas Harian &amp; PR</span><strong>20%</strong></div>
                <div class="w-bar"><div class="w-fill" style="width: 20%; background: #3B82F6;"></div></div>
              </div>
              <div class="weight-item">
                <div class="w-head"><span>Ulangan Formatif (TP)</span><strong>30%</strong></div>
                <div class="w-bar"><div class="w-fill" style="width: 30%; background: #0D9488;"></div></div>
              </div>
              <div class="weight-item">
                <div class="w-head"><span>Asesmen Sumatif Akhir (SAS)</span><strong>50%</strong></div>
                <div class="w-bar"><div class="w-fill" style="width: 50%; background: #E11D48;"></div></div>
              </div>
            </div>

            <div class="mock-formula-box">
              <code>Nilai Akhir = (Tugas × 0.20) + (Formatif × 0.30) + (Sumatif × 0.50)</code>
            </div>

            <div class="mock-focus-callout rose">
              <i data-lucide="sliders"></i>
              <span><strong>Sesuai Kurikulum:</strong> Fleksibel untuk Kurikulum Merdeka maupun Kurikulum 2013 tanpa ubah formula manual.</span>
            </div>
          </div>
        `
      },
      {
        id: 'remedial',
        title: 'Remedial & KKTP',
        explanation: 'Temukan siswa yang belum mencapai batas ketuntasan dan pantau tindak lanjutnya.',
        icon: 'trending-up',
        badge: 'Pelacak KKTP',
        url: 'app.klassa.id/nilai/pelacak-kktp-remedial',
        render: () => `
          <div class="mock-screen-view screen-remedial fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-rose">Kriteria Ketercapaian (KKTP)</span>
                <h4 class="mock-heading">Antrean Remedial &amp; Tindak Lanjut</h4>
              </div>
              <div class="kktp-threshold-tag">Batas KKTP: <strong>75.0</strong></div>
            </div>

            <div class="mock-remedial-list highlight-focus">
              <div class="remed-card">
                <div class="remed-left">
                  <span class="av-warn">👦</span>
                  <div>
                    <strong>Chandra Wijaya</strong> • Nilai: <span class="val-low">68.8</span>
                    <p class="remed-sub">Indikator belum tuntas: Operasi Eliminasi Aljabar</p>
                  </div>
                </div>
                <span class="btn-action-mini">Siapkan Soal Remedial ➔</span>
              </div>
              <div class="remed-card">
                <div class="remed-left">
                  <span class="av-warn">👧</span>
                  <div>
                    <strong>Dina Mariana</strong> • Nilai: <span class="val-low">71.5</span>
                    <p class="remed-sub">Indikator belum tuntas: Pemodelan Soal Cerita</p>
                  </div>
                </div>
                <span class="btn-action-mini">Siapkan Soal Remedial ➔</span>
              </div>
            </div>

            <div class="mock-focus-callout rose">
              <i data-lucide="alert-circle"></i>
              <span><strong>Deteksi Dini:</strong> Mengetahui siswa yang butuh pendampingan berminggu-minggu sebelum deadline rapor.</span>
            </div>
          </div>
        `
      }
    ]
  },
  {
    index: 2,
    theme: 'purple',
    label: '03 / RUANG SISWA',
    headline: 'Kenali Cerita di Balik Setiap Nilai Siswa.',
    description: 'Lihat perkembangan akademik, kehadiran, dan catatan siswa dalam satu profil yang terhubung.',
    valueStatement: 'Setiap siswa memiliki perkembangan yang layak diperhatikan.',
    dataFlow: 'Presensi & Catatan Guru → Tersedia di Rekam Profil & Portal Wali',
    features: [
      {
        id: 'profile360',
        title: 'Profil Siswa 360°',
        explanation: 'Lihat informasi kehadiran, nilai, dan perkembangan siswa secara menyeluruh.',
        icon: 'user-check',
        badge: 'Profil 360°',
        url: 'app.klassa.id/siswa/profil-360-ahmad-fauzan',
        render: () => `
          <div class="mock-screen-view screen-profile fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-purple">Profil Siswa Holistik</span>
                <h4 class="mock-heading">Ahmad Fauzan (NIS 24089)</h4>
              </div>
              <span class="tag-active-student">Siswa Aktif • X IPA 1</span>
            </div>

            <div class="mock-profile-grid highlight-focus">
              <div class="prof-card-col">
                <div class="prof-stat-box">
                  <span class="lbl">Kehadiran</span>
                  <span class="val text-purple">98%</span>
                  <span class="sub">Hadir 34/35 Sesi</span>
                </div>
                <div class="prof-stat-box">
                  <span class="lbl">Rata-Rata Nilai</span>
                  <span class="val text-teal">88.8</span>
                  <span class="sub">Peringkat 3 di Kelas</span>
                </div>
              </div>

              <div class="prof-detail-col">
                <div class="prof-tag-cluster">
                  <span class="trait-tag">Karakter: Kolaboratif</span>
                  <span class="trait-tag">Minat: Matematika & Sains</span>
                  <span class="trait-tag">Gaya Belajar: Visual</span>
                </div>
                <p class="prof-notes-text">
                  “Siswa sangat aktif berdiskusi dan mampu membimbing teman sekelompok dalam materi aljabar linear.”
                </p>
              </div>
            </div>

            <div class="mock-focus-callout purple">
              <i data-lucide="user-check"></i>
              <span><strong>Satu Sumber Informasi:</strong> Riwayat akademik, kehadiran, dan perkembangan sikap tersimpan rapi tanpa tercecer.</span>
            </div>
          </div>
        `
      },
      {
        id: 'monitoring',
        title: 'Monitoring Siswa',
        explanation: 'Kelola catatan khusus dan tindak lanjut perkembangan siswa.',
        icon: 'heart-handshake',
        badge: 'Log Bimbingan',
        url: 'app.klassa.id/siswa/log-monitoring',
        render: () => `
          <div class="mock-screen-view screen-monitoring fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-purple">Log Monitoring &amp; Catatan Khusus</span>
                <h4 class="mock-heading">Pemantauan Perkembangan Personal</h4>
              </div>
              <span class="badge-private-lock"><i data-lucide="lock"></i> Akses Privat Guru</span>
            </div>

            <div class="mock-monitoring-timeline highlight-focus">
              <div class="log-entry">
                <div class="log-meta"><span>14 Okt 2026</span> • <span class="tag-resolved">Tindak Lanjut Selesai</span></div>
                <div class="log-title">Konseling Motivasi Belajar</div>
                <div class="log-desc">Diskusi perbaikan strategi belajar bersama wali kelas. Siswa menunjukkan peningkatan konsentrasi di kelas berikutnya.</div>
              </div>
              <div class="log-entry">
                <div class="log-meta"><span>28 Sep 2026</span> • <span class="tag-info">Prestasi</span></div>
                <div class="log-title">Juara 2 Olimpiade Sains Tingkat Kota</div>
                <div class="log-desc">Mewakili sekolah dalam kompetisi sains remaja. Portofolio sertifikat terunggah.</div>
              </div>
            </div>

            <div class="mock-focus-callout purple">
              <i data-lucide="heart-handshake"></i>
              <span><strong>Pendampingan Terdokumentasi:</strong> Setiap perkembangan siswa dapat ditelusuri secara berkelanjutan oleh dewan guru.</span>
            </div>
          </div>
        `
      },
      {
        id: 'parent_portal',
        title: 'Portal Orang Tua',
        explanation: 'Berikan akses informasi perkembangan anak sesuai hak akses yang ditetapkan.',
        icon: 'smartphone',
        badge: 'Akses Ringan',
        url: 'app.klassa.id/portal-wali/akses-mandiri',
        render: () => `
          <div class="mock-screen-view screen-portal fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-purple">Portal Wali Murid</span>
                <h4 class="mock-heading">Akses Transparan Tanpa Install Aplikasi</h4>
              </div>
              <span class="tag-safe-token">Token Keamanan Aktif</span>
            </div>

            <div class="mock-parent-phone-view highlight-focus">
              <div class="parent-info-bar">
                <div><strong>Laporan untuk Wali Murid:</strong> Bpk. Hendra Fauzan</div>
                <span class="badge-sync-live">Live Update</span>
              </div>
              <div class="parent-cards-row">
                <div class="p-card"><span>Kehadiran Pekan Ini</span><strong>5 / 5 Hari (100%)</strong></div>
                <div class="p-card"><span>Ujian Terakhir</span><strong>92 (SPLDV)</strong></div>
              </div>
              <div class="parent-msg-box">
                <span class="p-msg-label">Pesan Guru Kelas:</span>
                <p>“Ahmad mengikuti pembelajaran dengan sangat baik pekan ini.”</p>
              </div>
            </div>

            <div class="mock-focus-callout purple">
              <i data-lucide="smartphone"></i>
              <span><strong>Komunikasi Positif:</strong> Orang tua mendapat kabar valid langsung dari guru tanpa spam grup chat yang melelahkan.</span>
            </div>
          </div>
        `
      }
    ]
  },
  {
    index: 3,
    theme: 'amber',
    label: '04 / RUANG ADMINISTRASI',
    headline: 'Data Sudah Ada. Kenapa Harus Diketik Lagi?',
    description: 'Kelola kebutuhan kurikulum, rekap data, dan laporan dalam satu ruang yang tertata.',
    valueStatement: 'Input sekali, gunakan kembali sesuai kebutuhan.',
    dataFlow: 'Data Semester Terpadu → 1-Klik Ekspor Format Resmi Dapodik/e-Rapor',
    features: [
      {
        id: 'cp_tp',
        title: 'Pemetaan CP & TP',
        explanation: 'Organisasikan capaian dan tujuan pembelajaran dalam satu tempat.',
        icon: 'layers',
        badge: 'BSKAP Kurikulum',
        url: 'app.klassa.id/administrasi/pemetaan-cp-tp',
        render: () => `
          <div class="mock-screen-view screen-cptp fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-amber">Struktur Kurikulum Merdeka</span>
                <h4 class="mock-heading">Pemetaan Capaian &amp; Alur Tujuan (ATP)</h4>
              </div>
              <span class="tag-verified">Format BSKAP Resmi</span>
            </div>

            <div class="mock-cptp-tree highlight-focus">
              <div class="tree-node parent">
                <div class="node-badge">Elemen: Aljabar &amp; Fungsi</div>
                <div class="node-text"><strong>CP.01:</strong> Peserta didik dapat menyelesaikan sistem persamaan linear dua variabel melalui berbagai metode pemodelan matematika kontekstual.</div>
              </div>
              <div class="tree-children">
                <div class="tree-node child">
                  <span class="tp-code">TP.01.1</span>
                  <span>Mengidentifikasi bentuk persamaan linear dan membuat model matematika dari masalah kontekstual.</span>
                </div>
                <div class="tree-node child">
                  <span class="tp-code">TP.01.2</span>
                  <span>Menentukan himpunan penyelesaian SPLDV dengan metode grafik, eliminasi, dan substitusi.</span>
                </div>
              </div>
            </div>

            <div class="mock-focus-callout amber">
              <i data-lucide="layers"></i>
              <span><strong>Tersinkronisasi ke Asesmen:</strong> TP yang dipetakan otomatis menjadi dasar pembuatan kisi-kisi soal dan deskripsi e-Rapor.</span>
            </div>
          </div>
        `
      },
      {
        id: 'export_report',
        title: 'Rekap & Ekspor Rapor',
        explanation: 'Siapkan rekap dan keluaran laporan dari data yang sudah tersedia.',
        icon: 'file-spreadsheet',
        badge: '0 Rumus Error',
        url: 'app.klassa.id/administrasi/ekspor-erapor-resmi',
        render: () => `
          <div class="mock-screen-view screen-export fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-amber">Pusat Ekspor &amp; Pelaporan</span>
                <h4 class="mock-heading">Ekspor e-Rapor &amp; Format Administrasi Resmi</h4>
              </div>
              <span class="badge-ready-export">100% Data Lengkap</span>
            </div>

            <div class="mock-export-grid highlight-focus">
              <div class="export-item-card">
                <div class="exp-icon excel">📊</div>
                <div class="exp-info">
                  <strong>Template e-Rapor Kemendikbudristek</strong>
                  <span>Format .xlsx terstandar • Siap impor ke sistem pusat</span>
                </div>
                <span class="btn-download-tag">Unduh .xlsx ✓</span>
              </div>
              <div class="export-item-card">
                <div class="exp-icon pdf">📑</div>
                <div class="exp-info">
                  <strong>Buku Laporan Nilai &amp; Leger Kelas</strong>
                  <span>Format .pdf siap cetak & tanda tangan kepala sekolah</span>
                </div>
                <span class="btn-download-tag">Unduh .pdf ✓</span>
              </div>
              <div class="export-item-card">
                <div class="exp-icon word">📝</div>
                <div class="exp-info">
                  <strong>Deskripsi Capaian Kompetensi AI</strong>
                  <span>Narasi otomatis deskripsi capaian per siswa</span>
                </div>
                <span class="btn-download-tag">Unduh .docx ✓</span>
              </div>
            </div>

            <div class="mock-focus-callout amber">
              <i data-lucide="check-circle"></i>
              <span><strong>Bebas Panik Deadline:</strong> Seluruh laporan siap diterbitkan seketika tanpa perlu merekap ulang ratusan sel spreadsheet.</span>
            </div>
          </div>
        `
      },
      {
        id: 'import_data',
        title: 'Impor Data',
        explanation: 'Masukkan data yang sudah dimiliki tanpa harus memulai semuanya dari awal.',
        icon: 'upload-cloud',
        badge: 'Wizard Cepat',
        url: 'app.klassa.id/administrasi/wizard-impor',
        render: () => `
          <div class="mock-screen-view screen-import fade-in">
            <div class="mock-header-row">
              <div class="mock-title-group">
                <span class="mock-badge badge-amber">Wizard Impor Data Semester</span>
                <h4 class="mock-heading">Impor Roster &amp; Data Dapodik / Spreadsheet</h4>
              </div>
              <span class="tag-verified">36/36 Baris Valid</span>
            </div>

            <div class="mock-import-wizard highlight-focus">
              <div class="import-dropzone">
                <i data-lucide="upload-cloud" class="upload-icon"></i>
                <div class="drop-text">
                  <strong>Daftar_Siswa_Kelas_X_IPA_1.xlsx</strong>
                  <span>Ukuran: 48 KB • 36 Data Siswa Terpetakan Otomatis</span>
                </div>
                <span class="badge-success-pill">✓ Sukses Terbaca</span>
              </div>

              <div class="mapped-columns-row">
                <span class="map-tag">Kolom A ➔ NIS</span>
                <span class="map-tag">Kolom B ➔ Nama Siswa</span>
                <span class="map-tag">Kolom C ➔ Jenis Kelamin</span>
                <span class="map-tag">Kolom D ➔ Kontak Wali</span>
              </div>
            </div>

            <div class="mock-focus-callout amber">
              <i data-lucide="upload-cloud"></i>
              <span><strong>Input Sekali:</strong> Gunakan data sekolah yang sudah ada tanpa mengetik ulang satu per satu dari awal.</span>
            </div>
          </div>
        `
      }
    ]
  }
];

let activeWorkspaceIndex = 0;
let activeFeatureIndex = 0;

function selectWorkspace(workspaceIndex) {
  if (workspaceIndex < 0 || workspaceIndex >= klassaWorkspacesData.length) return;
  activeWorkspaceIndex = workspaceIndex;
  activeFeatureIndex = 0; // Reset to first feature of the workspace

  // 1. Update toggle buttons state
  const toggles = document.querySelectorAll('.workspace-toggle-btn');
  toggles.forEach((btn, idx) => {
    const isActive = idx === workspaceIndex;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // 2. Render Left Showcase Content & Feature Selectors
  renderShowcaseContent();
}

function selectFeature(featureIndex) {
  const currentWs = klassaWorkspacesData[activeWorkspaceIndex];
  if (!currentWs || featureIndex < 0 || featureIndex >= currentWs.features.length) return;
  activeFeatureIndex = featureIndex;

  // 1. Update feature buttons active state
  const featBtns = document.querySelectorAll('.feature-highlight-btn');
  featBtns.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === featureIndex);
  });

  // 2. Update right browser mockup viewport
  renderMockupViewport();
}

function renderShowcaseContent() {
  const ws = klassaWorkspacesData[activeWorkspaceIndex];
  if (!ws) return;

  // Update category badge
  const badgeEl = document.getElementById('sc-badge-num');
  if (badgeEl) badgeEl.textContent = ws.label;

  // Update room badge theme class
  const badgeWrap = document.getElementById('showcase-room-badge');
  if (badgeWrap) {
    badgeWrap.className = `showcase-room-badge theme-${ws.theme}`;
  }

  // Update headline & description
  const headlineEl = document.getElementById('sc-headline');
  if (headlineEl) headlineEl.textContent = ws.headline;

  const descEl = document.getElementById('sc-desc');
  if (descEl) descEl.textContent = ws.description;

  // Update value statement
  const valTextEl = document.getElementById('sc-val-text');
  if (valTextEl) valTextEl.textContent = ws.valueStatement;

  // Update data flow indicator
  const flowTextEl = document.getElementById('sc-flow-text');
  if (flowTextEl) flowTextEl.textContent = ws.dataFlow;

  // Render 3 clickable feature highlights (Level 2)
  const featuresList = document.getElementById('showcase-features-list');
  if (featuresList) {
    featuresList.innerHTML = ws.features.map((f, idx) => `
      <button type="button" class="feature-highlight-btn ${idx === activeFeatureIndex ? 'active' : ''} theme-${ws.theme}" 
              data-feature-idx="${idx}" 
              onclick="selectFeature(${idx})" 
              role="tab" 
              aria-selected="${idx === activeFeatureIndex ? 'true' : 'false'}">
        <div class="feat-icon-bubble">
          <i data-lucide="${f.icon}"></i>
        </div>
        <div class="feat-text-wrap">
          <div class="feat-title-row">
            <span class="feat-title">${f.title}</span>
            <span class="feat-micro-badge">${f.badge}</span>
          </div>
          <p class="feat-desc">${f.explanation}</p>
        </div>
      </button>
    `).join('');
  }

  // Render right mockup viewport
  renderMockupViewport();

  // Refresh Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderMockupViewport() {
  const ws = klassaWorkspacesData[activeWorkspaceIndex];
  if (!ws) return;
  const currentFeat = ws.features[activeFeatureIndex];
  if (!currentFeat) return;

  // Update browser URL
  const urlEl = document.getElementById('sc-url-text');
  if (urlEl) urlEl.textContent = currentFeat.url;

  // Render viewport HTML
  const viewport = document.getElementById('sc-browser-viewport');
  if (viewport) {
    viewport.innerHTML = currentFeat.render();
  }

  // Refresh Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initIntegratedEcosystemShowcase() {
  const panel = document.getElementById('workspace-showcase-panel');
  if (!panel) return;

  // Initial render for Workspace 0 (Ruang Mengajar)
  selectWorkspace(0);

  // Keyboard navigation support for workspace tabs
  const toggles = document.querySelectorAll('.workspace-toggle-btn');
  toggles.forEach((btn, idx) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (idx + 1) % klassaWorkspacesData.length;
        toggles[nextIdx].focus();
        selectWorkspace(nextIdx);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (idx - 1 + klassaWorkspacesData.length) % klassaWorkspacesData.length;
        toggles[prevIdx].focus();
        selectWorkspace(prevIdx);
      }
    });
  });
}

// Global exposure for inline onclick handlers
window.selectWorkspace = selectWorkspace;
window.selectFeature = selectFeature;
window.initIntegratedEcosystemShowcase = initIntegratedEcosystemShowcase;



/* ====================================================================
   15. TIME PARADOX 40/60 STEPPED PIE INFOGRAPHIC ANIMATION
   ==================================================================== */
function initTimeParadoxChart() {
  const chartSection = document.getElementById('paradoks-waktu');
  if (!chartSection) return;

  const sliceAdmin = chartSection.querySelector('.slice-admin');
  const sliceTeach = chartSection.querySelector('.slice-teach');
  const centerHub = chartSection.querySelector('.center-hub-content');
  const labels60 = chartSection.querySelector('.label-60');
  const labels40 = chartSection.querySelector('.label-40');

  if (sliceAdmin && sliceTeach) {
    sliceAdmin.style.opacity = '0';
    sliceAdmin.style.transform = 'scale(0.8) rotate(-15deg)';
    sliceAdmin.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';

    sliceTeach.style.opacity = '0';
    sliceTeach.style.transform = 'scale(0.8) rotate(15deg)';
    sliceTeach.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s';
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (sliceAdmin && sliceTeach) {
          sliceAdmin.style.opacity = '1';
          sliceAdmin.style.transform = 'scale(1) rotate(0deg)';
          sliceTeach.style.opacity = '1';
          sliceTeach.style.transform = 'scale(1) rotate(0deg)';
        }
        if (window.lucide) window.lucide.createIcons();
        obs.unobserve(chartSection);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(chartSection);
}


/* ====================================================================
   16. TEACHER WORKLOAD INTERACTIVE CALCULATOR ENGINE
   ==================================================================== */
function initWorkloadCalculator() {
  const inputClasses = document.getElementById('input-classes');
  const inputStudents = document.getElementById('input-students');
  const inputTopics = document.getElementById('input-topics');
  const inputGrading = document.getElementById('input-grading-time');

  if (!inputClasses || !inputStudents || !inputTopics || !inputGrading) return;

  const displayClasses = document.getElementById('val-classes-display');
  const displayStudents = document.getElementById('val-students-display');
  const displayTopics = document.getElementById('val-topics-display');
  const displayGrading = document.getElementById('val-grading-display');

  const resModuleHours = document.getElementById('res-module-hours');
  const resModuleSub = document.getElementById('res-module-sub');
  const resGradingHours = document.getElementById('res-grading-hours');
  const resGradingSub = document.getElementById('res-grading-sub');
  const resSpreadsheetHours = document.getElementById('res-spreadsheet-hours');
  const resSpreadsheetSub = document.getElementById('res-spreadsheet-sub');
  const resReportHours = document.getElementById('res-report-hours');
  const resReportSub = document.getElementById('res-report-sub');
  const resTotalHours = document.getElementById('res-total-hours');
  const resTotalStudents = document.getElementById('res-total-students');

  let currentAnimatedTotal = 19.9;

  function recalculate() {
    const classes = parseInt(inputClasses.value, 10) || 5;
    const studentsPerClass = parseInt(inputStudents.value, 10) || 32;
    const topics = parseInt(inputTopics.value, 10) || 4;
    const gradingSeconds = parseInt(inputGrading.value, 10) || 45;

    // Update Bubble Displays
    if (displayClasses) displayClasses.textContent = classes + ' Kelas';
    if (displayStudents) displayStudents.textContent = studentsPerClass + ' Siswa / kls';
    if (displayTopics) displayTopics.textContent = topics + ' Topik';
    if (displayGrading) displayGrading.textContent = gradingSeconds + ' Detik / lbr';

    // Exact Mathematical Formulas
    const totalStudents = classes * studentsPerClass;
    const moduleHours = topics * 3.5;
    const gradingHours = (totalStudents * gradingSeconds) / 3600;
    const spreadsheetCells = totalStudents * 4;
    const spreadsheetHours = (spreadsheetCells * 7) / 3600;
    const reportHours = (totalStudents * 1) / 60;
    const totalHours = moduleHours + gradingHours + spreadsheetHours + reportHours;

    // Update Breakdown Cards
    if (resModuleHours) resModuleHours.textContent = moduleHours.toFixed(1) + ' Jam';
    if (resModuleSub) resModuleSub.textContent = topics + ' Topik × 3.5 Jam';

    if (resGradingHours) resGradingHours.textContent = gradingHours.toFixed(1) + ' Jam';
    if (resGradingSub) resGradingSub.textContent = totalStudents + ' Lbr × ' + gradingSeconds + ' dtk';

    if (resSpreadsheetHours) resSpreadsheetHours.textContent = spreadsheetHours.toFixed(1) + ' Jam';
    if (resSpreadsheetSub) resSpreadsheetSub.textContent = spreadsheetCells + ' Sel Data (4 kolom)';

    if (resReportHours) resReportHours.textContent = reportHours.toFixed(1) + ' Jam';
    if (resReportSub) resReportSub.textContent = (totalStudents * 2) + ' Kalimat (' + totalStudents + ' siswa)';

    if (resTotalStudents) {
      resTotalStudents.textContent = totalStudents;
    }

    // Smooth counter animation for total
    animateTotal(totalHours);
  }

  let animFrameId = null;
  function animateTotal(targetVal) {
    if (animFrameId) cancelAnimationFrame(animFrameId);

    const startVal = currentAnimatedTotal;
    const duration = 240;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (targetVal - startVal) * ease;
      currentAnimatedTotal = current;

      if (resTotalHours) {
        resTotalHours.textContent = current.toFixed(1);
      }

      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        currentAnimatedTotal = targetVal;
        if (resTotalHours) resTotalHours.textContent = targetVal.toFixed(1);
      }
    }

    animFrameId = requestAnimationFrame(step);
  }

  // Attach multiple input/change events for instantaneous responsiveness on mouse, touch & keyboard
  const inputs = [inputClasses, inputStudents, inputTopics, inputGrading];
  inputs.forEach(input => {
    ['input', 'change', 'pointermove', 'touchmove'].forEach(evt => {
      input.addEventListener(evt, recalculate, { passive: true });
    });
  });

  // Make globally callable
  window.calculateTeacherWorkload = recalculate;

  // Initial calculation run
  recalculate();
}


/* ============================================================================
   17. FAQ ACCORDION INTERACTION
   ============================================================================ */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      accordionItems.forEach(other => other.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
      if (typeof updateParallaxMetrics === 'function') {
        setTimeout(updateParallaxMetrics, 350);
      }
    });
  });
}

/* ============================================================================
   18. STICKY MOBILE CTA ON SCROLL
   ============================================================================ */
function initStickyMobileCta() {
  const stickyCta = document.getElementById('sticky-mobile-cta');
  const heroSection = document.getElementById('hero');
  if (!stickyCta || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0 && window.innerWidth <= 768) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }, { passive: true });
}

/* ============================================================================
   19. KLASSA AI CONTENT STUDIO — INTERACTIVE SHOWCASE (SIMULATION ENGINE)
   ============================================================================ */
const aiScenariosData = {
  ppt: {
    id: 'ppt',
    displayName: 'Adaptive PPT Generator',
    icon: 'presentation',
    subject: 'IPS',
    grade: 'Kelas VIII',
    topic: 'Interaksi Sosial dan Lembaga Sosial',
    instruction: 'Buat presentasi visual 6 slide untuk materi Interaksi Sosial dan Lembaga Sosial, gunakan alur apersepsi fenomena remaja dan speaker notes guru.',
    docTypeBadge: 'Adaptive PPT Generator',
    formatTag: 'Format: PPTX (PowerPoint) • 6 Slide Adaptif',
    slides: [
      {
        num: 1,
        title: 'Interaksi Sosial & Lembaga Sosial',
        sub: 'Ilmu Pengetahuan Sosial • Kelas VIII Fase D',
        content: `
          <div class="ppt-slide-hero">
            <span class="slide-tag">Modul Ajar IPS #04</span>
            <h3 class="slide-main-title">Membangun Harmoni Lewat Interaksi Sosial</h3>
            <p class="slide-caption">Bagaimana pola hubungan antarindividu membentuk keteraturan di masyarakat?</p>
            <div class="slide-pills-row">
              <span class="p-pill">✦ Bentuk Interaksi</span>
              <span class="p-pill">✦ Syarat Kontak & Komunikasi</span>
              <span class="p-pill">✦ Peran Lembaga Sosial</span>
            </div>
          </div>
        `,
        speakerNotes: 'Awali dengan menanyakan fenomena gotong royong di lingkungan sekitar tempat tinggal siswa sebagai apersepsi kontekstual.'
      },
      {
        num: 2,
        title: 'Tujuan Pembelajaran',
        sub: 'Capaian & Indikator Kompetensi',
        content: `
          <div class="ppt-slide-grid2">
            <div class="grid-box">
              <span class="box-num">01</span>
              <h4>Membedakan Proses Asosiatif vs Disosiatif</h4>
              <p>Menganalisis contoh nyata kerjasama, akomodasi, dan asimilasi dalam kehidupan sehari-hari.</p>
            </div>
            <div class="grid-box">
              <span class="box-num">02</span>
              <h4>Fungsi Lembaga Sosial</h4>
              <p>Menjelaskan peran keluarga, sekolah, dan agama dalam menjaga keteraturan sosial.</p>
            </div>
          </div>
        `,
        speakerNotes: 'Arahkan siswa untuk mencatat 2 kata kunci utama: Asosiatif (menyatukan) dan Disosiatif (merenggangkan).'
      },
      {
        num: 3,
        title: '2 Syarat Terjadinya Interaksi Sosial',
        sub: 'Konsep Kunci Sosiologi',
        content: `
          <div class="ppt-slide-compare">
            <div class="compare-card blue">
              <div class="card-icon">🤝</div>
              <h4>1. Kontak Sosial</h4>
              <p>Pertemuan fisik langsung (primer) maupun perantara media digital (sekunder).</p>
            </div>
            <div class="compare-card teal">
              <div class="card-icon">💬</div>
              <h4>2. Komunikasi</h4>
              <p>Proses penyampaian pesan, simbol makna, dan respons timbal-balik antarpihak.</p>
            </div>
          </div>
        `,
        speakerNotes: 'Tegaskan bahwa kontak tanpa pemahaman pesan belum menjadi interaksi yang utuh.'
      },
      {
        num: 4,
        title: 'Studi Kasus: Gotong Royong Digital',
        sub: 'Contoh Kontekstual Remaja',
        content: `
          <div class="ppt-slide-case">
            <div class="case-badge">STUDI FENOMENA NYATA</div>
            <h4>Penggalangan Donasi Bencana via Media Sosial</h4>
            <p>Siswa mengorganisir bantuan untuk korban banjir melalui grup kelas dan platform crowdfunding.</p>
            <div class="case-reflection">
              <strong>Pertanyaan Diskusi:</strong> Termasuk bentuk interaksi asosiatif manakah aksi gotong royong digital ini?
            </div>
          </div>
        `,
        speakerNotes: 'Beri waktu 2 menit bagi siswa untuk berdiskusi dengan teman sebangku mengenai studi kasus ini.'
      },
      {
        num: 5,
        title: 'Aktivitas Kelompok: Analisis Lembaga',
        sub: 'Sintaks Problem-Based Learning (PBL)',
        content: `
          <div class="ppt-slide-activity">
            <div class="act-step"><span class="step-badge">Tahap 1</span> Bentuk kelompok 4–5 orang</div>
            <div class="act-step"><span class="step-badge">Tahap 2</span> Pilih 1 lembaga: Keluarga, Pendidikan, Agama, atau Ekonomi</div>
            <div class="act-step"><span class="step-badge">Tahap 3</span> Identifikasi 3 peran lembaga tersebut dalam mengatasi konflik remaja</div>
          </div>
        `,
        speakerNotes: 'Kelilingi kelompok dan amati pembagian tugas antaranggota. Dokumentasikan keaktifan murid di Ruang Mengajar.'
      },
      {
        num: 6,
        title: 'Rangkuman & Refleksi Belajar',
        sub: 'Penutup Sesi Pertemuan #04',
        content: `
          <div class="ppt-slide-summary">
            <div class="sum-box">
              <span class="sum-icon">💡</span>
              <p>“Masyarakat terbentuk karena interaksi, dan bertahan karena lembaga sosial yang berfungsi dengan baik.”</p>
            </div>
            <div class="sum-footer-note">Tugas Mandiri: Kerjakan LKPD #04 di Portal Siswa sebelum pertemuan berikutnya.</div>
          </div>
        `,
        speakerNotes: 'Tutup sesi dengan meminta 1 perwakilan siswa menyampaikan 1 hal baru yang paling berkesan hari ini.'
      }
    ]
  },
  modul: {
    id: 'modul',
    displayName: 'Modul Ajar',
    icon: 'file-text',
    subject: 'Matematika',
    grade: 'Kelas VII',
    topic: 'Persamaan Linear Satu Variabel (PLSV)',
    instruction: 'Susun Modul Ajar Kurikulum Merdeka topik PLSV dengan model Problem Based Learning (PBL) 2x40 menit, lengkap dengan asesmen formatif.',
    docTypeBadge: 'Modul Ajar BSKAP',
    formatTag: 'Format: DOCX (Word) • Siap Cetak & Tanda Tangan',
    pages: [
      {
        num: 1,
        title: 'Bagian I: Identitas & Capaian Pembelajaran',
        content: `
          <div class="doc-page-canvas">
            <div class="doc-header-kop">
              <div class="doc-title-main">MODUL AJAR KURIKULUM MERDEKA</div>
              <div class="doc-title-sub">Mata Pelajaran: Matematika • Fase D • Kelas VII</div>
            </div>
            <table class="doc-meta-table">
              <tr><td><strong>Penyusun</strong></td><td>Dra. Sri Wahyuni, M.Pd.</td><td><strong>Alokasi Waktu</strong></td><td>2 JP (2 × 40 Menit)</td></tr>
              <tr><td><strong>Fase / Kelas</strong></td><td>Fase D / Kelas VII</td><td><strong>Model Belajar</strong></td><td>Problem Based Learning (PBL)</td></tr>
              <tr><td><strong>Elemen</strong></td><td>Aljabar</td><td><strong>Profil Pelajar</strong></td><td>Bernalar Kritis, Gotong Royong</td></tr>
            </table>
            <div class="doc-section-block">
              <h5>A. Capaian Pembelajaran (CP)</h5>
              <p>Peserta didik dapat menyelesaikan persamaan dan pertidaksamaan linear satu variabel dengan berbagai cara pemodelan matematika dari masalah kontekstual.</p>
              <h5>B. Tujuan Pembelajaran (TP)</h5>
              <ul>
                <li><strong>TP.01:</strong> Mengidentifikasi masalah kontekstual yang dapat dimodelkan menjadi persamaan linear satu variabel.</li>
                <li><strong>TP.02:</strong> Menentukan nilai variabel pengganti yang membuat persamaan bernilai benar menggunakan prinsip kesetaraan.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: 2,
        title: 'Bagian II: Langkah Kegiatan Pembelajaran (PBL)',
        content: `
          <div class="doc-page-canvas">
            <div class="doc-section-block">
              <h5>C. Urutan Kegiatan Pembelajaran (80 Menit)</h5>
              
              <div class="doc-activity-stage">
                <span class="stage-tag intro">Kegiatan Awal (10 Menit)</span>
                <p>1. Guru membuka kelas dengan salam, presensi 1-tap via KLASSA, dan apersepsi timbangan neraca setimbang.</p>
                <p>2. Menyampaikan tujuan pembelajaran dan manfaat PLSV dalam belanja sehari-hari.</p>
              </div>

              <div class="doc-activity-stage main">
                <span class="stage-tag main">Kegiatan Inti — Sintaks PBL (60 Menit)</span>
                <p><strong>Fase 1: Orientasi Masalah</strong> — Siswa mengamati stimulus visual belanja buah dengan harga total diketahui.</p>
                <p><strong>Fase 2: Organisasi Belajar</strong> — Siswa dibagi ke dalam kelompok heterogen 4 orang dan menerima LKPD.</p>
                <p><strong>Fase 3: Penyelidikan Mandiri</strong> — Guru membimbing kelompok memodelkan kalimat cerita ke bentuk <em>ax + b = c</em>.</p>
                <p><strong>Fase 4: Penyajian Hasil</strong> — 2 kelompok mempresentasikan strategi penyelesaian di depan kelas.</p>
                <p><strong>Fase 5: Evaluasi & Refleksi</strong> — Guru bersama siswa menarik kesimpulan sifat kesetaraan aljabar.</p>
              </div>

              <div class="doc-activity-stage close">
                <span class="stage-tag close">Kegiatan Penutup (10 Menit)</span>
                <p>Refleksi pembelajaran, kuis 3 menit di HP siswa, dan penyampaian materi pertemuan berikutnya.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        num: 3,
        title: 'Bagian III: Asesmen & Refleksi Guru',
        content: `
          <div class="doc-page-canvas">
            <div class="doc-section-block">
              <h5>D. Rancangan Asesmen</h5>
              <table class="doc-data-table">
                <thead>
                  <tr><th>Jenis Asesmen</th><th>Bentuk Instrumen</th><th>Waktu Pelaksanaan</th></tr>
                </thead>
                <tbody>
                  <tr><td>Asesmen Diagnostik</td><td>Tanya Jawab Operasi Bilangan Bulat</td><td>Awal Pertemuan</td></tr>
                  <tr><td>Asesmen Formatif</td><td>Lembar Observasi Diskusi & LKPD #01</td><td>Saat Kegiatan Inti</td></tr>
                  <tr><td>Asesmen Sumatif</td><td>Kuis Digital Anti-Contek (3 Soal)</td><td>Akhir Pembelajaran</td></tr>
                </tbody>
              </table>

              <h5>E. Instrumen Refleksi Guru</h5>
              <div class="doc-reflection-box">
                <p>• Apakah seluruh siswa terlibat aktif dalam pemodelan persamaan linear?</p>
                <p>• Bagian manakah yang membutuhkan penguatan scaffolding pada pertemuan berikutnya?</p>
              </div>
            </div>
          </div>
        `
      }
    ]
  },
  soal: {
    id: 'soal',
    displayName: 'Bank Soal & Kisi-Kisi',
    icon: 'check-square',
    subject: 'IPA',
    grade: 'Kelas VIII',
    topic: 'Sistem Pernapasan Manusia',
    instruction: 'Buat 5 butir soal pilihan ganda HOTS dan 1 esai analitik tentang mekanisme pertukaran gas alveolus, lengkapi kisi-kisi dan rubrik pembahasan.',
    docTypeBadge: 'Bank Soal & Kisi-Kisi',
    formatTag: 'Format: XLSX / CBT Online Ready',
    questions: [
      {
        num: 1,
        level: 'HOTS (C4 - Analisis)',
        indicator: 'Menganalisis dampak perubahan tekanan rongga dada terhadap pertukaran gas',
        questionText: 'Seorang atlet berlari cepat sejauh 400 meter. Setelah mencapai garis finis, frekuensi pernapasan atlet tersebut meningkat drastis. Faktor fisiologis utama yang memicu peningkatan frekuensi pernapasan tersebut adalah...',
        options: [
          'A. Penurunan kadar hemoglobin dalam sel darah merah',
          'B. Peningkatan konsentrasi CO₂ dan penurunan pH darah yang dideteksi oleh medula oblongata',
          'C. Penumpukan gas oksigen yang berlebihan di dalam alveolus',
          'D. Kontraksi otot diafragma yang melambat akibat kelelahan otot'
        ],
        correct: 'B',
        explanation: 'Saat berolahraga berat, respirasi seluler menghasilkan CO₂ tinggi. CO₂ bereaksi dengan air membentuk asam karbonat yang menurunkan pH darah. Pusat pernapasan di medula oblongata merespons penurunan pH ini dengan meningkatkan laju ventilasi paru-paru.'
      },
      {
        num: 2,
        level: 'C2 (Pemahaman Konseptual)',
        indicator: 'Mengidentifikasi struktur alveolus yang mendukung difusi gas efisien',
        questionText: 'Alveolus pada paru-paru manusia memiliki dinding yang sangat tipis dan dikelilingi oleh jaring-jaring kapiler darah yang rapat. Adaptasi struktural ini bertujuan untuk...',
        options: [
          'A. Mempercepat laju difusi gas oksigen dan karbon dioksida dengan memperluas bidang permukaan',
          'B. Mencegah debu dan mikroorganisme masuk ke saluran bronkus',
          'C. Menghangatkan udara dingin yang masuk dari hidung',
          'D. Menghasilkan lendir pembersih silia paru-paru'
        ],
        correct: 'A',
        explanation: 'Dinding tipis (satu lapis epitel) dan luas permukaan alveolus yang besar meminimalkan jarak difusi sehingga pertukaran gas O₂ dan CO₂ berlangsung sangat efisien.'
      }
    ]
  },
  lkpd: {
    id: 'lkpd',
    displayName: 'LKPD',
    icon: 'layout-template',
    subject: 'Bahasa Indonesia',
    grade: 'Kelas VII',
    topic: 'Teks Deskripsi',
    instruction: 'Rancang LKPD observasi lingkungan sekolah untuk melatih keterampilan menulis teks deskripsi dengan rubrik panca indera.',
    docTypeBadge: 'LKPD Siswa',
    formatTag: 'Format: DOCX (Word) • Siap Cetak Siswa',
    content: `
      <div class="worksheet-canvas">
        <div class="ws-header">
          <div class="ws-title-badge">LEMBAR KERJA PESERTA DIDIK (LKPD)</div>
          <h4>Petualangan Mengamati: Menjelajah Objek dengan Panca Indera</h4>
          <div class="ws-student-meta">
            <span>Nama Siswa: ____________________</span>
            <span>Kelas: VII - ____</span>
            <span>Kelompok: ____</span>
          </div>
        </div>

        <div class="ws-section">
          <span class="ws-step-tag">Aktivitas 1: Stimulus Pengamatan</span>
          <p>Pilihlah salah satu sudut sekolah (misal: Perpustakaan, Kantin, Taman Sekolah, atau Laboratorium). Amati suasana sekitarmu selama 5 menit secara hening.</p>
        </div>

        <div class="ws-section">
          <span class="ws-step-tag">Aktivitas 2: Matriks Panca Indera</span>
          <table class="ws-table">
            <thead>
              <tr><th>Panca Indera</th><th>Apa yang Anda Rasakan / Amati?</th><th>Pilihan Kata Konkret</th></tr>
            </thead>
            <tbody>
              <tr><td>👀 Penglihatan</td><td>Warna daun, susunan buku, cahaya jendela...</td><td><em>Contoh: Hijau pupus, remang keemasan</em></td></tr>
              <tr><td>👂 Pendengaran</td><td>Suara gesekan kertas, gemerisik dedaunan...</td><td><em>Contoh: Gemerisik lirih, sayup-sayup</em></td></tr>
              <tr><td>👃 Penciuman / Peraba</td><td>Aroma rumput basah, tekstur meja kayu...</td><td><em>Contoh: Lembap segar, kasar berurat</em></td></tr>
            </tbody>
          </table>
        </div>

        <div class="ws-section">
          <span class="ws-step-tag">Aktivitas 3: Rangkai Menjadi 1 Paragraf Deskripsi Utuh</span>
          <div class="ws-writing-box">
            <span class="ws-line"></span>
            <span class="ws-line"></span>
            <span class="ws-line"></span>
          </div>
        </div>
      </div>
    `
  },
  bacaan: {
    id: 'bacaan',
    displayName: 'Bahan Bacaan',
    icon: 'book-open',
    subject: 'IPAS',
    grade: 'Kelas V',
    topic: 'Siklus Air (Hidrologi)',
    instruction: 'Susun bahan bacaan bertingkat tentang siklus hidrologi untuk 2 tingkat kesiapan belajar (Tingkat Dasar & Tingkat Pengayaan) beserta glosarium.',
    docTypeBadge: 'Bahan Bacaan Berdiferensiasi',
    formatTag: 'Format: DOCX (Word) • Berdiferensiasi',
    levels: {
      dasar: {
        label: 'Tingkat Kesiapan Dasar (Analogi & Visual Sederhana)',
        content: `
          <div class="reading-material-box">
            <div class="rm-header">
              <span class="rm-badge blue">Tingkat Dasar • Bahasa Kontekstual</span>
              <h4>Petualangan Tetes Air: Dari Samudra Kembali ke Samudra</h4>
            </div>
            <div class="rm-story">
              <p>Pernahkah kalian berpikir dari mana asal air hujan yang membasahi jendela rumahmu? Air di bumi kita tidak pernah bertambah dan tidak pernah hilang. Air hanya terus berputar seperti komidi putar raksasa!</p>
              <div class="rm-analogy-card">
                <strong>💡 Analogi Panci Rebus:</strong> Ketika ibu merebus air di dapur, uap air akan naik ke atas. Begitu juga air laut yang dipanaskan oleh sinar matahari. Uap air naik ke langit membentuk awan putih.
              </div>
              <div class="rm-vocab-cluster">
                <span class="v-tag"><strong>Evaporasi:</strong> Penguapan air oleh matahari</span>
                <span class="v-tag"><strong>Kondensasi:</strong> Uap air berubah jadi awan</span>
                <span class="v-tag"><strong>Presipitasi:</strong> Turunnya air hujan ke bumi</span>
              </div>
            </div>
          </div>
        `
      },
      pengayaan: {
        label: 'Tingkat Pengayaan (Konsep Ilmiah & Dampak Ekologis)',
        content: `
          <div class="reading-material-box">
            <div class="rm-header">
              <span class="rm-badge purple">Tingkat Pengayaan • Analisis Ekologis</span>
              <h4>Dinamika Siklus Hidrologi & Dampak Alih Fungsi Lahan</h4>
            </div>
            <div class="rm-story">
              <p>Siklus hidrologi adalah sirkulasi air yang tidak pernah berhenti dari atmosfer ke bumi dan kembali lagi melalui proses evaporasi, transpirasi vegetasi, kondensasi, presipitasi, dan infiltrasi air tanah.</p>
              <div class="rm-analogy-card purple-card">
                <strong>🌳 Peran Infiltrasi & Hutan:</strong> Hutan bertindak sebagai spons alami. Ketika tutupan pohon berkurang akibat deforestasi, air hujan langsung menjadi limpasan permukaan (surface runoff) yang memicu erosi dan banjir bandang.
              </div>
              <div class="rm-vocab-cluster">
                <span class="v-tag"><strong>Transpirasi:</strong> Penguapan air dari stomata tumbuhan</span>
                <span class="v-tag"><strong>Perkolasi:</strong> Gerak air meresap ke lapisan akuifer</span>
              </div>
            </div>
          </div>
        `
      }
    }
  },
  rubrik: {
    id: 'rubrik',
    displayName: 'Rubrik Penilaian',
    icon: 'award',
    subject: 'Seni Budaya',
    grade: 'Kelas VIII',
    topic: 'Presentasi Karya Seni Rupa',
    instruction: 'Buat rubrik asesmen autentik 4 level pencapaian untuk menilai penguasaan teknik, kreativitas, dan artikulasi presentasi karya seni rupa.',
    docTypeBadge: 'Rubrik Asesmen Autentik',
    formatTag: 'Format: DOCX / PDF • Rubrik Autentik 4 Level',
    content: `
      <div class="rubric-canvas">
        <div class="rubric-top-meta">
          <h4>Rubrik Penilaian Presentasi & Apresiasi Karya Seni Rupa</h4>
          <p>Panduan Asesmen Otentik Kurikulum Merdeka (4 Kategori Pencapaian)</p>
        </div>
        <table class="rubric-table">
          <thead>
            <tr>
              <th style="width: 22%;">Kriteria</th>
              <th style="width: 19%;">Perlu Bimbingan (1)</th>
              <th style="width: 19%;">Cukup (2)</th>
              <th style="width: 20%;">Cakap (3)</th>
              <th style="width: 20%;" class="highlight-mahir">Mahir (4)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Penguasaan Teknik & Komposisi</strong></td>
              <td>Belum mampu menjelaskan teknik dan komposisi warna karya.</td>
              <td>Menjelaskan teknik dasar namun belum runtut menguraikan pilihan warna.</td>
              <td>Mampu menguraikan teknik lukis, proporsi, dan pencahayaan dengan tepat.</td>
              <td class="cell-mahir">Menjelaskan filosofi pemilihan teknik, medium, dan harmoni komposisi secara komprehensif.</td>
            </tr>
            <tr>
              <td><strong>Kreativitas & Orisinalitas</strong></td>
              <td>Karya meniru penuh contoh tanpa ada gagasan mandiri.</td>
              <td>Menunjukkan sedikit modifikasi dari contoh referensi.</td>
              <td>Memiliki gagasan orisinal dan variasi visual yang menarik.</td>
              <td class="cell-mahir">Menghasilkan karya yang sangat unik, bermakna simbolik mendalam, dan berani bereksplorasi.</td>
            </tr>
            <tr>
              <td><strong>Artikulasi Presentasi</strong></td>
              <td>Suara pelan, membaca teks, dan tidak ada kontak mata.</td>
              <td>Menyampaikan poin utama namun kurang percaya diri saat tanya jawab.</td>
              <td>Presentasi percaya diri, kontak mata baik, dan artikulasi jelas.</td>
              <td class="cell-mahir">Sangat komunikatif, artikulatif, responsif terhadap umpan balik, dan menginspirasi audiens.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  }
};

let activeAiGeneratorId = 'ppt';
let currentPptSlideIdx = 0;
let currentModulPageIdx = 0;
let activeReadingLevel = 'dasar';
let isAnswerKeyVisible = false;

function selectAiGenerator(genId) {
  if (!aiScenariosData[genId]) return;
  activeAiGeneratorId = genId;
  currentPptSlideIdx = 0;
  currentModulPageIdx = 0;
  isAnswerKeyVisible = false;

  // 1. Update tabs state
  const cards = document.querySelectorAll('.ai-generator-card');
  cards.forEach(card => {
    const isAct = card.getAttribute('data-gen') === genId;
    card.classList.toggle('active', isAct);
    card.setAttribute('aria-selected', isAct ? 'true' : 'false');
  });

  // 2. Update Left Instruction Panel
  const scenario = aiScenariosData[genId];
  const subjectEl = document.getElementById('ai-meta-subject');
  const gradeEl = document.getElementById('ai-meta-grade');
  const topicEl = document.getElementById('ai-meta-topic');
  const instTextEl = document.getElementById('ai-inst-text');
  const docTypeBadge = document.getElementById('ai-doc-type-text');
  const docFormatTag = document.getElementById('ai-doc-format-tag');

  if (subjectEl) subjectEl.textContent = scenario.subject;
  if (gradeEl) gradeEl.textContent = scenario.grade;
  if (topicEl) topicEl.textContent = scenario.topic;
  if (instTextEl) instTextEl.textContent = `"${scenario.instruction}"`;
  if (docTypeBadge) docTypeBadge.textContent = scenario.docTypeBadge;
  if (docFormatTag) docFormatTag.innerHTML = `<span>${scenario.formatTag}</span>`;

  // 3. Render Right Output Viewport
  renderAiOutputViewport();

  // Refresh icons
  if (window.lucide) window.lucide.createIcons();
}

function triggerAiOutputPreview() {
  const stage = document.getElementById('ai-preview-stage');
  if (stage) {
    stage.classList.remove('pulse-reveal');
    void stage.offsetWidth;
    stage.classList.add('pulse-reveal');
  }
  renderAiOutputViewport();
}

function switchPptSlide(slideIdx) {
  const scenario = aiScenariosData.ppt;
  if (!scenario || slideIdx < 0 || slideIdx >= scenario.slides.length) return;
  currentPptSlideIdx = slideIdx;
  renderAiOutputViewport();
}

function switchModulPage(pageIdx) {
  const scenario = aiScenariosData.modul;
  if (!scenario || pageIdx < 0 || pageIdx >= scenario.pages.length) return;
  currentModulPageIdx = pageIdx;
  renderAiOutputViewport();
}

function toggleAnswerKey() {
  isAnswerKeyVisible = !isAnswerKeyVisible;
  renderAiOutputViewport();
}

function switchReadingLevel(levelId) {
  activeReadingLevel = levelId;
  renderAiOutputViewport();
}

function renderAiOutputViewport() {
  const viewport = document.getElementById('ai-canvas-viewport');
  if (!viewport) return;

  const genId = activeAiGeneratorId;
  const scenario = aiScenariosData[genId];

  if (genId === 'ppt') {
    const s = scenario.slides[currentPptSlideIdx];
    viewport.innerHTML = `
      <div class="ai-ppt-deck-viewer fade-in">
        <!-- Slide Top Nav Bar -->
        <div class="ppt-top-nav">
          <div class="ppt-slide-counter">
            <span>Slide <strong>${currentPptSlideIdx + 1}</strong> dari ${scenario.slides.length}</span>
          </div>
          <div class="ppt-nav-actions">
            <button type="button" class="ppt-btn-prev" onclick="switchPptSlide(${currentPptSlideIdx - 1})" ${currentPptSlideIdx === 0 ? 'disabled' : ''}>
              <i data-lucide="chevron-left"></i>
            </button>
            <button type="button" class="ppt-btn-next" onclick="switchPptSlide(${currentPptSlideIdx + 1})" ${currentPptSlideIdx === scenario.slides.length - 1 ? 'disabled' : ''}>
              <i data-lucide="chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- Main Slide Presentation Canvas (16:9 Aspect Ratio) -->
        <div class="ppt-slide-canvas">
          ${s.content}
        </div>

        <!-- Interactive Slide Thumbnails Strip -->
        <div class="ppt-thumbnails-strip">
          ${scenario.slides.map((sl, idx) => `
            <button type="button" class="ppt-thumb-btn ${idx === currentPptSlideIdx ? 'active' : ''}" onclick="switchPptSlide(${idx})">
              <span class="thumb-num">0${sl.num}</span>
              <span class="thumb-label">${sl.title}</span>
            </button>
          `).join('')}
        </div>

        <!-- Speaker Notes Bar -->
        <div class="ppt-speaker-notes-bar">
          <div class="notes-badge">🎙️ Speaker Notes Guru:</div>
          <p class="notes-text">${s.speakerNotes}</p>
        </div>
      </div>
    `;
  } else if (genId === 'modul') {
    const p = scenario.pages[currentModulPageIdx];
    viewport.innerHTML = `
      <div class="ai-modul-viewer fade-in">
        <!-- Page Tab Switcher -->
        <div class="modul-page-tabs">
          ${scenario.pages.map((pg, idx) => `
            <button type="button" class="modul-tab-btn ${idx === currentModulPageIdx ? 'active' : ''}" onclick="switchModulPage(${idx})">
              <span>Halaman ${pg.num}</span>
            </button>
          `).join('')}
        </div>

        <!-- Render Page Canvas -->
        <div class="modul-page-container">
          <div class="page-title-banner">${p.title}</div>
          ${p.content}
        </div>
      </div>
    `;
  } else if (genId === 'soal') {
    viewport.innerHTML = `
      <div class="ai-soal-viewer fade-in">
        <div class="soal-top-control">
          <div class="soal-meta-badge">📋 Bank Soal Formatif (Kurikulum Merdeka)</div>
          <button type="button" class="btn-toggle-key ${isAnswerKeyVisible ? 'active' : ''}" onclick="toggleAnswerKey()">
            <i data-lucide="${isAnswerKeyVisible ? 'eye-off' : 'eye'}"></i>
            <span>${isAnswerKeyVisible ? 'Sembunyikan Kunci' : 'Tampilkan Kunci & Pembahasan'}</span>
          </button>
        </div>

        <div class="soal-cards-stack">
          ${scenario.questions.map(q => `
            <div class="soal-item-card">
              <div class="soal-card-head">
                <span class="soal-num">Soal #${q.num}</span>
                <span class="soal-level-pill">${q.level}</span>
                <span class="soal-ind-text">${q.indicator}</span>
              </div>
              <p class="soal-stem">${q.questionText}</p>
              <div class="soal-options-list">
                ${q.options.map(opt => {
                  const optLetter = opt.charAt(0);
                  const isCorrect = optLetter === q.correct;
                  return `
                    <div class="opt-row ${isAnswerKeyVisible && isCorrect ? 'correct-highlight' : ''}">
                      <span>${opt}</span>
                      ${isAnswerKeyVisible && isCorrect ? '<span class="key-check">✓ Kunci</span>' : ''}
                    </div>
                  `;
                }).join('')}
              </div>
              ${isAnswerKeyVisible ? `
                <div class="soal-explanation-box">
                  <strong>💡 Pembahasan Pedagogis:</strong>
                  <p>${q.explanation}</p>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (genId === 'lkpd') {
    viewport.innerHTML = `
      <div class="ai-lkpd-viewer fade-in">
        ${scenario.content}
      </div>
    `;
  } else if (genId === 'bacaan') {
    const curLevel = scenario.levels[activeReadingLevel];
    viewport.innerHTML = `
      <div class="ai-bacaan-viewer fade-in">
        <div class="bacaan-level-tabs">
          <button type="button" class="b-tab ${activeReadingLevel === 'dasar' ? 'active' : ''}" onclick="switchReadingLevel('dasar')">
            <span>Level 1: Kesiapan Dasar</span>
          </button>
          <button type="button" class="b-tab ${activeReadingLevel === 'pengayaan' ? 'active' : ''}" onclick="switchReadingLevel('pengayaan')">
            <span>Level 2: Pengayaan</span>
          </button>
        </div>
        <div class="bacaan-content-wrap">
          ${curLevel.content}
        </div>
      </div>
    `;
  } else if (genId === 'rubrik') {
    viewport.innerHTML = `
      <div class="ai-rubrik-viewer fade-in">
        ${scenario.content}
      </div>
    `;
  }

  // Refresh Lucide icons
  if (window.lucide) window.lucide.createIcons();
}

function initAiContentStudio() {
  const panel = document.getElementById('ai-studio-master-panel');
  if (!panel) return;

  // Initialize with PPT generator (Default Active)
  selectAiGenerator('ppt');
}

// Global exposure for AI Content Studio
window.selectAiGenerator = selectAiGenerator;
window.triggerAiOutputPreview = triggerAiOutputPreview;
window.switchPptSlide = switchPptSlide;
window.switchModulPage = switchModulPage;
window.toggleAnswerKey = toggleAnswerKey;
window.switchReadingLevel = switchReadingLevel;
window.initAiContentStudio = initAiContentStudio;

/* ============================================================================
   20. KLASSA QUIZ ONLINE & CBT LIGHT ENGINE (INTERACTIVE SIMULATION)
   ============================================================================ */
const cbtScenesData = [
  {
    index: 0,
    tag: 'SCENE 01 • PERSIAPAN GURU',
    title: 'Siapkan Ujian Tanpa Alur yang Berbelit',
    desc: 'Susun soal, atur durasi, aktifkan pengacakan, lalu bagikan akses ujian kepada siswa.'
  },
  {
    index: 1,
    tag: 'SCENE 02 • PENGALAMAN SISWA',
    title: 'Siswa Mengerjakan. Fokus Tetap Terjaga.',
    desc: 'Siswa mengakses ujian melalui tautan dan PIN, lalu mengerjakan soal dengan alur yang jelas dan mudah diikuti.'
  },
  {
    index: 2,
    tag: 'SCENE 03 • HASIL & ANALITIK',
    title: 'Bukan Sekadar Nilai. Temukan Apa yang Perlu Diperbaiki.',
    desc: 'Koreksi otomatis dan analitik per soal membantu guru memahami hasil evaluasi sebelum menerbitkannya ke Buku Nilai.'
  }
];

const cbtQuestionsData = [
  {
    num: 1,
    stem: 'Organ yang menjadi tempat utama pertukaran gas oksigen (O₂) dan karbon dioksida (CO₂) di dalam paru-paru adalah ...',
    options: [
      { id: 'A', text: 'Trakea (Batang Tenggorokan)' },
      { id: 'B', text: 'Alveolus (Kantung Udara Paru-Paru)', isCorrect: true },
      { id: 'C', text: 'Bronkus (Cabang Tenggorokan)' },
      { id: 'D', text: 'Laring (Kotak Suara)' }
    ],
    hint: 'Bentuknya berupa gelembung-gelembung halus dengan dinding tipis dan dikelilingi kapiler darah.'
  },
  {
    num: 2,
    stem: 'Saluran pernapasan yang dilapisi oleh sel-sel bersilia dan lendir untuk menyaring debu serta partikel mikroorganisme adalah ...',
    options: [
      { id: 'A', text: 'Bronkiolus' },
      { id: 'B', text: 'Trakea', isCorrect: true },
      { id: 'C', text: 'Faring' },
      { id: 'D', text: 'Diafragma' }
    ],
    hint: 'Silia berfungsi menyapu kotoran ke arah luar agar tidak masuk ke paru-paru.'
  },
  {
    num: 3,
    stem: 'Saat terjadi proses inspirasi pada mekanisme pernapasan dada, peristiwa yang dialami oleh otot antartulang rusuk dan rongga dada adalah ...',
    options: [
      { id: 'A', text: 'Otot antartulang rusuk relaksasi, volume rongga dada mengecil' },
      { id: 'B', text: 'Otot antartulang rusuk berkontraksi, volume rongga dada membesar', isCorrect: true },
      { id: 'C', text: 'Otot antartulang rusuk relaksasi, tekanan rongga dada meningkat' },
      { id: 'D', text: 'Otot antartulang rusuk berkontraksi, udara terdorong keluar' }
    ],
    hint: 'Kontraksi mengangkat tulang rusuk ke atas sehingga tekanan udara di paru-paru mengecil.'
  },
  {
    num: 4,
    stem: 'Gas buang hasil metabolisme respirasi seluler yang diangkut oleh sel darah merah kembali ke paru-paru untuk dihembuskan keluar adalah ...',
    options: [
      { id: 'A', text: 'Karbon dioksida (CO₂) dan uap air', isCorrect: true },
      { id: 'B', text: 'Oksigen murni (O₂)' },
      { id: 'C', text: 'Gas nitrogen bebas (N₂)' },
      { id: 'D', text: 'Gas karbon monoksida (CO)' }
    ],
    hint: 'Senyawa ini dihasilkan dari siklus perombakan glukosa di dalam mitokondria.'
  }
];

let cbtState = {
  activeScene: 0,
  currentQuestion: 0,
  studentAnswers: { 0: 1, 1: null, 2: null, 3: null },
  isSubmitted: false,
  gradebookSynced: false
};

function switchCbtScene(sceneIdx) {
  if (sceneIdx < 0 || sceneIdx > 2) return;
  cbtState.activeScene = sceneIdx;

  // Update tabs active state
  for (let i = 0; i <= 2; i++) {
    const tab = document.getElementById(`cbt-tab-${i}`);
    if (tab) {
      const isActive = (i === sceneIdx);
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    }
  }

  // Update header text
  const sceneInfo = cbtScenesData[sceneIdx];
  const tagEl = document.getElementById('cbt-scene-tag');
  const titleEl = document.getElementById('cbt-scene-title');
  const descEl = document.getElementById('cbt-scene-desc');

  if (tagEl) tagEl.textContent = sceneInfo.tag;
  if (titleEl) titleEl.textContent = sceneInfo.title;
  if (descEl) descEl.textContent = sceneInfo.desc;

  // Render viewport
  renderCbtSceneViewport();
}

function renderCbtSceneViewport() {
  const viewport = document.getElementById('cbt-canvas-viewport');
  if (!viewport) return;

  const scene = cbtState.activeScene;

  if (scene === 0) {
    // SCENE 01: PERSIAPAN GURU (Cinematic 3D Composition: Laptop Primary + Phone Secondary + 3D Fragments)
    viewport.innerHTML = `
      <div class="cbt-cinematic-stage scene-1-active fade-in">
        
        <!-- 3D Floating Fragment 1 (Top Left) -->
        <div class="cbt-float-fragment frag-ai" data-depth="0.15">
          <div class="frag-icon icon-purple">✦</div>
          <div class="frag-text">
            <span class="frag-label">AI Question Co-Pilot</span>
            <strong class="frag-val">15 Soal diselaraskan dengan TP IPA BSKAP</strong>
          </div>
        </div>

        <!-- 3D Floating Fragment 2 (Top Right) -->
        <div class="cbt-float-fragment frag-integrity" data-depth="0.2">
          <div class="frag-icon icon-emerald">🛡️</div>
          <div class="frag-text">
            <span class="frag-label">Integritas Asesmen</span>
            <strong class="frag-val">⏱️ 30m • 🔀 Acak Soal • PIN: 8249</strong>
          </div>
        </div>

        <!-- Dual Device 3D Workspace -->
        <div class="cbt-devices-workspace">
          
          <!-- 1. PRIMARY HERO OBJECT: Realistic Laptop Mockup -->
          <div class="cbt-laptop-hero">
            
            <!-- Laptop Display Lid -->
            <div class="laptop-lid">
              
              <!-- Screen Bezel & Camera -->
              <div class="laptop-bezel">
                <div class="laptop-camera"></div>
                
                <!-- Laptop Screen -->
                <div class="laptop-screen">
                  
                  <!-- Browser Topbar inside Laptop -->
                  <div class="laptop-browser-bar">
                    <div class="mac-dots">
                      <span class="m-dot red"></span>
                      <span class="m-dot yellow"></span>
                      <span class="m-dot green"></span>
                    </div>
                    <div class="mac-address">
                      <i data-lucide="lock" class="lock-icon"></i>
                      <span>app.klassa.id/ruang-evaluasi/buat-ujian-ipa8</span>
                    </div>
                    <div class="mac-status">
                      <span class="dot-live"></span>
                      <span>Draf Siap Terbit</span>
                    </div>
                  </div>

                  <!-- Teacher Console Content -->
                  <div class="laptop-inner-body">
                    
                    <!-- Quiz Title Header -->
                    <div class="l-quiz-head">
                      <div class="l-badge-row">
                        <span class="l-badge badge-teal">IPA • Fase D</span>
                        <span class="l-badge badge-gray">Kelas VIII-A</span>
                        <span class="l-badge badge-purple">✦ 15 Butir Soal Berbantuan AI</span>
                      </div>
                      <h4 class="l-quiz-title">Ulangan Harian: Sistem Pernapasan Manusia</h4>
                      <p class="l-quiz-sub">Evaluasi organ respirasi, mekanisme ventilasi, dan analisis gangguan pernapasan.</p>
                    </div>

                    <!-- Config Grid in Screen -->
                    <div class="l-config-grid">
                      
                      <div class="l-config-item">
                        <div class="l-item-head">
                          <i data-lucide="clock" class="text-teal"></i>
                          <span>Durasi Pengerjaan</span>
                        </div>
                        <div class="l-item-box">
                          <strong>30 Menit</strong>
                          <span class="l-chip chip-green">Hitung Mundur</span>
                        </div>
                      </div>

                      <div class="l-config-item">
                        <div class="l-item-head">
                          <i data-lucide="shuffle" class="text-emerald"></i>
                          <span>Pengacakan Anti-Contek</span>
                        </div>
                        <div class="l-item-box">
                          <span class="l-chip chip-teal">✓ Acak Soal</span>
                          <span class="l-chip chip-teal">✓ Acak Opsi A-D</span>
                        </div>
                      </div>

                      <div class="l-config-item l-item-full card-access-highlight">
                        <div class="l-item-head">
                          <i data-lucide="key-round" class="text-purple"></i>
                          <span>Tautan &amp; PIN Akses Siswa (Tanpa Akun Rumit)</span>
                        </div>
                        <div class="l-access-box">
                          <div class="l-url-pill">
                            <span class="url">klassa.id/cbt/ipa8-nafas</span>
                            <button type="button" class="btn-copy-mini" onclick="copyCbtLink(this)">
                              <i data-lucide="copy"></i>
                              <span>Salin</span>
                            </button>
                          </div>
                          <div class="l-pin-pill">
                            <span>PIN:</span>
                            <strong>8249</strong>
                          </div>
                        </div>
                      </div>

                    </div>

                    <!-- Quick Footer Bar in Laptop -->
                    <div class="l-action-bar">
                      <span class="l-action-hint">
                        <i data-lucide="info"></i>
                        <span>Siswa langsung mengerjakan dari HP mereka via tautan &amp; PIN.</span>
                      </span>
                      <button type="button" class="btn-sim-next" onclick="switchCbtScene(1)">
                        <span>Lihat Ujian Siswa</span>
                        <i data-lucide="arrow-right"></i>
                      </button>
                    </div>

                  </div>

                </div>
              </div>

            </div>

            <!-- Laptop Base Deck & Hinge -->
            <div class="laptop-base-deck">
              <div class="laptop-hinge"></div>
              <div class="laptop-trackpad-notch"></div>
            </div>
            <div class="laptop-shadow" aria-hidden="true"></div>

          </div>

          <!-- 2. SECONDARY HERO OBJECT: Realistic Smartphone (Overlapping right) -->
          <div class="cbt-phone-hero phone-preview-mode" onclick="switchCbtScene(1)" title="Klik untuk mencoba simulasi ujian siswa">
            
            <div class="phone-frame-3d">
              <div class="phone-dynamic-island">
                <span class="cam-dot"></span>
              </div>
              
              <div class="phone-screen-3d">
                
                <div class="p-status-mini">
                  <span>08:15</span>
                  <div class="p-net"><i data-lucide="wifi"></i><i data-lucide="battery"></i></div>
                </div>

                <div class="p-student-login-preview">
                  <div class="p-login-icon">📝</div>
                  <span class="p-login-tag">KLASSA CBT LIGHT</span>
                  <h5 class="p-login-title">Ulangan Harian IPA VIII</h5>
                  <p class="p-login-meta">Sistem Pernapasan • 15 Soal</p>

                  <div class="p-pin-preview-box">
                    <span class="pin-hint">Masukkan PIN Ujian:</span>
                    <div class="pin-digits-row">
                      <span class="p-digit">8</span>
                      <span class="p-digit">2</span>
                      <span class="p-digit">4</span>
                      <span class="p-digit">9</span>
                    </div>
                  </div>

                  <div class="p-btn-start-sim">
                    <span>Mulai Ujian</span>
                    <i data-lucide="arrow-right"></i>
                  </div>
                </div>

              </div>
            </div>
            
            <div class="phone-shadow" aria-hidden="true"></div>
            <div class="phone-touch-hint">✦ Klik untuk Uji Live</div>

          </div>

        </div>

      </div>
    `;
  } else if (scene === 1) {
    // SCENE 02: PENGALAMAN SISWA (Cinematic 3D: Phone Dominant in Center + Live Interactive Questions + Laptop in Depth)
    const qIndex = cbtState.currentQuestion;
    const curQ = cbtQuestionsData[qIndex];
    const selectedAns = cbtState.studentAnswers[qIndex];

    viewport.innerHTML = `
      <div class="cbt-cinematic-stage scene-2-active fade-in">
        
        <!-- 3D Floating Fragment 1 (Top Left) -->
        <div class="cbt-float-fragment frag-timer" data-depth="0.1">
          <div class="frag-icon icon-amber">⏱️</div>
          <div class="frag-text">
            <span class="frag-label">Sisa Waktu Ujian</span>
            <strong class="frag-val text-amber">24 Menit : 18 Detik</strong>
          </div>
        </div>

        <!-- 3D Floating Fragment 2 (Top Right) -->
        <div class="cbt-float-fragment frag-anti-cheat" data-depth="0.18">
          <div class="frag-icon icon-emerald">🛡️</div>
          <div class="frag-text">
            <span class="frag-label">Status Pengerjaan</span>
            <strong class="frag-val">Jawaban Tersimpan Otomatis</strong>
          </div>
        </div>

        <!-- Dual Device 3D Workspace -->
        <div class="cbt-devices-workspace">
          
          <!-- Background Receding Laptop (Teacher Monitor View) -->
          <div class="cbt-laptop-hero laptop-receding">
            <div class="laptop-lid">
              <div class="laptop-bezel">
                <div class="laptop-camera"></div>
                <div class="laptop-screen">
                  <div class="laptop-browser-bar">
                    <div class="mac-dots"><span class="m-dot red"></span><span class="m-dot yellow"></span><span class="m-dot green"></span></div>
                    <div class="mac-address"><span>app.klassa.id/ruang-evaluasi/live-monitor</span></div>
                    <div class="mac-status"><span class="dot-live"></span><span>32 Siswa Mengerjakan</span></div>
                  </div>
                  <div class="laptop-monitor-body">
                    <div class="live-monitor-header">
                      <strong>🔴 Live Monitor: Ulangan Harian IPA VIII</strong>
                      <span>32 / 32 Siswa Aktif Mengerjakan • Progres Rata-rata 60%</span>
                    </div>
                    <div class="student-mini-grid">
                      <span class="s-dot s-done">01 ✓</span>
                      <span class="s-dot s-active">02 ✍️ (Zaki)</span>
                      <span class="s-dot s-done">03 ✓</span>
                      <span class="s-dot s-active">04 ✍️</span>
                      <span class="s-dot s-done">05 ✓</span>
                      <span class="s-dot s-active">06 ✍️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="laptop-base-deck">
              <div class="laptop-hinge"></div>
            </div>
          </div>

          <!-- PRIMARY HERO OBJECT: Dominant Interactive Smartphone -->
          <div class="cbt-phone-hero phone-dominant-mode">
            
            <div class="phone-frame-3d">
              <div class="phone-dynamic-island">
                <span class="cam-dot"></span>
              </div>
              
              <div class="phone-screen-3d">
                
                <!-- Status Bar -->
                <div class="p-status-mini">
                  <span>08:15</span>
                  <div class="p-net"><i data-lucide="wifi"></i><i data-lucide="battery-charging"></i></div>
                </div>

                <!-- Exam Header -->
                <div class="p-exam-head">
                  <div class="p-head-row">
                    <span class="p-exam-title">IPA VIII • UH Pernapasan</span>
                    <span class="p-timer-badge"><i data-lucide="timer"></i> 24:18</span>
                  </div>
                  <div class="p-student-info">
                    <span class="s-av">👦</span>
                    <span class="s-name">Ahmad Zaki (Absen 02)</span>
                    <span class="s-badge">Aktif</span>
                  </div>
                </div>

                <!-- Question Navigation Pills -->
                <div class="p-question-nav">
                  <div class="p-nav-meta">
                    <span class="p-q-num">Soal ${qIndex + 1} dari ${cbtQuestionsData.length}</span>
                    <span class="p-q-type">Pilihan Ganda</span>
                  </div>
                  <div class="p-pills-wrap">
                    ${cbtQuestionsData.map((q, idx) => `
                      <button type="button" 
                        class="p-num-btn ${idx === qIndex ? 'active' : ''} ${cbtState.studentAnswers[idx] !== null ? 'answered' : ''}" 
                        onclick="navigateCbtQuestion(${idx})">
                        ${idx + 1}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Interactive Question Body -->
                <div class="p-question-body">
                  <p class="p-stem">${curQ.stem}</p>

                  <div class="p-options-wrap">
                    ${curQ.options.map((opt, optIdx) => `
                      <button type="button" 
                        class="p-opt-btn ${selectedAns === optIdx ? 'selected' : ''}" 
                        onclick="selectStudentAnswer(${qIndex}, ${optIdx})">
                        <span class="opt-k">${opt.id}</span>
                        <span class="opt-t">${opt.text}</span>
                        <span class="opt-check">
                          ${selectedAns === optIdx ? '<i data-lucide="check"></i>' : ''}
                        </span>
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Bottom Navigation Buttons -->
                <div class="p-bottom-bar">
                  <button type="button" class="btn-p-prev" 
                    ${qIndex === 0 ? 'disabled' : ''} 
                    onclick="navigateCbtQuestion(${Math.max(0, qIndex - 1)})">
                    <i data-lucide="chevron-left"></i>
                    <span>Sebelumnya</span>
                  </button>

                  ${qIndex < cbtQuestionsData.length - 1 ? `
                    <button type="button" class="btn-p-next" onclick="navigateCbtQuestion(${qIndex + 1})">
                      <span>Berikutnya</span>
                      <i data-lucide="chevron-right"></i>
                    </button>
                  ` : `
                    <button type="button" class="btn-p-submit" onclick="submitStudentExam()">
                      <i data-lucide="send"></i>
                      <span>Kirim Ujian</span>
                    </button>
                  `}
                </div>

              </div>
            </div>
            
            <div class="phone-shadow" aria-hidden="true"></div>

          </div>

        </div>

      </div>
    `;
  } else if (scene === 2) {
    // SCENE 03: HASIL & ANALITIK (Cinematic 3D: Laptop Primary with Analytics + Phone Secondary with Score Receipt)
    viewport.innerHTML = `
      <div class="cbt-cinematic-stage scene-3-active fade-in">
        
        <!-- 3D Floating Fragment 1 (Top Left) -->
        <div class="cbt-float-fragment frag-analytics" data-depth="0.15">
          <div class="frag-icon icon-teal">📊</div>
          <div class="frag-text">
            <span class="frag-label">Analisis Butir Soal Real-Time</span>
            <strong class="frag-val">Koreksi otomatis 32 siswa selesai</strong>
          </div>
        </div>

        <!-- 3D Floating Fragment 2 (Top Right) -->
        <div class="cbt-float-fragment frag-remedial" data-depth="0.2">
          <div class="frag-icon icon-amber">⚠️</div>
          <div class="frag-text">
            <span class="frag-label">Rekomendasi Tindak Lanjut</span>
            <strong class="frag-val text-amber">Soal 03 (42%): Butuh Penguatan Konsep</strong>
          </div>
        </div>

        <!-- Dual Device 3D Workspace -->
        <div class="cbt-devices-workspace">
          
          <!-- 1. PRIMARY HERO OBJECT: Realistic Laptop Mockup with Analytics & Gradebook -->
          <div class="cbt-laptop-hero">
            
            <div class="laptop-lid">
              <div class="laptop-bezel">
                <div class="laptop-camera"></div>
                
                <div class="laptop-screen">
                  
                  <div class="laptop-browser-bar">
                    <div class="mac-dots"><span class="m-dot red"></span><span class="m-dot yellow"></span><span class="m-dot green"></span></div>
                    <div class="mac-address">
                      <i data-lucide="lock" class="lock-icon"></i>
                      <span>app.klassa.id/ruang-evaluasi/rekap-analitik-ipa8</span>
                    </div>
                    <div class="mac-status">
                      <span class="dot-live"></span>
                      <span>Koreksi Selesai (100%)</span>
                    </div>
                  </div>

                  <div class="laptop-inner-body">
                    
                    <!-- Metrics Summary Strip -->
                    <div class="l-metrics-strip">
                      <div class="l-m-card">
                        <span class="l-m-val">32 <small>/ 32</small></span>
                        <span class="l-m-label">Total Peserta (100%)</span>
                      </div>
                      <div class="l-m-card">
                        <span class="l-m-val text-teal">84 <small>/ 100</small></span>
                        <span class="l-m-label">Rata-Rata Nilai Kelas</span>
                      </div>
                      <div class="l-m-card">
                        <span class="l-m-val text-emerald">78%</span>
                        <span class="l-m-label">25 Siswa Tuntas KKTP (75)</span>
                      </div>
                    </div>

                    <!-- Question Analytics Breakdown Table -->
                    <div class="l-q-table">
                      <div class="l-table-head">
                        <span>Analisis Daya Serap Butir Soal</span>
                        <small>Identifikasi materi yang membutuhkan penguatan</small>
                      </div>

                      <div class="l-q-rows">
                        
                        <!-- Soal 1 -->
                        <div class="l-row">
                          <div class="l-row-left">
                            <span class="l-q-tag">No 01</span>
                            <span class="l-q-name">Pertukaran Gas (Alveolus)</span>
                          </div>
                          <div class="l-row-bar">
                            <div class="bar-fill fill-green" style="width: 88%"></div>
                          </div>
                          <div class="l-row-stat">
                            <strong>88%</strong>
                            <span class="badge-s-green">Tuntas Tinggi</span>
                          </div>
                        </div>

                        <!-- Soal 2 -->
                        <div class="l-row">
                          <div class="l-row-left">
                            <span class="l-q-tag">No 02</span>
                            <span class="l-q-name">Fungsi Silia Trakea</span>
                          </div>
                          <div class="l-row-bar">
                            <div class="bar-fill fill-teal" style="width: 65%"></div>
                          </div>
                          <div class="l-row-stat">
                            <strong>65%</strong>
                            <span class="badge-s-teal">Cukup</span>
                          </div>
                        </div>

                        <!-- Soal 3 (HIGHLIGHTED ATTENTION ROW!) -->
                        <div class="l-row row-warn-attention">
                          <div class="l-row-left">
                            <span class="l-q-tag tag-warn">No 03</span>
                            <span class="l-q-name">Mekanisme Inspirasi Dada</span>
                            <span class="warn-pill">⚠️ Perlu Penguatan</span>
                          </div>
                          <div class="l-row-bar">
                            <div class="bar-fill fill-amber" style="width: 42%"></div>
                          </div>
                          <div class="l-row-stat">
                            <strong class="text-amber">42%</strong>
                            <span class="badge-s-amber">Remedial</span>
                          </div>
                        </div>

                        <!-- Soal 4 -->
                        <div class="l-row">
                          <div class="l-row-left">
                            <span class="l-q-tag">No 04</span>
                            <span class="l-q-name">Gas Buang Respirasi (CO₂)</span>
                          </div>
                          <div class="l-row-bar">
                            <div class="bar-fill fill-green" style="width: 94%"></div>
                          </div>
                          <div class="l-row-stat">
                            <strong>94%</strong>
                            <span class="badge-s-green">Sangat Tinggi</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    <!-- Gradebook Integration Card -->
                    <div class="l-gradebook-card">
                      <div class="gb-info">
                        <i data-lucide="book-check" class="gb-icon-svg"></i>
                        <div>
                          <strong>Terhubung dengan Buku Nilai (Ruang Penilaian)</strong>
                          <p>Sinkronkan 32 nilai siswa langsung ke rekap capaian rapor.</p>
                        </div>
                      </div>
                      <button type="button" 
                        class="btn-sync-action ${cbtState.gradebookSynced ? 'synced' : ''}" 
                        onclick="toggleGradebookPublish()">
                        <i data-lucide="${cbtState.gradebookSynced ? 'check-circle' : 'upload-cloud'}"></i>
                        <span>${cbtState.gradebookSynced ? '✓ Nilai Diterbitkan ke Buku Nilai' : 'Terbitkan ke Buku Nilai'}</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            <div class="laptop-base-deck">
              <div class="laptop-hinge"></div>
              <div class="laptop-trackpad-notch"></div>
            </div>
            <div class="laptop-shadow" aria-hidden="true"></div>

          </div>

          <!-- 2. SECONDARY HERO OBJECT: Smartphone with Student Score Receipt -->
          <div class="cbt-phone-hero phone-receipt-mode">
            
            <div class="phone-frame-3d">
              <div class="phone-dynamic-island">
                <span class="cam-dot"></span>
              </div>
              
              <div class="phone-screen-3d">
                
                <div class="p-status-mini">
                  <span>08:45</span>
                  <div class="p-net"><i data-lucide="wifi"></i><i data-lucide="battery"></i></div>
                </div>

                <div class="p-receipt-card">
                  <div class="receipt-icon">🎉</div>
                  <span class="receipt-tag">HASIL EVALUASI SISWA</span>
                  <h5 class="receipt-name">Ahmad Zaki</h5>
                  <p class="receipt-subject">Ulangan Harian IPA VIII</p>

                  <div class="receipt-score-circle">
                    <span class="score-num">85</span>
                    <span class="score-total">/ 100</span>
                  </div>

                  <div class="receipt-status-pill">
                    <i data-lucide="check-circle-2"></i>
                    <span>Tuntas di Atas KKTP (75)</span>
                  </div>

                  <div class="receipt-feedback">
                    <small>Catatan Guru:</small>
                    <p>"Pemahaman organ sangat baik. Perlu penguatan pada mekanisme pernapasan dada."</p>
                  </div>
                </div>

              </div>
            </div>
            
            <div class="phone-shadow" aria-hidden="true"></div>

          </div>

        </div>

      </div>
    `;
  }

  // Refresh Lucide icons in rendered viewport
  if (window.lucide) window.lucide.createIcons();
}

function selectStudentAnswer(qIndex, optIndex) {
  cbtState.studentAnswers[qIndex] = optIndex;
  renderCbtSceneViewport();
}

function navigateCbtQuestion(qIndex) {
  if (qIndex < 0 || qIndex >= cbtQuestionsData.length) return;
  cbtState.currentQuestion = qIndex;
  renderCbtSceneViewport();
}

function submitStudentExam() {
  cbtState.isSubmitted = true;
  
  const viewport = document.getElementById('cbt-canvas-viewport');
  if (!viewport) return;

  const answeredCount = Object.values(cbtState.studentAnswers).filter(val => val !== null).length;

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'cbt-submit-modal-overlay fade-in';
  modalOverlay.innerHTML = `
    <div class="cbt-submit-modal-card">
      <div class="modal-success-icon">
        <i data-lucide="check-circle-2"></i>
      </div>
      <h3 class="modal-title">Ujian Berhasil Dikirim!</h3>
      <p class="modal-desc">
        ${answeredCount} dari 4 soal telah dijawab. Sistem otomatis mengoreksi pilihan ganda dan mengirimkan data ke rekap guru.
      </p>
      <div class="modal-actions">
        <button type="button" class="btn btn-primary" onclick="switchCbtScene(2)">
          <span>Lihat Hasil &amp; Analitik Guru (Scene 03)</span>
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
    </div>
  `;
  viewport.appendChild(modalOverlay);
  if (window.lucide) window.lucide.createIcons();
}

function toggleGradebookPublish() {
  cbtState.gradebookSynced = !cbtState.gradebookSynced;
  renderCbtSceneViewport();
}

function copyCbtLink(btnEl) {
  if (!btnEl) return;
  const originalHtml = btnEl.innerHTML;
  btnEl.innerHTML = '<i data-lucide="check"></i> <span>Tersalin!</span>';
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    btnEl.innerHTML = originalHtml;
    if (window.lucide) window.lucide.createIcons();
  }, 2200);
}

function initQuizCbtEngine() {
  const stage = document.getElementById('cbt-showcase-stage');
  if (!stage) return;

  // Initialize with Scene 0 (Persiapan Guru)
  switchCbtScene(0);
}

// Global exposures
window.switchCbtScene = switchCbtScene;
window.selectStudentAnswer = selectStudentAnswer;
window.navigateCbtQuestion = navigateCbtQuestion;
window.submitStudentExam = submitStudentExam;
window.toggleGradebookPublish = toggleGradebookPublish;
window.copyCbtLink = copyCbtLink;
window.initQuizCbtEngine = initQuizCbtEngine;



