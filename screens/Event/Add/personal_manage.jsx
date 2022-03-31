import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView,
  ScrollView, TouchableOpacity, Image,
} from 'react-native';
import {
  Ionicons, FontAwesome5, AntDesign, Feather,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, Heading, ZStack, AddIcon,
} from 'native-base';
import styles from '../Styles';

function personal({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignContent: 'center' }}>
      <NativeBaseProvider>
        <ZStack>
          <Box
            style={{
              width: 323,
              height: 323,
              borderRadius: 261,
              alignSelf: 'center',
              transform: [{ scaleX: 1.61 }],
              marginTop: -172,
              backgroundColor: '#28527A',
            }}
          />
          <Box style={{ alignSelf: 'center', marginTop: 61, flexDirection: 'row' }}>
            <Feather name="user" size={24} color="white" style={{ marginTop: 5, marginRight: 15 }} onPress={() => { navigation.navigate('list'); }} />
            <Text style={{
              fontWeight: 'bold', fontSize: 24, color: 'white',
            }}
            >
              活動中心
            </Text>
          </Box>
          <Box style={{ alignSelf: 'center', flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                marginTop: 118, marginRight: 10, width: 82, height: 53, borderRadius: 25, backgroundColor: '#1784B2', flexDirection: 'row', padding: 16, alignContent: 'center',
              }}
              onPress={() => navigation.navigate('message')}
            >
              <Feather name="message-circle" size={14} color="white" style={{ marginTop: 3 }} />
              <Text style={{ color: 'white', fontSize: 14 }}>
                &nbsp;私訊
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 118, width: 82, height: 53, borderRadius: 25, backgroundColor: '#1784B2', flexDirection: 'row', padding: 16, alignContent: 'center',
              }}
              onPress={() => navigation.navigate('add')}
            >
              <Ionicons name="add" size={14} color="white" style={{ marginTop: 3 }} />
              <Text style={{ color: 'white', fontSize: 14 }}>
                &nbsp;新增
              </Text>
            </TouchableOpacity>
          </Box>
        </ZStack>
        <Box style={{ marginTop: 192, alignItems: 'center' }}>
          <Box style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                width: 106,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#1784B2',
                flexDirection: 'row',
                paddingVertical: 8,
                paddingHorizontal: 29,
                marginRight: 20,
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('add')}
            >
              <Text style={{
                color: 'white', fontSize: 14,
              }}
              >
                參加中
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 106,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#1784B2',
                flexDirection: 'row',
                paddingVertical: 8,
                paddingHorizontal: 21,
                marginRight: 20,
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('add')}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>
                管理活動
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 106,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#1784B2',
                flexDirection: 'row',
                paddingVertical: 8,
                paddingHorizontal: 29,
                marginRight: 20,
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('add')}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>
                已結束
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default personal;
