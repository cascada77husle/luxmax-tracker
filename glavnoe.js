/* ARQON: страница «Главное» (кнопка в левой панели) v2 */
(function(){
"use strict";
if(window.__glInit)return;window.__glInit=1;
var KEY="arq:gl:ex",LAST="arq:gl:last";
var on=false,sigPrev="",page=null;
var ST={tt:"today",pr:"week",day:-1,wk:0},HX={};
var DAYS=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
var MON=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}return null}
var css=".gl-page{max-width:1280px;margin:0 auto;padding:0 20px 96px;display:flex;flex-direction:column;gap:12px;color:var(--ink);font-family:inherit}"
+".gl-page *{box-sizing:border-box}"
+".gl-hd{position:relative;background:transparent;padding:14px 0 10px;display:flex;align-items:center;gap:12px;justify-content:space-between}"
+".gl-hd h2{margin:0;font-family:Archivo,system-ui,sans-serif;font-size:28px;font-weight:700;letter-spacing:-.02em}"
+".gl-hd p{margin:2px 0 0;font-size:12px;color:var(--muted)}"
+".gl-sw{display:flex;align-items:center;gap:8px;border:1px solid color-mix(in srgb,var(--ink) 12%,transparent);background:color-mix(in srgb,var(--ink) 4%,transparent);color:var(--ink);border-radius:999px;padding:6px 8px 6px 14px;font-size:12px;font-weight:700;cursor:pointer;flex-shrink:0}"
+".gl-sw i{position:relative;width:38px;height:22px;border-radius:999px;background:var(--line2);transition:background .2s}"
+".gl-sw i:after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:var(--muted);transition:transform .22s,background .2s}"
+".gl-sw[aria-checked=true] i{background:var(--accent)}"
+".gl-sw[aria-checked=true] i:after{transform:translateX(16px);background:var(--on-accent)}"
+".gl-q{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}"
+".gl-q::-webkit-scrollbar{display:none}"
+".gl-q button{flex:none;display:flex;align-items:center;gap:7px;border:1px solid color-mix(in srgb,var(--ink) 12%,transparent);background:color-mix(in srgb,var(--ink) 4%,transparent);color:var(--ink);border-radius:999px;padding:10px 16px;font-size:12px;font-weight:700;cursor:pointer}"
+".gl-ic{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}"
+".gl-top{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}"
+".gl-cols{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start}"
+".gl-col{display:flex;flex-direction:column;gap:12px;min-width:0}"
+"@media(max-width:860px){.gl-top{grid-template-columns:repeat(2,1fr)}.gl-cols{grid-template-columns:1fr}.gl-hd h2{font-size:24px}}"
+".gl-c{background:linear-gradient(165deg,color-mix(in srgb,var(--card) 96%,#fff) 0%,color-mix(in srgb,var(--card) 94%,#000) 70%);border:1px solid color-mix(in srgb,var(--ink) 12%,transparent);border-radius:28px;padding:18px 20px;min-width:0;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),var(--shadow),0 2px 6px rgba(0,0,0,.25)}"
+".gl-c.gl-lk{cursor:pointer;transition:transform .18s,border-color .18s}"
+".gl-c.gl-lk:hover{border-color:var(--accent-line)}"
+".gl-c.gl-lk:active{transform:scale(.985)}"
+".gl-l{font-size:12px;font-weight:500;color:var(--muted);margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}"
+".gl-l .gl-ic{color:var(--muted);width:22px;height:22px}"
+".gl-big{font-family:inherit;font-size:40px;font-weight:300;letter-spacing:-.02em;line-height:1.05}"
+".gl-big small{font-size:20px;font-weight:600;color:var(--ink2)}"
+".gl-row{display:flex;align-items:center;gap:12px}"
+".gl-sub{font-size:12px;color:var(--muted);line-height:1.35}"
+".gl-up{color:var(--ok);font-weight:700;font-size:12px;margin-top:3px}"
+".gl-bar{height:6px;border-radius:99px;background:var(--line2);overflow:hidden;margin-top:14px}"
+".gl-bar b{display:block;height:100%;border-radius:99px;background:var(--accent)}"
+".gl-bar.w b{background:var(--warn)}"
+".gl-wk{display:flex;gap:4px;margin-top:16px}"
+".gl-wk b{flex:1;height:5px;border-radius:99px;background:var(--line2)}"
+".gl-wk b.on{background:var(--muted)}"
+".gl-wk b.cur{background:var(--ink)}"
+".gl-ring{position:relative;width:84px;height:84px;flex:none}"
+".gl-ring svg{width:100%;height:100%;transform:rotate(-90deg)}"
+".gl-ring span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Archivo,system-ui,sans-serif;font-weight:700;font-size:21px}"
+".gl-h{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px}"
+".gl-h b{display:flex;align-items:center;gap:9px;font-size:17px}"
+".gl-h b .gl-ic{width:22px;height:22px;color:var(--accent)}"
+".gl-lnk{border:0;background:transparent;color:var(--ink2);font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;padding:4px}"
+".gl-seg{display:flex;gap:4px;padding:4px;border:1px solid color-mix(in srgb,var(--ink) 12%,transparent);border-radius:999px;background:color-mix(in srgb,var(--ink) 4%,transparent);margin-bottom:10px}"
+".gl-seg button{flex:1;border:0;background:transparent;color:var(--muted);border-radius:999px;padding:9px 8px;font-size:12px;font-weight:700;cursor:pointer}"
+".gl-seg button.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}"
+".gl-ls{display:flex;flex-direction:column}"
+".gl-t{display:flex;align-items:center;gap:10px;padding:11px 0;border-top:1px solid var(--line);font-size:13px;cursor:pointer}"
+".gl-t:first-child{border-top:0}"
+".gl-t i{width:20px;height:20px;border-radius:50%;border:1.6px solid var(--line2);flex:none;display:flex;align-items:center;justify-content:center;color:var(--on-accent)}"
+".gl-t i.d{background:var(--accent);border-color:var(--accent)}"
+".gl-t i svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}"
+".gl-t .gl-ic{color:var(--muted)}"
+".gl-t span.n{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"
+".gl-t.dn span.n{text-decoration:line-through;color:var(--muted)}"
+".gl-t em{font-style:normal;font-size:11px;font-weight:700;border-radius:99px;padding:3px 9px;flex:none;border:1px solid var(--line2);color:var(--muted)}"
+".gl-t em.h{color:var(--bad);border-color:var(--bad-line);background:var(--bad-soft)}"
+".gl-t em.m{color:var(--warn);border-color:var(--warn-line);background:var(--warn-soft)}"
+".gl-t em.l{color:var(--ok);border-color:var(--ok-line);background:var(--ok-soft)}"
+".gl-t s{text-decoration:none;font-size:11px;color:var(--muted);flex:none;display:flex;align-items:center;gap:4px;min-width:62px}"
+".gl-t s .gl-ic{width:13px;height:13px}"
+"@media(max-width:520px){.gl-t s{display:none}}"
+".gl-em{padding:20px 8px;text-align:center;color:var(--muted);font-size:13px}"
+".gl-em button{margin-top:10px;border:1px solid var(--line2);background:var(--soft);color:var(--ink);border-radius:12px;padding:9px 14px;font-weight:700;font-size:12px;cursor:pointer}"
+".gl-cal{display:flex;align-items:center;gap:6px}"
+".gl-cal button{border:0;background:transparent;color:var(--ink2);cursor:pointer;font-size:12px;font-weight:700;padding:4px 6px;display:flex;align-items:center}"
+".gl-days{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:12px}"
+".gl-days button{border:1px solid var(--line);background:var(--soft);border-radius:14px;padding:9px 0;cursor:pointer;font-size:11px;font-weight:600;display:flex;flex-direction:column;gap:4px;align-items:center;color:var(--muted)}"
+".gl-days button b{font-size:17px;color:var(--ink)}"
+".gl-days button.on{background:var(--ink);border-color:var(--ink)}"
+".gl-days button.on,.gl-days button.on b{color:var(--bg)}"
+".gl-ev{display:flex;align-items:center;gap:10px;border-radius:14px;padding:13px 14px;margin-bottom:8px;border-left:3px solid var(--ok);background:var(--ok-soft);font-size:14px;font-weight:600}"
+".gl-ev small{display:block;color:var(--muted);font-size:12px;font-weight:500;margin-top:2px}"
+".gl-ev .gl-ic{width:20px;height:20px;color:var(--ink2)}"
+".gl-ev.b{border-color:var(--cat-blue);background:rgba(143,163,168,.14)}"
+".gl-ev.v{border-color:var(--cat-violet);background:var(--cat-violet-soft)}"
+".gl-add{width:100%;display:flex;align-items:center;gap:8px;border:1px dashed var(--line2);background:transparent;color:var(--muted);border-radius:14px;padding:12px 14px;font-size:13px;cursor:pointer}"
+".gl-nh{display:flex;gap:8px;margin:2px 0 12px}"
+".gl-nh input{flex:1;min-width:0;border:1px solid var(--line2);background:var(--soft);color:var(--ink);border-radius:12px;padding:10px 12px;font-size:13px;outline:0}"
+".gl-nh button{width:40px;border:0;border-radius:50%;background:var(--ink);color:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none}"
+".gl-hb{width:100%;border-collapse:collapse;font-size:12px}"
+".gl-hb th{font-weight:600;color:var(--muted);padding:0 0 6px;font-size:11px;line-height:1.2}"
+".gl-hb td{padding:4px 2px;text-align:center}"
+".gl-hb td.nm{text-align:left;font-size:13px;padding-right:8px;white-space:nowrap}"
+".gl-hb td.nm span{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:8px}"
+".gl-ck{width:26px;height:26px;border-radius:50%;border:1.6px solid var(--line2);background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;color:var(--on-accent)}"
+".gl-ck.d{background:var(--accent);border-color:var(--accent)}"
+".gl-ck.p{background:var(--warn-soft);border-color:var(--warn-line)}"
+".gl-ck.f{opacity:.35;cursor:default}"
+".gl-ck svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}"
+".gl-pr{display:flex;gap:16px;align-items:center;flex-wrap:wrap}"
+".gl-sp{flex:1;min-width:160px;height:96px}"
+".gl-sp svg{width:100%;height:100%}"
+".gl-tl{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:14px}"
+".gl-tl div{border:1px solid var(--line);background:var(--soft);border-radius:14px;padding:10px 4px;text-align:center;font-size:11px;color:var(--muted);display:flex;flex-direction:column;align-items:center;gap:5px}"
+".gl-tl b{color:var(--ink);font-size:14px}"
+".gl-nt{font-size:11px;color:var(--muted);text-align:center}"
+"[data-glh=\"1\"]{display:none!important}";
function ic(p){return '<svg class="gl-ic" viewBox="0 0 24 24">'+p+'</svg>'}
var ICON={
 tasks:ic('<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/>'),
 cal:ic('<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/>'),
 habits:ic('<circle cx="12" cy="12" r="8"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/>'),
 sport:ic('<path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/>'),
 dash:ic('<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>'),
 eco:ic('<path d="M4 8a3 3 0 013-3h10a2 2 0 012 2v2H7a3 3 0 00-3 3z"/><path d="M4 8v9a3 3 0 003 3h12a1 1 0 001-1v-8a1 1 0 00-1-1H7"/><circle cx="16" cy="14.5" r="1"/>'),
 flame:'<svg class="gl-ic" style="width:24px;height:24px;color:var(--warn)" viewBox="0 0 24 24"><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2 0-3-.5-5 1-8z"/></svg>',
 arrow:'<svg class="gl-ic" style="width:14px;height:14px" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
 left:'<svg class="gl-ic" style="width:14px;height:14px" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
 bars:ic('<path d="M6 20V11M12 20V5M18 20v-6"/>'),
 clock:ic('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),
 plus:ic('<path d="M12 5v14M5 12h14"/>'),
 book:ic('<path d="M5 5a2 2 0 012-2h12v16H7a2 2 0 00-2 2z"/><path d="M5 19V5"/>'),
 wallet:ic('<path d="M4 8a3 3 0 013-3h10a2 2 0 012 2v2H7a3 3 0 00-3 3z"/><path d="M4 8v9a3 3 0 003 3h12a1 1 0 001-1v-8a1 1 0 00-1-1H7"/>'),
 flag:ic('<path d="M6 21V4M6 5h11l-2 4 2 4H6"/>'),
 lotus:ic('<path d="M12 5c2 2 3 4 3 6s-1 4-3 5c-2-1-3-3-3-5s1-4 3-6zM4 11c3 0 5 2 6 5M20 11c-3 0-5 2-6 5"/>'),
 apple:ic('<path d="M12 8c-3-2-7 0-6 5 .7 3.5 3 6 6 5 3 1 5.3-1.5 6-5 1-5-3-7-6-5zM12 8c0-2 1-3 3-4"/>'),
 chk:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
 home:'<path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z"/>'
};
var TI={"Прочитать 30 страниц книги":"book","Тренировка: грудь и трицепс":"sport","Вести бюджет проекта":"wallet","Изучить 10 новых слов":"flag","Медитация перед сном":"lotus"};
var EX={score:97,delta:2,dueDone:30,dueAll:31,week:42,streak:2,
 tasks:{today:[["Прочитать 30 страниц книги","h","30 мин"],["Тренировка: грудь и трицепс","m","1 ч"],["Вести бюджет проекта","l","15 мин"],["Изучить 10 новых слов","m","20 мин"],["Медитация перед сном","l","10 мин"]],
  plans:[["Запланировать отпуск","l","1 ч"],["Созвон по проекту","m","45 мин"],["Закрыть квартальный отчёт","h","2 ч"],["Купить абонемент в зал","l","10 мин"],["Обновить резюме","m","1 ч"]],
  over:[["Оплатить подписку","h","5 мин"],["Ответить на письма","m","20 мин"]]},
 cnt:{today:8,plans:12,over:2},
 ev:[[["Планёрка","09:00 – 09:30","b"],["Работа над проектом","10:00 – 13:00","v"]],
  [["Тренировка","09:00 – 10:30","g"],["Английский язык","12:00 – 13:00","b"]],
  [["Созвон с командой","14:50 – 15:20","b"],["Подписать договор","16:00 – 16:30","v"]],
  [["Английский язык","12:00 – 13:00","b"],["Работа над проектом","16:00 – 18:00","v"]],
  [["Тренировка","09:00 – 10:30","g"],["Английский язык","12:00 – 13:00","b"],["Работа над проектом","16:00 – 18:00","v"]],
  [["Пробежка","10:00 – 11:00","g"]],[["Планирование недели","19:00 – 19:30","v"]]],
 hb:[["Вода",[2,2,2,2,2,2,2],"var(--warn)"],["Зарядка",[2,2,2,2,0,2,2],"var(--bad)"],["Чтение",[2,1,2,2,2,2,0],"var(--cat-blue)"],["Подъём до 7:00",[2,2,2,0,2,0,2],"var(--ok)"],["Тренировка",[2,2,0,2,2,2,2],"var(--cat-violet)"]],
 pr:{week:{v:71,d:6,s:[30,42,38,55,60,58,71]},month:{v:78,d:12,s:[20,32,28,40,52,47,61,66,70,78]},year:{v:64,d:9,s:[12,20,25,31,38,36,45,52,58,64]}},
 tiles:[["Спорт",92,"sport"],["Обучение",76,"book"],["Привычки",85,"habits"],["Питание",71,"apple"],["Финансы",68,"wallet"]]};
function tx(el){return el?el.textContent.replace(/\s+/g," "):""}
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
function lastData(){var z={score:0,dd:0,da:0,week:0,streak:0,hd:0,ha:0},v=ls(LAST);if(!v)return z;try{var o=JSON.parse(v);for(var k in z)if(typeof o[k]==="number")z[k]=o[k]}catch(e){}return z}
function ring(v,sz){var c=2*Math.PI*44,o=c*(1-Math.max(0,Math.min(100,v))/100);
 return '<div class="gl-ring" style="'+(sz?'width:'+sz+'px;height:'+sz+'px':'')+'"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="var(--line2)" stroke-width="9"/><circle cx="50" cy="50" r="44" fill="none" stroke="var(--accent)" stroke-width="9" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'"/></svg><span>'+v+'%</span></div>'}
function spark(a){var w=200,h=80,mx=Math.max.apply(null,a.concat([1])),n=Math.max(1,a.length-1),pts=a.map(function(y,i){return (i*(w/n)).toFixed(1)+","+(h-6-(y/mx)*(h-14)).toFixed(1)}).join(" ");
 return '<svg viewBox="0 0 200 80" preserveAspectRatio="none"><defs><linearGradient id="glg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs><polygon points="0,80 '+pts+' '+w+',80" fill="url(#glg)"/><polyline points="'+pts+'" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'}
function render(d,ex){
 var now=new Date(),dow=(now.getDay()+6)%7;if(ST.day<0||ST.day>6)ST.day=dow;
 var h=[],i;
 h.push('<div class="gl-hd"><div><h2>Главное</h2><p>Ваш личный центр продуктивности</p></div><button type="button" class="gl-sw" role="switch" aria-checked="'+(ex?"true":"false")+'" data-a="sw">Пример<i></i></button></div>');
 h.push('<div class="gl-q">'+[["tasks","Задачи","tasks"],["cal","Календарь","cal"],["habits","Привычки","habits"],["sport","Спорт","sport"],["dash","Dashboard","dash"],["eco","Экономика","eco"]].map(function(x){return '<button type="button" data-a="go:'+x[0]+'">'+ICON[x[2]]+x[1]+'</button>'}).join("")+'</div>');
 var sc=ex?EX.score:d.score,dl=ex?EX.dueDone:d.dd,da=ex?EX.dueAll:d.da,wk=ex?EX.week:d.week,st=ex?EX.streak:d.streak;
 var pct=da?Math.round(dl/da*100):0,filled=wk>0?Math.max(1,Math.round(wk/100*7)):0;
 h.push('<div class="gl-top">'
 +'<div class="gl-c gl-lk" data-a="go:tasks"><div class="gl-l">Сегодня</div><div class="gl-row">'+ring(sc)+'<div><div class="gl-sub">Счёт дня<br>из 100</div>'+(ex?'<div class="gl-up">+'+EX.delta+'</div>':'')+'</div></div></div>'
 +'<div class="gl-c gl-lk" data-a="go:tasks"><div class="gl-l">Сроки</div><div class="gl-big">'+dl+' <small>из '+da+'</small></div><div class="gl-bar"><b style="width:'+pct+'%"></b></div><div class="gl-sub" style="margin-top:6px">'+pct+'%</div></div>'
 +'<div class="gl-c gl-lk" data-a="go:cal"><div class="gl-l">Неделя'+ICON.bars+'</div><div class="gl-big">'+wk+' <small>%</small></div><div class="gl-wk">'+[0,1,2,3,4,5,6].map(function(n){return '<b class="'+(n<filled?(n===filled-1?"cur":"on"):"")+'"></b>'}).join("")+'</div></div>'
 +'<div class="gl-c gl-lk" data-a="go:habits"><div class="gl-l">Серия</div><div class="gl-row">'+ICON.flame+'<div><div class="gl-big">'+st+'</div><div class="gl-sub">дня подряд</div></div></div><div class="gl-bar w"><b style="width:'+Math.min(100,st*14)+'%"></b></div></div>'
 +'</div>');
 var cn=ex?EX.cnt:{today:d.da,plans:0,over:0};
 var tabs=[["today","Сегодня"],["plans","Планы"],["over","Просроченные"]];
 var rows=ex?EX.tasks[ST.tt]:[];
 var tHtml='<div class="gl-c"><div class="gl-h"><b>'+ICON.tasks+'Задачи</b><button type="button" class="gl-lnk" data-a="go:tasks">Все задачи '+ICON.arrow+'</button></div>'
 +'<div class="gl-seg">'+tabs.map(function(t){return '<button type="button" class="'+(ST.tt===t[0]?"on":"")+'" data-a="tt:'+t[0]+'">'+t[1]+((ex||t[0]==="today")?' '+cn[t[0]]:'')+'</button>'}).join("")+'</div>';
 if(rows.length){tHtml+='<div class="gl-ls">'+rows.map(function(r,ri){var dn=HX["t"+ST.tt+ri]===1;return '<div class="gl-t'+(dn?" dn":"")+'" data-a="go:tasks"><i class="'+(dn?"d":"")+'" data-a="td:'+ST.tt+':'+ri+'">'+(dn?ICON.chk:"")+'</i>'+(ICON[TI[r[0]]||"tasks"])+'<span class="n">'+r[0]+'</span><em class="'+r[1]+'">'+({h:"Высокий",m:"Средний",l:"Низкий"})[r[1]]+'</em><s>'+ICON.clock+r[2]+'</s>'+ICON.arrow+'</div>'}).join("")+'</div>'}
 else{tHtml+='<div class="gl-em">'+(!ex&&ST.tt==="today"&&d.da?"Задач на сегодня: "+d.da+", выполнено "+d.dd:"Здесь пока пусто")+'<br><button type="button" data-a="go:tasks">Открыть задачи</button></div>'}
 tHtml+='</div>';
 var sel=ST.day,mon=new Date(now);mon.setDate(now.getDate()-dow+ST.wk*7);
 var cHtml='<div class="gl-c"><div class="gl-h"><b>'+ICON.cal+'Календарь</b><div class="gl-cal"><button type="button" data-a="go:cal">'+MON[mon.getMonth()]+' '+mon.getFullYear()+'</button><button type="button" data-a="wk:-1" aria-label="Назад">'+ICON.left+'</button><button type="button" data-a="wk:1" aria-label="Вперёд">'+ICON.arrow+'</button></div></div><div class="gl-days">';
 for(i=0;i<7;i++){var dd=new Date(mon);dd.setDate(mon.getDate()+i);cHtml+='<button type="button" class="'+(i===sel?"on":"")+'" data-a="day:'+i+'">'+DAYS[i]+'<b>'+dd.getDate()+'</b></button>'}
 cHtml+='</div>';
 var evs=ex?EX.ev[sel]:[];
 if(evs.length)cHtml+=evs.map(function(e){return '<div class="gl-ev '+(e[2]==="g"?"":e[2])+'">'+(e[2]==="g"?ICON.sport:e[2]==="b"?ICON.book:ICON.tasks)+'<div>'+e[0]+'<small>'+e[1]+'</small></div></div>'}).join("");
 else cHtml+='<div class="gl-em" style="padding:12px">На этот день событий нет</div>';
 cHtml+='<button type="button" class="gl-add" data-a="go:cal">'+ICON.plus+'Добавить событие</button></div>';
 var hdn=0,hall=EX.hb.length;
 var hHtml='<div class="gl-c"><div class="gl-h"><b>'+ICON.habits+'Привычки</b><button type="button" class="gl-lnk" data-a="go:habits">Все привычки '+ICON.arrow+'</button></div>';
 if(ex){
  var cells=function(ri){return DAYS.map(function(x,ci){return ci>dow?-1:(HX[ri+":"+ci]!==undefined?HX[ri+":"+ci]:EX.hb[ri][1][ci])})};
  EX.hb.forEach(function(r,ri){if(cells(ri)[dow]===2)hdn++});
  hHtml+='<div class="gl-sub" style="margin-bottom:8px">сегодня '+hdn+' из '+hall+' · серия 11</div><div class="gl-nh"><input type="text" placeholder="Новая привычка" data-a="go:habits" readonly><button type="button" data-a="go:habits" aria-label="Добавить">'+ICON.plus+'</button></div><table class="gl-hb"><thead><tr><th></th>'+DAYS.map(function(x,ci){var dd=new Date(mon);dd.setDate(mon.getDate()+ci);return '<th>'+x+'<br>'+dd.getDate()+'</th>'}).join("")+'</tr></thead><tbody>'
  +EX.hb.map(function(r,ri){var cs=cells(ri);return '<tr><td class="nm"><span style="background:'+r[2]+'"></span>'+r[0]+'</td>'+cs.map(function(v,ci){return '<td><button type="button" class="gl-ck '+(v===2?"d":v===1?"p":v===-1?"f":"")+'" '+(v===-1?'':'data-a="hc:'+ri+':'+ci+'"')+'>'+(v===2?ICON.chk:"")+'</button></td>'}).join("")+'</tr>'}).join("")+'</tbody></table>';
 }else{
  hHtml+=(d.ha?'<div class="gl-sub" style="margin-bottom:8px">сегодня '+d.hd+' из '+d.ha+'</div>':'')+'<div class="gl-nh"><input type="text" placeholder="Новая привычка" data-a="go:habits" readonly><button type="button" data-a="go:habits" aria-label="Добавить">'+ICON.plus+'</button></div><div class="gl-em" style="padding:12px">'+(d.ha?"Отметки привычек по дням ведутся в волне":"Привычек пока нет")+'</div>';
 }
 hHtml+='</div>';
 var P=ex?EX.pr[ST.pr]:{v:d.week,d:0,s:[0,0,0,0,0,0,0]};
 var pHtml='<div class="gl-c"><div class="gl-h"><b>'+ICON.bars+'Прогресс</b><div class="gl-seg" style="margin:0">'+[["week","Неделя"],["month","Месяц"],["year","Год"]].map(function(t){return '<button type="button" class="'+(ST.pr===t[0]?"on":"")+'" data-a="pr:'+t[0]+'">'+t[1]+'</button>'}).join("")+'</div></div>'
 +'<div class="gl-pr">'+ring(P.v,100)+'<div><div class="gl-sub">Общий прогресс<br>за '+({week:"неделю",month:"месяц",year:"год"})[ST.pr]+'</div>'+(ex?'<div class="gl-up">+'+P.d+'%</div>':'')+'</div><div class="gl-sp">'+spark(P.s)+'</div></div>'
 +'<div class="gl-tl">'+(ex?EX.tiles:[["Спорт",null,"sport"],["Обучение",null,"book"],["Привычки",null,"habits"],["Питание",null,"apple"],["Финансы",null,"wallet"]]).map(function(t){return '<div>'+ICON[t[2]]+t[0]+'<b>'+(t[1]===null?"—":t[1]+"%")+'</b></div>'}).join("")+'</div></div>';
 h.push('<div class="gl-cols"><div class="gl-col">'+tHtml+hHtml+'</div><div class="gl-col">'+cHtml+pHtml+'</div></div>');
 if(ex)h.push('<div class="gl-nt">Это пример заполненного вида. Выключите «Пример», чтобы увидеть свои данные.</div>');
 return h.join("")}
function navEl(){return document.querySelector(".arqNav nav")}
function nativeBtn(txt){var n=navEl();if(!n)return null;var b=n.querySelectorAll("button");for(var i=0;i<b.length;i++){if(!b[i].hasAttribute("data-glnav")&&b[i].textContent.trim()===txt)return b[i]}return null}
function rowEl(){var bs=document.querySelectorAll("button");for(var i=0;i<bs.length;i++){var b=bs[i];if(b.textContent.trim()==="Задачи"&&!b.closest(".gl-page")&&b.parentElement&&/Календарь/.test(b.parentElement.textContent)&&b.parentElement.querySelectorAll("button").length>=3)return b.parentElement}return null}
function waitFor(fn,ms,cb){var t0=Date.now();(function s(){var r=fn();if(r){cb(r);return}if(Date.now()-t0>ms)return;setTimeout(s,150)})()}
var busy=false;
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
   if(t==="habits"){var hs=document.querySelectorAll("div,span");for(var i=0;i<hs.length;i++){var h=hs[i];if(h.children.length<4&&h.textContent.length<40&&/^Привычки\s*сегодня/.test(h.textContent.trim())&&!h.closest(".gl-page")&&h.getBoundingClientRect().height>0){window.scrollTo({top:Math.max(0,h.getBoundingClientRect().top+window.scrollY-90),behavior:"instant"});break}}}})})},30);
 setTimeout(function(){if(busy)fin(cur)},5500)}
