/** 号码与价格展示格式化 */

/** 11 位号码 → 3-4-4 分组（如 138 8888 8888） */
export function formatNumber (number: string) {
  return `${number.slice(0, 3)} ${number.slice(3, 7)} ${number.slice(7)}`
}

/** 价格千分位（如 12800 → 12,800） */
export function formatPrice (price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
