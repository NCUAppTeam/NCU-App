import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    borderVerticalColor: '#e5e5e5',
    borderVerticalWidth: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff'
  },
  containerForCal: {
    flex: 1,
    marginHorizontal: 5
  },
  topHomePage: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  topLeftRight: {
    flexDirection: 'row'
  },
  topGreet: {
    paddingLeft: 17
  },
  topTextGreet: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  topTextName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28527A'
  }
})
