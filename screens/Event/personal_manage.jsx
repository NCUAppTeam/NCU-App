import React, { useState, useEffect } from 'react';
import {
  Text, SafeAreaView,
  TouchableOpacity, Image, RefreshControl, Dimensions,
  Platform,
} from 'react-native';
import {
  Title, Card,
} from 'react-native-paper';
import {
  Ionicons, AntDesign, Feather,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, ZStack, VStack, FlatList, Pressable,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import ActiveController from '../../controller/Active';
import MessageController from '../../controller/Message';
import UserController from '../../controller/getStudentId';
import styles from './style_folder/Styles_personal_manage';

function Personal({ navigation }) {
  const [uid, setUid] = useState();
  const [Messagenum, setMessageNum] = useState(0);
  const [showNow, setShowNow] = useState([]);
  const [showManage, setShowManage] = useState([]);
  const [showEnd, setShowEnd] = useState([]);
  const [isPress, setIsPress] = useState('參加中');

  useEffect(() => {
    setUid(UserController.getUid());
    MessageController.countUnreadMessage(uid).then((number) => {
      setMessageNum(number);
      console.log(number);
    }).catch((err) => {
      throw err;
    });
    ActiveController.getParticipatedActive().then((res) => {
      setShowNow(res);
    }).catch((err) => {
      throw err;
    });
    ActiveController.getHostedEvent().then((res) => {
      setShowManage(res);
    }).catch((err) => {
      throw err;
    });
    ActiveController.getHostedEvent().then((res) => {
      setShowManage(res);
    }).catch((err) => {
      throw err;
    });
    ActiveController.getFinishedActive().then((res) => {
      setShowEnd(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    setUid(UserController.getUid());
    MessageController.countUnreadMessage(uid).then((number) => {
      setMessageNum(number);
    }).catch((err) => {
      throw err;
    });
    if (isPress === '參加中') {
      await ActiveController.getParticipatedActive().then((res) => {
        setShowNow(res);
      }).catch((err) => {
        throw err;
      });
    } else if (isPress === '管理活動') {
      await ActiveController.getHostedEvent().then((res) => {
        setShowManage(res);
      }).catch((err) => {
        throw err;
      });
    } else {
      await ActiveController.getFinishedActive().then((res) => {
        setShowEnd(res);
      }).catch((err) => {
        throw err;
      });
    }
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{
      flex: 1, flexDirection: 'column', alignSelf: 'center',
    }}
    >
      <NativeBaseProvider>
        <ZStack>
          <LinearGradient
            colors={['#1784B2', '#1D74A0', '#28527A']}
            start={[0.6497, 0.9972]}
            end={[0.1203, 0.6497]}
            style={{
              width: Dimensions.get('window').width * 0.8,
              height: Dimensions.get('window').width * 0.8,
              borderRadius: Dimensions.get('window').width * 0.4,
              alignSelf: 'center',
              transform: [{ scaleX: 1.61 }],
              marginTop: Platform.OS === 'ios' ? -Dimensions.get('window').width * 0.35 : -178,
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
            <LinearGradient
              colors={['#359DD9', '#1784B2']}
              start={[0, 0.5]}
              style={{
                marginTop: 118,
                width: 82,
                height: 53,
                borderRadius: 25,
                backgroundColor: '#1784B2',
                flexDirection: 'row',
                paddingLeft: 16,
                paddingVertical: 16,
                alignContent: 'center',
                elevation: 10,
                shadowColor: '#000',
                marginRight: 10,
              }}
            >
              <ZStack>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('message', { prepage: 'personal' })}
                >
                  <Feather name="message-circle" size={14} color="white" style={{ marginTop: 3 }} />
                  <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                &nbsp;私訊
                  </Text>
                </TouchableOpacity>
                {(Messagenum !== 0) && (
                <Text style={styles.num}>
                  {Messagenum}
                </Text>
                )}
              </ZStack>
            </LinearGradient>
            <LinearGradient
              colors={['#359DD9', '#1784B2']}
              start={[0, 0.5]}
              style={{
                marginTop: 118,
                width: 82,
                height: 53,
                borderRadius: 25,
                backgroundColor: '#1784B2',
                flexDirection: 'row',
                padding: 16,
                alignContent: 'center',
                elevation: 10,
                shadowColor: '#000',
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => navigation.navigate('add')}
              >
                <Ionicons name="add" size={14} color="white" style={{ marginTop: 3 }} />
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                &nbsp;新增
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Box>
        </ZStack>
        <Box style={{ marginTop: 192, alignItems: 'center', marginBottom: 10 }}>
          <Box style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={isPress === '參加中' ? styles.personalbtnPress : styles.personalbtn}
              onPress={() => {
                setIsPress('參加中');
                ActiveController.getParticipatedActive();
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
                ActiveController.getHostedEvent();
              }}
            >
              <Text style={isPress === '管理活動' ? styles.personalmanagebtnPressText : styles.personalmanagebtnText}>
                &nbsp;管理活動
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isPress === '已結束' ? styles.personalbtnPress : styles.personalbtn}
              onPress={() => {
                setIsPress('已結束');
                ActiveController.getFinishedActive();
              }}
            >
              <Text style={isPress === '已結束' ? styles.personalbtnPressText : styles.personalbtnText}>
              &nbsp;已結束
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
        <Box style={{ flex: 1 }}>
          {isPress === '管理活動' && (
            <FlatList
              data={showManage}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 10, alignSelf: 'center' }}
              refreshControl={(
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
                )}
              renderItem={({ item }) => (
                <Box style={{ flexDirection: 'column' }}>
                  <Card
                    key={item.id}
                    style={styles.cardManage}
                    onPress={() => {
                      navigation.navigate('manage', { Cd: item.id });
                    }}
                  >
                    <Card.Content style={{ padding: 0 }}>
                      <Box style={{ flexDirection: 'row', margin: -15 }}>
                        <Box style={{ aspectRatio: 1 }}>
                          <Image
                            style={styles.cardManagepic}
                            source={{
                              uri: item.imageUri1,
                            }}
                          />
                        </Box>
                        <Box style={{ flexDirection: 'column' }}>
                          <Title style={styles.cardManageTitle}>
                            {item.name}
                          </Title>
                          <Box style={styles.cardManageDetails}>
                            <AntDesign
                              name="clockcircleo"
                              size={15}
                              style={{ justifyContent: 'center' }}
                            />
                            <Text style={styles.cardManageText}>
                              {'   開始 ：'}
                              {item.startTimeInNum}
                            </Text>
                          </Box>
                          <Box style={styles.cardManageLocation}>
                            <Ionicons
                              name="location-outline"
                              size={17}
                              color="black"
                            />
                            <Text style={styles.cardManageTextLocation}>
                              {'  '}
                              {item.place}
                            </Text>
                          </Box>
                          <Box style={styles.cardManageDetails}>
                            <Feather
                              name="users"
                              size={16}
                              color="black"
                            />
                            {item.limitNum !== '0' && (
                            <Text style={styles.cardManageText}>
                              {'   '}
                              {item.num}
                              {' / '}
                              {item.limitNum}
                              人
                            </Text>
                            )}
                            {item.limitNum === '0' && (
                            <Text style={styles.cardManageText}>
                              {'   '}
                              {item.num}
                              &ensp;
                              (無上限)
                            </Text>
                            )}

                          </Box>
                        </Box>
                      </Box>
                    </Card.Content>
                  </Card>
                </Box>
              )}
            />
          )}
          {isPress === '參加中' && (
            <FlatList
              style={{ widht: '100%' }}
              numColumns={2}
              data={showNow}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ marginLeft: Dimensions.get('window').width * 0.043, justifyContent: 'space-between' }}
              refreshControl={(
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              )}
              renderItem={({ item }) => (
                <Pressable onPress={() => { navigation.navigate('details', { Cd: item.id, prepage: 'personal' }); }}>
                  <VStack style={styles.CardInPersonal}>
                    <Image
                      style={styles.pic}
                      source={{
                        uri: item.imageUri1,
                      }}
                    />
                    <Title style={styles.CardTitle}>
                      {item.name}
                    </Title>
                    <Box style={styles.CardStartTime}>
                      <AntDesign
                        name="clockcircleo"
                        size={12}
                        color="rgba(40, 82, 122, 0.65)"
                      />
                      <Text style={styles.CardTimeText}>
                        {'   '}
                        {item.startTimeWeekday}
                      </Text>
                    </Box>
                    <Box style={styles.CardPlace}>
                      <Ionicons
                        name="location-outline"
                        size={15}
                        color="rgba(40, 82, 122, 0.65)"
                      />
                      <Text style={styles.cardPlaceText}>
                        {'  '}
                        {item.place}
                      </Text>
                    </Box>
                  </VStack>
                </Pressable>
              )}
            />
          )}
          {isPress === '已結束' && (
          <FlatList
            style={{ widht: '100%' }}
            numColumns={2}
            data={showEnd}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginLeft: Dimensions.get('window').width * 0.043, justifyContent: 'space-between' }}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
              )}
            renderItem={({ item }) => (
              <Pressable onPress={() => { navigation.navigate('details', { Cd: item.id, prepage: 'personal' }); }}>
                <VStack style={styles.CardInPersonal}>
                  <Image
                    style={styles.pic}
                    source={{
                      uri: item.imageUri1,
                    }}
                  />
                  <Title style={styles.CardTitle}>
                    {item.name}
                  </Title>
                  <Box style={styles.CardStartTime}>
                    <AntDesign
                      name="clockcircleo"
                      size={12}
                      color="rgba(40, 82, 122, 0.65)"
                    />
                    <Text style={styles.CardTimeText}>
                      {'   '}
                      {item.startTimeWeekday}
                    </Text>
                  </Box>
                  <Box style={styles.CardPlace}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color="rgba(40, 82, 122, 0.65)"
                    />
                    <Text style={styles.cardPlaceText}>
                      {'  '}
                      {item.place}
                    </Text>
                  </Box>
                </VStack>
              </Pressable>
            )}
          />
          )}
        </Box>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default Personal;
