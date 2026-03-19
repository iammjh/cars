// ── SLIDE DATA ──────────────────────────────────────────────
const slides = [
  { brand:'NISSAN NISMO',           c1:'#ffffff',c2:'#e8001a',c3:'#8a0010', accent:'#ff2233', dot:'#e8001a', glassBg:'rgba(232,0,26,0.07)',   glassBorder:'rgba(232,0,26,0.25)',   overlay:'linear-gradient(130deg,rgba(6,0,0,0.86) 0%,rgba(6,0,0,0.12) 55%,rgba(6,0,0,0.74) 100%)' },
  { brand:'MERCEDES-AMG',           c1:'#d4fff6',c2:'#00d2b4',c3:'#006b5c', accent:'#00d2b4', dot:'#00d2b4', glassBg:'rgba(0,210,180,0.07)', glassBorder:'rgba(0,210,180,0.22)', overlay:'linear-gradient(130deg,rgba(0,10,8,0.86) 0%,rgba(0,10,8,0.10) 55%,rgba(0,10,8,0.76) 100%)' },
  { brand:'PORSCHE AG',             c1:'#ffe8b0',c2:'#ffcc44',c3:'#996600', accent:'#ffd966', dot:'#ffcc44', glassBg:'rgba(255,200,60,0.07)',  glassBorder:'rgba(255,200,60,0.22)',  overlay:'linear-gradient(130deg,rgba(8,4,0,0.84) 0%,rgba(8,4,0,0.12) 55%,rgba(8,4,0,0.72) 100%)' },
  { brand:'BMW M GMBH',             c1:'#deeeff',c2:'#4a90e2',c3:'#1a3a6b', accent:'#6aaaf5', dot:'#4a90e2', glassBg:'rgba(74,144,226,0.07)', glassBorder:'rgba(74,144,226,0.22)', overlay:'linear-gradient(130deg,rgba(0,4,18,0.86) 0%,rgba(0,4,18,0.10) 55%,rgba(0,4,18,0.74) 100%)' },
  { brand:'AUTOMOBILI LAMBORGHINI', c1:'#f5ffc8',c2:'#c8f000',c3:'#5a7000', accent:'#d4ff30', dot:'#c8f000', glassBg:'rgba(180,230,0,0.07)',  glassBorder:'rgba(180,230,0,0.22)',  overlay:'linear-gradient(130deg,rgba(2,6,0,0.88) 0%,rgba(2,6,0,0.10) 55%,rgba(2,6,0,0.76) 100%)' },
  { brand:'FERRARI S.P.A.',         c1:'#ffd0c8',c2:'#ff4422',c3:'#991100', accent:'#ff6644', dot:'#ff4422', glassBg:'rgba(255,68,34,0.07)',  glassBorder:'rgba(255,68,34,0.22)',  overlay:'linear-gradient(130deg,rgba(16,0,0,0.88) 0%,rgba(16,0,0,0.10) 55%,rgba(16,0,0,0.76) 100%)' },
];

const TOTAL = slides.length;
let current = 0, animating = false;

// ── IMAGE CAROUSEL DATA ─────────────────────────────────────
const carouselImages = {
  0: ['assets/gtr.jpg', 'assets/gtr1.jpg', 'assets/gtr2.jpg'],           // Nissan GT-R
  1: [],                                                                   // Mercedes-AMG (no carousel)
  2: ['assets/porsche.jpeg', 'assets/porsche1.jpeg', 'assets/porsche2.jpeg', 'assets/porsche3.jpeg'], // Porsche
  3: ['assets/bmw.jpeg', 'assets/bmw1.jpeg', 'assets/bmw2.jpeg'],        // BMW
  4: ['assets/lamorgini.jpeg', 'assets/lamorgini1.jpeg', 'assets/lamorgini2.jpeg'], // Lamborghini
  5: ['assets/ferarri.jpeg', 'assets/ferarri1.jpeg', 'assets/ferarri2.jpeg'], // Ferrari
};

let carouselIndex = {};
let carouselIntervals = {};

// Initialize carousel indices
for (let i = 0; i < TOTAL; i++) {
  carouselIndex[i] = 0;
  carouselIntervals[i] = null;
}

