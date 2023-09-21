import React from 'react'
import {
  Box, Center, Text, Pressable, Link
} from 'native-base'
import { getAuth, signOut } from 'firebase/auth'

export function Others ({ navigation }) {
  const auth = getAuth()
  return (
    <Box safeArea>
        <Center>
            <Link w={'90%'} _text={{
              fontWeight: 'bold',
              fontSize: 'xl',
              color: 'cyan.700'
            }} marginTop={'2'} backgroundColor={'#FFFFFF'} borderWidth={'5'} borderColor={'#ffffff'} href="https://www.facebook.com/NCUAppTeam">
              幫助
            </Link>

            <Link w={'90%'} _text={{
              fontWeight: 'bold',
              fontSize: 'xl',
              color: 'cyan.700'
            }}
              marginTop={'2'} backgroundColor={'#FFFFFF'} borderWidth={'5'} borderColor={'#ffffff'} href="https://ncuappteam.github.io/">
              關於NCU app
            </Link>

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
            <Text bold color={'#EF4444'} fontSize={'xl'}>
              登出
            </Text>
          </Pressable>
        </Center>
    </Box>

  )
}
export default { Others }
