import { useShareAppMessage } from '@tarojs/taro'

// TODO: 替换为你的小程序名称与 slogan
const SHARE_TITLE = '小程序名称｜一句话介绍'

/**
 * 页面分享（仅好友转发）
 * 在每个页面组件顶层调用一次即可（tabBar 页与普通页均生效）
 *
 * 前提：页面 index.config.ts 需声明 enableShareAppMessage: true，
 * 否则 Taro 不会把 onShareAppMessage 写进原生 Page() 配置（报"当前页面未设置分享"）。
 * 朋友圈分享需小程序正式发布后可用，暂不注册（上线后可加回 useShareTimeline + enableShareTimeline）。
 */
export function useShare () {
  useShareAppMessage(() => ({
    title: SHARE_TITLE,
    path: '/pages/index/index'
  }))
}
