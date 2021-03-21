window.onload = function () {
  "use strict";
  // ************************************************** 变量 **************************************************
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const DEFAULT = {
    selector: 'article', // 文章内容中标题标签 selector
    titleType: ['H1', 'H2', 'H3'], // 目录标题类型 三级目录
    lineHeight: 36, // 每个菜单行高
    currentOnIndex: 0, // 当前高亮目录索引
    surplusHeight: 230, // 除了菜单高度 + 留白高度
    displayWidth: 1220, // 最小屏幕宽度
    toTopDistance: 60, // 标题顶部距离窗口高度
    wait: 500, // 防抖延迟时间
    intervals: 200, // 执行间隔
    fontSize: {
      'normal': 16,
      'small': 12,
    },
    gradeMaxWidth: {
      1: 200, // 一级标题
      2: 175, // 二级标题
      3: 150 // 三级标题
    }
  };

  // ************************************************** 逻辑 **************************************************

  // 添加目录
  const tableOfContentsList = createTableOfContentsList();
  const tableOfContentsElement = createTableOfContents(tableOfContentsList);
  $('#tableOfContents-bar').insertAdjacentElement('afterbegin', tableOfContentsElement);

  const tableOfContentsData = {
    tableOfContentsBar: $('#tableOfContents-bar'),
    tableOfContentsBody: $('.tableOfContents-body'),
    tableOfContentsDL: $('.tableOfContents dl'),
    tableOfContentsDD: $$('.tableOfContents dd'),
    tableOfContentsList: tableOfContentsList,
    tableOfContentsElement: tableOfContentsElement
  };

  const status = {
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
    // marginTop: 0, // 菜单偏移距离
  }

  // 初始化
  initTableOfContentsList();
  initStyle();

  // 滚动时高亮目录
  window.addEventListener('scroll', function () {
    throttle(setHighlight, DEFAULT.wait, DEFAULT.intervals)();
    debounce(resetHighlightStatus, DEFAULT.wait, DEFAULT.intervals)();
    // debounce(setHighlight, DEFAULT.wait)();
    // debounce(resetHighlightStatus, DEFAULT.wait)();
  }, false);

  // 目录自动滚动
  // if (tableOfContentsData.tableOfContentsList.length > status.maxTableOfContentsCount) {
  //   window.addEventListener('scroll', function () {
  //     debounce(scrollTableOfContents, DEFAULT.wait)();
  //   }, false)
  // }

  // 视图窗口大小改变
  window.addEventListener('resize', function (e) {
    throttle(initTableOfContentsList, DEFAULT.wait, DEFAULT.intervals)()
  }, false)

  // ************************************************** 函数 **************************************************

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

  // 创建目录
  function createTableOfContents(tableOfContentsList) {
    let tableOfContentsHTML = `<div class="tableOfContents"><div class="tableOfContents-body"><dl>`;
    const indexList = Array.from({
      length: tableOfContentsList.length
    }, item => item = 0); // 目录序号列表
    let first = 0, // 一级目录初值
      second = 0, // 二级目录初值
      third = 0, // 三级目录初值
      ddIndex = 0; // 目录序号

    for (let i = 0; i < tableOfContentsList.length; i++) {
      let grade = 0; // 目录等级
      if (tableOfContentsList[i].nodeName === DEFAULT.titleType[0]) {
        indexList[i] = `${++first}`;
        second = 0;
        grade = tableOfContentsList[i].grade;
      }
      if (tableOfContentsList[i].nodeName === DEFAULT.titleType[1]) {
        if (first == 0) {
          indexList[i] = `${++second}`;
          grade = --tableOfContentsList[i].grade;
        } else {
          indexList[i] = `${first}.${++second}`;
          grade = tableOfContentsList[i].grade;
        }
        third = 0;
      }
      if (tableOfContentsList[i].nodeName === DEFAULT.titleType[2]) {
        if (first == 0 && second == 0) {
          indexList[i] = `${++third}`;
          grade = --tableOfContentsList[i].grade;
        } else if (first == 0 && second !== 0) {
          indexList[i] = `${second}.${++third}`;
          grade = --tableOfContentsList[i].grade;
        } else {
          indexList[i] = `${first}.${second}.${++third}`;
          grade = tableOfContentsList[i].grade;
        }
      }
      tableOfContentsHTML += `<dd class="grade${grade} ${ddIndex++ === DEFAULT.currentOnIndex ? 'on' : ''}"><span class="tableOfContents-dot"></span><span class="tableOfContents-index">${indexList[i]}</span><button style="max-width: ${DEFAULT.gradeMaxWidth[tableOfContentsList[i].grade]}px; font-size: ${DEFAULT.fontSize[getStrWidthSize(tableOfContentsList[i].text, DEFAULT.gradeMaxWidth[tableOfContentsList[i].grade], DEFAULT.fontSize['normal'])]}px;">${tableOfContentsList[i].text}</button></dd>`;
    };
    tableOfContentsHTML += `</dl></div></div>`;
    return createElement(tableOfContentsHTML);
  }

  // 初始化
  function initTableOfContentsList() {
    if (window.innerWidth <= DEFAULT.displayWidth) {
      tableOfContentsData.tableOfContentsBar.style.display = 'none';
      $('.main').style.borderRight = '0px';
      return;
    }
    $('.main').style.borderRight = '1px solid var(--main-border-color)';
    tableOfContentsData.tableOfContentsBar.style.display = 'block';
    const tempHeight = window.innerHeight;

    if (status.historyViewHeight !== tempHeight) {
      status.historyViewHeight = tempHeight;
      status.maxTableOfContentsCount = Math.floor((status.historyViewHeight - DEFAULT.surplusHeight) / DEFAULT.lineHeight);
      const maxTableOfContentsHeight = status.maxTableOfContentsCount * DEFAULT.lineHeight;
      const currentTableOfContentsHeight = tableOfContentsData.tableOfContentsList.length * DEFAULT.lineHeight
      // 大于窗口内能容纳最大目录个数，则使用最大高度，否则使用当前生成目录的高度
      const tableOfContentsHeight = tableOfContentsData.tableOfContentsList.length > status.maxTableOfContentsCount ? maxTableOfContentsHeight : currentTableOfContentsHeight;

      // 设置目录高度
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
          const fun = function (e) {
            window.scrollTo(0, e);
          };
          animation(parseInt(document.documentElement.scrollTop), currTop + window.pageYOffset - DEFAULT.toTopDistance, 5, fun);
        }, false)
      });
    }
  }

  // 高亮目录
  function setHighlight() {
    status.direction = currentScrollDirection(); // 滚动方向

    if (status.hasStopSetHighlight) {
      return;
    }

    const current = $('.tableOfContents .on');
    const onIndex = [].indexOf.call(tableOfContentsData.tableOfContentsDD, current); // 当前高亮索引
    const tableOfContentsLength = tableOfContentsData.tableOfContentsList.length;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    let nextOnIndex = onIndex; // 滚动后高亮索引
    if (current) {
      current.classList.remove('on');
    }

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
          const currTop = tableOfContentsData.tableOfContentsList[nextOnIndex].element.getBoundingClientRect().top;
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

  // 自动滚动目录树，使得当前高亮目录在可视范围内
  // function scrollTableOfContents() {
  //   const currentOn = $('.tableOfContents .on');

  //   if (!currentOn) {
  //     return;
  //   }
  //   const currOnBCR = currentOn.getBoundingClientRect();
  //   const tableOfContentsDlBCR = tableOfContentsData.tableOfContentsDL.getBoundingClientRect();

  //   if (status.direction === 'bottom') { // 向下滚动
  //     if (currOnBCR.bottom + (status.maxTableOfContentsCount / 2) * DEFAULT.lineHeight <= status.bodyBCR.bottom) { // 高亮在目录上半部分
  //       // 不滚动
  //     } else if (currOnBCR.bottom - status.bodyMidBottom < tableOfContentsDlBCR.bottom - status.bodyBCR.bottom) { // 中位以下
  //       status.marginTop += -Math.floor((currOnBCR.bottom - status.bodyMidBottom) / DEFAULT.lineHeight) * DEFAULT.lineHeight;
  //     } else if (status.bodyBCR.bottom <= tableOfContentsDlBCR.bottom) { // 当剩余滚动距离
  //       status.marginTop = status.bodyBCR.bottom - status.initDLBottom;
  //     }
  //   } else { // 向上滚动
  //     if (status.bodyBCR.top + (status.maxTableOfContentsCount / 2) * DEFAULT.lineHeight <= currOnBCR.top) {
  //       // 不滚动
  //     } else if (status.bodyMidBottom - currOnBCR.top < status.bodyBCR.top - tableOfContentsDlBCR.top) {
  //       status.marginTop += Math.floor((status.bodyMidBottom - currOnBCR.top) / DEFAULT.lineHeight) * DEFAULT.lineHeight;
  //     } else if (tableOfContentsDlBCR.top <= status.bodyBCR.top) {
  //       status.marginTop = 0;
  //     }
  //   }
  //   tableOfContentsData.tableOfContentsDL.style.marginTop = status.marginTop + 'px';
  // }

  function initStyle() {
    const importStyle = document.createElement('style');
    const cssText = document.createTextNode(`/* 文章目录 */
    #tableOfContents-bar {
      top: 0;
      width: 268px;
      float: right;
      position: sticky;
    }

    .tableOfContents {
      position: relative;
      padding-top: 30px;
    }

    .tableOfContents .tableOfContents-body {
      padding-left: 20px;
      overflow: auto;
    }

    .tableOfContents .tableOfContents-body dl {
      margin: 0;
      transition: 0.3s all;
    }

    .tableOfContents .tableOfContents-body dd {
      position: relative;
      padding: 4px 0px;
      margin: 0;
      line-height: 28px;
      cursor: pointer;
    }

    .tableOfContents-body .tableOfContents-index {
      color: var(--blockquote-color);
    }

    .tableOfContents button {
      background: linear-gradient(var(--menu-button-background-color), var(--menu-button-background-color));
      color: var(--html-color);
      margin-left: 5px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tableOfContents-body .tableOfContents-dot {
      position: absolute;
      background-color: var(--main-border-color);
      border: 1px solid var(--main-border-color);
      border-radius: 2em;
    }

    .tableOfContents-body .grade1 .tableOfContents-dot {
      left: -17px;
      top: 15px;
      width: 8px;
      height: 8px;
    }

    .tableOfContents-body .grade2 .tableOfContents-dot {
      left: -15px;
      top: 17px;
      width: 4px;
      height: 4px;
    }

    .tableOfContents-body .grade3 .tableOfContents-dot {
      visibility: hidden;
    }

    .tableOfContents-body dd.on .tableOfContents-dot {
      visibility: visible;
      position: absolute;
      left: -18px;
      top: 12px;
      width: 12px;
      height: 12px;
      background-color: var(--a-color);
      border-radius: 2em;
      border-width: 0;
    }

    .tableOfContents-body dd.on .tableOfContents-index {
      color: var(--a-color);
    }

    .tableOfContents-body dd.on button {
      color: var(--a-color);
    }

    .tableOfContents-body dd button:hover {
      color: var(--a-color);
    }`);
    importStyle.appendChild(cssText);
    const heads = document.getElementsByTagName("head");
    if (heads.length) {
      heads[0].appendChild(importStyle);
    } else {
      document.documentElement.appendChild(importStyle);
    }
  }

  // ************************************************** 工具 **************************************************

  /**
   * 字符串转 Element
   * @param {String} str html 字符串
   */
  function createElement(str) {
    var parser = new DOMParser();
    return parser.parseFromString(str, 'text/html').body.firstChild;
  }

  /**
   * @param current 当前位置
   * @param target 目标位置
   * @param rate 缓动率
   * @function fun 执行函数
   */
  function animation(current, target, rate, fun) {
    if (current === target) {
      return;
    }

    function step() {
      current += (target - current) / rate;
      if (Math.abs(target - current) < 1) {
        fun(target);
        return;
      }
      fun(current);
      window.requestAnimationFrame(step);
    };
    step();
  }
  // 页面的滚动方向
  function currentScrollDirection() {
    const pageYOffset = window.pageYOffset;
    let direction = 'bottom';
    if (pageYOffset < status.historyPageYOffset) {
      direction = 'top';
    } else {
      direction = 'bottom';
    }
    status.historyPageYOffset = pageYOffset;
    return direction;
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

  // 重置是否立即高亮
  function resetHighlightStatus() {
    if (status.hasStopSetHighlight) {
      status.hasStopSetHighlight = false;
    }
  }

  /**
   * 文字内容是否超过元素宽度
   * @param {String} content 内容
   * @param {Number} width
   * @param {Number} fontSize
   */
  function getStrWidthSize(content, width, fontSize) {
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
      return 'small';
    } else {
      return 'normal';
    }
  }
}
