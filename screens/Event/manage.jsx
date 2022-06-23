import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, TextInput, RefreshControl,
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
  // console.log('123', JSON.stringify(Cd).slice(6, -1));
  const [active, setActive] = useState([]);
  useEffect(() => {
    ActiveController.getOneActive(JSON.stringify(Cd).slice(7, -2)).then((res) => {
      setActive(res);
      console.log(active);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    // ActiveController.getAllAttendees().then((res) => {
    //   setActive(res);
    //   setRefreshing(false);
    // });
    setRefreshing(false);
  };

  const [message, messageSent] = useState('');
  const attendees = 1; // 測試用
  const attendeeINFO = [{
    signupindex: '#001',
    fullName: 'David Henrie',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    department: '資訊工程學系',
    grade: '一',
  }, {
    signupindex: '#002',
    fullName: 'Sujitha Mathur',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
    department: '資訊管理學系',
    grade: '三',
  }, {
    signupindex: '#003',
    fullName: 'Anci Barroco',
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
    department: '大氣科學系',
    grade: '二',
  }, {
    signupindex: '#004',
    fullName: 'Anci Barroco',
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
    department: '物理學系',
    grade: '二',
  }, {
    signupindex: '#005',
    fullName: 'Sujitha Mathur',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
    department: '文學院學士班',
    grade: '三',
  },

  ];

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
                    navigation.navigate('edit', { Cd: active.id });
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {active.map(({
              name, limitNum,
            }) => (
              <Box style={{ marginTop: 20, marginHorizontal: 8 }}>
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
                    start={[0.1203, 0.6497, 0.9972]}
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
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        目前人數：
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        style={attendees >= limitNum
                          ? styles.reachLimitNum
                          : styles.underLimitNum}
                      >
                        {attendees}
                        {' '}
                        /
                        {' '}
                        {limitNum}
                        人
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>
            ))}

            <View style={{ flex: 1 }}>
              <Box style={styles.participantsBox}>
                <FlatList
                  data={attendeeINFO}
                  keyExtractor={(item) => item.signupindex}
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
                            uri: item.avatarUrl,
                          }}
                        />
                        <VStack>
                          <Title style={styles.signupIndex}>
                            {item.signupindex}
                          </Title>
                          <Text>
                            {item.fullName}
                          </Text>
                          <HStack>
                            <Text style={{ textAlign: 'left' }}>
                              {item.department}
                            </Text>
                            <Text style={{ textAlign: 'right' }}>
                              {item.grade}
                              年級
                            </Text>
                          </HStack>
                        </VStack>
                        <HStack style={{ alignContent: 'flex-end' }}>
                          <Box style={styles.DeletebtnInManage}>
                            <TouchableHighlight>
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
              </Box>
            </View>

          </View>

        </NativeBaseProvider>
      </SafeAreaView>
    </Provider>
  );
}

export default manage;
