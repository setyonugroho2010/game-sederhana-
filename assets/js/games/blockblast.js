/* ===== BLOCK BLAST ===== */
function bb(){
const SH='X|XX|X/X|XXX|X/X/X|XXXX|X/X/X/X|XX/XX|XXX/XXX/XXX|X./XX|XX/X.|.X/XX|XX/.X|X../X../XXX|XXX/X../X..|XX./.XX|.XX/XX.|X./XX/.X|.X/XX/X.|XXX/.X.'.split('|').map(s=>{let c=[];s.split('/').forEach((r,y)=>[...r].forEach((k,x)=>k=='X'&&c.push([y,x])));return c}),
IC=['<svg viewBox="0 0 24 24"><path d="M12 4c-4 0-7 3-7 7 0 4 3 7 7 9 4-2 7-5 7-9 0-4-3-7-7-7z"/><path d="M8 11l2 2M16 11l-2 2M9 20l-1 2M15 20l1 2"/></svg>','<svg viewBox="0 0 24 24"><path d="M3 17c3-7 5 3 8-2s5-4 8-3"/><circle cx="20" cy="12" r="1.5"/><path d="M5 20c3-3 6 1 9-1"/></svg>','<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 13l4-4M7 13h1M12 8v1M17 13h-1"/></svg>'];
let g,pcs,score,lvl,prog,en,over;
st.innerHTML='<div id="bar"><i></i></div><div id="board"></div><div id="bot"><div id="ab"></div><div id="tray"></div></div>';
const B=$('#board'),T=$('#tray'),A=$('#ab');
for(let i=0;i<64;i++)B.appendChild(document.createElement('div'));
const dim=p=>[Math.max(...p.map(a=>a[0]))+1,Math.max(...p.map(a=>a[1]))+1],
fits=(p,r,c)=>p.every(([y,x])=>{y+=r;x+=c;return y>=0&&y<8&&x>=0&&x<8&&!g[y*8+x]}),
fill=()=>{pcs=[0,1,2].map(()=>({s:SH[Math.random()*SH.length|0],c:1+Math.random()*3|0}))},
clr=l=>l.forEach(i=>g[i]=g[i]==4?3:g[i]==5?5:0),
AB=[['Trojan.exe',2,()=>g=g.map(v=>v==4?3:v)],
['Worm_Clear',3,()=>{let b=-1,bi=0;for(let i=0;i<8;i++){let n=0;for(let j=0;j<8;j++)g[i*8+j]&&g[i*8+j]<5&&n++;if(n>b){b=n;bi=i}}clr([...Array(8)].map((_,j)=>bi*8+j))}],
['Overclock',2,()=>fill()]];
function spawn(){let e=[];g.forEach((v,i)=>v||e.push(i));
for(let k=0,n=Math.min(1+lvl,4);k<n&&e.length>20;k++){g[e.splice(Math.random()*e.length|0,1)[0]]=4}
for(let t=0;t<30;t++){let s=(Math.random()*7|0)*8+(Math.random()*7|0),q=[s,s+1,s+8,s+9];if(q.every(i=>!g[i])){q.forEach(i=>g[i]=5);break}}}
function draw(sh,s,c){let [h,w]=dim(sh),e=document.createElement('div');e.style.gridTemplateColumns='repeat('+w+','+s+'px)';e.style.gridAutoRows=s+'px';
for(let y=0;y<h;y++)for(let x=0;x<w;x++){let i=document.createElement('i');if(sh.some(a=>a[0]==y&&a[1]==x))i.className='k'+c;e.appendChild(i)}return e}
function render(){[...B.children].forEach((d,i)=>d.className='t k'+g[i]);T.innerHTML='';
pcs.forEach((p,k)=>{let w=document.createElement('div');w.style.cssText='width:100px;display:flex;justify-content:center';
if(p){let e=draw(p.s,20,p.c);e.className='pc';e.onpointerdown=ev=>drag(ev,k,e);w.appendChild(e)}T.appendChild(w)});
A.innerHTML='';AB.forEach(([n,cost,f],j)=>{let b=document.createElement('button');b.innerHTML=IC[j]+n+'<b></b>';b.className=en>=cost?'rdy':'';
b.onclick=()=>{if(over||en<cost)return;en-=cost;f();if(!pcs.some(Boolean))fill();render();chk()};A.appendChild(b)});
$('#hud').innerHTML='<span>'+String(score).padStart(6,'0')+'</span><span>SERVER_'+String(lvl).padStart(2,'0')+'</span>';$('#bar i').style.width=prog/6*100+'%'}
function chk(){if(en<2&&!pcs.some(q=>q&&[...Array(64)].some((_,i)=>fits(q.s,i>>3,i&7)))){over=1;sv('bb',score);$('#msg').textContent='Game Over! Skor terbaik: '+best.bb}}
function drag(ev,k,src){if(over)return;ev.preventDefault();let p=pcs[k],cs=B.clientWidth/8,[h,w]=dim(p.s),f=draw(p.s,cs-2,p.c),pos=null;f.id='fl';document.body.appendChild(f);src.style.opacity=.3;
const mv=e=>{let rc=B.getBoundingClientRect(),L=e.clientX-w*cs/2,Tp=e.clientY-h*cs/2-60;f.style.left=L+'px';f.style.top=Tp+'px';
let r=Math.round((Tp-rc.top-B.clientTop)/cs),c=Math.round((L-rc.left-B.clientLeft)/cs);
B.querySelectorAll('.gh').forEach(d=>d.classList.remove('gh'));pos=fits(p.s,r,c)?[r,c]:null;pos&&p.s.forEach(([y,x])=>B.children[(y+r)*8+x+c].classList.add('gh'))};
const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);f.remove();pos?place(k,pos):src.style.opacity=1};
addEventListener('pointermove',mv);addEventListener('pointerup',up);mv(ev)}
function place(k,[r,c]){let p=pcs[k],cl=new Set(),n=0,all=j=>[...Array(8)].every((_,q)=>j(q));
p.s.forEach(([y,x])=>g[(y+r)*8+x+c]=p.c);score+=p.s.length;pcs[k]=null;
for(let i=0;i<8;i++){if(all(j=>g[i*8+j])){n++;for(let j=0;j<8;j++)cl.add(i*8+j)}if(all(j=>g[j*8+i])){n++;for(let j=0;j<8;j++)cl.add(j*8+i)}}
if(n){score+=n*10*n;en+=n;prog+=n;clr([...cl]);if(prog>=6){lvl++;prog=0;g=g.map(v=>v==5?0:v);spawn()}}
if(!pcs.some(Boolean))fill();render();chk()}
g=Array(64).fill(0);score=0;lvl=1;prog=0;en=0;over=0;fill();spawn();render()}
