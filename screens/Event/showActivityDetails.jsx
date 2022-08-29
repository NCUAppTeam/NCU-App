import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, ScrollView, RefreshControl, Image, Dimensions, TouchableOpacity, Alert,
} from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Button } from 'react-native-elements';
import {
  Ionicons, FontAwesome5, AntDesign, MaterialCommunityIcons, Feather,
} from '@expo/vector-icons';
import {
  List, ListItem, NativeBaseProvider, Box, Divider, ZStack, Center,
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
      {active.map(({
        name, imageUri1, startTimeWeekday, endTimeWeekday, place, limitNum, genre,
        cost, link, hostName, hostPhone, hostMail, details, imageUri2, imageUri3,
      }) => (
        <SafeAreaView style={styles.showActivityDetails_container}>
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
                onPress={() => { navigation.navigate('list'); }}
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
          <ScrollView
            vertical
            style={{ flexDirection: 'column', marginTop: 8.5 }}
          >
            <ScrollView
              horizontal
              onScroll={whenScrolling}
              showsHorizontalScrollIndicator={false}
              style={imageUri2 || imageUri3
                ? { marginLeft: Dimensions.get('window').width * 0.08 }
                : { marginLeft: Dimensions.get('window').width * 0.138 }}
            >
              {(imageUri1) && (
                <View>
                  <View>
                    <Image
                      style={styles.bigpic}
                      source={{
                        uri: imageUri1,
                      }}
                    />
                  </View>
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
                    width={414}
                    height={380}
                    visible={showDialog}
                    dialogTitle={(
                      <NativeBaseProvider>
                        <Box style={{ width: 357, height: 36, alignItems: 'center' }}>
                          <Text style={{ color: '#71717A', fontSize: 24, fontWeight: 400 }}>分享活動</Text>
                        </Box>
                      </NativeBaseProvider>
                    )}
                    onTouchOutside={() => {
                      setShowDialog(false);
                    }}
                  >
                    <DialogContent style={styles.shareBox} />

                  </Dialog>
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
              <View>
                <Ionicons
                  name="logo-usd"
                  size={22}
                  color="#28527A"
                  style={{ marginTop: 10, marginLeft: -2 }}
                >
                  <Text style={{ fontSize: 16, color: 'black' }}>
                    &emsp;&emsp;&emsp;&emsp;
                    {cost}
                  </Text>
                </Ionicons>
              </View>
              <Center>
                <Divider my={2} marginLeft={Dimensions.get('window').width * 0.17} marginRight={5} h={28} orientation="vertical" bg="#bfbebe" /* my=margin-top and margin-bottom */ />
              </Center>
              <View>
                <Feather
                  name="users"
                  size={22}
                  color="#28527A"
                  style={{ marginTop: 10, marginLeft: -2 }}
                >
                  <Text style={{ fontSize: 16, color: 'black' }}>
                    &emsp;
                    100 /
                    {' '}
                    {limitNum}
                    {' '}
                    人
                  </Text>
                </Feather>
              </View>
            </View>
            <View style={{ marginLeft: 25, marginRight: 15 }}>
              <Divider bg="#d9d9d9" w={374}/* my=margin-top and margin-bottom */ />
            </View>
            <View style={{ marginLeft: Dimensions.get('window').width * 0.08 }}>
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
              <Divider bg="#d9d9d9" w={374}/* my=margin-top and margin-bottom */ />
            </View>
            <View style={{ marginLeft: Dimensions.get('window').width * 0.08 }}>
              <Text style={{
                color: 'black', fontSize: 16, fontWeight: 'bold', marginVertical: 10,
              }}
              >
                主辦人
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: Dimensions.get('window').width * 0.08, marginBottom: 5 }}>
              <Box style={{ flex: 1, marginLeft: Dimensions.get('window').width * 0.05, marginTop: Dimensions.get('window').width * 0.03 }}>
                <Image
                  style={styles.avatar}

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
                        {hostName}
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
                        {hostPhone}
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
                        {hostMail}
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
                }}
              >
                <Text style={styles.sentButtonText}>
                  <Feather
                    name="users"
                    size={16}
                    color="#FBEEAC"
                  />

                  報名候補
                </Text>

              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      ))}

    </NativeBaseProvider>

  );
}

export default detailscreen;
