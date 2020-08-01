(function () {
  "use strict";
  /**
   * 字符串转 Element
   * @param {String} str html 字符串
   */
  function createElement(str) {
    var parser = new DOMParser();
    return parser.parseFromString(str, 'text/html').body.firstChild;
  }

  /**
   * @param target 目标位置
   * @param rate 缓动率
   */
  function animation(target, rate) {
    var current = parseInt(document.documentElement.scrollTop);
    if (current === target) {
      return;
    }

    function step() {
      current += (target - current) / rate;
      if (Math.abs(target - current) < 1) {
        window.scrollTo(0, target);
        return;
      }
      window.scrollTo(0, current);
      window.requestAnimationFrame(step);
    };
    step();
  }

  /**
   * 文字内容是否超过元素宽度
   * @param {String} content 内容
   * @param {Number} width 
   * @param {Number} fontSize 
   */
  function getStrWidthFlg(content, width, fontSize) {
    var resultWidth, div = document.createElement('div');
    div.style.fontSize = `${fontSize}px`;
    div.style.visibility = 'hidden';
    div.style.display = 'inline-block';
    if (typeof div.textContent !== undefined) {
      div.textContent = content;
    } else {
      div.innerText = content;
    }
    document.body.appendChild(div);
    resultWidth = parseFloat(window.getComputedStyle(div).width);
    document.body.removeChild(div);
    if (resultWidth > width) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 设置替换元素
   */
  function setElement(linkId, innerText) {
    var el;
    if (getStrWidthFlg(innerText, 145, 15)) {
      el = createElement(`<p class="top tocTitle small" data-linkId="${linkId}">${innerText}</p>`);
    } else {
      el = createElement(`<p class="top tocTitle" data-linkId="${linkId}">${innerText}</p>`);
    }
    el.addEventListener('click', function () {
      var targetElement = document.getElementById(linkId),
        target;
      // 1220 页面变换的页面宽度：@media screen and (max-width:1220px)
      if (document.body.offsetWidth >= 1220) {
        var mainPaddingTop = window.getComputedStyle($('main'), null).getPropertyValue("padding-top");
        target = targetElement.offsetTop - mainPaddingTop.slice(0, -2);
      } else {
        target = targetElement.offsetTop - (20 + $('header').offsetHeight);
      }
      // 修改浏览器地址
      history.pushState(history.state, document.title, `#${linkId}`);
      animation(target + 1, 5);
    });
    return el;
  }

  var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document),
    toc = $('#TableOfContents'),
    topUl = $('#TableOfContents ul'),
    secondaryUl, thirdUl;
  if (!toc) return;

  // 处理 toc
  for (let i = 0; i < topUl.children.length; i++) {
    // ## 文章一级标题 li
    var topUlChild = topUl.children[i];
    // 替换 a 标签
    if (topUlChild.children[0] && topUlChild.children[0].nodeName === 'A') {
      topUlChild.replaceChild(setElement(topUlChild.children[0].hash.substring(1), topUlChild.children[0].innerText), topUlChild.children[0]);
      // 添加图标
      topUlChild.insertAdjacentHTML('afterbegin', `<i class="fa fa-minus topUlChild"></i>`);
    }
    secondaryUl = topUlChild.querySelector('ul');
    if (secondaryUl) {
      secondaryUl.style.marginLeft = '12px';
      for (let j = 0; j < secondaryUl.children.length; j++) {
        // ### 文章二级标题 li
        var secondaryUlChild = secondaryUl.children[j];
        // 替换 a 标签
        if (secondaryUlChild.children[0] && secondaryUlChild.children[0].nodeName === 'A') {
          secondaryUlChild.replaceChild(setElement(secondaryUlChild.children[0].hash.substring(1), secondaryUlChild.children[0].innerText), secondaryUlChild.children[0]);
          // 添加图标
          secondaryUlChild.insertAdjacentHTML('afterbegin', `<i class="fa fa-minus secondaryUlChild"></i>`);
        }
        thirdUl = secondaryUlChild.querySelector('ul');
        if (thirdUl) {
          thirdUl.style.marginLeft = '12px';
          for (let j = 0; j < thirdUl.children.length; j++) {
            // ### 文章三级标题 li
            var thirdUlChild = thirdUl.children[j];
            // 替换 a 标签
            if (thirdUlChild.children[0] && thirdUlChild.children[0].nodeName === 'A') {
              thirdUlChild.replaceChild(setElement(thirdUlChild.children[0].hash.substring(1), thirdUlChild.children[0].innerText), thirdUlChild.children[0]);
              // 添加图标
              thirdUlChild.insertAdjacentHTML('afterbegin', `<i class="fa fa-minus thirdUlChild"></i>`);
            }
          }
        }
      }
    }
  }

  /**
   * @param distance 菜单或距离顶部的间距
   * 
   * 处理逻辑:
   * A: #eof 距离底端的距离 大于零，所有不高亮
   * B: 如果 章节头 距离顶端的距离 在 负章节距离 到 ( 0 + 菜单栏高度 ) 之间
   * 
   * 章节距离 = Math.abs(Math.abs( 距离顶端的距离一 ) - Math.abs( 距离顶端的距离二 ))
   * 网页工作区域的高度 = document.documentElement.clientHeight
   * 元素距离文档顶端偏移值 = DOM元素对象.offsetTop
   * 网页被卷起来的高度 = document.documentElement.scrollTop
   * 
   * 距离顶端的距离 = 元素距离文档顶端偏移值 - 网页被卷起来的高度
   * 距离底端的距离 = 网页工作区域的高度 - (元素距离文档顶端偏移值 - 网页被卷起来的高度))
   */
  function tocAddClass(distance) {
    var chapter, chapters = $$('article h1, article h2, article h3');
    for (var i = 0; i < chapters.length; i++) {
      chapter = chapters[i];
      if (chapter.id === '') continue;
      var distanceFromTop = chapters[i].offsetTop - document.documentElement.scrollTop,
        distanceFromTops;
      if (chapters[i + 1]) {
        distanceFromTops = (chapters[i + 1].offsetTop) - document.documentElement.scrollTop;
      } else {
        distanceFromTops = $('#eof').offsetTop - document.documentElement.scrollTop;
      };
      var chapterContentLength = Math.abs(Math.abs(distanceFromTop) - Math.abs(distanceFromTops));
      var eofFromEnd = document.documentElement.clientHeight - ($('#eof').offsetTop - document.documentElement.scrollTop);
      var headerHrFromTop = $('header hr').offsetTop - document.documentElement.scrollTop;
      // 如果在文章开始处
      if (headerHrFromTop > distance) {
        var allTopA = $$('#TableOfContents p');
        for (let j = 0; j < allTopA.length; j++) {
          var topA = allTopA[j];
          topA.classList.remove('show');
        }
        return;
      }
      // 开始处理
      if (eofFromEnd < 0) {
        if (-chapterContentLength < distanceFromTop && distanceFromTop < distance) {
          // 对应章节，目录处理
          var secondaryUl, topUlChild;
          for (let j = 0; j < topUl.children.length; j++) {
            topUlChild = topUl.children[j];
            if (topUlChild.children[1] && topUlChild.children[1].nodeName === 'P') {
              topUlChild.children[1].classList.remove('show');
              // # 标题
              if (chapters[i].id.toString() === topUlChild.children[1].getAttribute('data-linkId').toString()) {
                topUlChild.children[1].classList.add('show');
              };
            }
            secondaryUl = topUlChild.querySelector('ul');
            if (secondaryUl) {
              for (let k = 0; k < secondaryUl.children.length; k++) {
                var secondaryUlChild = secondaryUl.children[k];
                if (secondaryUlChild.children[1] && secondaryUlChild.children[1].nodeName === 'P') {
                  secondaryUlChild.children[1].classList.remove('show');
                  // ## 标题
                  if (chapters[i].id.toString() === secondaryUlChild.children[1].getAttribute('data-linkId').toString()) {
                    if (topUl.children[j].children[1]) topUl.children[j].children[1].classList.add('show');
                    secondaryUlChild.children[1].classList.add('show');
                  };
                }
                thirdUl = secondaryUlChild.querySelector('ul');
                if (thirdUl) {
                  for (let l = 0; l < thirdUl.children.length; l++) {
                    var thirdUlChild = thirdUl.children[l];
                    if(thirdUlChild.children[1] && thirdUlChild.children[1].nodeName === 'P') {
                      thirdUlChild.children[1].classList.remove('show');
                      // ### 标题
                      if (chapters[i].id.toString() === thirdUlChild.children[1].getAttribute('data-linkId').toString()) {
                        if (topUl.children[j].children[1]) topUl.children[j].children[1].classList.add('show');
                        if (secondaryUlChild.children[1]) secondaryUlChild.children[1].classList.add('show');
                        thirdUlChild.children[1].classList.add('show');
                      };
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        var allTopA = $$('#TableOfContents p');
        for (let j = 0; j < allTopA.length; j++) {
          var topA = allTopA[j];
          topA.classList.remove('show');
        }
      }
    }
  }

  /**
   * 节流
   * @param {Function} func 执行函数
   * @param {Number} wait 延迟执行时间
   * @param {Number} mustRun 执行间隔
   */
  function throttle(func, wait, mustRun) {
    var timeout,
      startTime = new Date();

    return function () {
      var curTime = new Date();

      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 func
      if (curTime - startTime >= mustRun) {
        func.apply(this);
        startTime = curTime;
      } else {
        timeout = setTimeout(func, wait);
      }
    };
  };

  function scrolling() {
    var distance;
    // 1220 页面变换的页面宽度：media screen and (max-width:1220px)
    if (document.body.offsetWidth >= 1220) {
      var tagMainPaddingTop = window.getComputedStyle($('main'), null).getPropertyValue("padding-top");
      distance = parseInt(tagMainPaddingTop.slice(0, -2));
      tocAddClass(distance);
    } else {
      distance = 20 + $('header').offsetHeight
      tocAddClass(distance);
    }
  }

  // Chapter, highlight 章节高亮
  scrolling();
  document.addEventListener('scroll', throttle(scrolling, 80, 120));

})();