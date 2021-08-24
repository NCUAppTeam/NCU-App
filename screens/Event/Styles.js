import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  submitButton: {
    margin: 16,
  },
  title: {
    fontSize: 22,
    color: '#189AE0',
  },
  inputField: {
    margin: 8,
    marginBottom: 0,
  },
  fab: {
    position: 'absolute',
    margin: 15,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  col: {
    width: '50%',
    padding: 4,
  },
});
