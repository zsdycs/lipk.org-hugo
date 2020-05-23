(function () {
    function indentation_el(tagName) {
        var tags = document.getElementsByTagName(tagName);
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            console.log(tag.innerHTML)
            var parent = tag.parentElement;
            if (parent.nodeName == 'ARTICLE' || parent.nodeName == 'BLOCKQUOTE') {
                console.log(tag.childNodes)
                tag.innerHTML = '&emsp;&emsp;' + tag.innerHTML;
                var childNodes = tag.childNodes;
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