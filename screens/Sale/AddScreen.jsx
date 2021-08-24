import React, { useState, useEffect } from 'react';
import {
  Alert, SafeAreaView, View, Image,
} from 'react-native';
import {
  TextInput, Chip, Button,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './Styles';
import SalesController from '../../controller/Sales';

function AddScreen({ route, navigation }) {
  const { onGoBack } = route.params;
  const [data, setData] = useState({ image: { uri: null } });
  const [picked, setPicked] = useState({});
  const [tags, setTags] = useState([]);
  useEffect(() => {
    SalesController.getAllTag().then((res) => {
      setTags(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.textinput}
          maxLength={20}
          label="商品名稱"
          value={data.name}
          onChangeText={(text) => setData({ ...data, name: text })}
        />
        <TextInput
          style={styles.textinput}
          maxLength={10}
          label="價格"
          value={data.price}
          onChangeText={(text) => setData({ ...data, price: text })}
        />
        <TextInput
          style={styles.textinput}
          maxLength={20}
          label="地點"
          value={data.place}
          onChangeText={(text) => setData({ ...data, place: text })}
        />
        <TextInput
          style={styles.bigtextinput}
          multiline
          numberOfLines={3}
          label="物品簡介"
          value={data.introduction}
          onChangeText={(text) => setData({ ...data, introduction: text })}
        />
        <View style={{ flexDirection: 'row', marginTop: 10, flexWrap: 'wrap' }}>

          {
          tags.map((tag) => (
            <Chip
              key={tag.icon.toString()}
              icon={tag.icon}
              selected={picked[tag.id]}
              onPress={() => {
                setPicked({ [tag.id]: true });
                setData({ ...data, tagId: tag.id });
              }}
            >
              {tag.name}
            </Chip>
          ))
      }
        </View>
        <View>
          <Button onPress={() => {
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
          >
            上傳圖片
          </Button>
        </View>
        <View>
          <Image
            style={{ width: 328, height: 360 }}
            source={{ uri: data.image.uri }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, right: 0 }}>
          <Button
            mode="contained"
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
          <Button mode="contained" onPress={() => navigation.goBack()}>
            取消
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default AddScreen;
