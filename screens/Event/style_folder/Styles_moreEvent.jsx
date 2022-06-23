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
  CardInMore: {
    height: 225,
    width: Dimensions.get('window').width * 0.4,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 4,
    marginTop: 14,
    backgroundColor: 'white',
    marginRight: Dimensions.get('window').width * 0.06,
  },
  nameheader: {
    flex: 9,
    alignItems: 'center',
    width: 'auto',
    borderRadius: 50,
    justifyContent: 'center',
  },
  name: {
    marginLeft: 45,
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#28527A',
  },
  pic: {
    // width: PixelRatio.getPixelSizeForLayoutSize(76),
    // height: PixelRatio.getPixelSizeForLayoutSize(76),
    backgroundColor: '#E0E0E0',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
