import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Search } from '@nutui/icons-react-taro'
import './index.scss'

/** 搜索入口（伪输入框，点击进入搜索页），首页/商城共用 */
export default function SearchEntry () {
  const handleTap = () => {
    Taro.navigateTo({ url: '/pages/search/index' })
  }

  return (
    <View
      className='search-entry'
      hoverClass='search-entry--pressed'
      onClick={handleTap}
    >
      <Text className='search-entry__placeholder'>搜索号码、尾号、归属地</Text>
      <View className='search-entry__button'>
        <Search size={16} color='#ffffff' />
      </View>
    </View>
  )
}
