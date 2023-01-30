import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, SafeAreaView, RefreshControl, Dimensions,
  ScrollView, TouchableOpacity, Image, Button, TouchableHighlight, TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import {
  Ionicons, FontAwesome5, AntDesign, Feather, Octicons,
} from '@expo/vector-icons';
import { Card, Title } from 'react-native-paper';
import {
  NativeBaseProvider, Box, Divider, VStack, HStack, FlatList,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import styles from './style_folder/Styles_Message';
import ActiveController from '../../controller/Active';
import MessageController from '../../controller/Message';
// set send: 110501444 陳似亭
// receive: 111201512 沈思怡

function Send({ route, navigation }) {
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
    MessageController.getRelativeMessage(userID, attendeeID).then((res) => {
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
  const scrollview = useRef();
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
      await MessageController.addMessage(data);
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
              <Box style={styles.titleSend}>
                <FontAwesome5
                  name="comment"
                  size={25}
                  color="#fff"
                >
                  <Text>
                    &ensp;
                    {attendeeINFO.name}
                  </Text>
                </FontAwesome5>
              </Box>
            </HStack>
          </Box>
        </LinearGradient>
        <ScrollView
          style={{ paddingVertical: 4 }}
          ref={scrollview}
          onContentSizeChange={() => scrollview.current.scrollToEnd({ animated: true })}
        >

          <Box style={keyboard.keyboardShown ? styles.sendAreaTrue : styles.sendAreaFalse}>
            {getData.map(({
              id, send, receive, message, image,
            }) => (
              <Box style={{ marginBottom: 5 }}>
                <Box
                  style={[
                    send === userID && { alignItems: 'flex-end' },
                    receive === userID && { alignItems: 'flex-start' },
                  ]}
                >
                  <Box
                    style={[
                      send === userID && { flexDirection: 'row' },
                      receive === userID && { flexDirection: 'row-reverse' },
                    ]}
                  >
                    <Box style={{ maxWidth: 180 }}>
                      <Card
                        key={id}
                        style={{ backgroundColor: '#E5EBF1', borderRadius: 10 }}
                      >
                        <Card.Content style={{ paddingVertical: 6, paddingHorizontal: 10 }}>
                          {message
                            ? (
                              <Text style={{ marginTop: 2, fontSize: 14 }}>
                                {message}
                              </Text>
                            )
                            : (
                              <Image
                                style={{ height: 150, width: 150, marginVertical: 4 }}
                                source={{
                                  uri: image,
                                }}
                              />
                            )}
                        </Card.Content>
                      </Card>
                    </Box>
                    <Box style={{ marginHorizontal: 12 }}>
                      {send === userID
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
            ))}
          </Box>
        </ScrollView>
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
              value={data.message}
              onChangeText={(text) => {
                setData({ ...data, message: text });
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
                data.sendTime = new Date();
                // console.log(data);
                MessageController.addMessage(data);
                onRefresh();
                setData({ ...data, message: '' });
              }}
            />
          </Box>
        </Box>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
export default Send;
