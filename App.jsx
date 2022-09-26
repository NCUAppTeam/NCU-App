import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';

import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
  Container,
  TouchableOpacity,
} from 'native-base';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import AwesomeIcon from '@expo/vector-icons/FontAwesome5';

import AuthScreen from './screens/Auth';
import DashboardScreen from './screens/Dashboard';
import CalendarScreen from './screens/Calendar';
import MapScreen from './screens/Map';
import SaleScreen from './screens/Sale';
import EventScreen from './screens/Event';




const firebaseConfig = {
  apiKey: 'AIzaSyA8GH6yj1i4gJM0H_ZTsurYG3Dqn4-nIS8',
  authDomain: 'ncu-app-test.firebaseapp.com',
  projectId: 'ncu-app-test',
  storageBucket: 'ncu-app-test.appspot.com',
  messagingSenderId: '739839700130',
  appId: '1:739839700130:web:37591d0118a440488cfbfb',
};
const Tab = createBottomTabNavigator();
function MainApp() {
  const [selected, setSelected] = React.useState(1);

  const renderSelectedTab = () => {
    switch (selected) {
      case 0:
        return <DashboardScreen />;
        break;
      case 1:
        return <CalendarScreen />;
        break;
      case 2:
        return <EventScreen />;
        break;
      case 3:
        return <MapScreen />;
        break;
      case 4:
        return <SaleScreen />;
        break;
      default:
    }
  };


  // activeTintColor: '#E5EBF1',
  //           inactiveTintColor: '#28527A',
  //           activeBackgroundColor: '#28527A',
  //           inactiveBackgroundColor: '#E5EBF1',
  return (
    <NativeBaseProvider>

      <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
          <Center flex={1}>{renderSelectedTab()}</Center>
        <HStack bg="#E5EBF1" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable py="2" flex={1} onPress={() => setSelected(0)} bg={selected === 0 ? '#28527A' : '#E5EBF1'}>
            <Center>
              <Icon
                as={MaterialCommunityIcons}
                name="home-outline"
                color={selected === 0 ? '#E5EBF1' : '#28527A'}
                size="sm"
              />
              <Text color={selected === 0 ? '#E5EBF1' : '#28527A'} fontSize="12">
                首頁
              </Text>
            </Center>
          </Pressable>
          
          <Pressable py="2" flex={1} onPress={() => setSelected(1)} bg={selected === 1 ? '#28527A' : '#E5EBF1'}>
            <Center>
              <Icon
                as={MaterialCommunityIcons}
                name="calendar-month"
                color={selected === 1 ? '#E5EBF1' : '#28527A'}
                
                size="sm"
              />
              <Text color={selected === 1 ? '#E5EBF1' : '#28527A'} fontSize="12">
                行事曆
              </Text>
            </Center>
          </Pressable>
          <Pressable py="2" flex={1} onPress={() => setSelected(2)} bg={selected === 2 ? '#28527A' : '#E5EBF1'}>
            <Center>
              <Icon
                as={Ionicons}
                name="game-controller-outline"
                color={selected === 2 ? '#E5EBF1' : '#28527A'}
                size="sm"
              />
              <Text color={selected === 2 ? '#E5EBF1' : '#28527A'} fontSize="12">
                活動
              </Text>
            </Center>
          </Pressable>
          <Pressable py="2" flex={1} onPress={() => setSelected(3)} bg={selected === 3 ? '#28527A' : '#E5EBF1'}>
            <Center>
              <Icon
                as={MaterialCommunityIcons}
                name="map-outline"
                color={selected === 3 ? '#E5EBF1' : '#28527A'}
                size="sm"
              />
              <Text color={selected === 3 ? '#E5EBF1' : '#28527A'} fontSize="12">
                地圖
              </Text>
            </Center>
          </Pressable>
          <Pressable py="2" flex={1} onPress={() => setSelected(4)} bg={selected === 4 ? '#28527A' : '#E5EBF1'}>
            <Center>
              <Icon
                as={MaterialCommunityIcons}
                name="cart-outline"
                color={selected === 4 ? '#E5EBF1' : '#28527A'}
                size="sm"
              />
              <Text color={selected === 4 ? '#E5EBF1' : '#28527A'} fontSize="12">
                拍賣
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [selected, setSelected] = React.useState(1);
  return (
    <HStack bg="#E5EBF1" alignItems="center" safeAreaBottom shadow={6}>
    {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icon_name = {
            '首頁': 'home-outline',
            '行事曆':'calendar-month',
            '活動':'game-controller-outline',
            '地圖':'map-outline',
            '拍賣':'cart-outline'
        };

        return (
          
          <Pressable py="2" flex={1} onPress={onPress} bg={isFocused? '#28527A' : '#E5EBF1'}>
            <Center>
              <Icon
                as={label === '活動' ? Ionicons : MaterialCommunityIcons }
                name={icon_name[label]}
                color={isFocused ? '#E5EBF1' : '#28527A'}
                size="sm"
              />
              <Text color={isFocused ? '#E5EBF1' : '#28527A'} fontSize="12">
                {label}
              </Text>
            </Center>
          </Pressable>
        
        );
      })}
      </HStack>
  )
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
    return <View />;
  }

  return (
    /* { auth ? <MainApp /> : <AuthScreen />} */
    <NativeBaseProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => (
          <CustomTabBar {...props} />
        )}
      >
        <Tab.Screen name="首頁" component={DashboardScreen}/>
        <Tab.Screen name="行事曆" component={CalendarScreen} />
        <Tab.Screen name="活動" component={EventScreen} />
        <Tab.Screen name="地圖" component={MapScreen} />
        <Tab.Screen name="拍賣" component={SaleScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}
