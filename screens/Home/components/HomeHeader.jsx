import React, { useState } from 'react'
import {
  Pressable, Text, Image
} from 'react-native'

import {
  FontAwesome5, AntDesign, Feather, Octicons, Ionicons
} from '@expo/vector-icons'
import {
  Box, ZStack, HStack, Center, Input, Icon
} from 'native-base'
import styles from '../Styles'
import UserController from '../../../controller/getStudentId'
import MessageController from '../../../controller/Message'

export function HomeHeader ({ navigation }) {
  const [Messagenum, setMessageNum] = useState(0)
  const [userInfo, setUserInfo] = useState({})
  const userUid = UserController.getUid()

  MessageController.countUnreadMessage(userUid).then((num) => {
    setMessageNum(num)
  }).catch((err) => {
    throw err
  })

  UserController.getINFO(userUid).then((res) => {
    setUserInfo(res)
  }).catch((err) => {
    throw err
  })

  return (
    <Box safeArea style={styles.topHomePage}>
          <Box style={styles.topLeftRight}>
            <Image
              style={styles.avatar}
              source={{
                uri: userInfo.avatar
              }}
            />
            <Box style={styles.topGreet}>
              <Text style={styles.topTextGreet}>早安,</Text>
              <Text style={styles.topTextName}>{userInfo.name}</Text>
            </Box>
          </Box>
          <Pressable
            onPress={() => { navigation.navigate('message', { prepage: 'list' }) }}
          >
            <Center>
              <ZStack size={25} ml={3} alignItems="center" justifyContent="center">
                <Box>
                  <Octicons
                    name="dot-fill"
                    size={16}
                    color={Messagenum !== 0 ? '#EB6F6F' : 'transparent'}
                    style={{
                      transform: [{ translateX: 12 }, { translateY: -10 }]
                    }}
                  />
                </Box>
                <Box>
                  <FontAwesome5
                    name="comment"
                    size={25}
                    color="#28527A"
                  />
                </Box>
              </ZStack>
            </Center>
          </Pressable>
          <Center style={styles.topLeftRight}>
            <Ionicons
              name="settings-outline"
              size={25}
              style={{ fontWeight: 'bold' }}
              color="#28527A"
              onPress={() => {
                navigation.navigate('settings', {
                  userInfo
                })
              }}
            />
          </Center>
        </Box>
  )
}
export default { HomeHeader }
