/* === ANIMATED BACKGROUND: FALLING LETTERS + GRADIENT === */
(function(){
  const canvas=document.getElementById('homeBgCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const gradientEl=document.querySelector('.home-gradient');

  let W,H;
  function resize(){
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
  }
  resize();
  window.addEventListener('resize',resize);

  const isDark=()=>document.body.classList.contains('theme-dark');

  /* Letters pool - keyboard characters */
  const LETTERS='ASDFJKLÑQWERTYUIOPZXCVBNM'.split('');
  const LIGHT_COLORS=[
    'rgba(43,149,141,0.14)',
    'rgba(43,149,141,0.09)',
    'rgba(56,126,121,0.11)',
    'rgba(251,118,95,0.08)',
    'rgba(248,200,72,0.07)',
    'rgba(155,224,223,0.10)',
    'rgba(184,229,209,0.09)',
    'rgba(199,221,255,0.08)',
  ];
  const DARK_COLORS=[
    'rgba(155,224,223,0.12)',
    'rgba(155,224,223,0.07)',
    'rgba(93,212,199,0.09)',
    'rgba(251,118,95,0.06)',
    'rgba(248,200,72,0.05)',
    'rgba(184,229,209,0.08)',
    'rgba(199,221,255,0.06)',
    'rgba(158,219,214,0.07)',
  ];

  class Letter{
    constructor(){
      this.reset(true);
    }
    reset(init){
      this.char=LETTERS[Math.floor(Math.random()*LETTERS.length)];
      this.x=Math.random()*W;
      this.y=init?Math.random()*H:-40-Math.random()*300;
      this.size=Math.random()*26+16;
      this.speed=Math.random()*0.5+0.15;
      this.drift=(Math.random()-0.5)*0.25;
      this.opacity=Math.random()*0.16+0.04;
      this.colorIdx=Math.floor(Math.random()*LIGHT_COLORS.length);
      this.rotation=Math.random()*Math.PI*2;
      this.rotSpeed=(Math.random()-0.5)*0.008;
      this.wobbleAmp=Math.random()*40+15;
      this.wobbleSpeed=Math.random()*0.006+0.002;
      this.wobbleOffset=Math.random()*Math.PI*2;
      this.t=0;
      this.blur=Math.random()>0.6;
      this.fadeIn=0;
    }
    update(){
      this.t++;
      if(this.fadeIn<1)this.fadeIn+=0.015;
      this.y+=this.speed;
      this.x+=this.drift+Math.sin(this.t*this.wobbleSpeed+this.wobbleOffset)*0.25;
      this.rotation+=this.rotSpeed;
      if(this.y>H+60)this.reset(false);
    }
    draw(){
      const colors=isDark()?DARK_COLORS:LIGHT_COLORS;
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha=this.opacity*Math.min(this.fadeIn,1);
      ctx.font=`600 ${this.size}px 'Manrope',sans-serif`;
      ctx.fillStyle=colors[this.colorIdx];
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      if(this.blur)ctx.filter='blur(2px)';
      ctx.fillText(this.char,0,0);
      ctx.restore();
    }
  }

  const particles=[];
  const COUNT=Math.min(Math.floor(W*H/15000),140);
  for(let i=0;i<COUNT;i++)particles.push(new Letter());

  /* Gradient palettes */
  const gradients=[
    ['#c9eee8','#b6e4de','#a3d9d5'],
    ['#e8dff5','#d4c5f0','#c2b1e8'],
    ['#d4f0ed','#b8e5d1','#a3d9c4'],
    ['#f5e6d4','#f0d4b8','#e8c2a3'],
    ['#d4e8f5','#b8d4f0','#a3c2e8'],
    ['#f5d4e8','#f0b8d4','#e8a3c2'],
    ['#e8f5d4','#d4f0b8','#c2e8a3'],
    ['#f5f0d4','#f0e8b8','#e8e0a3'],
  ];
  const darkGradients=[
    ['#1a2a2e','#1a3338','#18334a'],
    ['#2a1a33','#231830','#1e1528'],
    ['#1a2e28','#1a3330','#182a33'],
    ['#2e281a','#332e18','#2a2515'],
    ['#1a2833','#18303a','#152833'],
    ['#331a28','#331830','#2a1528'],
    ['#28331a','#303318','#282a15'],
    ['#33301a','#332e18','#2a2815'],
  ];
  let gradIdx=0;
  const GRAD_INTERVAL=6000;

  function cycleGradient(){
    gradIdx=(gradIdx+1)%gradients.length;
    const pals=isDark()?darkGradients:gradients;
    const g=pals[gradIdx];
    if(gradientEl){
      gradientEl.style.background=`linear-gradient(135deg,${g[0]},${g[1]},${g[2]})`;
    }
  }

  function animate(){
    ctx.clearRect(0,0,W,H);
    for(const p of particles){
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
  setInterval(cycleGradient,GRAD_INTERVAL);

  /* Sync gradient on theme change */
  const observer=new MutationObserver(()=>{
    const g=(isDark()?darkGradients:gradients)[gradIdx];
    if(gradientEl){
      gradientEl.style.background=`linear-gradient(135deg,${g[0]},${g[1]},${g[2]})`;
    }
  });
  observer.observe(document.body,{attributes:true,attributeFilter:['class']});
})();
