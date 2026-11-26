/* ARQON: упрощённая версия, убрать неон, иконки шапки, экран загрузки при открытии волны. */
(function(){try{
var K='arq:lite',R=document.documentElement;
function get(){try{return localStorage.getItem(K)==='1'}catch(e){return false}}
function put(v){try{localStorage.setItem(K,v?'1':'0')}catch(e){}}
var css=[
/* всегда: без неоновых подсветок, робот чуть приглушён */
'html [style*="drop-shadow"]{filter:none!important}',
/* везде: без цветных свечений */
'.gl-qb::after,html button.fnChip::after,html body .arqAn.arqHm::after,.arqWc::before,html div[style*="minmax(170px"]>div::before,html div[style*="minmax(170px"]>div:nth-child(3)::before{display:none!important}',
/* скорость: изоляция отрисовки тяжёлых блоков */
'.pCol,.pEv{contain:layout paint style}.pEv{content-visibility:auto}button.hbc,.arqCk{contain:layout style paint}.arqHm,.arqHab{content-visibility:auto;contain-intrinsic-size:auto 600px}',
/* упрощённая версия: без свечения, теней, размытия, фонов и точечной сетки (анимации остаются) */
'html.lite *,html.lite *::before,html.lite *::after{box-shadow:none!important;text-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}',
'html.lite body::before,html.lite body::after,html.lite #root::before,html.lite #root::after,html.lite .pg::before,html.lite .pg::after{display:none!important;background:none!important}',
'html.lite [style*="blur("]{filter:none!important}',
'html.lite [data-lgl]{background-image:none!important}',
'html.lite [data-lgt=d]{background-color:rgba(255,255,255,.07)!important}html.lite [data-lgt=l]{background-color:#e9eaec!important}',
'html.lite:root:root:root,html.lite:root body{background-image:none!important}',
'html.lite canvas.arqWn{display:none!important}',
'html.noTr #arqAiBotWrap,html.noTr canvas{visibility:hidden!important}','html.lite .arqAn::before,html.lite .arqAn::after,html.lite .arqWc::before,html.lite .arqWc::after,html.lite .arqAiHd::before,html.lite .arqAiHd::after,html.lite button.fnChip::after,html.lite div[style*="minmax(170px"]>div::before{background-image:none!important}','html.lite .arqRip{display:none!important}',
'html.lite .arqNav{background:#141618!important}',
/* шапка */
'.arqIc{width:40px!important;height:40px!important;min-width:40px!important;padding:0!important;border-radius:12px!important;border:1px solid rgba(255,255,255,.16)!important;background:rgba(255,255,255,.05)!important;display:inline-flex!important;align-items:center;justify-content:center;transition:background .2s,border-color .2s,transform .15s}',
'.arqIc:hover{background:rgba(255,255,255,.1)!important;border-color:rgba(255,255,255,.3)!important}.arqIc:active{transform:scale(.94)}',
'.arqHdr{align-items:center!important;gap:8px}',
'.arqHdr button:not(.arqIc):not(#arqLiteTg){height:40px!important;border-radius:12px!important}',
'#arqLiteTg{display:inline-flex;align-items:center;gap:9px;height:40px;padding:0 12px;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:inherit;font:600 13px/1 Archivo,system-ui,sans-serif;cursor:pointer;white-space:nowrap;flex:none;align-self:center}',
'#arqLiteTg i{position:relative;width:34px;height:20px;border-radius:10px;background:#3a3e42;flex:none;transition:background .2s}',
'#arqLiteTg i:after{content:"";position:absolute;left:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#9aa09b;transition:left .2s,background .2s}',
'html.lite #arqLiteTg i{background:#a6b4a5}html.lite #arqLiteTg i:after{left:16px;background:#141618}',
'@media (max-width:1180px){#arqLiteTg span{display:none}#arqLiteTg{padding:0 9px}}',
/* загрузка */
'#arqLd{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483000;background:var(--bg,#0b0c10);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;opacity:1;pointer-events:all}',
'#arqLd.out{opacity:0;transition:opacity .3s ease}',
'#arqLd i{width:38px;height:38px;border-radius:50%;border:3px solid rgba(255,255,255,.14);border-top-color:rgba(255,255,255,.9);animation:arqLdSp .8s linear infinite}',
'#arqLd span{font:600 12px/1 Archivo,system-ui,sans-serif;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.55)}',
'@keyframes arqLdSp{to{transform:rotate(360deg)}}',
/* единая фирменная загрузка ARQON (и для #arqLd, и для #glLoad) */
'html #arqLd,html #glLoad{gap:22px!important}',
'html #arqLd span,html #glLoad span{order:1;font-size:0!important;letter-spacing:0!important;animation:arqLdPulse 2.4s ease-in-out infinite}',
'html #arqLd span::before,html #glLoad span::before{content:"ARQON";display:block;font:800 26px/1 Archivo,system-ui,sans-serif;letter-spacing:.5em;margin-right:-.5em;color:var(--ink,#e7e8e5)}',
'html #arqLd i,html #glLoad i{order:2;position:relative;overflow:hidden;width:120px!important;height:2px!important;border:0!important;border-radius:2px!important;background:rgba(255,255,255,.12)!important;animation:none!important}',
'html #arqLd i::after,html #glLoad i::after{content:"";position:absolute;top:0;left:-40%;width:40%;height:100%;border-radius:2px;background:#a6b4a5;animation:arqLdBar 1.1s ease-in-out infinite}',
'@keyframes arqLdBar{to{left:100%}}@keyframes arqLdPulse{50%{opacity:.6}}'
].join('\n');
function apply(v){R.classList.toggle('lite',v)}
function css0(){if(!document.getElementById('arqLiteCss')){var s=document.createElement('style');s.id='arqLiteCss';s.textContent=css;document.head.appendChild(s)}}
/* ---- поиск неоновых теней в таблицах стилей ---- */
function neon(v){if(!v||v==='none')return false;var re=/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)|#([0-9a-f]{3,8})\b|var\(--([a-z0-9-]+)/gi,m;
 while((m=re.exec(v))){if(m[5]!==undefined){if(!/shadow|line|bd|card|bg|border|sh\d?$/.test(m[5]))return true}
  else if(m[1]!==undefined){var a=[+m[1],+m[2],+m[3]];if(Math.max.apply(0,a)-Math.min.apply(0,a)>=40)return true}
  else if(m[4]){var h=m[4];if(h.length<6)h=h.replace(/./g,'$&$&');var b=[parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)];if(Math.max.apply(0,b)-Math.min.apply(0,b)>=40)return true}}
 return false}
var nsig='';
function scanSheets(){var out=[],n=0;
 function walk(rs){for(var i=0;i<rs.length;i++){var r=rs[i];if(r.type===1&&r.selectorText&&r.selectorText.indexOf('arqLd')<0){n++;var s=r.style,p=[];
   if(neon(s.getPropertyValue('box-shadow')))p.push('box-shadow:none!important');
   if(neon(s.getPropertyValue('text-shadow')))p.push('text-shadow:none!important');
   var f=s.getPropertyValue('filter');if(f&&/drop-shadow/.test(f)&&neon(f))p.push('filter:none!important');
   if(p.length)out.push(r.selectorText+'{'+p.join(';')+'}')}
  else if(r.cssRules&&r.type!==7)walk(r.cssRules)}}
 var ss=document.styleSheets;for(var k=0;k<ss.length;k++){var rs;try{rs=ss[k].cssRules}catch(e){continue}if(rs)walk(rs)}
 var sig=n+':'+out.length;if(sig===nsig)return;nsig=sig;
 var el=document.getElementById('arqNeonOff');if(!el){el=document.createElement('style');el.id='arqNeonOff'}el.textContent=out.join('\n');document.head.appendChild(el)}
var seenIn=typeof WeakSet==='function'?new WeakSet():null;
function scanInline(){var all=document.querySelectorAll('[style*="shadow"]'),i=0;
 (function step(){var c=0;while(i<all.length&&c<80){var e=all[i++];c++;if(seenIn){if(seenIn.has(e))continue;seenIn.add(e)}var cs=getComputedStyle(e);
   if(cs.boxShadow&&cs.boxShadow!=='none'&&neon(cs.boxShadow))e.style.setProperty('box-shadow','none','important');}
  if(i<all.length)setTimeout(step,16)})()}
/* ---- фон: радиальные градиенты и сетка в контейнерах верхних уровней ---- */
function lum(c){var m=(c||'').match(/[\d.]+/g);if(!m||m.length<3)return 1;return(.299*m[0]+.587*m[1]+.114*m[2])/255}
function tagBg(){if(!R.classList.contains('lite'))return;var q=document.querySelectorAll('body *'),i=0;(function step(){var n=0;while(i<q.length&&n<150){var e=q[i++];n++;if(e.__lgd)continue;e.__lgd=1;var rc=e.getBoundingClientRect();if(rc.width<140||rc.height<56)continue;var s=getComputedStyle(e),bi=s.backgroundImage;if(/text/.test(s.webkitBackgroundClip||s.backgroundClip||''))continue;if(!bi||bi==='none'||!/gradient/.test(bi)||/url\(/.test(bi))continue;e.setAttribute('data-lgl','1');var bc=s.backgroundColor;if(bc==='transparent'||/,\s*0\)$/.test(bc))e.setAttribute('data-lgt',lum(s.color)<.45?'l':'d')}if(i<q.length)setTimeout(step,24)})()}
/* ---- шапка: тумблер и иконки ---- */
function findCreate(){var bs=document.querySelectorAll('button');for(var i=0;i<bs.length;i++){var b=bs[i];if(/^\+?\s*Создать$/.test(b.textContent.trim())&&!b.closest('.gl-page')&&b.id!=='arqLiteTg')return b}return null}
function inject(){css0();var c=findCreate();if(!c||!c.parentNode)return;var p=c.parentNode,gp=p.parentNode,row=gp&&getComputedStyle(gp).display==='flex'?gp:p;
 row.classList.add('arqHdr');
 var bs=row.querySelectorAll('button');for(var i=0;i<bs.length;i++){var b=bs[i];if(b.id!=='arqLiteTg'&&!b.textContent.trim()&&!b.classList.contains('arqIc'))b.classList.add('arqIc')}
 if(document.getElementById('arqLiteTg'))return;
 var t=document.createElement('button');t.id='arqLiteTg';t.type='button';t.setAttribute('role','switch');t.setAttribute('aria-label','Упрощённая версия');t.setAttribute('aria-checked',R.classList.contains('lite')?'true':'false');t.innerHTML='<span>Упрощённая</span><i></i>';
 t.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();var v=!R.classList.contains('lite');put(v);apply(v);t.setAttribute('aria-checked',v?'true':'false');setTimeout(tagBg,50)},true);
 if(gp&&row===gp)gp.insertBefore(t,p);else p.insertBefore(t,c)}
