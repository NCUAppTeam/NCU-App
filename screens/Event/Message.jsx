import React from 'react';
import {
  Text, View, SafeAreaView,
  ScrollView, TouchableOpacity, Image,
} from 'react-native';
import {
  Ionicons, FontAwesome5, AntDesign, Feather,
} from '@expo/vector-icons';
import styles from './style_folder/Styles_manage';

function message({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: 100, height: 100, margin: 50 }}>
        <Text>私訊頁面</Text>
      </View>
    </SafeAreaView>
  );
}
export default message;
