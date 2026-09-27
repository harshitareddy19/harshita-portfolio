/**
 * Harshita Gurram — Personal Brand Portfolio
 * Theme: Premium + Futuristic + Tech + AI + Startup + 3D
 * Self-Contained 60FPS 3D Core Engine (Zero External Dependencies)
 */

// ==========================================================================
// EDITABLE PROFILE CONFIGURATION
// Replace this with your exact public LinkedIn profile URL:
// e.g. "https://www.linkedin.com/in/harshita-gurram-12345"
// ==========================================================================
const LINKEDIN_URL = "ADD_MY_ACTUAL_LINKEDIN_URL_HERE";

document.addEventListener('DOMContentLoaded', () => {
  // --- Configure LinkedIn Links Dynamically ---
  const linkedinLinks = document.querySelectorAll('[data-linkedin-link]');
  linkedinLinks.forEach(el => {
    if (LINKEDIN_URL && LINKEDIN_URL !== "ADD_MY_ACTUAL_LINKEDIN_URL_HERE") {
      el.setAttribute('href', LINKEDIN_URL);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showToast("LinkedIn: Please update LINKEDIN_URL with your public profile address.");
      });
    }
  });

  // --- Project Modal Data (Strictly matching provided details) ---
  const projectDetails = {
    hostelfit: {
      tag: "Student Wellness / Product Concept",
      title: "HostelFit",
      summary: "A hostel-focused wellness companion designed around practical fitness, nutrition, mindfulness and healthy habits for college students.",
      problem: "College students living in hostels often encounter irregular schedules, limited gym access, unbalanced hostel food options, and high academic stress. Most generic fitness apps assume full kitchen access, home amenities, or expensive memberships.",
      solution: "HostelFit provides a tailored student wellness system specifically optimized for hostel living conditions—focusing on bodyweight/room workouts, practical campus cafeteria nutrition advice, sleep hygiene routines, and AI-assisted daily habit guidance.",
      highlights: [
        "Hostel-friendly wellness routines requiring minimal equipment",
        "Campus & hostel cafeteria-focused nutrition tips",
        "Mindfulness & stress management tools for exam cycles",
        "AI-assisted guidance for daily habit tracking",
        "Peer-encouragement & student lifestyle design"
      ],
      techStack: ["Flutter", "Dart", "AI", "Product Design", "Mobile UX"]
    },
    pashuvaidya: {
      tag: "Veterinary Technology / Startup Concept",
      title: "Pashuvaidya",
      summary: "A veterinary technology platform concept focused on helping clinics manage digital records, appointments, prescriptions and reminders while improving access to veterinary care.",
      problem: "Many veterinary practices and animal clinics rely on fragmented paper records, manual phone follow-ups, and unorganized immunization schedules, leading to delayed treatments, missed vaccinations, and administrative friction for pet owners and livestock caretakers.",
      solution: "Pashuvaidya streamlines veterinary workflows through centralized digital pet profiles, automated vaccination reminders, streamlined digital prescriptions, and an intuitive scheduling interface that bridges pet parents and veterinary professionals.",
      highlights: [
        "Digital veterinary records & health history tracking",
        "Automated appointment scheduling & visit queues",
        "Digital prescription management & dosage instructions",
        "Vaccination & medication reminders for caretakers",
        "Scalable clinic workflow architecture"
      ],
      techStack: ["Product", "SaaS", "AI", "Veterinary Technology", "REST APIs"]
    }
  };

  // --- Elements ---
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const toast = document.getElementById('toast');
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalSummary = document.getElementById('modalSummary');
  const modalProblem = document.getElementById('modalProblem');
  const modalSolution = document.getElementById('modalSolution');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalTechStack = document.getElementById('modalTechStack');
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtns = document.querySelectorAll('[data-copy-email]');

  let lastFocusedElement = null;

  // --- Toast Notification Helper ---
  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3400);
  }

  // --- Sticky Floating Navbar Compact on Scroll ---
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 25) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // --- Mobile Navigation Toggle & Body Lock ---
  function closeMobileMenu() {
    if (navLinks && navToggle) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinkItems.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // --- Active Nav Link on Scroll (ScrollSpy) ---
  function highlightActiveNav() {
    const scrollY = window.pageYOffset + 140;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav();

  // --- Subtle Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --- Project Details Modal with Focus Management ---
  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalOverlay) return;

    lastFocusedElement = document.activeElement;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalSummary.textContent = data.summary;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;

    modalHighlights.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.className = 'project-highlight-item';
      li.innerHTML = `
        <svg class="highlight-icon" style="color: var(--accent-cyan);" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span>${item}</span>
      `;
      modalHighlights.appendChild(li);
    });

    modalTechStack.innerHTML = '';
    data.techStack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'skill-pill-dark';
      span.textContent = tech;
      modalTechStack.appendChild(span);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (modalCloseBtn) {
      setTimeout(() => modalCloseBtn.focus(), 50);
    }
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  document.querySelectorAll('[data-project-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-trigger');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('active')) {
        closeProjectModal();
      } else if (navLinks && navLinks.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });

  // --- Copy Email to Clipboard ---
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || "harshitareddygurram@gmail.com";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      } else {
        showToast(`Email: ${email}`);
      }
    });
  });

  // --- Interactive Message Form Simulation ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const messageInput = document.getElementById('senderMessage');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();

      if (!nameVal || !emailVal || !messageVal) {
        showToast("Please fill in all fields before sending.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        showToast("Please enter a valid email address.");
        emailInput.focus();
        return;
      }

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="btn-icon" style="animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" stroke-opacity="0.25" fill="none"/>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        Transmitting...
      `;

      setTimeout(() => {
        showToast("Message received! Harshita will connect with you soon.");
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }, 650);
    });
  }

  // ==========================================================================
  // 1. BACKGROUND AMBIENT STARFIELD CANVAS (Subtle & Fast)
  // ==========================================================================
  const starsCanvas = document.getElementById('bgStarsCanvas');
  if (starsCanvas) {
    const ctx = starsCanvas.getContext('2d');
    let stars = [];
    let width = 0;
    let height = 0;

    function resizeStars() {
      width = window.innerWidth;
      height = window.innerHeight;
      starsCanvas.width = width;
      starsCanvas.height = height;
      const starCount = Math.min(Math.floor((width * height) / 9000), 140);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.4 + 0.4,
          alpha: Math.random() * 0.7 + 0.2,
          speed: Math.random() * 0.2 + 0.05,
          color: Math.random() > 0.6 ? '#8B5CF6' : (Math.random() > 0.5 ? '#22D3EE' : '#FFFFFF')
        });
      }
    }
    window.addEventListener('resize', resizeStars);
    resizeStars();

    function renderStars() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha * (0.8 + 0.2 * Math.sin(Date.now() * 0.002 + i));
        ctx.shadowBlur = 4;
        ctx.shadowColor = s.color;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      requestAnimationFrame(renderStars);
    }
    renderStars();
  }

  // ==========================================================================
  // 2. REAL 3D HERO INTERACTIVE CORE (Pure WebGL / 3D Geometry Engine)
  // ==========================================================================
  const heroCanvas = document.getElementById('hero3dCanvas');
  const heroVisualContainer = document.querySelector('.hero-3d-visual');

  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let size = 440;
    let dpr = window.devicePixelRatio || 1;

    function resizeHeroCanvas() {
      const rect = heroCanvas.getBoundingClientRect();
      size = Math.min(rect.width || 440, 440);
      heroCanvas.width = size * dpr;
      heroCanvas.height = size * dpr;
      ctx.scale(dpr, dpr);
    }
    resizeHeroCanvas();
    window.addEventListener('resize', resizeHeroCanvas);

    // Mouse Tracking Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    if (heroVisualContainer) {
      heroVisualContainer.addEventListener('mousemove', (e) => {
        const rect = heroVisualContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = x * 0.9;
        targetRotationX = -y * 0.9;
      });

      heroVisualContainer.addEventListener('mouseleave', () => {
        targetRotationX = 0;
        targetRotationY = 0;
      });
    }

    // Mathematical 3D Geodesic Icosahedron Model
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      [-1,  phi,  0], [ 1,  phi,  0], [-1, -phi,  0], [ 1, -phi,  0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi,  0, -1], [ phi,  0,  1], [-phi,  0, -1], [-phi,  0,  1]
    ];

    // Normalize vertices to sphere radius
    const radius = 105;
    const vertices = baseVertices.map(v => {
      const len = Math.hypot(v[0], v[1], v[2]);
      return [ (v[0] / len) * radius, (v[1] / len) * radius, (v[2] / len) * radius ];
    });

    // Subdivided midpoints for rich futuristic tech nodes
    const allVertices = [...vertices];
    const edges = [];
    const distThreshold = radius * 1.15;

    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const d = Math.hypot(
          vertices[i][0] - vertices[j][0],
          vertices[i][1] - vertices[j][1],
          vertices[i][2] - vertices[j][2]
        );
        if (d < distThreshold) {
          edges.push([i, j]);
          // Add midpoint node
          allVertices.push([
            (vertices[i][0] + vertices[j][0]) * 0.5 * 1.08,
            (vertices[i][1] + vertices[j][1]) * 0.5 * 1.08,
            (vertices[i][2] + vertices[j][2]) * 0.5 * 1.08
          ]);
        }
      }
    }

    // Orbital Ring Particles (AI data nodes)
    const ringParticlesCount = 28;
    const ringParticles = [];
    for (let i = 0; i < ringParticlesCount; i++) {
      ringParticles.push({
        angle: (i / ringParticlesCount) * Math.PI * 2,
        speed: 0.015 + (i % 2 === 0 ? 0.005 : -0.005),
        ringRadius: 148 + (i % 3) * 6,
        inclination: (i % 2 === 0 ? 0.75 : -0.65),
        size: (i % 3 === 0 ? 3.2 : 2),
        color: (i % 2 === 0 ? '#22D3EE' : '#8B5CF6')
      });
    }

    // 3D Matrix Math Helper
    function rotateX(v, a) {
      const cos = Math.cos(a), sin = Math.sin(a);
      return [v[0], v[1] * cos - v[2] * sin, v[1] * sin + v[2] * cos];
    }
    function rotateY(v, a) {
      const cos = Math.cos(a), sin = Math.sin(a);
      return [v[0] * cos + v[2] * sin, v[1], -v[0] * sin + v[2] * cos];
    }
    function rotateZ(v, a) {
      const cos = Math.cos(a), sin = Math.sin(a);
      return [v[0] * cos - v[1] * sin, v[0] * sin + v[1] * cos, v[2]];
    }

    let angleAuto = 0;

    function render3DCore() {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const fov = 420;

      // Smooth mouse parallax easing
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      angleAuto += 0.008;
      const rotX = angleAuto * 0.6 + currentRotationX;
      const rotY = angleAuto * 0.9 + currentRotationY;
      const rotZ = angleAuto * 0.3;

      // 1. Draw Central Glowing Core
      const corePulse = Math.sin(Date.now() * 0.003) * 8;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 54 + corePulse);
      coreGrad.addColorStop(0, 'rgba(139, 92, 246, 0.85)');
      coreGrad.addColorStop(0.4, 'rgba(59, 130, 246, 0.45)');
      coreGrad.addColorStop(0.7, 'rgba(34, 211, 238, 0.2)');
      coreGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, 54 + corePulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Inner Core Glyph: ◉
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#22D3EE';
      ctx.fillText('AI CORE', cx, cy);
      ctx.shadowBlur = 0;

      // 2. Project Vertices
      const projected = allVertices.map(v => {
        let p = rotateX(v, rotX);
        p = rotateY(p, rotY);
        p = rotateZ(p, rotZ);
        const scale = fov / (fov + p[2]);
        return {
          x: cx + p[0] * scale,
          y: cy + p[1] * scale,
          z: p[2],
          scale: scale
        };
      });

      // 3. Render 3D Edges
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        if (!p1 || !p2) return;

        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.08, (avgZ + radius) / (radius * 2) * 0.55);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        const edgeGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        edgeGrad.addColorStop(0, `rgba(139, 92, 246, ${alpha})`);
        edgeGrad.addColorStop(1, `rgba(34, 211, 238, ${alpha})`);

        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // 4. Render 3D Vertices (Glowing Nodes)
      projected.forEach((p, idx) => {
        const alpha = Math.max(0.2, (p.z + radius) / (radius * 2) * 0.95);
        ctx.beginPath();
        const r = (idx < 12 ? 3.4 : 2) * p.scale;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);

        if (idx < 12) {
          ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#22D3EE';
        } else {
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#8B5CF6';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Render Orbiting Ring Particles & Paths
      ringParticles.forEach(rp => {
        rp.angle += rp.speed;
        let rx = Math.cos(rp.angle) * rp.ringRadius;
        let ry = Math.sin(rp.angle) * rp.ringRadius * Math.sin(rp.inclination);
        let rz = Math.sin(rp.angle) * rp.ringRadius * Math.cos(rp.inclination);

        let p = rotateX([rx, ry, rz], rotX * 0.4);
        p = rotateY(p, rotY * 0.4);
        const scale = fov / (fov + p[2]);
        const px = cx + p[0] * scale;
        const py = cy + p[1] * scale;
        const alpha = Math.max(0.2, (p[2] + 160) / 320 * 0.9);

        ctx.beginPath();
        ctx.arc(px, py, rp.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = rp.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = rp.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(render3DCore);
    }
    render3DCore();
  }

  // ==========================================================================
  // 3. INTERACTIVE 3D TILT ON HOVER FOR CARDS
  // ==========================================================================
  const tiltCards = document.querySelectorAll(
    '.identity-card-dark, .skill-card-futuristic, .project-showcase-card-dark, .exploring-hex-card-dark'
  );

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
