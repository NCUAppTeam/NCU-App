import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, RefreshControl, View, Text, TouchableOpacity,
} from 'react-native';
import {
  Stack, HStack, NativeBaseProvider, Box, Heading, AspectRatio, Image,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import SalesController from '../../controller/Sales';
import styles from './Styles';

function ClothsProductScreen({ navigation }) {
  const [Acquireproduct, setAcquireProduct] = useState([]);
  const [Sellproduct, setSellProduct] = useState([]);
  const [Rentproduct, setRentProduct] = useState([]);
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
  };

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
    SalesController.getItembyTagandType(4, 0).then((res) => {
      // console.warn('h');
      setSellProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [SalesController]);

  useEffect(() => {
    SalesController.getItembyTagandType(4, 1).then((res) => {
      // console.warn('h');
      setAcquireProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [SalesController]);

  useEffect(() => {
    SalesController.getItembyTagandType(4, 2).then((res) => {
      // console.warn('h');
      setRentProduct(res);
    }).catch((err) => {
      throw err;
    });
  }, [SalesController]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    SalesController.getHomePageItem().then((res) => {
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

  function AcquireproductCards() {
    return (
      Acquireproduct.map(({
        productName, price, imageURL,
      }) => (
        <Box alignItems="center" marginTop="5">
          <Box
            maxW="250"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1.5"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'white',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
            <Box>
              <AspectRatio w="100%" ratio={3 / 3}>
                <Image source={{ uri: imageURL }} alt="image" />
              </AspectRatio>
            </Box>
            <Stack p="5" space={3}>
              <Stack space={2}>
                <Heading size="lg" ml="-1" bold>
                  {`${productName}`}
                </Heading>
                <HStack justifyContent="space-between">
                  <Text
                    fontSize="2xl"
                    style={{ color: '#28527A', fontWeight: '500' }}
                    ml="-0.5"
                    mt="-1"
                  >
                    {`NT$${price}`}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      ))
    );
  }

  function SellproductCards() {
    return (
      Sellproduct.map(({
        productName, price, imageURL,
      }) => (
        <Box alignItems="center" marginTop="5">
          <Box
            maxW="250"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1.5"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'white',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
            <Box>
              <AspectRatio w="100%" ratio={3 / 3}>
                <Image source={{ uri: imageURL }} alt="image" />
              </AspectRatio>
            </Box>
            <Stack p="5" space={3}>
              <Stack space={2}>
                <Heading size="lg" ml="-1" bold>
                  {`${productName}`}
                </Heading>
                <HStack justifyContent="space-between">
                  <Text
                    fontSize="2xl"
                    style={{ color: '#28527A', fontWeight: '500' }}
                    ml="-0.5"
                    mt="-1"
                  >
                    {`NT$${price}`}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      ))
    );
  }

  function RentproductCards() {
    return (
      Rentproduct.map(({
        productName, price, imageURL,
      }) => (
        <Box alignItems="center" marginTop="5">
          <Box
            maxW="250"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1.5"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'white',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'white',
            }}
          >
            <Box>
              <AspectRatio w="100%" ratio={3 / 3}>
                <Image source={{ uri: imageURL }} alt="image" />
              </AspectRatio>
            </Box>
            <Stack p="5" space={3}>
              <Stack space={2}>
                <Heading size="lg" ml="-1" bold>
                  {`${productName}`}
                </Heading>
                <HStack justifyContent="space-between">
                  <Text
                    fontSize="2xl"
                    style={{ color: '#28527A', fontWeight: '500' }}
                    ml="-0.5"
                    mt="-1"
                  >
                    {`NT$${price}`}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      ))
    );
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <HStack justifyContent="center" alignItems="center" space={3} marginTop="5">
          <TouchableOpacity onPress={AcquireStatus}>
            { pressedAcquire
              ? (
                <LinearGradient
                // Button Linear Gradient
                  colors={['#28527A', '#28527A', '#0288D1']}
                  style={styles.buttonTagPressed}
                >
                  <Text style={{
                    color: '#FBEEAC', textAlign: 'center', fontSize: 16, marginTop: 10,
                  }}
                  >
                    收購
                  </Text>
                </LinearGradient>
              )
              : (
                <View style={styles.textContainer}>
                  <Text style={styles.tagText}>收購</Text>
                </View>
              )}
          </TouchableOpacity>

          <TouchableOpacity onPress={SellStatus}>
            { pressedSell
              ? (
                <LinearGradient
                // Button Linear Gradient
                  colors={['#28527A', '#28527A', '#0288D1']}
                  style={styles.buttonTagPressed}
                >
                  <Text style={{
                    color: '#FBEEAC', textAlign: 'center', fontSize: 16, marginTop: 10,
                  }}
                  >
                    出售
                  </Text>
                </LinearGradient>
              )
              : (
                <View style={styles.textContainer}>
                  <Text style={styles.tagText}>出售</Text>
                </View>
              )}
          </TouchableOpacity>

          <TouchableOpacity onPress={RentStatus}>
            { pressedRent
              ? (
                <LinearGradient
                // Button Linear Gradient
                  colors={['#28527A', '#28527A', '#0288D1']}
                  style={styles.buttonTagPressed}
                >
                  <Text style={{
                    color: '#FBEEAC', textAlign: 'center', fontSize: 16, marginTop: 10,
                  }}
                  >
                    租借
                  </Text>
                </LinearGradient>
              )
              : (
                <View style={styles.textContainer}>
                  <Text style={styles.tagText}>租借</Text>
                </View>
              )}
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
          {pressedAcquire ? <AcquireproductCards /> : <View />}
          {pressedSell ? <SellproductCards /> : <View /> }
          {pressedRent ? <RentproductCards /> : <View /> }
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default ClothsProductScreen;
