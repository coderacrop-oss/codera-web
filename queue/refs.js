/* Codera · แท็บ "รีเฟอเรนซ์เทรนด์": 20 สไตล์ · ฝังพิน Pinterest ผ่าน pinit.js (ปลั๊กอินทางการ ให้เครดิต + ลิงก์กลับเจ้าของ) */
(function(){
var $=function(s){return document.querySelector(s);};
var tT=$('#tab-tpl'), tR=$('#tab-ref'), pT=$('#pane-tpl'), pR=$('#pane-ref');
if(!tT||!tR||typeof REFS==='undefined') return;
var cur=null, pinjs=false;
function tab(which){
  var r=which==='ref'; tT.setAttribute('aria-selected',!r); tR.setAttribute('aria-selected',r); pT.hidden=r; pR.hidden=!r;
  if(r&&!cur) pick(REFS.styles[0].k);
  try{history.replaceState(null,'',r?'#ref':'#templates');}catch(_){}
}
tT.addEventListener('click',function(){tab('tpl');}); tR.addEventListener('click',function(){tab('ref');});
$('#ref-upd').textContent=REFS.updated;
var chips=$('#ref-chips');
REFS.styles.forEach(function(s){ var b=document.createElement('button'); b.type='button'; b.className='tchip'; b.textContent=s.n; b.dataset.k=s.k; b.setAttribute('aria-pressed','false');
  b.addEventListener('click',function(){pick(s.k);}); chips.appendChild(b); });
function loadPin(cb){
  if(window.PinUtils) return cb();
  if(!pinjs){ pinjs=true; var sc=document.createElement('script'); sc.async=true; sc.src='https://assets.pinterest.com/js/pinit.js'; sc.setAttribute('data-pin-build','pinBuild'); sc.onload=function(){cb();}; document.body.appendChild(sc); }
  else setTimeout(function(){loadPin(cb);},300);
}
function pick(k){
  var s=REFS.styles.filter(function(x){return x.k===k;})[0]; if(!s) return; cur=k;
  chips.querySelectorAll('.tchip').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k?'true':'false');});
  var info=$('#ref-info'); info.innerHTML='';
  var d=document.createElement('div');
  var h=document.createElement('h3'); h.textContent=s.n; var sm=document.createElement('small'); sm.textContent=s.en; h.appendChild(sm);
  var p=document.createElement('p'); p.textContent=s.d;
  var u=document.createElement('p'); u.className='use'; u.textContent='เหมาะกับ: '+s.use;
  d.appendChild(h); d.appendChild(p); d.appendChild(u);
  var a=document.createElement('a'); a.href='https://www.pinterest.com/search/pins/?q='+encodeURIComponent(s.q); a.target='_blank'; a.rel='noopener'; a.textContent='ค้นต่อบน Pinterest →';
  info.appendChild(d); info.appendChild(a);
  var g=$('#ref-grid'); g.innerHTML='';
  s.pins.forEach(function(id){
    var w=document.createElement('div'); w.className='rpin';
    var an=document.createElement('a'); an.href='https://www.pinterest.com/pin/'+id+'/'; an.setAttribute('data-pin-do','embedPin'); an.setAttribute('data-pin-width','medium'); an.setAttribute('data-pin-terse','true');
    an.className='rfb'; an.target='_blank'; an.rel='noopener'; an.textContent='เปิดพินบน Pinterest';
    w.appendChild(an); g.appendChild(w);
  });
  loadPin(function(){ try{ (window.pinBuild||window.PinUtils.build)(g); }catch(_){ try{window.PinUtils.build();}catch(__){} } });
}
if(location.hash==='#ref') tab('ref');
var mh=location.hash.match(/^#ref-([a-z0-9]+)$/); if(mh){ tab('ref'); pick(mh[1]); }
})();
