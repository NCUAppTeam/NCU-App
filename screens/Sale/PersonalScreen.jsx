import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, RefreshControl, View, Text, TouchableOpacity,
} from 'react-native';
import {
  Provider, Button, Card, Title, Paragraph,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import SalesController from '../../controller/Sales';
import styles from './Styles';

function PersonalScreen({ route, navigation }) {
  const { onGoBack } = route.params;
  const [item, setItems] = useState([]);
  useEffect(() => {
    SalesController.getPersonalItem().then((res) => {
      setItems(res);
      onGoBack();
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    SalesController.getPersonalItem().then((res) => {
      onGoBack();
      setItems(res);
      setRefreshing(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <ScrollView
          style={styles.scrollView}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        >
          <View style={styles.personalContainer}>
            <Text style={styles.personalText}>買家</Text>
            <TouchableOpacity onPress={() => console.log("pressed")}>
              <LinearGradient
                // Button Linear Gradient
                colors={['#1784B2', '#1B79A5', '#28527A']}
                style={styles.personalButton}>
                <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 24, marginTop: 35, fontWeight: "bold"}}>收購商品</Text>
              </LinearGradient> 
            </TouchableOpacity>
            <Text style={styles.personalText}>賣家</Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('新增商品', { onGoBack: onRefresh });
            }}>
              <LinearGradient
                // Button Linear Gradient
                colors={['#1784B2', '#1B79A5', '#28527A']}
                style={styles.personalButton}>
                <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 24, marginTop: 35, fontWeight: "bold"}}>新增商品</Text>
              </LinearGradient> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("pressed")}>
              <LinearGradient
                // Button Linear Gradient
                colors={['#1784B2', '#1B79A5', '#28527A']}
                style={styles.personalButton}>
                <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 24, marginTop: 35, fontWeight: "bold"}}>管理商品</Text>
              </LinearGradient> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("pressed")}>
              <LinearGradient
                // Button Linear Gradient
                colors={['#1784B2', '#1B79A5', '#28527A']}
                style={styles.personalButton}>
                <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 24, marginTop: 35, fontWeight: "bold"}}>交易紀錄</Text>
              </LinearGradient> 
            </TouchableOpacity>
          </View>
          {
        item.map((element) => (
          <Card
            key={element.id}
            style={{
              flex: 1,
              padding: 10,
              margin: 4,
              opacity: element.show ? 1 : 0.2,
            }}
          >
            <Title>
              商品名稱:
              {element.name}
            </Title>
            <Paragraph>
              價錢:
              {element.price}
            </Paragraph>
            <Paragraph>
              時間:
              {element.dateString}
            </Paragraph>
            <Card.Cover source={{ uri: element.imageUrl }} />
            <View style={{
              padding: 8, flexDirection: 'row', flex: 1, justifyContent: 'flex-end',
            }}
            >
              <Button
                icon="marker"
                mode="outlined"
                color="#77acf1"
                onPress={() => {
                  navigation.navigate('編輯商品', { onGoBack: onRefresh, element });
                }}
              >
                編輯
              </Button>
              <Button
                icon="marker"
                mode="outlined"
                color="#77acf1"
                style={{ marginLeft: 8 }}
                onPress={() => {
                  SalesController.changeShow(
                    element.id, !element.show,
                  );
                  onRefresh();
                }}
              >
                { element.show ? '隱藏' : '顯示' }
              </Button>
              <Button
                icon="marker"
                mode="outlined"
                color="red"
                style={{ marginLeft: 8 }}
                onPress={() => {
                  SalesController.deleteItem(element.id);
                  onRefresh();
                }}
              >
                刪除
              </Button>
            </View>
            <View>
              <Button
                mode="outlined"
                color="red"
                style={{ marginLeft: 8 }}
                onPress={() => {
                  navigation.navigate('商品評論', { element });
                }}
              >
                查看留言
              </Button>
            </View>
          </Card>
        ))
    }
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
}

export default PersonalScreen;
