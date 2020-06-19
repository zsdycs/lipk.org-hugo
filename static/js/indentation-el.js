(function () {
    function indentation_el(tagName) {
        var tags = document.getElementsByTagName(tagName);
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            var parent = tag.parentElement;
            if (parent.nodeName === 'ARTICLE' || parent.nodeName === 'BLOCKQUOTE') {
                var children = tag.children;
                if (children.length === 0 || children[0].nodeName === 'IMG') continue;
                tag.innerHTML = '&emsp;&emsp;' + tag.innerHTML;
                for (var j = 0; j < children.length; j++) {
                    var child = children[j];
                    if (child.nodeName === 'BR') {
                        children[j+1].textContent = '  ' + children[j+1].textContent.substring(1, children[j+1].textContent.length);
                    }
                }
            }
        }
    }
    indentation_el('p');
})();