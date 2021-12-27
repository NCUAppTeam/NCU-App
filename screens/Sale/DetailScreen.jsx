import React, { useState } from 'react';
import {
  Alert, SafeAreaView, Image, View, ScrollView,
} from 'react-native';
import {
  Text, TextInput, Button,
} from 'react-native-paper';
import SalesController from '../../controller/Sales';

function DetailScreen({ route }) {
  const { element } = route.params;
  const [comment, setComment] = useState('');
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ margin: 16 }}>
          <ScrollView horizontal pagingEnabled>
            <Image style={{ width: 328, height: 360 }} source={{ uri: element.imageUrl }} />
          </ScrollView>
          <View style={{ backgroundColor: '#e8e8e8' }}>
            <View style={{ backgroundColor: 'white', padding: 24, margin: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}>{element.name}</Text>
              <Text style={{ color: 'orange', fontSize: 30 }}>
                $
                {element.price}
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text>
                上傳時間：
                {element.dateString}
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18 }}>
                賣家姓名：
                {element.sellerName}
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18 }}>
                物品標籤：
                {element.tagName}
              </Text>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={{ fontSize: 18 }}>
                交易地點：
                {element.place}
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18 }}>
                物品簡介：
                {element.introduction}
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 25 }}>
                給賣家的留言
              </Text>
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={4}
                placeholder="留言&amp;聯絡資訊"
                value={comment}
                onChangeText={(result) => setComment(result)}
              />
            </View>
            <View style={{ padding: 10, alignItems: 'flex-end' }}>
              <Button
                mode="contained"
                onPress={() => {
                  if (comment === undefined) {
                    Alert.alert('內容不得為空');
                  } else {
                    SalesController.addComment(element.id, comment)
                      .then(() => {
                        setComment('');
                      }).catch((err) => {
                        Alert.alert(err.toString());
                      });
                  }
                }}
              >
                送出
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailScreen;
