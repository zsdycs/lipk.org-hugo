---
title: 'JS 中数组的深拷贝和浅拷贝'
date: '2021-04-13'
slug: 'deep-copy-and-shallow-copy-of-array-in-js'
---

深拷贝和浅拷贝是 JS 基础，很多人（包括我）可能理解两者的区别，但是，碰到关于这个知识点的考题，仍然可能会做错。

先思考以下代码的执行结果，最好用纸写下来：

```javascript
  // 现在有个数组 list，它里面有“a、b、c”，3 个变量，如下：
  const a = {
    name: 'a',
    value: 'a'
  };

  const b = 'str';
  let c = 256;

  const list = [a, b, c];
  const listCopy = list;
  const listDeep = _.cloneDeep(list);
  const listClone = _.clone(list);
  list.push('d');
  a.name = 'new a';
  listClone.push('e');
  c = 480;
  listDeep.push('f');
  list[0].value = 'new a';
  list[1] = 'new str';

  console.log('list', list); // ???
  console.log('listCopy', listCopy); // ???
  console.log('listDeep', listDeep); // ???
  console.log('listClone', listClone); // ???
```

### 重要概念

- 基本类型：Null、Undefined、Boolean、Number、String、Symbol。
- 引用类型：Object、Array、Function、Date 等。

基本类型和引用类型的区别：基本类型在内存中是直接存储数据的，引用类型则为一个内存地址，通过这个地址可以得到存储的数据。

### 结果及注释

```javascript
/**
 * 为方便讲解和学习，引入 lodash 的深拷贝和浅拷贝函数
 * 以下代码可在浏览器控制台运行
 */
const importJS = document.createElement('script');
importJS.setAttribute("src", 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
document.getElementsByTagName("head")[0].appendChild(importJS);

// 等待 lodash 加载。要在浏览器使用，有什么好的办法吗？
setTimeout(() => {
  if (typeof _ === 'function') {
    // 现在有个数组 list，它里面有“a、b、c”，3 个变量，如下：
    const a = {
      name: 'a',
      value: 'a'
    };

    const b = 'str';
    let c = 256;

    const list = [a, b, c];
    const listCopy = list; // 引用赋值
    const listDeep = _.cloneDeep(list); // 深拷贝
    const listClone = _.clone(list); // 浅拷贝
    list.push('d'); // list、 listCopy（赋值） 受影响
    a.name = 'new a'; // list、listClone（浅） 和 listCopy（赋值） 受影响
    listClone.push('e'); // listClone（浅）受影响
    c = 480; // 都不受影响
    listDeep.push('f'); // listDeep（深）受影响
    list[0].value = 'new a'; // list、listClone（浅） 和 listCopy（赋值） 受影响
    list[1] = 'new str'; // list、listCopy（赋值） 受影响

    console.log('list', list); // [{name: "new a", value: "new a"}, "new str", 256, "d"]
    console.log('listCopy', listCopy); // [{name: "new a", value: "new a"}, "new str", 256, "d"]
    console.log('listDeep', listDeep); // [{name: "a", value: "a"}, "str", 256, "f"]
    console.log('listClone', listClone); // [{name: "new a", value: "new a"}, "str", 256, "e"]
  }
}, 1000);
```

### 总结

1. 浅拷贝得到的数组，其内引用类型的地址为原来的地址，基本类型没有引用地址，等同于深拷贝。即：浅拷贝后数组中的引用类型跟随原数组变化。
2. 深拷贝得到的数组，引用类型的地址不为原来的地址，即：其每层引用类型的地址都是新的地址，所有数据变化不与原来的关联。
3. 引用赋值得到的数组，与原来的数组一致，即：list 和 listCopy 指向同一个地址，可以得到原数组的引用地址内的数据变化。
