import React from 'react'
import {
  Box, Center, Text, Pressable
} from 'native-base'
import { getAuth, signOut } from 'firebase/auth'

export function Others ({ navigation }) {
  const auth = getAuth()
  return (
    <Box safeArea>
        <Center>
            <Box w={'90%'} backgroundColor={'#FFFFFF'} borderWidth={'5'} borderColor={'#ffffff'}>
                <Text color={'#28527A'} fontSize={'lg'} marginLeft={'5'}>幫助</Text>
            </Box>
            <Box w={'90%'} marginTop={'2'} backgroundColor={'#FFFFFF'} borderWidth={'5'} borderColor={'#ffffff'}>
                <Text color={'#28527A'} fontSize={'lg'} marginLeft={'5'}>關於NCU app</Text>
            </Box>

            <Pressable w={'90%'} marginTop={'2'} backgroundColor={'#FFFFFF'} borderWidth={'5'} borderColor={'#ffffff'}
            onPress={() => {
              signOut(auth).then(() => {
                // Sign-out successful.
                console.log('Sign-out successful.')
              }).catch((error) => {
                throw error
              })
            }}
          >
            <Text bold color={'#EF4444'} fontSize={'lg'} marginLeft={'5'}>
              登出
            </Text>
          </Pressable>
        </Center>
    </Box>

  )
}
export default { Others }
