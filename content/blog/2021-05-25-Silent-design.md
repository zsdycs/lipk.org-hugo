---
title: '令人无语的设计 '
date: '2021-05-25'
slug: 'silent-design'
---

第一次使用 react 开发。

有个需求：使用“Context、useContext、useReducer”替代 Redux 做状态管理。

于是碰到了 useReducer 使用的问题。

找到了答案，[github.com - useReducer dispatch calls reduce twice](https://github.com/facebook/react/issues/16295#issuecomment-610098654)。

简单来说就是，react 官方为了确保开发人员使用 useReducer 时，dispatch 触发的 reduce 是纯函数，
于是他们将 reduce 设计成在开发环境会触发两次，生产环境正常触发一次。

这样的设计可以理解，但是文档中并没有明确说明。
[reactjs.org/docs - usereducer](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)

:)
