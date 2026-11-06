/* =====================================================
   app.js  —  1st Anniversary Gift for Nuhami
   Biruk & Nuhami  |  Since November 8, 2025
===================================================== */

// ── Photos (all 13 images) ──────────────────────────
const PHOTOS = [
  'photos/photo_2026-11-06_11-59-02.jpg',
  'photos/photo_2026-11-06_11-59-03.jpg',
  'photos/photo_2026-11-06_11-59-04.jpg',
  'photos/photo_2026-11-06_11-59-05.jpg',
  'photos/photo_2026-11-06_11-59-06.jpg',
  'photos/photo_2026-11-06_11-59-07.jpg',
  'photos/photo_2026-11-06_11-59-08.jpg',
  'photos/photo_2026-11-06_11-59-10.jpg',
  'photos/photo_2026-11-06_11-59-13.jpg',
  'photos/photo_2026-11-06_11-59-27.jpg',
  'photos/photo_2026-11-06_11-59-31.jpg',
  'photos/photo_2026-11-06_11-59-33.jpg',
  'photos/photo_2026-11-06_11-59-34.jpg',
];

// ── Image-specific rizz captions (based on each actual photo) ──
const CAPTIONS = [
  // photo 02 — Nuhami alone in white traditional dress, beautiful smile in a crowd
  "You walked into that gathering in white like you owned the entire world — and honestly? You did. I still can't explain how someone can look that beautiful without even trying. 🤍",

  // photo 03 — Both laughing at a restaurant dinner table (black & white)
  "This is my favourite photo of us. Not because we look good — because we were both just completely lost in each other's laugh. That smile of yours across the table? That's my whole reason. 😂💕",

  // photo 04 — Two hands holding a phone together in warm golden light
  "Even in the smallest moments — your hands close to mine — I feel it. That warmth. That's exactly where I want to be. Every single time. 🌅",

  // photo 05 — Holding hands at her graduation ceremony, shot from above
  "On your biggest day, all I wanted was to hold your hand. Not to celebrate the degree — but because I never want to let go of you. Not then, not ever. 🎓💞",

  // photo 06 — Both at graduation, her sparkly dress, him in cap and gown
  "Class of 2026, and you still somehow managed to outshine every single person in that hall. I saw you and completely forgot what day it was. 🎓✨",

  // photo 07 — Graduation, sitting together, her doing a peace sign, both relaxed
  "I love that even at the most formal event of the year, you still made it feel like our own private world. That peace sign says everything about you. ✌️💕",

  // photo 08 — Both sitting calm and close at the graduation hall
  "These quiet moments — just sitting beside you, saying nothing, being everything — these are the ones I want to keep forever. You make even silence feel perfect. 🤍",

  // photo 10 — Both in white traditional habesha clothes outdoors
  "In every culture, every tradition, every version of this life and the next — I know I would still find you. And I would choose you every single time without thinking twice. 🕊️",

  // photo 13 — Heads close together, her holding a rose, shot from above
  "I gave you that rose because I didn't know what else to do with this feeling. But even a thousand roses wouldn't come close to saying what I mean when I look at you. 🌹",

  // photo 27 — Her holding a beautiful red rose, shot from above
  "The rose is stunning. But the hand holding it? The most beautiful thing I have ever seen in my life — and I've seen your smile, so that's saying a lot. 🌹💕",

  // photo 31 — His hand reaching toward her, her holding a rose, in nature
  "Every road, every path, every direction I have ever walked has led me straight to you. Reaching for your hand is the best thing these hands have ever done. 🌿",

  // photo 33 — Feet + hands intertwined, looking down, golden sunlight
  "Look at that — our feet walking the exact same path, our hands woven together. That's not an accident. That's us choosing each other, every single day, without saying a word. ☀️💞",

  // photo 34 — Him holding her close at golden hour outdoors
  "Golden hour with you hits different. The whole world turns warm and golden — but honestly, that happens whenever you're near me. You are my golden hour. 🌇🤍",
];

const START_DATE = new Date('2025-11-08T00:00:00');

// ── Stage helpers ───────────────────────────────────
let currentStage = 'stage-intro';
function showStage(id) {
  document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  currentStage = id;
}

