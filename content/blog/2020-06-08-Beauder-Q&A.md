---
title: '关于 Beaudar 的 Q&A'
date: '2020-06-08'
slug: 'beauder-qa'
disable_mathjax: true
---

### Q：为何不能正常显示评论？

api.github.com 部分 CDN 服务器被墙，导致请求失败。
解决思路，PC 端 host 重定向，移动端搭梯子。这里只提供 host 重定向的解决步骤。

- **首先，获取 api.github.com 解析的所有服务器**
  - 可以使用 [Ip138](https://site.ip138.com/) 的域名解析查询服务，这个网站虽然有广告，但是在国内访问比较快。
- **确认 IP 可用**
  - 快捷键 `win + R` 打开启动工具，输入 `cmd` 或 `powershell`。
  - 输入命令 `ping IP地址` 然后按 `Enter` 执行。例： `ping 140.82.114.6`
  - 如果没有出现 `请求超时` 或 `time out` 则当前测试的 IP 可用。s
- **将 IP 地址填入 hosts 文件中**
  - 打开路径 `C:\Windows\System32\drivers\etc` 下的 hosts 文件。该文件是纯文本文件，可以使用记事本或你所安装的任何文本编辑器打开。
  - 该文件有详细的填写说明，英文不畅者，可用[谷歌翻译](https://translate.google.cn/)。
  - 建议首尾两行添加 `# github start` 和 `# github end` 增加可读性。
- **更新 DNS，确保万无一失**
  - 命令 `ipconfig /flushdns` 于 `cmd` 或 `powershell` 使用，参照第二条。
