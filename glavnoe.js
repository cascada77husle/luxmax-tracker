/* ARQON: вкладка «Главное» в «Моей волне» (v1) */
(function(){
"use strict";
if(window.__glInit)return;window.__glInit=1;
var KEY="arq:gl:ex";
var on=false,auto=false,sigPrev="";
var ST={tt:"today",pr:"week",day:-1},HX={};
var S={act:"",ina:""};
var panel=null;
var DAYS=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
var MON=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}return null}
var css=".gl-panel{display:block;margin-top:12px;color:var(--ink);font-family:inherit}"
+".gl-panel *{box-sizing:border-box}"
+".gl-hd{display:flex;align-items:flex-start;gap:12px;justify-content:space-between;margin-bottom:12px}"
+".gl-hd h2{margin:0;font-family:Archivo,system-ui,sans-serif;font-size:24px;font-weight:700;letter-spacing:-.02em}"
+".gl-hd p{margin:2px 0 0;font-size:12px;color:var(--muted)}"
+".gl-sw{display:flex;align-items:center;gap:8px;border:1px solid var(--line2);background:var(--card);color:var(--ink);border-radius:999px;padding:6px 8px 6px 12px;font-size:12px;font-weight:700;cursor:pointer;flex-shrink:0}"
+".gl-sw i{position:relative;width:38px;height:22px;border-radius:999px;background:var(--line2);transition:background .2s}"
+".gl-sw i:after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:var(--muted);transition:transform .22s,background .2s}"
+".gl-sw[aria-checked=true] i{background:var(--accent)}"
+".gl-sw[aria-checked=true] i:after{transform:translateX(16px);background:var(--on-accent)}"
+".gl-q{display:flex;gap:8px;overflow-x:auto;padding:2px 0 10px;margin-bottom:2px;scrollbar-width:none}"
+".gl-q::-webkit-scrollbar{display:none}"
+".gl-q button{flex:none;display:flex;align-items:center;gap:7px;border:1px solid var(--line2);background:var(--card);color:var(--ink);border-radius:12px;padding:9px 12px;font-size:12px;font-weight:700;cursor:pointer}"
+".gl-q svg,.gl-ic{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}"
+".gl-top{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:10px}"
+".gl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:10px}"
+".gl-c{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:14px;min-width:0;box-shadow:var(--shadow)}"
+".gl-c.gl-lk{cursor:pointer;transition:transform .18s,border-color .18s}"
+".gl-c.gl-lk:hover{border-color:var(--accent-line)}"
+".gl-c.gl-lk:active{transform:scale(.985)}"
+".gl-l{font-size:12px;font-weight:700;color:var(--muted);margin-bottom:8px}"
+".gl-big{font-family:Archivo,system-ui,sans-serif;font-size:30px;font-weight:700;letter-spacing:-.02em;line-height:1.05}"
+".gl-big small{font-size:15px;font-weight:600;color:var(--muted)}"
+".gl-row{display:flex;align-items:center;gap:12px}"
+".gl-sub{font-size:12px;color:var(--muted)}"
+".gl-up{color:var(--ok);font-weight:700;font-size:12px}"
+".gl-bar{height:6px;border-radius:99px;background:var(--line2);overflow:hidden;margin-top:12px}"
+".gl-bar b{display:block;height:100%;border-radius:99px;background:var(--accent)}"
+".gl-wk{display:flex;gap:4px;margin-top:14px}"
+".gl-wk b{flex:1;height:5px;border-radius:99px;background:var(--line2)}"
+".gl-wk b.on{background:var(--accent)}"
+".gl-ring{position:relative;width:76px;height:76px;flex:none}"
+".gl-ring svg{width:100%;height:100%;transform:rotate(-90deg)}"
+".gl-ring span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Archivo,system-ui,sans-serif;font-weight:700;font-size:20px}"
+".gl-h{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}"
+".gl-h b{display:flex;align-items:center;gap:8px;font-size:15px}"
+".gl-h button.gl-lnk{border:0;background:transparent;color:var(--ink2);font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;padding:4px}"
+".gl-seg{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}"
+".gl-seg button{border:1px solid var(--line2);background:var(--soft);color:var(--muted);border-radius:99px;padding:6px 11px;font-size:12px;font-weight:700;cursor:pointer}"
+".gl-seg button.on{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}"
+".gl-ls{display:flex;flex-direction:column}"
+".gl-t{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--line);font-size:13px;cursor:pointer}"
+".gl-t:first-child{border-top:0}"
+".gl-t i{width:18px;height:18px;border-radius:50%;border:1.6px solid var(--line2);flex:none}"
+".gl-t span.n{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"
+".gl-t em{font-style:normal;font-size:11px;font-weight:700;border-radius:99px;padding:3px 8px;flex:none;border:1px solid var(--line2);color:var(--muted)}"
+".gl-t em.h{color:var(--bad);border-color:var(--bad-line);background:var(--bad-soft)}"
+".gl-t em.m{color:var(--warn);border-color:var(--warn-line);background:var(--warn-soft)}"
+".gl-t em.l{color:var(--ok);border-color:var(--ok-line);background:var(--ok-soft)}"
+".gl-t s{text-decoration:none;font-size:11px;color:var(--muted);flex:none}"
+".gl-em{padding:18px 8px;text-align:center;color:var(--muted);font-size:13px}"
+".gl-em button{margin-top:10px;border:1px solid var(--line2);background:var(--soft);color:var(--ink);border-radius:12px;padding:9px 14px;font-weight:700;font-size:12px;cursor:pointer}"
+".gl-days{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-bottom:10px}"
+".gl-days button{border:1px solid var(--line);background:var(--soft);color:var(--ink);border-radius:12px;padding:7px 0;cursor:pointer;font-size:11px;font-weight:700;display:flex;flex-direction:column;gap:3px;align-items:center}"
+".gl-days button b{font-size:15px}"
+".gl-days button.on{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}"
+".gl-ev{border-radius:12px;padding:10px 12px;margin-bottom:7px;border-left:3px solid var(--ok);background:var(--ok-soft);font-size:13px}"
+".gl-ev small{display:block;color:var(--muted);font-size:11px;margin-top:2px}"
+".gl-ev.b{border-color:var(--cat-blue);background:rgba(143,163,168,.14)}"
+".gl-ev.v{border-color:var(--cat-violet);background:var(--cat-violet-soft)}"
+".gl-hb{width:100%;border-collapse:collapse;font-size:12px}"
+".gl-hb th{font-weight:600;color:var(--muted);padding:0 0 6px;font-size:11px}"
+".gl-hb td{padding:4px 2px;text-align:center}"
+".gl-hb td.nm{text-align:left;font-size:13px;padding-right:8px;white-space:nowrap}"
+".gl-ck{width:24px;height:24px;border-radius:50%;border:1.6px solid var(--line2);background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;color:var(--on-accent)}"
+".gl-ck.d{background:var(--accent);border-color:var(--accent)}"
+".gl-ck.p{background:var(--warn-soft);border-color:var(--warn-line)}"
+".gl-ck.f{opacity:.35;cursor:default}"
+".gl-ck svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}"
+".gl-pr{display:flex;gap:14px;align-items:center;flex-wrap:wrap}"
+".gl-sp{flex:1;min-width:140px;height:80px}"
+".gl-sp svg{width:100%;height:100%}"
+".gl-tl{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:12px}"
+".gl-tl div{border:1px solid var(--line);background:var(--soft);border-radius:12px;padding:8px 4px;text-align:center;font-size:11px;color:var(--muted)}"
+".gl-tl b{display:block;color:var(--ink);font-size:14px;margin-top:3px}"
+".gl-nt{margin-top:10px;font-size:11px;color:var(--muted);text-align:center}"
+"[data-glh=\"1\"]{display:none!important}";
var ICON={
 tasks:'<svg class="gl-ic" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/></svg>',
 cal:'<svg class="gl-ic" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
 habits:'<svg class="gl-ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/></svg>',
 sport:'<svg class="gl-ic" viewBox="0 0 24 24"><path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/></svg>',
 dash:'<svg class="gl-ic" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>',
 eco:'<svg class="gl-ic" viewBox="0 0 24 24"><path d="M4 8a3 3 0 013-3h10a2 2 0 012 2v2H7a3 3 0 00-3 3z"/><path d="M4 8v9a3 3 0 003 3h12a1 1 0 001-1v-8a1 1 0 00-1-1H7"/><circle cx="16" cy="14.5" r="1"/></svg>',
 flame:'<svg class="gl-ic" style="width:22px;height:22px" viewBox="0 0 24 24"><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2 0-3-.5-5 1-8z"/></svg>',
 arrow:'<svg class="gl-ic" style="width:14px;height:14px" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
 bars:'<svg class="gl-ic" viewBox="0 0 24 24"><path d="M6 20V11M12 20V5M18 20v-6"/></svg>',
 chk:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
};
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
 hb:[["Вода",[2,2,2,2,2,2,2]],["Зарядка",[2,2,2,2,0,2,2]],["Чтение",[2,1,2,2,2,2,0]],["Подъём до 7:00",[2,2,2,0,2,0,2]],["Тренировка",[2,2,0,2,2,2,2]]],
 pr:{week:{v:71,d:6,s:[30,42,38,55,60,58,71]},month:{v:78,d:12,s:[20,32,28,40,52,47,61,66,70,78]},year:{v:64,d:9,s:[12,20,25,31,38,36,45,52,58,64]}},
 tiles:[["Спорт",92],["Обучение",76],["Привычки",85],["Питание",71],["Финансы",68]]};
