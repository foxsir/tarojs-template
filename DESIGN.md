---
name: 小程序名称
description: 科技蓝主题的微信小程序界面设计系统
colors:
  signal-blue: "#1677ff"
  signal-blue-deep: "#0958d9"
  signal-blue-glow: "#4096ff"
  signal-blue-light: "#e6f4ff"
  signal-blue-mist: "#bae0ff"
  ink: "#1a1a1a"
  slate: "#505259"
  muted: "#888b94"
  disabled: "#b4b8bf"
  canvas: "#f2f3f5"
  surface: "#ffffff"
  hairline: "rgba(0, 0, 0, 0.06)"
  alert-red: "#ff0f23"
  wechat-green: "#07c160"
  wechat-green-deep: "#06a854"
typography:
  display:
    fontFamily: "PingFang SC, Helvetica Neue, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
  headline:
    fontFamily: "PingFang SC, Helvetica Neue, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.4
  title:
    fontFamily: "PingFang SC, Helvetica Neue, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "PingFang SC, Helvetica Neue, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "PingFang SC, Helvetica Neue, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  xxl: "16px"
  pill: "999px"
spacing:
  xxs: "4px"
  xs: "6px"
  sm: "7px"
  base: "8px"
  lg: "9px"
  xl: "12px"
  xxl: "16px"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
    typography: "{typography.body}"
  button-primary-pressed:
    backgroundColor: "{colors.signal-blue-deep}"
  button-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  tag-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.xs}"
    padding: "0 2px"
    height: "14px"
  tabbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
---

# Design System: 小程序名称

## Overview

**Creative North Star: "信号蓝 The Signal Blue"**

以通信信号的蓝为整个系统的唯一声音：明亮、干净、可靠。它是「科技蓝」主题的直接延伸——一个官方授权服务商应有的样子：不喧哗，但每个像素都让你确信这单交易是安全的。页面底色是浅灰画布，内容以白色卡片浮于其上，蓝色只出现在真正需要决策的地方（主按钮、选中态、价格与关键链接）。

整体氛围明亮轻快、亲和友好，而组件本身精练笃定：按钮、卡片、输入框干净利落，不做多余的装饰性细节。信息密度中等——浏览与决策是快速扫视比较的过程，界面要帮助用户扫视、比较、下单，而不是展览。

**Key Characteristics:**

- 单一主色（#1677ff）主导，靠稀缺性获得注意力
- 白卡片 + 浅灰画布的分层方式，而非阴影堆叠
- 克制的圆角（标签 2px、按钮/输入框 4px、卡片 8px）
- 发丝线分隔（rgba(0, 0, 0, 0.06)），保持界面轻盈
- 中文系统字体，字号阶梯小而清晰

## Colors

清爽的蓝白体系：一个蓝，一组灰，一个危险红。

### Primary

