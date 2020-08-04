---
title: '六种色彩模式'
date: '2020-07-28'
slug: 'six-color-modes'
_highlight: true
---

就在昨夜，我终于完成了本站对 [Beaudar](https://beaudar.lipk.org) 现有的，六个主题的兼容。

现在，可以看到，这六种色彩模式：

```javascript
/**
  * 顺序：
  *    -> 'github-light'        // 白天
  *    -> 'github-dark'         // 黑夜
  *    -> 'github-dark-orange'  // 橘暮
  *    -> 'dark-blue'           // 幽瞑
  *    -> 'icy-dark'            // 雨晨
  *    -> 'photon-dark'         // 紫夜
  */
```

中文名称我自己也感觉起得一般，但也基本是符合色彩营造的意境了，如果对主题的中文名称有任何建议，非常欢迎留言。

这个站点的主题，迭代了很多次。一开始，使用 [Darkmode.js](http://github.com/sandoche/Darkmode.js)🌗 来添加黑夜模式。后来，觉得这种通过 CSS `mix-blend-mode: difference` 实现黑夜模式的方式太过于不可控了，然后就将所有的关于色彩的 CSS 都整理了出来，写了“白天”和“黑夜”两个模式。因为维护 [Beaudar](https://beaudar.lipk.org) 的关系，心想着要不直接适配 Beaudar 的所有主题吧~

最终结果就是现在这个情况——Beaudar 和 lipk.org 像是一个整体一般，风格统一。

实现的代码在这里 [mode.js](https://github.com/zsdycs/lipk.org/blob/master/static/js/mode.js)。
