const UNLOCK_MONTH = "04";
const UNLOCK_DAY = "04";

/* =====================================================
   BACKGROUND: hand-drawn lily line art, scattered
===================================================== */
function lilySVG(){
  return `
  <svg class="lily" width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 150 C60 110 55 90 60 60" stroke="#D96C93" stroke-width="2"/>
    <path d="M60 100 C40 95 30 105 22 118" stroke="#D96C93" stroke-width="1.6"/>
    <path d="M60 115 C80 108 90 118 96 130" stroke="#D96C93" stroke-width="1.6"/>
    <g transform="translate(60,54)">
      <path d="M0 0 C-18 -10 -22 -34 0 -52 C22 -34 18 -10 0 0 Z" stroke="#C9678F" stroke-width="1.5"/>
      <path d="M0 0 C-8 -18 -6 -40 0 -54 C6 -40 8 -18 0 0 Z" stroke="#C9678F" stroke-width="1.3"/>
      <path d="M0 -2 C-24 -18 -18 -6 -34 6" stroke="#C9678F" stroke-width="1.4"/>
      <path d="M0 -2 C24 -18 18 -6 34 6" stroke="#C9678F" stroke-width="1.4"/>
      <line x1="0" y1="-4" x2="-4" y2="-30" stroke="#C2477A" stroke-width="1"/>
      <line x1="0" y1="-4" x2="5" y2="-28" stroke="#C2477A" stroke-width="1"/>
      <line x1="0" y1="-4" x2="0" y2="-32" stroke="#C2477A" stroke-width="1"/>
    </g>
  </svg>`;
}
function scatterLilies(){
  const field = document.getElementById('lilyField');
  const positions = [
    {top:'-4%', left:'-3%', rot:'-8deg', scale:1.1},
    {top:'62%', left:'-6%', rot:'6deg', scale:0.9},
    {top:'-6%', left:'80%', rot:'10deg', scale:1.0},
    {top:'70%', left:'86%', rot:'-6deg', scale:1.15},
    {top:'34%', left:'46%', rot:'3deg', scale:0.6},
  ];
  positions.forEach(p=>{
    const wrap = document.createElement('div');
    wrap.innerHTML = lilySVG();
    const svg = wrap.firstElementChild;
    svg.style.top = p.top;
    svg.style.left = p.left;
    svg.style.transform = `rotate(${p.rot}) scale(${p.scale})`;
    field.appendChild(svg);
  });
}
function spawnPetals(){
  const dr = document.getElementById('petalDrift');
  const colors = ['#FBE1EA','#F6C9DC','#F8DCE7'];
  for(let i=0;i<14;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    const left = Math.random()*100;
    const dur = 14 + Math.random()*14;
    const delay = Math.random()*-20;
    const size = 8 + Math.random()*10;
    p.style.left = left+'vw';
    p.style.width = size+'px';
    p.style.height = (size*0.7)+'px';
    p.style.borderRadius = '60% 40% 60% 40%';
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = dur+'s';
    p.style.animationDelay = delay+'s';
    dr.appendChild(p);
  }
}
scatterLilies();
spawnPetals();

/* =====================================================
   NAVIGATION
===================================================== */
function goTo(id){
  document.querySelectorAll('.stage').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0, behavior:'instant'});
}

/* =====================================================
   LOGIN
===================================================== */
const loginForm = document.getElementById('loginForm');
const dlMonth = document.getElementById('dlMonth');
const dlDay = document.getElementById('dlDay');
const lockError = document.getElementById('lockError');

dlMonth.addEventListener('input', ()=>{
  dlMonth.value = dlMonth.value.replace(/\D/g,'').slice(0,2);
  if(dlMonth.value.length === 2) dlDay.focus();
});
dlDay.addEventListener('input', ()=>{
  dlDay.value = dlDay.value.replace(/\D/g,'').slice(0,2);
});

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const m = dlMonth.value.padStart(2,'0');
  const d = dlDay.value.padStart(2,'0');
  if(m === UNLOCK_MONTH && d === UNLOCK_DAY){
    goTo('screen-hub');
  } else {
    lockError.textContent = 'Try again, love.';
    const wrap = document.querySelector('.lock-wrap');
    wrap.classList.remove('shake');
    void wrap.offsetWidth;
    wrap.classList.add('shake');
  }
});

/* =====================================================
   CAROUSEL — infinite rotation of fixed photos
===================================================== */
const carouselFrame = document.getElementById('carouselFrame');
const carouselDots = document.getElementById('carouselDots');
let carouselIndex = 0;

function initCarousel(){
  const imgs = carouselFrame.querySelectorAll('img');
  if(imgs.length === 0) return;

  imgs.forEach((img, i)=>{
    const dot = document.createElement('span');
    if(i === 0) dot.classList.add('active');
    carouselDots.appendChild(dot);
  });

  if(imgs.length > 1){
    setInterval(()=>{
      const dots = carouselDots.querySelectorAll('span');
      const current = imgs[carouselIndex];
      current.classList.remove('show');
      current.classList.add('hide-left');
      dots[carouselIndex].classList.remove('active');

      carouselIndex = (carouselIndex + 1) % imgs.length;
      imgs[carouselIndex].classList.add('show');
      dots[carouselIndex].classList.add('active');

      setTimeout(()=> current.classList.remove('hide-left'), 1000);
    }, 3800);
  }
}
initCarousel();
