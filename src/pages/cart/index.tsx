import { View, Text } from '@tarojs/components'
import { useShare } from '@/hooks/useShare'
import './index.scss'

export default function Cart () {
  useShare()
  return (
    <View className='page cart'>
      <Text>购物车</Text>
    </View>
  )
}
