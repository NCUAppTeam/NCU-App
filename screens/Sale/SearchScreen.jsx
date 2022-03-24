import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, TextInput, RefreshControl, View, Text, TouchableOpacity
} from 'react-native';
import { ZStack, HStack, Input, Button, Icon, NativeBaseProvider, Center, Box, Divider, Heading, AspectRatio, Image, VStack } from "native-base";
import styles from './Styles';
import SalesController from '../../controller/Sales';
import { Ionicons } from '@expo/vector-icons';


function SearchScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [picked, setPicked] = useState(undefined);
  const [tags, setTags] = useState([]);
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

  useEffect(() => {
    SalesController.getAllTag().then((res) => {
      setTags(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  useEffect(() => {
    SalesController.getHomePageItem().then((res) => {
      setItems(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    SalesController.getHomePageItem().then((res) => {
      setItems(res);
      setPicked({});
      setSearchbarText('');
      setRefreshing(false);
    });
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <HStack alignItems="center" w="95%" justifyContent="center">    
            <Input size="lg" color="#28527A" bg="#E5EBF1" placeholder="搜尋" style={styles.search} variant="filled" width="80%" height="36px" borderRadius="25" py="1" px="2" borderWidth="0" 
                InputLeftElement={<Icon ml="2" size="6" color="#28527A" as={<Ionicons name="ios-search" />} />}
                _text={{
                color: "#28527A",
                fontWeight: "400"
                }}
            />
            <Text style={{color: "#28527A", marginHorizontal: 10, fontSize: 16}} onPress={() => {
                navigation.navigate('拍賣', { onGoBack: onRefresh });
              }}>取消</Text>
        </HStack>
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        >
            <VStack alignItems="center" w="100%" space={40} marginTop="20" paddingRight="5">
                <HStack alignItems="center" w="100%" justifyContent="space-evenly" >
                    <ZStack alignItems="center" justifyContent="center">
                        <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                        <Text style={styles.searchTag}>課業文具</Text>
                    </ZStack>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate('日常用品', { onGoBack: onRefresh });
                    }}>
                      <ZStack alignItems="center" justifyContent="center">
                          <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                          <Text style={styles.searchTag}>日常用品</Text>
                      </ZStack>
                    </TouchableOpacity>
                </HStack>
                <HStack alignItems="center" w="100%" justifyContent="space-evenly" >
                    <ZStack alignItems="center" justifyContent="center">
                        <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                        <Text style={styles.searchTag}>居家用品</Text>
                    </ZStack>
                    <ZStack alignItems="center" justifyContent="center">
                        <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                        <Text style={styles.searchTag}>美食料理</Text>
                    </ZStack>
                </HStack>
                <HStack alignItems="center" w="100%" justifyContent="space-evenly" >
                    <ZStack alignItems="center" justifyContent="center">
                        <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                        <Text style={styles.searchTag}>衣服配件</Text>
                    </ZStack>
                    <ZStack alignItems="center" justifyContent="center">
                        <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                        <Text style={styles.searchTag}>美妝保養</Text>
                    </ZStack>
                </HStack>
                <HStack alignItems="center" w="100%" justifyContent="space-evenly" marginRight="5">
                    <ZStack alignItems="center" justifyContent="center">
                        <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                        <Text style={styles.searchTag}>票券/周邊</Text>
                    </ZStack>
                    <ZStack alignItems="center" justifyContent="center">
                        <Image source={require('../../assets/Sales/TagBackground.png')} alt="課業文具" />
                        <Text style={styles.searchTag}>其他</Text>
                    </ZStack>
                </HStack>
            </VStack>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default SearchScreen;
