import React from 'react';
import { Text, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Add from './addActivity';
import Edit from './editActivity';
import Personal from './personal_manage';
import Manage from './manage';
import List from './activityList';
import More from './moreEvent';
import MoreHang from './moreHang';
import Message from './Message';
import Genre from './GenreEvent';
import Detailscreen from './showActivityDetails';
import Send from './Send';
import Search from './search';

const Stack = createNativeStackNavigator();

function EventStack() {
  if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }
  return (
    <Stack.Navigator
      initialRouteName="list"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="list" component={List} />
      <Stack.Screen name="more" component={More} />
      <Stack.Screen name="moreHang" component={MoreHang} />
      <Stack.Screen name="add" component={Add} />
      <Stack.Screen name="edit" component={Edit} />
      <Stack.Screen name="personal" component={Personal} />
      <Stack.Screen name="manage" component={Manage} />
      <Stack.Screen name="details" component={Detailscreen} />
      <Stack.Screen name="search" component={Search} />
      <Stack.Screen name="message" component={Message} />
      <Stack.Screen name="send" component={Send} />
      <Stack.Screen name="genre" component={Genre} />
    </Stack.Navigator>
  );
}

export default EventStack;
