import React, { useState, useEffect } from 'react';
import {
  Text, Platform, View, SafeAreaView, TextInput,
  ScrollView, TouchableOpacity, Alert, Dimensions, Image, TouchableHighlight,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Dialog, Portal, Button, Provider,
} from 'react-native-paper';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, Heading,
} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import ActiveController from '../../controller/Active';
import styles from './Styles';

function edit({ route, navigation }) {
  const Cd = route.params;
  const [data, setData] = useState({});
  const [active, setActive] = useState([]);
  useEffect(() => {
    ActiveController.getOneActive(JSON.stringify(Cd).slice(7, -2)).then((res) => {
      setActive(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [isPress, setIsPress] = useState('揪人共乘');
  const values = ['揪人共乘', '揪人運動', '揪人遊戲', '校園活動', '系上活動', '社團活動'];

  const [image, setImage] = useState();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setData({ ...data, image: result.uri });
    }
  };

  const [visible1, setVisible1] = React.useState(false);
  const [date1, setDate1] = useState(new Date());
  const [mode1, setMode1] = useState('date');
  const [show1, setShow1] = useState(false);
  const [startDateText, setStartDate] = useState();
  const [startTimeText, setStartTime] = useState();
  const [startText, setStart] = useState();
  const showDialog1 = () => setVisible1(true);

  const hideDialog1 = () => {
    if (startDateText !== undefined && startTimeText !== undefined) {
      setStart(`${startDateText}  ${startTimeText}`);
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
    setData({ ...data, startTime: tempDate });
  };

  const hideDialogi1 = () => {
    if (startDateText === undefined || startTimeText === undefined) {
      const currentDate = date1;
      setDate1(currentDate);
      const tempDate = new Date(currentDate);
      const fDate = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
      const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
      setData({ ...data, startTime: tempDate });
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
    setData({ ...data, startTime: tempDate });
  };
  const onStartChangei2 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setDate1(currentDate);
    const tempDate = new Date(currentDate);
    const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
    setStartTime(`${fTime}`);
    setData({ ...data, startTime: tempDate });
  };

  const [visible2, setVisible2] = React.useState(false);
  const [date2, setDate2] = useState(new Date());
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);
  const [endDateText, setEndDate] = useState();
  const [endTimeText, setEndTime] = useState();
  const [endText, setEnd] = useState();
  const showDialog2 = () => setVisible2(true);
  const hideDialog2 = () => {
    if (endDateText !== undefined && endTimeText !== undefined) {
      setEnd(`${endDateText}  ${endTimeText}`);
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
    setData({ ...data, endTime: tempDate });
  };

  const hideDialogi2 = () => {
    if (endDateText === undefined || endTimeText === undefined) {
      const currentDate = date2;
      setDate2(currentDate);
      const tempDate = new Date(currentDate);
      const fDate = `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
      const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
      setData({ ...data, endTime: tempDate });
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
    setData({ ...data, endTime: tempDate });
  };
  const onEndChangei2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setDate2(currentDate);
    const tempDate = new Date(currentDate);
    const fTime = `${tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()} : ${tempDate.getMinutes() < 10 ? `0${tempDate.getMinutes()}` : tempDate.getMinutes()}`;
    setEndTime(`${fTime}`);
    setData({ ...data, endTime: tempDate });
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
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
                    color="darkblue"
                    style={{ justifyContent: 'center' }}
                    onPress={() => { navigation.navigate('personal'); }}
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
                    underlayColor="white" // 切換時候的顏色
                    onPress={() => {
                      console.log(active);
                      setIsPress(value);
                      setData({ ...data, genre: value });
                    }}
                    style={isPress === value ? styles.btnPress : styles.btnNormal}
                  >
                    <Text style={styles.btnText}>{value}</Text>
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
                    value={data.name}
                    onChangeText={(text) => setData({ ...data, name: text })}
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
                    onPress={showDialog1}
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
                    onPress={showDialog1}
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
                    onPress={showDialog2}
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
                    onPress={showDialog2}
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
                    value={data.place}
                    onChangeText={(text) => setData({ ...data, place: text })}
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
                    value={data.cost}
                    onChangeText={(text) => setData({ ...data, cost: text })}
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
                    value={data.limitNum}
                    onChangeText={(text) => setData({ ...data, limitNum: text })}
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
                    value={data.link}
                    onChangeText={(text) => setData({ ...data, link: text })}
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
                    value={data.details}
                    onChangeText={(text) => setData({ ...data, details: text })}
                    selectionColor="#ccc"
                  />
                </Box>
              </Box>
            </Box>
            <Box style={styles.body}>
              <Heading style={styles.inputboxText}>活動照片(最多可以上傳3張, 第一章預設為縮圖照片)</Heading>
              {image
                && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
              <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                <Ionicons
                  name="cloud-upload-outline"
                  color="white"
                  style={styles.Cloudicon}
                >
                  <Text style={styles.Cloudicon}>上傳</Text>
                </Ionicons>
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
                    value={data.hostName}
                    onChangeText={(text) => setData({ ...data, hostName: text })}
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
                    value={data.hostPhone}
                    onChangeText={(text) => setData({ ...data, hostPhone: text })}
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
                    value={data.hostMail}
                    onChangeText={(text) => setData({ ...data, hostMail: text })}
                    selectionColor="#ccc"
                  />
                </Box>
              </Box>
            </Box>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (data.name === undefined) {
                    Alert.alert('活動名稱不得為空');
                  } else if (data.startTime === undefined) {
                    Alert.alert('開始時間不得為空');
                  } else if (data.image === undefined) {
                    Alert.alert('照片不得為空');
                  } else if (data.endTime === undefined) {
                    Alert.alert('結束時間不得為空');
                  } else if (data.place === undefined) {
                    Alert.alert('活動地點不得為空');
                  } else if (data.cost === undefined) {
                    Alert.alert('參加費用不得為空');
                  } else if (data.limitNum === undefined) {
                    Alert.alert('人數上限不得為空');
                  } else if (data.genre === undefined) {
                    Alert.alert('請選擇活動類別');
                  } else if (data.link === undefined) {
                    Alert.alert('活動連結不得為空');
                  } else if (data.details === undefined) {
                    Alert.alert('詳細資訊不得為空');
                  } else if (data.hostName === undefined) {
                    Alert.alert('活動聯絡人姓名不得為空');
                  } else if (data.hostPhone === undefined) {
                    Alert.alert('聯絡電話不得為空');
                  } else if (data.hostMail === undefined) {
                    Alert.alert('電子郵件不得為空');
                  } else {
                    data.uploadTime = new Date();
                    console.log(data);
                    ActiveController.addActive(data);
                    console.log('successful');
                    navigation.navigate('list');
                  }
                }}
              >
                <Text style={styles.buttonText}>
                  新增活動
                </Text>
              </TouchableOpacity>
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
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

export default edit;
