(function(){try{
var m=navigator.userAgent.match(/ARQONApp\/(\d+)/);if(!m)return;var cur=+m[1];
fetch('app-version.json?x='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
if(!j||!(j.versionCode>cur))return;
var b=document.createElement('div');
b.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;padding:12px 14px;border-radius:14px;background:#fff;color:#0b0c0e;font:600 14px system-ui,sans-serif;display:flex;gap:10px;align-items:center;box-shadow:0 8px 30px rgba(0,0,0,.5)';
b.innerHTML='<span style="flex:1">Вышла новая версия приложения ARQON</span><a style="background:#0b0c0e;color:#fff;padding:8px 12px;border-radius:10px;text-decoration:none" href="'+j.apk+'">Обновить</a><button style="border:0;background:none;font-size:18px;color:#555">×</button>';
b.querySelector('button').onclick=function(){b.remove()};
document.body.appendChild(b);
}).catch(function(){});
}catch(e){}})();
