---
title: '运行 Utterances 的详细教程'
date: '2020-06-08'
slug: 'run-utterances'
disable_mathjax: true
---

> 本文将从 Utterances 是如何工作的；如何在本地及生产环境运行；身份授权 oauth 代码配置及运行。
> 这 3 个方面进行讲解。同理，本文适用于 [Beaudar(表达)](http://beaudar.lipk.org)

## Utterances 是如何工作的

Utterances（下面简称“UT”）有两份代码，一份是提供 client.js 的前端代码，一份是用于身份授权的“后端”代码。

我们知道使用 UT 是这样的：

```html
<script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

这里就是去请求前端代码的 client.js，然后我们可以通过浏览器控制台或源代码可以看出，client.js 会去请求 `api.github.com` 和 `api.utteranc.es`。
请求 `api.github.com` 是获得 issue 的内容，这个是公开的，无需授权。而 `api.utteranc.es` 是第二份代码实现的，用于授权登录和评论，是前端代码与 GitHub 身份认证的桥梁。

登录和评论的实现。在登录时，会通过请求 `api.utteranc.es` 然后跳转到 UT 的 GitHub App 进行授权，登录后“后端”代码会返回一个 token。当用户进行评论时，前端会拿着这个 token 去请求 `api.github.com`，这时，UT 会通过指定的用户 [utterances-bot](https://github.com/utterances-bot) 创建 issue。

这样下来，我们知道，除了要有 [utterance/utterances](https://github.com/utterance/utterances) 和 [utterance/utterances-oauth](https://github.com/utterance/utterances-oauth) 这两份代码，还要有一个 GitHub app 和一个用于创建 issue 的用户。

## 如何在本地及生产环境运行

### 本地运行调试

基本的操作可以参考 [UT 的贡献文档](https://github.com/utterance/utterances/blob/master/CONTRIBUTING.md) 或翻译后的 [Beaudar的贡献文档](https://github.com/beaudar/beaudar/blob/master/CONTRIBUTING.MD)。

关于 host 重定向的操作可以在 [这个帮助文档](https://lipk.org/blog/2020/06/08/beauder-qa/)，找到设置的手顺。

在本地运行的时候，如果你在本地运行引用 UT 的站点，也是可以通过请求 `http://localhost:4000/client.js` 使用的。因为 UT 的后端，“ORIGINS” 来源设置了允许来自本地的请求。

### 生产环境部署

UT 是基于 node 的，在 package.json 中，有关于部署的命令，predeploy（预部署）与 deploy（部署），可以看出，生产环境使用的是 `/dist` 文件夹下的文件。
在预部署时是在 build（构建/编译）代码，并生成 `/dist/CNAME` 文件，CNAME 是将站点托管到 GitHub 绑定自定义域名的必须文件，详情可到 [github 自定义域](https://help.github.com/cn/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site)。

部署时是在使用 [gh-pages](https://www.npmjs.com/package/gh-pages) 这个插件，将 `/dist` 的内容 push 到 gh-pages 分支，为什么要放到这个奇怪的分支下？可以在 [github 配置发布源](https://help.github.com/cn/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)，得到解答，你完全可以配置 [parcel](https://parceljs.org/) 将默认的打包输出文件夹 `/dist` 改为 `/docs`，使用 `/docs` 下的文件作为发布源。

## 身份授权代码的配置及运行

[utterance/utterances-oauth](https://github.com/utterance/utterances-oauth) 这份代码使用的是该作者维护的 [cfworker](https://github.com/cfworker/cfworker)，在查看该库的资料时看到了[一个有趣的 issue](https://github.com/cfworker/cfworker/issues/31)，让我对 [Deno](https://deno.land/) 的未来增加期待了。

### 配置于运行

我们需要在根目录建立一个 `.env` 文件，具体说明可以在 [beaudar-oauth 的 Readme](https://github.com/beaudar/beaudar-oauth) 查看。
在本地运行可能会出错，需要在 sh 下运行。可以用 git 自带的 sh。如果你已经安装了 git 只要将，只要将 `C:\Program Files\Git\bin` 添加到环境变量，命令行执行 `sh`，就可进入 sh，这时可以直接执行 `cfworker run --watch --inspect src/index.ts` 来启动程序。

其实这份代码不需要在本地调试，我们只需要将 build 后的 `src/index.ts` 放到 [cloudflare](http://cloudflare.com) 的 worker 中就可以了。

需要用到 [cloudflare](http://cloudflare.com) 也就是说，你需要申请一个域名了。添加 worker 的具体操作就不详细说明了，只需要配置一个运行的路由，Beaudar 使用的路由是 `api.lipk.org`, worker 名称是 beaudar。
