import React from 'react';
import { SafeAreaView,Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from './settings';
import HomePage from './homePage';
import styles from './Styles';

const Stack = createNativeStackNavigator()

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="list"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="homepage" component={HomePage} />
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
}


export default HomeStack;
