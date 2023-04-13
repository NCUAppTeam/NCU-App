import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
    </NativeBaseProvider>
  );
}
