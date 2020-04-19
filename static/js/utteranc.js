const loading = document.getElementById('loading')
let utterancesLoadingEnd = false;
window.localStorage.setItem('utterances', 'false');

/**
 * 通过MutationObserver来监听#utterances
 */
utterancesEnd = () => {
  const targetNode = document.getElementById('utterances');
  const options = {
    attributes: true,
    childList: true,
    subtree: true
  };
  callback = (mutationsList) => {
    mutationsList.forEach(element => {
      if (element.type === 'attributes' && element.target.className === 'utterances') {
        // 加载结束！
        utterancesLoadingEnd = true
        loading.style.display = 'none';
        window.localStorage.setItem('utterances', 'true');
      }
    });
  }
  var utterancesTimeout = setTimeout(() => {
    if (!utterancesLoadingEnd) {
      // 隐藏加载
      loading.style.display = 'none';

      // 显示提示
      var utterances = document.getElementById('utterances');
      var utterancesMsg = document.createElement('div')
      utterancesMsg.setAttribute('id', 'utterancesMsg');
      utterancesMsg.classList.add('darkmode-ignore');
      utterancesMsg.innerText =
        '噢！评论加载失败了。\n稍等片刻后刷新页面，就可解决此问题。\n详情可在Console中查看，应该是Utterances在加载评论过程中出现了某些故障。';
      utterances.insertBefore(utterancesMsg, utterances.children[0]);
    }
    window.clearTimeout(utterancesTimeout);
  }, 60000);
  const mutationObserver = new MutationObserver(callback);
  mutationObserver.observe(targetNode, options);
}

/**
 * 在#utterances处，append评论的script
 */
addUtteranc = () => {
  // 显示加载状态
  loading.style.display = 'flex';
  const script = document.createElement('script');
  const utterances = document.getElementById('utterances');
  script.src = 'https://utteranc.es/client.js';
  script.setAttribute('repo', 'zsdycs/zsdycs.cn');
  script.setAttribute('issue-term', 'title');
  script.setAttribute('crossorigin', 'anonymous');
  if (window.localStorage.getItem('darkmode') === 'false') {
    script.setAttribute('theme', 'github-light');
  } else {
    script.setAttribute('theme', 'github-dark');
  }
  script.async = true;
  utterances.appendChild(script);
  // 处理评论是否加载完成
  utterancesEnd();
}

// 在“美食”加载评论
if (getUrlRelativePath().length = '/food/'.length &&
  getUrlRelativePath().substring(0, '/food/'.length) === '/food/') {
  addUtteranc()
}

// 在“博客”加载评论
if (getUrlRelativePath().length > '/self-talking/'.length &&
  getUrlRelativePath().substring(0, '/self-talking/'.length) === '/self-talking/') {
  addUtteranc()
}

// 在“关于”加载评论
if (getUrlRelativePath().length = '/about/'.length &&
  getUrlRelativePath().substring(0, '/about/'.length) === '/about/') {
  addUtteranc()
}

// 在“404”加载评论
if (document.title === '执手对影成双 - 404 Page not found') {
  addUtteranc()
}