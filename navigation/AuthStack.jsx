import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen } from '../screens/Auth/Login';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Login' component={AuthScreen} />
      {/* <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  );
};
