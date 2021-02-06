---
title: 'Angular mouseleave 一直在执行'
date: '2020-10-22'
slug: 'angular-mouseleave-always-runs'
---

项目有个需求，鼠标悬停在表格上时，显示一个悬浮框，实现后如图所示：

![鼠标悬停显示悬浮框](https://lipk.oss-accelerate.aliyuncs.com/images/angular-mouseleave-always-runs.jpg)

出现问题的代码大概是这样的：

```javascript
<ng-container *ngFor="let itemA of arrayA">
    <ng-container *ngFor="let itemB of arrayB">
        <div [style.height]="height(itemB)"
            (mouseleave)="mouseleaveFun()"
            (mouseover)="mouseoverFun()"
        >……</div>
    </ng-container>
</ng-container>
```

问题是这样的：

1. 当鼠标在 div 上移动时，mouseoverFun 一直在重复执行，停下后不执行。
2. 点一下 div 后，只要鼠标进入 div，mouseoverFun 一直在重复执行。
3. 鼠标离开 div mouseleaveFun 不执行。

开始以为是因为元素的 height 一直在计算的缘故，后来发现，是因为 ngFor 中的两个 Array，有一个是一个 get 方法，而不是一个变量。

解决就是把 get 方法的逻辑拿到外面，Array 定义为变量，把需要用到 Array 的地方再对 Array 进行赋值。

```javascript
// before
get arrayA() {
    return doSome(……);
}

arr = this.arrayA;
……

// after
arrayA: Array<any> = [];
this.arrayA = doSome(……);
arr = this.arrayA;

```
