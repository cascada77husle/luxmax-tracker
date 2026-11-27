/* ARQON: чатик-помощник вместо робота: парит, моргает, смотрит по сторонам, фраза меняется */
(function(){try{
var css=[
'#arqAiBotWrap{right:14px!important;gap:0!important;bottom:calc(74px + env(safe-area-inset-bottom,0px))!important}','@media (min-width:900px){#arqAiBotWrap{bottom:12px!important}}',
'#arqAiBotWrap>img{display:none!important}',
'#arqBub{position:relative;width:200px;animation:arqBubFl 4.2s ease-in-out infinite;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}',
'@keyframes arqBubFl{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-12px) rotate(1deg)}}',
'html.lt #arqBub .bb{transition:none}#arqBub .bb{position:relative;padding:13px 14px 12px;border-radius:22px 22px 6px 22px;background:#17191b;border:1px solid rgba(255,255,255,.16);display:flex;flex-direction:column;align-items:center;gap:9px;background-image:radial-gradient(rgba(255,255,255,.06) 1px,transparent 1.3px);background-size:9px 9px;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}',
'#arqBub .tl{position:absolute;right:20px;bottom:-6px;width:11px;height:11px;background:#17191b;border-right:1px solid rgba(255,255,255,.16);border-bottom:1px solid rgba(255,255,255,.16);transform:rotate(45deg);border-bottom-right-radius:3px}',
'#arqBub .ey{position:relative;display:flex;gap:11px}',
'#arqBub .e{position:relative;display:block;width:23px;height:27px;border-radius:50%;background:#e7e8e5;overflow:hidden;transition:transform .09s ease-in}',
'#arqBub.bk .e{transform:scaleY(.08)}',
'#arqBub .p{position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#141618;transform:translate(var(--x,0px),var(--y,0px));transition:transform .24s cubic-bezier(.3,1.55,.5,1)}',
'#arqBub .p::after{content:"";position:absolute;left:2px;top:2px;width:4px;height:4px;border-radius:50%;background:#e7e8e5}',
'#arqBub .tx{font:700 13.5px/1.25 Archivo,system-ui,sans-serif;color:#e7e8e5;text-align:center;letter-spacing:.01em;transition:opacity .25s ease,transform .25s ease}',
'#arqBub .tx.o{opacity:0;transform:translateY(3px)}',
'#arqBub .ck{position:absolute;top:19px;width:10px;height:6px;border-radius:50%;background:#a6b4a5;opacity:.34}#arqBub .ck.l{left:-11px}#arqBub .ck.r{right:-11px}',
'#arqBub .e{box-shadow:inset 0 -6px 0 rgba(166,180,165,.32)}',
'#arqBub .bb::before{content:"";position:absolute;inset:4px;border:1px dashed rgba(166,180,165,.22);border-radius:18px 18px 3px 18px;pointer-events:none}',
'#arqBub .e::after{content:"";position:absolute;left:0;right:0;top:0;height:7px;background:rgba(0,0,0,.12)}',
'#arqBub .p::before{content:"";position:absolute;right:2px;bottom:2px;width:2px;height:2px;border-radius:50%;background:rgba(231,232,229,.7)}',
'#arqBub .br{position:absolute;top:-8px;width:15px;height:5px;border-top:2px solid #a6b4a5;border-radius:50% 50% 0 0;opacity:.75;animation:arqBubBr 5.5s ease-in-out infinite}#arqBub .br.l{left:0;transform-origin:100% 100%}#arqBub .br.r{right:0;transform-origin:0 100%;animation-delay:-.4s}',
'@keyframes arqBubBr{0%,70%,100%{transform:translateY(0) rotate(0)}78%,90%{transform:translateY(-2px) rotate(-6deg)}}',
'#arqBub .ck{top:20px}',
'#arqBub .ck{display:none!important}',
'#arqBub .bb::before{border-color:rgba(231,232,229,.22)}',
'#arqBub .bb::after{content:"";position:absolute;inset:9px 12px;border-radius:12px;pointer-events:none;z-index:0;background:repeating-linear-gradient(0deg,rgba(231,232,229,.11) 0 1px,transparent 1px 8px)}',
'#arqBub .ey,#arqBub .tx{position:relative;z-index:1}',
'html.lt #arqBub .bb{background-color:#1a1c1e}html.lt #arqBub .tl{background:#1a1c1e}',
'html.lt #arqBub .e{background:#000;box-shadow:0 0 0 1.5px #c9c9c6}html.lt #arqBub .e::after{background:rgba(255,255,255,.1)}',
'html.lt #arqBub .p{background:#e7e8e5}html.lt #arqBub .p::after{background:#000}html.lt #arqBub .p::before{background:rgba(0,0,0,.6)}',
'#arqBub .e::after{content:"";position:absolute;left:0;right:0;top:0;bottom:0;height:auto;background:#17191b;clip-path:polygon(0 0,100% 0,100% 46%)}',
'#arqBub .e ~ .e::after{clip-path:polygon(0 0,100% 0,0 46%)}',
'html.lt #arqBub .e::after,html.lt #arqBub .e ~ .e::after{background:#1a1c1e}',
'#arqBub .e::after{z-index:2;transition:clip-path .45s ease}',
'#arqBub .e::before{content:"";position:absolute;left:-15%;right:-15%;bottom:-6%;height:52%;border-radius:50%;background:#17191b;transform:translateY(110%);transition:transform .4s ease;z-index:1}',
'html.lt #arqBub .e::before{background:#1a1c1e}',
'#arqBub.m-neutral .e::after,#arqBub.m-happy .e::after{clip-path:polygon(0 0,100% 0,100% 0)}',
'#arqBub.m-neutral .e ~ .e::after,#arqBub.m-happy .e ~ .e::after{clip-path:polygon(0 0,100% 0,0 0)}',
'#arqBub.m-happy .e::before{transform:translateY(0)}',
'#arqBub.m-angry .e::after,#arqBub.m-sad .e ~ .e::after{clip-path:polygon(0 0,100% 0,100% 46%)}',
'#arqBub.m-angry .e ~ .e::after,#arqBub.m-sad .e::after{clip-path:polygon(0 0,100% 0,0 46%)}',
'#arqBub .br{display:block;position:absolute;top:-10px;width:17px;height:3px;border:0;border-radius:3px;background:rgba(231,232,229,.72);opacity:1;animation:none;transform-origin:50% 50%;transform:translateY(var(--by,0px)) rotate(var(--r,0deg));transition:transform .45s cubic-bezier(.3,1.4,.5,1)}',
'#arqBub .br.l{left:3px}#arqBub .br.r{right:3px;transform:translateY(var(--by,0px)) rotate(calc(var(--r,0deg) * -1))}',
'#arqBub.m-angry{--r:17deg;--by:3px}#arqBub.m-happy{--r:-9deg;--by:-3px}#arqBub.m-sad{--r:-15deg;--by:0px}#arqBub.m-neutral{--r:0deg;--by:0px}',
'#arqBub .st{position:absolute;pointer-events:none;color:#a6b4a5;animation:arqBubTw 3.2s ease-in-out infinite}',
'#arqBub .s1{right:-9px;top:-15px;width:21px;height:21px}#arqBub .s2{left:-11px;top:9px;width:11px;height:11px;color:#e7e8e5;animation-delay:-1.1s}#arqBub .s3{right:-13px;bottom:14px;width:9px;height:9px;animation-delay:-2s}#arqBub .s4{left:38px;top:-13px;width:8px;height:8px;color:#e7e8e5;animation-delay:-.6s}',
'@keyframes arqBubTw{0%,100%{transform:scale(.55) rotate(0deg);opacity:.5}50%{transform:scale(1) rotate(45deg);opacity:1}}',
'#arqBub .st,#arqBub .tl{display:none!important}',
'#arqBub .bb::before,#arqBub .bb::after{display:none!important}',
'#arqBub .bb{background-image:none!important;box-shadow:none!important;border-radius:18px!important;border:1px solid rgba(255,255,255,.1)!important;background-color:#141516!important;padding:14px 16px 13px!important;gap:10px!important}',
'html.lt #arqBub .bb{background-color:#141516!important}',
'#arqBub .e{box-shadow:none}',
'#arqBub .e::before,#arqBub .e::after,#arqBub .e ~ .e::after{background:#141516!important}',
'#arqBub .tx{font-weight:600!important;font-size:13px!important;letter-spacing:0!important}',
'#arqBub .br{background:rgba(231,232,229,.5)!important;height:2px!important}',
'#arqBub .tl{display:block!important;right:22px;bottom:-7px;width:12px;height:12px;background:#141516!important;border-right:1px solid rgba(255,255,255,.1)!important;border-bottom:1px solid rgba(255,255,255,.1)!important;transform:rotate(45deg);border-bottom-right-radius:3px}',
'#arqBub.m-happy .e::before{transform:translateY(46%)}',
'#arqBub .e{width:25px;height:29px}',
'@media (prefers-reduced-motion:reduce){#arqBub{animation:none}}'
].join('\n');
var T=[],eyes=[],bub=null,txt=null,cur='';
function name(){try{var u=window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initDataUnsafe&&window.Telegram.WebApp.initDataUnsafe.user;return(u&&u.first_name)||''}catch(e){return''}}
function greet(n){var h=new Date().getHours(),g=h<5?'Не спишь':h<12?'Доброе утро':h<18?'Добрый день':'Добрый вечер';if(h<5)return n?g+', '+n+'?':g+'?';return n?g+', '+n:g}
function list(){var n=name(),a=['Чем займёмся сегодня?','С чего начнём день?','Что сегодня двигаем?','Какая цель на сегодня?','Один шаг, и день пошёл','Загляни в привычки','Как дела с планом?','Что важнее всего сегодня?','Начнём с малого?','Что сделаем первым делом?'];a.push(greet(n));if(n)a.push('Здравствуй, '+n);return a}
function today(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function pick(){var a=list(),n=name(),ls=null,i,last=-1,day='';try{day=localStorage.getItem('arq:bubD')||'';last=parseInt(localStorage.getItem('arq:bubL'),10);if(isNaN(last))last=-1}catch(e){}
 var t=today();if(day!==t){try{localStorage.setItem('arq:bubD',t)}catch(e){}return n?'Здравствуй, '+n:greet(n)}
 var tries=0;do{i=Math.floor(Math.random()*a.length);tries++}while((a[i]===cur||i===last)&&tries<12);try{localStorage.setItem('arq:bubL',String(i))}catch(e){}return a[i]}
function setText(s,fade){cur=s;if(!txt)return;if(!fade){txt.textContent=s;return}txt.classList.add('o');setTimeout(function(){txt.textContent=s;txt.classList.remove('o')},260)}
function look(x,y){for(var i=0;i<eyes.length;i++){eyes[i].style.setProperty('--x',x+'px');eyes[i].style.setProperty('--y',y+'px')}}
var seqs=[[[-5,0,800],[5,0,900],[0,0,0]],[[5,0,600],[-5,0,500],[5,0,500],[0,0,0]],[[-5,-4,900],[0,0,0]],[[0,4,900],[0,0,0]],[[5,-3,700],[-5,-3,700],[0,0,0]],[[-5,0,500],[0,0,0]]];
function run(s,i){if(!bub)return;var st=s[i];look(st[0],st[1]);if(i<s.length-1)T.push(setTimeout(function(){run(s,i+1)},st[2]))}
function loopLook(){T.push(setTimeout(function(){run(seqs[Math.floor(Math.random()*seqs.length)],0);loopLook()},1800+Math.random()*2600))}
function blink(){if(!bub)return;bub.classList.add('bk');setTimeout(function(){if(bub)bub.classList.remove('bk')},110)}
function loopBlink(){T.push(setTimeout(function(){blink();if(Math.random()<.22)setTimeout(blink,230);loopBlink()},2400+Math.random()*3200))}
function mount(){var w=document.getElementById('arqAiBotWrap');if(!w||w.querySelector('#arqBub'))return;
 if(!document.getElementById('arqBubCss')){var s=document.createElement('style');s.id='arqBubCss';s.textContent=css;document.head.appendChild(s)}
 var d=document.createElement('div');d.id='arqBub';d.innerHTML='<div class="bb"><div class="ey"><i class="ck l"></i><i class="ck r"></i><i class="br l"></i><i class="br r"></i><i class="e"><b class="p"></b></i><i class="e"><b class="p"></b></i></div><div class="tx"></div></div><span class="tl"></span><svg class="st s1" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C12.9 7.2 16.8 11.1 24 12 16.8 12.9 12.9 16.8 12 24 11.1 16.8 7.2 12.9 0 12 7.2 11.1 11.1 7.2 12 0Z"/></svg><svg class="st s2" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C12.9 7.2 16.8 11.1 24 12 16.8 12.9 12.9 16.8 12 24 11.1 16.8 7.2 12.9 0 12 7.2 11.1 11.1 7.2 12 0Z"/></svg><svg class="st s3" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C12.9 7.2 16.8 11.1 24 12 16.8 12.9 12.9 16.8 12 24 11.1 16.8 7.2 12.9 0 12 7.2 11.1 11.1 7.2 12 0Z"/></svg><svg class="st s4" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C12.9 7.2 16.8 11.1 24 12 16.8 12.9 12.9 16.8 12 24 11.1 16.8 7.2 12.9 0 12 7.2 11.1 11.1 7.2 12 0Z"/></svg>';
 w.appendChild(d);bub=d;txt=d.querySelector('.tx');eyes=[].slice.call(d.querySelectorAll('.p'));setText(pick(),false);
 T.forEach(clearTimeout);T=[];loopLook();loopBlink()}
setInterval(function(){if(!document.hidden)mount()},2500);mount();
setInterval(function(){if(!document.hidden&&bub)setText(pick(),true)},45000);
}catch(e){}})();

/* настроение чатика: глаза и брови меняются сами (то хмурый, то весёлый, то грустный) */
(function(){try{
var M=['m-neutral','m-happy','m-sur','m-slp','m-sus','m-wnk','m-joy','m-thk','m-wor','m-cool','m-sad','m-angry'],last='';
var L0='polygon(0 0,100% 0,100% 0)',R0='polygon(0 0,100% 0,0 0)';function lid(c,l,r){return '#arqBub.'+c+' .e::after{clip-path:'+l+'}#arqBub.'+c+' .e ~ .e::after{clip-path:'+r+'}'}
var C=[lid('m-sur',L0,R0),'#arqBub.m-sur .e{transform:scale(1.14)}#arqBub.m-sur .p{width:8px;height:8px;margin:-4px 0 0 -4px}#arqBub.m-sur{--r:0deg;--by:-5px}',
lid('m-slp','polygon(0 0,100% 0,100% 58%,0 58%)','polygon(0 0,100% 0,100% 58%,0 58%)'),'#arqBub.m-slp{--r:0deg;--by:3px}',
lid('m-sus','polygon(0 0,100% 0,100% 52%,0 52%)',R0),'#arqBub.m-sus .br.l{transform:translateY(3px) rotate(14deg)}#arqBub.m-sus .br.r{transform:translateY(-4px) rotate(-6deg)}',
lid('m-wnk',L0,R0),'#arqBub.m-wnk .e ~ .e{transform:scaleY(.1)}#arqBub.m-wnk .e::before{transform:translateY(46%)}#arqBub.m-wnk{--r:-6deg;--by:-2px}',
lid('m-joy',L0,R0),'#arqBub.m-joy .e::before{transform:translateY(8%)}#arqBub.m-joy{--r:-12deg;--by:-4px}',
lid('m-thk','polygon(0 0,100% 0,100% 30%,0 30%)','polygon(0 0,100% 0,100% 30%,0 30%)'),'#arqBub.m-thk .br.l{transform:translateY(-4px) rotate(-8deg)}#arqBub.m-thk .br.r{transform:translateY(1px) rotate(0deg)}',
lid('m-wor','polygon(0 0,100% 0,0 28%)','polygon(0 0,100% 0,100% 28%)'),'#arqBub.m-wor{--r:-15deg;--by:-3px}',
lid('m-cool','polygon(0 0,100% 0,100% 38%,0 38%)','polygon(0 0,100% 0,100% 38%,0 38%)'),'#arqBub.m-cool{--r:0deg;--by:1px}'].join('\n');
if(!document.getElementById('arqBubCss4')){var st4=document.createElement('style');st4.id='arqBubCss4';st4.textContent=C;document.head.appendChild(st4)}
function set(){var b=document.getElementById('arqBub');if(!b)return;var m;do{m=M[Math.floor(Math.random()*M.length)]}while(m===last);last=m;for(var i=0;i<M.length;i++)b.classList.remove(M[i]);b.classList.add(m)}
function loop(){var has=!!document.getElementById('arqBub');if(has&&!document.hidden)set();setTimeout(loop,has?2800+Math.random()*1800:400)}
loop();
}catch(e){}})();

/* чатик v2: живее — пружинный вход, слежение за курсором, реакция на касание, печать фраз, подмигивание, точка «онлайн». Без свечений. */
(function(){try{
var css=[
'#arqBub{animation:arqBubFl 4.2s ease-in-out infinite!important;transform-origin:85% 100%}',
'@keyframes arqBubPop{0%{opacity:0;transform:translateY(24px) scale(.6) rotate(-4deg)}100%{opacity:1;transform:none}}',
'#arqBub.jp{animation:arqBubJp .62s cubic-bezier(.3,1.4,.5,1) both!important}',
'@keyframes arqBubJp{0%{transform:scale(1,1)}18%{transform:scale(1.07,.86) translateY(2px)}45%{transform:scale(.94,1.1) translateY(-16px) rotate(-3deg)}70%{transform:scale(1.04,.94) translateY(0) rotate(2deg)}100%{transform:none}}',
'html body #arqBub .bb{background-color:var(--card)!important;border-color:color-mix(in srgb,var(--accent,#a6b4a5) 30%,rgba(255,255,255,.08))!important}',
'html body #arqBub .tl{background:var(--card)!important;border-right-color:color-mix(in srgb,var(--accent,#a6b4a5) 30%,rgba(255,255,255,.08))!important;border-bottom-color:color-mix(in srgb,var(--accent,#a6b4a5) 30%,rgba(255,255,255,.08))!important}',
'html body #arqBub .e::before,html body #arqBub .e::after,html body #arqBub .e ~ .e::after{background:var(--card)!important}',
'#arqBub .dt{position:absolute;right:9px;top:8px;width:7px;height:7px;border-radius:50%;background:var(--accent,#a6b4a5);z-index:3}',
'#arqBub .dt::after{content:"";position:absolute;inset:0;border-radius:50%;border:1.5px solid var(--accent,#a6b4a5);animation:arqBubDt 2.4s ease-out infinite}',
'@keyframes arqBubDt{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.8);opacity:0}}',
'#arqBub .ey{transition:transform .3s ease}',
'#arqBub:hover .ey{transform:translateY(-1px)}',
'#arqBub.wk .e ~ .e{transform:scaleY(.1)!important}',
'#arqBub .tx.ty::after{content:"";display:inline-block;width:2px;height:1em;margin-left:2px;vertical-align:-2px;background:var(--accent,#a6b4a5);animation:arqBubCr .6s steps(1) infinite}',
'@keyframes arqBubCr{50%{opacity:0}}',
'#arqBub .hp{position:absolute;left:50%;top:30%;width:14px;height:14px;margin:-7px 0 0 -7px;pointer-events:none;z-index:5;color:var(--accent,#a6b4a5);animation:arqBubHp 1s ease-out forwards}',
'@keyframes arqBubHp{0%{opacity:0;transform:translate(0,0) scale(.3) rotate(0)}15%{opacity:1}100%{opacity:0;transform:translate(var(--dx,0px),var(--dy,-60px)) scale(1) rotate(var(--rt,20deg))}}',
'html body #arqBub .st{display:block!important;color:var(--accent,#a6b4a5)}html body #arqBub .st.s2,html body #arqBub .st.s4{color:var(--ink,#e7e8e5)}',
'#arqBub .s1{right:-10px;top:-17px;width:22px;height:22px}#arqBub .s2{left:-12px;top:10px;width:12px;height:12px}#arqBub .s3{right:-14px;bottom:16px;width:10px;height:10px}#arqBub .s4{left:34px;top:-15px;width:9px;height:9px}',
'#arqBub.jp{animation:none!important}#arqBub .st,#arqBub .dt::after,.arqAiHdIc::after,.arqAiHdIc svg,.arqAiRow.has .arqAiSend svg,.arqAiPn,.arqAiMsg,.arqAiChips{animation:none!important}#arqBub .dt::after{display:none}',
'@media (prefers-reduced-motion:reduce){#arqBub,#arqBub.jp{animation:none!important}#arqBub .dt::after,#arqBub .hp{animation:none}}'
].join('\n');
var R=['Привет!','Щекотно 🙂','Ага, я тут','Давай по плану','Ты молодец','Ещё один шаг','Вперёд!','Хороший день для дел','Я слежу за целями','Не сдаёмся'];
var SH='<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.1C1 8.6 2.9 5 6.3 5c2 0 3.6 1.2 4.4 2.7h2.6C14.1 6.2 15.7 5 17.7 5c3.4 0 5.3 3.6 3.9 6.9C19.5 16.4 12 21 12 21z"/></svg>';
var SS='<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 0C12.9 7.2 16.8 11.1 24 12 16.8 12.9 12.9 16.8 12 24 11.1 16.8 7.2 12.9 0 12 7.2 11.1 11.1 7.2 12 0Z"/></svg>';
var tm=0,typing=false,fx=null;
function B(){return document.getElementById('arqBub')}
function ready(b){if(!document.getElementById('arqBubCss2')){var s=document.createElement('style');s.id='arqBubCss2';s.textContent=css;document.head.appendChild(s)}
 if(!b.querySelector('.dt')){var d=document.createElement('i');d.className='dt';b.querySelector('.bb').appendChild(d)}}
var lastFull='',tt=0;
function typeIn(tx,full){clearTimeout(tt);typing=true;lastFull=full;tx.classList.add('ty');tx.textContent='';var i=0;tt=setTimeout(function step(){if(!tx.isConnected){typing=false;return}i++;tx.textContent=full.slice(0,i);if(i<full.length)tt=setTimeout(step,42+Math.random()*22);else{tx.classList.remove('ty');typing=false;if(tx.__mo)tx.__mo.takeRecords()}},220)}
function watch(){var b=B();if(!b||b.__w)return;b.__w=1;ready(b);var tx=b.querySelector('.tx');
 tx.__mo=new MutationObserver(function(){if(typing)return;var f=tx.textContent;if(!f||f===lastFull)return;typeIn(tx,f)});tx.__mo.observe(tx,{childList:true,characterData:true,subtree:true})}
function hearts(b){for(var i=0;i<6;i++){var h=document.createElement('i');h.className='hp';h.innerHTML=i%2?SS:SH;h.style.setProperty('--dx',(Math.random()*90-45)+'px');h.style.setProperty('--dy',(-50-Math.random()*40)+'px');h.style.setProperty('--rt',(Math.random()*60-30)+'deg');h.style.animationDelay=(i*60)+'ms';b.appendChild(h);(function(x){setTimeout(function(){x.remove()},1300)})(h)}}
var raf=0,px=0,py=0;
document.addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;if(raf)return;raf=requestAnimationFrame(function(){raf=0;var b=B();if(!b)return;var r=b.getBoundingClientRect();if(!r.width)return;var dx=px-(r.left+r.width/2),dy=py-(r.top+r.height/2),d=Math.sqrt(dx*dx+dy*dy)||1,k=Math.min(1,d/220);var x=Math.round(dx/d*5*k),y=Math.round(dy/d*4*k);var ps=b.querySelectorAll('.p');for(var i=0;i<ps.length;i++){ps[i].style.setProperty('--x',x+'px');ps[i].style.setProperty('--y',y+'px')}})},{passive:true});
function wink(){var b=B();if(b&&!document.hidden){b.classList.add('wk');setTimeout(function(){b.classList.remove('wk')},380)}setTimeout(wink,9000+Math.random()*9000)}

setInterval(function(){if(!document.hidden)watch()},2500);watch();
}catch(e){}})();

