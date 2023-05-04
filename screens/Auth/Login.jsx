import React, { useState } from 'react';

import {
  Box, Button, Heading, Input, Text,
} from 'native-base';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const localizeMsg = {
    'auth/invalid-email': '電子郵件無效',
    'auth/user-not-found': '找不到使用者',
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        setMsg(localizeMsg[err.code]);
      });
  };

  return (
    <Box alignItems="center">
      <Heading>登入</Heading>
      <Input mx="3" placeholder="電子郵件" wx="100%" onChangeText={(text) => setEmail(text)} />
      <Input type="password" mx="3" placeholder="密碼" wx="100%" onChangeText={(text) => setPassword(text)} />
      <Text>{msg}</Text>
      <Button onPress={login}>登入</Button>
    </Box>
  );
}
