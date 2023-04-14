import { StyleSheet, Dimensions, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.04,
    marginTop: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.02 : 53,
    marginBottom: 20,
  },
  SearchArea: {
    flex: 10,
    backgroundColor: 'primary.100',
    borderRadius: 18,
    marginLeft: Dimensions.get('window').width * 0.05,
    height: 36,
  },
  SearchBar: {
    width: '100%',
    backgroundColor: 'primary.100',
    borderRadius: 18,
    height: 36,
  },
  searchIcon: {
    marginLeft: 10,
    paddingTop: 6,
  },
  searchtextBox: {
    marginLeft: 10,
  },
  searchtext: {
    paddingTop: 6,
    color: 'primary.600',
    fontSize: 18,
  },
  comment: {
    alignSelf: 'center',
    marginLeft: Dimensions.get('window').width * 0.05,
    marginTop: 0,
  },
  user: {
    alignSelf: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.03,
  },
  body: {
    flex: 2,
  },
  cardArea: {
    width: '100%',
    minHeight: 270,
    marginTop: 10,
    marginBottom: 10,
  },
  more: {
    marginHorizontal: Dimensions.get('window').width * 0.06,
    height: 35,
  },
  title: {
    flex: 10,
    color: 'primary.600',
    fontSize: 18,
  },
  showMore: {
    marginRight: Dimensions.get('window').width * 0.002,
    color: 'primary.600',
    fontSize: 12,
    alignSelf: 'center',
  },
  Card: {
    marginTop: 5,
    height: 260,
    width: 180,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 4,
    backgroundColor: 'white',
    marginLeft: Dimensions.get('window').width * 0.06,
    marginRight: -Dimensions.get('window').width * 0.0094,
  },
  CardTitle: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'primary.600',
    marginTop: -5,
    fontSize: 14,
  },
  CardDetails: {
    marginLeft: 7,
    flexDirection: 'row',
    marginBottom: 2,
  },
  CardText: {
    fontSize: 10,
    color: 'rgba(40, 82, 122, 0.65)',
    textAlignVertical: 'center',
  },
  pic: {
    backgroundColor: '#E0E0E0',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  readDot: {
    marginLeft: -2.5,
  },
});
