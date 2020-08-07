---
title: '关于 Beaudar 的 Q&A'
date: '2020-06-08'
slug: 'beauder-qa'
_highlight: true
---

### Q：api.github.com 请求失败。 { #request-failed }

api.github.com 部分 CDN 服务器被墙，导致请求失败。
解决思路，PC 端 host 重定向，移动端搭梯子。这里只提供 host 重定向的解决步骤。

- **首先，获取 api.github.com 解析的所有服务器**
  - 可以使用 [Ip138](https://site.ip138.com/) 的域名解析查询服务，这个网站虽然有广告，但是在国内访问比较快。
- **确认 IP 可用**
  - 快捷键 `win + R` 打开启动工具，输入 `cmd` 或 `powershell`。
  - 输入命令 `ping IP地址` 然后按 `Enter` 执行。例： `ping 140.82.114.6`
  - 如果没有出现 `请求超时` 或 `time out` 则当前测试的 IP 可用。
- **将 IP 地址填入 hosts 文件中**
  - 打开路径 `C:\Windows\System32\drivers\etc` 下的 hosts 文件。该文件是纯文本文件，可以使用记事本或你所安装的任何文本编辑器打开。
  - 该文件有详细的填写说明，英文不畅者，可用[谷歌翻译](https://translate.google.cn/)。
  - 建议首尾两行添加 `# github start` 和 `# github end` 增加可读性。
- **更新 DNS，确保万无一失**
  - 命令 `ipconfig /flushdns` 于 `cmd` 或 `powershell` 使用，参照第二条。

---

### Q：token 请求失败。 { #token-request-failed }

这个问题一般来说，如果网络连接没有问题，点击一下“刷新”按钮就可解决，因为 Beaudar 使用的是 [Cloudflare](https://www.cloudflare.com/) 的网络。
在中国境内，部分地区会有网络不稳定的情况。

---

### Q：缺少 "beaudar.json" 配置 或 不允许 xxx 发布到 xxx/xxx { #missing-beaudar-configuration }

这是因为 Beaudar 在评论输入到发表评论期间，会异步查询评论仓库的根目录是否存在 beaudar.json，并校验评论来源站点是否在文件中存在。
如果不存在，Beaudar 将不会在目标仓库建立评论 issue。可参考 [Beaudar 代码仓库](https://github.com/beaudar/beaudar)中 [beaudar.json](https://github.com/beaudar/beaudar/blob/master/beaudar.json) 的配置。多个 origins 来源，在数组 `[]` 中填写，以 `,` 分隔。

---

### Q：与 Utterances 比较，[Beaudar](http://beaudar.lipk.org) 增加了什么。 { #what-does-beaudar-add-compared-to-utterances }

- 中文界面，拉近距离增加评论友好性。
- 完整头像，移动端与桌面端一致显示。
- 身份标识，在任何情况下都不会换行。
- 评论时间，缩小至与身份标识相同大。
- 名称显示，评论者名称放大增加辨识。
- 点击图片，打开新标签页图片源链接。
- 错误信息，使用对话框形式友好呈现。
- 评论头像，增加可使用 Tab 键选中。
- 加载状态，默认加载状态可配置去除。
- 移除来源，点击加载图标跳转至主页。
- 刷新页面，出现错误异常可进行刷新。
- 保持主题，刷新页面时主题将会保持。

---

### Q：如何在引用的页面修改 Beaudar 的主题 { #how-to-modify-beaudar-theme-on-the-referenced-page }

因为 Beaudar 出于安全考虑使用了 iframe 来进行隔离，通过 JS 是无法跨域修改的。可以使用 postMessage 来进行跨域通信。

例子如下：

```javascript
/**
 * @theme 可选：
 * [
 *   'icy-dark',
 *   'dark-blue',
 *   'photon-dark',
 *   'github-dark',
 *   'github-light',
 *   'github-dark-orange',
 *   'preferred-color-scheme'
 * ]
 */
var message = {
  type: 'set-theme',
  theme: 'github-light'
};
var nowDarkmode = window.localStorage.getItem('mode');
var beaudar = document.querySelector('iframe');
// 与 beaudar 通信
beaudar.contentWindow.postMessage(message, 'https://beaudar.lipk.org');
```
