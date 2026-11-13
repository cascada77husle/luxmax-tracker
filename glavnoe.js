/* ARQON: страница «Главное» v8 (родные виджеты) */
(function(){
"use strict";
if(window.__glInit)return;window.__glInit=1;
var KEY="arq:gl:ex",LAST="arq:gl:last",SPK="arq:gl:sp";
var on=false,sigPrev="",page=null,busy=false,hold=0;
var ST={tf:"all",pr:"week",acc:-1,lf:0,cm:"week",off:0,sel:""},HX={};
var DAYS=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
var DFULL=["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
var MON=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
var MONG=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
var BC=["#86B49E","#7FA6B8","#A78BDA","#E0A458","#D98BA0","#9CC27A","#7FB5D6","#B79CE0"];
var CT={tasks:"#86B49E",cal:"#7FA6B8",habits:"#A78BDA",sport:"#E0A458",fin:"#6FB7A5",dash:"#B79CE0"};
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
".gl-hd p{margin:2px 0 0;font-size:12px;color:var(--muted)}",
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
"[data-glon] .pg>*:not(:first-child):not(.gl-page):not(.arqAn){display:none!important}","[data-glon] .pg>.arqAn{display:flex!important}","[data-gldash]{display:none!important}","[data-glon] .pg>.arqAn{min-width:0;max-width:100%;box-sizing:border-box}","[data-glon] .arqAn>div{min-width:0;max-width:100%;overflow-x:auto;scrollbar-width:none}",
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
".gl-bd{animation:glFade .25s ease}.gl-cld>.gl-bd{display:none}.gl-cld>.gl-h{margin-bottom:0}",
".gl-chv{width:7px;height:7px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg);transition:transform .25s;margin:0 4px 3px 2px;flex:none}.gl-cld>.gl-h .gl-chv,.gl-cld>.gl-sec .gl-chv{transform:rotate(-45deg);margin-bottom:0}",
".gl-sec{margin-top:12px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:14px}.gl-cld>.gl-sec{margin-bottom:0}",
".gl-q{gap:8px}.gl-qb{padding:7px 10px;border-radius:16px;gap:8px}.gl-qb .ic{width:30px;height:30px;border-radius:10px}.gl-qb b{font-size:13px}.gl-qb small{font-size:10px}",
".gl-top{gap:10px}.gl-top .card{padding:9px 14px!important}.gl-top .gl-l{margin-bottom:3px;font-size:11px}.gl-big{font-size:26px}.gl-big small{font-size:14px}.gl-ring{width:54px;height:54px}.gl-ring span{font-size:14px}.gl-top .gl-bar{margin-top:6px}.gl-top .gl-sub{font-size:11px}.gl-wk{margin-top:6px}",
".gl-ls{gap:4px;margin-top:8px}.gl-page .tkRow{padding:4px 10px!important}.gl-page .tkRow .aiT:nth-child(n+2){display:none}",
".gl-seg{padding:3px}.gl-seg button{padding:4px 10px}",
".gl-fbig{font-size:34px}.gl-fa{margin-top:8px;gap:6px}.gl-ft{padding:6px 10px;border-radius:14px}.gl-f3{margin-top:8px;gap:6px}.gl-f3 div{padding:7px 10px}.gl-f3 b{font-size:15px}",
".gl-sd{margin:8px 0}.gl-sd div{padding:5px 0}.gl-tl{margin-top:8px}.gl-tl div{padding:6px 4px}.gl-tl b{margin-top:2px}.gl-pr{gap:10px}.gl-sp{height:60px;min-width:100px}",
".gl-md{max-height:34px}.gl-wd{padding:4px 0}.gl-mg,.gl-wg{margin-top:8px}.gl-kv{margin-top:8px}",
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
var CLK="arq:gl:cl",DEFCL={"Прогресс":1,dyn:1};
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
function finCard(m){var fi=m.fin||{accs:[],inc:0,exp:0,free:0},ac=fi.accs||[],h='<div class="card gl-fin"><div class="gl-h"><b>'+ICON.fin+'Мой счёт</b><button type="button" class="gl-lnk" data-a="go:eco">Экономика '+ICON.arrow+'</button></div>';
 if(!ac.length&&!fi.inc&&!fi.exp)return h+'<div class="gl-em">Счетов пока нет<br><button type="button" class="gl-pill" data-a="go:eco">Добавить счёт</button></div></div>';
 var sel=ST.acc>=ac.length?-1:ST.acc,tot=0;ac.forEach(function(a){tot+=a.bal});var cur=sel>=0?ac[sel]:null;
 h+='<div class="gl-fbig">'+rub(cur?cur.bal:tot)+'</div><div class="gl-sub" style="margin-top:6px">'+(cur?"Деньги на счёте «"+esc(cur.n)+"»":"Деньги на всех счетах")+'</div>';
 if(ac.length)h+='<div class="gl-fa"><button type="button" class="gl-ft'+(sel<0?" on":"")+'" data-a="ac:-1"><small>Все счета</small><b>'+rub(tot)+'</b></button>'+ac.map(function(a,k){return '<button type="button" class="gl-ft'+(k===sel?" on":"")+'" data-a="ac:'+k+'"><small>'+esc(a.n)+'</small><b>'+rub(a.bal)+'</b></button>'}).join("")+'</div>';
 h+='<div class="gl-f3"><div><small>Доход</small><b class="ok">'+rub(fi.inc)+'</b></div><div><small>Расходы</small><b>'+rub(fi.exp)+'</b></div><div><small>Свободно</small><b>'+rub(fi.free)+'</b></div></div>';
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
 return '<div class="gl-ring" style="'+(sz?'width:'+sz+'px;height:'+sz+'px':'')+'"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="var(--line2)" stroke-width="9"/><circle cx="50" cy="50" r="44" fill="none" stroke="var(--accent)" stroke-width="9" stroke-linecap="'+(v>0?'round':'butt')+'" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'" style="transition:stroke-dashoffset .6s cubic-bezier(.22,.8,.3,1)"/></svg><span>'+v+'%</span></div>'}
function spark(a){if(!a.length)return '';var w=200,h=80,mx=Math.max.apply(null,a.concat([1])),n=Math.max(1,a.length-1),pts=a.map(function(y,i){return (i*(w/n)).toFixed(1)+","+(h-6-(y/mx)*(h-14)).toFixed(1)}).join(" ");
 return '<svg viewBox="0 0 200 80" preserveAspectRatio="none"><defs><linearGradient id="glg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs><polygon points="0,80 '+pts+' '+w+',80" fill="url(#glg)"/><polyline points="'+pts+'" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'}
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
 h+='<div class="card"><div class="gl-h"><b>'+ICON.cal+'Календарь</b><button type="button" class="gl-lnk" data-a="go:cal">Всё расписание '+ICON.arrow+'</button></div>';
 h+='<div style="display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap">'+seg([["month","Месяц"],["week","Неделя"],["day","День"]],ST.cm,"cm")+'<div style="display:flex;gap:6px;align-items:center"><button type="button" class="gl-ib" data-a="off:-1" aria-label="Назад">'+ICON.left+'</button><button type="button" class="gl-pill" data-a="tod">Сегодня</button><button type="button" class="gl-ib" data-a="off:1" aria-label="Вперёд">'+ICON.arrow+'</button></div></div>';
 h+='<div class="gl-sub" style="margin-top:12px;font-size:13px;color:var(--ink2);font-weight:600">'+label+'</div>';
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
 var evToday=m.evOn(t).length,sp=m.sport,spn=sp.sets?sp.sets[0]+" из "+sp.sets[1]:"";
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
 var th='<div class="card"><div class="gl-h"><b>'+ICON.tasks+'Задачи на сегодня</b><button type="button" class="gl-lnk" data-a="go:tasks">'+dl+' из '+da+' '+ICON.arrow+'</button></div>'+seg([["all","Все"],["todo","Осталось"],["done","Готово"]],ST.tf,"tf");
 if(shown.length)th+='<div class="gl-ls">'+shown.slice(0,5).map(function(r,ri){return trow(r,T.indexOf(r))}).join("")+'</div>'+(shown.length>5?'<div class="gl-more" style="margin-top:8px">и ещё '+(shown.length-5)+' · <a data-a="go:tasks" style="cursor:pointer;text-decoration:underline">все задачи</a></div>':'');
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
 var ph='<div class="card"><div class="gl-h"><b>'+ICON.bars+'Прогресс</b>'+seg([["week","Неделя"],["month","Месяц"],["year","Год"]],ST.pr,"pr")+'</div><div class="gl-pr">'+ring(P.v,92)+'<div><div class="gl-sub">Общий прогресс<br>за '+({week:"неделю",month:"месяц",year:"год"})[ST.pr]+'</div>'+(ex?'<div class="gl-up">+'+P.d+'%</div>':'')+'</div><div class="gl-sp">'+spark(P.s)+'</div></div>';
 if(m.tiles)ph+='<div class="gl-tl">'+m.tiles.map(function(x){return '<div class="gl-lk" data-a="go:'+(x[2]==="fin"?"eco":x[2]==="apple"||x[2]==="book"?"tasks":x[2])+'">'+ICON[x[2]]+'<b>'+x[1]+'%</b><span class="gl-nt">'+x[0]+'</span></div>'}).join("")+'</div>';
 var PRG=ph+'</div>';
 h.push(TOP);h.push('<div class="gl-cols3"><div class="gl-col">'+TSK+PRG+'</div><div class="gl-col">'+CAL+FH+'</div><div class="gl-col">'+SPT+'</div></div>');
 h.push(HB);
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
 if(on&&!busy){var bs=n.querySelectorAll("button");for(var i=0;i<bs.length;i++){var x=bs[i];if(x===b)continue;var c=x.getAttribute("aria-current");if(c&&c!=="false"){x.__glc=c;x.setAttribute("aria-current","false")}}b.setAttribute("aria-current","page")}}
function tick(){try{
 ensureNav();extras();
 var r=rowEl();if(r&&r.parentElement){var sp0=readSport(tx(r.parentElement));if(sp0.sets||sp0.food||sp0.plan){var o=spData();if(sp0.sets)o.sets=sp0.sets;if(sp0.food)o.food=sp0.food;if(sp0.plan)o.plan=sp0.plan;var j=JSON.stringify(o);if(j!==window.__glSpJ){window.__glSpJ=j;ls(SPK,j)}}}
 if(!on)return;
 if(Date.now()<hold)return;
 var nv=navEl(),ao=nv&&nv.closest(".arqNav"),root=ao&&ao.parentElement;if(!root)return;
 if(!page){page=document.createElement("div");page.className="gl-page";page.addEventListener("click",onClick);page.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.closest&&e.target.closest(".gl-wi")){var b=page.querySelector(".gl-wi button");if(b)b.click()}})}
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
(function(){function fs(){try{var tg=window.Telegram&&Telegram.WebApp;if(!tg)return;if(tg.ready)tg.ready();if(tg.expand)tg.expand();if(tg.disableVerticalSwipes)tg.disableVerticalSwipes();if(tg.requestFullscreen&&!tg.isFullscreen)tg.requestFullscreen()}catch(e){}}
fs();setTimeout(fs,600);setTimeout(fs,2000);document.addEventListener("click",function f(){fs();document.removeEventListener("click",f,true)},true)})();
setInterval(tick,600);
tick();
})();
