// NavigationContainer.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateEventScreen from './screens/CreateEventScreen';
import EventMainScreen from './screens/EventMainScreen'; 

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="CreateEventScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EventMainScreen" component={EventMainScreen} />
            <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
