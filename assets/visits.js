/* สถิติผู้เข้าชมเว็บ: นับ 1 คนต่อเบราว์เซอร์ต่อวัน (เวลาไทย) เก็บยอดที่ Supabase
   ตั้งค่า: ใส่ URL โปรเจกต์ และ anon / publishable key (คีย์สาธารณะ ใส่ในเว็บได้)
   ถ้ายังว่าง กล่องสถิติจะซ่อนไว้ ไม่ส่งอะไรออกไป */
(function(){
  var SUPABASE_URL='';   // เช่น https://abcdxyz.supabase.co
  var SUPABASE_KEY='';   // anon / publishable key
  var box=document.getElementById('visit-stats');
  if(!box||!SUPABASE_URL||!SUPABASE_KEY||!window.fetch) return;
  if(navigator.webdriver) return;

  var today;
  try{ today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok'}).format(new Date()); }
  catch(e){ today=new Date(Date.now()+7*36e5).toISOString().slice(0,10); }
  var KEY='codera-visit-day', count=true;
  try{ count=localStorage.getItem(KEY)!==today; }catch(e){}

  fetch(SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/rpc/track_visit',{
    method:'POST',
    headers:{'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},
    body:JSON.stringify({p_count:count})
  }).then(function(r){ if(!r.ok) throw r.status; return r.json(); })
  .then(function(d){
    if(count){ try{ localStorage.setItem(KEY,today); }catch(e){} }
    [].forEach.call(box.querySelectorAll('[data-k]'),function(n){
      var v=Number(d[n.dataset.k]); n.textContent=isFinite(v)?v.toLocaleString('en-US'):'–';
    });
    box.hidden=false;
  }).catch(function(){});
})();
