import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, RefreshControl, Image, Dimensions,
  Pressable,
} from 'react-native';
import {
  Title, Card,
} from 'react-native-paper';
import {
  Ionicons, FontAwesome5, AntDesign, Feather, Octicons,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, ZStack, HStack, Button, Center, Text, Input, Icon
} from 'native-base';
import { getAuth, signOut } from 'firebase/auth';
import styles from './style_folder/Styles_activityList';
import ActiveController from '../../controller/Active';
import MessageController from '../../controller/Message';
import UserController from '../../controller/getStudentId';

function List({ navigation }) {
  const auth = getAuth();
  const [Messagenum, setMessageNum] = useState(0);
  const [active1, setActive1] = useState([]);
  const [active2, setActive2] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    const userid = UserController.getUid();
    MessageController.countUnreadMessage(userid).then((num) => {
      setMessageNum(num);
    }).catch((err) => {
      throw err;
    });
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
    setRefreshing(false);
  };

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      onRefresh();
    });
    return focusHandler;
  }, [navigation]);

  const SearchBarHeader = () => (
    <Center>
      <HStack mt="4" m="2" width="90%" alignItems="center" justifyContent="center">
        <Pressable
          onPress={() => { navigation.navigate('search'); }}
          flex={1}
        >
          <Center>
            <Input placeholder="搜尋" size="lg" variant="filled" height="40px" borderRadius="10" bg="#E5EBF1" py="1" px="2"
              InputLeftElement={<Icon ml="2" size="6" as={AntDesign} name="search1" color="#476685" ></Icon>}
              pointerEvents="none"
            />
          </Center>
        </Pressable>
        <Pressable
          onPress={() => { navigation.navigate('message', { prepage: 'list' }); }}
        >
          <Center>
            <ZStack size={25} ml={3} alignItems="center" justifyContent="center">
              <Box>
                <Octicons name="dot-fill" size={16} color={Messagenum !== 0 ? '#EB6F6F' : 'transparent'}
                  style={{
                    transform: [{ translateX: 10}, {translateY: -10 }]
                  }}
                />
              </Box>
              <Box>
                <FontAwesome5
                  name="comment"
                  size={25}
                  color="#476685"
                // style={styles.comment}
                />
              </Box>

              {/* // 要記得變0 */}
            </ZStack>
          </Center>
        </Pressable>
        <Pressable
          onPress={() => { navigation.navigate('personal'); }}

        >
          <Box size={26} mx={3}>
            <Feather name="user" size={26} color="#476685"
            />
          </Box>
        </Pressable>
      </HStack>
      </Center>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBarHeader/>


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
          <Pressable
            style={{
              margin: 50, backgroundColor: 'yellow', height: 100, justifyContent: 'center',
            }}
            onPress={() => {
              signOut(auth).then(() => {
                // Sign-out successful.
                console.log('Sign-out successful.');
              }).catch((error) => {
                // An error happened.
              });
            }}
          >
            <Text style={{ alignSelf: 'center' }}>
              登出
            </Text>
          </Pressable>
        </ScrollView>
      </Box>

    </SafeAreaView>
  );
}

export default List;