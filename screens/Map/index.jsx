import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './MapScreen';
import BusScreen from './BusScreen';
import SearchScreen from './SearchScreen';

const Stack = createNativeStackNavigator();

function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="地圖" component={MapScreen} />
      <Stack.Screen name="搜尋" component={SearchScreen} />
      <Stack.Screen name="公車時刻表" component={BusScreen} />
    </Stack.Navigator>
  );
}

export default MapStack;
