/* ARQON: страница «Главное» v8 (родные виджеты) */
(function(){
"use strict";
if(window.__glInit)return;window.__glInit=1;
var KEY="arq:gl:ex",LAST="arq:gl:last",SPK="arq:gl:sp";
var on=false,sigPrev="",page=null,busy=false,hold=0;
var ST={tf:"all",pr:"week",acc:-1,lf:0,cm:"month",off:0,sel:""},HX={};
var DAYS=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
var DFULL=["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
var MON=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
var MONG=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
var BC=["#86B49E","#7FA6B8","#A78BDA","#8FBF7A","#D98BA0","#9CC27A","#7FB5D6","#B79CE0"];
var CT={tasks:"#86B49E",cal:"#7FA6B8",habits:"#A78BDA",sport:"#7DB38F",fin:"#6FB7A5",dash:"#B79CE0"};
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}return null}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function pad(n){return n<10?"0"+n:""+n}
function iso(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
function addD(d,n){return new Date(d.getFullYear(),d.getMonth(),d.getDate()+n)}
function dow(d){return (d.getDay()+6)%7}
function pIso(s){var p=s.split("-");return new Date(+p[0],+p[1]-1,+p[2])}
function today(){var n=new Date();return new Date(n.getFullYear(),n.getMonth(),n.getDate())}
function hm(s){var p=(s||"").split(":");return p.length<2?-1:(+p[0])*60+(+p[1])}
function fm(n){n=((n%1440)+1440)%1440;return pad(Math.floor(n/60))+":"+pad(n%60)}
var css=[
".gl-page{max-width:1280px;margin:0 auto;padding:0 20px 96px;display:flex;flex-direction:column;gap:14px;color:var(--ink);font-family:inherit}",
".gl-page *{box-sizing:border-box}",
".pg{z-index:10}",
".gl-page button{font-family:inherit}",
".gl-hd{position:relative;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 0 2px}",
".gl-hd h2{margin:0;font-family:Archivo,system-ui,sans-serif;font-size:28px;font-weight:700;letter-spacing:-.02em}",
".gl-hd p{margin:2px 0 0;font-size:14px;color:var(--muted);letter-spacing:0}",
".gl-sw{display:flex;align-items:center;gap:10px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:var(--ink);border-radius:999px;padding:6px 8px 6px 16px;font-size:12px;font-weight:700;cursor:pointer;flex-shrink:0}",
".gl-sw i{position:relative;width:46px;height:26px;border-radius:999px;background:rgba(127,127,127,.28);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1);transition:background .45s cubic-bezier(.22,.8,.3,1),box-shadow .45s}",
".gl-sw i:after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:var(--muted);box-shadow:0 2px 6px rgba(0,0,0,.45);transition:transform .45s cubic-bezier(.34,1.35,.5,1),background .35s,width .2s}",
".gl-sw:active i:after{width:25px}",
".gl-sw[aria-checked=true] i{background:var(--accent);box-shadow:inset 0 0 0 1px var(--accent-line),0 0 18px -3px var(--accent)}",
".gl-sw[aria-checked=true] i:after{transform:translateX(20px);background:var(--on-accent)}",
".gl-sw[aria-checked=true]:active i:after{transform:translateX(16px)}",
".gl-q{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px}",
".gl-qb{position:relative;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:22px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(160deg,rgba(255,255,255,.075),rgba(255,255,255,0) 55%),rgba(255,255,255,.04);color:var(--ink);cursor:pointer;overflow:hidden;text-align:left;box-shadow:inset 0 1px 0 rgba(255,255,255,.09),0 18px 30px -22px #000;transition:transform .28s cubic-bezier(.22,.8,.3,1),border-color .25s,box-shadow .3s;min-width:0}",
".gl-qb:before{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 38%,rgba(255,255,255,.17) 50%,transparent 62%);background-size:260% 100%;background-position:160% 0;animation:glShine 7s ease-in-out infinite;animation-delay:calc(var(--i)*.9s);pointer-events:none}",
".gl-qb:after{content:'';position:absolute;left:-30%;top:-60%;width:90%;height:120%;background:radial-gradient(closest-side,color-mix(in srgb,var(--c) 28%,transparent),transparent);opacity:.55;transition:opacity .3s;pointer-events:none}",
".gl-qb:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--c) 55%,transparent);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 22px 34px -20px color-mix(in srgb,var(--c) 60%,#000)}",
".gl-qb:hover:after{opacity:1}",
".gl-qb:active{transform:translateY(0) scale(.97)}",
".gl-qb .ic{position:relative;z-index:1;flex:none;width:40px;height:40px;border-radius:14px;display:grid;place-items:center;color:var(--c);background:linear-gradient(145deg,color-mix(in srgb,var(--c) 34%,transparent),color-mix(in srgb,var(--c) 8%,transparent));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 42%,transparent);animation:glBreath 3.6s ease-in-out infinite;animation-delay:calc(var(--i)*.5s)}",
".gl-qb .tx{position:relative;z-index:1;min-width:0;display:flex;flex-direction:column;gap:2px}",
".gl-qb b{font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
".gl-qb small{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
"@keyframes glShine{0%,60%{background-position:160% 0}100%{background-position:-60% 0}}",
"@keyframes glBreath{0%,100%{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 42%,transparent),0 0 0 0 transparent}50%{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 60%,transparent),0 0 16px -2px color-mix(in srgb,var(--c) 55%,transparent)}}",
"@media (prefers-reduced-motion:reduce){.gl-qb:before,.gl-qb .ic{animation:none}}",
".gl-ic{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}",
".gl-page .card{padding:18px 20px;min-width:0}",
".gl-top{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}",
".gl-cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;align-items:start}",
".gl-col{display:flex;flex-direction:column;gap:14px;min-width:0}",
".gl-lk{cursor:pointer;transition:transform .2s,border-color .2s}",
".gl-lk:hover{transform:translateY(-2px)}",
".gl-lk:active{transform:scale(.985)}",
".gl-l{font-size:12px;font-weight:500;color:var(--muted);margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}",
".gl-big{font-size:40px;font-weight:300;letter-spacing:-.03em;line-height:1.05}",
".gl-big small{font-size:20px;font-weight:400;color:var(--ink2)}",
".gl-row{display:flex;align-items:center;gap:14px}",
".gl-sub{font-size:12px;color:var(--muted);line-height:1.35}",
".gl-up{color:var(--ok);font-weight:700;font-size:12px;margin-top:3px}",
".gl-bar{height:8px;border-radius:999px;background:var(--line);overflow:hidden;margin-top:12px}",
".gl-bar b{display:block;height:100%;border-radius:999px;background:var(--accent);transition:width .5s cubic-bezier(.22,.8,.3,1)}",
".gl-bar.w b{background:var(--warn)}",
".gl-wk{display:flex;gap:4px;margin-top:16px}",
".gl-wk b{flex:1;height:4px;border-radius:99px;background:var(--line2)}",
".gl-wk b.on{background:var(--ink2)}.gl-wk b.cur{background:var(--ink)}",
".gl-ring{position:relative;width:88px;height:88px;flex:none}",
".gl-ring svg{width:100%;height:100%;transform:rotate(-90deg)}",
".gl-ring span{position:absolute;inset:0;display:grid;place-items:center;font-size:22px;font-weight:300;letter-spacing:-.03em}",
".gl-h{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;flex-wrap:wrap}",
".gl-h b{display:flex;align-items:center;gap:8px;font-family:Archivo,system-ui,sans-serif;font-size:19px;font-weight:700}",
".gl-h b .gl-ic{color:var(--accent)}",
".gl-lnk{border:0;background:transparent;color:var(--ink2);font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;padding:4px}",
".gl-lnk .gl-ic{width:14px;height:14px}",
".gl-seg{display:flex;gap:4px;padding:4px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(255,255,255,.04)}",
".gl-seg button{flex:1;border:0;background:transparent;color:var(--muted);border-radius:999px;padding:8px 12px;font-size:12px;font-weight:700;cursor:pointer;transition:background .25s,color .25s;white-space:nowrap}",
".gl-seg button.on{background:color-mix(in srgb,var(--accent) 24%,transparent);color:var(--ink);box-shadow:inset 0 0 0 1px var(--accent-line)}",
".gl-ib{width:32px;height:32px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:var(--ink);cursor:pointer;display:grid;place-items:center;padding:0}",
".gl-ib .gl-ic{width:14px;height:14px}",
".gl-pill{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:var(--ink);border-radius:999px;padding:7px 14px;font-size:12px;font-weight:700;cursor:pointer}",
".gl-ls{display:flex;flex-direction:column;gap:6px;margin-top:12px}",
".gl-page .tkRow{border-left-color:var(--tkac)!important;cursor:pointer}",
".gl-em{padding:18px 8px;text-align:center;color:var(--muted);font-size:13px}",
".gl-em button{margin-top:10px}",
".gl-hbs{overflow-x:auto;border-radius:16px;border:1px solid var(--line);background:var(--field);margin-top:12px}",
".gl-hr{display:grid;grid-template-columns:minmax(150px,220px) repeat(21,minmax(26px,1fr));gap:4px;align-items:center;padding:5px 8px 5px 0;border-top:1px solid var(--line);min-width:790px}",
".gl-hr:first-child{border-top:0}",
".gl-hn{display:flex;align-items:center;gap:6px;padding:4px 6px 4px 12px;min-width:0;font-size:13px;line-height:1.25;color:var(--ink);cursor:pointer;border:0;background:transparent;text-align:left}",
".gl-hn i{width:9px;height:9px;border-radius:50%;flex:none}",
".gl-hd1{text-align:center;font-size:10px;line-height:1.3;padding:5px 0;border-radius:8px;color:var(--muted)}",
".gl-hd1 b{display:block;font-size:12px;color:var(--ink)}",
".gl-hd1.t{background:color-mix(in srgb,var(--accent) 18%,transparent)}",
".gl-page button.hbc{width:100%;max-width:34px;height:28px;justify-self:center;cursor:pointer;font-size:12px;font-weight:800}",
".gl-nh{display:flex;gap:8px;align-items:center;margin-top:12px}",
".gl-nh input{flex:1;min-width:0;border:1.5px solid var(--line2);border-radius:999px;padding:0 16px;min-height:40px;font-size:14px;background:var(--field);color:var(--ink)}",
".gl-nh button{flex:none;min-height:40px;min-width:44px;border:0;border-radius:999px;background:var(--accent);color:var(--on-accent);font-weight:700;font-size:18px;cursor:pointer}",
".gl-wg{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;margin-top:12px}",
".gl-wc{display:flex;flex-direction:column;gap:5px;min-width:0}",
".gl-wd{border:1px solid var(--line);background:rgba(255,255,255,.04);border-radius:14px;padding:7px 0;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:11px;font-weight:600;color:var(--muted)}",
".gl-wd b{font-size:16px;color:var(--ink)}",
".gl-wd.t{background:color-mix(in srgb,var(--accent) 22%,transparent);border-color:var(--accent-line)}",
".gl-wd.s{border-color:var(--accent)}",
".gl-chip{border-radius:10px;border-left:3px solid var(--c);background:color-mix(in srgb,var(--c) 16%,transparent);padding:4px 6px;font-size:11px;font-weight:600;line-height:1.25;min-width:0;overflow:hidden}",
".gl-chip small{display:block;font-size:10px;font-weight:500;color:var(--muted)}",
".gl-chip span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
".gl-more{font-size:10px;color:var(--muted);text-align:center}",
".gl-ev{display:flex;align-items:center;gap:12px;border-radius:14px;border-left:3px solid var(--c);background:color-mix(in srgb,var(--c) 14%,transparent);padding:10px 12px;margin-top:6px;cursor:pointer}",
".gl-ev .tm{font-size:12px;color:var(--muted);white-space:nowrap;min-width:92px}",
".gl-ev b{font-size:14px;font-weight:600;min-width:0}",
".gl-mg{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;margin-top:12px}",
".gl-mh{text-align:center;font-size:10px;color:var(--muted);padding-bottom:2px}",
".gl-md{aspect-ratio:1/1;max-height:46px;border:1px solid transparent;border-radius:12px;background:transparent;color:var(--ink);font-size:13px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:0}",
".gl-md.o{color:var(--muted);opacity:.55}",
".gl-md.t{background:color-mix(in srgb,var(--accent) 24%,transparent);box-shadow:inset 0 0 0 1px var(--accent-line)}",
".gl-md.s{border-color:var(--accent)}",
".gl-md u{display:flex;gap:2px;text-decoration:none;height:4px}",
".gl-md u i{width:4px;height:4px;border-radius:50%;background:var(--accent)}",
".gl-sd{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;margin:12px 0}",
".gl-sd div{border:1px solid var(--line);border-radius:14px;padding:8px 0;text-align:center;font-size:10px;color:var(--muted);background:rgba(255,255,255,.04)}",
".gl-sd div b{display:block;font-size:11px;color:var(--ink);margin-top:3px}",
".gl-sd div.t{border-color:var(--accent)}",
".gl-sd div.r b{color:var(--muted);font-weight:400}",
".gl-kv{display:flex;justify-content:space-between;align-items:baseline;font-size:12px;color:var(--muted);margin-top:12px}",
".gl-kv b{font-size:14px;color:var(--ink);font-weight:600}",
".gl-pr{display:flex;gap:16px;align-items:center;flex-wrap:wrap}",
".gl-sp{flex:1;min-width:150px;height:92px}",
".gl-tl{display:grid;grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:8px;margin-top:14px}",
".gl-tl div{border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.04);padding:10px 4px;text-align:center}",
".gl-tl .gl-ic{width:16px;height:16px;color:var(--muted)}",
".gl-tl b{display:block;font-size:15px;font-weight:600;margin-top:4px}",
".gl-nt{font-size:11px;color:var(--muted)}",
"[data-glon] .pg>*:not(:first-child):not(.gl-page):not(.arqAn){display:none!important}","[data-glon] .pg>.arqAn{display:flex!important}","[data-gldash]{display:none!important}","[data-glon] .pg>.arqAn{align-items:stretch!important;min-width:0;max-width:100%;box-sizing:border-box;overflow:hidden}","[data-glon] .arqAn>*{min-width:0!important;max-width:100%!important;box-sizing:border-box}","[data-glon] .arqAn>div:last-child{overflow-x:auto;scrollbar-width:none}",
"[data-glon] .pg>:first-child h1>*{display:none}",
"[data-glon] .pg>:first-child h1:after{content:\"Главное\"}",
"[data-glon] .pg{min-height:0!important;padding-bottom:0!important}",
".gl-hd{padding-top:2px}",
".gl-ac{flex:1;min-width:0;border:1px solid var(--line);border-radius:18px;padding:12px 16px;background:rgba(255,255,255,.04);display:flex;flex-direction:column;gap:3px;animation:glFade .3s ease}",
".gl-ac small{color:var(--muted);font-size:11px}.gl-ac span{font-size:13px;font-weight:600}.gl-ac b{font-size:24px;font-weight:600;letter-spacing:-.02em}",
".gl-acc{display:flex;align-items:center;gap:8px;margin-top:14px}",
".gl-dots{display:flex;justify-content:center;gap:6px;margin-top:10px}.gl-dots i{width:6px;height:6px;border-radius:50%;background:var(--line2);cursor:pointer;transition:width .25s,background .25s}.gl-dots i.on{width:18px;border-radius:99px;background:var(--accent)}",
"@keyframes glFade{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:none}}",
".gl-an{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-top:12px}",
".gl-am{border:1px solid var(--line);border-radius:18px;padding:12px;background:rgba(255,255,255,.04);min-width:0;display:flex;flex-direction:column;gap:3px}",
".gl-am .t{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gl-am .v{font-size:22px;font-weight:600;letter-spacing:-.02em}.gl-am .v small{font-size:12px;font-weight:500;color:var(--muted)}.gl-am .d{font-size:11px;color:var(--muted)}.gl-am .d.ok{color:var(--ok);font-weight:700}.gl-am svg{width:100%;height:42px;margin-top:4px}",
".gl-chs{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}.gl-chs .gl-pill{padding:5px 12px}.gl-chs .gl-pill.on{background:color-mix(in srgb,var(--accent) 24%,transparent);box-shadow:inset 0 0 0 1px var(--accent-line)}",
".gl-wi{display:flex;gap:8px;margin-top:12px}.gl-wi input{flex:1;min-width:0;border:1.5px solid var(--line2);border-radius:999px;padding:0 16px;min-height:38px;font-size:13px;background:var(--field);color:var(--ink)}",
".gl-sec{font-family:Archivo,system-ui,sans-serif;font-size:15px;font-weight:700;margin-top:18px}",
".gl-fbig{font-family:Archivo,system-ui,sans-serif;font-size:clamp(40px,6vw,60px);font-weight:800;letter-spacing:-.03em;line-height:1.05}",
".gl-fa{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin-top:14px}",
".gl-ft{border:1.5px solid var(--line);border-radius:16px;background:var(--field);color:var(--ink);padding:10px 12px;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:2px;min-width:0;transition:border-color .2s,background .2s}",
".gl-ft small{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gl-ft b{font-size:16px;font-weight:700}",
".gl-ft.on{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,var(--field))}",
".gl-f3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:16px}",
".gl-f3 div{background:var(--field);border-radius:14px;padding:11px 13px;display:flex;flex-direction:column;gap:2px;min-width:0}.gl-f3 small{font-size:12px;color:var(--muted)}",
".gl-f3 b{font-family:Archivo,system-ui,sans-serif;font-size:18px;font-weight:800;white-space:nowrap}.gl-f3 b.ok{color:var(--ok)}",
"@media (max-width:560px){.gl-f3{grid-template-columns:1fr}}",
".pg>:first-child[style*=\"sticky\"]{background:transparent!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}",
"@media (max-width:1180px){.gl-q{grid-template-columns:repeat(3,minmax(0,1fr))}}",
"@media (max-width:999px){.gl-page{padding:0 14px 110px}.gl-top{grid-template-columns:repeat(2,minmax(0,1fr))}.gl-cols{grid-template-columns:minmax(0,1fr)}}",
"@media (max-width:560px){.gl-q{grid-template-columns:repeat(2,minmax(0,1fr))}.gl-big{font-size:34px}.gl-wg .gl-chip small{display:none}}",
".gl-page{max-width:1640px;padding:0 24px 80px;gap:10px}",
".gl-cols3{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:10px;align-items:start}",
".gl-page .card{padding:12px 14px!important;border-radius:22px}",
".gl-h{margin-bottom:8px;cursor:pointer}.gl-h b{font-size:15px}.gl-col{gap:10px}",
".gl-bd{animation:glFade .25s ease}.gl-page:not([data-fresh]) .gl-bd,.gl-page:not([data-fresh]) .gl-ac{animation:none!important}.gl-cld>.gl-bd{display:none}.gl-cld>.gl-h{margin-bottom:0}",
".gl-chv{width:7px;height:7px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg);transition:transform .25s;margin:0 4px 3px 2px;flex:none}.gl-cld>.gl-h .gl-chv,.gl-cld>.gl-sec .gl-chv{transform:rotate(-45deg);margin-bottom:0}",
".gl-sec{margin-top:12px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:14px}.gl-cld>.gl-sec{margin-bottom:0}",
".gl-q{gap:8px}.gl-qb{padding:7px 10px;border-radius:16px;gap:8px}.gl-qb .ic{width:30px;height:30px;border-radius:10px}.gl-qb b{font-size:13px}.gl-qb small{font-size:10px}",
".gl-top{gap:10px}.gl-top .card{padding:9px 14px!important}.gl-top .gl-l{margin-bottom:3px;font-size:11px}.gl-big{font-size:26px}.gl-big small{font-size:14px}.gl-ring{width:54px;height:54px}.gl-ring span{font-size:14px}.gl-top .gl-bar{margin-top:6px}.gl-top .gl-sub{font-size:11px}.gl-wk{margin-top:6px}",
".gl-ls{gap:4px;margin-top:8px}.gl-page .tkRow{padding:4px 10px!important}.gl-page .tkRow .aiT:nth-child(n+2){display:none}",
".gl-seg{padding:3px}.gl-seg button{padding:4px 10px}",
".gl-fbig{font-size:34px}.gl-fa{margin-top:8px;gap:6px}.gl-ft{padding:6px 10px;border-radius:14px}.gl-f3{margin-top:8px;gap:6px}.gl-f3 div{padding:7px 10px}.gl-f3 b{font-size:15px}",
".gl-sd{margin:8px 0}.gl-sd div{padding:5px 0}.gl-tl{margin-top:8px}.gl-tl div{padding:6px 4px}.gl-tl b{margin-top:2px}.gl-pr{gap:10px}.gl-sp{height:60px;min-width:100px}",
".gl-md{max-height:34px}.gl-wd{padding:4px 0}.gl-mg,.gl-wg{margin-top:8px}.gl-kv{margin-top:8px}",
".gl-hd>div{margin-top:-40px}.gl-hd p{margin:0}html.lt .gl-sbc{filter:invert(1) hue-rotate(180deg)}.gl-q{grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}",
".gl-qb{padding:14px 16px;border-radius:24px;gap:12px}.gl-qb .ic{width:46px;height:46px;border-radius:50%}.gl-qb b{font-size:15px}.gl-qb small{font-size:12px}",
".gl-page .card{border-radius:26px}",
".gl-cols2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;align-items:start}",
".gl-bub{display:inline-grid;place-items:center;width:38px;height:38px;border-radius:50%;background:color-mix(in srgb,var(--accent) 16%,var(--card));box-shadow:inset 0 0 0 1px var(--accent-line),0 6px 16px -8px color-mix(in srgb,var(--accent) 60%,transparent);color:var(--accent)}.gl-bub .gl-ic{width:18px;height:18px}",
".gl-today{padding:20px 22px!important}.gl-tdh{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px}.gl-tdh small{display:block;font-size:15px;font-weight:700;color:var(--ink)}.gl-tdh h3{margin:2px 0 0;font-family:Archivo,system-ui,sans-serif;font-size:34px;font-weight:800;letter-spacing:-.025em;line-height:1.1}.gl-tdh span{font-size:18px;color:var(--muted)}",
".gl-tdr{display:flex;flex-direction:column;align-items:flex-end;gap:8px}.gl-spt{max-width:none!important;padding:0!important;margin:0 0 14px!important}.gl-spt .card{border-radius:26px}.gl-today{position:relative;overflow:hidden;isolation:isolate}.gl-wx{position:absolute;top:0;right:0;height:96px;width:55%;z-index:-1;pointer-events:none;-webkit-mask-image:linear-gradient(90deg,transparent,#000 60%);mask-image:linear-gradient(90deg,transparent,#000 60%);opacity:.95}.gl-wx svg{position:absolute;inset:0;width:100%;height:100%;display:block}.gl-wxc{display:inline-flex!important;align-items:center;gap:7px;font-size:13px!important;font-weight:700;white-space:nowrap;color:#1d2530!important;padding:5px 12px;border-radius:999px;background:rgba(255,255,255,.94);box-shadow:0 6px 18px -10px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.6);}.gl-wxc:empty{display:none!important}html:not(.lt) .gl-wx{opacity:.42}html:not(.lt) .gl-wxc{background:rgba(32,36,38,.72);color:#fff!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}html.lt .gl-wxc,html.lt .gl-wxc span{color:#0f1722!important;opacity:1!important}html.lt .gl-wx,html.lt .gl-wxc{filter:invert(1) hue-rotate(180deg)}",
".gl-trs{display:flex;flex-direction:column;margin-top:10px}.gl-tr{display:flex;align-items:center;gap:14px;padding:11px 6px;border-top:1px solid var(--line);cursor:pointer}.gl-tr:first-child{border-top:0}",
".gl-ck{cursor:pointer;width:26px;height:26px;border-radius:8px;border:1.5px solid var(--line2);background:transparent;color:var(--on-accent);display:grid;place-items:center;padding:0;flex:none;transition:background-color .18s,border-color .18s}.gl-ck.on{background:var(--ok);border-color:var(--ok)}",
".gl-tt{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.gl-tt span{font-size:15px;font-weight:600;line-height:1.3}.gl-tt small{font-size:12px;color:var(--muted)}.gl-tr.d .gl-tt span{color:var(--muted);text-decoration:line-through}",
".gl-pp{font-style:normal;font-size:12px;font-weight:700;padding:6px 14px;border-radius:999px;background:var(--field);color:var(--ink2);white-space:nowrap}.gl-pp.p1{background:color-mix(in srgb,var(--ok) 16%,var(--card));color:var(--ok)}.gl-pp.p2{background:color-mix(in srgb,var(--ok) 30%,var(--card));color:var(--ok)}.gl-pp.p3{background:var(--ok);color:var(--on-accent)}.gl-dots{font-style:normal;color:var(--muted);letter-spacing:2px}",
".gl-all{text-align:center;padding-top:12px;border-top:1px solid var(--line)}.gl-all a{cursor:pointer;font-size:13px;font-weight:700;color:var(--ink2);display:inline-flex;align-items:center;gap:4px;text-decoration:underline;text-underline-offset:3px}.gl-all .gl-ic{width:13px;height:13px}",
".gl-calc .gl-h{margin-bottom:4px}.gl-nv{display:flex;gap:8px}.gl-ib{width:38px;height:38px}.gl-cl{text-align:center;font-family:Archivo,system-ui,sans-serif;font-size:17px;font-weight:700;margin:6px 0 4px}.gl-cs{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-top:8px}.gl-cs .gl-lnk{margin-left:auto}",
".gl-mh{font-size:13px;font-weight:600;padding:6px 0}.gl-md{max-height:46px;font-size:15px;border-radius:50%}.gl-md.t{background:var(--ink);color:var(--bg);box-shadow:none}.gl-md.t u i{background:var(--bg)}.gl-md u i{background:var(--ok)}.gl-md.s:not(.t){border-color:var(--ok)}",
".gl-prg .gl-pr2{display:flex;flex-direction:column;gap:6px}.gl-prt{display:flex;align-items:center;gap:20px}.gl-prt .gl-ring span{font-size:30px;font-weight:600}.gl-prt .gl-ring{width:104px;height:104px}.gl-sp2{height:96px;margin:0 -6px -6px;position:relative}.gl-spd{position:absolute;right:6px;width:9px;height:9px;margin-top:-4.5px;border-radius:50%;background:#e0b04c;box-shadow:0 0 0 3px rgba(224,176,76,.22)}.gl-sp2 svg{width:100%;height:100%;display:block}.gl-up{font-size:14px}",
".gl-fh{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;flex-wrap:wrap}.gl-fh .gl-up{margin-left:-4px;margin-bottom:8px}.gl-fb{display:flex;align-items:flex-end;gap:5px;height:64px;margin-left:auto}.gl-fb i{display:block;width:6px;border-radius:3px;background:linear-gradient(180deg,var(--ok),color-mix(in srgb,var(--ok) 25%,transparent));opacity:.7}.gl-fbig{font-size:42px}",
".gl-fa{grid-template-columns:repeat(auto-fill,minmax(138px,1fr))}.gl-ft{padding:9px 11px;border-radius:15px}.gl-ft small{font-size:10.5px}.gl-ft.on{border:2px solid var(--ink);background:color-mix(in srgb,var(--ink) 16%,var(--field))}.gl-fin .gl-up{font-size:14px}.gl-fin .gl-bar{height:9px;background:color-mix(in srgb,var(--ink) 45%,transparent);margin-top:18px}.gl-fin .gl-bar b{background:var(--ink)}.gl-fb i{opacity:.95;background:linear-gradient(180deg,color-mix(in srgb,var(--ok) 85%,#fff),color-mix(in srgb,var(--ok) 35%,transparent))}",
".gl-f3{gap:10px;margin-top:14px}.gl-f3 div{flex-direction:row!important;align-items:center;gap:10px;padding:12px 14px;border-radius:18px}.gl-f3 div>.gl-ic{width:22px;height:22px;flex:none;color:var(--muted)}.gl-f3 span{display:flex;flex-direction:column;gap:2px;min-width:0}",
".gl-sbf{display:none}@media (min-width:1000px){.gl-sbf{display:flex;position:absolute;left:12px;right:12px;bottom:16px;flex-direction:column;gap:10px}.gl-sbf button{font-family:inherit;cursor:pointer}.gl-sbp,.gl-sbs{display:flex;align-items:center;gap:12px;width:100%;padding:11px 14px;border:0;border-radius:16px;background:transparent;color:var(--ink);font-size:14px;font-weight:600;text-align:left}.gl-sbp{background:var(--field)}.gl-sbp span{flex:1;display:flex;flex-direction:column;font-size:11px;color:var(--muted);font-weight:500}.gl-sbp b{font-size:16px;color:var(--ink)}.gl-sbp .gl-ic,.gl-sbs .gl-ic{width:18px;height:18px;flex:none}.gl-sbs:hover{background:var(--field)}.gl-sbc{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:46px;border:0;border-radius:999px;color:#fff;font-size:15px;font-weight:700;background:linear-gradient(135deg,#5E8C75 0%,#3F6B57 55%,#2F5645 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 12px 24px -12px rgba(47,86,69,.85);transition:transform .2s,box-shadow .2s}.gl-sbc:hover{transform:translateY(-2px)}.gl-sbc:active{transform:scale(.97)}}",
"@media (max-width:999px){.gl-cols2{grid-template-columns:minmax(0,1fr)}.gl-q{grid-template-columns:repeat(2,minmax(0,1fr))}.gl-tdh h3{font-size:28px}}",
".gl-nh{margin-top:6px}.gl-nh input,.gl-nh button{min-height:32px}.gl-hr{padding:2px 8px 2px 0}.gl-page button.hbc{height:22px;font-size:11px}.gl-hbs{margin-top:8px}",
".gl-an{margin-top:8px;gap:8px}.gl-am{padding:8px 10px}.gl-wi{margin-top:8px}.gl-chs{margin-top:8px}",
"@media (max-width:999px){.gl-page{padding:0 14px 110px}}",
".gl-page .tkRow>div{flex-direction:row!important;align-items:center!important;flex-wrap:wrap;gap:4px 8px!important;padding:1px 0!important}.gl-page .tkRow>div>span:first-child{flex:1 1 auto;min-width:0;font-size:13px!important}.gl-page .tkRow>div>span:last-child{flex:none}.gl-page .tkRow .aiT{padding:0 6px!important}",
"[data-glh=\"1\"]{display:none!important}"
].join("\n");
function ic(p){return '<svg class="gl-ic" viewBox="0 0 24 24">'+p+'</svg>'}
var ICON={
 tasks:ic('<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/>'),
 cal:ic('<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/>'),
 habits:ic('<circle cx="12" cy="12" r="8"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/>'),
 sport:ic('<path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/>'),
 dash:ic('<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>'),
 fin:ic('<path d="M4 8a3 3 0 013-3h10a2 2 0 012 2v2H7a3 3 0 00-3 3z"/><path d="M4 8v9a3 3 0 003 3h12a1 1 0 001-1v-8a1 1 0 00-1-1H7"/><circle cx="16" cy="14.5" r="1"/>'),
 flame:'<svg class="gl-ic" style="width:26px;height:26px;color:var(--warn)" viewBox="0 0 24 24"><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2 0-3-.5-5 1-8z"/></svg>',
 arrow:'<svg class="gl-ic" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
 left:'<svg class="gl-ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
 bars:ic('<path d="M6 20V11M12 20V5M18 20v-6"/>'),
 book:ic('<path d="M5 5a2 2 0 012-2h12v16H7a2 2 0 00-2 2z"/><path d="M5 19V5"/>'),
 apple:ic('<path d="M12 8c-3-2-7 0-6 5 .7 3.5 3 6 6 5 3 1 5.3-1.5 6-5 1-5-3-7-6-5zM12 8c0-2 1-3 3-4"/>'),
 card:ic('<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10.5h18M7 15h3"/>'),
 pig:ic('<path d="M5 12a7 6 0 0114 0c0 2-1 3-2 4v3h-3v-2h-4v2H7v-3c-1-1-2-2-2-4z"/><circle cx="15" cy="11" r=".8"/>'),
 home:'<path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z"/>'
};
function tx(el){return el?el.textContent.replace(/\s+/g," "):""}
function S(){try{return JSON.parse(localStorage.getItem("tracker:v1"))}catch(e){return null}}
function isDemo(w){return !!w&&(w.id==="wdemo"||/^\s*ПРИМЕР\s*$/i.test(w.name||""))}
function curWave(s){if(!s||!s.waves||!s.waves.length)return null;var i,r=null;for(i=0;i<s.waves.length;i++)if(s.waves[i].id===s.waveCur&&!isDemo(s.waves[i]))return s.waves[i];for(i=0;i<s.waves.length;i++)if(!isDemo(s.waves[i])){r=s.waves[i];break}return r}
function readReal(p){
 var card="",hab="",k=[].slice.call(p.children),i,m;
 for(i=0;i<k.length;i++){var t=tx(k[i]);if(!card&&/Счёт\s*дня/.test(t))card=t;if(!hab&&/Привычки\s*сегодня/.test(t))hab=t}
 if(!card)return null;
 var r={score:0,dd:0,da:0,week:0,streak:0,hd:0,ha:0};
 if(m=card.match(/(\d+)\s*Счёт\s*дня/))r.score=+m[1];
 if(m=card.match(/Сегодня\s*(\d+)\s*из\s*(\d+)/)){r.dd=+m[1];r.da=+m[2]}
 if(m=card.match(/Неделя\s*(\d+)\s*%/))r.week=+m[1];
 if(m=card.match(/Серия\s*(\d+)/))r.streak=+m[1];
 if(m=hab.match(/сегодня\s*(\d+)\s*из\s*(\d+)/)){r.hd=+m[1];r.ha=+m[2]}
 return r}
function readSport(t){var o={},m;
 if(m=t.match(/Подходов\s*выполнено:\s*(\d+)\s*из\s*(\d+)/))o.sets=[+m[1],+m[2]];
 if(m=t.match(/Питание\s*и\s*вода\s*(\d+)\s*из\s*(\d+)/))o.food=[+m[1],+m[2]];
 if(m=t.match(/Тренировки:\s*((?:(?:Пн|Вт|Ср|Чт|Пт|Сб|Вс)\s*\d\d:\d\d\s*·?\s*)+)/)){var pl=["","","","","","",""],re=/(Пн|Вт|Ср|Чт|Пт|Сб|Вс)\s*(\d\d:\d\d)/g,mm;while(mm=re.exec(m[1]))pl[DAYS.indexOf(mm[1])]=mm[2];o.plan=pl}
 return o}
function lastData(){var z={score:0,dd:0,da:0,week:0,streak:0,hd:0,ha:0},v=ls(LAST);if(!v)return z;try{var o=JSON.parse(v);for(var k in z)if(typeof o[k]==="number")z[k]=o[k]}catch(e){}return z}
function spData(){var v=ls(SPK);if(!v)return {};try{return JSON.parse(v)||{}}catch(e){return {}}}
var EX={score:97,delta:2,week:42,streak:11,
 tasks:[["Прочитать 30 страниц книги","h","30 мин"],["Тренировка: грудь и трицепс","m","1 ч"],["Вести бюджет проекта","l","15 мин"],["Изучить 10 новых слов","m","20 мин"],["Медитация перед сном","l","10 мин"],["Подготовить питч","h","2 ч"]],
 ev:[[["Планёрка","09:00","09:30",1],["Работа над проектом","10:00","13:00",2]],
  [["Тренировка","09:00","10:30",3],["Английский язык","12:00","13:00",1]],
  [["Созвон с командой","14:50","15:20",1],["Подписать договор","16:00","16:30",2]],
  [["Английский язык","12:00","13:00",1],["Работа над проектом","16:00","18:00",2]],
  [["Тренировка","09:00","10:30",3],["Английский язык","12:00","13:00",1],["Работа над проектом","16:00","18:00",2]],
  [["Пробежка","10:00","11:00",3]],[["Планирование недели","19:00","19:30",2]]],
 hb:[["Вода",[2,2,2,2,2,2,2]],["Зарядка",[2,2,2,2,0,2,2]],["Чтение",[2,1,2,2,2,2,0]],["Подъём до 7:00",[2,2,2,0,2,0,2]],["Тренировка",[2,2,0,2,2,2,1]]],
 sport:{plan:["18:00","18:00","","18:00","18:00","10:00",""],sets:[5,10],food:[1723,2400],ex:[["Жим лёжа",3,4],["Жим гантелей на наклонной",2,3],["Отжимания на брусьях",0,3]]},
 fin:{bal:"184 200 ₽",inc:[92,"120 000 ₽"],exp:[64,"83 400 ₽"],goal:["Отпуск",62]},
 pr:{week:{v:71,d:6,s:[30,42,38,55,60,58,71]},month:{v:78,d:12,s:[20,32,28,40,52,47,61,66,70,78]},year:{v:64,d:9,s:[12,20,25,31,38,36,45,52,58,64]}},
 tiles:[["Спорт",92,"sport"],["Обучение",76,"book"],["Привычки",85,"habits"],["Питание",71,"apple"],["Финансы",68,"fin"]]};
function exModel(){var t=today(),m={ex:true,score:EX.score,delta:EX.delta,week:EX.week,streak:EX.streak,w:true};
 m.tasks=EX.tasks.map(function(r,i){var k="t"+i;return {t:r[0],c:BC[i%BC.length],done:HX[k]!==undefined?!!HX[k]:i===1,chips:[({h:"Высокий",m:"Средний",l:"Низкий"})[r[1]],r[2]]}});
 m.tasksOn=function(){return m.tasks};
 m.evOn=function(d){return EX.ev[dow(d)].map(function(e){return {t:e[0],s:e[1],e:e[2],c:BC[e[3]]}})};
 m.days=[];var i;for(i=20;i>=0;i--)m.days.push(addD(t,-i));
 m.hab=EX.hb.map(function(r,ri){return {t:r[0],c:BC[(ri+2)%BC.length],cells:EXH(r[1],ri).map(function(v,ci){var k=ri+":"+ci,x=HX[k]!==undefined?HX[k]:v;return x===2?"d":x===1?"p":(ci===20?"n":"m")})}});
 m.sport={plan:EX.sport.plan,sets:EX.sport.sets,food:EX.sport.food,ex:EX.sport.ex,an:EX.an};
 m.fin={accs:EX.acc,inc:120000,exp:83400,free:36600};m.pr=EX.pr;m.tiles=EX.tiles;return m}
function realModel(){var s=S(),w=curWave(s),sp=spData(),t=today(),m={ex:false,w:!!w,delta:0},i;sp.stale=sp.dt?(sp.dt!==iso(t)?sp.dt:""):"old";
 m.days=[];for(i=20;i>=0;i--)m.days.push(addD(t,-i));
 function repOk(task,day){if(task.rep==="weekly"&&w.start)return dow(pIso(w.start))===dow(day);return true}
 function tasksOn(day){var out=[];if(!w||!w.tasks)return out;var bl=Object.keys(w.tasks),bi,ii,arr,tk,key;
  for(bi=0;bi<bl.length;bi++){arr=w.tasks[bl[bi]]||[];for(ii=0;ii<arr.length;ii++){tk=arr[ii];if(!tk||!repOk(tk,day))continue;key=iso(day)+"|O|"+bl[bi]+"|"+ii;
   var st=hm(tk.s),en=hm(tk.e);if(en<0&&st>=0&&tk.m)en=st+tk.m;
   out.push({t:tk.t,s:st>=0?fm(st):"",e:en>=0?fm(en):"",blk:bl[bi],c:BC[bi%BC.length],done:!!(w.done&&w.done[key]),chips:[tk.s?tk.s:"",({urg:"Срочно",high:"Высокий",mid:"Средний",low:"Низкий"})[tk.prio]||"",tk.m?tk.m+" мин":""].filter(Boolean)})}}
  out.sort(function(a,b){return (a.s||"99:99")<(b.s||"99:99")?-1:(a.s||"99:99")>(b.s||"99:99")?1:0});return out}
 m.tasksOn=tasksOn;m.tasks=tasksOn(t);
 m.evOn=function(day){return tasksOn(day).filter(function(x){return x.s}).map(function(x){return {t:x.t,s:x.s,e:x.e,c:x.c}})};
 var HC=["#A78BDA","#E0A458","#6FB7A5","#D98BA0","#9CC27A","#7FB5D6","#B79CE0","#E6B36A"];
 function hst(h,day){var k=iso(day)+"|H|"+h.id;return w.done&&w.done[k]?"d":(w.hs&&w.hs[k]==="part"?"p":(+day<+t&&!(w.start&&+day<+pIso(w.start))?"m":"n"))}
 m.hab=(w&&w.habits||[]).map(function(h,hi){return {t:h.t,c:HC[hi%HC.length],cells:m.days.map(function(day){return hst(h,day)})}});
 var start=w&&w.start?pIso(w.start):t;
 function dayPct(day){if(!w||+day<+start)return null;var done=0,tot=0;(w.habits||[]).forEach(function(h){tot++;var x=hst(h,day);if(x==="d")done++;else if(x==="p")done+=.5});tasksOn(day).forEach(function(x){tot++;if(x.done)done++});return tot?Math.round(done/tot*100):null}
 function avg(n,off){var sum=0,c=0,a=[],j,v;for(j=n-1;j>=0;j--){v=dayPct(addD(t,-j-off));a.push(v===null?0:v);if(v!==null){sum+=v;c++}}return {v:c?Math.round(sum/c):0,s:a,c:c}}
 var td=dayPct(t);m.score=td===null?0:td;
 var wa=avg(7,0),wp=avg(7,7);m.week=wa.v;
 var st=0;for(i=0;i<400;i++){var dd=addD(t,-i),pp=dayPct(dd);if(pp===null)break;if(pp>0)st++;else if(i>0)break}m.streak=st;
 var mo=avg(30,0),mp=avg(30,30);
 var yd=Math.max(1,Math.min(365,Math.round((+t-+start)/864e5)+1)),ya=avg(yd,0),ys=[],ck=Math.max(1,Math.ceil(yd/12)),j2,j3;
 for(j2=0;j2<ya.s.length;j2+=ck){var sm=0,cn=0;for(j3=j2;j3<Math.min(ya.s.length,j2+ck);j3++){sm+=ya.s[j3];cn++}ys.push(Math.round(sm/cn))}
 m.pr={week:{v:wa.v,d:wp.c?wa.v-wp.v:0,s:wa.s},month:{v:mo.v,d:mp.c?mo.v-mp.v:0,s:mo.s},year:{v:ya.v,d:0,s:ys}};
 m.sport={plan:sp.plan||null,sets:sp.sets||null,food:sp.food||null,ex:sp.ex||[],an:anReal(),stale:sp.stale||""};
 m.fin=finReal(s);m.fcnt=s?[(s.accounts||[]).length,(s.ops||[]).length,(s.goals||[]).length]:[0,0,0];
 var tl=[],tdn=m.tasks.filter(function(x){return x.done}).length,hdn=0;m.hab.forEach(function(r){if(r.cells[r.cells.length-1]==="d")hdn++});
 if(m.tasks.length)tl.push(["Задачи",Math.round(tdn/m.tasks.length*100),"tasks"]);
 if(m.hab.length)tl.push(["Привычки",Math.round(hdn/m.hab.length*100),"habits"]);
 if(sp.sets&&sp.sets[1])tl.push(["Спорт",Math.round(sp.sets[0]/sp.sets[1]*100),"sport"]);
 if(sp.food&&sp.food[1])tl.push(["Питание",Math.min(100,Math.round(sp.food[0]/sp.food[1]*100)),"apple"]);
 m.tiles=tl.length?tl:null;
 return m}
var CLK="arq:gl:cl",DEFCL={dyn:1};
function clRead(){var v=ls(CLK);try{return v?(JSON.parse(v)||{}):{}}catch(e){return {}}}
function clGet(cl,k){return cl[k]!==undefined?!!cl[k]:!!DEFCL[k]}
function decorate(){var cl=clRead();
 [].forEach.call(page.querySelectorAll(".card"),function(c){var hd=c.firstElementChild;if(!hd||!hd.classList.contains("gl-h")||c.hasAttribute("data-ck"))return;var b=hd.querySelector("b"),k=b?b.textContent.trim():"";if(!k)return;
  var bd=document.createElement("div");bd.className="gl-bd";while(hd.nextSibling)bd.appendChild(hd.nextSibling);c.appendChild(bd);c.setAttribute("data-ck",k);var ch=document.createElement("i");ch.className="gl-chv";hd.appendChild(ch)});
 [].forEach.call(page.querySelectorAll("[data-ck]"),function(c){c.classList.toggle("gl-cld",clGet(cl,c.getAttribute("data-ck")))})}
var SHK="arq:gl:sh",SUPK="arq:gl:sup",SUPPORT="https://t.me/ARQONx_bot";
EX.acc=[{n:"Сбербанк · Основная карта",ty:"Банк",bal:64200},{n:"Т-Банк · Накопительный счёт",ty:"Банк",bal:120000},{n:"Наличные",ty:"Наличные",bal:0}];
EX.an={lifts:[["Жим лёжа",[70,72.5,75,77.5,80,80,82.5,85]],["Присед",[90,92.5,95,95,100,102.5,105,107.5]],["Тяга",[100,105,105,110,112.5,115,117.5,120]]],food:[88,92,79,95,86,91,97,72],kg:[84.6,84.2,84,83.5,83.4,83,82.6,82.2]};
function EXH(a,ri){var o=[],i;for(i=0;i<21;i++)o.push(i>=14?a[i-14]:a[(i*3+ri)%7]);return o}
function rub(n){return Math.round(n).toLocaleString("ru-RU")+" ₽"}
function finReal(s){var a=(s&&s.accounts)||[],ops=(s&&s.ops)||[],pl=(s&&s.plans)||[],inc=0,exp=0,up=0;
 ops.forEach(function(o){if(o.kind==="in")inc+=+o.sum||0;else if(o.kind==="out")exp+=+o.sum||0});pl.forEach(function(p){if(!p.paid)up+=+p.sum||0});
 return {accs:a.map(function(x){return {n:(x.bank?x.bank+" · ":"")+(x.name||"Счёт"),ty:({bank:"Банк",cash:"Наличные"})[x.type]||"Счёт",bal:+x.bal||0}}),inc:inc,exp:exp,free:inc-exp-up}}
function finCard(m){var fi=m.fin||{accs:[],inc:0,exp:0,free:0},ac=fi.accs||[],h='<div class="card gl-fin"><div class="gl-h"><b><span class="gl-bub">'+ICON.fin+'</span>Мой счёт</b><button type="button" class="gl-lnk" data-a="go:eco">Экономика '+ICON.arrow+'</button></div>';
 if(!ac.length&&!fi.inc&&!fi.exp)return h+'<div class="gl-em">Счетов пока нет<br><button type="button" class="gl-pill" data-a="go:eco">Добавить счёт</button></div></div>';
 var sel=ST.acc>=ac.length?-1:ST.acc,tot=0;ac.forEach(function(a){tot+=a.bal});var cur=sel>=0?ac[sel]:null;
 h+='<div class="gl-fh"><div class="gl-fbig">'+rub(cur?cur.bal:tot)+'</div>'+(m.ex?'<span class="gl-up">↑ +12%</span><div class="gl-fb">'+[3,4,3,5,4,6,5,7,6,8,9,10].map(function(v){return '<i style="height:'+v*8+'%"></i>'}).join("")+'</div>':'')+'</div><div class="gl-sub" style="margin-top:6px">'+(cur?"Деньги на счёте «"+esc(cur.n)+"»":"Деньги на всех счетах")+'</div>';
 if(ac.length)h+='<div class="gl-fa"><button type="button" class="gl-ft'+(sel<0?" on":"")+'" data-a="ac:-1"><small>Все счета</small><b>'+rub(tot)+'</b></button>'+ac.map(function(a,k){return '<button type="button" class="gl-ft'+(k===sel?" on":"")+'" data-a="ac:'+k+'"><small>'+esc(a.n)+'</small><b>'+rub(a.bal)+'</b></button>'}).join("")+'</div>';
 h+='<div class="gl-f3"><div>'+ICON.fin+'<span><small>Доход</small><b class="ok">'+rub(fi.inc)+'</b></span></div><div>'+ICON.card+'<span><small>Расходы</small><b>'+rub(fi.exp)+'</b></span></div><div>'+ICON.pig+'<span><small>Свободно</small><b>'+rub(fi.free)+'</b></span></div></div>';
 var net=fi.inc-fi.exp,pc=fi.inc?Math.min(100,Math.round(fi.exp/fi.inc*100)):0;
 h+='<div class="gl-bar"><b style="width:'+(fi.inc?Math.max(4,100-pc):0)+'%"></b></div><div class="gl-nt" style="margin-top:8px">Итог месяца: '+(net>=0?"+":"−")+rub(Math.abs(net))+' ('+(net>=0?"получено больше, чем потрачено":"потрачено больше, чем получено")+')</div>';
 return h+'</div>'}
function shRead(){var v=ls(SHK);try{return v?(JSON.parse(v)||{}):{}}catch(e){return {}}}
function anReal(){var sh=shRead(),days=Object.keys(sh.d||{}).sort(),lifts={},food=[],kg=[];
 days.forEach(function(k){var o=sh.d[k],l=o.l||{},n;if(o.f&&o.f[1]&&o.f[0]>0)food.push(Math.round(o.f[0]/o.f[1]*100));for(n in l)(lifts[n]=lifts[n]||[]).push(l[n][0])});
 Object.keys(sh.k||{}).sort().forEach(function(k){kg.push(sh.k[k])});
 var names=Object.keys(lifts).sort(function(a,b){return lifts[b].length-lifts[a].length});
 return {lifts:names.map(function(n){return [n,lifts[n]]}),food:food,kg:kg}}
function scrapeSport(){var w=document.querySelector(".arqSportWrap");if(!w||!w.getClientRects().length)return;var s0=S(),rc=s0&&s0.waves?s0.waves.filter(function(x){return x.id===s0.waveCur})[0]:null;if(!rc||isDemo(rc))return;
 var o=readSport(tx(w)),ex=[],lifts={},cur=null,wk=null,els=w.querySelectorAll("b,input"),k,e,pm,p;
 for(k=0;k<els.length;k++){e=els[k];
  if(e.tagName==="B"){p=e.parentElement;pm=p&&p.textContent.match(/(\d+)\s*из\s*(\d+)\s*подходов/);if(pm&&p.children.length<=3){cur=e.textContent.trim();ex.push([cur,+pm[1],+pm[2]]);wk=null}}
  else if(cur){var lb=e.getAttribute("aria-label")||e.placeholder||"";if(lb==="Вес, кг"){wk=parseFloat(String(e.value).replace(",","."))}else if(lb==="Повторы"&&wk>0){var cr=lifts[cur];if(!cr||wk>=cr[0])lifts[cur]=[wk,parseInt(e.value,10)||0];wk=null}}}
 var td=iso(today()),sp=spData();if(o.sets)sp.sets=o.sets;if(o.food)sp.food=o.food;if(o.plan)sp.plan=o.plan;if(ex.length)sp.ex=ex;sp.dt=td;
 var j=JSON.stringify(sp);if(j!==window.__glSp2){window.__glSp2=j;ls(SPK,j)}
 var sh=shRead();sh.d=sh.d||{};var dy=sh.d[td]||{};if(o.food&&o.food[0]>0)dy.f=o.food;if(Object.keys(lifts).length)dy.l=lifts;sh.d[td]=dy;
 var ks=Object.keys(sh.d).sort();while(ks.length>200)delete sh.d[ks.shift()];
 var j2=JSON.stringify(sh);if(j2!==window.__glSh){window.__glSh=j2;ls(SHK,j2)}}
function openSupport(){var u=ls(SUPK)||SUPPORT;try{if(/^https:\/\/t\.me\//.test(u)&&window.Telegram&&Telegram.WebApp&&Telegram.WebApp.openTelegramLink){Telegram.WebApp.openTelegramLink(u);return}}catch(e){}window.open(u,"_blank")}
function injectSupport(){var m=document.querySelector("[role=menu]");if(!m||m.querySelector("[data-glsup]"))return;var it=m.querySelectorAll("[role=menuitem]"),last=it[it.length-1];if(!last)return;
 var c=last.cloneNode(true);c.removeAttribute("data-dc-tpl");c.setAttribute("data-glsup","1");c.innerHTML="<span>Поддержка</span>";
 c.addEventListener("click",function(e){e.stopPropagation();e.preventDefault();openSupport();var b=document.querySelector('.pg button[aria-label="Ещё"]');if(b)b.click()});m.appendChild(c)}
function extras(){
 if(!window.__glEx){window.__glEx=1;document.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest('button[aria-label="Ещё"]');if(b){setTimeout(injectSupport,60);setTimeout(injectSupport,260)}},true)}
 if(!window.__glCl){window.__glCl=1;if(!ls("arq:gl:c2")){try{localStorage.removeItem(SPK);var q0=shRead();q0.d={};ls(SHK,JSON.stringify(q0))}catch(e){}ls("arq:gl:c2","1")}}
 injectSupport();scrapeSport();
 var n=navEl();if(!n)return;var db=nativeBtn("Dashboard"),gb=n.querySelector("[data-glnav]");
 if(db&&gb){var ds=db.querySelector("svg"),gs=gb.querySelector("svg");
  if(ds&&!ds.hasAttribute("data-gls")){ds.innerHTML=ICON.bars;ds.setAttribute("data-gls","1")}
  if(gs&&!gs.hasAttribute("data-gls")){gs.innerHTML=ICON.home;gs.setAttribute("data-gls","1")}}}
function sparkN(a){var w=200,h=60,mn=Math.min.apply(null,a),mx=Math.max.apply(null,a),rg=mx-mn||1,n=Math.max(1,a.length-1),pts=a.map(function(y,i){return (i*(w/n)).toFixed(1)+","+(h-6-((y-mn)/rg)*(h-14)).toFixed(1)}).join(" ");
 return '<svg viewBox="0 0 200 60" preserveAspectRatio="none"><defs><linearGradient id="glg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".3"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs><polygon points="0,60 '+pts+' 200,60" fill="url(#glg2)"/><polyline points="'+pts+'" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'}
function fmtN(v){return String(Math.round(v*10)/10).replace(".",",")}
function mini(title,vals,unit,sub,okc){if(!vals.length)return '<div class="gl-am"><span class="t">'+title+'</span><span class="v">—</span><span class="d">пока нет данных</span></div>';
 return '<div class="gl-am"><span class="t">'+title+'</span><span class="v">'+fmtN(vals[vals.length-1])+' <small>'+unit+'</small></span><span class="d'+(okc?" ok":"")+'">'+sub+'</span>'+(vals.length>1?sparkN(vals):'')+'</div>'}
function ring(v,sz){var c=2*Math.PI*44,o=c*(1-Math.max(0,Math.min(100,v))/100);
 return '<div class="gl-ring" style="'+(sz?'width:'+sz+'px;height:'+sz+'px':'')+'"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="var(--line)" stroke-width="11"/><circle cx="50" cy="50" r="44" fill="none" stroke="var(--ink)" stroke-width="11" stroke-linecap="'+(v>0?'round':'butt')+'" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'" style="transition:stroke-dashoffset .6s cubic-bezier(.22,.8,.3,1)"/></svg><span>'+v+'%</span></div>'}
function spark(a){if(!a.length)return '';var w=200,h=80,mx=Math.max.apply(null,a),mn=Math.min.apply(null,a),rg=(mx-mn)||1,n=Math.max(1,a.length-1),P=a.map(function(y,i){return [i*(w/n),mx===mn?h*0.55:h-12-((y-mn)/rg)*(h-32)]});
 var d="M"+P[0][0].toFixed(1)+","+P[0][1].toFixed(1);for(var k=0;k<P.length-1;k++){var p0=P[k-1]||P[k],p1=P[k],p2=P[k+1],p3=P[k+2]||p2;d+=" C"+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+","+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)+" "+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+","+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)+" "+p2[0].toFixed(1)+","+p2[1].toFixed(1)}
 var L=P[P.length-1];
 return '<svg viewBox="0 0 200 80" preserveAspectRatio="none"><defs><linearGradient id="glg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--ink2)" stop-opacity=".22"/><stop offset="1" stop-color="var(--ink2)" stop-opacity="0"/></linearGradient></defs><path d="'+d+' L200,80 L0,80 Z" fill="url(#glg)"/><path d="'+d+'" fill="none" stroke="var(--ink2)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg><i class="gl-spd" style="top:'+(L[1]/h*100).toFixed(1)+'%"></i>'+P.slice(0,-1).map(function(q,ix){return '<i class="gl-spp'+(ix%3===1?' g':'')+'" style="left:'+(q[0]/w*100).toFixed(1)+'%;top:'+(q[1]/h*100).toFixed(1)+'%"></i>'}).join("")
}
function trow2(r,i){
 var pr="",pi=0,k;for(k=0;k<(r.chips||[]).length;k++){var ix=["Низкий","Средний","Высокий","Срочно"].indexOf(r.chips[k]);if(ix>=0){pr=r.chips[k];pi=ix;break}}
 var ck='<button type="button" class="arqCk gl-ck'+(r.done?' on':'')+'" aria-label="Выполнено" data-a="td:'+i+'"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:'+(r.done?1:0)+'"><path d="M5 12l4 4L19 7"/></svg></button>';
 return '<div class="gl-tr'+(r.done?' d':'')+'" data-a="go:tasks">'+ck+'<div class="gl-tt"><span>'+esc(r.t)+'</span>'+(!r.done?'':pr?'<small>'+(pr==="Срочно"?"Срочно":pr+" приоритет")+'</small>':(r.chips&&r.chips[0]?'<small>'+esc(r.chips[0])+'</small>':''))+'</div>'+(r.done?'<i class="gl-dots">···</i>':(pr?'<em class="gl-pp p'+pi+'">'+pr+'</em>':''))+'</div>'}
function trow(r,i){
 var ck='<button type="button" class="arqCk" aria-label="Выполнено" data-a="td:'+i+'" style="cursor:pointer;width:24px;height:24px;border-radius:8px;border:1.5px solid '+(r.done?'var(--accent)':'var(--line2)')+';background:'+(r.done?'var(--accent)':'transparent')+';color:var(--on-accent);display:flex;align-items:center;justify-content:center;padding:0;flex:0 0 auto"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:'+(r.done?1:0)+'"><path d="M5 12l4 4L19 7"/></svg></button>';
 return '<div class="tkRow" data-a="go:tasks" style="position:relative;overflow:hidden;display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:16px;border-left:3px solid '+r.c+';background:color-mix(in srgb,'+r.c+' 11%,var(--card));--tkac:'+r.c+';opacity:'+(r.done?.72:1)+'">'+ck+'<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;padding:3px 0"><span style="font-size:14px;font-weight:600;line-height:1.3;word-break:break-word;'+(r.done?'text-decoration:line-through;':'')+'">'+esc(r.t)+'</span><span style="display:flex;flex-wrap:wrap;gap:6px;color:var(--muted);font-size:12px">'+r.chips.map(function(c){return '<span class="aiT" style="border-radius:999px;padding:1px 8px;background:rgba(255,255,255,.06)">'+esc(c)+'</span>'}).join("")+'</span></div></div>'}
var HCS={d:['var(--hcDd)','var(--hcDb)','var(--hcDf)','✓'],p:['var(--hcPd)','var(--hcPb)','var(--hcPf)','½'],m:['var(--hcMb)','var(--hcMb)','var(--hcMf)','−'],n:['var(--line2)','color-mix(in srgb,var(--ink) 7%,transparent)','var(--muted)','–']};
function seg(items,cur,pre){return '<div class="gl-seg">'+items.map(function(x){return '<button type="button" class="'+(cur===x[0]?"on":"")+'" data-a="'+pre+':'+x[0]+'">'+x[1]+'</button>'}).join("")+'</div>'}
function evRows(list){return list.map(function(e){return '<div class="gl-ev" data-a="go:cal" style="--c:'+e.c+'"><span class="tm">'+e.s+(e.e?" – "+e.e:"")+'</span><b>'+esc(e.t)+'</b></div>'}).join("")}
function calHtml(m){
 var t=today(),h='',i,j,sel=ST.sel?pIso(ST.sel):t,base,label;
 if(ST.cm==="week"){base=addD(t,-dow(t)+ST.off*7);var e7=addD(base,6);label=base.getDate()+(base.getMonth()!==e7.getMonth()?" "+MONG[base.getMonth()]:"")+" – "+e7.getDate()+" "+MONG[e7.getMonth()]+" "+e7.getFullYear()}
 else if(ST.cm==="day"){base=addD(t,ST.off);label=DFULL[dow(base)]+", "+base.getDate()+" "+MONG[base.getMonth()]}
 else{base=new Date(t.getFullYear(),t.getMonth()+ST.off,1);label=MON[base.getMonth()]+" "+base.getFullYear()}
 h+='<div class="card gl-calc"><div class="gl-h"><b><span class="gl-bub">'+ICON.cal+'</span>Календарь</b><div class="gl-nv"><button type="button" class="gl-ib" data-a="off:-1" aria-label="Назад">'+ICON.left+'</button><button type="button" class="gl-ib" data-a="off:1" aria-label="Вперёд">'+ICON.arrow+'</button></div></div>';
 h+='<div class="gl-cl">'+label+'</div><div class="gl-cs">'+seg([["month","Месяц"],["week","Неделя"],["day","День"]],ST.cm,"cm")+'<button type="button" class="gl-pill" data-a="tod">Сегодня</button><button type="button" class="gl-lnk" data-a="go:cal">Всё расписание '+ICON.arrow+'</button></div>';
 if(ST.cm==="week"){h+='<div class="gl-wg">';
  for(i=0;i<7;i++){var d=addD(base,i),evs=m.evOn(d),isT=+d===+t;
   h+='<div class="gl-wc"><button type="button" class="gl-wd'+(isT?" t":"")+'" data-a="sel:'+iso(d)+'">'+DAYS[i]+'<b>'+d.getDate()+'</b></button>';
   for(j=0;j<Math.min(3,evs.length);j++)h+='<div class="gl-chip" data-a="go:cal" style="--c:'+evs[j].c+'"><small>'+evs[j].s+'</small><span>'+esc(evs[j].t)+'</span></div>';
   if(evs.length>3)h+='<div class="gl-more">ещё '+(evs.length-3)+'</div>';
   h+='</div>'}
  h+='</div>'}
 else if(ST.cm==="day"){var ev1=m.evOn(base);h+=ev1.length?evRows(ev1):'<div class="gl-em">На этот день событий нет</div>'}
 else{h+='<div class="gl-mg">'+DAYS.map(function(x){return '<div class="gl-mh">'+x+'</div>'}).join("");
  var first=dow(base),cnt=new Date(base.getFullYear(),base.getMonth()+1,0).getDate();
  for(i=0;i<42;i++){var dd=addD(base,i-first);if(i>=35&&dd.getMonth()!==base.getMonth())break;var n=Math.min(3,m.evOn(dd).length),dots='';for(j=0;j<n;j++)dots+='<i></i>';
   h+='<button type="button" class="gl-md'+(dd.getMonth()!==base.getMonth()?" o":"")+(+dd===+t?" t":"")+(+dd===+sel?" s":"")+'" data-a="sel:'+iso(dd)+'">'+dd.getDate()+'<u>'+dots+'</u></button>'}
  h+='</div>';var evS=m.evOn(sel);h+='<div class="gl-sub" style="margin-top:10px">'+sel.getDate()+' '+MONG[sel.getMonth()]+'</div>'+(evS.length?evRows(evS.slice(0,4)):'<div class="gl-em" style="padding:10px">Событий нет</div>')}
 return h+'</div>'}
function render(m){
 var t=today(),i,h=[],ex=m.ex;
 var T=m.tasks,tdn=T.filter(function(x){return x.done}).length,hd=0,ha=m.hab.length;
 m.hab.forEach(function(r){if(r.cells[r.cells.length-1]==="d")hd++});
 window.__glScore=m.score;var evToday=m.evOn(t).length,sp=m.sport,spn=sp.sets?sp.sets[0]+" из "+sp.sets[1]:"";
 h.push('<div class="gl-hd"><div><p>Ваш личный центр продуктивности</p></div><button type="button" class="gl-sw" role="switch" aria-checked="'+(ex?"true":"false")+'" data-a="sw">Пример<i></i></button></div>');
 if(!ex&&!m.w)h.push('<div class="card gl-note" style="padding:10px 14px!important;font-size:13px;color:var(--muted)">Здесь пока нет ваших данных: все цифры считаются только по вашей волне и счетам. Создайте свою волну в «Моя волна» — или включите «Пример», чтобы посмотреть, как всё выглядит.</div>');
 var Q=[["tasks","Задачи",ICON.tasks,T.length?tdn+" из "+T.length:"Открыть"],["cal","Календарь",ICON.cal,evToday?evToday+" на сегодня":"Расписание"],["habits","Привычки",ICON.habits,ha?hd+" из "+ha:"Открыть"],["sport","Спорт",ICON.sport,spn?"подходы "+spn:"Тренировки"],["eco","Финансы",ICON.fin,"Экономика"]];
 h.push('<div class="gl-q">'+Q.map(function(x,qi){var c=CT[x[0]==="eco"?"fin":x[0]];return '<button type="button" class="gl-qb" data-a="go:'+x[0]+'" style="--c:'+c+';--i:'+qi+'"><span class="ic">'+x[2]+'</span><span class="tx"><b>'+x[1]+'</b><small>'+x[3]+'</small></span></button>'}).join("")+'</div>');
 var da=T.length,dl=tdn,pct=da?Math.round(dl/da*100):0,wk=m.week,filled=wk>0?Math.max(1,Math.round(wk/100*7)):0;
 var TOP=('<div class="gl-top">'
 +'<div class="card gl-lk" data-a="go:tasks"><div class="gl-l">Сегодня</div><div class="gl-row">'+ring(m.score)+'<div><div class="gl-sub">Задач и привычек<br>выполнено сегодня</div>'+(ex?'<div class="gl-up">+'+m.delta+'</div>':'')+'</div></div></div>'
 +'<div class="card gl-lk" data-a="go:tasks"><div class="gl-l">Сроки</div><div class="gl-big">'+dl+' <small>из '+da+'</small></div><div class="gl-bar"><b style="width:'+pct+'%"></b></div><div class="gl-sub" style="margin-top:6px">'+pct+'%</div></div>'
 +'<div class="card gl-lk" data-a="go:cal"><div class="gl-l">Неделя'+ICON.bars+'</div><div class="gl-big">'+wk+' <small>%</small></div><div class="gl-sub" style="margin-top:6px">в среднем за 7 дней</div><div class="gl-wk">'+[0,1,2,3,4,5,6].map(function(n){return '<b class="'+(n<filled?(n===filled-1?"cur":"on"):"")+'"></b>'}).join("")+'</div></div>'
 +'<div class="card gl-lk" data-a="go:habits"><div class="gl-l">Серия</div><div class="gl-row">'+ICON.flame+'<div><div class="gl-big">'+m.streak+'</div><div class="gl-sub">дней подряд с активностью</div></div></div><div class="gl-bar w"><b style="width:'+Math.min(100,m.streak*9)+'%"></b></div></div>'
 +'</div>');
 var L=[],R=[];
 var shown=T.filter(function(x){return ST.tf==="all"||(ST.tf==="todo"?!x.done:x.done)});
 var th='<div class="card gl-today"><span class="gl-wx">'+(window.__wxHtml?window.__wxHtml():'')+'</span><div class="gl-tdh"><div><small>Сегодня</small><h3>'+t.getDate()+' '+MONG[t.getMonth()]+'</h3><span>'+DFULL[dow(t)]+'</span></div><div class="gl-tdr">'+'<span class="gl-wxc">'+(window.__wxChip?window.__wxChip():'')+'</span>'+'<button type="button" class="gl-lnk" data-a="go:tasks">'+dl+' из '+da+' '+ICON.arrow+'</button></div></div>'+seg([["all","Все"],["todo","Осталось"],["done","Готово"]],ST.tf,"tf");
 if(shown.length)th+='<div class="gl-trs">'+shown.slice(0,5).map(function(r){return trow2(r,T.indexOf(r))}).join("")+'</div><div class="gl-all"><a data-a="go:tasks">'+(shown.length>5?"Показать все задачи ("+shown.length+")":"Показать все задачи")+' '+ICON.arrow+'</a></div>';
 else th+='<div class="gl-em">'+(T.length?"В этом списке пусто":"На сегодня задач нет")+'<br><button type="button" class="gl-pill" data-a="go:tasks">Открыть задачи</button></div>';
 var TSK=th+'</div>';
 var hh='<div class="card"><div class="gl-h"><b>'+ICON.habits+'Привычки</b><button type="button" class="gl-lnk" data-a="go:habits">Все привычки '+ICON.arrow+'</button></div><div class="gl-sub">'+(ha?"сегодня "+hd+" из "+ha+" · последние "+m.days.length+" дней":"привычек пока нет")+'</div>';
 hh+='<div class="gl-nh"><input type="text" placeholder="Новая привычка" aria-label="Новая привычка" data-a="go:habits" readonly><button type="button" data-a="go:habits" aria-label="Добавить привычку">+</button></div>';
 if(ha){hh+='<div class="gl-hbs"><div class="gl-hr" style="border-top:0"><span></span>'+m.days.map(function(d){return '<span class="gl-hd1'+(+d===+t?" t":"")+'">'+DAYS[dow(d)]+'<b>'+d.getDate()+'</b></span>'}).join("")+'</div>'
  +m.hab.map(function(r,ri){return '<div class="gl-hr"><button type="button" class="gl-hn" data-a="go:habits"><i style="background:'+r.c+'"></i><span>'+esc(r.t)+'</span></button>'+r.cells.map(function(c,ci){var s=HCS[c],last=ci===r.cells.length-1;return '<button type="button" class="hbc" '+(ex&&last?'data-a="hc:'+ri+':'+ci+'"':'data-a="go:habits"')+' title="'+esc(r.t)+'" style="border:1.5px solid '+s[0]+';background:'+s[1]+';color:'+s[2]+'">'+s[3]+'</button>'}).join("")+'</div>'}).join("")+'</div>'}
 var HB=hh+'</div>';
 var FH=finCard(m);
 var CAL=calHtml(m);
 var an=sp.an||{lifts:[],food:[],kg:[]},lf=Math.min(ST.lf,Math.max(0,an.lifts.length-1)),cl=an.lifts[lf];
 var sh='<div class="card"><div class="gl-h"><b>'+ICON.sport+'Спорт</b><button type="button" class="gl-lnk" data-a="go:sport">Тренировки '+ICON.arrow+'</button></div>'+(sp.plan?'<div class="gl-sd">'+DAYS.map(function(x,di){var v=sp.plan[di];return '<div class="'+(di===dow(t)?"t ":"")+(v?"":"r")+'">'+x+'<b>'+(v||"отдых")+'</b></div>'}).join("")+'</div>':'');
 if(sp.sets){var sp1=sp.sets[1]?Math.round(sp.sets[0]/sp.sets[1]*100):0;sh+='<div class="gl-kv" style="margin-top:0"><span>Подходов выполнено</span><b>'+sp.sets[0]+' из '+sp.sets[1]+'</b></div><div class="gl-bar"><b style="width:'+sp1+'%"></b></div>'}
 if(sp.food){var fp=sp.food[1]?Math.min(100,Math.round(sp.food[0]/sp.food[1]*100)):0;sh+='<div class="gl-kv"><span>Питание и вода</span><b>'+sp.food[0]+' из '+sp.food[1]+' ккал</b></div><div class="gl-bar w"><b style="width:'+fp+'%"></b></div>'}
 if(sp.ex&&sp.ex.length)sh+='<div class="gl-ls">'+sp.ex.map(function(x){var dn=x[2]>0&&x[1]>=x[2];return trow({t:x[0],c:CT.sport,done:dn,chips:[x[1]+" из "+x[2]+" подходов"]},-1).replace('data-a="go:tasks"','data-a="go:sport"').replace(/data-a="td:-1"/,'data-a="go:sport"')}).join("")+'</div>';
 if(!sp.plan&&!sp.sets&&!sp.food&&!(sp.ex&&sp.ex.length))sh+='<div class="gl-sub" style="text-align:center;padding:6px 0">Подходы и питание за сегодня подтянутся после захода во вкладку «Спорт»</div>';
 if(sp.stale)sh+='<div class="gl-nt" style="margin-top:8px">'+(sp.stale==="old"?"Данные с последнего захода во вкладку «Спорт»":"Данные за "+sp.stale.slice(8,10)+"."+sp.stale.slice(5,7))+'</div>';
 sh+='<div data-ck="dyn"><div class="gl-sec">Динамика<i class="gl-chv"></i></div><div class="gl-bd">';
 if(an.lifts.length>1)sh+='<div class="gl-chs">'+an.lifts.slice(0,6).map(function(l,li){return '<button type="button" class="gl-pill'+(li===lf?" on":"")+'" data-a="lf:'+li+'">'+esc(l[0])+'</button>'}).join("")+'</div>';
 var lv=cl?cl[1]:[],ld=lv.length>1?Math.round((lv[lv.length-1]-lv[0])*10)/10:0,fv=an.food,fa=fv.length?Math.round(fv.reduce(function(p,q){return p+q},0)/fv.length):0,kv=an.kg,kd=kv.length>1?Math.round((kv[kv.length-1]-kv[0])*10)/10:0;
 sh+='<div class="gl-an">'
  +mini("Рабочий вес"+(cl?" · "+esc(cl[0]):""),lv,"кг",lv.length>1?(ld>0?"+":"")+fmtN(ld)+" кг с начала":"одно измерение",ld>0)
  +mini("Питание, % нормы",fv,"%","в среднем "+fa+"%",fa>=85&&fa<=110)
  +mini("Мой вес",kv,"кг",kv.length>1?(kd>0?"+":"")+fmtN(kd)+" кг с начала":"одно измерение",false)+'</div>';
 sh+='<div class="gl-wi"><input type="text" inputmode="decimal" placeholder="Мой вес сегодня, кг" aria-label="Мой вес сегодня"><button type="button" class="gl-pill" data-a="kg">Записать</button></div>';
 if(!ex&&!lv.length&&!fv.length&&!kv.length)sh+='<div class="gl-nt" style="margin-top:8px">История копится по дням: заходите во вкладку «Спорт» — рабочие веса и питание запоминаются, вес вводите здесь.</div>';
 sh+='</div></div>';var SPT=sh+'</div>';
 var P=m.pr[ST.pr];
 var ph='<div class="card gl-prg"><div class="gl-h"><b><span class="gl-bub">'+ICON.bars+'</span>Прогресс</b>'+seg([["week","Неделя"],["month","Месяц"],["year","Год"]],ST.pr,"pr")+'</div><div class="gl-pr2"><div class="gl-prt">'+ring(P.v,104)+'<div><div class="gl-sub">Общий прогресс<br>за '+({week:"неделю",month:"месяц",year:"год"})[ST.pr]+'</div>'+(ex?'<div class="gl-up">↑ +'+P.d+'%</div>':'')+'</div></div><div class="gl-sp2">'+spark(P.s)+'</div></div>';
 if(m.tiles)ph+='<div class="gl-tl">'+m.tiles.map(function(x){return '<div class="gl-lk" data-a="go:'+(x[2]==="fin"?"eco":x[2]==="apple"||x[2]==="book"?"tasks":x[2])+'">'+ICON[x[2]]+'<b>'+x[1]+'%</b><span class="gl-nt">'+x[0]+'</span></div>'}).join("")+'</div>';
 var PRG=ph+'</div>';
 h.push('<div class="gl-cols2"><div class="gl-col">'+TSK+PRG+'</div><div class="gl-col">'+CAL+FH+'</div></div>');
 window.__glSPT=SPT;
 return h.join("")}
function navEl(){return document.querySelector(".arqNav nav")}
function nativeBtn(txt){var n=navEl();if(!n)return null;var b=n.querySelectorAll("button");for(var i=0;i<b.length;i++){if(!b[i].hasAttribute("data-glnav")&&b[i].textContent.trim()===txt)return b[i]}return null}
function rowEl(){var bs=document.querySelectorAll("button");for(var i=0;i<bs.length;i++){var b=bs[i];if(b.textContent.trim()==="Задачи"&&!b.closest(".gl-page")&&b.parentElement&&/Календарь/.test(b.parentElement.textContent)&&b.parentElement.querySelectorAll("button").length>=3)return b.parentElement}return null}
function waitFor(fn,ms,cb){var t0=Date.now();(function s(){var r=fn();if(r){cb(r);return}if(Date.now()-t0>ms)return;setTimeout(s,150)})()}
function fin(cur){var n=navEl();if(n){var bs=n.querySelectorAll("button");for(var i=0;i<bs.length;i++)bs[i].__glc=undefined}
 setOn(false);
 if(n&&cur){var b2=n.querySelectorAll("button");for(var j=0;j<b2.length;j++){var x=b2[j];x.setAttribute("aria-current",x===cur?"page":"false")}}
 busy=false}
function fr(f){setTimeout(f,40)}
function go(t){
 if(busy)return;busy=true;
 var cur=null;
 if(t==="dash"||t==="eco"){cur=nativeBtn(t==="dash"?"Dashboard":"Экономика");if(cur)cur.click();fr(function(){fin(cur)});return}
 cur=nativeBtn("Моя волна");if(cur)cur.click();
 setTimeout(function(){if(!rowEl()){var wv=document.querySelector(".arqNav .arqWv button");if(wv)wv.click()}waitFor(rowEl,4000,function(row){
  var name={tasks:"Задачи",cal:"Календарь",sport:"Спорт",habits:"Задачи"}[t],bs=row.querySelectorAll("button");
  for(var i=0;i<bs.length;i++)if(bs[i].textContent.trim()===name){bs[i].click();break}
  fr(function(){fin(cur);
   if(t==="habits"){waitFor(function(){var hs=document.querySelectorAll("div,span");for(var i=0;i<hs.length;i++){var h=hs[i];if(h.children.length<4&&h.textContent.length<40&&/^Привычки\s*сегодня/.test(h.textContent.trim())&&!h.closest(".gl-page")&&h.getBoundingClientRect().height>0)return h}return null},2500,function(h){window.scrollTo({top:Math.max(0,h.getBoundingClientRect().top+window.scrollY-90),behavior:"instant"})})}})})},30);
 setTimeout(function(){if(busy)fin(cur)},5500)}
function setOn(v){if(on===v)return;on=v;sigPrev="";var n=navEl();
 if(!v){if(page&&page.parentNode)page.parentNode.removeChild(page);
  [].slice.call(document.querySelectorAll("[data-glh],[data-glon]")).forEach(function(e){e.removeAttribute("data-glh");e.removeAttribute("data-glon")});
  if(n){var bs=n.querySelectorAll("button");for(var i=0;i<bs.length;i++){var b=bs[i];if(b.hasAttribute("data-glnav")){b.setAttribute("aria-current","false")}else if(b.__glc){b.setAttribute("aria-current",b.__glc);b.__glc=undefined}}}}
 tick()}
function ensureNav(){
 var n=navEl();if(!n)return;var dn0=nativeBtn("Dashboard");if(dn0&&!dn0.hasAttribute("data-gldash"))dn0.setAttribute("data-gldash","1");
 if(!document.getElementById("gl-css")){var s=document.createElement("style");s.id="gl-css";s.textContent=css;document.head.appendChild(s)}
 var b=n.querySelector("[data-glnav]");
 if(!b){var first=n.querySelector("button");if(!first)return;
  b=document.createElement("button");b.type="button";b.className="arqNb";b.setAttribute("data-glnav","1");b.setAttribute("aria-current","false");b.setAttribute("style",first.getAttribute("style")||"");
  b.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON.home+'</svg><span>Главное</span>';
  n.insertBefore(b,n.firstChild)}
 var ar=n.closest(".arqNav");if(ar&&!ar.querySelector(".gl-sbf")){var fo=document.createElement("div");fo.className="gl-sbf";
  fo.innerHTML='<button type="button" class="gl-sbp" data-f="prog">'+ICON.bars+'<span>Прогресс<b class="gl-sbv"></b></span>'+ICON.arrow+'</button><button type="button" class="gl-sbs" data-f="set"><svg class="gl-ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>Сменить тему</button><button type="button" class="gl-sbs" data-f="pal"><svg class="gl-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-3.9-4-7.2-9-7.2z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/></svg>Сменить цвет</button><button type="button" class="gl-sbc" data-f="new"><span>Создай свою волну</span><i><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></i></button>';
  fo.addEventListener("click",function(e){var t=e.target.closest("[data-f]");if(!t)return;var f=t.getAttribute("data-f"),bs2,i2;
   if(f==="new"){bs2=document.querySelectorAll("button");for(i2=0;i2<bs2.length;i2++){if(!bs2[i2].closest(".gl-sbf")&&bs2[i2].textContent.trim()==="Создать"){bs2[i2].click();return}}}
   else if(f==="set"){var mb=document.querySelector('button[aria-label="Сменить тему"]');if(mb)window.__glWave(t,function(){mb.click()})}
   else if(f==="pal"){var pb=document.getElementById("arqPal");if(pb)window.__glWave(t,function(){pb.click()})}
   else if(f==="prog"){var gb=document.querySelector("[data-glnav]");if(gb&&!on)gb.click();setTimeout(function(){var pe=document.querySelector(".gl-prg");if(pe)pe.scrollIntoView({behavior:"smooth",block:"center"})},on?0:500)}});
  ar.appendChild(fo)}
 var sv=ar&&ar.querySelector(".gl-sbv");if(sv){var nw1=Date.now();if(nw1-(window.__glSbT||0)>3000){window.__glSbT=nw1;try{window.__glSbV=realModel().score}catch(e){}}sv.textContent=window.__glSbV!=null?window.__glSbV+"%":""}
 if(on&&!busy){var bs=n.querySelectorAll("button");for(var i=0;i<bs.length;i++){var x=bs[i];if(x===b)continue;var c=x.getAttribute("aria-current");if(c&&c!=="false"){x.__glc=c;x.setAttribute("aria-current","false")}}b.setAttribute("aria-current","page")}}
function spClick(e){var box=e.currentTarget,hh=e.target.closest&&e.target.closest(".gl-sec");if(hh&&!e.target.closest("button,input,a,[data-a]")){var ct=hh.closest("[data-ck]");if(ct){var kk=ct.getAttribute("data-ck"),cl=clRead(),nv=!clGet(cl,kk);cl[kk]=nv?1:0;ls(CLK,JSON.stringify(cl));ct.classList.toggle("gl-cld",nv);return}}
 var t=e.target.closest&&e.target.closest("[data-a]");if(!t)return;var a=t.getAttribute("data-a").split(":");
 if(a[0]==="lf"){ST.lf=+a[1];window.__glSpT=0;spTab()}
 else if(a[0]==="kg"){var inp=box.querySelector(".gl-wi input"),kv=parseFloat(String(inp&&inp.value||"").replace(",","."));if(kv>0&&kv<400&&!box.__ex){var shh=shRead();shh.k=shh.k||{};shh.k[iso(today())]=kv;ls(SHK,JSON.stringify(shh));if(inp)inp.value="";window.__glSpT=0;spTab()}}}
function spTab(){var w=document.querySelector(".arqSportWrap"),box=document.getElementById("glSpt");
 if(!w||!w.getClientRects().length||!w.parentNode){if(box)box.style.display="none";if(w)w.classList.remove("gl-spn");return}
 if(!box){box=document.createElement("div");box.id="glSpt";box.className="gl-page gl-spt";box.addEventListener("click",spClick)}
 if(box.nextSibling!==w||box.parentNode!==w.parentNode)w.parentNode.insertBefore(box,w);
 box.style.display="";w.classList.add("gl-spn");
 var nw=Date.now();if(nw-(window.__glSpT||0)<1500&&box.firstChild)return;window.__glSpT=nw;
 var st=S(),sw=null,i;if(st&&st.waves)for(i=0;i<st.waves.length;i++)if(st.waves[i].id===st.waveCur)sw=st.waves[i];
 var ex=isDemo(sw);box.__ex=ex;var m=ex?exModel():realModel();
 var act=document.activeElement,keep=act&&box.contains(act)&&act.tagName==="INPUT"?act.value:null;
 try{render(m)}catch(e){return}
 var sig=JSON.stringify([window.__glSPT,ST.lf,ex]);if(box.__sig===sig&&box.firstChild)return;box.__sig=sig;
 box.innerHTML=window.__glSPT||"";
 [].forEach.call(box.querySelectorAll(".gl-lnk"),function(q){q.style.display="none"});
 var cl=clRead();[].forEach.call(box.querySelectorAll("[data-ck]"),function(c){c.classList.toggle("gl-cld",clGet(cl,c.getAttribute("data-ck")))});
 var hd=box.querySelector(".card>.gl-h");if(hd&&!box.querySelector(".card>.gl-h .gl-chv")){}
 if(keep!==null){var ni=box.querySelector(".gl-wi input");if(ni){ni.value=keep;ni.focus()}}}
function tick(){try{
 ensureNav();extras();spTab();var nw0=Date.now();if(nw0-(window.__glAn||0)>2500){window.__glAn=nw0;[].forEach.call(document.querySelectorAll(".arqAn>div:last-child"),function(q){if(!q.__gls&&q.scrollWidth>q.clientWidth+4){q.scrollLeft=q.scrollWidth;q.__gls=1}})}
 var r=rowEl();if(r&&r.parentElement){var sp0=readSport(tx(r.parentElement));if(sp0.sets||sp0.food||sp0.plan){var o=spData();if(sp0.sets)o.sets=sp0.sets;if(sp0.food)o.food=sp0.food;if(sp0.plan)o.plan=sp0.plan;var j=JSON.stringify(o);if(j!==window.__glSpJ){window.__glSpJ=j;ls(SPK,j)}}}
 if(!on)return;
 if(Date.now()<hold)return;
 var nv=navEl(),ao=nv&&nv.closest(".arqNav"),root=ao&&ao.parentElement;if(!root)return;
 if(!page){page=document.createElement("div");page.className="gl-page";page.setAttribute("data-fresh","1");setTimeout(function(){page&&page.removeAttribute("data-fresh")},700);page.addEventListener("click",onClick);page.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.closest&&e.target.closest(".gl-wi")){var b=page.querySelector(".gl-wi button");if(b)b.click()}})}
 if(!root.__glo){root.__glo=1;new MutationObserver(function(){if(!(on||busy))return;[].slice.call(root.children).forEach(function(c){if(c!==page&&!c.classList.contains("pg")&&!c.classList.contains("arqNav")&&!c.hasAttribute("data-glh"))c.setAttribute("data-glh","1")})}).observe(root,{childList:true})}
 var kids=[].slice.call(root.children),pgs=kids.filter(function(c){return c!==page&&!c.classList.contains("pg")&&!c.classList.contains("arqNav")&&!c.hasAttribute("data-glh")});
 pgs.forEach(function(c){c.setAttribute("data-glh","1")});
 var pgE=root.querySelector(":scope>.pg");root.setAttribute("data-glon","1");if(pgE){var h0=pgE.firstElementChild;if(page.parentNode!==pgE||page.previousElementSibling!==h0){pgE.insertBefore(page,h0?h0.nextSibling:null);sigPrev=""}}else if(page.parentNode!==root){root.insertBefore(page,root.firstChild);sigPrev=""}
 var ex=ls(KEY)==="1",m=ex?exModel():realModel();
 var sig=JSON.stringify([m,ST,HX,ex,iso(today())]);
 if(sig!==sigPrev){sigPrev=sig;var sy=window.scrollY;page.innerHTML=render(m);decorate();[].forEach.call(page.querySelectorAll(".gl-hbs"),function(q){q.scrollLeft=q.scrollWidth});if(window.scrollY!==sy)window.scrollTo(0,sy)}
}catch(e){window.__glErr=String(e&&e.stack||e)}}
function onClick(e){var hh=e.target.closest&&e.target.closest(".gl-h,.gl-sec");if(hh&&page.contains(hh)&&!e.target.closest("button,input,a,[data-a]")){var ct=hh.closest("[data-ck]");if(ct){var kk=ct.getAttribute("data-ck"),cl=clRead(),nv=!clGet(cl,kk);cl[kk]=nv?1:0;ls(CLK,JSON.stringify(cl));ct.classList.toggle("gl-cld",nv);return}}
 var t=e.target.closest&&e.target.closest("[data-a]");if(!t||!page.contains(t))return;var a=t.getAttribute("data-a").split(":"),ex=ls(KEY)==="1";
 if(a[0]==="go"){go(a[1]);return}
 if(a[0]==="sw"){e.stopPropagation();var nx=!ex;ls(KEY,nx?"1":"0");t.setAttribute("aria-checked",nx?"true":"false");hold=Date.now()+480;setTimeout(function(){sigPrev="";tick()},500);return}
 if(a[0]==="td"){e.stopPropagation();if(!ex){go("tasks");return}var k="t"+a[1],cur=HX[k]!==undefined?HX[k]:(+a[1]===1);HX[k]=!cur}
 else if(a[0]==="hc"){e.stopPropagation();if(!ex){go("habits");return}var k2=a[1]+":"+a[2],ro=EX.hb[+a[1]][1][+a[2]],c2=HX[k2]!==undefined?HX[k2]:ro;HX[k2]=c2===2?0:2}
 else if(a[0]==="ac"){ST.acc=+a[1];var fe2=page.querySelector(".gl-fin");if(fe2){var mm=ex?exModel():realModel(),tmp=document.createElement("div");tmp.innerHTML=finCard(mm);fe2.parentNode.replaceChild(tmp.firstChild,fe2);decorate();sigPrev=JSON.stringify([mm,ST,HX,ex,iso(today())]);return}}
 else if(a[0]==="lf"){ST.lf=+a[1]}
 else if(a[0]==="kg"){if(ex){go("sport");return}var inp=page.querySelector(".gl-wi input"),kv=parseFloat(String(inp&&inp.value||"").replace(",","."));if(kv>0&&kv<400){var shh=shRead();shh.k=shh.k||{};shh.k[iso(today())]=kv;ls(SHK,JSON.stringify(shh))}}
 else if(a[0]==="tf"){ST.tf=a[1]}
 else if(a[0]==="pr"){ST.pr=a[1]}
 else if(a[0]==="cm"){ST.cm=a[1];ST.off=0}
 else if(a[0]==="off"){ST.off+=+a[1]}
 else if(a[0]==="tod"){ST.off=0;ST.sel=""}
 else if(a[0]==="sel"){ST.sel=a[1];if(ST.cm==="week")ST.cm="day",ST.off=Math.round((+pIso(a[1])-+today())/864e5)}
 tick()}
