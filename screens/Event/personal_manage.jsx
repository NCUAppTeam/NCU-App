import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView,
  TouchableOpacity, Image, RefreshControl, Dimensions,
} from 'react-native';
import {
  Title, Card, Portal,
} from 'react-native-paper';
import {
  Ionicons, AntDesign, Feather,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, ZStack, HStack, VStack, FlatList, Pressable,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import ActiveController from '../../controller/Active';
import styles from './style_folder/Styles_personal_manage';

function Personal({ navigation }) {
  const [num, setNum] = useState();
  const [showNow, setShowNow] = useState([]);
  useEffect(() => {
    ActiveController.getParticipatedActive().then((res) => {
      setShowNow(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [showManage, setShowManage] = useState([]);
  useEffect(() => {
    ActiveController.getHostedEvent().then((res) => {
      setShowManage(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [showEnd, setShowEnd] = useState([]);
  useEffect(() => {
    ActiveController.getFinishedActive().then((res) => {
      setShowEnd(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [isPress, setIsPress] = useState('參加中');

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
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
      flex: 1, flexDirection: 'column', alignContent: 'center',
    }}
    >
      <NativeBaseProvider>
        <ZStack>
          <LinearGradient
            colors={['#1784B2', '#1D74A0', '#28527A']}
            start={[0.6497, 0.9972]}
            end={[0.1203, 0.6497]}
            style={{
              width: 323,
              height: 323,
              borderRadius: 261,
              alignSelf: 'center',
              transform: [{ scaleX: 1.61 }],
              marginTop: -172,
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
                padding: 16,
                alignContent: 'center',
                elevation: 10,
                shadowColor: '#000',
                marginRight: 10,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => navigation.navigate('message', { prepage: 'personal' })}
              >
                <Feather name="message-circle" size={14} color="white" style={{ marginTop: 3 }} />
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                &nbsp;私訊
                </Text>
              </TouchableOpacity>
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
        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          {isPress === '管理活動' && (
            <FlatList
              data={showManage}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              refreshControl={(
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
                )}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'column' }}>
                  <Card
                    key={item.id}
                    style={styles.Card3}
                    onPress={() => {
                      navigation.navigate('manage', { Cd: item.id });
                    }}
                  >
                    <Card.Content style={{ padding: 0 }}>
                      <View style={{ flexDirection: 'row', margin: -15 }}>
                        <View style={{ aspectRatio: 1 }}>
                          <Image
                            style={styles.Card3pic}
                            source={{
                              uri: item.imageUri1,
                            }}
                          />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                          <Title style={styles.Card3Title}>
                            {item.name}
                          </Title>
                          <View style={styles.Card3Details}>
                            <AntDesign
                              name="clockcircleo"
                              size={15}
                              style={{ justifyContent: 'center' }}
                            />
                            <Text style={styles.Card3Text}>
                              {'   開始 ：'}
                              {item.startTimeInNum}
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
                              {item.place}
                            </Text>
                          </View>
                          <View style={styles.Card3Details}>
                            <Feather
                              name="users"
                              size={16}
                              color="black"
                            />
                            {item.limitNum !== '0' && (
                            <Text style={styles.Card3Text}>
                              {'   '}
                              {item.num}
                              {' / '}
                              {item.limitNum}
                              人
                            </Text>
                            )}
                            {item.limitNum === '0' && (
                            <Text style={styles.Card3Text}>
                              {'   '}
                              {item.num}
                              &ensp;
                              (無上限)
                            </Text>
                            )}

                          </View>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </View>
              )}
            />
          )}
          {isPress === '參加中' && (
            <FlatList
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
                  <HStack space={2}>
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
                      <Box style={styles.CardDetails}>
                        <AntDesign
                          name="clockcircleo"
                          size={12}
                          style={{ marginLeft: Dimensions.get('window').width * 0.006, marginTop: 2 }}
                        />
                        <Text style={styles.CardText}>
                          &ensp;
                          {item.startTimeWeekday}
                        </Text>
                      </Box>
                      <Box style={{ marginHorizontal: 8, flexDirection: 'row' }}>
                        <Ionicons
                          name="location-outline"
                          size={15}
                          color="black"
                        />
                        <Text style={styles.CardText}>
                          &ensp;
                          {item.place}
                        </Text>
                      </Box>
                    </VStack>
                  </HStack>
                </Pressable>
              )}
            />
          )}
          {isPress === '已結束' && (
            <FlatList
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
                  <HStack space={2}>
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
                      <Box style={styles.CardDetails}>
                        <AntDesign
                          name="clockcircleo"
                          size={12}
                          style={{ marginLeft: Dimensions.get('window').width * 0.006, marginTop: 2 }}
                        />
                        <Text style={styles.CardText}>
                          &ensp;
                          {item.startTimeWeekday}
                        </Text>
                      </Box>
                      <Box style={{ marginHorizontal: 8, flexDirection: 'row' }}>
                        <Ionicons
                          name="location-outline"
                          size={15}
                          color="black"
                        />
                        <Text style={styles.CardText}>
                          &ensp;
                          {item.place}
                        </Text>
                      </Box>
                    </VStack>
                  </HStack>
                </Pressable>
              )}
            />
          )}
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default Personal;
