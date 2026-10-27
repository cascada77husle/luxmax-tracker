/* Синхронизация данных трекера с сервером бота (только внутри Telegram, по подписи initData).
   Всё, что трекер хранит в localStorage (tracker:, projects:, board:, boardlist:, boardcur:),
   дублируется на сервер и подтягивается на другом устройстве. Без сервера всё работает как раньше. */
(function () {
  try {
    var API = window.TRACKER_API || 'https://api.45-67-56-65.sslip.io';
    var tg = window.Telegram && window.Telegram.WebApp, init = tg && tg.initData;
    if (!init || !window.fetch) return;
    var LS = window.localStorage, PRE = /^(tracker:|projects:|board:|boardlist:|boardcur:)/;
    var set0 = Storage.prototype.setItem, ready = false, applying = false, boot = {}, timers = {};
    var atOf = function (k) { return +(LS.getItem('sync:at:' + k) || 0); };
    var post = function (path, body, keep) {
      body.initData = init;
      return fetch(API + '/api/tracker/' + path, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(body), keepalive: !!keep }).then(function (r) { return r.json(); });
    };
    var push = function (k, keep) {
      var v = LS.getItem(k); if (v == null) return;
      post('push', { key: k, value: v, at: atOf(k) }, keep && v.length < 60000).catch(function () {});
    };
    var schedule = function (k) { clearTimeout(timers[k]); timers[k] = setTimeout(function () { push(k); }, 1500); };
    Storage.prototype.setItem = function (k, v) {
      set0.call(this, k, v);
      if (this === LS && !applying && PRE.test(k)) {
        if (!ready) { boot[k] = 1; set0.call(LS, 'sync:at:' + k, String(Date.now())); return; }
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
    var timeout = setTimeout(function () { if (!ready) finish({}); }, 5000);
    post('pull', {}).then(function (r) { clearTimeout(timeout); if (!ready) finish(r && r.ok ? r.items : {}); }).catch(function () { clearTimeout(timeout); if (!ready) finish({}); });
  } catch (e) { /* синхронизация не должна ломать трекер */ }
})();
