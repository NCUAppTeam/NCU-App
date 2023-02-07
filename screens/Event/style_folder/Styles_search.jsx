import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 50,
    marginHorizontal: 15,
  },
  genrebutton: {
    marginRight: Dimensions.get('window').width * 0.04,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.2,
    borderRadius: 10,
  },
  genreTitle: {
    color: '#0C4A6E',
    fontWeight: '700',
    fontSize: 18,
    width: 90,
    marginLeft: 10,
  },
  SearchArea: {
    flex: 9,
    marginLeft: Dimensions.get('window').width * 0.04,
    height: 36,
  },
  SearchBar: {
    backgroundColor: '#E5EBF1',
    borderRadius: 18,
    width: Dimensions.get('window').width * 0.77,
    height: 36,
  },
  searchIcon: {
    marginLeft: 20,
    marginTop: 6,
  },
  searchtext: {
    fontSize: 18,
    marginTop: 4,
    marginLeft: 10,
    width: '100%',
  },
  cancelBox: {
    flex: 1,
  },
  cancelText: {
    color: '#28527A',
    fontWeight: '400',
    fontSize: 17,
    marginTop: 6,
  },
  btnArea: {
    marginTop: 35,
    justifyContent: 'flex-start',
    marginHorizontal: Dimensions.get('window').width * 0.04,
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
    width: '100%',
  },
  keywordBox: {
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
