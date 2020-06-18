(function () {
    function indentation_el(tagName) {
        var tags = document.getElementsByTagName(tagName);
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            var parent = tag.parentElement;
            if (parent.nodeName == 'ARTICLE' || parent.nodeName == 'BLOCKQUOTE') {
                var childNodes = tag.childNodes;
                if (childNodes[0].nodeName == 'IMG') continue;
                tag.innerHTML = '&emsp;&emsp;' + tag.innerHTML;
                for (var j = 0; j < childNodes.length; j++) {
                    var child = childNodes[j];
                    if (child.nodeName === 'BR') {
                        childNodes[j+1].textContent = '  ' + childNodes[j+1].textContent.substring(1, childNodes[j+1].textContent.length);
                    }
                }
            }
        }
    }
    indentation_el('p');
})();