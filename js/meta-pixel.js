/* Shared verbatim with Landing Page Klassa/js/meta-pixel.js. No customer fields. */
(function () {
  'use strict';
  if (window.klassaMeta) return;
  var PIXEL_ID = '1293603226231313';
  var sdkPromise;
  var sdkLoaded = false;
  var pageViewed = false;
  var optedOut = false;
  var sent = new Set();

  function blocked() {
    if (optedOut || window.klassaMarketingOptOut === true) return true;
    try {
      if (window.location.search && new URLSearchParams(window.location.search).get('pixel_debug') === '1') return false;
    } catch (_) { /* continue to normal checks */ }
    var host = window.location.hostname;
    if (window.location.protocol !== 'https:' || /(^localhost$|^127\.|^192\.168\.|^10\.|^172\.(1[6-9]|2\d|3[01])\.|:|\.(localhost|local|test|pages\.dev|vercel\.app|workers\.dev)$)/i.test(host)) return true;
    if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1') return true;
    try { return localStorage.getItem('klassa_marketing_opt_out') === '1'; } catch (_) { return false; }
  }

  function ready() {
    if (blocked()) return Promise.resolve(false);
    if (sdkLoaded) return Promise.resolve(true);
    if (!sdkPromise) {
      sdkPromise = new Promise(function (resolve) {
        var fbq = window.fbq;
        if (!fbq) {
          fbq = window.fbq = function () {
            if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
            else fbq.queue.push(arguments);
          };
          if (!window._fbq) window._fbq = fbq;
          fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
        }
        // Disable automatically inferred events and advanced matching/form scraping.
        fbq('set', 'autoConfig', false, PIXEL_ID);
        fbq('init', PIXEL_ID);
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        script.referrerPolicy = 'no-referrer';
        script.onload = function () { sdkLoaded = true; resolve(true); };
        script.onerror = function () { resolve(false); };
        document.head.appendChild(script);
      });
    }
    // Do not stall the payment redirect if the SDK is slow or blocked.
    return new Promise(function (resolve) {
      var timer = setTimeout(function () { resolve(false); }, 800);
      sdkPromise.then(function (loaded) { clearTimeout(timer); resolve(loaded); });
    });
  }

  async function pageView() {
    try {
      if (pageViewed || !(await ready()) || blocked()) return false;
      if (pageViewed) return false;
      window.fbq('trackSingle', PIXEL_ID, 'PageView');
      pageViewed = true;
      return true;
    } catch (_) { return false; }
  }

  async function track(event, data) {
    try {
      if (event !== 'Lead' && event !== 'Purchase') return false;
      var p = data && data.params;
      if (!p || !/^klassa-(lead|purchase)-INV-KLASSA-[a-z0-9-]+$/i.test(data.eventId)
        || !data.eventId.startsWith('klassa-' + event.toLowerCase() + '-')
        || !Array.isArray(p.content_ids) || p.content_ids.length !== 1
        || !['bulanan', 'semester', 'tahunan'].includes(p.content_ids[0])
        || !Number.isSafeInteger(p.value) || p.value <= 0 || p.currency !== 'IDR') return false;
      var key = 'klassa_meta:' + PIXEL_ID + ':' + data.eventId;
      if (!(await ready()) || blocked() || sent.has(key)) return false;
      try { if (localStorage.getItem(key)) return false; } catch (_) { /* memory dedupe remains */ }
      // Whitelist parameters, including fixed labels; never forward form/API objects wholesale.
      var names = { bulanan: 'Paket Bulanan', semester: 'Paket Semester', tahunan: 'Paket Tahunan' };
      window.fbq('trackSingle', PIXEL_ID, event, {
        content_ids: [p.content_ids[0]], content_name: names[p.content_ids[0]], value: p.value, currency: 'IDR'
      }, { eventID: data.eventId });
      sent.add(key);
      try { localStorage.setItem(key, '1'); } catch (_) { /* no durable browser storage */ }
      return true; // queued/dispatched, not proof Meta received it
    } catch (_) { return false; }
  }

  function optOut() {
    optedOut = true;
    window.klassaMarketingOptOut = true;
    try { localStorage.setItem('klassa_marketing_opt_out', '1'); } catch (_) { /* browser settings remain available */ }
    if (window.fbq) window.fbq('consent', 'revoke');
  }

  window.klassaMeta = { pageView: pageView, track: track, optOut: optOut };
  if (document.currentScript && document.currentScript.hasAttribute('data-pageview')) void pageView();
})();
