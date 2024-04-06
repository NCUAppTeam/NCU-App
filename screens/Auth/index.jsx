import React, { useState } from 'react'
import {
  Avatar, Box, Heading, Link, Button, VStack, Text, Center, Modal
} from 'native-base'
import logo from '../../assets/icon.png'
import { LoginScreen } from './Login'
import { RegisterScreen } from './Register'
import { AnonymousLogin } from './Anonymous'

const supportedURL = 'https://ncuappteam.github.io/PRIVACY'

export function AuthScreen () {
  return (
      <Box alignItems="center" safeArea>
        <VStack>
          <Box flex={2}/>
            <Box flex={3}>
            <Avatar size={150} alignSelf={'center'} source={logo} />
            <Heading bold alignSelf={'center'} marginY={'20px'}>歡迎來到 <Text color={'#1784B2'}>NCU App</Text></Heading>
            <RegisterScreen />
            <LoginScreen />
            <AnonymousLogin/>
            <Link _text={{ fontSize: 'md' }} alignSelf={'center'} mt="8" href={supportedURL}>隱私權政策</Link>
          </Box>
          <Box flex={3}/>
        </VStack>
      </Box>
  )
}