function tx(el){return el?el.textContent.replace(/\s+/g," "):""}
function isEx(card){var v=ls(KEY);if(v==="1")return true;if(v==="0")return false;return /Это\s*пример/i.test(card||"")}
function readReal(p){
 var card="",hab="",k=[].slice.call(p.children),i,m;
 for(i=0;i<k.length;i++){var t=tx(k[i]);if(!card&&/Счёт\s*дня/.test(t))card=t;if(!hab&&/Привычки\s*сегодня/.test(t))hab=t}
 var r={score:0,dd:0,da:0,week:0,streak:0,hd:0,ha:0,card:card};
 if(m=card.match(/(\d+)\s*Счёт\s*дня/))r.score=+m[1];
 if(m=card.match(/Сегодня\s*(\d+)\s*из\s*(\d+)/)){r.dd=+m[1];r.da=+m[2]}
 if(m=card.match(/Неделя\s*(\d+)\s*%/))r.week=+m[1];
 if(m=card.match(/Серия\s*(\d+)/))r.streak=+m[1];
 if(m=hab.match(/сегодня\s*(\d+)\s*из\s*(\d+)/)){r.hd=+m[1];r.ha=+m[2]}
 return r}
function ring(v,sz){var c=2*Math.PI*44,o=c*(1-Math.max(0,Math.min(100,v))/100);
 return '<div class="gl-ring" style="'+(sz?'width:'+sz+'px;height:'+sz+'px':'')+'"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="var(--line2)" stroke-width="9"/><circle cx="50" cy="50" r="44" fill="none" stroke="var(--accent)" stroke-width="9" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'"/></svg><span>'+v+'%</span></div>'}
function spark(a){var w=200,h=80,mx=Math.max.apply(null,a.concat([1])),pts=a.map(function(y,i){return (i*(w/(a.length-1))).toFixed(1)+","+(h-6-(y/mx)*(h-14)).toFixed(1)}).join(" ");
 return '<svg viewBox="0 0 200 80" preserveAspectRatio="none"><polyline points="'+pts+'" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'}
function render(d,ex){
 var now=new Date(),dow=(now.getDay()+6)%7;if(ST.day<0||ST.day>6)ST.day=dow;
 var h=[],i;
 h.push('<div class="gl-hd"><div><h2>Главное</h2><p>Ваш личный центр: всё в одном месте</p></div><button type="button" class="gl-sw" role="switch" aria-checked="'+(ex?"true":"false")+'" data-a="sw">Пример<i></i></button></div>');
 h.push('<div class="gl-q">'+[["tasks","Задачи","tasks"],["cal","Календарь","cal"],["habits","Привычки","habits"],["sport","Спорт","sport"],["dash","Dashboard","dash"],["eco","Экономика","eco"]].map(function(x){return '<button type="button" data-a="go:'+x[0]+'">'+ICON[x[2]]+x[1]+'</button>'}).join("")+'</div>');
 var sc=ex?EX.score:d.score,dl=ex?EX.dueDone:d.dd,da=ex?EX.dueAll:d.da,wk=ex?EX.week:d.week,st=ex?EX.streak:d.streak;
 var pct=da?Math.round(dl/da*100):0;
 h.push('<div class="gl-top">'
 +'<div class="gl-c gl-lk" data-a="go:tasks"><div class="gl-l">Сегодня</div><div class="gl-row">'+ring(sc)+'<div><div class="gl-sub">Счёт дня<br>из 100</div>'+(ex?'<div class="gl-up">+'+EX.delta+'</div>':'')+'</div></div></div>'
 +'<div class="gl-c gl-lk" data-a="go:tasks"><div class="gl-l">Сроки</div><div class="gl-big">'+dl+' <small>из '+da+'</small></div><div class="gl-bar"><b style="width:'+pct+'%"></b></div><div class="gl-sub" style="margin-top:6px">'+pct+'%</div></div>'
 +'<div class="gl-c gl-lk" data-a="go:cal"><div class="gl-l">Неделя</div><div class="gl-big">'+wk+' <small>%</small></div><div class="gl-wk">'+[0,1,2,3,4,5,6].map(function(n){return '<b'+(wk>0&&n<Math.max(1,Math.round(wk/100*7))?' class="on"':'')+'></b>'}).join("")+'</div></div>'
 +'<div class="gl-c gl-lk" data-a="go:habits"><div class="gl-l">Серия</div><div class="gl-row">'+ICON.flame+'<div><div class="gl-big">'+st+'</div><div class="gl-sub">дней подряд</div></div></div></div>'
 +'</div>');
 var cn=ex?EX.cnt:{today:d.da,plans:0,over:0};
 var tabs=[["today","Сегодня"],["plans","Планы"],["over","Просроченные"]];
 var rows=ex?EX.tasks[ST.tt]:[];
 var tHtml='<div class="gl-c"><div class="gl-h"><b>'+ICON.tasks+'Задачи</b><button type="button" class="gl-lnk" data-a="go:tasks">Все задачи '+ICON.arrow+'</button></div>'
 +'<div class="gl-seg">'+tabs.map(function(t){return '<button type="button" class="'+(ST.tt===t[0]?"on":"")+'" data-a="tt:'+t[0]+'">'+t[1]+((ex||t[0]==="today")?' '+cn[t[0]]:'')+'</button>'}).join("")+'</div>';
 if(rows.length){tHtml+='<div class="gl-ls">'+rows.map(function(r){return '<div class="gl-t" data-a="go:tasks"><i></i><span class="n">'+r[0]+'</span><em class="'+r[1]+'">'+({h:"Высокий",m:"Средний",l:"Низкий"})[r[1]]+'</em><s>'+r[2]+'</s></div>'}).join("")+'</div>'}
 else{tHtml+='<div class="gl-em">'+(!ex&&ST.tt==="today"&&d.da?"Задач на сегодня: "+d.da+", выполнено "+d.dd:"Здесь пока пусто")+'<br><button type="button" data-a="go:tasks">Открыть задачи</button></div>'}
 tHtml+='</div>';
 var sel=ST.day,mon=new Date(now);mon.setDate(now.getDate()-dow);
 var cHtml='<div class="gl-c"><div class="gl-h"><b>'+ICON.cal+'Календарь</b><button type="button" class="gl-lnk" data-a="go:cal">'+MON[now.getMonth()]+' '+now.getFullYear()+' '+ICON.arrow+'</button></div><div class="gl-days">';
 for(i=0;i<7;i++){var dd=new Date(mon);dd.setDate(mon.getDate()+i);cHtml+='<button type="button" class="'+(i===sel?"on":"")+'" data-a="day:'+i+'">'+DAYS[i]+'<b>'+dd.getDate()+'</b></button>'}
 cHtml+='</div>';
 var evs=ex?EX.ev[sel]:[];
 if(evs.length)cHtml+=evs.map(function(e){return '<div class="gl-ev '+(e[2]==="g"?"":e[2])+'">'+e[0]+'<small>'+e[1]+'</small></div>'}).join("");
 else cHtml+='<div class="gl-em">На этот день событий нет<br><button type="button" data-a="go:cal">Открыть календарь</button></div>';
 cHtml+='</div>';
 var hdn=0,hall=EX.hb.length;
 var hHtml='<div class="gl-c"><div class="gl-h"><b>'+ICON.habits+'Привычки</b><button type="button" class="gl-lnk" data-a="go:habits">Все привычки '+ICON.arrow+'</button></div>';
 if(ex){
  var cells=function(ri){return DAYS.map(function(x,ci){return ci>dow?-1:(HX[ri+":"+ci]!==undefined?HX[ri+":"+ci]:EX.hb[ri][1][ci])})};
  EX.hb.forEach(function(r,ri){if(cells(ri)[dow]===2)hdn++});
  hHtml+='<div class="gl-sub" style="margin-bottom:8px">сегодня '+hdn+' из '+hall+' · серия 11</div><table class="gl-hb"><thead><tr><th></th>'+DAYS.map(function(x){return '<th>'+x+'</th>'}).join("")+'</tr></thead><tbody>'
  +EX.hb.map(function(r,ri){var cs=cells(ri);return '<tr><td class="nm">'+r[0]+'</td>'+cs.map(function(v,ci){return '<td><button type="button" class="gl-ck '+(v===2?"d":v===1?"p":v===-1?"f":"")+'" '+(v===-1?'':'data-a="hc:'+ri+':'+ci+'"')+'>'+(v===2?ICON.chk:"")+'</button></td>'}).join("")+'</tr>'}).join("")+'</tbody></table>';
 }else{
  hHtml+=(d.ha?'<div class="gl-sub" style="margin-bottom:8px">сегодня '+d.hd+' из '+d.ha+'</div>':'')+'<div class="gl-em">'+(d.ha?"Отметки привычек по дням":"Привычек пока нет")+'<br><button type="button" data-a="go:habits">'+(d.ha?"Открыть привычки":"Добавить привычку")+'</button></div>';
 }
 hHtml+='</div>';
 var P=ex?EX.pr[ST.pr]:{v:d.week,d:0,s:[0,0,0,0,0,0,0]};
 var pHtml='<div class="gl-c"><div class="gl-h"><b>'+ICON.bars+'Прогресс</b></div><div class="gl-seg">'+[["week","Неделя"],["month","Месяц"],["year","Год"]].map(function(t){return '<button type="button" class="'+(ST.pr===t[0]?"on":"")+'" data-a="pr:'+t[0]+'">'+t[1]+'</button>'}).join("")+'</div>'
 +'<div class="gl-pr">'+ring(P.v,92)+'<div><div class="gl-sub">Общий прогресс<br>за '+({week:"неделю",month:"месяц",year:"год"})[ST.pr]+'</div>'+(ex?'<div class="gl-up">+'+P.d+'%</div>':'')+'</div><div class="gl-sp">'+spark(P.s)+'</div></div>'
 +'<div class="gl-tl">'+(ex?EX.tiles:[["Спорт",null],["Обучение",null],["Привычки",null],["Питание",null],["Финансы",null]]).map(function(t){return '<div>'+t[0]+'<b>'+(t[1]===null?"—":t[1]+"%")+'</b></div>'}).join("")+'</div></div>';
 h.push('<div class="gl-grid">'+tHtml+cHtml+hHtml+pHtml+'</div>');
 if(ex)h.push('<div class="gl-nt">Это пример заполненного вида. Выключите «Пример», чтобы увидеть свои данные.</div>');
 return h.join("")}
function btnClick(txt,scope){var bs=(scope||document).querySelectorAll("button");for(var i=0;i<bs.length;i++){if(!bs[i].hasAttribute("data-gl")&&bs[i].textContent.trim()===txt){bs[i].click();return true}}return false}
function go(t){
 if(t==="dash"||t==="eco"){setOn(false);var w=t==="dash"?"Dashboard":"Экономика",nb=document.querySelectorAll("button.arqNb");for(var i=0;i<nb.length;i++)if(nb[i].textContent.indexOf(w)>=0)nb[i].click();return}
 var row=rowEl();setOn(false);
 if(row)btnClick({tasks:"Задачи",cal:"Календарь",sport:"Спорт",habits:"Задачи"}[t],row);
 if(t==="habits")setTimeout(function(){var q=pgEl();if(!q)return;var k=[].slice.call(q.children);for(var i=0;i<k.length;i++){if(/Привычки\s*сегодня/.test(tx(k[i]))&&k[i].getBoundingClientRect().height>0){k[i].scrollIntoView({behavior:"smooth",block:"start"});break}}},380)}
function rowEl(){var bs=document.querySelectorAll("button");for(var i=0;i<bs.length;i++){var b=bs[i];if(b.textContent.trim()==="Задачи"&&b.parentElement&&/Календарь/.test(b.parentElement.textContent)&&b.parentElement.querySelectorAll("button").length>=3)return b.parentElement}return null}
function pgEl(){var r=rowEl();return r&&r.parentElement}
function natives(row){return [].slice.call(row.children).filter(function(c){return !c.hasAttribute("data-gl")})}
function setOn(v){on=v;sigPrev="";var p=pgEl();if(!p)return;var row=rowEl();
 if(!v){[].slice.call(p.querySelectorAll("[data-glh]")).forEach(function(e){e.removeAttribute("data-glh")});if(panel&&panel.parentNode)panel.parentNode.removeChild(panel);
  if(row)natives(row).forEach(function(n){if(n.__glo!==undefined){n.style.cssText=n.__glo;n.__glo=undefined}});
  var b=row&&row.querySelector("[data-gl]");if(b&&S.ina)b.style.cssText=S.ina}
 tick()}
function setup(p,row){
 if(!document.getElementById("gl-css")){var s=document.createElement("style");s.id="gl-css";s.textContent=css;document.head.appendChild(s)}
 p.children[0].setAttribute("data-glk","1");row.setAttribute("data-glk","1");
 var nat=natives(row);
 if(!on){nat.forEach(function(n){var bg=n.style.background||n.style.backgroundColor;if(bg&&!/transparent/.test(bg))S.act=n.style.cssText;else S.ina=n.style.cssText})}
 var btn=row.querySelector("[data-gl]");
 if(!btn){btn=document.createElement("button");btn.type="button";btn.setAttribute("data-gl","1");btn.innerHTML="<span>Главное</span>";row.insertBefore(btn,row.firstChild)}
 if(!row.__gl){row.__gl=1;row.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("button");if(!b)return;if(b.hasAttribute("data-gl")){e.stopPropagation();e.preventDefault();if(!on)setOn(true);return}if(on)setOn(false)},true)}
 if(S.ina){var act=S.act||(S.ina.replace(/background[^;]*;?/g,"").replace(/(^|;)\s*color[^;]*;?/g,"$1")+";background:var(--accent);color:var(--on-accent)");var want=on?act:S.ina;if(btn.style.cssText!==want)btn.style.cssText=want;
  if(on)nat.forEach(function(n){if(n.__glo===undefined)n.__glo=n.style.cssText;if(n.style.cssText!==S.ina)n.style.cssText=S.ina})}}
