import React, { useState, useEffect } from 'react';
import {
  Alert, SafeAreaView, View, Image, TouchableOpacity
} from 'react-native';
import { NativeBaseProvider, Text, Box, Badge, Button, Icon, Input, Select, Checkbox, CheckIcon, WarningOutlineIcon } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './Styles';
import { LinearGradient } from 'expo-linear-gradient';
import SalesController from '../../controller/Sales';

function AddScreen({ route, navigation }) {
  const { onGoBack } = route.params;
  const [data, setData] = useState({ image: { uri: null } });
  const [picked, setPicked] = useState({});
  const [tags, setTags] = useState([]);
  const [service, setService] = useState("");
  const [checkPrice, setCheckPrice] = useState([]);
  const [pressedAcquire, setPressedAcquire] = useState(false);
  const [pressedSell, setPressedSell] = useState(false);
  const [pressedRent, setPressedRent] = useState(false);

  function CompleteButton(){
    return(
      <View style={{ flexDirection: 'row', marginTop: 10, right: 0, alignItems: "center", justifyContent: "center" }}>
        <LinearGradient
          // Button Linear Gradient
          colors={['#28527A', '#28527A', '#0288D1']}
          style={styles.buttonComplete}>
          <Text style={{color: "#FBEEAC", textAlign: "center",marginTop: 10, fontWeight: "700"}} fontSize="xl">新增</Text>
        </LinearGradient>
      </View>
    );
  }

  function NotCompleteButton(){
    return(
      <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, right: 0, alignItems: "center", justifyContent: "center" }}>
        <Button
          _text={{
            color: "#737373",
            fontSize: 24,
            fontWeight: "700"
          }}
          style={styles.buttonAdd}
          onPress={() => {
            const {
              name, price, place, introduction, tagId, image,
            } = data;
            if (name === undefined) {
              Alert.alert('商品名稱不得為空');
            } else if (price === undefined) {
              Alert.alert('價錢不得為空');
            } else if (place === undefined) {
              Alert.alert('地點不得為空');
            } else if (introduction === undefined) {
              Alert.alert('物品簡介不得為空');
            } else if (tagId === undefined) {
              Alert.alert('請選擇標籤');
            } else if (image.uri === null) {
              Alert.alert('請選擇圖片');
            } else {
              SalesController.addItem(name, price, place, introduction, tagId, image.uri)
                .then(() => {
                  onGoBack();
                  navigation.goBack();
                }).catch((err) => {
                  Alert.alert(err.toString());
                });
            }
          }}
        >
          新增
        </Button>
      </View>
    );
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

  return (
    <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.editText}>分類</Text>
          <View style={styles.postTag}>
            <TouchableOpacity onPress={AcquireStatus}>
              { pressedAcquire ?
                <View style={styles.tagPressedContainer}>
                  <Text style={styles.tagPressed}>收購</Text>
                </View> : 
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>收購</Text>
                </View>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={SellStatus}>
              { pressedSell ?
                <View style={styles.tagPressedContainer}>
                  <Text style={styles.tagPressed}>出售</Text>
                </View> : 
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>出售</Text>
                </View>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={RentStatus}>
              { pressedRent ?
                <View style={styles.tagPressedContainer}>
                  <Text style={styles.tagPressed}>租借</Text>
                </View> : 
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>租借</Text>
                </View>
              }
            </TouchableOpacity>
          </View>

          <Text style={styles.editText}>名稱</Text>
          <Input
            style={styles.textinput}
            maxLength={20}
            label="商品名稱"
            value={data.name}
            onChangeText={(text) => setData({ ...data, name: text })}
          />
          <Text style={styles.editText}>價錢</Text>
          <View style={styles.priceContainer}>
            <Input
              w="70%"
              maxLength={10}
              label="價格"
              value={data.price}
              onChangeText={(text) => setData({ ...data, price: text })}
            />
            <Checkbox onChange={setCheckPrice} colorScheme="info" value={checkPrice}>
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
          />
          <Text style={styles.editText}>標籤</Text>
          <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="選擇標籤" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setService(itemValue)}>
              <Select.Item label="課業文具" value="ux" />
              <Select.Item label="日常用品" value="web" />
              <Select.Item label="居家用品" value="cross" />
              <Select.Item label="美食料理" value="ui" />
              <Select.Item label="衣服配件" value="backend" />
              <Select.Item label="美妝保養" value="backend" />
              <Select.Item label="票卷/周邊" value="backend" />
              <Select.Item label="其他" value="backend" />
          </Select>
          <View>
            <Text style={styles.photoText}>照片/影片</Text>
            <Button 
              leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}
              onPress={() => {
              ImagePicker.requestCameraPermissionsAsync()
                .then((permission) => {
                  if (permission.granted === false) {
                    Alert('We need related permissions to work!');
                  }
                }).catch((err) => {
                  throw err;
                });
              ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                allowsMultipleSelection: false,
                quality: 0.6,
              }).then((res) => {
                setData({ ...data, image: res });
              }).catch((err) => {
                throw err;
              });
            }}
              style={styles.buttonUpload}
            >
              上傳
            </Button>
          </View>
          <View>
            <Image
              style={{ width: 150, height: 160 }}
              source={{ uri: data.image.uri }}
            />
          </View>
          <CompleteButton />
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
export default AddScreen;
