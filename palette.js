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
function apply(c){var s=sty('arqPalCss');if(!c){s.textContent='';R.classList.remove('arqC');return}
 R.classList.remove('mono');try{localStorage.setItem('arqPal','sage')}catch(e){}
 s.textContent=build(c.a,c.b);R.classList.add('arqC')}
function mono(){apply(null);save(null);R.classList.add('mono');try{localStorage.setItem('arqPal','mono')}catch(e){}}
function reset(){apply(null);save(null);R.classList.remove('mono');try{localStorage.setItem('arqPal','sage')}catch(e){}}
apply(load());
var PCSS='#arqPalP{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147482000;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px}'
+'#arqPalP .pn{width:100%;max-width:360px;background:var(--card);color:var(--ink);border:1px solid var(--line2);border-radius:20px;padding:18px;display:flex;flex-direction:column;gap:14px;font:600 14px/1.3 Archivo,system-ui,sans-serif}'
+'#arqPalP h3{margin:0;font:800 18px/1.2 Archivo,system-ui,sans-serif;letter-spacing:.02em}'
+'#arqPalP .sw{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}'
+'#arqPalP .sw button{height:40px;border-radius:50%;border:1px solid var(--line2);cursor:pointer;padding:0;color:var(--ink);font:700 11px Archivo,system-ui,sans-serif}'
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
 function live(){var c={a:ia.value,b:ib.value};apply(c);save(c);mark()}
 ia.addEventListener('input',live);ib.addEventListener('input',live);
 ov.addEventListener('click',function(e){var t=e.target;if(t===ov){ov.remove();return}var b=t.closest&&t.closest('button');if(!b)return;
  if(b.getAttribute('data-x')){ov.remove();return}
  if(b.getAttribute('data-r')){reset();ia.value='#a6b4a5';ib.value='#09090a';mark();return}
  if(b.getAttribute('data-m')){mono();mark();return}
  var i=b.getAttribute('data-i');if(i!==null){var p=PR[+i];ia.value=p[1].toLowerCase();ib.value=p[2].toLowerCase();live()}});
 mark()}
document.addEventListener('click',function(e){var b=e.target&&e.target.closest&&e.target.closest('#arqPal');if(!b)return;e.stopImmediatePropagation();e.preventDefault();open()},true);
}catch(e){}})();
