document.addEventListener('DOMContentLoaded', () => {

  /* VANTA — colores adaptados a tema claro: niebla blanca/azul cielo */
  VANTA.FOG({
    el: '#vanta-bg',
    mouseControls: true, touchControls: true, gyroControls: false,
    minHeight: 200, minWidth: 200,
    highlightColor: 0xbae6fd,  /* sky-200 */
    midtoneColor:   0x38bdf8,  /* sky-400 */
    lowlightColor:  0x0369a1,  /* sky-700 */
    baseColor:      0x05101e,  /* casi negro para contraste con tema claro exterior */
    blurFactor: 0.44,
    speed: 4.5,
    zoom: 0.6
  });

  /* ICE PARTICLES */
  const iw = document.getElementById('ice-wrap');
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.className = 'ic';
    const s = 1 + Math.random() * 2.5;
    c.style.cssText = `left:${Math.random()*100}%;bottom:${Math.random()*50}%;--d:${5+Math.random()*9}s;--del:${Math.random()*10}s;--r:-${55+Math.random()*120}px;width:${s}px;height:${s}px`;
    iw.appendChild(c);
  }

  /* CURSOR */
  const dot = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function tick(){ rx+=(mx-rx)*.1; ry+=(my-ry)*.1; dot.style.left=mx+'px'; dot.style.top=my+'px'; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(tick); })();

  /* FULLPAGE */
  const fp = document.getElementById('fp');
  const slides = Array.from(document.querySelectorAll('.fp-slide'));
  const dots   = Array.from(document.querySelectorAll('.dot-nav a'));
  const navAs  = Array.from(document.querySelectorAll('.nav-links a[data-slide]'));

  function goTo(i){ if(slides[i]) fp.scrollTo({top:slides[i].offsetTop,behavior:'smooth'}); }

  fp.addEventListener('scroll', () => {
    const mid = fp.scrollTop + fp.clientHeight * .45;
    let cur = 0;
    slides.forEach((s,i) => { if(s.offsetTop <= mid) cur=i; });
    dots.forEach((d,i) => d.classList.toggle('on', i===cur));
    navAs.forEach(a => a.classList.toggle('active', +a.dataset.slide===cur));
  });

  [...dots,...navAs].forEach(el => el.addEventListener('click', e => { e.preventDefault(); goTo(+el.dataset.slide); }));
  document.querySelectorAll('.js-go').forEach(el => el.addEventListener('click', e => { e.preventDefault(); goTo(+el.dataset.slide); }));

  /* TESTIMONIOS AUTO-CARRUSEL (sin flechas) */
  const track   = document.getElementById('testTrack');
  const pb      = document.getElementById('progressBar');
  const cards   = track.querySelectorAll('.tc');
  const PER     = 3;
  const TOTAL   = Math.ceil(cards.length / PER);
  const DUR     = 4000;
  let cur = 0, timer = null;

  function setSlide(n) {
    cur = ((n%TOTAL)+TOTAL)%TOTAL;
    track.style.transform = `translateX(-${cur * 100}%)`;
    pb.style.transition = 'none';
    pb.style.width = '0%';
    void pb.offsetWidth;
    pb.style.transition = `width ${DUR}ms linear`;
    pb.style.width = '100%';
  }

  function startAuto(){ clearInterval(timer); timer = setInterval(() => setSlide(cur+1), DUR); }

  track.addEventListener('mouseenter', () => { clearInterval(timer); pb.style.transition='none'; });
  track.addEventListener('mouseleave', () => { setSlide(cur); startAuto(); });

  setSlide(0);
  startAuto();
});