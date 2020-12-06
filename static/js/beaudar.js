(function () {
  /**
   * 获取页面的相对路径
   * 例如：http://localhost:1313/food/
   * return '/food/'
   */
  function getUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split('//');

    var start = arrUrl[1].indexOf('/');
    var relUrl = arrUrl[1].substring(start);

    if (relUrl.indexOf('?') != -1) {
      relUrl = relUrl.split('?')[0];
    }
    return relUrl;
  }

  // 默认为不加载 beaudar
  sessionStorage.setItem('beaudar', 'false');
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
          var message = {
            type: 'set-theme',
            theme: sessionStorage.getItem('mode')
          };
          var beaudar = document.querySelector('#beaudar iframe');
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
    // 确保 addBeaudar() 仅执行一次
    if (sessionStorage.getItem('beaudar') === 'true') return;
    // 加载了 beaudar
    sessionStorage.setItem('beaudar', 'true');
    var script = document.createElement('script');
    var beaudar = document.getElementById('beaudar');
    script.src = 'https://beaudar.lipk.org/client.js';
    script.setAttribute('repo', 'zsdycs/lipk.org');
    script.setAttribute('issue-term', 'title');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('label', '💬 评论');
    script.setAttribute('theme', sessionStorage.getItem('mode'));
    script.async = true;
    beaudar.appendChild(script);
    // 处理评论是否加载完成
    beaudarEnd();
  }

  // 在“菜谱”加载评论
  if (getUrlRelativePath().length === '/food/'.length &&
    getUrlRelativePath().substring(0, '/food/'.length) === '/food/') {
    addBeaudar()
  }

  // 在“博客”加载评论
  if (getUrlRelativePath().length > '/blog/'.length &&
    getUrlRelativePath().substring(0, '/blog/'.length) === '/blog/') {
    addBeaudar()
  }

  // 在“关于”加载评论
  if (getUrlRelativePath().length === '/about/'.length &&
    getUrlRelativePath().substring(0, '/about/'.length) === '/about/') {
    addBeaudar()
  }

  // 在“404”加载评论
  if (document.title === '执手对影成双 - 404 Page not found') {
    addBeaudar()
  }
})();
