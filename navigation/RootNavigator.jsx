import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthStack } from './AuthStack';
import { AppTabView } from './AppTabView';
import { AuthenticatedUserContext } from '../providers';
import { auth } from '../config';
import { View, Text } from 'react-native';

import { createNavigationContainerRef } from '@react-navigation/native';

// 使在 Navigator 以外（如 App.jsx）也能呼叫頁面導向
export const navigationRef = createNavigationContainerRef();
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.current.navigate(name, params);
  }
}

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// [測試中] 大概是從主頁導向至活動頁面
const linking = {
  prefixes: [
    'ncuapp://', 'exp://', '*://'
  ],
  config: {
      screens: {
          AppTabView: {
              screens: {
                  EventScreen: {
                      screens: {
                          Detailscreen: 'path/:id/'
                      }
                  }
              }
          }
    },
  },
};

export const RootNavigator = () => {

  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      {user ? <AppTabView /> : <AuthStack />}
    </NavigationContainer>
  );
};
