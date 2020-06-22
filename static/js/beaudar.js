// 默认为没有加载 beaudar
window.localStorage.setItem('beaudar', 'false');
/**
 * 通过 MutationObserver 来监听 #beaudar
 */
function beaudarEnd() {
  var targetNode = document.getElementById('beaudar');
  var options = {
    attributes: true,
    childList: true,
    subtree: true
  };

  function callback(mutationsList) {
    mutationsList.forEach(function (element) {
      if (element.type === 'attributes' && element.target.className === 'beaudar') {
        var loading = document.getElementById('loading');
        // 默认 github-light
        var message = {
          type: 'set-theme',
          theme: 'github-light'
        };
        var nowDarkmode = window.localStorage.getItem('mode');
        var beaudar = document.querySelector('iframe');
        loading.style.display = 'none';
        if (nowDarkmode === "github-dark") {
          message.theme = 'github-dark';
        }
        // 与 beaudar 通信
        beaudar.contentWindow.postMessage(message, 'https://beaudar.lipk.org');
      }
    });
  }
  var mutationObserver = new MutationObserver(callback);
  mutationObserver.observe(targetNode, options);
}

/**
 * 在 #beaudar 处，append 评论的 script
 */
function addBeaudar() {
  // 加载了 beaudar  
  window.localStorage.setItem('beaudar', 'true');
  // 显示加载状态
  var loading = document.getElementById('loading');
  loading.style.display = 'flex';
  var script = document.createElement('script');
  var beaudar = document.getElementById('beaudar');
  script.src = 'https://beaudar.lipk.org/client.js';
  script.setAttribute('repo', 'zsdycs/lipk.org');
  script.setAttribute('issue-term', 'title');
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;
  beaudar.appendChild(script);
  // 处理评论是否加载完成
  beaudarEnd();
}

// 在“美食”加载评论
if (getUrlRelativePath().length = '/food/'.length &&
  getUrlRelativePath().substring(0, '/food/'.length) === '/food/') {
  addBeaudar()
}

// 在“博客”加载评论
if (getUrlRelativePath().length > '/blog/'.length &&
  getUrlRelativePath().substring(0, '/blog/'.length) === '/blog/') {
  addBeaudar()
}

// 在“关于”加载评论
if (getUrlRelativePath().length = '/about/'.length &&
  getUrlRelativePath().substring(0, '/about/'.length) === '/about/') {
  addBeaudar()
}

// 在“404”加载评论
if (document.title === '执手对影成双 - 404 Page not found') {
  addBeaudar()
}