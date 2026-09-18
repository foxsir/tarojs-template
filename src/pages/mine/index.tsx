import { View, Text } from '@tarojs/components'
import { useShare } from '@/hooks/useShare'
import './index.scss'

export default function Mine () {
  useShare()
  return (
    <View className='page mine'>
      <Text>我的</Text>
    </View>
  )
}
