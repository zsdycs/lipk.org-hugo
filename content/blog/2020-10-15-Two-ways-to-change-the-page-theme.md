---
title: '改变页面主题的两种方式'
date: '2020-10-15'
slug: 'two-ways-to-change-the-page-theme'
---

## 第一种设置 theme 属性

今天在看 [谷歌文档](https://developers.google.com/protocol-buffers/docs/proto#using_proto3_message_types) 时觉得文档边上的目录很好看，于是打开了 `F12` 看 CSS 是怎么写的，发现了一个改变页面主题的新方法。

这是实现目录左边颜色条的 CSS：

```css
[dir=ltr] devsite-toc > .devsite-nav-list {
  border-left: 4px solid #5f6368;
  border-left-color: var(--devsite-toc-border, var(--devsite-primary-color, #5f6368));
}
```

默认是 `#5f6368`，但是 border-left-color 设置里有两个参数，`--devsite-toc-border` 和 `--devsite-primary-color`，CSS 中以 `--` 开头代表是变量的意思。

于是继续往下看，看到了这个：

```css
[theme=google-blue] {
  --devsite-primary-color: #1a73e8;
  --devsite-dark-color: #185abc;
  --devsite-light-color: #4285f4;
  --devsite-upper-tab-active: #185abc;
}
```

根据浏览器描述，这是一个继承自 body 的样式，另外，`[theme=google-blue]` 比较陌生，查看了一下 [CSS 选择器的文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) 原来是一个属性选择器，再看 HTML。

```html
……
<body theme="google-blue">……</body>
……
```

这下都明白了，改变了 body 的 theme 属性，会使不同的 CSS [theme=xxxx] 生效，从而使不同的颜色变量生效，从而实现改变主题。

## 第二种设置 disable 属性

这种方式是目前本站在用的，是在 [highlightjs 的官网](https://highlightjs.org/) 看到的。

html 是这样的：

```html
……
<link rel="stylesheet" id="github-light" href="/css/github-light.css">
<link rel="stylesheet" id="github-dark" href="/css/github-dark.css" disabled>
<link rel="stylesheet" id="github-dark-orange" href="/css/github-dark-orange.css" disabled>
……
```

js 是这样的：

```javascript
var githubLightCSS = document.querySelector('#github-light');
……
githubLightCSS.disabled = false;
……
githubLightCSS.disabled = true;
```

就这么简单，这需要浏览器加载多个 CSS 文件，但有一点比较好的就是，每个主题的 CSS 文件分开管理，会比较清晰。
