import { StyleSheet, Dimensions } from 'react-native';

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
    marginHorizontal: Dimensions.get('window').width * 0.2,
  },
  headerArrowBox: {
    marginLeft: Dimensions.get('window').width * 0.06,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    //width: Dimensions.get('window').width * 0.875,
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
    
    
    //marginLeft: Dimensions.get('window').width * 0.065,
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
});
