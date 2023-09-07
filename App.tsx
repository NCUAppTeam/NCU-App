import { Box, Button, NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Navigation from './Event/Navigation'; 
import { styles } from './Event/stylesheet';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.safeArea}>
        <Navigation />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
