import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import {
  Avatar, Box, Button, Heading, Input, Link, Text, Image, Center,
} from 'native-base';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import logo from '../../assets/icon.png';
import ActiveController from '../../controller/Active';
import { auth } from '../../config';


const supportedURL = 'https://ncuappteam.github.io/PRIVACY';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (!email.toLowerCase().match(emailRegex)) {
        alert("電郵地址不符合規定，請檢查後再試。")
        return
    }

    if (password.toString().length < 8) {
        alert("密碼不符合規定，至少需要 8 個位元。請檢查後再試。")
        return
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(`登錄失敗，請重試。`)
    });
  };

  return (
    <Box alignItems="center" justifyContent="center" w="100%">
      <Input my="5" placeholder="電子郵件" w="100%" onChangeText={(text) => setEmail(text)} />
      <Input type="password" placeholder="密碼" w="100%" onChangeText={(text) => setPassword(text)} />
      <Button w="100%" mt="10" onPress={ login }>登入</Button>
    </Box>
  );
}

function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [registerData, setRegisterData] = useState({});
  const [avatar, setAvatar] = useState();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    if (!result.assets[0].canceled) {
      setAvatar(result.assets[0].uri);
      if (avatar === undefined) {
        setAvatar(result.assets[0].uri);
        setRegisterData({ ...registerData, avatar: result.assets[0].uri });
      }
    }
  };

  const register = () => {
      if (!email.toLowerCase().match(emailRegex)) {
          alert("電郵地址不符合規定，請檢查後再試。")
          return
      }

      if (password.toString().length < 8) {
          alert("密碼不符合規定，至少需要 8 個位元。請檢查後再試。")
          return
      }

      if (password != checkPassword) {
          alert("密碼確認不吻合，請重新輸入。")
          return
      }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        ActiveController.addUser(user.uid, registerData);
        // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          alert(`註冊失敗，請重試。`)
      });
  };

  return (
    <Box alignItems="center" w="100%">
      <Heading mb="10">註冊帳號</Heading>
      <Input placeholder="電子郵件" wx="100%" my="1" onChangeText={(text) => { setEmail(text); setRegisterData({ ...registerData, email: text }); }} />
      <Input placeholder="姓名" wx="100%" my="1" onChangeText={(name) => setRegisterData({ ...registerData, name })} />
      <Input placeholder="年級" wx="100%" my="1" onChangeText={(grade) => setRegisterData({ ...registerData, grade })} />
      <Input placeholder="系別" wx="100%" my="1" onChangeText={(major) => setRegisterData({ ...registerData, major })} />
      <Input placeholder="電話" wx="100%" my="1" onChangeText={(phone) => setRegisterData({ ...registerData, phone })} />
      <Input placeholder="學號" wx="100%" my="1" onChangeText={(id) => setRegisterData({ ...registerData, studentID: id })} />
      <Input type="password" placeholder="密碼" my="1" wx="100%" onChangeText={(text) => setPassword(text)} />
      <Input type="password" placeholder="密碼確認" my="1" wx="100%" onChangeText={(text) => setCheckPassword(text)} />

      <Button onPress={register} w="100%" mt="10">
        註冊
      </Button>
    </Box>
  );
}

export function AuthScreen() {
  const [register, setRegister] = useState(false);

  return (
    <SafeAreaView>
      <Center h="100%" p="5">
        <Box alignItems="center" w="100%">
            <Avatar source={logo} />
            <Heading mt="5" mb="10">歡迎使用 NCU-App</Heading>
            { register ? <RegisterScreen /> : <LoginScreen /> }
            <Link onPress={() => setRegister(!register)} mt="8">{register ? '我已有帳號了' : '還沒有帳號嗎？立即註冊' }</Link>
            <Link mt="5" href={supportedURL}>隱私政策</Link>
          </Box>
    </Center>
    </SafeAreaView>
  );
}
