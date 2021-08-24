import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  inputField: {
    margin: 8,
    marginBottom: 0,
  },
  submitButton: {
    margin: 16,
  },
});
