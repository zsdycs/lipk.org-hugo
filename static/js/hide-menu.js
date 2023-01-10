(function () {
  /**
   * 节流
   * @param {Function} func 执行函数
   * @param {Number} wait 延迟执行时间
   * @param {Number} runTime 执行间隔
   */
  const throttle = (func, wait, runTime) => {
    let startTime = new Date();
    let timeout = null;

    return function () {
      const current = new Date();

      if (timeout) {
        clearTimeout(timeout);
      }
      // 如果达到了规定的触发时间间隔，触发 func
      if (current - startTime >= runTime) {
        func.apply(this, arguments);
        startTime = current;
      } else {
        timeout = setTimeout(func, wait);
      }
    };
  };

  var $ = document.querySelector.bind(document);
  var menu = $('header.masthead');
  var fixedBtn = $('#fixed-button');
  if (!menu) return;
  var oldPageYOffset = window.pageYOffset;
  var documentElementClientHeight = document.documentElement.clientHeight;

  function getScrollDirection() {
    if (window.innerWidth < 1220) {
      if (window.pageYOffset < 50) {
        menu.style.display = 'block';
        if (fixedBtn) {
          fixedBtn.style.display = 'block';
        }
        return;
      }
      if (
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          300 <=
        documentElementClientHeight
      ) {
        menu.style.display = 'block';
        if (fixedBtn) {
          fixedBtn.style.display = 'block';
        }
        return;
      }
      var newPageYOffset = window.pageYOffset;
      if (newPageYOffset < oldPageYOffset) {
        menu.style.display = 'block';
        if (fixedBtn) {
          fixedBtn.style.display = 'block';
        }
      } else if (newPageYOffset - oldPageYOffset > 20) {
        menu.style.display = 'none';
        if (fixedBtn) {
          fixedBtn.style.display = 'none';
        }
      }
      oldPageYOffset = newPageYOffset;
    } else {
      menu.style.display = 'block';
      if (fixedBtn) {
        fixedBtn.style.display = 'block';
      }
    }
  }
  document.addEventListener('scroll', throttle(getScrollDirection, 500, 200));
  window.addEventListener('resize', throttle(getScrollDirection, 500, 200));
})();
