import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  body: {
    flex: 1
  },
  btnPress: {
    height: 40,
    width: 100,
    backgroundColor: '#476685',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10
  },
  btnNormal: {
    height: 40,
    width: 100,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#E5EBF1',
    margin: 10
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#476685'
  },
  btnPText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FBEEAC'
  },
  bodyforCostAndLimitnum: {
    flex: 1,
    flexDirection: 'row'
  },
  CostTitle: {
    flex: 1.4,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  },
  CostBox: {
    width: Dimensions.get('window').width * 0.37,
    height: 40,
    borderWidth: 1,
    borderColor: '#bfbebe',
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5
  },
  CostAndLimitnumText: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    height: 35,
    borderRadius: 5,
    textAlign: 'left',
    marginTop: Dimensions.get('window').height * 0.01
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 50,
    marginHorizontal: 15
  },
  categorybutton: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  Cloudicontext: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5
  },
  details: {
    height: 80,
    borderWidth: 1,
    borderColor: '#bfbebe',
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5
  },
  footer: {
    height: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 85,
    height: 85,
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#4169E1'
  },
  imageButton: {
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: '#476685'
  },
  input: {
    width: '95%',
    fontSize: 16,
    color: 'black',
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  inputCost: {
    width: '95%',
    fontSize: 16,
    color: 'black',
    borderRadius: 5,
    marginTop: -5,
    marginLeft: 10,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  inputbox: {
    height: 40,
    borderWidth: 1,
    borderColor: '#bfbebe',
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: 'center'
  },
  inputboxText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    textAlign: 'left',
    marginLeft: 5
  },
  LimitnumTitle: {
    flex: 1.3,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  },
  LimitnumBox: {
    width: Dimensions.get('window').width * 0.37,
    height: 40,
    borderWidth: 1,
    borderColor: '#bfbebe',
    marginTop: 5,
    marginBottom: 20,
    marginLeft: Dimensions.get('window').width * 0.13,
    borderRadius: 5,
    textAlignVertical: 'center'
  },
  name: {
    marginLeft: 45,
    fontSize: 24,
    color: '#476685'
  },
  nameheader: {
    flex: 9,
    alignItems: 'center',
    width: 'auto',
    borderRadius: 50,
    justifyContent: 'center'
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: Dimensions.get('window').width * 0.001,
    fontSize: Dimensions.get('window').width * 0.03
  },
  unsentButton: {
    borderRadius: 30,
    width: 297,
    height: 51,
    paddingVertical: 8,
    marginTop: Dimensions.get('window').height * 0.004,
    marginBottom: Dimensions.get('window').height * 0.02,
    backgroundColor: '#D4D4D4',
    elevation: 20,
    shadowColor: '#000'
  },
  unsentButtonText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#737373',
    fontWeight: 'bold'
  },
  sentButton: {
    borderRadius: 30,
    width: 297,
    height: 51,
    paddingVertical: 8,
    marginTop: Dimensions.get('window').height * 0.004,
    marginBottom: Dimensions.get('window').height * 0.02,
    elevation: 20,
    shadowColor: '#000'
  },
  sentButtonText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#FBEEAC',
    fontWeight: 'bold'
  }
})
