import { Platform, StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  avatar: {
    margin: 10,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    borderRadius: Dimensions.get('window').width * 0.1,
    backgroundColor: '#bfbfbf'
  },
  bigpic: {
    width: Dimensions.get('window').width / 2,
    aspectRatio: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0'
  },
  CardTimeText: {
    fontSize: 12,
    color: 'black'
  },
  CardDetail: {
    height: '100%',
    width: '100%',
    shadowColor: '#bfbebe',
    marginTop: 10,
    marginBottom: 65
  },
  DetailTitle: {
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  showActivityDetails_container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fafafa'
  },
  headerContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.04,
    marginBottom: 20
  },
  headerArrowBox: {
    flex: 1.9,
    marginLeft: Dimensions.get('window').width * 0.05,
    justifyContent: 'center'
  },
  nameheader: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 24,
    color: '#476685'
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: Dimensions.get('window').width * 0.1,
    marginTop: 7
  },
  imageDotNoHere: {
    color: '#C4C4C4',
    marginHorizontal: 2.5
  },
  imageDotIsHere: {
    color: '#F4D160',
    marginHorizontal: 2.5
  },
  sentMessage: {
    borderRadius: 30,
    width: 130,
    height: 38,
    paddingVertical: 4,
    marginVertical: 51,
    backgroundColor: '#476685',
    marginLeft: Dimensions.get('window').width * 0.336
  },
  sentButtonText: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 5,
    color: '#FBEEAC',
    fontWeight: 'bold'
  },
  DialogTitle: {
    textAlign: 'center',
    color: '#71717A',
    fontSize: 24,
    fontWeight: '400',
    marginTop: 20
  },
  shareBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SocialApp: {
    marginTop: 20
  },
  reachLimitNum: {
    fontSize: 18,
    color: 'red'
  },
  underLimitNum: {
    fontSize: 18,
    color: '#abd873'
  },
  NoLimitNum: {
    fontSize: 18,
    color: '#abd873',
    marginTop: 10,
    marginLeft: 15
  }
})
