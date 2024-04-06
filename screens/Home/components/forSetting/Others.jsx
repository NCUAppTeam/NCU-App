import React from 'react'
import {
  Box, Center, Text, Pressable, Link
} from 'native-base'
import { deleteUserInfo } from '../../../../controller/Setting'
import { getAuth, signOut, deleteUser } from 'firebase/auth'

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
            {!auth.currentUser.isAnonymous && <Pressable w={'90%'} marginTop={'2'} backgroundColor={'#FFFFFF'} borderWidth={'5'} borderColor={'#ffffff'}
            onPress={() => {
              deleteUserInfo(auth.currentUser.uid)
              deleteUser(auth.currentUser).then(() => {
                // User deleted.
                console.log('User deleted.')
              
            })
              signOut(auth).then(() => {
                // Sign-out successful.
                console.log('Sign-out successful.')
              }).catch((error) => {
                throw error
              })
              }}
          >
            <Text bold color={'#EF4444'} fontSize={'xl'}>
              刪除帳號
            </Text>
          </Pressable>
          }
            <Pressable w={'90%'} marginTop={'2'} backgroundColor={'#FFFFFF'} borderWidth={'5'} borderColor={'#ffffff'}
            onPress={() => {
              if(auth.currentUser.isAnonymous){
                deleteUser(auth.currentUser).then(() => {
                  // User deleted.
                  console.log('User deleted.')
                }).catch((error) => {
                  throw error
                })
              } 
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
