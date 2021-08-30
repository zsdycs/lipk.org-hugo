### 源代码说明

- 构建程序：[hugo](http://gohugo.io) 版本 [v0.82.0](https://github.com/gohugoio/hugo/releases)。
- 主题源自：[hugo-ivy](https://github.com/yihui/hugo-ivy)。
- 目录结构：

```markdown
lipk.org
│
├─ content # Markdown 资源文件夹
│  ├─ _index.md # 首页
│  ├─ about.md # 关于
│  ├─ resume.md # 简历
│  ├─ food.md # 菜谱
│  └─ blog # 博客 Markdown 文件夹
│     ├─ _index.md # 博客入口
│     └─ ......
├─ layouts # 页面模板文件夹
│  ├─ _default # 默认结构
│  │  └─ ......
│  ├─ partials # 模板结构块
│  │  └─ ......
│  └─404.html 404 # 页面
├─ static # 站点资源文件夹
│  ├─ favicon.ico # 站点图标
│  ├─ css
│  │  └─ ......
│  ├─ images
│  │  └─ ......
│  └─ js
│     └─ ......
├─ .gitignore git # 提交忽略配置
├─ beaudar.json # Beaudar 配置
├─ config.toml # 网站配置
├─ gulpfile.js # gulp 打包配置
├─ LICENSE # 版权声明
├─ package.json # node 配置
└─ README # 源代码说明
```

以上目录结构生成来自 [Dir Tree Noter](http://dir.yardtea.cc/)📁。

### 鸣谢

1. [Github](http://github.com)🏆。
2. [Yihui Xie](http://github.com/yihui)❤。
3. [Utterances](http://github.com/utterance/utterances)🔮。

以上项目的组织及所有者，为本项目的实现提供的支持。
