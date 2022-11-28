---
title: '静态页面字体子集化'
date: '2022-11-28'
slug: 'subset-static-page-fonts'
---

> 觉得“思源宋体”很好看，所以本站之前都是通过请求“use.typekit.net/kwz5xar.js”加载“思源宋体”的，但是由于 typekit.net 是 Adobe 的服务，在网络稍差时会加载失败，而且也不是自托管的，难免有一些不信任。
> 所以一直想找到一个稳定得分方式加载字体，现在找到了。

使用 [fontmin](https://github.com/ecomfe/fontmin) 和 [font-spider](https://github.com/aui/font-spider) 主要使用这两个库。原以为借助库应该不难，但实际需要花上一些时间。

### fontmin 和 font-spider 的关系

先介绍一下上面两个库是做什么事情的。

fontmin 是你给它一段文字，它在字体包里获取这一段文字的字型，这种“在完整字体资源中获取指定部分文字资源”的过程就是“字体子集化”。

这个过程 fontmin 内部用的是 [fonteditor-core](https://github.com/kekee000/fonteditor-core)，有趣的是这个 fonteditor-core 看着是一个个人库，但却是百度在线字体编辑器这个产品的内核，看来百度挺开放的，也可能是这个东西比较边缘吧。

font-spider 就是在网页（在线网站、网页的 HTML 文件等）中抓取包含文字的一个库，然后将抓取出来的文字提供给 fontmin。

所以，“网页字体子集化”就是：网页（网站地址、网页的 HTML 文件等） → font-spider → 页面包含的文字 → “fontmin + 字体资源” → 子集化的字体包。

### 转换 OTF 为 TTF

fonteditor-core 只支持子集化 TTF 格式的字体资源，而思源宋体在 [release](https://github.com/adobe-fonts/source-han-serif/releases) 中并没给出 TTF 的字体包，简单了解后我想是因为 OTF 是 Adobe 自家推出的字体格式的缘故吧，所以就需要用到 [afdko](https://github.com/adobe-type-tools/afdko) 这个库来转换 OTF 为 TTF。

当然 fontmin 也有使用 fonteditor-core 实现的 otf2ttf 这个功能，但是我尝试了有各种问题，而 afdko 这个库里的 otf2ttf 这个程序完全没有问题。

至于怎么使用 afdko 这个库里的 otf2ttf，只需要安装好 afdko 后，看命令行输出的安装路径，直接到路径下的 otf2ttf，执行 `otf2ttf` 就好了。

当然，要有 OTF 文件路径和存放转后 TTF 文件的路径。具体可以看 `help` 的描述。

### 工程化的字体子集化

要怎么持续的，自动化的给 font-spider 提供网页资源，我的网站用的 gulp，进行的打包，所以使用了 [gulp-font-spider](https://github.com/aui/gulp-font-spider)，在使用过程中也遇到了问题，因为它是将所有页面的文字资源都合起来，然后提供给 font-spider，这样的话，每个页面加载的字体包都会是包含整个网站的字体资源，我是希望每个页面一个独立的字体包，这样字体包就是最小的了。

由于我是提供 `./` 来获取页面的字体资源，所以像 `/`、`/about`、`/food`等，同级的页面都需要使用同一个字体包，所以按照这个需求，我改了一下 gulp-font-spider，也相当于是参考着自己写了一个。

这个过程中还在 font-spider [添加](https://github.com/zsdycs/lipk.org/commit/9d1ac391d8952c8a10565013cab6ea92aea589b8#diff-d02f29ba76b3d50cbbbc8ad02c73dbce95b20c9c3c7368ec58cd32dcd4eb82c8) 了一个配置项 `extraFontFaceRule`，但考虑到 font-spider 很久没有更新了，就没有提交到 font-spider 的源库，fontmin 也都 copy 到自己的项目下玩了。

### 静悄悄地加载字体

已经在每个页面的路径下“子集化”了页面的字体包，该如何加载又花了一些时间调查。得出了通过 ajax 异步加载，是最合适的。

关键技巧是需要知道：

1. ajax 获取到 blob 转换为 base64 才能让浏览器读取到资源
2. FontFace 的 `font-display` 要是 `swap` 才能顺滑加载
3. `FontFace.load()` 后才能 `document.fonts.add(Font)`，不然浏览器不认 add 的字体

下面给出“静悄悄地加载字体”的代码。

```javaScript
const getBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(blob);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
};

const ajaxFont = (args) => {
  const { url } = args;
  return new Promise((resolve) => {
    const xhrSemiBold = new XMLHttpRequest();
    xhrSemiBold.open('GET', url, true);
    xhrSemiBold.responseType = 'blob';
    xhrSemiBold.send();
    xhrSemiBold.onload = (event) => {
      resolve(event.currentTarget.response);
    };
  });
};

ajaxFont({ url: './fontSource/SourceHanSerifCN-Light.ttf' }).then(
  (response) => {
    getBase64(response).then((base64) => {
      const lightFont = new FontFace('source-han-serif-sc', `url(${base64})`, {
        ['font-display']: 'swap',
        weight: '100',
      });
      lightFont.load().then(() => {
        document.fonts.add(lightFont);
      });
    });
  },
);

ajaxFont({ url: './fontSource/SourceHanSerifCN-SemiBold.ttf' }).then(
  (response) => {
    getBase64(response).then((base64) => {
      const semiBoldFont = new FontFace(
        'source-han-serif-sc',
        `url(${base64})`,
        {
          ['font-display']: 'swap',
          weight: 'normal',
        },
      );
      semiBoldFont.load().then(() => {
        document.fonts.add(semiBoldFont);
      });
    });
  },
);
```
