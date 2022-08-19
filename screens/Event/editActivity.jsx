import React, { useState, useEffect } from 'react';
import {
  Text, Platform, View, SafeAreaView, TextInput, Alert,
  ScrollView, TouchableOpacity, Dimensions, Image, TouchableHighlight,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Dialog, Portal, Button, Provider,
} from 'react-native-paper';
import {
  Ionicons, AntDesign, MaterialCommunityIcons, Foundation,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, Heading, ZStack,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import ActiveController from '../../controller/Active';
import styles from './style_folder/Styles_editActivity';

function edit({ route, navigation }) {
  const defaultLinks = {
    0:
    {
      id: '0',
      type: 'carpool',
      link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2FAImKb4m8BxsM3lIyYBDCGJBWH6lXBB3FB9LZveoRoq1NsgarKrRJO5jdwBDNhlb-8AwXkOfVAf2a2x12HxONG-8%3Dw1280?alt=media&token=3d70e398-e41f-45a0-bd71-402a83ee9482',
    },
    1:
    {
      id: '1',
      type: 'exercising',
      link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2F13WRw2-wmjCVD1QuSUjUjeJVOKnamdacrG9rYAu-6TEjxao7qkq4SaaL6I--LsqFdPiDto2MripJ0AeqX1jpLkw%3Dw1280?alt=media&token=30dc159f-b873-4c01-8095-47dcd7eb1e52',
    },
    2: {
      id: '2',
      type: 'HangOut',
      link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2F9-KpYqgT7JpVxN9YJdyZK6cs1KkjkW3FvJfNN_MKIWC0TJsF23naOw4xeELUkmKGpK0Ql-YwOYAV6Nm7a10aHBs%3Dw1280?alt=media&token=d3e971f5-4494-405a-a327-e215b7947fc8',
    },
    3: {
      id: '3',
      type: 'schoolEvent',
      link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2FVhFxnnfJno8OaJEejdzQUfTkOPBXH0EkDpp_fZU1lAqe8mxsqUryurnBGu88QwWx1ZuW5dOMUwQdOOIlVHXZVdo%3Dw1280?alt=media&token=f728d517-3e01-40b3-853a-19530447ad84',
    },
    4: {
      id: '4',
      type: 'tiedEvent',
      link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2FMI5GYVApUBawNSN07_TzzpjRT4Kso7Lr2xa0ryVIiRM6dvFQBsgr568WEfLCLtl1NeUia0wZQB8ZBrvATX7dvKo%3Dw1280?alt=media&token=72657e1a-0bc5-43db-b981-3da482226a49',
    },
    5: {
      id: '5',
      type: 'clubEvent',
      link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2F_4pimcui3FxablQrSCnQcZYCRBw8GHl-P604nwcGPnniiMrAoE23lCkWaaEgJ2flQbqcxTrn7PEp6GnehqFeruE%3Dw1280?alt=media&token=acca5f3f-000d-41bb-b7a2-c5575641cdfb',
    },
  };
  const Cd = route.params;
  const passedID = JSON.stringify(Cd).slice(7, -2);
  // 必填檢查參數
  const [genre, setGenre] = useState(true);
  const [name, setName] = useState(true);
  const [start, setStartCheck] = useState(true);
  const [end, setEndCheck] = useState(true);
  const [limitNum, setLimitNum] = useState(true);
  const [place, setPlace] = useState(true);
  const [detail, setDetail] = useState(true);
  //
  const [OLDdata, setOLDdata] = useState([]);
  const [NEWdata, setNEWdata] = useState([]);
  let genreLINK; // 活動種類預設圖片連結
  let NoPicLink;

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();

  const [isPress, setIsPress] = useState('');
  const values = ['揪人共乘', '揪人運動', '揪人遊戲', '校園活動', '系上活動', '社團活動'];

  const [startText, setStart] = useState();
  const [startDateText, setStartDate] = useState();
  const [startTimeText, setStartTime] = useState();
  const [endDateText, setEndDate] = useState();
  const [endTimeText, setEndTime] = useState();
  const [endText, setEnd] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    ActiveController.getOneActive(passedID).then((res) => {
      setOLDdata(res[0]);
      setImage1(res[0].imageUri1);
      if (res[0].imageUri2) {
        setImage2(res[0].imageUri2);
      }
      if (res[0].imageUri3) {
        setImage3(res[0].imageUri3);
      }
      setIsPress(res[0].genre);
      setStart(res[0].startTimeInNum);
      setStartDate(res[0].startTimeInNum.substring(0, 10));
      setStartTime(res[0].startTimeInNum.substring(11, 17));
      setEnd(res[0].endTimeInNum);
      setEndDate(res[0].endTimeInNum.substring(0, 10));
      setEndTime(res[0].endTimeInNum.substring(11, 17));
    }).catch((err) => {
      throw err;
    });
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    NoPicLink = result.uri;
    if (!result.cancelled) {
      if (image1 === undefined) {
        setImage1(result.uri);
        setNEWdata({ ...NEWdata, image1: genreLINK });
      } else if (image2 === undefined) {
        setImage2(result.uri);
        setNEWdata({ ...NEWdata, image2: result.uri });
      } else if (image3 === undefined) {
        setImage3(result.uri);
        setNEWdata({ ...NEWdata, image3: result.uri });
      }
    }
  };

  const [visible1, setVisible1] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [mode1, setMode1] = useState('date');
  const [show1, setShow1] = useState(false);

  const showDialog1 = () => setVisible1(true);

  const hideDialog1 = () => {
    if (startDateText !== undefined && startTimeText !== undefined) {
      setStart(`${startDateText}  ${startTimeText}`);
      setStartCheck(true);
    }
    setVisible1(false);
  };
  const showMode1 = (currentMode) => {
    setShow1(true);
    setMode1(currentMode);
  };
  const showTimepicker1 = () => {
    showMode1('time');
  };
  const showDatepicker1 = () => {
    showMode1('date');
  };
  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow1(false);
    setDate1(currentDate);

    const tempDate = new Date(currentDate);
    if (mode1 === 'date') {
      const fDate = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
      setStartDate(`${fDate}`);
    } else if (mode1 === 'time') {
      const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
      setStartTime(`${fTime}`);
    }
    setNEWdata({ ...NEWdata, startTime: tempDate });
  };

  const hideDialogi1 = () => {
    if (startDateText === undefined || startTimeText === undefined) {
      const currentDate = date1;
      setDate1(currentDate);
      const tempDate = new Date(currentDate);
      const fDate = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
      const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
      setNEWdata({ ...NEWdata, startTime: tempDate });
      setStart(`${fDate}  ${fTime}`);
    } else {
      setStart(`${startDateText}  ${startTimeText}`);
    }
    setVisible1(false);
  };
  const onStartChangei1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setDate1(currentDate);
    const tempDate = new Date(currentDate);
    const fDate = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
    setStartDate(`${fDate}`);
    setNEWdata({ ...NEWdata, startTime: tempDate });
  };
  const onStartChangei2 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setDate1(currentDate);
    const tempDate = new Date(currentDate);
    const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
    setStartTime(`${fTime}`);
    setNEWdata({ ...NEWdata, startTime: tempDate });
  };

  const [visible2, setVisible2] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);

  const showDialog2 = () => setVisible2(true);
  const hideDialog2 = () => {
    if (endDateText !== undefined && endTimeText !== undefined) {
      setEnd(`${endDateText}  ${endTimeText}`);
      setEndCheck(true);
    }
    setVisible2(false);
  };
  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };
  const showTimepicker2 = () => {
    showMode2('time');
  };
  const showDatepicker2 = () => {
    showMode2('date');
  };
  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow2(false);
    setDate2(currentDate);

    const tempDate = new Date(currentDate);
    if (mode2 === 'date') {
      const fDate = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
      setEndDate(`${fDate}`);
    } else if (mode2 === 'time') {
      const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
      setEndTime(`${fTime}`);
    }
    setNEWdata({ ...NEWdata, endTime: tempDate });
  };

  const hideDialogi2 = () => {
    if (endDateText === undefined || endTimeText === undefined) {
      const currentDate = date2;
      setDate2(currentDate);
      const tempDate = new Date(currentDate);
      const fDate = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
      const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
      setNEWdata({ ...NEWdata, endTime: tempDate });
      setEnd(`${fDate}  ${fTime}`);
    } else {
      setEnd(`${endDateText}  ${endTimeText}`);
    }
    setVisible2(false);
  };
  const onEndChangei1 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setDate2(currentDate);
    const tempDate = new Date(currentDate);
    const fDate = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
    setEndDate(`${fDate}`);
    setNEWdata({ ...NEWdata, endTime: tempDate });
  };
  const onEndChangei2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setDate2(currentDate);
    const tempDate = new Date(currentDate);
    const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
    setEndTime(`${fTime}`);
    setNEWdata({ ...NEWdata, endTime: tempDate });
  };

  return (
    <Provider>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <NativeBaseProvider>
            <View style={{ flex: 0.1, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <Box style={{
                  flex: 0.8, justifyContent: 'center', alignItems: 'flex-start',
                }}
                >
                  <AntDesign
                    name="arrowleft"
                    size={28}
                    color="#28527A"
                    style={{ justifyContent: 'center' }}
                    onPress={() => {
                      Alert.alert(
                        '變更將不會儲存',
                        '回去',
                        [{ text: '取消' },
                          {
                            text: 'Ok',
                            onPress: () => (
                              navigation.navigate('manage', { Cd: passedID })
                            ),
                          },
                        ],
                      );
                    }}
                  />
                </Box>
                <View style={styles.nameheader}>
                  <Text style={styles.name}>
                    編輯活動
                  </Text>
                </View>
                <View style={{
                  flex: 2, justifyContent: 'center', alignItems: 'flex-end',
                }}
                />
              </View>
            </View>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>活動分類(必選一個)</Heading>
              <Box style={styles.categorybutton}>
                {values.map((value) => (
                  <TouchableHighlight
                    key={value}
                    activeOpacity={0.5} // 不透明度
                    underlayColor="#28527A" // 切換時候的顏色
                    onPress={() => {
                      setIsPress(value);
                      genreLINK = defaultLinks[values.indexOf(value)].link;
                      setNEWdata({ ...NEWdata, genre: value });
                      setGenre(true);
                    }}
                    style={isPress === value ? styles.btnPress : styles.btnNormal}
                  >
                    <Text style={isPress === value ? styles.btnPText : styles.btnText}>
                      {value}
                    </Text>
                  </TouchableHighlight>
                ))}
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>活動名稱(必填)</Heading>
              <Box style={styles.inputbox}>
                <Box style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    maxLength={10}
                    placeholder="請輸入活動名稱(上限十字)"
                    defaultValue={OLDdata.name}
                    value={NEWdata.name}
                    onChangeText={(text) => {
                      setNEWdata({ ...NEWdata, name: text });
                      setName(true);
                      if (text === '') {
                        setName(false);
                      }
                    }}
                    selectionColor="#ccc"
                  />
                </Box>
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>開始時間(必填)</Heading>
              <Box style={styles.inputbox}>
                <Box style={{ flexDirection: 'row' }}>
                  {Platform.OS === 'android' && (
                  <TouchableOpacity
                    onPress={() => {
                      showDialog1();
                    }}
                    style={{ width: '100%' }}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="開始時間"
                      value={startText}
                      editable={false}
                    />
                  </TouchableOpacity>
                  )}
                  {(Platform.OS === 'android' && show1) && (
                  <DateTimePicker
                    testID="dateTimePicker1"
                    value={date1}
                    mode={mode1}
                    display="default"
                    onChange={onStartChange}
                  />
                  )}

                  {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    onPress={() => {
                      showDialog1();
                    }}
                    style={styles.input}
                  >
                    {startText === undefined && (
                    <Text style={[styles.text, {
                      fontWeight: 'normal', color: '#ADADAD', textAlign: 'center', paddingTop: Dimensions.get('window').height * 0.1,
                    }]}
                    >
                      開始時間
                    </Text>
                    )}
                    <Text style={[styles.text, { fontWeight: 'normal', textAlign: 'center', paddingTop: Dimensions.get('window').height * 0.005 }]}>{startText}</Text>
                  </TouchableOpacity>
                  )}
                </Box>
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>結束時間(必填)</Heading>
              <Box style={styles.inputbox}>
                <Box style={{ flexDirection: 'row' }}>
                  {Platform.OS === 'android' && (
                  <TouchableOpacity
                    onPress={() => {
                      showDialog2();
                    }}
                    style={{ width: '100%' }}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="結束時間"
                      value={endText}
                      editable={false}
                    />
                  </TouchableOpacity>
                  )}
                  {(Platform.OS === 'android' && show2) && (
                  <DateTimePicker
                    testID="dateTimePicker2"
                    value={date2}
                    mode={mode2}
                    display="default"
                    onChange={onEndChange}
                  />
                  )}

                  {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    onPress={() => {
                      showDialog2();
                    }}
                    style={styles.input}
                  >
                    {endText === undefined && (
                    <Text style={[styles.text, {
                      fontWeight: 'normal', color: '#ADADAD', textAlign: 'center', paddingTop: Dimensions.get('window').height * 0.005,
                    }]}
                    >
                      結束時間
                    </Text>
                    )}
                    <Text style={[styles.text, { fontWeight: 'normal', textAlign: 'center', paddingTop: Dimensions.get('window').height * 0.005 }]}>{endText}</Text>
                  </TouchableOpacity>
                  )}
                </Box>
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>活動地點(必填)</Heading>
              <Box style={styles.inputbox}>
                <Box style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="活動地點"
                    defaultValue={OLDdata.place}
                    value={NEWdata.place}
                    onChangeText={(text) => {
                      setNEWdata({ ...NEWdata, place: text });
                      setPlace(true);
                      if (text === '') {
                        setPlace(false);
                      }
                    }}
                    selectionColor="#ccc"
                  />
                </Box>
              </Box>
            </Box>
            <Box style={styles.bodyforCostAndLimitnum}>
              <Heading style={styles.CostTitle}>
                參加費用
              </Heading>
              <Heading style={styles.LimitnumTitle}>
                人數上限(必填)
              </Heading>
            </Box>
            <Box style={styles.bodyforCostAndLimitnum}>
              <Box style={styles.CostBox}>
                <Box style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    maxLength={5}
                    keyboardType="number-pad"
                    placeholder="NT$"
                    defaultValue={OLDdata.cost === '免費free' ? '0' : OLDdata.cost}
                    value={NEWdata.cost}
                    onChangeText={(text) => setNEWdata({ ...NEWdata, cost: text })}
                    selectionColor="#ccc"
                  />
                  <Text style={styles.CostAndLimitnumText}>元</Text>
                </Box>
              </Box>
              <Box style={styles.LimitnumBox}>
                <Box style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    maxLength={3}
                    keyboardType="number-pad"
                    placeholder="不限填0"
                    defaultValue={OLDdata.limitNum}
                    value={NEWdata.limitNum}
                    onChangeText={(text) => {
                      setNEWdata({ ...NEWdata, limitNum: text });
                      setLimitNum(true);
                      if (text === '') {
                        setLimitNum(false);
                      }
                    }}
                    selectionColor="#ccc"
                  />
                  <Text style={styles.CostAndLimitnumText}>人</Text>
                </Box>
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>活動連結</Heading>
              <Box style={styles.inputbox}>
                <Box style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="活動連結"
                    defaultValue={OLDdata.link}
                    value={NEWdata.link}
                    onChangeText={(text) => setNEWdata({ ...NEWdata, link: text })}
                    selectionColor="#ccc"
                  />
                </Box>
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>詳細資訊(必填)</Heading>
              <Box style={styles.details}>
                <Box style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={15}
                    maxLength={450}
                    placeholder="請簡單描述一下你的活動內容吧!"
                    defaultValue={OLDdata.details}
                    value={NEWdata.details}
                    onChangeText={(text) => {
                      setNEWdata({ ...NEWdata, details: text });
                      setDetail(true);
                      if (text === '') {
                        setDetail(false);
                      }
                    }}
                    selectionColor="#ccc"
                  />
                </Box>
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>活動照片(最多可以上傳3張, 第一章預設為縮圖照片)</Heading>
              <Box style={{ flexDirection: 'row' }}>
                {image1 && (
                <Box style={{ marginRight: 12 }}>
                  <ZStack style={{ marginBottom: 65 }}>
                    <Image
                      defaultSource={{ uri: OLDdata.imageUri1 }}
                      source={{ uri: image1 }}
                      style={styles.image}
                    />
                    <Foundation
                      name="minus-circle"
                      size={18}
                      color="white"
                      style={{ marginLeft: 68, marginTop: 6 }}
                      onPress={() => {
                        setImage1(NoPicLink);
                        setNEWdata({ ...NEWdata, image1: NoPicLink });
                        if (image2) {
                          setImage1(image2);
                          setImage2(NoPicLink);
                          setNEWdata({ ...NEWdata, image2: NoPicLink });
                        }
                        if (image3) {
                          setImage2(image3);
                          setImage3(NoPicLink);
                          setNEWdata({ ...NEWdata, image3: NoPicLink });
                        }
                      }}
                    />
                  </ZStack>
                </Box>
                )}
                {image2 && (
                <Box style={{ marginRight: 12 }}>
                  <ZStack style={{ marginBottom: 65 }}>
                    <Image source={{ uri: image2 }} style={styles.image} />
                    <Foundation
                      name="minus-circle"
                      size={18}
                      color="white"
                      style={{ marginLeft: 68, marginTop: 6 }}
                      onPress={() => {
                        setImage2(NoPicLink);
                        setNEWdata({ ...NEWdata, image2: NoPicLink });
                        if (image3) {
                          setImage2(image3);
                          setImage3(NoPicLink);
                          setNEWdata({ ...NEWdata, image3: NoPicLink });
                        }
                      }}
                    />
                  </ZStack>
                </Box>
                )}
                {image3 && (
                <Box style={{ marginRight: 12 }}>
                  <ZStack style={{ marginBottom: 65 }}>
                    <Image source={{ uri: image3 }} style={styles.image} />
                    <Foundation
                      name="minus-circle"
                      size={18}
                      color="white"
                      style={{ marginLeft: 68, marginTop: 6 }}
                      onPress={() => {
                        setImage3(NoPicLink);
                        setNEWdata({ ...NEWdata, image3: NoPicLink });
                      }}
                    />
                  </ZStack>
                </Box>
                )}
              </Box>
              <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                <MaterialCommunityIcons name="cloud-upload-outline" size={24} color="white" style={{ marginLeft: 49 }} />
                <Text style={styles.Cloudicon}>上傳</Text>
              </TouchableOpacity>
            </Box>
            <Divider my={2} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
            <Heading style={styles.inputboxText}>以下可以留下更多聯絡資訊, 讓參加者更容易找到你喔!</Heading>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>活動聯絡人姓名</Heading>
              <Box style={styles.inputbox}>
                <Box style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="活動聯絡人姓名"
                    defaultValue={OLDdata.hostName}
                    value={NEWdata.hostName}
                    onChangeText={(text) => setNEWdata({ ...NEWdata, hostName: text })}
                    selectionColor="#ccc"
                  />
                </Box>
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>連絡電話</Heading>
              <Box style={styles.inputbox}>
                <Box style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="連絡電話"
                    defaultValue={OLDdata.hostPhone}
                    value={NEWdata.hostPhone}
                    onChangeText={(text) => setNEWdata({ ...NEWdata, hostPhone: text })}
                    selectionColor="#ccc"
                  />
                </Box>
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>電子郵件</Heading>
              <Box style={styles.inputbox}>
                <Box style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="電子郵件"
                    defaultValue={NEWdata.HostMail}
                    value={NEWdata.hostMail}
                    onChangeText={(text) => setNEWdata({ ...NEWdata, hostMail: text })}
                    selectionColor="#ccc"
                  />
                </Box>
              </Box>
            </Box>
            <View style={styles.footer}>
              {(genre === true && name === true && start === true && end === true
                  && limitNum === true && place === true && detail === true) ? (
                    <LinearGradient
                      colors={['#28527A', '#1784B2']}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.sentButton}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            '確認更改活動資料?',
                            '按下"確認"後, 更新活動資料',
                            [{ text: '取消' },
                              {
                                text: '確認',
                                onPress: () => {
                                  NEWdata.uploadTime = new Date();
                                  ActiveController.updateActive(passedID, NEWdata);
                                  navigation.navigate('list');
                                },
                              },
                            ],
                          );
                        }}
                      >
                        <Text style={styles.sentButtonText}>
                          確認更改
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                ) : (
                  <TouchableOpacity style={styles.unsentButton}>
                    <Text style={styles.unsentButtonText}>
                      確認更改
                    </Text>
                  </TouchableOpacity>
                )}

            </View>
            {Platform.OS === 'ios' && (
            <Portal>
              <Dialog visible={visible1} onDismiss={hideDialogi1}>
                <Dialog.Title>選擇開始時間</Dialog.Title>
                <Dialog.Content>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <DateTimePicker
                      style={{ width: 150, height: 70 }}
                      value={date1}
                      mode="date"
                      display="defult"
                      onChange={onStartChangei1}
                    />
                    <DateTimePicker
                      style={{ width: 100, height: 70 }}
                      value={date1}
                      mode="time"
                      display="defult"
                      onChange={onStartChangei2}
                    />
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialogi1}>Done</Button>
                </Dialog.Actions>
              </Dialog>
              <Dialog visible={visible2} onDismiss={hideDialogi2}>
                <Dialog.Title>選擇結束時間</Dialog.Title>
                <Dialog.Content>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <DateTimePicker
                      style={{ width: 150, height: 70 }}
                      value={date2}
                      mode="date"
                      display="defult"
                      onChange={onEndChangei1}
                    />
                    <DateTimePicker
                      style={{ width: 100, height: 70 }}
                      value={date2}
                      mode="time"
                      display="defult"
                      onChange={onEndChangei2}
                    />
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialogi2}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            )}

            {Platform.OS === 'android' && (
            <Portal>
              <Dialog visible={visible1} onDismiss={hideDialog1}>
                <Dialog.Title>選擇開始時間</Dialog.Title>
                <Dialog.Content>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Text style={{ textAlign: 'center', fontSize: 17 }}>
                        {startDateText}
                      </Text>
                      <Button onPress={showDatepicker1}>選擇日期</Button>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Text style={{ textAlign: 'center', fontSize: 17 }}>
                        {startTimeText}
                      </Text>
                      <Button onPress={showTimepicker1}>選擇時間</Button>
                    </View>
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog1}>Done</Button>
                </Dialog.Actions>
              </Dialog>
              <Dialog visible={visible2} onDismiss={hideDialog2}>
                <Dialog.Title>選擇結束時間</Dialog.Title>
                <Dialog.Content>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Text style={{ textAlign: 'center', fontSize: 17 }}>
                        {endDateText}
                      </Text>
                      <Button onPress={showDatepicker2}>選擇日期</Button>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Text style={{ textAlign: 'center', fontSize: 17 }}>
                        {endTimeText}
                      </Text>
                      <Button onPress={showTimepicker2}>選擇時間</Button>
                    </View>
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog2}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            )}
          </NativeBaseProvider>
        </SafeAreaView>
      </ScrollView>
    </Provider>
  );
}

export default edit;
