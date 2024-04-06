import React from 'react'

import {
Button, Center
} from 'native-base'
import { signInAnonymously, signOut, getAuth, onAuthStateChanged, FirebaseUser } from 'firebase/auth'
import { auth } from '../../config'
import { Alert } from 'react-native'

export function AnonymousLogin () {
  const anonymousLogin = () => {
    const auth = getAuth()
    signInAnonymously(auth)
        .then(() => {
            // Signed in..
            console.log('Anonymous login success')
            Alert.alert('如果您覺得我們的應用程式不錯，歡迎註冊帳號，解鎖完整功能！')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });
  }

  

  return (
    <Center>
      <Button backgroundColor={'#808080'} w={'100%'} marginY={'10px'} isExternal _text={{ fontSize: 'lg', fontWeight: 'bold', color: '#ffffff' }} onPress={anonymousLogin}>遊客體驗模式 Anonymous</Button>

    </Center>
  )
}