function tick(){try{
 var p=pgEl();if(!p){on=false;auto=false;panel=null;return}
 var row=rowEl();if(!row)return;
 setup(p,row);
 if(!auto){auto=true;on=true;setup(p,row)}
 if(!on)return;
 [].slice.call(p.children).forEach(function(c){if(c.hasAttribute("data-glk")||c===panel)return;if(!c.hasAttribute("data-glh")&&c.getBoundingClientRect().height>0)c.setAttribute("data-glh","1")});
 var d=readReal(p),ex=isEx(d.card);
 var sig=JSON.stringify([d,ex,ST,HX]);
 if(!panel){panel=document.createElement("div");panel.className="gl-panel";panel.addEventListener("click",onClick)}
 if(panel.parentNode!==row.parentNode||panel.previousSibling!==row){row.parentNode.insertBefore(panel,row.nextSibling);sigPrev=""}
 if(sig!==sigPrev){sigPrev=sig;panel.innerHTML=render(d,ex)}
}catch(e){window.__glErr=String(e&&e.stack||e)}}
function onClick(e){var t=e.target.closest&&e.target.closest("[data-a]");if(!t||!panel.contains(t))return;var a=t.getAttribute("data-a").split(":");
 if(a[0]==="sw"){ls(KEY,isEx(readReal(pgEl()).card)?"0":"1");sigPrev=""}
 else if(a[0]==="go"){go(a[1]);return}
 else if(a[0]==="tt"){ST.tt=a[1]}
 else if(a[0]==="pr"){ST.pr=a[1]}
 else if(a[0]==="day"){ST.day=+a[1]}
 else if(a[0]==="hc"){var k=a[1]+":"+a[2],c2=HX[k]!==undefined?HX[k]:EX.hb[+a[1]][1][+a[2]];HX[k]=c2===2?0:2}
 tick()}
window.__gl={tick:tick,setOn:setOn};
setInterval(tick,600);
})();
