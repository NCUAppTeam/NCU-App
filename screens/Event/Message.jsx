import React from 'react';
import {
  Text, View, SafeAreaView,
  ScrollView, TouchableOpacity, Image,
} from 'react-native';
import {
  Ionicons, FontAwesome5, AntDesign, Feather,
} from '@expo/vector-icons';

function message({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignContent: 'center' }}>
      <View style={{ width: 100, height: 100, margin: 50 }}>
        <Text>私訊頁面</Text>
      </View>
    </SafeAreaView>
  );
}
export default message;