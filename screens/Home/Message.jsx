import React, { useState, useEffect } from 'react'
import {
  Text, RefreshControl, Image
} from 'react-native'
import { Card } from 'react-native-paper'
import { FontAwesome5, AntDesign, Octicons } from '@expo/vector-icons'

import {
  NativeBaseProvider, Box, VStack, HStack, FlatList, ZStack, Pressable
} from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles_folder/Styles_Message'
import MessageController from '../../controller/Message'
import UserController from '../../controller/getStudentId'
import { BaseTheme } from '../../theme'

function Message ({ navigation }) {
  const userUid = UserController.getUid()
  const [userAvatar, setUserAvatar] = useState()
  const [newInfo, setNewInfo] = useState()

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    UserController.getINFO(userUid).then((res) => {
      setUserAvatar(res.avatar)
    }).catch((err) => {
      throw err
    })
    MessageController.findRelateChatroom(userUid).then((res) => {
      setNewInfo(res)
    }).catch((err) => {
      throw err
    })
    setRefreshing(false)
  }

  useEffect(() => {
    UserController.getINFO(userUid).then((res) => {
      setUserAvatar(res.avatar)
    }).catch((err) => {
      throw err
    })
    MessageController.findRelateChatroom(userUid).then((res) => {
      setNewInfo(res)
    }).catch((err) => {
      throw err
    })
    const focusHandler = navigation.addListener('focus', () => {
      onRefresh()
    })
    return focusHandler
  }, [])
  return (
    <Box safeArea style={styles.container}>

        <LinearGradient
          colors={['#1784B2', '#476685']}
          start={[1, 2]}
          end={[1, 0]}
        >
          <HStack style={styles.header}>
            <Pressable style={styles.headerArrowBox}>
              {/* <AntDesign
                name="arrowleft"
                size={28}
                color="#fff"
                onPress={() => { navigation.navigate('homepage') }}
              /> */}
            </Pressable>
            <Box style={styles.title}>
              <FontAwesome5
                name="comment"
                size={25}
                color="#fff"
                style={{ height: 40 }}
              >
                <Text>&ensp;私訊中心</Text>
              </FontAwesome5>
            </Box>
            <Box style={{ flex: 1 }} />
          </HStack>
        </LinearGradient>
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
                  navigation.navigate('hsend', {
                    userAvatar,
                    attendeeName: item.name,
                    attendeeAvatar: item.avatar,
                    chatroomId: item.id,
                    userUid
                  })
                }}
              >
                <ZStack>
                  <HStack>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: item.avatar
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

    </Box>
  )
}
export default Message
