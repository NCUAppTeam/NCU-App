import React from 'react'
import { SettingHeader } from './components/SettingHeader'
import { Info } from './components/Info'
import { Others } from './components/Others'
import { Box, Text } from 'native-base'
import styles from './Styles'

function Settings ({ route, navigation }) {
  const { userInfo } = route.params
  return (
    <Box safeArea>
      <SettingHeader navigation={navigation} />
      <Info navigation={navigation} userInfo={userInfo}/>
      <Others navigation={navigation} />
    </Box>
  )
}

export default Settings
