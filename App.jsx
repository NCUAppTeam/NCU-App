import React from 'react';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { BaseTheme } from './theme';
import { LinearGradient } from 'expo-linear-gradient';


import { NativeBaseProvider } from 'native-base';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};


export default function App() {
  return (
    <NativeBaseProvider theme={BaseTheme} config={config}>
      <AuthenticatedUserProvider>
          <RootNavigator />
      </AuthenticatedUserProvider>
    </NativeBaseProvider>
  );
}
