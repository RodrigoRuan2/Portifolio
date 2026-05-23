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

// fecha o menu ao clicar em qualquer link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

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
//  Barras de skill — animam ao aparecer na tela
// ============================================================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width;
          bar.classList.add('visible');
        }, 150 + i * 80);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

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
