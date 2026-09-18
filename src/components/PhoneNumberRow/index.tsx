import { View, Text } from '@tarojs/components'
import type { PhoneNumber } from '@/types'
import { formatNumber, formatPrice } from '@/utils/phone'
import './index.scss'

interface PhoneNumberRowProps {
  data: PhoneNumber
  onTap?: (data: PhoneNumber) => void
}

export default function PhoneNumberRow ({ data, onTap }: PhoneNumberRowProps) {
  return (
    <View
      className='phone-row'
      hoverClass='phone-row--pressed'
      hoverStayTime={80}
      onClick={() => onTap?.(data)}
    >
      <View className='phone-row__main'>
        <Text className='phone-row__number'>{formatNumber(data.number)}</Text>
        <View className='phone-row__meta'>
          <Text className='phone-row__region'>{data.province} · {data.city}</Text>
          {data.reason && <Text className='phone-row__reason'>{data.reason}</Text>}
          {data.tags.map((tag) => (
            <Text className='phone-row__tag' key={tag}>{tag}</Text>
          ))}
        </View>
      </View>
      <View className='phone-row__price'>
        <Text className='phone-row__price-symbol'>¥</Text>
        <Text className='phone-row__price-value'>{formatPrice(data.price)}</Text>
      </View>
    </View>
  )
}
