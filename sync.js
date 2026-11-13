/* Синхронизация данных трекера с сервером бота (внутри Telegram по подписи initData, в обычном браузере по токену из ссылки бота).
   Всё, что трекер хранит в localStorage (tracker:, projects:, board:, boardlist:, boardcur:),
   дублируется на сервер и подтягивается на другом устройстве. Без сервера всё работает как раньше. */
(function () {
  try {
    var API = window.TRACKER_API || 'https://api.45-67-56-65.sslip.io';
    var tg = window.Telegram && window.Telegram.WebApp, init = tg && tg.initData, WK = 'arqon:web', web = '';
    try { web = window.localStorage.getItem(WK) || ''; } catch (e) { web = ''; }
    /* Вход из обычного браузера: ссылка из бота (#login=…) меняется на сессионный токен, дальше он заменяет initData. */
    var lm = /[#&]login=([^&]+)/.exec(location.hash || '');
    if (!init && lm && window.fetch) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { }
      fetch(API + '/api/tracker/web_login', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ link: decodeURIComponent(lm[1]) }) })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (r && r.ok && r.token) { try { window.localStorage.setItem(WK, r.token); } catch (e) { } }
          if (r && r.ok) location.reload();
        }).catch(function () { });
      return;
    }
    if ((!init && !web) || !window.fetch) return;
    var LS = window.localStorage, PRE = /^(tracker:|projects:|board:|boardlist:|boardcur:)/;
    var set0 = Storage.prototype.setItem, ready = false, applying = false, boot = {}, timers = {};
    var atOf = function (k) { return +(LS.getItem('sync:at:' + k) || 0); };
    var post = function (path, body, keep) {
      if (init) body.initData = init; else body.webToken = web;
      return fetch(API + '/api/tracker/' + path, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(body), keepalive: !!keep }).then(function (r) {
        if (!r.ok) { var e = new Error('http ' + r.status); e.status = r.status; throw e; } /* 4xx/5xx — это ошибка, а не успех */
        return r.json();
      });
    };
    /* Очередь отправки по ключу: одновременно в полёте один запрос на ключ (порядок сохраняется), одинаковое значение повторно не шлём,
       при сбое сети повторяем с нарастающей паузой и сразу при возврате online. */
    var sent = {}, busy = {}, dirty = {}, fails = {}, rt = {};
    var fail = function (k, e) {
      fails[k] = (fails[k] || 0) + 1;
      var s = e && e.status; if (s >= 400 && s < 500 && s !== 408 && s !== 429) return; /* сервер отклонил запрос: бесконечно не повторяем, следующая правка отправит снова */
      clearTimeout(rt[k]); rt[k] = setTimeout(function () { push(k); }, Math.min(30000, 2000 * fails[k]));
    };
    var push = function (k, keep) {
      var v = LS.getItem(k); if (v == null) return;
      if (sent[k] === v) return;
      if (busy[k] && !keep) { dirty[k] = 1; return; }
      busy[k] = 1;
      post('push', { key: k, value: v, at: atOf(k) }, keep && v.length < 60000).then(function () {
        busy[k] = 0; sent[k] = v; fails[k] = 0;
        if (dirty[k]) { dirty[k] = 0; push(k); }
      }).catch(function (e) { busy[k] = 0; dirty[k] = 0; fail(k, e); });
    };
    window.addEventListener('pagehide', function () { /* закрытие/перезагрузка: отправить всё неотправленное */
      for (var i = 0; i < LS.length; i++) { var k = LS.key(i); if (PRE.test(k)) { clearTimeout(timers[k]); push(k, true); } }
    });
    window.addEventListener('online', function () {
      for (var i = 0; i < LS.length; i++) { var k = LS.key(i); if (PRE.test(k)) push(k); }
    });
    var schedule = function (k) { clearTimeout(timers[k]); timers[k] = setTimeout(function () { push(k); }, 1500); };
    Storage.prototype.setItem = function (k, v) {
      if (ready && this === LS && !applying && PRE.test(k) && LS.getItem(k) === String(v)) return; /* то же значение: не пишем и не отправляем */
      set0.call(this, k, v);
      if (this === LS && !applying && PRE.test(k)) {
        if (!ready) { boot[k] = 1; return; } /* запись до ответа сервера не считается правкой: иначе пустое состояние нового устройства затирало бы данные на сервере */
        set0.call(LS, 'sync:at:' + k, String(Date.now())); schedule(k);
      }
    };
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState !== 'hidden') return; try { if (window.__trackerFlush) window.__trackerFlush(); } catch (e) { }
      Object.keys(timers).forEach(function (k) { clearTimeout(timers[k]); push(k, true); }); timers = {};
    });
    var finish = function (items) {
      var changed = false; items = items || {};
      applying = true;
      Object.keys(items).forEach(function (k) {
        if (PRE.test(k) && items[k].at > atOf(k)) { set0.call(LS, k, items[k].v); set0.call(LS, 'sync:at:' + k, String(items[k].at)); changed = true; delete boot[k]; }
      });
      applying = false;
      var n = Date.now();
      Object.keys(boot).forEach(function (k) { set0.call(LS, 'sync:at:' + k, String(n)); }); boot = {};
      for (var i = 0; i < LS.length; i++) {
        var k = LS.key(i); if (!PRE.test(k)) continue;
        var sa = atOf(k);
        if (!items[k] || sa > items[k].at) { if (!sa) { sa = n; set0.call(LS, 'sync:at:' + k, String(sa)); } schedule(k); }
      }
      ready = true;
      if (changed) {
        var last = 0; try { last = +(sessionStorage.getItem('sync:rl') || 0); } catch (e) { last = 0; }
        if (Date.now() - last > 60000) { try { sessionStorage.setItem('sync:rl', String(Date.now())); } catch (e) { /* ok */ } location.reload(); }
      }
    };
    /* Пока сервер не ответил, ничего не отправляем: иначе пустое состояние нового устройства или сбой связи затрут данные на сервере. Пробуем снова. */
    var tries = 0;
    var pull = function () {
      post('pull', {}).then(function (r) {
        if (ready) return;
        if (r && r.ok) finish(r.items || {}); else retry();
      }).catch(retry);
    };
    var retry = function () { if (ready) return; tries++; setTimeout(pull, Math.min(30000, 3000 * tries)); };
    pull();
    window.__trackerSync = function () { return { ready: ready, tries: tries }; };
  } catch (e) { /* синхронизация не должна ломать трекер */ }
})();
