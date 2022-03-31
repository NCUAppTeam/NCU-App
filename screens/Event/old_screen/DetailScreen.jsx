import React, { useEffect, useState } from 'react';
import {
  StyleSheet, ScrollView, Alert,
} from 'react-native';
import {
  Button, Title, Text,
} from 'react-native-paper';
import EventController from '../../controller/Event';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  line: {
    color: '#189AE0',
    margin: 16,
  },
  tx: {
    color: 'gray',
  },
  button: {
    margin: 16,
  },
});

function DetialScreen({ route }) {
  const { event } = route.params;
  const { id, data } = event;

  const [isSubscribe, setIsSubscribe] = useState(false);

  useEffect(() => {
    EventController.checkSubscribe(id)
      .then((res) => setIsSubscribe(res));
  }, []);

  const toggleSubscribe = () => {
    if (isSubscribe) {
      EventController.unsubscribe(id);
      Alert.alert('已取消訂閱!');
    } else {
      EventController.subscribe(id);
      Alert.alert('已訂閱!');
    }
    setIsSubscribe(!isSubscribe);
  };

  return (
    <ScrollView>
      <Title style={styles.title}>{data.name}</Title>

      <Text style={styles.line}>
        開始時間 :
        <Text style={styles.tx}>{ data.startTime.toDate().toLocaleString() }</Text>
      </Text>

      <Text style={styles.line}>
        結束時間 :
        <Text style={styles.tx}>{ data.endTime.toDate().toLocaleString() }</Text>
      </Text>

      <Text style={styles.line}>
        地點 :
        <Text style={styles.tx}>{data.location}</Text>
      </Text>

      <Text style={styles.line}>
        條件 :
        <Text style={styles.tx}>
          {data.qualification}
        </Text>
      </Text>

      <Text style={styles.line}>
        內容 :
        <Text style={styles.tx}>{data.content}</Text>
      </Text>

      <Button
        icon={isSubscribe ? 'check-square' : 'square'}
        color="#189AE0"
        style={styles.button}
        mode="contained"
        onPress={toggleSubscribe}
      >
        {isSubscribe ? '已訂閱' : '尚未訂閱'}
      </Button>
    </ScrollView>
  );
}

export default DetialScreen;
