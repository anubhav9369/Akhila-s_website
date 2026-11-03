/* P. V. Akhila — theme engine, timeline, reveal, 3D cosmos (classic script; THREE r128 UMD) */

/* ============================== THEME ============================== */
const root = document.documentElement;
const THEME_KEY = 'akhila-theme';

function currentTheme() {
  return root.dataset.theme === 'tech' ? 'tech' : 'story';
}
function setTheme(t, save = true) {
  root.dataset.theme = t;
  if (save) try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  const label = t === 'story' ? 'The Storyteller' : 'The Quantum Mind';
  document.querySelectorAll('.theme-state').forEach(el => { el.textContent = label; });
  document.querySelectorAll('.theme-toggle, .big-switch').forEach(b => {
    b.setAttribute('aria-pressed', t === 'tech' ? 'true' : 'false');
  });
  if (window.__setSceneTheme) window.__setSceneTheme(t);
}
(function initTheme() {
  let t = 'story';
  try { t = localStorage.getItem(THEME_KEY) || 'story'; } catch (e) {}
  setTheme(t === 'tech' ? 'tech' : 'story', false);
})();
document.getElementById('themeToggleNav').addEventListener('click', () =>
  setTheme(currentTheme() === 'story' ? 'tech' : 'story'));
document.getElementById('themeToggleBand').addEventListener('click', () =>
  setTheme(currentTheme() === 'story' ? 'tech' : 'story'));

/* mobile nav */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ============================== TIMELINE ============================== */
const TIMELINES = {
  story: [
    { year: '2023', title: 'The first page',
      text: 'Akhila starts writing the feelings nobody says out loud. @writer___akhila becomes a quiet corner of the internet for hearts that feel too much.',
      tag: 'Beginnings' },
    { year: '2025', title: 'Pragma finds its homes',
      text: 'Her verse novelette “Pragma: A Soulful Journey of Love” (Notion Press) begins its journey — and 100+ copies find their homes, reader by reader.',
      tag: 'The book' },
    { year: 'Jul 2026', title: 'Enna Solla Pogiraai??',
      text: 'A manifested moment: her stories before a packed audience at Punch, Alwarpet — an evening built around the pull between what we want to say and what we actually say.',
      img: 'assets/show-essp.jpg', tag: 'Headline set' },
    { year: 'Aug 2026', title: 'Nesippaya',
      text: 'Storyteller meets stand-up. An evening with Naresh S at DBICA Blackbox where laughter hands the mic to feeling — and the room never forgets.',
      img: 'assets/duo.jpg', tag: 'Story × Comedy' },
    { year: '2026', title: 'The stage keeps calling',
      text: 'Tape A Tale (Ghar) Chennai — “My heart still waits for you”, “Vo aakhri chitthi”. Plus Hari Kadhaa Live, Crack Open 3.0, Aval Women\u2019s Day open mic: rooms that lean in.',
      img: 'assets/akhila-stage.jpg', tag: 'On tour' },
  ],
  tech: [
    { year: '2019 – 2023', title: 'Physics first',
      text: 'B.Sc. B.Ed. Physics at SASTRA University — where quantum stopped being magic and became mathematics.',
      tag: 'Foundation' },
    { year: '2023', title: 'Research begins',
      text: 'Research Intern at IIT Bombay — structured research and technical writing on comparative calendar systems, Panchang and Gregorian, with publication potential.',
      tag: 'Research' },
    { year: '2024 – 2026', title: 'The ML years',
      text: 'M.Sc. Data Science at VIT Chennai. As Data Science Lead at GDG, built a YOLO-based defense surveillance module trained on 9,000 images.',
      tag: 'Deep learning' },
    { year: '2025', title: 'Shipping & speaking',
      text: 'AI Engineer at ThetaZero, unifying product data into one intelligent layer. Presented at ICNCS 2025. Certified in Quantum Information by IBM.',
      tag: 'Industry' },
    { year: '2026', title: 'Quantum, in production',
      text: 'ML Intern at C-DAC — an end-to-end AutoML platform, plus research on hybrid neural decoding and mixture-of-experts for quantum error correction. Qiskit Global Summer School, Quantum Excellence.',
      tag: 'Quantum ML' },
  ]
};

function renderTimeline(theme) {
  const tl = document.getElementById('timeline');
  tl.innerHTML = TIMELINES[theme].map(c => `
    <div class="chapter">
      <span class="dot"></span>
      <div class="card">
        <div class="year">${c.year}</div>
        <h3>${c.title}</h3>
        <p>${c.text}</p>
        ${c.img ? `<img src="${c.img}" alt="${c.title}" loading="lazy">` : ''}
        <span class="tag">${c.tag}</span>
      </div>
    </div>`).join('');
  observeReveals(tl);
}

