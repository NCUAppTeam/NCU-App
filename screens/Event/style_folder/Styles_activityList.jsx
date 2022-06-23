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
  Card2: {
    height: 270,
    width: 190,
    borderWidth: 1,
    borderColor: '#bfbebe',
    borderRadius: 10,
    shadowColor: '#bfbebe',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 2,
    // backgroundColor: '#bfbebe',
  },
  CardTitle: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: '#28527A',
    fontSize: 14,
  },
  CardDetails: {
    marginLeft: 7,
    flexDirection: 'row',
  },
  CardText: {
    fontSize: 12,
    color: 'rgba(40, 82, 122, 0.65)',
    marginTop: -3,
  },
  more: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    textDecorationLine: 'underline',
  },
  pic: {
    // width: PixelRatio.getPixelSizeForLayoutSize(76),
    // height: PixelRatio.getPixelSizeForLayoutSize(76),
    backgroundColor: '#E0E0E0',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
