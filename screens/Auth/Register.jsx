import React, { useState } from 'react';

import {
  Box, Button, Heading, Input, Text, Image,
} from 'native-base';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import ActiveController from '../../controller/Active';
import { auth } from '../../config';

export function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerData, setRegisterData] = useState({});
  const [avatar, setAvatar] = useState();
  const [msg, setMsg] = useState();

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
    if (Object.values(registerData).length < 6) {
      setMsg('請填寫完整');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        ActiveController.addUser(user.uid, registerData);
      })
      .catch((err) => {
        setMsg(err.code);
      });
  };

  return (
    <Box alignItems="center">
      <Heading>註冊帳號</Heading>
      <Input mx="3" placeholder="電子郵件" wx="100%" onChangeText={(text) => { setEmail(text); setRegisterData({ ...registerData, email: text }); }} />
      <Input type="password" mx="3" placeholder="密碼" wx="100%" onChangeText={(text) => setPassword(text)} />
      <Input mx="3" placeholder="姓名" wx="100%" onChangeText={(name) => setRegisterData({ ...registerData, name })} />
      <Input mx="3" placeholder="年級" wx="100%" onChangeText={(grade) => setRegisterData({ ...registerData, grade })} />
      <Input mx="3" placeholder="系別" wx="100%" onChangeText={(major) => setRegisterData({ ...registerData, major })} />
      <Input mx="3" placeholder="電話" wx="100%" onChangeText={(phone) => setRegisterData({ ...registerData, phone })} />
      <Input mx="3" placeholder="學號" wx="100%" onChangeText={(id) => setRegisterData({ ...registerData, studentID: id })} />
      <Box>
        <Text onPress={pickImage} style={{ alignSelf: 'center' }}>新增頭貼</Text>
        <Image
          alt="avatar"
          source={{ uri: avatar }}
          style={{
            width: 100, height: 100, borderRadius: 50, marginVertical: 10,
          }}
        />
      </Box>
      <Text>{ msg }</Text>

      <Button onPress={register}>
        註冊
      </Button>
    </Box>
  );
}
