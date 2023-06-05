import React, { useEffect, useState } from 'react'

import {
  Box, Button, Heading, Input, Text, Image, Center, Actionsheet, useDisclose, Pressable, HStack, Icon, Link, VStack, ScrollView, Avatar
} from 'native-base'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import ActiveController from '../../controller/Active'
import { auth } from '../../config'
import { MaterialIcons } from '@expo/vector-icons'

export function RegisterScreen () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState()
  const [confirm, setConfirm] = useState()
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)
  const [registerData, setRegisterData] = useState({})
  const [avatar, setAvatar] = useState()
  const [msg, setMsg] = useState()
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose()
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
        setRegisterData({ ...registerData, avatar: result.assets[0].uri })
      }
    }
  }

  const register = () => {
    if (Object.values(registerData).length < 6) {
      setMsg('請填寫完整')
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential
        ActiveController.addUser(user.uid, registerData)
      })
      .catch((err) => {
        setMsg(err.code)
      })
  }

  return (
    <Center>
      <Button backgroundColor={'#E5EBF1'} w={'100%'} marginY={'10px'} isExternal _text={{ fontSize: 'lg', fontWeight: 'bold', color: '#000000' }} onPress={onOpen}>註冊</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose} >
        <Actionsheet.Content>
        <VStack w={'100%'} h={'100%'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box flex={0.1}/>
            <Box flex={7} alignItems="flex-start" justifyContent={'center'}>
              <Heading marginX={'40px'} marginY={'20px'}>註冊帳號</Heading>

              <Heading size={'xs'} marginX={'40px'} marginBottom={'20px'}>姓名</Heading>
              <Input w={'80%'} mx="3" alignSelf={'center'} placeholder="請輸入本名 Please Enter Your Real Name" wx="100%" onChangeText={(name) => setRegisterData({ ...registerData, name })} />

              <Heading size={'xs'} marginX={'40px'} marginY={'20px'}>科系</Heading>
              <Input w={'80%'} mx="3" alignSelf={'center'} placeholder="eg. 中國語文學系 Your major" wx="100%" onChangeText={(major) => setRegisterData({ ...registerData, major })} />

              <Heading size={'xs'} marginX={'40px'} marginY={'20px'}>年級</Heading>
              <Input keyboardType='numeric' alignSelf={'center'} w={'80%'} mx="3" placeholder="年級" wx="100%" onChangeText={(grade) => setRegisterData({ ...registerData, grade })} />

              <Heading size={'xs'} marginX={'40px'} marginY={'20px'}>學號</Heading>
              <Input w={'80%'} mx="3" alignSelf={'center'} placeholder="StudentID" wx="100%" onChangeText={(id) => setRegisterData({ ...registerData, studentID: id })} />

              <Heading size={'xs'} marginX={'40px'} marginY={'20px'}>電話</Heading>
              <Input w={'80%'} mx="3" alignSelf={'center'} placeholder="Phone Number" wx="100%" onChangeText={(phone) => setRegisterData({ ...registerData, phone })} />

              <Heading size={'xs'} marginX={'40px'} marginY={'20px'}>Portal帳號</Heading>
              <Input w={'80%'} mx="3" alignSelf={'center'} placeholder="...@cc.ncu.edu.tw" wx="100%" onChangeText={(text) => { setEmail(text); setRegisterData({ ...registerData, email: text }) }} />

              <Heading size={'xs'} marginX={'40px'} marginY={'20px'}>設定密碼</Heading>
                <Input
                  w={'80%'}
                  mx="3"
                  placeholder="Password"
                  wx="100%"
                  alignSelf={'center'}
                  onChangeText={(text) => setPassword(text)}
                  type={showPwd ? 'text' : 'password'}
                  InputRightElement={
                  <Pressable onPress={() => setShowPwd(!showPwd)}>
                    <Icon as={<MaterialIcons name={showPwd ? 'visibility' : 'visibility-off'} />} size={5} mr="2" color="muted.400" />
                  </Pressable>}/>

              <Heading size={'xs'} marginX={'40px'} marginY={'20px'}>確認密碼</Heading>
              <Input w={'80%'} alignSelf={'center'} type={showPwd2 ? 'text' : 'password'} mx="3" placeholder="Password Confirmation" wx="100%" onChangeText={(text) => setConfirm(text)} InputRightElement={
                  <Pressable onPress={() => setShowPwd2(!showPwd2)}>
                    <Icon as={<MaterialIcons name={showPwd2 ? 'visibility' : 'visibility-off'} />} size={5} mr="2" color="muted.400" />
                  </Pressable>}/>
              {(password && confirm && password !== confirm) && <Text color={'error.600'} marginX={'40px'} mt="2px">密碼不相符，請再次做確認</Text>}

              <Link onPress={() => { onClose() }} mr="40px" my="10px" alignSelf={'flex-end'} isExternal _text={{
                color: '#737373'
              }}>已有帳號
                </Link>
            <Box alignSelf={'center'}>
              <HStack>
              <Pressable onPress={pickImage}><Avatar size={100} alignSelf={'center'} source={{ uri: avatar }} /></Pressable>
              <Text onPress={pickImage} alignSelf={'flex-end'}>新增頭貼</Text>
              </HStack>
            </Box>
            <Text>{ msg }</Text>
            {(!email || !password || !confirm || (password !== confirm) || !avatar || !registerData.email || !registerData.grade || !registerData.name || !registerData.major || !registerData.phone || !registerData.studentID)
              ? (
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
                  完成
                </Button>
                )
              : (
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
                  onPress={register}>
                  <Text fontSize={'lg'} fontWeight={'bold'} color={'#fbeeac'}
                        textAlign={'center'} alignSelf={'center'}>
                      完成
                  </Text>
                  </Pressable>
                </Box>
                )}
            </Box>
          <Box flex={2} h={'300px'} />
          </ScrollView>
          </VStack>

        </Actionsheet.Content>
      </Actionsheet>
    </Center>

  )
}
