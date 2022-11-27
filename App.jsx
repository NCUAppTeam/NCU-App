import React, { useState } from 'react';
import { View } from 'react-native';

import { initializeApp, getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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

import CalendarScreen from './screens/Calendar';
import MapScreen from './screens/Map';
import EventScreen from './screens/Event';

const firebaseConfig = {
  apiKey: 'AIzaSyA8GH6yj1i4gJM0H_ZTsurYG3Dqn4-nIS8',
  authDomain: 'ncu-app-test.firebaseapp.com',
  projectId: 'ncu-app-test',
  storageBucket: 'ncu-app-test.appspot.com',
  messagingSenderId: '739839700130',
  appId: '1:739839700130:web:37591d0118a440488cfbfb',
};
const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
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
        };

        return (

          <Pressable py="2" flex={1} onPress={onPress} bg={isFocused ? '#28527A' : '#E5EBF1'}>
            <Center>
              <Icon
                as={label === '活動' ? Ionicons : MaterialCommunityIcons}
                name={icon_name[label]}
                color={isFocused ? '#E5EBF1' : '#28527A'}
                size="sm"
              />
              <Text color={isFocused ? '#E5EBF1' : '#28527A'} fontSize="12">
                {label}
              </Text>
            </Center>
          </Pressable>

        );
      })}
    </HStack>
  );
}

export default function App() {
  initializeApp(firebaseConfig);

  const [authState, setAuthState] = useState();
  const auth = getAuth(getApp());
  onAuthStateChanged(auth, (user) => {
    setAuthState(user);
  });

  if (authState === undefined) {
    return <View />;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
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
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
