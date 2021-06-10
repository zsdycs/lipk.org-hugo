// 放弃 IE
if (
  window.navigator.userAgent.indexOf('MSIE') !== -1 ||
  'ActiveXObject' in window
) {
  document.body.innerHTML =
    '<main class="ie paramount"><h3>我身处 IE 的花海中......</h3><p>&emsp;&emsp;从前，有片花田。<br/>&emsp;&emsp;那里很空旷，很寂静。<br/>&emsp;&emsp;微风吹过脸颊，<br/>&emsp;&emsp;有一丝丝甘甜的气息。<br/>&emsp;&emsp;眺望远处，<br/>&emsp;&emsp;绵延的花海仿佛在指引着我们，<br/>&emsp;&emsp;透过它，<br/>&emsp;&emsp;我们理解了这五彩斑斓的世界。</p><a href="https://browsehappy.com" target="_blank">下载新一代浏览器后再次访问本页面。</a><div class="ie copyright">© 2018 - 2021 <a href="/">执手对影成双</a></div></main>';
  console.error('错误：本站点放弃兼容 IE 浏览器。\n请使用新一代浏览器访问。');
}
