// ============================================================
//  Navbar com fundo ao rolar
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ============================================================
//  Menu mobile (hambúrguer)
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

function closeMenu() {
  navToggle.classList.remove('active');
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menu');
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

// fecha o menu ao clicar em qualquer link (incluindo o nav-cta fora do ul)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});
document.querySelector('.nav-cta')?.addEventListener('click', closeMenu);

// fecha com a tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
});

// ============================================================
//  Fade-up com IntersectionObserver
//  (faz os elementos aparecerem suavemente ao rolar a página)
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ============================================================
//  Project cards — spotlight + tilt 3D + scan no hover
// ============================================================
// ano do footer dinâmico
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

const cards = document.querySelectorAll('.project-card');
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

cards.forEach(card => {
  // injeta camadas decorativas (spotlight + hover-scan)
  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight';
  card.appendChild(spotlight);

  const thumb = card.querySelector('.project-thumb');
  if (thumb) {
    const scan = document.createElement('div');
    scan.className = 'hover-scan';
    thumb.appendChild(scan);
  }

  // tilt + spotlight só em dispositivos com mouse (não em touch / reduced-motion)
  if (isCoarsePointer || prefersReducedMotion) return;

  let rafId = null;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // posição do spotlight (em %)
    const mx = (x / rect.width)  * 100;
    const my = (y / rect.height) * 100;

    // tilt: -1..1 mapeado para inclinação suave
    const cx = (x / rect.width)  - 0.5;
    const cy = (y / rect.height) - 0.5;
    const max = 6; // graus máximos
    const ty = (-cy * max).toFixed(2);
    const tx = ( cx * max).toFixed(2);

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      card.style.setProperty('--mx', mx + '%');
      card.style.setProperty('--my', my + '%');
      card.style.setProperty('--tx', tx + 'deg');
      card.style.setProperty('--ty', ty + 'deg');
    });
  });

  card.addEventListener('mouseleave', () => {
    if (rafId) cancelAnimationFrame(rafId);
    card.style.setProperty('--tx', '0deg');
    card.style.setProperty('--ty', '0deg');
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  });
});

// ============================================================
//  Boot sequence (preloader estilo terminal)
//  A classe .booting é colocada no <html> por um script no <head>
//  apenas na 1ª visita da sessão; aqui só finalizamos a animação.
// ============================================================
const boot = document.getElementById('boot');
const isBooting = document.documentElement.classList.contains('booting');

if (isBooting && boot) {
  try { sessionStorage.setItem('booted', '1'); } catch (e) { /* modo privado */ }
  setTimeout(() => {
    boot.classList.add('done');                      // fade-out via CSS
    setTimeout(() => document.documentElement.classList.remove('booting'), 450);
  }, 1300);
}

