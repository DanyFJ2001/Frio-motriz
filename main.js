document.addEventListener('DOMContentLoaded', () => {

  /* VANTA.FOG — efecto niebla */
  if (typeof VANTA !== 'undefined' && VANTA.FOG) {
    VANTA.FOG({
      el: '#vanta-bg',
      THREE: window.THREE,
      mouseControls: true,
      touchControls:  true,
      gyroControls:   false,
      minHeight:      200,
      minWidth:       200,
      baseColor:      0x030f1e,
      highlightColor: 0x6bffff,
      midtoneColor:   0x38bdf8,
      lowlightColor:  0x0369a1,
      blurFactor:     0.30,
      speed:          4.5,
      zoom:           0.6,
    });
  } else {
    console.warn('VANTA.FOG no está disponible. Verifica que three.js y vanta.fog.min.js se cargaron correctamente.');
  }

  /* partículas */
  const iw = document.getElementById('ice-wrap');
  if (iw) {
    for (let i = 0; i < 55; i++) {
      const c = document.createElement('div');
      c.className = 'ic';
      const s = 1.5 + Math.random() * 3;
      c.style.cssText = `left:${Math.random()*100}%;bottom:${Math.random()*60}%;width:${s}px;height:${s}px;--d:${5+Math.random()*8}s;--del:${Math.random()*10}s;--r:-${60+Math.random()*120}px`;
      iw.appendChild(c);
    }
  }
   document.addEventListener("DOMContentLoaded", function() {
        const video = document.getElementById("compresor-vid");
        video.playbackRate = 1.5; 
    });

  /* cursor */
  const dot = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (dot && ring) {
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width='42px'; ring.style.height='42px'; });
      el.addEventListener('mouseleave', () => { ring.style.width='26px'; ring.style.height='26px'; });
    });
    (function tick(){ rx+=(mx-rx)*.1; ry+=(my-ry)*.1; dot.style.left=mx+'px'; dot.style.top=my+'px'; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(tick); })();
  }

  /* counter up */
  document.querySelectorAll('.si-n[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.innerHTML = current + `<sup>${suffix}</sup>`;
      if (current >= target) clearInterval(timer);
    }, 28);
  });

  /* nav sombra */
  const nav = document.querySelector('nav');
  const fp  = document.getElementById('fp');
  (fp || window).addEventListener('scroll', () => {
    const y = fp ? fp.scrollTop : window.scrollY;
    nav.style.boxShadow = y > 5 ? '0 2px 20px rgba(0,0,0,.10)' : 'none';
  }, { passive: true });

});