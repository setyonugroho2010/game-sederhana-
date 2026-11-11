/* Helper bersama: state global, skor, input, dan pemilih game */
const $=s=>document.querySelector(s),st=$('#stage');
let cur='bb',tmr,K=()=>{},best={};
const G={bb:()=>bb(),sn:()=>snake(),'2k':()=>g2048()};

fetch('api/score.php').then(r=>r.json()).then(j=>{best=j}).catch(()=>{try{best=JSON.parse(localStorage.getItem('gj')||'{}')}catch(e){}});

function sv(n,v){
  if(v<=(best[n]||0))return;
  best[n]=v;
  try{localStorage.setItem('gj',JSON.stringify(best))}catch(e){}
  fetch('api/score.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({game:n,score:v})}).catch(()=>{});
}
function hud(n,s){$('#hud').innerHTML='<span>Skor: '+s+'</span><span>Terbaik: '+Math.max(best[n]||0,s)+'</span>'}
function go(k){
  cur=k;clearInterval(tmr);K=()=>{};
  $('#msg').textContent='';$('#hud').innerHTML='';st.innerHTML='';
  document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.g==k));
  G[k]();
}
addEventListener('keydown',e=>{if(e.key.startsWith('Arrow')){e.preventDefault();K(e.key.slice(5))}});
function swipe(el,f){let x,y;el.addEventListener('pointerdown',e=>{x=e.clientX;y=e.clientY});el.addEventListener('pointerup',e=>{let dx=e.clientX-x,dy=e.clientY-y;if(Math.max(Math.abs(dx),Math.abs(dy))<20)return;f(Math.abs(dx)>Math.abs(dy)?(dx>0?'Right':'Left'):(dy>0?'Down':'Up'))})}