function setOn(v){if(on===v)return;on=v;sigPrev="";var n=navEl();
 if(!v){if(page&&page.parentNode)page.parentNode.removeChild(page);
  [].slice.call(document.querySelectorAll("[data-glh]")).forEach(function(e){e.removeAttribute("data-glh")});
  if(n){var bs=n.querySelectorAll("button");for(var i=0;i<bs.length;i++){var b=bs[i];if(b.hasAttribute("data-glnav")){b.setAttribute("aria-current","false")}else if(b.__glc){b.setAttribute("aria-current",b.__glc);b.__glc=undefined}}}}
 tick()}
function ensureNav(){
 var n=navEl();if(!n)return;
 if(!document.getElementById("gl-css")){var s=document.createElement("style");s.id="gl-css";s.textContent=css;document.head.appendChild(s)}
 var b=n.querySelector("[data-glnav]");
 if(!b){var first=n.querySelector("button");if(!first)return;
  b=document.createElement("button");b.type="button";b.className="arqNb";b.setAttribute("data-glnav","1");b.setAttribute("aria-current","false");b.setAttribute("style",first.getAttribute("style")||"");
  b.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON.home+'</svg><span>Главное</span>';
  n.insertBefore(b,n.firstChild)}
 if(on&&!busy){var bs=n.querySelectorAll("button");for(var i=0;i<bs.length;i++){var x=bs[i];if(x===b)continue;var c=x.getAttribute("aria-current");if(c&&c!=="false"){x.__glc=c;x.setAttribute("aria-current","false")}}b.setAttribute("aria-current","page")}}
