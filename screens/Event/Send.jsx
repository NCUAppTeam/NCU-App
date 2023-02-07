import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, RefreshControl,
  ScrollView, Button,
} from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Card, TextInput } from 'react-native-paper';
import {
  NativeBaseProvider, Box, HStack,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style_folder/Styles_Message';
import ActiveController from '../../controller/Active';

function Send({ navigation }) {
  const [data, setData] = useState({});
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    ActiveController.getRelativeMessage().then((res) => {
      setGetData(res);
    }).then().catch((err) => {
      throw err;
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    ActiveController.getRelativeMessage().then((res) => {
      setGetData(res);
    }).then().catch((err) => {
      throw err;
    });
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <ScrollView
          Vertical
          style={{ flex: 1 }}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
  )}
        >
          <LinearGradient
            colors={['#1784B2', '#28527A']}
            start={[1, 2]}
            end={[1, 0]}
          >
            <Box style={styles.header}>
              <HStack style={{ flex: 1 }}>
                <Box style={styles.headerArrowBox}>
                  <AntDesign
                    name="arrowleft"
                    size={28}
                    color="#fff"
                    onPress={() => { navigation.navigate('message', { prepage: 'Send' }); }}
                  />
                </Box>
                <Box style={styles.title}>
                  <FontAwesome5
                    name="comment"
                    size={25}
                    color="#fff"
                  >
                    <Text>&ensp;私訊中心</Text>
                  </FontAwesome5>
                </Box>
              </HStack>
            </Box>
          </LinearGradient>
          <View style={{ margin: 50, borderWidth: 1 }}>
            <Text>from</Text>
            <TextInput
              placeholder="學號"
              value={data.send}
              onChangeText={(text) => setData({ ...data, send: text })}
              selectionColor="#ccc"
            />
            <Text>to</Text>
            <TextInput
              placeholder="學號"
              value={data.receive}
              onChangeText={(text) => setData({ ...data, receive: text })}
              selectionColor="#ccc"
            />
            <Text>message</Text>
            <TextInput
              value={data.message}
              onChangeText={(text) => setData({ ...data, message: text })}
              selectionColor="#ccc"
            />
            <Button
              title="傳送"
              onPress={() => {
                data.sendTime = new Date();
                ActiveController.addMessage(data);
              }}
            />
          </View>
          <View>

            <View>
              {getData.map(({
                id, send, receive, message,
              }) => (
                <Card
                  key={id}
                >
                  <Card.Content>
                    <Text>
                      from:
                      {send}
                    </Text>
                    <Text>
                      to:
                      {receive}
                    </Text>
                    <Text>
                      message:
                      {message}
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </View>
            <Button
              title="讀取"
              onPress={() => {
                ActiveController.getRelativeMessage();
              }}
            />

          </View>
        </ScrollView>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
export default Send;
