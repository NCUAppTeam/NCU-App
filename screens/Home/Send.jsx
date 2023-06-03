import React, { useState, useEffect, useRef } from 'react'
import {
  Text, View, SafeAreaView, Dimensions,
  ScrollView, Image, TouchableHighlight, TextInput,
  Platform, RefreshControl
} from 'react-native'
import { useKeyboard } from '@react-native-community/hooks'
import {
  FontAwesome5, AntDesign, Feather, Octicons, MaterialCommunityIcons
} from '@expo/vector-icons'
import { Card } from 'react-native-paper'
import Dialog, { DialogContent } from 'react-native-popup-dialog'
import { Box, HStack, FlatList } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'
import { getApp } from 'firebase/app'
import { onSnapshot, collection, getFirestore } from 'firebase/firestore'
import styles from './styles_folder/Styles_Message'
import MessageController from '../../controller/Message'

function Send ({ route, navigation }) {
  const scrollview = useRef()
  const [deleteMessageId, setDeleteMessageId] = useState('')
  const [slideDot1, setSlideDot1] = useState(true)
  const [slideDot2, setSlideDot2] = useState(false)
  const whenScrolling = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    if (slide === 0) {
      setSlideDot1(true)
      setSlideDot2(false)
    } else if (slide === 1) {
      setSlideDot1(false)
      setSlideDot2(true)
    }
  }
  const [showDialog, setShowDialog] = useState(false)
  const { userAvatar } = route.params
  const { attendeeName } = route.params
  const { attendeeAvatar } = route.params
  const { chatroomId } = route.params
  const { userUid } = route.params
  const keyboard = useKeyboard()
  const [data, setData] = useState({
    id: chatroomId,
    sender: userUid
  })

  const db = getFirestore(getApp())
  const dbRef = collection(db, `chatrooms/${chatroomId}/messages`)

  // const [time, setTime] = useState();
  const [getData, setGetData] = useState([])

  useEffect(() => {
    MessageController.readMessage(userUid, chatroomId)
    onSnapshot(dbRef, (docsSnap) => {
      const message = []
      docsSnap.forEach((doc) => {
        message.push({
          messageid: doc.id,
          data: doc.data().data,
          type: doc.data().type,
          sendTime: doc.data().sendTime,
          sender: doc.data().sender
        })
      })
      message.sort((a, b) => a.sendTime - b.sendTime)
      setGetData(message)
    })
    scrollview.current.scrollToEnd({ animated: true })
  }, [])
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    onSnapshot(dbRef, (docsSnap) => {
      const message = []
      docsSnap.forEach((doc) => {
        message.push({
          messageid: doc.id,
          data: doc.data().data,
          type: doc.data().type,
          sendTime: doc.data().sendTime,
          sender: doc.data().sender
        })
      })
      message.sort((a, b) => a.sendTime - b.sendTime)
      setGetData(message)
    })
    scrollview.current.scrollToEnd({ animated: true })
    setRefreshing(false)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) {
      MessageController.addMessage({
        ...data,
        uri: result.assets[0].uri,
        sendTime: new Date(),
        type: 'image'
      })

      scrollview.current.scrollToEnd({ animated: true })
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <LinearGradient
        colors={['#1784B2', '#476685']}
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
                onPress={() => { navigation.navigate('hmessage') }}
              />
              <Image
                style={styles.sendAvatar}
                source={{
                  uri: attendeeAvatar
                }}
              />
              <Text style={styles.sendPeople}>
                    &ensp;
                {attendeeName}
              </Text>
            </HStack>
          </Box>
          <Box style={{ flex: 5 }} />
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
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
          data={getData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ref={scrollview}
          onContentSizeChange={() => scrollview.current.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <Box style={styles.sendArea}>
              {/* per day 的 時間顯示還做不出來 */}
              {/* <Box>
                  <Text>{MessageController.toDateString(item.sendTime)}</Text>
                </Box> */}
              <Box
                style={[
                  item.sender === userUid && { alignItems: 'flex-end' },
                  item.sender !== userUid && { alignItems: 'flex-start' }
                ]}
              >
                <Box
                  style={[
                    item.sender === userUid && { flexDirection: 'row' },
                    item.sender !== userUid && { flexDirection: 'row-reverse' }
                  ]}
                >
                  {item.sender === userUid && (
                    <Box style={{ alignSelf: 'flex-end' }}>
                      <Text style={{ fontSize: 9, marginRight: 5 }}>
                        {MessageController.getHoursMin(item.sendTime)}
                      </Text>
                    </Box>
                  )}
                  <Box style={{ maxWidth: 180 }}>
                    <HStack>
                      <Card
                        key={item.messageid}
                        style={{ backgroundColor: '#E5EBF1', borderRadius: 10 }}
                        onLongPress={() => {
                          setShowDialog(true)
                          setDeleteMessageId(item.messageid)
                        }}
                      >
                        <Dialog
                          width={Dimensions.get('window').width * 0.6}
                          height={Dimensions.get('window').width * 0.485}
                          visible={showDialog}
                          overlayBackgroundColor="transparent"
                          onTouchOutside={() => {
                            setShowDialog(false)
                          }}
                        >
                          <DialogContent style={{
                            paddingBottom: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: '#e5e5e5'
                          }}
                            >
                              <View style={{
                                flexDirection: 'row',
                                paddingBottom: 5,
                                justifyContent: 'center'
                              }}
                              >
                                <View style={styles.unsentTitle}>
                                  <Text style={{
                                    color: '#1f2937',
                                    fontSize: 17,
                                    fontWeight: '400'
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
                                backgroundColor: '#f3f4f6'
                              }}
                              >
                                <View style={{ flexDirection: 'row' }}>
                                  <View
                                    style={{ marginTop: 10 }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 14, color: '#64748B', padding: 10, marginLeft: Dimensions.get('window').width * 0.3
                                      }}
                                      onPress={() => {
                                        setShowDialog(false)
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
                                        color: '#ffffff', backgroundColor: '#ef4444', padding: 10, borderRadius: 4, marginLeft: 10
                                      }}
                                      onPress={() => {
                                        MessageController.deleteMessage(chatroomId, deleteMessageId)
                                          .then(() => {
                                            setShowDialog(false)
                                          })
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
                          paddingHorizontal: 10
                        }}
                        >

                          {item.type === 'text'
                            ? (
                                <Text style={{ marginTop: 6, fontSize: 14 }}>
                                  {item.data}
                                </Text>
                              )
                            : (
                                <Image
                                  style={{ height: 150, width: 150, marginTop: 6 }}
                                  source={{
                                    uri: item.data
                                  }}
                                />
                              )}
                        </Card.Content>
                      </Card>
                      {item.sender !== userUid && (
                      <Box style={{ alignSelf: 'flex-end' }}>
                        <Text style={{ fontSize: 9, marginLeft: 5 }}>
                              {MessageController.getHoursMin(item.sendTime)}
                            </Text>
                      </Box>
                      )}
                    </HStack>
                  </Box>
                  <Box style={{ marginHorizontal: 12, alignSelf: 'center' }}>
                    {item.sender === userUid
                      ? (
                        <Image
                          style={{ height: 36, width: 36, borderRadius: 18 }}
                          source={{
                            uri: userAvatar
                          }}
                        />
                        )
                      : (
                        <Image
                          style={{ height: 36, width: 36, borderRadius: 18 }}
                          source={{
                            uri: attendeeAvatar
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
                  data.sendTime = new Date()
                  MessageController.addMessage({
                    ...data, data: '請問有什麼需要注意的嗎？', sendTime: data.sendTime, type: 'text'
                  })
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
                  data.sendTime = new Date()
                  MessageController.addMessage({
                    ...data, data: '請問有需要自行準備的東西嗎？', sendTime: data.sendTime, type: 'text'
                  })
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
              color="#476685"
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
              value={data.data}
              onChangeText={(text) => {
                setData({ ...data, data: text })
              }}
              selectionColor="#ccc"
            />
          </Box>
          <Box style={styles.sendIcon}>
            <Octicons
              name="paper-airplane"
              size={26}
              color="#476685"
              onPress={() => {
                if (data.data !== '') {
                  data.sendTime = new Date()
                  data.type = 'text'
                  MessageController.addMessage(data)
                  setData({ ...data, data: '' })
                }
              }}
            />
          </Box>
        </Box>
      </Box>

    </SafeAreaView>
  )
}
export default Send
