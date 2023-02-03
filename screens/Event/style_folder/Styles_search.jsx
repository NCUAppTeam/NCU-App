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
    marginLeft: Dimensions.get('window').width * 0.04,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 172,
    height: 120,
    borderRadius: 10,
    flexDirection: 'column',
  },
  genreTitle: {
    color: '#0C4A6E',
    fontWeight: '700',
    fontSize: 18,
    width: 90,
    marginLeft: 10,
  },
  SearchBar: {
    backgroundColor: '#E5EBF1',
    borderRadius: 18,
    width: Dimensions.get('window').width * 0.77,
    marginLeft: Dimensions.get('window').width * 0.02,
    height: 36,
  },
  searchIcon: {
    marginLeft: Dimensions.get('window').width * 0.04,
    marginTop: 6,
  },
  searchtext: {
    fontSize: 18,
    marginTop: 4,
    marginLeft: Dimensions.get('window').width * 0.09,
  },
  cancelText: {
    marginLeft: Dimensions.get('window').width * 0.73,
    color: '#28527A',
    fontWeight: '400',
    fontSize: 17,
    marginTop: 6,
    textAlignVertical: 'center',
  },
  btnArea: {
    marginTop: 35,
  },
  icon: {
    marginTop: -20,
  },
  icon2: {
    marginTop: -25,
  },
  icon3: {
    marginTop: -30,
    marginLeft: -3,
  },
  keywordArea: {
    marginTop: 20,
  },
  keywordBox: {
    width: 364,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    marginVertical: 3,
    marginHorizontal: 10,
    height: 40,
  },
  keywordBoxText: {
    fontWeight: '400',
    fontSize: 17,
    color: '#00000066',
    marginLeft: 15,
    marginTop: 6,
  },
});
