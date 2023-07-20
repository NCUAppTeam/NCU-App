import { Platform, StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fafafa'
  },
  headerContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.05,
    marginTop: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.02 : 20,
    marginBottom: 10
  },
  headerArrowBox: {
    flex: 2,
    marginLeft: Dimensions.get('window').width * 0.05,
    justifyContent: 'center'
  },
  nameheader: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    marginTop: 7,
    paddingVertical: 10,
    fontSize: 24,
    color: '#476685'
  },
  headerCommentView: {
    flex: 1.1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  headerPersonalView: {
    flex: 1.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.03
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: Dimensions.get('window').width * 0.03,
    marginTop: 7
  },
  CardInMore: {
    height: Dimensions.get('window').width * 0.58 + 5,
    width: Dimensions.get('window').width * 0.42,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -4
    },
    elevation: 4,
    marginVertical: 7,
    backgroundColor: 'white',
    marginHorizontal: Dimensions.get('window').width * 0.03
  },
  pic: {
    backgroundColor: '#E0E0E0',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  CardTitle: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: '#476685',
    fontSize: 14
  },
  CardStartTime: {
    marginLeft: 7,
    flexDirection: 'row'
  },
  CardTimeText: {
    fontSize: 12,
    color: 'rgba(40, 82, 122, 0.65)',
    marginTop: -3
  },
  CardPlace: {
    marginLeft: 5,
    flexDirection: 'row'
  },
  cardPlaceText: {
    fontSize: 12,
    color: 'rgba(40, 82, 122, 0.65)'
  }
})
