import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import {
  Avatar, Box, Heading, Link,
} from 'native-base';
import logo from '../../assets/icon.png';
import { LoginScreen } from './Login';
import { RegisterScreen } from './Register';

const supportedURL = 'https://ncuappteam.github.io/PRIVACY';

export function AuthScreen() {
  const [register, setRegister] = useState(false);

  return (
    <SafeAreaView>
      <Box alignItems="center">
        <Avatar source={logo} />
        <Heading>歡迎使用 NCU-App</Heading>
        {register ? <RegisterScreen /> : <LoginScreen /> }
        <Link onPress={() => setRegister(!register)} mt="8">{register ? '已有帳號' : '申請帳號' }</Link>
        <Link mt="8" href={supportedURL}>隱私權政策</Link>
      </Box>
    </SafeAreaView>
  );
}
