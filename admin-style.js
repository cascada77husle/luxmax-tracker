/* ARQON: стиль как в админ-панели (только вид). Откат: убрать <script src="admin-style.js"> из tracker_2.html. */
(function(){try{
var css=[
'@media (min-width:900px){',
'html .arqNav nav button.arqNb{border-radius:14px!important;padding:11px 14px!important;border:1px solid transparent!important;gap:12px!important;font-weight:600!important;transition:background-color .2s,border-color .2s,color .2s!important}',
'html .arqNav nav button.arqNb:hover{background:rgba(255,255,255,.045)!important}',
'html .arqNav nav button.arqNb[aria-current="page"]{background:rgba(255,255,255,.075)!important;border-color:var(--line2)!important;color:var(--ink)!important;font-weight:700!important}',
'html .arqNav nav button.arqNb[aria-current="page"] svg{color:var(--accent-text)!important}',
'}',
'[data-adm="1"]{border-radius:12px!important}'
].join('\n');
function inject(){if(document.getElementById('arqAdmCss'))return;var s=document.createElement('style');s.id='arqAdmCss';s.textContent=css;document.head.appendChild(s)}
function scan(){var bs=document.querySelectorAll('button,[role=button]');
 for(var i=0;i<bs.length;i++){var b=bs[i];if(b.hasAttribute('data-adm'))continue;
  if((b.closest&&b.closest('#arqFocus,#arqPalP,#arqAiBotWrap'))||b.getAttribute('role')==='switch'||b.id==='arqLiteTg'){b.setAttribute('data-adm','0');continue}
  var r=b.getBoundingClientRect();if(!r.width||!r.height)continue;
  if(r.height<28||r.height>64){b.setAttribute('data-adm','0');continue}
  var br=parseFloat(getComputedStyle(b).borderTopLeftRadius)||0;
  b.setAttribute('data-adm',br>=r.height/2-1?'1':'0')}}
var tm=0;function later(){clearTimeout(tm);tm=setTimeout(function(){try{scan()}catch(e){}},500)}
inject();later();
if(window.MutationObserver)new MutationObserver(later).observe(document.body||document.documentElement,{childList:true,subtree:true});
document.addEventListener('click',later,true);
}catch(e){}})();
