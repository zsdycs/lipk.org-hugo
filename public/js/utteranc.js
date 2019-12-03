var script = document.createElement('script');
var utterances = document.getElementById("utterances");
script.src = "https://utteranc.es/client.js";
script.setAttribute("repo", "zsdycs/zsdycs-blog");
script.setAttribute("issue-term", "pathname");
script.setAttribute("repo", "zsdycs/zsdycs-blog");
script.setAttribute("crossorigin", "anonymous");
script.setAttribute("repo", "zsdycs/zsdycs-blog");
if (window.localStorage.getItem('darkmode') === 'true') {
  script.setAttribute("theme", "github-dark");
} else {
  script.setAttribute("theme", "github-light");
}
script.async = true;
utterances.appendChild(script);
