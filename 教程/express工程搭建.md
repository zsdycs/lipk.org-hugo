## 第一步 环境搭建
#### 1.安装nodejs
>https://nodejs.org/en/download/
* 命令行输入

```
node -v
```
出现版本提示“v--”完成安装
* 新版本node集成npm，只要检查一下npm

```
npm -v
```
#### 2.安装express命令行工具
* 命令行输入

```
npm install -g express-generator
```
## 第二步 新建工程
### 1.新建文件夹
在想存放工程的地方新建文件夹，并用英文命名  
### 2.命令行进入新建的文件夹
* 命令行进入指定盘符  
例：进入D盘

```
>d:
```
ls查看文件夹内容  
cd xxx进入指定文件夹（写首字母按“tab”自动补全）
### 3.创建express目录结构
* 到指定文件夹后输入

```
express --view=ejs
```
注：这是模板引擎为“ejs”的写法  
需要用“HTML”的在根目录下修改app.js  
找到这一段：
```
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```
修改为：

```
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//将引擎修改为html
var ejs = require('ejs');//引用ejs模块
app.engine('html',ejs.__express);//注册html模板引擎
app.set('view engine', 'html');//设置视图模板引擎可为jade、HTML
```

### 4.安装依赖

```
npm install
```
## 第三步 修改端口
* 修改bin目录的www文件  
该文件为文本文件，可用文本编辑器打开  
找到：  

```
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
```
将3000，改为：80  
命令行进入到工程文件夹，输入：

```
npm start
```
浏览器地址栏输入：127.0.0.1
## 完成~~~
