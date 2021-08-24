import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import {
  TextInput, Button,
} from 'react-native-paper';
import CalendarController from '../../controller/Calendar';
import DateTimeField from '../../components/DateTimeField';
import styles from './Styles';

function EditScreen({ navigation, route: { params } }) {
  const { id, onRefresh } = params;
  let data = { ...params.data };

  if (id) {
    data.startTime = data.startTime.toDate();
    data.endTime = data.endTime.toDate();
  } else {
    data = {
      location: '',
      link: '',
      content: '',
      eventId: null,
    };
  }

  const [fields, setFields] = useState(data);

  const saveData = () => {
    if (id) {
      CalendarController.modifySchedule(fields);
      onRefresh();
      navigation.goBack();
    } else {
      CalendarController.createSchedule(fields);
      onRefresh();
      navigation.goBack();
    }
  };

  const updateField = (field, value) => {
    fields[field] = value;
    setFields(fields);
  };

  const handleStartTimeChange = (date) => {
    updateField('startTime', date);
  };

  const handleEndTimeChange = (date) => {
    updateField('endTime', date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            label="標題"
            style={styles.inputField}
            value={fields.name}
            onChangeText={(text) => updateField('name', text)}
          />

          <DateTimeField
            label="開始時間"
            value={data.endTime}
            inputStyle={styles.inputField}
            onChange={handleStartTimeChange}
          />
          <DateTimeField
            label="結束時間"
            value={data.startTime}
            inputStyle={styles.inputField}
            onChange={handleEndTimeChange}
          />
          <TextInput
            label="地點"
            style={styles.inputField}
            onChangeText={(text) => updateField('location', text)}
            defaultValue={fields.location}
          />
          <TextInput
            label="連結"
            multiline
            style={styles.inputField}
            onChangeText={(text) => updateField('link', text)}
            defaultValue={fields.link}
          />
          <TextInput
            label="備註"
            multiline
            style={styles.inputField}
            onChangeText={(text) => updateField('content', text)}
            defaultValue={fields.content}
          />

          <Button mode="contained" style={styles.submitButton} onPress={saveData}>儲存</Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditScreen;
