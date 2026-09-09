/* Social share bar — one file, works on every page.
   Fills itself in from the page's own title/URL, so no per-page setup needed. */
(function () {
  var bars = document.querySelectorAll('[data-share]');
  if (!bars.length) return;

  var url = encodeURIComponent(location.href);
  var title = encodeURIComponent(document.title.replace(/ — AIGuideDZ$/, ''));

  var links = [
    { name: 'X', icon: '𝕏', href: 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url },
    { name: 'Facebook', icon: '📘', href: 'https://www.facebook.com/sharer/sharer.php?u=' + url },
    { name: 'WhatsApp', icon: '💬', href: 'https://api.whatsapp.com/send?text=' + title + '%20' + url },
    { name: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url }
  ];

  bars.forEach(function (bar) {
    var label = document.createElement('span');
    label.className = 'share-label';
    label.textContent = bar.getAttribute('data-label') || 'Share:';
    bar.appendChild(label);

    links.forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'share-btn';
      a.setAttribute('aria-label', 'Share on ' + l.name);
      a.textContent = l.icon;
      bar.appendChild(a);
    });

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'share-btn share-copy';
    copyBtn.setAttribute('aria-label', 'Copy link');
    copyBtn.textContent = '🔗';
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(location.href).then(function () {
        var original = copyBtn.textContent;
        copyBtn.textContent = '✓';
        setTimeout(function () { copyBtn.textContent = original; }, 1500);
      });
    });
    bar.appendChild(copyBtn);
  });
})();
