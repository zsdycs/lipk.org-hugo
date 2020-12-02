---
title: 'RxJs 应用于 http 请求'
date: '2020-11-15'
slug: 'rxJs-applied-to-http-requests'
_highlight: true
---

## 一、RxJs 概述

### RxJs 是一个专门处理 **异步** 或 **事件** 的函数库

- **异步**
  - http 请求
  - setTimeout / setInterval
  - promise
  - service worker / node stream
- **事件**
  - DOM 事件（click、keyup、mousemove 等）
  - CSS 动画事件（CSS3 transitionEnd event 等）
  - HTML5 Geolocation / WebSockets / Server Send Event

### RxJs 核心概念

- **Observable** 可观察的事件对象
  - 表示一个或一组 **将会** 产生的事件
- **Observer** 观察者
  - 一个接收**观察结果**的回调集合
  - 包含 3 个属性：next，error，complete（完成）
- **Subscription** 订阅
  - 表示 **Observable** 可观察的事件对象的**执行**，也用于取消执行
- **Operators** 运算操作符
  - 处理**观察结果**或**观察过程**的函数
  - 常见有：map、mege、megeAll、megeMap 等
- **Subject** 主题
  - 一个可供多个订阅的**可观察对象**，用于广播
- **Schedulers** 调度程序
  - 用来集中**管理**与**调度**多个可观察事件对象，控制**事件并发**的情况

## 二、请求的 3 个情况

### 1. 单个请求

```typescript
getListRequest().pipe(
  finalize(() => {
    // api 调用，最终执行
  })
).subscribe(
  next: (result: any) => {
    // 返回结果
  },
  error: (error) => {
    // 出错
  },
  complete: () => {
    // 完成，api 出错时不会走到这里
  }
)
```

### 2. 多个 api 并发

```typescript
// forkJoin 将等待所有传递的可观测值完成，然后它将发出一个数组或对象，具有来自相应可观测值的最后一个值
forkJoin(
  [
    getFirstListRequest(),
    getSecondListRequest(),
  ]
).pipe(
    finalize(() => {
      // 全部 api 调用，最终执行
    })
).subscribe(
  next: (result: any[]) => {
    // 返回结果
    consolse.log(`第一个 api 返回结果：${result[0]}，第二个 api 返回结果：${result[1]}`);
  },
  error: (error) => {
     // 出错
  },
  complete: () => {
    // 全部 api 调用完成，有 api 出错时不会走到这里
  }
)
```

### 3. 嵌套调用 api

```typescript
updateListRequest().pipe(
  finalize(() => {
    // api 调用，最终执行
  })
).subscribe(
  next: (result: any) => {
    // 返回结果
  },
  error: (error) => {
    // 出错
  },
  complete: () => {
    // 完成，api 出错时不会走到这里
    this.load();
  }
)

load() {
  getListRequest().pipe(
    finalize(() => {
    // api 调用，最终执行
    })
  ).subscribe(
    next: (result: any) => {
    // 返回结果
    },
    error: (error) => {
    // 出错
    },
    complete: () => {
    // 完成，api 出错时不会走到这里
    }
  )
}
```

### RxJS 操作符之 merge、map、mergeAll、mergeMap

```javascript
const { fromEvent, interval } = rxjs;
const { merge, map, mergeAll, mergeMap } = rxjs.operators;

const click$ = fromEvent(document.documentElement, 'click');
const interval$ = interval(1000);

// merge 就是将两个流按时间顺序合并起来
click$.pipe(
  merge(interval$)
).subscribe(
  val => console.log(val)
)

// map 的作用使鼠标每点击一次，产生一个 interval
click$.pipe(
  map(() => interval$)
).subscribe(
  interval => interval.subscribe(
      num => console.log(num)
  )
)

// mergeAll 将上述两次 subscribe 合并成一次（多阶降为一阶）
click$.pipe(
  map(() => interval$),
  mergeAll()
).subscribe(
  num => console.log(num)
)

// mergeMap 合并了 map 和 mergeAll
click$.pipe(
  mergeMap(() => interval$)
).subscribe(
  num => console.log(num)
)
```