// ============================================================
//  Barra de progresso de scroll
//  O JS só atualiza a variável --progress (0 a 1);
//  quem desenha é o CSS (transform: scaleX).
// ============================================================
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  if (!scrollProgress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.setProperty('--progress', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ============================================================
//  Typewriter no subtítulo do hero
//  O HTML já contém o texto completo (fallback sem JS / SEO);
//  aqui nós o redigitamos letra a letra, preservando os <span>
//  coloridos ao reconstruir o HTML a cada "tecla".
// ============================================================
const heroType = document.getElementById('heroType');

if (heroType && !prefersReducedMotion) {
  const segments = [
    { text: '> ' },
    { text: 'dev_web', span: true },
    { text: '.init() ' },
    { text: '// front & back', span: true },
  ];
  const totalChars = segments.reduce((n, s) => n + s.text.length, 0);

  function renderTyped(count) {
    let html = '';
    let remaining = count;
    for (const seg of segments) {
      if (remaining <= 0) break;
      const part = seg.text.slice(0, remaining);
      remaining -= part.length;
      const safe = part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      html += seg.span ? `<span>${safe}</span>` : safe;
    }
    heroType.innerHTML = html + '<span class="type-cursor"></span>';
  }

  // se o boot screen está rodando, espera ele sair de cena
  const startDelay = isBooting ? 1600 : 400;
  let typed = 0;

  setTimeout(() => {
    renderTyped(0);
    const timer = setInterval(() => {
      typed++;
      renderTyped(typed);
      if (typed >= totalChars) clearInterval(timer);
    }, 45);
  }, startDelay);
}

// ============================================================
//  Contadores animados (stat-chips do hero)
//  Reusa a mesma ideia do fade-up: IntersectionObserver dispara
//  quando o elemento entra na tela. Easing cúbico para o número
//  desacelerar perto do final (fica mais natural).
// ============================================================
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    counterObs.unobserve(entry.target);

    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';

    if (prefersReducedMotion) { el.textContent = target + suffix; return; }

    const duration = 1200;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cúbico
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach((el) => counterObs.observe(el));

// ============================================================
//  Stagger das skill-tags
//  Cada tag recebe um índice (--i) e o CSS calcula o atraso:
//  delay = --i * 55ms. Mesmo padrão de variável já usado no tilt.
// ============================================================
const tagObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    tagObs.unobserve(entry.target);
    entry.target.querySelectorAll('.skill-tag').forEach((tag, i) => {
      tag.style.setProperty('--i', i);
    });
    entry.target.classList.add('stagger-in');
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-tags').forEach((g) => tagObs.observe(g));

// ============================================================
//  Scrollspy — destaca na navbar o link da seção visível
//  rootMargin "espreme" a área de detecção para uma faixa no
//  meio da tela: a seção que cruza essa faixa é a ativa.
// ============================================================
const spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const spyTargets = [document.getElementById('hero'), ...[...spyLinks]
  .map((l) => document.querySelector(l.getAttribute('href')))].filter(Boolean);

const spyObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    spyLinks.forEach((l) => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

spyTargets.forEach((s) => spyObs.observe(s));

// ============================================================
//  Partículas do hero (canvas)
//  ~45 pontos flutuando; pontos próximos são ligados por linhas.
//  Desligado em touch (bateria) e reduced-motion (acessibilidade),
//  e pausado quando o hero sai da tela (CPU).
// ============================================================
const particlesCanvas = document.getElementById('heroParticles');

if (particlesCanvas && !prefersReducedMotion && !isCoarsePointer) {
  const ctx = particlesCanvas.getContext('2d');
  const COUNT = 45;
  const LINK_DIST = 130;
  let W, H, parts = [];
  let running = true;

  function resizeCanvas() {
    W = particlesCanvas.width = particlesCanvas.offsetWidth;
    H = particlesCanvas.height = particlesCanvas.offsetHeight;
  }

  function initParticles() {
    parts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;   // quica nas bordas
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180,78,255,0.55)';
      ctx.fill();
    }

    // liga pares próximos com linhas que somem com a distância
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = parts[i].x - parts[j].x;
        const dy = parts[i].y - parts[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = `rgba(0,245,255,${(0.14 * (1 - dist / LINK_DIST)).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(parts[i].x, parts[i].y);
          ctx.lineTo(parts[j].x, parts[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(frame);
  }

  resizeCanvas();
  initParticles();
  frame();

  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  // pausa a animação quando o hero não está visível
  new IntersectionObserver(([entry]) => {
    const wasRunning = running;
    running = entry.isIntersecting;
    if (running && !wasRunning) frame();
  }).observe(particlesCanvas);
}

// ============================================================
//  Formulário de contato (Formspree)
//  Enquanto o ID do Formspree não for configurado na action,
//  o fallback abre o cliente de e-mail já preenchido.
// ============================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const action = contactForm.getAttribute('action');
    const data = new FormData(contactForm);
    const t = (key) => (window.I18N ? I18N.t(key) : '');

    // Formspree ainda não configurado → abre e-mail preenchido
    if (action.includes('SEU_ID')) {
      const subject = encodeURIComponent('Contato via portfólio');
      const body = encodeURIComponent(
        `${data.get('name')} <${data.get('email')}>\n\n${data.get('message')}`
      );
      window.location.href = `mailto:ruancamisaazul@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    formStatus.textContent = t('form.sending');
    formStatus.className = 'form-status';

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      contactForm.reset();
      formStatus.textContent = t('form.ok');
      formStatus.classList.add('ok');
    } catch (err) {
      formStatus.textContent = t('form.err');
      formStatus.classList.add('err');
    }
  });
}
