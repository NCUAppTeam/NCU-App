import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  bigpic: {
    width: 300,
    height: 300,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
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
  CardDetail: {
    height: '100%',
    width: '100%',
    shadowColor: '#bfbebe',
    marginTop: 10,
    marginBottom: 65,
  },
  DetailTitle: {
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  name: {
    marginLeft: 45,
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#28527A',
  },
  nameheader: {
    flex: 9,
    alignItems: 'center',
    width: 'auto',
    borderRadius: 50,
    justifyContent: 'center',
  },
  showActivityDetails_container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 52.5,
    marginHorizontal: Dimensions.get('window').width * 0.07,
  },
});
