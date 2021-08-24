import React from 'react';
import {
  SafeAreaView, View, ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import * as firebase from 'firebase';
import Header from './components/Header';
import styles from './Styles';

function SettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header hideSetting />
        <View style={styles.container}>
          <Button icon="sign-out-alt" mode="contained" onPress={() => firebase.auth().signOut()}>
            Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingScreen;
