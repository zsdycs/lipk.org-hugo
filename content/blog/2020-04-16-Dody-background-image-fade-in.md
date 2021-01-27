---
title: 'Body，你背景图咋淡入哇？'
date: '2020-04-16'
slug: 'body-background-image-fade-in'
---

## 缘由

今天偶然看到本站在加载页面时的一个问题。

由于本站默认是夜间模式，夜间模式是通过 CSS 的 `mix-blend-mode: difference` 实现的，模式切换通过异步载入的 js 控制。

这就导致背景图片（白色）加载完成后切换到夜间模式会发生闪烁，这违背了黑夜模式的初衷。

## 过程

对于背景图片的淡入，网上有很多种解决方法。
有说用 `animation` + `opacity` 的。像这样写:

```CSS
#background-div {
    /* 加载自定义的 bgFadeIn 动画 */
    animation: bgFadeIn 3s ease-in;
}

@-webkit-keyframes fadeIn {
    0% {
    /* opacity 属性初始值 */
        opacity: 0;
    }
    100% {
    /* 动画完成后 opacity 的值 */
        opacity: 1;
    }
}
```

也有说用使用 `transition` + `opacity` 实现的。也就是这样写:

```CSS
#background-div {
    /* opacity 属性初始值 */
    opacity: 0;
    /* transition 控制 opacity 属性 */
    transition: opacity 3s ease-in;
}

#background-div:hover {
    opacity: 1;
}
```

我用了都没有用。为什么呢？我发现这些都是在控制元素本身，并不能控制元素的 `background`，也就是元素的属性。
这种情况下，唯有 JS。
于是，我决定放弃搜索。思考了一下，只要在页面加载时，黑夜白天模式~~切换~~加载完成后，对背景进行设置其实就可以解决问题。

## 解决

也就是这样:

```javascript
// 黑夜白天模式载入
const mode = new Darkmode(options);
mode.showWidget();

// body 背景 延迟载入
document.body.style.background = 'url(https://lipk.oss-ap-southeast-1.aliyuncs.com/images/your-background-image.png)';
document.body.style.backgroundRepeat = 'repeat';
```

这个故事告诉我们，很多时候，解决问题的方法不是我们刚开始想象的那样。
也就是可能一开始~~的方向可能就是错的~~问题都没弄清。要变通，虽然一条路是可以走到黑，但是换个角度思考问题，一定是解决问题的正确方法。
