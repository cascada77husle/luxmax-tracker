/* ARQON: своя цветовая палитра (кнопка «Палитра» в шапке). Только вид. Откат: убрать <script src="palette.js"> из tracker_2.html.
   Тёмная тема задаётся здесь, светлая получается из неё сама (она строится инверсией тёмной). */
(function(){try{
var R=document.documentElement,K='arqPalC';
var PR=[['Шалфей','#A6B4A5','#09090A'],['Океан','#8FB3C9','#090B0D'],['Лаванда','#B3A9D1','#0B0A0E'],['Янтарь','#D2B079','#0D0B08'],['Роза','#CFA0AC','#0D0909'],['Бирюза','#8CC4BC','#080C0C'],['Коралл','#D9958A','#0D0A09'],['Лайм','#B5C77A','#0A0B08']];
function h2r(h){h=String(h||'').replace('#','');if(h.length!==6)return null;var n=parseInt(h,16);return isNaN(n)?null:[(n>>16)&255,(n>>8)&255,n&255]}
function r2h(c){return '#'+c.map(function(v){v=Math.max(0,Math.min(255,Math.round(v)));return (v<16?'0':'')+v.toString(16)}).join('')}
function add(c,n){return c.map(function(v){return v+n})}
function mix(a,b,t){return a.map(function(v,i){return v+(b[i]-v)*t})}
function hue(c){var r=c[0]/255,g=c[1]/255,b=c[2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;if(!d)return 0;var h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=h*60;return h<0?h+360:h}
function build(a,b){var A=h2r(a),B=h2r(b);if(!A||!B)return '';
 var C=add(B,14),F=add(B,7),L=add(B,29),L2=add(B,41),AT=mix(A,[255,255,255],.22),rgb=A.join(','),dh=Math.round(hue(A)-hue([166,180,165]));
 return 'html.arqC:root:root{--sage:'+a+';--sage-rgb:'+rgb+';--bg:'+b+';--card:'+r2h(C)+';--field:'+r2h(F)+';--soft:'+r2h(F)+';--line:'+r2h(L)+';--line2:'+r2h(L2)+';--accent:'+a+';--on-accent:'+b+';--accent-text:'+r2h(AT)+';--accent-soft:rgba('+rgb+',.12);--accent-line:rgba('+rgb+',.38);--ok:'+a+';--ok-soft:rgba('+rgb+',.13);--ok-line:rgba('+rgb+',.34)}'
 +'html.arqC #arqWaves{filter:hue-rotate('+dh+'deg)}html.arqC .arqNav>canvas.arqWn{filter:hue-rotate('+dh+'deg) blur(7px)}';}
function sty(id){var s=document.getElementById(id);if(!s){s=document.createElement('style');s.id=id;document.head.appendChild(s)}return s}
function load(){try{var j=JSON.parse(localStorage.getItem(K));if(j&&h2r(j.a)&&h2r(j.b))return j}catch(e){}return null}
function save(c){try{if(c)localStorage.setItem(K,JSON.stringify(c));else localStorage.removeItem(K)}catch(e){}}

/* Перекраска всех «зелёных» цветов в стилях под выбранную палитру (тумблеры, кнопки, значки и т.д.) */
var TA=null,mo=null,rt=0;
function rgb2hsl(r,g,b){r/=255;g/=255;b/=255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,h=0,l=(mx+mn)/2,s=d?d/(1-Math.abs(2*l-1)):0;if(d){h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360}return [h,s,l]}
function hsl2rgb(h,s,l){var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2,r=0,g=0,b=0;if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}return [(r+m)*255,(g+m)*255,(b+m)*255]}
function mapc(r,g,b){var mx=Math.max(r,g,b),mn=Math.min(r,g,b);var o=rgb2hsl(r,g,b);if(o[0]<60||o[0]>190)return null;if(mx-mn<(o[2]<.3?2:8))return null;var nh=(TA.h+(o[0]-114)+360)%360,ns=TA.mono?0:Math.max(0,Math.min(1,o[1]*Math.min(3,TA.s/.085)));return hsl2rgb(nh,ns,o[2]).map(Math.round)}
var RE=/#([0-9a-fA-F]{6})\b|rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,\/]\s*([\d.]+%?))?\s*\)/g;
function recol(v){if(!TA||(v.indexOf('#')<0&&v.indexOf('rgb')<0))return v;return v.replace(RE,function(m,hx,r,g,b,a){var R,G,B;if(hx){var n=parseInt(hx,16);R=(n>>16)&255;G=(n>>8)&255;B=n&255}else{R=+r;G=+g;B=+b}var o=mapc(R,G,B);if(!o)return m;if(hx)return r2h(o);return a!==undefined?'rgba('+o[0]+','+o[1]+','+o[2]+','+a+')':'rgb('+o.join(',')+')'})}
function bump(s){var parts=[],dp=0,cur='',i,ch;for(i=0;i<s.length;i++){ch=s.charAt(i);if(ch==='(')dp++;else if(ch===')')dp--;if(ch===','&&dp===0){parts.push(cur);cur=''}else cur+=ch}parts.push(cur);return parts.map(function(x){x=x.trim();if(/^html\b/.test(x))return x.replace(/^html/,'html:root');if(/^:root/.test(x))return 'html'+x;return 'html:root '+x}).join(',')}
function walk(rules,out){for(var i=0;i<rules.length;i++){var r=rules[i];
 if(r.type===1){if(r.selectorText&&r.selectorText.indexOf('.hbS')>=0)continue;var st=r.style,dc=[];for(var j=0;j<st.length;j++){var p=st[j];var v=st.getPropertyValue(p),nv=recol(v);if(nv!==v)dc.push(p+':'+nv+' !important')}if(dc.length)out.push(bump(r.selectorText)+'{'+dc.join(';')+'}')}
 else if((r.type===4||r.type===12)&&r.cssRules){var inn=[];walk(r.cssRules,inn);if(inn.length)out.push((r.type===4?'@media ':'@supports ')+r.conditionText+'{'+inn.join('')+'}')}}}
function isMine(n){return n&&n.id&&/^arqPal/.test(n.id)}
var ver=0,sg='',busyR=0,AT3=['fill','stroke','stop-color'];
function sig(){var ss=document.styleSheets,s=ss.length+':';for(var i=0;i<ss.length;i++){try{s+=ss[i].cssRules.length+','}catch(e){s+='x,'}}return s}
function walkAll(){var out=[],ss=document.styleSheets;for(var i=0;i<ss.length;i++){var sh=ss[i];if(isMine(sh.ownerNode))continue;try{walk(sh.cssRules,out)}catch(e){}}var s=sty('arqPalOv');s.textContent=out.join('\n');document.head.appendChild(s)}
function svgPass(panel,hb){var sv=document.querySelectorAll('svg [fill],svg [stroke],svg [stop-color]');for(var q=0;q<sv.length;q++){var se=sv[q];if(panel&&panel.contains(se))continue;var inh=false;for(var h=0;h<hb.length;h++)if(hb[h].contains(se)){inh=true;break}
 if(inh){if(se.__q){for(var an0 in se.__q)se.setAttribute(an0,se.__q[an0].o);se.__q=null}continue}
 for(var u=0;u<AT3.length;u++){var an=AT3[u],av=se.getAttribute(an);if(!av)continue;var Q=se.__q||(se.__q={});var rec=Q[an];var b2=(rec&&av===rec.n)?rec.o:av;var n2=recol(b2);if(n2!==av)se.setAttribute(an,n2);if(n2!==b2)Q[an]={o:b2,n:n2};else delete Q[an]}}}
function attrs(){var panel=document.getElementById('arqPalP'),hb=document.querySelectorAll('.hbS'),els=document.querySelectorAll('[style]'),k=0,my=++busyR,v=ver;
 function inHb(el){for(var i=0;i<hb.length;i++)if(hb[i].contains(el))return true;return false}
 (function step(){if(my!==busyR||!TA)return;var end=Math.min(els.length,k+250);for(;k<end;k++){var el=els[k];if(panel&&panel.contains(el))continue;var cur=el.getAttribute('style');if(!cur)continue;
  if(inHb(el)){if(el.__p0!==undefined){el.setAttribute('style',el.__p0);el.__p0=undefined;el.__p1=undefined;el.__s=undefined}continue}
  if(el.__v===v&&el.__s===cur)continue;
  var base=(el.__p1!==undefined&&cur===el.__p1)?el.__p0:cur;var nv=recol(base);if(nv!==cur)el.setAttribute('style',nv);if(nv!==base){el.__p0=base;el.__p1=nv}else{el.__p0=undefined;el.__p1=undefined}el.__v=v;el.__s=nv}
  if(k<els.length)setTimeout(step,10);else svgPass(panel,hb)})()}
function run(){if(!TA)return;var s=sig();if(s!==sg){sg=s;walkAll()}attrs()}
function later(ms){clearTimeout(rt);rt=setTimeout(run,ms)}
function startRe(c,mono){var A=h2r(c.a),o=rgb2hsl(A[0],A[1],A[2]);var was=!!TA;TA={h:o[0],s:o[1],mono:!!mono};ver++;sg='';later(was?220:0);if(!was){setTimeout(run,1200);setTimeout(run,3500)}
 if(!mo&&window.MutationObserver){mo=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++){if(a[j].tagName==='STYLE'&&!isMine(a[j])){later(250);return}}}});mo.observe(document.head,{childList:true});document.addEventListener('click',function(){if(TA)later(500)},true)}}
