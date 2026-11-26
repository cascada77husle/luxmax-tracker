/* ARQON: чатик-помощник вместо робота: парит, моргает, смотрит по сторонам, фраза меняется */
(function(){try{
var css=[
'#arqAiBotWrap{right:14px!important;gap:0!important;bottom:calc(92px + env(safe-area-inset-bottom,0px))!important}','@media (min-width:900px){#arqAiBotWrap{bottom:28px!important}}',
'#arqAiBotWrap>img{display:none!important}',
'#arqBub{position:relative;width:200px;animation:arqBubFl 4.2s ease-in-out infinite;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}',
'@keyframes arqBubFl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}',
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
'html.lt #arqBub .bb{background-color:#1a1c1e}html.lt #arqBub .tl{background:#1a1c1e}',
'html.lt #arqBub .e{background:#000;box-shadow:0 0 0 1.5px #c9c9c6}html.lt #arqBub .e::after{background:rgba(255,255,255,.1)}',
'html.lt #arqBub .p{background:#e7e8e5}html.lt #arqBub .p::after{background:#000}html.lt #arqBub .p::before{background:rgba(0,0,0,.6)}',
'#arqBub .st{position:absolute;pointer-events:none;color:#a6b4a5;animation:arqBubTw 3.2s ease-in-out infinite}',
'#arqBub .s1{right:-9px;top:-15px;width:21px;height:21px}#arqBub .s2{left:-11px;top:9px;width:11px;height:11px;color:#e7e8e5;animation-delay:-1.1s}#arqBub .s3{right:-13px;bottom:14px;width:9px;height:9px;animation-delay:-2s}#arqBub .s4{left:38px;top:-13px;width:8px;height:8px;color:#e7e8e5;animation-delay:-.6s}',
'@keyframes arqBubTw{0%,100%{transform:scale(.55) rotate(0deg);opacity:.5}50%{transform:scale(1) rotate(45deg);opacity:1}}',
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
setInterval(mount,1500);mount();
setInterval(function(){if(!document.hidden&&bub)setText(pick(),true)},45000);
}catch(e){}})();
