import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, ScrollView, RefreshControl, Image, Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import {
  Ionicons, FontAwesome5, AntDesign, MaterialCommunityIcons, Feather,
} from '@expo/vector-icons';
import {
  List, ListItem, NativeBaseProvider, Box, Divider, ZStack,
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
                size={28}
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
            >
              {(imageUri2) && (
              <View style={{
                flexDirection: 'row',
                paddingHorizontal: Dimensions.get('window').width * 0.07,
              }}
              >
                <View style={{ marginRight: 10 }}>
                  <Image
                    style={styles.bigpic}
                    source={{
                      uri: imageUri1,
                    }}
                  />
                </View>
                <View>
                  <Image
                    style={styles.bigpic}
                    source={{
                      uri: imageUri2,
                    }}
                  />
                </View>
                {(imageUri3) && (
                <View style={{ marginLeft: 10 }}>
                  <Image
                    style={styles.bigpic}
                    source={{
                      uri: imageUri3,
                    }}
                  />
                </View>
                )}
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
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                  <AntDesign
                    name="clockcircleo"
                    size={20}
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
                flexDirection: 'row', marginLeft: -1, marginBottom: 10,
              }}
              >
                <Ionicons
                  name="location-outline"
                  size={22}
                  color="#28527A"
                />
                <Text style={{ fontSize: 16, marginLeft: -1 }}>
                  &emsp;
                  {place}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons
                  name="web"
                  size={22}
                  color="#28527A"
                />
                <Text style={{ fontSize: 12 }}>
                  {link}
                </Text>
              </View>
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
          </ScrollView>
        </SafeAreaView>
      ))}

    </NativeBaseProvider>

  );
}

export default detailscreen;
