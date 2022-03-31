import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgendaScreen from './AgendaScreen';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';

const Stack = createNativeStackNavigator();

function CalendarStack() {
  return (
    <Stack.Navigator initialRouteName="行事曆">
      <Stack.Screen name="行事曆" component={AgendaScreen} />
      <Stack.Screen name="行程詳細資料" component={DetailScreen} />
      <Stack.Screen name="編輯行程" component={EditScreen} />
    </Stack.Navigator>
  );
}

export default CalendarStack;
