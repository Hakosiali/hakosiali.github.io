/* Dark/light mode toggle — injected into the nav on every page.
   Defaults to the visitor's OS/browser preference (handled purely by CSS
   media queries). Clicking the button stores an explicit override in
   localStorage so it persists across visits and pages. */
(function () {
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function getStored() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function setStored(value) {
    try { localStorage.setItem('theme', value); } catch (e) {}
  }
  function currentTheme() {
    var stored = getStored();
    if (stored === 'light' || stored === 'dark') return stored;
    return systemPrefersDark() ? 'dark' : 'light';
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  function updateButton(btn, theme) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'theme-toggle';
  updateButton(btn, currentTheme());

  btn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    setStored(next);
    applyTheme(next);
    updateButton(btn, next);
  });

  var wrap = document.querySelector('.nav-wrap');
  if (wrap) wrap.appendChild(btn);
})();
