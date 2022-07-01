import React, { useState } from 'react';
import {
  Platform, SafeAreaView, ScrollView, KeyboardAvoidingView,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import EventController from '../../controller/Event';
import DateTimeField from '../../components/DateTimeField';
import styles from './Styles';

function EditScreen({ route: { params }, navigation }) {
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
    };
  }
  const [fields, setFields] = useState(data);

  const saveData = () => {
    if (id) {
      EventController.updateEvent(id, fields)
        .then(() => {
          onRefresh();
          navigation.goBack();
        });
    } else {
      EventController.createEvent(fields)
        .then(() => {
          onRefresh();
          navigation.goBack();
        });
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
            label="條件"
            style={styles.inputField}
            onChangeText={(text) => updateField('qualification', text)}
            defaultValue={fields.qualification}
          />
          <TextInput
            label="連結"
            multiline
            style={styles.inputField}
            onChangeText={(text) => updateField('link', text)}
            defaultValue={fields.link}
          />
          <TextInput
            label="內容"
            multiline
            style={styles.inputField}
            onChangeText={(text) => updateField('content', text)}
            defaultValue={fields.content}
          />

          <Button mode="contained" style={styles.submitButton} onPress={saveData}>發布</Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditScreen;
