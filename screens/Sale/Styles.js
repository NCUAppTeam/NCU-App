import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {
  Card, Searchbar, IconButton, Button
} from 'react-native-paper';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 5,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  scrollView: {

  },
  textinput: {

  },
  bigtextinput: {
    height: 120,
  },
  searchbar: {
    marginLeft: 10,
    marginBottom: 10,
    flex: 0.01,
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems: 'center',
  },
  search: {
    flex: 12,
    height: 35,
    borderRadius: 50,
    shadowOpacity: 0,
    backgroundColor: "#E5EBF1",
    color: "#28527A",
  },
  heart: {
    flex: 1.5,
    aspectRatio: 1,
    color: "rgba(40, 82, 122, 1)",
    borderRadius: 50,
    marginBottom: 10
  },
  buttonTagPressed: {
    borderRadius: 20,
    width: 106,
    height: 40,
    marginRight: 15,
    marginTop: 20,
  },
  buttonTag: {
    borderRadius: 20,
    width: 106,
    height: 40,
    marginRight: 15,
    marginTop: 20,    
    borderColor: "#28527A",
  },
  buttonTagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  textContainer: {
    width: 106,
    height: 40,
    marginRight: 15,
    marginTop: 20, 
    borderColor: "#28527A",
    borderWidth: 1,
    borderRadius: 20,
  },
  tagText: {
    color: "#CBD8E4",
    textAlign: "center", 
    fontSize: 16, 
    marginTop: 10,
  },
  personalContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  personalText: {
    fontSize: 24,
    fontWeight: "600",
  },
  personalButton: {
    width: 350,
    height: 100,
    marginTop: 10, 
    marginBottom: 20,   
    borderRadius: 4,
  },
});
