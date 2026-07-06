// ── Madre y Agua · shared behaviors ──────────────────────────

// Reveal on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('vis'), i * 60);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Signup placeholder — replace once a form service is wired in
const signup = document.querySelector('.signup');
if (signup) {
  signup.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('form-note');
    if (note) note.classList.add('shown');
  });
}

// Gatherings: hide events whose date has passed; show empty state if none remain
const eventCards = document.querySelectorAll('.event-card[data-date]');
if (eventCards.length) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let visible = 0;
  eventCards.forEach(card => {
    const d = new Date(card.dataset.date + 'T00:00:00');
    if (d < today) {
      card.style.display = 'none';
    } else {
      visible++;
    }
  });
  const empty = document.getElementById('events-empty');
  if (empty && visible === 0) empty.style.display = 'block';
}

// Reveal image-gated elements only when their image actually loads.
// (Until then they stay hidden — no empty placeholder boxes.)
document.querySelectorAll('[data-img-gate]').forEach(function (gate) {
  var img = gate.querySelector('img');
  if (!img) return;
  var reveal = function () { gate.classList.add('img-ready'); };
  if (img.complete && img.naturalWidth > 0) reveal();
  else img.addEventListener('load', reveal);
});

// Full-screen menu overlay (homepage)
(function () {
  var menu = document.getElementById('menu');
  if (!menu) return;
  var open = function () { menu.classList.add('open'); document.body.style.overflow = 'hidden'; };
  var close = function () { menu.classList.remove('open'); document.body.style.overflow = ''; };
  document.querySelectorAll('[data-menu-open]').forEach(function (b) { b.addEventListener('click', open); });
  document.querySelectorAll('[data-menu-close]').forEach(function (b) { b.addEventListener('click', close); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();

// Newsletter placeholder (homepage footer)
(function () {
  var f = document.querySelector('.news-form');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = document.getElementById('news-note');
    if (n) n.classList.add('shown');
  });
})();
