// ============================================================
// HERO TERMINAL — typewriter "deploy log" loop
// Edit LOG_LINES below to change what the terminal displays.
// type: 'cmd' | 'ok' | 'plain'
// ============================================================

(function () {
  var el = document.getElementById('terminalBody');
  if (!el) return;

  var LOG_LINES = [
    { type: 'cmd',   text: '$ deploy --project QTICKETS' },
    { type: 'ok',    text: '✓ 54 REST APIs shipped — Etihad Arena integration' },
    { type: 'ok',    text: '✓ Payment gateways connected: PayFort, Tamara' },
    { type: 'plain', text: '' },
    { type: 'cmd',   text: '$ optimize --target api-response-time' },
    { type: 'ok',    text: '✓ 30.2s → 2.4s average response time' },
    { type: 'plain', text: '' },
    { type: 'cmd',   text: '$ report --client RBI-compliance' },
    { type: 'ok',    text: '✓ Weekly + monthly submissions automated' },
    { type: 'plain', text: '' },
    { type: 'cmd',   text: '$ ship --states 7 --banks 5' },
    { type: 'ok',    text: '✓ Yes Bank, Kotak Bank + govt platforms live' },
    { type: 'plain', text: '' },
    { type: 'cmd',   text: '$ deploy --region Nepal' },
    { type: 'ok',    text: '… market module in progress' }
  ];

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    el.textContent = LOG_LINES.map(function (l) { return l.text; }).join('\n');
    return;
  }

  var lineIndex = 0;
  var charIndex = 0;
  var typedHTML = '';

  function classFor(type) {
    if (type === 'cmd') return 'line-cmd';
    if (type === 'ok') return 'line-ok';
    return '';
  }

  function typeStep() {
    if (lineIndex >= LOG_LINES.length) {
      // pause, then restart the loop
      setTimeout(function () {
        typedHTML = '';
        lineIndex = 0;
        charIndex = 0;
        el.innerHTML = '';
        typeStep();
      }, 2200);
      return;
    }

    var current = LOG_LINES[lineIndex];
    var full = current.text;

    if (charIndex <= full.length) {
      var partial = full.slice(0, charIndex);
      var cls = classFor(current.type);
      el.innerHTML =
        typedHTML +
        (cls ? '<span class="' + cls + '">' + escapeHTML(partial) + '</span>' : escapeHTML(partial)) +
        '<span class="terminal__cursor"></span>';
      charIndex++;
      setTimeout(typeStep, current.type === 'cmd' ? 34 : 16);
    } else {
      var cls2 = classFor(current.type);
      typedHTML += (cls2 ? '<span class="' + cls2 + '">' + escapeHTML(full) + '</span>' : escapeHTML(full)) + '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(typeStep, full === '' ? 60 : 260);
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }

  typeStep();
})();
