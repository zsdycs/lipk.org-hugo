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

var url = GetUrlRelativePath();
if (url.length > "/self-talking/".length && url.substring(0, "/self-talking/".length) === "/self-talking/") {
  var script = document.createElement('script');
  var utterances = document.getElementById("utterances");
  script.src = "https://utteranc.es/client.js";
  script.setAttribute("repo", "zsdycs/zsdycs.cn");
  script.setAttribute("issue-term", "pathname");
  script.setAttribute("crossorigin", "anonymous");
  if (window.localStorage.getItem('darkmode') === 'true') {
    script.setAttribute("theme", "github-dark");
  } else {
    script.setAttribute("theme", "github-light");
  }
  script.async = true;
  utterances.appendChild(script);
}
