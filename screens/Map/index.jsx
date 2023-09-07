import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MapScreen from './MapScreen'
import First from './BusScreen/firstpage'
import UST from './BusScreen/UST'
import BusDetailView from './BusScreen/busDetailView'
import BusTimeTable from './BusScreen/busTimeTable'

const Stack = createNativeStackNavigator()

function MapStack () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="地圖首頁" component={MapScreen} />
      <Stack.Screen name="公車動態" component={First} />
      <Stack.Screen name="UST" component={UST} />
      <Stack.Screen name="BusDetailView" component={BusDetailView} />
      <Stack.Screen name="BusTimeTable" component={BusTimeTable} />
    </Stack.Navigator>
  )
}

export default MapStack
