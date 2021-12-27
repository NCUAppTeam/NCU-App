import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import PersonalScreen from './PersonalScreen';
import AddScreen from './AddScreen';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';
import CommentScreen from './CommentScreen';

const Stack = createStackNavigator();

function SaleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="拍賣" component={HomeScreen} />
      <Stack.Screen name="商品詳細資訊" component={DetailScreen} />
      <Stack.Screen name="個人管理頁面" component={PersonalScreen} />
      <Stack.Screen name="新增商品" component={AddScreen} />
      <Stack.Screen name="編輯商品" component={EditScreen} />
      <Stack.Screen name="商品評論" component={CommentScreen} />
    </Stack.Navigator>
  );
}

export default SaleStack;
