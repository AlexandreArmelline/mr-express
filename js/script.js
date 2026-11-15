/* ============================================================ */
/* BLOCO 1 - INICIALIZAÇÃO E UTILITÁRIOS                        */
/* ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
});
/* Fim bloco 1 - INICIALIZAÇÃO E UTILITÁRIOS */

/* ============================================================ */
/* BLOCO 2 - ANO ATUAL NO RODAPÉ                                */
/* ============================================================ */
function initYear() {
  const anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();
}
/* Fim bloco 2 - ANO ATUAL NO RODAPÉ */

/* ============================================================ */
/* BLOCO 3 - EFEITO DE SCROLL NO CABEÇALHO                      */
/* ============================================================ */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
/* Fim bloco 3 - EFEITO DE SCROLL NO CABEÇALHO */

/* ============================================================ */
/* BLOCO 4 - MENU MOBILE (HAMBURGER)                            */
/* ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!hamburger || !nav) return;

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) toggleMenu();
    });
  });

  // Fecha o menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('open')) {
      toggleMenu();
    }
  });
}
/* Fim bloco 4 - MENU MOBILE (HAMBURGER) */

/* ============================================================ */
/* BLOCO 5 - SCROLL SUAVE PARA ÂNCORAS                          */
/* ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 78;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });
}
/* Fim bloco 5 - SCROLL SUAVE PARA ÂNCORAS */

/* ============================================================ */
/* BLOCO 6 - SCROLL REVEAL (ANIMAÇÃO AO ROLAR)                  */
/* ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.service-card, .about__content, .about__visual, .coverage__item, .contact__item, .section__head'
  );

  if (!elements.length) return;

  // Se o navegador não suportar IntersectionObserver, mostra tudo
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  elements.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
/* Fim bloco 6 - SCROLL REVEAL (ANIMAÇÃO AO ROLAR) */

/* ============================================================ */
/* ÍNDICE                                                       */
/* ============================================================ */
/*
1 INICIALIZAÇÃO E UTILITÁRIOS
2 ANO ATUAL NO RODAPÉ
3 EFEITO DE SCROLL NO CABEÇALHO
4 MENU MOBILE (HAMBURGER)
5 SCROLL SUAVE PARA ÂNCORAS
6 SCROLL REVEAL (ANIMAÇÃO AO ROLAR)
*/