/* чат-панель ИИ-помощника: плавное открытие, появление сообщений, «печатает…», подсказки, ответ на отправку (демо), подсветка кнопки. Без свечений. */
(function(){try{
var css=[
'.arqAiPn{animation:arqAiOpen .38s cubic-bezier(.2,1.2,.3,1) both;transform-origin:90% 100%}',
'@keyframes arqAiOpen{from{opacity:0;transform:translateY(16px) scale(.94)}to{opacity:1;transform:none}}',
'.arqAiMsg{animation:arqMsgIn .42s cubic-bezier(.2,1,.3,1) both;transform-origin:0 100%}',
'.arqAiMsg.arqAiMsgMe{align-self:flex-end;margin-left:auto;max-width:84%;transform-origin:100% 100%;background:var(--accent)!important;color:var(--on-accent)!important;border-color:transparent!important;border-radius:16px 16px 4px 16px!important}',
'@keyframes arqMsgIn{from{opacity:0;transform:translateY(10px) scale(.94)}to{opacity:1;transform:none}}',
'.arqAiHdIc{position:relative}',
'.arqAiHdIc::after{content:"";position:absolute;inset:0;border-radius:inherit;border:1.5px solid var(--accent,#a6b4a5);animation:arqAiRing 2.8s ease-out infinite;pointer-events:none}',
'@keyframes arqAiRing{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.55);opacity:0}}',
'.arqAiHdIc svg{animation:arqAiSp 6s ease-in-out infinite}',
'@keyframes arqAiSp{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(90deg) scale(1.12)}}',
'.arqAiInp{transition:border-color .2s ease,background .2s ease}',
'.arqAiInp:focus{outline:none!important;border-color:var(--accent-line,rgba(166,180,165,.4))!important}',
'.arqAiSend{transition:transform .15s ease,background .25s ease,color .25s ease}.arqAiSend:active{transform:scale(.86)}',
'.arqAiRow.has .arqAiSend{background:var(--accent)!important;color:var(--on-accent)!important}',
'.arqAiRow.has .arqAiSend svg{animation:arqAiGo 1.6s ease-in-out infinite}',
'@keyframes arqAiGo{0%,100%{transform:translateX(0)}50%{transform:translateX(2px)}}',
'.arqTy{display:inline-flex!important;gap:5px;align-items:center;padding:13px 15px!important;width:auto!important}',
'.arqTy i{display:block;width:6px;height:6px;border-radius:50%;background:var(--muted,#8b8d90);animation:arqTyD 1.1s ease-in-out infinite}',
'.arqTy i:nth-child(2){animation-delay:.15s}.arqTy i:nth-child(3){animation-delay:.3s}',
'@keyframes arqTyD{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-4px);opacity:1}}',
'.arqAiChips{display:flex;flex-wrap:wrap;gap:6px;padding:4px 0 2px;animation:arqMsgIn .5s .15s cubic-bezier(.2,1,.3,1) both}',
'.arqAiChips button{border:1px solid var(--line2);background:var(--field);color:var(--ink);border-radius:999px;padding:7px 12px;font:600 12px/1 Archivo,system-ui,sans-serif;cursor:pointer;transition:transform .15s ease,border-color .2s ease,background .2s ease}',
'.arqAiChips button:hover{transform:translateY(-1px);border-color:var(--accent-line,rgba(166,180,165,.4))}.arqAiChips button:active{transform:scale(.95)}',
'@media (prefers-reduced-motion:reduce){.arqAiPn,.arqAiMsg,.arqAiHdIc::after,.arqAiHdIc svg,.arqTy i,.arqAiChips{animation:none!important}}'
].join('\n');
var CH=['Что сегодня по плану?','Как мои привычки?','Сколько потратил за месяц?'];
var RP=['Принял. Скоро научусь отвечать по делу.','Запомнил запрос: когда помощник заработает, начну с него.','Пока я учусь, загляни в «Главное»: там весь день на виду.','Хороший вопрос. Подключусь к твоим данным совсем скоро.'];
var busy=false;
function scroll(b){b.scrollTop=b.scrollHeight}
function msg(b,cls,txt){var d=document.createElement('div');d.className='arqAiMsg '+cls;d.textContent=txt;b.appendChild(d);scroll(b);return d}
function send(pn,txt){txt=(txt||'').trim();if(!txt||busy)return;var b=pn.querySelector('.arqAiBody'),inp=pn.querySelector('.arqAiInp'),row=pn.querySelector('.arqAiRow');if(!b)return;busy=true;
 var ch=b.querySelector('.arqAiChips');if(ch)ch.remove();msg(b,'arqAiMsgMe',txt);if(inp){inp.value='';if(row)row.classList.remove('has')}
 var ty=document.createElement('div');ty.className='arqAiMsg arqAiMsgBot arqTy';ty.innerHTML='<i></i><i></i><i></i>';setTimeout(function(){b.appendChild(ty);scroll(b)},350);
 setTimeout(function(){ty.remove();msg(b,'arqAiMsgBot',RP[Math.floor(Math.random()*RP.length)]);busy=false},1500+Math.random()*700)}
function wire(){var pn=document.querySelector('.arqAiPn');if(!pn||pn.__w)return;pn.__w=1;
 if(!document.getElementById('arqBubCss3')){var s=document.createElement('style');s.id='arqBubCss3';s.textContent=css;document.head.appendChild(s)}
 var b=pn.querySelector('.arqAiBody'),inp=pn.querySelector('.arqAiInp'),row=pn.querySelector('.arqAiRow'),sb=pn.querySelector('.arqAiSend');
 if(b&&!b.querySelector('.arqAiChips')){var c=document.createElement('div');c.className='arqAiChips';for(var i=0;i<CH.length;i++){var x=document.createElement('button');x.type='button';x.textContent=CH[i];c.appendChild(x)}b.appendChild(c);
  c.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('button');if(t)send(pn,t.textContent)})}
 if(inp){inp.addEventListener('input',function(){if(row)row.classList.toggle('has',!!inp.value.trim())});inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(pn,inp.value)}})}
 if(sb)sb.addEventListener('click',function(){if(inp)send(pn,inp.value)})}
