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

  // 10c. KLASSA Feature Spotlight (3-Feature Interactive Showcase)
  initSafe(initFeatureSpotlight, 'FeatureSpotlight');

  // 11. Time Paradox 40/60 Donut Chart Animation
  initSafe(initTimeParadoxChart, 'TimeParadoxChart');

  // 12. Teacher Workload Calculator Engine
  initSafe(initWorkloadCalculator, 'WorkloadCalculator');

  // 12b. Teacher Workload Mobile Touch-Snap Carousel
  initSafe(initWorkloadMobileCarousel, 'WorkloadMobileCarousel');
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

  // 5. Update mobile active topic label
  const topicMobile = document.getElementById('problem-active-topic-mobile');
  const topicNames = [
    'Masalah 01: Data Terpecah',
    'Masalah 02: Kerja Berulang',
    'Masalah 03: Bikin dari Nol',
    'Masalah 04: Data Tanpa Arah',
    'Masalah 05: Rekap Melelahkan'
  ];
  if (topicMobile && topicNames[index]) {
    topicMobile.textContent = topicNames[index];
    if (index === 4) {
      topicMobile.style.color = '#EF4444';
    } else {
      topicMobile.style.color = 'var(--teal-primary)';
    }
  }

  // 6. Re-render Lucide icons
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
                <span>Rata-Rata: <strong>86.4</strong></span>
              </div>
            </div>

            <div class="mock-grade-table-wrap">
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
              <div class="table-scroll-hint">
                <span>⇄ Geser tabel untuk nilai lengkap</span>
              </div>
            </div>

            <div class="mock-focus-callout rose">
              <i data-lucide="table"></i>
              <span><strong>Formula Otomatis:</strong> Tidak ada rumus rusak (#REF!), nilai akhir terhitung dinamis saat entri masuk.</span>
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
    const isActive = idx === featureIndex;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // 2. Update mobile active feature detail explanation
  updateActiveFeatureDetail();

  // 3. Update right browser mockup viewport
  renderMockupViewport();

  // Refresh Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateActiveFeatureDetail() {
  const ws = klassaWorkspacesData[activeWorkspaceIndex];
  if (!ws) return;
  const currentFeat = ws.features[activeFeatureIndex];
  if (!currentFeat) return;

  const titleEl = document.getElementById('act-feat-title');
  if (titleEl) titleEl.textContent = currentFeat.title;

  const badgeEl = document.getElementById('act-feat-badge');
  if (badgeEl) badgeEl.textContent = currentFeat.badge;

  const descEl = document.getElementById('act-feat-desc');
  if (descEl) descEl.textContent = currentFeat.explanation;

  // Add subtle pulse/fade animation on card change for mobile
  const cardEl = document.getElementById('mobile-active-feature-detail');
  if (cardEl) {
    cardEl.classList.remove('detail-card-pulse');
    void cardEl.offsetWidth; // trigger reflow
    cardEl.classList.add('detail-card-pulse');
  }
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

  // Update value statement (Desktop)
  const valTextEl = document.getElementById('sc-val-text');
  if (valTextEl) valTextEl.textContent = ws.valueStatement;

  // Update data flow indicator (Desktop)
  const flowTextEl = document.getElementById('sc-flow-text');
  if (flowTextEl) flowTextEl.textContent = ws.dataFlow;

  // Render 3 clickable feature highlights
  const featuresList = document.getElementById('showcase-features-list');
  if (featuresList) {
    featuresList.innerHTML = ws.features.map((f, idx) => `
      <button type="button" class="feature-highlight-btn ${idx === activeFeatureIndex ? 'active' : ''} theme-${ws.theme}" 
              data-feature-idx="${idx}" 
              onclick="selectFeature(${idx})" 
              role="tab" 
              title="${f.title}" 
              aria-label="${f.title}" 
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

  // Update mobile active feature detail explanation
  updateActiveFeatureDetail();

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
   19. KLASSA FEATURE SPOTLIGHT — INTERACTIVE YOUTUBE VIDEO SHOWCASE ENGINE
   ============================================================================ */
const SPOTLIGHT_FEATURES = [
  {
    id: 'ai-studio',
    title: 'AI Studio — Modul Ajar',
    desc: 'Susun modul ajar dengan bantuan AI, lalu sesuaikan hasilnya dengan kebutuhan pembelajaran.',
    videoId: 'MHoTutSwbQs',
    browserUrl: 'app.klassa.id/ai-studio',
    badge: 'LIVE DEMO',
    tag: 'AI COPILOT'
  },
  {
    id: 'quiz-cbt',
    title: 'Quiz & CBT Online',
    desc: 'Kelola kuis dan ujian online, mulai dari persiapan soal, pengerjaan siswa, hingga penilaian dan hasil evaluasi.',
    videoId: 'Yi5KV-KhnKQ',
    browserUrl: 'app.klassa.id/quiz-cbt',
    badge: 'LIVE DEMO',
    tag: 'ASSESSMENT'
  },
  {
    id: 'klassa-agent',
    title: 'KLASSA Agent',
    desc: 'Asisten AI yang dirancang untuk membantu guru menyelesaikan berbagai pekerjaan melalui instruksi sederhana.',
    videoId: null, // Struktur data siap diisi: ganti null dengan "ACTUAL_YOUTUBE_ID" ketika video siap
    browserUrl: 'app.klassa.id/agent',
    badge: 'SEGERA HADIR',
    tag: 'AI AGENT'
  }
];

let activeSpotlightIdx = 0;
let userPrefersReducedMotion = false;
let isSpotlightVideoPlaying = false;
let ytPlayer = null;

// Send direct postMessage command to YouTube iframe (works both with & without YT.Player)
function sendYouTubeCommand(funcName) {
  const iframe = document.getElementById('spotlight-active-iframe');
  if (!iframe || !iframe.contentWindow) return;
  try {
    iframe.contentWindow.postMessage('{"event":"listening","id":1}', '*');
    iframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: funcName,
      args: ''
    }), '*');
    iframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: funcName,
      args: []
    }), '*');
  } catch (err) {
    console.warn('[KLASSA] sendYouTubeCommand error:', err);
  }
}

// Initialize YouTube Player API instance
window.onYouTubeIframeAPIReady = function() {
  initYTPlayer();
};

function initYTPlayer() {
  const iframe = document.getElementById('spotlight-active-iframe');
  if (!iframe || !window.YT || !window.YT.Player || ytPlayer) return;

  try {
    ytPlayer = new YT.Player('spotlight-active-iframe', {
      events: {
        'onReady': () => {
          sendYouTubeCommand('listening');
        },
        'onStateChange': (event) => {
          // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
          if (event.data === 1) {
            updatePlayPauseBtnState(true);
          } else if (event.data === 2 || event.data === 0) {
            updatePlayPauseBtnState(false);
          }
        }
      }
    });
  } catch (e) {
    console.warn('[KLASSA] YT Player Init:', e);
  }
}

function scrollToSpotlightVideoOnMobile() {
  if (window.innerWidth <= 1024) {
    const frame = document.getElementById('spotlight-browser-frame');
    if (!frame) return;
    setTimeout(() => {
      const navbar = document.getElementById('site-navbar');
      const navHeight = navbar ? navbar.offsetHeight : 70;
      const rect = frame.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - navHeight - 12;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }, 80);
  }
}

function updatePlayPauseBtnState(isPlaying) {
  isSpotlightVideoPlaying = isPlaying;
  const btn = document.getElementById('spotlight-play-pause-btn');
  const icon = document.getElementById('spotlight-play-icon');
  const text = document.getElementById('spotlight-play-text');
  if (!btn) return;

  if (isPlaying) {
    btn.classList.add('is-playing');
    if (text) text.textContent = 'Jeda';
    if (icon) icon.setAttribute('data-lucide', 'pause');
  } else {
    btn.classList.remove('is-playing');
    if (text) text.textContent = 'Putar';
    if (icon) icon.setAttribute('data-lucide', 'play');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function toggleSpotlightPlayPause() {
  const btn = document.getElementById('spotlight-play-pause-btn');
  // Check both our tracking variable and the button's visual state
  const isPlaying = isSpotlightVideoPlaying || (btn && btn.classList.contains('is-playing'));

  if (isPlaying) {
    // Action: Pause
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try { ytPlayer.pauseVideo(); } catch (e) { console.warn(e); }
    }
    sendYouTubeCommand('pauseVideo');
    updatePlayPauseBtnState(false);
  } else {
    // Action: Play
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
      try { ytPlayer.playVideo(); } catch (e) { console.warn(e); }
    }
    sendYouTubeCommand('playVideo');
    updatePlayPauseBtnState(true);
  }
}

function mountSpotlightShowcase(idx, shouldAutoplay = true) {
  const iframe = document.getElementById('spotlight-active-iframe');
  const comingSoonCard = document.getElementById('spotlight-coming-soon-card');
  const urlEl = document.getElementById('spotlight-browser-url');
  const badgeEl = document.getElementById('spotlight-browser-badge');
  const statusEl = document.getElementById('spotlight-status-label');
  const playBtn = document.getElementById('spotlight-play-pause-btn');
  if (idx < 0 || idx >= SPOTLIGHT_FEATURES.length) return;

  const feature = SPOTLIGHT_FEATURES[idx];

  // Update browser mockup address and badges
  if (urlEl) urlEl.textContent = feature.browserUrl;
  if (badgeEl) badgeEl.textContent = feature.badge;
  if (statusEl) statusEl.textContent = feature.videoId ? 'Video 16:9' : 'Segera Hadir';

  if (feature.videoId) {
    if (playBtn) playBtn.style.display = 'inline-flex';
    if (comingSoonCard) comingSoonCard.style.display = 'none';
    if (iframe) iframe.style.display = 'block';

    // If ytPlayer API is bound, loadVideoById switches smoothly without destroying the player
    if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
      try {
        ytPlayer.loadVideoById({
          videoId: feature.videoId,
          startSeconds: 0
        });
        if (shouldAutoplay && !userPrefersReducedMotion) {
          ytPlayer.playVideo();
          updatePlayPauseBtnState(true);
        } else {
          updatePlayPauseBtnState(false);
        }
        return;
      } catch (e) {
        console.warn('[KLASSA] loadVideoById error:', e);
      }
    }

    // Direct iframe src update fallback
    if (iframe) {
      const autoplayParam = (shouldAutoplay && !userPrefersReducedMotion) ? 1 : 0;
      const originParam = window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
      iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(feature.videoId)}?autoplay=${autoplayParam}&enablejsapi=1&version=3&rel=0${originParam}`;
      updatePlayPauseBtnState(autoplayParam === 1);
    }
  } else {
    // Feature without video: KLASSA Agent (Coming Soon)
    if (playBtn) playBtn.style.display = 'none';
    if (iframe) {
      if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        try { ytPlayer.pauseVideo(); } catch (e) {}
      }
      sendYouTubeCommand('pauseVideo');
      iframe.style.display = 'none';
    }
    if (comingSoonCard) comingSoonCard.style.display = 'flex';
    updatePlayPauseBtnState(false);
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

function selectSpotlightFeature(idx) {
  if (idx < 0 || idx >= SPOTLIGHT_FEATURES.length) return;
  activeSpotlightIdx = idx;

  // Update tabs visual state & accessibility attributes
  const navItems = document.querySelectorAll('.spotlight-nav-item');
  navItems.forEach((item, i) => {
    const isActive = (i === idx);
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Mount showcase with autoplay enabled on user click
  mountSpotlightShowcase(idx, true);

  // Auto-smooth scroll to video on mobile (Option A)
  scrollToSpotlightVideoOnMobile();
}

function handleSpotlightKey(event, currentIdx) {
  const key = event.key;
  if (key === 'ArrowDown' || key === 'ArrowRight') {
    event.preventDefault();
    const nextIdx = (currentIdx + 1) % SPOTLIGHT_FEATURES.length;
    const nextEl = document.getElementById(`spotlight-tab-${nextIdx}`);
    if (nextEl) {
      nextEl.focus();
      selectSpotlightFeature(nextIdx);
    }
  } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
    event.preventDefault();
    const prevIdx = (currentIdx - 1 + SPOTLIGHT_FEATURES.length) % SPOTLIGHT_FEATURES.length;
    const prevEl = document.getElementById(`spotlight-tab-${prevIdx}`);
    if (prevEl) {
      prevEl.focus();
      selectSpotlightFeature(prevIdx);
    }
  } else if (key === 'Enter' || key === ' ') {
    event.preventDefault();
    selectSpotlightFeature(currentIdx);
  }
}

function initFeatureSpotlight() {
  const section = document.getElementById('fitur-spotlight');
  if (!section) return;

  // Reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  userPrefersReducedMotion = mediaQuery.matches;
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', (e) => {
      userPrefersReducedMotion = e.matches;
    });
  }

  // Ensure initial active tab state is set
  const navItems = document.querySelectorAll('.spotlight-nav-item');
  navItems.forEach((item, i) => {
    item.classList.toggle('active', i === 0);
    item.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  });

  // Initialize YT Player on startup or poll if API script still downloading
  if (window.YT && window.YT.Player) {
    initYTPlayer();
  } else {
    let ytPollAttempts = 0;
    const ytPollTimer = setInterval(() => {
      ytPollAttempts++;
      if (window.YT && window.YT.Player) {
        clearInterval(ytPollTimer);
        initYTPlayer();
      } else if (ytPollAttempts >= 25) {
        clearInterval(ytPollTimer);
      }
    }, 250);
  }

  // Listen to YouTube player state changes to keep Play/Pause button in sync
  window.addEventListener('message', (event) => {
    try {
      if (typeof event.data === 'string') {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange') {
          const state = data.info;
          if (state === 1) { // Playing
            updatePlayPauseBtnState(true);
          } else if (state === 2 || state === 0) { // Paused or Ended
            updatePlayPauseBtnState(false);
          }
        }
      }
    } catch (e) {}
  });
}

