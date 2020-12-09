---
title: '为什么要进行浏览器兼容性测试'
date: '2020-12-09'
slug: 'why-do-browser-compatibility-tests'
---

“浏览器兼容性测试”的由来，得从 web 的发展说起。

这是个很有名的故事，科学家为了方便共享工作文档，提出了一个 Internet 的新协议和一个使用该协议实现的文档系统的方案，后来这个协议改名为“Word Wide Web”，万维网诞生了，世界上的计算机都连接起来了。

那传输文档的话，文档格式是怎么样的呢？我们知道，文件有特定的格式，jpg、text等。蒂姆·伯纳斯·李（Tim Berners-Lee）发明了三项关键技术：URL、HTML、HTTP，分别定义了，文档传输的来源地址、传输的文档格式、以及怎么传[^1]。

随着 Web 日益流行，对客户端脚本语言的需求也越来越强烈。像页面表单内容验证这样的处理，当时是提交到服务器后进行验证的，按照当时的网速，每次都要等很长的时间。而且，网页要变为动态的，就要有一个脚本语言，用来改变 HTML。于是当时引领技术革新的网景公司，开发了 JavaScript 1.0[^2]。

如今，HTML、CSS、JavaScript，分别为网页的骨架、皮肤和行为。

浏览器就是使用网站提供的 HTML、CSS、JavaScript 形成页面的，而且浏览器还会提供各种各样的附加功能，比如浏览器自带的白天黑夜模式、收藏夹、账号同步等。

而使用 HTML、CSS、JavaScript 形成页面这个过程，是各个浏览器自己做的工作。虽然 W3C 这个组织定义了 HTML、CSS 的规范和标准，TC39 委员会标准化了 ECMAScript 语法和语义。
但是各个浏览器实现这些标准都是有很多差异、区别的。

ECMAScript？哪来的 ECMAScript？

1997 年，JavaScript 1.1 作为提案被提交给欧洲计算机制造商协会（Ecma）。协会成立第 39 技术委员会（TC39）来指定 JavaScript 的规范，委员会的工程师花了好几个月指定了 ECMAScript 脚本语言规范。国际标准化组织（ISO）和国际电工委员会（IEC）也将 ECMAScript 采纳为标准（ISO/IEC-16262）也就是 ECMA-262 标准。

JavaScript 和 ECMAScript 基本上是同义词，但 JavaScript 远远不限于 ECMA-262 所定义的那样。完整的 JavaScript 实现包含以下几个部分：核心（ECMAScript）、文档对象模型（DOM）、浏览器对象模型（BOM）[^3]。浏览器对 JavaScript 的支持，指的是实现 ECMAScript 和 DOM 的程度。JavaScript 使用 DOM API 删除、添加、替换、修改网页的内容，浏览器对 JavaScript 的支持不同，删除、添加、替换、修改网页内容的结果就不同。

此外，浏览器对象模型（BOM）每个浏览器都不一样，BOM 主要针对浏览器窗口和子窗口（frame），通常也会把特定于浏览器的扩展都归在 BOM 的范畴内。比如：弹出新浏览器窗口的能力、缩放和关闭浏览器窗口的能力、navigator 对象（浏览器的信息）、location 对象（浏览器加载页面的信息）、screen 对象（屏幕分辨率）等浏览器提供的 API。有一些所谓的事实标准，
比如对于 window 对象和 navigator 对象，每个浏览器都会给它们定义自己的属性和方法。HTML5 中收录的 BOM 会因浏览器而异，不过开发者仍然可以假定存在很大一部分公共特性。

总结以上：

- CSS 标准的实现情况不同
- 各个浏览器 BOM 实现和提供的特性不同
- 浏览器对 JavaScript 的支持不同，即实现 ECMAScript 和 DOM 的程度不同

导致了需要进行“浏览器兼容性测试”。

[^1]: [维基百科 - 万维网](https://zh.wikipedia.org/wiki/%E4%B8%87%E7%BB%B4%E7%BD%91)
[^2]: [维基百科 - JavaScript](https://zh.wikipedia.org/wiki/JavaScript)
[^3]: [JavaScript 高级程序设计: 第 4 版](https://www.ituring.com.cn/book/2472)
