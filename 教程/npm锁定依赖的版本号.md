
```
npm config set save-exact true
```

这样每次 
```
npm i xxx --save
```
 的时候会锁定依赖的版本号，相当于加了 
```
--save-exact
```
 参数。

小提示：npm config set 命令将配置写到了 ~/.npmrc 文件，运行 npm config list 查看。

通过运行 
```
npm shrinkwrap
```
，会在当前目录下产生一个 npm-shrinkwrap.json，里面包含了通过 node_modules 计算出的模块的依赖树及版本。