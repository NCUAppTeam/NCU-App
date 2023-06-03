import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from './settings'
import HomePage from './homePage'
import Message from './Message'
import Send from './Send'
import BigCal from './bigCal'
import EditInfo from './EditInfo'
import styles from './styles_folder/Styles'

const Stack = createNativeStackNavigator()

function HomeStack () {
  return (
    <Stack.Navigator
      initialRouteName="homepage"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="homepage" component={HomePage} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="hmessage" component={Message} />
      <Stack.Screen name="hsend" component={Send} />
      <Stack.Screen name="BigCal" component={BigCal} />
      <Stack.Screen name="EditInfo" component={EditInfo} />
    </Stack.Navigator>
  )
}

export default HomeStack
