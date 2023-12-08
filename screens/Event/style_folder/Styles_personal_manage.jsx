import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: Dimensions.get('window').width * 0.03,
    marginTop: 7
  },
  cardManage: {
    minHeight: 120,
    height: 'auto',
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  cardManagepic: {
    minHeight: 120,
    height: 'auto',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#E0E0E0'
  },
  cardManageTitle: {
    marginLeft: 10,
    textAlign: 'left',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  cardManageDetails: {
    marginHorizontal: 10,
    marginTop: 7,
    flexDirection: 'row',
    alignContent: 'space-around'
  },
  cardManageLocation: {
    width: '70%',
    height: 'auto',
    marginHorizontal: 9,
    marginTop: 7,
    flexDirection: 'row',
    alignContent: 'space-around'
  },
  cardManageText: {
    width: '80%',
    fontSize: 12,
    alignSelf: 'center'
  },
  cardManageTextLocation: {
    width: 'auto',
    fontSize: 12,
    alignSelf: 'center'
  },
  CardInPersonal: {
    height: 'auto',
    width: Dimensions.get('window').width * 0.41,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -4
    },
    elevation: 4,
    marginVertical: 7,
    backgroundColor: 'white',
    marginRight: Dimensions.get('window').width * 0.03
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
  },
  pic: {
    backgroundColor: '#E0E0E0',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  personalbtn: {
    width: 100,
    height: 40,
    color: 'transparent',
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#476685',
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 8,
    marginLeft: 9,
    marginRight: 9,
    justifyContent: 'center'
  },
  personalbtnText: {
    color: '#8ba0b5',
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.5,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  personalbtnPress: {
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#1784B2',
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#476685',
    marginLeft: 9,
    marginRight: 9,
    justifyContent: 'center'
  },
  personalbtnPressText: {
    color: '#FBEEAC',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  personalmanagebtnPressText: {
    color: '#FBEEAC',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  personalmanagebtnText: {
    color: '#8ba0b5',
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.5,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  num: {
    minWidth: 18,
    minHeight: 15,
    width: 'auto',
    height: 'auto',
    position: 'relative',
    marginLeft: -38,
    marginTop: 113,
    marginBottom: -127,
    fontWeight: '400',
    fontSize: 13,
    color: '#fff',
    backgroundColor: '#DC2626',
    borderRadius: 100,
    alignSelf: 'center',
    textAlign: 'center'
  }
})
