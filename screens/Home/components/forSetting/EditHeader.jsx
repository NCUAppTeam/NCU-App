import React from 'react'
import {
  AntDesign
} from '@expo/vector-icons'
import {
  Box, Center, Text
} from 'native-base'

export function EditHeader ({ userInfo, navigation }) {
  return (
    <Box flexDirection="row" safeArea backgroundColor="#FFFFFF" borderBottomWidth={10} borderBottomColor="#ffffff" paddingTop={5}>
        <Center>
            <Box flex={1.5} marginLeft={6}>
                <AntDesign
                name="arrowleft"
                size={28}
                color="#476685"
                onPress={() => { navigation.navigate('settings', { userInfo }) }}
                />
            </Box>
        </Center>
        <Box flex={1.28} />
        <Box flex={4}>
            <Text fontSize="2xl" color="#28527A" justifyContent="center" marginTop="-1.5">編輯個人資料</Text>
        </Box>
    </Box>

  )
}
export default { EditHeader }
