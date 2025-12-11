// Background animated gradient blobs (lightweight)
(() => {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, t = 0;
  function resize(){w = canvas.width = innerWidth; h = canvas.height = innerHeight}
  addEventListener('resize', resize, {passive:true}); resize();
  function draw(){
    t += 0.007;
    ctx.clearRect(0,0,w,h);
    // three moving radial gradients
    const blobs = [
      {x:0.15+0.3*Math.sin(t*0.9), y:0.25+0.1*Math.cos(t*1.1), r: Math.min(w,h)*0.6, c:'#7c3aed'},
      {x:0.8+0.2*Math.cos(t*0.7), y:0.2+0.15*Math.sin(t*0.8), r: Math.min(w,h)*0.5, c:'#06b6d4'},
      {x:0.55+0.18*Math.sin(t*1.3), y:0.7+0.1*Math.cos(t*1.2), r: Math.min(w,h)*0.55, c:'#ff7ab6'}
    ];
    blobs.forEach(b => {
      const gx = ctx.createRadialGradient(b.x*w,b.y*h,0,b.x*w,b.y*h,b.r);
      gx.addColorStop(0, hexToRgba(b.c,0.22));
      gx.addColorStop(0.5, hexToRgba(b.c,0.07));
      gx.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gx; ctx.beginPath(); ctx.rect(0,0,w,h); ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  function hexToRgba(hex,a){
    const h = hex.replace('#',''); const r = parseInt(h.slice(0,2),16); const g = parseInt(h.slice(2,4),16); const b = parseInt(h.slice(4,6),16);
    return `rgba(${r},${g},${b},${a})`;
  }
  draw();
})();

// IntersectionObserver for reveal
(function(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

// Typing effect for hero heading
document.addEventListener('DOMContentLoaded', ()=>{
  const h = document.querySelector('.hero-left h2');
  if(!h) return;
  const full = "Hello — I'm Naveen";
  h.textContent = '';
  let i = 0;
  const speed = 60;
  (function type(){
    if(i <= full.length){
      h.textContent = full.slice(0,i) + (i % 2 === 0 ? '|' : '');
      i++; setTimeout(type, speed);
    } else {
      h.textContent = full; // cleanup
    }
  })();
});

