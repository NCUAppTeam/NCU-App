import { StyleSheet } from 'react-native';

const colorDarkBlue = '#28527A';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  headerSearchBarContainer: {
    paddingTop: 50,
    paddingBottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    zIndex: 1000,
  },
  headerSearchBarView: {
    backgroundColor: '#E5EBF1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 50,
    width: '100%',
    paddingHorizontal: 10,
  },
  headerSearchBarTextInput: {
    marginLeft: 6,
    padding: 10,
    width: '85%',
    fontSize: 18,
    color: '#28527A',
  },
});

export {
  colorDarkBlue,
};
