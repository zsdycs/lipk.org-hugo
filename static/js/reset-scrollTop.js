(function () {
    var tagA = document.querySelectorAll('a');
    for (let i = 0; i < tagA.length; i++) {
        if (tagA[i].hash) {
            tagA[i].addEventListener('click', function () {
                setTimeout(() => {
                    resetTop()
                }, 200);
            })
        }
    }

    function resetTop() {
        var hash = window.location.hash;
        var tagHeader = document.querySelector('header');
        var tagMain = document.querySelector('main');
        if (hash.length !== 0) {
            idTag = document.getElementById(hash.substring(1));
            // 1220 页面变换的页面宽度：@media screen and (max-width:1220px)
            if (document.body.offsetWidth >= 1220) {
                var tagMainPaddingTop = window.getComputedStyle(tagMain).getPropertyValue("padding-top");
                document.documentElement.scrollTop = idTag.offsetTop - tagMainPaddingTop.slice(0, -2);
            } else {
                document.documentElement.scrollTop = idTag.offsetTop - (20 + tagHeader.offsetHeight);
            }
        }
    }
    setTimeout(() => {
        // 页面加载后自动滚动
        resetTop();
    }, 1500);
    window.addEventListener('hashchange', function () {
        resetTop();
    });
})();