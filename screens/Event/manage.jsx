import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, TextInput, RefreshControl, Dimensions,
  ScrollView, TouchableOpacity, Image, TouchableHighlight,
} from 'react-native';
import {
  Button, Provider, Card, Title,
} from 'react-native-paper';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
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
  const [showDialog1, setShowDialog1] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);
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
                    setShowDialog1(true);
                  }}
                />
                <Dialog
                  width={Dimensions.get('window').width * 0.9}
                  height={Dimensions.get('window').width * 0.733}
                  visible={showDialog1}
                  >
                    <DialogContent style={{paddingBottom:0,
                      borderBottomWidth:1,
                      borderBottomColor:"#e5e5e5",}}>
                      <View style={{
                        flexDirection: 'row',
                        
                        paddingBottom:5,
                        justifyContent: "space-between",
                        }}>
                        <View>
                          <Text style={{
                            textAlign: 'left',
                            color: '#1f2937',
                            fontSize: 16,
                            fontWeight: '400',
                            marginTop: 17,
                            marginBottom: 10,
                          }}
                          >
                            刪除活動&ensp;
                          </Text>
                        </View>
                        <View>
                          <Feather
                            name="x"
                            size={26}
                            color="#1F2937"
                            style={{ 
                              // marginLeft: Dimensions.get('window').width * 0.5,
                              marginTop: 15
                            }}
                            onPress={() => { setShowDialog1(false); }}
                          />
                        </View>
                      </View>
                    </DialogContent>

                    <DialogContent style={{paddingTop:10,paddingBottom:10,}}>
                      <View style={styles.removeBox}>
                          <Text style={{ fontSize: 14,}}>
                            注意事項：
                          </Text>
                          <Text style={{ fontSize: 14, marginBottom: 5, }}>
                            1. 這將會刪除活動的資料，並同時移除所有此活動
                            {'\n'}
                            &emsp;的參加者。
                          </Text>
                          <Text style={{
                            fontSize: 14, marginBottom: 5,
                          }}
                          >
                            2. 當此活動被刪除，系統將自動發送通知給此活動
                            {'\n'}
                            &emsp;的所有參加者，讓他們知道活動已被刪除。
                          </Text>
                          <Text style={{
                            fontSize: 14, marginBottom: 5, color: '#ef4444',
                          }}
                          >
                            3. 一旦按下下方紅色刪除按鈕，即立刻執行刪除，
                            {'\n'}
                            &emsp;且無法復原！
                          </Text>
                      </View> 
                  </DialogContent>
                  <DialogContent style={{paddingLeft:0}}>
                        <View style={{
                          height: 61, 
                          width: Dimensions.get('window').width * 0.9, backgroundColor: '#f3f4f6',
                        }}
                        >
                          <View style={{flexDirection: 'row'}}>
                            <View
                              style={{ marginTop: 10 }}
                            >
                              <Text
                                style={{
                                  fontSize: 14, color: '#64748B', padding: 10, marginLeft: Dimensions.get('window').width * 0.6, 
                                  //marginTop: Dimensions.get('window').width * 0.009,
                                }}
                                onPress={() => {
                                  setShowDialog1(false);
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
                                  //marginTop: Dimensions.get('window').width * 0.009,
                                }}
                                onPress={() => {
                                  setShowDialog1(false);
                                  ActiveController.deleteOneActive(passedID);
                                  ActiveController.deleteEverySingleAttendee(passedID);
                                }}
                              >
                                刪除

                              </Text>
                            </View>
                          </View>
                        </View>
                      </DialogContent>
                </Dialog>
                {/* <Dialog
                  width={Dimensions.get('window').width * 0.9}
                  height={Dimensions.get('window').width * 0.733}
                  visible={showDialog1}
                  dialogTitle={(
                    <NativeBaseProvider>
                      <HStack>
                        <Box>
                          <Text style={{
                            textAlign: 'left',
                            color: '#1f2937',
                            fontSize: 16,
                            fontWeight: '400',
                            marginTop: 17,
                            marginBottom: 10,
                            marginLeft: 16,
                          }}
                          >
                            刪除活動&ensp;

                          </Text>
                        </Box>
                        <Feather
                          name="x"
                          size={26}
                          color="#1F2937"
                          style={{ marginLeft: Dimensions.get('window').width * 0.6, marginTop: 15 }}
                          onPress={() => { setShowDialog1(false); }}
                        />
                      </HStack>
                      <Divider style={{ marginTop: 5 }} bg="#e5e5e5" />
                      <Box style={styles.removeBox}>
                        <Box>
                          <Text style={{ fontSize: 14, marginBottom: 5, marginLeft: Dimensions.get('window').width * 0.04 }}>
                            注意事項：
                          </Text>
                          <Text style={{ fontSize: 14, marginBottom: 5, marginLeft: Dimensions.get('window').width * 0.04 }}>
                            1. 這將會刪除活動的資料，並同時移除所有此活動的
                            {'\n'}
                            &emsp;參加者。
                          </Text>
                          <Text style={{
                            fontSize: 14, marginBottom: 5, marginLeft: Dimensions.get('window').width * 0.04,
                          }}
                          >
                            2. 當此活動被刪除，系統將自動發送通知給此活動的
                            {'\n'}
                            &emsp;所有參加者，讓他們知道活動已被刪除。
                          </Text>
                          <Text style={{
                            fontSize: 14, marginBottom: 5, color: '#ef4444', marginLeft: Dimensions.get('window').width * 0.04,
                          }}
                          >
                            3. 一旦按下下方紅色刪除按鈕，即立刻執行刪除，
                            {'\n'}
                            &emsp;且無法復原！
                          </Text>
                        </Box>
                        <Box style={{
                          height: 61, width: Dimensions.get('window').width * 0.9, marginTop: 10, backgroundColor: '#f3f4f6',
                        }}
                        >
                          <HStack>
                            <Box
                              style={{ marginTop: 10 }}
                            >
                              <Text
                                style={{
                                  fontSize: 14, color: '#64748B', padding: 10, marginLeft: Dimensions.get('window').width * 0.6, marginTop: Dimensions.get('window').width * 0.009,
                                }}
                                onPress={() => {
                                  setShowDialog1(false);
                                }}
                              >
                                取消

                              </Text>
                            </Box>
                            <Box
                              style={{ marginTop: 10 }}
                            >
                              <Text
                                style={{
                                  color: '#ffffff', backgroundColor: '#ef4444', padding: 10, borderRadius: 4, marginLeft: 10, marginTop: Dimensions.get('window').width * 0.009,
                                }}
                                onPress={() => {
                                  setShowDialog1(false);
                                  ActiveController.deleteOneActive(passedID);
                                  ActiveController.deleteEverySingleAttendee(passedID);
                                }}
                              >
                                刪除

                              </Text>
                            </Box>
                          </HStack>

                        </Box>
                      </Box>
                    </NativeBaseProvider>
                          )}
                  onTouchOutside={() => {
                    setShowDialog1(false);
                  }}
                /> */}
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
                          <TouchableHighlight
                            underlayColor="transparent"
                            onPress={() => {
                              setShowDialog2(true);
                            }}
                          >
                            <Text style={styles.DeletebtnInManageText}>移除</Text>
                          </TouchableHighlight>
                          <Dialog
                            width={Dimensions.get('window').width * 0.9}
                            height={Dimensions.get('window').width * 0.57}
                            visible={showDialog2}
                            dialogTitle={(
                              <NativeBaseProvider>
                                <HStack>
                                  <Box>
                                    <Text style={{
                                      textAlign: 'left',
                                      color: '#1f2937',
                                      fontSize: 16,
                                      fontWeight: '400',
                                      marginTop: 17,
                                      marginBottom: 10,
                                      marginLeft: 5,
                                    }}
                                    >
                                      移除&ensp;
                                      {item.name}
                                    </Text>
                                  </Box>
                                  <Feather
                                    name="x"
                                    size={26}
                                    color="#1F2937"
                                    style={{ marginLeft: Dimensions.get('window').width * 0.58, marginTop: 15 }}
                                    onPress={() => { setShowDialog2(false); }}
                                  />
                                </HStack>
                                <Divider style={{ marginTop: 5 }} bg="#e5e5e5" />
                                <Box style={styles.removeBox}>
                                  <Box>
                                    <Text style={{ fontSize: 14, marginBottom: 5, marginLeft: Dimensions.get('window').width * 0.04 }}>
                                      注意事項：
                                    </Text>
                                    <Text style={{ fontSize: 14, marginBottom: 5, marginLeft: Dimensions.get('window').width * 0.04 }}>
                                      1. 這將會把
                                      {' '}
                                      {item.name}
                                      {' '}
                                      從此活動移除。
                                    </Text>
                                    <Text style={{
                                      fontSize: 14, marginBottom: 5, color: '#ef4444', marginLeft: Dimensions.get('window').width * 0.04,
                                    }}
                                    >
                                      2. 當
                                      {' '}
                                      {item.name}
                                      {' '}
                                      被移除，系統將自動發送通知給
                                      {'\n'}
                                      &emsp;
                                      {item.name}
                                      {' '}
                                      ，讓
                                      {' '}
                                      {item.name}
                                      {' '}
                                      知道自己被從活動移除。
                                    </Text>
                                  </Box>
                                  <Box style={{
                                    height: 61, width: Dimensions.get('window').width * 0.9, marginTop: 10, backgroundColor: '#f3f4f6',
                                  }}
                                  >
                                    <HStack>
                                      <Box
                                        style={{ marginTop: 10 }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: 14, color: '#64748B', padding: 10, marginLeft: Dimensions.get('window').width * 0.6, marginTop: Dimensions.get('window').width * 0.009,
                                          }}
                                          onPress={() => {
                                            setShowDialog2(false);
                                          }}
                                        >
                                          取消

                                        </Text>
                                      </Box>
                                      <Box
                                        style={{ marginTop: 10 }}
                                        onPress={() => {
                                          setShowDialog2(false);
                                          ActiveController.removeAttendee(passedID, item.studentID);
                                        }}
                                      >
                                        <Text
                                          style={{
                                            color: '#ffffff', backgroundColor: '#ef4444', padding: 10, borderRadius: 4, marginLeft: 10, marginTop: Dimensions.get('window').width * 0.009,
                                          }}
                                        >
                                          移除

                                        </Text>
                                      </Box>
                                    </HStack>

                                  </Box>
                                </Box>
                              </NativeBaseProvider>
                          )}
                            onTouchOutside={() => {
                              setShowDialog2(false);
                            }}
                          />
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
