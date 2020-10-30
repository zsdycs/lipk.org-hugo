(function () {
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

  var lastPageYOffset = window.pageYOffset;
  var $ = document.querySelector.bind(document);
  function getScrollDirection() {
    if (window.innerWidth < 1220) {
      var pageYOffset = window.pageYOffset;
      var menu = $('header.masthead');
      if (window.pageYOffset < 50) return;
      if (pageYOffset < lastPageYOffset) {
        menu.style.display = 'block';
      } else {
        menu.style.display = 'none';
      }
      lastPageYOffset = pageYOffset;
    }
  }
  document.addEventListener('scroll', throttle(getScrollDirection, 80, 120));

})()
