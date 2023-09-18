import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ImagePickerResult, launchImageLibraryAsync } from 'expo-image-picker';
import { Box, Button, HStack, Heading, Input, NativeBaseProvider, VStack, extendTheme } from 'native-base';
import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import { styles } from '../stylesheet';

//預設為Dark Mode
function CreateEventScreen({navigation}:any){
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };

  const customTheme = extendTheme({ config });

  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventCost, setEventCost] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImagePickerResult | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  //處理輸入的活動資訊
  const handleEventNameChange = (text: string) => {
    setEventName(text);
  };

  const handleEventLocationChange = (text: string) => {
    setEventLocation(text);
  };

  const handleEventCostChange = (text: string) => {
    setEventCost(text);
  };

  const handleEventDescriptionChange = (text: string) => {
    setEventDescription(text);
  };

  // 選擇開始日期
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  // 選擇結束日期
  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };
  //顯示開始日期選擇器
  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };
  //顯示結束日期選擇器
  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };
  //上傳照片
  const handleUploadImage = async () => {
    const result = await launchImageLibraryAsync();
    if (!result.canceled) {
      setSelectedImage(result);
    }
  };
  return (
    <NativeBaseProvider theme={customTheme}>
      <Box style={styles.container}>
        <HStack>
          <Button marginLeft={4} onPress={()=>navigation.navigate('EventMainScreen')}>返回</Button>
          <Heading size="lg" marginLeft={60}>新增活動</Heading>
        </HStack>
        <VStack space={3} marginTop={3}>
          <Text style={styles.text}>活動名稱</Text>
          <Input
            style={styles.input}
            w="93%"
            alignSelf="center"
            variant="rounded"
            onChangeText={handleEventNameChange}
            value={eventName}
            placeholder="請輸入活動名稱"
            placeholderTextColor="#CCCCCC"
          />
          <HStack space={3} marginTop={3} marginLeft={4}>
            <Button onPress={showStartDatePickerModal}>開始時間</Button>
            {showStartDatePicker && (
            <DateTimePicker
              testID="startDatePicker"
              value={startDate}
              mode="datetime" //time才有is24hour
              //is24Hour={true}
              display="default"
              onChange={handleStartDateChange}
              minimumDate={new Date()}
            />
          )}
            
          </HStack>
          <HStack space={3} marginTop={3} marginLeft={4}>
            <Button onPress={showEndDatePickerModal}>結束時間</Button>
            {showEndDatePicker && (
            <DateTimePicker
              testID="endDatePicker"
              value={endDate}
              mode="datetime" //time才有is24hour
              // is24Hour={true}
              display="default"
              onChange={handleEndDateChange}
              minimumDate={startDate}
            />
            )}
          </HStack>
          <Text style={styles.text}>開始時間 : {startDate.toLocaleDateString()} {startDate.toLocaleTimeString()}</Text>
          <Text style={styles.text}>結束時間 : {endDate.toLocaleDateString()} {endDate.toLocaleTimeString()}</Text>
          <Text style={styles.text}>活動地點</Text>
          <Input
            style={styles.input}
            w="93%"
            alignSelf="center"
            variant="rounded"
            onChangeText={handleEventLocationChange}
            value={eventLocation}
            placeholder="請輸入活動地點"
            placeholderTextColor="#CCCCCC"
          />
          <Text style={styles.text}>參加費用</Text>
          <Input
            style={styles.input}
            w="93%"
            alignSelf="center"
            variant="rounded"
            onChangeText={handleEventCostChange}
            value={eventCost}
            placeholder="請輸入參加費用(請輸入數字，無則填0)"
            placeholderTextColor="#CCCCCC"
          />
          <Text style={styles.text}>活動介紹</Text>
          <Input
            style={styles.input}
            w="93%"
            alignSelf="center"
            variant="rounded"
            onChangeText={handleEventDescriptionChange}
            value={eventDescription}
            placeholder="請介紹你的活動"
            placeholderTextColor="#CCCCCC"
          />
        </VStack>
        <HStack space={3} marginTop={10} marginLeft={5}>
          <Button onPress={handleUploadImage} startIcon={<MaterialIcons name="add-a-photo" />}>
            上傳照片
          </Button>
          {selectedImage?.assets && (  //selectedImage可能是null 所以用selectedImage?.assets
            <Image source={{ uri: selectedImage.assets[0].uri }} style={{ width: 200, height: 100 }} />
            //可以印出來看selectedImage裡面的結構 再找uri
          )}
        </HStack>
        <VStack space={4} marginTop={3} alignItems="center">
          <Button>確認新增</Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default CreateEventScreen;
