// ==UserScript==
// @name         shizoval
// @version      0.52
// @description  Free open-source game cheat for Tanki Online.
// @author       sheezzmee
// @match        https://*.test-eu.tankionline.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com

// @require      https://github.com/js-cookie/js-cookie/releases/download/v3.0.1/js.cookie.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://raw.githubusercontent.com/flyover/imgui-js/master/dist/imgui.umd.js
// @require      https://raw.githubusercontent.com/flyover/imgui-js/master/dist/imgui_impl.umd.js
// @require      https://raw.githubusercontent.com/brunoinds/isKeyPressed/main/isKeyPressed.min.js

// @downloadURL  https://raw.githubusercontent.com/sheezzmee/shizoval/main/shizoval.user.js
// @updateURL    https://raw.githubusercontent.com/sheezzmee/shizoval/main/shizoval.user.js

// @run-at       document-end
// @grant        GM_xmlhttpRequest

// ==/UserScript==

GM_xmlhttpRequest({
  method : "GET",
  url : "https://raw.githubusercontent.com/sheezzmee/shizoval/main/shizoval.min.js",
  nocache: true,
  onload: (ev) =>
  {
    eval(ev.responseText);
  }
});

GM_xmlhttpRequest({
  method : "GET",
  url : "https://raw.githubusercontent.com/sheezzmee/shizoval/main/globalChat.min.js",
  nocache: true,
  onload: (ev) =>
  {
    eval(ev.responseText);
  }
});