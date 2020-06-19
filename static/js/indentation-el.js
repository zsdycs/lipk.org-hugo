(function () {
    function indentation_el(tagName) {
        var tags = document.getElementsByTagName(tagName);
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            var parent = tag.parentElement;
            if (parent.nodeName === 'ARTICLE' || parent.nodeName === 'BLOCKQUOTE') {
                if (tag.children.length !== 0) {
                    if (tag.children[0].nodeName === 'IMG') continue;
                };
                tag.innerHTML = '&emsp;&emsp;' + tag.innerHTML;
                for (var j = 0; j < tag.childNodes.length; j++) {
                    var child = tag.childNodes[j];
                    if (child.nodeName === 'BR') {
                        tag.childNodes[j+1].textContent = '  ' + tag.childNodes[j+1].textContent.substring(1, tag.childNodes[j+1].textContent.length);
                    }
                }
            }
        }
    }
    indentation_el('p');
})();