const loading = document.getElementById('loading')
let utterancesLoadingEnd = false;
/**
 * 获取页面的相对路径
 * 例如：http://localhost:1313/cate/ 
 * return '/cate/'
 */
getUrlRelativePath = () => {
  const url = document.location.toString();
  const arrUrl = url.split('//');

  const start = arrUrl[1].indexOf('/');
  let relUrl = arrUrl[1].substring(start);

  if (relUrl.indexOf('?') != -1) {
    relUrl = relUrl.split('?')[0];
  }
  return relUrl;
}

/**
 * 通过MutationObserver来监听#utterances
 */
utterancesEnd = () => {
  const targetNode = document.getElementById('utterances');
  const options = { attributes: true, childList: true, subtree: true};
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
  setTimeout(() => {
    if (!utterancesLoadingEnd) {
      // 隐藏加载
      loading.style.display = 'none';

      // 显示提示
      var utterances = document.getElementById('utterances');
      var utterancesMsg = document.createElement('div')
      utterancesMsg.setAttribute('id', 'utterancesMsg');
      utterancesMsg.classList.add('darkmode-ignore');
      utterancesMsg.innerText =
        '评论加载失败了。\n“api.github.com/search/issues”返回了一个“ERR_CONNECTION_RESET”的错误。';
      utterances.insertBefore(utterancesMsg, utterances.children[0]);
    }
  }, 8000);
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
  console.log('darkmode', window.localStorage.getItem('darkmode'));
  if (window.localStorage.getItem('darkmode') === 'false') {
    script.setAttribute('theme', 'github-light');
  } else {
    script.setAttribute('theme', 'github-dark');
  }
  script.async = true;
  utterances.appendChild(script);
  window.localStorage.setItem('utterances', 'false');
  // 处理评论是否加载完成
  utterancesEnd();
}

// 在“食物表”加载评论
if (getUrlRelativePath().length = '/cate/'.length && getUrlRelativePath().substring(0, '/cate/'.length) === '/cate/') {
  console.log('/cate/!')
  addUtteranc()
}

// 在“文章”加载评论
if (getUrlRelativePath().length > '/self-talking/'.length && getUrlRelativePath().substring(0, '/self-talking/'.length) === '/self-talking/') {
  console.log('/self-talking/!')
  addUtteranc()
}

// 在“404”加载评论
if (document.title === '执手对影成双 - 404 Page not found') {
  addUtteranc()
}
