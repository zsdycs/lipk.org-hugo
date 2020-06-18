// 设置 darkmode 默认值
if (window.localStorage.getItem('darkmode') == null) {
  var hours = new Date();
  // 如果时间是晚上 18 点到早上 6 点，自动黑夜
  if (hours.getHours() >= 18 || hours.getHours() <= 6) {
    window.localStorage.setItem('darkmode', 'night');
  } else {
    window.localStorage.setItem('darkmode', 'day');
  }
}

// body 背景 延迟载入
// document.body.style.background = 'url(https://cdn.jsdelivr.net/gh/zsdycs/lipk.org/static/images/geometry.png)';
// document.body.style.backgroundRepeat = 'repeat';

var darkmodeLS = window.localStorage.getItem('darkmode');

// 判断是否加载 darkmode.css
function addDarkmodeCSS(mode) {
  var darkmodeTag = document.querySelector("#darkmodeTag");
  var darkmodeCSS = document.querySelector("#darkmodeCSS");
  var highlightjsNightCSS = document.querySelector("#highlightjsThemeNight");
  var masthead = document.querySelector(".masthead");
  if (mode === "night") {
    if (masthead) masthead.style.background = "#212121";
    darkmodeCSS.disabled = false;
    if (highlightjsNightCSS) highlightjsNightCSS.disabled = false;
    darkmodeTag.innerHTML = "黑夜";
  } else {
    if (masthead) masthead.style.background = "#ffffff";
    darkmodeCSS.disabled = true;
    if (highlightjsNightCSS) highlightjsNightCSS.disabled = true;
    darkmodeTag.innerHTML = "白天";
  }
}

// 画面加载时，判断是否加载 darkmode.css
addDarkmodeCSS(darkmodeLS);

// 切换黑夜白天模式
var darkmodeTag = document.querySelector("#darkmodeTag");
darkmodeTag.addEventListener("click", function () {
  var nowDarkmode = window.localStorage.getItem('darkmode');
  var beaudar = document.querySelector('iframe');
  var message = {
    type: 'set-theme',
    theme: 'github-light'
  };
  if (nowDarkmode === "night") {
    // 修改 localStorage
    window.localStorage.setItem('darkmode', 'day');
    // 加载样式
    addDarkmodeCSS("day");
  } else {
    message.theme = 'github-dark';
    // 修改 localStorage
    window.localStorage.setItem('darkmode', 'night');
    // 加载样式
    addDarkmodeCSS("night");
  }
  // 与 beaudar 通信
  if (window.localStorage.getItem('beaudar') === 'true') {
    beaudar.contentWindow.postMessage(message, 'https://beaudar.lipk.org');
  }
});