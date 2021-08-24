import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    marginTop: 8,
    margin: 8,
  },
  list: {
    backgroundColor: '#fff',
    width: '97%',
    height: 530,
    borderWidth: 0.5,
    margin: 7,
  },
  listTitle: {
    fontSize: 20,
  },
  pointerPosition: {
    backgroundColor: '#00f',
    position: 'absolute',
    padding: 4,
    margin: 8,
    flexDirection: 'row',
  },
  pointer: {
    fontSize: 20,
    color: '#fff',
  },
  bus: {
    margin: 20,
    left: 175,
    bottom: 50,
    backgroundColor: 'gray',
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  location: {
    margin: 2,
    left: 175,
    bottom: 60,
    backgroundColor: 'gray',
  },
  openButton: {
    backgroundColor: 'gray',
    borderRadius: 30,
    padding: 5,
    elevation: 0.005,
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  fab1: {
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 70,
    backgroundColor: 'white',
  },
  fab2: {
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});
