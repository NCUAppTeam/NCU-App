import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase';
import ActiveController from '../../controller/Active';
import add from './addActivity';
import personal from './personal_manage';
import list from './activityList';
import more from './moreEvent';
import details from './showActivityDetails';
import search from './search';

const Stack = createNativeStackNavigator();

function EventStack() {
  return (
    <Stack.Navigator initialRouteName="list">
      <Stack.Screen name="list" component={list} />
      <Stack.Screen name="more" component={more} />
      <Stack.Screen name="add" component={add} />
      <Stack.Screen name="personal" component={personal} />
      <Stack.Screen name="details" component={details} />
      <Stack.Screen name="search" component={search} />
    </Stack.Navigator>
  );
}

export default EventStack;
