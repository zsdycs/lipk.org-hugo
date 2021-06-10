---
title: 'React 项目构建和打包'
date: '2021-04-23'
slug: 'react-project-construction-and-packaging'
tableOfContents: true
---

## 一、React 项目构建的方式

1. [create-react-app](https://github.com/facebook/create-react-app) 脚手架构建。
2. 以 webpack 为基础构建。
3. 其他。如：generator-react-webpack、react-build，与 create-react-app 类似的方式。

### create-react-app 脚手架构建

#### npx

```bash
npx create-react-app my-app
cd my-app
npm start
```

#### npm

```bash
npm install create-react-app
npm init react-app my-app
cd my-app
npm start
```

#### yarn

```bash
yarn create react-app my-app
cd my-app
yarn start
```

#### 优点：

- 无需配置：官方的配置堪称完美，几乎不用再配置任何东西，就可以上手开发项目。
- 高集成性：集成了对 React，JSX 和 ES6 的支持。
- 自带服务：集成了开发服务器，实现了开发预览一体，包含了 sourcemaps。
- 有热更新：保存自动更新，开发便利。
- 全兼容性：自动处理 CSS 的兼容问题，无需添加 -webkit 前缀兼容 webkit 内核浏览器。
- 快速打包：集成好了 webpack，使用 `react-scripts build`，就可打包，无需配置。

注意：`react-scripts build` 包含 sourcemaps。

### 以 webpack 为基础构建

#### 实例：

1. 目根目录建立 webpack.config.js 文件：

```javascript
const path =require('path');
module.exports = {
    // 入口文件
    entry:'./app/index.js',
    // 出口文件
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'dist')
    }
}
```

2. 新建 index.html 文件，在根目录新建 index.html 文件，并引入 webpack 设置中的出口文件：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>title</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
    <!--引入出口文件-->
    <script src="./dist/index.js"></script>
</html>
```

3. `npm init` 生成一个 packeage.json 文件，或创建一个，在里面添加 `scripts` 命令：

```json
"scripts": {
    "build": "webpack",
    "start": "webpack-dev-server --open"
  },
```

4. 使 webpack 自动刷新浏览器

修改 webpack.config.js 文件，添加 `publicPath:'temp/'`

```javascript
output:{
    filename:'index.js',
    path:path.resolve(__dirname,'dist'),
    publicPath:'temp/'
},　　
```

index.html 文件引入 JS

```html
<script src="./temp/index.js"></script>
```

5. Babel 安装配置

babel-core、babel-loader、babel-preset-es2015 和 babel-preset-react，这 4 个库必须安装。
用于编译 ES5 以及 React 的语法。

```bash
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
```

安装好了，npm 会自动在 packeage.json 记录下：

```json
"devDependencies": {
  "babel-core": "^6.26.0",
  "babel-loader": "^7.1.2",
  "babel-preset-es2015": "^6.24.1",
  "babel-preset-react": "^6.24.1",
  "webpack": "^3.8.1",
  "webpack-dev-server": "^2.9.3"
}
```

将上面引入的依赖配置到 webpack.config.js 的 module 的 loader 里，让 webpack 使用 babel 对代码进行编译：

```javascript
module:{
    loaders:[
        {
            test:/\.js$/,
            exclude:/node_modules/,
            loaders:"babel-loader",
            query:{
                presets:['es2015','react']
            }
        }
    ]
}
```

6. 编写 React 代码

新建 app/index.js 文件，写如下代码：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>Hello React</div>,
    document.getElementById("app")
);
```

## 二、打包方式

通过上面的介绍，我们知道 React 有多种构建方式。

create-react-app 将一些复杂工具（比如 webpack）的配置封装了起来，让使用者不用关心这些工具的具体配置，从而降低了工具的使用难度。

create-react-app 创建的项目 packeage.json 的命令：

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

`npm run start` 和 `npm run build` 会调用 react-scripts 内部定义好的 webpack 启动和打包。

如果需要配置 webpack，有两个方式：

1. `npm run eject`（弹出内建配置）
2. 覆盖 react-scripts 的配置

### npm run eject

> 注意：这是单向操作。弹出后，将无法返回！

执行完这个命令后会将封装在 react-scripts 中的配置（webpack，Babel，ESLint 等）全部反编译到当前项目，这样用户就可以完全取得 webpack 文件的控制权。

package.json 会添加对应的依赖（基于 **react-scripts V4.0.3**）：

```json
"dependencies": {
    "@babel/core": "7.12.3",
    "@pmmmwh/react-refresh-webpack-plugin": "0.4.3",
    "@svgr/webpack": "5.5.0",
    "@typescript-eslint/eslint-plugin": "^4.5.0",
    "@typescript-eslint/parser": "^4.5.0",
    "babel-eslint": "^10.1.0",
    "babel-jest": "^26.6.0",
    "babel-loader": "8.1.0",
    "babel-plugin-named-asset-import": "^0.3.7",
    "babel-preset-react-app": "^10.0.0",
    "bfj": "^7.0.2",
    "camelcase": "^6.1.0",
    "case-sensitive-paths-webpack-plugin": "2.3.0",
    "css-loader": "4.3.0",
    "dotenv": "8.2.0",
    "dotenv-expand": "5.1.0",
    "eslint": "^7.11.0",
    "eslint-config-react-app": "^6.0.0",
    "eslint-plugin-flowtype": "^5.2.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jest": "^24.1.0",
    "eslint-plugin-jsx-a11y": "^6.3.1",
    "eslint-plugin-react": "^7.21.5",
    "eslint-plugin-react-hooks": "^4.2.0",
    "eslint-plugin-testing-library": "^3.9.2",
    "eslint-webpack-plugin": "^2.5.2",
    "file-loader": "6.1.1",
    "fs-extra": "^9.0.1",
    "html-webpack-plugin": "4.5.0",
    "identity-obj-proxy": "3.0.0",
    "jest": "26.6.0",
    "jest-circus": "26.6.0",
    "jest-resolve": "26.6.0",
    "jest-watch-typeahead": "0.6.1",
    "mini-css-extract-plugin": "0.11.3",
    "optimize-css-assets-webpack-plugin": "5.0.4",
    "pnp-webpack-plugin": "1.6.4",
    "postcss-flexbugs-fixes": "4.2.1",
    "postcss-loader": "3.0.0",
    "postcss-normalize": "8.0.1",
    "postcss-preset-env": "6.7.0",
    "postcss-safe-parser": "5.0.2",
    "prompts": "2.4.0",
    "react-app-polyfill": "^2.0.0",
    "react-dev-utils": "^11.0.3",
    "react-refresh": "^0.8.3",
    "resolve": "1.18.1",
    "resolve-url-loader": "^3.1.2",
    "sass-loader": "^10.0.5",
    "semver": "7.3.2",
    "style-loader": "1.3.0",
    "terser-webpack-plugin": "4.2.3",
    "ts-pnp": "1.2.0",
    "url-loader": "4.1.1",
    "webpack": "4.44.2",
    "webpack-dev-server": "3.11.1",
    "webpack-manifest-plugin": "2.2.0",
    "workbox-webpack-plugin": "5.1.4",
},
"scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
},
"jest": {
    "roots": [
        "<rootDir>/src"
    ],
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
    ],
    "setupFiles": [
        "react-app-polyfill/jsdom"
    ],
    "setupFilesAfterEnv": [
        "<rootDir>/src/setupTests.js"
    ],
    "testMatch": [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jsdom",
    "testRunner": "D:\\code\\my-app\\node_modules\\jest-circus\\runner.js",
    "transform": {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
    ],
    "modulePaths": [],
    "moduleNameMapper": {
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node"
    ],
    "watchPlugins": [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
    ],
    "resetMocks": true
},
"babel": {
    "presets": [
        "react-app"
    ]
}
```

项目目录也会产生变化：

```markdown
# 项目根目录下会出现 config 文件夹，里面就包含了 webpack 配置
config
├─ env.js
├─ getHttpsConfig.js
├─ jest
│    ├─ babelTransform.js
│    ├─ cssTransform.js
│    └─ fileTransform.js
├─ modules.js
├─ paths.js
├─ pnpTs.js
├─ webpack.config.js // 生产环境配置
└─ webpackDevServer.config.js // 开发环境配置
# 项目根目录下会出现 scripts 文件夹，里面是项目“启动”、“打包”和“测试”的入口文件
scripts
├─ build.js
├─ start.js
└─ test.js
```

### 覆盖 react-scripts 的配置

有两个主流的，[react-app-rewired](https://github.com/timarney/react-app-rewired) 和 [craco](https://github.com/gsoft-inc/craco)，都是 react 社区开源的修改 react-scripts 配置的工具。

推荐使用更为受欢迎的 react-app-rewired。

1. 在项目中安装 react-app-rewired：

```bash
npm i react-app-rewired
```

根目录创建一个 config-overrides.js 文件来对 webpack 配置进行覆盖。

```javascript
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}
```

## 参考资料

- [创建 react 项目的几种方法 - 博客园](https://www.cnblogs.com/cina33blogs/p/9115294.html)
- [如何扩展 Create React App 的 Webpack 配置 - 博客园](https://www.cnblogs.com/qianxiaox/p/14133689.html)
- [create-react-app README - facebook github](https://github.com/facebook/create-react-app/blob/master/README.md)
- [Available Scripts - create-react-app.dev](https://create-react-app.dev/docs/available-scripts/#npm-run-eject)
- [在 create-react-app 中使用 - Ant Design](https://ant.design/docs/react/use-with-create-react-app-cn)