// ── Starfield ───────────────────────────────────────
function initStarfield(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
    stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + .3,
      a: Math.random(),
      da: (Math.random() - .5) * .006,
      pink: Math.random() < .18,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a = Math.max(.1, Math.min(1, s.a + s.da));
      if (s.a <= .1 || s.a >= 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.pink
        ? `rgba(255,133,179,${s.a})`
        : `rgba(255,255,255,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

// ── Heart Particle Canvas (counter stage) ──────────
function initHeartParticles() {
  const canvas = document.getElementById('heart-particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const SIZE = 260;
  canvas.width = canvas.height = SIZE;

  const particles = [];
  function heartXY(t) {
    return {
      x: 16 * Math.pow(Math.sin(t), 3),
      y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)),
    };
  }

  for (let i = 0; i < 280; i++) {
    const t = Math.random() * Math.PI * 2;
    const p = heartXY(t);
    const scale = SIZE / 2 / 20;
    particles.push({
      ox: p.x * scale + SIZE / 2,
      oy: p.y * scale + SIZE / 2,
      x: Math.random() * SIZE,
      y: Math.random() * SIZE,
      r: Math.random() * 2.5 + .5,
      alpha: Math.random(),
      da: (Math.random() - .5) * .025,
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, SIZE, SIZE);
    frame++;
    particles.forEach(p => {
      const prog = Math.min(1, frame / 90);
      p.x += (p.ox - p.x) * .04;
      p.y += (p.oy - p.y) * .04;
      p.alpha = Math.max(.15, Math.min(1, p.alpha + p.da));
      if (p.alpha <= .15 || p.alpha >= 1) p.da *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,79,139,${p.alpha * prog})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Live Counter ────────────────────────────────────
function updateCounter() {
  const now = new Date();
  const diff = Math.max(0, now - START_DATE);
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);
  document.getElementById('days-count').textContent = String(days).padStart(3, '0');
  document.getElementById('counter-hms').textContent =
    `${String(hours).padStart(2,'0')}h  ${String(mins).padStart(2,'0')}m  ${String(secs).padStart(2,'0')}s`;
}

// ── 3D Sphere ───────────────────────────────────────
function buildSphere() {
  const sphere = document.getElementById('sphere');
  if (!sphere) return;
  sphere.innerHTML = '';
  const N = PHOTOS.length;
  // Adaptive radius: on mobile (< 640px) use ~125px so cards stay inside screen bounds
  const isMobile = window.innerWidth < 640;
  const R = isMobile ? Math.min(130, Math.max(105, window.innerWidth * 0.32)) : 205;

  PHOTOS.forEach((src, i) => {
    // Fibonacci sphere distribution for uniform points
    const phi = Math.acos(-1 + (2 * i + 1) / N);
    const theta = Math.sqrt(N * Math.PI) * phi;

    const x = R * Math.cos(theta) * Math.sin(phi);
    const y = R * Math.sin(theta) * Math.sin(phi);
    const z = R * Math.cos(phi);

    // Calculate rotation angles to point outwards from center of the sphere
    const rotY = (theta * 180 / Math.PI);
    const rotX = -(phi * 180 / Math.PI - 90);

    const el = document.createElement('div');
    el.className = 'sphere-photo';
    // Position at 3D coordinate and rotate normal facing outward
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) rotateX(${rotX.toFixed(1)}deg)`;
    
    // Double-sided card: front face and back face (so image is visible from both sides!)
    el.innerHTML = `
      <div class="photo-face photo-front">
        <img src="${src}" alt="memory" loading="lazy"/>
      </div>
      <div class="photo-face photo-back">
        <img src="${src}" alt="memory" loading="lazy"/>
      </div>
    `;
    el.addEventListener('click', () => openLightbox(src, i));
    sphere.appendChild(el);
  });
}

function initSphereInteraction() {
  const container = document.getElementById('sphere-container');
  const sphere    = document.getElementById('sphere');
  let rotX = -10, rotY = 0;
  let lastX, lastY, dragging = false;
  let velX = 0, velY = 0;

  function applyRot() {
    sphere.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }

  container.addEventListener('mousedown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; velX = velY = 0; });
  container.addEventListener('touchstart', e => { dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; velX = velY = 0; });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    velY =  (e.clientX - lastX) * .4; velX = -(e.clientY - lastY) * .4;
    rotY += velY; rotX += velX;
    lastX = e.clientX; lastY = e.clientY; applyRot();
  });
  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    velY =  (e.touches[0].clientX - lastX) * .4; velX = -(e.touches[0].clientY - lastY) * .4;
    rotY += velY; rotX += velX;
    lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; applyRot();
  });
  window.addEventListener('mouseup',  () => { dragging = false; });
  window.addEventListener('touchend', () => { dragging = false; });

  // Auto-rotate with inertia
  function autoRotate() {
    if (!dragging) {
      velX *= .96; velY *= .96;
      rotY += velY + .18;
      rotX += velX;
      rotX = Math.max(-40, Math.min(40, rotX));
      applyRot();
    }
    requestAnimationFrame(autoRotate);
  }
  autoRotate();
}

// ── Lightbox with Rizz Caption ──────────────────────
function openLightbox(src, index) {
  const lb    = document.getElementById('lightbox');
  const img   = document.getElementById('lightbox-img');
  const txt   = document.getElementById('lightbox-text');

  img.src = src;
  txt.textContent = CAPTIONS[index] || CAPTIONS[0];

  // Reset animation
  const cap = document.querySelector('.lightbox-caption');
  cap.style.animation = 'none';
  cap.offsetHeight; // reflow
  cap.style.animation = '';

  lb.classList.remove('hidden');
}

document.getElementById('lightbox-close').addEventListener('click', () => {
  document.getElementById('lightbox').classList.add('hidden');
  document.getElementById('lightbox-img').src = '';
});

