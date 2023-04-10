import React from 'react';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';


import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthenticatedUserProvider>
          <RootNavigator />
      </AuthenticatedUserProvider>
    </NativeBaseProvider>
  );
}