// Global exposures
window.selectSpotlightFeature = selectSpotlightFeature;
window.switchSpotlightFeature = selectSpotlightFeature;
window.toggleSpotlightPlayPause = toggleSpotlightPlayPause;
window.handleSpotlightKey = handleSpotlightKey;
window.initFeatureSpotlight = initFeatureSpotlight;

/* Mobile Workload Breakdown Accordion Toggle */
function toggleWorkloadBreakdown() {
  const btn = document.getElementById('calc-breakdown-toggle');
  const grid = document.getElementById('calc-breakdown-grid');
  if (!btn || !grid) return;

  const isOpen = grid.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  const span = btn.querySelector('span');
  if (span) {
    span.textContent = isOpen ? 'Tutup Rincian Estimasi (4 Aktivitas)' : '📊 Lihat Rincian Estimasi (4 Aktivitas)';
  }
  if (typeof updateParallaxMetrics === 'function') {
    setTimeout(updateParallaxMetrics, 300);
  }
}
window.toggleWorkloadBreakdown = toggleWorkloadBreakdown;

/* ============================================================================
   12b. TEACHER WORKLOAD MOBILE TOUCH-SNAP CAROUSEL
   ============================================================================ */
function initWorkloadMobileCarousel() {
  const grid = document.getElementById('workload-cards-grid');
  const dotsContainer = document.getElementById('workload-carousel-dots');
  if (!grid || !dotsContainer) return;

  const cards = grid.querySelectorAll('.workload-card');
  const dots = dotsContainer.querySelectorAll('.workload-dot');
  if (cards.length === 0 || dots.length === 0) return;

  let isTicking = false;

  const updateActiveDot = () => {
    const gridRect = grid.getBoundingClientRect();
    const gridCenter = gridRect.left + gridRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(gridCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === closestIdx) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });

    isTicking = false;
  };

  grid.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateActiveDot);
      isTicking = true;
    }
  }, { passive: true });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (cards[idx]) {
        const card = cards[idx];
        const targetLeft = card.offsetLeft - (grid.clientWidth - card.clientWidth) / 2;
        grid.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: 'smooth'
        });
      }
    });
  });

  // Initial check
  updateActiveDot();
}
window.initWorkloadMobileCarousel = initWorkloadMobileCarousel;