// Close on backdrop click
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.add('hidden');
    document.getElementById('lightbox-img').src = '';
  }
});

// ── Magazine navigation ─────────────────────────────
function goPage(n) {
  document.querySelectorAll('.mag-page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${n}`).classList.add('active');
  document.getElementById('stage-magazine').scrollTop = 0;
}

// ── Fireworks ───────────────────────────────────────
function initFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];
  const COLORS = ['#fff', '#ffb3cc', '#ff4f8b', '#f5c518', '#ff85b3', '#ff4444', '#ffd700'];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  function launch() {
    const x = Math.random() * W;
    const y = H * (.1 + Math.random() * .55);
    const count = 70 + Math.random() * 60;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.5 + 1;
      particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        alpha: 1, r: Math.random() * 3 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
  }

  setInterval(launch, 550);

  function draw() {
    ctx.fillStyle = 'rgba(228,23,74,.12)';
    ctx.fillRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x  += p.vx; p.y  += p.vy + .15;
      p.vx *= .97;  p.vy *= .97;
      p.alpha -= .013;
      if (p.alpha <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.alpha;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color; ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Blow Candles → Wish Scene ───────────────────────
let candlesBlown = false;

function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;

  const cake = document.getElementById('cake-wrap');
  if (cake) {
    cake.style.transform = 'scale(0.94)';
    setTimeout(() => { if (cake) cake.style.transform = ''; }, 220);
  }

  const flames = document.querySelectorAll('.flame');
  const btn = document.getElementById('cake-blow-btn');
  if (btn) btn.classList.add('blown');

  flames.forEach((f, i) => {
    setTimeout(() => {
      f.style.height = '0';
      f.style.opacity = '0';
      f.style.transform = 'translateX(-50%) scale(0)';
    }, i * 90);
  });

  // Lights off and show Biruk's wish overlay
  setTimeout(() => {
    spawnWishStars();
    const overlay = document.getElementById('wish-overlay');
    if (overlay) {
      overlay.classList.remove('hidden');
      overlay.scrollTop = 0;
    }
  }, Math.max(flames.length * 90 + 350, 600));
}

function spawnWishStars() {
  const container = document.getElementById('wish-stars');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 90; i++) {
    const s = document.createElement('div');
    s.style.cssText = `
      position:absolute;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${Math.random()*2.5+.5}px;
      height:${Math.random()*2.5+.5}px;
      border-radius:50%;
      background:${Math.random()<.25?'#ff85b3':'#ffffff'};
      opacity:${Math.random()*.8+.1};
      animation: fadepulse ${(Math.random()*2+1.5).toFixed(1)}s ease-in-out infinite;
      animation-delay:${(Math.random()*2).toFixed(2)}s;
    `;
    container.appendChild(s);
  }
}

// ── Celebration button clicked ──────────────────────
function sayYes() {
  showStage('stage-finale');
  initFireworks();
}

// ── Restart ─────────────────────────────────────────
function restart() {
  candlesBlown = false;
  const overlay = document.getElementById('wish-overlay');
  if (overlay) overlay.classList.add('hidden');
  const btn = document.getElementById('cake-blow-btn');
  if (btn) btn.classList.remove('blown');
  document.querySelectorAll('.flame').forEach(f => {
    f.style.height = '';
    f.style.opacity = '';
    f.style.transform = '';
  });
  showStage('stage-intro');
}

// ── Music toggle ─────────────────────────────────────
const music    = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
let musicOn = false;
musicBtn.addEventListener('click', () => {
  if (musicOn) { music.pause(); musicBtn.textContent = '🎵'; musicOn = false; }
  else { music.play().catch(() => {}); musicBtn.textContent = '🔇'; musicOn = true; }
});

// ── Boot sequence ────────────────────────────────────
(function init() {
  initStarfield('star-canvas');
  showStage('stage-intro');

  // Tap heart → Stage 1
  document.getElementById('heart-tap').addEventListener('click', () => {
    showStage('stage-counter');
    initStarfield('star-canvas2');
    initHeartParticles();
    updateCounter();
    setInterval(updateCounter, 1000);
  });

  // Stage 1 → Sphere
  document.getElementById('btn-to-sphere').addEventListener('click', () => {
    showStage('stage-sphere');
    initStarfield('star-canvas3');
    buildSphere();
    initSphereInteraction();
  });

  // Sphere → Magazine
  document.getElementById('btn-to-magazine').addEventListener('click', () => {
    showStage('stage-magazine');
    goPage(1);
  });

  // Cake tap listener
  const cakeWrap = document.getElementById('cake-wrap');
  if (cakeWrap) {
    cakeWrap.addEventListener('click', blowCandles);
    cakeWrap.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      blowCandles();
    }, { passive: true });
  }

  // Handle mobile screen orientation change or resize
  window.addEventListener('resize', () => {
    if (currentStage === 'stage-sphere') {
      buildSphere();
    }
  });
})();
