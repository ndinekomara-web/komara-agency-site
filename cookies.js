/* =========================================================
   Komara Agency — bandeau cookies RGPD + mesure d'audience
   Aucun cookie n'est déposé avant ton accord.
   Choix mémorisé 6 mois, modifiable via « Gérer les cookies ».
   ========================================================= */
(function () {
  "use strict";

  var STORE = "komara_cookies_v1";
  var MAX_AGE = 180 * 24 * 60 * 60 * 1000; // 6 mois

  function lire() {
    try {
      var brut = localStorage.getItem(STORE);
      if (!brut) return null;
      var data = JSON.parse(brut);
      if (!data || !data.date || Date.now() - data.date > MAX_AGE) return null;
      return data;
    } catch (e) { return null; }
  }

  function ecrire(analytics) {
    try {
      localStorage.setItem(STORE, JSON.stringify({ analytics: !!analytics, date: Date.now() }));
    } catch (e) { /* navigation privée : le choix ne persiste pas */ }
  }

  function chargerMesure() {
    if (document.getElementById("komara-analytics")) return;
    var s = document.createElement("script");
    s.id = "komara-analytics";
    s.src = (window.KOMARA_BASE || "") + "analytics.js";
    s.defer = true;
    document.head.appendChild(s);
  }

  function masquer() {
    var b = document.getElementById("cookie-banner");
    if (b) b.remove();
  }

  function afficher() {
    if (document.getElementById("cookie-banner")) return;
    var wrap = document.createElement("div");
    wrap.id = "cookie-banner";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-live", "polite");
    wrap.setAttribute("aria-label", "Choix des cookies");
    wrap.innerHTML =
      '<p><b>Cookies</b> — On utilise un cookie technique pour retenir ton choix, et une mesure ' +
      'd\'audience anonyme si tu acceptes. Rien n\'est déposé avant ta réponse. ' +
      '<a href="' + (window.KOMARA_BASE || "") + 'confidentialite.html">En savoir plus</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" id="cookie-refuse" class="cookie-refuse">Refuser</button>' +
      '<button type="button" id="cookie-accept" class="cookie-accept">Accepter</button>' +
      '</div>';
    document.body.appendChild(wrap);

    document.getElementById("cookie-accept").addEventListener("click", function () {
      ecrire(true); chargerMesure(); masquer();
    });
    document.getElementById("cookie-refuse").addEventListener("click", function () {
      ecrire(false); masquer();
    });
  }

  // Lien « Gérer les cookies » ajouté en bas de page (footer)
  function lienGestion() {
    var footer = document.querySelector(".footer");
    if (!footer || document.getElementById("gerer-cookies")) return;
    var p = document.createElement("p");
    p.style.cssText = "margin-top:10px;font-size:13px;opacity:.85";
    p.innerHTML = '<a href="#" id="gerer-cookies">Gérer les cookies</a>';
    footer.appendChild(p);
    p.querySelector("#gerer-cookies").addEventListener("click", function (e) {
      e.preventDefault();
      try { localStorage.removeItem(STORE); } catch (err) {}
      afficher();
    });
  }

  function demarrer() {
    var choix = lire();
    if (choix) { if (choix.analytics) chargerMesure(); }
    else { afficher(); }
    lienGestion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else { demarrer(); }
})();
