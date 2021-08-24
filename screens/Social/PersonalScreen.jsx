import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, View, ScrollView, RefreshControl,
} from 'react-native';
import {
  Text, Button, Card, Title,
} from 'react-native-paper';
import styles from './Styles';
import { getUserActivities, deleteActivity } from '../../controller/Activity';

function PersonalScreen({ route, navigation }) {
  const { onGoBack } = route.params;
  const [item, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    getUserActivities().then((res) => {
      setItems(res);
      onGoBack();
      setRefreshing(false);
    });
  };
  useEffect(fetchData, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
      )}
      >
        <Button onPress={() => navigation.navigate('新增活動', { onGoBack: onRefresh })}>
          新增活動
        </Button>
        {
        item.map((element) => (
          <Card
            key={element.id}
            style={{ flex: 1, padding: 16, margin: 4 }}
          >
            <Title style={{ fontWeight: 'bold' }}>
              {element.name}
            </Title>
            <Text>{`價錢:${element.price}`}</Text>
            <Text>{`時間:${element.time.toDate().toLocaleString()}`}</Text>
            <Text>{`條件:${element.qualification}`}</Text>
            <Text>{`人數: ${element.attendees.length}/${element.numberLimit}`}</Text>
            <Text>
              詳細資訊:
              {element.details}
            </Text>
            <View style={styles.buttonRow}>
              <Button
                icon="marker"
                mode="outlined"
                color="#77acf1"
                onPress={() => {
                  navigation.navigate('編輯活動', { onGoBack: onRefresh, element });
                }}
              >
                編輯
              </Button>
              <Button
                icon="marker"
                mode="outlined"
                color="red"
                style={{ marginLeft: 8 }}
                onPress={() => {
                  deleteActivity(element.id);
                  onRefresh();
                }}
              >
                刪除
              </Button>
            </View>
          </Card>
        ))
    }
      </ScrollView>
    </SafeAreaView>
  );
}

export default PersonalScreen;