/* ---- экран загрузки при открытии волны/разделов ---- */
var ld=null,byp=false;
function showLd(){if(ld)return;ld=document.createElement('div');ld.id='arqLd';ld.innerHTML='<i></i><span>Загружаю</span>';document.body.appendChild(ld)}
function hideLd(){var e=ld;if(!e)return;ld=null;e.classList.add('out');setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e)},340)}
function settle(minMs,maxMs,cb){var t0=Date.now(),last=Date.now(),mo=new MutationObserver(function(){last=Date.now()});mo.observe(document.body,{childList:true,subtree:true,attributes:true,characterData:true});
 (function chk(){var now=Date.now();if((now-t0>=minMs&&now-last>=260)||now-t0>=maxMs){mo.disconnect();cb();return}setTimeout(chk,100)})()}
function gate(el){var n=el,i=0;while(n&&n!==document.body&&i<7){var tx=(n.textContent||'').trim();if(tx.length<200&&/День\s+\d+/.test(tx)&&/ПРИМЕР|ОБРАЗЕЦ|ПЛАН|Сегодня/.test(tx)&&!/Главное|Экономика|Моя волна|Создать/.test(tx)&&n.tagName!=='BODY')return n;
  n=n.parentElement;i++}return null}
window.addEventListener('click',function(e){if(byp||!e.isTrusted||ld)return;if(e.target&&e.target.closest&&e.target.closest('#arqLiteTg,#thTg,.gl-page'))return;var g=gate(e.target);if(!g)return;
 e.stopImmediatePropagation();e.preventDefault();showLd();var tg=e.target;
 setTimeout(function(){byp=true;try{tg.click()}catch(x){}byp=false;settle(450,1800,hideLd)},70)},true);
