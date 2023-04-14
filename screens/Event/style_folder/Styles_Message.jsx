import { Platform, StyleSheet, Dimensions } from 'react-native';

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
    alignItems: 'center',
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSend: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Dimensions.get('window').width * 0.25,
  },
  headerArrowBox: {
    flex: 1,
    alignItems: 'center',
  },
  headerArrowBoxSend: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  option: {
    backgroundColor: '#fafafa',
    height: 44,
    width: Dimensions.get('window').width,
    paddingHorizontal: Dimensions.get('window').width * 0.17,
    paddingTop: 10,
  },
  optionLeft: {
    fontSize: 18,
    marginRight: 120,
    fontWeight: '300',
  },
  optionRight: {
    fontSize: 18,
  },
  cardForMessage: {
    width: Dimensions.get('window').width * 0.875,
    height: 85,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'bebebe',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowRadius: 10,
    elevation: 4,

    // marginLeft: Dimensions.get('window').width * 0.065,
    marginBottom: 15,
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  sendAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: '#bfbebe',
    borderWidth: 1,
    alignSelf: 'center',
    marginLeft: 10,
  },
  messagePeople: {
    marginLeft: 5,
    paddingTop: 15,
  },
  sendArea: {
    width: Dimensions.get('window').width,
    marginBottom: 15,
    marginTop: 15,
  },
  typeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickImage: {
    paddingTop: 5,
    paddingLeft: 18,
    paddingRight: 12,
  },
  typeArea: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#E5EBF1',
    paddingHorizontal: 12,
    height: 35,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'rgba(191, 191, 191, 0.7)',
  },
  typeText: {
    height: 20,
    fontSize: 14,
    marginTop: 6,
  },
  sendIcon: {
    paddingTop: 5,
    paddingLeft: 12,
    paddingRight: 18,
  },
  name: {
    paddingTop: Dimensions.get('window').height * 0.0065,
    fontWeight: '700',
    fontSize: 18,
  },
  identity: {
    textAlignVertical: 'center',
    fontWeight: '400',
    fontSize: 10,
  },
  latest: {
    width: Dimensions.get('window').width * 0.45,
    height: 30,
    marginTop: 2,
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 10.5,
    color: '#BFBFBF',
  },
  sendTimeBox: {
    flex: 1,
    alignSelf: 'flex-end',

  },
  sendTime: {
    color: '#b4b4b8',
    textAlign: 'right',
    marginRight: 5,
    fontSize: 10,
  },
  sendPeople: {
    // marginTop: Dimensions.get('window').height * 0.011,
    marginLeft: 3,
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  info: {
    flex: 0.7,
    color: '#000',
  },
  Dot: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  Dotfalse: {
    color: '#E5E5E5',
    marginHorizontal: 2.5,
  },
  DotTrue: {
    color: '#1784B2',
    marginHorizontal: 2.5,
  },
  autoLeft: {
    marginLeft: Dimensions.get('window').width * 0.02,
  },
  autoRight: {
    marginRight: Dimensions.get('window').width * 0.01,
  },
  autoMessage: {
    backgroundColor: '#E5EBF1',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  autoSend: {
    marginHorizontal: 8,
    marginVertical: 5,
    fontWeight: '400',
    fontSize: 14,
    color: '#476685',
  },
  unsentTitle: {
    marginTop: 17,
    marginBottom: 10,
  },
  readDot: {
    marginLeft: Dimensions.get('window').width * 0.82,
  },
});
