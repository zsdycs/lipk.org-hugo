(function () {
  var toc, topUl, secondaryUl;
  toc = document.getElementById('TableOfContents');
  if (!toc) return;
  topUl = toc.querySelector('ul');
  for (let i = 0; i < topUl.children.length; i++) {
    var topUlChild = topUl.children[i];
    // ## 标题
    topUlChild.insertAdjacentHTML('afterbegin', `<i class="fa fa-minus topUlChild"></i>`);
    secondaryUl = topUl.children[i].querySelector('ul');
    if (secondaryUl) {
      for (let j = 0; j < secondaryUl.children.length; j++) {
        var secondaryUlChild = secondaryUl.children[j];
        // ### 标题
        secondaryUlChild.insertAdjacentHTML('afterbegin', `<i class="fa fa-minus secondaryUlChild"></i>`);
      }
    }
  }
  // Chapter, highlight 章节高亮
  document.addEventListener('scroll', function () {
    // 1220 页面变换的页面宽度：media screen and (max-width:1220px)
    if (document.body.offsetWidth >= 1220) {
      var tagMainPaddingTop = window.getComputedStyle(document.querySelector('main'), null).getPropertyValue("padding-top");
      tocAddClass(parseInt(tagMainPaddingTop.slice(0, -2)));
    } else {
      // document.querySelector('header')
      tocAddClass(20 + document.querySelector('header').offsetHeight);
    }
  });

  /**
   * 处理逻辑:
   * A: #eof 距离底端的距离 大于零，所有不高亮
   * B: 如果 章节头 距离顶端的距离 在 ( 负章节距离 + 菜单栏高度 ) 到 ( 0 + 菜单栏高度 ) 之间
   * 
   * 章节距离 = Math.abs(Math.abs( 距离顶端的距离一 ) - Math.abs( 距离顶端的距离二 ))
   * 网页工作区域的高度 = document.documentElement.clientHeight
   * 元素距离文档顶端偏移值 = DOM元素对象.offsetTop
   * 网页被卷起来的高度 = document.documentElement.scrollTop
   * 
   * 距离顶端的距离 = (元素距离文档顶端偏移值 + 菜单栏高度) - 网页被卷起来的高度)
   * 距离底端的距离 = 网页工作区域的高度 - ((元素距离文档顶端偏移值 + 菜单栏高度) - 网页被卷起来的高度))
   */
  function tocAddClass(distance) {
    // distance = 0
    // distance TODO
    console.log(distance)
    var chapter, chapters = document.querySelectorAll('article h2, article h3');
    for (var i = 0; i < chapters.length; i++) {
      chapter = chapters[i];
      if (chapter.id === '') continue;
      var distanceFromTop = (chapters[i].offsetTop + distance) - document.documentElement.scrollTop,
        distanceFromTops;
      if (chapters[i + 1]) {
        distanceFromTops = (chapters[i + 1].offsetTop + distance) - document.documentElement.scrollTop;
      } else {
        distanceFromTops = (document.getElementById('eof').offsetTop + distance) - (document.documentElement.scrollTop);
      };
      var chapterContentLength = Math.abs(Math.abs(distanceFromTop) - Math.abs(distanceFromTops));
      var eofFromEnd = document.documentElement.clientHeight - ((document.getElementById('eof').offsetTop + distance) - (document.documentElement.scrollTop))
      if (eofFromEnd < 0) {
        if (-chapterContentLength < distanceFromTop && distanceFromTop < distance) {
          // 对应章节，目录处理
          var toc, topUl, secondaryUl;
          toc = document.getElementById('TableOfContents');
          if (!toc) return;
          topUl = toc.querySelector('ul');
          for (let j = 0; j < topUl.children.length; j++) {
            var topUlChild = topUl.children[j];
            topUlChild.children[1].classList.remove('show');
            // ## 标题
            if (chapters[i].id.toString() === topUlChild.children[1].hash.substring(1).toString()) {
              topUlChild.children[1].classList.add('show');
            };
            secondaryUl = topUl.children[j].querySelector('ul');
            if (secondaryUl) {
              for (let k = 0; k < secondaryUl.children.length; k++) {
                var secondaryUlChild = secondaryUl.children[k];
                secondaryUlChild.children[1].classList.remove('show');
                // ### 标题
                if (chapters[i].id.toString() === secondaryUlChild.children[1].hash.substring(1).toString()) {
                  secondaryUlChild.children[1].classList.add('show');
                };
              }
            }
          }
        }
      } else {
        var allTopA = document.querySelectorAll('#TableOfContents a');
        for (let j = 0; j < allTopA.length; j++) {
          var topA = allTopA[j];
          topA.classList.remove('show');
        }
      }
    }
  }

})();