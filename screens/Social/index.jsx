import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import PersonalScreen from './PersonalScreen';
import AddScreen from './AddScreen';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';

const Stack = createStackNavigator();

function SocialStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="揪人" component={HomeScreen} />
      <Stack.Screen name="個人管理頁面" component={PersonalScreen} />
      <Stack.Screen name="新增活動" component={AddScreen} />
      <Stack.Screen name="活動詳細資訊" component={DetailScreen} />
      <Stack.Screen name="編輯活動" component={EditScreen} />
    </Stack.Navigator>
  );
}

export default SocialStack;
