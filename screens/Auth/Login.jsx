import React, { useState } from 'react'

import {
  Box, Button, Heading, Input, Actionsheet, useDisclose, Center, VStack, Pressable, Icon, Link, HStack, Text
} from 'native-base'
import { signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth'
import { auth } from '../../config'
import { MaterialIcons } from '@expo/vector-icons'
import { ResetScreen } from './ResetPwd'
import { Alert } from 'react-native'

export function LoginScreen () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [msg, setMsg] = useState('')
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose()
  const localizeMsg = {
    'auth/too-many-requests': '登入過於頻繁, 請稍後再試',
    'auth/wrong-password': '密碼錯誤, 請確認後再登入',
    'auth/user-not-found': '找不到使用者'
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      console.log(getAuth().currentUser.emailVerified)
      if(getAuth().currentUser.emailVerified) {
        console.log('login success')
      }
      else {
        signOut(auth).then(() => {
          Alert.alert('請至信箱驗證信件或是完成註冊')
        })
      } 
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      setMsg(localizeMsg[errorCode] || errorMessage)
    })
  }

  return (
    <Center>
      <Button backgroundColor={'#28527A'} w={'100%'} marginY={'10px'} isExternal _text={{ fontSize: 'lg', fontWeight: 'bold', color: '#ffffff' }} onPress={onOpen}>登入</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack w={'100%'} h={'100%'} marginX={10} alignItems={'center'}>
            <Box flex={0.1}/>
            <Box flex={1.5} alignItems="flex-start" justifyContent={'center'} w={'80%'}>
              <Heading size={'lg'} marginY={'20px'}>登入帳號</Heading>

              <Heading size={'sm'} marginBottom={'10px'}>註冊時使用之信箱</Heading>
              <Box my={3}>
                <Input
                  w={'100%'}
                  py={2}
                  size="md"
                  placeholder="學號@cc.ncu.edu.tw"
                  alignSelf={'center'}
                  wx="100%"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Box>

              <Heading size={'sm'} marginY={'10px'}>密碼</Heading>
                <Box mt={3}>
                  <Input
                    w={'100%'}
                    p={2}
                    size="md"
                    placeholder="Password"
                    wx="100%"
                    alignSelf={'center'}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    type={showPwd ? 'text' : 'password'}
                    InputRightElement={
                    <Pressable onPress={() => setShowPwd(!showPwd)}>
                      <Icon as={<MaterialIcons name={showPwd ? 'visibility' : 'visibility-off'} />} size={6} mr="2" color="muted.500" />
                    </Pressable>}
                  />
                </Box>
                <Text color={'red.500'}>{ msg }</Text>

                <HStack my={2}>
                  <ResetScreen />
                  <Pressable>
                    <Link onPress={() => { onClose() }} ml="10px" isExternal _text={{
                      fontSize: '16',
                      color: '#737373'
                    }}>尚未註冊?
                    </Link>
                  </Pressable>
                </HStack>

              {email && password && (
                <Box
                bg={{
                  linearGradient: {
                    colors: ['#28527A', '#1784B2'],
                    start: [0, 0],
                    end: [1, 0]
                  }
                }}
                w={'80%'}
                h={'43px'}
                justifyContent={'center'}
                alignSelf={'center'}
                borderRadius={'100px'}
                mt='19px'>
                <Pressable
                  onPress={login}>
                  <Text fontSize={'lg'} fontWeight={'bold'} color={'#fbeeac'}
                        textAlign={'center'} >
                      登入
                  </Text>
                  </Pressable>
                </Box>
              )}
              {(!email || !password) && (
                <Button
                  width={'80%'}
                  borderRadius={'100px'}
                  alignSelf={'center'}
                  backgroundColor={'#D4D4D4'}
                  _text={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    fontSize: 'lg',
                    fontWeight: 'bold',
                    color: '#737373'
                  }}
                >
                  登入
                </Button>
              )}
            </Box>
            <Box flex={1} h={'100%'}/>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  )
}
