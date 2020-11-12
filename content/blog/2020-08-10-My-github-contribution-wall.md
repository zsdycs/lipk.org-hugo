---
title: '我的 Github 绿墙'
date: '2020-08-10'
slug: 'my-github-contribution-wall'
_highlight: true
---

## 我绿自己

很多人都以为，是男人的话，都不喜欢被绿。其实不然，我就很喜欢绿我自己的 Github 贡献墙。

Github 贡献墙是这样的：

![别人的 Github 贡献墙照片](https://cdn.jsdelivr.net/gh/zsdycs/lipk.org/static/images/my-github-contribution-wall(1).jpg)

一面墙的时间跨度是一年，一块砖就是 1 天，墙高 7 天，也就是 1 周为以列。
砖块的颜色越深，代表当天的贡献越多。贡献分为：issue、Code review、Commits 和 Pull requests 4 种。

记得我第一次提交的是我实习时写的一个 express demo，那时特别懵懂，连 lint 都没用，虽然现在也觉得自己的东西很低级。
现在看那时写的代码，总是会发出“啊，这里当时怎么会这样想呢”，“这个地方居然连缩进都没有”，“这里写的什么啊，居然没写注释”……

## 整理绿墙

写这篇博客的契机是昨天我把的绿墙整理了一遍，很多之前没有显示出来的“砖块”都探出了小脑袋瓜子。我是怎么整理的呢？
简单说就是将提交记录中，提交者的邮箱，改成和 GitHub 中设置的邮箱一致，也就是：邮箱地址是 Github 提交归属者的依据。

所以我的任务就是把我 git 提交的邮箱，改为我 GitHub 设置的邮箱。

![我 Github 设置的邮箱](https://cdn.jsdelivr.net/gh/zsdycs/lipk.org/static/images/my-github-contribution-wall(2).jpg)

要改邮箱的话，得看之前提交的记录里，邮箱都写得是什么。可以在 git 命令行用 `git log` 查看提交记录中的提交者邮箱信息。

![git log 命令行截图](https://cdn.jsdelivr.net/gh/zsdycs/lipk.org/static/images/my-github-contribution-wall(3).jpg)

显然这样看的效率太低了，我是用 [sourcetree](https://www.sourcetreeapp.com/) 查看的，在 sourcetree 中查看提交者信息很方便：

![sourcetree 的截图](https://cdn.jsdelivr.net/gh/zsdycs/lipk.org/static/images/my-github-contribution-wall(4).jpg)

接下来，就是修改历史的提交记录了，我找到了一篇 [为什么 Github 没有记录你的 Contributions](https://segmentfault.com/a/1190000004318632) 的文章。
这里面的脚本可以一用。但是他的这个步骤太繁琐，其实可以直接在 git 的命令行来执行的，无需再另外 clone。如果要重复使用这段代码，需要加一个 `--force`，即：

![git 命令行的截图](https://cdn.jsdelivr.net/gh/zsdycs/lipk.org/static/images/my-github-contribution-wall(5).jpg)

图中代码如下：

```bash
git filter-branch --force --env-filter '
OLD_EMAIL="旧邮箱"
CORRECT_NAME="新用户名"
CORRECT_EMAIL="新邮箱"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

要注意的是，这段代码在使用后会有一个提示信息，然后几秒过后才会执行。执行花费时间，与代码库的提交次数成正比，执行完后，使用 `git push --force --tags origin 'refs/heads/*'` 来提交更改。提交后，要用 `git pull --tags --rebase origin master` 来以 rebase 的方式拉一下远程库的代码。

## 面壁感概

![@zsdycs 在 GitHub 上的活动汇总](https://cdn.jsdelivr.net/gh/zsdycs/lipk.org/static/images/my-github-contribution-wall(6).jpg)

 图片来自[Github 活动汇总在线生成器](https://github-contributions.now.sh)。

面对整理好的绿墙，她详细记录了我与她之间的点点滴滴。

第一个绿点出现。是 2018 年的 10 月 30 号，我如今仍然记得那时是实习，被外派到现场客开，没多久苏州到了冬天，我骑着电动车在学校与清源华衍水务之间，雨冰冰凉，风吹过头盔呜呜叫。

过了好了一阵子，我开始写个人网站，但是因为有实习工作而且懒得缘故，断断续续的。后来我辞职了，全身心投入到毕业设计中去。大概有两个月，那段时间，密密麻麻的，竟然有连续两个星期无中断提交的情况。4 月 9 号，一定是非常开心的一天，因为我的毕业设计作了最后一个提交。满足的午后，校道常青的樟树，间隙穿过闪烁的阳光，哼着小曲去买一杯奶茶。

5 月 6 月，写论文，墙上的空白证明了当时的忙碌，7 月星星点点的提交，希望将毕业的讯号告诉世上所有人。后来，我找到第一份工作，试用 3 个月，加班，通过试用，加班，沉寂……

渐渐地，在工作中找到的生活的平衡点，星星点点的绿茵渐渐繁茂是最好的证明。可以做自己喜欢的事，是最幸福的！愿读到这儿的你，也拥有这样的幸福。
