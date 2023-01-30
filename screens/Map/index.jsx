import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import Bus173 from './BusScreen/173-1';
import List173 from './BusScreen/173-2';
import Bus216 from './BusScreen/216-1';
import List216 from './BusScreen/216-2';
import UST from './BusScreen/UST';

const Stack = createStackNavigator();

function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="地圖" component={MapScreen} />
      <Stack.Screen name="公車動態" component={First} />
      <Stack.Screen name="Bus133" component={Bus133} />
      <Stack.Screen name="List133" component={List133} />
      <Stack.Screen name="Bus172" component={Bus172} />
      <Stack.Screen name="List172" component={List172} />
      <Stack.Screen name="Bus132" component={Bus132} />
      <Stack.Screen name="List132" component={List132} />
      <Stack.Screen name="Bus9025A" component={Bus9025A} />
      <Stack.Screen name="List9025A" component={List9025A} />
      <Stack.Screen name="Bus173" component={Bus173}/>
      <Stack.Screen name="List173" component={List173}/>
      <Stack.Screen name="Bus216" component={Bus216}/>
      <Stack.Screen name="List216" component={List216}/>
      <Stack.Screen name="UST" component={UST}/>
    </Stack.Navigator>
  );
}

export default MapStack;
