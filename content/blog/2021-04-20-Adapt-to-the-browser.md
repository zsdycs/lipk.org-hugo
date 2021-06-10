---
title: '优雅地适配浏览器'
date: '2021-04-20'
slug: 'adapt-to-the-browser'
---

前阶段，心血来潮，想用 [Agora.io](https://www.agora.io/cn) 的音视频 api 写一个 [web 应用](https://github.com/zsdycs/room)，发现“全屏”和“退出全屏”的功能要适配各个浏览器十分麻烦，各个浏览器的 api 都有自己的名称。有时候真的搞不懂，同样一个用法，为什么各个浏览器都有不同的方法名称，如：`requestFullscreen`，W3C 规范就是 `requestFullscreen` 这个名字，而各家浏览器有私有名称，所以就有多个不同名称相同功能的方法：

- `requestFullscreen`（规范）
- `msRequestFullscreen`（IE）
- `mozRequestFullScreen`（火狐）
- `webkitRequestFullscreen`（苹果）

为了适配各个浏览器，需要用一堆 `if else` 做判断，可是这样的代码效率太低了，所以一直很好奇别人是如何完成这个兼容工作的。

今天看到 [openseadragon](http://openseadragon.github.io/) 全屏功能的 [代码](https://github.com/openseadragon/openseadragon/blob/master/src/fullscreen.js)，可以说写得很优雅了。定义了一个收集全屏 api 的对象，然后判断各个浏览器特有 api，然后对对象内的属性进行重写。

看着一气呵成，但是要写成这段代码，肯定没少查文档，还有实际测试。前人栽树，后人乘凉。