apply(get());css0();
var T=0,T2=0;
function boot(){inject();scanSheets();tagBg();scanInline()}
new MutationObserver(function(){if(T)return;T=setTimeout(function(){T=0;inject();tagBg();scanInline()},400)}).observe(document.documentElement,{childList:true,subtree:true});
new MutationObserver(function(){if(T2)return;T2=setTimeout(function(){T2=0;scanSheets()},500)}).observe(document.head,{childList:true,subtree:true,characterData:true});
document.addEventListener('DOMContentLoaded',boot);setTimeout(boot,1200);setTimeout(boot,4000);setInterval(function(){inject();scanSheets()},5000);boot();
}catch(e){}})();

/* ARQON: матовый робот для упрощённой версии (убираем глянец, приглушаем белое) */
(function(){try{
var done=false;
function build(){try{if(done)return;var im=document.querySelector('#arqAiBotWrap img');if(!im||!im.complete||!im.naturalWidth)return;done=true;
 var w=im.naturalWidth,h=im.naturalHeight,c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d');x.drawImage(im,0,0);
 var src=x.getImageData(0,0,w,h),c2=document.createElement('canvas');c2.width=w;c2.height=h;var x2=c2.getContext('2d');x2.filter='blur(4px)';x2.drawImage(im,0,0);var bl=x2.getImageData(0,0,w,h).data,p=src.data;
 for(var yy=0;yy<h;yy++)for(var xx=0;xx<w;xx++){var i=(yy*w+xx)*4,r=p[i],g=p[i+1],b=p[i+2],L=(r+g+b)/3,m=(bl[i]+bl[i+1]+bl[i+2])/3;
  var s=(L-m-18)/40;s=s<0?0:s>1?1:s;
  var dx=xx<168?168-xx:xx>252?xx-252:0,dy=yy<98?98-yy:yy>122?yy-122:0,dd=Math.sqrt(dx*dx+dy*dy),em=1-dd/14;em=em<0?0:em>1?1:em;s*=(1-em);
  var lim=m*1.15,r2=r*(1-s)+Math.min(r,lim)*s,g2=g*(1-s)+Math.min(g,lim)*s,b2=b*(1-s)+Math.min(b,lim)*s;
  var L2=(r2+g2+b2)/3;r2=L2+(r2-L2)*.45;g2=L2+(g2-L2)*.45;b2=L2+(b2-L2)*.45;
  if(L2>150){var k=(150+(L2-150)*.55)/L2;r2*=k;g2*=k;b2*=k}
  p[i]=r2*.985;p[i+1]=g2;p[i+2]=b2*.985}
 x.putImageData(src,0,0);var u=c.toDataURL('image/png');var st=document.createElement('style');st.id='arqBotMatte';st.textContent='html.lite #arqAiBotWrap img{content:url('+u+')}';document.head.appendChild(st)}catch(e){}}
function go(){try{build()}catch(e){}}
var n=0,t=setInterval(function(){n++;go();if(done||n>40)clearInterval(t)},700);
}catch(e){}})();
