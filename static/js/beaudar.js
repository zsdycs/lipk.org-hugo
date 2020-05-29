var beaudarLoadingEnd = false;
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
      if (element.type === 'attributes' && element.target.className === 'utterances') {
        // 加载结束！
        beaudarLoadingEnd = true
        var loading = document.getElementById('loading');
        loading.style.display = 'none';
        window.localStorage.setItem('beaudar', 'true');
        var beaudarMsg = document.createElement('div')
        beaudarMsg.setAttribute("id", "beaudarMsg");
        var darkmodeNow = window.localStorage.getItem('darkmode')
        var beaudarTheme = window.localStorage.getItem('beaudar-theme')
        if (beaudarTheme === "github-dark" && darkmodeNow === "day") {
          beaudarMsg.innerText =
            "如果你需要在白天模式下阅读，" +
            "刷新页面后，评论将会切换为白天模式。";
          beaudar.insertBefore(beaudarMsg, beaudar.firstChild);
        } else if (beaudarTheme === "github-light" && darkmodeNow === "night") {
          beaudarMsg.innerText =
            "如果你需要在黑夜模式下阅读，" +
            "刷新页面后，评论将会切换为黑夜模式。";
          beaudar.insertBefore(beaudarMsg, beaudar.firstChild);
        }
      }
    });
  }
  var beaudarTimeout = setTimeout(function() {
    if (!beaudarLoadingEnd) {
      // 隐藏加载
      var loading = document.getElementById('loading');
      loading.style.display = "none";

      // 显示提示
      var beaudar = document.getElementById('beaudar');
      var beaudarMsg = document.createElement('div')
      beaudarMsg.setAttribute('id', 'beaudarMsg');
      beaudarMsg.innerText =
        '噢！评论加载失败了。\n稍等片刻后刷新页面，就可解决此问题。\n详情可在 Console 中查看，应该是 beaudar 在加载评论过程中出现了某些故障。';
      beaudar.insertBefore(beaudarMsg, beaudar.children[0]);
    }
    window.clearTimeout(beaudarTimeout);
  }, 60000);
  var mutationObserver = new MutationObserver(callback);
  mutationObserver.observe(targetNode, options);
}

/**
 * 在#beaudar处，append评论的script
 */
function addBeaudar() {
  // 显示加载状态
  var loading = document.getElementById('loading');
  loading.style.display = 'flex';
  var script = document.createElement('script');
  var beaudar = document.getElementById('beaudar');
  script.src = 'https://beaudar.lipk.org/client.js';
  script.setAttribute('repo', 'zsdycs/lipk.org');
  script.setAttribute('issue-term', 'title');
  script.setAttribute('crossorigin', 'anonymous');
  if (window.localStorage.getItem('darkmode') === 'day') {
    script.setAttribute('theme', 'github-light');
    window.localStorage.setItem('beaudar-theme', 'github-light');
  } else {
    script.setAttribute('theme', 'github-dark');
    window.localStorage.setItem('beaudar-theme', 'github-dark');
  }
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