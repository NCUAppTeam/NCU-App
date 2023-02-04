import React from 'react';
import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Avatar, Box, Button, Heading, Input, Link } from 'native-base';
import logo from '../assets/icon.png';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const supportedURL = 'https://ncuappteam.github.io/PRIVACY';


function LoginScreen() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
  }

  return(
    <Box alignItems="center">
      <Heading>登入</Heading>
      <Input mx="3" placeholder="電子郵件" wx="100%" onChangeText={(text) => setEmail(text)}/>
      <Input type="password" mx="3" placeholder="密碼" wx="100%" onChangeText={(text) => setPassword(text)}/>
      <Button onPress={login}>登入</Button>
    </Box>
  );
}

function RegisterScreen() {
    
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
  }

  return(
    <Box alignItems="center">
      <Heading>註冊帳號</Heading>
      <Input mx="3" placeholder="電子郵件" wx="100%" onChangeText={(text) => setEmail(text)}/>
      <Input type="password" mx="3" placeholder="密碼" wx="100%" onChangeText={(text) => setPassword(text)}/>
      <Button onPress={register}>註冊</Button>
    </Box>
  );
}

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
