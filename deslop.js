/* ARQON: визуальная чистка «нейрослопа» (только вид, функции не затрагиваются).
   Убирает: градиентный текст заголовков, стеклянные блики-«шторки» на карточках.
   Откат: убрать <script src="deslop.js"> из tracker_2.html. Список правок: deslop-backup.md */
(function(){try{
var css=[
'[data-ds-tx]{background:none!important;-webkit-text-fill-color:var(--ink,#e7e8e5)!important;color:var(--ink,#e7e8e5)!important}',
'[data-ds-sh]{background-image:none!important}'
].join('\n');
function inject(){if(document.getElementById('arqDsCss'))return;var s=document.createElement('style');s.id='arqDsCss';s.textContent=css;document.head.appendChild(s)}
function sheen(bi){if(!bi||bi==='none'||bi.indexOf('url(')>-1||bi.indexOf('linear-gradient')!==0||bi.indexOf('),')>-1&&/\)\s*,\s*(linear|radial)/.test(bi))return false;
 var re=/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\s*\)/g,m,n=0;
 while((m=re.exec(bi))){n++;var a=m[4]===undefined?1:parseFloat(m[4]);if(a>.13)return false;if(a>0&&(+m[1]<245||+m[2]<245||+m[3]<245))return false}
 return n>=2}
var q=[],busy=false;
function scan(){if(busy)return;busy=true;var all=document.querySelectorAll('body *'),i=0;
 (function step(){var c=0;while(i<all.length&&c<140){var e=all[i++];c++;if(e.__ds)continue;e.__ds=1;if(e.id==='arqBub'||e.closest&&e.closest('#arqBub'))continue;
  var s=getComputedStyle(e),bc=s.webkitBackgroundClip||s.backgroundClip;
  if(bc==='text'&&!/^ARQON$/i.test((e.textContent||'').trim())){e.setAttribute('data-ds-tx','1');continue}
  var rc=e.getBoundingClientRect();if(rc.width<60||rc.height<30)continue;
  if(sheen(s.backgroundImage))e.setAttribute('data-ds-sh','1')}
  if(i<all.length)setTimeout(step,24);else busy=false})()}
var T=0;function sched(){if(T)return;T=setTimeout(function(){T=0;scan()},700)}
inject();
new MutationObserver(sched).observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',scan);setTimeout(scan,1500);setTimeout(scan,5000);
}catch(e){}})();
