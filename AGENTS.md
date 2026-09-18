# 项目开发规范

> Taro + React + NutUI 小程序模板。本文档是团队协作与 AI 代理的共同规范，修改技术栈、目录结构、构建配置、工作流程时**必须同步更新本文档**。

## 1. 技术栈

| 项 | 版本/说明 |
|---|---|
| 框架 | Taro 4.2.1 + React 18 + TypeScript 5 |
| 编译器 | **vite**（`@tarojs/vite-runner`，非 webpack） |
| 样式 | Sass（scss） |
| UI 组件库 | `@nutui/nutui-react-taro@4.0.0-beta.7`（NutUI React Taro **v4，beta**，v3→v4 迁移说明见 <https://nutui.jd.com/h5/react/4x/#/zh-CN/guide/migrate-from-v3>） |
| 图标 | `@nutui/icons-react-taro@3.0.2`（与组件库内部依赖版本对齐，勿单独升级） |
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
  components/      业务公共组件（PhoneNumberRow 号码行、PhoneNumberCard 推荐卡片、PhoneNumberCell 网格单元、SearchEntry 搜索入口）
  assets/          静态资源（tabbar/ 底部导航图标等；svg/ 为源文件，改后重新生成 PNG，规范见 4.7）
  styles/          全局样式资源（theme.scss 科技蓝主题等）
  utils/           工具函数（phone.ts 号码/价格格式化等）
  hooks/           自定义 Hooks（usePageRefresh 页面下拉刷新、useShare 页面分享等）
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

### 4.6 主题：科技蓝（CSS 变量覆盖）

- 主题定义在 `src/styles/theme.scss`，由 `src/app.scss` 引入，全局生效。
- 原理：v4 全量 `style.css` 不含颜色变量定义块，组件样式均为 `var(--nutui-*, 默认值)` 形式，因此在 `:root, page` 上定义变量即可覆盖，无加载顺序问题。
- 只覆盖 `--nutui-color-primary-*` 语义变量；不要覆盖 `--nutui-brand-*` 基础色板（`red-*` 引用 brand，会连带污染 danger 红色系）。
- v4 beta 存在个别硬编码色值的组件（如 `.nut-tag-primary` 写死 `#fa2c19`）：theme.scss 中以 `:root/page` 后代选择器提优先级打补丁（vendors.wxss 后加载，同优先级会输）；升级 NutUI 后复查是否已修复、补丁可移除。排查方法：在编译产物中搜索默认红色 hex（`#fa2c19`/`#ff0f23` 等）是否出现在 `var(...)` 之外。
- 不要挂在 App 入口的 ConfigProvider：小程序端 App 组件包裹的 DOM 不会渲染到页面（原生 page 只渲染页面自身子树），只有 Context 生效，内联 CSS 变量不会出现在页面上。
- 禁止用 `sass.data` / `additionalData` 注入含 CSS 输出的文件（如 themes/default.scss）：注入内容会进入**每一个** scss 编译单元，官方 Taro demo 曾因此导致 base64 字体重复 216 次、`app-origin.wxss` 膨胀至 4MB、wcsc 编译超时。若将来切换 Sass 源码主题路线，注入文件必须是纯 Sass 变量、零 CSS 输出。
- NutUI 官方已知限制：`build:weapp` 生产压缩时 postcss-calc 可能破坏嵌套 `var + calc`（dev 无此问题），生产构建后需在开发者工具抽查组件样式。
- 路径别名 `@/*` 同时配置在 `tsconfig.json` 的 `paths` 和 `config/index.ts` 的 `alias`（vite 不读 tsconfig paths，两处必须同步）。

### 4.7 图片资产工作流（SVG → PNG）

- **原因**：小程序 `<Image>` 组件不支持 SVG；WXSS `background-image` 不接受本地文件路径（仅 base64/网络 URL）。矢量图统一走「SVG 源文件 → PNG 产物」流程。
- **目录约定**：SVG 源文件放 `src/assets/shapes/svg/`，生成的 PNG 放 `src/assets/shapes/`（同名对应）。
- **SVG 是唯一可编辑源**：禁止手改 PNG；调整形状/颜色/尺寸一律改 SVG 后重新生成。
- **生成命令**（项目根目录执行）：

  ```bash
  npx sharp-cli -i src/assets/shapes/svg/<name>.svg -o src/assets/shapes/<name>.png
  ```

