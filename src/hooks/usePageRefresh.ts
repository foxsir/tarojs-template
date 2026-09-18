import Taro, { usePullDownRefresh } from '@tarojs/taro'

/**
 * 页面下拉刷新（微信原生下拉，非 ScrollView 方案）
 *
 * 使用前提：页面 index.config.ts 中开启 `enablePullDownRefresh: true`
 * 建议同步设置 `backgroundColor: '#f2f3f5'`（下拉露出的背景与画布同色）
 */
export function usePageRefresh (refetch: () => Promise<unknown> | void) {
  usePullDownRefresh(() => {
    Promise.resolve(refetch()).finally(() => {
      Taro.stopPullDownRefresh()
    })
  })
}
