import React, { useState, useEffect } from 'react'
import {
  Feather
} from '@expo/vector-icons'
import {
  Box, Center, HStack, Image, Pressable, Text, VStack
} from 'native-base'
import UserController from '../../../../controller/getStudentId'
import { getAuth } from 'firebase/auth'

export function Info ({ userInfo, navigation }) {
  const auth = getAuth()
  const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/ncu-app-test.appspot.com/o/avatar%2FdefaultAvatar.webp?alt=media&token=a41c5523-e38b-4c77-85d7-32a730356d57'
  const userUid = UserController.getUid()
  const [refreshing, setRefreshing] = useState(false)
  const [info, setInfo] = useState(userInfo)
  const onRefresh = () => {
    setRefreshing(true)
    UserController.getINFO(userUid).then((res) => {
      setInfo(res)
    }).catch((err) => {
      throw err
    })
    setRefreshing(false)
  }
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      onRefresh()
    })
    return focusHandler
  }, [])
  return (
    <Box marginX={2}>
        <Box alignSelf="flex-start">
            <Text fontSize="md" color={'#737373'} marginLeft={'5'} marginBottom={'2'}>個人檔案</Text>
        </Box>
        <Center>
            <Box backgroundColor="#dee9fa" w={'94%'} h={'180'} rounded={'lg'}>
                <HStack alignContent={'center'}>
                    <VStack w={'40%'} marginTop={'8'}>
                        <Center justifyContent={'center'} >
                            <Box>
                                <Image marginTop={auth.currentUser.isAnonymous ? 5 : 0} size={20} borderRadius={50} alt={'userAvatar'} source={{ uri: info.avatar ? info.avatar : defaultAvatar }} />
                            </Box>
                            {!auth.currentUser.isAnonymous && <Pressable
                                width='75px'
                                h="35px"
                                borderWidth={1}
                                borderRadius={50}
                                borderColor="#E5EBF1"
                                backgroundColor="#ffffff"
                                marginTop="15px"
                                flexDirection={'row'}
                                justifyContent={'center'}
                                onPress={() => { navigation.navigate('EditInfo', { info }) }}>
                                <Feather
                                    name="edit"
                                    size={16}
                                    color="#476685"
                                    style={{ alignSelf: 'center' }}
                                />
                                <Text fontSize="sm" textAlign="center" alignSelf={'center'}>編輯</Text>
                            </Pressable>}
                        </Center>
                    </VStack>
                    {auth.currentUser.isAnonymous ? 
                      // anonymous user
                      (<Box justifyContent={'center'} marginTop={'12'}>
                          <Text fontSize={'md'} textAlign="center" color={'#28527A'} bold >註冊後即可編輯您的個人檔案</Text>
                      </Box>) 
                      // normal user
                      : (<VStack w={'39%'} alignSelf={'flex-start'} justifyContent={'center'} marginTop={'5'}>
                        <Box flexDirection={'row'}>
                            <Text fontSize={'md'} textAlign="center" color={'#28527A'} bold >姓名</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{info.name}</Text>
                        </Box>
                        <Box w={195} flexDirection={'row'}>
                            <Text fontSize={'md'} textAlign="center" bold>系所</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{info.major}</Text>
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize={'md'} textAlign="center" bold>年級</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{info.grade}</Text>
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize="md" textAlign="center" bold>學號</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{info.studentID}</Text>
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize="md" textAlign="center" bold>電話</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{info.phone}</Text>
                        </Box>
                        <Box w={195} flexDirection={'row'}>
                            <Text fontSize="md" textAlign="center" bold>信箱</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{info.email}</Text>
                        </Box>
                    </VStack>)}
                </HStack>
            </Box>
        </Center>
    </Box>

  )
}
export default { Info }
