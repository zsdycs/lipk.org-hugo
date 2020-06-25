(function () {
    var list = document.querySelectorAll('ul li');
    for (let i = 0; i < list.length; i++) {
        var li = list[i];
        if (li.children.length !== 0 && li.children[0].nodeName === 'INPUT') {
            li.style.listStyle = 'none';
        }
    }
})()