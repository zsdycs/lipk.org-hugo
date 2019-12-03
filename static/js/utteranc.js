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

// 过滤emoji
var article = document.getElementsByTagName("article")[0];
var emojiReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/g;
for (var i = 0; i < article.children.length; i++) {
  var str = article.children[i].innerHTML;
  article.children[i].innerHTML = str.replace(emojiReg, function (emoji) {
    return "<span class=\"darkmode-ignore\">" + emoji + "</span>";
  });
  if (article.children[i].nodeName === "HR") {
    break;
  }
}

var darkmodeLS = window.localStorage.getItem('darkmode');
var darkButton = document.getElementsByClassName("darkmode-toggle")[0];
console.log(darkButton)
var utterances = document.getElementById("utterances");
darkButton.addEventListener("click", () => {
  var isMsg = document.getElementById("utterancesMsg");
  if (isMsg) {
    isMsg.remove();
  }
  var utterancesMsg = document.createElement('div')
  utterancesMsg.setAttribute("id", "utterancesMsg");
  utterancesMsg.classList.add("darkmode-ignore");
  if (darkmodeLS && darkmodeLS === "true" && darkmodeLS !== window.localStorage.getItem('darkmode')) {
    utterancesMsg.innerText =
      "If you need to read in day mode," +
      " the comments will switch to day mode after refreshing the page." +
      "刷新页面评论切换为白天模式。";
    utterances.insertBefore(utterancesMsg, utterances.children[0]);
  } else if (darkmodeLS && darkmodeLS === "false" && darkmodeLS !== window.localStorage.getItem('darkmode')) {
    utterancesMsg.innerText =
      "If you need to read in night mode," +
      " the comments will switch to night mode after refreshing the page." +
      "刷新页面评论切换为黑夜模式。";
    utterances.insertBefore(utterancesMsg, utterances.children[0]);
  }
});
