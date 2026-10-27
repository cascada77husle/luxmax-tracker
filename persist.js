/* Сохранение данных разделов, у которых нет своего хранилища (учёба, спорт, питание, расписание, обучение, бизнес-инструменты).
   Состояние кладётся в localStorage под ключом tracker:c:<имя>, поэтому sync.js сам переносит его на сервер внутри Telegram. */
(function () {
  var WL = { Study: 1, Sport: 1, Nutrition: 1, Library: 1, Languages: 1, Learning: 1, Planner: 1, BizTools: 1 };
  var EX = { Planner: ['sel', 'err', 'fs', 'fe', 'fn'], Learning: ['nName'], Languages: ['nw', 'nt', 'newLang'] };
  var PRE = 'tracker:c:';
  function go() {
    var D = window.DCLogic; if (!D || !D.prototype) return false;
    if (D.prototype.__persist) return true; D.prototype.__persist = 1;
    var oSet = D.prototype.setState, oMount = D.prototype.componentDidMount;
    D.prototype.componentDidMount = function () {
      try { if (oMount) oMount.apply(this, arguments); } catch (e) { }
      try {
        var n = this.__host && this.__host.__name;
        if (n && WL[n] && !this.__restored) {
          this.__restored = 1;
          var raw = localStorage.getItem(PRE + n);
          if (raw) {
            var sv = JSON.parse(raw), base = typeof this.init === 'function' ? this.init() : {};
            (EX[n] || []).forEach(function (k) { delete sv[k]; });
            oSet.call(this, Object.assign({}, base, sv, { ready: true }));
          }
        }
      } catch (e) { }
    };
    D.prototype.setState = function (t, cb) {
      oSet.call(this, t, cb);
      try {
        var n = this.__host && this.__host.__name;
        if (!n || !WL[n] || !this.__restored) return;
        clearTimeout(this.__pt); var self = this;
        this.__pt = setTimeout(function () { save(self, n); }, 500);
        if (!D.__hook) { D.__hook = 1; var fl = function () { if (document.visibilityState === 'hidden' || document.visibilityState === undefined) (D.__all || []).forEach(function (p) { clearTimeout(p[0].__pt); save(p[0], p[1]); }); }; document.addEventListener('visibilitychange', fl); window.addEventListener('pagehide', fl); }
        D.__all = D.__all || []; if (!D.__all.some(function (p) { return p[0] === self; })) D.__all.push([self, n]);
      } catch (e) { }
    };
    function save(self, n) {
      try {
        var s = self.state || {}, o = {}, ex = EX[n] || [];
        Object.keys(s).forEach(function (k) { if (k.indexOf('__') !== 0 && typeof s[k] !== 'function' && ex.indexOf(k) < 0) o[k] = s[k]; });
        var js = JSON.stringify(o); if (js.length < 150000) localStorage.setItem(PRE + n, js);
      } catch (e) { }
    }
    return true;
  }
  if (!go()) { var t = setInterval(function () { if (go()) clearInterval(t); }, 20); setTimeout(function () { clearInterval(t); }, 15000); }
})();
