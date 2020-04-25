### 源代码说明

- 构建：[hugo](http://gohugo.io)。  
- 主题：[hugo-ivy](https://github.com/yihui/hugo-ivy)。  
- 目录结构：

```markdown
lipk.org
├─ CNAME // github-pages 域别名声明
├─ LICENSE.MD // 版权声明
├─ README.MD // 源代码说明
├─ config.toml // 网站配置
├─ docs // 站点文件夹（ hugo 生成）
├─ content // MD 资源文件夹
│  ├─ _index.md // 首页
│  ├─ about.md // 关于
│  ├─ vitae.md // 关于 - 简历
│  ├─ food.md // 博客 - 美食
│  └─ blog // 博客 MD 文件夹
│     ├─ _index.md // 博客入口
│     └─ ......
├─ layouts // 页面模板文件夹
│  ├─ _default // 默认结构
│  │  └─ ......
│  ├─ partials // 模板结构块
│  │  └─ ......
│  └─404.html // 404 页面
└─ static // 站点资源
   ├─ zsdycs_favicon.ico // 站点图标
   ├─ css
   │  └─ ......
   ├─ images
   │  └─ ......
   └─ js
      └─ ......
```

目录结构生成来自 [Dir Tree Noter](http://dir.yardtea.cc/)📁。

### 鸣谢

1. [Github](http://github.com)🏆。
2. [Yihui Xie](http://github.com/yihui)❤。
3. [Darkmode.js](http://github.com/sandoche/Darkmode.js)🌗。
4. [Utterances](http://github.com/utterance/utterances)🔮。
5. [Wildfire](http://wildfire.js.org)🔥。

以上项目的组织及所有者，为本项目的实现提供了支持。  
**感谢开源世界，感谢世界开源**。
