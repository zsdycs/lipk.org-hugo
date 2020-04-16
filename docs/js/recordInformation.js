// 域名首页添加ICP备案信息
function GetUrlRelativePath() {
  var url = document.location.toString();
  var arrUrl = url.split("//");

  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start);

  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}
window.onload = function () {
  var url = GetUrlRelativePath();
  if (url == "/") {
    var pObj = document.getElementById("add-icp");
    var spanObj = document.createElement("span");
    spanObj.id = "icp"
    spanObj.onclick = function () {
      window.open("http:/www.beian.miit.gov.cn/")
    }
    var str = "粤ICP备19003986号"
    var textObj = document.createTextNode(str);
    spanObj.appendChild(textObj)
    pObj.appendChild(spanObj);
  }
}