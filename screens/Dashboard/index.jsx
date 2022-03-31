import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoardScreen from './BoardScreen';
import SettingScreen from './SettingScreen';

const Stack = createNativeStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator initialRouteName="看板">
      <Stack.Screen name="看板" component={BoardScreen} />
      <Stack.Screen name="設定頁面" component={SettingScreen} />
    </Stack.Navigator>
  );
}

export default DashboardStack;
