---
name: taro-nutui
description: Develop pages and components in this Taro 4 + React + NutUI React Taro WeChat miniprogram. Use when creating or modifying Taro pages/components, using NutUI components/icons (@nutui/nutui-react-taro, @nutui/icons-react-taro), writing page styles, theming NutUI, or running weapp builds in this repo. Keywords: Taro, NutUI, 小程序, weapp, 页面, 组件.
---

# Taro + NutUI 小程序开发

本项目的稳定技术事实与操作套路。项目级规范见根目录 `AGENTS.md`（冲突时以 AGENTS.md 为准）。

## 技术栈事实（不要重新调研）

- Taro **4.2.1** + React 18 + TS + Sass，编译器是 **vite**（`compiler: 'vite'`），包管理 pnpm。
- UI 库 `@nutui/nutui-react-taro@4.0.0-beta.7`（v4 beta），图标 `@nutui/icons-react-taro@3.0.2`（版本随组件库内部依赖走）。
- 已开启 `@tarojs/plugin-html`；NutUI 全量样式已在 `src/app.ts` 引入：`import '@nutui/nutui-react-taro/dist/style.css'`。
- **尺寸体系**：业务代码按 750 设计稿写 `px`（1px → 1rpx）；`@nutui` 包内样式按 375 自动转换（`config/index.ts` 的 `designWidth` 函数处理，勿改）。
- vite 编译器下 `babel-plugin-import` 按需方案**不可用**，不要配置它。
- 不引入 Tailwind（已决策）。

## 新建页面流程

1. 建目录 `src/pages/<kebab-case 名称>/`，三件套：

```tsx
// index.tsx
import { View } from '@tarojs/components'
import './index.scss'

export default function PhoneList() {
  return <View className='phone-list'>...</View>
}
```

```ts
// index.config.ts
export default definePageConfig({
  navigationBarTitleText: '页面标题'
})
```

```scss
// index.scss —— BEM 命名，按 750 设计稿写 px
.phone-list {
  padding: 24px;
}
```

2. 注册到 `src/app.config.ts` 的 `pages` 数组（首页必须排第一）。
3. 跳转：`Taro.navigateTo({ url: '/pages/phone-list/index' })`；传参用 `?a=1&b=2`，在 `useLoad((options) => ...)` 或 `useRouter().params` 中取。

## NutUI 用法

```tsx
import { Button, Cell } from '@nutui/nutui-react-taro'  // 具名导入，禁止 import *
import { ArrowRight } from '@nutui/icons-react-taro'
```

- 组件选型先查 Taro 端文档（h5 端组件不一定都有 Taro 版）：https://nutui.jd.com/taro/react/4x/
- 当前为 v4 beta；升级 NutUI 前先对照 v3→v4 迁移文档复查不兼容变更：https://nutui.jd.com/h5/react/4x/#/zh-CN/guide/migrate-from-v3
- **样式定制优先级**：组件 props → NutUI CSS 变量（`--nutui-*`）→ 外层包裹类覆写变量。禁止直接覆盖 `nut-*` 内部类名，禁止 `!important`。
- **主题**：科技蓝主题在 `src/styles/theme.scss`（`:root, page` 上覆盖 `--nutui-*` 变量），全局生效，页面无需任何包裹。调整主题色改这个文件即可。
  - 原理：v4 全量 style.css 不含颜色变量定义块，组件样式都是 `var(--nutui-*, 默认值)`，业务定义即覆盖。
  - 不要在 App 入口挂 ConfigProvider 注入主题：小程序端 App 包裹的 DOM 不渲染到页面，内联变量不生效。
  - 不要覆盖 `--nutui-brand-*` 基础色板（red-* 引用 brand，会连带污染 danger 红色系）。
  - Sass 变量编译期方案（additionalData + style.scss 源码引入）未采用；如需切换需整体评估。
- 别名 `@/` 指向 `src/`：tsconfig paths 与 `config/index.ts` 的 `alias` 双处配置，新增别名要同步两处。
- 弹窗类（Dialog/Popup/Toast）优先组件式写法；命令式 API（如 `Toast.show`）在小程序端的可用性以当前版本文档为准，用前验证。
- 需要页面级滚动/上拉加载时，用 Taro 的 `onReachBottom`/`enablePullDownRefresh`（index.config.ts 中开启），配合 NutUI 的 `InfiniteLoading`。

## 样式规则

- Sass + BEM：`page-name__element--modifier`；页面样式写进本页 `index.scss`。
- 业务尺寸一律按 750 设计稿标注写 `px`，不要写 `rpx`，不要给 NutUI 组件塞内联 px。
- 全局样式只放真正全局的东西到 `src/app.scss`。

## 常见坑

- 小程序端没有 DOM/BOM：`document`、`window`、`localStorage` 禁用；存储用 `Taro.setStorageSync`，平台差异用 `process.env.TARO_ENV` 判断。
- Taro 4 生命周期用 Hooks：`useLoad`/`useDidShow`/`useReachBottom`，不用 class 组件生命周期。
- 新增带构建脚本的依赖后，若 `pnpm install` 报 `ERR_PNPM_IGNORED_BUILDS`，到 `pnpm-workspace.yaml` 的 `allowBuilds` 里显式设置 true/false。
- 内容页布局统一用全局 `.page` 类（app.scss）：`className='page <页面名>'`，首元素不带 margin-top，列表项底部分隔；首页沉浸式例外。
- 下拉刷新用原生方案：页面 config 开 `enablePullDownRefresh: true` + `backgroundColor: '#f2f3f5'`，组件里用 `usePageRefresh(load)`（src/hooks/）。
- **不要用 `sass.data`/`additionalData` 注入会输出 CSS 的文件**（如 NutUI themes/*.scss）：内容会被注入每个 scss 编译单元，官方 Taro demo 曾因此 wcsc 超时、app-origin.wxss 膨胀到 4MB。注入只能是纯 Sass 变量。
- **生产构建后抽查样式**：官方已知 `build:weapp` 生产压缩时 postcss-calc 可能破坏嵌套 `var + calc`（dev 正常），组件样式若异常先查这个。
- 组件样式里的 `calc(24rpx * var(--nut-scale-f, 1))` 是 v4 的**等比缩放体系**：覆盖 `--nut-scale-f`（布局）/ `--nut-scale-font`（字号）/ `--nut-scale-icon`（图标）可整体缩放组件，做大字版/适老化时用；业务覆盖样式时注意 0 值写 `0` 不要写进 calc 缩放。
- 微信开发者工具打开的是项目根目录（`project.config.json` 指向 `miniprogramRoot: ./dist`），先构建再看效果。

## 完成前验证（必须）

```bash
npx tsc --noEmit     # 类型检查零报错
pnpm build:weapp     # 构建成功，dist/ 产物正常
```

改动构建配置或升级 `@tarojs/*`、`@nutui/*` 后，除构建外还需在微信开发者工具里确认页面渲染正常。
