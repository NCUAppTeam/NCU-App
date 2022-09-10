import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, TextInput, RefreshControl, Dimensions,
  ScrollView, TouchableOpacity, Alert, Image, TouchableHighlight,
} from 'react-native';
import {
  Button, Provider, Card, Title,
} from 'react-native-paper';
import {
  Ionicons, AntDesign, MaterialCommunityIcons, Feather, FontAwesome5,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, Heading, VStack, HStack, FlatList,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import ActiveController from '../../controller/Active';
import styles from './style_folder/Styles_manage';

function manage({ route, navigation }) {
  const Cd = route.params;
  const passedID = JSON.stringify(Cd).slice(7, -2);
  const [message, messageSent] = useState('');
  const [attendeesNum, setAttendeeNum] = useState(); // 測試用
  useEffect(() => {
    ActiveController.getTotalOfAttendees(passedID).then((res) => {
      setAttendeeNum(res);
      // console.log(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [active, setActive] = useState([]);
  useEffect(() => {
    console.log('get id from personal_manage: ', passedID);
    ActiveController.getOneActive(passedID).then((res) => {
      setActive(res);
      // console.log(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [attendeeINFO, setAttendeeInfo] = useState();
  useEffect(() => {
    ActiveController.getAllAttendees(passedID).then((res) => {
      setAttendeeInfo(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    ActiveController.getOneActive(passedID).then((res) => {
      setActive(res);
      console.log(active);
    }).catch((err) => {
      throw err;
    });
    ActiveController.getTotalOfAttendees(passedID).then((res) => {
      setAttendeeNum(res);
      console.log(attendeesNum);
    }).catch((err) => {
      throw err;
    });
    ActiveController.getAllAttendees(passedID).then((res) => {
      setAttendeeInfo(res);
      console.log(attendeeINFO);
    }).catch((err) => {
      throw err;
    });
    setRefreshing(false);
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <NativeBaseProvider>
          <View style={{ flex: 0.1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <Box style={{
                flex: 0.8, justifyContent: 'center', alignItems: 'flex-start',
              }}
              >
                <AntDesign
                  name="arrowleft"
                  size={28}
                  color="darkblue"
                  style={{ justifyContent: 'center' }}
                  onPress={() => { navigation.navigate('personal'); }}
                />
              </Box>
              <View style={styles.nameheader}>
                <Text style={styles.name}>
                  管理活動
                </Text>
              </View>
              <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'flex-end',
              }}
              >
                <Feather
                  name="trash-2"
                  size={25}
                  color="darkblue"
                  onPress={() => {
                    Alert.alert(
                      '確認刪除?',
                      '確認後不可返回',
                      [{ text: '取消' },
                        {
                          text: '確認',
                          onPress: () => {
                            ActiveController.deleteOneActive(passedID);
                            navigation.navigate('personal');
                          },
                        },
                      ],
                    );
                  }}
                />
              </View>
              <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'flex-end',
              }}
              >
                <Feather
                  name="edit"
                  size={24}
                  color="darkblue"
                  onPress={() => {
                    navigation.navigate('edit', { Cd: passedID });
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {active.map(({
              id, name, limitNum,
            }) => (
              <Box key={id} style={{ marginTop: 20, marginHorizontal: 8 }}>
                <Heading>{name}</Heading>
                <Divider my={2} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>發送通知</Text>
                  <TextInput
                    style={styles.messageBox}
                    multiline
                    placeholder="在這裡輸入的訊息，將以私訊的方式發送給所有參加者"
                    onChangeText={(text) => messageSent(text)}
                    selectionColor="#ccc"
                  />
                  <LinearGradient
                    colors={['#1784B2', '#1D74A0', '#28527A']}
                    start={[0.6497, 0.9972]}
                    end={[0.1203, 0.6497]}
                    style={styles.manageSendMessagebtn}
                  >
                    <TouchableOpacity
                      onPress={() => { ActiveController.sentMessage(message); }}
                    >
                      <Text style={styles.manageSendMessagebtnText}>發送給所有參與者</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                <Divider marginTop={3} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
                <Box>
                  <HStack>
                    <Box>
                      <Text style={{
                        fontSize: 18, color: 'black', marginTop: 10, fontWeight: 'bold',
                      }}
                      >
                        參加名單
                        &emsp;&emsp;&emsp;&ensp;
                        目前人數：
                      </Text>
                    </Box>
                    <Box>
                      {limitNum !== '0' && (
                      <Text style={attendeesNum >= limitNum
                        ? styles.reachLimitNum
                        : styles.underLimitNum}
                      >
                        {attendeesNum}
                        &ensp;
                        /
                        {' '}
                        {limitNum}
                        {' '}
                        人
                      </Text>
                      )}
                      {limitNum === '0' && (
                      <Text style={styles.NoLimitNum}>
                        {attendeesNum}
                        &ensp;
                        (無上限)
                      </Text>
                      )}
                    </Box>
                  </HStack>
                </Box>
              </Box>
            ))}

            <View style={{ flex: 1 }}>
              <FlatList
                data={attendeeINFO}
                keyExtractor={(item) => item.studentID}
                refreshControl={(
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                  )}
                renderItem={({ item }) => (
                  <ScrollView>
                    <HStack style={styles.cardForAttendees}>
                      <Image
                        style={styles.avatar}
                        source={{
                          uri: item.avatar,
                        }}
                      />
                      <VStack style={{ marginLeft: 5, width: Dimensions.get('window').width * 0.28 }}>
                        <Title style={styles.signupIndex}>
                          {item.signupindex}
                        </Title>
                        <Text style={{ fontWeight: '700', fontSize: 18 }}>
                          {item.name}
                        </Text>
                        <HStack>
                          <Text style={{ textAlign: 'left', fontWeight: '400', fontSize: 10 }}>
                            {item.major}
                          </Text>
                        </HStack>
                        <HStack>
                          <Text style={{ textAlign: 'left', fontWeight: '400', fontSize: 10 }}>
                            {item.grade}
                            年級
                          </Text>
                        </HStack>
                      </VStack>
                      <HStack style={styles.manageBtn}>
                        <Box style={styles.DeletebtnInManage}>
                          <TouchableHighlight onPress={() => {
                            ActiveController.removeAttendee(passedID, item.studentID);
                          }}
                          >
                            <Text style={styles.DeletebtnInManageText}>移除</Text>
                          </TouchableHighlight>
                        </Box>
                        <Box style={styles.MessagebtnInManage}>
                          <TouchableHighlight>
                            <Text style={styles.MessagebtnInManageText}>私訊</Text>
                          </TouchableHighlight>
                        </Box>
                      </HStack>
                    </HStack>
                  </ScrollView>
                )}
              />
            </View>

          </View>

        </NativeBaseProvider>
      </SafeAreaView>
    </Provider>
  );
}

export default manage;
