import React from 'react'
import {
  AntDesign
} from '@expo/vector-icons'
import {
  Box, Center, Text
} from 'native-base'

export function SettingHeader ({ navigation }) {
  return (
    <Box flexDirection="row" safeArea backgroundColor="#FFFFFF" borderBottomWidth={10} borderBottomColor="#ffffff">
        <Center>
            <Box flex={1.5} marginLeft={6} onPress={() => { navigation.navigate('homepage') }}>
                <AntDesign
                name="arrowleft"
                size={28}
                color="#476685"
                />
            </Box>
        </Center>
        <Box flex={2} />
        <Box flex={4}>
            <Text fontSize="2xl" color="#28527A" justifyContent="center" marginTop="-1.5">設定</Text>
        </Box>
    </Box>

  )
}
export default { SettingHeader }
