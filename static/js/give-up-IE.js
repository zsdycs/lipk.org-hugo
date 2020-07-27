  // 放弃 IE
  if (window.navigator.userAgent.indexOf('MSIE') !== -1 || 'ActiveXObject' in window) {
    var githubLight = document.getElementById('github-light');
    var githubDark = document.getElementById('github-dark');
    var githubDarkOrange = document.getElementById('github-dark-orange');
    var darkBlue = document.getElementById('dark-blue');
    var icyDark = document.getElementById('icy-dark');
    var photonDark = document.getElementById('photon-dark');
    githubLight.removeNode(true);
    githubDark.removeNode(true);
    githubDarkOrange.removeNode(true);
    darkBlue.removeNode(true);
    icyDark.removeNode(true);
    photonDark.removeNode(true);
    document.body.innerHTML = '<main class="ie paramount"><h3>我身处 IE 的花海中......</h3><p>&emsp;&emsp;从前，有片花田。<br/>&emsp;&emsp;那里很空旷，很寂静。<br/>&emsp;&emsp;微风吹过脸颊，<br/>&emsp;&emsp;有一丝丝甘甜的气息。<br/>&emsp;&emsp;眺望远处，<br/>&emsp;&emsp;绵延的花海仿佛在指引着我们，<br/>&emsp;&emsp;透过它，<br/>&emsp;&emsp;我们理解了这五彩斑斓的世界。</p><a href="https://browsehappy.com" target="_blank">下载新一代浏览器后再次访问本页面。</a><div class="ie copyright">© 2018 - 2020 <a href="/">执手对影成双</a><a href="https://travellings.now.sh/" target="_blank" title="开往-友链接力"><img src="/images/travellings.svg" alt="开往-友链接力" height="17" style="vertical-align: text-top;" title="开往-友链接力"></a></div></main>';
    console.error('错误：本站点放弃兼容 IE 浏览器。\n请使用新一代浏览器访问。');
  }