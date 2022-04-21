import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView,
  ScrollView, TouchableOpacity, Image, RefreshControl,
} from 'react-native';
import {
  Title, Card, Searchbar, Chip,
} from 'react-native-paper';
import {
  Ionicons, FontAwesome5, AntDesign, Feather, Octicons,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, Heading, ZStack, AddIcon,
} from 'native-base';
import ActiveController from '../../controller/Active';
import styles from './Styles';

function personal({ navigation }) {
  const [show, setShow] = useState([]);
  useEffect(() => {
    ActiveController.getAllActive().then((res) => {
      setShow(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    ActiveController.getAllActive().then((res) => {
      setShow(res);
      setRefreshing(false);
    });
  };

  const [isPress, setIsPress] = useState('參加中');
  const values = ['參加中', '已結束', '管理活動'];

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignContent: 'center' }}>
      <NativeBaseProvider>
        <ZStack>
          <Box
            style={{
              width: 323,
              height: 323,
              borderRadius: 261,
              alignSelf: 'center',
              transform: [{ scaleX: 1.61 }],
              marginTop: -172,
              backgroundColor: '#28527A',
            }}
          />
          <Box style={{ alignSelf: 'center', marginTop: 61, flexDirection: 'row' }}>
            <Feather name="user" size={24} color="white" style={{ marginTop: 5, marginRight: 15 }} onPress={() => { navigation.navigate('list'); }} />
            <Text style={{
              fontWeight: 'bold', fontSize: 24, color: 'white',
            }}
            >
              活動中心
            </Text>
          </Box>
          <Box style={{ alignSelf: 'center', flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                marginTop: 118, marginRight: 10, width: 82, height: 53, borderRadius: 25, backgroundColor: '#1784B2', flexDirection: 'row', padding: 16, alignContent: 'center',
              }}
              onPress={() => navigation.navigate('message')}
            >
              <Feather name="message-circle" size={14} color="white" style={{ marginTop: 3 }} />
              <Text style={{ color: 'white', fontSize: 14 }}>
                &nbsp;私訊
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 118, width: 82, height: 53, borderRadius: 25, backgroundColor: '#1784B2', flexDirection: 'row', padding: 16, alignContent: 'center',
              }}
              onPress={() => navigation.navigate('add')}
            >
              <Ionicons name="add" size={14} color="white" style={{ marginTop: 3 }} />
              <Text style={{ color: 'white', fontSize: 14 }}>
                &nbsp;新增
              </Text>
            </TouchableOpacity>
          </Box>
        </ZStack>
        <Box style={{ marginTop: 192, alignItems: 'center' }}>
          <Box style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={isPress === '參加中' ? styles.personalbtnPress : styles.personalbtn}
              onPress={() => {
                setIsPress('參加中');
                console.log(isPress);

              //    ActiveController.getActiveByForm('participate')
              //    .then(() => { onRefresh(); });
              }}
            >
              <Text style={isPress === '參加中' ? styles.personalbtnPressText : styles.personalbtnText}>
                &nbsp;參加中
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isPress === '管理活動' ? styles.personalbtnPress : styles.personalbtn}
              onPress={() => {
                setIsPress('管理活動');
                console.log(isPress);
              //    ActiveController.getActiveByForm('MyOwn')
              //    .then(() => { onRefresh(); }); }}
              }}
            >
              <Text style={isPress === '管理活動' ? styles.personalbtnPressText : styles.personalbtnText}>
                &nbsp;管理活動
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isPress === '已結束' ? styles.personalbtnPress : styles.personalbtn}
              onPress={() => {
                setIsPress('已結束');
                console.log(isPress);
                // ActiveController.getActiveByForm('End')
                //    .then(() => { onRefresh(); }); }}}
              }}
            >
              <Text style={isPress === '已結束' ? styles.personalbtnPressText : styles.personalbtnText}>
              &nbsp;已結束
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
        <ScrollView
          style={{ flex: 1, marginTop: 15 }}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
      )}
        >
          <View style={{ flex: 1 }}>
            {show.map(({
              id, name, imageUri, startNoYr, endTime, endNoYr, place,
              cost, limitNum, genre, link, hostName, hostPhone, hostMail, details,
            }) => (
              isPress === '管理活動' ? (
                <View style={{ flexDirection: 'column' }}>
                  <Card
                    key={id}
                    style={styles.Card3}
                    onPress={() => {
                      navigation.navigate('manage', { Cd: id });
                    }}
                  >
                    <Card.Content style={{ padding: 0 }}>
                      <View style={{ flexDirection: 'row', margin: -15 }}>
                        <View style={{ aspectRatio: 1 }}>
                          <Image
                            style={styles.Card3pic}
                            source={{
                              uri: imageUri,
                            }}
                          />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                          <Title style={styles.Card3Title}>
                            {name}
                          </Title>
                          <View style={styles.Card3Details}>
                            <AntDesign
                              name="clockcircleo"
                              size={15}
                              style={{ justifyContent: 'center' }}
                            />
                            <Text style={styles.Card3Text}>
                              {'   開始 ：'}
                              {startNoYr}
                            </Text>
                          </View>
                          <View style={styles.Card3Details}>
                            <Ionicons
                              name="location-outline"
                              size={17}
                              color="black"
                            />
                            <Text style={styles.Card3Text}>
                              {'  '}
                              {place}
                            </Text>
                          </View>
                          <View style={styles.Card3Details}>
                            <Feather
                              name="users"
                              size={16}
                              color="black"
                            />
                            <Text style={styles.Card3Text}>
                              {'  '}
                              100
                              {' / '}
                              {limitNum}
                              人
                            </Text>
                          </View>
                        </View>

                      </View>
                    </Card.Content>
                  </Card>
                </View>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Card
                    key={id}
                    style={styles.Card2}
                    onPress={() => {
                      navigation.navigate('details', { Cd: id });
                    }}
                  >
                    <Card.Content style={{ padding: 0 }}>
                      <View style={{ flexDirection: 'column', margin: -15 }}>
                        <View style={{ aspectRatio: 1 }}>
                          <Image
                            style={styles.pic}
                            source={{
                              uri: imageUri,
                            }}
                          />
                        </View>
                        <Title style={styles.CardTitle}>
                          {name}
                        </Title>
                        <View style={styles.CardDetails}>
                          <AntDesign
                            name="clockcircleo"
                            size={12}
                            style={{ justifyContent: 'center' }}
                          />
                          <Text style={styles.CardText}>
                            {'   '}
                            {startNoYr}
                          </Text>
                          <Text style={styles.CardText}>
                            {' ~ '}
                            {endNoYr}
                          </Text>
                        </View>
                        <View style={{ marginHorizontal: 8, flexDirection: 'row' }}>
                          <Ionicons
                            name="location-outline"
                            size={15}
                            color="black"
                          />
                          <Text style={{ fontSize: 12 }}>
                            {'  '}
                            {place}
                          </Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </View>
              )
            ))}
          </View>
        </ScrollView>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default personal;
