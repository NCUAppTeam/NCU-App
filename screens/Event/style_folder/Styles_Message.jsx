import { StyleSheet, Dimensions } from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#fafafa',
    // marginHorizontal: Dimensions.get('window').width * 0.07,
  },
  header: {
    paddingTop: 30,
    height: 95,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.2,
  },
  titleSend: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Dimensions.get('window').width * 0.25,
  },
  headerArrowBox: {
    marginLeft: Dimensions.get('window').width * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    backgroundColor: '#fafafa',
    height: 44,
    width: Dimensions.get('window').width,
    paddingHorizontal: Dimensions.get('window').width * 0.17,
    paddingTop: 10,
  },
  optionLeft: {
    fontSize: 18,
    marginRight: 120,
    fontWeight: '300',
  },
  optionRight: {
    fontSize: 18,
  },
  cardForMessage: {
    // width: Dimensions.get('window').width * 0.875,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'bebebe',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowRadius: 10,
    elevation: 4,

    // marginLeft: Dimensions.get('window').width * 0.065,
    marginBottom: 15,
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderBottomWidth: 2,
    borderBottomEndRadius: 10,
    borderEndColor: '#bfbebe',
  },
  messagePeople: {
    marginLeft: 5,
    paddingTop: 15,
  },
  sendAreaTrue: {
    marginBottom: useKeyboard.keyboardHeight,
    marginTop: 15,
  },
  sendAreaFalse: {
    marginBottom: 0.5,
    marginTop: 15,
  },
  typeFooter: {
    flexDirection: 'row',
    height: 50,
  },
  pickImage: {
    paddingTop: 10,
    paddingLeft: 18,
    paddingRight: 12,
  },
  typeArea: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#E5EBF1',
    paddingHorizontal: 12,
    height: 35,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'rgba(191, 191, 191, 0.7)',
  },
  typeText: {
    height: 20,
    fontSize: 14,
    marginTop: 6,
  },
  sendIcon: {
    paddingTop: 10,
    paddingLeft: 12,
    paddingRight: 18,
  },
});
