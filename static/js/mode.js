(function () {
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

// 判断加载相应模式 CSS
function addDarkmodeCSS(mode) {
  var githubLightCSS = document.querySelector('#github-light');
  var githubDarkCSS = document.querySelector('#github-dark');
  var githubDarkOrangeCSS = document.querySelector('#github-dark-orange');

  var modeTag = document.querySelector('#modeTag');
  var highlightjsNightCSS = document.querySelector('#highlightjsThemeNight');

  // 初始化
  [
    githubDarkCSS.disabled,
    githubLightCSS.disabled,
    githubDarkOrangeCSS.disabled
  ] = [true, true, true];

  if (mode === 'github-light') {
    if (highlightjsNightCSS) highlightjsNightCSS.disabled = true;
    githubLightCSS.disabled = false;
    modeTag.innerHTML = '白天';
  } else {
    if (highlightjsNightCSS) highlightjsNightCSS.disabled = false;
    if (mode === 'github-dark') {
      githubDarkCSS.disabled = false;
      modeTag.innerHTML = '黑夜';
    }
    if (mode === 'github-dark-orange') {
      githubDarkOrangeCSS.disabled = false;
      modeTag.innerHTML = '橘暮';
    }
  }
}

// 画面加载时，加载相应模式 CSS
addDarkmodeCSS(modeLS);

// 切换黑夜白天模式
var modeTag = document.getElementById('modeTag');
modeTag.addEventListener('click', function () {
  var nowDarkmode = window.localStorage.getItem('mode');
  var beaudar = document.querySelector('iframe');
  var message = {
    type: 'set-theme',
    theme: 'github-light'
  };
  /**
   * 顺序：
   *       -> 'github-light'        // 白天
   *       -> 'github-dark'         // 黑夜
   *       -> 'github-dark-orange'  // 橘暮
   *       -> 'dark-blue'           // 幽瞑
   *       -> 'icy-dark'            // 雨晨
   *       -> 'photon-dark'         // 紫夜
   */
  if (nowDarkmode === 'github-light') {
    // github-light -> github-dark
    message.theme = 'github-dark';
    window.localStorage.setItem('mode', 'github-dark');
    addDarkmodeCSS('github-dark');
  } else if (nowDarkmode === 'github-dark') {
    // github-dark -> github-dark-orange
    message.theme = 'github-dark-orange';
    window.localStorage.setItem('mode', 'github-dark-orange');
    addDarkmodeCSS('github-dark-orange');
  } else if (nowDarkmode === 'github-dark-orange') {
    // github-dark-orange -> github-light
    message.theme = 'github-light';
    window.localStorage.setItem('mode', 'github-light');
    addDarkmodeCSS('github-light');
  }
  // 与 beaudar 通信
  if (window.localStorage.getItem('beaudar') === 'true') {
    beaudar.contentWindow.postMessage(message, 'https://beaudar.lipk.org');
  }
});
})();