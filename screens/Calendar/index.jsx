import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AgendaScreen from './AgendaScreen';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';

const Stack = createStackNavigator();

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
