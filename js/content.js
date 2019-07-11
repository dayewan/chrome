function injectCustomJs(jsPath) {
  jsPath = jsPath || "js/inject.js";
  var temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  temp.src = chrome.extension.getURL(jsPath);
  document.head.appendChild(temp);
}

window.onload = function() {
  if (location.host === "detail.1688.com") {
    injectCustomJs();
  }
  if (/admin.*?hibobi.com/.test(location.host)) {
    injectCustomJs();
  }
};
