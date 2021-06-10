---
title: '在博客中添加 B 站视频'
date: '2020-08-08'
slug: 'add-bilibili-video-to-your-blog'
pictureView: [
  {
    title: '人家的效果截图',
    src: 'https://lipk.oss-accelerate.aliyuncs.com/images/2020-08-08-Add-bilibili-video-to-your-blog(1).jpg',
  },
  {
    title: '我的测试截图',
    src: 'https://lipk.oss-accelerate.aliyuncs.com/images/2020-08-08-Add-bilibili-video-to-your-blog(2).jpg',
  }
]
---

今天在逛博客时看到有篇博客把 B 站的视频添加到了文章里，非常新奇。

原来是 B 站提供了使用 iframe 代码片段分享视频的功能。于是我兴高采烈地，打算把我上学时为了装 X 而做的两个视频放上来。可是一测试，蒙了，怎么和 [人家](https://www.yunyoujun.cn/diary/life-is-not-a-marathon/) 的不一样！

![人家的效果截图](https://lipk.oss-accelerate.aliyuncs.com/images/2020-08-08-Add-bilibili-video-to-your-blog(1).jpg)

![我的测试截图](https://lipk.oss-accelerate.aliyuncs.com/images/2020-08-08-Add-bilibili-video-to-your-blog(2).jpg)

直接使用代码片段，视频非常小而且除了播放按钮，连全屏功能都没有。查阅了 [iframe 的文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) ，iframe 的高度默认是 150，宽度默认 300，然后我看了一下那篇博客的 iframe 是添加了一个 `height="520"` 的。我加了之后效果是一致了，可是我觉得还可以更好看。

于是我在 iframe 外层添加了一个 P 标签，进行隐藏 iframe 上下的多余内容，并在屏幕宽度小于 545px 时对视频的高度进行了动态处理。

```html
<p class="billibili">
  <iframe class="billibili" src="//player.bilibili.com/player.html?aid=43520227&bvid=BV1Tb41127wF&cid=76266064&page=1"
  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</p>
```

```css
  p.billibili {
    overflow: hidden;
  }

  iframe.billibili {
    width: 100%;
    height: 480px;
    margin-top: -75px;
    margin-bottom: -38px;
  }

  @media only screen and (max-width: 545px) {
    iframe.billibili {
      --width: calc(100vw - 50px);

      height: calc(var(--width) / 1.75);
      margin: 0;
    }
  }
```

## 效果如下

<p class="billibili">
  <iframe class="billibili" src="//player.bilibili.com/player.html?aid=43520227&bvid=BV1Tb41127wF&cid=76266064&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</p>

上面这个是大二时，我和同学一起做的一个“APP 原型设计展示视频”，是介绍我们“APP 交互设计”课设计的 APP 的，结课时配套有 PPT 在班里展示的，单单这么看可能会看得糊里糊涂的，不过嘛，就看看好了，不必深究内容。

下面这个是我实习时，工作汇报用的视频，当然啦，视频里的内容在现在看来真的是“too young,too simple”了，而且视频里的链接也是失效了。不过项目代码倒是有，欢迎到 [我的 Github 代码库](https://github.com/zsdycs) 寻找。

<p class="billibili">
  <iframe class="billibili" src="//player.bilibili.com/player.html?aid=43516793&bvid=BV1Kb41127P4&cid=76261339&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</p>

感谢观看！
