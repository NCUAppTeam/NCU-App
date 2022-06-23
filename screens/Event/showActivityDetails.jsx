import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, ScrollView, RefreshControl, Image,
} from 'react-native';
import {
  Title, Card,
} from 'react-native-paper';
import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Ionicons, FontAwesome5, AntDesign, MaterialCommunityIcons, Feather,
} from '@expo/vector-icons';
import {
  List, ListItem, NativeBaseProvider, Box, Divider,
} from 'native-base';
import styles from './style_folder/Styles_showActivityDetails';
import ActiveController from '../../controller/Active';

function detailscreen({ route, navigation }) {
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
  console.log('json', JSON.stringify(Cd).slice(7, -2));

  return (
    <SafeAreaView style={styles.showActivityDetails_container}>
      <NativeBaseProvider>
        <ScrollView>
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
                  onPress={() => { navigation.navigate('list'); }}
                />
              </Box>
              <View style={styles.nameheader}>
                <Text style={styles.name}>
                  活動類別
                </Text>
              </View>
              <View style={{
                flex: 2, justifyContent: 'center', alignItems: 'flex-end',
              }}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {/* <ScrollView> */}
            {active.map(({
              id, name, imageUri1, startNoYr, endNoYr, place, limitNum,
              cost, link, hostName, hostPhone, hostMail, details,
            }) => (
              <Card
                key={id}
                style={styles.CardDetail}
              >
                <Card.Content style={{ padding: 0 }}>
                  <View style={{ flexDirection: 'column', margin: 2 }}>
                    <View style={{ aspectRatio: 1 }}>
                      <Image
                        style={styles.bigpic}
                        source={{
                          uri: imageUri1,
                        }}
                      />
                    </View>
                    <Title style={styles.DetailTitle}>
                      {name}
                    </Title>
                    <View style={styles.CardDetails}>
                      <AntDesign
                        name="clockcircleo"
                        size={18}
                        style={{ justifyContent: 'center' }}
                      />
                      <Text style={styles.CardText}>
                        {'   時間 | '}
                        {startNoYr}
                      </Text>
                      <Text style={styles.CardText}>
                        {' ~ '}
                        {endNoYr}
                      </Text>
                    </View>
                    <View style={{ marginHorizontal: 8, flexDirection: 'row', marginTop: 10 }}>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color="black"
                      />
                      <Text style={{ fontSize: 12 }}>
                        {'  地點 | '}
                        {place}
                      </Text>
                    </View>
                    <View style={{ marginHorizontal: 8, flexDirection: 'row', marginTop: 10 }}>
                      <MaterialCommunityIcons
                        name="web"
                        size={20}
                        color="black"
                      />
                      <Text style={{ fontSize: 12 }}>
                        {'  連結 | '}
                        {link}
                      </Text>
                    </View>

                    <View>
                      <Divider marginTop={7} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View>
                        <Text style={{ fontSize: 18, marginTop: 10 }}>
                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;參加費用
                        </Text>
                        <Ionicons
                          name="logo-usd"
                          size={25}
                          color="black"
                          style={{ marginTop: 10 }}
                        >
                          <Text style={{ fontSize: 18, marginTop: 10 }}>
                            {'        '}
                            {cost}
                          </Text>
                        </Ionicons>
                      </View>
                      <Divider marginTop={5} mx={10} orientation="vertical" bg="#bfbebe" /* my=margin-top and margin-bottom */ />
                      <View>
                        <Text style={{ fontSize: 18, marginTop: 10 }}>
                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;人數上限
                        </Text>
                        <Feather
                          name="users"
                          size={25}
                          color="black"
                          style={{ marginTop: 10 }}
                        >
                          <Text style={{ fontSize: 18, marginTop: 10 }}>
                            {'        '}
                            {limitNum}
                          </Text>
                        </Feather>
                      </View>
                    </View>
                    <Divider marginTop={7} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
                    <View>
                      <Text style={{ fontSize: 12, marginTop: 10 }}>
                        詳細資訊 |
                      </Text>
                      <Text>
                        {details}
                      </Text>
                    </View>
                    <Divider marginTop={7} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
                    <View>
                      <Text style={{ fontSize: 12, marginTop: 10 }}>
                        更多聯絡資訊 |
                      </Text>
                      <Text>
                        <Feather
                          name="user"
                          size={18}
                          color="black"
                          style={{ marginTop: 10 }}
                        >
                          <Text style={{ fontSize: 12, marginTop: 10 }}>
                            {'  聯絡人     '}
&ensp;&ensp;|&ensp;

                            {hostName}
                          </Text>
                        </Feather>
                        {'\n'}
                        <Feather
                          name="phone"
                          size={18}
                          color="black"
                          style={{ marginTop: 10 }}
                        >
                          <Text style={{ fontSize: 12, marginTop: 10 }}>
                            {'  電話          | '}
                            {hostPhone}
                          </Text>
                        </Feather>
                        {'\n'}
                        <Feather
                          name="mail"
                          size={18}
                          color="black"
                          style={{ marginTop: 10 }}
                        >
                          <Text style={{ fontSize: 12, marginTop: 10 }}>
                            {'  電子郵件     | '}
                            {hostMail}
                          </Text>
                        </Feather>
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default detailscreen;
