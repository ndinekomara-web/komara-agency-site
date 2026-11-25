/* =========================================================
   Mesure d'audience — chargée UNIQUEMENT après consentement.
   Aucun cookie publicitaire, aucun profilage, aucune revente.
   Pour activer : remplis ga4 ou plausible ci-dessous (gratuit).
   ========================================================= */
(function () {
  "use strict";

  var CONFIG = {
    ga4: "",                 // ex. "G-XXXXXXXXXX"  (analytics.google.com)
    plausible: "",           // ex. "ndinekomara-web.github.io" (plausible.io)
    endpoint: ""             // ex. "https://mon-compteur/track" (auto-hébergé)
  };

  var page = location.pathname + location.search;
  var ref = document.referrer || "";

  if (CONFIG.ga4) {
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.ga4;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", CONFIG.ga4, { anonymize_ip: true });
    return;
  }

  if (CONFIG.plausible) {
    var p = document.createElement("script");
    p.defer = true;
    p.setAttribute("data-domain", CONFIG.plausible);
    p.src = "https://plausible.io/js/script.js";
    document.head.appendChild(p);
    return;
  }

  if (CONFIG.endpoint) {
    try {
      navigator.sendBeacon(CONFIG.endpoint, JSON.stringify({ page: page, ref: ref }));
    } catch (e) { /* jamais bloquant */ }
  }
})();