function cycleCarouselImage(slideIdx) {
  if (!carouselImages[slideIdx] || carouselImages[slideIdx].length === 0) return;
  
  const slideInner = document.querySelector(`.bg-slide:nth-child(${slideIdx + 1}) .bg-slide-inner`);
  if (!slideInner) return;
  
  // Fade out
  slideInner.style.opacity = '0';
  
  // Change image after fade out completes
  setTimeout(() => {
    const images = carouselImages[slideIdx];
    slideInner.style.backgroundImage = `url('${images[carouselIndex[slideIdx]]}')`;
    carouselIndex[slideIdx] = (carouselIndex[slideIdx] + 1) % images.length;
    // Fade in
    slideInner.style.opacity = '1';
  }, 500);
}

function startCarousel(slideIdx) {
  if (!carouselImages[slideIdx] || carouselImages[slideIdx].length === 0) return;
  
  // Start first cycle immediately
  cycleCarouselImage(slideIdx);
  
  // Set interval for subsequent cycles
  carouselIntervals[slideIdx] = setInterval(() => {
    cycleCarouselImage(slideIdx);
  }, 5000); // Change image every 5 seconds
}

function stopCarousel(slideIdx) {
  if (carouselIntervals[slideIdx]) {
    clearInterval(carouselIntervals[slideIdx]);
    carouselIntervals[slideIdx] = null;
  }
}

// ── INIT ────────────────────────────────────────────────────
document.getElementById('bg-track').style.width = `${TOTAL * 100}vw`;
document.getElementById('nav-total').textContent = String(TOTAL).padStart(2,'0');

// Build dots
const dotsEl = document.getElementById('slide-dots');
slides.forEach((_,i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i===0?' active':'');
  d.dataset.i = i;
  d.addEventListener('click', () => goTo(i, i>current?1:-1));
  dotsEl.appendChild(d);
});

// Hide panels 1+
for (let i=1; i<TOTAL; i++) {
  const el = document.getElementById(`sc${i}`);
  el.style.display = 'none';
  el.style.opacity = '0';
}

// ── PALETTE ─────────────────────────────────────────────────
function applyPalette(idx) {
  const s = slides[idx], r = document.documentElement.style;
  r.setProperty('--c1', s.c1); r.setProperty('--c2', s.c2); r.setProperty('--c3', s.c3);
  r.setProperty('--accent', s.accent); r.setProperty('--dot', s.dot);
  r.setProperty('--glass-bg', s.glassBg); r.setProperty('--glass-border', s.glassBorder);
  document.querySelectorAll('.hl-gradient').forEach(el => {
    el.style.backgroundImage = `linear-gradient(90deg,${s.c2},${s.c1},${s.c3})`;
  });
  document.querySelectorAll('.bg-overlay').forEach((el,i) => {
    el.style.background = (slides[i]||s).overlay;
  });
  document.getElementById('slide-brand').textContent = s.brand;
}

// ── BG TRACK ────────────────────────────────────────────────
function updateBgTrack(idx) {
  document.getElementById('bg-track').style.transform = `translateX(${-idx*100}vw)`;
}

// ── CONTENT TRANSITION ──────────────────────────────────────
function updateContent(prev, next, dir) {
  const pEl = document.getElementById(`sc${prev}`);
  const nEl = document.getElementById(`sc${next}`);

  nEl.style.transition = 'none';
  nEl.style.opacity = '0';
  nEl.style.transform = `translateY(${dir*55}px)`;
  nEl.style.pointerEvents = 'none';
  nEl.style.display = 'flex';
  void nEl.offsetHeight; // force reflow

  pEl.style.transition = 'transform 0.78s cubic-bezier(0.77,0,0.175,1),opacity 0.52s ease';
  pEl.style.transform = `translateY(${dir*-55}px)`;
  pEl.style.opacity = '0';
  pEl.style.pointerEvents = 'none';

  nEl.style.transition = 'transform 0.78s cubic-bezier(0.77,0,0.175,1),opacity 0.62s ease';
  nEl.style.transform = 'translateY(0px)';
  nEl.style.opacity = '1';

  setTimeout(() => {
    pEl.style.display = 'none';
    pEl.style.transform = '';
    nEl.style.pointerEvents = 'auto';
    animating = false;
  }, 860);
}

