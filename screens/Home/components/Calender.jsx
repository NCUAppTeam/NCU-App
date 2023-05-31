import React from 'react'
import { SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview'
import styles from '../Styles'

export function Calendar () {
  return (
    <SafeAreaView style={styles.containerForCal}>
      <WebView
        source={{ uri: 'https://calendar.google.com/calendar/embed?src=ncu.acad@gmail.com&ctz=Asia/Taipei' }}
      />
    </SafeAreaView>
  )
}

export default { Calendar }
