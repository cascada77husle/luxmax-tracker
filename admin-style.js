/* ARQON: стиль как в админ-панели (только вид). Откат: убрать <script src="admin-style.js"> из tracker_2.html. */
(function(){try{
var css=[
'@media (min-width:900px){',
'html .arqNav nav button.arqNb{border-radius:14px!important;padding:11px 14px!important;border:1px solid transparent!important;gap:12px!important;font-weight:600!important;transition:background-color .2s,border-color .2s,color .2s!important}',
'html .arqNav nav button.arqNb:hover{background:rgba(255,255,255,.045)!important}',
'html .arqNav nav button.arqNb[aria-current="page"]{background:rgba(255,255,255,.075)!important;border-color:var(--line2)!important;color:var(--ink)!important;font-weight:700!important}',
'html .arqNav nav button.arqNb[aria-current="page"] svg{color:var(--accent-text)!important}',
'}',
'html .wkHd [data-dc-tpl="278"]{width:46px!important;height:46px!important;min-width:46px!important;min-height:46px!important;box-shadow:0 6px 14px -8px rgba(0,0,0,.7)}',
'html .wkHd .wkDt{display:flex!important;flex-direction:column;align-items:center;justify-content:center;width:64px;height:64px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid var(--line2);font-size:30px!important;line-height:1!important;padding:0!important;margin:0 4px 0 0!important}',
'html .wkHd .wkDt::after{content:attr(data-wd);font:600 12px/1 Archivo,system-ui,sans-serif;color:var(--muted);margin-top:3px;letter-spacing:0;-webkit-text-fill-color:var(--muted)}',
'html .wkHd [data-dc-tpl="280"]{border-left:1px solid var(--line2);padding-left:16px;gap:7px!important}',
'html .wkHd [data-dc-tpl="281"]{gap:4px 12px!important;align-items:center!important}',
'html .wkHd [data-dc-tpl="282"]{text-transform:capitalize!important;letter-spacing:0!important;font-size:22px!important;font-weight:800!important}',
'html .wkHd [data-dc-tpl="283"]{display:none!important}',
'html .wkHd [data-dc-tpl="284"]{display:inline-flex!important;align-items:center;gap:7px;text-transform:none!important;letter-spacing:0!important;font-size:14px!important;font-weight:600!important;padding:6px 14px!important;border-radius:999px!important;background:var(--accent-soft)!important;border:1px solid var(--accent-line)!important;color:var(--accent-text)!important}',
'html .wkHd [data-dc-tpl="284"]::before,html .wkHd [data-dc-tpl="290"]::before{content:"";width:16px;height:16px;flex:none;background:currentColor;-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4\'/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4\'/%3E%3C/svg%3E") center/contain no-repeat}',
'html .wkHd [data-dc-tpl="285"]{text-transform:capitalize!important;letter-spacing:0!important;font-size:15px!important;font-weight:500!important;color:var(--muted)!important}',
'html .wkHd [data-dc-tpl="285"] b{display:inline-block;text-transform:lowercase!important;letter-spacing:0!important;font-weight:500!important;color:inherit!important}',
'html .wkHd [data-dc-tpl="285"] b::first-letter{text-transform:uppercase}',
'html .wkHd [data-dc-tpl="290"]{display:inline-flex!important;align-items:center;gap:7px;text-transform:none!important;letter-spacing:0!important;font-size:14px!important;font-weight:600!important;padding:6px 14px!important;border-radius:999px!important;background:transparent!important;border:1px solid var(--line2)!important;color:var(--muted)!important}',
'html .wkHd [data-dc-tpl="290"]::before{-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z\'/%3E%3C/svg%3E") center/contain no-repeat!important;mask:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z\'/%3E%3C/svg%3E") center/contain no-repeat!important}',
'[data-adm-hide]{display:none!important}',
'.arqSpk path[fill*="arqSg"]{display:none!important}',
'.arqSpk path{stroke-width:1.2px!important;opacity:.7}',
'.arqHdr h1[data-cap]{overflow:visible!important;white-space:normal!important;line-height:1.15}',
'.arqHdr h1[data-cap]::after{content:"— " attr(data-cap);display:block;margin-top:5px;font:600 11px/1 Archivo,system-ui,sans-serif;letter-spacing:.16em;color:var(--muted);-webkit-text-fill-color:var(--muted);text-transform:uppercase}',
'[data-adm-c="1"]{border-radius:22px!important;outline:1px solid var(--line);outline-offset:-1px}',
'@media (min-width:900px){html .arqNav{border-right:0!important;background:var(--bg)!important}html .arqNav::before{content:"";position:absolute;left:10px;right:8px;top:10px;bottom:10px;border:1px solid var(--line);border-radius:22px;background:var(--card);z-index:-1;pointer-events:none}}',
'[data-adm="1"]{border-radius:12px!important}'
].join('\n');
function inject(){if(document.getElementById('arqAdmCss'))return;var s=document.createElement('style');s.id='arqAdmCss';s.textContent=css;document.head.appendChild(s)}
function wd(){var h=document.querySelector('.wkHd');if(!h)return;var w=h.querySelector('[data-dc-tpl="282"]'),t=h.querySelector('.wkDt');if(!w||!t)return;var x=(w.textContent||'').trim();var M={'понедельник':'Пн','вторник':'Вт','среда':'Ср','четверг':'Чт','пятница':'Пт','суббота':'Сб','воскресенье':'Вс'};if(x)t.setAttribute('data-wd',M[x.toLowerCase()]||x.slice(0,2))}

function hideDup(){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;while((n=w.nextNode())){if(n.nodeValue.trim()==='Мои волны'){var e=n.parentElement;if(e&&!e.hasAttribute('data-adm-hide')&&!e.closest('button,nav,.arqNav'))e.setAttribute('data-adm-hide','1')}}}
function cap(){var h=document.querySelector('.arqHdr h1');if(!h)return;var M={'Моя волна':'ваши волны и день','Главное':'задачи, привычки и деньги','Экономика':'деньги и цели'},c=M[(h.textContent||'').trim()];if(c){if(h.getAttribute('data-cap')!==c)h.setAttribute('data-cap',c)}else h.removeAttribute('data-cap')}
function cards(){var els=document.querySelectorAll('div,section,article'),k=0;for(var i=0;i<els.length&&k<400;i++){var el=els[i];if(el.hasAttribute('data-adm-c'))continue;var r=el.getBoundingClientRect();if(!r.width||!r.height)continue;k++;if(r.width<180||r.height<90||r.width>1100){el.setAttribute('data-adm-c','0');continue}var st=getComputedStyle(el),br=parseFloat(st.borderTopLeftRadius)||0;if(br>=14&&br<=34&&st.position!=='fixed'&&st.backgroundColor!=='rgba(0, 0, 0, 0)'&&!(el.closest&&el.closest('.arqNav,#arqPalP,#arqBub,[role=dialog]')))el.setAttribute('data-adm-c','1');else el.setAttribute('data-adm-c','0')}}
function scan(){try{wd()}catch(e){}try{hideDup();cap();cards()}catch(e){}var bs=document.querySelectorAll('button,[role=button]');
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
