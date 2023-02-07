import React, { useState, useEffect } from 'react';
import {
  Text, SafeAreaView, RefreshControl,
  ScrollView, Image, TouchableHighlight,
} from 'react-native';
import {
  Ionicons, FontAwesome5, AntDesign, Feather, Octicons,
} from '@expo/vector-icons';
import {
  Card, List, TextInput, Title,
} from 'react-native-paper';
import {
  NativeBaseProvider, Box, Divider, VStack, HStack, FlatList, Button, ZStack,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style_folder/Styles_Message';
import ActiveController from '../../controller/Active';
import MessageController from '../../controller/Message';

function Message({ navigation }) {
  const [attendeeINFO, setAttendeeInfo] = useState();
  const [newList, setNewList] = useState([]);
  useEffect(() => {
    MessageController.getMessagePerson('110501444').then((res1) => {
      setAttendeeInfo(res1);
      res1.forEach((res) => {
        MessageController.getNewestMessage('110501444', res.studentID).then((result) => {
          for (let i = 0; i <= res1.length; i += 1) {
            res.newMessage = result.message;
            setNewList(result.message);
          }
        });
      });
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    MessageController.getMessagePerson('110501444').then((res1) => {
      setAttendeeInfo(res1);
      res1.forEach((res) => {
        MessageController.getNewestMessage('110501444', res.studentID).then((result) => {
          for (let i = 0; i <= res1.length; i += 1) {
            res.newMessage = result.message;
            setNewList(result.message);
          }
        });
      });
    });
    setRefreshing(false);
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
            <Box style={styles.headerArrowBox}>
              <AntDesign
                name="arrowleft"
                size={28}
                color="#fff"
                onPress={() => { navigation.navigate('list'); }}
              />
            </Box>
            <Box style={styles.title}>
              <FontAwesome5
                name="comment"
                size={25}
                color="#fff"
              >
                <Text>&ensp;私訊中心</Text>
              </FontAwesome5>
            </Box>
            <Box style={{ flex: 1 }} />
          </HStack>
        </LinearGradient>
        {/* 暫時關閉區分拍賣和活動的私訊按鈕 */}
        {/* <Box style={styles.option}>
          <HStack>
            <TouchableOpacity>
              <Text style={styles.optionLeft}>拍賣私訊</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.optionRight}>活動私訊</Text>
            </TouchableOpacity>
          </HStack>
        </Box> */}
        <Box style={{ flex: 1, alignItems: 'center' }}>
          <FlatList
            style={{ marginTop: 20 }}
            data={attendeeINFO}
            keyExtractor={(item) => item.studentID}
            showsVerticalScrollIndicator={false}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
                )}
            renderItem={({ item }) => (
              <ZStack>
                <TouchableHighlight
                  activeOpacity={0.5}
                  underlayColor="#fff" // 切換時候的顏色
                  onPress={() => {
                    navigation.navigate('send', {
                      attendeeID: item.studentID,
                      userID: '110501444',
                    });
                  }}
                >
                  <HStack style={styles.cardForMessage}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: item.avatar,
                      }}
                    />
                    <VStack style={styles.messagePeople}>
                      <HStack>
                        <Text style={styles.name}>
                          {item.name}
                        </Text>
                        {/* <Text style={styles.identity}>
                        &ensp;#
                        {' '}
                        {item.identity}
                      </Text> */}
                      </HStack>
                      {/* <HStack>
                      <Text style={{ textAlign: 'left', fontWeight: '400', fontSize: 10 }}>
                        {item.major}
                      </Text>
                    </HStack> */}
                      <Text style={styles.latest}>
                        {item.newMessage}
                      </Text>
                    </VStack>
                  </HStack>
                </TouchableHighlight>
                <Box>
                  <Octicons name="dot-fill" size={24} color={item.readForOthers ? '#EB6F6F' : 'transparent'} style={styles.readDot} />
                </Box>
              </ZStack>
            )}
          />
        </Box>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
export default Message;
