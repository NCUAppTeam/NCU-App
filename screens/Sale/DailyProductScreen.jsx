import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, RefreshControl, View, Text, TouchableOpacity, TextInput
} from 'react-native';
import {
  Card, FAB, Title, Paragraph, Chip, Searchbar, 
} from 'react-native-paper';
import { Stack, HStack, Input, Button, IconButton, Icon, NativeBaseProvider, Center, Box, Divider, Heading, AspectRatio, Image } from "native-base";
import styles from './Styles';
import SalesController from '../../controller/Sales';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather, FontAwesome } from '@expo/vector-icons';

function DailyProductScreen({ navigation }) {
  const [picked, setPicked] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [searchbarText, setSearchbarText] = useState('');
  // const [items, setItems] = useState([]);
  const [pressedAcquire, setPressedAcquire] = useState(true);
  const [pressedSell, setPressedSell] = useState(false);
  const [pressedRent, setPressedRent] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const SavedStatus = () => {
    setSaved(!saved);
  }

  const AcquireStatus = () => {
    setPressedAcquire(true);
    setPressedSell(false);
    setPressedRent(false);
  };

  const SellStatus = () => {
    setPressedAcquire(false);
    setPressedSell(true);
    setPressedRent(false);
  };

  const RentStatus = () => {
    setPressedAcquire(false);
    setPressedSell(false);
    setPressedRent(true);
  };

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

  // const [product, setProduct] = useState([]);
  // useEffect(() => {
  //   SalesController.getSellItem().then((res) => {
  //     setProduct(res);
  //   }).catch((err) => {
  //     throw err;
  //   });
  // }, []);

  // function ProductCard() {
  //   return (
  //     product.map(({
  //       id, productName, price, status, username, imageURL,type
  //     }) => (
  //     <Box key={id} alignItems="center" marginTop="5">
  //       <Box maxW="250" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1.5"  _dark={{
  //       borderColor: "coolGray.600",
  //       backgroundColor: "white"
  //       }} _web={{
  //         shadow: 2,
  //         borderWidth: 0
  //       }} _light={{
  //         backgroundColor: "white"
  //       }}>
  //         <Box>
  //           <AspectRatio w="100%" ratio={3/3}>
  //             <Image source={{ uri: imageURL }} alt="image" />
  //           </AspectRatio>
  //         </Box>
  //         <Stack p="5" space={3}>
  //           <Stack space={2}>
  //             <Heading size="lg" ml="-1" bold>
  //             {`${productName}`}
  //             </Heading>
  //             <HStack justifyContent="space-between">
  //               <Text fontSize="lg" _light={{
  //               color: "#28527A"
  //             }} _dark={{
  //               color: "white"
  //             }} fontWeight="500" ml="-0.5" mt="-1">
  //             {`NT$${price}`}
  //               </Text>
  //               <TouchableOpacity onPress={SavedStatus}>
  //                 { saved ? <FontAwesome name="bookmark" size={24} color="#0C4A6E" /> :
  //                   <FontAwesome name="bookmark-o" size={24} color="#0C4A6E" />
  //                 }
  //               </TouchableOpacity>
  //             </HStack>
  //           </Stack>
  //         </Stack>
  //       </Box>
  //     </Box>
  //     ))
  //   );
  // }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <HStack justifyContent="center" alignItems="center" space={3} marginTop="5">
          <TouchableOpacity onPress={AcquireStatus}>
            { pressedAcquire ? 
              <LinearGradient
                // Button Linear Gradient
                colors={['#28527A', '#28527A', '#0288D1']}
                style={styles.buttonTagPressed}>
                <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 16, marginTop: 10,}}>收購</Text>
              </LinearGradient> : 
              <View style={styles.textContainer}>
                <Text style={styles.tagText}>收購</Text>
              </View>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={SellStatus}>
            { pressedSell? 
              <LinearGradient
                // Button Linear Gradient
                colors={['#28527A', '#28527A', '#0288D1']}
                style={styles.buttonTagPressed}>
                <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 16, marginTop: 10,}}>出售</Text>
              </LinearGradient> : 
              <View style={styles.textContainer}>
                <Text style={styles.tagText}>出售</Text>
              </View>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={RentStatus}>
            { pressedRent ? 
              <LinearGradient
                // Button Linear Gradient
                colors={['#28527A', '#28527A', '#0288D1']}
                style={styles.buttonTagPressed}>
                <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 16, marginTop: 10,}}>租借</Text>
              </LinearGradient> : 
              <View style={styles.textContainer}>
                <Text style={styles.tagText}>租借</Text>
              </View>
            }
          </TouchableOpacity>
        </HStack>
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        >
          <Center flex={1} px="3">
          </Center>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default DailyProductScreen;
