import React from 'react'
import { SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview'
import styles from './Styles'

function CalendarStack () {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://calendar.google.com/calendar/embed?src=ncu.acad@gmail.com&ctz=Asia/Taipei' }}
      />
    </SafeAreaView>
  )
}

export default CalendarStack
