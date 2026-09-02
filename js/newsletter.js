/* Newsletter & lead-magnet form connector.
   SETUP (one step): paste your form endpoint URL into NEWSLETTER_ACTION below.
   - Brevo:      create a form → Share → copy the form's action URL
   - MailerLite: create a form → Embed → copy the action URL
   - Formspree:  create a form → copy the https://formspree.io/f/xxxx URL
   Same list serves both the homepage newsletter and the cheat-sheet download form.

   For the cheat-sheet form (.lead-magnet), also set the ESP's "redirect after
   submit" URL (found in the form/embed settings) to:
     https://aiguidedz.com/thank-you-cheatsheet.html
   That page has the actual download button — this is the standard, no-backend
   way to gate a free download behind an email address on a static site.

   Until NEWSLETTER_ACTION is set, both forms show a friendly message instead
   of failing, and the cheat-sheet form still offers a direct download link
   so nothing is ever a dead click. */
var NEWSLETTER_ACTION = "";

(function () {
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var msgs = {
    en: { soon: 'Newsletter launching soon — check back!', done: 'Thanks! Please check your inbox to confirm.',
          soonMagnet: 'Email signup is launching soon — here\'s the direct download in the meantime:' },
    fr: { soon: 'Newsletter bientôt disponible — revenez vite !', done: 'Merci ! Vérifiez votre boîte mail pour confirmer.',
          soonMagnet: 'L\'inscription arrive bientôt — voici le téléchargement direct en attendant :' },
    ar: { soon: 'النشرة البريدية قادمة قريباً — عد لاحقاً!', done: 'شكراً! تفقد بريدك لتأكيد الاشتراك.',
          soonMagnet: 'التسجيل بالبريد قادم قريباً — إليك رابط التحميل المباشر في الوقت الحالي:' },
    es: { soon: 'Newsletter disponible muy pronto — ¡vuelve pronto!', done: '¡Gracias! Revisa tu correo para confirmar.',
          soonMagnet: 'El registro llega pronto — aquí tienes la descarga directa mientras tanto:' }
  };
  var t = msgs[lang] || msgs.en;

  document.querySelectorAll('.newsletter form').forEach(function (form) {
    wireForm(form, false);
  });
  document.querySelectorAll('.lead-magnet form').forEach(function (form) {
    wireForm(form, true);
  });

  function wireForm(form, isMagnet) {
    if (NEWSLETTER_ACTION) {
      form.setAttribute('action', NEWSLETTER_ACTION);
      form.setAttribute('method', 'post');
      form.removeAttribute('onsubmit');
      var email = form.querySelector('input[type="email"]');
      if (email && !email.getAttribute('name')) email.setAttribute('name', 'email');
      form.addEventListener('submit', function () {
        var btn = form.querySelector('button');
        if (btn) { btn.disabled = true; btn.textContent = '…'; }
        if (!isMagnet) setTimeout(function () { alert(t.done); }, 300);
        // For the lead magnet, the ESP's configured redirect takes the visitor
        // to thank-you-cheatsheet.html — no client-side alert needed here.
      });
    } else {
      form.setAttribute('onsubmit', 'return false;');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (isMagnet) {
          var fallback = form.getAttribute('data-fallback');
          if (fallback) {
            alert(t.soonMagnet);
            window.open(fallback, '_blank');
          } else {
            alert(t.soon);
          }
        } else {
          alert(t.soon);
        }
      });
    }
  }
})();
