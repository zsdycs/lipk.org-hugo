(function () {
  var quotes = document.getElementsByTagName('blockquote'),
    i, quote;
  for (i = 0; i < quotes.length; i++) {
    quote = quotes[i];
    var n = quote.children.length;
    if (n === 0) continue;
    var el = quote.children[n - 1];
    if (!el || el.nodeName !== 'P') continue;
    // 右对齐 p 如果开头为: '  —' 或 '  ——'
    if (/^(  —|  ——)/.test(el.textContent)) el.style.textAlign = 'right';
  }
})();