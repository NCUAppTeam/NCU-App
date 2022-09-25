import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, HStack, NativeBaseProvider } from 'native-base';
import { Feather, FontAwesome } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import StudyProductScreen from './StudyProductScreen';
import DailyProductScreen from './DailyProductScreen';
import HomeProductScreen from './HomeProductScreen';
import FoodProductScreen from './FoodProductScreen';
import ClothsProductScreen from './ClothsProductScreen';
import CosmeticProductScreen from './CosmeticProductScreen ';
import TicketProductScreen from './TicketProductScreen';
import OtherProductScreen from './OtherProductScreen';
import PersonalScreen from './PersonalScreen';
import AddScreen from './AddScreen';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';
import CommentScreen from './CommentScreen';
import styles from './Styles';

const Stack = createNativeStackNavigator();

function SaleStack({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    SalesController.getHomePageItem().then((res) => {
      setSearchbarText('');
      setRefreshing(false);
    });
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="拍賣"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="搜尋商品"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="課業文具"
        component={StudyProductScreen}
        options={{
          headerTitle: () => (
            <NativeBaseProvider>
              <Box>
                <Text style={styles.headerText}>課業文具</Text>
              </Box>
            </NativeBaseProvider>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('搜尋商品', { onGoBack: onRefresh })}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#28527A"
                style={styles.stackBarLeftIcon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <NativeBaseProvider>
              <HStack left="250" alignItems="center" space={2}>
                <TouchableOpacity>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('拍賣個人管理頁面', {
                    onGoBack: onRefresh,
                  })}
                >
                  <Feather
                    name="user"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
              </HStack>
            </NativeBaseProvider>
          ),
        }}
      />
      <Stack.Screen
        name="日常用品"
        component={DailyProductScreen}
        options={{
          headerTitle: (props) => (
            <NativeBaseProvider>
              <Box>
                <Text style={styles.headerText}>日常用品</Text>
              </Box>
            </NativeBaseProvider>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('搜尋商品', { onGoBack: onRefresh })}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#28527A"
                style={styles.stackBarLeftIcon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <NativeBaseProvider>
              <HStack left="250" alignItems="center" w="30%" space={2}>
                <TouchableOpacity>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('拍賣個人管理頁面', {
                    onGoBack: onRefresh,
                  })}
                >
                  <Feather
                    name="user"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
              </HStack>
            </NativeBaseProvider>
          ),
        }}
      />
      <Stack.Screen
        name="居家用品"
        component={HomeProductScreen}
        options={{
          headerTitle: (props) => (
            <NativeBaseProvider>
              <Box>
                <Text style={styles.headerText}>居家用品</Text>
              </Box>
            </NativeBaseProvider>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('搜尋商品', { onGoBack: onRefresh })}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#28527A"
                style={styles.stackBarLeftIcon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <NativeBaseProvider>
              <HStack left="250" alignItems="center" w="30%" space={2}>
                <TouchableOpacity>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('拍賣個人管理頁面', {
                    onGoBack: onRefresh,
                  })}
                >
                  <Feather
                    name="user"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
              </HStack>
            </NativeBaseProvider>
          ),
        }}
      />
      <Stack.Screen
        name="美食料理"
        component={FoodProductScreen}
        options={{
          headerTitle: (props) => (
            <NativeBaseProvider>
              <Box>
                <Text style={styles.headerText}>美食料理</Text>
              </Box>
            </NativeBaseProvider>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('搜尋商品', { onGoBack: onRefresh })}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#28527A"
                style={styles.stackBarLeftIcon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <NativeBaseProvider>
              <HStack left="250" alignItems="center" w="30%" space={2}>
                <TouchableOpacity>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('拍賣個人管理頁面', {
                    onGoBack: onRefresh,
                  })}
                >
                  <Feather
                    name="user"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
              </HStack>
            </NativeBaseProvider>
          ),
        }}
      />
      <Stack.Screen
        name="衣服配件"
        component={ClothsProductScreen}
        options={{
          headerTitle: (props) => (
            <NativeBaseProvider>
              <Box>
                <Text style={styles.headerText}>衣服配件</Text>
              </Box>
            </NativeBaseProvider>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('搜尋商品', { onGoBack: onRefresh })}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#28527A"
                style={styles.stackBarLeftIcon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <NativeBaseProvider>
              <HStack left="250" alignItems="center" w="30%" space={2}>
                <TouchableOpacity>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('拍賣個人管理頁面', {
                    onGoBack: onRefresh,
                  })}
                >
                  <Feather
                    name="user"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
              </HStack>
            </NativeBaseProvider>
          ),
        }}
      />
      <Stack.Screen
        name="美妝保護"
        component={CosmeticProductScreen}
        options={{
          headerTitle: (props) => (
            <NativeBaseProvider>
              <Box>
                <Text style={styles.headerText}>美妝保護</Text>
              </Box>
            </NativeBaseProvider>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('搜尋商品', { onGoBack: onRefresh })}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#28527A"
                style={styles.stackBarLeftIcon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <NativeBaseProvider>
              <HStack left="250" alignItems="center" w="30%" space={2}>
                <TouchableOpacity>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('拍賣個人管理頁面', {
                    onGoBack: onRefresh,
                  })}
                >
                  <Feather
                    name="user"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
              </HStack>
            </NativeBaseProvider>
          ),
        }}
      />
      <Stack.Screen
        name="票券/周邊"
        component={TicketProductScreen}
        options={{
          headerTitle: (props) => (
            <NativeBaseProvider>
              <Box>
                <Text style={styles.headerText}>票券/周邊</Text>
              </Box>
            </NativeBaseProvider>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('搜尋商品', { onGoBack: onRefresh })}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#28527A"
                style={styles.stackBarLeftIcon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <NativeBaseProvider>
              <HStack left="250" alignItems="center" w="30%" space={2}>
                <TouchableOpacity>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('拍賣個人管理頁面', {
                    onGoBack: onRefresh,
                  })}
                >
                  <Feather
                    name="user"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
              </HStack>
            </NativeBaseProvider>
          ),
        }}
      />
      <Stack.Screen
        name="其他"
        component={OtherProductScreen}
        options={{
          headerTitle: (props) => (
            <NativeBaseProvider>
              <Box>
                <Text style={styles.headerText}>其他</Text>
              </Box>
            </NativeBaseProvider>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('搜尋商品', { onGoBack: onRefresh })}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#28527A"
                style={styles.stackBarLeftIcon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <NativeBaseProvider>
              <HStack left="250" alignItems="center" w="30%" space={2}>
                <TouchableOpacity>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('拍賣個人管理頁面', {
                    onGoBack: onRefresh,
                  })}
                >
                  <Feather
                    name="user"
                    size={24}
                    color="#28527A"
                    style={styles.stackBarIcon}
                  />
                </TouchableOpacity>
              </HStack>
            </NativeBaseProvider>
          ),
        }}
      />
      <Stack.Screen name="商品詳細資訊" component={DetailScreen} />
      <Stack.Screen
        name="拍賣個人管理頁面"
        component={PersonalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="新增商品"
        component={AddScreen}
        options={{
          headerTitle: (props) => (
            <NativeBaseProvider>
              <Box>
                <Text style={styles.headerText}>新增商品</Text>
              </Box>
            </NativeBaseProvider>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('拍賣個人管理頁面', { onGoBack: onRefresh })}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#28527A"
                style={styles.stackBarLeftIcon}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Feather
                name="message-circle"
                size={24}
                color="#28527A"
                style={styles.stackBarIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="編輯商品" component={EditScreen} />
      <Stack.Screen name="商品評論" component={CommentScreen} />
    </Stack.Navigator>
  );
}

export default SaleStack;
