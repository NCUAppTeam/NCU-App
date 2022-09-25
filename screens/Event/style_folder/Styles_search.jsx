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
  choose: {
    flex: 1,
    marginVertical: 10,
  },
  genrebutton: {
    marginHorizontal: Dimensions.get('window').width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    backgroundColor: '#bfbebe',
    borderRadius: 75,
  },
  searchBtn: {
    width: 100,
    height: 70,
  },
  SearchBar: {
    flex: 9,
    paddingTop: 5,
    paddingLeft: 4,
    paddingRight: 0,
    marginBottom: 10,
    justifyContent: 'center',
  },
});
