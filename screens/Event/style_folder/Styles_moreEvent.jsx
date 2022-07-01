import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    paddingTop: 50,
    backgroundColor: 'white',
    // borderWidth: 1,
  },
  headerContainer: {
    marginHorizontal: Dimensions.get('window').width * 0.07,
    flexDirection: 'row',
  },
  headerArrowBox: {
    justifyContent: 'center', alignItems: 'flex-start',
  },
  nameheader: {
    alignItems: 'center',
    width: 'auto',
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    marginLeft: 45,
    fontSize: 24,
    color: '#28527A',
  },
  headerCommentView: {
    justifyContent: 'center', alignItems: 'flex-end',
  },
  headerPersonalView: {
    justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 7,
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
    marginVertical: 7,
    backgroundColor: 'white',
    marginHorizontal: Dimensions.get('window').width * 0.03,
  },
  pic: {
    backgroundColor: '#E0E0E0',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  CardTitle: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: '#28527A',
    fontSize: 14,
  },
  CardStartTime: {
    marginLeft: 7,
    flexDirection: 'row',
  },
  CardTimeText: {
    fontSize: 12,
    color: 'rgba(40, 82, 122, 0.65)',
    marginTop: -3,
  },
  CardPlace: {
    marginLeft: 5,
    flexDirection: 'row',
  },
  cardPlaceText: {
    fontSize: 12,
    color: 'rgba(40, 82, 122, 0.65)',
  },
});
