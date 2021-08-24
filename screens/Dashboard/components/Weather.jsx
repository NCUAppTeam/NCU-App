import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Card, Title, Text,
} from 'react-native-paper';
import Controller from '../../../controller/Home';
import styles from '../Styles';

function WeatherWidget({ refresh }) {
  const [data, setData] = useState({});

  useEffect(() => {
    Controller.getWeather()
      .then((res) => {
        setData(res);
      });
  }, [refresh]);

  return (
    <Card style={styles.card}>
      <Title style={styles.lead}>中大氣象站資料</Title>
      <Card.Content style={styles.row}>
        <View style={styles.container}>
          <Text>氣溫</Text>
          <Title>{`${data.temperature}°C`}</Title>
        </View>
        <View style={styles.container}>
          <Text>濕度</Text>
          <Title>{`${data.humidity}%`}</Title>
        </View>
      </Card.Content>
    </Card>
  );
}

export default WeatherWidget;
