/**
 * 获取页面的相对路径
 * 例如：http://localhost:1313/food/ 
 * return '/food/'
 */
function getUrlRelativePath() {
  const url = document.location.toString();
  const arrUrl = url.split('//');

  const start = arrUrl[1].indexOf('/');
  let relUrl = arrUrl[1].substring(start);

  if (relUrl.indexOf('?') != -1) {
    relUrl = relUrl.split('?')[0];
  }
  return relUrl;
}