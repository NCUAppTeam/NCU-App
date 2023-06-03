import React from 'react'
import { SettingHeader } from './components/forSetting/SettingHeader'
import { Info } from './components/forSetting/Info'
import { Others } from './components/forSetting/Others'
import { Box, Text } from 'native-base'
import styles from './styles_folder/Styles'

function Settings ({ route, navigation }) {
  const { userInfo } = route.params
  return (
    <Box>
      <SettingHeader navigation={navigation} />
      <Info navigation={navigation} userInfo={userInfo}/>
      <Others navigation={navigation} />
    </Box>
  )
}

export default Settings
