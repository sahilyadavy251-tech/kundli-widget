/* widget.js — "Free Kundli" widget jo koi bhi site apne page par laga sakta hai.
 *
 *   <div id="aoa-kundli-widget"></div>
 *   <script src="https://sahilrao.in/widget.js" async></script>
 *
 * Design ke faisle:
 *   - Shadow DOM: host site ka CSS andar nahi ghusega, aur hamara CSS bahar
 *     nahi jayega. Isi wajah se ye har site par same dikhta hai.
 *   - iframe nahi: site ne X-Frame-Options SAMEORIGIN lagaya hua hai (surakhsha
 *     ke liye), isliye script-embed hi sahi tarika hai.
 *   - Form submit par naya tab khulta hai sahilrao.in par, jahan kundli banti
 *     hai. Data URL me jaata hai (?w=1&n=..&d=..&t=..&p=..), server par kuch
 *     save nahi hota.
 *   - Neeche "Powered by sahilrao.in" link — yahi widget ka backlink hai.
 */
(function () {
  "use strict";
  var HOST = "https://sahilrao.in";
  var MOUNT = "aoa-kundli-widget";
  if (window.__aoaWidgetLoaded) return;
  window.__aoaWidgetLoaded = true;

  var CSS =
    ':host{all:initial}' +
    '.w{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;max-width:340px;' +
    'background:linear-gradient(160deg,#fffdf7,#fdf3e2);border:1px solid #e8dcc4;border-radius:14px;' +
    'padding:14px;box-shadow:0 6px 20px rgba(90,45,12,.08);color:#3d2410;box-sizing:border-box}' +
    '.h{display:flex;align-items:center;gap:8px;margin:0 0 10px}' +
    '.h b{font-size:14.5px;font-weight:900;letter-spacing:.2px}' +
    '.h i{width:26px;height:26px;border-radius:8px;background:linear-gradient(180deg,#ffe4a6,#e8c98a);' +
    'display:flex;align-items:center;justify-content:center;font-style:normal;font-size:14px}' +
    'label{display:block;font-size:11px;font-weight:800;color:#8a5a12;margin:0 0 3px;letter-spacing:.3px}' +
    'input{width:100%;box-sizing:border-box;border:1.5px solid #e6d0a8;border-radius:9px;padding:8px 9px;' +
    'font-size:13px;font-family:inherit;background:#fff;color:#3d2410;margin:0 0 8px;outline:none}' +
    'input:focus{border-color:#c98a12}' +
    '.row{display:flex;gap:8px}.row>div{flex:1;min-width:0}' +
    'button{width:100%;border:0;border-radius:10px;padding:11px;font-size:13.5px;font-weight:900;' +
    'font-family:inherit;background:linear-gradient(180deg,#ffe4a6,#e8c98a);color:#3f1c05;cursor:pointer;' +
    'margin-top:2px}' +
    'button:active{transform:translateY(1px)}' +
    '.f{margin:9px 0 0;font-size:10.5px;color:#a08a6a;text-align:center}' +
    '.f a{color:#8a5a12;text-decoration:none;font-weight:800}' +
    '.f a:hover{text-decoration:underline}';

  function today() {
    var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  function build() {
    var host = document.getElementById(MOUNT);
    if (!host) {
      host = document.createElement("div");
      host.id = MOUNT;
      document.body.appendChild(host);
    }
    if (host.__aoaDone) return;
    host.__aoaDone = 1;

    var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    var st = document.createElement("style");
    st.textContent = CSS;
    root.appendChild(st);

    var box = document.createElement("div");
    box.className = "w";
    box.innerHTML =
      '<div class="h"><i>\u2728</i><b>Free Kundli Calculator</b></div>' +
      '<label for="awn">Naam</label><input id="awn" type="text" placeholder="Aapka naam" autocomplete="name">' +
      '<div class="row">' +
        '<div><label for="awd">Janm tithi *</label><input id="awd" type="date" max="' + today() + '"></div>' +
        '<div><label for="awt">Samay</label><input id="awt" type="time" value="06:00"></div>' +
      '</div>' +
      '<label for="awp">Janm sthan *</label><input id="awp" type="text" placeholder="Jaise Jaipur, Hisar">' +
      '<button type="button" id="awgo">Kundli banao \u2192</button>' +
      '<p class="f">Powered by <a href="' + HOST + '/?utm_source=widget&utm_medium=embed" ' +
        'target="_blank" rel="noopener">sahilrao.in</a></p>';
    root.appendChild(box);

    function v(id) { var e = box.querySelector("#" + id); return e ? String(e.value || "").trim() : ""; }
    function bad(msg, id) {
      var e = box.querySelector("#" + id);
      if (e) { try { e.focus(); e.style.borderColor = "#c2255c"; setTimeout(function () { e.style.borderColor = ""; }, 1500); } catch (x) {} }
      return msg;
    }

    box.querySelector("#awgo").addEventListener("click", function () {
      var d = v("awd"), p = v("awp");
      if (!d) return bad("Janm tithi daalein", "awd");
      if (!p) return bad("Janm sthan daalein", "awp");
      var url = HOST + "/?w=1" +
        "&n=" + encodeURIComponent(v("awn")) +
        "&d=" + encodeURIComponent(d) +
        "&t=" + encodeURIComponent(v("awt") || "06:00") +
        "&p=" + encodeURIComponent(p);
      try { window.open(url, "_blank", "noopener"); } catch (e) { location.href = url; }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