function tick(){try{
 ensureNav();
 var r=rowEl();if(r&&r.parentElement){var d0=readReal(r.parentElement);if(d0){var j=JSON.stringify(d0);if(j!==window.__glLastJ){window.__glLastJ=j;ls(LAST,j)}}}
 if(!on)return;
 var nv=navEl(),ao=nv&&nv.closest(".arqNav"),root=ao&&ao.parentElement;if(!root)return;
 if(!page){page=document.createElement("div");page.className="gl-page";page.addEventListener("click",onClick)}
 if(!root.__glo){root.__glo=1;new MutationObserver(function(){if(!(on||busy))return;[].slice.call(root.children).forEach(function(c){if(c!==page&&!c.classList.contains("arqNav")&&!c.hasAttribute("data-glh"))c.setAttribute("data-glh","1")})}).observe(root,{childList:true})}
 var kids=[].slice.call(root.children),pgs=kids.filter(function(c){return c!==page&&!c.classList.contains("arqNav")&&!c.hasAttribute("data-glh")});
 pgs.forEach(function(c){c.setAttribute("data-glh","1")});
 if(page.parentNode!==root){root.insertBefore(page,root.firstChild);sigPrev=""}
 var ex=ls(KEY)==="1",d=lastData();
 var sig=JSON.stringify([d,ex,ST,HX]);
 if(sig!==sigPrev){sigPrev=sig;page.innerHTML=render(d,ex)}
}catch(e){window.__glErr=String(e&&e.stack||e)}}
function onClick(e){var t=e.target.closest&&e.target.closest("[data-a]");if(!t||!page.contains(t))return;var a=t.getAttribute("data-a").split(":");
 if(a[0]==="td"){e.stopPropagation();var k="t"+a[1]+a[2];HX[k]=HX[k]===1?0:1}
 else if(a[0]==="sw"){ls(KEY,ls(KEY)==="1"?"0":"1")}
 else if(a[0]==="go"){go(a[1]);return}
 else if(a[0]==="tt"){ST.tt=a[1]}
 else if(a[0]==="pr"){ST.pr=a[1]}
 else if(a[0]==="day"){ST.day=+a[1]}
 else if(a[0]==="wk"){ST.wk+=+a[1]}
 else if(a[0]==="hc"){var k2=a[1]+":"+a[2],c2=HX[k2]!==undefined?HX[k2]:EX.hb[+a[1]][1][+a[2]];HX[k2]=c2===2?0:2}
 tick()}
document.addEventListener("click",function(e){var t=e.target;if(!t||!t.closest)return;
 if(t.closest("[data-glnav]")){e.stopPropagation();e.preventDefault();setOn(true);return}
 if(on&&!busy&&t.closest(".arqNav"))setOn(false)},true);
window.__gl={tick:tick,setOn:setOn};
setInterval(tick,600);
tick();
})();