/* ============================== REVEAL ============================== */
let observer = null;
function observeReveals(scope) {
  if (!('IntersectionObserver' in window)) {
    scope.querySelectorAll('.reveal,.chapter,.show-card,.press-card,.exp')
      .forEach(el => el.classList.add('in'));
    return;
  }
  if (!observer) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
  }
  scope.querySelectorAll('.reveal,.chapter,.show-card,.press-card,.exp')
    .forEach(el => observer.observe(el));
}

/* re-render timeline when the profile flips */
const _setTheme = setTheme;
setTheme = function (t, save = true) {
  _setTheme(t, save);
  renderTimeline(t);
};

/* initial paint */
renderTimeline(currentTheme());
observeReveals(document);

/* ============================== 3D COSMOS ============================== */
(function initCosmos() {
  const canvas = document.getElementById('cosmos');
  if (!window.THREE) { canvas.style.display = 'none'; return; }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) { canvas.style.display = 'none'; return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xfaf4ec, 14, 32);
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 13);

  const PAL = {
    story: { p1: new THREE.Color('#d9a08a'), p2: new THREE.Color('#c9a24b'), fog: new THREE.Color('#faf4ec') },
    tech:  { p1: new THREE.Color('#2c5a55'), p2: new THREE.Color('#62c7b2'), fog: new THREE.Color('#0b0f14') }
  };

  /* ---- particle field ---- */
  const N = 650;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const colTarget = new Float32Array(N * 3);
  const seed = new Float32Array(N * 2);
  const speed = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    seed[i * 2] = Math.random() * Math.PI * 2;
    seed[i * 2 + 1] = 0.3 + Math.random() * 0.7;
    speed[i] = 0.15 + Math.random() * 0.5;
    const c = Math.random() < 0.6 ? PAL.story.p1 : PAL.story.p2;
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  colTarget.set(col);
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false });
  scene.add(new THREE.Points(pGeo, pMat));

  /* ---- story: floating open book ---- */
  function pageTexture() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 340;
    const g = c.getContext('2d');
    g.fillStyle = '#f8f1e3'; g.fillRect(0, 0, 256, 340);
    g.fillStyle = '#bc5a4b'; g.fillRect(28, 30, 120, 8);
    g.fillStyle = 'rgba(67,44,44,.35)';
    for (let y = 58; y < 320; y += 16) g.fillRect(28, y, 200 - Math.random() * 60, 3);
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding;
    return t;
  }
  const bookGroup = new THREE.Group();
  const bookMats = [];
  (function buildBook() {
    const tex = pageTexture();
    const mk = (w, h) => {
      const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
      bookMats.push({ m, base: 1 });
      return new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
    };
    const left = mk(2.3, 3.1); left.position.x = -1.12; left.rotation.y = 0.32;
    const right = mk(2.3, 3.1); right.position.x = 1.12; right.rotation.y = -0.32;
    const spine = mk(0.5, 3.1);
    const sm = new THREE.MeshBasicMaterial({ color: 0x96443a, transparent: true });
    bookMats.push({ m: sm, base: 1 }); spine.material = sm;
    bookGroup.add(left, right, spine);
    for (let i = 0; i < 9; i++) {
      const p = mk(0.85, 1.15);
      const a = Math.random() * Math.PI * 2, r = 4.2 + Math.random() * 2.6;
      p.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 6, Math.sin(a) * r - 2);
      p.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      p.userData = { a, r, y: p.position.y, s: 0.4 + Math.random() * 0.8, rs: (Math.random() - 0.5) * 0.6 };
      bookGroup.add(p);
    }
  })();
  bookGroup.position.y = 0.4;
  scene.add(bookGroup);

  /* ---- tech: quantum lattice ---- */
  const techGroup = new THREE.Group();
  const techMats = [];
  (function buildTech() {
    const reg = (m, base) => { techMats.push({ m, base }); return m; };
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.3, 1),
      reg(new THREE.MeshBasicMaterial({ color: 0x62c7b2, wireframe: true, transparent: true }), 0.9));
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.3, 0),
      reg(new THREE.MeshBasicMaterial({ color: 0x62c7b2, transparent: true }), 0.07));
    techGroup.add(wire, core);
    [[3.4, 0.5, 0.2], [4.1, 1.2, 1.1]].forEach(([r, rx, rz]) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.015, 8, 90),
        reg(new THREE.MeshBasicMaterial({ color: 0x7fb0d8, transparent: true }), 0.5));
      ring.rotation.x = rx; ring.rotation.z = rz;
      techGroup.add(ring);
    });
    const qubits = [];
    for (let i = 0; i < 8; i++) {
      const q = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        reg(new THREE.MeshBasicMaterial({ color: 0x9fe8d8, transparent: true }), 1));
      q.userData = { a: (i / 8) * Math.PI * 2, r: 3.6 + (i % 3) * 0.7, s: 0.5 + Math.random() * 0.5 };
      qubits.push(q); techGroup.add(q);
    }
    techGroup.userData.qubits = qubits;
    techGroup.userData.wire = wire;
  })();
  techGroup.position.y = 0.4;
  techGroup.visible = false;
  scene.add(techGroup);

  /* ---- theme state ---- */
  let mix = 0, mixTarget = 0;               // 0 = story, 1 = tech
  const fogCur = PAL.story.fog.clone();
  window.__setSceneTheme = function (t) {
    mixTarget = t === 'tech' ? 1 : 0;
    const p = t === 'tech' ? PAL.tech : PAL.story;
    for (let i = 0; i < N; i++) {
      const c = (i % 5 < 3) ? p.p1 : p.p2;
      colTarget[i * 3] = c.r; colTarget[i * 3 + 1] = c.g; colTarget[i * 3 + 2] = c.b;
    }
  };

  /* ---- mouse ---- */
  const mouse = { x: 0, y: 0, wx: 0, wy: 0 };
  window.addEventListener('pointermove', e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ---- loop ---- */
  const clock = new THREE.Clock();
  function fade(list, k, visible) {
    list.forEach(({ m, base }) => { m.opacity = base * k; });
  }
  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    mix += (mixTarget - mix) * 0.045;
    const bk = 1 - mix, tk = mix;
    bookGroup.visible = bk > 0.02;
    techGroup.visible = tk > 0.02;
    if (bookGroup.visible) fade(bookMats, bk);
    if (techGroup.visible) fade(techMats, tk);

    // particles drift + mouse repel
    const target = mixTarget === 1 ? PAL.tech.fog : PAL.story.fog;
    fogCur.lerp(target, 0.045);
    scene.fog.color.copy(fogCur);

    const v = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    mouse.wx = camera.position.x + dir.x * dist;
    mouse.wy = camera.position.y + dir.y * dist;

    const p = pGeo.attributes.position.array;
    const c = pGeo.attributes.color.array;
    for (let i = 0; i < N; i++) {
      const ix = i * 3;
      p[ix] += Math.sin(t * 0.4 + seed[i * 2]) * 0.0035 * seed[i * 2 + 1];
      p[ix + 1] += speed[i] * dt * 0.55;
      if (p[ix + 1] > 9.5) p[ix + 1] = -9.5;
      const dx = p[ix] - mouse.wx, dy = p[ix + 1] - mouse.wy;
      const d2 = dx * dx + dy * dy;
      if (d2 < 9 && d2 > 0.0001) {
        const d = Math.sqrt(d2), f = (3 - d) * 0.02;
        p[ix] += (dx / d) * f; p[ix + 1] += (dy / d) * f;
      }
      c[ix] += (colTarget[ix] - c[ix]) * 0.045;
      c[ix + 1] += (colTarget[ix + 1] - c[ix + 1]) * 0.045;
      c[ix + 2] += (colTarget[ix + 2] - c[ix + 2]) * 0.045;
    }
    pGeo.attributes.position.needsUpdate = true;
    pGeo.attributes.color.needsUpdate = true;

    // book motion
    if (bookGroup.visible) {
      bookGroup.rotation.y = Math.sin(t * 0.25) * 0.35;
      bookGroup.position.y = 0.4 + Math.sin(t * 0.7) * 0.25;
      bookGroup.children.forEach(ch => {
        const u = ch.userData;
        if (!u.a) return;
        u.a += dt * 0.12 * u.s;
        ch.position.x = Math.cos(u.a) * u.r;
        ch.position.z = Math.sin(u.a) * u.r - 2;
        ch.position.y = u.y + Math.sin(t * 0.8 + u.a) * 0.4;
        ch.rotation.x += dt * u.rs; ch.rotation.y += dt * u.rs * 0.7;
      });
    }
    // tech motion
    if (techGroup.visible) {
      techGroup.userData.wire.rotation.y += dt * 0.18;
      techGroup.userData.wire.rotation.x += dt * 0.06;
      techGroup.position.y = 0.4 + Math.sin(t * 0.7) * 0.25;
      techGroup.userData.qubits.forEach(q => {
        const u = q.userData;
        u.a += dt * 0.35 * u.s;
        q.position.set(Math.cos(u.a) * u.r, Math.sin(u.a * 1.3) * 1.6, Math.sin(u.a) * u.r);
      });
    }

    camera.position.x += (mouse.x * 1.3 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.3, 0);

    renderer.render(scene, camera);
    if (!reduced) requestAnimationFrame(tick);
  }

  // paint the saved theme instantly, then start
  window.__setSceneTheme(currentTheme());
  if (currentTheme() === 'tech') {
    mix = 1; col.set(colTarget);
    pGeo.attributes.color.needsUpdate = true;
    fogCur.copy(PAL.tech.fog); scene.fog.color.copy(fogCur);
  }
  tick();
})();
