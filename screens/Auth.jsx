import React from 'react';
import {
  Alert, SafeAreaView, StyleSheet,
} from 'react-native';
import {
  Avatar, Button, Headline,
} from 'react-native-paper';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import logo from '../assets/icon.png';
import Controller from '../controller/Profile';

const PRODUCTION = false;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 8,
  },
});

function AuthScreen() {
  const onAnonymousLogin = () => {
    firebase.auth().signInAnonymously();
  };

  const onFacebookLogin = async () => {
    const permissions = ['public_profile', 'email'];

    const appId = Constants.manifest.facebookAppId;
    await Facebook.initializeAsync({ appId });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions });
    if (type === 'success') {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const profileData = await firebase.auth().signInWithCredential(credential);
      const { additionalUserInfo: { profile }, user: { uid } } = profileData;
      Controller.updateProfile(uid, profile);
    } else {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Avatar.Image source={logo} />
      <Headline>歡迎使用 NCU-App</Headline>
      {PRODUCTION ? (
        <Button
          mode="contained"
          icon="facebook"
          color="#4267B2"
          style={styles.input}
          onPress={onFacebookLogin}
        >
          使用Facebook登入
        </Button>
      ) : (
        <Button
          mode="contained"
          style={styles.input}
          onPress={onAnonymousLogin}
        >
          登入
        </Button>
      )}
    </SafeAreaView>
  );
}

export default AuthScreen;
