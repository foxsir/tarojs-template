/** 手机号展示数据结构（号码卡片/行/单元组件共用） */
export interface PhoneNumber {
  id: string
  /** 11 位完整号码 */
  number: string
  province: string
  city: string
  /** 靓号类型标签 */
  tags: string[]
  /** 价格（元） */
  price: number
  /** 推荐理由（仅推荐区展示） */
  reason?: string
}
