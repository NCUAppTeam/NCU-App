import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Card, Title, Text, ProgressBar, TextInput, Button, Portal, Dialog, Subheading,
} from 'react-native-paper';
import Controller from '../../../controller/Home';
import styles from '../Styles';

function NetFlowWidget({ refresh }) {
  const [data, setData] = useState([0, 0]);
  const [ip, setIP] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  const fetchData = () => {
    Controller.getStoredIP()
      .then((storedIP) => {
        Controller.getNetFlowByIP(storedIP)
          .then((res) => {
            setData(res);
            setIP(storedIP);
          });
      });
  };
  useEffect(fetchData, [refresh]);

  const hideDialog = () => {
    Controller.setStoredIP(ip).then(() => {
      fetchData();
      setInputVisible(false);
    });
  };

  return (
    <View>
      <Card style={styles.card} onPress={() => setInputVisible(true)}>
        <Title style={styles.lead}>中大宿網資料</Title>
        <Subheading style={styles.lead}>{ip}</Subheading>
        <Card.Content style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.container}>
            <Text>校外上傳量</Text>
            <Title>{`${data[0]} / 3 GB`}</Title>
            <ProgressBar progress={data[0] / 3} />
          </View>
          <View style={styles.container}>
            <Text>校外下載量</Text>
            <Title>{`${data[1]}GB`}</Title>
          </View>
        </Card.Content>
      </Card>
      <Portal>
        <Dialog visible={inputVisible} onDismiss={hideDialog}>
          <Dialog.Title>請輸入你的ip位址</Dialog.Title>
          <Dialog.Content>
            <TextInput
              maxLength={15}
              value={ip}
              onChangeText={(text) => setIP(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default NetFlowWidget;
