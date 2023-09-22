import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import styles from './styles_folder/Styles'
import { Box } from 'native-base'
import homeController from '../../controller/Home'

function BigCal ({ navigation }) {
  const [link, setLink] = useState()
  useEffect(() => {
    homeController.getCalender().then((res) => {
      setLink(res)
    })
  }, [])
  return (
    <Box safeArea style={styles.containerForCal}>
      <WebView
        source={{ uri: link }}
      />
    </Box>
  )
}

export default BigCal
