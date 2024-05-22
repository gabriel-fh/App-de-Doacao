import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const index = () => {
    const top = useSafeAreaInsets().top
    return (
    <View style={styles.container} className='flex-1'>
      <Text className='text-2xl font-bold'>index</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default index