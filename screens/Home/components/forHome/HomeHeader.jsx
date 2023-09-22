import React, { useState, useEffect } from 'react'
import {
  Pressable, Text, Image
} from 'react-native'

import {
  FontAwesome5, Octicons, Ionicons
} from '@expo/vector-icons'
import {
  Box, ZStack, Center
} from 'native-base'
import styles from '../../styles_folder/Styles'
import UserController from '../../../../controller/getStudentId'
import MessageController from '../../../../controller/Message'

export function HomeHeader ({ navigation }) {
  const [Messagenum, setMessageNum] = useState(0)
  const [userInfo, setUserInfo] = useState({})
  const userUid = UserController.getUid()
  const hr = new Date().getHours()
  const [greetText, setGreetText] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
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
    setRefreshing(false)
  }

  useEffect(() => {
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

    if (hr >= 0 && hr <= 4) {
      setGreetText('凌晨了, 還沒睡嗎? 加油! 💪')
    } else if (hr > 4 && hr <= 10) {
      setGreetText('早安, 祝你有個美好的一天🔅')
    } else if (hr > 10 && hr <= 13) {
      setGreetText('午安, 小睡片刻吧💤')
    } else if (hr > 13 && hr <= 17) {
      setGreetText('下午好, 吃個點心吧!🍩')
    } else if (hr > 17 && hr <= 23) {
      setGreetText('晚安, 祝你有個好夢~🥱')
    }

    const focusHandler = navigation.addListener('focus', () => {
      onRefresh()
    })
    return focusHandler
  }, [])

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
            <Text style={styles.topTextGreet}>{greetText}</Text>
            <Text style={styles.topTextName}>{userInfo.name}</Text>
          </Box>
      </Box>
      <Center style={styles.topLeftRight}>
          <Pressable onPress={() => { navigation.navigate('hmessage', { prepage: 'homepage' }) }}>
            <ZStack size={'25'} ml={'3'} alignItems="center" justifyContent="center">
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
          </Pressable>
            <Ionicons
              name="settings-outline"
              size={25}
              style={{ fontWeight: 'bold', marginLeft: 18 }}
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
