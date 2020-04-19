var nightAndDaySvg = "<svg height=\"35px\" viewBox=\"0 0 512 512\" width=\"512pt\" xmlns=\"http://www.w3.org/2000/svg\">" +
  "<path d=\"m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0\" fill=\"#7DCEED\"></path>" +
  "<path d=\"m256 135.128906c-66.753906 0-120.871094 54.117188-120.871094 120.871094 0 33.578125 13.695313 63.957031 35.804688 85.859375l170.925781-170.925781c-21.902344-22.109375-52.28125-35.804688-85.859375-35.804688zm0 0\" fill=\"#fdba12\"></path>" +
  "<path d=\"m241 60h30v57.5h-30zm0 0\" fill=\"#fdba12\"></path>" +
  "<path d=\"m60 241h57.5v30h-57.5zm0 0\" fill=\"#fdba12\"></path>" +
  "<path d=\"m343.324219 147.460938 40.660156-40.660157 11.003906 11.003907-40.660156 40.660156zm0 0\" fill=\"#fdba12\"></path>" +
  "<path d=\"m106.796875 383.984375 40.660156-40.660156 11 11.003906-40.65625 40.660156zm0 0\" fill=\"#fdba12\"></path>" +
  "<path d=\"m106.796875 128.015625 21.214844-21.214844 40.65625 40.660157-21.210938 21.210937zm0 0\" fill=\"#fdba12\"></path>" +
  "<path d=\"m72.722656 434.703125c.753906.773437 1.492188 1.550781 2.257813 2.316406 99.972656 99.972657 262.0625 99.972657 362.039062 0 99.972657-99.972656 99.972657-262.066406 0-362.039062-.765625-.765625-1.542969-1.503907-2.316406-2.257813zm0 0\" fill=\"#000000\"></path>" +
  "<path d=\"m362.242188 279.308594c0 42.292968-34.28125 76.578125-76.574219 76.578125-21.414063 0-40.773438-8.796875-54.671875-22.964844 9.347656 39.722656 45.015625 69.296875 87.59375 69.296875 49.699218 0 89.988281-40.289062 89.984375-89.988281 0-42.578125-29.570313-78.246094-69.296875-87.59375 14.171875 13.894531 22.964844 33.253906 22.964844 54.671875zm0 0\" fill=\"#fff\"></path>" +
  "</svg>"
var options = {
  bottom: '64px', // default: '32px'
  right: '32px', // default: '32px'
  left: 'unset', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: 'white', // default: '#fff'
  backgroundColor: '#dedede', // default: '#fff'
  buttonColorDark: '#212121', // default: '#100f2c'
  buttonColorLight: '#dedede', // default: '#fff'
  saveInCookies: true, // default: true,
  label: nightAndDaySvg, // default: ''
  autoMatchOsTheme: true // default: true
}

// 设置darkmode默认值
if (window.localStorage.getItem('darkmode') == null) {
  window.localStorage.setItem('darkmode', 'true');
}

new window.Darkmode(options).showWidget()

// body背景 延迟载入
document.body.style.background = 'url(/images/geometry.png)';
document.body.style.backgroundRepeat = 'repeat';

var darkmodeLS = window.localStorage.getItem('darkmode');
var darkButton = document.getElementsByClassName("darkmode-toggle")[0];
var utterances = document.getElementById("utterances");

// 修改页面的文字透明度
modifyTextTransparency = (newMode, loadMode) => {
  var dayColor = '#000000',
    nightColor = '#595959';
  var aTags = document.getElementsByTagName('a');
  if (newMode) {
    if (newMode == 'day') {
      for (var i = 0; i < aTags.length; i++) {
        aTags[i].style.color = dayColor;
      }
      document.body.style.color = dayColor;
    } else if (newMode == 'night') {
      for (var i = 0; i < aTags.length; i++) {
        aTags[i].style.color = '#808080';
      }
      document.body.style.color = nightColor;
    }
  } else {
<<<<<<< HEAD
    if (loadMode == null || loadMode == 'true') {
      for (var i = 0; i < aTags.length; i++) {
        aTags[i].style.color = '#808080';
=======
    if (loadMode == undefined || loadMode == 'true') {
      for (var i = 0; i < a.length; i++) {
        a[i].style.color = '#808080';
>>>>>>> c9b405bd70fc9e17c7ab894dd5a9f402f9ac3293
      }
      document.body.style.color = nightColor;
    } else {
      for (var i = 0; i < aTags.length; i++) {
        aTags[i].style.color = dayColor;
      }
      document.body.style.color = dayColor;
    }
  }
}

// 画面加载时，设置文字透明度
modifyTextTransparency(undefined, darkmodeLS);

var url = getUrlRelativePath();
var directoryName = '';
if (url.length >= "/self-talking/".length && url.substring(0, "/self-talking/".length) === "/self-talking/") {
  directoryName = url.substring(0, "/self-talking/".length);
}
if (url.length >= "/food/".length && url.substring(0, "/food/".length) === "/food/") {
  directoryName = url.substring(0, "/food/".length);
}
if (url.length >= "/music/".length && url.substring(0, "/music/".length) === "/music/") {
  directoryName = url.substring(0, "/music/".length);
}
if (url.length >= "/about/".length && url.substring(0, "/about/".length) === "/about/") {
  directoryName = url.substring(0, "/about/".length);
}

// 过滤emoji
var article = document.getElementsByTagName("article")[0];
var emojiReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/g;
for (var i = 0; i < article.children.length; i++) {
  if (article.children[i].nodeName === "FOOTER") {
    break;
  }
  var str = article.children[i].innerHTML;
  article.children[i].innerHTML = str.replace(emojiReg, function (emoji) {
    return "<span class=\"darkmode-ignore\">" + emoji + "</span>";
  });
}

// 切换模式时，评论头出现提示
darkButton.addEventListener("click", () => {
  var newDarkmode = window.localStorage.getItem('darkmode');
  if (newDarkmode === null || newDarkmode === "true") {
    // 文字透明度切换为黑夜
    modifyTextTransparency('night');
  } else {
    modifyTextTransparency('day');
  }
  if (window.localStorage.getItem('utterances') === "true") {
    var isMsg = document.getElementById("utterancesMsg");
    if (isMsg) {
      isMsg.remove();
    }
    var utterancesMsg = document.createElement('div')
    utterancesMsg.setAttribute("id", "utterancesMsg");
    utterancesMsg.classList.add("darkmode-ignore");
    if ((darkmodeLS === null || darkmodeLS === "true") && newDarkmode === "false") {
      utterancesMsg.innerText =
        "如果你需要在白天模式下阅读，" +
        "刷新页面后，评论将会切换为白天模式。";
      utterances.insertBefore(utterancesMsg, utterances.children[0]);
    } else if (darkmodeLS === "false" && newDarkmode === "true") {
      utterancesMsg.innerText =
        "如果你需要在黑夜模式下阅读，" +
        "刷新页面后，评论将会切换为黑夜模式。";
      utterances.insertBefore(utterancesMsg, utterances.children[0]);
    }
  }
});