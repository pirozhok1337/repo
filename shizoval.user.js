// ==UserScript==
// @name         shizoval
// @version      0.6
// @description  Free open-source game cheat for Tanki Online.
// @author       sheezzmee
// @match        https://*.test-eu.tankionline.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com

// @require      https://raw.githubusercontent.com/flyover/imgui-js/master/dist/imgui.umd.js
// @require      https://raw.githubusercontent.com/flyover/imgui-js/master/dist/imgui_impl.umd.js

// @downloadURL  https://raw.githubusercontent.com/sheezzmee/shizoval/main/shizoval.user.js
// @updateURL    https://raw.githubusercontent.com/sheezzmee/shizoval/main/shizoval.user.js

// @grant        GM_xmlhttpRequest

// ==/UserScript==

GM_xmlhttpRequest({
  method : "GET",
  url : "https://raw.githubusercontent.com/sheezzmee/shizoval/main/shizoval.min.js",
  nocache: true,
  onload: (r) =>
  {
    eval(r.responseText);
  }
});