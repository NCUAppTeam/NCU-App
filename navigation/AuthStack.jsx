import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen } from '../screens/Auth';

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={AuthScreen} />
    </Stack.Navigator>
  );
}
