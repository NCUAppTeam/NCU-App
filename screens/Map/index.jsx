import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './MapScreen';
import Bus132 from './BusScreen/132-1';
import List132 from './BusScreen/132-2';
import Bus133 from './BusScreen/133-1';
import List133 from './BusScreen/133-2';
import Bus172 from './BusScreen/172-1';
import List172 from './BusScreen/172-2';
import Bus9025A from './BusScreen/9025A-1';
import List9025A from './BusScreen/9025A-2';
import First from './BusScreen/firstpage';
import Second from './BusScreen/second';
import Lake from './BusScreen/lake';
import Gym from './BusScreen/gym';
import Backdoor from './BusScreen/backdoor';
import Library from './BusScreen/library';
import Sg from './BusScreen/sg';
import Frontdoor from './BusScreen/frontdoor';
import Sl from './BusScreen/sl';
import Bus173 from './BusScreen/173-1';
import List173 from './BusScreen/173-2';

const Stack = createNativeStackNavigator();

function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="地圖" component={MapScreen} />
      <Stack.Screen name="依班次" component={First} />
      <Stack.Screen name="依站牌" component={Second} />
      <Stack.Screen name="Bus133" component={Bus133} />
      <Stack.Screen name="List133" component={List133} />
      <Stack.Screen name="Bus172" component={Bus172} />
      <Stack.Screen name="List172" component={List172} />
      <Stack.Screen name="Bus132" component={Bus132} />
      <Stack.Screen name="List132" component={List132} />
      <Stack.Screen name="Bus9025A" component={Bus9025A} />
      <Stack.Screen name="List9025A" component={List9025A} />
      <Stack.Screen name="中央大學後門" component={Backdoor} />
      <Stack.Screen name="中央大學依仁堂" component={Gym} />
      <Stack.Screen name="中大湖" component={Lake} />
      <Stack.Screen name="國鼎圖書館" component={Library} />
      <Stack.Screen name="中央大學警衛室" component={Sg} />
      <Stack.Screen name="中央大學正門" component={Frontdoor} />
      <Stack.Screen name="中央大學觀景台" component={Sl} />
      <Stack.Screen name="Bus173" component={Bus173} />
      <Stack.Screen name="List173" component={List173} />
    </Stack.Navigator>
  );
}

export default MapStack;
