import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'react-native';
import { HStack, NativeBaseProvider } from 'native-base';
import { Feather, AntDesign } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import DailyProductScreen from './DailyProductScreen';
import PersonalScreen from './PersonalScreen';
import AddScreen from './AddScreen';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';
import CommentScreen from './CommentScreen';
import styles from './Styles';


const Stack = createStackNavigator();

function SaleStack({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    SalesController.getHomePageItem().then((res) => {
      setItems(res);
      setPicked({});
      setSearchbarText('');
      setRefreshing(false);
    });
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="拍賣" component={HomeScreen} options={{ headerShown: false}} />
      <Stack.Screen name="搜尋商品" component={SearchScreen} options={{ headerShown: false}} />
      <Stack.Screen name="日常用品" component={DailyProductScreen} 
        options={{
        headerTitle: props => <Text style={styles.headerText}>日常用品</Text>,
        headerLeft: () => (
          <Feather name="arrow-left" size={24} color="#28527A" onPress={() => navigation.navigate('搜尋商品', { onGoBack: onRefresh })} style={styles.stackBarLeftIcon} />
        ),
        headerRight: () => (
          <NativeBaseProvider>
            <HStack alignItems="center">
              <Feather name="message-circle" size={24} color="#28527A" style={styles.stackBarIcon} />
              <Feather name="user" size={24} color="#28527A" style={styles.stackBarIcon} onPress={() => navigation.navigate('個人管理頁面', { onGoBack: onRefresh })} />
            </HStack>
          </NativeBaseProvider>
        ),
        }} 
      />
      <Stack.Screen name="商品詳細資訊" component={DetailScreen} />
      <Stack.Screen name="個人管理頁面" component={PersonalScreen} options={{ headerShown: false}} />
      <Stack.Screen name="新增商品" component={AddScreen} 
        options={{
        headerTitle: props => <Text style={styles.headerText}>新增商品</Text>,
        headerLeft: () => (
          <Feather name="arrow-left" size={24} color="#28527A" onPress={() => navigation.navigate('個人管理頁面', { onGoBack: onRefresh })} style={styles.stackBarLeftIcon} />
        ),
        headerRight: () => (
          <Feather name="message-circle" size={24} color="#28527A" style={styles.stackBarIcon} />
        ),
        }} 
      />
      <Stack.Screen name="編輯商品" component={EditScreen} />
      <Stack.Screen name="商品評論" component={CommentScreen} />
    </Stack.Navigator>
  );
}

export default SaleStack;
