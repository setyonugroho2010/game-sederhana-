/* ===== 2048 ===== */
function g2048(){
st.innerHTML='<div id="g2"></div>';const E=$('#g2');let b,sc=0;
const add=()=>{let e=[];b.forEach((v,i)=>v||e.push(i));if(e.length)b[e[Math.random()*e.length|0]]=Math.random()<.9?2:4};
function show(){E.innerHTML='';b.forEach(v=>{let d=document.createElement('div');if(v){d.textContent=v;d.style.background='hsl('+(40-Math.log2(v)*3.5)+',90%,'+(75-Math.log2(v)*3)+'%)';d.style.color=v>4?'#fff':'#333'}E.appendChild(d)});hud('2k',sc)}
function slide(l){let a=l.filter(Boolean),o=[];for(let i=0;i<a.length;i++){if(a[i]==a[i+1]){o.push(a[i]*2);sc+=a[i]*2;i++}else o.push(a[i])}while(o.length<4)o.push(0);return o}
K=k=>{let n=[...b];for(let i=0;i<4;i++){let idx=[0,1,2,3].map(j=>k=='Left'||k=='Right'?i*4+j:j*4+i);if(k=='Right'||k=='Down')idx.reverse();
let r=slide(idx.map(j=>b[j]));idx.forEach((j,q)=>n[j]=r[q])}
if(n.some((v,i)=>v!=b[i])){b=n;add();show();if(!b.includes(0)&&![...Array(16)].some((_,i)=>(i%4<3&&b[i]==b[i+1])||(i<12&&b[i]==b[i+4]))){sv('2k',sc);$('#msg').textContent='Game Over!'}}};
swipe(E,K);b=Array(16).fill(0);add();add();show()}