setInterval(function(){if(!document.hidden)wire()},1000);wire();
}catch(e){}})();

/* панель чата: на месте, с контуром, закрывается быстро; чатик парит всегда; починка Экономики и барабана */
(function(){try{
var BB='color-mix(in srgb,var(--card,#17191B) 94%,var(--ink,#E7E8E5) 6%)',BR='color-mix(in srgb,var(--ink,#E7E8E5) 38%,transparent)';
var c=[
'html #arqBub{animation:arqBubFl 4.6s ease-in-out infinite!important;--bb:'+BB+'}',
'@media (prefers-reduced-motion:reduce){html #arqBub{animation:arqBubFl 4.6s ease-in-out infinite!important}}',
'html body #arqBub .bb{background-color:var(--bb)!important;border:1.5px solid '+BR+'!important}',
'html body #arqBub .tl{background:var(--bb)!important;border-right:1.5px solid '+BR+'!important;border-bottom:1.5px solid '+BR+'!important}',
'html body #arqBub .e::before,html body #arqBub .e::after,html body #arqBub .e ~ .e::after{background:var(--bb)!important}',
'@media (min-width:900px){.arqAiPn{right:14px!important;left:auto!important;bottom:128px!important;max-height:min(420px,calc(100vh - 160px))!important}}',
'@media (max-width:899px){.arqAiPn{bottom:calc(186px + env(safe-area-inset-bottom,0px))!important}}',
'.arqAiPn{translate:none!important;background-color:'+BB+'!important;border:1.5px solid '+BR+'!important;will-change:opacity,transform;transition:opacity .16s ease-out,transform .16s ease-out,visibility 0s linear .16s!important}',
'body.arqAiOn .arqAiPn{transition:opacity .2s ease-out,transform .2s cubic-bezier(.2,.9,.3,1),visibility 0s linear 0s!important}',
'html .arqEco div[style*="repeat(3, minmax(0"] b,html .arqEco div[style*="repeat(3, minmax(0"] b span{font-size:15px!important;white-space:nowrap!important;letter-spacing:-.01em!important}',
'html .arqEco .arqDrum{clip-path:none!important}',
'html .arqEco .arqDrum div:not(.zz) .ac-card{filter:none!important}',
'html .arqEco .arqDrum #drRing>div[style*="opacity: 0.32"],html .arqEco .arqDrum #drRing>div[style*="opacity: 0;"]{visibility:hidden!important}',
'html .arqEco .arqDrum #drRing{will-change:transform}',
'html .tkCat .arqRh::after{transition:opacity .12s,transform .12s!important}',
'html .tkCat .arqRh:hover::after{transition:opacity .15s ease 1s,transform .15s ease 1s!important}',
'html .tkCat .arqRh:active::after{transition:none!important}',
'#arqSplash.off *{animation:none!important}'
].join('\n');
var st=document.createElement('style');st.id='arqBubCss5';st.textContent=c;document.head.appendChild(st);
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('.arqAiX');if(!t||e.__ok)return;e.stopImmediatePropagation();e.preventDefault();document.body.classList.remove('arqAiOn');requestAnimationFrame(function(){setTimeout(function(){var ev=new MouseEvent('click',{bubbles:true,cancelable:true});ev.__ok=1;t.dispatchEvent(ev)},40)})},true);
}catch(e){}})();
