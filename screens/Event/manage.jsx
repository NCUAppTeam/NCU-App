/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import {
  Text, TextInput, RefreshControl,
  ScrollView, TouchableOpacity, Image, TouchableHighlight
} from 'react-native'

import Dialog, { DialogContent } from 'react-native-popup-dialog'
import { AntDesign, Feather } from '@expo/vector-icons'
import {
  Box, Divider, Heading, VStack, HStack, FlatList, NativeBaseProvider, Pressable, Button,
} from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import ActiveController from '../../controller/Active'
import MessageController from '../../controller/Message'
import UserController from '../../controller/getStudentId'
import styles from './style_folder/Styles_manage'

function Manage ({ route, navigation }) {
  const [user, setUser] = useState('')
  const [deletePerson, setDeletePerson] = useState({})
  const [showDialog1, setShowDialog1] = useState(false)
  const [showDialog2, setShowDialog2] = useState(false)
  const Cd = route.params
  const passedID = JSON.stringify(Cd).slice(7, -2)
  const [message, messageSent] = useState('')
  const [active, setActive] = useState([])
  const [attendeeINFO, setAttendeeInfo] = useState()
  const [closeEvent, setCloseEvent] = useState()

  useEffect(() => {
    setUser(UserController.getUid())
    ActiveController.getOneActive(passedID).then((res) => {
      setActive(res)
      setCloseEvent(res[0].CloseEvent)
    }).catch((err) => {
      throw err
    })
    ActiveController.getAllAttendees(passedID).then((res) => {
      setAttendeeInfo(res)
    }).catch((err) => {
      throw err
    })
  }, [])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    setUser(UserController.getUid())
    ActiveController.getOneActive(passedID).then((res) => {
      setActive(res)
      setCloseEvent(res[0].CloseEvent)
    }).catch((err) => {
      throw err
    })
    ActiveController.getAllAttendees(passedID).then((res) => {
      setAttendeeInfo(res)
    }).catch((err) => {
      throw err
    })
    setRefreshing(false)
  }

  return (
    <Box safeArea style={styles.container}>
      <Box style={styles.headerContainer}>
        <Box style={styles.headerArrowBox}>
          <AntDesign
            name="arrowleft"
            size={28}
            color="#476685"
            style={{ justifyContent: 'center' }}
            onPress={() => { navigation.navigate('personal') }}
          />
        </Box>
        <Box style={styles.nameheader}>
          <Text style={styles.name}>
            管理活動
          </Text>
        </Box>
        <Box style={styles.headerDeleteView}>
          <Feather
            name="trash-2"
            size={25}
            color="#476685"
            onPress={() => {
              setShowDialog1(true)
            }}
          />
          <Dialog
            width={360}
            height={285}
            visible={showDialog1}
            onTouchOutside={() => {
              setShowDialog1(false)
            }}
          >
            <NativeBaseProvider>
              <DialogContent>
                <Box style={styles.DeleteTitle}>
                  <Box>
                    <Text style={styles.DeleteTitleText}>
                      刪除活動&ensp;
                    </Text>
                  </Box>
                  <Box>
                    <Feather
                      name="x"
                      size={26}
                      color="#1F2937"
                      style={{
                        marginTop: 15
                      }}
                      onPress={() => { setShowDialog1(false) }}
                    />
                  </Box>
                </Box>
                <Divider my={2} bg="#bfbebe" w="100%" />
                <Box style={styles.removeBox}>
                  <Text style={styles.textSetting1}>
                    注意事項：
                  </Text>
                  <Text style={styles.textSetting2}>
                    1. 這將會刪除活動的資料，並同時移除所有此活動
                    {'\n'}
                            &emsp;的參加者。
                  </Text>
                  <Text style={styles.textSetting2}>
                    2. 當此活動被刪除，系統將自動發送通知給此活動
                    {'\n'}
                            &emsp;的所有參加者，讓他們知道活動已被刪除。
                  </Text>
                  <Text style={[styles.textSetting2, { color: '#ef4444' }]}>
                    3. 一旦按下下方紅色刪除按鈕，即立刻執行刪除，
                    {'\n'}
                            &emsp;且無法復原！
                  </Text>
                </Box>

              </DialogContent>
              <Box style={styles.DeleteDialogBottom}>
                <Box
                  style={{ marginTop: 10, marginRight: 10 }}
                >
                  <Text
                    style={{
                      fontSize: 14, color: '#64748B', padding: 10
                    }}
                    onPress={() => {
                      setShowDialog1(false)
                    }}
                  >
                    取消

                  </Text>
                </Box>
                <Box
                  style={{
                    marginTop: 10, backgroundColor: '#ef4444', borderRadius: 4, marginRight: 10
                  }}
                >
                  <Text
                    style={{
                      color: '#ffffff', padding: 10
                    }}
                    onPress={() => {
                      setShowDialog1(false)
                      ActiveController.deleteEverySingleAttendee(passedID)
                      ActiveController.deleteOneActive(passedID)
                    }}
                  >
                    刪除

                  </Text>
                </Box>
              </Box>
            </NativeBaseProvider>
          </Dialog>
        </Box>
        <Box style={styles.headerEditView}>
          <Feather
            name="edit"
            size={24}
            color="#476685"
            onPress={() => {
              navigation.navigate('edit', { Cd: passedID })
            }}
          />
        </Box>
      </Box>
      <Box style={styles.bodyContainer}>
        {active.map(({
          id, name, limitNum, totalAttendee
        }) => (
          <Box key={id} style={{ marginTop: 20, marginHorizontal: 8 }}>
            <HStack>
              <Heading>{name}</Heading>
              {closeEvent
                ? (<Button
                    rounded={'lg'}
                    ml={2}
                    bgColor={'#25a158'}
                    onPress={() => {
                      ActiveController.openEvent(passedID).then(() => {
                        setCloseEvent(false)
                      }).catch((err) => {
                        throw err
                      })
                      onRefresh()
                    }}
                  >
                  <Text style={{ fontSize: 16, color: '#ffffff' }}>重新開啟報名</Text>

                </Button>)
                : (<Button
                  rounded={'lg'}
                  ml={2}
                  bgColor={'#db1d26'}
                  onPress={() => {
                    ActiveController.closeEvent(passedID).then(() => {
                      setCloseEvent(true)
                    }).catch((err) => {
                      throw err
                    })
                    onRefresh()
                  }}
                >
                <Text style={{ fontSize: 16, color: '#ffffff' }}>關閉報名</Text>

              </Button>)}
            </HStack>
            <Divider my={2} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
            <Box style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>發送通知</Text>
              <TextInput
                style={styles.messageBox}
                multiline
                placeholder="在這裡輸入的訊息，將以私訊的方式發送給所有參加者"
                value={message}
                onChangeText={(text) => messageSent(text)}
                selectionColor="#ccc"
              />

              <LinearGradient
                colors={['#1784B2', '#1D74A0', '#476685']}
                start={[0.6497, 0.9972]}
                end={[0.1203, 0.6497]}
                style={styles.manageSendMessagebtn}
              >
                <Pressable
                  onPress={() => {
                    MessageController.Notification(message, passedID).then(() => {
                      messageSent('')
                    }).catch((err) => {
                      throw err
                    })
                    onRefresh()
                  }}
                >
                  <Text style={styles.manageSendMessagebtnText}>發送給所有參與者</Text>
                </Pressable>
              </LinearGradient>
            </Box>
            <Divider marginTop={3} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
            <Box>
              <HStack style={{ justifyContent: 'space-between' }}>
                <Box>
                  <Text style={{
                    fontSize: 18, color: 'black', marginTop: 10, fontWeight: 'bold'
                  }}
                  >
                    參加名單
                  </Text>
                </Box>

                <Box>
                  {limitNum !== '0' && (
                  <HStack>
                    <Text style={{
                      fontSize: 18, color: 'black', marginTop: 10, fontWeight: 'bold'
                    }}
                    >
                      目前人數：
                    </Text>
                    <Text style={totalAttendee >= limitNum
                      ? styles.reachLimitNum
                      : styles.underLimitNum}
                    >
                      {totalAttendee}
                      &ensp;
                      /
                      {' '}
                      {limitNum}
                      {' '}
                      人
                    </Text>
                  </HStack>
                  )}
                  {limitNum === '0' && (
                  <HStack>
                    <Text style={{
                      fontSize: 18, color: 'black', marginTop: 10, fontWeight: 'bold'
                    }}
                    >
                      目前人數：
                    </Text>
                    <Text style={styles.NoLimitNum}>
                      {totalAttendee}
                      &ensp;

                      (無上限)
                    </Text>
                  </HStack>
                  )}
                </Box>
              </HStack>
            </Box>
          </Box>
        ))}

        <Box style={{ flex: 1 }}>
          <FlatList
            data={attendeeINFO}
            keyExtractor={(item) => item.uid}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
                  )}
            renderItem={({ item }) => (
              <ScrollView showsVerticalScrollIndicator={false}>
                <HStack style={styles.cardForAttendees}>
                  <Box>
                    <HStack>
                      <Image
                        style={styles.avatar}
                        source={{
                          uri: item.avatar
                        }}
                      />
                      <VStack style={{ alignSelf: 'center' }}>
                        {/* <Title style={styles.signupIndex}>
                              {item.signupindex}
                            </Title> */}
                        <Text style={{ fontWeight: '700', fontSize: 16 }}>
                          {(item.name.length < 9) ? item.name : `${item.name.substring(0, 7)}...`}
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
                    </HStack>
                  </Box>
                  <HStack style={styles.manageBtn}>
                    <Box style={styles.DeletebtnInManage}>
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => {
                          setShowDialog2(true)
                          setDeletePerson({ studentID: item.uid, name: item.name })
                        }}
                      >
                        <Text style={styles.DeletebtnInManageText}>移除</Text>
                      </TouchableHighlight>
                      <Dialog
                        width={358}
                        height={240}
                        visible={showDialog2}
                        onTouchOutside={() => {
                          setShowDialog2(false)
                        }}
                      >
                        <NativeBaseProvider>
                          <DialogContent>
                            <Box style={styles.RemoveDialog}>
                              <Box>
                                <Text style={styles.RemoveDialogTitle}>
                                  移除&ensp;
                                  {deletePerson.name}
                                </Text>
                              </Box>
                              <Feather
                                name="x"
                                size={26}
                                color="#1F2937"
                                style={{
                                  marginTop: 15
                                }}
                                onPress={() => { setShowDialog2(false) }}
                              />
                            </Box>
                            <Divider style={{ marginTop: 5 }} bg="#e5e5e5" />
                            <Box>
                              <Box style={styles.removeBox2}>
                                <Box style={{
                                  paddingTop: 10, paddingBottom: 10
                                }}
                                >
                                  <Text style={styles.textSetting2}>
                                    注意事項：
                                  </Text>
                                  <Text style={styles.textSetting2}>
                                    1. 這將會把
                                    {' '}
                                    {deletePerson.name}
                                    {' '}
                                    從此活動移除。
                                  </Text>
                                  <Text style={[styles.textSetting2, { color: '#ef4444', width: 350 }]}>
                                    2. 當
                                    {' '}
                                    {deletePerson.name}
                                    {' '}
                                    被移除，系統將自動發送通知給
                                    {' '}
                                    {deletePerson.name}
                                    {' '}
                                    ，
                                    {'\n'}
                                    {'    '}
                                    {deletePerson.name}
                                    {' '}
                                    將知道自己被從活動移除。
                                  </Text>
                                </Box>
                              </Box>
                            </Box>

                          </DialogContent>
                          <Box style={styles.removeDialogBottom}>
                            <Box
                              style={{ marginTop: 10, marginRight: 10 }}
                            >
                              <Text
                                style={{
                                  fontSize: 14, color: '#64748B', padding: 10
                                }}
                                onPress={() => {
                                  setShowDialog2(false)
                                }}
                              >
                                取消
                              </Text>
                            </Box>
                            <Box
                              style={{
                                marginTop: 10, marginRight: 15, backgroundColor: '#ef4444', borderRadius: 4
                              }}
                            >
                              <Text
                                style={{
                                  color: '#ffffff', padding: 10
                                }}
                                onPress={() => {
                                  setShowDialog2(false)
                                  ActiveController.removeAttendee(passedID, deletePerson.studentID)
                                  ActiveController.getOneActive(passedID).then((event) => {
                                    MessageController.addMessage({
                                      message: `以下為自動寄出的訊息：你已被移出【${event[0].name}】的參加名單, 有任何問題請與活動負責人聯繫`,
                                      send: user,
                                      receive: deletePerson.studentID,
                                      sendTime: new Date(),
                                      readForSender: true,
                                      readForReceiver: false,
                                      image: ''
                                    }, user)
                                  })
                                }}
                              >
                                移除

                              </Text>
                            </Box>
                          </Box>
                        </NativeBaseProvider>
                      </Dialog>
                    </Box>
                    <Box style={styles.MessagebtnInManage}>
                      <TouchableHighlight>
                        <Text
                          style={styles.MessagebtnInManageText}
                          onPress={() => {
                            MessageController.addChatroom(item.uid, user).then((res) => {
                              navigation.navigate('send', {
                                chatroomId: res,
                                attendeeUid: item.uid,
                                userUid: user
                              })
                            })
                          }}
                        >
                          私訊
                        </Text>
                      </TouchableHighlight>
                    </Box>
                  </HStack>
                </HStack>
              </ScrollView>
            )}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Manage
