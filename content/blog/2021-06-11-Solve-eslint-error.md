---
title: '解决 ESLint 报错'
date: '2021-06-11'
slug: 'solve-eslint-error'
tableOfContents: true
---

以下，在 React 项目引入 ESLint，而且配置得十分严格时，可能会用到。

什么？十分严格是多严格？

## 严格的配置

### package.json

```diff
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
-    "eject": "react-scripts eject"
+    "eject": "react-scripts eject",
+    "fix": "npm run -s format && npm run -s lint:fix",
+    "format": "prettier --write --loglevel=warn 'src/**/*.{js,jsx,ts,tsx,gql,graphql,json}'",
+    "lint": "npm run -s lint:style; npm run -s lint:es",
+    "lint:fix": "npm run -s lint:style:fix && npm run -s lint:es:fix",
+    "lint:es": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
+    "lint:es:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
+    "lint:conflict": "eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'",
+    "lint:style": "stylelint 'src/**/*.{css,less,sass,scss}'",
+    "lint:style:fix": "stylelint --fix 'src/**/*.{css,less,sass,scss}'",
  },
  "dependencies": {
+    "eslint-config-react-app": "^6.0.0",
  },
  "devDependencies": {
    ……
+    "@types/stylelint": "^9.10.1",
+    "@typescript-eslint/eslint-plugin": "^4.25.0",
+    "@typescript-eslint/parser": "^4.25.0",
+    "eslint-config-airbnb": "^18.2.1",
+    "eslint-config-prettier": "^8.3.0",
+    "eslint-plugin-import": "^2.23.3",
+    "eslint-plugin-jsx-a11y": "^6.4.1",
+    "eslint-plugin-prefer-arrow": "^1.2.3",
+    "eslint-plugin-react": "^7.23.2",
+    "eslint-plugin-react-hooks": "^4.2.0",
+    "lint-staged": "^11.0.0",
+    "stylelint": "^13.13.1",
+    "stylelint-config-recess-order": "^2.4.0",
+    "stylelint-config-standard": "^22.0.0",
+    "stylelint-order": "^4.1.0"
+  },
+  "simple-git-hooks": {
+    "pre-commit": "npx lint-staged"
+  },
+  "lint-staged": {
+    "src/**/*.{js,jsx,ts,tsx}": [
+      "prettier --write --loglevel=error",
+      "eslint --fix --quiet"
+    ],
+    "src/**/*.{css,less,sass,scss}": [
+      "stylelint --fix --quiet"
+    ],
+    "{public,src}/**/*.{html,gql,graphql,json}": [
+      "prettier --write --loglevel=error"
+    ]
+  }
}
```

怎么还有 **stylelint** ？放心，这个比较简单，无非就是调整 CSS 写的顺序，再不济就是拆分一下就可以解决了。

我们重点看 **eslint** 能给我们带来什么错误提示。

噢！上面只是把  **eslint**  引入进来了，都只是默认得配置，我们来将它的能力增强一下吧~

### .vscode/settings.json

为了可以让每个人的 VS Code 都乖乖工作，我们给它一些配置。

```json
{
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": false
}
```

可以看到，将 VS Code 自带的关于 CSS 的检查去掉了。因为我们引入了强大的 **stylelint**。

还能看到我们在代码保存时让 VS Code 乖乖地自动执行了 **eslint** 和 **stylelint** 自动修复错误。

这样简单的错误，我们就没必要去一一解决。

最后，指定了默认的代码格式化工具 **prettier**，并在代码保存时让代码自动格式化 ，代码从此整整齐齐。

还不够整齐？

```diff
    "source.fixAll.stylelint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
+  "editor.formatOnSave": false,
+  "editor.rulers": [
+    80
+  ],
+  "editor.tabSize": 2,
+  "editor.wordWrap": "on",
}
```

在编辑器窗口的第 80 列添加一条竖线，一个 TAB 键定义为 2 个空格，每个文件末尾添加一个空行。

既然都给每个人的 VS Code 做了自带配置的覆盖了，再把要用到的插件也一并安排他们按照上吧~

### .vscode/extensions.json

把 eslint、prettier、stylelint 安排上！

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint",
  ]
}
```

### .prettierrc

让 prettier 把双引号格式化为单引号，并把末尾的逗号增加上。

```json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

末尾逗号为什么要增加？

这个是为了在看 git 修改记录时舒服一些用的。

举个例子：

代码一：

```diff
const paramList = [
  {
    id: '01',
-    name: '小明'
+    name: '小明',
+    age: '8'
-  }
+  },
+  {
+    id: '02',
+    name: '小红'
+    age: '9'
+  }
]

useIntersectionObserver(
  fetchNextPage,
-  hasNextPage
+  hasNextPage,
+  loadMore,
);
```

代码二：

