
```
<!--项目源代码取得from Gitlab-->
1. Fork项目库
2. 使用Frok后自己的项目库进行克隆
3. 本地建一个空的文件夹。名称一般与项目名称相同。
建立upstream，git remote add upstream + 项目库地址。
4. 查看remote是否正确。git remote -v
5. origin为自己的项目库，upstream为项目库

/*********** 开发周期 *********/
<!--取得远程库-->
git fetch upstream
<!--比对本地库与远程库-->
git rebase upstream/master
<!--提交到本地库-->
git push origin
<!--新建（-b）/切换到spike,#1对应的是issue-->
git checkout -b f/#/spike 
<!--在spike上进行开发-->
working...
<!--开发期间可以commit-->
commit...
<!--开发完成后进行lint，切换到master-->
git checkout master
<!--再次取得远程库-->
git fetch upstream
<!--进行比对本地库与远程库-->
git rebase upstream/master
<!--提交最新远程库到本地库-->
git push origin
<!--切换到spike-->
git checkout f/#/spike 
<!--比对spike与远程库-->
git rebase master
<!--如果有冲突的话，需要解决冲突-->
解决冲突...一般选择income change
<!--冲突解决完成切换到master-->
git checkout master
<!--新建release用于提交，数字与issue一致-->
git checkout -b f/#/release
<!--将spike映射到release上-->
git merge --squash f/#/spike
<!--提交release到master-->
=>commit内容为issue的title
=>勾选Push
=>刷新页面
=>点击merge request按钮
=>选择提交选项
=>点击submit merge request完成。

```
 