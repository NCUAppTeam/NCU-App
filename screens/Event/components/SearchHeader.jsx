import React, { useState, useEffect } from 'react'
import {
  Pressable
} from 'react-native'

import {
  FontAwesome5, AntDesign, Feather, Octicons
} from '@expo/vector-icons'
import {
  Box, ZStack, HStack, Center, Input, Icon
} from 'native-base'
import MessageController from '../../../controller/Message'
import UserController from '../../../controller/getStudentId'
import { getAuth } from 'firebase/auth'

export function SearchHeader ({ navigation }) {
  const auth = getAuth()
  const [Messagenum, setMessageNum] = useState(0)
  const userid = UserController.getUid()

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    MessageController.countUnreadMessage(userid).then((num) => {
      setMessageNum(num)
    }).catch((err) => {
      throw err
    })
    setRefreshing(false)
  }

  useEffect(() => {
    MessageController.countUnreadMessage(userid).then((num) => {
      setMessageNum(num)
    }).catch((err) => {
      throw err
    })
    const focusHandler = navigation.addListener('focus', () => {
      onRefresh()
    })
    return focusHandler
  }, [navigation])
  return (
    <Center m={4}>
      <HStack width="100%" alignItems="center" justifyContent="center">
        <Pressable
          onPress={() => { navigation.navigate('search') }}
          flex={1}
        >
          <Center>
            <Input
              placeholder="搜尋"
              size="lg"
              variant="filled"
              height="40px"
              borderRadius="10"
              bg="#E5EBF1"
              py="1"
              px="2"
              InputLeftElement={<Icon ml="2" size="6" as={AntDesign} name="search1" color="#476685" />}
              pointerEvents="none"
              isReadOnly
              onPress={() => { navigation.navigate('search') }}
            />
          </Center>
        </Pressable>
        
        {!auth.currentUser.isAnonymous && <><Pressable
          onPress={() => { navigation.navigate('message', { prepage: 'list' }) } }
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
                  }} />
              </Box>
              <Box>
                <FontAwesome5
                  name="comment"
                  size={25}
                  color="#476685" />
              </Box>

              {/* // 要記得變0 */}
            </ZStack>
          </Center>
        </Pressable><Pressable
          onPress={() => { navigation.navigate('personal') } }
        >
            <Box size={26} mx={3}>
              <Feather
                name="user"
                size={26}
                color="#476685" />
            </Box>
          </Pressable></>}
      </HStack>
    </Center>
  )
}
export default { SearchHeader }
