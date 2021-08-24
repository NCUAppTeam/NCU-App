import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from 'react-native-paper';

function DateTimeField({
  label, value, inputStyle, onChange,
}) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState(value ? value.toLocaleString() : '');

  const showDialog = () => {
    if (!focused) {
      setFocused(true);
      setVisible(true);
    } else {
      setFocused(false);
    }
  };

  const hideDialog = () => setVisible(false);

  const handleConfirm = (newVal) => {
    setDate(newVal);
    setText(newVal.toLocaleString());
    hideDialog();
    onChange(newVal);
  };

  return (
    <View>
      <TextInput
        label={label}
        style={inputStyle}
        value={text}
        onFocus={showDialog}
      />
      <DateTimePickerModal
        isVisible={visible}
        mode="datetime"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDialog}
      />
    </View>
  );
}

export default DateTimeField;
