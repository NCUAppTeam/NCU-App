import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 50,
    marginHorizontal: 15,
    // marginHorizontal: Dimensions.get('window').width * 0.07,
  },
});
