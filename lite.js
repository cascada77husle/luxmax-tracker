/* ARQON: упрощённая версия (лайт). Тумблер рядом с «Создать»; убирает анимации, блюр, тени и тяжёлые фоны. Палитра, эмблемы и робот остаются. */
(function(){try{
var K='arq:lite',R=document.documentElement;
function get(){try{return localStorage.getItem(K)==='1'}catch(e){return false}}
function put(v){try{localStorage.setItem(K,v?'1':'0')}catch(e){}}
var css=[
'html.lite *,html.lite *::before,html.lite *::after{animation:none!important;transition:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important;text-shadow:none!important;scroll-behavior:auto!important}',
'html.lite body::before,html.lite body::after{display:none!important}',
'html.lite [style*="blur("]{filter:none!important}',
'html.lite .card,html.lite .arqWc,html.lite .tkCat,html.lite .gl-lk{background-image:none!important}',
'html.lite #glLoad i{animation:glLdSp .8s linear infinite!important}',
'html.lite .gl-page .gl-lk{border-radius:16px}',
'#arqAiBotWrap{filter:contrast(.84) brightness(.8) saturate(.65)}',
'#arqLiteTg{display:inline-flex;align-items:center;gap:9px;height:36px;padding:0 12px;margin-right:8px;border-radius:12px;border:1px solid var(--line2,rgba(255,255,255,.18));background:transparent;color:inherit;font:600 13px/1 Archivo,system-ui,sans-serif;cursor:pointer;white-space:nowrap;flex:none}',
'#arqLiteTg i{position:relative;width:34px;height:20px;border-radius:10px;background:rgba(255,255,255,.18);flex:none}',
'#arqLiteTg i:after{content:"";position:absolute;left:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff}',
'html.lite #arqLiteTg i{background:var(--accent,#7c6cff)}html.lite #arqLiteTg i:after{left:16px}',
'@media (max-width:1180px){#arqLiteTg span{display:none}#arqLiteTg{padding:0 9px}}'
].join('\n');
function apply(v){R.classList.toggle('lite',v);}
function css0(){if(!document.getElementById('arqLiteCss')){var s=document.createElement('style');s.id='arqLiteCss';s.textContent=css;document.head.appendChild(s)}}
function findCreate(){var bs=document.querySelectorAll('button');for(var i=0;i<bs.length;i++){var b=bs[i];if(/^\+?\s*Создать$/.test(b.textContent.trim())&&!b.closest('.gl-page')&&b.id!=='arqLiteTg')return b}return null}
function inject(){css0();if(document.getElementById('arqLiteTg'))return;var c=findCreate();if(!c||!c.parentNode)return;
var t=document.createElement('button');t.id='arqLiteTg';t.type='button';t.setAttribute('role','switch');t.setAttribute('aria-label','Упрощённая версия');t.setAttribute('aria-checked',R.classList.contains('lite')?'true':'false');t.innerHTML='<span>Упрощённая</span><i></i>';
t.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();var v=!R.classList.contains('lite');put(v);apply(v);t.setAttribute('aria-checked',v?'true':'false')},true);
c.parentNode.insertBefore(t,c);try{c.parentNode.style.flexWrap='nowrap';c.parentNode.style.alignItems='center'}catch(e){}}
apply(get());css0();
var T=0;new MutationObserver(function(){if(T)return;T=setTimeout(function(){T=0;inject()},250)}).observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',inject);setInterval(inject,3000);inject();
}catch(e){}})();
