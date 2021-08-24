import React, { useState, useEffect } from 'react';
import {
  View, SafeAreaView, ScrollView, Platform, Alert,
} from 'react-native';
import {
  TextInput, Chip, Button,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Styles';
import { createActivity, getTags } from '../../controller/Activity';

function AddScreen({ route, navigation }) {
  const { onGoBack } = route.params;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [picked, setPicked] = useState({});
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then((res) => {
      setTags(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.textinput}
          maxLength={20}
          label="活動名稱"
          value={data.name}
          onChangeText={(text) => setData({ ...data, name: text })}
        />
        <TextInput
          style={styles.textinput}
          maxLength={10}
          label="價錢(若無請填0)"
          value={data.price}
          onChangeText={(text) => setData({ ...data, price: text })}
        />
        <View style={{
          flexDirection: 'row', justifyContent: 'center',
        }}
        >
          <Button onPress={showDatepicker} title="Show date picker!">
            日期
          </Button>
          <Button onPress={showTimepicker} title="Show time picker!">
            時間
          </Button>
        </View>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour
          display="default"
          onChange={onChange}
        />
        )}
        <View>
          <TextInput
            style={styles.textinput}
            maxLength={20}
            label="條件"
            value={data.qualification}
            onChangeText={(text) => setData({ ...data, qualification: text })}
          />
          <TextInput
            style={styles.textinput}
            maxLength={15}
            label="人數限制"
            value={data.numberLimit}
            onChangeText={(text) => setData({ ...data, numberLimit: text })}
          />
          <TextInput
            style={styles.bigtextinput}
            multiline
            numberOfLines={3}
            label="詳細資訊"
            value={data.details}
            onChangeText={(text) => setData({ ...data, details: text })}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, flexWrap: 'wrap' }}>
          {
            tags.map((tag) => (
              <Chip
                key={tag.id}
                icon={tag.icon}
                selected={picked[tag.id]}
                onPress={() => {
                  setPicked({ [tag.id]: true });
                  setData({ ...data, tag: tag.id });
                }}
              >
                {tag.name}
              </Chip>
            ))
            }
        </View>
        <View style={{
          flexDirection: 'row', marginTop: 10, right: 0, justifyContent: 'center',
        }}
        >
          <Button
            mode="contained"
            onPress={() => {
              setData({ ...data, time: date });
              if (data.name === undefined) {
                Alert.alert('活動名稱不得為空');
              } else if (data.price === undefined) {
                Alert.alert('價錢不得為空');
              } else if (data.time === undefined) {
                Alert.alert('時間不得為空');
              } else if (data.qualification === undefined) {
                Alert.alert('條件不得為空');
              } else if (data.numberLimit === undefined) {
                Alert.alert('人數不得為空');
              } else if (data.details === undefined) {
                Alert.alert('詳細資訊不得為空');
              } else if (data.tag === undefined) {
                Alert.alert('請選擇標籤');
              } else {
                createActivity(data).then(() => {
                  onGoBack();
                  navigation.goBack();
                }).catch((err) => {
                  Alert.alert(err.toString());
                });
              }
            }}
          >
            新增
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              navigation.goBack();
            }}
          >
            取消
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddScreen;
