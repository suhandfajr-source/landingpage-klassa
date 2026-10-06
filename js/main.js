/**
 * ============================================================================
 * KLASSA — Official Interactive & Motion Engine (v4.0)
 * Ultra-Smooth LERP Physics, Calm Parallax & Majestic Slow Reveals
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Sticky Navbar Blur & Mobile Drawer
  initNavbarAndDrawer();

  // 3. Slow, Majestic Scroll-Triggered Entrance Reveals (1.2s Duration)
  initScrollReveal();

  // 4. Ultra-Smooth LERP Physics Parallax Engine
  initLerpParallaxEngine();

  // 5. Cockpit 3D Mouse Perspective with LERP Damping
  initAtomicEcosystemEngine();

  // 6. FAQ Accordion Interaction
  initFaqAccordion();

  // 7. Sticky Bottom Mobile CTA on Scroll
  initStickyMobileCta();

  // 8. Demo Video Walkthrough Timer
  initDemoWalkthrough();

  // 9. Ecosystem Interactive Device Stage
  initEcosystemInteractiveStage();

  // 10. Synchronized 5-Point Timeline & Problem Carousel
  initProblemCarousel();
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
