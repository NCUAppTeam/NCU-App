import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity, Alert,
} from 'react-native';
import Dialog from 'react-native-popup-dialog';
import {
  Ionicons, FontAwesome5, AntDesign, MaterialCommunityIcons, Feather, Fontisto, Octicons,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, Center, HStack,
} from 'native-base';
import styles from './style_folder/Styles_showActivityDetails';
import ActiveController from '../../controller/Active';

function detailscreen({ route, navigation }) {
  const Cd = route.params;
  const passedID = JSON.stringify(Cd).slice(7, 27);
  const prepage = JSON.stringify(Cd).slice(40, -2);
  console.log(prepage);
  // console.log('123', JSON.stringify(Cd).slice(6, -1));
  const [SignUp, setSignUp] = useState();
  useEffect(() => {
    ActiveController.getAttendedOrNot(passedID).then((res) => {
      setSignUp(res);
    }).catch((err) => {
      throw err;
    });
  });

  const [totalAttended, setTotal] = useState();
  useEffect(() => {
    ActiveController.getTotalOfAttendees(passedID).then((res) => {
      setTotal(res);
    }).catch((err) => {
      throw err;
    });
  });

  const [info, setInfo] = useState([]);
  useEffect(() => {
    ActiveController.getHostInfo(passedID).then((res) => {
      setInfo(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [active, setActive] = useState([]);
  useEffect(() => {
    ActiveController.getOneActive(passedID).then((res) => {
      setActive(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [slideDot1, setSlideDot1] = useState(true);
  const [slideDot2, setSlideDot2] = useState(false);
  const [slideDot3, setSlideDot3] = useState(false);
  const whenScrolling = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide === 0) {
      setSlideDot1(true);
      setSlideDot2(false);
      setSlideDot3(false);
    } else if (slide === 1) {
      setSlideDot1(false);
      setSlideDot2(true);
      setSlideDot3(false);
    } else if (slide === 2) {
      setSlideDot1(false);
      setSlideDot2(false);
      setSlideDot3(true);
    }
  };
  const [showDialog, setShowDialog] = useState(false);
  return (

    <NativeBaseProvider>
      <SafeAreaView style={styles.showActivityDetails_container}>
        {active.map(({ genre }) => (
          <View style={{
            flexDirection: 'row', width: 'auto',
          }}
          >
            <View style={{
              marginLeft: Dimensions.get('window').width * 0.0816,
              zIndex: 2,
              marginTop: 2,
              position: 'absolute',
            }}
            >
              <AntDesign
                name="arrowleft"
                size={33}
                color="#28527A"
                onPress={() => { navigation.navigate(prepage); }}
              />
            </View>
            <View style={{
              alignItems: 'center', flex: 1, zIndex: 1,
            }}
            >
              <Text style={{ fontSize: 24, color: '#28527A' }}>
                {genre}
              </Text>
            </View>
          </View>
        ))}
        <ScrollView
          vertical
          style={{ flexDirection: 'column', marginTop: 8.5 }}
        >
          {active.map(({
            id, name, imageUri1, startTimeWeekday, endTimeWeekday, place, limitNum, genre,
            cost, link, details, imageUri2, imageUri3,
          }) => (
            <View>
              <ScrollView
                horizontal
                onScroll={whenScrolling}
                showsHorizontalScrollIndicator={false}
                style={imageUri2 || imageUri3
                  ? { marginLeft: Dimensions.get('window').width * 0.08 }
                  : { marginLeft: Dimensions.get('window').width * 0.149 }}
              >
                {(imageUri1) && (
                  <View>
                    <Image
                      style={styles.bigpic}
                      source={{
                        uri: imageUri1,
                      }}
                    />
                  </View>
                )}
                {(imageUri2) && (
                <View style={imageUri3
                  ? { marginLeft: 10 }
                  : { marginLeft: 10, marginRight: Dimensions.get('window').width * 0.07 }}
                >
                  <View>
                    <Image
                      style={styles.bigpic}
                      source={{
                        uri: imageUri2,
                      }}
                    />
                  </View>
                </View>
                )}
                {(imageUri3) && (
                <View style={{ marginLeft: 10, marginRight: Dimensions.get('window').width * 0.07 }}>
                  <Image
                    style={styles.bigpic}
                    source={{
                      uri: imageUri3,
                    }}
                  />
                </View>
                )}
              </ScrollView>
              <View style={{
                marginTop: 12,
                marginBottom: 18,
                justifyContent: 'center',
                flexDirection: 'row',
              }}
              >
                <MaterialCommunityIcons
                  name="circle"
                  size={5}
                  style={
                  slideDot1 === true
                    ? (styles.imageDotIsHere)
                    : (styles.imageDotNoHere)
                }
                />
                <MaterialCommunityIcons
                  name="circle"
                  size={5}
                  style={
                  slideDot2 === true
                    ? (styles.imageDotIsHere)
                    : (styles.imageDotNoHere)
                }
                />
                <MaterialCommunityIcons
                  name="circle"
                  size={5}
                  style={
                  slideDot3 === true
                    ? (styles.imageDotIsHere)
                    : (styles.imageDotNoHere)
                }
                />
              </View>
              <View style={{
                paddingLeft: Dimensions.get('window').width * 0.08213,
                paddingRight: Dimensions.get('window').width * 0.08377,
              }}
              >
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
                >
                  <Text style={{
                    fontSize: 24, color: '#28527A', fontWeight: 'bold',
                  }}
                  >
                    {name}
                  </Text>
                  <View style={{ justifyContent: 'center' }}>
                    <Ionicons
                      name="share-social-outline"
                      size={28}
                      color="#28527A"
                      onPress={() => {
                        setShowDialog(true);
                      }}
                    />
                    <Dialog
                      width={Dimensions.get('window').width * 0.9}
                      height={Dimensions.get('window').width}
                      visible={showDialog}
                      dialogTitle={(
                        <NativeBaseProvider>
                          <Box>
                            <Text style={{
                              textAlign: 'center', color: '#71717A', fontSize: 24, fontWeight: '400', marginTop: 30,
                            }}
                            >
                              分享活動
                            </Text>
                          </Box>
                          <Box style={styles.shareBox}>
                            <Fontisto
                              name="link"
                              size={25}
                              color="#28527A"
                              onPress={() => {
                                console.log('Link Copied');
                              }}
                            >
                              <Text style={{
                                color: '#1f2937', fontSize: 20, fontWeight: '300',
                              }}
                              >
                              &ensp;https://helloworld
                              </Text>
                            </Fontisto>
                            <Box style={{ marginVertical: 20 }} />
                            <FontAwesome5
                              name="facebook"
                              size={25}
                              color="#28527A"
                              onPress={() => {
                                console.log('share to fb');
                              }}
                            >
                              <Text style={{
                                color: '#1f2937', fontSize: 20, fontWeight: '400',
                              }}
                              >
                              &ensp;分享到 Facebook
                              </Text>
                            </FontAwesome5>
                            <Box style={{ marginVertical: 20 }} />
                            <FontAwesome5
                              name="facebook-messenger"
                              size={25}
                              color="#28527A"
                              onPress={() => {
                                console.log('share to messenger');
                              }}
                            >
                              <Text style={{
                                color: '#1f2937', fontSize: 20, fontWeight: '400',
                              }}
                              >
                              &ensp;分享到 Messenger
                              </Text>
                            </FontAwesome5>
                            <Box style={{ marginVertical: 20 }} />
                            <FontAwesome5
                              name="discord"
                              size={25}
                              color="#28527A"
                              style={{ marginLeft: 2 }}
                              onPress={() => {
                                console.log('share to discord');
                              }}
                            >
                              <Text style={{
                                color: '#1f2937', fontSize: 20, fontWeight: '400',
                              }}
                              >
                              &ensp;分享到 Discord
                              </Text>
                            </FontAwesome5>
                            <Box style={{ marginVertical: 20 }} />
                            <Octicons
                              name="x"
                              size={28}
                              color="#28527A"
                              style={{ marginLeft: 5 }}
                              onPress={() => {
                                console.log('cancel');
                                setShowDialog(false);
                              }}
                            >
                              <Text style={{
                                color: '#1f2937', fontSize: 20, fontWeight: '400',
                              }}
                              >
                              &nbsp;&ensp;取消
                              </Text>
                            </Octicons>
                          </Box>
                        </NativeBaseProvider>
                    )}
                      onTouchOutside={() => {
                        setShowDialog(false);
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <View style={{ justifyContent: 'center' }}>
                    <AntDesign
                      name="clockcircleo"
                      size={16}
                      color="#28527A"
                    />
                  </View>
                  <Text style={styles.CardTimeText}>
                    <Text style={{ color: '#BFBFBF' }}>
                  &emsp;&nbsp;從&nbsp;
                    </Text>
                    {startTimeWeekday}
                    {'\n'}
                    <Text style={{ color: '#BFBFBF' }}>
                  &emsp;&nbsp;到&nbsp;
                    </Text>
                    {endTimeWeekday}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row', marginLeft: -2, marginBottom: 10,
                }}
                >
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color="#28527A"
                  />
                  <Text style={{ fontSize: 16, marginLeft: -2 }}>
                  &emsp;
                    {place}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: -2 }}>
                  <MaterialCommunityIcons
                    name="web"
                    size={20}
                    color="#28527A"
                  />
                  <Text style={{ fontSize: 16, marginBottom: 15 }}>
                  &emsp;
                    {link}
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: 25, marginRight: 15 }}>
                <Divider bg="#d9d9d9" w={374}/* my=margin-top and margin-bottom */ />
              </View>
              <View style={{ flexDirection: 'row', marginLeft: Dimensions.get('window').width * 0.08 }}>
                <HStack>
                  <Box style={{ width: 155 }}>
                    <HStack>
                      <Ionicons
                        name="logo-usd"
                        size={22}
                        color="#28527A"
                        style={{ marginTop: 10, marginLeft: -2 }}
                      />
                      {cost !== '免費free' && (
                      <Text style={{
                        fontSize: 16,
                        color: 'black',
                        paddingTop: 12,
                        paddingLeft: 65,
                      }}
                      >
                        {cost}
                      </Text>
                      )}
                      {cost === '免費free' && (
                      <Text style={{
                        fontSize: 16,
                        color: 'black',
                        paddingTop: 12,
                        paddingLeft: 45,
                      }}
                      >
                        {cost}
                      </Text>
                      )}
                    </HStack>
                  </Box>
                  <Center>
                    <Divider my={2} marginLeft={5} marginRight={5} h={28} orientation="vertical" bg="#bfbebe" /* my=margin-top and margin-bottom */ />
                  </Center>
                  <Box>
                    <HStack>
                      <Feather
                        name="users"
                        size={22}
                        color="#28527A"
                        style={{ marginTop: 10 }}
                      />
                      {limitNum !== '0' && (
                      <Text style={totalAttended >= limitNum
                        ? styles.reachLimitNum
                        : styles.underLimitNum}
                      >
                        {totalAttended}
                        &ensp;
                        /
                          {' '}
                        {limitNum}
                        {' '}
                        人
                      </Text>
                      )}
                      {limitNum === '0' && (
                      <Text style={styles.NoLimitNum}>
                        {totalAttended}
                        &ensp;
                        (無上限)
                      </Text>
                      )}
                    </HStack>
                  </Box>
                </HStack>
              </View>
              <View style={{ marginLeft: 25, marginRight: 15 }}>
                <Divider bg="#d9d9d9" w={374}/* my=margin-top and margin-bottom */ />
              </View>
              <View style={{ marginLeft: Dimensions.get('window').width * 0.07 }}>
                <Text style={{
                  color: 'black', fontSize: 16, fontWeight: 'bold', marginVertical: 10,
                }}
                >
                  詳細資訊
                </Text>
                <Text>
                  {details}
                </Text>
              </View>
              <View style={{ marginLeft: 25, marginRight: 15 }}>
                <Divider bg="#d9d9d9" w={374} my={3}/* my=margin-top and margin-bottom */ />
              </View>
            </View>
          ))}
          {info.map(({
            name, phone, email, avatar,
          }) => (
            <View style={{ marginLeft: Dimensions.get('window').width * 0.08 }}>
              <Text style={{
                color: 'black', fontSize: 16, fontWeight: 'bold', marginVertical: 10,
              }}
              >
                主辦人
              </Text>
              <View style={{ flexDirection: 'row', marginLeft: Dimensions.get('window').width * 0.08, marginBottom: 5 }}>
                <Box style={{ flex: 1.5, marginLeft: -Dimensions.get('window').width * 0.01, marginTop: Dimensions.get('window').width * 0.03 }}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: avatar,
                    }}
                  />
                </Box>
                <Box style={{ flex: 3 }}>
                  <Text>
                    <Box>
                      <Feather
                        name="user"
                        size={20}
                        color="#28527A"
                        style={{ marginTop: 10 }}
                      >
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                  &emsp;
                          {name}
                        </Text>
                      </Feather>
                    </Box>
                    {'\n'}
                    <Box>
                      <Feather
                        name="phone"
                        size={18}
                        color="#28527A"
                        style={{ marginTop: 10 }}
                      >
                        <Text style={{ fontSize: 12, textAlignVertical: 'center' }}>
                    &emsp;
                          {phone}
                        </Text>
                      </Feather>
                    </Box>
                    {'\n'}
                    <Box>
                      <Feather
                        name="mail"
                        size={18}
                        color="#28527A"
                        style={{ marginTop: 10 }}
                      >
                        <Text style={{ fontSize: 12, textAlignVertical: 'center' }}>
                      &emsp;
                          {email}
                        </Text>
                      </Feather>
                    </Box>
                    {'\n'}
                    <Box>
                      <FontAwesome5
                        name="comment"
                        size={20}
                        color="#28527A"
                        style={{ marginTop: 10 }}
                      >
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                          {'    '}
                        </Text>

                        <Text
                          style={{ fontSize: 12, marginTop: 10, textDecorationLine: 'underline' }}
                          onPress={() => {
                            console.log('私訊功能仍在開發中');
                          }}
                        >
                          私訊主辦人
                        </Text>
                      </FontAwesome5>
                    </Box>
                  </Text>
                </Box>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TouchableOpacity
                  style={styles.sentMessage}
                  onPress={() => {
                    console.log('報名功能仍在開發中');
                    if (!SignUp) {
                      Alert.alert(
                        '確認報名?',
                        '請盡可能確保能參加活動, 方便主辦方統計參與人數, 謝謝配合！',
                        [{ text: '我要反悔T~T' },
                          {
                            text: '確認報名',
                            onPress: () => (
                              ActiveController.signUp(passedID).then(() => setSignUp(true))

                            // navigation.navigate('manage', { Cd: passedID })
                            ),
                          },
                        ],

                      );
                    } else {
                      Alert.alert(
                        '確認取消報名?',
                        '如果時間上真的無法配合，那下次有機會再一起參加活動吧~~',
                        [{ text: '想想還是參加吧XD' },
                          {
                            text: '忍痛取消報名',
                            onPress: () => (
                              ActiveController.quitEvent(passedID).then(() => setSignUp(false))
                            // navigation.navigate('manage', { Cd: passedID })
                            ),
                          },
                        ],

                      );
                    }
                  }}
                >
                  <Text style={styles.sentButtonText}>
                    <Feather
                      name="users"
                      size={16}
                      color="#FBEEAC"
                    />
                    {SignUp ? '取消報名' : '報名候補'}
                  </Text>

                </TouchableOpacity>
              </View>
            </View>

          ))}
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>

  );
}

export default detailscreen;
