// 设置 mode 默认值
if (window.localStorage.getItem('mode') == null) {
  var hours = new Date();
  // 如果时间是晚上 18 点到早上 6 点，自动黑夜
  if (hours.getHours() >= 18 || hours.getHours() <= 6) {
    window.localStorage.setItem('mode', 'github-dark');
  } else {
    window.localStorage.setItem('mode', 'github-light');
  }
}

// body 背景 延迟载入
// document.body.style.background = 'url(https://cdn.jsdelivr.net/gh/zsdycs/lipk.org/static/images/geometry.png)';
// document.body.style.backgroundRepeat = 'repeat';

var modeLS = window.localStorage.getItem('mode');

// 判断是否加载 CSS
function addDarkmodeCSS(mode) {
  var githubDarkCSS = document.querySelector("#github-dark");
  var darkmodeTag = document.querySelector("#darkmodeTag");
  var highlightjsNightCSS = document.querySelector("#highlightjsThemeNight");
  if (mode === "github-light") {
    githubDarkCSS.disabled = true;
    if (highlightjsNightCSS) highlightjsNightCSS.disabled = true;
    darkmodeTag.innerHTML = "白天";
  } else {
  var githubDarkCSS = document.querySelector("#github-dark");
    githubDarkCSS.disabled = false;
    if (highlightjsNightCSS) highlightjsNightCSS.disabled = false;
    if (mode === "github-dark") {
      darkmodeTag.innerHTML = "黑夜";
    }
  }
}

// 画面加载时，判断是否加载 CSS
addDarkmodeCSS(modeLS);

// 切换黑夜白天模式
var darkmodeTag = document.querySelector("#darkmodeTag");
darkmodeTag.addEventListener("click", function () {
  var nowDarkmode = window.localStorage.getItem('mode');
  var beaudar = document.querySelector('iframe');
  var message = {
    type: 'set-theme',
    theme: 'github-light'
  };
  if (nowDarkmode !== "github-light") {
    // 修改 localStorage
    window.localStorage.setItem('mode', 'github-light');
    // 加载样式
    addDarkmodeCSS("github-light");
  } else if (nowDarkmode !== "github-dark") {
    message.theme = 'github-dark';
    // 修改 localStorage
    window.localStorage.setItem('mode', 'github-dark');
    // 加载样式
    addDarkmodeCSS("github-dark");
  }
  // 与 beaudar 通信
  if (window.localStorage.getItem('beaudar') === 'true') {
    beaudar.contentWindow.postMessage(message, 'https://beaudar.lipk.org');
  }
});