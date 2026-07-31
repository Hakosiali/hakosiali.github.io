/* Language switcher — injected into the nav on every page.
   If the page declares hreflang alternates (translated versions of itself),
   the switcher jumps to the same page in the chosen language.
   Otherwise it falls back to that language's homepage. */
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
      try { return new URL(alt.getAttribute('href'), window.location.href).pathname; }
      catch (e) { /* fall through */ }
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
