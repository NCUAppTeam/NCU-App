import React, { useState, useEffect } from 'react'
import {
  Feather, SimpleLineIcons
} from '@expo/vector-icons'
import {
  Box, Center, HStack, Image, Pressable, Text, VStack, Input
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import SettingController from '../../controller/Setting'
import UserController from '../../controller/getStudentId'
import { EditHeader } from './components/forSetting/EditHeader'

export function EditInfo ({ route, navigation }) {
  const userUid = UserController.getUid()
  const [refreshing, setRefreshing] = useState(false)
  const [info, setInfo] = useState(route.params)
  const [newInfo, setNewInfo] = useState({})
  const [avatar, setAvatar] = useState()
  const onRefresh = () => {
    setRefreshing(true)
    UserController.getINFO(userUid).then((res) => {
      setInfo(res)
    }).catch((err) => {
      throw err
    })
    setRefreshing(false)
  }
  useEffect(() => {
    UserController.getINFO(userUid).then((res) => {
      setInfo(res)
      setAvatar(res.avatar)
    }).catch((err) => {
      throw err
    })
    const focusHandler = navigation.addListener('focus', () => {
      onRefresh()
    })
    return focusHandler
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2
    })

    if (!result.assets[0].canceled) {
      setAvatar(result.assets[0].uri)
      if (avatar === undefined) {
        setAvatar(result.assets[0].uri)
      }
      await SettingController.changeAvatar(result.assets[0].uri)
    }
  }
  return (
    <Box safeArea bgColor={'#ffffff'}>
        <EditHeader navigation={navigation} info={info}/>
        <Box marginX={2} paddingBottom={8}>
            <Center>
                <Box backgroundColor="#ffffff" w={'97%'} h={'94.5%'} >
                    <Center justifyContent={'center'}>
                        <Box>
                            <Pressable onPress={pickImage}>
                                <Image size={150} borderRadius={100} alt={'userAvatar'} source={{ uri: avatar }} />
                            </Pressable>
                        </Box>
                    </Center>
                    <VStack w={'40%'} marginTop={'10'} alignSelf={'flex-start'} paddingLeft={10}>
                        <Box flexDirection={'row'}>
                            <Text fontSize={'lg'} textAlign="center" alignSelf={'center'} color={'#28527A'} bold>姓名</Text>
                            <Input fontSize={'md'} mx="3" my="3" placeholder="" w="240%" height="40px" defaultValue={info.name} onChangeText={(name) => setNewInfo({ ...newInfo, name })} />
                        </Box>
                        <Box w={195} flexDirection={'row'}>
                            <Text fontSize={'lg'} textAlign="center" alignSelf={'center'} bold>系所</Text>
                            <Input fontSize={'md'} mx="3" my="3" placeholder="" w="136%" height="40px" defaultValue={info.major} onChangeText={(major) => setNewInfo({ ...newInfo, major })} />
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize={'lg'} textAlign="center" alignSelf={'center'} bold>年級</Text>
                            <Input fontSize={'md'} mx="3" my="3" placeholder="" w="136%" height="40px" defaultValue={info.grade} onChangeText={(grade) => setNewInfo({ ...newInfo, grade })} />
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize="lg" textAlign="center" alignSelf={'center'} bold>學號</Text>
                            <Input fontSize={'md'} mx="3" my="3" placeholder="" w="136%" height="40px" defaultValue={info.studentID} onChangeText={(id) => setNewInfo({ ...newInfo, studentID: id })} />
                        </Box>
                        <Box flexDirection={'row'}>
                            <Text fontSize="lg" textAlign="center" alignSelf={'center'} bold>電話</Text>
                            <Input fontSize={'md'} mx="3" my="3" placeholder="" w="136%" height="40px" defaultValue={info.phone} onChangeText={(phone) => setNewInfo({ ...newInfo, phone })} />
                        </Box>
                        <Box w={300} flexDirection={'row'}>
                            <Text fontSize="lg" textAlign="center" alignSelf={'center'} bold>信箱</Text>
                            <VStack alignItems={'flex-start'}>
                                <Text marginLeft={'5'} textAlign={'center'}>{info.email}</Text>
                                <Text marginLeft={'5'} textAlign={'center'}>(若欲修改, 請聯繫NCUAPP團隊)</Text>
                            </VStack>
                        </Box>
                    </VStack>
                    <Pressable
                        width='175px'
                        h={50}
                        borderWidth={1}
                        borderRadius={50}
                        borderColor="#E5EBF1"
                        backgroundColor="#E5EBF1"
                        marginTop="30px"
                        marginRight="10px"
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignSelf={'flex-end'}
                        onPress={() => { SettingController.updateInfo(userUid, newInfo).then(() => { navigation.navigate('settings', { userInfo: newInfo }) }) }}
                        >
                        <SimpleLineIcons
                            name="refresh"
                            size={20}
                            color="#476685"
                            style={{ alignSelf: 'center' }}
                        />
                        <Text fontSize="lg"
                              textAlign="center"
                              alignSelf={'center'} >
                              更新Update Info
                        </Text>
                    </Pressable>
                </Box>
            </Center>

        </Box>
    </Box>
  )
}
export default EditInfo
