/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, RefreshControl, View, Text, TouchableOpacity,
} from 'react-native';
import {
  ZStack, HStack, Input, Icon, NativeBaseProvider, Image, VStack, ScrollView,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import styles from './Styles';
import SalesController from '../../controller/Sales';

function SearchScreen({ navigation }) {
  const [searchbarText, setSearchbarText] = useState('');
  // const [items, setItems] = useState([]);

  // const handleSearch = (text) => {
  //   setSearchbarText(text);
  //   if (text !== '') {
  //     SalesController.querySearch(text, picked).then((res) => {
  //       setItems(res);
  //     }).catch((err) => {
  //       throw err;
  //     });
  //   }
  // };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    SalesController.getHomePageItem().then((res) => {
      setSearchbarText('');
      setRefreshing(false);
    });
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <HStack alignItems="center" w="95%" justifyContent="center">
          <Input
            size="lg"
            color="#28527A"
            bg="#E5EBF1"
            placeholder="搜尋"
            style={styles.search}
            variant="filled"
            width="80%"
            height="36px"
            borderRadius="25"
            py="1"
            px="2"
            borderWidth="0"
            InputLeftElement={<Icon ml="2" size="6" color="#28527A" as={<Ionicons name="ios-search" />} />}
            _text={{
              color: '#28527A',
              fontWeight: '400',
            }}
          />
          <Text
            style={{ color: '#28527A', marginHorizontal: 10, fontSize: 16 }}
            onPress={() => {
              navigation.navigate('拍賣', { onGoBack: onRefresh });
            }}
          >
            取消

          </Text>
        </HStack>
        <ScrollView
          // horizontal={false}
          maxW="100%"
          h="100%"
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        >
          <VStack alignItems="center" w="100%" space={40} marginTop="20">
            <HStack alignItems="center" w="100%" justifyContent="space-evenly">
              <TouchableOpacity onPress={() => {
                navigation.navigate('課業文具', { onGoBack: onRefresh });
              }}
              >
                <ZStack alignItems="center" justifyContent="center">
                  <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                  <Text style={styles.searchTag}>課業文具</Text>
                </ZStack>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                navigation.navigate('日常用品', { onGoBack: onRefresh });
              }}
              >
                <ZStack alignItems="center" justifyContent="center">
                  <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                  <Text style={styles.searchTag}>日常用品</Text>
                </ZStack>
              </TouchableOpacity>
            </HStack>
            <HStack alignItems="center" w="100%" justifyContent="space-evenly">
              <TouchableOpacity onPress={() => {
                navigation.navigate('居家用品', { onGoBack: onRefresh });
              }}
              >
                <ZStack alignItems="center" justifyContent="center">
                  <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                  <Text style={styles.searchTag}>居家用品</Text>
                </ZStack>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                navigation.navigate('美食料理', { onGoBack: onRefresh });
              }}
              >
                <ZStack alignItems="center" justifyContent="center">
                  <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                  <Text style={styles.searchTag}>美食料理</Text>
                </ZStack>
              </TouchableOpacity>
            </HStack>
            <HStack alignItems="center" w="100%" justifyContent="space-evenly">
              <TouchableOpacity onPress={() => {
                navigation.navigate('衣服配件', { onGoBack: onRefresh });
              }}
              >
                <ZStack alignItems="center" justifyContent="center">
                  <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                  <Text style={styles.searchTag}>衣服配件</Text>
                </ZStack>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                navigation.navigate('美妝保護', { onGoBack: onRefresh });
              }}
              >
                <ZStack alignItems="center" justifyContent="center">
                  <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                  <Text style={styles.searchTag}>美妝保護</Text>
                </ZStack>
              </TouchableOpacity>
            </HStack>
            <HStack alignItems="center" w="100%" justifyContent="space-evenly" marginRight="5" marginBottom="20">
              <TouchableOpacity onPress={() => {
                navigation.navigate('票券/周邊', { onGoBack: onRefresh });
              }}
              >
                <ZStack alignItems="center" justifyContent="center">
                  <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                  <Text style={styles.searchTag}>票券/周邊</Text>
                </ZStack>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                navigation.navigate('其他', { onGoBack: onRefresh });
              }}
              >
                <ZStack alignItems="center" justifyContent="center">
                  <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                  <Text style={styles.searchTag}>其他</Text>
                </ZStack>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default SearchScreen;
