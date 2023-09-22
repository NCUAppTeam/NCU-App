import React, { useState } from 'react'

import {
  Box, Heading, Input, Actionsheet, useDisclose, Center, VStack, Pressable, Link, HStack, Text
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { sendPasswordResetEmail, getAuth } from 'firebase/auth'

export function ResetScreen () {
  const [email, setEmail] = useState('')
  const [isSent, setSent] = useState(false)
  const [msg, setMsg] = useState('')
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose()
  const localizeMsg = {
    'auth/invalid-email': '輸入之電子郵件無效',
    'auth/user-not-found': '此信箱尚未註冊'
  }

  const actionCodeSettings = {
    url: 'https://ncuapp.page.link',
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    handleCodeInApp: true
  }

  async function reset (email) {
    const auth = getAuth()
    await sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(function () {
        // Password reset email sent.
        setSent(true)
        setMsg('')
      })
      .catch(function (error) {
        // Error occurred. Inspect error.code.
        setMsg(localizeMsg[error.code])
      })
  }

  return (
    <Center>
      <Pressable>
      <Link onPress={onOpen} _text={{
        fontSize: '16',
        color: '#737373'
      }}>忘記密碼?
        </Link>
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack w={'100%'} h={'100%'} marginX={10} alignItems={'center'}>
            <Box flex={0.1}/>
            <Box flex={1.5} alignItems="flex-start" justifyContent={'center'} w={'80%'}>
              <Heading size={'lg'} marginY={'20px'}>忘記密碼?</Heading>

              <Box marginTop={3}>
                <HStack justifyContent={'flex-start'} alignItems={'center'}>
                    <MaterialIcons name="email" size={30} color="black" style={{ marginRight: 10 }} />
                    <Input
                    w={'90%'}
                    py={1}
                    size="md"
                    placeholder="學號@cc.ncu.edu.tw"
                    alignSelf={'center'}
                    wx="100%"
                    value={email}
                    onChangeText={(text) => { setEmail(text); setSent(false) }}
                    />
                </HStack>
              </Box>

              <Text marginBottom={3} fontSize={'sm'} alignSelf={'flex-end'} color={'red.500'}>{ msg }</Text>

              {email && (
                <Box
                bg={{
                  linearGradient: {
                    colors: ['#28527A', '#1784B2'],
                    start: [0, 0],
                    end: [1, 0]
                  }
                }}
                w={'50%'}
                h={'43px'}
                justifyContent={'center'}
                alignSelf={'flex-end'}
                borderRadius={'100px'}>
                <Pressable
                  disabled={!!isSent}
                  onPress={() => reset(email)}>
                  <Text fontSize={'lg'} fontWeight={'bold'} color={'#fbeeac'}
                        textAlign={'center'} >
                      {isSent ? '已發送' : '發送郵件'}
                  </Text>
                  </Pressable>
                </Box>
              )}
              {(!email) && (
                <Box
                backgroundColor={'#D4D4D4'}
                w={'50%'}
                h={'43px'}
                justifyContent={'center'}
                alignSelf={'flex-end'}
                borderRadius={'100px'}>
                <Pressable
                  disabled>
                  <Text fontSize={'lg'} fontWeight={'bold'} color={'#737373'}
                        textAlign={'center'} >
                      發送郵件
                  </Text>
                  </Pressable>
                </Box>
              )}
            </Box>
            <Box flex={1} h={'100%'}/>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  )
}
