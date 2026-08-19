/* === BABYLON.JS 3D LAB + ANIME.JS ANIMATIONS === */
(function(){
  /* ===========================
     BABYLON.JS: INTERACTIVE 3D LAB
     =========================== */
  const babylonCanvas=document.getElementById('babylonCanvas');
  if(window.BABYLON&&babylonCanvas){
    const engine=new BABYLON.Engine(babylonCanvas,true,{preserveDrawingBuffer:true,stencil:true});
    const scene=new BABYLON.Scene(engine);
    scene.clearColor=new BABYLON.Color4(0,0,0,0);

    const camera=new BABYLON.ArcRotateCamera('camera',-Math.PI/2.3,1.08,8.3,BABYLON.Vector3.Zero(),scene);
    camera.lowerRadiusLimit=5;camera.upperRadiusLimit=12;
    camera.attachControl(babylonCanvas,true);

    const light=new BABYLON.HemisphericLight('light',new BABYLON.Vector3(0,1,0),scene);
    light.intensity=1.15;

    const light2=new BABYLON.PointLight('pointLight',new BABYLON.Vector3(0,3,4),scene);
    light2.intensity=0.4;
    light2.diffuse=new BABYLON.Color3(0.96,0.78,0.28);

    const keys=['A','S','D','F','J','K','L','Ñ'];
    const fingerColors={
      left:[[0.18,0.56,0.54],[0.15,0.47,0.42],[0.22,0.62,0.58],[0.28,0.68,0.64]],
      right:[[0.96,0.48,0.37],[0.92,0.55,0.42],[0.88,0.42,0.35],[0.82,0.52,0.45]]
    };
    const activeGlow=new BABYLON.Color3(0.97,0.78,0.28);

    const meshes=[];
    const glowMeshes=[];

    keys.forEach((key,index)=>{
      const mesh=BABYLON.MeshBuilder.CreateBox(key,{
        width:0.8,height:0.3,depth:0.8,
        faceColors:null
      },scene);

      const pos=(index<4?index:index+1)*0.9-3.8;
      mesh.position.x=pos;
      mesh.position.y=Math.sin(index)*0.08;

      const material=new BABYLON.StandardMaterial(`${key}Mat`,scene);
      const colors=index<4?fingerColors.left[index]:fingerColors.right[index-4];
      material.diffuseColor=new BABYLON.Color3(...colors);
      material.specularColor=new BABYLON.Color3(0.6,0.6,0.6);
      material.emissiveColor=new BABYLON.Color3(0,0,0);
      mesh.material=material;

      mesh.rotation.y=index%2?0.1:-0.1;

      /* Dynamic texture for key label */
      const dt=new BABYLON.DynamicTexture(`${key}Tex`,128,scene,true);
      const ctx=dt.getContext();
      ctx.clearRect(0,0,128,128);
      ctx.fillStyle='rgba(255,255,255,0.9)';
      ctx.font='bold 64px Manrope, sans-serif';
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.fillText(key==='Ñ'?'Ñ':key,64,64);
      dt.update();
      material.diffuseTexture=dt;

      /* Glow layer for active highlight */
      const glow=new BABYLON.GlowLayer('glow',scene,{mainTextureSamples:4});
      glow.intensity=0;
      glowMeshes.push({glow,mesh,baseColor:material.diffuseColor.clone(),baseEmissive:material.emissiveColor.clone()});

      meshes.push(mesh);
    });

    /* Keyboard interaction - highlight keys when pressed */
    const keyMap={};
    keys.forEach((k,i)=>keyMap[k.toLowerCase()]=i);
    keyMap['ñ']=7;

    document.addEventListener('keydown',(e)=>{
      const idx=keyMap[e.key.toLowerCase()];
      if(idx!==undefined){
        const gm=glowMeshes[idx];
        gm.mesh.material.emissiveColor=activeGlow;
        gm.mesh.material.diffuseColor=new BABYLON.Color3(0.97,0.85,0.4);
        BABYLON.Animation.CreateAndStartAnimation('pop',gm.mesh,'scaling',60,8,
          new BABYLON.Vector3(1,1,1),new BABYLON.Vector3(1.15,1.25,1.15),
          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      }
    });

    document.addEventListener('keyup',(e)=>{
      const idx=keyMap[e.key.toLowerCase()];
      if(idx!==undefined){
        const gm=glowMeshes[idx];
        gm.mesh.material.emissiveColor=gm.baseEmissive;
        gm.mesh.material.diffuseColor=gm.baseColor;
        BABYLON.Animation.CreateAndStartAnimation('pop',gm.mesh,'scaling',60,8,
          new BABYLON.Vector3(1.15,1.25,1.15),new BABYLON.Vector3(1,1,1),
          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      }
    });

    /* Floating animation */
    scene.registerBeforeRender(()=>{
      const t=performance.now()*0.001;
      meshes.forEach((mesh,i)=>{
        mesh.position.y+=Math.sin(t*1.5+i)*0.0008;
        mesh.rotation.y=Math.sin(t*0.5+i*0.7)*0.08;
      });
    });

    engine.runRenderLoop(()=>scene.render());
    window.addEventListener('resize',()=>engine.resize());
  }

  /* ===========================
     ANIME.JS: PAGE ANIMATIONS
     =========================== */
  if(!window.anime)return;

  /* Initial load reveal */
  anime({
    targets:'.lesson-hero, .path-section, .progress-overview, .method-section, .motion-lab, .bottom-cta',
    opacity:[0,1],
    translateY:[20,0],
    delay:anime.stagger(100),
    duration:700,
    easing:'easeOutCubic'
  });

  /* Scroll-triggered animations */
  const observerOptions={threshold:0.15};

  function createScrollObserver(selector,animationOpts){
    const els=document.querySelectorAll(selector);
    if(!els.length)return;
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          anime(animationOpts);
          observer.unobserve(entry.target);
        }
      });
    },observerOptions);
    els.forEach(el=>{
      el.style.opacity='0';
      observer.observe(el);
    });
  }

  /* Lesson grid cards stagger */
  createScrollObserver('.lesson-grid a',{
    targets:'.lesson-grid a',
    opacity:[0,1],
    translateY:[24,0],
    scale:[0.95,1],
    delay:anime.stagger(80),
    duration:500,
    easing:'easeOutCubic'
  });

  /* Method grid cards */
  createScrollObserver('.method-grid article',{
    targets:'.method-grid article',
    opacity:[0,1],
    translateY:[30,0],
    rotateX:[-5,0],
    delay:anime.stagger(120),
    duration:600,
    easing:'easeOutCubic'
  });

  /* Metric list items */
  createScrollObserver('.metric-list article',{
    targets:'.metric-list article',
    opacity:[0,1],
    translateX:[-20,0],
    delay:anime.stagger(100),
    duration:500,
    easing:'easeOutCubic'
  });

  /* Bottom CTA */
  createScrollObserver('.bottom-cta',{
    targets:'.bottom-cta',
    opacity:[0,1],
    translateY:[30,0],
    duration:600,
    easing:'easeOutCubic'
  });

  /* Progress overview */
  createScrollObserver('.progress-overview',{
    targets:'.progress-overview',
    opacity:[0,1],
    scale:[0.97,1],
    duration:700,
    easing:'easeOutCubic'
  });

  /* Number counter animation for metrics */
  function animateCounters(){
    const stats=document.querySelectorAll('.metric-list b');
    stats.forEach(el=>{
      const text=el.textContent;
      const num=parseInt(text);
      if(!isNaN(num)){
        const suffix=text.replace(/\d/g,'');
        const obj={val:0};
        anime({
          targets:obj,
          val:num,
          duration:1200,
          easing:'easeOutExpo',
          update:()=>{el.textContent=Math.round(obj.val)+suffix;}
        });
      }
    });
  }

  const metricObserver=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        animateCounters();
        metricObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.3});
  const metricSection=document.querySelector('.metric-list');
  if(metricSection)metricObserver.observe(metricSection);

  /* Completion modal animation */
  const modal=document.getElementById('completionModal');
  if(modal){
    const modalObserver=new MutationObserver(()=>{
      if(!modal.hidden){
        anime({
          targets:'.modal-card',
          scale:[0.8,1],
          opacity:[0,1],
          duration:400,
          easing:'easeOutBack'
        });
        anime({
          targets:'.modal-stars span',
          scale:[0,1],
          delay:anime.stagger(100,{start:200}),
          duration:300,
          easing:'easeOutBack'
        });
      }
    });
    modalObserver.observe(modal,{attributes:true,attributeFilter:['hidden']});
  }

  /* Brand mark subtle pulse */
  anime({
    targets:'.brand-mark',
    boxShadow:['0 5px 12px #18334a18','0 5px 18px #18334a28','0 5px 12px #18334a18'],
    duration:3000,
    loop:true,
    easing:'easeInOutSine'
  });

})();
