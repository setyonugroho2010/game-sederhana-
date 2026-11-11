/* ===== SNAKE ===== */
function snake(){
st.innerHTML='<canvas id="c" width="360" height="360"></canvas>';const c=$('#c'),x=c.getContext('2d'),N=18,S=20;
let s=[[9,9],[8,9],[7,9]],d=[1,0],nd=d,f,sc=0,dead=0;
const food=()=>{do f=[Math.random()*N|0,Math.random()*N|0];while(s.some(a=>a[0]==f[0]&&a[1]==f[1]))};food();
K=k=>{let m={Up:[0,-1],Down:[0,1],Left:[-1,0],Right:[1,0]}[k];if(m&&(m[0]+d[0]||m[1]+d[1]))nd=m};swipe(c,K);
function paint(){x.fillStyle=getComputedStyle(c).backgroundColor;x.fillRect(0,0,360,360);x.fillStyle='#ff5d6c';x.fillRect(f[0]*S+2,f[1]*S+2,S-4,S-4);
s.forEach((a,i)=>{x.fillStyle=i?'#2ed573':'#16a34a';x.fillRect(a[0]*S+1,a[1]*S+1,S-2,S-2)})}
hud('sn',0);paint();
tmr=setInterval(()=>{if(dead)return;d=nd;let h=[s[0][0]+d[0],s[0][1]+d[1]];
if(h[0]<0||h[1]<0||h[0]>=N||h[1]>=N||s.some(a=>a[0]==h[0]&&a[1]==h[1])){dead=1;sv('sn',sc);hud('sn',sc);$('#msg').textContent='Game Over!';return}
s.unshift(h);if(h[0]==f[0]&&h[1]==f[1]){sc+=10;food();hud('sn',sc)}else s.pop();paint()},120)}
