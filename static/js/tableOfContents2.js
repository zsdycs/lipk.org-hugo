(function () {
  "use strict";
  // ************************************************** 变量 **************************************************
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const DEFAULT = {
    selector: 'article', // 文章内容中标题标签 selector
    titleType: ['H1', 'H2', 'H3'], // 目录标题类型 三级目录
    lineHeight: 28, // 每个菜单行高 28 px
    currentOnIndex: 0, // 当前高亮目录索引
    surplusHeight: 180, // 除了菜单高度 + 留白高度
    moreHeight: 10, // 菜单左侧线比菜单多出高度
    direction: 'bottom', // 默认滚动方向

    wait: 500, // 防抖延迟时间
    intervals: 200, // 执行间隔
    duration: 200, // 滚动动画持续时间
    toTopDistance: 80, // 距离窗口顶部多少高度之内时候触发高亮
  };

  // ************************************************** 逻辑 **************************************************

  // 添加目录
  const tableOfContentsList = createTableOfContentsList();
  const tableOfContentsElement = createTableOfContents(tableOfContentsList);
  $('#tableOfContents-bar').insertAdjacentElement('afterbegin', tableOfContentsElement);

  const tableOfContentsData = {
    tableOfContentsBody: $('.tableOfContents-body'),
    tableOfContentsDL: $('.tableOfContents dl'),
    tableOfContentsDD: $$('.tableOfContents dd'),
    tableOfContentsLine: $('.tableOfContents-line'),
    tableOfContentsList: tableOfContentsList,
    tableOfContentsElement: tableOfContentsElement
  };

  let status = {
    historyViewHeight: 0, // 当前窗口高度
    maxTableOfContentsCount: 0, // 窗口内能容纳最大目录个数
    historyPageYOffset: 0, // 页面滚动距离
    bodyBCR: null, // 目录可视区域的边界值
    bodyMidBottom: 0, // 目录可视区域中间位置 dd bottom
    initDLBottom: 0, // 目录 dl bottom
    firstDDTop: 0, // 第一个 dd top
    hasStopSetHighlight: false, // 在点击目录子项时候直接高亮当前目录，而不通过 scroll 事件触发 setHighlight 函数
    historyOnIndex: 0, // 高亮的目录索引
    direction: 'bottom', // 滚动方向
    marginTop: 0, // 菜单滚动距离
  }

  // 初始化
  initTableOfContentsList();

  // 滚动时高亮目录
  window.addEventListener('scroll', function () {
    // setHighlight();
    // resetHighlightStatus();
    // debounce(setHighlight, DEFAULT.wait)();
    // debounce(resetHighlightStatus, DEFAULT.wait)();
    throttle(setHighlight, DEFAULT.wait, DEFAULT.intervals)();
    throttle(resetHighlightStatus, DEFAULT.wait, DEFAULT.intervals)();
  }, false);

  // 目录自动滚动
  if (tableOfContentsData.tableOfContentsList.length > status.maxTableOfContentsCount) {
    window.addEventListener('scroll', function () {
      // scrollTableOfContents();
      // debounce(scrollTableOfContents, DEFAULT.wait)();
      throttle(scrollTableOfContents, DEFAULT.wait, DEFAULT.intervals)()
    }, false)
  }

  // ************************************************** 函数 **************************************************


  // 自动滚动目录树，使得当前高亮目录在可视范围内
  function scrollTableOfContents() {
    const current = $('.tableOfContents .on');

    const currBCR = current.getBoundingClientRect();
    const DL_BCR = tableOfContentsData.tableOfContentsDL.getBoundingClientRect();

    if (status.direction === 'bottom') { // 向下滚动
      if (currBCR.bottom + (status.maxTableOfContentsCount / 2) * DEFAULT.lineHeight <= status.bodyBCR.bottom) { // 上半部分
        // 不滚动
      } else if (currBCR.bottom - status.bodyMidBottom < DL_BCR.bottom - status.bodyBCR.bottom) { // 中位以下
        status.marginTop += -Math.floor((currBCR.bottom - status.bodyMidBottom) / DEFAULT.lineHeight) * DEFAULT.lineHeight;
      } else if (status.bodyBCR.bottom <= DL_BCR.bottom) { // 当剩余滚动距离
        status.marginTop = status.bodyBCR.bottom - status.initDLBottom;
      }
    } else { // 向上滚动
      if (status.bodyBCR.top + (status.maxTableOfContentsCount / 2) * DEFAULT.lineHeight <= currBCR.top) {
        // 不滚动
      } else if (status.bodyMidBottom - currBCR.top < status.bodyBCR.top - DL_BCR.top) {
        status.marginTop += Math.floor((status.bodyMidBottom - currBCR.top) / DEFAULT.lineHeight) * DEFAULT.lineHeight;
      } else if (DL_BCR.top <= status.bodyBCR.top) {
        status.marginTop = 0;
      }
    }
    tableOfContentsData.tableOfContentsDL.style.marginTop = status.marginTop + 'px'
  }

  // 高亮目录
  function setHighlight() {
    // 滚动方向
    setScrollDirection();

    if (status.hasStopSetHighlight) {
      return;
    }

    const current = $('.tableOfContents .on');
    const onIndex = [].indexOf.call(tableOfContentsData.tableOfContentsDD, current); // 当前高亮索引
    const tableOfContentsLength = tableOfContentsData.tableOfContentsList.length;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    let nextOnIndex = onIndex; // 滚动后高亮索引
    current.classList.remove('on');

    if (tableOfContentsData.tableOfContentsList[tableOfContentsLength - 1].element.getBoundingClientRect().top <= DEFAULT.toTopDistance ||
      window.innerHeight + window.pageYOffset === scrollHeight) { // 尾部
      status.historyOnIndex = tableOfContentsLength - 1;
      tableOfContentsData.tableOfContentsDD[status.historyOnIndex].classList.add('on');
    } else if (document.scrollingElement.scrollTop <= status.firstDDTop) { // 顶部
      tableOfContentsData.tableOfContentsDD[0].classList.add('on');
      status.historyOnIndex = 0;
    } else { // 中间：使用缓存，直接从上一次索引(onIndex)位置开始查找
      if (status.direction === 'bottom') {
        while (nextOnIndex < tableOfContentsLength) {
          const currTop = tableOfContentsData.tableOfContentsList[nextOnIndex].element.getBoundingClientRect().top;
          if (currTop > DEFAULT.toTopDistance && nextOnIndex > 0) {
            nextOnIndex--;
            break;
          }
          nextOnIndex++;
        }
      } else {
        while (nextOnIndex >= 0) {
          const currTop = tableOfContentsData.tableOfContentsList[nextOnIndex].getBoundingClientRect().top;
          if (currTop <= DEFAULT.toTopDistance) {
            break;
          }
          nextOnIndex--;
        }
      }
      nextOnIndex = nextOnIndex === tableOfContentsLength ? nextOnIndex - 1 : nextOnIndex < 0 ? 0 : nextOnIndex;
      status.historyOnIndex = nextOnIndex;
      tableOfContentsData.tableOfContentsDD[nextOnIndex].classList.add('on');
    }
  }

  // 初始化
  function initTableOfContentsList() {
    const tempHeight = window.innerHeight;

    if (status.historyViewHeight !== tempHeight) {
      status.historyViewHeight = tempHeight;
      status.maxTableOfContentsCount = Math.floor((status.historyViewHeight - DEFAULT.surplusHeight) / DEFAULT.lineHeight);
      const maxTableOfContentsHeight = status.maxTableOfContentsCount * DEFAULT.lineHeight;
      const currentTableOfContentsHeight = tableOfContentsData.tableOfContentsList.length * DEFAULT.lineHeight
      // 大于窗口内能容纳最大目录个数，则使用最大高度，否则使用当前生成目录的高度
      const tableOfContentsHeight = tableOfContentsData.tableOfContentsList.length > status.maxTableOfContentsCount ? maxTableOfContentsHeight : currentTableOfContentsHeight;

      // 设置目录高度
      tableOfContentsData.tableOfContentsLine.style.height = `${tableOfContentsHeight + DEFAULT.moreHeight}px`;
      tableOfContentsData.tableOfContentsBody.style.height = `${tableOfContentsHeight}px`;
      tableOfContentsData.tableOfContentsBody.style.maxHeight = `${tableOfContentsHeight}px`;

      status.historyPageYOffset = window.pageYOffset;
      status.bodyBCR = tableOfContentsData.tableOfContentsBody.getBoundingClientRect();
      status.initDLBottom = status.initDLBottom || tableOfContentsData.tableOfContentsDL.getBoundingClientRect().bottom;
      status.firstDDTop = status.firstDDTop || tableOfContentsData.tableOfContentsDD[0].getBoundingClientRect().top;
      status.bodyMidBottom = status.bodyBCR.top + Math.ceil((status.maxTableOfContentsCount / 2)) * DEFAULT.lineHeight

      // 给目录子项绑定事件
      tableOfContentsData.tableOfContentsDD.forEach((curr, index) => {
        curr.addEventListener('click', function (e) {
          status.hasStopSetHighlight = true;
          $('.tableOfContents .on').classList.remove('on');
          tableOfContentsData.tableOfContentsDD[index].classList.add('on');
          status.historyOnIndex = index;
          const currTop = tableOfContentsData.tableOfContentsList[index].element.getBoundingClientRect().top;
          scrollToDest(currTop + window.pageYOffset - DEFAULT.toTopDistance);
        }, false)
      });
    }
  }

  // 创建目录
  function createTableOfContents(tableOfContentsList) {
    let tableOfContentsHTML = `<div class="tableOfContents">
                                <div class="tableOfContents-line"></div>
                                <div class="tableOfContents-body">
                                  <dl style="margin-top: ${DEFAULT.marginTop}px">`;
    const indexList = Array.from({
      length: tableOfContentsList.length
    }, item => item = 0); // 目录序号列表
    let first = 0, // 一级目录初值
      second = 0, // 二级目录初值
      third = 0, // 三级目录初值
      ddIndex = 0; // 目录序号

    for (let i = 0; i < tableOfContentsList.length; i++) {
      if (tableOfContentsList[i].nodeName === DEFAULT.titleType[0]) {
        indexList[i] = `${++first}`;
        second = 0;
      }
      if (tableOfContentsList[i].nodeName === DEFAULT.titleType[1]) {
        if (first == 0) {
          indexList[i] = `${++second}`;
        } else {
          indexList[i] = `${first}.${++second}`;
        }
        third = 0;
      }
      if (tableOfContentsList[i].nodeName === DEFAULT.titleType[2]) {
        if (first == 0) {
          indexList[i] = `${second}.${++third}`;
        } else {
          indexList[i] = `${first}.${second}.${++third}`;
        }
      }
      tableOfContentsHTML += `<dd class="grade${tableOfContentsList[i].grade} ${ddIndex++ === DEFAULT.currentOnIndex ? 'on' : ''}">
                                <span class="tableOfContents-dot"></span>
                                <span class="tableOfContents-index">${indexList[i]}</span>
                                <button>${tableOfContentsList[i].text}</button>
                              </dd>`;
    };
    tableOfContentsHTML += `</dl></div></div>`;
    return createElement(tableOfContentsHTML);
  }

  // 创建目录数组
  function createTableOfContentsList() {
    const articles = $(DEFAULT.selector), // 获取 articles
      articlesChildren = [...articles.children], // 获取 articles  children
      tableOfContentsList = []; // 目录 list
    // 遍历 articlesChildren 生成目录
    articlesChildren.forEach(function (element) {
      if (DEFAULT.titleType.includes(element.nodeName)) {
        tableOfContentsList.push({
          element: element,
          id: element.id,
          text: element.innerText,
          grade: Number(element.nodeName.substring(1)),
          nodeName: element.nodeName
        });
      }
    });
    return tableOfContentsList;
  }

  /**
   * 字符串转 Element
   * @param {String} str html 字符串
   */
  function createElement(str) {
    var parser = new DOMParser();
    return parser.parseFromString(str, 'text/html').body.firstChild;
  }

  // 动画实现滚动到目标位置
  function scrollToDest(destScrollTop) {
    let startTime;
    let currScrollTop = window.pageYOffset;

    function step(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = Math.round(timestamp - startTime);
      const distance = elapsed * ((Math.floor(destScrollTop) - currScrollTop) / DEFAULT.duration) + currScrollTop;

      document.documentElement.scrollTop = document.body.scrollTop = distance;

      if (elapsed < DEFAULT.duration) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  // 页面的滚动方向
  function setScrollDirection() {
    const pageYOffset = window.pageYOffset;
    status.historyPageYOffset = pageYOffset;
    status.direction = DEFAULT.direction;
    if (pageYOffset < status.historyPageYOffset) {
      status.direction = 'top';
    }
  }

  // 防抖：触发高频事件 n 秒后只会执行一次，如果 n 秒内事件再次触发，则会重新计时。
  function debounce(func, wait = 200) {
    return function (args) {
      const _this = this
      clearTimeout(func.id)
      func.id = setTimeout(function () {
        func.apply(_this, args)
      }, wait)
    }
  }

  /**
   * 节流
   * @param {Function} func 执行函数
   * @param {Number} wait 延迟执行时间
   * @param {Number} intervals 执行间隔
   */
  function throttle(func, wait, intervals) {
    let timeout,
      startTime = new Date();

    return function () {
      const curTime = new Date();

      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 func
      if (curTime - startTime >= intervals) {
        func.apply(this);
        startTime = curTime;
      } else {
        timeout = setTimeout(func, wait);
      }
    };
  };

  function resetHighlightStatus() {
    if (status.hasStopSetHighlight) {
      status.hasStopSetHighlight = false;
    }
  }

  function log(v) {
    console.log(v);
  }
})()