// ── NAVIGATE ────────────────────────────────────────────────
function goTo(idx, dir) {
  if (animating||idx===current||idx<0||idx>=TOTAL) return;
  animating = true;
  const prev = current; current = idx;
  applyPalette(idx); updateBgTrack(idx);
  updateContent(prev, idx, dir);
  updateDots(); updateCounter(); updateProgress();
  const h = document.getElementById('nav-hint');
  h.style.opacity='0'; h.style.pointerEvents='none';
  
  // Stop carousel for previous slide, start for current slide
  stopCarousel(prev);
  startCarousel(idx);
}
function next() { goTo(current+1, 1); }
function prev() { goTo(current-1,-1); }

function updateDots()    { document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===current)); }
function updateCounter() { document.getElementById('nav-current').textContent=String(current+1).padStart(2,'0'); }
function updateProgress(){ document.getElementById('progress-line').style.width=`${((current+1)/TOTAL)*100}%`; }

// ── INPUT ───────────────────────────────────────────────────
let wLock=false;
window.addEventListener('wheel',e=>{ if(wLock)return; wLock=true; e.deltaY>0?next():prev(); setTimeout(()=>wLock=false,1100); },{passive:true});
window.addEventListener('keydown',e=>{ if(e.key==='ArrowDown'||e.key==='ArrowRight')next(); if(e.key==='ArrowUp'||e.key==='ArrowLeft')prev(); });
let tY=0,tX=0;
window.addEventListener('touchstart',e=>{tY=e.touches[0].clientY;tX=e.touches[0].clientX;},{passive:true});
window.addEventListener('touchend',e=>{
  const dy=tY-e.changedTouches[0].clientY, dx=tX-e.changedTouches[0].clientX;
  if(Math.abs(dy)>Math.abs(dx)){if(dy>40)next();else if(dy<-40)prev();}
  else{if(dx>40)next();else if(dx<-40)prev();}
},{passive:true});

// ── CURSOR + PARALLAX ────────────────────────────────────────
const cursor=document.getElementById('cursor'), trail=document.getElementById('cursor-trail');
document.addEventListener('mousemove',e=>{
  cursor.style.left=e.clientX+'px'; cursor.style.top=e.clientY+'px';
  trail.style.left=e.clientX+'px';  trail.style.top=e.clientY+'px';
  const px=(e.clientX/innerWidth-0.5)*2, py=(e.clientY/innerHeight-0.5)*2;
  document.getElementById('parallax-layer').style.transform=`translate(${px*14}px,${py*9}px)`;
});
document.querySelectorAll('button,.dot,.nav-links a').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.style.transform='translate(-50%,-50%) scale(2.4)');
  el.addEventListener('mouseleave',()=>cursor.style.transform='translate(-50%,-50%) scale(1)');
});

// ── TICKER ───────────────────────────────────────────────────
const tickerData=[
  {l:'NISSAN GT-R NISMO 2025',v:'600 HP'},{l:'MERCEDES-AMG GT BLACK SERIES',v:'730 HP'},
  {l:'PORSCHE 911 GT3 RS',v:'525 HP'},{l:'BMW M4 CSL',v:'550 HP'},
  {l:'LAMBORGHINI REVUELTO',v:'1,001 HP'},{l:'FERRARI SF90 STRADALE',v:'1,000 HP'},
  {l:'GT3 RS · NÜRBURGRING',v:'6:49.3'},{l:'REVUELTO 0–100',v:'2.5 SEC'},
  {l:'SF90 STRADALE',v:'MARANELLO 2025'},{l:'BMW M4 CSL UNITS',v:'1,000 ONLY'},
  {l:'REVUELTO V12 RPM',v:'9,500 RPM'},{l:'GT3 RS DOWNFORCE',v:'860 KG'},
];
(function(){
  const ts=document.getElementById('ticker-scroll');
  const arr=[...tickerData,...tickerData];
  ts.innerHTML=arr.map(t=>`<div class="ticker-item">${t.l} &nbsp;·&nbsp; <span>${t.v}</span></div>`).join('');
})();

// ── BOOTSTRAP ────────────────────────────────────────────────
applyPalette(0);
updateProgress();
startCarousel(0); // Start carousel for initial slide on page load
// Init all gradient headlines per their slide
document.querySelectorAll('.slide-content').forEach((sc,i)=>{
  const s=slides[i]||slides[0];
  sc.querySelectorAll('.hl-gradient').forEach(el=>{
    el.style.backgroundImage=`linear-gradient(90deg,${s.c2},${s.c1},${s.c3})`;
  });
});
document.querySelectorAll('.bg-overlay').forEach((el,i)=>{
  el.style.background=(slides[i]||slides[0]).overlay;
});