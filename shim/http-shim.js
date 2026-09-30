/*
 * Offline backend for the fleet and twin UIs of the static demo (demo/README.md). Loaded as a classic script before
 * the app bundle, it replaces window.fetch for /api/* and /twin/* and window.EventSource:
 *   - GET  → the response recorded from the running stack (demo/snapshot/<fleet|acs1|acs2>/gets.json);
 *   - writes → accepted and not applied (a notice says so), except fork-local / inherit, kept in memory;
 *   - streams → the recorded frames replayed with their original spacing, in a loop;
 *   - a simulated card tap on a twin (POST /api/sim/event) → the recorded reaction of that twin to that card.
 * Recorded instants are shifted to "now", so freshness and online indicators behave as on the live system.
 * The page says which snapshot it serves: <script src="../shim/http-shim.js" data-app="fleet|device">.
 */
(function () {
  'use strict';
  var script = document.currentScript;
  var app = (script && script.dataset.app) || 'fleet';
  var device = new URLSearchParams(location.search).get('d') || 'acs1';
  var scope = app === 'fleet' ? 'fleet' : device;
  var root = new URL('../snapshot/', location.href);
  var realFetch = window.fetch.bind(window);
  var RealEventSource = window.EventSource;
  if (app === 'studio') { // the Studio has its own in-browser backend (VITE_DEMO): only the banner
    var onReady = function () { banner('Offline demo · edits and commits stay in this browser'); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady); else onReady();
  }

  var json = function (p) { return realFetch(new URL(p, root)).then(function (r) { if (!r.ok) throw new Error(p + ' ' + r.status); return r.json(); }); };
  var ready = app === 'studio' ? null : Promise.all([json(scope + '/gets.json'), json('streams/' + scope + '.json'), json('streams/taps.json'), json('meta.json')]);

  // ---- time shift -----------------------------------------------------------------------------------------------
  var ISO = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(Z|[+-]\d\d:\d\d)$/;
  var DAY = 86400000;
  function shift(v, delta, around) {
    if (typeof v === 'number') return v > 1e12 && Math.abs(v - around) < 3 * DAY ? v + delta : v;
    if (typeof v === 'string') { if (ISO.test(v)) { var t = Date.parse(v); if (Math.abs(t - around) < 3 * DAY) return new Date(t + delta).toISOString(); } return v; }
    if (Array.isArray(v)) return v.map(function (x) { return shift(x, delta, around); });
    if (v && typeof v === 'object') { var o = {}; for (var k in v) o[k] = shift(v[k], delta, around); return o; }
    return v;
  }

  // ---- notices --------------------------------------------------------------------------------------------------
  function notice(text) {
    var el = document.getElementById('demo-notice');
    if (!el) return;
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(notice.t);
    notice.t = setTimeout(function () { el.classList.remove('show'); }, 3500);
  }
  function banner(text) {
    var css = document.createElement('style');
    css.textContent = '#demo-bar{position:fixed;right:12px;bottom:12px;z-index:99999;font:12px/1.4 system-ui,sans-serif;background:#1f2937;color:#f9fafb;border-radius:8px;padding:6px 10px;box-shadow:0 2px 8px rgba(0,0,0,.25);display:flex;gap:10px;align-items:center}#demo-bar a{color:#93c5fd}#demo-bar .dot{width:8px;height:8px;border-radius:50%;background:#f59e0b;animation:demo-p 1.6s infinite}@keyframes demo-p{50%{opacity:.3}}#demo-notice{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:99999;font:13px system-ui,sans-serif;background:#7c2d12;color:#fff;padding:8px 14px;border-radius:8px;opacity:0;transition:opacity .2s;pointer-events:none}#demo-notice.show{opacity:1}';
    document.head.appendChild(css);
    var bar = document.createElement('div');
    bar.id = 'demo-bar';
    bar.innerHTML = '<span class="dot"></span><span>' + text + '</span><a href="../">demo home</a><a href="#" title="Hide" onclick="this.parentNode.remove();return false">×</a>';
    var n = document.createElement('div');
    n.id = 'demo-notice';
    document.body.appendChild(bar);
    document.body.appendChild(n);
  }
  if (app === 'studio') return;
  var bannerText = 'Offline demo · recorded run replayed' + (app === 'device' ? ' · ' + device.toUpperCase() : '');
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { banner(bannerText); }); else banner(bannerText);

  // ---- state kept in memory (RQ1.4: fork-local / inherit) ------------------------------------------------------
  var overrides = {};
  function patched(key, body) {
    if (key === '/api/fleet-machines/inheritance' && body && Array.isArray(body.devices)) {
      return Object.assign({}, body, { devices: body.devices.map(function (d) { return overrides[d.id] ? Object.assign({}, d, { status: overrides[d.id] }) : d; }) });
    }
    if (key === '/api/pip/projection') {
      // a commit made in the Studio page of this demo (same origin) is what the fleet would pull next
      try { var p = JSON.parse(localStorage.getItem('demo-projection-v1') || 'null'); if (p && p.document) return p.document; } catch (e) { /* none */ }
    }
    return body;
  }

  function respond(status, body) {
    return new Response(body === undefined ? '' : JSON.stringify(body), { status: status, headers: { 'Content-Type': 'application/json' } });
  }

  window.fetch = function (input, init) {
    var url = new URL(typeof input === 'string' ? input : input.url, location.href);
    if (url.origin !== location.origin || !/^\/(api|twin)\//.test(url.pathname)) return realFetch(input, init);
    var method = ((init && init.method) || (typeof input !== 'string' && input.method) || 'GET').toUpperCase();
    return ready.then(function (all) {
      var gets = all[0], meta = all[3];
      var key = url.pathname + url.search;
      if (method === 'GET') {
        var body = key in gets ? gets[key] : url.pathname in gets ? gets[url.pathname] : undefined;
        if (body === undefined) {
          // same path with another query (e.g. a different limit): take the recorded one
          for (var k in gets) if (k.split('?')[0] === url.pathname) { body = gets[k]; break; }
        }
        if (body === undefined) return respond(404, { error: 'not_recorded', message: key + ' was not recorded for the offline demo' });
        var capturedAt = Date.parse(meta.capturedAt);
        return respond(200, shift(patched(url.pathname, body), Date.now() - capturedAt, capturedAt));
      }
      var m = /^\/api\/devices\/([^/]+)\/(fork-local|inherit)$/.exec(url.pathname);
      if (m) { overrides[decodeURIComponent(m[1])] = m[2] === 'fork-local' ? 'overriding' : 'inheriting'; notice(m[1].toUpperCase() + (m[2] === 'fork-local' ? ' now runs its own statechart (override)' : ' is back under fleet control')); return respond(200, { ok: true }); }
      if (url.pathname === '/api/sim/event') {
        var payload = {};
        try { payload = JSON.parse((init && init.body) || '{}'); } catch (e) { /* no body */ }
        var tag = payload.payload && payload.payload.tagId;
        if (tag) { playTap(tag); return respond(200, { accepted: true }); }
        notice('Offline demo: only card taps are replayed');
        return respond(200, { accepted: false });
      }
      notice('Offline demo: this change is not applied (' + method + ' ' + url.pathname + ')');
      return respond(200, {});
    });
  };

  // ---- streams -------------------------------------------------------------------------------------------------
  var sources = [];
  function FakeEventSource(url) {
    this.url = url;
    this.readyState = 1;
    this.listeners = {};
    this.onmessage = null; this.onerror = null; this.onopen = null;
    sources.push(this);
    startLoop();
  }
  FakeEventSource.prototype.addEventListener = function (type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); };
  FakeEventSource.prototype.removeEventListener = function (type, fn) { this.listeners[type] = (this.listeners[type] || []).filter(function (f) { return f !== fn; }); };
  FakeEventSource.prototype.close = function () { this.readyState = 2; sources = sources.filter(function (s) { return s !== this; }, this); };
  FakeEventSource.prototype.dispatch = function (event, data) {
    var e = { type: event, data: JSON.stringify(data) };
    (this.listeners[event] || []).forEach(function (fn) { fn(e); });
    if (event === 'message' && this.onmessage) this.onmessage(e);
  };
  window.EventSource = function (url, opts) {
    var u = new URL(url, location.href);
    if (u.origin !== location.origin || !/^\/(api|twin)\//.test(u.pathname)) return new RealEventSource(url, opts);
    return new FakeEventSource(url);
  };

  // the loop plays the whole recording; a simulated tap pauses it and plays that tap's segment
  var seqOffset = 0, loopTimer = null, looping = false;
  function emit(frame, start) {
    var original = start + frame.t;
    var data = shift(frame.data, Date.now() - original, original);
    if (data && typeof data === 'object' && typeof data.seq === 'number') data = Object.assign({}, data, { seq: data.seq + seqOffset });
    sources.forEach(function (s) { s.dispatch(frame.event, data); });
  }
  function play(frames, start, from, to, done) {
    var list = frames.filter(function (f) { return f.t >= from && f.t <= to; });
    var i = 0, t0 = Date.now();
    function step() {
      while (i < list.length && list[i].t - from <= Date.now() - t0) emit(list[i++], start);
      if (i < list.length) loopTimer = setTimeout(step, Math.min(250, list[i].t - from - (Date.now() - t0)));
      else done();
    }
    step();
  }
  function startLoop() {
    if (looping) return;
    looping = true;
    ready.then(function (all) {
      var rec = all[1];
      var end = rec.frames.length ? rec.frames[rec.frames.length - 1].t + 3000 : 10000;
      (function again() {
        play(rec.frames, rec.start, 0, end, function () { seqOffset += 100000; loopTimer = setTimeout(again, 3000); });
      })();
    });
  }
  function playTap(tag) {
    ready.then(function (all) {
      var rec = all[1], taps = all[2];
      var t = taps.filter(function (x) { return x.device === device && x.tag === tag; })[0]
        || taps.filter(function (x) { return x.device === device && x.principal === null; })[0];
      if (!t) { notice('No recorded tap for ' + tag + ' on ' + device.toUpperCase()); return; }
      clearTimeout(loopTimer);
      notice('Replaying the recorded tap of ' + (t.principal || 'an unknown card') + ' → ' + t.reason);
      play(rec.frames, rec.start, t.from, t.to, function () { looping = false; startLoop(); });
    });
  }
})();
