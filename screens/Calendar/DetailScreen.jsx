import React from 'react';
import {
  ScrollView, SafeAreaView, StyleSheet, Text,
} from 'react-native';
import { Title, Button, Subheading } from 'react-native-paper';
import * as Linking from 'expo-linking';
import CalendarController from '../../controller/Calendar';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  link: {
    color: '#046FD2',
    textDecorationLine: 'underline',
  },
  button: {
    margin: 8,
  },
  row: {
    margin: 4,
  },
});

function DetailScreen({ route: { params }, navigation }) {
  const { id, data, onRefresh } = params;

  const remove = () => {
    CalendarController.deleteEvent(id);
    onRefresh();
    navigation.goBack();
  };

  const edit = () => {
    navigation.navigate('編輯行程', { id, data, onRefresh });
  };

  const handleLink = () => {
    Linking.openURL(data.link);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Title>{data.name}</Title>
        <Subheading>{`從 ${data.startTime.toDate().toLocaleString()}`}</Subheading>
        <Subheading>{`到 ${data.endTime.toDate().toLocaleString()}`}</Subheading>
        <Text style={styles.row}>{`地點: ${data.location}`}</Text>
        <Text style={styles.row}>
          {'連結: '}
          <Text style={styles.link} onPress={handleLink}>{data.link}</Text>
        </Text>
        <Text style={styles.row}>{`備註:\n${data.content}`}</Text>
        <Button style={styles.button} color="#046FD2" mode="contained" onPress={edit}>修改</Button>
        <Button style={styles.button} color="#046FD2" mode="contained" onPress={remove}>刪除</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailScreen;
