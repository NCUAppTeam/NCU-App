import React from 'react'
import { SettingHeader } from './components/SettingHeader'
import { Box, Text } from 'native-base'
import styles from './Styles'

function Settings ({ route, navigation }) {
  const { userInfo } = route.params
  return (
    <Box safeArea>
      <SettingHeader navigation={navigation} />
      <Text>{userInfo.name}</Text>
    </Box>
  )
}

export default Settings
