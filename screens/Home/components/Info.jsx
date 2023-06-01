import React from 'react'
import {
  Feather
} from '@expo/vector-icons'
import {
  Box, Center, HStack, Image, Text, VStack
} from 'native-base'

export function Info ({ userInfo, navigation }) {
  return (
    <Box safeArea marginX={2}>
        <Box alignSelf="flex-start">
            <Text fontSize="md" color={'#737373'} marginLeft={'5'} marginBottom={'2'}>個人檔案</Text>
        </Box>
        <Center>
            <Box backgroundColor="#ffffff" w={'90%'} h={'180'}>
                <HStack alignContent={'center'}>
                    <VStack w={'40%'} marginTop={'10'}>
                        <Center justifyContent={'center'} >
                            <Box>
                                <Image size={20} borderRadius={50} alt={'userAvatar'} source={{ uri: userInfo.avatar }} />
                            </Box>
                            <Box
                                width='60px'
                                h={28}
                                borderWidth={1}
                                borderRadius={10}
                                borderColor="#E5EBF1"
                                backgroundColor="#E5EBF1"
                                marginTop="8px"
                                flexDirection={'row'}
                                justifyContent={'center'}>
                                <Feather
                                    name="edit"
                                    size={16}
                                    color="#476685"
                                    marginTop='4px'
                                    // onPress={() => {
                                    // navigation.navigate('edit', { Cd: passedID })
                                    // }}
                                />
                                <Text fontSize="sm" textAlign="center">編輯</Text>
                            </Box>
                        </Center>
                    </VStack>
                    <VStack w={'50%'} alignSelf={'flex-start'} justifyContent={'center'} marginTop={'8'}>
                        <Box flexDirection={'row'}>
                            <Text fontSize={'md'} textAlign="center" color={'#28527A'} bold >姓名</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{userInfo.name}</Text>
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize={'md'} textAlign="center" bold>系所</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{userInfo.major}</Text>
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize={'md'} textAlign="center" bold>年級</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{userInfo.grade}</Text>
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize="md" textAlign="center" bold>學號</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{userInfo.studentID}</Text>
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize="md" textAlign="center" bold>電話</Text>
                            <Text marginLeft={'5'} textAlign={'center'}>{userInfo.phone}</Text>
                        </Box>
                    </VStack>
                </HStack>
            </Box>
        </Center>
    </Box>

  )
}
export default { Info }
