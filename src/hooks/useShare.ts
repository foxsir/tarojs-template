import { useShareAppMessage, useShareTimeline } from '@tarojs/taro'

// TODO: 替换为你的小程序名称与 slogan
const SHARE_TITLE = '小程序名称｜一句话介绍'

/**
 * 页面分享（好友 + 朋友圈）
 * 在每个页面组件顶层调用一次即可（tabBar 页与普通页均生效）
 */
export function useShare () {
  useShareAppMessage(() => ({
    title: SHARE_TITLE,
    path: '/pages/index/index'
  }))
  useShareTimeline(() => ({
    title: SHARE_TITLE
  }))
}
