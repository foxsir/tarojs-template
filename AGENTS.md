# 项目开发规范

> Taro + React + NutUI 小程序模板。本文档是团队协作与 AI 代理的共同规范，修改技术栈、目录结构、构建配置、工作流程时**必须同步更新本文档**。

## 1. 技术栈

| 项 | 版本/说明 |
|---|---|
| 框架 | Taro 4.2.1 + React 18 + TypeScript 5 |
| 编译器 | **vite**（`@tarojs/vite-runner`，非 webpack） |
| 样式 | Sass（scss） |
| UI 组件库 | `@nutui/nutui-react-taro@4.0.0-beta.7`（NutUI React Taro 4.x beta，已按官方 [v3→v4 迁移指南](https://nutui.jd.com/h5/react/4x/#/zh-CN/guide/migrate-from-v3) 升级） |
| 图标 | `@nutui/icons-react-taro@3.0.2`（与组件库 v4 内部锁定依赖对齐，勿单独升级） |
| 包管理 | pnpm >= 11.6.0（`packageManager` 字段锁定 11.6.0，Node >= 22.13.1） |
| 主端 | 微信小程序（weapp），多端构建能力保留 |

## 2. 常用命令

```bash
pnpm install          # 安装依赖
pnpm dev:weapp        # 微信小程序开发模式（watch），产物在 dist/，用微信开发者工具打开
pnpm build:weapp      # 微信小程序生产构建
npx tsc --noEmit      # 类型检查（提交前必须通过）
pnpm new              # Taro 页面/组件脚手架
```

**完成任何代码改动后，必须运行 `npx tsc --noEmit` 和 `pnpm build:weapp` 验证通过。**

## 3. 目录结构

```
config/            Taro 构建配置（index.ts 主配置，dev.ts/prod.ts 环境差异）
src/
  app.config.ts    全局配置：页面注册、window、tabBar、分包
  app.ts           入口：引入 NutUI 全量样式 + 全局 scss
  app.scss         全局样式
  pages/           页面，每页一个目录：index.tsx + index.config.ts + index.scss
  components/      业务公共组件（待建）
  utils/           工具函数（待建）
  services/        接口请求封装（待建）
types/             全局类型声明
```

## 4. 关键架构决策（不要擅自更改）

### 4.1 designWidth 双设计稿（`config/index.ts`）

- **NutUI 组件库文件按 375 设计稿**转换，**业务代码按 750 设计稿**转换。
- 业务样式按 750 设计稿标注写 `px`，Taro 自动转 `rpx`（750 基准下 1px = 1rpx）。
- 不要改 `designWidth` 函数逻辑；不要给 NutUI 组件写内联 px 尺寸覆盖。

### 4.2 NutUI 样式全量引入（`src/app.ts`）

- 已在入口 `import '@nutui/nutui-react-taro/dist/style.css'`。
- 因为编译器是 **vite**，官方按需方案 `babel-plugin-import` **不适用，禁止配置**。
- 后续如需瘦身，评估分包或 vite 侧按需方案后再做，需更新本文档。

### 4.3 `@tarojs/plugin-html` 已开启

NutUI 组件渲染依赖 HTML 标签，插件版本必须与 Taro 版本（4.2.1）严格一致。

### 4.4 不引入 Tailwind

已评估并决定**不使用** Tailwind/weapp-tailwindcss（选择器转义、preflight 污染 NutUI、动态类名失效、vite 链路适配风险）。样式方案 = NutUI 组件 + Sass（BEM）。

### 4.5 H5 pxtransform 黑名单

`h5.postcss.pxtransform.config.selectorBlackList: ['nut-']`，`nut-` 前缀类名不做单位转换，避免 NutUI 样式被二次转换。

## 5. 代码规范

### 5.1 TypeScript / React

- 函数组件 + Hooks，禁止 class 组件。
- 组件 props 显式声明类型；避免 `any`（`noImplicitAny` 关闭是模板遗留，不代表可以用 any）。
- 路径别名：`@/*` → `src/*`，优先使用别名而非深层相对路径。
- 禁止使用已废弃的 Taro API；生命周期用 `useLoad` / `useDidShow` 等 Hooks 形式。

### 5.2 页面与组件

- 页面放 `src/pages/<name>/`，目录名 kebab-case，三件套：
  ```
  pages/phone-list/
    index.tsx          页面组件
    index.config.ts    页面配置（navigationBarTitleText 等）
    index.scss         页面样式
  ```
- 新页面必须注册到 `src/app.config.ts` 的 `pages`；首页必须排在第一个。
- 业务公共组件放 `src/components/<Name>/`，目录 PascalCase。
- 小程序端禁用 DOM/BOM API（`document`、`window` 等）；平台差异用 `process.env.TARO_ENV` 判断。

### 5.3 样式

- Sass + BEM 命名：`block__element--modifier`，避免全局污染。
- 禁止 `!important`（覆盖第三方样式确需使用时加注释说明）。
- 禁止直接覆盖 `nut-` 开头的 NutUI 内部类名；定制优先用：
  1. 组件 props；
  2. NutUI CSS 变量（`--nutui-*`，配合 `ConfigProvider` 的 `theme`）；
  3. 最后才考虑外层包裹类 + CSS 变量覆写。
- stylelint 校验必须通过。

### 5.4 NutUI 使用

```tsx
import { Button, Cell } from '@nutui/nutui-react-taro'   // 组件
import { ArrowRight } from '@nutui/icons-react-taro'     // 图标
```

- 组件、图标都从具名导出引入，禁止全量 `import * as`。
- 使用前查官方文档确认 Taro 端支持：<https://nutui.jd.com/taro/react/4x/>
- 弹窗类组件（Dialog/Popup/Toast）优先用组件式 API；`Toast` 等命令式 API 需确认当前版本在小程序端可用。v4 中 `Toast` 默认时长由 2s 改为 3s，如需旧行为显式传 `duration: 2`。
- 图标包版本随 `@nutui/nutui-react-taro` 的内部依赖走，不要单独升级 `@nutui/icons-react-taro`。

### 5.5 网络请求与业务

- 统一封装 `Taro.request`（`src/services/`），集中处理 baseURL、鉴权 token、错误码、loading；页面不直接裸调 `Taro.request`。
- 环境变量走 `.env.development` / `.env.test` / `.env.production` + `defineConstants`。

## 6. Git 规范

- 提交信息遵守 **Conventional Commits**（commitlint 强制）：`feat: xxx` / `fix: xxx` / `chore: xxx` / `docs: xxx` 等。
- Husky 钩子：`commit-msg`（commitlint）、`pre-commit`（lint-staged）。**禁止 `--no-verify` 跳过**。
- 分支：`main` 主干，功能开发用 `feat/xxx`、修复用 `fix/xxx`。
- 不提交 `dist/`、`node_modules/`、`.temp/`（已 gitignore，勿强制添加）。

## 7. 依赖管理（pnpm）

- 安装/升级依赖统一用 `pnpm add` / `pnpm up`，提交 `pnpm-lock.yaml`。
- pnpm 默认拦截依赖构建脚本：新增依赖若出现在 `ERR_PNPM_IGNORED_BUILDS` 警告里，须在 `pnpm-workspace.yaml` 的 `allowBuilds` 中显式配置 `true/false`（原则：native 编译类如 `esbuild`/`@swc/core`/`@tarojs/binding` 设 `true`；纯统计上报类如 NutUI postinstall 设 `false`）。
- 升级 `@nutui/*`、`@tarojs/*` 前先在隔离分支验证 `build:weapp` 与真机预览。

## 8. 调试与预览

- 微信开发者工具打开项目根目录（`project.config.json` 已指向 `miniprogramRoot: ./dist`）。
- appid 当前为测试号 `touristappid`，正式项目使用前在 `project.config.json` 中替换为真实 appid。
