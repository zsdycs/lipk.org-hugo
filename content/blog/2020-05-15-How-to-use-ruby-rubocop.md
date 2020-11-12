---
title: 'Ruby-rubocop 使用方法'
date: '2020-05-15'
slug: 'how-to-use-ruby-rubocop'
---

> 前段时间有个日本项目使用 Ruby on rails，因为习惯我 IDE 用的 VS Code，代码检查插件自然是要选择 ruby-rubocop 了。
> 可是该插件的 [about](https://marketplace.visualstudio.com/items?itemName=misogi.ruby-rubocop) 写得比较笼统，在网上看了一圈没找到这个插件是怎么使用的。摸索了一番，记之以文。

## 写在前面

ruby-rubocop 是使用 rubocop（ruby 的代码风格检查器）输出的消息，转换到你在 VS Code 中编辑的每行代码上。

其官方介绍原话是“This extension provides interfaces to rubocop for vscode”（这个扩展程序为 rubocop 提供了 VS Code 的接口）

所以，我们要做的第一件事是让你的代码可以使用 rubocop 进行检查，这需要安装 ruby 环境。然后要将 rubocop 与 ruby-rubocop 关联起来。

## 前提 - 软件安装

1. 安装 VS Code 插件

   - `Ruby`
   - `ruby-rubocop`

2. Windows 安装 ruby 运行环境

   - ruby 运行环境，[windows 安装 Ruby 教程](https://jingyan.baidu.com/article/5553fa827b5d7d65a23934ba.html)。
   - **安装时 cmd 选择 `3`**

3. rubocop 及其依赖安装

   - cmd 命令行执行
     - gem install rubocop
     - gem install rubocop-rails
     - gem install rubocop-performance
     - gem install rubocop-thread_safety

安装好 rubocop 后，你就可以在命令行定位到项目目录下，输入 `rubocop` 来运行 rubocop 进行代码检查了。

## VS Code 插件设置

在 VS Code 左下角，点击小齿轮，选择“设置”，左边的列表找到“扩展”。

- “Ruby” - “format” - 选择 “rubocop”。  
- “Ruby-Rubocop” - 填写 “Config File Path” 和 “Execute Path” **填写内容，见下文**。

## Config File Path 填写

1. cmd 执行 `where ruby`，得到 ruby 安装路径。  
2. 将 ruby 项目根目录下的 “.rubocop.yml” 放到 ruby 安装路径下。
3. 填写 “.rubocop.yml” 的路径。

## Execute Path 填写

- 填写 ruby 安装路径。（确保 ruby 安装路径中有 “rubocop.bat” 文件）
  
## 修改项目 “.rubocop.yml” 文件

确保项目 “.rubocop.yml” 文件没有 Lint 条件过时等问题，不然 ruby-rubocop 将不能正常工作。
我着手的项目就要做以下操作。

- 73 行。`Metrics/LineLength` -> `Layout/LineLength`
- 211 行和 212 行。注释掉。（注释掉 `Style/BracesAroundHashParameters` ）

## 结尾

做完以上这些，就可以在 VS Code 中使用 Ruby 的代码检查 rubocop 了，虽然比较麻烦，但是代码过 Lint 是最基本要求哇。
