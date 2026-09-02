/* Language switcher — injected into the nav on every page.
   If the page declares hreflang alternates (translated versions of itself),
   the switcher jumps to the same page in the chosen language.
   Otherwise it falls back to that language's homepage.
   Uses RELATIVE paths throughout so it works both on the live domain
   and when the site is opened from local files or a subdirectory. */
(function () {
  var path = window.location.pathname.replace(/\\/g, '/');
  var inSub = /\/(articles|fr|ar|es)\/[^\/]*$/.test(path);
  var root = inSub ? '../' : '';

  var langs = [
    ['en', 'English',  'index.html'],
    ['fr', 'Français', 'fr/index.html'],
    ['ar', 'العربية',  'ar/index.html'],
    ['es', 'Español',  'es/index.html']
  ];

  var current = (document.documentElement.lang || 'en').slice(0, 2);

  function targetFor(code, fallback) {
    var alt = document.querySelector('link[rel="alternate"][hreflang="' + code + '"]');
    if (alt) {
      // hreflang hrefs are absolute (https://domain/fr/page.html) — convert to a
      // site-relative path and prefix with root so it resolves locally too.
      var m = alt.getAttribute('href').match(/^https?:\/\/[^\/]+\/(.*)$/);
      if (m) {
        var rel = m[1];
        if (rel === '' || rel.charAt(rel.length - 1) === '/') rel += 'index.html';
        return root + rel;
      }
    }
    // No self-declared alternate for this language. If it's the language the
    // page is already in, stay put instead of jumping to that language's
    // homepage — untranslated pages shouldn't strand readers away from what
    // they were reading just because they opened the switcher.
    if (code === current) {
      return path.split('/').pop() || fallback;
    }
    return root + fallback;
  }

  var sel = document.createElement('select');
  sel.className = 'lang-switch';
  sel.setAttribute('aria-label', 'Language / Langue / اللغة / Idioma');
  langs.forEach(function (l) {
    var o = document.createElement('option');
    o.value = targetFor(l[0], l[2]);
    o.textContent = '🌐 ' + l[1];
    if (l[0] === current) o.selected = true;
    sel.appendChild(o);
  });
  sel.addEventListener('change', function () { window.location.href = sel.value; });

  var li = document.createElement('li');
  li.className = 'lang-switch-item';
  li.appendChild(sel);
  var nav = document.querySelector('.nav-links');
  if (nav) nav.appendChild(li);
})();
