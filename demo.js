/* Тестовый доступ к трекеру: 5 минут. Работает только если трекер открыт по ссылке с demo=1
   (кнопка «Протестировать продукт» в боте). Статус берём с сервера бота, при сбое — из until в ссылке. */
(function () {
  var q = new URLSearchParams(location.search);
  if (q.get('demo') !== '1') return;
  var API = window.TRACKER_API || 'https://api.45-67-56-65.sslip.io';
  var BOT = 'luxmaxguide_bot';
  var tg = window.Telegram && window.Telegram.WebApp;
  var until = parseInt(q.get('until') || '0', 10) * 1000;
  var endAt = 0, admin = '', nextAt = 0, expired = false, cover, badge, timerId;

  function css(el, s) { el.style.cssText = s; return el; }
  function mk(tag, s, txt) { var e = document.createElement(tag); if (s) css(e, s); if (txt) e.textContent = txt; return e; }
  function mount(el) { (document.body || document.documentElement).appendChild(el); }

  // Закрывающая плашка на время проверки, чтобы трекер не мелькал без доступа.
  cover = mk('div', 'position:fixed;inset:0;z-index:2147483646;background:#0F1115;color:#cfd3dc;display:flex;align-items:center;justify-content:center;font:15px system-ui,sans-serif', 'Проверяем доступ…');
  function mountCover() { if (!document.body) return document.addEventListener('DOMContentLoaded', mountCover); mount(cover); }
  mountCover();

  function hideCover() { if (cover && cover.parentNode) cover.parentNode.removeChild(cover); }

  function openLink(url) {
    try { if (tg && tg.openTelegramLink) return tg.openTelegramLink(url); } catch (e) {}
    window.open(url, '_blank');
  }

  function fmt(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000)), m = Math.floor(s / 60), r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  function showBadge() {
    if (badge) return;
    badge = mk('div', 'position:fixed;top:8px;left:8px;z-index:2147483000;padding:5px 11px;border-radius:999px;background:rgba(15,17,21,.92);color:#fff;border:1px solid rgba(255,255,255,.22);font:700 13px system-ui,sans-serif;letter-spacing:.02em;pointer-events:none;box-shadow:0 2px 10px rgba(0,0,0,.35)');
    mount(badge);
  }

  function lock() {
    if (expired) return;
    expired = true;
    clearInterval(timerId);
    if (badge && badge.parentNode) badge.parentNode.removeChild(badge);
    var days = nextAt ? Math.max(1, Math.ceil((nextAt * 1000 - Date.now()) / 86400000)) : 4;
    var box = mk('div', 'position:fixed;inset:0;z-index:2147483647;background:#0F1115;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;font:16px/1.5 system-ui,sans-serif');
    box.id = 'demo-lock';
    box.appendChild(mk('div', 'font-size:44px', '⏱'));
    box.appendChild(mk('b', 'font-size:22px', 'Тест закончился'));
    box.appendChild(mk('div', 'max-width:22em;color:#cfd3dc', 'Новый пробный просмотр откроется через ' + days + ' дн. Чтобы получить больше тестирования, свяжитесь с нашим администратором.'));
    var btnS = 'cursor:pointer;min-height:48px;border:0;border-radius:999px;padding:0 28px;font:700 15px system-ui,sans-serif;';
    var b1 = mk('button', btnS + 'background:#fff;color:#0F1115', '💳 Выбрать тариф');
    b1.onclick = function () { openLink('https://t.me/' + BOT); };
    box.appendChild(b1);
    if (admin) {
      var b2 = mk('button', btnS + 'background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.4)', '✍️ Написать администратору');
      b2.onclick = function () { openLink('https://t.me/' + admin); };
      box.appendChild(b2);
    }
    var b3 = mk('button', 'cursor:pointer;border:0;background:transparent;color:#9aa1af;font:14px system-ui,sans-serif;padding:8px', 'Закрыть');
    b3.onclick = function () { try { tg && tg.close(); } catch (e) {} };
    box.appendChild(b3);
    hideCover();
    mount(box);
    try { document.documentElement.style.overflow = 'hidden'; } catch (e) {}
    // Если плашку удалили из страницы, возвращаем.
    var mo = new MutationObserver(function () { if (!document.getElementById('demo-lock')) mount(box); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  function tick() {
    var left = endAt - Date.now();
    if (left <= 0) return lock();
    if (badge) badge.textContent = '⏱ ' + fmt(left);
  }

  function start(leftSec) {
    endAt = Date.now() + leftSec * 1000;
    hideCover();
    showBadge();
    tick();
    clearInterval(timerId);
    timerId = setInterval(tick, 500);
  }

  function apply(st) {
    if (st.admin) admin = String(st.admin).replace(/^@/, '');
    if (st.next_at) nextAt = st.next_at;
    if (st.state === 'paid') { hideCover(); return; }
    if (st.state === 'active' && st.left > 0) return start(st.left);
    lock();
  }

  function fallback() {
    var left = until ? Math.floor((until - Date.now()) / 1000) : 0;
    if (left > 0) start(left); else lock();
  }

  function check() {
    var init = (tg && tg.initData) || '';
    if (!init) return fallback();
    var done = false;
    var t = setTimeout(function () { if (!done) { done = true; fallback(); } }, 5000);
    fetch(API + '/api/tracker/demo', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ initData: init }) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (done) return; done = true; clearTimeout(t); if (j && j.ok) apply(j); else fallback(); })
      .catch(function () { if (done) return; done = true; clearTimeout(t); fallback(); });
  }

  try { if (tg) { tg.ready(); tg.expand(); } } catch (e) {}
  check();
  // Повторная сверка с сервером, когда человек возвращается в приложение.
  document.addEventListener('visibilitychange', function () { if (!document.hidden && !expired) check(); });
})();
