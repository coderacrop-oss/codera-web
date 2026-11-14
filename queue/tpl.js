/* Codera · เทมเพลตตัวอย่างบนหน้าคิว
   เลือกได้หลายแบบ → ส่งให้แอดมิน: บันทึกลงชีต (Apps Script ?api=pick) แล้วเปิด LINE @codera.th พร้อมข้อความรหัสที่เลือก */
(function(){
var TPL = {"items": [{"id": "ST-gadget", "style": "ST", "biz": "gadget", "title": "มือถือมือสอง · เช็ก 3 จุดก่อนซื้อ"}, {"id": "NB-gadget", "style": "NB", "biz": "gadget", "title": "มือถือมือสอง · เช็ก 3 จุดก่อนซื้อ"}, {"id": "NB-fin", "style": "NB", "biz": "fin", "title": "เก็บเงินไม่อยู่? · เริ่มจากงบ 3 ช่อง"}, {"id": "ST-oem", "style": "ST", "biz": "oem", "title": "อยากมีแบรนด์ · เริ่มผลิตกับเรา"}, {"id": "NB-ai", "style": "NB", "biz": "ai", "title": "ใช้ AI ทำงาน · ให้เสร็จเร็วขึ้น"}, {"id": "NB-eng", "style": "NB", "biz": "eng", "title": "พูดอังกฤษ · ไม่ต้องแปลในหัว"}, {"id": "ST-ac", "style": "ST", "biz": "ac", "title": "แอร์ไม่เย็น · เช็ก 3 จุดก่อนเรียกช่าง"}, {"id": "NB-mkt", "style": "NB", "biz": "mkt", "title": "ยิงแอดแล้วเงียบ · เช็ก 3 อย่างนี้"}, {"id": "NB-math", "style": "NB", "biz": "math", "title": "โจทย์ปัญหา · อ่านทีเดียวเข้าใจ"}, {"id": "ST-solar", "style": "ST", "biz": "solar", "title": "ค่าไฟพุ่ง · โซลาร์ช่วยได้แค่ไหน"}, {"id": "NB-ac", "style": "NB", "biz": "ac", "title": "แอร์ไม่เย็น · เช็ก 3 จุดก่อนเรียกช่าง"}, {"id": "NB-solar", "style": "NB", "biz": "solar", "title": "ค่าไฟพุ่ง · โซลาร์ช่วยได้แค่ไหน"}, {"id": "ST-mkt", "style": "ST", "biz": "mkt", "title": "ยิงแอดแล้วเงียบ · เช็ก 3 อย่างนี้"}, {"id": "NB-oem", "style": "NB", "biz": "oem", "title": "อยากมีแบรนด์ · เริ่มผลิตกับเรา"}, {"id": "AU-gadget", "style": "AU", "biz": "gadget", "title": "มือถือมือสอง · เช็ก 3 จุดก่อนซื้อ"}, {"id": "ST-math", "style": "ST", "biz": "math", "title": "โจทย์ปัญหา · อ่านทีเดียวเข้าใจ"}, {"id": "AU-fin", "style": "AU", "biz": "fin", "title": "เก็บเงินไม่อยู่? · เริ่มจากงบ 3 ช่อง"}, {"id": "AU-ai", "style": "AU", "biz": "ai", "title": "ใช้ AI ทำงาน · ให้เสร็จเร็วขึ้น"}, {"id": "ST-eng", "style": "ST", "biz": "eng", "title": "พูดอังกฤษ · ไม่ต้องแปลในหัว"}, {"id": "AU-eng", "style": "AU", "biz": "eng", "title": "พูดอังกฤษ · ไม่ต้องแปลในหัว"}, {"id": "AU-mkt", "style": "AU", "biz": "mkt", "title": "ยิงแอดแล้วเงียบ · เช็ก 3 อย่างนี้"}, {"id": "AU-math", "style": "AU", "biz": "math", "title": "โจทย์ปัญหา · อ่านทีเดียวเข้าใจ"}, {"id": "AU-ac", "style": "AU", "biz": "ac", "title": "แอร์ไม่เย็น · เช็ก 3 จุดก่อนเรียกช่าง"}, {"id": "AU-solar", "style": "AU", "biz": "solar", "title": "ค่าไฟพุ่ง · โซลาร์ช่วยได้แค่ไหน"}, {"id": "AU-oem", "style": "AU", "biz": "oem", "title": "อยากมีแบรนด์ · เริ่มผลิตกับเรา"}, {"id": "CL-gadget", "style": "CL", "biz": "gadget", "title": "มือถือมือสอง · เช็ก 3 จุดก่อนซื้อ"}, {"id": "CL-fin", "style": "CL", "biz": "fin", "title": "เก็บเงินไม่อยู่? · เริ่มจากงบ 3 ช่อง"}, {"id": "CL-ai", "style": "CL", "biz": "ai", "title": "ใช้ AI ทำงาน · ให้เสร็จเร็วขึ้น"}, {"id": "CL-eng", "style": "CL", "biz": "eng", "title": "พูดอังกฤษ · ไม่ต้องแปลในหัว"}, {"id": "CL-mkt", "style": "CL", "biz": "mkt", "title": "ยิงแอดแล้วเงียบ · เช็ก 3 อย่างนี้"}, {"id": "CL-math", "style": "CL", "biz": "math", "title": "โจทย์ปัญหา · อ่านทีเดียวเข้าใจ"}, {"id": "CL-ac", "style": "CL", "biz": "ac", "title": "แอร์ไม่เย็น · เช็ก 3 จุดก่อนเรียกช่าง"}, {"id": "CL-solar", "style": "CL", "biz": "solar", "title": "ค่าไฟพุ่ง · โซลาร์ช่วยได้แค่ไหน"}, {"id": "CL-oem", "style": "CL", "biz": "oem", "title": "อยากมีแบรนด์ · เริ่มผลิตกับเรา"}, {"id": "KT-gadget", "style": "KT", "biz": "gadget", "title": "มือถือมือสอง · เช็ก 3 จุดก่อนซื้อ"}, {"id": "KT-fin", "style": "KT", "biz": "fin", "title": "เก็บเงินไม่อยู่? · เริ่มจากงบ 3 ช่อง"}, {"id": "KT-ai", "style": "KT", "biz": "ai", "title": "ใช้ AI ทำงาน · ให้เสร็จเร็วขึ้น"}, {"id": "KT-eng", "style": "KT", "biz": "eng", "title": "พูดอังกฤษ · ไม่ต้องแปลในหัว"}, {"id": "KT-mkt", "style": "KT", "biz": "mkt", "title": "ยิงแอดแล้วเงียบ · เช็ก 3 อย่างนี้"}, {"id": "KT-math", "style": "KT", "biz": "math", "title": "โจทย์ปัญหา · อ่านทีเดียวเข้าใจ"}, {"id": "KT-ac", "style": "KT", "biz": "ac", "title": "แอร์ไม่เย็น · เช็ก 3 จุดก่อนเรียกช่าง"}, {"id": "KT-solar", "style": "KT", "biz": "solar", "title": "ค่าไฟพุ่ง · โซลาร์ช่วยได้แค่ไหน"}, {"id": "KT-oem", "style": "KT", "biz": "oem", "title": "อยากมีแบรนด์ · เริ่มผลิตกับเรา"}], "styles": [{"k": "ST", "n": "สตูดิโอสินค้า", "d": "ภาพถ่ายสินค้าจริงหลายมุม เรียบหรู"}, {"k": "NB", "n": "นีโอบรูทัล", "d": "กรอบดำหนา เงาแข็ง สีสด"}, {"k": "AU", "n": "ออโรรากลาส", "d": "แสงไล่สี + การ์ดกระจก"}, {"k": "CL", "n": "เคลย์ 3D", "d": "รูปทรงนุ่มเหมือนดินปั้น"}, {"k": "KT", "n": "ตัวอักษรใหญ่", "d": "ตัวหนังสือเต็มจอ เหมาะทำคลิป"}], "biz": [{"k": "gadget", "n": "ร้านมือถือ/แกดเจ็ต"}, {"k": "fin", "n": "คอร์สการเงิน"}, {"k": "ai", "n": "คอร์ส AI"}, {"k": "eng", "n": "คอร์สภาษาอังกฤษ"}, {"k": "mkt", "n": "คอร์สการตลาด"}, {"k": "math", "n": "ติวคณิต"}, {"k": "ac", "n": "ช่างแอร์"}, {"k": "solar", "n": "ติดตั้งโซลาร์"}, {"k": "oem", "n": "รับผลิต OEM"}]};
var API = 'https://script.google.com/macros/s/AKfycbyFCrbQghxDF0T_6TGiDO2kW3BGNUWG2ScI6EKVb3Kq63mrBSzB-ydBS-wACWXtBabNhw/exec';
var OA = 'https://line.me/R/oaMessage/%40codera.th/?';
var $ = function(s,r){return (r||document).querySelector(s);};
var grid=$('#tpl-grid'), bar=$('#tpl-bar'), cnt=$('#tpl-count'), dlg=$('#tpl-dlg'), view=$('#tpl-view');
if(!grid) return;
var sel=[], fBiz='all', fSty='all';
var SN={}, BN={}; TPL.styles.forEach(function(s){SN[s.k]=s;}); TPL.biz.forEach(function(b){BN[b.k]=b.n;});
function chips(el, list, key, onPick){
  el.innerHTML='';
  [{k:'all',n:'ทั้งหมด'}].concat(list).forEach(function(o){
    var b=document.createElement('button'); b.type='button'; b.className='tchip'; b.textContent=o.n; b.dataset.k=o.k;
    b.setAttribute('aria-pressed', o.k==='all'?'true':'false');
    b.addEventListener('click',function(){ el.querySelectorAll('.tchip').forEach(function(x){x.setAttribute('aria-pressed','false');}); b.setAttribute('aria-pressed','true'); onPick(o.k); });
    el.appendChild(b);
  });
}
chips($('#tpl-fbiz'), TPL.biz, 'biz', function(k){fBiz=k; render();});
chips($('#tpl-fsty'), TPL.styles, 'style', function(k){fSty=k; render();});
var RAT=['4/5','1/1','4/5','5/6','4/5','9/10'];
function render(){
  var items=TPL.items.filter(function(it){return (fBiz==='all'||it.biz===fBiz)&&(fSty==='all'||it.style===fSty);});
  grid.innerHTML=''; var idx=0;
  items.forEach(function(it){
    var on=sel.indexOf(it.id)>-1;
    var card=document.createElement('div'); card.className='tcard'+(on?' on':'');
    card.innerHTML='<div class="tpin" style="aspect-ratio:4/5"><button type="button" class="topen" aria-label="ดูทั้งชุด 15 ภาพ '+it.id+'">'+
      '<img loading="lazy" decoding="async" width="720" height="900" src="/assets/tpl/'+it.id+'.webp?v=9" alt="ตัวอย่าง '+SN[it.style].n+' · '+BN[it.biz]+'"></button>'+
      '<span class="t15">ดูทั้งชุด 15 ภาพ</span>'+
      '<button type="button" class="tick" aria-pressed="'+on+'" aria-label="เลือกชุด '+it.id+'"><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'+(on?'เลือกแล้ว':'เลือก')+'</button></div>'+
      '<div class="tcap"><b>'+(it.title||BN[it.biz])+'</b><span>'+SN[it.style].n+' · '+BN[it.biz]+'</span></div>';
    card.querySelector('.tick').addEventListener('click',function(e){e.stopPropagation(); toggle(it.id);});
    card.querySelector('.topen').addEventListener('click',function(){zoom(it);});
    grid.appendChild(card);
  });
  if(!items.length) grid.innerHTML='<div class="empty">ยังไม่มีแบบในหมวดนี้</div>';
}
function toggle(id){ var i=sel.indexOf(id); if(i>-1) sel.splice(i,1); else if(sel.length<20) sel.push(id); render(); upd(); }
function upd(){ cnt.textContent=sel.length; bar.hidden=!sel.length; $('#tpl-sel').textContent=sel.join(', '); }
var FUN=[['ดึงคนใหม่','ภาพ 1–5 · ให้คนไม่รู้จักร้านหยุดดู เซฟ แชร์'],['สร้างความเชื่อ','ภาพ 6–10 · ขั้นตอน ก่อน/หลัง รีวิว คำถาม'],['ปิดการขาย','ภาพ 11–15 · แพ็กเกจ เงื่อนไข ชวนทัก']];
function src(id,n){ return '/assets/tpl/set/'+id+'-'+(n<10?'0':'')+n+'.webp?v=9'; }
var cur=null;
function zoom(it){
  cur=it;
  $('#tpl-vtitle').textContent=(it.title||BN[it.biz]);
  $('#tpl-vcap').textContent=SN[it.style].n+' · '+BN[it.biz]+' · 15 ภาพ · รหัส '+it.id;
  var car=$('#tpl-vcar'), tabs=$('#tpl-vtabs'); car.innerHTML=''; tabs.innerHTML='';
  for(var n=1;n<=15;n++){ var d=document.createElement('div'); d.className='tvsl';
    d.innerHTML='<img '+(n>3?'loading="lazy" ':'')+'decoding="async" width="900" height="1125" src="'+src(it.id,n)+'" alt="ภาพที่ '+n+' จาก 15 ของชุด '+it.id+' ('+FUN[Math.floor((n-1)/5)][0]+')">';
    car.appendChild(d); }
  FUN.forEach(function(f,k){ var t=document.createElement('button'); t.type='button'; t.className='tvtab'; t.setAttribute('role','tab');
    t.innerHTML=f[0]+'<small>'+(k*5+1)+'–'+(k*5+5)+'</small>'; t.addEventListener('click',function(){go(k*5);}); tabs.appendChild(t); });
  var b=$('#tpl-vpick'); b.textContent= sel.indexOf(it.id)>-1 ? 'เอาชุดนี้ออก' : 'เลือกชุดนี้';
  b.onclick=function(){toggle(it.id); view.close();};
  view.showModal(); car.scrollLeft=0; sync(0);
}
function slideW(){ var c=$('#tpl-vcar'), s=c.children[0]; return s? s.getBoundingClientRect().width+parseFloat(getComputedStyle(c).columnGap||getComputedStyle(c).gap||14):1; }
function idxNow(){ var c=$('#tpl-vcar'), m=c.getBoundingClientRect(), mid=m.left+m.width/2, best=0, bd=1e9; [].forEach.call(c.children,function(el,i){ var r=el.getBoundingClientRect(), d=Math.abs(r.left+r.width/2-mid); if(d<bd){bd=d;best=i;} }); return best; }
function go(i){ var c=$('#tpl-vcar'); i=Math.max(0,Math.min(14,i)); var el=c.children[i]; if(!el) return; c.scrollTo({left:el.offsetLeft-(c.clientWidth-el.offsetWidth)/2,behavior:(matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth')}); }
function sync(i){
  $('#tpl-vno').textContent=(i+1)+' / 15'; var k=Math.floor(i/5);
  $('#tpl-vfun').textContent=FUN[k][0]+' · '+FUN[k][1].split(' · ')[1];
  $('#tpl-vtabs').querySelectorAll('.tvtab').forEach(function(t,j){t.setAttribute('aria-selected',j===k?'true':'false');});
  $('#tpl-vprev').disabled=i===0; $('#tpl-vnext').disabled=i===14;
}
(function(){ var c=$('#tpl-vcar'), tm; if(!c) return;
  c.addEventListener('scroll',function(){ clearTimeout(tm); tm=setTimeout(function(){sync(idxNow());},60); },{passive:true});
  c.addEventListener('keydown',function(e){ if(e.key==='ArrowRight'){e.preventDefault();go(idxNow()+1);} if(e.key==='ArrowLeft'){e.preventDefault();go(idxNow()-1);} });
  $('#tpl-vprev').addEventListener('click',function(){go(idxNow()-1);});
  $('#tpl-vnext').addEventListener('click',function(){go(idxNow()+1);});
})();
$('#tpl-clear').addEventListener('click',function(){sel=[]; render(); upd();});
$('#tpl-send').addEventListener('click',function(){
  var bz={}; sel.forEach(function(id){var k=id.split('-')[1]; bz[BN[k]]=1;});
  var f=$('#tpl-form'); if(!f.biz.value) f.biz.value=Object.keys(bz).join(', ');
  $('#tpl-step1').hidden=false; $('#tpl-step2').hidden=true; $('#tpl-err').hidden=true;
  dlg.showModal();
});
document.querySelectorAll('[data-close]').forEach(function(b){b.addEventListener('click',function(){b.closest('dialog').close();});});
function msg(f){ return 'ส่งดีไซน์ที่ชอบ\nร้าน: '+f.shop.value.trim()+'\nประเภท: '+f.biz.value.trim()+'\nแบบที่เลือก: '+sel.join(', ')+(f.note.value.trim()?'\nหมายเหตุ: '+f.note.value.trim():''); }
$('#tpl-form').addEventListener('submit',function(e){
  e.preventDefault(); var f=e.target, err=$('#tpl-err');
  if(!f.shop.value.trim()||!f.contact.value.trim()){ err.textContent='กรอกชื่อร้านและช่องทางติดต่อกลับก่อนนะครับ'; err.hidden=false; (f.shop.value.trim()?f.contact:f.shop).focus(); return; }
  var btn=f.querySelector('[type=submit]'); btn.disabled=true; btn.textContent='กำลังส่ง…';
  var q='?api=pick&ids='+encodeURIComponent(sel.join(','))+'&shop='+encodeURIComponent(f.shop.value.trim())+'&biz='+encodeURIComponent(f.biz.value.trim())+'&contact='+encodeURIComponent(f.contact.value.trim())+'&note='+encodeURIComponent(f.note.value.trim());
  var ctl=new AbortController(), t=setTimeout(function(){ctl.abort();},9000);
  fetch(API+q,{signal:ctl.signal}).then(function(r){return r.json();}).then(function(j){return !!(j&&j.ok);}).catch(function(){return false;})
  .then(function(ok){
    clearTimeout(t); btn.disabled=false; btn.textContent='ส่งให้แอดมิน';
    $('#tpl-line').href=OA+encodeURIComponent(msg(f));
    $('#tpl-okmsg').textContent= ok ? 'บันทึกแบบที่เลือกแล้ว ทีมจะใช้เป็นจุดตั้งต้นทำภาพ v1 ของร้านคุณ กดปุ่มด้านล่างเพื่อแจ้งแอดมินใน LINE จะได้คุยต่อเร็วขึ้น' : 'กดปุ่มด้านล่างเพื่อส่งแบบที่เลือกให้แอดมินทาง LINE ข้อความถูกเตรียมไว้ให้แล้ว';
    $('#tpl-step1').hidden=true; $('#tpl-step2').hidden=false;
    try{gtag('event','select_template',{items:sel.length,saved:ok});}catch(_){}
  });
});
render(); upd();
})();
