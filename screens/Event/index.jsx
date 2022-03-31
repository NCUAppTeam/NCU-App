import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './ListScreen';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';
import MyEventScreen from './MyEventScreen';

const Stack = createNativeStackNavigator();

function EventStack() {
  return (
    <Stack.Navigator initialRouteName="活動列表">
      <Stack.Screen name="活動列表" component={ListScreen} />
      <Stack.Screen name="活動詳細資料" component={DetailScreen} />
      <Stack.Screen name="編輯活動" component={EditScreen} />
      <Stack.Screen name="我的活動" component={MyEventScreen} />
    </Stack.Navigator>
  );
}

export default EventStack;
