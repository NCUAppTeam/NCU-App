import React, { useState } from 'react'

import {
  Box, Button, Heading, Input, Actionsheet, useDisclose, Center, VStack, Pressable, Icon, Link, HStack, Text
} from 'native-base'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'
import { MaterialIcons } from '@expo/vector-icons'

export function LoginScreen () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [msg, setMsg] = useState()
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose()
  const localizeMsg = {
    'auth/invalid-email': '電子郵件無效',
    'auth/user-not-found': '找不到使用者'
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        setMsg(localizeMsg[err.code])
      })
  }

  return (
    <Center>
      <Button backgroundColor={'#28527A'} w={'100%'} marginY={'10px'} isExternal _text={{ fontSize: 'lg', fontWeight: 'bold', color: '#ffffff' }} onPress={onOpen}>登入</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack w={'100%'} h={'100%'}>
            <Box flex={0.1}/>
            <Box flex={1.5} alignItems="flex-start" justifyContent={'center'}>
              <Heading marginX={'40px'} marginY={'20px'}>登入帳號</Heading>

              <Heading size={'xs'} marginX={'40px'} marginBottom={'20px'}>Portal 帳號</Heading>
              <Input w={'80%'} mx="3" alignSelf={'center'} placeholder="學號@cc.ncu.edu.tw" wx="100%" onChangeText={(text) => setEmail(text)} />

              <Heading size={'xs'} marginX={'40px'} marginY={'20px'}>密碼</Heading>
                <Box width={'100%'}>
                <Input
                  w={'80%'}
                  mx="3"
                  placeholder="密碼"
                  wx="100%"
                  alignSelf={'center'}
                  onChangeText={(text) => setPassword(text)}
                  type={showPwd ? 'text' : 'password'}
                  InputRightElement={
                  <Pressable onPress={() => setShowPwd(!showPwd)}>
                    <Icon as={<MaterialIcons name={showPwd ? 'visibility' : 'visibility-off'} />} size={5} mr="2" color="muted.400" />
                  </Pressable>}/>
                </Box>
                <Text color={'amber.400'}>{ msg }</Text>
                <HStack>
                  <Link onPress={() => { onClose() }} ml="40px" my="10px" isExternal _text={{
                    color: '#737373'
                  }}>忘記密碼?
                  </Link>
                  <Link onPress={() => { onClose() }} ml="10px" my="10px" isExternal _text={{
                    color: '#737373'
                  }}>尚未註冊?
                  </Link>
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
                        textAlign={'center'} alignSelf={'center'}>
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
                  isExternal _text={{
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
