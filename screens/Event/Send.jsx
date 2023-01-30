import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, SafeAreaView, RefreshControl, Dimensions,
  ScrollView, TouchableOpacity, Image, Button, TouchableHighlight, TextInput,
} from 'react-native';
import {
  Ionicons, FontAwesome5, AntDesign, Feather,
} from '@expo/vector-icons';
import { Card, Title } from 'react-native-paper';
import {
  NativeBaseProvider, Box, Divider, VStack, HStack, FlatList,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style_folder/Styles_Message';
import ActiveController from '../../controller/Active';
import Icon from 'react-native-vector-icons/Octicons';
import * as ImagePicker from 'expo-image-picker';
//set send:111201512
//receive:110501444

function Send({ route,navigation }) {
  const attendeeID = route.params.attendeeID;
  const userID = route.params.userID;
  const [attendeeINFO,setAttendeeInfo] = useState({});
  const [userIDINFO,setUserIDInfo] = useState({});
  const [data, setData] = useState({
    send:userID,
    receive:attendeeID,
  });
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    ActiveController.getRelativeMessage(userID,attendeeID).then((res) => {
      setGetData(res);
    }).then().catch((err) => {
      throw err;
    });
    ActiveController.getINFO(userID).then((res) => {
      setUserIDInfo(res);
    }).then().catch((err) => {
      throw err;
    });
    ActiveController.getINFO(attendeeID).then((res) => {
      setAttendeeInfo(res);
    }).then().catch((err) => {
      throw err;
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    ActiveController.getRelativeMessage(userID,attendeeID).then((res) => {
      setGetData(res);
    }).then().catch((err) => {
      throw err;
    });
    ActiveController.getINFO(userID).then((res) => {
      setUserIDInfo(res);
    }).then().catch((err) => {
      throw err;
    });
    ActiveController.getINFO(attendeeID).then((res) => {
      setAttendeeInfo(res);
    }).then().catch((err) => {
      throw err;
    });
    setRefreshing(false);
  };
  const scrollview=useRef();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      data.image=result.uri;
      data.sendTime = new Date();
      console.log(data);
      await ActiveController.addMessage(data);
      onRefresh();
      scrollview.current.scrollToEnd({ animated: true })
    }
  };
  return (
    <SafeAreaView
    style={{flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
      marginTop: 0,
      width: Dimensions.get('window').width,
      backgroundColor: '#fafafa'}}>
      <NativeBaseProvider>
          <LinearGradient
            colors={['#1784B2', '#28527A']}
            start={[1, 2]}
            end={[1, 0]}
          >
            <Box style={styles.header}>
              <HStack style={{ flex: 1 }}>
                <Box style={styles.headerArrowBox}>
                  <AntDesign
                    name="arrowleft"
                    size={28}
                    color="#fff"
                    onPress={() => { navigation.navigate('message', { prepage: 'send' }); }}
                  />
                </Box>
                <Box style={styles.title}>
                  <FontAwesome5
                    name="comment"
                    size={25}
                    color="#fff"
                  >
                    <Text>&ensp;{attendeeINFO.name}</Text>
                  </FontAwesome5>
                </Box>
              </HStack>
            </Box>
          </LinearGradient>
          <View style={{height:Dimensions.get('window').height-155}}>
            <ScrollView
              style={{paddingVertical:4}}
              ref={scrollview}
              onContentSizeChange={() => scrollview.current.scrollToEnd({ animated: true })}
            >
              {getData.map(({
                id, send, receive, message, image
              }) => (
                <View style={{marginBottom:5}}>
                  <View 
                    style={[
                      send===userID&&{alignItems:"flex-end"},
                      receive===userID&&{alignItems:"flex-start"}
                    ]}>
                    <View 
                      style={[
                        send===userID&&{flexDirection:"row"},
                        receive===userID&&{flexDirection:"row-reverse"}
                      ]}
                    >
                      <View style={{maxWidth:180}}>
                      <Card
                      key={id}
                      style={{backgroundColor:"#E5EBF1",borderRadius:10}}
                      >
                      <Card.Content style={{paddingVertical:6,paddingHorizontal:10}}>
                        {message
                        ?(<Text style={{marginTop:2,fontSize:14}}>
                          {message}
                          </Text>)
                        :(<Image 
                            style={{height:150,width:150,marginVertical:4}}
                            source={{
                              uri: image,
                            }}/>)}
                      </Card.Content>
                      </Card>
                      </View>
                      <View style={{marginHorizontal:12}}>
                        {send===userID
                          ?<Image 
                            style={{height:36,width:36,borderRadius:18}}
                            source={{
                              uri: userIDINFO.avatar
                            }}/>
                          :<Image 
                            style={{height:36,width:36,borderRadius:18}}
                            source={{
                              uri: attendeeINFO.avatar
                            }}/>
                        }
                      </View>
                      
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{flexDirection:"row",height:50}}>
            <View style={{paddingTop:10,paddingLeft:18,paddingRight:12}}>
              <FontAwesome5
                  name="image"
                  size={26}
                  color="#28527A"
                  onPress={pickImage}
              />
            </View>
            <View
              style={{flex:1,borderRadius:20,backgroundColor:"#E5EBF1",
              paddingHorizontal:12,height:35,marginTop:5,
              borderWidth:1,borderColor: 'rgba(191, 191, 191, 0.7)'}}>
              <TextInput
                style={{height:20,fontSize:14,marginTop:6}}
                mode="flat"
                multiline
                numberOfLines={4}
                value={data.message}
                onChangeText={(text) => setData({ ...data, message: text })}
                selectionColor="#ccc"
              />
            </View>
            <View style={{paddingTop:10,paddingLeft:12,paddingRight:18}}>
              <Icon 
                name="paper-airplane"
                size={26}
                color="#28527A"
                onPress={() => {
                  data.sendTime = new Date();
                  console.log(data);
                  ActiveController.addMessage(data);
                  onRefresh();
                  setData({ ...data, message: "" })
                }}
              />
            </View>
          </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
export default Send;
