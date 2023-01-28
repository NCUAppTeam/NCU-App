import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import add from './addActivity';
import edit from './editActivity';
import personal from './personal_manage';
import manage from './manage';
import list from './activityList';
import more from './moreEvent';
import moreHang from './moreHang';
import message from './message';
import detailscreen from './showActivityDetails';
import send from './send';
import search from './search';

const Stack = createNativeStackNavigator();

function EventStack() {
  return (
    <Stack.Navigator
      initialRouteName="list"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="list" component={list} />
      <Stack.Screen name="more" component={more} />
      <Stack.Screen name="moreHang" component={moreHang} />
      <Stack.Screen name="add" component={add} />
      <Stack.Screen name="edit" component={edit} />
      <Stack.Screen name="personal" component={personal} />
      <Stack.Screen name="manage" component={manage} />
      <Stack.Screen name="details" component={detailscreen} />
      <Stack.Screen name="search" component={search} />
      <Stack.Screen name="message" component={message} />
      <Stack.Screen name="send" component={send} />
    </Stack.Navigator>
  );
}

export default EventStack;
