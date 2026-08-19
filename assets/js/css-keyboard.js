/* === 3D CSS KEYBOARD INTERACTION === */
(function(){
  const keyboard=document.querySelector('.css-keyboard');
  const screen=document.querySelector('.css-keyboard .screen');
  if(!keyboard||!screen)return;

  const keys=document.querySelectorAll('.css-key');
  let charCount=0;

  /* Mouse tracking - keyboard follows cursor */
  document.querySelector('.css-keyboard-wrap')?.addEventListener('mousemove',(e)=>{
    const rect=e.currentTarget.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-0.5;
    const y=(e.clientY-rect.top)/rect.height-0.5;
    keyboard.style.transform=`perspective(10000px) rotateX(${y*10+50}deg) rotateZ(-${x*40+25}deg)`;
  });

  /* Key code to index mapping */
  const keyMap={
    192:0,49:1,50:2,51:3,52:4,53:5,54:6,55:7,56:8,57:9,48:10,189:11,187:12,
    81:13,87:14,69:15,82:16,84:17,89:18,85:19,73:20,79:21,80:22,191:23,
    65:27,83:28,68:29,70:30,71:31,72:32,74:33,75:34,76:35,192:36,
    90:41,88:42,67:43,86:44,66:45,78:46,77:47,
    32:53,13:39,8:27
  };

  function addKey(e){
    const idx=keyMap[e.keyCode];
    if(idx!==undefined&&keys[idx]){
      keys[idx].classList.add('key--down');
      /* Show typed character on screen */
      if(e.keyCode>=65&&e.keyCode<=90){
        screen.textContent+=String.fromCharCode(e.keyCode);
        charCount++;
        if(charCount>10){screen.textContent='';charCount=0;}
      }else if(e.keyCode===32){
        screen.innerHTML+='&nbsp;';
        charCount++;
        if(charCount>10){screen.textContent='';charCount=0;}
      }else if(e.keyCode===8){
        screen.textContent='';
        charCount=0;
      }
    }
  }

  function removeKey(e){
    const idx=keyMap[e.keyCode];
    if(idx!==undefined&&keys[idx]){
      keys[idx].classList.remove('key--down');
    }
  }

  window.addEventListener('keydown',addKey);
  window.addEventListener('keyup',removeKey);
})();
