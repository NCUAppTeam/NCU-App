import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  cardManage: {
    height: 127,
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  cardManagepic: {
    width: 127,
    height: 124,
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
    marginHorizontal: 9,
    marginTop: 7,
    flexDirection: 'row',
    alignContent: 'space-around'
  },
  cardManageText: {
    fontSize: 12
  },
  cardManageTextLocation: {
    fontSize: 12,
    marginLeft: 3
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
