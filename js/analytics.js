/* Analytics loader — one file controls tracking on every page.
   SETUP: fill in ONE of the two options below, redeploy, done.

   Option A — Cloudflare Web Analytics (recommended: free, private, no cookie banner):
     1. dash.cloudflare.com → Web Analytics → Add a site → copy the token
     2. Paste it into CF_TOKEN below.

   Option B — Google Analytics 4:
     1. analytics.google.com → create property → copy the Measurement ID (G-XXXXXXX)
     2. Paste it into GA4_ID below.

   Leave both empty and nothing loads (current state). */
var CF_TOKEN = "bb8ab9d563e244d89669dfcc837cab78";
var GA4_ID = "";

(function () {
  if (CF_TOKEN) {
    var s = document.createElement('script');
    s.defer = true;
    s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_TOKEN }));
    document.head.appendChild(s);
  }
  if (GA4_ID) {
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_ID, { anonymize_ip: true });
  }
})();