- **尺寸规范**：SVG 的 `width`/`height` 属性即 PNG 输出像素，按展示尺寸的 2–3 倍设置以覆盖高分屏（如展示 64px → 渲染 320px）。
- **命名**：语义小写连字符（如 `blob-yellow`、`sparkle`）；新增形状后同步更新页面/mock 中的资产映射。
- 产物 PNG 体积 <10KB 时会被 vite 自动内联为 base64，无需额外处理；单张超 100KB 需评估分包或压缩。
- 注：tabbar 图标的 SVG 源文件目前在仓库外（`~/Downloads/icons`），后续可迁入 `assets/tabbar/svg/` 统一到本流程。

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
- **页面布局约定**：内容页根节点用 `className='page <页面名>'`（全局 `.page` 类提供画布底色与统一首间距 32px）；首元素不带 `margin-top`，列表项用底部分隔（`margin: 0 32px 16px`）。首页为沉浸式例外，不用 `.page`。
- **下拉刷新**：用微信原生方案——页面 `index.config.ts` 开 `enablePullDownRefresh: true`（建议同步 `backgroundColor: '#f2f3f5'`），页面组件用共享 hook `usePageRefresh(load)`（`src/hooks/`），不用 NutUI PullToRefresh（避免 ScrollView 侵入）。
- **页面分享**：用共享 hook `useShare()`（`src/hooks/`，仅好友转发）。**必须**在页面 `index.config.ts` 声明 `enableShareAppMessage: true`——Taro 只在声明后才会把 `onShareAppMessage` 写进原生 `Page()` 配置，否则运行时报「当前页面未设置分享」。朋友圈分享需小程序正式发布后可用（届时加 `useShareTimeline` + `enableShareTimeline`）。
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
- 使用前查官方文档确认 Taro 端支持：<https://nutui.jd.com/taro/react/4x/>（注意：当前为 v4 beta，升级组件库前需复查迁移文档的不兼容变更清单）。
- 弹窗类组件（Dialog/Popup/Toast）优先用组件式 API；`Toast` 等命令式 API 需确认当前版本在小程序端可用。
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

## 9. 设计工作流（impeccable）

项目已安装 [impeccable](https://impeccable.style) 设计 skill（`.opencode/skills/impeccable/`），为 AI 代理提供设计词汇、评审与检查能力。

- **项目设计语言**：`.opencode/skills/lime-dashboard/`（源自设计参考图：浅灰画布 + 白色圆角卡 + 品牌色 pill 按钮（Signal Blue）+ 大号等宽数字 + 强调色稀疏高亮）。首页/卡片型页面可遵循该语言；全局设计系统见 `DESIGN.md`。

- **调用**：对话中输入 `/impeccable <命令> <目标>`；无参数时显示上下文感知菜单。常用示例：`/impeccable shape 商城页`、`/impeccable critique 首页`、`/impeccable polish 购物车`。
- **上下文文件**：`PRODUCT.md`（产品事实，由 `init` 生成）、`DESIGN.md`（视觉系统，由 `document` 生成），设计类任务开始前应先读取。
- **平台限制**：`live`（浏览器内变体迭代）与内置 HTML 检测器仅适用于 web，微信小程序项目不适用；小程序端的检查用 `critique` / `audit` 走代码分析。
- **更新**：`npx impeccable update`；引擎二进制为平台相关大文件（已 gitignore，首次运行自动下载）。

### 命令清单

| 类别 | 命令 | 说明 |
|---|---|---|
| 构建 | `craft [功能]` | 完整"规划→构建"流程（已废弃别名，等同普通新建请求） |
| 构建 | `shape [功能]` | 写代码前规划 UX/UI（信息架构、布局、层级） |
| 构建 | `init` | 一次性设置：收集产品上下文，写入 `PRODUCT.md` |
| 构建 | `document` | 从现有代码生成根 `DESIGN.md`（视觉系统文档） |
| 构建 | `extract [目标]` | 提取可复用组件与 tokens 到设计系统 |
| 评估 | `critique [目标]` | UX 设计评审：层级、清晰度、情感共鸣（含评分） |
| 评估 | `audit [目标]` | 技术质量检查：无障碍、性能、响应式 |
| 打磨 | `polish [目标]` | 发布前终检：设计系统对齐、就绪度 |
| 打磨 | `bolder [目标]` | 放大平淡的设计 |
| 打磨 | `quieter [目标]` | 收敛过激/过载的设计 |
| 打磨 | `distill [目标]` | 去繁就简，剥离至本质 |
| 打磨 | `harden [目标]` | 生产就绪：错误处理、i18n、文本溢出、边界 |
| 打磨 | `onboard [目标]` | 首启流程、空态、激活路径 |
| 增强 | `animate [目标]` | 添加有目的的动效 |
| 增强 | `colorize [目标]` | 引入策略性色彩 |
| 增强 | `typeset [目标]` | 修复字体选择、层级、字号 |
| 增强 | `layout [目标]` | 修复布局、间距、视觉节奏 |
| 增强 | `delight [目标]` | 添加记忆点与个性 |
| 增强 | `overdrive [目标]` | 添加技术性极致效果 |
| 修复 | `clarify [目标]` | 改善不清晰的 UX 文案、标签、错误信息 |
| 修复 | `adapt [目标]` | 适配不同设备与屏幕尺寸 |
| 修复 | `optimize [目标]` | 诊断并修复 UI 性能 |
| 迭代 | `live` | 浏览器内视觉变体迭代（web only，小程序不适用） |

附加管理命令：`pin <命令>` / `unpin <命令>`（生成独立快捷键，如 `/audit`）、`hooks <on|off|status|...>`（设计检测器钩子，web 项目）、`doctor`（检查/修复 impeccable 产物漂移）。
