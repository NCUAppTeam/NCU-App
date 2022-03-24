import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {
  Card, Searchbar, IconButton, Button
} from 'react-native-paper';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // marginTop: Constants.statusBarHeight,
    backgroundColor: "white",
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
  headerText: {
    color: "#28527A",
    fontSize: 24,
    fontWeight: "700"
  },
  stackBarIcon: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 50,
    marginTop: 10,
    paddingHorizontal: 8
  },
  stackBarLeftIcon: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10
  },
  searchbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  search: {
    flex: 12,
    height: 35,
    borderRadius: 50,
    shadowOpacity: 0,
  },
  icon: {
    aspectRatio: 1,
    borderRadius: 50,
    marginLeft: 15,
    color: "#28527A"
  },
  searchtext: {
    fontSize: 16,
    marginLeft: 10,
    color: '#28527A',
  },
  searchContainer: {
    backgroundColor: "#E5EBF1",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 200,
    height: 40,
    borderRadius: 25,
  },
  buttonTagPressed: {
    borderRadius: 20,
    width: 106,
    height: 40,
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
    top: "65%"
  },
  textContainer: {
    width: 106,
    height: 40, 
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

  personalText: {
    fontSize: 24,
    fontWeight: "600",
  },
  personalButton: {
    aspectRatio: 1.5,
    height: 55,  
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  line: {
    width: 120,
    height: 1.5,
    backgroundColor: "#1784B2",
    marginTop: 10,
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  editText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#000000",
    marginVertical: 5
  },
  photoText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#000000",
    marginTop: 15,
    marginBottom: 5
  },
  postTag: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  tagContainer: {
    backgroundColor: "#E5EBF1",
    width: 70,
    height: 37,
    marginRight: 10,
    borderRadius: 4,
    justifyContent: "center"
  },
  tagPressedContainer: {
    backgroundColor: "#28527A",
    width: 70,
    height: 37,
    marginRight: 10,
    borderRadius: 4,
    justifyContent: "center"
  },
  tag: {
    justifyContent: 'center',
    color: "#28527A",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center"
  },
  tagPressed: {
    justifyContent: 'center',
    color: "#FBEEAC",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center"
  },
  buttonUpload: {
    backgroundColor: "#28527A",
    width: 160,
    marginBottom: 10,
  },
  buttonAdd: {
    backgroundColor: "#D4D4D4",
    width: 297,
    height: 48,
    borderRadius: 30,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonComplete: {
    width: 297,
    height: 48,
    borderRadius: 20,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  myPlaceContainter: {
    width: "55%",
    height: 223,
    top: -80,
    borderRadius: 100,
    transform: [{ scaleX: 2 }],
  },  
  personalContainer: {
    
  },
  searchTag: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0C4A6E",
  },
  myplaceContainer: {
    top: "-45%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  noSavedText: {
    color: "#BFBFBF",
    fontWeight: "600",
    marginVertical: 50
  },
  ghostContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: "10%"
  },
  HeadButton: {
    width: 200,
    height: 40,
  },
  HeadContainer: {
    backgroundColor: "#28527A",
    borderRadius: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  HeadText: {
    color: "#FBEEAC",
    fontWeight: "700",
    textAlign: "center"
  },
  buttonBack: {
    left: -80,
    top: -30,
  }
});
