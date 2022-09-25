import React, { useState, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  NativeBaseProvider,
  View,
  Text,
  Button,
  Icon,
  Input,
  Select,
  Checkbox,
  CheckIcon,
  HStack,
  Divider,
  ScrollView,
  Stack,
  Box,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './Styles';
import SalesController from '../../controller/Sales';

function AddScreen({ route, navigation }) {
  const { onGoBack } = route.params;
  const [data, setData] = useState({ image: { uri: null } });
  const [checkPrice, setCheckPrice] = useState(false);
  const [pressedAcquire, setPressedAcquire] = useState(false);
  const [pressedSell, setPressedSell] = useState(false);
  const [pressedRent, setPressedRent] = useState(false);
  const [isNotCompleted, setIsNotCompleted] = useState(true);
  const [Refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      // setData({ type: " " }),
      // setData({ name: "" }),
      // setData({ price: "" }),
      // setData({ place: "" }),
      // setData({ introduction: "" }),
      // setData({ tag: "" }),
      // setData({ image: { uri: null } });
    }, 500);
  };

  function NewCompleteButton() {
    return !isNotCompleted ? (
      <View
        flexDirection="row"
        width="100%"
        height="8%"
        alignItems="center"
        bg="#28527A"
      >
        <TouchableOpacity
          isDisabled={isNotCompleted}
          _text={{
            fontSize: 20,
            fontWeight: '700',
          }}
          style={styles.buttonAddNext}
          onPress={() => {
            const {
              type, name, price, place, introduction, tag, image,
            } = data;
            if (type === undefined) {
              Alert.alert('商品分類不得為空');
            } else if (name === undefined) {
              Alert.alert('商品名稱不得為空');
            } else if (price === undefined) {
              Alert.alert('價錢不得為空');
            } else if (place === undefined) {
              Alert.alert('地點不得為空');
            } else if (introduction === undefined) {
              Alert.alert('物品簡介不得為空');
            } else if (tag === undefined) {
              Alert.alert('請選擇標籤');
            } else if (image.uri === null) {
              Alert.alert('請選擇圖片');
            } else {
              SalesController.newAddItem(
                type,
                name,
                price,
                checkPrice,
                place,
                introduction,
                tag,
                image.uri,
              )
                .then(() => onRefresh())
                .catch((err) => {
                  Alert.alert(err.toString());
                });
            }
            // onRefresh();
          }}
        >
          <Box marginX="11%">
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '700',
                justifyContent: 'center',
              }}
              fontSize="xl"
            >
              新增下一樣
            </Text>
          </Box>
        </TouchableOpacity>
        <Divider
          orientation="vertical"
          thickness="2"
          bg="#BFBFBF"
          h="8"
          // marginX="10%"
        />
        <Box marginX="20%">
          <TouchableOpacity
            isDisabled={isNotCompleted}
            _text={{
              fontSize: 20,
              fontWeight: '700',
            }}
            style={styles.buttonAddNext}
            onPress={() => {
              onGoBack();
              navigation.goBack();
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '700',
                justifyContent: 'center',
              }}
              fontSize="xl"
            >
              完成
            </Text>
          </TouchableOpacity>
        </Box>
      </View>
    ) : (
      // not complete
      <View
        flexDirection="row"
        width="100%"
        height="8%"
        alignItems="center"
        bg="#E5EBF1"
      >
        <TouchableOpacity
          isDisabled={isNotCompleted}
          _text={{
            fontSize: 20,
            fontWeight: '700',
          }}
          style={styles.buttonAddNext}
        >
          <Box marginX="11%">
            <Text
              style={{
                color: '#737373',
                textAlign: 'center',
                fontWeight: '700',
                justifyContent: 'center',
              }}
              fontSize="xl"
            >
              新增下一樣
            </Text>
          </Box>
        </TouchableOpacity>
        <Divider orientation="vertical" thickness="2" bg="#BFBFBF" h="8" />
        <TouchableOpacity
          isDisabled={isNotCompleted}
          _text={{
            fontSize: 20,
            fontWeight: '700',
          }}
          style={styles.buttonAddNext}
        >
          <Box marginX="20%">
            <Text
              style={{
                color: '#737373',
                textAlign: 'center',
                fontWeight: '700',
                justifyContent: 'center',
              }}
              fontSize="xl"
            >
              完成
            </Text>
          </Box>
        </TouchableOpacity>
      </View>
    );
  }

  function checkComplete(productType) {
    // console.warn('123');
    if (
      data.name
      && data.price !== undefined
      && data.place
      && data.introduction
      && data.tag
      && data.image !== null
      && productType !== undefined
    ) {
      setIsNotCompleted(false);
    } else {
      setIsNotCompleted(true);
    }
  }

  function checkType() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data.type);
      }, 0);
    });
  }

  async function getType() {
    const productType = await checkType();
    // console.warn(productType);
    checkComplete(productType);
  }
  getType();

  // const setStatus = (status) => {
  //   setPressedAcquire(status === "收購");
  //   setPressedSell(status === "出售");
  //   setPressedRent(status === "租借");
  //   setData({ ...data, type: status });
  //   // checkComplete();
  // };

  const AcquireStatus = () => {
    setPressedAcquire(true);
    setPressedSell(false);
    setPressedRent(false);
    setData({ ...data, type: '收購' });
    checkComplete();
  };

  const SellStatus = () => {
    setPressedAcquire(false);
    setPressedSell(true);
    setPressedRent(false);
    setData({ ...data, type: '出售' });
    checkComplete();
  };

  const RentStatus = () => {
    setPressedAcquire(false);
    setPressedSell(false);
    setPressedRent(true);
    setData({ ...data, type: '租借' });
    checkComplete();
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          h="150%"
          refreshControl={
            <RefreshControl refreshing={Refresh} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.editText}>分類</Text>
          <View style={styles.postTag}>
            <TouchableOpacity onPress={AcquireStatus}>
              {pressedAcquire ? (
                <View style={styles.tagPressedContainer}>
                  <Text style={styles.tagPressed}>收購</Text>
                </View>
              ) : (
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>收購</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={SellStatus}>
              {pressedSell ? (
                <View style={styles.tagPressedContainer}>
                  <Text style={styles.tagPressed}>出售</Text>
                </View>
              ) : (
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>出售</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={RentStatus}>
              {pressedRent ? (
                <View style={styles.tagPressedContainer}>
                  <Text style={styles.tagPressed}>租借</Text>
                </View>
              ) : (
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>租借</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.editText}>名稱</Text>
          <Input
            style={styles.textinput}
            maxLength={20}
            label="商品名稱"
            value={data.name}
            onChangeText={(text) => setData({ ...data, name: text })}
            onBlur={checkComplete}
          />
          <Text style={styles.editText}>價錢</Text>
          <View style={styles.priceContainer}>
            <Input
              w="70%"
              maxLength={10}
              label="價格"
              value={data.price}
              onChangeText={(text) => setData({ ...data, price: text })}
              onBlur={checkComplete}
            />
            <Checkbox
              onChange={setCheckPrice}
              colorScheme="info"
              value={checkPrice}
            >
              可議價
            </Checkbox>
          </View>

          <Text style={styles.editText}>地點</Text>
          <Input
            style={styles.textinput}
            maxLength={20}
            placeholder="e.g. 後門小七"
            label="地點"
            value={data.place}
            onChangeText={(text) => setData({ ...data, place: text })}
            onBlur={checkComplete}
          />
          <Text style={styles.editText}>描述</Text>
          <Input
            h="15%"
            multiline
            numberOfLines={3}
            maxH="92px"
            placeholder="e.g. 全新、原價＿＿、使用一學期"
            label="物品簡介"
            value={data.introduction}
            onChangeText={(text) => setData({ ...data, introduction: text })}
            onBlur={checkComplete}
          />
          <Text style={styles.editText}>標籤</Text>
          <Select
            selectedValue={data.tag}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="選擇標籤"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setData({ ...data, tag: itemValue });
              checkComplete();
            }}
          >
            <Select.Item label="課業文具" value="課業文具" />
            <Select.Item label="日常用品" value="日常用品" />
            <Select.Item label="居家用品" value="居家用品" />
            <Select.Item label="美食料理" value="美食料理" />
            <Select.Item label="衣服配件" value="衣服配件" />
            <Select.Item label="美妝保護" value="美妝保護" />
            <Select.Item label="票卷/周邊" value="票卷/周邊" />
            <Select.Item label="其他" value="其他" />
          </Select>
          <View>
            <Text style={styles.photoText}>照片/影片</Text>
            <Button
              leftIcon={
                <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
              }
              onPress={() => {
                ImagePicker.requestCameraPermissionsAsync()
                  .then((permission) => {
                    if (permission.granted === false) {
                      Alert('We need related permissions to work!');
                    }
                  })
                  .catch((err) => {
                    throw err;
                  });
                ImagePicker.launchImageLibraryAsync({
                  allowsEditing: true,
                  allowsMultipleSelection: false,
                  quality: 0.6,
                })
                  .then((res) => {
                    setData({ ...data, image: res });
                  })
                  .catch((err) => {
                    throw err;
                  });
              }}
              style={styles.buttonUpload}
            >
              上傳
            </Button>
          </View>
          <View style={{ marginBottom: 30 }}>
            <Image
              style={{ width: 150, height: 160 }}
              source={{ uri: data.image.uri }}
            />
          </View>
        </ScrollView>
        <NewCompleteButton />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
export default AddScreen;
