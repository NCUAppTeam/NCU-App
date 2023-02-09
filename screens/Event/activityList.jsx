import React, { useState, useEffect } from 'react';
import {
  Text, SafeAreaView, ScrollView, RefreshControl, Image, Dimensions,
} from 'react-native';
import {
  Title, Card,
} from 'react-native-paper';
import {
  Ionicons, FontAwesome5, AntDesign, Feather, Octicons,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, ZStack, HStack, Button,
} from 'native-base';
import styles from './style_folder/Styles_activityList';
import ActiveController from '../../controller/Active';
import MessageController from '../../controller/Message';

function List({ navigation }) {
  const user = '110501444';
  const [Messagenum, setMessageNum] = useState(0);
  useEffect(() => {
    MessageController.countUnreadMessage(user).then((num) => {
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
    MessageController.countUnreadMessage(user).then((num) => {
      setMessageNum(num);
    }).catch((err) => {
      throw err;
    });
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <HStack style={styles.header}>
          <ZStack style={styles.SearchArea}>
            <Button
              style={styles.SearchBar}
              onPress={() => { navigation.navigate('search'); }}
            />
            <HStack>
              <AntDesign name="search1" size={24} color="#28527A" style={styles.searchIcon} onPress={() => { navigation.navigate('search'); }} />
              <Box style={styles.searchtextBox}>
                <Text style={styles.searchtext} onPress={() => { navigation.navigate('search'); }}>搜尋</Text>
              </Box>
            </HStack>
          </ZStack>
          <FontAwesome5
            name="comment"
            size={25}
            color="#28527A"
            onPress={() => { navigation.navigate('message', { prepage: 'list' }); }}
            style={styles.comment}
          />
          <Octicons name="dot-fill" size={16} color={Messagenum !== 0 ? '#EB6F6F' : 'transparent'} style={styles.readDot} />
          <Feather
            name="user"
            size={26}
            color="#28527A"
            onPress={() => { navigation.navigate('personal'); }}
            style={styles.user}
          />
        </HStack>
        <Box style={styles.body}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )}
          >
            <Box>
              <Box style={{ flex: 1 }}>
                <Box style={styles.more}>
                  <Box style={{ width: '100%' }}>
                    <HStack style={{ flexDirection: 'row' }}>
                      <Text style={styles.title}>近期揪人</Text>
                      <Text style={styles.showMore} onPress={() => { navigation.navigate('moreHang'); }}>顯示更多</Text>
                    </HStack>
                  </Box>
                  <Divider style={{ marginTop: 5 }} bg="#BFBFBF" /* my=margin-top and margin-bottom */ />
                </Box>
                <Box style={styles.cardArea}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    <Box style={{
                      marginRight: Dimensions.get('window').width * 0.0694,
                      flexDirection: 'row',
                    }}
                    >
                      {active1.map(({
                        id, name, imageUri1, place, startTimeWeekday,
                      }) => (
                        <Card
                          key={id}
                          style={styles.Card}
                          onPress={() => {
                            navigation.navigate('details', { Cd: id, prepage: 'list' });
                          }}
                        >
                          <Card.Content>
                            <Box style={{ flexDirection: 'column', margin: -15 }}>
                              <Box style={{ aspectRatio: 1 }}>
                                <Image
                                  style={styles.pic}
                                  source={{
                                    uri: imageUri1,
                                  }}
                                />
                              </Box>
                              <Title style={styles.CardTitle}>
                                {name}
                              </Title>
                              <Box>
                                <Box style={styles.CardDetails}>
                                  <AntDesign
                                    name="clockcircleo"
                                    size={12}
                                    color="rgba(40, 82, 122, 0.65)"
                                  />
                                  <Text style={styles.CardText}>
                                    {'  '}
                                    {startTimeWeekday}
                                  </Text>
                                </Box>
                                <Box style={styles.CardDetails}>
                                  <Ionicons
                                    name="location-outline"
                                    size={15}
                                    color="rgba(40, 82, 122, 0.65)"
                                  />
                                  <Text style={styles.CardText}>
                                    {' '}
                                    {place}
                                  </Text>
                                </Box>
                              </Box>
                            </Box>
                          </Card.Content>
                        </Card>
                      ))}
                    </Box>
                  </ScrollView>
                </Box>
              </Box>
              <Box>
                <Box style={{ flex: 1 }}>
                  <Box style={styles.more}>
                    <Box style={{ width: '100%' }}>
                      <HStack style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>熱門活動</Text>
                        <Text style={styles.showMore} onPress={() => { navigation.navigate('more'); }}>顯示更多</Text>
                      </HStack>
                    </Box>
                    <Divider style={{ marginTop: 5 }} bg="#BFBFBF" /* my=margin-top and margin-bottom */ />
                  </Box>
                  <Box style={styles.cardArea}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <Box style={{
                        marginRight: Dimensions.get('window').width * 0.0694,
                        flexDirection: 'row',
                      }}
                      >
                        {active2.map(({
                          id, name, imageUri1, place, startTimeWeekday,
                        }) => (
                          <Card
                            key={id}
                            style={styles.Card}
                            onPress={() => {
                              navigation.navigate('details', { Cd: id, prepage: 'list' });
                            }}
                          >
                            <Card.Content>
                              <Box style={{ flexDirection: 'column', margin: -15 }}>
                                <Box style={{ aspectRatio: 1 }}>
                                  <Image
                                    style={styles.pic}
                                    source={{
                                      uri: imageUri1,
                                    }}
                                  />
                                </Box>
                                <Title style={styles.CardTitle}>
                                  {name}
                                </Title>
                                <Box style={styles.CardDetails}>
                                  <AntDesign
                                    name="clockcircleo"
                                    size={12}
                                    color="rgba(40, 82, 122, 0.65)"
                                  />
                                  <Text style={styles.CardText}>
                                    {'  '}
                                    {startTimeWeekday}
                                  </Text>
                                </Box>
                                <Box style={styles.CardDetails}>
                                  <Ionicons
                                    name="location-outline"
                                    size={15}
                                    color="rgba(40, 82, 122, 0.65)"
                                  />
                                  <Text style={styles.CardText}>
                                    {' '}
                                    {place}
                                  </Text>
                                </Box>
                              </Box>
                            </Card.Content>
                          </Card>
                        ))}
                      </Box>
                    </ScrollView>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ScrollView>
        </Box>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default List;
