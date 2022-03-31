import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './MapScreen';
import BusScreen from './BusScreen';

const Stack = createStackNavigator();

function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="地圖" component={MapScreen} />
      <Stack.Screen name="公車" component={BusScreen} />
    </Stack.Navigator>
  );
}

export default MapStack;
