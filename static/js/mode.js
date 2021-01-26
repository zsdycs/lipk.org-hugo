(function () {
  // 设置 mode 默认值
  if (sessionStorage.getItem('mode') == null) {
    var hours = new Date();
    // 如果时间是晚上 18 点到早上 6 点，自动黑夜
    if (hours.getHours() >= 18 || hours.getHours() <= 6) {
      sessionStorage.setItem('mode', 'github-dark');
    } else {
      sessionStorage.setItem('mode', 'github-light');
    }
  }

  // body 背景 延迟载入
  // document.body.style.background = 'url(https://lipk.oss-ap-southeast-1.aliyuncs.com/images/geometry.png)';
  // document.body.style.backgroundRepeat = 'repeat';

  var modeLS = sessionStorage.getItem('mode');

  // 判断加载相应模式 CSS
  window.addDarkmodeCSS = function addDarkmodeCSS(mode) {
    var modeTag = document.querySelector('#modeTag');
    if (!modeTag) return;
    var highlightjsNightCSS = document.querySelector('#highlightjsThemeNight');

    if (mode === 'github-light') {
      if (highlightjsNightCSS) highlightjsNightCSS.disabled = true;
      document.body.setAttribute('theme', 'github-light')
      modeTag.innerHTML = '白天';
    } else {
      if (highlightjsNightCSS) highlightjsNightCSS.disabled = false;
      if (mode === 'github-dark') {
        document.body.setAttribute('theme', 'github-dark')
        modeTag.innerHTML = '黑夜';
      }
      if (mode === 'github-dark-orange') {
        document.body.setAttribute('theme', 'github-dark-orange')
        modeTag.innerHTML = '橘暮';
      }
      if (mode === 'dark-blue') {
        document.body.setAttribute('theme', 'dark-blue')
        modeTag.innerHTML = '幽瞑';
      }
      if (mode === 'icy-dark') {
        document.body.setAttribute('theme', 'icy-dark')
        modeTag.innerHTML = '雨晨';
      }
      if (mode === 'photon-dark') {
        document.body.setAttribute('theme', 'photon-dark')
        modeTag.innerHTML = '紫夜';
      }
    }
  }

  // 画面加载时，加载相应模式 CSS
  window.addDarkmodeCSS(modeLS);

  // 切换黑夜白天模式
  window.mode = function mode() {
    var nowDarkmode = sessionStorage.getItem('mode');
    var beaudar = document.querySelector('#beaudar iframe');
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
      sessionStorage.setItem('mode', 'github-dark');
      window.addDarkmodeCSS('github-dark');
    } else if (nowDarkmode === 'github-dark') {
      // github-dark -> github-dark-orange
      message.theme = 'github-dark-orange';
      sessionStorage.setItem('mode', 'github-dark-orange');
      window.addDarkmodeCSS('github-dark-orange');
    } else if (nowDarkmode === 'github-dark-orange') {
      // github-dark-orange -> dark-blue
      message.theme = 'dark-blue';
      sessionStorage.setItem('mode', 'dark-blue');
      window.addDarkmodeCSS('dark-blue');
    } else if (nowDarkmode === 'dark-blue') {
      // dark-blue -> icy-dark
      message.theme = 'icy-dark';
      sessionStorage.setItem('mode', 'icy-dark');
      window.addDarkmodeCSS('icy-dark');
    } else if (nowDarkmode === 'icy-dark') {
      // icy-dark -> photon-dark
      message.theme = 'photon-dark';
      sessionStorage.setItem('mode', 'photon-dark');
      window.addDarkmodeCSS('photon-dark');
    } else if (nowDarkmode === 'photon-dark') {
      // photon-dark -> github-light
      message.theme = 'github-light';
      sessionStorage.setItem('mode', 'github-light');
      window.addDarkmodeCSS('github-light');
    }
    // 与 beaudar 通信
    if (sessionStorage.getItem('beaudar') === 'true' && beaudar) {
      beaudar.contentWindow.postMessage(message, 'https://beaudar.lipk.org');
    }
  }
})();
