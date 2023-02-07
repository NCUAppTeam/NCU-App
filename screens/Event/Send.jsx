import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, SafeAreaView, RefreshControl, Dimensions,
  ScrollView, TouchableOpacity, Image, Button, TouchableHighlight, TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import {
  Ionicons, FontAwesome5, AntDesign, Feather, Octicons, MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Card, Title } from 'react-native-paper';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import {
  NativeBaseProvider, Box, Divider, VStack, HStack, FlatList,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import styles from './style_folder/Styles_Message';
import MessageController from '../../controller/Message';
// set send: 110501444 陳似亭
// receive: 111201512 沈思怡

function Send({ route, navigation }) {
  const scrollview = useRef();
  const [deleteMessageId, setDeleteMessageId] = useState('');
  const [slideDot1, setSlideDot1] = useState(true);
  const [slideDot2, setSlideDot2] = useState(false);
  const whenScrolling = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide === 0) {
      setSlideDot1(true);
      setSlideDot2(false);
    } else if (slide === 1) {
      setSlideDot1(false);
      setSlideDot2(true);
    }
  };
  const [showDialog, setShowDialog] = useState(false);
  const { attendeeID } = route.params;
  const { userID } = route.params;
  const keyboard = useKeyboard();
  const [attendeeINFO, setAttendeeInfo] = useState({});
  const [userIDINFO, setUserIDInfo] = useState({});
  const [data, setData] = useState({
    send: userID,
    receive: attendeeID,
  });
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    MessageController.getRelativeMessage(userID, attendeeID).then((res) => {
      setGetData(res);
    }).then().catch((err) => {
      throw err;
    });
    MessageController.getINFO(userID).then((res) => {
      setUserIDInfo(res);
    }).then().catch((err) => {
      throw err;
    });
    MessageController.getINFO(attendeeID).then((res) => {
      setAttendeeInfo(res);
    }).then().catch((err) => {
      throw err;
    });
    scrollview.current.scrollToEnd({ animated: true });
  }, []);

  const onRefresh = () => {
    MessageController.getRelativeMessage(userID, attendeeID).then((res) => {
      setGetData(res);
    }).then().catch((err) => {
      throw err;
    });
    MessageController.getINFO(userID).then((res) => {
      setUserIDInfo(res);
    }).then().catch((err) => {
      throw err;
    });
    MessageController.getINFO(attendeeID).then((res) => {
      setAttendeeInfo(res);
    }).then().catch((err) => {
      throw err;
    });
    scrollview.current.scrollToEnd({ animated: true });
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      data.image = result.uri;
      data.sendTime = new Date();
      console.log(data);
      await MessageController.addMessage(data, userID);
      onRefresh();
      scrollview.current.scrollToEnd({ animated: true });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <LinearGradient
          colors={['#1784B2', '#28527A']}
          start={[1, 2]}
          end={[1, 0]}
        >
          <HStack style={styles.header}>
            <Box style={styles.headerArrowBoxSend}>
              <HStack style={{ alignItems: 'center', alignSelf: 'flex-start', marginLeft: 10 }}>
                <AntDesign
                  name="arrowleft"
                  size={28}
                  color="#fff"
                  onPress={() => { navigation.navigate('message', { prepage: 'send' }); }}
                />
                <Image
                  style={styles.sendAvatar}
                  source={{
                    uri: attendeeINFO.avatar,
                  }}
                />
                <Text style={styles.sendPeople}>
                    &ensp;
                  {attendeeINFO.name}
                </Text>
              </HStack>
            </Box>
            <Box style={{ flex: 7 }} />
            <Box style={styles.info}>
              <Feather
                name="info"
                size={28}
                color="#fff"
              />
            </Box>
          </HStack>
        </LinearGradient>
        <Box style={keyboard.keyboardShown ? { flex: 1 } : { flex: 5.3 }}>
          <FlatList
            data={getData}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ref={scrollview}
            onContentSizeChange={() => scrollview.current.scrollToEnd({ animated: true })}
            renderItem={({ item }) => (
              <Box style={styles.sendArea}>
                <Box
                  style={[
                    item.send === userID && { alignItems: 'flex-end' },
                    item.receive === userID && { alignItems: 'flex-start' },
                  ]}
                >
                  <Box
                    style={[
                      item.send === userID && { flexDirection: 'row' },
                      item.receive === userID && { flexDirection: 'row-reverse' },
                    ]}
                  >
                    <Box style={{ maxWidth: 180 }}>
                      <Card
                        key={item.id}
                        style={{ backgroundColor: '#E5EBF1', borderRadius: 10 }}
                        onLongPress={() => {
                          setShowDialog(true);
                          setDeleteMessageId(item.id);
                        }}
                      >
                        <Dialog
                          width={Dimensions.get('window').width * 0.6}
                          height={Dimensions.get('window').width * 0.485}
                          visible={showDialog}
                          overlayBackgroundColor="transparent"
                          onTouchOutside={() => {
                            setShowDialog(false);
                          }}
                        >
                          <DialogContent style={{
                            paddingBottom: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: '#e5e5e5',
                          }}
                          >
                            <View style={{
                              flexDirection: 'row',
                              paddingBottom: 5,
                              justifyContent: 'center',
                            }}
                            >
                              <View style={styles.unsentTitle}>
                                <Text style={{
                                  color: '#1f2937',
                                  fontSize: 17,
                                  fontWeight: '400',
                                }}
                                >
                                  收回訊息?&ensp;
                                </Text>
                              </View>
                            </View>
                          </DialogContent>

                          <DialogContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <View>
                              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                                訊息將被收回，但對方有可能已查閱過此訊息，仍然確定將訊息收回嗎?
                              </Text>
                            </View>
                          </DialogContent>
                          <DialogContent style={{ paddingLeft: 0 }}>
                            <View style={{
                              height: 61,
                              width: Dimensions.get('window').width * 0.9,
                              backgroundColor: '#f3f4f6',
                            }}
                            >
                              <View style={{ flexDirection: 'row' }}>
                                <View
                                  style={{ marginTop: 10 }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 14, color: '#64748B', padding: 10, marginLeft: Dimensions.get('window').width * 0.3,
                                    }}
                                    onPress={() => {
                                      setShowDialog(false);
                                    }}
                                  >
                                    取消
                                  </Text>
                                </View>
                                <View
                                  style={{ marginTop: 10 }}
                                >
                                  <Text
                                    style={{
                                      color: '#ffffff', backgroundColor: '#ef4444', padding: 10, borderRadius: 4, marginLeft: 10,
                                    }}
                                    onPress={() => {
                                      MessageController.deleteMessage(item.id).then(() => {
                                        onRefresh();
                                        setShowDialog(false);
                                      });
                                    }}
                                  >
                                    刪除
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </DialogContent>
                        </Dialog>
                        <Card.Content style={{
                          paddingBottom: 6,
                          paddingHorizontal: 10,
                        }}
                        >
                          {item.message
                            ? (
                              <Text style={{ marginTop: 6, fontSize: 14 }}>
                                {item.message}
                              </Text>
                            )
                            : (
                              <Image
                                style={{ height: 150, width: 150, marginTop: 6 }}
                                source={{
                                  uri: item.image,
                                }}
                              />
                            )}
                        </Card.Content>
                      </Card>
                    </Box>
                    <Box style={{ marginHorizontal: 12 }}>
                      {item.send === userID
                        ? (
                          <Image
                            style={{ height: 36, width: 36, borderRadius: 18 }}
                            source={{
                              uri: userIDINFO.avatar,
                            }}
                          />
                        )
                        : (
                          <Image
                            style={{ height: 36, width: 36, borderRadius: 18 }}
                            source={{
                              uri: attendeeINFO.avatar,
                            }}
                          />
                        )}
                    </Box>
                  </Box>

                </Box>
              </Box>
            )}
          />
        </Box>
        <Box style={keyboard.keyboardShown ? { flex: (Platform.OS === 'ios' ? 1.2 : 0.3), height: (Platform.OS === 'ios' ? keyboard.keyboardHeight : 0) } : { height: 100 }}>
          <Box>
            <ScrollView
              horizontal
              onScroll={whenScrolling}
              showsHorizontalScrollIndicator={false}
            >
              <HStack style={styles.autoLeft}>
                <TouchableHighlight
                  style={styles.autoMessage}
                  activeOpacity={0.5} // 不透明度
                  underlayColor="#E5EBF1"
                  onPress={() => {
                    data.sendTime = new Date();
                    MessageController.addMessage({
                      ...data, message: '請問有什麼需要注意的嗎？', sendTime: data.sendTime, readForUser: true, readForOthers: false, image: '',
                    }, userID);
                    onRefresh();
                  }}
                >
                  <Text style={styles.autoSend}>請問有什麼需要注意的嗎？</Text>
                </TouchableHighlight>
              </HStack>
              <HStack style={styles.autoRight}>
                <TouchableHighlight
                  style={styles.autoMessage}
                  activeOpacity={0.5} // 不透明度
                  underlayColor="#E5EBF1"
                  onPress={() => {
                    data.sendTime = new Date();
                    MessageController.addMessage({
                      ...data, message: '請問有需要自行準備的東西嗎？', sendTime: data.sendTime, readForUser: true, readForOthers: false, image: '',
                    }, userID);
                    onRefresh();
                  }}
                >
                  <Text style={styles.autoSend}>請問有需要自行準備的東西嗎？</Text>
                </TouchableHighlight>
              </HStack>
            </ScrollView>
          </Box>
          <Box style={styles.Dot}>
            <MaterialCommunityIcons
              name="circle"
              size={5}
              style={
            slideDot1 === true
              ? (styles.DotTrue)
              : (styles.Dotfalse)
          }
            />
            <MaterialCommunityIcons
              name="circle"
              size={5}
              style={
            slideDot2 === true
              ? (styles.DotTrue)
              : (styles.Dotfalse)
          }
            />
          </Box>
          <Box style={styles.typeFooter}>
            <Box style={styles.pickImage}>
              <FontAwesome5
                name="image"
                size={26}
                color="#28527A"
                onPress={pickImage}
              />
            </Box>
            <Box style={styles.typeArea}>
              <TextInput
                style={styles.typeText}
                multiline
                numberOfLines={4}
                placeholder="請輸入你想問或回答的訊息"
                placeholderTextColor="#718fab"
                value={data.message}
                onChangeText={(text) => {
                  setData({ ...data, message: text });
                  onRefresh();
                }}
                selectionColor="#ccc"
              />
            </Box>
            <Box style={styles.sendIcon}>
              <Octicons
                name="paper-airplane"
                size={26}
                color="#28527A"
                onPress={() => {
                  if (!(data.message === '') || !(data.image === undefined)) {
                    data.sendTime = new Date();
                    // console.log(data);
                    MessageController.addMessage(data, userID);
                    onRefresh();
                    setData({ ...data, message: '' });
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
export default Send;
