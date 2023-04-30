import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// add firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDJKoHZXT8cwLqjI4Fi6feQLGVh1OlP1sY",
  authDomain: "ncu-app-production.firebaseapp.com",
  projectId: "ncu-app-production",
  storageBucket: "ncu-app-production.appspot.com",
  messagingSenderId: "532904519089",
  appId: "1:532904519089:web:0d3ed0b4d76a020e9e4990"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
