import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Icon, NativeBaseProvider } from 'native-base';
import AwesomeIcon from '@expo/vector-icons/FontAwesome5';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import AuthScreen from './screens/Auth';
import DashboardScreen from './screens/Dashboard';
import CalendarScreen from './screens/Calendar';
import MapScreen from './screens/Map';
import SaleScreen from './screens/Sale';
import EventScreen from './screens/Event';

const firebaseConfig = {
  apiKey: 'AIzaSyAE1BMN-NymGGpNppqzqeOkQTfVZyrBXzo',
  authDomain: 'test-e75af.firebaseapp.com',
  projectId: 'test-e75af',
  storageBucket: 'test-e75af.appspot.com',
  messagingSenderId: '521591460213',
  appId: '1:521591460213:web:1e510d65b7c13ebe76833c',
  measurementId: 'G-T1RS72GEX1',
};
const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            tabBarStyle: { height: Platform.OS === 'ios' ? '10%' : '8%' },
            tabBarLabelStyle: {
              marginBottom: 5,
              fontWeight: 'bold',
            },
          }}
          tabBarOptions={{
            activeTintColor: '#E5EBF1',
            inactiveTintColor: '#28527A',
            activeBackgroundColor: '#28527A',
            inactiveBackgroundColor: '#E5EBF1',
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              headerShown: false,
              tabBarLabel: '首頁',
              tabBarIcon: ({ focused }) => (
                <Icon
                  as={MaterialCommunityIcons}
                  name="home-outline"
                  color={focused ? '#E5EBF1' : '#28527A'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Sales"
            component={SaleScreen}
            options={{
              headerShown: false,
              tabBarLabel: '拍賣',
              tabBarIcon: ({ focused }) => (
                <Icon
                  as={MaterialCommunityIcons}
                  name="cart-outline"
                  color={focused ? '#E5EBF1' : '#28527A'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              headerShown: false,
              tabBarLabel: '行事曆',
              tabBarIcon: ({ focused }) => (
                <Icon
                  as={MaterialCommunityIcons}
                  name="calendar-month"
                  color={focused ? '#E5EBF1' : '#28527A'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Event"
            component={EventScreen}
            options={{
              headerShown: false,
              tabBarLabel: '揪人',
              tabBarIcon: ({ focused }) => (
                <Icon
                  as={Ionicons}
                  name="game-controller-outline"
                  color={focused ? '#E5EBF1' : '#28527A'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerShown: false,
              tabBarLabel: '地圖',
              tabBarIcon: ({ focused }) => (
                <Icon
                  as={MaterialCommunityIcons}
                  name="map-outline"
                  color={focused ? '#E5EBF1' : '#28527A'}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default function App() {
  /*if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const [auth, setAuth] = useState();
  firebase.auth().onAuthStateChanged((user) => {
    setAuth(user);
  });

  if (auth === undefined) {
    return (<View />);
  }

  return (
    <PaperProvider
      settings={{
        icon: (props) => <AwesomeIcon {...props} />,
      }}
    >
      { auth ? <MainApp /> : <AuthScreen />}
    </PaperProvider>
  );*/
  return (
    <PaperProvider
      settings={{
        icon: (props) => <AwesomeIcon {...props} />,
      }}
    >
      <MainApp />
    </PaperProvider>
  );
}
