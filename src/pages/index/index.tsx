import { View, Text } from '@tarojs/components'
import { useShare } from '@/hooks/useShare'
import SearchEntry from '@/components/SearchEntry'
import PhoneNumberRow from '@/components/PhoneNumberRow'
import type { PhoneNumber } from '@/types'
import './index.scss'

/** 模板首页：.page 布局 + 基础设施组件示例 */
export default function Index () {
  useShare()

  const demo: PhoneNumber = {
    id: 'demo-1',
    number: '13888888888',
    province: '广东',
    city: '深圳',
    tags: ['四连号'],
    price: 12800
  }

  return (
    <View className='page home'>
      <SearchEntry />
      <View className='home__section-head'>
        <Text className='home__section-title'>为你推荐</Text>
      </View>
      <PhoneNumberRow data={demo} />
    </View>
  )
}
