import { View, Text } from '@tarojs/components'
import type { PhoneNumber } from '@/types'
import { formatNumber, formatPrice } from '@/utils/phone'
import './index.scss'

interface PhoneNumberCardProps {
  data: PhoneNumber
  onTap?: (data: PhoneNumber) => void
}

export default function PhoneNumberCard ({ data, onTap }: PhoneNumberCardProps) {
  return (
    <View
      className='phone-card'
      hoverClass='phone-card--pressed'
      hoverStayTime={80}
      onClick={() => onTap?.(data)}
    >
      <View className='phone-card__head'>
        <Text className='phone-card__number'>{formatNumber(data.number)}</Text>
      </View>
      <View className='phone-card__meta'>
        <Text className='phone-card__region'>{data.province} · {data.city}</Text>
        {data.reason && <Text className='phone-card__reason'>{data.reason}</Text>}
        {data.tags.map((tag) => (
          <Text className='phone-card__tag' key={tag}>{tag}</Text>
        ))}
      </View>
      <View className='phone-card__foot'>
        <View className='phone-card__price'>
          <Text className='phone-card__price-symbol'>¥</Text>
          <Text className='phone-card__price-value'>{formatPrice(data.price)}</Text>
        </View>
        <Text className='phone-card__action'>选号</Text>
      </View>
    </View>
  )
}
