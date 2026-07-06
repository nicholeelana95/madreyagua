/* ============================================================
   MADRE Y AGUA — script.js
   Menu · language toggle (persists) · reveal · Flodesk newsletter · contact form
   ============================================================ */
(function () {
  'use strict';

  /* ---- Language: English | Español ---- */
  var LANG_KEY = 'mya-lang';
  function currentLang() {
    return document.documentElement.getAttribute('lang') === 'es' ? 'es' : 'en';
  }
  function setLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }
  // (an inline <head> script has already applied the saved language to avoid a flash)
  document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(currentLang() === 'es' ? 'en' : 'es');
    });
  });

  /* ---- Full-screen menu ---- */
  var menu = document.getElementById('menu');
  if (menu) {
    var open = function () { menu.classList.add('open'); document.body.style.overflow = 'hidden'; };
    var close = function () { menu.classList.remove('open'); document.body.style.overflow = ''; };
    document.querySelectorAll('[data-menu-open]').forEach(function (b) { b.addEventListener('click', open); });
    document.querySelectorAll('[data-menu-close]').forEach(function (b) { b.addEventListener('click', close); });
    // close on any menu navigation, but not when toggling language inside the menu
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Newsletter: render the Flodesk form into the footer ---- */
  var fdEl = document.getElementById('fd-form-6a4b44f15a5bca9d6217e2c7');
  if (fdEl && typeof window.fd === 'function') {
    window.fd('form', {
      formId: '6a4b44f15a5bca9d6217e2c7',
      containerEl: '#fd-form-6a4b44f15a5bca9d6217e2c7'
    });
  }

  /* ---- Contact form — placeholder until wired at launch ---- */
  var cf = document.querySelector('.contact-form');
  if (cf) {
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = document.getElementById('form-note');
      if (n) n.style.display = 'block';
    });
  }
})();
