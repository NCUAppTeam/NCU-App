import React, { useState } from 'react';
import { View } from 'react-native';
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
  apiKey: 'AIzaSyBgSczWWYWCnz97owGdgCTllKXg5C_Vzew',
  authDomain: 'ncuapp-sale.firebaseapp.com',
  projectId: 'ncuapp-sale',
  storageBucket: 'ncuapp-sale.appspot.com',
  messagingSenderId: '391949890842',
  appId: '1:391949890842:web:6a6d74d375d6911f0a68a3',
  measurementId: 'G-CJLJGYZLHC',
};

const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            tabBarStyle: { height: '8%' },
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
              tabBarLabel: '活動',
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
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default function App() {
  if (!firebase.apps.length) {
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
  );
}
