import { View, Text } from '@tarojs/components'
import type { PhoneNumber } from '@/types'
import { formatNumber, formatPrice } from '@/utils/phone'
import './index.scss'

interface PhoneNumberCellProps {
  data: PhoneNumber
  onTap?: (data: PhoneNumber) => void
}

export default function PhoneNumberCell ({ data, onTap }: PhoneNumberCellProps) {
  return (
    <View
      className='phone-cell'
      hoverClass='phone-cell--pressed'
      hoverStayTime={80}
      onClick={() => onTap?.(data)}
    >
      <View className='phone-cell__main'>
        <Text className='phone-cell__number'>{formatNumber(data.number)}</Text>
        <View className='phone-cell__meta'>
          <Text className='phone-cell__region'>{data.province} · {data.city}</Text>
          {data.tags.map((tag) => (
            <Text className='phone-cell__tag' key={tag}>{tag}</Text>
          ))}
        </View>
      </View>
      <View className='phone-cell__price'>
        <Text className='phone-cell__price-symbol'>¥</Text>
        <Text className='phone-cell__price-value'>{formatPrice(data.price)}</Text>
      </View>
    </View>
  )
}
