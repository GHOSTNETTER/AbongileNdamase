/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-category, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    ring.style.width = '54px';  ring.style.height = '54px'; ring.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    ring.style.width = '36px';  ring.style.height = '36px'; ring.style.opacity = '0.5';
  });
});

/* ── Hero Background Lines ── */
const heroBg = document.getElementById('hero-bg');
for (let i = 0; i < 8; i++) {
  const line = document.createElement('div');
  line.className = 'hero-line';
  line.style.left             = (10 + i * 12) + '%';
  line.style.height           = (200 + Math.random() * 300) + 'px';
  line.style.animationDuration = (4 + Math.random() * 6) + 's';
  line.style.animationDelay   = (Math.random() * 6) + 's';
  heroBg.appendChild(line);
}

/* ── Scroll Reveal + Skill Bars ── */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }, i * 80);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

/* ── Mobile Menu ── */
function toggleMenu() {
  const nav = document.getElementById('mobile-nav');
  nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
}

/* ── Gold Particle Canvas ── */
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
document.getElementById('home').appendChild(canvas);
const ctx = canvas.getContext('2d');
const particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    a: Math.random(),
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0)             p.x = canvas.width;
    if (p.x > canvas.width)  p.x = 0;
    if (p.y < 0)             p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201,168,76,${p.a * 0.4})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ── Hero Title Fade on Scroll ── */
window.addEventListener('scroll', () => {
  const title = document.querySelector('.hero-title');
  if (title) title.style.opacity = Math.max(0, 1 - window.scrollY / 500);
});