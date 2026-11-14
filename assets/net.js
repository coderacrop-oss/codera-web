window.codaNet=function(cv,o){
  if(!cv||!cv.getContext) return;
  o=o||{}; var DARK=!!o.dark;
  var INK=DARK?'255,255,255':'17,17,17', GREEN='155,209,55', BG=DARK?'#111111':'#f6f6f3';
  var ctx=cv.getContext('2d'), W=0,H=0,G=24, nodes=[], edges=[], packets=[], raf=0,last=0,spawnT=0,visible=true;
  var reduce=false; try{ reduce=matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  var SRC=['PAGE','IG','LINE','ADS','CHAT'], MID=['TAG','ORDER','CRM','DATA','SYNC'], OUT=['PLAN','REPORT','KPI','ROI'];
  function snap(v){ return Math.round(v/G)*G; }
  function build(){
    var dpr=Math.min(2,devicePixelRatio||1); W=cv.clientWidth; H=cv.clientHeight;
    cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    nodes=[]; edges=[]; packets=[];
    var L=W<420?4:W<760?5:6, rowsAvail=Math.max(4,Math.floor((H-3.5*G)/G)), layers=[];
    for(var i=0;i<L;i++){
      var n=Math.max(2,Math.min(Math.floor(rowsAvail/2), 3+((Math.random()*2)|0))), used={}, col=[];
      var x=snap(G*2.5+(W-G*5)*i/(L-1));
      for(var j=0;j<n;j++){
        var r, tries=0; do{ r=1+((Math.random()*(rowsAvail-1))|0); tries++; }while((used[r]||used[r-1]||used[r+1])&&tries<60); if(tries>=60) continue; used[r]=1;
        var label=null;
        if(i===0) label=SRC[j%SRC.length]; else if(i===L-1) label=OUT[j%OUT.length]; else if(Math.random()<.4) label=MID[(Math.random()*MID.length)|0];
        col.push({x:x,y:r*G+G*.5,label:label,flash:0,out:[]});
      }
      col.sort(function(a,b){return a.y-b.y;}); col.forEach(function(nd){nodes.push(nd);}); layers.push(col);
    }
    for(var i=0;i<L-1;i++){
      var A=layers[i],B=layers[i+1];
      A.forEach(function(a){
        var s=B.slice().sort(function(p,q){return Math.abs(p.y-a.y)-Math.abs(q.y-a.y);});
        var k=1+((Math.random()*2)|0);
        for(var m=0;m<k&&m<s.length;m++) link(a,s[m],i);
      });
      B.forEach(function(b){ if(!edges.some(function(e){return e.b===b;})) link(A[(Math.random()*A.length)|0],b,i); });
    }
    first=layers[0];
  }
  var first=[];
  function link(a,b,i){
    var xm=snap(a.x+(b.x-a.x)*(.35+.3*Math.random()));
    var pts=[[a.x,a.y],[xm,a.y],[xm,b.y],[b.x,b.y]];
    var len=0; for(var k=1;k<pts.length;k++) len+=Math.abs(pts[k][0]-pts[k-1][0])+Math.abs(pts[k][1]-pts[k-1][1]);
    var e={a:a,b:b,pts:pts,len:len,heat:0}; edges.push(e); a.out.push(e);
  }
  function at(e,d){
    var p=e.pts;
    for(var k=1;k<p.length;k++){ var seg=Math.abs(p[k][0]-p[k-1][0])+Math.abs(p[k][1]-p[k-1][1]);
      if(d<=seg||k===p.length-1){ var t=seg?Math.min(1,d/seg):1; return [p[k-1][0]+(p[k][0]-p[k-1][0])*t,p[k-1][1]+(p[k][1]-p[k-1][1])*t]; } d-=seg; }
    return p[p.length-1];
  }
  function path(e){
    var p=e.pts, r=6; ctx.beginPath(); ctx.moveTo(p[0][0],p[0][1]);
    for(var k=1;k<p.length-1;k++){ ctx.arcTo(p[k][0],p[k][1],p[k+1][0],p[k+1][1],Math.min(r,Math.abs(p[k+1][1]-p[k][1])/2||r)); }
    ctx.lineTo(p[p.length-1][0],p[p.length-1][1]);
  }
  function send(n){
    if(!n.out.length||packets.length>14) return;
    n.out.slice().sort(function(){return Math.random()-.5;}).slice(0,Math.random()<.3?2:1).forEach(function(e){ packets.push({e:e,d:0,v:.12+Math.random()*.05}); });
  }
  function rr(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
  function draw(ts){
    var dt=Math.min(50,ts-(last||ts)); last=ts;
    ctx.clearRect(0,0,W,H);
    ctx.lineCap='round'; ctx.lineJoin='round';
    edges.forEach(function(e){ e.heat*=.97;
      path(e); ctx.lineWidth=1.25; ctx.strokeStyle='rgba('+INK+','+(DARK?.16:.16)+')'; ctx.stroke();
      if(e.heat>.02){ path(e); ctx.lineWidth=2; ctx.strokeStyle='rgba('+GREEN+','+(e.heat*.9).toFixed(3)+')'; ctx.stroke(); }
    });
    for(var k=packets.length-1;k>=0;k--){
      var pk=packets[k]; pk.d+=pk.v*dt; pk.e.heat=Math.max(pk.e.heat,.85);
      for(var s=3;s>=0;s--){ var q=at(pk.e,Math.max(0,pk.d-s*7)); var sz=s?4-s*.6:6;
        ctx.fillStyle=s?'rgba('+GREEN+','+(.7-s*.18).toFixed(2)+')':'rgb('+GREEN+')'; ctx.fillRect(q[0]-sz/2,q[1]-sz/2,sz,sz); }
      if(pk.d>=pk.e.len){ packets.splice(k,1); pk.e.b.flash=1; send(pk.e.b); }
    }
    ctx.font='600 10px "IBM Plex Mono",ui-monospace,monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
    nodes.forEach(function(n){ n.flash*=.955; var on=n.flash>.25;
      if(n.label){ var w=ctx.measureText(n.label).width+16, h=20;
        rr(n.x-w/2,n.y-h/2,w,h,5); ctx.fillStyle=on?'rgb('+GREEN+')':BG; ctx.fill();
        ctx.lineWidth=1.25; ctx.strokeStyle=on?'rgb('+GREEN+')':'rgba('+INK+',.55)'; ctx.stroke();
        ctx.fillStyle=on?'#14200a':'rgba('+INK+',.85)'; ctx.fillText(n.label,n.x,n.y+.5);
      } else {
        ctx.fillStyle=on?'rgb('+GREEN+')':'rgba('+INK+',.75)'; ctx.fillRect(n.x-3.5,n.y-3.5,7,7);
        if(n.flash>.05){ ctx.strokeStyle='rgba('+GREEN+','+(n.flash*.7).toFixed(3)+')'; ctx.lineWidth=1; var g=6+(1-n.flash)*8; ctx.strokeRect(n.x-g,n.y-g,g*2,g*2); }
      }
    });
    spawnT-=dt; if(spawnT<=0){ spawnT=1200+Math.random()*900; var s0=first[(Math.random()*first.length)|0]; if(s0){ s0.flash=1; send(s0);} }
    if(!reduce&&visible) raf=requestAnimationFrame(draw);
  }
  build();
  if(reduce){ edges.forEach(function(e,i){ if(i%3===0) e.heat=.6; }); last=0; draw(16); return; }
  raf=requestAnimationFrame(draw);
  var rt; addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(build,250); });
  if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ es.forEach(function(e){ var was=visible; visible=e.isIntersecting&&!document.hidden; if(visible&&!was){ last=0; cancelAnimationFrame(raf); raf=requestAnimationFrame(draw);} }); }).observe(cv); }
  document.addEventListener('visibilitychange',function(){ if(document.hidden){ visible=false; cancelAnimationFrame(raf);} else { visible=true; last=0; cancelAnimationFrame(raf); raf=requestAnimationFrame(draw);} });
};
