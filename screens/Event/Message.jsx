import React, { useState, useEffect } from 'react';
import {
  Text, SafeAreaView, RefreshControl, Image,
} from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome5, AntDesign, Octicons } from '@expo/vector-icons';

import {
  NativeBaseProvider, Box, VStack, HStack, FlatList, ZStack,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style_folder/Styles_Message';
import MessageController from '../../controller/Message';
import UserController from '../../controller/getStudentId';

function Message({ navigation }) {
  const userUid = UserController.getUid();
  const [newInfo, setNewInfo] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    const Info = [];
    MessageController.findRelateChatroom(userUid).then((res1) => {
      res1.forEach((res) => {
        MessageController.getNewestMessage(res).then((result) => {
          Info.push(result);
          setNewInfo([...Info]);
        });
      });
    }).catch((err) => {
      throw err;
    });
    setRefreshing(false);
  };

  useEffect(() => {
    const Info = [];
    MessageController.findRelateChatroom(userUid).then((res1) => {
      res1.forEach((res) => {
        MessageController.getNewestMessage(res).then((result) => {
          Info.push(result);
          setNewInfo([...Info]);
        });
      });
    }).catch((err) => {
      throw err;
    });
    const focusHandler = navigation.addListener('focus', () => {
      onRefresh();
    });
    return focusHandler;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <LinearGradient
          colors={['#1784B2', 'primary.600']}
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
            data={newInfo}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
                )}
            renderItem={({ item }) => (
              <Card
                style={styles.cardForMessage}
                key={item.id}
                onPress={() => {
                  navigation.navigate('send', {
                    chatroomId: item.id,
                    attendeeUid: item.othersUid,
                    userUid,
                  });
                }}
              >
                <ZStack>
                  <HStack>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: item.avatar,
                      }}
                    />
                    <VStack style={styles.messagePeople}>
                      <Text style={styles.name}>
                        {item.name}
                      </Text>
                      {/* <Text style={styles.identity}>
                        &ensp;#
                        {' '}
                        {item.identity}
                      </Text> */}
                      {/* <HStack>
                      <Text style={{ textAlign: 'left', fontWeight: '400', fontSize: 10 }}>
                        {item.major}
                      </Text>
                    </HStack> */}
                      <Text style={styles.latest}>
                        {item.data}
                      </Text>
                    </VStack>
                    <Box style={styles.sendTimeBox}>
                      <Text style={styles.sendTime}>
                        {MessageController.newMessageTime(item.sendTime)}
                      </Text>
                    </Box>
                  </HStack>
                  <Box>
                    <Octicons name="dot-fill" size={24} color={item.read ? 'transparent' : '#EB6F6F'} style={styles.readDot} />
                  </Box>
                </ZStack>
              </Card>
            )}
          />
        </Box>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
export default Message;
