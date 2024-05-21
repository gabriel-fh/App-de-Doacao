import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const index = () => {
    const top = useSafeAreaInsets().top
    return (
    <View style={{marginTop: top}}>
      <Text>index</Text>
    </View>
  )
}

export default index