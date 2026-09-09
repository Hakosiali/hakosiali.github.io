/* Reader polls — one click, persisted for every visitor via /poll.php. */
(function () {
  var widgets = document.querySelectorAll('[data-poll]');
  if (!widgets.length) return;

  function votedKey(id) { return 'poll_voted_' + id; }

  function renderResults(el, results, myOption, question, options) {
    var total = 0;
    options.forEach(function (o) { total += results[o.key] || 0; });
    var html = '<p class="poll-q">🗳️ ' + question + '</p><div class="poll-results">';
    options.forEach(function (o) {
      var count = results[o.key] || 0;
      var pct = total > 0 ? Math.round((count / total) * 100) : 0;
      html += '<div class="poll-bar-row' + (o.key === myOption ? ' mine' : '') + '">' +
        '<span class="poll-bar-label">' + o.emoji + ' ' + o.label + (o.key === myOption ? ' (you)' : '') + '</span>' +
        '<div class="poll-bar-track"><div class="poll-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="poll-bar-pct">' + pct + '%</span></div>';
    });
    html += '</div><p class="poll-total">' + total + ' vote' + (total === 1 ? '' : 's') + ' so far</p>';
    el.innerHTML = html;
  }

  widgets.forEach(function (el) {
    var id = el.getAttribute('data-poll');
    var question = el.getAttribute('data-question') || '';
    var options;
    try { options = JSON.parse(el.getAttribute('data-options')); } catch (e) { return; }
    if (!options || !options.length) return;

    var myVote = null;
    try { myVote = localStorage.getItem(votedKey(id)); } catch (e) {}

    if (myVote) {
      fetch('/poll.php?poll=' + encodeURIComponent(id))
        .then(function (r) { return r.json(); })
        .then(function (data) { renderResults(el, data.results || {}, myVote, question, options); })
        .catch(function () {});
      return;
    }

    var html = '<p class="poll-q">🗳️ ' + question + '</p><div class="poll-options">';
    options.forEach(function (o) {
      html += '<button type="button" class="poll-opt" data-key="' + o.key + '">' + o.emoji + ' ' + o.label + '</button>';
    });
    html += '</div>';
    el.innerHTML = html;

    el.querySelectorAll('.poll-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-key');
        fetch('/poll.php?poll=' + encodeURIComponent(id) + '&option=' + encodeURIComponent(key) + '&vote=1')
          .then(function (r) { return r.json(); })
          .then(function (data) {
            try { localStorage.setItem(votedKey(id), key); } catch (e) {}
            renderResults(el, data.results || {}, key, question, options);
          })
          .catch(function () {});
      });
    });
  });
})();