```diff
const paramList = [
  {
    id: '01',
    name: '小明'
+   age: '8'
  },
+  {
+    id: '02',
+    name: '小红'
+    age: '9'
+  },
]

useIntersectionObserver(
  fetchNextPage,
  hasNextPage,
+  loadMore,
);
```

明显代码二会比较直观，自动在末尾增加一个逗号，可以让 review 者更加幸福！

自己看时也舒服不是？

都是题外话，最后看看 **eslint** 的配置吧~

### .eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 12,
    "project": "./tsconfig.eslint.json",
    "sourceType": "module",
    "tsconfigRootDir": "__dirname",
  },
  "plugins": [
    "@typescript-eslint",
    "import",
    "jsx-a11y",
    "prefer-arrow",
    "react",
    "react-hooks",
  ],
  "root": true,
  "rules": {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "lines-between-class-members": [
      "error",
      "always",
      {
        "exceptAfterSingleLine": true,
      },
    ],
    "no-void": [
      "error",
      {
        "allowAsStatement": true,
      },
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "after-used",
        "argsIgnorePattern": "_",
        "ignoreRestSiblings": false,
        "varsIgnorePattern": "_",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never",
      },
    ],
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        "disallowPrototype": true,
        "singleReturnOnly": false,
        "classPropertiesAllowed": false,
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [".jsx", ".tsx"],
      },
    ],
    "react/jsx-props-no-spreading": [
      "error",
      {
        "html": "enforce",
        "custom": "enforce",
        "explicitSpread": "ignore",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "camelcase": "off",
  },
  "overrides": [
    {
      "files": ["*.tsx"],
      "rules": {
        "react/prop-types": "off",
      },
    },
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"],
      },
    },
  },
}
```

下面开始正题，以上这些配置会让我们的代码出现哪些报错信息？

## ESLint 报错信息和解决方法

### 函数返回值定义

- eslint([@typescript-eslint/explicit-module-boundary-types](https://github.com/typescript-eslint/typescript-eslint/blob/v4.25.0/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md))

解决这个要在函数声明时添加返回值类型定义。

```diff
- const List = () => {
+ const List = (): JSX.Element => {

  return (
    <div>
      ……
    </div>
  )
}
```

### 禁止使用 any

```diff
- const onYearChanged = (e: any) => setYear(e.target.value);
+  const onYearChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
+    setYear(e.target.value);

- export const getXXXValue = (XXX: Array<any>, YYY: any): any => {
+ export const getXXXValue = (
+   XXX: Array<{ code: string; value: string | number | undefined }>,
+   YYY: string | undefined,
+ ): string | number | undefined => {
```

api 调用使用泛型，请求和返回类型在调用时传入。:)

例如 **get** 和 **post**：

```Typescript
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const get = <Params, RData>(
  url: string,
  params: Params,
): Promise<RData> =>
  new Promise((resolve) => {
    const headers = getHeaders();
    const request: AxiosRequestConfig = {
      url,
      headers,
      method: 'GET',
      params,
      data: {}, // 为了请求头的 Content-Type 生效。
    };
    void xhr(request).then((response: AxiosResponse<RData>) => {
      resolve(response.data);
    });
  });

export const post = <Params, Data, RData>(
  url: string,
  params: Params,
  data: Data,
): Promise<RData> =>
  new Promise((resolve) => {
    const headers = getHeaders();
    const request: AxiosRequestConfig = {
      url,
      headers,
      method: 'POST',
      params,
      data,
    };
    void xhr(request).then((response: AxiosResponse<RData>) => {
      resolve(response.data);
    });
  });
```

当然，使用时，就可能像这样：

```diff
- export const LoginPost = (apiUrlKey: string, queryConfig: any) =>
-   useMutation((data: any) => post(restApi[apiUrlKey], data), queryConfig);
+ export const LoginPost = (
+   apiUrlKey: string,
+   queryConfig: UseMutationOptions<
+     LoginResponse,
+     Error,
+     LoginTokenParams,
+     unknown
+   >,
+ ): UseMutationResult<LoginResponse, Error, LoginTokenParams, unknown> =>
+   useMutation<LoginResponse, Error, LoginTokenParams, unknown>(
+     (params: LoginTokenParams) =>
+       post<LoginTokenParams, Record<string, never>, LoginResponse>(
+         restApi[apiUrlKey],
+         params,
+         {},
+       ),
+     queryConfig,
+   );
```

项目使用了 `react-query` 所以，就再封装了一层，将其作为一个组件。

明显的类型定义比代码多，但是这样严谨！

### 图片 src 不使用 require 引入

```diff
+ import icon from '../../assets/img/icon.svg';

- <img src={require('../../assets/img/icon.svg').default} />
+ <img src={icon} alt="" />
```

### 枚举类型报错

这是 **eslint** 的一个 bug，[说枚举已经定义](https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope)。

好吧，既然选择了 **eslint**，那就承受它的不完美吧。

毕竟，**代码除了实现功能，更多的是各种妥协和兼容。**

```diff
- export enum ActionType {
-   onLogin = 'LOGIN',
-   onLogout = 'LOGOUT',
- }
+ export const ActionType: { [key: string]: string } = {
+   onLogin: 'LOGIN',
+   onLogout: 'LOGOUT',
+ };
```

### return 报错

- Arrow function expected a return value.
- eslint([consistent-return](https://eslint.org/docs/rules/consistent-return))

是在这个代码里的 `return` 上标注的错误。

```Typescript
useEffect(() => {
  if (!enabled) {
    return;
  }

  // do some things

  if (!el) {
    return;
  }

  observer.observe(el);

  return () => observer.unobserve(el); // eslint：蠢猪，这里错啦！
}, [enabled]);
```

查来查去，是这样改的。

```diff
- useEffect(() => {
+ useEffect((): (() => void) => {
  if (!enabled) {
-    return;
+    return () => undefined;
  }

  // do some things

  if (!el) {
-    return;
+    return () => undefined;
  }

  observer.observe(el);

  return () => observer.unobserve(el);
}, [enabled]);
```

### 泛型的组件

[前面](#禁止使用-any) 说到，我们 api **请求**和**返回**都规定好类型，使用泛型解决禁用 any 的问题。

我们的表格组件，传入的数据，也是不固定的，所以也会出现 **any** 问题。

下面简单说明一些这个问题是怎么产生的。

有这样一个表格：

| 姓名 | 年龄 | 性别 |
| :----- | :----- | :----- |
|  小明  |  8  |  男  |

传入的数据会像这样：

```javascript
// 表头
headerParams = [
  {
    title: '姓名',
    key: 'name'
  },
  {
    title: '年龄',
    key: 'age'
  },
  {
    title: '性别',
    key: 'gender'
  }
]
// 表格数据
responseData = [
  {
    name: '小明',
    age: '8',
    gender: '男'
  }
]
```

表格要循环读取数组的数据，那就得定义类型。

```Typescript
interface headerParams {
  title: string;
  key: string;
}
return (
  <table>
    <thead>
      <tr>
        {headerList &&
          headerList.map((header: headerParams, index: number) => (
            <th key={index.toString()}>
              {header.title}
            </th>
          ))}
      </tr>
      </thead>
      <tbody>
        // DataSource 是一个泛型
        dataSource?.map((item: DataSource, index: number) => (
            <tr key={index.toString()}>
              {headerList &&
                headerList.map((header: headerParams, idx: number) => (
                  <td key={idx.toString()}>
                    {item && header.key && item[header.key]} // 根据 header.key 读取 DataSource 的值
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
  </table>
)
```

关键代码如下：

```Typescript
// XXXList.tsx 用到了 Table 组件

return(
  <Table<TableInterface>
    dataSource={dataSource},
    headerList={headerList}
  />
)

// 然后，在 XXXList.interface.ts 文件中，
// 定义 TableInterface，
// 用到了 extends 类型继承，为何要这样做？

export interface TableInterface extends ListObjBase {
  name: string,
  age: string,
  gender: string
}

export interface ListObjBase {
  [key: string]: string | number | boolean | undefined;
}

// Table.tsx Table 组件

const Table = <DataSource extends ListObjBase>(
  props: TableProps<DataSource>,
): JSX.Element => {
  // 上面的 table 代码
}
```

为什么 **Table** 组件的泛型定义要一个 **extends** ？

微软的 TS 开发者是 [这么](https://github.com/microsoft/TypeScript/issues/4922#issuecomment-142383182) 说的：

> This is an unfortunate side effect of syntax ambiguities.
> You need to either have an extends clause or multiple type parameters.
> You can write an extends clause that is functionally equivalent (albeit annoying)
>
> 译文：
> 这是语法歧义的不幸副作用。
> 您需要有一个 extends 子句或多个类型参数。
> 您可以编写一个功能等效的 extends 子句（尽管很烦人）

```Typescript
const f = <T1 extends {}>(arg1: T1) => <T2 extends {}>(arg2: T2) => {
   return { arg1, arg2 };
}
```

好吧，只能妥协，所以，**Table** 组件传入的类型要继承一个类型，而且在 Table 中我们是这样读取 list 的值的。

```Typescript
{item && header.key && item[header.key]} // 根据 header.key 读取 DataSource 的值
```

我们定义了一个 **ListObjBase** 类型，用于继承，共两个地方。

1. **Table** 组件传入类型要继承 **ListObjBase** 类型
2. 传入 **Table** 组件的对象类型也要继承 **ListObjBase** 类型

以上就是我遇到的比较棘手的，可以说是比较奇特的 hack 的方式。

噢，有段代码可能也有些用处。

下一篇写，不然篇幅过长了。
