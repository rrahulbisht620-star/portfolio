/* ============================================
   RAHUL BISHT PORTFOLIO — script.js
   Particles | Typing | Scroll | Skills | Stats
   ============================================ */

'use strict';

/* ---- PARTICLES BACKGROUND ---- */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
        this.reset();
        this.x = Math.random() * W;
        this.y = Math.random() * H;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();


/* ---- NAVBAR SCROLL ---- */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();


/* ---- HAMBURGER / MOBILE MENU ---- */
window.closeMobile = function() {
  document.getElementById('mobileMenu').classList.remove('open');
};

(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  btn.addEventListener('click', () => menu.classList.toggle('open'));
})();


/* ---- TYPING ANIMATION ---- */
(function initTyping() {
  const el = document.getElementById('typed-text');
  const words = [
    'Safety Professional',
    'MIS & Data Analyst',
    'Dashboard Designer',
    'AI Developer',
    'Automation Specialist',
    'Power BI Expert',
    'Google Apps Script Dev',
    'Digital Transformer'
  ];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const word = words[wordIndex];
    if (!deleting) {
      el.textContent = word.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = word.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
})();


/* ---- AOS (Animate On Scroll) ---- */
(function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const delays = { 0: 0, 1: 100, 2: 200 };

  function checkVisible() {
    elements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        const col = el.parentElement
          ? Array.from(el.parentElement.children).indexOf(el) % 3
          : 0;
        el.style.transitionDelay = (delays[col] || 0) + 'ms';
        el.classList.add('aos-animate');
      }
    });
  }

  window.addEventListener('scroll', checkVisible, { passive: true });
  window.addEventListener('resize', checkVisible);
  setTimeout(checkVisible, 200);
})();


/* ---- ANIMATED COUNTERS (About Stats) ---- */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  let done = false;

  function startCounters() {
    if (done) return;
    const section = document.getElementById('about');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      done = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      });
    }
  }

  window.addEventListener('scroll', startCounters, { passive: true });
  startCounters();
})();


/* ---- SKILL BARS ANIMATION ---- */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  let animated = false;

  function animateBars() {
    if (animated) return;
    const section = document.getElementById('skills');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      animated = true;
      fills.forEach(fill => {
        const w = fill.dataset.w;
        setTimeout(() => { fill.style.width = w + '%'; }, 200);
      });
    }
  }

  window.addEventListener('scroll', animateBars, { passive: true });
  animateBars();
})();


/* ---- SKILLS FILTER TABS ---- */
(function initSkillTabs() {
  const tabs  = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.tab;

      cards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Inject fadeInUp keyframe if not present
  if (!document.querySelector('#fadeInUp-style')) {
    const style = document.createElement('style');
    style.id = 'fadeInUp-style';
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(15px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
})();


/* ---- CONTACT FORM ---- */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn  = form.querySelector('.submit-btn');
    const span = btn.querySelector('span');

    btn.style.background    = '#00ff88';
    btn.style.color         = '#000';
    span.textContent        = '✓ Message Sent!';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.style.background    = '';
      btn.style.color         = '';
      span.textContent        = 'Send Message';
      btn.style.pointerEvents = '';
      form.reset();
    }, 3000);
  });
})();


/* ---- EMBED PROFILE PHOTO ---- */
(function embedPhoto() {
  const img = document.getElementById('profileImg');
  if (!img) return;

  // Photo is served from photo.jpg — if it fails, use a stylized placeholder
  img.addEventListener('error', function() {
    const wrap = img.parentElement;
    img.remove();
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: 100%; height: 100%;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: linear-gradient(135deg, #0a1628, #060f1f);
      color: #00d4ff;
      font-family: 'Orbitron', monospace;
    `;
    placeholder.innerHTML = `
      <div style="font-size:3.5rem">👤</div>
      <div style="font-size:0.75rem;letter-spacing:2px;margin-top:0.5rem;opacity:0.7">RAHUL BISHT</div>
    `;
    wrap.appendChild(placeholder);
  });
})();


/* ---- SMOOTH ACTIVE NAV LINK HIGHLIGHTING ---- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  function updateActive() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        links.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + section.id
            ? 'var(--cyan)' : '';
        });
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
})();


/* ---- CURSOR GLOW EFFECT ---- */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.25) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: transform 0.1s;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  let mx = -100, my = -100;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    glow.style.left = mx + 'px';
    glow.style.top  = my + 'py';
    glow.style.left = mx + 'px';
    glow.style.top  = my + 'px';
  });
})();


/* ---- PROJECT CARD TILT EFFECT ---- */
(function initTilt() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width / 2;
      const cy    = rect.top + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const rotX  = -dy * 4;
      const rotY  = dx * 4;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ---- PAGE LOAD REVEAL ---- */
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
  // Fallback
  setTimeout(() => { document.body.style.opacity = '1'; }, 800);
})();
