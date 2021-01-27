(function () {

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
    script.setAttribute('label', '💬 评论');
    script.setAttribute('theme', sessionStorage.getItem('mode'));
    script.async = true;
    beaudar.appendChild(script);
    // 处理评论是否加载完成
    beaudarEnd();
  }

  addBeaudar();
})();
