---
title: 'JS 异步流程控制'
date: '2020-12-28'
slug: 'JS-asynchronous'
---

## 异步事件

之前有简单介绍过 [使用 RxJS 处理 http 请求](https://www.lipk.org/blog/2020/11/15/rxjs-applied-to-http-requests/)，除了使用强大的 RxJS，原生处理异步事件的方式是怎么样的呢？

下面是一个由 setTimeout 产生的异步加法情景：

```javascript
/**
 * 异步加法
 * 在执行时，默认会返回一个 undefined
 * 经过 delayTime 毫秒后，返回结果 num1 + num2
 */
delayedAdd = (num1, num2, delayTime) => {
  window.setTimeout(() => {
    return num1 + num2;
  }, delayTime);
}

test = () => {
  const result = delayedAdd(1, 2, 1000);
  console.log(`result: ${result}`); // result: undefined
}

test(); // result: undefined
```

## Callback 回调的写法（兼容 IE）

```javascript
/**
 * 接收一个回调函数 callback
 * 在产生返回值时执行 callback，并把值传给 callback
 * callback 充当的是将结果传递出去的角色
 */
delayedAdd = (num1, num2, delayTime, callback) => {
  window.setTimeout(() => {
    callback(num1 + num2);
  }, delayTime);
}

/**
 * 从 callback 中获得结果
 */
test = () => {
  delayedAdd(1, 2, 1000, (result) => {
    console.log(`result: ${result}`); // result: 3
  });
}

test(); // result: 3
```

## Promise 的写法

```javascript
/**
 * Promise 中的两个回调函数说明：
 *  1. resolve 回调：成功时使用，对应 then
 *  2. reject 回调：失败时使用，对应 catch
 */
delayedAdd = (num1, num2, delayTime) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(num1 + num2);
    }, delayTime);
  });
}

test = () => {
  delayedAdd(1, 2, 1000).then((result) => {
    console.log(`result: ${result}`); // result: 3
  });
}

test(); // result: 3
```

## Async/Await 的写法

Async/Await 是用于简化代码的写法，**注意** `await` 后的代码会在 await 事件结束后执行。

```javascript
/**
 * 异步加法的函数 返回 Promise
 */
delayedAdd = (num1, num2, delayTime) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(num1 + num2);
    }, delayTime);
  });
}

test = async () => {
  const result = await delayedAdd(1, 2, 1000);
  console.log(`result: ${result}`); // result: 3
}

test(); // result: 3
```

## 多个异步事件的情况

### 一、Promise.all()

```javascript
/**
 * 异步加法的函数 返回 Promise
 */
delayedAdd = (num1, num2, delayTime) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(num1 + num2);
    }, delayTime);
  });
}

test = () => {
  const startDate = new Date();
  const addPromise1 = delayedAdd(1, 2, 1000);
  const addPromise2 = delayedAdd(3, 4, 3000);
  // 多个 Promise 完成后进行乘法运算
  Promise.all([addPromise1, addPromise2]).then((resultList) => {
    // reduce: 数组压缩方法，此处定义的规则为：累计乘
    const endDate = new Date();
    const answer = resultList.reduce((total, current) => { return total * current });
    console.log(`answer: ${answer}，耗时：${endDate - startDate} 毫秒`); // answer: 21，耗时：3002 毫秒
  })
}

test(); // answer: 21，耗时：3002 毫秒
```

### 二、await

```javascript
/**
 * 异步加法的函数 返回 Promise
 */
delayedAdd = (num1, num2, delayTime) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(num1 + num2);
    }, delayTime);
  });
}

test = async () => {
  const startDate = new Date();
  const addResult1 = await delayedAdd(1, 2, 1000);
  const addResult2 = await delayedAdd(3, 4, 3000);
  const endDate = new Date();
  console.log(`answer: ${addResult1 * addResult2}，耗时：${endDate - startDate} 毫秒`); // answer: 21，耗时：4002 毫秒
}

test(); // answer: 21，耗时：4002 毫秒
```
