// 设置 darkmode 默认值
if (window.localStorage.getItem('darkmode') == null) {
  var hours = new Date();
  // 如果时间是晚上 18 点到早上 6 点，自动黑夜
  if (hours.getHours() >= 18 || hours.getHours() <= 6) {
    window.localStorage.setItem('darkmode', 'night');
  } else {
    window.localStorage.setItem('darkmode', 'day');
  }
}

// body 背景 延迟载入
// document.body.style.background = 'url(https://zsdycs.sirv.com/lipk.org/geometry.png)';
// document.body.style.backgroundRepeat = 'repeat';

var darkmodeLS = window.localStorage.getItem('darkmode');

// 判断是否加载 darkmode.css
function addDarkmodeCSS(mode) {
  var darkmodeTag = document.querySelector("#darkmodeTag");
  var darkmodeCSS = document.querySelector("#darkmodeCSS");
  var highlightjsNightCSS = document.querySelector("#highlightjsThemeNight");
  var masthead = document.querySelector(".masthead");
  if (mode === "night") {
    if (masthead) masthead.style.background = "#212121";
    darkmodeCSS.disabled = false;
    if (highlightjsNightCSS) highlightjsNightCSS.disabled = false;
    darkmodeTag.innerHTML = "黑夜";
  } else {
    if (masthead) masthead.style.background = "#ffffff";
    darkmodeCSS.disabled = true;
    if (highlightjsNightCSS) highlightjsNightCSS.disabled = true;
    darkmodeTag.innerHTML = "白天";
  }
}

// 画面加载时，判断是否加载 darkmode.css
addDarkmodeCSS(darkmodeLS);

// 切换模式时，评论头出现提示
var darkmodeTag = document.querySelector("#darkmodeTag");
darkmodeTag.addEventListener("click", function () {
  var newDarkmode = window.localStorage.getItem('darkmode');
  if (newDarkmode === "night") {
    darkmodeTag.innerHTML = "黑夜";
    window.localStorage.setItem('darkmode', 'day');
    addDarkmodeCSS("day");
  } else {
    darkmodeTag.innerHTML = "白天";
    window.localStorage.setItem('darkmode', 'night');
    addDarkmodeCSS("night");
  }
  var utterances = document.getElementById("utterances");
  var newDarkmode = window.localStorage.getItem('darkmode');
  if (window.localStorage.getItem('utterances') === "true") {
    var isMsg = document.getElementById("utterancesMsg");
    if (isMsg) {
      isMsg.remove();
    }
    var utterancesMsg = document.createElement('div')
    utterancesMsg.setAttribute("id", "utterancesMsg");
    if (darkmodeLS === "night" && newDarkmode === "day") {
      utterancesMsg.innerText =
        "如果你需要在白天模式下阅读，" +
        "刷新页面后，评论将会切换为白天模式。";
      utterances.insertBefore(utterancesMsg, utterances.firstChild);
    } else if (darkmodeLS === "day" && newDarkmode === "night") {
      utterancesMsg.innerText =
        "如果你需要在黑夜模式下阅读，" +
        "刷新页面后，评论将会切换为黑夜模式。";
      utterances.insertBefore(utterancesMsg, utterances.firstChild);
    }
  }
});