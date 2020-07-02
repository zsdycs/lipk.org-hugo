(function () {
  var toc = document.getElementById('TableOfContents');
  if (!toc) return;
  var topUl = toc.querySelector('ul');
  for (let i = 0; i < topUl.children.length; i++) {
    var topUlChild = topUl.children[i];
    topUlChild.insertAdjacentHTML('afterbegin', `<i class="fa fa-minus topUlChild"></i>`);
    var secondaryUl = topUl.children[i].querySelector('ul');
    if (secondaryUl) {
      for (let j = 0; j < secondaryUl.children.length; j++) {
        var secondaryUlChild = secondaryUl.children[j];
        secondaryUlChild.insertAdjacentHTML('afterbegin', `<i class="fa fa-minus secondaryUlChild"></i>`);
      }
    }
  }
  // TODO 高亮
})();