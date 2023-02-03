import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, ScrollView, RefreshControl, Image, Dimensions,
} from 'react-native';
import {
  Title, Card, Searchbar, TextInput,
} from 'react-native-paper';
import {
  Ionicons, FontAwesome5, AntDesign, Feather, Octicons,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, ZStack, HStack, Button,
} from 'native-base';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styles from './style_folder/Styles_activityList';
import ActiveController from '../../controller/Active';
import MessageController from '../../controller/Message';

function List({ navigation }) {
  const [Messagenum, setMessageNum] = useState(0);
  useEffect(() => {
    MessageController.countUnreadMessage().then((num) => {
      setMessageNum(num);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [active1, setActive1] = useState([]);
  const [active2, setActive2] = useState([]);
  useEffect(() => {
    ActiveController.getHangOutActive().then((res) => {
      setActive1(res);
    }).then().catch((err) => {
      throw err;
    });
    ActiveController.getEventActive().then((res) => {
      setActive2(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    ActiveController.getHangOutActive().then((res) => {
      setActive1(res);
    });
    ActiveController.getEventActive().then((res) => {
      setActive2(res);
    });
    MessageController.countUnreadMessage().then((num) => {
      setMessageNum(num);
    }).catch((err) => {
      throw err;
    });
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <HStack>
          <ZStack>
            <Button
              style={styles.SearchBar}
              onPress={() => { navigation.navigate('search'); }}
            />
            <AntDesign name="search1" size={24} color="#28527A" style={styles.searchIcon} onPress={() => { navigation.navigate('search'); }} />
            <Box style={styles.searchtextBox}>
              <Text style={styles.searchtext} onPress={() => { navigation.navigate('search'); }}>搜尋</Text>
            </Box>
          </ZStack>
          <FontAwesome5
            name="comment"
            size={25}
            color="#28527A"
            onPress={() => { navigation.navigate('message', { prepage: 'list' }); }}
            style={{ alignSelf: 'center', marginLeft: Dimensions.get('window').width * 0.65, marginTop: 3 }}
          />
          <Octicons name="dot-fill" size={16} color={Messagenum !== 0 ? '#EB6F6F' : 'transparent'} style={styles.readDot} />
          <Box>
            <Feather
              name="user"
              size={26}
              color="#28527A"
              onPress={() => { navigation.navigate('personal'); }}
              style={{ alignSelf: 'center', marginLeft: 5, marginTop: 3 }}
            />
          </Box>
        </HStack>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
      )}
        >
          <Box style={{ marginHorizontal: Dimensions.get('window').width * 0.0592 }}>
            <Box style={styles.more}>
              <HStack>
                <Text style={{ color: '#28527a', fontSize: 18 }}>近期揪人</Text>
                <Text style={{ color: '#28527a', marginLeft: Dimensions.get('window').width * 0.54 }} onPress={() => { navigation.navigate('moreHang'); }}>顯示更多</Text>
              </HStack>
            </Box>
            <Divider style={{ marginTop: 5 }} bg="#BFBFBF" /* my=margin-top and margin-bottom */ />
          </Box>
          <View style={{
            height: Dimensions.get('window').width * 0.65,
            width: 'auto',
            marginTop: 10,
          }}
          >
            <ScrollView
              horizontal
              style={styles.horizontal}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{
                marginRight: Dimensions.get('window').width * 0.0694,
                flexDirection: 'row',
              }}
              >
                {active1.map(({
                  id, name, imageUri1, place, startTimeWeekday,
                }) => (
                  <Card
                    key={id}
                    style={styles.Card2}
                    onPress={() => {
                      navigation.navigate('details', { Cd: id, prepage: 'list' });
                    }}
                  >
                    <Card.Content>
                      <View style={{ flexDirection: 'column', margin: -15 }}>
                        <View style={{ aspectRatio: 1 }}>
                          <Image
                            style={styles.pic}
                            source={{
                              uri: imageUri1,
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
                            color="rgba(40, 82, 122, 0.65)"
                            style={{ justifyContent: 'center' }}
                          />
                          <Text style={styles.CardText}>
                            {'  '}
                            {startTimeWeekday}
                          </Text>
                        </View>
                        <View style={{ marginHorizontal: 5.5, flexDirection: 'row' }}>
                          <Ionicons
                            name="location-outline"
                            size={15}
                            color="rgba(40, 82, 122, 0.65)"
                          />
                          <Text style={{ fontSize: 12, color: 'rgba(40, 82, 122, 0.65)' }}>
                            {' '}
                            {place}
                          </Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </ScrollView>
          </View>
          <Box style={{ marginTop: 10, marginHorizontal: Dimensions.get('window').width * 0.06 }}>
            <Box style={styles.more}>
              <HStack>
                <Text style={{ color: '#28527a', fontSize: 18 }}>熱門活動</Text>
                <Text style={{ color: '#28527a', marginLeft: Dimensions.get('window').width * 0.54 }} onPress={() => { navigation.navigate('more'); }}>顯示更多</Text>
              </HStack>
            </Box>
            <Divider style={{ marginTop: 5 }} bg="#BFBFBF" /* my=margin-top and margin-bottom */ />
          </Box>
          <View style={{
            height: Dimensions.get('window').width * 0.65,
            width: 'auto',
            marginTop: 10,
          }}
          >
            <ScrollView
              horizontal
              style={styles.horizontal}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{
                width: 'auto', marginRight: Dimensions.get('window').width * 0.0694, height: 246, flexDirection: 'row',
              }}
              >
                {active2.map(({
                  id, name, imageUri1, place, startTimeWeekday,
                }) => (
                  <Card
                    key={id}
                    style={styles.Card2}
                    onPress={() => {
                      navigation.navigate('details', { Cd: id, prepage: 'list' });
                    }}
                  >
                    <Card.Content>
                      <View style={{ flexDirection: 'column', margin: -15 }}>
                        <View style={{ aspectRatio: 1 }}>
                          <Image
                            style={styles.pic}
                            source={{
                              uri: imageUri1,
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
                            color="rgba(40, 82, 122, 0.65)"
                            style={{ justifyContent: 'center' }}
                          />
                          <Text style={styles.CardText}>
                            {'  '}
                            {startTimeWeekday}
                          </Text>
                        </View>
                        <View style={{ marginHorizontal: 5.5, flexDirection: 'row' }}>
                          <Ionicons
                            name="location-outline"
                            size={15}
                            color="rgba(40, 82, 122, 0.65)"
                          />
                          <Text style={{ fontSize: 12, color: 'rgba(40, 82, 122, 0.65)' }}>
                            {' '}
                            {place}
                          </Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        {/* <View>
          <Button
            style={styles.button}
            onPress={() => {
              ActiveController.addUser().then(() => { onRefresh(); });
            }}
            title="加user"
            type="outline"
            icon={(
              <Ionicons
                name="remove"
                size={15}
                color="rgb(255, 100, 100)"
              />
          )}
          />
        </View> */}
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default List;
