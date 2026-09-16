import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Button, Tag } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      <View className='index__demo'>
        <Button type='primary'>科技蓝主题</Button>
        <Button type='default'>默认按钮</Button>
        <Tag type='primary'>标签</Tag>
      </View>
    </View>
  )
}
