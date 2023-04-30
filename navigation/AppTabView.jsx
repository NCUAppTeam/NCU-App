import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NativeBaseProvider,
  Text,
  Icon,
  HStack,
  Center,
  Pressable,
} from 'native-base';
import {
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';

import CalendarScreen from '../screens/Calendar';
import MapScreen from '../screens/Map';
import EventScreen from '../screens/Event';
import HomeScreen from '../screens/Home';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  const [selected, setSelected] = React.useState(1);
  return (
    <HStack bg="#E5EBF1" alignItems="center" safeAreaBottom shadow={6}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icon_name = {
          行事曆: 'calendar-month',
          活動: 'game-controller-outline',
          地圖: 'map-outline',
          // 拍賣:'cart-outline' // 拍賣暫存
        };

        return (

          <Pressable py="2" flex={1} onPress={onPress} bg={isFocused ? '#476685' : '#E5EBF1'}>
            <Center>
              <Icon
                as={label === '活動' ? Ionicons : MaterialCommunityIcons}
                name={icon_name[label]}
                color={isFocused ? '#E5EBF1' : '#476685'}
                size="sm"
              />
              <Text color={isFocused ? '#E5EBF1' : '#476685'} fontSize="12">
                {label}
              </Text>
            </Center>
          </Pressable>

        );
      })}
    </HStack>
  );
}


export const AppTabView = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => (
        <CustomTabBar {...props} />
      )}
    >
      <Tab.Screen name="行事曆" component={CalendarScreen} />
      <Tab.Screen name="活動" component={EventScreen} />
      <Tab.Screen name="地圖" component={MapScreen} />
    </Tab.Navigator>
  );
};