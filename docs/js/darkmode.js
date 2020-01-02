var nightAndDaySvg = "<svg height=\"35px\" viewBox=\"0 0 512 512\" width=\"512pt\" xmlns=\"http://www.w3.org/2000/svg\">"+
"<path d=\"m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0\" fill=\"#7DCEED\"></path>"+
"<path d=\"m256 135.128906c-66.753906 0-120.871094 54.117188-120.871094 120.871094 0 33.578125 13.695313 63.957031 35.804688 85.859375l170.925781-170.925781c-21.902344-22.109375-52.28125-35.804688-85.859375-35.804688zm0 0\" fill=\"#fdba12\"></path>"+
"<path d=\"m241 60h30v57.5h-30zm0 0\" fill=\"#fdba12\"></path>"+
"<path d=\"m60 241h57.5v30h-57.5zm0 0\" fill=\"#fdba12\"></path>"+
"<path d=\"m343.324219 147.460938 40.660156-40.660157 11.003906 11.003907-40.660156 40.660156zm0 0\" fill=\"#fdba12\"></path>"+
"<path d=\"m106.796875 383.984375 40.660156-40.660156 11 11.003906-40.65625 40.660156zm0 0\" fill=\"#fdba12\"></path>"+
"<path d=\"m106.796875 128.015625 21.214844-21.214844 40.65625 40.660157-21.210938 21.210937zm0 0\" fill=\"#fdba12\"></path>"+
"<path d=\"m72.722656 434.703125c.753906.773437 1.492188 1.550781 2.257813 2.316406 99.972656 99.972657 262.0625 99.972657 362.039062 0 99.972657-99.972656 99.972657-262.066406 0-362.039062-.765625-.765625-1.542969-1.503907-2.316406-2.257813zm0 0\" fill=\"#000000\"></path>"+
"<path d=\"m362.242188 279.308594c0 42.292968-34.28125 76.578125-76.574219 76.578125-21.414063 0-40.773438-8.796875-54.671875-22.964844 9.347656 39.722656 45.015625 69.296875 87.59375 69.296875 49.699218 0 89.988281-40.289062 89.984375-89.988281 0-42.578125-29.570313-78.246094-69.296875-87.59375 14.171875 13.894531 22.964844 33.253906 22.964844 54.671875zm0 0\" fill=\"#fff\"></path>"+
"</svg>"
var options = {
  bottom: '64px', // default: '32px'
  right: '32px', // default: '32px'
  left: 'unset', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#000',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: nightAndDaySvg, // default: ''
  autoMatchOsTheme: true // default: true
}
const darkmode = new Darkmode(options);
darkmode.showWidget();

var darkmodeLS = window.localStorage.getItem('darkmode');
var darkButton = document.getElementsByClassName("darkmode-toggle")[0];
var utterances = document.getElementById("utterances");

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
var directoryName = '';
if (url.length >= "/self-talking/".length && url.substring(0, "/self-talking/".length) === "/self-talking/") {
  directoryName = url.substring(0, "/self-talking/".length);
}
if (url.length >= "/cate/".length && url.substring(0, "/cate/".length) === "/cate/") {
  directoryName = url.substring(0, "/cate/".length);
}
if (url.length >= "/music/".length && url.substring(0, "/music/".length) === "/music/") {
  directoryName = url.substring(0, "/music/".length);
}
if (url.length >= "/about/".length && url.substring(0, "/about/".length) === "/about/") {
  directoryName = url.substring(0, "/about/".length);
}

if (directoryName === "/self-talking/" || directoryName === "/cate/" || directoryName === "/music/" || directoryName === "/about/") {
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
  if (directoryName === "/self-talking/" && url.length > "/self-talking/".length) {
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
  }
}
