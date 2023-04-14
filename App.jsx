import React from 'react';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { BaseTheme } from './theme';


import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider theme={BaseTheme}>
      <AuthenticatedUserProvider>
          <RootNavigator />
      </AuthenticatedUserProvider>
    </NativeBaseProvider>
  );
}
