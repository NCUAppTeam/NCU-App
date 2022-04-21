import React, { useState, useEffect } from 'react';
import {
  Text, Platform, View, SafeAreaView, TextInput,
  ScrollView, TouchableOpacity, Alert, Dimensions, Image, TouchableHighlight,
} from 'react-native';
import {
  Dialog, Portal, Button, Provider, Card, Title,
} from 'react-native-paper';
import {
  Ionicons, AntDesign, MaterialCommunityIcons, Feather, FontAwesome5,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, Heading,
} from 'native-base';
import ActiveController from '../../controller/Active';
import styles from './Styles';

function manage({ route, navigation }) {
  const Cd = route.params;
  // console.log('123', JSON.stringify(Cd).slice(6, -1));
  const [active, setActive] = useState([]);
  useEffect(() => {
    ActiveController.getOneActive(JSON.stringify(Cd).slice(7, -2)).then((res) => {
      setActive(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [message, messageSent] = useState('');

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <NativeBaseProvider>
            <View style={{ flex: 0.1, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <Box style={{
                  flex: 0.8, justifyContent: 'center', alignItems: 'flex-start',
                }}
                >
                  <AntDesign
                    name="arrowleft"
                    size={28}
                    color="darkblue"
                    style={{ justifyContent: 'center' }}
                    onPress={() => { navigation.navigate('personal'); }}
                  />
                </Box>
                <View style={styles.nameheader}>
                  <Text style={styles.name}>
                    管理活動
                  </Text>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'flex-end',
                }}
                >
                  <Feather
                    name="trash-2"
                    size={25}
                    color="darkblue"
                  />
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'flex-end',
                }}
                >
                  <Feather
                    name="edit"
                    size={24}
                    color="darkblue"
                    onPress={() => {
                      console.log('edit');
                      navigation.navigate('edit');
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView>
                {active.map(({
                  id, name, limitNum, imageUri, startNoYr, endNoYr, place,
                  cost, link, hostName, hostPhone, hostMail, details,
                }) => (
                  <Card
                    key={id}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <Heading>{name}</Heading>
                    <Divider my={2} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
                    <Card.Content style={{ padding: 0 }}>
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, color: 'black' }}>發送通知</Text>
                        <TextInput
                          style={styles.messageBox}
                          placeholder="在這裡輸入的訊息，將以私訊的方式發送給所有參加者"
                          onChangeText={(text) => messageSent(text)}
                          selectionColor="#ccc"
                        />
                        <View>
                          <View style={{ flex: 9 }} />
                          <View style={{ flex: 2 }}>
                            <TouchableOpacity
                              style={styles.managebtn}
                              onPress={() => { ActiveController.sentMeaasge(message); }}
                            >
                              <Text style={styles.managebtnText}>發送給所有參與者</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View>
                          <Divider marginTop={7} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
                        </View>
                        <View>
                          <Text style={{ fontSize: 18, color: 'black' }}>
                            參加名單
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            目前人數：       10 /
                            {' '}
                            {limitNum}
                            人

                          </Text>
                        </View>
                        <View style={styles.participantsBox} />

                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </ScrollView>
            </View>
          </NativeBaseProvider>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

export default manage;
