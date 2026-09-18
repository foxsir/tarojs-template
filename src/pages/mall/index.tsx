import { View, Text } from '@tarojs/components'
import { useShare } from '@/hooks/useShare'
import './index.scss'

export default function Mall () {
  useShare()
  return (
    <View className='page mall'>
      <Text>商城</Text>
    </View>
  )
}
