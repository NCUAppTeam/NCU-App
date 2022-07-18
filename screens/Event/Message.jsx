import React from 'react';
import {
  Text, View, SafeAreaView,
} from 'react-native';
import styles from './style_folder/Styles_manage';

function message() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: 100, height: 100, margin: 50 }}>
        <Text>私訊頁面</Text>
      </View>
    </SafeAreaView>
  );
}
export default message;
