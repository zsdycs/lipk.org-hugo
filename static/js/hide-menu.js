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

  var $ = document.querySelector.bind(document);
  var menu = $('header.masthead');
  if (!menu) return;
  var oldPageYOffset = window.pageYOffset;
  var documentElementClientHeight = document.documentElement.clientHeight;

  function getScrollDirection() {
    if (window.innerWidth < 1220) {
      if (window.pageYOffset < 50) {
        menu.style.display = 'block';
        return;
      };
      if (document.documentElement.scrollHeight - document.documentElement.scrollTop - 300 <= documentElementClientHeight) {
        menu.style.display = 'block';
        return;
      }
      var newPageYOffset = window.pageYOffset;
      if (newPageYOffset < oldPageYOffset) {
        menu.style.display = 'block';
      } else if ((newPageYOffset - oldPageYOffset) > 20) {
        menu.style.display = 'none';
      }
      oldPageYOffset = newPageYOffset;
    } else {
      menu.style.display = 'block';
    }
  }
  document.addEventListener('scroll', throttle(getScrollDirection, 500, 200));
  window.addEventListener('resize', throttle(getScrollDirection, 500, 200));

})()