function stopRe(){TA=null;var s=document.getElementById('arqPalOv');if(s)s.textContent='';var els=document.querySelectorAll('[style]');for(var k=0;k<els.length;k++){var el=els[k];if(el.__p0!==undefined){el.setAttribute('style',el.__p0);el.__p0=undefined;el.__p1=undefined}}var sv=document.querySelectorAll('svg *');for(var q=0;q<sv.length;q++){var se=sv[q];if(se.__q){for(var an in se.__q)se.setAttribute(an,se.__q[an].o);se.__q=null}}}
function apply(c){var s=sty('arqPalCss');if(!c){s.textContent='';R.classList.remove('arqC');stopRe();return}
 R.classList.remove('mono');try{localStorage.setItem('arqPal','sage')}catch(e){}
 s.textContent=build(c.a,c.b);R.classList.add('arqC');startRe(c)}
function mono(){apply(null);save(null);R.classList.add('mono');try{localStorage.setItem('arqPal','mono')}catch(e){}startRe({a:'#EDEEEC'},true)}
function reset(){apply(null);save(null);R.classList.remove('mono');try{localStorage.setItem('arqPal','sage')}catch(e){}}
apply(load());try{if(!load()&&localStorage.getItem('arqPal')==='mono')startRe({a:'#EDEEEC'},true)}catch(e){}
var PCSS='#arqPalP{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147482000;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px}'
+'#arqPalP .pn{width:100%;max-width:360px;background:var(--card);color:var(--ink);border:1px solid var(--line2);border-radius:20px;padding:18px;display:flex;flex-direction:column;gap:14px;font:600 14px/1.3 Archivo,system-ui,sans-serif}'
+'#arqPalP h3{margin:0;font:800 18px/1.2 Archivo,system-ui,sans-serif;letter-spacing:.02em}'
+'#arqPalP .sw{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}'
+'#arqPalP .sw button{aspect-ratio:1/1;border-radius:50%;border:1px solid var(--line2);cursor:pointer;padding:0;color:var(--ink);font:700 11px Archivo,system-ui,sans-serif}'
+'#arqPalP .sw button.on{outline:2px solid var(--ink);outline-offset:2px}'
+'#arqPalP .rw{display:flex;align-items:center;justify-content:space-between;gap:10px}'
+'#arqPalP input[type=color]{width:56px;height:34px;border:1px solid var(--line2);border-radius:10px;background:var(--field);padding:2px;cursor:pointer}'
+'#arqPalP .bt{display:flex;gap:10px}'
+'#arqPalP .bt button{flex:1;height:42px;border-radius:12px;border:1px solid var(--line2);background:var(--field);color:var(--ink);font:700 13px Archivo,system-ui,sans-serif;cursor:pointer}'
+'#arqPalP .bt button.pr{background:var(--accent);color:var(--on-accent);border-color:transparent}'
+'#arqPalP small{color:var(--muted);font-weight:500;font-size:12px}';
function open(){if(document.getElementById('arqPalP'))return;sty('arqPalPCss').textContent=PCSS;
 var cur=load()||{a:'#A6B4A5',b:'#09090A'};
 var ov=document.createElement('div');ov.id='arqPalP';
 var sw='';for(var i=0;i<PR.length;i++){sw+='<button type="button" data-i="'+i+'" title="'+PR[i][0]+'" aria-label="'+PR[i][0]+'" style="background:linear-gradient(135deg,'+PR[i][1]+' 50%,'+PR[i][2]+' 50%)"></button>'}
 sw+='<button type="button" data-m="1" title="Чёрно-белая" aria-label="Чёрно-белая" style="background:linear-gradient(135deg,#EDEEEC 50%,#09090A 50%)"></button>';
 ov.innerHTML='<div class="pn"><h3>ПАЛИТРА</h3><div class="sw">'+sw+'</div>'
 +'<div class="rw"><span>Основной цвет</span><input type="color" id="arqPa" value="'+cur.a+'"></div>'
 +'<div class="rw"><span>Фон</span><input type="color" id="arqPb" value="'+cur.b+'"></div>'
 +'<small>Светлая тема получается из тёмной сама: цвета те же, только по яркости наоборот.</small>'
 +'<div class="bt"><button type="button" data-r="1">Сбросить</button><button type="button" class="pr" data-x="1">Готово</button></div></div>';
 document.body.appendChild(ov);
 var ia=ov.querySelector('#arqPa'),ib=ov.querySelector('#arqPb');
 function mark(){var c=load(),bs=ov.querySelectorAll('.sw button');for(var k=0;k<bs.length;k++){var on=false;if(c&&bs[k].getAttribute('data-i')!==null){var p=PR[+bs[k].getAttribute('data-i')];on=p[1].toLowerCase()===c.a.toLowerCase()&&p[2].toLowerCase()===c.b.toLowerCase()}bs[k].className=on?'on':''}}
 var lq=0;function live(){if(lq)return;lq=requestAnimationFrame(function(){lq=0;var c={a:ia.value,b:ib.value};apply(c);save(c);mark()})}
 ia.addEventListener('change',live);ib.addEventListener('change',live);
 ov.addEventListener('click',function(e){var t=e.target;if(t===ov){ov.remove();return}var b=t.closest&&t.closest('button');if(!b)return;
  if(b.getAttribute('data-x')){ov.remove();return}
  if(b.getAttribute('data-r')){reset();ia.value='#a6b4a5';ib.value='#09090a';mark();return}
  if(b.getAttribute('data-m')){mono();mark();return}
  var i=b.getAttribute('data-i');if(i!==null){var p=PR[+i];ia.value=p[1].toLowerCase();ib.value=p[2].toLowerCase();live()}});
 mark()}
document.addEventListener('click',function(e){var b=e.target&&e.target.closest&&e.target.closest('#arqPal');if(!b)return;e.stopImmediatePropagation();e.preventDefault();open()},true);
}catch(e){}})();