- **Signal Blue** (#1677ff)：强调色 = 行动与高亮——**主按钮背景**（pill）、选中态（筛选、勾选、tabBar）、数据高亮 chip（推荐理由）、关键链接。价格与关键数字用 Ink 墨黑，不用强调色。
- **Signal Blue Deep** (#0958d9)：按压态。主按钮 active、深色文字链接。
- **Signal Blue Glow** (#4096ff)：渐变起点。仅用于渐变按钮（135deg，Glow → Signal Blue）。
- **Signal Blue Light** (#e6f4ff)：浅色填充底。浅色标签、选中背景、信息提示底。
- **Signal Blue Mist** (#bae0ff)：浅色按压态。
- **Signal Blue Fade** (#91caff)：特殊禁用态的蓝色替身（对应 NutUI `--nutui-color-primary-disabled-special`）。

### Neutral

- **Ink** (#1a1a1a)：标题与主要文字。不用纯黑。
- **Slate** (#505259)：正文文字。
- **Muted** (#888b94)：辅助说明、tabBar 未选中文字与图标。
- **Disabled** (#b4b8bf)：禁用文字、默认按钮描边。
- **Canvas** (#f2f3f5)：页面背景画布。
- **Surface** (#ffffff)：卡片、列表、tabBar 背景。
- **Hairline** (rgba(0, 0, 0, 0.06))：分隔线与描边。

### Tertiary

- **Alert Red** (#ff0f23)：危险与错误语义（NutUI danger 默认值，未主题化）。仅用于错误提示、删除操作，不参与品牌表达。
- **WeChat Green** (#07c160 / 按压 #06a854)：微信平台约定色，**仅用于「微信一键登录」按钮**（用户对微信登录按钮的绿色有强识别预期）。不得用于其他任何场景。


### Named Rules

**The Signal Rule.** 强调色 = 行动与高亮：主按钮、选中态、高亮 chip、关键链接、tabBar 选中；价格与关键数字保持 Ink 墨黑。除行动元素外，强调色在任意一屏的覆盖率 ≤5%（含 chip 浅色底）。

**The No-Brand-Red Rule.** 不覆盖 NutUI 的 `--nutui-brand-*` 基础色板——`red-*` 引用 brand，改它会连带污染 danger 红色系。

## Typography

**Body Font:** PingFang SC / Helvetica Neue / system-ui（小程序系统默认，无自定义字体）

**Character:** 系统字体带来的中性、原生、可信——用户看到的是微信里最熟悉的面孔，没有加载成本。字重只用 400 / 500 / 600 三档。

### Hierarchy

- **Display** (600, 24px, 1.3)：页面级数字与空态标题，极少量使用。
- **Headline** (600, 18px, 1.4)：页面主标题、区块大标题。
- **Title** (500, 16px, 1.5)：卡片标题、列表主文案。
- **Body** (400, 14px, 1.5)：正文、按钮文字、表单值。
- **Label** (400, 11px, 1.4)：辅助说明、标签文字、tabBar 文字。

尺寸为 NutUI 375 基准 px（编译时 ×2 转 rpx）；业务样式按 750 设计稿标注写 px。

### Named Rules

**The System Font Rule.** 不引入自定义字体。层级靠字号与字重，不靠字体家族。

## Layout

- **双设计稿**：NutUI 组件按 375 基准（px ×2 → rpx）；业务代码按 750 设计稿标注写 px（1px = 1rpx），不手写 rpx。
- **页面留白**：页面水平内边距 32rpx（750 稿）；卡片内边距 24–32rpx。
- **节奏**：垂直间距取自 NutUI 间距阶梯（4 / 6 / 7 / 8 / 9 / 12 / 16，375 基准）。
- **密度**：中等密度，列表以「主信息 + 次级信息 + 关键数值」单行可扫视优先。
- **结构**：原生 tabBar 固定底部（首页 / 商城 / 购物车 / 我的），页面内容区不重复导航。

## Elevation & Depth

系统**默认扁平**。深度靠色调分层表达：白色 Surface 卡片浮在 Canvas 浅灰底上，配合 1px Hairline 描边，而不是阴影。阴影仅保留给 NutUI 组件的浮层语义（Popup / Notify / 下拉菜单的 ambient 阴影），不作为常规页面装饰。

### Named Rules

**The Flat Canvas Rule.** 静态界面零阴影。需要分组用白卡片 + 发丝线，不要用投影。

**The Hairline Rule.** 分隔优先用 1px rgba(0, 0, 0, 0.06) 发丝线；线比阴影轻，也比阴影准。

## Shapes

圆角体系（375 基准）：chip 4px（sm）→ 卡片 8–16px（lg/xxl，首页卡片用 16px）→ 弹层 12–16px。描边一律 1px 发丝线。**例外：按钮、搜索框、导航 chip 采用全圆角（pill）**——pill 只属于交互控件。卡片零阴影零描边，靠填充色与画布分层（见 `.opencode/skills/lime-dashboard`）。

## Components

### Buttons

- **Primary（pill）:** Signal Blue 底（#1677ff）白字，全圆角，按压态深蓝（#0958d9）。卡片内主动作：44px 高、22px 字、横内边距 20px。
- **Default:** 白底，1px 描边 Disabled 灰（#b4b8bf），文字 Ink，圆角 4px。
- **圆形导航按钮:** 56px 直径白底圆 + 1px 发丝线 + 墨色箭头，用于区块级导航（查看更多）。

### Tag / chip

- **Style:** 高度 32px（750 稿 = 16px @375），横内边距 12px，圆角 4px，字号 22px（750 稿 = 11px @375）。
- **高亮:** 淡蓝底（#e6f4ff）+ 深蓝文字（#0958d9），用于推荐理由等数据高亮。
- **普通:** 浅灰底（#f2f3f5）+ 灰文字（#505259）。

### Navigation / tabBar

- **Style:** 白底，顶部 1px 发丝线；未选中文字与图标 Muted（#8d9199），选中 Signal Blue（#1677ff），文字 10–11px。
- **Icon:** 线性图标，81×81 PNG（未选中灰 / 选中蓝两态），不混用填充与描边风格。

## Do's and Don'ts

### Do:

- **Do** 强调色用于行动与高亮：主按钮（Signal Blue pill）、选中态、高亮 chip、关键链接、tabBar 选中；价格与关键数字用 Ink 墨黑。
- **Do** 用白卡片 + 浅灰画布分组内容（The Flat Canvas Rule）。
- **Do** 分隔线统一 1px rgba(0, 0, 0, 0.06)（The Hairline Rule）。
- **Do** 业务尺寸按 750 稿写 px，让 Taro 转换；组件样式定制走 NutUI CSS 变量。
- **Do** 文字用 Ink / Slate / Muted 三级灰阶，保持层次。

### Don't:

- **Don't** 覆盖 `--nutui-brand-*` 色板或直接覆写 `nut-*` 内部类名。
- **Don't** 用纯黑（#000）文字或纯灰背景；用 Ink 与 Canvas。
- **Don't** 给静态卡片加投影，或用阴影替代分隔线。
- **Don't** 在正文/装饰中使用 Alert Red——它只属于错误语义。
- **Don't** 引入第二种强调色或第二个渐变方向。
