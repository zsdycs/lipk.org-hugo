---
title: '使用 Hooks 和 Context 替代 Redux（Typescript 版）'
date: '2021-06-11'
slug: 'use-hooks-and-context-instead-of-redux-typescript-version'
---

## 版本信息

- node：14.17.0
- react：17.0.2
- typescript：4.3.2

## 正文

在上一篇文写道，我如何在严格的 **ESLint** 配置下夹缝生存。

这一篇就是我在不使用 **Redux** 且在严格的 **ESLint** 配置下夹缝生存。

直接放代码：

```Typescript
// store.tsx

import React, { createContext, useReducer } from 'react';

export const ActionType: { [key: string]: string } = {
  onLogin: 'LOGIN',
  onLogout: 'LOGOUT',
};
interface State {
  token?: string;
  state?: State;
  dispatch?: React.Dispatch<Action>;
}
interface Action {
  type: string;
  token?: string;
}
const initialState: State = {};
const store = createContext(initialState);
const { Provider } = store;
const StateProvider = (props: {
  children: JSX.Element | undefined;
}): JSX.Element => {
  const { children } = props;
  const [state, dispatch] = useReducer(
    (states: State, action: Action): State => {
      const { type, token } = action;
      switch (type) {
        case ActionType.onLogin:
          return {
            ...states,
            token,
          };
        case ActionType.onLogout:
          return {
            ...states,
            token: '',
          };
        default:
          return {
            ...states,
          };
      }
    },
    initialState,
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
```

这代码没什么好说的，是我参考自以下这两篇博客的。

- [LogRocket | React Hooks vs. Redux: Do Hooks and Context replace Redux?](https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/)
- [掘金 | 用 useContext + useReducer 替代 redux](https://juejin.cn/post/6844903854807482382)

## 如何使用？

```Typescript
// index.tsx
import { StateProvider } from '.../store';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Login.tsx
import { ActionType, store } from '.../store';
import { useContext } from 'react';

const Login = (): JSX.Element => {
  const { dispatch } = useContext(store);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    // do some things
    if (dispatch) {
      dispatch({
        type: ActionType.onLogin,
        token: data.token,
      });
    }
  }
}

// XXX.tsx
import { store } from '.../store';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

const XXX = (props: RouteConfigComponentProps): JSX.Element | null => {
  const { route } = props;
  const { state } = useContext(store);
  if (state?.token) {
    return (
      <main className="main">
        {route && renderRoutes(route.children)}
      </main>
    );
  }

  return null;
};
```
