(function () {
  const MODE_TEXT = {
    'github-light': '浅色',
    'github-dark': '深色',
    'github-dark-orange': '深橙',
    'dark-blue': '深蓝',
    'icy-dark': '冷黑',
    'photon-dark': '暗黑',
  };
  const MODE_ORDER = {
    'github-light': 'github-dark',
    'github-dark': 'github-dark-orange',
    'github-dark-orange': 'dark-blue',
    'dark-blue': 'icy-dark',
    'icy-dark': 'photon-dark',
    'photon-dark': 'github-light',
  };
  const DARK_MODE = [
    'github-dark',
    'github-dark-orange',
    'dark-blue',
    'icy-dark',
    'photon-dark',
  ];

  // 设置 mode 初始值
  const setInitialMode = () => {
    if (sessionStorage.getItem('mode') == null) {
      const hours = new Date();
      // 如果时间是晚上 18 点到早上 6 点，自动黑夜
      if (hours.getHours() >= 18 || hours.getHours() <= 6) {
        sessionStorage.setItem('mode', 'github-dark');
      } else {
        sessionStorage.setItem('mode', 'github-light');
      }
    }
  };
  setInitialMode();

  // body 背景 延迟载入
  // document.body.style.background = 'url(https://lipk.oss-accelerate.aliyuncs.com/images/geometry.png)';
  // document.body.style.backgroundRepeat = 'repeat';

  const modeLS = sessionStorage.getItem('mode');

  // 判断加载相应模式 CSS
  window.addDarkmodeCSS = function addDarkmodeCSS(mode) {
    const modeTag = document.querySelector('#modeTag');
    if (!modeTag) return;

    document.documentElement.setAttribute('theme', mode);
    document.documentElement.setAttribute(
      'color-scheme',
      DARK_MODE.includes(mode) ? 'dark' : 'light',
    );

    modeTag.innerHTML = MODE_TEXT[mode];
  };

  // 画面加载时，加载相应模式 CSS
  window.addDarkmodeCSS(modeLS);

  // 切换黑夜白天模式
  window.mode = function mode() {
    const nowDarkmode = sessionStorage.getItem('mode');
    const beaudar = document.querySelector('#beaudar iframe');
    const message = {
      type: 'set-theme',
      theme: 'github-light',
    };
    /**
     * 顺序：
     *       -> 'github-light'        // 浅色
     *       -> 'github-dark'         // 深色
     *       -> 'github-dark-orange'  // 深橙
     *       -> 'dark-blue'           // 深蓝
     *       -> 'icy-dark'            // 冷黑
     *       -> 'photon-dark'         // 暗黑
     */
    message.theme = MODE_ORDER[nowDarkmode];
    sessionStorage.setItem('mode', MODE_ORDER[nowDarkmode]);
    window.addDarkmodeCSS(MODE_ORDER[nowDarkmode]);
    // 与 beaudar 通信
    if (sessionStorage.getItem('beaudar') === 'true' && beaudar) {
      beaudar.contentWindow.postMessage(message, 'https://beaudar.lipk.org');
    }
  };
})();
