import React, { useState } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import AwesomeIcon from '@expo/vector-icons/FontAwesome5';
import AuthScreen from './screens/Auth';
import DashboardScreen from './screens/Dashboard';
import CalendarScreen from './screens/Calendar';
import MapScreen from './screens/Map';
import SocialScreen from './screens/Social';
import SaleScreen from './screens/Sale';
import EventScreen from './screens/Event';
import firebaseConfig from './firebaseConfig';

const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: '看板',
            tabBarIcon: ({ color }) => <AwesomeIcon name="home" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: '行事曆',
            tabBarIcon: ({ color }) => <AwesomeIcon name="calendar" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Event"
          component={EventScreen}
          options={{
            tabBarLabel: '活動',
            tabBarIcon: ({ color }) => <AwesomeIcon name="fire-alt" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarLabel: '地圖',
            tabBarIcon: ({ color }) => <AwesomeIcon name="map-marker-alt" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Sales"
          component={SaleScreen}
          options={{
            tabBarLabel: '拍賣',
            tabBarIcon: ({ color }) => <AwesomeIcon name="shopping-bag" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Social"
          component={SocialScreen}
          options={{
            tabBarLabel: '揪人',
            tabBarIcon: ({ color }) => <AwesomeIcon name="comment" color={color} size={24} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