document.addEventListener("click",function(e){var t=e.target;if(!t||!t.closest)return;
 if(t.closest("[data-glnav]")){e.stopPropagation();e.preventDefault();if(!on){var dbn=nativeBtn("Dashboard");if(dbn)dbn.click()}setOn(true);return}
 if(on&&!busy&&t.closest(".arqNav"))setOn(false)},true);
window.__gl={tick:tick,setOn:setOn};
(function(){var n=0,iv=setInterval(function(){n++;try{var b=nativeBtn("Dashboard")||document.querySelector("[data-gldash]");if(b||n>70){clearInterval(iv);if(b&&b.getAttribute("aria-current")==="page"&&!on&&!busy)setOn(true)}}catch(e){clearInterval(iv)}},100)})();
(function(){function fs(){try{var tg=window.Telegram&&Telegram.WebApp;if(!tg)return;if(tg.ready)tg.ready();if(tg.expand)tg.expand();if(tg.disableVerticalSwipes)tg.disableVerticalSwipes();if(tg.requestFullscreen&&!tg.isFullscreen)tg.requestFullscreen()}catch(e){}}
fs();setTimeout(fs,600);setTimeout(fs,2000);document.addEventListener("click",function f(){fs();document.removeEventListener("click",f,true)},true)})();
setInterval(tick,600);
tick();
})();
(function(){var WK="arq:wx",C={"Europe/Moscow":[55.75,37.62],"Europe/Kaliningrad":[54.71,20.51],"Europe/Samara":[53.2,50.15],"Asia/Yekaterinburg":[56.84,60.6],"Asia/Omsk":[54.99,73.37],"Asia/Novosibirsk":[55.03,82.92],"Asia/Krasnoyarsk":[56.01,92.85],"Asia/Irkutsk":[52.29,104.3],"Asia/Yakutsk":[62.03,129.73],"Asia/Vladivostok":[43.12,131.89],"Europe/Kiev":[50.45,30.52],"Europe/Kyiv":[50.45,30.52],"Europe/Minsk":[53.9,27.57],"Asia/Almaty":[43.24,76.89],"Europe/Berlin":[52.52,13.4],"Europe/London":[51.5,-0.12],"Europe/Paris":[48.85,2.35],"Asia/Tashkent":[41.3,69.24],"Asia/Dubai":[25.2,55.27],"Europe/Istanbul":[41.01,28.98]};
function kind(c,day){if(c==null)return day?"clear":"night";if(c>=95)return"storm";if(c>=71&&c<=77||c===85||c===86)return"snow";if(c>=51&&c<=67||c>=80&&c<=82)return"rain";if(c===45||c===48)return"fog";if(c>=2)return"cloud";if(c===1&&day)return"fair";return day?"clear":"night"}
var cl='<path d="M30 74h60a16 16 0 000-32 22 22 0 00-42-6A17 17 0 0030 74z" fill="#fff" fill-opacity=".92"/>';
var cd='<path d="M30 74h60a16 16 0 000-32 22 22 0 00-42-6A17 17 0 0030 74z" fill="#8d97a3"/>';
var SC={
clear:'<defs><radialGradient id="wxs"><stop offset="0" stop-color="#ffe0bd"/><stop offset="1" stop-color="#b8d9ff" stop-opacity="0"/></radialGradient></defs><circle cx="116" cy="34" r="34" fill="url(#wxs)"/><circle cx="116" cy="34" r="15" fill="#ffc9a3"/>',
fair:'<defs><radialGradient id="wxs"><stop offset="0" stop-color="#ffe0bd"/><stop offset="1" stop-color="#b8d9ff" stop-opacity="0"/></radialGradient></defs><circle cx="122" cy="30" r="32" fill="url(#wxs)"/><circle cx="122" cy="30" r="14" fill="#ffc9a3"/><g transform="translate(34 12) scale(.72)">'+cl+'</g>',
cloud:'<g transform="translate(46 4) scale(.7)" opacity=".7">'+cd+'</g><g transform="translate(26 14)">'+cl+'</g>',
rain:'<g transform="translate(24 -2) scale(.95)">'+cd+'</g><g stroke="#9fc4e8" stroke-width="3" stroke-linecap="round"><path d="M44 78l-4 12M62 78l-4 12M80 78l-4 12M98 78l-4 12"/></g>',
snow:'<g transform="translate(24 -2) scale(.95)">'+cd+'</g><g fill="#fff"><circle cx="42" cy="84" r="3"/><circle cx="62" cy="90" r="3"/><circle cx="82" cy="83" r="3"/><circle cx="100" cy="90" r="3"/></g>',
storm:'<g transform="translate(24 -2) scale(.95)"><path d="M30 74h60a16 16 0 000-32 22 22 0 00-42-6A17 17 0 0030 74z" fill="#5d6673"/></g><path d="M66 70l-9 16h9l-5 14 16-20h-9l6-10z" fill="#ffd54a"/>',
fog:'<g transform="translate(30 4) scale(.85)" opacity=".8">'+cl+'</g><g stroke="#fff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"><path d="M24 82h86M40 92h70"/></g>',
night:'<circle cx="118" cy="34" r="15" fill="#f4efd6"/><circle cx="125" cy="30" r="13" fill="#1d2430"/><g fill="#fff" fill-opacity=".8"><circle cx="80" cy="20" r="1.6"/><circle cx="64" cy="44" r="1.3"/><circle cx="96" cy="60" r="1.4"/><circle cx="140" cy="62" r="1.2"/></g>'};
var SKY={clear:["#a7d3ff","#f0f7ff"],fair:["#a7d3ff","#f0f7ff"],cloud:["#9fb4c8","#d7e0ea"],rain:["#5b6b80","#8795a8"],snow:["#a9b8c9","#e4ebf3"],storm:["#2f3745","#586377"],fog:["#aab4bd","#dde2e7"],night:["#101a2e","#2b3a58"]};
var cur="fair",tp=null,got=0,LB={clear:"Ясно",fair:"Облачно",cloud:"Облачно",rain:"Дождь",snow:"Снег",storm:"Гроза",fog:"Туман",night:"Ясная ночь"};
function html(k,u){u=u||"a";var g=SKY[k];return '<svg viewBox="-50 0 200 100" preserveAspectRatio="xMaxYMid slice"><defs><linearGradient id="wxg'+u+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+g[0]+'"/><stop offset="1" stop-color="'+g[1]+'"/></linearGradient><filter id="wxb'+u+'" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.1"/></filter></defs><rect x="-50" width="200" height="100" fill="url(#wxg'+u+')" opacity=".92"/><g filter="url(#wxb'+u+')">'+SC[k].replace(/wxs/g,"wxs"+u)+'</g></svg>'}
function put(){}
function load(){try{var j=JSON.parse(localStorage.getItem(WK)||"null");if(j&&Date.now()-j.t<1800000){cur=j.k;tp=j.p==null?null:j.p;return}}catch(e){}
 if(got++>0&&got>3)return;var tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}var c=C[tz]||C["Europe/Moscow"];
 try{fetch("https://api.open-meteo.com/v1/forecast?latitude="+c[0]+"&longitude="+c[1]+"&current=weather_code,is_day,temperature_2m").then(function(r){return r.json()}).then(function(d){var k=kind(d.current.weather_code,d.current.is_day===1);cur=k;tp=Math.round(d.current.temperature_2m);try{localStorage.setItem(WK,JSON.stringify({t:Date.now(),k:k,p:tp}))}catch(e){}put()}).catch(function(){})}catch(e){}}
var IC={clear:'<circle cx="12" cy="12" r="4.2" fill="#f2a83b" stroke="none"/><path stroke="#f2a83b" d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"/>',fair:'<circle cx="9" cy="9" r="3.6" fill="#f6a56a" stroke="none"/><path d="M8 19h9a3.5 3.5 0 000-7 5 5 0 00-9.6 1.4A2.8 2.8 0 008 19z" fill="#fff" stroke="none"/>',cloud:'<path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.5 1.5A3.4 3.4 0 007 18z" fill="#fff" stroke="none"/>',rain:'<path d="M7 14h10a4 4 0 000-8 5.5 5.5 0 00-10.5 1.5A3.4 3.4 0 007 14z" fill="#fff" stroke="none"/><path d="M8 17l-1 3M12 17l-1 3M16 17l-1 3" stroke="#6fa8e8"/>',snow:'<path d="M7 14h10a4 4 0 000-8 5.5 5.5 0 00-10.5 1.5A3.4 3.4 0 007 14z" fill="#fff" stroke="none"/><circle cx="8" cy="18.5" r="1.2" fill="#9cc5ee" stroke="none"/><circle cx="12" cy="20" r="1.2" fill="#9cc5ee" stroke="none"/><circle cx="16" cy="18.5" r="1.2" fill="#9cc5ee" stroke="none"/>',storm:'<path d="M7 14h10a4 4 0 000-8 5.5 5.5 0 00-10.5 1.5A3.4 3.4 0 007 14z" fill="#aab4c2" stroke="none"/><path d="M12 13l-3 5h3l-1 4 4-6h-3l1-3z" fill="#ffd54a" stroke="none"/>',fog:'<path d="M5 9h14M3 13h18M6 17h12" stroke="#fff"/>',night:'<path d="M15 4a8 8 0 100 16 8 8 0 01-5-14 8 8 0 015-2z" fill="#f4efd6" stroke="none"/>'};
window.__wxHtml=function(){return html(cur,"g")};
window.__wxChip=function(){var kk=(cur==="night"||cur==="fair")?"clear":cur;return '<svg class="wk-'+kk+'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke-width="2" stroke-linecap="round">'+IC[kk]+'</svg><span>'+(tp==null?LB[cur]:(tp>0?"+":"")+tp+"°C")+'</span>'};
function putG(){var q=document.querySelectorAll(".gl-wx,.gl-wxc"),i,k=cur+"|"+tp,c;for(i=0;i<q.length;i++){c=q[i].classList.contains("gl-wxc");if(q[i].__k!==k||!q[i].firstChild){q[i].__k=k;q[i].innerHTML=c?window.__wxChip():window.__wxHtml()}}}load();setInterval(function(){put();putG()},700);setInterval(load,600000);
})();
(function(){
var css=".arqSportWrap.gl-spn{position:absolute!important;left:-9999px!important;top:0!important;width:700px!important;height:0!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important}"+
".arqTop{background:rgba(255,255,255,.04)!important;border:0!important;border-radius:20px!important;padding:12px 14px!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06)}"+
".arqTop>div:first-child{cursor:pointer;user-select:none}.arqTop>div:first-child{justify-content:flex-start!important;align-items:center!important;gap:10px}.arqTop>div:first-child>b{order:1;font-size:15px!important;font-weight:700}.arqTop>div:first-child>span:last-child{order:2;margin-left:auto}.arqTop>div:first-child:before{content:'';order:0;width:7px;height:7px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg) translateY(-2px);transition:transform .25s;flex:none}"+
".arqTop.wkCol>div:first-child:before{transform:rotate(-45deg)}.arqTop.wkCol>*:not(:first-child){display:none!important}"+
".arqTop b[style*='border-radius:50%']{background:linear-gradient(145deg,#f3d27a,#c9a24a)!important;box-shadow:0 2px 8px rgba(201,162,74,.45)}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}}
document.addEventListener("click",function(e){var h=e.target.closest&&e.target.closest(".arqTop>div:first-child");if(!h)return;var t=h.parentNode;t.classList.toggle("wkCol");ls("arq:topc",t.classList.contains("wkCol")?"1":"0")},true);
var IC={"Задачи":'<path d="M4 6h3M4 12h3M4 18h3M10 6h10M10 12h10M10 18h10"/>',"Календарь":'<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',"Спорт":'<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>'};
setInterval(function(){var t=document.querySelector(".arqTop");if(t&&!t.__i){t.__i=1;if(ls("arq:topc")==="1")t.classList.add("wkCol")}
var bs=document.querySelectorAll("button[data-k]");for(var i=0;i<bs.length;i++){var b=bs[i];if(b.querySelector(".wkTi"))continue;var p=IC[b.getAttribute("data-k")];if(!p)continue;b.__ic=1;b.insertAdjacentHTML("afterbegin",'<svg class="wkTi" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:-2px">'+p+'</svg>')}},500);
})();
(function(){var css=".gl-today>.gl-seg,.gl-today .gl-tdr .gl-lnk{display:none!important}"+
".gl-today{padding-top:0!important}.gl-today .gl-tdh{padding-top:20px;position:relative;z-index:1}.gl-today .gl-tdr{justify-content:flex-start;margin:0 -8px 0 0;padding-top:0}"+
".gl-today .gl-wx{top:0!important;right:0!important;height:96px!important;width:38%!important;border-radius:0 24px 0 0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 35%)!important;mask-image:linear-gradient(90deg,transparent,#000 35%)!important}"+
".gl-today .gl-wxc{margin-top:-6px;font-size:14px!important;padding:6px 14px!important}"+
".gl-today .gl-trs{margin-top:14px}"+
".gl-prg .gl-bub{width:auto;height:auto;border-radius:0;background:none;box-shadow:none;color:var(--ink2);margin-right:8px}.gl-prg .gl-bub .gl-ic{width:15px;height:15px}"+
".gl-prg .gl-h b{font-size:15px;font-weight:700}"+
".gl-spp{position:absolute;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:var(--ink);pointer-events:none}.gl-spp.g{background:var(--muted)}"+
".gl-prt .gl-ring{width:112px;height:112px}.gl-prt{gap:22px}.gl-prt .gl-up{color:var(--ok,#2f7d52);font-weight:700}";
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s)})();
(function(){var css="html body .tkGrid{gap:18px!important}\nhtml body .tkGrid.tkGrid .tkCat.tkCat{position:relative;padding:16px 14px 14px 20px!important;border:0!important;border-radius:24px!important;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.025))!important;box-shadow:0 10px 30px -14px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.08)!important;gap:10px!important}\nhtml body .tkGrid .tkCat::before{content:\"\";position:absolute;left:0;top:14px;bottom:14px;width:4px;border-radius:0 4px 4px 0;background:linear-gradient(180deg,var(--tkac,#86b49e),rgba(134,180,158,.08));pointer-events:none}\nhtml body .tkGrid .tkCat .arqGh{display:none!important}\nhtml body .tkGrid .tkCat>div:first-of-type{padding:0 2px 2px}\nhtml body .tkGrid .tkCat>div:first-of-type b{font-family:Archivo,system-ui,sans-serif;font-size:13.5px!important;font-weight:800!important;letter-spacing:.04em!important;color:var(--ink)!important}\nhtml body .tkGrid .tkCat>div:first-of-type span span{font-weight:700}\nhtml body .tkGrid .tkCat .wkCi{display:inline-flex;width:30px;height:30px;border-radius:10px;align-items:center;justify-content:center;margin-right:2px;flex:none;color:var(--accent-text,#86b49e);background:color-mix(in srgb,#86b49e 18%,transparent)}\nhtml body .tkGrid .tkCat .wkCi svg{width:18px;height:18px}\nhtml body .tkGrid.tkGrid .tkRow.tkRow{border:0!important;border-left:0!important;border-radius:16px!important;padding:10px 12px!important;background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.04))!important;box-shadow:0 4px 12px -6px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.09)!important}\nhtml body .tkGrid .tkRow [data-tkx]>span:first-child{font-weight:500!important;font-size:14px!important;line-height:1.3}\nhtml body .tkGrid .tkRow .arqCk{width:22px!important;height:22px!important;border-radius:7px!important;border-width:1.5px!important}\nhtml body .tkGrid .tkRow .aiT{height:24px!important;min-width:24px;padding:0 8px!important;border:0!important;border-radius:999px!important;background:rgba(255,255,255,.07)!important;box-shadow:0 1px 3px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.08);filter:saturate(.35)!important;font-size:11.5px!important}\nhtml body .tkGrid .tkRow [data-tkx]>span:last-child{gap:6px!important;padding-top:4px!important}\nhtml body .arqMain .arqAn.arqHm{border:0!important;border-radius:26px!important;background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.03))!important;box-shadow:0 14px 40px -18px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.09)!important;padding:26px 24px!important;position:relative;overflow:hidden}\nhtml body .arqAn.arqHm::after{content:\"\";position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;background:radial-gradient(closest-side,rgba(134,180,158,.28),transparent);pointer-events:none}\nhtml body .arqHm .arqHmR svg circle:last-child{stroke:#86b49e!important}\nhtml body .arqHm .arqHmR b{font-weight:600!important}\nhtml body .arqHm .arqHmC{font-size:21px!important;font-weight:800!important;margin-top:6px}\nhtml body .arqHmG{gap:6px!important}\nhtml body .arqHmG i{border-radius:10px!important;aspect-ratio:1.45!important}\nhtml body .arqHmM span{font-size:11px!important}\n\nhtml.lt body .tkGrid.tkGrid .tkCat.tkCat{background:linear-gradient(180deg,rgba(0,0,0,.30),rgba(0,0,0,.22))!important;box-shadow:0 16px 34px -18px rgba(255,255,255,.55),0 0 0 1px rgba(255,255,255,.05)!important}\nhtml.lt body .tkGrid.tkGrid .tkRow.tkRow{background:linear-gradient(180deg,rgba(0,0,0,.28),rgba(0,0,0,.20))!important;box-shadow:0 5px 12px -7px rgba(255,255,255,.6),0 0 0 1px rgba(255,255,255,.04)!important}\nhtml.lt body .tkGrid .tkRow .aiT{background:rgba(0,0,0,.22)!important;box-shadow:0 2px 4px -2px rgba(255,255,255,.5)!important}\nhtml.lt body .arqMain .arqAn.arqHm{background:linear-gradient(180deg,rgba(0,0,0,.30),rgba(0,0,0,.2))!important;box-shadow:0 18px 40px -20px rgba(255,255,255,.55)!important}\nhtml body .tkGrid .tkRow [data-tkx]>span:last-child{gap:4px!important}\nhtml body .tkGrid .tkRow .aiT{padding:0 6px!important;gap:4px!important}\n\nhtml body .tkGrid.tkGrid.tkBoard{border:0!important;background:none!important;box-shadow:none!important}\nhtml body .tkGrid .tkRow .aiT{border:0!important}\nhtml.lt body .arqHm .arqHmG i{filter:brightness(.78) saturate(.9)!important}html.lt body .arqHm .arqHmG i[style*=\"outline\"]{filter:none!important}\nhtml.lt body .arqHmG i[style*=\"outline\"]{opacity:1}\n";var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
var P={"фокус":'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',"работа":'<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18"/>',"учёба":'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5"/>',"спорт":'<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',"общее":'<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>'};
var D='<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>';
setInterval(function(){var c=document.querySelectorAll(".tkCat");for(var i=0;i<c.length;i++){var h=c[i].querySelector("div>span>b");if(!h||h.parentNode.querySelector(".wkCi"))continue;var n=(h.textContent||"").trim().toLowerCase();h.insertAdjacentHTML("beforebegin",'<span class="wkCi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||D)+'</svg></span>')}},600);})();
(function(){var css="\n.gl-today .gl-wx{position:absolute!important;top:12px!important;right:12px!important;left:auto!important;width:44%!important;height:96px!important;border-radius:24px!important;overflow:hidden;z-index:0!important;-webkit-mask-image:none!important;mask-image:none!important;opacity:1!important;filter:none!important;background:radial-gradient(ellipse 70px 30px at 18% 80%,rgba(255,255,255,.85),transparent 72%),radial-gradient(ellipse 90px 36px at 42% 66%,rgba(255,255,255,.7),transparent 72%),radial-gradient(ellipse 60px 26px at 72% 88%,rgba(255,255,255,.6),transparent 72%),radial-gradient(ellipse 80px 30px at 90% 60%,rgba(255,255,255,.45),transparent 72%),linear-gradient(180deg,#c9ced6,#dde0e6)!important}\n.gl-today .gl-wx *{display:none!important}\nhtml:not(.lt) .gl-today .gl-wx{opacity:.5!important;background:radial-gradient(ellipse 70px 30px at 18% 80%,rgba(255,255,255,.5),transparent 72%),radial-gradient(ellipse 90px 36px at 42% 66%,rgba(255,255,255,.4),transparent 72%),radial-gradient(ellipse 60px 26px at 72% 88%,rgba(255,255,255,.35),transparent 72%),linear-gradient(180deg,#46505d,#323944)!important}\nhtml.lt .gl-today .gl-wx{filter:invert(1) hue-rotate(180deg)!important}\n.gl-today .gl-wxc{position:absolute!important;top:34px!important;right:34px!important;margin:0!important;z-index:2;padding:8px 18px!important;font-size:16px!important;font-weight:600!important;gap:10px!important;border-radius:999px!important;background:rgba(255,255,255,.5)!important;box-shadow:none!important;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);color:#1d2530!important}\nhtml:not(.lt) .gl-today .gl-wxc{background:rgba(255,255,255,.14)!important;color:#fff!important}\nhtml.lt .gl-today .gl-wxc{filter:invert(1) hue-rotate(180deg)!important}\n\n.gl-wxc svg{width:22px;height:22px;color:#7c8696}.gl-wxc svg.wk-clear,.gl-wxc svg.wk-fair{color:#f0a52b;fill:rgba(240,165,43,.25)}\n.gl-tr.d .gl-tt span{text-decoration:none!important;color:var(--ink)!important}\n.gl-trs .gl-ck{width:24px;height:24px;border-radius:7px}\n.gl-trs .gl-ck.on{background:#2d6a4a!important;border-color:#2d6a4a!important}\nhtml.lt .gl-trs .gl-ck.on{filter:invert(1) hue-rotate(180deg)}\nhtml .gl-trs .gl-ck:not(.on){background:#0c0d10!important;border:1.5px solid rgba(255,255,255,.5)!important;box-shadow:0 4px 10px -3px rgba(255,255,255,.3)}\n.gl-tr{padding:13px 6px!important}.gl-tr+.gl-tr{border-top-color:rgba(255,255,255,.08)!important}\n.gl-tt small{font-size:12.5px;color:var(--muted)}\n.gl-dots{font-style:normal;letter-spacing:2px;color:var(--muted);font-size:15px}\n.gl-pp{font-weight:600;padding:7px 16px}\nhtml:not(.lt) .gl-pp.p1{background:rgba(240,170,90,.16)!important;color:#e9b57a!important}\nhtml.lt .gl-pp.p1{filter:invert(1) hue-rotate(180deg);background:#f6e7d3!important;color:#b9772f!important}\n.gl-all a{font-size:12.5px;text-decoration:underline}\n";var s=document.createElement("style");s.textContent=css;document.head.appendChild(s)})();
(function(){var css="\n.gl-tr{padding:9px 4px!important;gap:16px!important}\n.gl-tr .gl-tt span{font-weight:500!important;font-size:14.5px}\n.gl-tr .gl-tt{gap:1px}\n.gl-today .gl-wx{top:0!important;right:0!important;width:50%!important;height:104px!important;border-radius:0 24px 0 0!important;-webkit-mask-image:linear-gradient(90deg,transparent,#000 28%)!important;mask-image:linear-gradient(90deg,transparent,#000 28%)!important}\n.gl-today .gl-wxc{top:30px!important;right:26px!important;padding:7px 16px!important;font-size:15px!important}\n.gl-prg .gl-sp2{margin:6px 8px 4px!important;border-radius:14px;overflow:hidden;height:110px}\n.gl-prt .gl-ring{width:106px;height:106px}\n";var s=document.createElement("style");s.textContent=css;document.head.appendChild(s)})();
(function(){var css="\nhtml:not(.lt) body .tkGrid .tkRow button.arqCk[style*=\"transparent\"]{border:1.5px solid rgba(255,255,255,.55)!important;background:rgba(255,255,255,.06)!important}\nhtml:not(.lt) body .arqTop button.arqCk[style*=\"transparent\"]{border:1.5px solid rgba(255,255,255,.55)!important}\n.gl-trs .gl-ck.on{color:#fff!important}.gl-trs .gl-ck.on svg{stroke:#fff}\nhtml.lt .gl-trs .gl-ck.on{color:#fff!important}\n";var s=document.createElement("style");s.textContent=css;document.head.appendChild(s)})();
window.__glWave=function(el,fn){var R=document.documentElement;try{var r=el.getBoundingClientRect();R.style.setProperty("--wx",(r.left+r.width/2)+"px");R.style.setProperty("--wy",(r.top+r.height/2)+"px")}catch(e){}
 if(!document.startViewTransition||(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)){fn();return}
 R.classList.add("arqVT");var t=document.startViewTransition(function(){fn()});var done=function(){R.classList.remove("arqVT")};t.finished.then(done,done)};
(function(){var s=document.createElement("style");s.textContent="\n@keyframes arqWave{from{-webkit-mask-size:0 0;mask-size:0 0;-webkit-mask-position:var(--wx,50%) var(--wy,50%);mask-position:var(--wx,50%) var(--wy,50%)}to{-webkit-mask-size:4400px 4400px;mask-size:4400px 4400px;-webkit-mask-position:calc(var(--wx,50%) - 2200px) calc(var(--wy,50%) - 2200px);mask-position:calc(var(--wx,50%) - 2200px) calc(var(--wy,50%) - 2200px)}}\n::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}\n::view-transition-new(root){animation:arqWave 1.1s cubic-bezier(.45,.05,.25,1) both;-webkit-mask-image:radial-gradient(circle closest-side,#000 62%,transparent 100%);mask-image:radial-gradient(circle closest-side,#000 62%,transparent 100%);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}\nhtml.arqVT,html.arqVT *{transition:none!important}\nhtml{transition:filter .7s ease}\n@media(min-width:1000px){#thTg,#arqPal{display:none!important}}\n.pg:has(.gl-page) .gl-page{width:100%!important;max-width:none!important;margin:0!important;padding-left:0!important;padding-right:0!important;box-sizing:border-box}.pg:has(.gl-page),.pg:has(.wkDay){max-width:1500px!important;padding-left:36px!important;padding-right:36px!important}\n";document.head.appendChild(s)})();
(function(){var s=document.createElement("style");s.textContent="\nhtml .gl-today .gl-wxc{background:rgba(255,255,255,.88)!important;color:#1d2530!important;box-shadow:0 6px 18px -10px rgba(0,0,0,.35)!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}\nhtml:not(.lt) .gl-today .gl-wxc{background:rgba(255,255,255,.16)!important;color:#fff!important}\nhtml .gl-today .gl-wxc svg{width:20px;height:20px}\nhtml .gl-today .gl-wx{background:radial-gradient(ellipse 70px 30px at 18% 80%,rgba(255,255,255,.9),transparent 72%),radial-gradient(ellipse 90px 36px at 42% 66%,rgba(255,255,255,.75),transparent 72%),radial-gradient(ellipse 60px 26px at 72% 88%,rgba(255,255,255,.65),transparent 72%),linear-gradient(180deg,#d3d7de,#e6e8ed)!important}\nhtml:not(.lt) .gl-today .gl-wx{background:radial-gradient(ellipse 70px 30px at 18% 80%,rgba(255,255,255,.5),transparent 72%),radial-gradient(ellipse 90px 36px at 42% 66%,rgba(255,255,255,.4),transparent 72%),linear-gradient(180deg,#46505d,#323944)!important}\nhtml .gl-today .gl-all{border-top:0!important;padding-top:8px!important}\nhtml .gl-today .gl-all a{font-weight:500!important;font-size:12.5px!important;color:var(--ink2)!important;opacity:.9}\n";document.head.appendChild(s);window.__glLate=s})();
(function(){var s=document.createElement("style");s.textContent="html{--glcl:url(data:image/jpeg;base64,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)}\nhtml .gl-today .gl-wx{background:var(--glcl) center/cover no-repeat!important}\nhtml:not(.lt) .gl-today .gl-wx{background:linear-gradient(rgba(20,24,30,.45),rgba(20,24,30,.45)),var(--glcl) center/cover no-repeat!important}\n";document.head.appendChild(s)})();
(function(){var s=document.createElement("style");s.textContent=".gl-sbf button.gl-sbc{position:relative;display:flex!important;align-items:flex-end;justify-content:space-between;gap:10px;height:158px;padding:16px 14px 16px 18px!important;border:0!important;border-radius:20px!important;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.35)),url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 170' preserveAspectRatio='xMidYMid slice'%3E%3Cdefs%3E%3ClinearGradient id='s' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%234a5766'/%3E%3Cstop offset='.55' stop-color='%236b7787'/%3E%3Cstop offset='1' stop-color='%232a313b'/%3E%3C/linearGradient%3E%3ClinearGradient id='r' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%233a424d'/%3E%3Cstop offset='.5' stop-color='%2359636f'/%3E%3Cstop offset='1' stop-color='%23262c35'/%3E%3C/linearGradient%3E%3ClinearGradient id='d' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231c222a' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230d1014'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='170' fill='url(%23s)'/%3E%3Cpath d='M-5 92L22 70L38 58L50 64L70 40L84 30L100 14L112 26L124 22L138 44L150 54L170 48L205 70V170H-5Z' fill='url(%23r)'/%3E%3Cpath d='M100 14L90 34L94 31L97 40L102 33L106 44L110 36L118 46L112 26Z' fill='%23f1f4f8'/%3E%3Cpath d='M100 14L112 26L118 46L108 40L110 52L102 44L98 58L93 42L90 34Z' fill='%23c9d1db' opacity='.55'/%3E%3Cpath d='M70 40L62 52L67 50L70 58L76 50L80 56L86 38L84 30Z' fill='%23eef1f5' opacity='.95'/%3E%3Cpath d='M38 58L32 66L37 64L40 72L46 64L52 66L50 64Z' fill='%23e6ebf1' opacity='.9'/%3E%3Cpath d='M138 44L130 54L136 52L140 60L146 52L152 58L150 54Z' fill='%23dfe5ec' opacity='.85'/%3E%3Cpath d='M0 110L40 92L80 104L120 86L160 100L200 88V170H0Z' fill='%23181d24' opacity='.85'/%3E%3Crect y='60' width='200' height='110' fill='url(%23d)'/%3E%3C/svg%3E\") center/cover no-repeat!important;color:#fff!important;text-align:left;box-shadow:0 14px 30px -16px rgba(0,0,0,.6)!important;overflow:hidden;transition:transform .25s ease,box-shadow .25s ease}\n.gl-sbf button.gl-sbc:hover{transform:translateY(-2px);box-shadow:0 18px 34px -16px rgba(0,0,0,.7)!important}\n.gl-sbf button.gl-sbc span{font-size:18px;font-weight:700;line-height:1.2;letter-spacing:-.01em;max-width:128px}\n.gl-sbf button.gl-sbc i{flex:none;width:38px;height:38px;border-radius:50%;background:#fff;color:#111;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px -4px rgba(0,0,0,.5)}\n";document.head.appendChild(s)})();
