(function () {
  function center_el(tagName) {
    var tags = document.getElementsByTagName(tagName),
      i, tag;
    for (i = 0; i < tags.length; i++) {
      tag = tags[i];
      var parent = tag.parentElement;
      // 如果图像是其父元素的唯一元素，则将其居中
      if (parent.children.length === 1) {
        // 如果图像上有链接，检查父元素的父元素的子元素
        if (parent.nodeName === 'A') {
          var grandparent = parent.parentElement;
          if (grandparent.children.length != 1) continue;
          grandparent.firstChild.style.border = 'none';
        }
        if (parent.nodeName === 'P') parent.style.textAlign = 'center';
      }
    }
  }
  var tagNames = ['img', 'embed', 'object'];
  for (var i = 0; i < tagNames.length; i++) {
    center_el(tagNames[i]);
  }
})();