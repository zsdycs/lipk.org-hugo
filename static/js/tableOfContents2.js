(function () {
  "use strict";

  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const DataList = {
    selector: 'article', // 文章内容中标题标签 selector
    titleType: ['H1', 'H2', 'H3'], // 目录标题类型 三级目录
    maxTableOfContentsCount: 0, // 窗口内能容纳最大目录个数
    marginTop: 0, // 菜单初始滚动距离
    lineHeight: 28, // 每个菜单行高 28 px
    currentOnIndex: 0, // 当前高亮目录索引

    moreHeight: 10, // 菜单左侧线比菜单多出高度
    surplusHeight: 180, // 除了菜单高度 + 留白高度
    delay: 200, // 防抖延迟时间
    duration: 200, // 滚动动画持续时间
    toTopDistance: 80, // 距离窗口顶部多少高度之内时候触发高亮
    tableOfContentsLength: 0,
    viewPortHeight: 0, // 当前窗口高度
    DataListDirec: 'bottom', // 默认滚动方向
    lastSH: 0, // 获取页面初始滚动距离
    tableOfContentsBody: [], // .tableOfContents-body
    tableOfContentsDL: null, // .tableOfContents-body dl
    tableOfContentsDD: [], // .tableOfContents-body dd
    initBodyTop: 0, // 目录可视区域 top
    initDlBottom: 0, // 目录 dl bottom
    firstDdTop: 0, // 第一个 dd top
    bodyMidBottom: 0, // 目录可视区域中间位置 dd bottom
    bodyBCR: null, // 目录可视区域边界值
    hasStopSetHighlight: false // 在点击目录子项时候直接高亮当前目录，而不通过 scroll 事件触发 setHighlight 函数
  };

  const tableOfContentsList = getTableOfContentsList();
  createTableOfContents(tableOfContentsList);

  // 创建目录
  function createTableOfContents(tableOfContentsList) {
    // 大于窗口内能容纳最大目录个数，则使用最大高度，否则使用当前生成目录的高度
    let tableOfContentsHeight = tableOfContentsList.length > DataList.maxTableOfContentsCount ?
      DataList.maxTableOfContentsCount * DataList.lineHeight :
      tableOfContentsList.length * DataList.lineHeight;
    let tableOfContentsHTML = `<div class="tableOfContents">
                                <div class="tableOfContents-line" style="height: ${tableOfContentsHeight + DataList.moreHeight}px"></div>
                                <div class="tableOfContents-body" style="max-height: ${tableOfContentsHeight}px; height: ${tableOfContentsHeight}px">
                                  <dl style="margin-top: ${DataList.marginTop}px">`;
    const indexList = new Array(DataList.titleType.length);

    for (let item of tableOfContentsList) {
      for (let type of DataList.titleType) {
        if (item.grade === Number(type.substring(1))) {
          // TODO
        }
      }
      if (item.grade === DataList.titleType[DataList.titleType.length - 1]) {
        acIndex = `${h2Index}.${h3Index++}`
      }
      tableOfContentsHTML += `<dd class="grade${item.grade} ${index++ === DataList.currentOnIndex ? 'on' : ''}">
                                <span class="tableOfContents-dot"></span>
                                <span class="tableOfContents-index">${acIndex}</span>
                                <button>${item.title}</button>
                              </dd>`;
    };
    tableOfContentsHTML += `</dl></div></div>`;

  }

  // 获取目录 list
  function getTableOfContentsList() {
    const articles = $(DataList.selector), // 获取 articles
      articlesChildren = [...articles.children], // 获取 articles  children
      tableOfContentsList = []; // 目录 list
    // 遍历 articlesChildren 生成目录
    articlesChildren.forEach(function (element) {
      if (DataList.titleType.includes(element.nodeName)) {
        tableOfContentsList.push({
          id: element.id,
          text: element.innerText,
          grade: Number(element.nodeName.substring(1))
        });
      }
    });
    log(tableOfContentsList);
    return tableOfContentsList;
  }

  function log(v) {
    console.log(v);
  }
})()
